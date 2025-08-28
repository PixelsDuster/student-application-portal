import express, {Router, Request, Response} from 'express';
import { getDegreeCourses, getDegreeCourseBy, addDegreeCourse, updateDegreeCourse, deleteDegreeCourse, getDegreeCoursesByUni } from './degreeCourseService'
import { IDegreeDocument } from './degreeCourseModel'
import { mapDegreeCourse, mapDegreeCourses, isAdmin, isValid, mapApplications } from '../utils/helperMethods';
import { IApplicationDocument } from '../degreeCourseApplications/degreeCourseApplicationModel';
import { getApplicationsBy } from '../degreeCourseApplications/degreeCourseApplicationService';

const router: Router = express.Router();

// Fetching all the degreeCourses
router.get('/', async (req: Request, res: Response) => {
    const rawQuery = req.query.universityShortName;
    const universityShortName = typeof rawQuery === 'string' ? rawQuery : undefined;

    try {
        let degreeCourses: IDegreeDocument[]; 
        if(universityShortName){
            degreeCourses = await getDegreeCoursesByUni(universityShortName)
        }
        else{
            degreeCourses = await getDegreeCourses()
        }

        res.status(200).json(mapDegreeCourses(degreeCourses))
    } catch (error) {
        console.error(error)
        res.status(500).json({ Error: "Error while fetching DegreeCourses" })
    }
})

// Fetching a degreeCourse based on degreeCourses_ID
router.get('/:_id', async(req: Request, res: Response) => {
    try {
        const courseID: string = req.params._id

        const course: IDegreeDocument | null = await getDegreeCourseBy(courseID)
        if(!course){
            res.status(404).json({ Error: "No Course with the ID " + courseID + " could be found" })
            return;
        }

        res.status(200).json(mapDegreeCourse(course))
    } catch (error) {
        console.error(error)
        res.status(500).json({ Error: "Error while fetching Courses" })   
    }
})

// Adding DegreeCourse
router.post('/', isValid, isAdmin, async (req: Request, res: Response) => {
    try {
        const body: IDegreeDocument = req.body
        const newCourse: IDegreeDocument = await addDegreeCourse(body);
        res.status(201).send(mapDegreeCourse(newCourse))
    } catch (error) {
        console.error(error)
        res.status(500).json({ Error: "Error while adding the new Course" }) 
    }  
})

// Modifying existing DegreeCourse
router.put('/:_id', isValid, isAdmin, async (req: Request, res: Response) => {
    try {
        const courseID: string = req.params._id
        const body: Partial<IDegreeDocument> = req.body;
    
        if(body._id && body._id !== courseID){
            res.status(400).json({ Error: "Changing CourseID is not allowed." });
            return;
        }

        const updatedCourse: IDegreeDocument | null = await updateDegreeCourse(courseID, body);
        if(!updatedCourse){
            res.status(404).json({ Error: `No Course with the ID ${courseID} could be found" ` })
            return;
        }
        res.status(200).json(mapDegreeCourse(updatedCourse))
    } catch (error) {
        res.status(500).json({ Error: "Error while Updating the Course" })
    }
})

// Deleting existing DegreeCourse
router.delete('/:_id', isValid, isAdmin, async (req: Request, res: Response) => {
    try {
        const courseID: string = req.params._id

        const deletedCourse: IDegreeDocument | null = await deleteDegreeCourse(courseID)
        if(!deletedCourse){
            res.status(404).json({ Error: "No Course with the ID " + courseID + " could be found" })
            return;
        }
        console.log("DegreeCourse deleted successfully")
        res.status(204).json()
    } catch (error) {
        console.error(error)
        res.status(500).json({ Error: "Error while Deleting the Course" })
    }    
})

// Downstream search for study application
router.get("/:_id/degreeCourseApplications", isValid, isAdmin, async (req: Request, res: Response) => {
    try {
        const courseID: string = req.params._id
        const applications: IApplicationDocument[] = await getApplicationsBy("degreeCourseID", courseID)
        if(!applications){
            res.status(404).json({ Error: "No Applications for courseID " + courseID + " could be found" })
            return;
        }

        res.status(200).json(mapApplications(applications))
    } catch (error) {
        console.error(error)
        res.status(500).json({ Error: "Error while Fetching the Applications" })
    }
}) 

export default router;