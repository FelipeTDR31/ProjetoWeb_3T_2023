import { Router } from 'express'
import prisma from "../prisma_client/index.js"
import jwt from 'jsonwebtoken'
import auth from '../middlewares/auth.js'
import fs from 'fs'
import path from 'path'

const router = Router()

router.post('/register', async (req, res) => {
    const { username, email, password, is_Admin } = req.body
    const verify = await prisma.user.findFirst({
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
        const jwtToken = jwt.sign({profile : user.username}, "aqwdqwdeaqwdeqweqwe", {
            expiresIn: "1d"
        })
    
        return res.json({user, jwtToken})
    }else{
        return res.json({exists: true})
    }
})

router.post('/editUser', async (req, res) => {
    const {username, newUsername, password, newPassword} = req.body

    if (username!=undefined && newUsername!=undefined) {
        const verify = await prisma.user.findUnique({
            where: {username: username},
            select : {username: true}
        })

        const verify2 = await prisma.user.findUnique({
            where: {username: newUsername},
            select : {username: true}
        })

        if (verify!=null && verify2==null) {
            const user = await prisma.user.update({
                where:{
                    username: username
                },
                data:{username: newUsername}
            })
        }else {
            return res.json({error: true})
        }
    }else if(password!=undefined && newPassword!=undefined) {
        const verify = await prisma.user.findUnique({
            where: {username: username},
            select : {username: true}
        })
        if (verify!=null) {
            const user = await prisma.user.update({
                where:{
                    password: password,
                    username: username
                },
                data:{password: newPassword}
            })
        }else{
            return res.json({error: true})
        }
    }
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

    if (user!=null) {
        return res.json(user)
    }else{
        return res.json({error : true})
    }
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

    if (item==null || item.image==null ) {
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
    fs.unlinkSync(path, (error) => {console.log(error)})
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

    const itemsRating = await prisma.user_Item.groupBy({
        by: ['itemID'],
        _sum:{
            likeQuantity: true,
            dislikeQuantity: true
        }
    })
    let ratings=[]
    for (let i = 0; i < itemsRating.length; i++) {
        const itemRating = itemsRating[i];
        const rating = itemRating._sum.likeQuantity - itemRating._sum.dislikeQuantity
        if (typeof rating === 'number') {
            ratings.push(rating)
        }else{
            ratings.push(0)
        }
    }
    
    return res.json({items, ratings})
})

router.post("/getVoteQuantity", async (req, res) => {
    const {username} = req.body

    const user = await prisma.user.findUnique({
        where:{
            username: username
        },
        select:{
            id : true
        }
    })

    const voteQuantity = await prisma.user_Item.groupBy({
        by: ["userID"],
        _count:{
            itemID: true
        },
        where:{
            userID: user.id
        }
    })
    return res.json(voteQuantity)
})

router.post('/editItem', auth, async (req, res) => {
    const { id, title, image } = req.body

    const verify = await prisma.item.findUnique({
        where: {
            id : id
        },
        select: {
            image : true
        }
    })

    if (verify == null) {
        return res.json({ notAnItem : true})
        
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
    fs.unlinkSync(verify.image)

    const imagePathBD = `uploads/${uniqueFilename}`
    const updateItem = await prisma.item.update({
        where: {id: id},
        data: { title : title, image : imagePathBD }
    })
    return res.json(updateItem)
})

router.post('/getItemRanking', async (req, res) => {
    const {id} = req.body

    const verify = await prisma.item.findUnique({
        where: {id: id},
        select: {title: true}
    })

    if (verify!=null) {
        const itemRankSums = await prisma.user_Item.aggregate({
            where:{
                itemID : id
            },
            _sum:{
                likeQuantity : true,
                dislikeQuantity : true
            }
        })
    
        const ranking = itemRankSums._sum.likeQuantity- itemRankSums._sum.dislikeQuantity
    
        return res.json({rankingNumber: ranking})
    }else {
        return res.json({error: true})
    }
})

router.post("/voteItem", async (req, res) =>{
    const {username, itemID, type} = req.body

    const user =await prisma.user.findUnique({
        where:{
            username: username
        },
        select:{
            id: true,
            username: true,
            email: true,
            is_Admin: true
        }
    })

    if (type == "like") {
        const user_item =await prisma.user_Item.create({
            data:{
                userID: user.id,
                itemID: Number(itemID),
                likeQuantity: 1,
                dislikeQuantity: 0
            }
        })

        if (user_item != null) {
            return res.json({error: false})
        }else {
            return res.json({error: true})
        }
    }else if (type == "dislike") {
        const user_item =await prisma.user_Item.create({
            data:{
                userID: user.id,
                itemID: Number(itemID),
                likeQuantity: 0,
                dislikeQuantity: 1
            }
        })

        if (user_item != null) {
            return res.json({error: false})
        }else {
            return res.json({error: true})
        }
    }
})

export default router