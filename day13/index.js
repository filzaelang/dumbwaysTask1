const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const config = require('./src/config/config.json')
const { Sequelize, QueryTypes } = require('sequelize')
const sequelize = new Sequelize(config.development)

// app.set = buat setting varible global, configuratoin, dll
app.set("view engine", "hbs")
app.set("views", path.join(__dirname, 'src/views'))

app.use("/assets", express.static('src/assets'))
app.use(express.urlencoded({ extended: false }))

app.get('/', home)
app.get('/addproject', addProjectView)
app.post('/addproject', addProject)

app.get('/projectNew/:id', projectNewView)
app.post('/projectNew/', projectNew)

app.post('/delete-project/:id', deleteProject)

app.get('/project-detail/:id', projectDetail)
app.get('/testimonials', testimonial)
app.get('/contact', contact)

const data = []


// function home(req, res) {
//     res.render('index', { data })
// }

async function home(req, res) {
    const query = 'SELECT * FROM tb_projects'
    const obj = await sequelize.query(query, { type: QueryTypes.SELECT })
    console.log(obj)

    res.render('index', { data: obj })
}

function addProjectView(req, res) {
    res.render('myProject')
}

function addProject(req, res) {

    const { startDate, endDate, description, nodeJs, reactJs, nextJs, typeScript } = req.body
    const title = req.body.projectName
    let postAt = new Date()

    //function to render icon   ***************************************/
    let iconsHTML = '';

    if (nodeJs == "NodeJs") {
        iconsHTML += '<i class="fa-brands fa-node-js"></i>';
    }

    if (reactJs == "ReactJs") {
        iconsHTML += '<i class="fa-brands fa-react"></i>';
    }

    if (nextJs == "NextJs" || typeScript == "TypeScript") {
        iconsHTML += '<i class="fa-brands fa-square-js"></i>';
    }
    //************************************************************ */

    //function to get duration  **************************************/
    let startDateObject = new Date(startDate)
    let milisecondsStartDate = startDateObject.getTime()

    let endDateObject = new Date(endDate)
    let milisecondsEndDate = endDateObject.getTime()

    const distance = milisecondsEndDate - milisecondsStartDate

    const distanceYear = Math.floor(distance / 1000 / 60 / 60 / 24 / 30 / 12)
    const distanceMonth = Math.floor(distance / 1000 / 60 / 60 / 24 / 30)
    const distanceDay = Math.floor(distance / 1000 / 60 / 60 / 24)

    let distanceFinal = ``

    if (distanceYear > 0) {
        distanceFinal = `${distanceYear} tahun`
    } else if (distanceMonth > 0) {
        distanceFinal = `${distanceMonth} bulan`
    } else if (distanceDay > 0) {
        distanceFinal = `${distanceDay} hari`
    }
    //************************************************************************ */

    const dataProject = {
        title,
        startDate,
        endDate,
        duration: distanceFinal,
        description,
        technologies: iconsHTML,
        postAt,
        nodeJs, reactJs, nextJs, typeScript
    }

    data.unshift(dataProject)
    res.redirect('/')
}

function projectNewView(req, res) {
    const id = req.params.id

    const dataFilter = data[parseInt(id)]
    dataFilter.id = parseInt(id)

    res.render('myProjectUpdate', { data: dataFilter })
}

function projectNew(req, res) {
    const { startDate, endDate, description, nodeJs, reactJs, nextJs, typeScript } = req.body
    const title = req.body.projectName
    const id = req.body.id
    let postAt = new Date()

    //function to render icon   ***************************************/
    let iconsHTML = '';

    if (nodeJs == "NodeJs") {
        iconsHTML += '<i class="fa-brands fa-node-js"></i>';
    }

    if (reactJs == "ReactJs") {
        iconsHTML += '<i class="fa-brands fa-react"></i>';
    }

    if (nextJs == "NextJs" || typeScript == "TypeScript") {
        iconsHTML += '<i class="fa-brands fa-square-js"></i>';
    }
    //************************************************************ */

    //function to get duration  **************************************/
    let startDateObject = new Date(startDate)
    let milisecondsStartDate = startDateObject.getTime()

    let endDateObject = new Date(endDate)
    let milisecondsEndDate = endDateObject.getTime()

    const distance = milisecondsEndDate - milisecondsStartDate

    const distanceYear = Math.floor(distance / 1000 / 60 / 60 / 24 / 30 / 12)
    const distanceMonth = Math.floor(distance / 1000 / 60 / 60 / 24 / 30)
    const distanceDay = Math.floor(distance / 1000 / 60 / 60 / 24)

    let distanceFinal = ``

    if (distanceYear > 0) {
        distanceFinal = `${distanceYear} tahun`
    } else if (distanceMonth > 0) {
        distanceFinal = `${distanceMonth} bulan`
    } else if (distanceDay > 0) {
        distanceFinal = `${distanceDay} hari`
    }
    //************************************************************************ */

    data[parseInt(id)] = {
        title,
        startDate,
        endDate,
        duration: distanceFinal,
        description,
        technologies: iconsHTML,
        postAt,
        nodeJs, reactJs, nextJs, typeScript
    }

    res.redirect('/')
}

function deleteProject(req, res) {
    const { id } = req.params

    data.splice(id, 1)
    res.redirect('/')
}

function projectDetail(req, res) {
    const id = req.params.id

    const dataFilter = data[parseInt(id)]

    res.render('projectDetail', { data: dataFilter })
}

function testimonial(req, res) {
    res.render('testimonials')
}

function contact(req, res) {
    res.render('contact')
}


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})