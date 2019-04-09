package server.models;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.Set;

@Entity
public class Projekt extends Persistent {
    private Number id;
    private String name;
    private String beschreibung;
    private Number maxSchueler;



    @OneToMany(mappedBy = "projekt")
    private Set<Person> personas;

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

    public void setMaxSchueler(Number maxSchueler) {
        this.maxSchueler = maxSchueler;
    }
}
