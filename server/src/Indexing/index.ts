import fs from 'fs';
import path from 'path';

interface FileMetadata {
  name: string;
  type: string;
  path: string;
}

function findMediaFiles(rootDir: string, extensions: string[]): FileMetadata[] {
  const results: FileMetadata[] = [];

  function traverse(directory: string) {
    const files = fs.readdirSync(directory);

    for (const file of files) {
      const filePath = path.join(directory, file);
      const stats = fs.statSync(filePath);

      if (stats.isFile()) {
        const fileExtension = path.extname(filePath).toLowerCase();
        if (extensions.includes(fileExtension)) {
          results.push({
            name: file,
            type: fileExtension,
            path: filePath,
          });
        }
      } else if (stats.isDirectory()) {
        traverse(filePath);
      }
    }
  }

  traverse(rootDir);
  return results;
}

function saveToJson(filePath: string, data: any) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

const rootDirectory = '../../Videos'; // Replace with your actual root directory
const extensionsToFind = ['.mp4', '.jpg'];

const mediaFiles = findMediaFiles(rootDirectory, extensionsToFind);

const outputPath = './mediaFiles.json'; // Replace with your desired output path
saveToJson(outputPath, mediaFiles);



export default {

}
