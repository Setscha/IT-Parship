package server;

import org.glassfish.jersey.internal.guava.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.BasePathAwareController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import server.models.*;
import server.repositories.AnforderungRepository;
import server.repositories.PersonRepository;
import server.repositories.ProjektRepository;
import server.repositories.QualifikationRepository;

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

    @Autowired
    private QualifikationRepository qualifikationRepository;

    private List<Person> students;


    // Map in der die Liste der Kompetenzen jedes Schülers gespeichert wird
    // <SchülerID, List<KompetenzID>>
    private Map<Long, List<Long>> schuelerKompetenzen;

    private long projektplatzid;

    @RequestMapping(path = "/match", method = RequestMethod.GET)
    public Map<Long, String> matchStudents() {
        students = new ArrayList<>();
        projektplatzid = 0;

        List<Projekt> projekte = new ArrayList<>();
        projektRepository.findAll().forEach(projekte::add);

        personRepository.findAll().forEach(students::add);

        int plaetze = projekte.stream().mapToInt(p -> (int) p.getMaxSchueler()).sum();
       /* if(plaetze != students.size()){
            return new HashMap<Long, String>(){{
                put(1L, String.format("Fehler, %d Plätze aber %d Schüler!", plaetze, students.size()));
            }};
        }*/


        schuelerKompetenzen = getStudentKompetenzList();

        List<ProjektPlatz> projektPraeferenzen = projektPlaetzeGenerieren(projekte);

        List<SchuelerPlatz> schuelerPraeferenzen = schuelerPlaetzeGenerieren(projektPraeferenzen);

        Map<Long, String> match = match(students, schuelerPraeferenzen, projektPraeferenzen);

        return match;
    }

    private List<ProjektPlatz> projektPlaetzeGenerieren(List<Projekt> projekte) {
        List<ProjektPlatz> plaetze = new ArrayList<>();
        for (Projekt p : projekte) {
            int verfuegbar = (int) p.getMaxSchueler();
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

        for (Long schueler : schuelerKompetenzen.keySet()) {
            List<Long> order = preferredProjectOrder(personRepository.findById(schueler).get(), projektPlaetze);
            plaetze.add(new SchuelerPlatz(schueler, order.toArray(new Long[0])));
        }

        return plaetze;
    }

    private List<Long> preferredProjectOrder(Person schueler, List<ProjektPlatz> projektPlaetze) {
        // Map in der die Eignung für das Projekt jedes Schülers gespeichert wird
        // Wenn der Schüler die gewünschte Kompetenz nicht besitzt, bekommt er einen default Wert 99
        // <SchülerID, Eignung>
        Map<Long, Long> rangOrdnung = getProjectSuitability(schueler.getId(), projektPlaetze);

        // Map der Projekte anhand des Wertes sortieren
        Map<Long, Long> sorted = rangOrdnung
                .entrySet()
                .stream()
                .sorted(comparingByValue())
                .collect(toMap(Map.Entry::getKey, Map.Entry::getValue, (e1, e2) -> e2, LinkedHashMap::new));

        return new ArrayList<>(sorted.keySet());
        // return Arrays.asList(2L, 3L);
    }

    private Map<Long, Long> getProjectSuitability(long schuelerID, List<ProjektPlatz> projektPlaetze) {
        // Map<ProjektID, Eignung>
        Map<Long, Long> rangOrdnung = new HashMap<>();
        for (ProjektPlatz projekt : projektPlaetze) {
            if (schuelerKompetenzen.get(schuelerID).contains(projekt.kompetenzID)) {
                for (Qualifikation schuelerQualifikation : personRepository.findById(schuelerID).get().getQualifikationen()) {
                    if (schuelerQualifikation.getKompetenz().getId().equals(projekt.kompetenzID))
                        rangOrdnung.put(projekt.projektPlatzID, Integer.toUnsignedLong(Math.abs(anforderungRepository.findById(projekt.anforderungID).get().getAusmass() - schuelerQualifikation.getAusmass())));
                }
            } else {
                rangOrdnung.put(projekt.projektPlatzID, 99L);
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
        // Map<SchülerID, Eignung>
        Map<Long, Long> rangOrdnung = new HashMap<>();
        for (Long id : schuelerKompetenzen.keySet()) {
            if (schuelerKompetenzen.get(id).contains(anforderung.getKompetenz().getId())) {
                for (Qualifikation schuelerQualifikation : personRepository.findById(id).get().getQualifikationen()) {
                    if (schuelerQualifikation.getKompetenz().getId().equals(anforderung.getKompetenz().getId()))
                        rangOrdnung.put(id, Integer.toUnsignedLong(Math.abs(anforderung.getAusmass() - schuelerQualifikation.getAusmass())));
                }
            } else {
                rangOrdnung.put(id, 99L);
            }
        }
        return rangOrdnung;
    }

    private Map<Long, List<Long>> getStudentKompetenzList() {
        Map<Long, List<Long>> schuelerKompetenzen = new HashMap<>();
        students.forEach(schueler -> {
            for (Qualifikation qualifikation : schueler.getQualifikationen()) {
                if (!schuelerKompetenzen.containsKey(schueler.getId())) {
                    schuelerKompetenzen.put(schueler.getId(), Collections.singletonList(qualifikation.getKompetenz().getId()));
                } else {
                    List<Long> temp = new ArrayList<>(schuelerKompetenzen.get(schueler.getId()));
                    temp.add(qualifikation.getKompetenz().getId());
                    schuelerKompetenzen.put(schueler.getId(), temp);
                }
            }
        });
        return schuelerKompetenzen;
    }

    private static Map<Long, String> match(List<Person> schueler,
                                           List<SchuelerPlatz> schuelerPraeferenzen,
                                           List<ProjektPlatz> projektPraeferenzen){

        Map<Long, List<Long>> schuelerPrefer = schuelerPraeferenzen.stream()
                .collect(Collectors.toMap(SchuelerPlatz::getSchuelerID, SchuelerPlatz::getPreferredOrder));

        Map<Long, List<Long>> projektPrefer = projektPraeferenzen.stream()
                .collect(Collectors.toMap(ProjektPlatz::getProjektPlatzID, ProjektPlatz::getPreferredOrder));

        Map<Long, Person> engagedTo = new TreeMap<>();
        List<Person> freieSchueler = new LinkedList<>();
        freieSchueler.addAll(schueler);
        while(!freieSchueler.isEmpty()){
            Person jetzigerSchueler = freieSchueler.remove(0);
            List<Long> jetzigerSchuelerPrefers = schuelerPrefer.get(jetzigerSchueler.getId());
            for(Long projekt:jetzigerSchuelerPrefers){
                if(engagedTo.get(projekt) == null){
                    engagedTo.put(projekt, jetzigerSchueler);
                    break;
                }else{
                    Person otherSchueler = engagedTo.get(projekt);
                    List<Long> jetzigesProjektPrefers = projektPrefer.get(projekt);
                    if(jetzigesProjektPrefers.indexOf(jetzigerSchueler) < jetzigesProjektPrefers.indexOf(otherSchueler)){
                        engagedTo.put(projekt, jetzigerSchueler);
                        freieSchueler.add(otherSchueler);
                        break;
                    }
                }
            }
        }
        Map<Long, String> returnMap = new HashMap<>();
        engagedTo.forEach((k, v) -> returnMap.put(k, v.getDisplayName()));
        return returnMap;
    }

}

class ProjektPlatz {

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

}

class SchuelerPlatz {

    public long schuelerID;
    public List<Long> preferredOrder;

    SchuelerPlatz(long schueler_, Long... preferredOrder_) {
        schuelerID = schueler_;
        preferredOrder = Arrays.asList(preferredOrder_);
    }

    public long getSchuelerID() {
        return schuelerID;
    }

    public List<Long> getPreferredOrder() {
        return preferredOrder;
    }
}

