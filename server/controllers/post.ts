import { Request, Response } from "express";
import User from "../models/user";
import Post from "../models/post";

module.exports = {
  getAllPosts: async (req: Request, res: Response) => {
    try {
      const posts = await Post.findAll({
        where: { privateStatus: false },
        include: [
          {
            model: User,
            required: true,
            attributes: [`username`],
          },
        ],
      });
      res.status(200).send(posts);
    } catch (error) {
      console.log("ERROR IN getAllPosts");
      console.log(error);
      res.sendStatus(400);
    }
  },

  getCurrentUserPosts: async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
      const posts = await Post.findAll({
        where: { userId: userId },
        include: [
          {
            model: User,
            required: true,
            attributes: [`username`],
          },
        ],
      });
      res.status(200).send(posts);
    } catch (error) {
      console.log("ERROR IN getCurrentUserPosts");
      console.log(error);
      res.sendStatus(400);
    }
  },

  addPost: async (req: Request, res: Response) => {
    try {
      const { title, content, status, userId } = req.body;
      await Post.create({
        title: title,
        content: content,
        privateStatus: status,
        userId: userId,
      });
      res.sendStatus(200);
    } catch (err) {
      console.error(err);
      res.sendStatus(400);
    }
  },

  editPost: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      await Post.update({ privateStatus: status }, { where: { id: +id } });
      res.sendStatus(200);
    } catch (err) {
      console.error(err);
      res.sendStatus(400);
    }
  },

  deletePost: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await Post.destroy({ where: { id: +id } });
      res.sendStatus(200);
    } catch (err) {
      console.error(err);
      res.sendStatus(400);
    }
  },
};
