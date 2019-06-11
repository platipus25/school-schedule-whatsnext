(async () => {
    let schedule_base = await $.getJSON("https://raw.githubusercontent.com/platipus25/whatsnext/master/examples/config_files/schedule2018-19.json"); // /schedule2018-19.json
    let nextSchool = new whatsnext.WhatsnextStatic(schedule_base, new Date()).enumerateNextClass().start.toDate()
    console.log(nextSchool)
    window.inst = new whatsnext.WhatsnextSim(schedule_base, 1, nextSchool);//new Date(2019, 2, 8, 9, 30));
    console.log(inst)
    updateFrame()

})()

let countdown = (id) => {
    let value = inst[id]() || ""
    let node = $( `#${ id }` )
    let parent = node.parent()
    
    if(value) value = value.toHTML("number")
    node.html(value)
   
    if(value){
        parent.show()
    }else{
        parent.hide()
    }
}

let className = (id) => {
    let value = inst[id]() || ""
    let node = $( `#${ id }` )
    let parent = node.parent()
    
    if(value) value = value.class.name.toString()
    node.text(value)

    if(value){
        parent.show()
    }else{
        parent.hide()
    }
}

let percent = () => {
    let value = inst.percent || 0
    let node = $( "#percent" )
    let bar_node = $( "#percent_bar" )
    let parent = node.parent()

    bar_node.css("width", `${value}%`)
    bar_node.css("margin-left", `calc(50% - ${value/2}%)`)

    node.text(`${value.toFixed(1)}%`) // value.toFixed(0)

    if(value){
        parent.show()
    }else{
        parent.hide()
    }
}

let updateFrame = () => {
    //let inst = window.inst
    countdown("thisClassCountdown")
    countdown("enumerateNextClassCountdown")
    countdown("endOfSchoolCountdown")
    className("thisClass")
    className("enumerateNextClass")
    percent()
    
}

setInterval(updateFrame, 1000)