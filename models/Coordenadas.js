const mongoose= require("mongoose")

const Coordenadas = mongoose.model("Coordenadas", {
    name: String,
    coord: String,
    data: String,
})

module.exports = Coordenadas