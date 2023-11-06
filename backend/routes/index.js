import { Router } from 'express'
import prisma from "../prisma_client/index.js"
 const router = Router()

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body

    const user = await prisma.user.create({
        data: { name, email, password}
    })

    return res.json(user)
})

router.post('/getUser', async (req, res) => {
    const { name, password } = req.body

    const user = await prisma.user.findUnique({
        where: {
            name: name,
            password: password
        },
        select: {
            name: true,
            password: true
        }
    })

    return res.json(user)
})

router.post("/createItem", async (req, res) => {
    const { title, image } = req.body

    const item = await prisma.item.create( {
        data: { title, image}
    })

    return res.json(item)
})

router.get('/getTtem', async (req, res) => {
    const { title } = req.body

    const item = await prisma.item.findUnique({
        where: {
            title : title
        },

        select: {
            title: true,
            image : true
        }
    })

    return res.json(item)
})

router.get('/items', async (req, res) => {
    const items = await prisma.item.findMany({
        select: {
            title: true,
            image: true
        }
    })

    return res.json(items)
})

export default router