import express from "express";

const adminRouter = express.Router();

// hard coded database
interface ProductInterface {
  title: string;
  desc: string;
}

const products: ProductInterface[] = [];

adminRouter.get("/add-product", (_req, res, _next) => {
  res.render("add-product");
});

adminRouter.post("/add-product", (req, res, _next) => {
  const { title, desc } = req.body;

  if (title === "" || desc === "") {
    const errorMessage = (): string => {
      if (title !== "") {
        return "there is no description!";
      }

      return "there is no title!";
    };

    const msg = errorMessage();

    return res.status(400).render("add-product", { title, desc, msg });
  }

  products.push({ title, desc });
  res.redirect("/");
});

export default adminRouter;
export { products, ProductInterface };
