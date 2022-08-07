import { Request } from "express";
import passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import prisma from "../prisma";

passport.use(
  new JWTStrategy(
    {
      secretOrKey: "secret_key",
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
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
        console.log(error);
        return done(error);
      }
    }
  )
);
