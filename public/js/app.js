// client side

fetch("http://puzzle.mead.io/puzzle", {}).then((response) => {
    response.json().then((data) => {
        console.log(data.puzzle)
    })
}).catch((error) => {
    console.log(error)
})

const weatherForm = document.querySelector("form")
weatherForm.addEventListener("submit", (e) => {
    e.preventDefault()
    fetch(`http://localhost:3000/weather?location=${e.target.elements.searchLocation.value}`, {}).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
                createDom(data.error, undefined)
            } else {
                console.log(data)
                createDom(undefined, data)
            }
        })
    })
    e.target.elements.searchLocation.value = ""
})

const createDom = (error, data) => {

    const forecast = document.querySelector("#forecast")
    forecast.innerHTML = ""
    const location = document.createElement("h3")
    const precip = document.createElement("p")
    const weather = document.createElement("p")
    const temp = document.createElement("p")

    if (error) {
        location.textContent = error
        return forecast.appendChild(location)
    }

    temp.textContent = data.temperature
    location.textContent = data.location
    precip.textContent = data.precipitation
    weather.textContent = data.weather

    forecast.appendChild(location)
    forecast.appendChild(weather)
    forecast.appendChild(temp)
    forecast.appendChild(precip)
}