import { produce } from "immer";

export const createReducer = (initialState, handlers) => {
  return (state = initialState, action) => {
    if (action.type) {
      const handler = handlers[action.type];

      return produce(state, (draft) => {
        handler(draft, action);
      });
    } else {
      return state;
    }
  };
};
