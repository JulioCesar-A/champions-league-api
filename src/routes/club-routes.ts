import express from 'express';
import { Routes } from './routes';
import { deleteClub, getClubById, getClubByName, getClubs, insertClub } from '../controllers/club-controller';

const router = express.Router();

router.get(Routes.Root, getClubs);
router.get(Routes.Id, getClubById);
router.get(Routes.Search, getClubByName);
router.post(Routes.Root, insertClub);
router.delete(Routes.Id, deleteClub);

export default router;