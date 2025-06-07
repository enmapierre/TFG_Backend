const cors = require("cors")
const express = require ("express")

const Producto = require ("./models/producto.model")

const app = express()

const mongoose = require("mongoose")
const producto = require("./models/producto.model")
mongoose.connect("mongodb+srv://enmapiedrafernandez:ht9mH1W9T69DzjpH@cluster0.iggszwx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>console.log("Conectado bbdd"))

app.use(cors())
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

app.put("/productos/:id", async (req, res) => {
    const { id } = req.params;
    const updateProduct = req.body;
    console.log("Datos recibidos:", updateProduct);
    
    try {
        const oldProducto = await Producto.findById(id);
        
        if (!oldProducto) {
            return res.status(404).json({ message: "Error: producto no encontrado" });
        }
        
        console.log("Producto encontrado:", oldProducto);
        console.log("Stock actual:", oldProducto.stock);
        console.log("Stock a descontar:", updateProduct.stock);
        
        const nuevoStock = oldProducto.stock - parseInt(updateProduct.stock);
        console.log("Nuevo stock:", nuevoStock);
        
        if (nuevoStock <= 0) {
            return res.status(400).json({ 
                message: "Stock insuficiente", 
                stockDisponible: oldProducto.stock 
            });
        }
        
        const updatedProducto = await Producto.findByIdAndUpdate(
            id,
            { stock: nuevoStock },
            { new: true } 
        );
        
        console.log("Producto actualizado:", updatedProducto);
        res.json(updatedProducto);
        
    } catch (err) {
        console.error("Error completo:", err);
        res.status(500).json({ message: "Error al actualizar producto" });
    }
});

