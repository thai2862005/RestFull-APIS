import express from 'express';
import { Express } from 'express';
import { getAllUserApi, getUserById, postCreateUserApi, DeleteUserapi, putUpdateUserApi } from '../controller/api.controller';
const router = express.Router();
const webRouter =(app:Express) => {
  router.get("/", (req, res) => {
    res.send("Hello World!");
  });
router.get("/hoidanit", (req, res) => {
  res.send("Hello Eric");
});
router.get("/users/:id", getUserById);
router.get("/users", getAllUserApi);
router.post("/users", postCreateUserApi);
router.delete("/users/:id", DeleteUserapi);
router.put("/users/:id", putUpdateUserApi);
    app.use("/api", router);

};


export default webRouter;
