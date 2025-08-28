import express, {Router, Request, Response} from 'express';
import { mapAdmins } from '../utils/helperMethods';
import { getAdmins } from './abnahmeService'
import { IUserDocument } from '../users/UserModel';

const router: Router = express.Router();

router.get('/getAdmins', async (req: Request, res: Response) => {
    
    try {
        
        if(!req.headers.authorization || req.headers.authorization.indexOf('Basic') === -1){
            res.statusCode = 401;
            res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"')
            res.json({ message: "Missing Authorization Header Gib die daten" })
            return;
        }

        const base64Credentials: string = req.headers.authorization.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [userID, password] = credentials.split(':');

        const admins: IUserDocument[] | null = await getAdmins(userID, password)
        if(!admins){
            res.status(500).json({ Error: "Error while serching for admins" })
        }
        else{
            res.status(200).json(mapAdmins(admins))
        }
        
    } catch (error) {
        console.error(error)
        res.status(500).json({ Error: "Error while fetching Admins" })
    }

})

export default router