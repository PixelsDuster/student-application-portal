"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = getUsers;
exports.findUserBy = findUserBy;
exports.addUser = addUser;
const publicUserModel_1 = __importDefault(require("./publicUserModel"));
// Get all Users from DB
async function getUsers() {
    try {
        const users = await publicUserModel_1.default.find();
        console.log("Users search successful!");
        return users;
    }
    catch (error) {
        console.log("Error during the Search: " + error);
        return [];
    }
}
// Fetching User based on User_ID
async function findUserBy(searchUserID) {
    console.log(`UserService: find user by ID: ${searchUserID}`);
    if (!searchUserID) {
        console.error("UserID is missing");
        return undefined;
    }
    try {
        let user = await publicUserModel_1.default.findOne({ userID: searchUserID });
        if (user) {
            console.log(`Found userID: ${searchUserID}`);
            return user;
        }
        else {
            console.error("Could not find user for userID: " + searchUserID);
            return undefined;
        }
    }
    catch (error) {
        console.error("Error during user search: ", error);
        throw error;
    }
}
// Adding User to DB
async function addUser(body) {
    try {
        const newUser = new publicUserModel_1.default({
            userID: body.userID,
            firstName: body.firstName,
            lastName: body.lastName,
            password: body.password,
            isAdministrator: body.isAdministrator
        });
        await newUser.save();
        console.log(`Created User: ${body.userID}`);
        return newUser;
    }
    catch (error) {
        console.error("Error during user creation: ", error);
        throw error;
    }
}
//# sourceMappingURL=publicUserService.js.map