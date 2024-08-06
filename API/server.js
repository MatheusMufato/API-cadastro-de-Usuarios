import express from 'express'
import { PrismaClient } from '@prisma/client'
import { AggregationCursor } from 'mongodb'
import cors from 'cors'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors())

app.post('/usuarios', async (req, res) => {         //criar usuarios

    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
            
        }
    })

    res.status(201).json(req.body)

})

app.get('/usuarios', async (req, res) => {          //listar usuarios
    
let users = []

    if(req.query) {
        users = await prisma.user.findMany({
            where: {
                name: {
                    contains: req.query.name
                    
                }/*
                email: {
                    contains: req.query.email
                }
                age: {
                    contains: req.query.age*/
            }
        })
    } else {
        users = await prisma.user.findMany()
    }
    
    res.status(200).json(users)
    })

app.put('/usuarios/:id', async (req, res) => {      //editar usuarios

        await prisma.user.update({
            where: {
                id: req.params.id
            },
            data: {
                email: req.body.email,
                name: req.body.name,
                age: req.body.age
                
            }
        })
    
        res.status(201).json(req.body)
    
    })

app.delete('/usuarios/:id', async (req, res) => {   //deletar usuarios
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(200).send({message : "Usuario deletado com sucesso"})

})



app.listen(3000)


/* criar API de Usuarios

    -listar usuarios
    -criar usuarios
    -editar usuarios
    -deletar usuarios

*/

/*  matheus  NQB7qIM63AiWs7nx  */