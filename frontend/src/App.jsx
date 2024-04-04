/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import "./App.css";
import { AppContext } from "./context/AppContext";
import { Variable } from "./context/Variable";
import Main from "./components/Main";

function App() {
  const { textToSpeech } = useContext(AppContext);
  const { message, feedback, isListening, working } = useContext(Variable);

  useEffect(() => {
    textToSpeech(
      `
      Welcome! I am your U.N.N. assistant. 
      Tap the top of your screen for Navigation 
      or 
      Tap the bottom of your screen for 
      other school related information.
      `
    );
  }, []);

  return (
    <>
      <p>{isListening ? "I am listening..." : message}</p>

      <Main />

      <p>
        {isListening
          ? "Feedback Will Appear here..."
          : working
          ? "Fetching Answer..."
          : feedback}
      </p>
    </>
  );
}

export default App;
