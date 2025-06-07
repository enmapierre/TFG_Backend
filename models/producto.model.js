const mongoose = require("mongoose")
const productoSchema = mongoose.Schema({
    title: String,
    price: Number,
    description: String,
    image: String,
    stock: Number,
    category: String,
})

const producto = mongoose.model("productos", productoSchema)

module.exports = producto