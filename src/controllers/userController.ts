import { Request, Response } from "express";
import path from "path";
import prisma from "../prisma";

class UserController {
  async getProfile(req: Request, res: Response) {
    return res.send({
      user: req.user,
    });
  }

  async uploadAvatar(req: Request, res: Response) {
    try {
      const user: any = req.user;
      const file: any = req.files?.avatar;
      const arr = file.name.split(".");
      const fileName = `${user.username}.${arr[arr.length - 1]}`
      const upload_path = path.join(__dirname, "../../uploads/" + fileName);

      file.mv(upload_path, (err: any) => {
        console.log(err);
        if (err) {
          return res.status(500).send({
            msg: "Error Saving Avatar",
          });
        }
      });


      const updatedUser = await prisma.user.update({
        where: {
          id: user?.id,
        },
        data: {
          ...user,
          avatarUrl: "http://localhost:8080/avatar/" + fileName,
        },
      });

      return res.status(200).send({
        user: updatedUser,
      });
    } catch (error) {
      return res.status(500).send({
        error,
      });
    }
  }
}

export default new UserController();
