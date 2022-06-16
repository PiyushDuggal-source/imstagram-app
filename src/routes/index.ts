import authRoutes from "./routes.auth";
import userRoutes from "./routes.user";
import postRoutes from "./routes.post";
import profileRoutes from "./routes.profile";
import { Router } from "express";

const router = Router();

router.use(authRoutes);
router.use(userRoutes);
router.use(postRoutes);
router.use(profileRoutes);

export default router;
