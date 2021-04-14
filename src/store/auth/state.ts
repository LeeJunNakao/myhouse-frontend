interface StateType {
  authenticated: boolean
}

const state = (): StateType => ({
  authenticated: false,
});

export { StateType };
export default state;
