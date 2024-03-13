import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
// import { Variable } from "../context/Variable";

export default function Main() {
  const [isWelcomed, setIsWelcomed] = useState(false)
  const { textToSpeech, startListening, speechToText } = useContext(AppContext);

  // const { isWelcomed, setIsWelcomed } = useContext(Variable);

  if (!isWelcomed) {
    textToSpeech(
      "Welcome To The UNIVERSITY OF NIGERIA, NSUKKA Calender Assistant. I am here to answer your questions about the calender for the 2022/2023 SESSION. Please, tap the middle of your screen to speak and I will provide you with a response."
    );

    setIsWelcomed(true);
  }

  useEffect(() => {
    speechToText();
  }, []);

  return (
    <div>
      <button onClick={() => startListening()}>
        UNIVERSITY OF NGERIA, NSUKKA TIMETABLE OF EVENTS FOR 2022/2023 SESSION
      </button>
    </div>
  );
}
