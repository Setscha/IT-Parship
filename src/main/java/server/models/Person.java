package server.models;

import at.rennweg.htl.sew.autoconfig.UserInfo;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Person extends Persistent implements UserInfo {

    private String username;

    private String displayName;

    @OneToMany(mappedBy = "person", fetch = FetchType.EAGER)
    private Set<Qualifikation> qualifikationen;

    @Transient
    private String password;

    @ManyToOne
    private Projekt projekt;

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

    public Set<Qualifikation> getQualifikationen() {
        return qualifikationen;
    }

    /**
     * Aktualisiert beide Seiten der @OneToMany-Beziehung.
     */
    public void setProjekt(Projekt projekt) {
        this.projekt = setManyToOne(projekt, Projekt::getPersonas, Person::getProjekt);
    }


    /**
     * Aktualisiert beide Seiten der @OneToMany-Beziehung.
     */
    public void setQualifikationen(Set<Qualifikation> qualifikationen) {
        this.qualifikationen = setOneToMany(qualifikationen, Qualifikation::setPerson, Person::getQualifikationen);
    }

}
