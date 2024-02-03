/**
 * A dictionary with TMDB Genre IDs as keys and string representations as values.
 */
export const GenreIdToGenre: Map<number, string> = new Map();
GenreIdToGenre.set(28, 'Action')
GenreIdToGenre.set(12, 'Adventure')
GenreIdToGenre.set(16, 'Animation')
GenreIdToGenre.set(35, 'Comedy')
GenreIdToGenre.set(80, 'Crime')
GenreIdToGenre.set(99, 'Documentary')
GenreIdToGenre.set(18, 'Drama')
GenreIdToGenre.set(10751, 'Family')
GenreIdToGenre.set(14, 'Fantasy')
GenreIdToGenre.set(36, 'History')
GenreIdToGenre.set(27, 'Horror')
GenreIdToGenre.set(10402, 'Music')
GenreIdToGenre.set(9648, 'Mystery')
GenreIdToGenre.set(10749, 'Romance')
GenreIdToGenre.set(878, 'Science Fiction')
GenreIdToGenre.set(10770, 'TV Movie')
GenreIdToGenre.set(53, 'Thriller')
GenreIdToGenre.set(10752, ' War')
GenreIdToGenre.set(37, 'Western')

/**
 * A list of all Genre IDs from TMDB.
 */
export const GenreIds: number[] = Array.from(GenreIdToGenre.keys());