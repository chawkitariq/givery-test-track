import { Request, Response, NextFunction } from "express";

/**
 * Creates an HTTP cache middleware with a given duration.
 *
 * @param seconds Cache duration in seconds.
 * @returns Express middleware that sets the `Cache-Control` header.
 */
export const cache = (seconds: number) => {
  return (_req: Request, res: Response, next: NextFunction) => {
    res.set("Cache-Control", `public, max-age=${seconds}`);
    next();
  };
};
