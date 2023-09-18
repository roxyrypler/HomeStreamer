import { Request, Response } from 'express';
const JsonFile = require('../../../Files/index.json');

function GetLibraryIndex(req: Request, res: Response) {
    res.json(JsonFile);
}

export default {
    GetLibraryIndex
}