import { readdirSync } from 'fs';
import Localdb from "./dbcontroller.js";
import config from "../../config.js";

const BASEPATH = config.vdbPath.fromGetVdbData;

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
        let progress = {};
        if (!i.isDirectory()) {
            Localdb.GetProgress({
                username: username,
                entity: `${entity}/${i.name}`
            },
            (data) => {
                if (data.currentTime > 0) {
                    progress.haveStarted = true;
                }else {
                    progress.haveStarted = false;
                }
                progress.currentTime = data.currentTime;
                progress.entityDuration = data.entityDuration;
            });
        }

        out.push({
            name: i.name,
            path: `${entity}/${i.name}`,
            isPlayable: !i.isDirectory(),
            progress
        });
    });
    return out;
}

export default {
    GetMediaType,
    GetEntity
}