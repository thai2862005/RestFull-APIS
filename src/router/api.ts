import express from 'express';
import { Express } from 'express';
const router = express.Router();
const webRouter =(app:Express) => {
  router.get("/", (req, res) => {
    res.send("Hello World!");
  });
router.get("/hoidanit", (req, res) => {
  res.send("Hello Eric");
});
    app.use("/", router);
};
export default webRouter;
