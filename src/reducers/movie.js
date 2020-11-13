import {
  GET_MOVIES,
  GET_MOVIE,
  GET_GENRE,
  GET_DIRECTOR,
} from '../actions/types';

const initialState = {
  movies: [],
  genreList: [],
  directorList: [],
  selectedMovie: {},
  selectedGenre: {},
  selectedDirector: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_MOVIES:
      return {
        ...state,
        movies: payload,
      };
    case GET_MOVIE:
      return {
        ...state,
        selectedMovie: {
          title: payload.title,
          imagePath: payload.imagePath,
          description: payload.description,
          genreName: payload.genre.name,
          directorName: payload.director.name,
        },
      };
    case GET_GENRE:
      return {
        ...state,
        selectedGenre: {
          genreName: payload.movie[0].genre.name,
          genreDescription: payload.movie[0].genre.description,
        },
        genreList: [...payload.movie],
      };
    case GET_DIRECTOR:
      return {
        ...state,
        selectedDirector: {
          directorName: payload.movie[0].director.name,
          directorBio: payload.movie[0].director.bio,
          directorBirth: payload.movie[0].director.birth,
          directorDeath: payload.movie[0].director.death,
        },
        directorList: [...payload.movie],
      };
    default:
      return state;
  }
}
