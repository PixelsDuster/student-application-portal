import mongoose from 'mongoose'
import config from 'config'
import { getUserBy } from "../endpoints/users/UserService"
import User, { IUserDocument } from '../endpoints/users/UserModel'

let _db: mongoose.Connection ;

const connectionString: string = config.get('db.connectionString')

export function initDB(callback: any){
    if(_db){
        if(callback){
            return callback(null, _db)
        }else{
            return _db
        }
    }else{
        mongoose.connect(connectionString);
        _db = mongoose.connection;

        _db.on('error', console.error.bind(console, 'connection error'))
        _db.once('open', async() => {

            const user: IUserDocument | null  = await getUserBy("admin")
            if(!user){
                console.log("Creating default admin");

                const newUser: IUserDocument = new User({
                    userID: "admin",
                    firstName: "Udo",
                    lastName: "Müller",
                    password: "123",
                    isAdministrator: true
                })

                await newUser.save()
                console.log("Created default admin user")
            }                     

            console.log("Connected to database " + connectionString + " in DB.js: " + _db)
            callback(null, _db)
        })
    }
}

export function close(){
    if (_db) {
        mongoose.disconnect();
        console.log("Database connection closed.");
    }
}

export function getDB() {
    return _db;
}