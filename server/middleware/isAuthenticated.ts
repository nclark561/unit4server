//importing from express to ensure typescript compatibility
import { NextFunction, Response, Request } from "express"

//importing libraries to enable access to environment variables and jwt
require('dotenv').config()
const jwt = require('jsonwebtoken')
const {SECRET} = process.env

//exporting authentification function to be used in our server file
module.exports = {
    isAuthenticated: (req: Request, res: Response, next: NextFunction) => {
        //checking the identity of user sending the request
        const headerToken = req.get('Authorization')

        if (!headerToken) {
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
        }

        let token

        try {
            token = jwt.verify(headerToken, SECRET)
        } catch (err) {
            //@ts-ignore
            err.statusCode = 500
            throw err
        }

        if (!token) {
            const error = new Error('Not authenticated.')
            //@ts-ignore
            error.statusCode = 401
            throw error
        }

        //telling it to run the function that was originally requested to be run
        next()
    }
}