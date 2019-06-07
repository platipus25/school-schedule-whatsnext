
(async () => {
    let ky = await import("/js/ky.min.js")

    let schedule_base = await ky.default("https://raw.githubusercontent.com/platipus25/whatsnext/master/examples/config_files/schedule2018-19.json").json(); // /schedule2018-19.json
    window.inst = new whatsnext.Whatsnext(schedule_base, new Date());
    console.log(inst)

})()

let updateFrame = () => {
    let root = $("#container")
    root
}