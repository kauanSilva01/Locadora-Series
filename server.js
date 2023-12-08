import {fastify} from 'fastify'
import { DatabaseMemory } from './database-memory.js'

const database = new DatabaseMemory()
const server = fastify()

server.get('/', () => {
    return 'Rota padrão'
})

server.post('/serie', (request, reply) => {
// Acessando dados do corpo da requisição
    const {nome, diretor, ncap} = request.body
// Exibindo dados
//    console.log(body)
   
    // return 'cadastrar'
    database.create({
        nome: nome,
        diretor: diretor,
        ncap: ncap,
    })

    return reply.status(201).send
})

server.get('/serie', (request) => {
    const search = request.query.search
    console.log(search)
    const series = database.list(search)
    console.log(series)
    return series
})

server.put('/series/:id', (request, reply) => {
    const serieId = request.params.id
    const {nome, diretor, ncap} = request.body
    const serie = database.update(serieId, {
        nome: nome,
        diretor: diretor,
        ncap: ncap,
    })
    return reply.status(204).send()
})

server.delete('/series/:id', (request, reply) => {
    const serieId = request.params.id

    database.delete(serieId)

    return reply.status(204).send()
}) 

server.listen({
    port: 3333,
})