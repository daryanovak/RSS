export default function setState(newState) {
  this.state = { ...this.state, ...newState };
}
