import mongoose from "mongoose";

import DegreeCourseApplication, {  IApplicationDocument } from "./degreeCourseApplicationModel";
import DegreeCourse, { IDegreeDocument } from "../degreeCourses/degreeCourseModel";

// Fetching Applications based on an ID
export async function getApplicationsBy(field: string, value:string): Promise<IApplicationDocument[]>{
    console.log(`Application Search for ${field}: ${value}`)
    const applications: IApplicationDocument[] = await DegreeCourseApplication.find({ [field]: value })
    console.log("Applications search successful!")
    return applications
} 

// Fetching all Applications
export async function getApplications(): Promise<IApplicationDocument[]>{
    console.log("Application Search for all applications: ")
    const applications: IApplicationDocument[] = await DegreeCourseApplication.find()
    console.log("Applications search successful!")
    return applications
}

// Fetching a degreeCourse based on degreeCourses_ID
export async function getApplicationBy(applicationID: string): Promise<IApplicationDocument | null> {
    const application: IApplicationDocument | null = await DegreeCourseApplication.findOne({ _id: applicationID });
    if(application){
        console.log(`Found Application: ${applicationID}`)
        return application
    }
    else{
        return null
    }
}

// Adding DegreeCourseApplication to DB
export async function addApplication(body: IApplicationDocument): Promise<IApplicationDocument | number>{
    // Check if the courseID exist
    const degreeCourseID: mongoose.Schema.Types.ObjectId = body.degreeCourseID
    if(typeof degreeCourseID === "string"){
        if(!mongoose.Types.ObjectId.isValid(degreeCourseID)){
            console.log("Invalid DegreeCourseID")
            return 1
        }
    }
    else if(!(degreeCourseID instanceof mongoose.Types.ObjectId)){
        console.log("Invalid degreeCourseID")
        return 1
    }

    const degreeCourse: IDegreeDocument | null = await DegreeCourse.findOne({ _id: degreeCourseID })
    if(!degreeCourse){
        console.log("DegreeCourseID doesn't exist")
        return 1
    }

    // Check if the application already exist
    const application: IApplicationDocument | null = await DegreeCourseApplication.findOne({
        applicantUserID: body.applicantUserID,
        degreeCourseID: body.degreeCourseID,
        targetPeriodYear: body.targetPeriodYear,
        targetPeriodShortName: body.targetPeriodShortName
    })
    if(application){
        console.log("Application already exist!")
        return 2
    }

    // Create a new application
    const newApplication: IApplicationDocument = new DegreeCourseApplication({
        applicantUserID: body.applicantUserID,
        degreeCourseID: body.degreeCourseID,
        targetPeriodYear: body.targetPeriodYear,
        targetPeriodShortName: body.targetPeriodShortName
    })
    await newApplication.save();
    console.log(`Created new Application: ${newApplication._id}`)
    return newApplication;
}

// Updating DegreeCourseApplication
export async function updateApplication(applicationID: string, body: Partial<IApplicationDocument>): Promise<IApplicationDocument | null>{
    const application: IApplicationDocument | null = await DegreeCourseApplication.findOne({ _id: applicationID });

    if(application){
        console.log("Found application to be updated")
        if(body.targetPeriodYear !== undefined) application.targetPeriodYear = body.targetPeriodYear
        if(body.targetPeriodShortName !== undefined) application.targetPeriodShortName = body.targetPeriodShortName
        await application.save()
        console.log("Updated application")
        return application
    }
    else{
        return null
    }
}

// Deleting DegreeCourseApplication
export async function deleteApplication(applicationID: string): Promise<IApplicationDocument | null>{
    return await DegreeCourseApplication.findOneAndDelete({ _id: applicationID })
}