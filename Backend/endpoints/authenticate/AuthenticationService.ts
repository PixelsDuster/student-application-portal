import config from 'config'
import jwt from 'jsonwebtoken'

import { getUserBy } from "../users/UserService"
import { IUserDocument } from "../users/UserModel";


export async function createSessionToken(userID: string, password: string): Promise<{ token: string, user: IUserDocument }>{
   
    console.log("Authentication Service: create Token")
    if(!userID){
        throw new Error("UserID is missing") 
    }
    if(!password){
        throw new Error("Password is missing")
    }

    const user: IUserDocument | null = await getUserBy(userID)
    if(!user){
        throw new Error("Authentication Service: Did not find user for userID: " + userID)
    }
    else{
        console.log("Found user, check the password")
        const isMatch: boolean = await user.comparePassword(password)
        if(!isMatch){
            throw new Error("Invalid password")
        }
        else{
            console.log("Password is correct. Create token")

            var issuedAt: number = new Date().getTime();
            var expirationTime: number = config.get('session.timeout');
            var expiresAt: number = issuedAt + (expirationTime * 1000);
            var privateKey: string = config.get('session.tokenKey');
            let token = jwt.sign({ "userID": user.userID, "isAdministrator": user.isAdministrator }, privateKey, { expiresIn: expirationTime, algorithm: 'HS256' });
                    
            console.log("Token created: " + token)
            return { user, token}
        }
    }
}