import mongoose from 'mongoose';

interface IDegreeCourse{
    name: string,
    shortName: string,
    universityName: string,
    universityShortName: string,
    departmentName: string,
    departmentShortName: string
}

export type IDegreeDocument = IDegreeCourse & mongoose.Document;

const degreeCourseSchema = new mongoose.Schema<IDegreeDocument>({
    name: { type: String, required: true },
    shortName: { type: String, required: true },
    universityName: { type: String, required: true },
    universityShortName: { type: String, required: true },
    departmentName: { type: String, required: true },
    departmentShortName: { type: String, required: true }
}, { timestamps: true }
);

const DegreeCourse = mongoose.model<IDegreeDocument>('DegreeCourse', degreeCourseSchema);

export default DegreeCourse;