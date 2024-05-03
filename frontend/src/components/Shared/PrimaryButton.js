import React from "react";

const PrimaryButton = (props) => {
  return (
    <button
      className={`bg-primary text-white outline-none border-0 py-2 px-6 font-semibold rounded-sm transition-all duration-300 ease-in hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30 ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled || false}
    >
      {props.children}
    </button>
  );
};

export default PrimaryButton;
