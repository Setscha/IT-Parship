package server.models;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

@Entity
public class Qualifikation extends Persistent {

    @NotNull
    private int ausmass;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Person person;

    @ManyToOne(fetch = FetchType.EAGER)
    private Kompetenz kompetenz;

    public int getAusmass() {
        return ausmass;
    }

    public void setAusmass(int ausmass) {
        this.ausmass = ausmass;
    }


    public Person getPerson() {
        return person;
    }

    /**
     * Aktualisiert beide Seiten der @ManyToOne-Beziehung.
     */
    public void setPerson(Person person) {
        this.person = setManyToOne(person, Person::getQualifikationen, Qualifikation::getPerson);
    }


    public Kompetenz getKompetenz() {
        return kompetenz;
    }


    /**
     * Aktualisiert beide Seiten der @ManyToOne-Beziehung.
     */
    public void setKompetenz(Kompetenz kompetenz) {
        this.kompetenz = setManyToOne(kompetenz, Kompetenz::getQualifikationen, Qualifikation::getKompetenz);
    }
}
