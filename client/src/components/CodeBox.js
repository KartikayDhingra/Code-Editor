import React, { useState, useEffect } from "react";
import CodeEditor from "./CodeEditor";
import defaultCode from "./defaultCode";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";

const CodeBox = () => {
  const [languageCode, setLanguageCode] = useState("");
  const [language, setLanguage] = useState("clike");
  const [theme, setTheme] = useState("dracula");
  const [status, setStatus] = useState("");
  const [runStatus, setRunStatus] = useState("NA");
  const [runtime, setRuntime] = useState("0 ms");
  const [memoryUsed, setMemoryUsed] = useState("0 Kb");

  const notifyCompleted = () => {
    toast.success("Completed successfully", {
      id: "success123",
    });
  };

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

  const setLanguageVersion = () => {
    if (language === "clike") {
      return "CPP";
    }
    if (language === "javascript") {
      return "JAVASCRIPT_NODE";
    }
    return language.toUpperCase();
  };

  const reqBody = {
    lang: setLanguageVersion(),
    source: languageCode,
    input: "",
    memory_limit: 243232,
    time_limit: 5,
    callback: "https://client.com/callback/",
  };

  const clickRunHandler = async () => {
    const output = await axios.post(
      "https://api.hackerearth.com/v4/partner/code-evaluation/submissions/",
      JSON.stringify(reqBody),
      {
        headers: {
          "Content-Type": "application/json",
          "client-secret": "d438df1e8159603a64e49feb18ad9696af7e5274",
        },
      }
    );
    setStatus("Running...");
    // console.log(output);
    const statusUpdateUrl = output.data.status_update_url;
    const intervalId = setInterval(async () => {
      const status = await axios.get(statusUpdateUrl, {
        headers: {
          "client-secret": "d438df1e8159603a64e49feb18ad9696af7e5274",
        },
      });
      // const {status : status_code, time_used, memory_used} = status.data.result.runStatus;
      if (status.data.request_status.code === "REQUEST_COMPLETED") {
        const {status : status_code, time_used, memory_used} = status.data.result.run_status;
        setStatus("Completed");
        clearInterval(intervalId);
        notifyCompleted();
        setRunStatus(`${status_code}CEPTED`);
        setRuntime(`${time_used} ms`);
        setMemoryUsed(`${memory_used} Kb`);
        console.log(status);
      }
    }, 500);
  };

  return (
    <div className="mt-10">
      <Toaster />
      <div className="flex items-center justify-between w-1/2 mb-4 px-6">
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
        <div className="">
          <button
            onClick={clickRunHandler}
            className="flex items-center justify-between bg-green-600 font-normal text-sm text-white ring ring-green-600 ring-offset-4 ring-offset-green-100 focus:outline-none rounded px-3 py-1"
          >
            Run
          </button>
        </div>
        <div className="">
          <button className="bg-purple-600 font-normal text-sm text-white ring ring-purple-600 ring-offset-4 ring-offset-purple-100 focus:outline-none rounded px-3 py-1">
            Save
          </button>
        </div>
        <div className="">
          <button className="bg-purple-600 font-normal text-sm text-white ring ring-purple-600 ring-offset-4 ring-offset-purple-100 focus:outline-none rounded px-3 py-1">
            Copy
          </button>
        </div>
        <div className="">
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
      <div className="h-64 flex items-center justify-between bg-gray-200">
        <div className="w-1/2 h-full border-r border-gray-300 flex flex-col">
          <h2 className="px-6 py-2 bg-white bg-opacity-20 text-gray-900">
            Input
          </h2>
          <textarea className="w-full h-full"></textarea>
        </div>
        <div className="w-1/2 h-full flex flex-col">
          <div className="flex items-center justify-between px-6 py-2">
            <div className="bg-white bg-opacity-20 text-gray-900">
              Output
            </div>
            <div className="text-gray-500 text-sm">Status : <span className="text-green-600 text-xs">{runStatus}</span></div>
            <div className="text-gray-500 text-sm">Runtime : <span className="text-green-600 text-xs">{runtime}</span></div>
            <div className="text-gray-500 text-sm">Memory Used : <span className="text-green-600 text-xs">{memoryUsed}</span></div>
          </div>
          <div className="w-full h-full bg-white">
            <div
              className={`h-full flex items-center justify-center text-2xl ${
                status === "Completed" ? "text-green-500" : "text-red-500"
              }`}
            >
              {status === "Running..." && (
                <CgSpinner size={20} className="mr-3 animate-spin" />
              )}
              {status}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeBox;
