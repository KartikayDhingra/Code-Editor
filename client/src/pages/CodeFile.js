import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CodeEditor from "../components/CodeEditor";
import { useParams } from "react-router-dom";
import axios from "axios";
import { NavLink } from "react-router-dom";

const CodeFile = () => {
  const { id }  = useParams();
  const [language, setLanguage] = useState();
  const [code, setCode] = useState();
  useEffect(() => {
    getCode();
  },[]);

  const getCode = async () => {
    const codeData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/save/code/${id}`);
    console.log(codeData);
    setLanguage(codeData.data.language);
    setCode(codeData.data.code);
  };

  return (
    <div>
      <Navbar />

      <div className="h-96 w-full border-2 border-l-0 border-gray-300">
            <div className="px-10 py-10">
                <NavLink to="/saved-codes" exact className="px-4 py-2 bg-purple-600 text-white text-sm rounded-md">Back</NavLink>
            </div>
        <CodeEditor language={language} value={code} theme="dracula" />
      </div>
    </div>
  );
};

export default CodeFile;
