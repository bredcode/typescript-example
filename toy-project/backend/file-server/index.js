const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const port = 3000;

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(".").slice(0, -1).join(".");
    const fileExt = file.originalname.split(".").slice(-1);
    console.log("file.originalname: ", file.originalname, " fileName: ", fileName, "fileExt: ", fileExt);
    cb(null, file.originalname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.any(), (req, res) => {
  res.send("파일 업로드 성공");
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행중입니다.`);
});
