import express, {Router, Request, Response} from 'express';
import { deleteApplication, updateApplication, addApplication, getApplicationsBy, getApplications } from './degreeCourseApplicationService'
import DegreeCourseApplication, { IApplicationDocument } from './degreeCourseApplicationModel'
import { mapApplication, mapApplications, isAdmin, isValid, isAuthorizedApplicant, isCorrectUser, extractData } from '../utils/helperMethods';

const router: Router = express.Router();

// Fetching all the degreeCoursesApplications
router.get('/', isValid, isAdmin, async (req: Request, res: Response) => {
    let rawQuery = req.query.applicantUserID;
    const applicantUserID = typeof rawQuery === 'string' ? rawQuery : undefined;
    rawQuery = req.query.degreeCourseID;
    const degreeCourseID = typeof rawQuery === 'string' ? rawQuery : undefined;

    try {
        let applications: IApplicationDocument[] = []; 
        if(applicantUserID){
            applications = await getApplicationsBy("applicantUserID", applicantUserID)
        }
        else if(degreeCourseID){
            applications = await getApplicationsBy("degreeCourseID", degreeCourseID)
        }
        else{
            applications = await getApplications()
        }
        
        res.status(200).json(mapApplications(applications))
    } catch (error) {
        console.error(error)
        res.status(500).json({ Error: "Error while fetching Applications" })
    }
})

// Fetching User own applications
router.get('/myApplications', isValid, async(req: Request, res: Response) => {
    try {
        const data = extractData(req, res)
        const userID: string = data.userID
        const applications: IApplicationDocument[] = await getApplicationsBy("applicantUserID", userID)
        res.status(200).json(mapApplications(applications))
    } catch (error) {
        console.error(error)
        res.status(500).json({ Error: "Error while fetching Applications" })   
    }
})

// Adding degreeCoursesApplications
router.post('/', isValid, isAuthorizedApplicant, async (req: Request, res: Response) => {
    try {
        const body: IApplicationDocument = req.body
        const newApplication: IApplicationDocument | number = await addApplication(body);
        
        if(newApplication === 1){
            res.status(400).json({ Error: "CourseID doesn't exist" })
            return;
        }

        if(newApplication === 2){
            res.status(400).json({ Error: "Duplicate Application" })
            return;
        }
        
        if(newApplication instanceof DegreeCourseApplication ){
            res.status(201).json(mapApplication(newApplication))
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ Error: "Error while adding the new Application" }) 
    }  
})

// Modifying existing degreeCoursesApplications based on <applications_ID>
router.put('/:_id', isValid, isCorrectUser, async (req: Request, res: Response) => {
    try {
        const applicationID: string = req.params._id
        const body: Partial<IApplicationDocument> = req.body;
         
        if(body._id && body._id !== applicationID){
            res.status(400).json({ Error: "Changing ApplicationID is not allowed." });
            return;
        }
     
        const updatedApplication: IApplicationDocument | null = await updateApplication(applicationID, body);
        if(!updatedApplication){
            res.status(404).json({ Error: `No Application with the ID ${applicationID} could be found" ` })
            return;
        }
        res.status(200).json(mapApplication(updatedApplication))   
    } catch (error) {
        res.status(500).json({ Error: "Error while Updating the Application" })
    }
})

// Deleting existing degreeCoursesApplications based on <applications_ID>
router.delete('/:_id', isValid, isCorrectUser, async (req: Request, res: Response) => {
    try {
        const applicationID: string = req.params._id

        const deletedApplication: IApplicationDocument | null = await deleteApplication(applicationID)
        if(!deletedApplication){
            res.status(404).json({ Error: "No Application with the ID " + applicationID + " could be found" })
            return;
        }
        console.log("Application deleted successfully")
        res.status(204).json()
    } catch (error) {
        console.error(error)
        res.status(500).json({ Error: "Error while Deleting the Application" })
    }    
})

export default router;