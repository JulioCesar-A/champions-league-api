import { Request, Response } from 'express';
import { deleteClubByIdService, getAllClubsService, getClubByIdService, getClubByNameService, insertClubService, updatedClubService } from '../services/club-services';

export const getClubs = async (req: Request, res: Response) => {
    const content = await getAllClubsService();
    res.status(content.statusCode).json(content.body);
}

export const getClubById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const content = await getClubByIdService(id);
    res.status(content.statusCode).json(content.body);
}

export const getClubByName = async (req: Request, res: Response) => {
    const name = req.params.name;
    const content = await getClubByNameService(name);
    res.status(content.statusCode).json(content.body);
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