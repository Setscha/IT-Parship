#if($NAME.matches(".+[.]spec"))
#set($SERVICE_JS = $NAME.replaceAll("[.]spec$", ""))
#set($SERVICE = ${StringUtils.removeAndHump($SERVICE_JS, "-")})
#set($SERVICE_UNIT = $SERVICE + "Service")
"use strict";

expect("${SERVICE_UNIT}", () => {
    var $SERVICE;

    beforeEach(() => {
        module("???");
        inject(_${SERVICE}_ => $SERVICE = _${SERVICE}_);
    });
});
#else
// Unit-Test-Dateinamen müssen auf .spec enden!
#end
