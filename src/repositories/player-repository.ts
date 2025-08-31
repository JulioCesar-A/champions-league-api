import fs from 'fs';
import path from 'path';
import { Player, PlayerResponse, Statistics } from '../models/player/player-models';

const playersFilePath = path.join(__dirname, '../../data/players.json');

const estimateOverallStat = async(stats : Statistics) : Promise<number> => {
    let statsSum: number = 0;

    for (const stat of Object.values(stats)) {
        statsSum += stat;
    }

    const overall: number = statsSum/Object.keys(stats).length;
    return parseFloat(overall.toFixed(1));
}

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

    return foundPlayer;
}

export const getPlayerByName = async(name: string) : Promise<PlayerResponse | undefined> => {
    let playersData: PlayerResponse[] = await getAllPlayers();
    
    const foundPlayer: PlayerResponse | undefined = playersData.find((player) => player.name.includes(name));
    
    return foundPlayer;
}

// export const insertPlayer = async(player : Player, clubId?: number) : Promise<void> => {
//     let playersData: PlayerResponse[] = await getAllPlayers();

//     const newPlayer: Player = player;
//     newPlayer.statistics.overall = await estimateOverallStat(player.statistics);

//     console.log(newPlayer);
// }

// insertPlayer({name: "d", nationality: "d", position: "Forward", statistics: {defending:1,dribbling:1,pace:1,passing:1,physical:1,shooting:3}});
