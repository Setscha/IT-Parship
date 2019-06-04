package server.models;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
public class Projekt extends Persistent {
    private String name;
    @Column(columnDefinition="varchar(800)")
    private String beschreibung;
    private Integer maxSchueler;

    @OneToMany(mappedBy = "projekt", fetch = FetchType.EAGER)
    private Set<Person> personas;

    @OneToMany(mappedBy = "projekt", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<Anforderung> anforderungen;

    @PreRemove
    private void preRemove() {
        List<Person> toRemove = new ArrayList<>(personas);
        for(Person p : toRemove){
            p.setProjekt(null);
        }
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBeschreibung() {
        return beschreibung;
    }

    public void setBeschreibung(String beschreibung) {
        this.beschreibung = beschreibung;
    }

    public Integer getMaxSchueler() {
        return maxSchueler;
    }

    public void setMaxSchueler(Integer maxSchueler) {
        this.maxSchueler = maxSchueler;
    }


    public Set<Person> getPersonas() {
        return personas;
    }


    /**
     * Aktualisiert beide Seiten der @OneToMany-Beziehung.
     */
    public void setPersonas(Set<Person> personas) {
        this.personas = setOneToMany(personas, Person::setProjekt, Projekt::getPersonas);
    }


    public Set<Anforderung> getAnforderungen() {
        return anforderungen;
    }


    /**
     * Aktualisiert beide Seiten der @OneToMany-Beziehung.
     */
    public void setAnforderungen(Set<Anforderung> anforderungen) {
        this.anforderungen = setOneToMany(anforderungen, Anforderung::setProjekt, Projekt::getAnforderungen);
    }
}
