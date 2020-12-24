const path = require("path")
const express = require("express")
const hbs = require("hbs")
const forecast = require("./utils/forecast.js")
const geocode = require("./utils/geocode.js")

const app = express()
const publicDirPath = path.join(__dirname, "../public")

const viewPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")
const port = process.env.PORT || 3000


app.set("view engine", "hbs")
app.set("views", viewPath)
app.use(express.static(publicDirPath))
hbs.registerPartials(partialsPath)

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Andrew Mead"
    })
})
app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        name: "Andrew"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        message: "PLEASE CHECK THIS PAGE",
        title: "HELPING YOU",
        name: "Andrew Mead"
    })
})
app.get("/weather", (req, res) => {
    if (!req.query.location) {
        return res.send({
            error: "You must provide a location"
        })
    }
    geocode(req.query.location, (error, data) => {
        if (error) {
            return res.send({ error })
        }
        forecast(data, (error, forecastData) => {
            if (error) {
                return "Unable to connect to weather service"
            }
            res.send({
                location: data.location,
                temperature: `${forecastData.temperature} degree Celcius`,
                weather: forecastData.weather[0],
                precipitation: `${forecastData.precipitation} mm`,
                humidity: `${forecastData.humidity} %`
            })
        })
    })
})

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: 404,
        errorMessage: "Help Article NOT Found",
        name: "Andrew Mead"
    })
})

app.get("*", (req, res) => {
    res.render("404", {
        title: 404,
        errorMessage: "Page NOT FOUND.",
        name: "Andrew Mead"
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
}) 