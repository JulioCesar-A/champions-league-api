import { Request, Response } from 'express';
import { deleteClubByIdService, getAllClubsService, getClubByIdService, getClubByNameService, insertClubService, updatedClubService } from '../services/club-services';

export const getClubs = async (req: Request, res: Response) => {
    const content = await getAllClubsService();
    res.status(content.statusCode).json(content.body);
}

export const getClubById = async (req: Request, res: Response) => {
    let content;
    try {
        const id = parseInt(req.params.id);
        content = await getClubByIdService(id);
        res.status(content.statusCode).json(content.body);
    } catch (error) {
        res.status(content?.statusCode ?? 500).json(content?.body ?? { error: 'Internal server error' });
    }
}

export const getClubByName = async (req: Request, res: Response) => {
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

        content = await getClubByNameService(trimmedName);
        res.status(content.statusCode).json(content.body);
    } catch (error) {
        res.status(content?.statusCode ?? 500).json(content?.body ?? { error: 'Internal server error' });
    }

}

export const insertClub = async (req: Request, res: Response) => {
    const content = await insertClubService(req.body);
    res.status(content.statusCode).json(content.body);
}

export const deleteClub = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const content = await deleteClubByIdService(id);
    res.status(content.statusCode).json(content.body);
}

export const updateClub = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const content = await updatedClubService(req.body, id);
    res.status(content.statusCode).json(content.body);
}