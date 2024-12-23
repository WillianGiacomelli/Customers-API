import { Request, Response, NextFunction } from "express";
import { ResponseModel } from "../models/response/responseModel";


const verifyAuth = (req: Request, res: Response, next: NextFunction) : any => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json(ResponseModel.error('Token not provided'));
    }

    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer') {
        return res.status(401).json(ResponseModel.error('Token malformatted'));
    }

    if (token !== 'ABCDEFGH123456') {
        return res.status(401).json(ResponseModel.error('Token invalid'));
    }

    return next();
}

export { verifyAuth }