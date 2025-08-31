import fs from 'fs';
import path from 'path';
import { ClubTransferModel } from '../models/club/club-transfer-models';


const clubsFilePath = path.join(__dirname, '../../data/clubs.json');

async function getAllClubs() : Promise<ClubTransferModel[]> {
    let clubsData: ClubTransferModel[] = [];
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