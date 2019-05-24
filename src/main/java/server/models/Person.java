package server.models;

import at.rennweg.htl.sew.autoconfig.UserInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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

    public Set<Qualifikation> getQualifikationen() {
        return qualifikationen;
    }

    public void setQualifikationen(Set<Qualifikation> qualifikationen) {
        this.qualifikationen = qualifikationen;
    }

    public Projekt getProjekt() {
        return projekt;
    }

    public void setProjekt(Projekt projekt) {
        this.projekt = projekt;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }
}
