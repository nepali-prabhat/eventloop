import fs from "node:fs";
import { Console } from "node:console";
import {URL} from "node:url";
const output = fs.createWriteStream(
    new URL("../outputs/stdout.log", import.meta.url)
);
const errorOutput = fs.createWriteStream(
    new URL("../outputs/stderr.log", import.meta.url)
);
const console = new Console({ stdout: output, stderr: errorOutput });

export default console;
