export interface Club {
    name: string
    location: string
}

export interface ClubUpdate {
    name?: string
    location?: string
}

export interface ClubResponse extends Club {
    id: number
}