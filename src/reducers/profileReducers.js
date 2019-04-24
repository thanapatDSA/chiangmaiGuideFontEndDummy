function profileReducer(state = {}, action) {
  switch (action.type) {
    case 'ADD_PROFILE':
      return {
        id: action.id,
        email: action.email,
        firstname: action.firstname,
        lastname: action.lastname,
        token: action.token
      }
    case 'EDIT_PROFILE':
      return {
        ...state,
        ...action.payload
      }
    case 'LOGOUT':
      return {}
    default:
      return state
  }
}

function profilesReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_PROFILE':
      return [...state, profileReducer(null, action)]
    case 'EDIT_PROFILE':
      return state.map((each, index) => {
        if (each.email === action.email) {
          return profileReducer(each, index)
        }
        return each
      })
    case 'LOGOUT':
      return []
    default:
      return state
  }
}

export default profilesReducer