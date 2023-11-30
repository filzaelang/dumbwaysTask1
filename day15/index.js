const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const config = require('./src/config/config.json')
const { Sequelize, QueryTypes } = require('sequelize')
const sequelize = new Sequelize(config.development)
const bcrypt = require('bcrypt')
const session = require('express-session')
const flash = require('express-flash')



// app.set = buat setting varible global, configuratoin, dll
app.set("view engine", "hbs")
app.set("views", path.join(__dirname, 'src/views'))

app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    name: "data",
    secret: 'zehahaha',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}))

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

app.get('/register', registerView)
app.post('/register', register)
app.get('/login', loginView)
app.post('/login', login)

const data = []


async function home(req, res) {
    const query = 'SELECT * FROM tb_projects'
    const obj = await sequelize.query(query, { type: QueryTypes.SELECT })
    console.log(obj)

    for (const ob of obj) {
        const duration = await calculateDuration(ob.start_date, ob.end_date);
        ob.duration = duration;
    }

    const isLogin = req.session.isLogin

    res.render('index', { data: obj, user: req.session.user, isLogin })
}

function addProjectView(req, res) {
    const isLogin = req.session.isLogin
    res.render('myProject', { user: req.session.user, isLogin })
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
    const isLogin = req.session.isLogin

    res.render('myProjectUpdate', { data: obj[0], user: req.session.user, isLogin })
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
    const isLogin = req.session.isLogin

    res.render('projectDetail', { data: obj[0], distanceFinal, formattedStartDate, formattedEndDate, user: req.session.user, isLogin })
}

function testimonial(req, res) {
    const isLogin = req.session.isLogin
    res.render('testimonials', { user: req.session.user, isLogin })
}

function contact(req, res) {
    const isLogin = req.session.isLogin
    res.render('contact', { user: req.session.user, isLogin })
}

function loginView(req, res) {
    const isLogin = req.session.isLogin
    res.render('login', { user: req.session.user, isLogin })
}

async function login(req, res) {
    const { email, password } = req.body
    const query = `SELECT * FROM users WHERE email='${email}'`
    const obj = await sequelize.query(query, { type: QueryTypes.SELECT })

    if (!obj.length) {
        console.error("user not registered!")
        req.flash('danger', 'Login failed : email/password is wrong!')
        return res.redirect('/login')
    }

    bcrypt.compare(password, obj[0].password, (err, result) => {
        if (err) {
            req.flash('danger', 'Login failed : internal server error!')
            console.error("Login : Internal Server Error!")
            return res.redirect('/login')
        }

        if (!result) {
            console.error("Password is wrong!")
            req.flash('danger', 'Login failed : email/password is wrong!')
            return res.redirect('/login')
        }

        console.log('Login success!')
        req.flash('success', 'Login success!')
        req.session.isLogin = true
        req.session.user = {
            name: obj[0].name,
            email: obj[0].email
        }

        res.redirect('/')
    })
}

async function register(req, res) {
    const { name, email, password } = req.body

    console.log("Name:", name)
    console.log("Email:", email)
    console.log("Password:", password)

    const salt = 10

    bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
            console.error("Password failed to be encrypted!")
            req.flash('danger', 'Register failed : password failed to be encrypted!')
            return res.redirect('/register')
        }

        const query = `INSERT INTO users(name, email, password) VALUES ('${name}', '${email}','${hash}')`

        await sequelize.query(query, { type: QueryTypes.INSERT })
        req.flash('success', 'Register success!')
        res.redirect('/')
    })
}

function registerView(req, res) {
    const isLogin = req.session.isLogin
    res.render('register', { user: req.session.user, isLogin })
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