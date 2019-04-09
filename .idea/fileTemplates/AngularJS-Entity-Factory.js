#if($NAME.matches("[a-z0-9-]+"))
#set($FACTORY = ${StringUtils.removeAndHump($NAME, "-")})
"use strict";

app.factory("${FACTORY}", function() {

    function ${FACTORY}(template, modifier) {
    
        // Schreibgeschützte Properties und ihre Defaultwerte
        let properties = {
            _links: undefined,
        };

        Object.assign(this, properties, template, modifier);

        // Properties schreibschützen
        Object.keys(properties).forEach(k => Object.defineProperty(this, k, { writable: false }));
        
        // Liefert eine neue Instanz dieses Objekts mit den angegebenen Änderungen
        this.variante = modifier => new ${FACTORY}(this, modifier);

        // Liefert true, wenn dieses und das andere Objekt vom selben Konstruktor stammen
        // und die gleichen self-Links besitzen.
        this.equals = other => {
            try {
                return (this.constructor === other.constructor) && (this._links.self.href === other._links.self.href);
            } catch (err) {
                return false;
            }
        };
    }

    // Pfad im REST-API, unter dem diese Objekte zu finden sind
    ${FACTORY}.path = "${NAME}";

    return ${FACTORY};
});
#else
// Factory-Dateinamen dürfen nur Kleinbuchstaben, Ziffern und '-' enthalten
#end