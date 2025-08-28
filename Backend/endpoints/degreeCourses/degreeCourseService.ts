import DegreeCourse, { IDegreeDocument } from "./degreeCourseModel";

// Fetching all degreeCourses from DB
export async function getDegreeCourses(): Promise<IDegreeDocument[]>{
    const degreeCourses: IDegreeDocument[] = await DegreeCourse.find()
    console.log("DegreeCourses search successful!")
    return degreeCourses
}

// Fetching degreeCourses based on the universityShortName
export async function getDegreeCoursesByUni(uniShortName: string): Promise<IDegreeDocument[]>{
    console.log(`Searching for Courses by UniShortName: ${uniShortName}`);
    if(!uniShortName){
        throw new Error("UniShortName is missing")
    }
    console.log("Found DegreeCourses with Uni")
    return await DegreeCourse.find({ universityShortName: uniShortName });
}

// Fetching a degreeCourse based on degreeCourses_ID
export async function getDegreeCourseBy(searchCourseID: string): Promise<IDegreeDocument | null> {
    console.log(`Searching for Course by ID: ${searchCourseID}`);
    if(!searchCourseID){
        throw new Error("CourseID is missing")
    }    

    const course: IDegreeDocument | null = await DegreeCourse.findOne({ _id: searchCourseID });
    if(course){
        console.log(`Found Course: ${searchCourseID}`)
        return course
    }
    else{
        return null
    }
}

// Adding DegreeCourse to DB
export async function addDegreeCourse(body: IDegreeDocument): Promise<IDegreeDocument>{
    const newCourse: IDegreeDocument = new DegreeCourse({
        name: body.name,
        shortName: body.shortName,
        universityName: body.universityName,
        universityShortName: body.universityShortName,
        departmentName: body.departmentName,
        departmentShortName: body.departmentShortName
    })

    await newCourse.save();
    console.log(`Created new Course: ${newCourse._id}`)
    return newCourse;
}

// Updating DegreeCourse
export async function updateDegreeCourse(searchCourseID: string, body: Partial<IDegreeDocument>): Promise<IDegreeDocument | null>{
    const updatedCourse: IDegreeDocument | null = await DegreeCourse.findOneAndUpdate({ _id: searchCourseID }, body, {new: true});
    if(!updatedCourse){
        return null
    }
    return updatedCourse
}

// Deleting DegreeCourse
export async function deleteDegreeCourse(searchCourseID: string): Promise<IDegreeDocument | null>{
    return await DegreeCourse.findOneAndDelete({ _id: searchCourseID })
}