import express, { Request, Response } from 'express';
import cors from 'cors';
import API from './API';
import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';
import { IMedia } from './types';

let MediaPath = "E:\\Media";
let Indexes: IMedia[] = [];

function Main() {
    const app = express();
    const port = 3000;

    // Middleware
    app.use(cors());
    app.use('/static', express.static(MediaPath));

    ConstructDB();

    // API
    API(app);

    // Initialize app
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    })
}

function ConstructDB() {
    // Recursively read all index.json files in the MediaPath
    function ReadIndexFiles(MediaPath: string) {
        let IndexFiles: string[] = [];
        let Files = fs.readdirSync(MediaPath);
        Files.forEach((File) => {
            if (fs.statSync(path.join(MediaPath, File)).isDirectory()) {
                IndexFiles = IndexFiles.concat(ReadIndexFiles(path.join(MediaPath, File)));
            } else if (File == "index.json") {
                IndexFiles.push(path.join(MediaPath, File));
            }
        })
        return IndexFiles;
    }
    let IndexFiles = ReadIndexFiles(MediaPath);
    // Read all the index.json files
    IndexFiles.forEach((IndexFile) => {
        let Index = JSON.parse(fs.readFileSync(IndexFile, 'utf8'));
        Indexes.push(Index);
    })
    

    console.log(Indexes);
    
}

Main();