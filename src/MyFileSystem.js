const fs = require("fs");
const path = require("path");
class MyFileSystem {
  static save(path, data) {
    fs.writeFileSync(path, JSON.stringify(data, null, 2), "utf-8");
  }
  static read(mpath) {
    const p = path.dirname(mpath);
    if (!fs.existsSync(p)) {
      fs.mkdirSync(p, { recursive: true });
      fs.writeFileSync(mpath, "{}", "utf-8");
    }
    return JSON.parse(fs.readFileSync(mpath, "utf-8"));
  }
  static join(path) {
    return path.join(__dirname, path);
  }
}

module.exports = MyFileSystem;
