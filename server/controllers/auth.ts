module.exports = {
  register: (req: Request, res: Response) => {
    try {
      console.log(req);
      console.log("welcome");
      //@ts-ignore
      res.sendStatus(200)
    } catch (err) {
      console.error(err);
       //@ts-ignore
       res.sendStatus(400)
    }
  },

  login: (req: Request, res: Response) => {
    console.log("hi");
  },
};
