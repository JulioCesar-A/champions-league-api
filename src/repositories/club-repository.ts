import fs from 'fs/promises';
import path from 'path';
import { ClubResponse, Club, ClubUpdate } from '../models/club/club-models';


const clubsFilePath = path.join(__dirname, '../../data/clubs.json');

export const getAllClubs = async() : Promise<ClubResponse[]> => {
    let clubsData: ClubResponse[] = [];
    try {
        const fileContent = await fs.readFile(clubsFilePath, 'utf-8');
        clubsData = JSON.parse(fileContent);
        
    } catch (error) {
        console.error('Error reading clubs data:', error);
    }
    return clubsData;
}

export const getClubById = async (id : number) : Promise<ClubResponse | undefined> => {
    let clubsData: ClubResponse[] = await getAllClubs();

    const foundClub : ClubResponse | undefined = clubsData.find((club) => club.id === id);

    return foundClub;
}

export const getClubByName = async (name : string) : Promise<ClubResponse | undefined> => {
    let clubsData: ClubResponse[] = await getAllClubs();
    
    const foundClub : ClubResponse | undefined = clubsData.find((club) => club.name.includes(name));

    return foundClub;
}

export const insertClub = async(club: Club) : Promise<ClubResponse> =>{
    let clubsData: ClubResponse[] = await getAllClubs();

    const existingIndex = clubsData.findIndex((c) => c.name === club.name && c.location === club.location);
    if (existingIndex !== -1) {
        throw new Error('Club already exists');
    }

    const maxId = clubsData.reduce((max, club) => club.id > max ? club.id : max, 0);
    const newClub: ClubResponse = {
        ...club,
        id: maxId + 1
    }

    clubsData.push(newClub);

    try {
        await fs.writeFile(clubsFilePath, JSON.stringify(clubsData, null, 2), 'utf8');
    } catch (error) {
        console.error('Failed to write club data to file', error);
        throw new Error('Could not save club to database');

    }
    console.table(clubsData);

    return clubsData[clubsData.length-1];
}