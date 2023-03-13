const express = require("express");
const fs = require("fs");
const config = require("./config");
const Manager = require("./src/Manager");
const MyFileSystem = require("./src/MyFileSystem");
const Message = require("./src/Message");
const TableTime = require("./src/TableTime");
const app = express();

const mgUser = new Manager(
  MyFileSystem.read(MyFileSystem.join("./src/data/managerUser.json"))
);

const mgTableTime = new Manager();

for (let id of mgUser.getListId()) {
  if (!mgTableTime.has(id)) {
    const tb = new TableTime(mgUser.get(id));
    await tb.getNow(id);
    tb.autoStoreData(30);
  }
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({
    status: true,
    message: "Success!",
  });
});

app.get("/webhook", (req, res) => {
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];
  if (mode && token) {
    if (mode === "subscribe" && token === config.page.verifyToken) {
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});

app.post("/webhook", (req, res) => {
  const listMess = Message.formatMessage(req);
  for (let info of listMess) {
    console.log(info);
  }
});
