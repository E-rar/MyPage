const express = require('express')
const app = express()
const mongoose = require('mongoose')
const projects = require('./models/projects.js')
require('dotenv').config()
const dbUri = `mongodb+srv://supercode:${process.env.MONGODB_PW}@supercode.fxgp9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
var cors = require('cors')
const formidable = require('formidable');

//====================MIDDLEWARES============================================
app.use(express.static('public'))
app.use(express.static('uploads'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const port = process.env.PORT||3000
app.use(cors())

//=====================BROWSE THE SERVER WITH MONGOOSE===========================

mongoose.connect(dbUri, () => {
    console.log('Database is connected')
    app.listen(port, () => {
        console.log(`listening at http://localhost:${port}`)
    })
})
//=====================ROUTING===================================================
app.get('/',(req,res)=>{
    projects.find()
    .then(results => {
        console.log(results)
        res.render('pages/index.ejs',{results})
    })
    .catch(err => console.log(err))
})

app.get('/projects',(req,res)=>{
    projects.find()
    .then(results => {
        console.log(results)
        res.render('pages/projects.ejs',{results})
    })
    .catch(err => console.log(err))
})
app.get('/add',(req,res)=>{
    projects.find()
    .then(results => {
        console.log(results)
        res.render('pages/add.ejs',{results})
    })
    .catch(err => console.log(err))
})
//=====================CRUD======================================================
app.post('/new', (req, res, next) => {
    const form = formidable({ multiples: true, uploadDir: './uploads', keepExtensions: true });

    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err)
            next(err);
            return;
        }

        let newProject = new projects({
            title: fields.title,
            git_url: fields.git_url,
            page_url:fields.page_url,
            description:fields.description,
            image_url: files.file.path.slice('uploads'.length)
        })
        newProject.save()
            .then(result => {
                console.log(result)
                res.redirect('/add')
            })
            .catch(err => console.log(err))

    });
});



