package server.models;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.util.Set;

@Entity
public class Kompetenz extends Persistent {

    private String beschreibung;

    @OneToMany(mappedBy = "kompetenz")
    private Set<Qualifikation> qualifikationen;

    public Set<Qualifikation> getQualifikationen() {
        return qualifikationen;
    }

    public void setQualifikationen(Set<Qualifikation> qualifikationen) {
        this.qualifikationen = qualifikationen;
    }

    public String getBeschreibung() {
        return beschreibung;
    }

    public void setBeschreibung(String beschreibung) {
        this.beschreibung = beschreibung;
    }
}
