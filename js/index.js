//import { isRegExp } from "util";

(async () => {
    let schedule_base = await $.getJSON("https://raw.githubusercontent.com/platipus25/whatsnext/master/examples/config_files/schedule2018-19.json"); // /schedule2018-19.json
    window.schedule_base = {...schedule_base}

    schedule_base = applyPersonalizedClasses(schedule_base)
    
    let nextSchool = new whatsnext.WhatsnextStatic(schedule_base, new Date()).enumerateNextClass().start.toDate()
    console.log(nextSchool)
    window.inst = new whatsnext.WhatsnextSim(schedule_base, 0, nextSchool);//new Date(2019, 2, 8, 9, 30));
    
    //window.inst = new whatsnext.Whatsnext(schedule_base);
    console.log(inst)
    updateFrame()

})()
console.log(whatsnext)

// pre-processing "methods"

let applyPersonalizedClasses = (base) => {
    periods = store.get("periodInfo")
    for(periodName in periods){
        let periodInfo = periods[periodName]
        let array = getAllInstancesOfClass(base, periodName)
        for(let instance of array){
            instance.class = {...instance.class, ...periodInfo}
            if(!instance.class.name){
                instance.class.name = periodName
            }
        }
    }

    return base
}

let getAllInstancesOfClass = (obj, periodName, found = []) => {
    if(!obj) return found
    let prototype = Object.getPrototypeOf(obj)
    if(prototype != Object.prototype && prototype != Array.prototype) return found
    //console.log(obj, periodName, found);
    for(fieldName in obj){
        let value = obj[fieldName]
        if(fieldName == "name" && value == periodName){
            found =  [...found, obj]
        }else {
            found = getAllInstancesOfClass(value, periodName, found)
        }
    }

    return found
} 

// frame handling "methods":

let numberToFancy = (num) => {
    let endings = ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"]
    num = Number(num)
    num = num.toFixed(0)
    let onesPlace = Number(num.charAt(num.length-1))
    let ending = endings[onesPlace]
    return `${num}${ending}`
}

let hasNumber = (str) => !isNaN(Number(str))

let countdown = (id) => {
    let countdownUnits = 0x004 | 0x008 | 0x010 | 0x020 | 0x040; // minutes | hours | days | weeks | months
    let value = inst[id](countdownUnits) || ""
    let node = $( `#${ id }` )
    let parent = node.parent()

    if(value){
        parent.show()
    }else{
        parent.hide()
    }
    
    if(value) value = value.toHTML("number")
    node.html(value)
}

let className = (id) => {
    let value = inst[id]() || ""
    let node = $( `#${ id }` )
    let parent = node.parent()

    if(value){
        parent.show()
    }else{
        parent.hide()
    }
    
    if(value) value = value.class.name.toString()
    if(hasNumber(value)) value = numberToFancy(value)

    node.text(value)
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