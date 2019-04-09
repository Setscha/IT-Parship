#if($NAME.matches("[a-z0-9-]+"))
#set($FILTER = ${StringUtils.removeAndHump($NAME, "-")})
#set($FILTER = $FILTER.substring(0, 1).toLowerCase() + $FILTER.substring(1))
"use strict";

app.filter("${FILTER}", function() {

    function ${FILTER}(wert) {
    }

    return ${FILTER};
});
#else
// Filter-Dateinamen dürfen nur Kleinbuchstaben, Ziffern und '-' enthalten
#end
