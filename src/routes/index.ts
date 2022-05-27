import authRoutes from "./routes.auth";
import userRoutes from "./routes.user";
import * as path from "path";

import express = require("express");
import { Request, Response, Router } from "express";

const router = Router();

if (process.env.NODE_ENV === "production") {
  router.use(express.static("personalProjectFE/build"));
  router.get("*", (req: Request, res: Response) => {
    res.sendFile(
      path.resolve(__dirname, "personalProjectFE", "build", "index.html")
    );
  });
}

router.use(authRoutes);
router.use(userRoutes);

export default router;
