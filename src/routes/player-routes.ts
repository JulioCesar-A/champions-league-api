import express from 'express';
import { Routes } from './routes';
import { deletePlayer, getPlayerById, getPlayerByName, getPlayers, insertPlayer, updatePlayer} from '../controllers/player-controller';

const router = express.Router();

router.get(Routes.Root, getPlayers);
router.get(Routes.Id, getPlayerById);
router.get(Routes.Search, getPlayerByName);
router.post(Routes.Root, insertPlayer);
router.delete(Routes.Id, deletePlayer);
router.put(Routes.Id, updatePlayer);

export default router;