import express, { Request, Response } from 'express';
import cors from 'cors';
import API from './API';
import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';

function Main() {
    const app = express();
    const port = 3000;

    // Middleware
    app.use(cors());
    app.use('/static', express.static(path.join(__dirname, '../Files/')))
/*
    app.get('/hello', async (req: Request, res: Response) => {

        const rangeHeader = req.headers.range
        // check req header if it contains a rage attr
        if (!rangeHeader) throw new Error('Requires Range header')

        // get file stat with fs module to access size
        const videoPath = `../server/Files/Hannibal/Boyzvoice.mp4`;
        const fileData = await fsPromises.stat(videoPath)
        const videoSize = fileData.size

        // split the range header
        const splittedRange = rangeHeader.replace(/bytes=/, '').split('-') as any

        // get the starting byte from req header's range
        const start = parseInt(splittedRange[0])

        // decide the end byte considering chunk size
        const end = splittedRange[1] ? parseInt(splittedRange[1], 10) : videoSize - 1


        // calculate content length
        const contentLength = end - start + 1

        // create and set response headers
        const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4",
        }
        // const remaining = videoSize - start

        // mark the current contet as completed if this is the latest chunk
        // if (remaining < chunkSize) {
        //     userCourseService.updateUserProgress(userId, courseId, contentId)
        // }

        // create a read stream and pipe it ro the res object
        const videoStream = fs.createReadStream(videoPath, { start, end })

        res.writeHead(206, headers)
        videoStream.pipe(res)
    });
*/
    // API
    API(app);

    // Initialize app
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    })
}

Main();