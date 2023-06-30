import {NextFunction, Request, Response} from "express";

const rovers = require('../services/rovers.service')

async function getRovers(req: Request, res: Response, next: NextFunction) {
    try {
        res.json(await rovers.getRovers());
    } catch (err) {
        console.error('Error when getting rovers');
        next(err);
    }
}

async function getRoverPhotos(req: Request, res: Response, next: NextFunction) {
    try {
        res.json(await rovers.getRoverPhotos(req.params.roverName, req.params.cameraType));
    } catch (err) {
        console.error('Error when getting rovers photos');
        next(err);
    }
}

module.exports = {
    getRovers,
    getRoverPhotos
};
