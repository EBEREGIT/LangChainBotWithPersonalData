import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { Variable } from "../context/Variable";
// import { Variable } from "../context/Variable";

export default function Main() {
  const { textToSpeech, startListening, speechToText } = useContext(AppContext);
  const { message, feedback, isListening, working } = useContext(Variable);

  // const { isWelcomed, setIsWelcomed } = useContext(Variable);

  useEffect(() => {
    textToSpeech(
      "Welcome To The UNIVERSITY OF NIGERIA, NSUKKA Calender Assistant. I am here to answer your questions about the calender for the 2022/2023 SESSION. Please, tap the middle of your screen to speak and I will provide you with a response."
    );
  }, []);

  useEffect(() => {
    speechToText();
  }, []);

  return (
    <div>
      <p>{isListening ? "I am listening..." : message}</p>

      <button onClick={() => startListening()}>
        UNIVERSITY OF NIGERIA, NSUKKA TIMETABLE OF EVENTS FOR 2022/2023 SESSION
      </button>

      <p>
        {isListening
          ? "Feedback Will Appear here..."
          : working
          ? "Fetching Answer..."
          : feedback}
      </p>
    </div>
  );
}
