import React from "react";
import { FiCode } from "react-icons/fi";

const CodeCard = () => {
  return (
    <div className="h-48 w-52 bg-white rounded-lg overflow-hidden transform translate-y-0 hover:scale-110 shadow-xl">
      <button className="w-full h-full">
        <div className="w-full h-4/5 flex items-center justify-center">
          <FiCode size={48} />
        </div>
        <div className="h-1/5 flex items-center px-4 py-1 text-md bg-green-600 text-white">
          Filename
        </div>
      </button>
    </div>
  );
};

export default CodeCard;
