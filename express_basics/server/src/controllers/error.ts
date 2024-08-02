import { RequestHandler } from "express";

const getNotfoundPage: RequestHandler = (_req, res, _next) => {
  res.status(404).json({ message: "ERROR!: Page not Found" });
};

export { getNotfoundPage };
