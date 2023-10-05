export class Review {
    content: string
    rating: number
    programId: number
    date: string

    constructor(content: string, rating: number, programId: number, date: string) {
        this.content = content;
        this.rating = rating;
        this.programId = programId;
        this.date = date;
    }
}