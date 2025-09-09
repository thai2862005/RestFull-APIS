import express from 'express';
import { Express } from 'express';
import { get } from 'http';
import { getUserById } from '../controller/api.controller';
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

router.get("/user/:id",getUserById);
export default webRouter;
