import { Request, Response, NextFunction } from "express";

export const cache = (seconds: number) => {
  return (_req: Request, res: Response, next: NextFunction) => {
    res.set("Cache-Control", `public, max-age=${seconds}`);
    next();
  };
};