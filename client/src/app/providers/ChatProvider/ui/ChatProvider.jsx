import { ChatContext } from "shared/contexts";

import { useCallback, useEffect, useReducer, useState } from "react";
import { api } from "shared/api";
import { useUser } from "entities/auth";
import { createReducer } from "../utils/createReducer";
import { io } from "socket.io-client";

const initialState = {
  currentChatMessages: {
    data: null,
    error: null,
    isLoading: false,
    isSending: false,
    sendError: null,
  },
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

  setCurrentChatMessages: ({ currentChatMessages }, action) => {
    currentChatMessages.data = action.payload;
    currentChatMessages.isLoading = false;
  },

  currentChatMessagesIsLoading: (state) => {
    state.currentChatMessages.isLoading = true;
    state.currentChatMessages.error = null;
  },
  currentChatMessagesError: ({ currentChatMessages }, action) => {
    currentChatMessages.isLoading = false;
    currentChatMessages.error = action.payload;
  },
  updateCurrentChatMessages: (state, action) => {
    state.currentChatMessages.data = [
      ...state.currentChatMessages.data,
      action.payload,
    ];
  },
  currentChatMessagesIsSending: (state) => {
    state.currentChatMessages.isSending = true;
  },
  currentChatMessagesSendError: (state, action) => {
    state.currentChatMessages.sendError = action.payload;
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
    state.currentChat = initialState.currentChat;
  },
});

export const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [socket, setSocket] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const [messageToSend, setMessageToSend] = useState(null);

  const { user } = useUser();

  // socket connection
  useEffect(() => {
    if (user) {
      const newSocket = io("http://localhost:6060").connect();
      setSocket(newSocket);
    }
  }, [user]);

  // socket disconnect
  useEffect(() => {
    if (socket && socket?.connected && !user) {
      socket.disconnect();
    }

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket, user]);

  // get online users
  useEffect(() => {
    if (!socket) return;

    socket.emit("addNewUser", user?._id);

    socket.on("getOnlineUsers", (response) => {
      setOnlineUsers(response);
    });

    return () => {
      socket.off("getOnlineUsers");
    };
  }, [socket]);

  // send message
  useEffect(() => {
    if (!socket || !messageToSend || !currentChat) return;

    const recipientId = currentChat?.members?.find(
      (m) => m._id !== user?._id
    )?._id;

    socket.emit("sendMessage", { ...messageToSend, recipientId });
    setMessageToSend(null);
  }, [socket, messageToSend, currentChat, dispatch]);

  // receive message
  useEffect(() => {
    if (!socket || !currentChat) return;

    socket.on("getMessage", (message) => {
      if (currentChat._id !== message.chatId) return;

      dispatch({ type: "updateCurrentChatMessages", payload: message });
    });
  }, [socket, currentChat]);

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

  const messageSend = useCallback(async ({ chatId, senderId, text }) => {
    dispatch({ type: "currentChatMessagesIsSending" });

    try {
      const response = await api.post(`/messages`, {
        chatId,
        senderId,
        text,
      });

      setMessageToSend(response);
      dispatch({ type: "updateCurrentChatMessages", payload: response });
    } catch (error) {
      dispatch({ type: "currentChatMessagesError" });
    }
  }, []);

  const currentChatMessagesFetch = useCallback(async ({ _id, members }) => {
    dispatch({ type: "currentChatMessagesIsLoading" });

    try {
      const response = await api.get(`/messages/${_id}`);

      setCurrentChat({ members, _id });

      dispatch({
        type: "setCurrentChatMessages",
        payload: response,
      });
    } catch (error) {
      dispatch({ type: "currentChatMessagesError", payload: error.message });
    }
  }, []);

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
        currentChat,
        currentChatMessages: state.currentChatMessages,
        chats: state.chats,
        usersToChat: state.usersToChat,
        socketId: socket?.id ?? null,
        onlineUsers,
        messageSend,
        chatsFetch,
        chatCreate,
        currentChatMessagesFetch,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
