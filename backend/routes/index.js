import { Router } from 'express'
import prisma from "../prisma_client/index.js"
import jwt from 'jsonwebtoken'
import auth from '../middlewares/auth.js'
import fs from 'fs'
import path from 'path'

const router = Router()

router.post('/register', async (req, res) => {
    const { username, email, password, is_Admin } = req.body
    const verify = await prisma.user.findUnique({
        where:{
            OR: [
                {
                    username : username
                },
                {
                    email : email
                }
            ]
        },
        select:{
            username: true
        }
    })

    if (verify==null) {
        const user = await prisma.user.create({
            data: { username, email, password, is_Admin }
        })
    
        return res.json(user)
    }else{
        return res.json({exists: true})
    }
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
    if (user && user!=null) {
        const jwtToken = jwt.sign({profile : user.username}, "aqwdqwdeaqwdeqweqwe", {
            expiresIn: "1d"
        })
    
        return res.json({user, jwtToken})
    }else {
        return res.json({error : true})
    }
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

    const verify = await prisma.item.findUnique({
        where: {
            title: title
        },
        select: {
            title: true
        }
    })

    if (verify != null) {
        return res.json({ exists : true})
        
    }

    const imageResponse = await fetch(image)
    const imageBuffer = await imageResponse.arrayBuffer()
    const buffer = Buffer.from(imageBuffer)
    
    const imageFolder = 'uploads'
    if (!fs.existsSync(imageFolder)) {
        fs.mkdirSync(imageFolder)
    }

    let extension
    if (image.includes("png")) {
        extension = 'png'
    }else if (image.includes("jpeg")) {
        extension = 'jpeg'
    }else if (image.includes("jpg")) {
        extension = 'jpg'
    }

    const uniqueFilename = `${title}_${Math.random().toString(36).substring(2, 7)}.${extension}`
    const imageFilePath = `${imageFolder}/${uniqueFilename}`
    fs.writeFileSync(imageFilePath, buffer)

    const imagePathBD = `uploads/${uniqueFilename}`
    const newItem = await prisma.item.create({
        data: { title : title, image : imagePathBD }
    })
    return res.json(newItem)
})

router.get('/uploads/:imageName', async (req, res) => {
    const imageName = req.params.imageName
    let imageTitle = imageName.split('_')[0]
    const item = await prisma.item.findUnique({
        where : {
            title: imageTitle
        },
        select: {
            image : true
        }
    })

    if (item.image==null || item==null) {
        return res.json({error : true})
    }else{
        const filePath = `${item.image}`
        res.sendFile(path.resolve(filePath))
    }

    
})

router.post('/deleteItem', auth, async (req, res) => {
    const { id, title } = req.body

    const deleteItem = await prisma.item.delete({
        where : {
            title : title
        },
        select : {
            title : true,
            image: true
        }
    })
    const path = deleteItem.image
    fs.unlink(path, (error) => {console.log(error)})
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