import { Request, Response } from "express";

module.exports = {
  register: (req: Request, res: Response) => {
    try {
      console.log("welcome");
      res.sendStatus(200)
    } catch (err) {
      console.error(err);
       res.sendStatus(400)
    }
  },

  login: (req: Request, res: Response) => {
    try {
        console.log("hi");
        res.sendStatus(200)
      } catch (err) {
        console.error(err);
         res.sendStatus(400)
      }
  },
};
