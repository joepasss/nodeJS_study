import { RequestHandler } from "express";

const getNotfoundPage: RequestHandler = (_req, res, _next) => {
  res.status(404).render("not-found");
};

export { getNotfoundPage };
