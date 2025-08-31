import fs from 'fs';
import path from 'path';


const clubsFilePath = path.join(__dirname, '../../data/clubs.json');
const clubsData = fs.existsSync(clubsFilePath) ? JSON.parse(fs.readFileSync(clubsFilePath, 'utf-8')) : "l";


console.table(clubsData);