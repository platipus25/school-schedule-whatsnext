window.periods = {
    "1": {},
    "2": {},
    "3": {},
    "4": {},
    "5": {},
    "6": {},
    "7": {},
    "8": {},    
}


let load = (periodsList = periods) => {
    for(period in periodsList){
        $(`#${period}-teacher`).val(periodsList[period].teacher || "")
        $(`#${period}-subject`).val(periodsList[period].subject || "")
    }
}

let get = (periodList = periods) => {
    let list = {...periodList}
    for(period in list){
        list[period].teacher = $(`#${period}-teacher`).val()
        list[period].subject = $(`#${period}-subject`).val()
    }
    periodList = list
    return list
}


$("#classes").on("submit", (event) => {
    event.preventDefault()
    console.log(event)
    get()
    store.set("periodInfo", periods)
})

$(document).ready(() => {
    periods = store.get("periodInfo")
    for(period in periods){
        let addon = $(`
            <h4>Period ${period}:</h4>
            <input id="${period}-subject" placeholder="Subject" value="${periods[period].subject || ""}"/>
            <input id="${period}-teacher" placeholder="Teacher" value="${periods[period].teacher || ""}"/>
        `)
    
        $("#classes").append(addon)
    }
    
    $("#classes").append($("<input type='submit'/>"))

})

/*setInterval(() => {
    store.set("periodInfo", periods)
    load()
}, 5000)*/  // very annoying when trying to input data