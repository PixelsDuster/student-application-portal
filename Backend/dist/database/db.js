"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDB = initDB;
exports.close = close;
exports.getDB = getDB;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("config"));
let _db;
const connectionString = config_1.default.get('db.connectionString');
function initDB(callback) {
    if (_db) {
        if (callback) {
            return callback(null, _db);
        }
        else {
            return _db;
        }
    }
    else {
        mongoose_1.default.connect(connectionString);
        _db = mongoose_1.default.connection;
        _db.on('error', console.error.bind(console, 'connection error'));
        _db.once('open', () => {
            console.log("Connected to database " + connectionString + " in DB.js: " + _db);
            callback(null, _db);
        });
    }
}
function close() {
    if (_db) {
        mongoose_1.default.disconnect();
        console.log("Database connection closed.");
    }
}
function getDB() {
    return _db;
}
//# sourceMappingURL=db.js.map