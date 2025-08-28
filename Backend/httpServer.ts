import express, {Express, NextFunction, Request, Response} from 'express';
import mongoose from 'mongoose'
import config from 'config'
import fs from 'fs'
import https from 'https'
import cors from 'cors'

import { initDB } from './database/db'
import publicUserRoute from './endpoints/users/publicUserRoute'
import authenticationRoute from './endpoints/authenticate/AuthenticationRoute'
import userRoute from './endpoints/users/UserRoute'
import degreeCoursesRoute from './endpoints/degreeCourses/degreeCourseRoute'
import degreeCourseApplicationsRoute from './endpoints/degreeCourseApplications/degreeCourseApplicationRoute'

import abnahmeRoute from './endpoints/abnahme/abnahmeRoute'

const key = fs.readFileSync('./certificates/key.pem')
const cert = fs.readFileSync('./certificates/cert.pem')

const app: Express = express();

const server = https.createServer({key: key, cert: cert}, app)

// CORS
app.use(cors())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Expose-Headers","Authorization");
  next();
});


app.use(express.json())
app.use('/api/publicUsers', publicUserRoute)
app.use('/api/authenticate', authenticationRoute)
app.use('/api/users', userRoute)
app.use('/api/degreeCourses', degreeCoursesRoute)
app.use('/api/degreeCourseApplications', degreeCourseApplicationsRoute)

app.use('/api/abnahme', abnahmeRoute)

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ Error:"Sorry can't find that! This URL is not supported" })
})
// Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack)
    res.status(500).json({ Error: "Something broke!" })
})

// Connecting to DB
initDB((err: any, db: mongoose.Connection) => {
    if(db){
        console.log("Anbindung von Datenbank erfolgreich")
    }
    else{
        console.log("Anbindung von Datenbank gescheitert")
    }
})

// HTTP Server
const port: number = config.get('server.port');
const host: string = config.get('server.host');
app.listen(port, () => {
    console.log(`Connecting over http://${host}:${port}`)
})

// HTTPS Server
server.listen(443, () => {
    console.log("Connecting Secure Server over port 443")
})
