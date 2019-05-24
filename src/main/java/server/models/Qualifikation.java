package server.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import java.util.Set;

@Entity
public class Qualifikation extends Persistent {

    @NotNull
    private int ausmass;

    @ManyToOne
    private Person person;

    @ManyToOne
    private Kompetenz kompetenz;

    public int getAusmass() {
        return ausmass;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public Kompetenz getKompetenz() {
        return kompetenz;
    }

    public void setKompetenz(Kompetenz kompetenz) {
        this.kompetenz = kompetenz;
    }

    public void setAusmass(int ausmass) {
        this.ausmass = ausmass;
    }
}
