
const express = require ("express")

const Producto = require ("./models/producto.model")

const app = express()

const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://enmapiedrafernandez:ht9mH1W9T69DzjpH@cluster0.iggszwx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>console.log("Conectado bbdd"))


app.listen(8080, ()=> console.log ('Servidor levantado'))


app.get("/productos",(req,res) => { //end-point
    Producto.find().then(productos=>res.json(productos))
})

//ht9mH1W9T69DzjpH
//enmapiedrafernandez

app.get("/productos/oro",(req,res) => { //end-point
    Producto.find({category:"oro"}).then(productos=>res.json(productos))
})

app.get("/productos/plata",(req,res) => { //end-point
    Producto.find({category:"plata"}).then(productos=>res.json(productos))
})

app.get("/productos/bisuteria",(req,res) => { //end-point
    Producto.find({category:"bisuteria"}).then(productos=>res.json(productos))
})

app.get("/productos/summer",(req,res) => { //end-point
    Producto.find({category:"summer"}).then(productos=>res.json(productos))
})


