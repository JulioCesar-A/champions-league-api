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

export const updatedClubService = async(
    club: ClubUpdate,
    id: number
) : Promise<ClubTransferModel> => {
    let clubResponse: ClubTransferModel = {
        statusCode: 0,
        body: []
    }
    let updatedClub: ClubResponse;

    try {
        updatedClub = await updateClub(club, id);
    } catch (error) {
        const errorMsg = error ? String(error) : '';
        if (errorMsg.includes('not found')) {
            clubResponse = {
                statusCode: StatusCode.NotFound,
                body: errorMsg
            };
        } else if (errorMsg.includes('Could not update')) {
            clubResponse = {
                statusCode: StatusCode.InternalServerError,
                body: errorMsg
            };
        } else {
            clubResponse = {
                statusCode: StatusCode.InternalServerError,
                body: errorMsg
            };
        }
        console.table(clubResponse);
        return clubResponse;
    }

    clubResponse = {
        statusCode: StatusCode.OK,
        body: updatedClub
    };
    
    console.log(clubResponse);
    return clubResponse;
}

export const getAllClubsService = async() : Promise<ClubTransferModel> => {
    let clubResponse: ClubTransferModel = {
        statusCode: 0,
        body: []
    }

    let clubs: ClubResponse[];

    try {
        clubs = await getAllClubs();
    } catch (error) {
        const errorMsg = error ? String(error) : '';
        clubResponse = {
            statusCode: StatusCode.InternalServerError,
            body: errorMsg
        }
        return clubResponse;
    }

    clubResponse = {
        statusCode: StatusCode.OK,
        body: clubs
    }

    return clubResponse;
}

export const getClubByIdService = async(id: number) : Promise<ClubTransferModel> => {
    let clubResponse: ClubTransferModel = {
        statusCode: 0,
        body: []
    }

    let club: ClubResponse;

    try {
        club = await getClubById(id);
    } catch (error) {
        const errorMsg = error ? String(error) : '';

        if (errorMsg.includes('not found')){
        clubResponse = {
            statusCode: StatusCode.NotFound,
            body: errorMsg
        }
        } else {
            clubResponse = {
                statusCode: StatusCode.InternalServerError,
                body: errorMsg
            }
        }

        return clubResponse;
    }

    clubResponse = {
        statusCode: StatusCode.OK,
        body: club
    }

    return clubResponse;
}

export const getClubByNameService = async(name: string) : Promise<ClubTransferModel> => {
    let clubResponse: ClubTransferModel = {
        statusCode: 0,
        body: []
    }

    let club: ClubResponse;

    try {
        club = await getClubByName(name);
    } catch (error) {
        const errorMsg = error ? String(error) : '';
        clubResponse = {
            statusCode: StatusCode.InternalServerError,
            body: errorMsg
        }
        return clubResponse;
    }

    clubResponse = {
        statusCode: StatusCode.OK,
        body: club
    }

    return clubResponse;
}