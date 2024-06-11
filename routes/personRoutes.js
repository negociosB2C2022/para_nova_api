const router = require("express").Router()

//importando os modules
const Person = require("../models/Persons")

//CREATE - CRUD
router.post('/', async(req, res)=>{
    const person= {
        name: req.body.name, 
        salary: req.body.salary, 
        approved: req.body.approved
    }
    if(!person.name){
        res.status(422).json({message: "não foi passado nenhum parâmetro para ser salvo!"})
    }


    //enviando os dados para o bd método:create
    //o try-catch é usado para tratar erros de uma ação 
    try {
        await Person.create(person)
        res.status(200).json({message: "Pessoa inserida no sistema com sucesso!"})
    } catch (error) {
       res.status(500).json({erro: error})
    }
})























//READ - CRUD
router.get('/', async(req, res)=>{
    try {
        const people = await Person.find()
        res.status(200).json({
            message: "resultados do bc",
            result: people
        })
    } catch (error) {
        res.status(500).json({erro: error})
    }
})
router.get('/:id', async(req, res)=>{

    //extraindo dado pela url
    const id = req.params.id

    try {
        const person = await Person.findOne({name: id})

        if(!person){
            res.status(422).json({
                messagem: "pessoa NÃO encontrada."
            })
            return
        }

        res.status(200).json({
            menssagem: "pessoa encontrada",
            pessoa: person
        })

    } catch (error) {
        res.status(500).json({erro: error})
    }
})























// UPDATE - CRUD
//PUT -> atualiza o objeto por inteiro 
//PATCH - atualiza o objeto por partes
router.patch('/:id', async(req, res)=>{
    const id= req.params.id
    const body= req.body
    const person= {
        name: body.name,
        salary: body.salary,
        approved: body.approved
    }

    try {
        const patchPerson = await Person.updateOne({name: id}, person)
        if(patchPerson.matchedCount === 0){
            res.status(500).json({
                messagem: "não foi possível realizar a atualização.",
                erro: "usuário não encontrado"
            })
            return
        }
        res.status(200).json({
            messagem: "atualiza realizada!",
            atualizado: person

        })

    } catch (error) {
        res.status(500).json({errorrr: error})
    }
})























//DELETE - CRUD
router.delete('/:id', async(req, res)=>{
    const id= req.params.id

    try {
        const userDeleted = await Person.deleteOne({name: id})
        if(userDeleted.deletedCount === 0){
            res.status(500).json({
                messagem: "NÃO deletado!"
            })
            return
        }

        res.status(200).json({
            messagem: id+ " deletado!"
        })

    } catch (error) {
        res.status(500).json({errorrr: error})
    }
})
























module.exports = router