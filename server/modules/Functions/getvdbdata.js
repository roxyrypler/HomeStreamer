import { readdirSync } from 'fs';

const BASEPATH = "server/vdb";

let GetMediaType = () => {
    let data = readdirSync(BASEPATH, { withFileTypes: true });
    let out = [];
    data.forEach((i) => {
        if (i.isDirectory()) {
            console.log(i.name);
            out.push({
                name: i.name
            });
        }
    });
    return out;
}

let GetEntity = (collection) => {
    let data = readdirSync(`${BASEPATH}/${collection}`, { withFileTypes: true });
    let out = [];
    data.forEach((i) => {
        console.log(i);
        out.push({
            name: i.name,
            path: `${BASEPATH}/${collection}/${i.name}`,
            isPlayable: !i.isDirectory()
        });
    });
    return out;
}

export default {
    GetMediaType,
    GetEntity
}