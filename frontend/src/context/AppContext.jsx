/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import { Variable } from "./Variable";
import axios from "axios";

let recognition;

if ("webkitSpeechRecognition" in window) {
  // eslint-disable-next-line no-undef
  recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.lang = "en-US";
}

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const { setMessage, setWorking } = useContext(Variable);

  const textToSpeech = (text) => {
    const voices = speechSynthesis.getVoices();
    const utter = new SpeechSynthesisUtterance(text);
    utter.voice = voices[0];
    speechSynthesis.speak(utter);
  };

  const speechToText = () => {
    if (!recognition) return;

    recognition.onresult = (e) => {
      customChat(e.results[0][0].transcript);

      recognition.stop();
    };
  };

  const startListening = () => {
    setMessage("");
    recognition.start();
  };

  const checkBrowserSupport = () => {
    if (!recognition) {
      return "Your browser do not support voice recognition!";
    }
  };

  const customChat = (input) => {
    if (!input) return;
    textToSpeech("Give me a moment, please!");

    setWorking(true);

    axios("http://localhost:8000/chat", {
      method: "POST",
      data: {
        input,
      },
    })
      .then((response) => {
        console.log(response);
        textToSpeech(response.data.message);
        setWorking(false);
      })
      .catch((error) => {
        console.log(error);
        setWorking(false);
      });
  };

  return (
    <AppContext.Provider
      value={{
        textToSpeech,
        speechToText,
        startListening,
        checkBrowserSupport,
        customChat,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
