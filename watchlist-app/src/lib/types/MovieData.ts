/**
 * The MovieData interface is used to cast data to specific format when retrieving it from the TMDB API.
 */
export interface MovieData {
    id: number;
    title: string;
    overview: string;
    imagePath: string;
    releaseDate: string;
    genreIds: number[];
}