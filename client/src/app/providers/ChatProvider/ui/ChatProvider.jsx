import { ChatContext } from "shared/contexts";

import { useCallback, useEffect, useReducer } from "react";
import { api } from "shared/api";
import { useUser } from "entities/auth";
import { createReducer } from "../utils/createReducer";

const initialState = {
  chats: {
    data: null,
    error: null,
    isLoading: false,
    isCreating: false,
    createError: null,
  },
  usersToChat: {
    data: null,
    error: null,
    isLoading: false,
  },
};

const reducer = createReducer(initialState, {
  setChats: ({ chats }, action) => {
    chats.data = action.payload;
    chats.isLoading = false;
  },
  setNewChat: ({ chats }, action) => {
    chats.data = [...chats.data, action.payload];
  },

  chatsIsLoading: ({ chats }) => {
    chats.error = null;
    chats.isLoading = true;
  },
  chatsError: ({ chats }, action) => {
    chats.error = action.payload;
    chats.isLoading = false;
  },

  chatIsCreating: ({ chats }) => {
    chats.createError = null;
    chats.isCreating = true;
  },
  chatCreateError: ({ chats }, action) => {
    chats.createError = action.payload;
    chats.isCreating = false;
  },
  chatCreated: ({ chats }) => {
    chats.isCreating = false;
  },

  setUsersToChat: ({ usersToChat, chats }, action) => {
    const { currentUserId, users } = action.payload;

    const filteredUsers = users.filter((u) => {
      if (u._id === currentUserId) return false;

      return !chats.data?.some(
        (chat) => u._id === chat.members[0]._id || u._id === chat.members[1]._id
      );
    });

    usersToChat.data = filteredUsers;
    usersToChat.isLoading = false;
  },

  usersToChatRemoveItem: ({ usersToChat }, action) => {
    const [{ _id: firstId }, { _id: secondId }] = action.payload;

    usersToChat.data = usersToChat.data.filter(
      (u) => !(u._id === firstId || u._id === secondId)
    );
  },

  usersToChatIsLoading: ({ usersToChat }) => {
    usersToChat.error = null;
    usersToChat.isLoading = true;
  },
  usersToChatError: ({ usersToChat }, action) => {
    usersToChat.error = action.payload;
    usersToChat.isLoading = false;
  },

  resetState: (state) => {
    state.chats = initialState.chats;
    state.usersToChat = initialState.usersToChat;
  },
});

export const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { user } = useUser();

  const chatsFetch = useCallback(
    async (userId) => {
      dispatch({ type: "chatsIsLoading" });

      try {
        const chats = await api.get(`/chats/${userId}`);

        dispatch({ type: "setChats", payload: chats });

        if (user) {
          usersToChatFetch();
        }
      } catch (error) {
        dispatch({ type: "chatsError", payload: error.message });
      }
    },
    [user]
  );

  const usersToChatFetch = useCallback(async () => {
    dispatch({ type: "usersToChatIsLoading" });

    try {
      const users = await api.get("/users");

      dispatch({
        type: "setUsersToChat",
        payload: { currentUserId: user._id, users },
      });
    } catch (error) {
      dispatch({ type: "usersToChatError", payload: error.message });
    }
  }, [user]);

  const chatCreate = useCallback(async (userId, recipientId) => {
    dispatch({ type: "chatIsCreating" });

    try {
      const response = await api.post("/chats", {
        firstId: userId,
        secondId: recipientId,
      });

      dispatch({ type: "chatCreated" });
      dispatch({ type: "setNewChat", payload: response });
      dispatch({ type: "usersToChatRemoveItem", payload: response.members });

      return response;
    } catch (error) {
      dispatch({ type: "chatCreateError", payload: error.message });
    }
  }, []);

  useEffect(() => {
    if (!user) {
      dispatch({ type: "resetState" });
    }
  }, [user]);

  return (
    <ChatContext.Provider
      value={{
        chats: state.chats.data,
        chatsIsLoading: state.chats.isLoading,
        chatsError: state.chats.error,
        chatCreateIsLoading: state.chats.isCreating,
        chatCreateError: state.chats.createError,
        chatsFetch,
        chatCreate,
        usersToChat: state.usersToChat.data,
        usersToChatIsLoading: state.usersToChat.isLoading,
        usersToChatError: state.usersToChat.error,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
