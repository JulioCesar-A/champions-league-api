import fs from 'fs/promises';
import path from 'path';
import { ClubResponse, Club, ClubUpdate } from '../models/club/club-models';


const clubsFilePath = path.join(__dirname, '../../data/clubs.json');

const fixClubIds = async (): Promise<void> => {
    let clubsData: ClubResponse[] = await getAllClubs();
    clubsData.sort((a, b) => a.id - b.id);
    clubsData = clubsData.map((club, index) => ({
        ...club,
        id: index + 1
    }));
    try {
        await fs.writeFile(clubsFilePath, JSON.stringify(clubsData, null, 2), 'utf8');
    } catch (error) {
        console.error('Failed to fix club ids', error);
        throw new Error('Could not fix club ids');
    }
}

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

export const getClubById = async (id : number) : Promise<ClubResponse> => {
    let clubsData: ClubResponse[] = await getAllClubs();

    const foundClub : ClubResponse | undefined = clubsData.find((club) => club.id === id);

    if (!foundClub) {
        throw new Error('Club not found');
    }

    return foundClub;
}

export const getClubByName = async (name : string) : Promise<ClubResponse> => {
    let clubsData: ClubResponse[] = await getAllClubs();
    
    const foundClub : ClubResponse | undefined = clubsData.find((club) => club.name.includes(name));

    if (!foundClub) {
        throw new Error('Club not found');
    }

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

    await fixClubIds();

    const updatedClubs = await getAllClubs();
    return updatedClubs[updatedClubs.length-1];
}

export const updateClub = async(club: ClubUpdate, id: number) : Promise<ClubResponse> => {
    let clubsData: ClubResponse[] = await getAllClubs();

    const clubIndex = clubsData.findIndex((c) => c.id === id);
    if (clubIndex === -1) {
        throw new Error('club not found');
    }

    const updatedClub = clubsData[clubIndex] = {
        ...clubsData[clubIndex],
        ...club,
        id: id
    }

    try {
        await fs.writeFile(clubsFilePath, JSON.stringify(clubsData, null, 2), 'utf8');
    } catch (error) {
        console.error('Failed to write club data to file', error);
        throw new Error('Could not update club to database');
    }

    await fixClubIds();

    const updatedClubs = await getAllClubs();
    return updatedClubs[updatedClubs.length-1];
}

export const deleteClubById = async(id: number) : Promise<void> => {
    let clubsData: ClubResponse[] = await getAllClubs();

    const clubIndex = clubsData.findIndex((p) => p.id === id);
    if (clubIndex === -1) {
        throw new Error('club not found');
    }

    clubsData.splice(clubIndex, 1);

    try {
        await fs.writeFile(clubsFilePath, JSON.stringify(clubsData, null, 2), 'utf8');
    } catch (error) {
        console.error('Failed to write club data to file', error);
        throw new Error('Could not delete club from database');
    }

    await fixClubIds();
}
