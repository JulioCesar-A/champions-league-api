import { deleteClubById, getAllClubs, getClubById, getClubByName, insertClub, updateClub } from '../repositories/club-repository';
import { StatusCode } from '../utils/status-code';
import { ClubTransferModel } from '../models/club/club-transfer-models';
import { Club, ClubResponse, ClubUpdate } from '../models/club/club-models';

export const deleteClubByIdService = async(id: number) : Promise<ClubTransferModel> => {
    let clubResponse: ClubTransferModel = {
        statusCode: 0,
        body: []
    };

    try {
        await deleteClubById(id);
    } catch (error) {
        const errorM = error? String(error) : '';

        if (errorM.includes('not found')){
            clubResponse = {
                statusCode: StatusCode.NotFound,
                body: errorM
            }
        } else {
            clubResponse = {
                statusCode: StatusCode.InternalServerError,
                body: errorM
            }
        }
        return clubResponse;
    }

    clubResponse = {
        statusCode: StatusCode.NoContent,
        body: []
    }

    return clubResponse;
}

export const insertClubService = async(club: Club) : Promise<ClubTransferModel> => {
    let clubResponse: ClubTransferModel = {
        statusCode: 0,
        body: []
    }
    let newClub: ClubResponse;

    try {
        newClub = await insertClub(club);
    } catch (error) {
        const errorMsg = error ? String(error) : '';
        clubResponse = {
            statusCode: StatusCode.InternalServerError,
            body: errorMsg
        }

        return clubResponse;
    }

    clubResponse = {
        statusCode: StatusCode.Created,
        body: newClub
    }
    return clubResponse;
}