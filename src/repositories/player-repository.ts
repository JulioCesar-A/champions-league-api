import fs from 'fs/promises';
import path from 'path';
import { Player, PlayerResponse, PlayerUpdate, Statistics } from '../models/player/player-models';

const playersFilePath: string = path.join(__dirname, '../../data/players.json');

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
        const fileContent = await fs.readFile(playersFilePath, 'utf-8');
        playersData = JSON.parse(fileContent);
    } catch (error) {
        console.error('Error reading players data:', error);
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
    
    if (!foundPlayer){
        throw new Error("Player not found");
    }

    return foundPlayer;
}

export const insertPlayer = async(player : Player, clubId?: number) : Promise<PlayerResponse> => {
    let playersData: PlayerResponse[] = await getAllPlayers();

    const existingIndex = playersData.findIndex((p) => p.name === player.name);
    if (existingIndex !== -1) {
        throw new Error('Player already exists');
    }
    
    const newPlayer: PlayerResponse ={
        ...player,
        id: playersData.length + 1,
        clubId: clubId ?? player.clubId ?? undefined
    }
    
    if(!newPlayer.statistics.overall) {
        newPlayer.statistics.overall = await estimateOverallStat(player.statistics);
    }

    playersData.push(newPlayer);

    try {
        await fs.writeFile(playersFilePath, JSON.stringify(playersData, null, 2), 'utf8');
    } catch (error) {
        console.error('Failed to write player data to file', error);
        throw new Error('Could not save player to database');
    }

    return playersData[playersData.length-1];
}

export const updatePlayer = async(
    player: PlayerUpdate,
    id: number
) : Promise<PlayerResponse> => {
    let playersData: PlayerResponse[] = await getAllPlayers();

    const playerIndex = playersData.findIndex((p) => p.id === id);
    if (playerIndex === -1) {
        throw new Error('Player not found');
    }

    const updatedPlayer = playersData[playerIndex] = {
        ...playersData[playerIndex],
        ...player,
        id: id,
        statistics: {
            ...playersData[playerIndex].statistics,
            ...player.statistics
        }
    };

    try {
        await fs.writeFile(playersFilePath, JSON.stringify(playersData, null, 2), 'utf8');
    } catch (error) {
        console.error('Failed to write player data to file', error);
        throw new Error('Could not update player to database');
    }

    return updatedPlayer;
}

export const deletePlayerById = async(id: number) : Promise<void> => {
    let playersData: PlayerResponse[] = await getAllPlayers();

    const playerIndex = playersData.findIndex((p) => p.id === id);
    if (playerIndex === -1) {
        throw new Error('Player not found');
    }

    playersData.splice(playerIndex, 1);

    try {
        await fs.writeFile(playersFilePath, JSON.stringify(playersData, null, 2), 'utf8');
    } catch (error) {
        console.error('Failed to write player data to file', error);
        throw new Error('Could not delete player from database');
    }

}