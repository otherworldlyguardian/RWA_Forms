export default function (state=[], action) {
  switch(action.type) {
    case "FIELDS_UPDATE":
      return action.payload
    default:
      return state
  }
}
