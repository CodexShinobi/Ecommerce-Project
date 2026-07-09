import React from "react";

const Title = ({ text1 = "", text2 = "", align = "center" }) => {
  const alignment =
    align === "left"
      ? "items-start text-left"
      : align === "right"
      ? "items-end text-right"
      : "items-center text-center";

  return (
    <div className={`flex flex-col ${alignment} gap-2`}>
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
        <span className="text-gray-500">{text1} </span>
        <span className="text-black">{text2}</span>
      </h2>

      <div className="w-16 h-1 rounded-full bg-black"></div>
    </div>
  );
};

export default Title;