import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../prisma";
import UserService from "../services/userService";
import { serialize } from 'cookie';

class AuthController {
  async signUp(req: Request, res: Response) {
    try {
      const exists = await prisma.user.findFirst({
        where: {
          OR: [
            {
              email: req.body.email,
            },
            {
              username: req.body.username,
            },
          ],
        },
      });

      if (exists) {
        return res.status(409).send({
          msg: "Username Or Email Already Exists",
        });
      }

      const user = await UserService.createUser(req.body);

      const { token, refresh } = UserService.generateTokensFromUser(user);

      return res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: true,
        })
        .cookie("refresh_token", refresh, {
          httpOnly: true,
          secure: true,
        })
        .status(200)
        .json({
          token,
          user,
        });
    } catch (error) {
      return res.status(500).send({
        msg: "Error At Sign-up",
      });
    }
  }

  async signIn(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await UserService.findUserFromEmail(email);

      if (!user) {
        return res.status(404).send({
          msg: "User Not Exists",
        });
      }

      const verify = await UserService.comparePasswords(user, password);

      if (!verify) {
        return res.status(401).send({
          msg: "User Credentials Are Invalid",
        });
      }

      const { token, refresh } = UserService.generateTokensFromUser(user);

      return res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: true,
        })
        .cookie("refresh_token", refresh, {
          httpOnly: true,
          secure: true,
        })
        .status(200)
        .json({
          token,
          user,
        });
    } catch (error) {
      return res.status(500).send({
        msg: "Error At Sign-up",
      });
    }
  }

  async getProfile(req: Request, res: Response) {
    return res.send({
      user: req.user,
    })
  }
}

export default new AuthController();
