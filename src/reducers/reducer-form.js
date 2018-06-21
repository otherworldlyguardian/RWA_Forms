export default function (state='first', action) {
  switch(action.type) {
    case "FORM_CHANGE":
      return action.payload
    default:
      return state
  }
}
