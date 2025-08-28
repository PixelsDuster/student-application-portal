import { NextFunction, Request, Response } from "express";
import config from 'config'
import jwt from 'jsonwebtoken'

import { IUserDocument } from "../users/UserModel";
import { getUserBy } from "../users/UserService";
import { IDegreeDocument } from "../degreeCourses/degreeCourseModel"
import { IApplicationDocument } from "../degreeCourseApplications/degreeCourseApplicationModel"
import { getApplicationBy } from "../degreeCourseApplications/degreeCourseApplicationService"

// Mapping Admins
export function mapAdmin(user: IUserDocument): any{
    return { "userID": user.userID, 
             "isAdministrator": user.isAdministrator 
    }
}

export function mapAdmins(users: IUserDocument[] ): any{
    return users.map((user: IUserDocument) => mapAdmin(user))
}

// Mapping for returned information

export function mapDegreeCourse(degreeCourse: IDegreeDocument): any{
    return { "id": degreeCourse._id,
             "name": degreeCourse.name,
             "shortName": degreeCourse.shortName,
             "universityName": degreeCourse.universityName,
             "universityShortName": degreeCourse.universityShortName,
             "departmentName": degreeCourse.departmentName,
             "departmentShortName": degreeCourse.departmentShortName 
    }
}

export function mapDegreeCourses(degreeCourses: IDegreeDocument[] ): any{
    return degreeCourses.map((degreeCourse: IDegreeDocument) => mapDegreeCourse(degreeCourse))
}

export function mapUser(user: IUserDocument): any{
    return { "id": user._id, 
             "userID": user.userID, 
             "firstName": user.firstName, 
             "lastName": user.lastName, 
             "isAdministrator": user.isAdministrator 
    }
}

export function mapUsers(users: IUserDocument[] ): any{
    return users.map((user: IUserDocument) => mapUser(user))
}

export function mapApplication(application: IApplicationDocument): any{
    return { "id": application._id,
             "applicantUserID": application.applicantUserID,
             "degreeCourseID": application.degreeCourseID,
             "targetPeriodYear": application.targetPeriodYear,
             "targetPeriodShortName": application.targetPeriodShortName
    }
}

export function mapApplications(applications: IApplicationDocument[] ): any{
    return applications.map((application: IApplicationDocument) => mapApplication(application))
}

// Verification middlewares
// Validate the access token
export function isValid(req: Request, res: Response, next: NextFunction){
    if(typeof req.headers.authorization !== "undefined"){
        let token: string = req.headers.authorization.split(" ")[1]
        var privateKey: string = config.get('session.tokenKey')
        jwt.verify(token, privateKey, async (err: jwt.VerifyErrors | null, decoded: string | jwt.JwtPayload | undefined) => {
                if(err){
                    res.status(401).json({ error: "Token is invalid" })
                    return;
                }
                console.log("Token is valid, cheking User")
                // type guard so i can extract the userID
                if(typeof decoded === 'object' && decoded !== null && 'userID' in decoded) {
                    const payload = decoded as jwt.JwtPayload
                    const userID: string = payload.userID
                    try {
                        const user: IUserDocument | null = await getUserBy(userID);
                        if (!user) {
                            res.status(404).json({ error: "User doesn't exists" });
                            return;
                        }

                        res.header("Authorization", "Bearer " + token);

                        next();
                    } catch (e) {
                        console.error("verifyTokenAndUser error:", e);
                        res.status(500).json({ error: "Internal server error" });
                    }
                }
                else{
                    res.status(401).json({ Error: "Invalid token payload" })
                }
        })
    }
    else{
        res.status(401).json({ Error: "Not Authorized" })
        return;
    }        
}

// Extracting userID and isAdministrator from the token
export function extractData(req: Request, res: Response){

    if(!req.headers.authorization || req.headers.authorization.indexOf('Bearer') === -1){
        res.json({ message: "Missing Authorization Header" })
        return;
    }

    const token: string = req.headers.authorization.split(' ')[1];
    const payload: string = token.split('.')[1];
    const data: string = Buffer.from(payload, 'base64').toString();

    return JSON.parse(data)

}

// Check if the User is admin
export function isAdmin(req: Request, res: Response, next: NextFunction){

    const data = extractData(req, res)
    const isAdministrator: boolean = data.isAdministrator
    
    if (isAdministrator && isAdministrator === true) {
        next()
    } 
    else {
        res.status(401).json({ Error: "You are not an Admin!" })
    }

}

// Checks whether the user is quering his own data, or is an admin (User-endpoint)
export function isAuthorized(req: Request, res: Response, next: NextFunction){

    const data = extractData(req, res)
    const isAdministrator: boolean = data.isAdministrator
    const userID: string = data.userID

    if (isAdministrator && isAdministrator === true || userID === req.params.userID) {
        next()
    } 
    else {
        res.status(403).json({ Error: "You are not Authorized!" })
    }

}

// Checks whether the user is quering his own data, or is an admin (application creation - Application-endpoint)
export function isAuthorizedApplicant(req: Request, res: Response, next: NextFunction){

    const data = extractData(req, res)
    const isAdministrator: boolean = data.isAdministrator
    const userID: string = data.userID
    const applicantUserID: string = req.body.applicantUserID;
    
    if(isAdministrator === true){
        return next();
    }

    if(!applicantUserID){
        req.body.applicantUserID = userID
        return next();
    }

    if(applicantUserID !== userID){
        res.status(403).json({ Error: "You are not Authorized!" })   
        return;
    }

    next();
}

// Checks whether the user is quering his own data, or is an admin (application deletion/modification - application-endpoint)
export async function isCorrectUser(req: Request, res: Response, next: NextFunction){

    const data = extractData(req, res)
    const userID: string = data.userID
    const isAdministrator: boolean = data.isAdministrator

    const applicationID: string = req.params._id
    const application: IApplicationDocument | null = await getApplicationBy(applicationID)
    if(application){
        const applicantID: string = application.applicantUserID;
        if(isAdministrator && isAdministrator === true || userID === applicantID){
            next()
        }  
        else {
            res.status(403).json({ Error: "You are not Authorized!" })
        }  
    }
    else{
        res.status(404).json({ error: "Application not found!" });
    }

}