import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser{
    userID: string,
    firstName: string,
    lastName: string,
    password: string,
    isAdministrator: boolean
}

interface IUserMethods{
    WhoAmI(): void,
    comparePassword(candidatePassword: string): Promise<boolean>
}

export type IUserDocument = IUser & mongoose.Document & IUserMethods;

const UserSchema = new mongoose.Schema<IUser>({
    userID: { type: String, unique: true, required: true },
    firstName: String,
    lastName: String,
    password: { type: String, 
                required: true,
                validate: {
                    validator: function(pw: string){
                        return pw.length > 0;
                    },
                    message: "Not a valid password!"
                }
              },
    isAdministrator: { type: Boolean, default: false }
}, { timestamps: true }
);


UserSchema.methods.WhoAmI = function (): void {
    var output = this.userID
        ? "My name is " + this.firstName + " " + this.lastName
        : "I don't have a name";
    console.log(output)
}


UserSchema.pre('save', function(next): void {
    var user = this;

    if(!user.isModified('password')) { return next() };
    bcrypt.hash(user.password, 10).then((hashedPassword: string) => {
        user.password = hashedPassword
        next();
    })
})


UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
}


const User = mongoose.model<IUser, mongoose.Model<IUser, {}, IUserMethods>>('User', UserSchema);

export default User;