#if($NAME.matches(".+[.]spec"))
#set($FACTORY_JS = $NAME.replaceAll("[.]spec$", ""))
#set($FACTORY = ${StringUtils.removeAndHump($FACTORY_JS, "-")})
#set($FACTORY_UNIT = $FACTORY + "Factory")
#set($FACTORY_OBJ = $FACTORY.substring(0, 1).toLowerCase() + $FACTORY.substring(1) + "Obj")
"use strict";

expect("${FACTORY_UNIT}", () => {
    var $FACTORY, $FACTORY_OBJ;

    beforeEach(() => {
        module("???");
        inject(_${FACTORY}_ => { 
            $FACTORY = _${FACTORY}_;
            $FACTORY_OBJ = new $FACTORY();
        });
    });
});
#else
// Unit-Test-Dateinamen müssen auf .spec enden!
#end
