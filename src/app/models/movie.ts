export class Movie {
    id: number;
    title: string;
    description?: string;
    year?: number;
    cast?: string;
    languageId?: number;
    langugae?: string;
    locationId?: number;
    location?: string;
    locationPath?: string;
    imagePath?: string = "url/image";
    watched?: boolean;
}