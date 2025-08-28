import User, { IUserDocument } from "../users/UserModel";
import { getUserBy } from "../users/UserService";


export async function getAdmins(userID: string, password: string): Promise<IUserDocument[] | null>{
    console.log("credentials: userID: " + userID + ", password: " + password)
    const user: IUserDocument | null = await getUserBy(userID)
    if(!user){
        throw Error("Could not find user")
    }
    else{
        console.log("Found user, check the password")
        const isMatch: boolean = await user.comparePassword(password)
        if(!isMatch){
            throw new Error("Invalid password")
        }
        else{
            console.log("Password is correct")
            const admins: IUserDocument[] | null = await User.find({ isAdministrator: true })
            if(!admins){
                console.error("Error while fetching admins")
                return null
            }
            else{
                console.log("found admins")
                return admins
            }
        }
    }

}