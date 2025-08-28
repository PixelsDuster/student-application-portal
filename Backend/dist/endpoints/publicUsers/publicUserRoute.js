"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const publicUserService_1 = require("./publicUserService");
const router = express_1.default.Router();
// Fetching all the users
router.get('/', async (req, res) => {
    try {
        const result = await (0, publicUserService_1.getUsers)();
        console.log("Result: " + result);
        res.send(Object.values(result));
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ Error: "Error while fetching Users" });
    }
});
// Fetching a User based on User_ID
router.get('/:userID', async (req, res) => {
    try {
        const userID = req.params.userID;
        console.log("Find user by ID: " + userID);
        const user = await (0, publicUserService_1.findUserBy)(userID);
        if (!user) {
            res.status(404).json({ Error: "No User with the ID " + userID + " could be found" });
        }
        res.send(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ Error: "Error while fetching Users" });
    }
});
// Adding User
/**
 * What happens if a second user is created with the same user ID? An error message should appear.
 * What happens if a user is created without a user ID? This shouldn't be possible.
 */
router.post('/', async (req, res) => {
    try {
        const body = req.body;
        const userID = body.userID;
        if (!userID) {
            res.status(400).json({ Error: "UserId field is missing!" });
            return;
        }
        if (!body.password) {
            res.status(400).json({ Error: "Password field is missing!" });
            return;
        }
        const user = await (0, publicUserService_1.findUserBy)(userID);
        if (user) {
            res.status(400).json({ Error: `User with UserId ${userID} already exist!` });
            return;
        }
        console.log("Adding new publicUser: ");
        const newUser = await (0, publicUserService_1.addUser)(body);
        res.status(201).send(newUser);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ Error: "Error while adding the new User" });
    }
});
// Modifying existing user
// What  happens  if  you  want  to  change  a  user  that  doesn’t  exist?
// Deleting existing user
// What  happens  if  you  want  to  delete  a  user  that  doesn’t  exist?
exports.default = router;
//# sourceMappingURL=publicUserRoute.js.map