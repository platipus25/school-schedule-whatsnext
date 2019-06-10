
(async () => {

    let schedule_base = await $.getJSON("https://raw.githubusercontent.com/platipus25/whatsnext/master/examples/config_files/schedule2018-19.json"); // /schedule2018-19.json
    let nextSchool = new whatsnext.WhatsnextStatic(schedule_base, new Date()).enumerateNextClass().start.toDate()
    console.log(nextSchool)
    window.inst = new whatsnext.WhatsnextSim(schedule_base, 1, nextSchool);//new Date(2019, 2, 8, 9, 30));
    console.log(inst)
    updateFrame()

})()

let updateFrame = () => {
    let root = $("#container")
    root
}