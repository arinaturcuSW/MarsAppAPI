import {Response} from "express";
import {PhotosParams} from "../types";

const fetch = require('node-fetch');

const API_KEY: string = 'qCIhKTwwGZYeEzsUisjqptL5yZg9dgNElGJYDBv0';
const nasaRoversURL: string = 'https://api.nasa.gov/mars-photos/api/v1/rovers';

const CamerasEnum = {
    FHAZ: 'fhaz',
    RHAZ: 'rhaz',
    MAST: 'mast',
    CHEMCAM: 'chemcam',
    MAHLI: 'mahli',
    MARDI: 'mardi',
    NAVCAM: 'navcam',
    PANCAM: 'pancam',
    MINITES: 'minites'
}

const RoversEnum = {
    CURIOSITY: 'curiosity',
    OPPORTUNITY: 'opportunity',
    SPIRIT: 'spirit'
}

async function getCameras() {
    return Object.values(CamerasEnum);
}

async function getRoverNames() {
    return Object.values(RoversEnum);
}

async function getRovers() {
    return await fetch(`${nasaRoversURL}?api_key=${API_KEY}`).then((res: Response) => res.json());
}

async function getRoverPhotos(params: PhotosParams) {
    if (params.cameraType && !Object.values(CamerasEnum).find(cam => cam === params.cameraType)) {
        throw Error('Camera type is not valid.');
    }

    if (!Object.values(RoversEnum).find(rover => rover === params.roverName)) {
        throw new Error('Rover name is not valid.')
    }

    let data: Object[] = [];

    if (params.paginationStart && params.paginationEnd && params.paginationStart <= params.paginationEnd && !params.page) {
        for (let page = params.paginationStart; page < params.paginationEnd; page++) {
            const url = `${nasaRoversURL}/${params.roverName}/photos` +
                `?sol=${params.sol}` +
                `${params.cameraType ? `&camera=${params.cameraType}` : ''}` +
                `${params.earthDate ? `&earth_date=${params.earthDate}` : ''}` +
                `&page=${page}` +
                `&api_key=${API_KEY}`;

            const response = await fetch(url).then((res: Response) => res.json());
            if (!response.photos) {
                console.log(response);
                continue;
            }

            data = [...data, response.photos];
        }

        return {photos: data};
    }

    const url = `${nasaRoversURL}/${params.roverName}/photos` +
        `?sol=${params.sol}` +
        `${params.cameraType ? `&camera=${params.cameraType}` : ''}` +
        `${params.earthDate ? `&earth_date=${params.earthDate}` : ''}` +
        `&page=${params.page}` +
        `&api_key=${API_KEY}`;

    return await fetch(url).then((res: Response) => res.json());
}

module.exports = {
    getRovers,
    getRoverPhotos,
    getRoverNames,
    getCameras
}
