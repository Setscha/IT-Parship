package server.models;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.function.BiConsumer;
import java.util.function.Function;


/**
 * Basisklasse aller persistenten Entities in dieser Anwendung,
 * erleichtert bidirektionale Updates von 1:n-Beziehungen zwischen
 * Entities.
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


    /**
     * Hilfsmethode für die 1-Seite einer 1:n-Beziehung, die auch die n-Seite aktualisiert.
     *
     * @param newCollection
     *      neu zuzuweisende {@link Collection} von Entities der n-Seite
     * @param setOne
     *      set-{@linkplain BiConsumer Methode} der n-Seite für die Entity der 1-Seite
     * @param getCollection
     *      get-{@linkplain Function Methode} der 1-Seite für die {@link Collection} von Entities der n-Seite
     * @param <O>
     *      Datentyp der 1-Seite
     * @param <M>
     *      Datentyp der n-Seite
     * @param <C>
     *      {@link Collection} oder Subklasse
     * @return
     *      neu zugewiesene {@link Collection} von Entities der n-Seite
     */
    protected <O extends Persistent, M extends Persistent, C extends Collection<M>>
            C setOneToMany(C newCollection, BiConsumer<M, O> setOne, Function<O, C> getCollection) {

        C collection;

        // Gibt es derzeit eine Collection von n-Entities?
        if ((collection = getCollection.apply((O) this)) != null) {
            // Alle bisherigen n-Entities entfernen
            // Um ConcurrentModificationException zu verhindern:
            new ArrayList<M>(collection).forEach(e -> setOne.accept(e, null));
        }

        // Wurde eine neue Collection von n-Entities angegeben?
        if (newCollection != null) {
            // Alle neuen n-Entities hinzufügen
            newCollection.forEach(e -> setOne.accept(e, (O) this));
        }

        return collection;
    }


    /**
     * Hilfsmethode für die n-Seite einer 1:n-Beziehung, die auch die 1-Seite aktualisiert.
     *
     * @param <O>
     *      Datentyp der 1-Seite
     * @param <M>
     *      Datentyp der n-Seite
     * @param <C>
     *      {@link Collection} oder Subklasse
     * @param newOne
     *      neu zuzuweisende Entity der 1-Seite
     * @param getCollection
     *      get-{@linkplain Function Methode} der 1-Seite für die {@link Collection} von Entities der n-Seite
     * @param getOne
     *      get-{@linkplain Function Methode} der n-Seite für die Entity der 1-Seite
     * @return
     *      neu zugewiesene Entity der 1-Seite
     */
    protected <O extends Persistent, M extends Persistent, C extends Collection<M>>
            O setManyToOne(O newOne, Function<O, C> getCollection, Function<M, O> getOne) {

        O one;
        C collection;

        // Gibt es derzeit eine 1-Entity, und gibt es dort eine Collection von n-Entities?
        if (((one = getOne.apply((M) this)) != null) && ((collection = getCollection.apply(one)) != null)) {
            // Diese Entity von der bisherigen 1-Entity entfernen
            collection.remove(this);
        }

        // Wurde eine neue 1-Entity angegeben, und besitzt diese eine Collection von n-Entities?
        if ((newOne != null) && ((collection = getCollection.apply(newOne)) != null)) {
            // Diese Entity zur neuen 1-Entity hinzufügen
            collection.add((M) this);
        }

        return newOne;
    }

}
