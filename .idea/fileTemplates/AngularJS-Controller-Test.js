#if($NAME.matches(".+[.]spec"))
#set($CONTROLLER_JS = $NAME.replaceAll("[.]spec$", ""))
#set($CONTROLLER_UNIT = ${StringUtils.removeAndHump($CONTROLLER_JS, "-")} + "Controller")
#set($CONTROLLER_OBJ = $CONTROLLER_UNIT.substring(0, 1).toLowerCase() + $CONTROLLER_UNIT.substring(1))
"use strict";

expect("${CONTROLLER_UNIT}", () => {
    var $CONTROLLER_OBJ;

    beforeEach(() => {
        module("???");
        inject(\$controller => $CONTROLLER_OBJ = \$controller("${CONTROLLER_UNIT}"));
    });
});
#else
// Unit-Test-Dateinamen müssen auf .spec enden!
#end
