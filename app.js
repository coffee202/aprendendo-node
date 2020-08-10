const express = require ("express")
const app = express()
const bodyParser = require ("body-parser")

const port = "3000"

app.use(bodyParser.urlencoded({ extended : true}))
app.use = port 
app.use = ("view engine", "esj")

app.listen(port, () =>{
    console.log("esta ouvindo a porta ", port)
})


app.get  ('/' , (req, res) => {
    res.render("index.ejs")  
})

app.post("/show", (req, res) =>{
    console.log( req.body )
    res.send("feito")    
})

