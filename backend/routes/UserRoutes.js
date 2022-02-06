/** @format */

import express from "express";
import {
  addUser,
  deleteUser,
  updateUser,
  getUser,
  getAllUsers,
} from "../controllers/UserController";
const router = express.Router();

router.route("/adduser").post(addUser);
router.route("/deleteuser").delete(deleteUser);
router.route("/getuser/:id").get(getUser);
router.route("/getallusers").get(getAllUsers);
router.route("/updateuser").post(updateUser);

export default router;
