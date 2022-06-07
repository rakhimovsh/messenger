import express from "express";
import fileupload from "express-fileupload";
import cors from "cors";
import path from "path";
import fs from "fs";
const PORT = process.env.PORT || 5000;

let app = express();
app.use(cors());
app.use(express.json());
app.use(fileupload());

//import routers
import userRouter from "./routes/users.js";
import getFileRouter from "./routes/getFile.js";
import messagRoute from "./routes/messages.js";

app.use(userRouter);
app.use(getFileRouter);
app.use(messagRoute);

app.use((err, req, res, next) => {
  if (err.status != 500) {
    return res.status(err.status).send({
      status: err.status,
      message: err.message,
    });
  }
  fs.appendFileSync(
    path.join(process.cwd(), "src", "log.txt"),
    `${req.url}______${err.name}_____${Date.now()}_______${err.status}______${
      err.message
    }`
  );
  res.status(err.status).send({
    status: err.status,
    message: "InternalServerError",
  });
  process.exit();
});

app.listen(PORT, () => console.log(`*${PORT}`));
