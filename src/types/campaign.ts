export interface Campaign {
    _id: string;
    title: string;
    description: string;
    imageUrl?: string;
    date: string;
    time:string;
    location: string;
    createdAt?: string;
}