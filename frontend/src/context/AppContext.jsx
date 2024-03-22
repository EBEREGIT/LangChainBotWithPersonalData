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
  const { setMessage, setWorking, setFeedback, setIsListening } =
    useContext(Variable);

  const textToSpeech = (text) => {
    const voices = speechSynthesis.getVoices();
    const utter = new SpeechSynthesisUtterance(text);
    utter.voice = voices[0];
    speechSynthesis.speak(utter);
  };

  const speechToText = () => {
    if (!recognition) return;

    recognition.onresult = (e) => {
      console.log(e.results[0][0].transcript);
      setMessage(e.results[0][0].transcript);
      setIsListening(false);
      customChat(e.results[0][0].transcript);

      recognition.stop();
    };
  };

  const startListening = () => {
    setMessage("");
    setIsListening(true);
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

    axios(`${import.meta.env.VITE_BASE_URL}/chat`, {
      method: "POST",
      data: {
        input,
      },
    })
      .then((response) => {
        console.log(response);

        if (response.data.message) {
          setFeedback(response.data.message);
          textToSpeech(response.data.message);
        } else {
          const feedback = "I encountered an error. Let's try again later!";
          setFeedback(feedback);
          textToSpeech(feedback);
        }

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
