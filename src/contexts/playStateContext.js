import React from "react";

const PlayStateContext = React.createContext();

const PlayStateProvider= PlayStateContext.Provider;
const PlayStateConsumer=PlayStateContext.Consumer;

export {PlayStateProvider,PlayStateContext}