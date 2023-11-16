import { Router } from 'express'
import prisma from "../prisma_client/index.js"
import jwt from 'jsonwebtoken'
import auth from '../middlewares/auth.js'

const router = Router()

router.post('/register', async (req, res) => {
    const { username, email, password, is_Admin } = req.body
    const user = await prisma.user.create({
        data: { username, email, password, is_Admin }
    })

    return res.json(user)
})

router.post('/getAllUsers', async (req, res) => {
    const users = await prisma.user.findMany({
        select:{
            username:true,
            email:true,
            password:true,
            is_Admin:true
        }
    })

    return res.json(users)
})

router.post('/auth', async (req, res) => {
    
    const { username, password } = req.body

    const user = await prisma.user.findUnique({
        where: {
            username: username,
            password: password
        },
        select: {
            username: true
        }
    })
    const jwtToken = jwt.sign({profile : user.username}, "aqwdqwdeaqwdeqweqwe", {
        expiresIn: "1d"
    })

    return res.json({user, jwtToken})
})

router.post('/getUser', async (req,res) => {
    const { username } = req.body

    const user = await prisma.user.findUnique({
        where: {
            username: username
        },
        select: {
            username: true,
            email: true,
            password: true,
            is_Admin: true
        }
    })

    return res.json(user)
})

router.post("/createItem", auth,  async (req, res) => {
    const { title, image } = req.body
    
    const newItem = await prisma.item.create({
        data: { title, image }
    })
    return res.json(newItem)
})

router.post('/deleteItem', auth, async (req, res) => {
    const { id } = req.body

    const deleteItem = await prisma.item.delete({
        where : {
            id : id
        },
        select : {
            title : true
        }
    })

    return res.json(deleteItem)
})

router.get('/deleteAllItems', async (req, res) => {

    const deleteItems = await prisma.item.deleteMany({
        select : {
            count: true
        }
    })

    return res.json(deleteItems)
})

router.post('/getTtem', async (req, res) => {
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

router.get('/getAllItems', async (req, res) => {
    const items = await prisma.item.findMany({
        select: {
            id: true,
            title: true,
            image: true
        }
    })

    return res.json(items)
})

export default router