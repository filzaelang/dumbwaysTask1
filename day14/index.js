const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const config = require('./src/config/config.json')
const { Sequelize, QueryTypes } = require('sequelize')
const sequelize = new Sequelize(config.development)
const Handlebars = require('handlebars');
Handlebars.registerHelper('ifCond', function (v1, v2, options) {
    if (v1 == v2)
        return options.fn(this);
    else
        return options.inverse(this);
});

Handlebars.registerHelper('exCond', function (v1, v2, options) {
    if (v1 != v2)
        return options.fn(this);
    else
        return options.inverse(this);
});


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

async function home(req, res) {
    const query = 'SELECT * FROM tb_projects'
    const obj = await sequelize.query(query, { type: QueryTypes.SELECT })
    console.log(obj)

    for (const ob of obj) {
        const duration = await calculateDuration(ob.start_date, ob.end_date);
        ob.duration = duration;
    }

    res.render('index', { data: obj })
}

function addProjectView(req, res) {
    res.render('myProject')
}

async function addProject(req, res) {

    const { startDate, endDate, description, nodeJs, reactJs, nextJs, typeScript } = req.body
    const name = req.body.projectName
    const image = "Megumi.jpg"

    // Ensure that boolean values are set to false if they are undefined
    const nodeJsValue = nodeJs !== undefined ? nodeJs : false;
    const nextJsValue = nextJs !== undefined ? nextJs : false;
    const reactJsValue = reactJs !== undefined ? reactJs : false;
    const typeScriptValue = typeScript !== undefined ? typeScript : false;

    const query = `INSERT INTO tb_projects(name, start_date, end_date, description, image, "nodeJs", "nextJs", "reactJs", "typeScript") 
                    VALUES('${name}', '${startDate}', '${endDate}', '${description}', '${image}', '${nodeJsValue}', '${nextJsValue}', '${reactJsValue}', '${typeScriptValue}')`
    const obj = await sequelize.query(query, { type: QueryTypes.INSERT })


    res.redirect('/')
}

async function projectNewView(req, res) {
    const id = req.params.id

    const query = `SELECT * FROM tb_projects WHERE id=${id}`
    const obj = await sequelize.query(query, { type: QueryTypes.SELECT })

    res.render('myProjectUpdate', { data: obj[0] })
}

async function projectNew(req, res) {
    const { id, startDate, endDate, description, nodeJs, reactJs, nextJs, typeScript } = req.body
    const name = req.body.projectName
    // Ensure that boolean values are set to false if they are undefined
    const nodeJsValue = nodeJs !== undefined ? nodeJs : false;
    const nextJsValue = nextJs !== undefined ? nextJs : false;
    const reactJsValue = reactJs !== undefined ? reactJs : false;
    const typeScriptValue = typeScript !== undefined ? typeScript : false;

    const query = `UPDATE tb_projects 
                SET name='${name}', start_date='${startDate}', end_date='${endDate}', description='${description}', "nodeJs"='${nodeJsValue}', "nextJs"='${nextJsValue}', "reactJs"='${reactJsValue}', "typeScript"='${typeScriptValue}'
                WHERE id=${id}`
    const obj = await sequelize.query(query, { type: QueryTypes.UPDATE })

    res.redirect('/')
}

async function deleteProject(req, res) {
    const { id } = req.params

    const query = `DELETE FROM tb_projects WHERE id=${id}`
    const obj = await sequelize.query(query, { type: QueryTypes.DELETE })

    res.redirect('/')
}

async function projectDetail(req, res) {
    const id = req.params.id

    const query = `SELECT * FROM tb_projects WHERE id=${id}`
    const obj = await sequelize.query(query, { type: QueryTypes.SELECT })

    const startDate = obj[0].start_date
    const endDate = obj[0].end_date

    //function to get duration  **************************************/
    const distanceFinal = await calculateDuration(startDate, endDate)
    //************************************************************************ */

    //function to format date ***************************************/
    const formattedStartDate = await formatedDate(startDate)
    const formattedEndDate = await formatedDate(endDate)
    //************************************************************************ */

    res.render('projectDetail', { data: obj[0], distanceFinal, formattedStartDate, formattedEndDate })
}

function testimonial(req, res) {
    res.render('testimonials')
}

function contact(req, res) {
    res.render('contact')
}

async function calculateDuration(startDate, endDate) {
    let startDateObject = new Date(startDate);
    let milisecondsStartDate = startDateObject.getTime();

    let endDateObject = new Date(endDate);
    let milisecondsEndDate = endDateObject.getTime();

    const distance = milisecondsEndDate - milisecondsStartDate;

    const distanceYear = Math.floor(distance / 1000 / 60 / 60 / 24 / 30 / 12);
    const distanceMonth = Math.floor(distance / 1000 / 60 / 60 / 24 / 30);
    const distanceDay = Math.floor(distance / 1000 / 60 / 60 / 24);

    let distanceFinal = '';

    if (distanceYear > 0) {
        distanceFinal = `${distanceYear} tahun`;
    } else if (distanceMonth > 0) {
        distanceFinal = `${distanceMonth} bulan`;
    } else if (distanceDay > 0) {
        distanceFinal = `${distanceDay} hari`;
    }

    return distanceFinal;
}

async function formatedDate(date) {
    // Format startDate to "25 Nov 2023"
    let dateObject = new Date(date);
    const formattedDate = dateObject.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });

    return formattedDate;
}


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})