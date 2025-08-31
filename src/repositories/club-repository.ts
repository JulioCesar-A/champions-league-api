import fs from 'fs';
import path from 'path';
import { ClubResponse } from '../models/club/club-models';


const clubsFilePath = path.join(__dirname, '../../data/clubs.json');

export const getAllClubs = async() : Promise<ClubResponse[]> => {
    let clubsData: ClubResponse[] = [];
    try {
        if (fs.existsSync(clubsFilePath)) {
            const fileContent = fs.readFileSync(clubsFilePath, 'utf-8');
            clubsData = JSON.parse(fileContent);
        }
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