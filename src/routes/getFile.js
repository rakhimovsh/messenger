import { Router } from "express";
import controller from "../controllers/getFile.js";
import checkToken from "../middleware/checkToken.js";

let router = Router();

router.get("/view/:img", controller.GET);
router.get("/files", checkToken, controller.GETALL);
router.get("/download/:file", controller.DOWNLOAD);

export default router;
