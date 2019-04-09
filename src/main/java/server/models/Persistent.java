package server.models;

import javax.persistence.*;


/**
 * Basisklasse aller persistenten Entities in dieser Anwendung.
 *
 * @author F. Kasper, ferdinand.kasper@bildung.gv.at
 */
@MappedSuperclass
public class Persistent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Version
    private long version;


    /** Erscheint nicht im JSON-API, obwohl dies eine get-Methode ist. */
    public Long getId() {
        return id;
    }


    public long getETag() {
        return version;
    }

}
