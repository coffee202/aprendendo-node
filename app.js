const express = require ("express")
const app = express()
const bodyParser = require ("body-parser")
const { url } = require("inspector")
const { mongo } = require("mongoose")
const MongoClient = require ("mongodb").MongoClient
const port = "3000"
const ObjectId = require('mongodb').ObjectID
const uri = " mongodb+srv://marlon:2003@estudo.w5e4f.gcp.mongodb.net/marlon?retryWrites=true&w=majority"

MongoClient.connect(uri, (err, client) =>{
    if(err) return console.log(err)
     db = client.db('estudo')

    app.listen(port, () =>{
        console.log("esta ouvindo a porta ", port)
    })
})
app.use(bodyParser.urlencoded({ extended : true}))
app.use = port 
app.use = ("view engine", "esj")

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/', (req, res) => {
    var cursor = db.collection('data').find()
})

app.get('/show', (req, res) => {
    db.collection('data').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('show.ejs', { data: results })

    })
})

app.post('/show', (req, res) => {
    db.collection('data').save(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log('Salvo no Banco de Dados')
        res.redirect('/show')
    })
})

app.route('/edit/:id')
.get((req, res) =>{
     var id = req.params.id
  
    
    db.collection('data').find(ObjectId(id)).toArray((err, result) =>{
        if(err) return res.send(err)
        res.render('edit.ejs', {data: result }) 
    })
})
.post((req, res) =>{
    var id = req.params.id
    var name = req.body.name
    var email = req.body.email

    db.collection('data').updateOne({_id : ObjectId(id)}, {
        $set: {
            name: name,
            email: email
        }
    }, (err, result) =>{
        if(err) return res.send(err)
        res.redirect('/show')
        console.log('atualizado na tabela')    
    })
})

app.route('/delete/:id')
.get((req, res) =>{
     var id = req.params.id
  
    
    db.collection('data').deleteOne({_id: ObjectId(id)}, (err, result) =>{
        if(err) return res.send(500, err)
        console.log('deletando registro')
        res.redirect('/show') 
    })
})