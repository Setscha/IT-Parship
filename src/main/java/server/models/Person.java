package server.models;

import at.rennweg.htl.sew.autoconfig.UserInfo;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Set;

@Entity
public class Person extends Persistent implements UserInfo {

    @Column(unique = true)
    private String username;

    private String displayName;

    @OneToMany(mappedBy = "person", fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    private Set<Qualifikation> qualifikationen;

    @NotNull
    private String role;

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

    @Override
    public String getRole() {
        return role;
    }

    @Override
    public void setRole(String role) {
        this.role = role;
    }
}
