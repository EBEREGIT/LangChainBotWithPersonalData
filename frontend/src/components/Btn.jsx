/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Btn({ brand, label }) {
  const { startListening } = useContext(AppContext);

  return (
    <button
      onClick={() => {
        startListening(brand);
      }}
    >
      {label}
    </button>
  );
}
