package server.models;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import java.util.Set;

@Entity
public class Kompetenz extends Persistent {

    private String beschreibung;

    @OneToMany(mappedBy = "kompetenz", fetch = FetchType.EAGER)
    private Set<Qualifikation> qualifikationen;

    @OneToMany(mappedBy = "kompetenz", fetch = FetchType.EAGER)
    private Set<Anforderung> anforderungen;

    public String getBeschreibung() {
        return beschreibung;
    }

    public void setBeschreibung(String beschreibung) {
        this.beschreibung = beschreibung;
    }


    public Set<Qualifikation> getQualifikationen() {
        return qualifikationen;
    }

    public Set<Anforderung> getAnforderungen() {
        return anforderungen;
    }

    /**
     * Aktualisiert beide Seiten der @OneToMany-Beziehung.
     */
    public void setQualifikationen(Set<Qualifikation> qualifikationen) {
        this.qualifikationen = setOneToMany(qualifikationen, Qualifikation::setKompetenz, Kompetenz::getQualifikationen);
    }

    /**
     * Aktualisiert beide Seiten der @OneToMany-Beziehung.
     */
    public void setAnforderungen(Set<Anforderung> anforderungen) {
        this.anforderungen = setOneToMany(anforderungen, Anforderung::setKompetenz, Kompetenz::getAnforderungen);
    }
}
