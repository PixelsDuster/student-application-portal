"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const db_1 = require("./database/db");
const publicUserRoute_1 = __importDefault(require("./endpoints/publicUsers/publicUserRoute"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/publicUsers', publicUserRoute_1.default);
// Connecting to DB
(0, db_1.initDB)((err, db) => {
    if (db) {
        console.log("Anbindung von Datenbank erfolgreich");
    }
    else {
        console.log("Anbindung von Datenbank gescheitert");
    }
});
/* Error Handler */
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});
app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that! This URL is not supported");
});
const port = config_1.default.get('server.port');
const host = config_1.default.get('server.host');
app.listen(port, host, () => {
    console.log(`Connecting over http://${host}:${port}`);
});
//# sourceMappingURL=httpServer.js.map