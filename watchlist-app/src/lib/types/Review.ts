export class Review {
    content: string
    rating: number
    programId: number
    date: string

    constructor(content: string, rating: number, programId: number) {
        this.content = content;
        this.rating = rating;
        this.programId = programId;

        const date = new Date();
        this.date = `${date.getUTCDay()+1}/${date.getUTCMonth()+1}/${date.getUTCFullYear}`
    }
}