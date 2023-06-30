import {Response} from "express";

const fetch = require('node-fetch');

const API_KEY: string = 'qCIhKTwwGZYeEzsUisjqptL5yZg9dgNElGJYDBv0';
const nasaRoversURL: string = 'https://api.nasa.gov/mars-photos/api/v1/rovers';

const CameraEnum = {
    FHAZ: 'fhaz',
    RHAZ: 'rhaz',
    MAST: 'mast',
    CHEMCAM: 'chemcam',
    MAHLI: 'mahli',
    MARDI: 'mardi',
    NAVCAM: 'navcam',
    PANCAM: 'pancam',
}

async function getRovers() {
    return await fetch(nasaRoversURL + '?api_key=' + API_KEY).then((res: Response) => res.json());
}

async function getRoverPhotos(roverName: string, cameraType: string) {
    if(!Object.values(CameraEnum).find(cam => cam === cameraType)) {
        return {error: 'Camera type is not valid.'};
    }

    return await fetch(nasaRoversURL + `/${roverName}/photos?sol=1000&camera=${cameraType}&page=1&api_key=${API_KEY}`)
        .then((res: Response) => res.json());
}

module.exports = {
    getRovers,
    getRoverPhotos
}
