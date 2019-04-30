package server.models;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Anforderung extends Persistent {
    private int ausmass;

    @ManyToOne
    @JoinColumn(name="qualifikationen")
    private Projekt projekt;

    @ManyToOne
    private Kompetenz kompetenz;

    public int getAusmass() {
        return ausmass;
    }

    public void setAusmass(int ausmass) {
        this.ausmass = ausmass;
    }

    public Projekt getProjekt() {
        return projekt;
    }

    public void setProjekt(Projekt projekt) {
        this.projekt = projekt;
    }

    public Kompetenz getKompetenz() {
        return kompetenz;
    }

    public void setKompetenz(Kompetenz kompetenz) {
        this.kompetenz = kompetenz;
    }
}
