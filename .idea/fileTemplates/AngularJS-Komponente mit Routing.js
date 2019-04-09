#if($NAME.matches("[a-z0-9-]+"))
#set($KOMPONENTE = ${StringUtils.removeAndHump($NAME, "-")})
#set($CONTROLLER = $KOMPONENTE + "Controller")
#set($KOMPONENTE = $KOMPONENTE.substring(0, 1).toLowerCase() + $KOMPONENTE.substring(1))
"use strict";

app.component("${KOMPONENTE}", {
    templateUrl: "components/${NAME}.html",
    controller: "${CONTROLLER}",
    bindings: {
    }
});


app.config(function(${DS}stateProvider, ${DS}urlRouterProvider) {
  ${DS}stateProvider.state({ 
    name: "${NAME}", 
    url: "/${NAME}",
    component: "${KOMPONENTE}"
  });
  
  // ${DS}urlRouterProvider.otherwise("/${NAME}");
});


app.controller("${CONTROLLER}", function(${DS}log) {

    ${DS}log.debug("${CONTROLLER}()");

});
#else
// Komponenten-Dateinamen dürfen nur Kleinbuchstaben, Ziffern und '-' enthalten
#end
