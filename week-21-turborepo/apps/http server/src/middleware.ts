import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from "./config";

declare global {
    namespace Express {
      interface Request {
        userId: JwtPayload
      }
    }
  }

export const middleware = (req:Request ,res:Response ,next:NextFunction) => {

    try {
        
        const token = req.headers["authorization"];

    if(!token){
        res.status(401).json({
            message:"No tokens found"
        })
        return
    }

    const decoded = jwt.verify(token , JWT_SECRET);
    

    if(!decoded){
        res.status(401).json({
            message:"Not Authorizerd"
        })
        return
    }

    if(typeof decoded == "string") {
        res.status(401).json({
            message:"jwt payload is expected"
        })
        return;
    }

    req.userId = decoded.userId
    next()

    } catch (error) {
        res.status(401).json({
            message:"wrong token"
        })
    }

}