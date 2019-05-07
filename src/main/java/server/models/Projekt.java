package server.models;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.Set;

@Entity
public class Projekt extends Persistent {
    private String name;
    @Column(columnDefinition="varchar(800)")
    private String beschreibung;
    private Integer maxSchueler;

    @OneToMany(mappedBy = "projekt")
    private Set<Person> personas;

    @OneToMany(mappedBy = "projekt", cascade = CascadeType.REMOVE)
    private Set<Anforderung> anforderungen;

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

    public Number getMaxSchueler() {
        return maxSchueler;
    }

    public void setMaxSchueler(Integer maxSchueler) {
        this.maxSchueler = maxSchueler;
    }

    public Set<Person> getPersonas() {
        return personas;
    }

    public void setPersonas(Set<Person> personas) {
        this.personas = personas;
    }

    public Set<Anforderung> getAnforderungen() {
        return anforderungen;
    }

    public void setAnforderungen(Set<Anforderung> anforderungen) {
        this.anforderungen = anforderungen;
    }
}
