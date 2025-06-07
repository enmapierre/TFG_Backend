
const express = require ("express")

const Producto = require ("./models/producto.model")

const app = express()

const mongoose = require("mongoose")
const producto = require("./models/producto.model")
mongoose.connect("mongodb+srv://enmapiedrafernandez:ht9mH1W9T69DzjpH@cluster0.iggszwx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>console.log("Conectado bbdd"))

app.use(express.json())
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

app.put("/productos/:id",async(req,res) => {
    const {id}=req.params

    const UpDateProduct = req.body
    try{
        const UpDatedProducto = await Producto.findByIdAndUpdate(id,UpDateProduct,{new : true})
        if (!UpDatedProducto){
            return res.status(404).json({message: "Error proucto no encontrado"})
        }
        res.json(UpDatedProducto)
    }catch(err){
        console.error(err)
        res.status(500).json({message:"Error al actualizar producto"})
    }
})


