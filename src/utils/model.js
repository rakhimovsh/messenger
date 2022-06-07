import fs from "fs";
import path from "path";

export function read(fileName) {
  let data = fs.readFileSync(
    path.join(process.cwd(), "src", "database", fileName + ".json"),
    "utf8"
  );
  return JSON.parse(data) || [];
}

export function write(fileName, data) {
  fs.writeFileSync(
    path.join(process.cwd(), "src", "database", fileName + ".json"),
    JSON.stringify(data, null, 4)
  );
  return true;
}
