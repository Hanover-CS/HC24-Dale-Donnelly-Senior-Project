/**
 * The Review interface is used to cast Firestore documents and/or user input to a specific format for either retrieval or upload.
 */
export interface Review {
    content: string,
    rating: number,
    movieId: number,
    date: string
}