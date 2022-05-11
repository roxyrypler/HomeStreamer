import { readdirSync } from 'fs';
import Localdb from "./dbcontroller.js";

const BASEPATH = "../../../../../media/pi/Backup Plus/server/HomeStreamer/server/vdb";

let GetMediaType = () => {
    let data = readdirSync(BASEPATH, { withFileTypes: true });
    let out = [];
    data.forEach((i) => {
        if (i.isDirectory()) {
            out.push({
                name: i.name
            });
        }
    });
    return out;
}

let GetEntity = (entity, username) => {
    let data = readdirSync(`${BASEPATH}/${entity}`, { withFileTypes: true });
    let out = [];
    data.forEach((i) => {
        let entityStarted = false;
        if (!i.isDirectory()) {
            Localdb.GetProgress({
                username: username,
                entity: `${entity}/${i.name}`
            },
            (data) => {
                if (data.currentTime > 0) {
                    entityStarted = true;
                }
            });
        }

        out.push({
            name: i.name,
            path: `${entity}/${i.name}`,
            isPlayable: !i.isDirectory(),
            haveStarted: entityStarted
        });
    });
    return out;
}

export default {
    GetMediaType,
    GetEntity
}