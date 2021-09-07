import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization || ''
        const token = authorizationHeader.split(' ')[1]
        const { TOKEN_SECRET = '' } = process.env
        const decoded = jwt.verify(token, TOKEN_SECRET)

        next()
    } catch (e) {
        res
            .append('Access-Control-Allow-Origin','*')
            .status(401)
            .json(`${e}`)
    }
}

export default verifyAuthToken