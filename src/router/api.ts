import express from 'express';
import { Express } from 'express';
import { getAllUserApi, getUserById, postCreateUserApi, DeleteUserapi, putUpdateUserApi,loginApi } from '../controller/api.controller';
import { CheckJwt } from '../midlewhere/jwt.midlewhere';
const router = express.Router();
const webRouter =(app:Express) => {
  router.get("/", (req, res) => {
    res.send("Hello World!");
  });
router.get("/hoidanit", (req, res) => {
  res.send("Hello Eric");
});
router.get("/users/:id", getUserById);
router.get("/users", CheckJwt, getAllUserApi);
router.post("/users", postCreateUserApi);
router.delete("/users/:id", DeleteUserapi);
router.put("/users/:id", putUpdateUserApi);
router.post("/login",loginApi);
    app.use("/api", router);

};


export default webRouter;
