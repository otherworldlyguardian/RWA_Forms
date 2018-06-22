export default function (state={}, action) {
  switch(action.type) {
    case "FORM_UPDATE":
      return {
        ...state,
        ...action.payload
      }
    case "FORM_CLEAR":
      return action.payload
    default:
      return state
  }
}
