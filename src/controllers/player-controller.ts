import { Request, Response } from 'express'
import { getAllPlayersService, getPlayerByIdService, getPlayerByNameService, insertPlayerService, deletePlayerByIdService, updatedPlayerService } from '../services/player-services'

export const getPlayers = async(req: Request, res: Response) => {
    const content = await getAllPlayersService();
    res.status(content.statusCode).json(content.body);
}

export const getPlayerById = async(req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const content = await getPlayerByIdService(id);
    res.status(content.statusCode).json(content.body);
}

export const getPlayerByName = async(req: Request, res: Response) => {
    const name = req.params.name;
    const content = await getPlayerByNameService(name);
    res.status(content.statusCode).json(content.body);
}

export const insertPlayer = async(req: Request, res: Response) => {
    const content = await insertPlayerService(req.body);
    res.status(content.statusCode).json(content.body);
}

export const deletePlayer = async(req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const content = await deletePlayerByIdService(id);
    res.status(content.statusCode).json(content.body);
}
    
export const updatePlayer = async(req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const content = await updatedPlayerService(req.body, id);
    res.status(content.statusCode).json(content.body);
}