import { Request, Response } from "express";

class AuthController {

    async signUp(req: Request, res: Response) {
        return res.send("signUp")
    }

}

export default new AuthController();