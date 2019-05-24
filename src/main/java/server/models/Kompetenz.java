package server.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.util.Set;

@Entity
public class Kompetenz extends Persistent {

    private String beschreibung;

    @OneToMany(mappedBy = "kompetenz", fetch = FetchType.EAGER)
    private Set<Qualifikation> qualifikationen;

    @OneToMany(mappedBy = "kompetenz", fetch = FetchType.EAGER)
    private Set<Anforderung> anforderungen;

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

    public Set<Anforderung> getAnforderungen() {
        return anforderungen;
    }

    public void setAnforderungen(Set<Anforderung> anforderungen) {
        this.anforderungen = anforderungen;
    }
}
