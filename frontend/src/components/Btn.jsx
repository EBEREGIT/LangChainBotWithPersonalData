/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Variable } from "../context/Variable";

export default function Btn({ brand, label }) {
  const { startListening } = useContext(AppContext);
  const { isListening, working } = useContext(Variable);

  return (
    <button
      disabled={isListening || working}
      onClick={() => {
        startListening(brand);
      }}
    >
      {label}
    </button>
  );
}
