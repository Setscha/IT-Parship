package server.models;

import at.rennweg.htl.sew.autoconfig.UserInfo;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Transient;
import java.util.Set;

@Entity
public class Person extends Persistent implements UserInfo {

    private String username;

    private String displayName;

    @OneToMany(mappedBy = "person")
    private Set<Qualifikation> qualifikationen;

    @Transient
    private String password;

    @ManyToOne
    private Projekt projekt;

    @OneToMany(mappedBy = "projekt")
    private Set<Anforderung> anforderungen;


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Qualifikation> getQualifikationen() {
        return qualifikationen;
    }

    public void setQualifikationen(Set<Qualifikation> qualifikationen) {
        this.qualifikationen = qualifikationen;
    }

    public Projekt getProjekt() {
        return projekt;
    }

    @Override
    public String getDisplayName() {
        return displayName;
    }

    @Override
    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    /**
     * Aktualisiert beide Seiten der @OneToMany-Beziehung.
     */
    public void setProjekt(Projekt projekt) {
        this.projekt = setManyToOne(projekt, Projekt::getPersonas, Person::getProjekt);
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
