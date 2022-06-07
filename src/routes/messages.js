import { Router } from "express";
import controller from "../controllers/messages.js";
import checkToken from "../middleware/checkToken.js";
const router = Router();

router.post("/messages", checkToken, controller.POST);
router.get("/messages", checkToken, controller.GET);

export default router;
