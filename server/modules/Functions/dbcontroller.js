import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url));

const usersFile = join(__dirname, '../../db/users.json');
const progressFile = join(__dirname, '../../db/progress.json');
const userAdapter = new JSONFile(usersFile);
const progressAdapter = new JSONFile(progressFile);
const userDB = new Low(userAdapter);
const progressDB = new Low(progressAdapter);

await userDB.read();
await progressDB.read();

let CreateUser = async (data, callback) => {
    let returnData = null;

    userDB.data.users.forEach((i) => {
        if (i.username == data.username) {
            returnData = {
                userError: "User already exists"
            }
        }
    });

    if (returnData == null) {
        userDB.data.users.push({
            username: data.username,
            password: data.password
        });
        await userDB.write();

        returnData = {
            msg: "User created!"
        }
    }

    callback(returnData);
}

let Login = async (data, callback) => {
    let returnData = null;
    userDB.data.users.forEach((i) => {
        if (i.username == data.username && i.password == data.password) {
            returnData = {
                authentication: "success",
                username: i.username
            }
        }
    });

    if (returnData == null) {
        returnData = {
            authentication: "failed"
        }
    }

    callback(returnData);
}

let SaveProgress = (data) => {
    progressDB.data.progress.forEach((i) => {
        if (i.username == data.username) {
            let doesExist = false;
            i.saved.forEach((k) => {
                if (k.entity == data.entity) {
                    k.currentTime = data.currentTime;
                    doesExist = true;
                    progressDB.write();
                }
            });
            if (!doesExist) {
                i.saved.push({
                    entity: data.entity,
                    currentTime: data.currentTime
                });
                progressDB.write();
            }
        }
    });
}

let GetProgress = (data, callback) => {
    progressDB.data.progress.forEach((i) => {
        if (i.username == data.username) {
            let doesExist = false;
            i.saved.forEach((k) => {
                if (k.entity == data.entity) {
                    doesExist = true;
                    callback({
                        currentTime: k.currentTime
                    });
                }
            });
            if (!doesExist) {
                callback({
                    currentTime: 0
                });
            }
        }
    });

}

export default {
    CreateUser,
    Login,
    SaveProgress,
    GetProgress
}