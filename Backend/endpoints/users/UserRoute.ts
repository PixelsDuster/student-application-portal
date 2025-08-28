import express, {Router, Request, Response} from 'express';
import { getUserBy, getUsers, addUser, updateUser, deleteUser } from './UserService'
import { IUserDocument } from './UserModel'
import { mapUser, mapUsers, isAdmin, isValid, isAuthorized, extractData } from '../utils/helperMethods';

const router: Router = express.Router();

// Fetching all the users
router.get('/', isValid, isAdmin, async (req: Request, res: Response) => {
    try {
        const users: IUserDocument[] = await getUsers()
        res.status(200).json(mapUsers(users))
    } catch (error) {
        console.error(error)
        res.status(500).json({ Error: "Error while fetching Users" })
    }
})

// Fetching a User based on User_ID
router.get('/:userID', isValid, isAuthorized, async(req: Request, res: Response) => {
    try {
        const userID: string = req.params.userID

        const user: IUserDocument | null = await getUserBy(userID)
        if(!user){
            res.status(404).json({ Error: "No User with the ID " + userID + " could be found" })
            return;
        }

        res.status(200).json(mapUser(user))
    } catch (error) {
        console.error(error)
        res.status(500).json({ Error: "Error while fetching Users" })
    }
})

// Adding User
router.post('/', isValid, isAdmin, async (req: Request, res: Response) => {
    try {
        const body: IUserDocument = req.body;
        const userID: string = body.userID;

        if(!userID){
            res.status(400).json({ Error: "UserId field is missing!" })
            return;
        }
        if(!body.password){
            res.status(400).json({ Error: "Password field is missing!" })
            return;
        }

        const user: IUserDocument | null = await getUserBy(userID)
        if(user){
            res.status(400).json({ Error: `User with UserId ${userID} already exist!` })
            return;
        }

        const newUser: IUserDocument = await addUser(body);
        res.status(201).json(mapUser(newUser))
    } catch (error) {
        console.error(error)
        res.status(500).json({ Error: "Error while adding the new User" })
    }
})

// Modifying existing user
router.put('/:userID', isValid, isAuthorized, async (req: Request, res: Response) => {
    try {
        const userID: string = req.params.userID;
        const body: Partial<IUserDocument> = req.body;
        const data = extractData(req, res);

        if(body.userID && body.userID !== userID){
            res.status(400).json({ Error: "Changing userID is not allowed." });
            return;
        }

        if(body.isAdministrator !== undefined && data.isAdministrator !== true){
            res.status(403).json({ Error: "Changing isAdministrator is not allowed." })
            return;
        }

        const updatedUser: IUserDocument | null = await updateUser(userID, body);
        
        if(!updatedUser){
            res.status(404).json({ Error: "Update failed: Could not find user: " + userID })
            return;
        }
        res.status(200).json(mapUser(updatedUser))
    } catch (error) {
        console.error(error)
        res.status(500).json({ Error: "Error while Updating the user" })
    }
})

// Deleting existing user
router.delete('/:userID', isValid, isAdmin, async (req: Request, res: Response) => {
    try {
        const userID: string = req.params.userID;

        const deletedUser = await deleteUser(userID)
        
        if(!deletedUser){
            res.status(404).json({ Error: "No User with the ID " + userID + " could be found" })
            return;
        }
        console.log("User deleted successfully")
        res.status(204).json()
    } catch (error) {
        console.error(error)
        res.status(500).json({ Error: "Error while Deleting the User" })
    }
})

export default router;