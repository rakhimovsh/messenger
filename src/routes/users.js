import { Router } from "express";
import controller from "../controllers/users.js";
import validation from "../middleware/validation.js";
import checkToken from "../middleware/checkToken.js";
let router = Router();

router.post("/login", validation, controller.LOGIN);
router.post("/register", validation, controller.REGISTER);
router.get("/users", checkToken, controller.GET);

export default router;
