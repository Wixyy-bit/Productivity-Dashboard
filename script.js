const apps = document.querySelectorAll(".app")
const fullpage = document.querySelectorAll(".fullPage")
const close = document.querySelectorAll(".close")

apps.forEach(function (app) {
    app.addEventListener("click", function (dets) {
            if(dets.target.id === "motivatio-img"){
                getquote()
            }
        fullpage.forEach(function () {
            fullpage[app.id].style.display = "block"            
        })
    })

})

close.forEach(function (btn) {
    btn.addEventListener("click", function () {
        fullpage.forEach(function () {
            fullpage[btn.id].style.display = "none"
        })
    })
})



let taskdata = []

if(localStorage.getItem("currenttask")){
    taskdata = JSON.parse(localStorage.getItem("currenttask"))
}


const todoform = document.getElementById("todoform")
const todoinput = document.querySelector("#todoform input")
const todoarea = document.querySelector(".todoarea")
let alltask = document.querySelector(".todoactions .right")
let countdiv = document.querySelector("#count")

function rendertask(){
    let sum = ""
    taskdata.forEach(function(task, count){
        sum += `<div class="task">
        <h2>${task.title}</h2>
        <button id="${count}" class="mark-com">Mark Completed</button>
        </div>`
    })
    alltask.innerHTML = sum
    countdiv.innerHTML = taskdata.length
}
rendertask()

todoform.addEventListener("submit", function (e) {
    e.preventDefault()
    taskdata.push({title:todoinput.value})
    rendertask()
    todoinput.value = ""
    todoarea.value = ""
    localStorage.setItem("currenttask", JSON.stringify(taskdata))
})

alltask.addEventListener("click", function (e) {
    if (e.target.classList.contains("mark-com")) {
        taskdata.splice(e.target.id, 1)
        rendertask()
    }
})



let alltasktime = ""
let palnner = document.querySelector(".planner")
let dailydata = []

if(localStorage.getItem("dailydata")){
    dailydata = JSON.parse(localStorage.getItem("dailydata"))
}
let times = []
for (let i = 6; i < 18; i++) {
    times.push(`${i}:00 - ${i + 1}:00`)
}
times.forEach(function(time, idx){
    alltasktime = alltasktime + `<div class="plan">
                        <div class="time-border">
                            <div class="h3">${time}</div>
                        </div>
                        <input type="text" id="${idx}" placeholder="Enter your task" value="${dailydata[idx] || ""}">
                    </div>`
})
palnner.innerHTML = alltasktime;

let dailyinputs = document.querySelectorAll(".plan input")
dailyinputs.forEach(function(input){
    input.addEventListener("input", function(){
        dailydata[input.id] = input.value
        localStorage.setItem("dailydata", JSON.stringify(dailydata))
    })
})


let author = document.querySelector(".motivation-main p")
let quote = document.querySelector(".motivation-main h2")

async function getquote() {
    let responce = await fetch('https://dummyjson.com/quotes')
    let data = await responce.json()

    let rendomquotenum = Math.floor(Math.random()*30)

    quote.innerHTML = data.quotes[rendomquotenum].quote
    author.innerHTML = "-" + data.quotes[rendomquotenum].author
 
}


const starttimer = document.querySelector("#start-timer")
const pausetimer = document.querySelector("#pause-timer")
const resettimer = document.querySelector("#reset-timer")
let time = document.querySelector(".timer-full h2")
let update = document.querySelector(".timer-full .update h3")
let updatesection = document.querySelector(".timer-full .update")



let intervalclock = null
let worksession = true
let totalsec = 25 * 60
let sessionCompleted = false

function updatetimer() {
    let minutes = Math.floor(totalsec / 60)
    let seconds = totalsec % 60
    time.innerHTML = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
}

function startclock() {

    if (intervalclock) return

    if (sessionCompleted) {
        update.innerHTML = `${worksession ? "Break": "Work session"}`
        updatesection.style.backgroundColor = `${worksession ? "rgb(37, 222, 83)": "rgb(0, 115, 255)"}`
        worksession = !worksession
        totalsec = worksession ? 25 * 60 : 5 * 60
        sessionCompleted = false
        updatetimer()
    }

    intervalclock = setInterval(() => {
        if (totalsec > 0) {
            totalsec--
            updatetimer()
        } else {
            clearInterval(intervalclock)
            intervalclock = null
            sessionCompleted = true
        }
    }, 1000)
}

function pauseclock() {
    clearInterval(intervalclock)
    intervalclock = null
}

function resetclock() {
    pauseclock()
    worksession = true
    totalsec = 25 * 60
    sessionCompleted = false
    updatetimer()
}

starttimer.addEventListener("click", startclock)
pausetimer.addEventListener("click", pauseclock)
resettimer.addEventListener("click", resetclock)

updatetimer()


let temp = document.querySelector(".weather .right h1")
let ws = document.querySelector("#ws")
let wd = document.querySelector("#wd")
let Wtime = document.querySelector(".weather .left p")
let thetime = document.querySelector("#thetime")


fetch(`https://api.open-meteo.com/v1/forecast?latitude=23.2&longitude=72.58&current_weather=true`)
  .then(res => res.json())
  .then(function(data){
    temp.innerHTML = data.current_weather.temperature
    console.log(data);
    ws.innerHTML = `${data.current_weather.windspeed}${data.current_weather_units.windspeed}`
    wd.innerHTML = `${data.current_weather.winddirection}${data.current_weather_units.winddirection}`
    Wtime.innerHTML = data.current_weather.time.slice(0, 10)
    thetime.innerHTML = data.current_weather.time.slice(11, 15).padStart(2, "0")
  });


