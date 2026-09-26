import { Request, Response, NextFunction } from "express";

export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session.userId) {
    return res.status(401).json({
      message: "Authentication required",
    });
  }

  if (req.session.role !== "admin") {
    return res.status(403).json({
      message: "Admin access required",
    });
  }

  next();
};