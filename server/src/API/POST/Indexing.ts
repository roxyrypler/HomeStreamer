import { Request, Response } from "express";

export default async function Indexing(req: Request, res: Response) {
    res.send('Hello World!')
};