/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const Variable = createContext();

export default function VariableProvider({ children }) {
  const [chats, setChats] = useState([]);
  const [isWelcomed, setIsWelcomed] = useState(false);
  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [working, setWorking] = useState(false);

  return (
    <Variable.Provider
      value={{
        chats,
        setChats,
        isWelcomed,
        setIsWelcomed,
        message,
        setMessage,
        isListening,
        setIsListening,
        working,
        setWorking,
      }}
    >
      {children}
    </Variable.Provider>
  );
}
