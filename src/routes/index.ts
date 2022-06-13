import authRoutes from "./routes.auth";
import userRoutes from "./routes.user";
import postRoutes from "./routes.post";
import { Router } from "express";

const router = Router();

router.use(authRoutes);
router.use(userRoutes);
router.use(postRoutes);

export default router;
