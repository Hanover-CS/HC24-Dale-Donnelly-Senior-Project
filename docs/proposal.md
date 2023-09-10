# Watchlist
## Overview
Watchlist aims to be a place for discussion of opinions on films and tv above all else. Of course, there are plenty of similar services that offer similar options. However, those other services often fall into niche categories. Some are hubs for film, and _only_ film, discussion. Others provide lots of production information and statictics while downplaying user reviews and discussion. And some even highlight professional critic reviews  over general audience reactions. Wathclist, on the other hand, aims to be a site for open discussion of films and tv shows where users can rate, review, and _respond_ to each other's opinions.

To best facilitate discussion, users will be able to:
- Rate and reviews a wide seleciton of movies and tv,
- Reply to reviews so as to create pseudo-discussion forums in the reviews section for any given program,
- Create accounts to curate their own watchlist of rated and reviews programs,
- Publically view other ratings and reviews on both user and program specific pages.

## Competing Services
### [Letterboxd](https://letterboxd.com/welcome) [1]
Letterboxd is a service promoting "grass-roots" film discussion. They allow users to rate and review movies but also maintain a diary where they can add movies they've seen and the date they saw them. However, it only offers movies in it's library, with few select limited-run television and/or streaming series being offered for users to discuss alongside movies.

In my opinion the largest flaw of Letterboxd is the lack of tv shows in their library. The site also clearly has a target audience in more niche or indie film crowds. I think my website could have a more broad appeal by listing tv shows and promoting more mainstream, popular programs.

### [IMDb](https://www.imdb.com/?ref_=nv_home) [2]
IMDb primarily operates as a database for information about movies and tv. Though the service allows users to post reviews, the focus seems to be on information such as cast & crew and promotional materials. They also offer trivia and other tangential information where available.

For my website I am less concerned with listing most of the informational material, such as promotional material. It may still be useful to display cast information and some images such as posters or thumbnails for the program for the sake of user experience.

### [Rotten Tomatoes](https://www.rottentomatoes.com/) [3]
Rotten Tomatoes, known for it's Tomatometer feature, lets users review movies and tv and dispalys a public audience score on individual pages. However, those pages are largely dedicated to curated certified critic reviews and the overall critic score which is the metric by which the Tomatometer "freshness" is determined.

In contrast to Rotten Tomatoes, I would like my website to cater more towards user reviews. For instance, instead of displaying a score or "freshness" based off of critic reviews it could instead be calculated by averaging user ratings.

## Languages, Frameworks, & Tools
### [TypeScript](https://www.typescriptlang.org/) [4]
While TypeScript is not necessarily required by Angular, it is the popular (and default) choice when using the framework.

### [Angular](https://angular.io) [5]
Angular offers a very complete ecosystem for developing a web app. It provides a lot of built-in functionality through its libraries without the need for a second framework, such as Next. The strucutre of UI components and services that work with them to provide dynamic data also feels very intuitive.

### [TMDB API](https://developer.themoviedb.org/reference/intro/getting-started) [6]
The Movie Database offers an API for both movies and tv and has high rate limiting. There are even some open-source JavaScript libraries to simplify access. [The Movie Database](https://www.themoviedb.org/?language=en-US) [7] also maintains a site similar to what I want to develop, so could also be considered a competing service. However, because I plan on utilizing their API to retrieve information I decided to omit them from that section.
 
## Considered Frameworks
### [React](https://react.dev/) [8]
Both React and Angular are very serviceable frameworks for building a frontend with somewhat similar ideologies about small, reusable, programatic components. In the end, the choice to use Angular came down to preference. The strucuture and decomposition of Angular components and how to make them work together ultimately made more sense to me. React also lacks much of the built-in functionality that Angular offers.
### [Next.js](https://nextjs.org/) [9]
Next is a service that extends the functionality of other frontend frameworks purely dedicated to UI. So, when using Angular there is simply little reason to add the functionality of Next as well.

## References
1. https://letterboxd.com/
2. https://www.imdb.com/?ref_=nv_home
3. https://www.rottentomatoes.com/
4. https://www.typescriptlang.org/
5. https://angular.io
6. https://developer.themoviedb.org/reference/intro/getting-started
7. https://www.themoviedb.org/?language=en-US
8. https://react.dev/
9. https://nextjs.org/