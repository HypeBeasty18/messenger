import { State } from "store/messagesSlice";

export const updateArray = (messages: State) => {

  const filteredMessages = Object.entries(messages)
    .filter(([, message]) => !message.isPinned)
    .sort(([, a], [, b]) => b.date - a.date)
    .map(([key, message]) => ({ key, ...message }))

  return filteredMessages;
}

export const updatePinnedArray = (messages: State) => {

  const filteredMessages = Object.entries(messages)
    .filter(([, message]) => message.isPinned)
    .sort(([, a], [, b]) => b.date - a.date)
    .map(([key, message]) => ({ key, ...message }))

  return filteredMessages;
}

