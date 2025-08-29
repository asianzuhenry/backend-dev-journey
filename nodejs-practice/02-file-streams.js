import fs from 'fs';
import zlib from "zlib";

const inputFile = fs.createReadStream('input.txt', 'utf-8')
const backupFile = fs.createWriteStream('backup.txt')
const gzip = zlib.createGzip()

inputFile.pipe(gzip).pipe(backupFile)

