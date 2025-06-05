function playControllerReducer(state, action) {
  switch (action.type) {
    case "SWITCH_TURN":
      return {
        ...state,
        turn: state.turn === 1 ? 2 : 1,
      };
    case "GO_ONE_STEP":
      return {
        ...state,
        player1_position:
          state.turn === 1
            ? Math.min(state.player1_position + action.payload, 100)
            : state.player1_position,
        player2_position:
          state.turn === 2
            ? Math.min(state.player2_position + action.payload, 100)
            : state.player2_position,
      };

    case "CHANGE_POSITION":
      return {
        ...state,
        player1_position:
          state.turn === 1 ? action.payload : state.player1_position,
        player2_position:
          state.turn === 2 ? action.payload : state.player2_position,
      };

    default:
      return state;
  }
}

export default playControllerReducer;
