import User, { IUserDocument } from "./UserModel";


// Fetching all Users from DB
export async function getUsers(): Promise<IUserDocument[]>{
    const users: IUserDocument[] = await User.find()
    console.log("Users search successful!")
    return users
}

// Fetching User based on User_ID
export async function getUserBy(searchUserID: string): Promise<IUserDocument | null> {
    console.log(`Searching for user by ID: ${searchUserID}`);

    if(!searchUserID) {
        throw new Error("UserID is missing")
    }

    const user: IUserDocument | null = await User.findOne({ userID: searchUserID });

    if(user) {
        console.log(`Found userID: ${searchUserID}`);
        return user;
    }else {
        console.error("Could not find user for userID: " + searchUserID);
        return null;
    }
}

// Adding User to DB
export async function addUser(body: IUserDocument): Promise<IUserDocument>{
    console.log("Adding new User: ")
    const newUser: IUserDocument = new User({
        userID: body.userID,
        firstName: body.firstName,
        lastName: body.lastName,
        password: body.password,
        isAdministrator: body.isAdministrator
    })

    await newUser.save();
    console.log(`Created new User: ${body.userID}`)
    return newUser;
}


// Updating user
export async function updateUser(searchUserID: string, body: Partial<IUserDocument>): Promise<IUserDocument | null>{
    console.log("Search for user by ID: " + searchUserID)
    let user: IUserDocument | null = await User.findOne({ userID: searchUserID });
        
    if(user){
        console.log("Found user to be updated")
        if(body.firstName !== undefined) user.firstName = body.firstName
        if(body.lastName !== undefined) user.lastName = body.lastName
        if(body.password !== undefined) user.password = body.password
        if(body.isAdministrator !== undefined) user.isAdministrator = body.isAdministrator
        await user.save()
        console.log("Updated user")
        return user
    }
    else{
        return null
    } 
}


// Deleting User
export async function deleteUser(searchUserID: string): Promise<IUserDocument | null>{
    return await User.findOneAndDelete({ userID: searchUserID })
}