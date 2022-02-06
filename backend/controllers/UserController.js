/** @format */

import UserSchema from "../models/UserModel";

//@desc   Add User
//@routes POST /api/user/adduser
//@access PUBLIC
export const addUser = async (req, res) => {
  const { name, email, number } = req.body;

  if (!name || !email || !number) {
    return res.status(200).send({ message: "All fields are required" });
  }

  //check if email already exists
  let user = await UserSchema.findOne({ email: email }).exec();
  if (user) {
    return res.status(200).send({ message: "Email already exists" });
  }

  //check if phone-number already exists
  user = await UserSchema.findOne({ number: number }).exec();
  if (user) {
    return res.status(200).send({ message: "Number already exists" });
  }

  user = await new UserSchema({ name, email, number }).save();
  return res.status(200).send({ success: true });
};

//@desc   Delete User
//@routes DELETE /api/user/deleteuser
//@access PUBLIC
export const deleteUser = async (req, res) => {
  const { id } = req.body;
  const user = await UserSchema.findByIdAndRemove(id).exec();

  return res.status(200).json(user);
};

//@desc   Get User
//@routes POST /api/user/getUser/:id
//@access PUBLIC
export const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await UserSchema.findById(id).exec();

  return res.status(200).json(user);
};

//@desc   Update User
//@routes POST /api/user/updateuser
//@access PUBLIC
export const updateUser = async (req, res) => {
  const { name, email, number, id } = req.body;

  if (!name || !email || !number) {
    return res.status(200).send({ message: "All fields are required" });
  }

  //check if email already exists
  let user = await UserSchema.findOne({ email: email }).exec();

  if (user && user._id.toString() !== id) {
    return res.status(200).send({ message: "Email already exists" });
  }

  //check if phone-number already exists
  user = await UserSchema.findOne({ number: number }).exec();
  if (user && user._id.toString() !== id) {
    return res.status(200).send({ message: "Number already exists" });
  }

  user = await UserSchema.findByIdAndUpdate(id, {
    name,
    email,
    number,
  }).exec();

  return res.status(200).json(user);
};

//@desc   Get All Users
//@routes POST /api/user/getallusers
//@access PUBLIC
export const getAllUsers = async (req, res) => {
  const users = await UserSchema.find({}).exec();
  return res.status(200).json(users);
};
