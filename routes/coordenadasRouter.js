const router = require("express").Router()

//importando os modules
const Coordenadas= require("../models/Coordenadas")


router.post('/', async(req, res)=>{
    const newCoord= {
        name: "manoell",
        coord: "-9.662789, -35.754759",
        data: "10/06/20244 19:04"
    }

    try {
        await Coordenadas.create(newCoord)
        res.status(200).json({message: "Coordenada inserida no sistema com sucesso!"})
    } catch (error) {
       res.status(500).json({erro: error})
    }
})

router.post('/new', async(req, res)=>{
    const newC= req.body.c

    try {
        await Coordenadas.create(newC)
        res.status(200).json({message: "Coordenadas salva com sucesso!", status: true})
        
    } catch (error) {
       res.status(500).json({erro: error})
    }
})





















router.get('/', async(req, res)=>{
    try {
        const people = await Coordenadas.find()
        res.status(200).json({
            message: "Coordenadas no sistema",
            result: people
        })
    } catch (error) {
        res.status(500).json({erro: error})
    }
})


module.exports = router