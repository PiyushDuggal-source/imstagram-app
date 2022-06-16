import { Router } from "express";
import { checkIfFollow } from "../controllers/profile.controller";
import { isLoggedIn } from "../middleware/isLoggedIn";
const routes = Router();

routes.get("/api/checkFollow/:userName", isLoggedIn, checkIfFollow);

export default routes;
