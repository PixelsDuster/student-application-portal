"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const UserSchema = new mongoose_1.default.Schema({
    userID: { type: String, unique: true, required: true },
    firstName: String,
    lastName: String,
    password: { type: String,
        required: true,
        validate: {
            validator: function (pw) {
                return pw.length > 0;
            },
            message: "Not a valid password!"
        }
    },
    isAdministrator: { type: Boolean, default: false }
}, { timestamps: true });
UserSchema.methods.WhoAmI = function () {
    var output = this.userID
        ? "My name is " + this.firstName + " " + this.lastName
        : "I don't have a name";
    console.log(output);
};
UserSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) {
        return next();
    }
    ;
    bcryptjs_1.default.hash(user.password, 10).then((hashedPassword) => {
        user.password = hashedPassword;
        next();
    });
});
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return bcryptjs_1.default.compare(candidatePassword, this.password);
};
const User = mongoose_1.default.model('User', UserSchema);
exports.default = User;
//# sourceMappingURL=publicUserModel.js.map