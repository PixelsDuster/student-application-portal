import express, {Router, Request, Response} from 'express';
import { createSessionToken } from "./AuthenticationService"

const router: Router = express.Router()

router.get("/", async (req: Request, res: Response) => {
    try {
        if(!req.headers.authorization || req.headers.authorization.indexOf('Basic') === -1){
            res.statusCode = 401;
            res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"')
            res.json({ message: "Missing Authorization Header Gib die daten" })
            return;
        }
        
        const base64Credentials = req.headers.authorization.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [userID, password] = credentials.split(':');

        const { token, user } = await createSessionToken(userID, password)

        if(token){
            res.header("Authorization", "Bearer " + token);
    
            if(user){
                res.status(200).send({ Success: "Token created successfully" })
            }
        }

    } catch (error) {
        console.error(error)
        res.status(401).json({ Error: "Failed to create token: Authentication failed" })
    }

})

export default router;