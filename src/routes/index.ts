import authRoutes from "./routes.auth";
import userRoutes from "./routes.user";

import express = require("express");
import { Request, Response, Router } from "express";

const router = Router();

router.use(authRoutes);
router.use(userRoutes);

export default router;
