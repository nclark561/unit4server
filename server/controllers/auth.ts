import { Request, Response } from "express";
import * as dotenv from "dotenv";
import User from "../models/user";
//@ts-ignore
import * as bcrypt from "bcryptjs";
//@ts-ignore
import * as jwt from "jsonwebtoken";

const { SECRET } = process.env;

const createToken = (username: string, id: number) => {
  return jwt.sign({ username, id }, SECRET, { expiresIn: "2 days" });
};

module.exports = {
  register: async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body
      const foundUser = await User.findOne({where: {username: username}})
      if(foundUser) {
        res.send('cannot create user').status(400)
      } else {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const newUser = await User.create({username: username, hashedPass: hash})
        const token = createToken(newUser.dataValues.username, newUser.dataValues.id)
        const exp = Date.now() + 1000 * 60 * 60 * 48
        res.send({username: newUser.dataValues.username, id: newUser.dataValues.id, token: token, exp: exp}).status(200)
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(400);
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const {username, password} = req.body
      const foundUser = await User.findOne({where: {username: username}})
      if (foundUser) {
        //@ts-ignore
        const isAuthenticated = bcrypt.compareSync(password, foundUser.hashedPass)
        if (isAuthenticated) {
          const token = createToken(foundUser.dataValues.username, foundUser.dataValues.id)
          const exp = Date.now() + 1000 * 60 * 60 * 48
          res.send({username: foundUser.dataValues.username, id: foundUser.dataValues.id, token: token, exp: exp}).status(200)
        } else {
          res.send('cannot log in').status(400)
        }
      } else {
        res.send('cannot log in').status(400)
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(400);
    }
  },
};
