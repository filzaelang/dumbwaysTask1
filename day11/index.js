const express = require('express')
const path = require('path')
const app = express()
const port = 3000

// app.set = buat setting varible global, configuratoin, dll
app.set("view engine", "hbs")
app.set("views", path.join(__dirname, 'src/views'))

app.use("/assets", express.static('src/assets'))
app.use(express.urlencoded({ extended: false }))

app.get('/', home)
app.get('/addproject', addProjectView)
app.post('/addproject', addProject)
app.get('/project-detail/:id', projectDetail)
app.get('/testimonials', testimonial)
app.get('/contact', contact)


function home(req, res) {

    const data =
        [
            {
                id: "1",
                title: "Title 1",
                content: "Content 1"
            },
            {
                id: "2",
                title: "Title 2",
                content: "Content 2"
            },
            {
                id: "3",
                title: "Title 3",
                content: "Content 3"
            },
            {
                id: "4",
                title: "Title 4",
                content: "Content 4"
            }
        ]

    res.render('index', { data })
}

function addProjectView(req, res) {
    res.render('myProject')
}

function addProject(req, res) {
    const title = req.body.projectName
    const startDate = req.body.startDate
    const endDate = req.body.endDate
    const content = req.body.description
    const nodeJs = req.body.nodeJss
    const reactJs = req.body.reactJs
    const nextJs = req.body.nextJs
    const typeScript = req.body.typeScript

    console.log("Title :", title)
    console.log("Start Date :", startDate)
    console.log("End Date :", endDate)
    console.log("Content :", content)
    console.log("Node Js :", nodeJs)
    console.log("React Js :", reactJs)
    console.log("Next Js :", nextJs)
    console.log("TypeScript :", typeScript)

    res.redirect('/addproject')
}

function projectDetail(req, res) {
    const id = req.params.id
    const title = "Ini Judul Dummy"
    const content = "Ini konten dummy"

    const data = {
        id,
        title,
        content
    }

    res.render('projectDetail', { data })
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