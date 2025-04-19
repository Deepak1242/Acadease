import React from "react";

const HighlightText = ({text}) => {
  return (
    <span className="bg-gradient-to-r  from-[#f7372d] to-[#f9f04c] text-transparent bg-clip-text font-bold">
      {" "}
      {text}
    </span>
  );
};

export default HighlightText;