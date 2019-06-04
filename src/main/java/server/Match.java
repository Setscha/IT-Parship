package server;

import org.glassfish.jersey.internal.guava.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.BasePathAwareController;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import server.models.*;
import server.repositories.*;

import java.util.*;
import java.util.stream.Collectors;

import static java.util.Map.Entry.comparingByValue;
import static java.util.stream.Collectors.toMap;

@RestController
@BasePathAwareController
public class Match {

    @Autowired
    private ProjektRepository projektRepository;

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private AnforderungRepository anforderungRepository;

    private List<Person> students;

    // Map in der die Liste der Kompetenzen jedes Schülers gespeichert wird
    // <Schüler, List<KompetenzID>>
    private Map<Person, List<Long>> schuelerKompetenzen;

    private long projektplatzid;

    @RequestMapping(path = "/match", method = RequestMethod.GET)
    @PreAuthorize("hasAnyRole('LEHRER')")
    public boolean matchStudents() {
        students = new ArrayList<>();
        projektplatzid = 0;

        List<Projekt> projekte = new ArrayList<>();
        projektRepository.findAll().forEach(projekte::add);

        personRepository.findAll().forEach(s -> {
            if(!s.getRole().equals("ROLE_LEHRER"))
                students.add(s);
        });

        int plaetze = projekte.stream().mapToInt(Projekt::getMaxSchueler).sum();
        if(plaetze != students.size()){
            throw new InputMismatchException(String.format("%d Projektplätze für %d Schüler", plaetze, students.size()));
        }

        schuelerKompetenzen = getStudentKompetenzList();

        List<ProjektPlatz> projektPraeferenzen = projektPlaetzeGenerieren(projekte);

        List<SchuelerPlatz> schuelerPraeferenzen = schuelerPlaetzeGenerieren(projektPraeferenzen);

        Map<ProjektPlatz, Person> match = match(students, schuelerPraeferenzen, projektPraeferenzen);

        match.forEach((k, v) -> k.schuelerID = v.getId());

        projektPraeferenzen.forEach(projektPlatz -> {
            Person schueler = personRepository.findById(projektPlatz.schuelerID).get();
            schueler.setProjekt(projektRepository.findById(projektPlatz.projektID).get());
            personRepository.save(schueler);
        });

        return true;
    }

    private List<ProjektPlatz> projektPlaetzeGenerieren(List<Projekt> projekte) {
        List<ProjektPlatz> plaetze = new ArrayList<>();
        for (Projekt p : projekte) {
            int verfuegbar = p.getMaxSchueler();
            List anforderungen = Lists.newArrayList(p.getAnforderungen());
            anforderungen.sort(Comparator.comparingInt(Anforderung::getAusmass).reversed());
            for (int i = 0; i < verfuegbar; i++) {
                Anforderung anforderung = ((Anforderung) anforderungen.get(i % anforderungen.size()));
                List<Long> order = preferredStudentOrder(anforderung);
                plaetze.add(new ProjektPlatz(projektplatzid++, p.getId(), anforderung.getId(), anforderung.getKompetenz().getId(), 0L, order.toArray(new Long[0])));
            }
        }
        return plaetze;
    }

    private List<SchuelerPlatz> schuelerPlaetzeGenerieren(List<ProjektPlatz> projektPlaetze) {
        List<SchuelerPlatz> plaetze = new ArrayList<>();

        for (Person schueler : schuelerKompetenzen.keySet()) {
            List<ProjektPlatz> order = preferredProjectOrder(schueler, projektPlaetze);
            plaetze.add(new SchuelerPlatz(schueler.getId(), order.toArray(new ProjektPlatz[0])));
        }

        return plaetze;
    }

    private List<ProjektPlatz> preferredProjectOrder(Person schueler, List<ProjektPlatz> projektPlaetze) {
        // Map in der die Eignung für das Projekt jedes Schülers gespeichert wird
        // Wenn der Schüler die gewünschte Kompetenz nicht besitzt, bekommt er einen default Wert 99
        // <SchülerID, Eignung>
        Map<ProjektPlatz, Long> rangOrdnung = getProjectSuitability(schueler, projektPlaetze);

        // Map der Projekte anhand des Wertes sortieren
        Map<ProjektPlatz, Long> sorted = rangOrdnung
                .entrySet()
                .stream()
                .sorted(comparingByValue())
                .collect(toMap(Map.Entry::getKey, Map.Entry::getValue, (e1, e2) -> e2, LinkedHashMap::new));

        return new ArrayList<>(sorted.keySet());
    }

    private Map<ProjektPlatz, Long> getProjectSuitability(Person schueler, List<ProjektPlatz> projektPlaetze) {
        // Map<ProjektPlatz, Eignung>
        Map<ProjektPlatz, Long> rangOrdnung = new HashMap<>();
        for (ProjektPlatz projekt : projektPlaetze) {
            if (schuelerKompetenzen.get(schueler).contains(projekt.kompetenzID)) {
                for (Qualifikation schuelerQualifikation : schueler.getQualifikationen()) {
                    if (schuelerQualifikation.getKompetenz().getId().equals(projekt.kompetenzID))
                        rangOrdnung.put(projekt, Integer.toUnsignedLong(Math.abs(anforderungRepository.findById(projekt.anforderungID).get().getAusmass() - schuelerQualifikation.getAusmass())));
                }
            } else {
                rangOrdnung.put(projekt, 99L);
            }
        }
        return rangOrdnung;
    }

    private List<Long> preferredStudentOrder(Anforderung anforderung) {
        // Map in der die Eignung für das Projekt jedes Schülers gespeichert wird
        // Wenn der Schüler die gewünschte Kompetenz nicht besitzt, bekommt er einen default Wert 99
        // <SchülerID, Eignung>
        Map<Long, Long> rangOrdnung = getStudentSuitability(anforderung);

        // Map der Schüler anhand des Wertes sortieren
        Map<Long, Long> sorted = rangOrdnung
                .entrySet()
                .stream()
                .sorted(comparingByValue())
                .collect(toMap(Map.Entry::getKey, Map.Entry::getValue, (e1, e2) -> e2, LinkedHashMap::new));

        return new ArrayList<>(sorted.keySet());
    }

    private Map<Long, Long> getStudentSuitability(Anforderung anforderung) {
        Long anforderungKompetenzId = anforderung.getKompetenz().getId();
        int anforderungAusmass = anforderung.getAusmass();
        // Map<SchülerID, Eignung>
        Map<Long, Long> rangOrdnung = new HashMap<>();
        for (Person schueler : schuelerKompetenzen.keySet()) {
            if (schuelerKompetenzen.get(schueler).contains(anforderungKompetenzId)) {
                for (Qualifikation schuelerQualifikation : schueler.getQualifikationen()) {
                    if (schuelerQualifikation.getKompetenz().getId().equals(anforderungKompetenzId))
                        rangOrdnung.put(schueler.getId(), Integer.toUnsignedLong(Math.abs(anforderungAusmass - schuelerQualifikation.getAusmass())));
                }
            } else {
                rangOrdnung.put(schueler.getId(), 99L);
            }
        }
        return rangOrdnung;
    }

    private Map<Person, List<Long>> getStudentKompetenzList() {
        Map<Person, List<Long>> schuelerKompetenzen = new HashMap<>();
        students.forEach(schueler -> {
            Qualifikation[] schuelerQualifikationen = schueler.getQualifikationen().toArray(new Qualifikation[0]);
            if(schuelerQualifikationen.length == 0) {
                schuelerKompetenzen.put(schueler, Collections.singletonList(null));
            }
            for (Qualifikation qualifikation : schuelerQualifikationen) {
                if (!schuelerKompetenzen.containsKey(schueler)) {
                    schuelerKompetenzen.put(schueler, Collections.singletonList(qualifikation.getKompetenz().getId()));
                } else {
                    List<Long> temp = new ArrayList<>(schuelerKompetenzen.get(schueler));
                    temp.add(qualifikation.getKompetenz().getId());
                    schuelerKompetenzen.put(schueler, temp);
                }
            }
        });
        return schuelerKompetenzen;
    }

    private static Map<ProjektPlatz, Person> match(List<Person> schueler,
                                                   List<SchuelerPlatz> schuelerPraeferenzen,
                                                   List<ProjektPlatz> projektPraeferenzen){

        Map<Long, List<ProjektPlatz>> schuelerPrefer = schuelerPraeferenzen.stream()
                .collect(Collectors.toMap(SchuelerPlatz::getSchuelerID, SchuelerPlatz::getPreferredOrder));

        Map<Long, List<Long>> projektPrefer = projektPraeferenzen.stream()
                .collect(Collectors.toMap(ProjektPlatz::getProjektPlatzID, ProjektPlatz::getPreferredOrder));

        Map<ProjektPlatz, Person> engagedTo = new TreeMap<>();
        List<Person> freieSchueler = new LinkedList<>();
        freieSchueler.addAll(schueler);
        while(!freieSchueler.isEmpty()){
            Person jetzigerSchueler = freieSchueler.remove(0);
            List<ProjektPlatz> jetzigerSchuelerPrefers = schuelerPrefer.get(jetzigerSchueler.getId());
            for(ProjektPlatz projekt:jetzigerSchuelerPrefers){
                if(!engagedTo.containsKey(projekt)){
                    engagedTo.put(projekt, jetzigerSchueler);
                    break;
                }else{
                    Person otherSchueler = engagedTo.get(projekt);
                    List<Long> jetzigesProjektPrefers = projektPrefer.get(projekt.projektPlatzID);
                    if(jetzigesProjektPrefers.indexOf(jetzigerSchueler.getId()) < jetzigesProjektPrefers.indexOf(otherSchueler.getId())){
                        engagedTo.put(projekt, jetzigerSchueler);
                        freieSchueler.add(otherSchueler);
                        break;
                    }
                }
            }
        }
//        Map<Long, String> returnMap = new HashMap<>();
//        engagedTo.forEach((k, v) -> {
//            returnMap.put(k, v);
//        });
        return engagedTo;
    }

}

class ProjektPlatz implements Comparable<ProjektPlatz> {

    public long projektPlatzID;
    public long projektID, anforderungID, kompetenzID, schuelerID;
    public List<Long> preferredOrder;

    ProjektPlatz(long projektPlatz_, long projekt_, long anforderung_, long kompetenz_, long schueler_, Long... preferredOrder_) {
        projektID = projekt_;
        anforderungID = anforderung_;
        kompetenzID = kompetenz_;
        schuelerID = schueler_;
        projektPlatzID = projektPlatz_;
        preferredOrder = Arrays.asList(preferredOrder_);
    }

    public long getProjektPlatzID(){
        return projektPlatzID;
    }

    public List<Long> getPreferredOrder(){
        return preferredOrder;
    }

    @Override
    public int compareTo(ProjektPlatz o) {
        return (int) (getProjektPlatzID() - o.getProjektPlatzID());
    }
}

class SchuelerPlatz {

    public long schuelerID;
    public List<ProjektPlatz> preferredOrder;

    SchuelerPlatz(long schueler_, ProjektPlatz... preferredOrder_) {
        schuelerID = schueler_;
        preferredOrder = Arrays.asList(preferredOrder_);
    }

    public long getSchuelerID() {
        return schuelerID;
    }

    public List<ProjektPlatz> getPreferredOrder() {
        return preferredOrder;
    }
}
