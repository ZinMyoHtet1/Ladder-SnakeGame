const initialState = {
  mode: "",
  turn: 1,
  player1_position: 0,
  player2_position: 0,
  winner: null,
};

function playControllerReducer(state, action) {
  switch (action.type) {
    case "SET_MODE":
      return {
        ...state,
        mode: action.payload,
      };
    case "SWITCH_TURN":
      if (state.winner) return state;
      return {
        ...state,
        turn: state.turn === 1 ? 2 : 1,
      };
    case "GO_ONE_STEP":
      if (state.player1_position === 100 && state.mode === "computer")
        return {
          ...state,
          winner: "You",
        };
      if (state.player2_position === 100 && state.mode === "computer")
        return {
          ...state,
          winner: "Computer",
        };
      if (state.player1_position === 100)
        return {
          ...state,
          winner: "Player 1",
        };
      if (state.player2_position === 100)
        return {
          ...state,
          winner: "Player 2",
        };
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
    // case "WIN":
    //   return {
    //     ...state,
    //     winner:
    //       state.turn === 1
    //         ? state.mode === "computer"
    //           ? "You"
    //           : "Player 1"
    //         : state.mode === "computer"
    //         ? "Computer"
    //         : "Player 2",
    //   };

    case "RESTART_GAME":
      return { ...initialState, mode: state.mode };

    default:
      return state;
  }
}

export default playControllerReducer;
