import { Request } from "express";
import passport from "passport";
import { Strategy as JWTStrategy } from "passport-jwt";
import prisma from "../prisma";

passport.use(
  new JWTStrategy(
    {
      secretOrKey: "secret_key",
      jwtFromRequest: (req: any) => {
        let token = null;

        if (req && req.signedCookies && req.signedCookies["acccess_token"]) {
          token = req.signedCookies["access_token"];
        }

        return token;
      },
    },
    async (payload, done) => {
      try {
        const user = await prisma.user.findUnique({
          where: {
            id: payload.id,
          },
        });

        if (!user) {
          return done(true);
        }

        return done(null, user);
      } catch (error) { 
        return done(error);
      }
    }
  )
);
