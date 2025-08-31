import fs from 'fs';
import path from 'path';
import { PlayerResponse } from '../models/player/player-models';

const playersFilePath = path.join(__dirname, '../../data/players.json');

export const getAllPlayers = async() : Promise<PlayerResponse[]> => {
    let playersData : PlayerResponse[] = [];

    try {
        if (fs.existsSync(playersFilePath)) {
            const fileContent = fs.readFileSync(playersFilePath, 'utf-8');
            playersData = JSON.parse(fileContent);
        }
    } catch (error) {
        console.error('Error reading clubs data:', error);
    }

    return playersData;
}

export const getPlayerById = async(id: number) : Promise<PlayerResponse | undefined> => {
    let playersData: PlayerResponse[] = await getAllPlayers();

    const foundPlayer: PlayerResponse | undefined = playersData.find((player) => player.id === id);

    console.dir(foundPlayer, {depth:null});        
    return foundPlayer;
}
