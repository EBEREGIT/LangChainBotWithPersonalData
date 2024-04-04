/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const Variable = createContext();

export default function VariableProvider({ children }) {
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [working, setWorking] = useState(false);
  const [feedback, setFeedback] = useState("");

  return (
    <Variable.Provider
      value={{
        chats,
        setChats,
        message,
        setMessage,
        isListening,
        setIsListening,
        working,
        setWorking,
        feedback,
        setFeedback,
      }}
    >
      {children}
    </Variable.Provider>
  );
}
