import React, { useState, useEffect } from "react";
import CodeEditor from "./CodeEditor";
import defaultCode from "./defaultCode";
import axios from "axios";

const CodeBox = () => {
  const [languageCode, setLanguageCode] = useState("");
  const [language, setLanguage] = useState("clike");
  const [theme, setTheme] = useState("dracula");

  useEffect(() => {
    setLanguageCode(defaultCode[language]);
  }, [language]);

  const onCodeChangeHandler = (data) => {
    setLanguageCode(data);
  };

  const themeChangeHandler = (event) => {
    setTheme(event.target.value);
  };

  const languageChangeHandler = (event) => {
    setLanguage(event.target.value);
  };

  const reqBody = {
    lang: language.toUpperCase(),
    source: languageCode,
    input: "",
    memory_limit: 243232,
    time_limit: 5,
    callback: "https://client.com/callback/"
  }

  const clickRunHandler = async () => {
    const output = await axios.post(
      "https://api.hackerearth.com/v4/partner/code-evaluation/submissions/",JSON.stringify(reqBody),{
        headers: {
            'Content-Type': 'application/json',
            'client-secret': 'd438df1e8159603a64e49feb18ad9696af7e5274'
        }
      }
    );

    console.log(output);
  };

  return (
    <div className="mt-10 m-auto w-1/2">
      <div className="flex items-center justify-between mb-4">
        <div>
          <label
            htmlFor="language"
            className="mr-2 text-xs font-bold text-gray-500"
          >
            Languague :{" "}
          </label>
          <select
            name="language"
            id="language"
            onChange={languageChangeHandler}
            className="bg-purple-600 font-normal text-sm text-white ring ring-purple-600 ring-offset-4 ring-offset-purple-100 focus:outline-none rounded px-1.5 py-1"
          >
            <option value="clike" className="rounded">
              C++
            </option>
            <option value="java">Java</option>
            <option value="python">Python</option>
            <option value="javascript">Javascript</option>
            <option value="go">Go</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="themes"
            className="mr-2 text-xs font-bold text-gray-500"
          >
            Themes :{" "}
          </label>
          <select
            name="themes"
            id="themes"
            onChange={themeChangeHandler}
            className="bg-purple-600 font-normal text-sm text-white ring ring-purple-600 ring-offset-4 ring-offset-purple-100 focus:outline-none rounded px-1.5 py-1"
          >
            <option value="dracula" className="rounded">
              Dracula
            </option>
            <option value="ayu-dark">ayu-dark</option>
            <option value="base16-light">base16-light</option>
            <option value="eclipse">eclipse</option>
          </select>
        </div>
      </div>
      <CodeEditor
        language={language}
        value={languageCode}
        onChange={onCodeChangeHandler}
        theme={theme}
      />
      <div className="mt-6 flex items-center justify-center">
        <button
          onClick={clickRunHandler}
          className="bg-green-600 font-normal text-sm text-white ring ring-green-600 ring-offset-4 ring-offset-green-100 focus:outline-none rounded px-3 py-1"
        >
          Run
        </button>
      </div>
    </div>
  );
};

export default CodeBox;
