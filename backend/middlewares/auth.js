import jwt from 'jsonwebtoken'

export default async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return res.status(401).json({error : 'Invalid authorization header'})
    }
    const token = authHeader.split(' ')[1]

    try {
        const authToken = await jwt.verify(token, "aqwdqwdeaqwdeqweqwe")
        req.profile = authToken.id
        return next()
    } catch (error) {
        return res.status(401).json({error : 'Invalid profile'})
    }
}