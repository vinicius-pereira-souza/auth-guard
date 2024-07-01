import express, { Request, Response } from "express";
import UserRoutes from "./userRoutes";

const router = express();

router.use("/api/users", UserRoutes);

// test route
router.get("/", (req: Request, res: Response) => {
  res.send("API Is Working!");
});

export default router;
