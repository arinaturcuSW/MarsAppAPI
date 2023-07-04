import {NextFunction, Request, Response} from "express";
import {PhotosParams} from "../types";

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
        res.json(await rovers.getRoverPhotos(
            {
                roverName: req.params.roverName,
                cameraType: req.params.cameraType,
                page: Number(req.query?.page),
                paginationStart: Number(req.query?.paginationStart),
                paginationEnd: Number(req.query?.paginationEnd),
                sol: req.query?.sol ? req.query.sol : 1000,
            } as PhotosParams)
        );
    } catch (err) {
        console.error('Error when getting rovers photos');
        next(err);
    }
}

async function getRoverNames(req: Request, res: Response, next: NextFunction) {
    try {
        res.json(await rovers.getRoverNames());
    } catch (err) {
        console.error('Error when getting rover names');
        next(err);
    }
}

async function getCameras(req: Request, res: Response, next: NextFunction) {
    try {
        res.json(await rovers.getCameras());
    } catch (err) {
        console.error('Error when getting cameras');
        next(err);
    }
}

module.exports = {
    getRovers,
    getRoverPhotos,
    getRoverNames,
    getCameras
};
