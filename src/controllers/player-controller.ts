import { Request, Response } from 'express';
import { getAllPlayersService, getPlayerByIdService, getPlayerByNameService, insertPlayerService, deletePlayerByIdService, updatedPlayerService } from '../services/player-services';

export const getPlayers = async(req: Request, res: Response) => {
    try {
        const content = await getAllPlayersService();
        res.status(content.statusCode).json(content.body);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getPlayerById = async(req: Request, res: Response) => {
    let content;
    try {
        const id = parseInt(req.params.id);
        content = await getPlayerByIdService(id);
        res.status(content.statusCode).json(content.body);
    } catch (error) {
        res.status(content?.statusCode ?? 500).json(content?.body ?? { error: 'Internal server error' });
    }
}

export const getPlayerByName = async(req: Request, res: Response) => {
    let content;
    try {
        const { name } = req.query;
    
        if (!name || typeof name !== 'string') {
            return res.status(400).json({ error: 'Name query parameter is required' });
        }
    
        const trimmedName = name.trim();
    
        if (trimmedName.length === 0) {
            return res.status(400).json({ error: 'Name query parameter must not be empty' });
        }
    
        content = await getPlayerByNameService(trimmedName);
        res.status(content.statusCode).json(content.body);
    } catch (error) {
        res.status(content?.statusCode ?? 500).json(content?.body ?? { error: 'Internal server error' });
    }
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