#if($NAME.matches(".+[.]spec"))
#set($FILTER_JS = $NAME.replaceAll("[.]spec$", ""))
#set($FILTER = ${StringUtils.removeAndHump($FILTER_JS, "-")})
#set($FILTER_FUNC = $FILTER.substring(0, 1).toLowerCase() + $FILTER.substring(1))
#set($FILTER_UNIT = $FILTER_FUNC + "Filter")
"use strict";

expect("${FILTER_UNIT}", () => {
    var $FILTER_FUNC;

    beforeEach(() => {
        module("???");
        inject(_${FILTER_UNIT}_ => $FILTER_FUNC = _${FILTER_UNIT}_);
    });
});
#else
// Unit-Test-Dateinamen müssen auf .spec enden!
#end
