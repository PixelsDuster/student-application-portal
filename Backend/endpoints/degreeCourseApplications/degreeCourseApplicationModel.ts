import mongoose from 'mongoose';

interface IDegreeCourseApplication{
    applicantUserID: string,
    degreeCourseID: mongoose.Schema.Types.ObjectId,
    targetPeriodYear: number,
    targetPeriodShortName: string
}

export type IApplicationDocument = IDegreeCourseApplication & mongoose.Document;

const degreeCourseApplicationSchema = new mongoose.Schema<IApplicationDocument>({
    applicantUserID: { type: String, required: true },
    degreeCourseID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "DegreeCourse" },
    targetPeriodYear: { type: Number, required: true },
    targetPeriodShortName: { type: String, required: true, enum: ["WiSe", "SoSe"] }
}, { timestamps: true }
);

degreeCourseApplicationSchema.virtual('user', {
  ref: 'User',
  localField: 'applicantUserID',
  foreignField: 'userID',
  justOne: true
});

const DegreeCourseApplication = mongoose.model<IApplicationDocument>('DegreeCourseApplication', degreeCourseApplicationSchema);

export default DegreeCourseApplication;