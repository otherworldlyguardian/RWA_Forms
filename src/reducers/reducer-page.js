export default function (state='home', action) {
  switch(action.type) {
    case "PAGE_CHANGE":
      return action.payload
    default:
      return state
  }
}
