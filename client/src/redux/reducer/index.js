import {
  CLEAN_DETAILS,
  FILTER_BY_STATUS,
  FILTER_CREATED,
  GET_ALL_CHARACTERS,
  GET_DETAILS,
  GET_NAME_CHARACTERS,
  GET_OCCUPATIONS,
  ORDER_BY_NAME,
  POST_CHARACTER,
} from "../actionTypes";

const initialState = {
  characters: [],
  allCharacters: [],
  occupations: [],
  details: {}
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CHARACTERS:
      return {
        ...state,
        characters: action.payload.sort((a, b) => a.name.localeCompare(b.name)),
        allCharacters: action.payload.sort((a, b) => a.name.localeCompare(b.name))
      };

    case GET_NAME_CHARACTERS:
      return{
        ...state,
        characters: action.payload
      }

    case GET_DETAILS:
      return{
        ...state,
        details: action.payload
      }

    case CLEAN_DETAILS:{
      return{
        ...state,
        details: {}
      }
    }

    case GET_OCCUPATIONS:
      return{
        ...state,
        occupations: action.payload
      }

    case FILTER_BY_STATUS:
      const allCharacter = state.allCharacters;
      const statusFiltered =
        action.payload === "All"
          ? allCharacter
          : allCharacter.filter((el) => el.status === action.payload);
      return {
        ...state,
        characters: statusFiltered,
      };

      case POST_CHARACTER:
        return{
          ...state,
        }

    case FILTER_CREATED:
      const allCharacters2 = state.allCharacters;
      const createdFiltred =
        action.payload === "created"
          ? allCharacters2.filter((el) => el.create)
          : allCharacters2.filter((el) => !el.create);
      return {
        ...state,
        characters:
          action.payload === "All" ? state.allCharacters : createdFiltred,
      };

    case ORDER_BY_NAME:
      const sortedArr =
        action.payload === "asc"
          ? state.characters.sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.characters.sort((a, b) => {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        characters: sortedArr,
      };


    default:
      return state;
  }
}
