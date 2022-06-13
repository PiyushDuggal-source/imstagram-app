import { Router } from "express";
import { isFollow } from "../controllers/post.controller";
import { isLoggedIn } from "../middleware/isLoggedIn";

const routes = Router();

routes.get("/api/isFollowed/:userName", isLoggedIn, isFollow);

export default routes;
