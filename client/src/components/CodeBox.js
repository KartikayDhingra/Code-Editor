import React, { useState, useEffect, useContext } from "react";
import CodeEditor from "./CodeEditor";
import defaultCode from "./defaultCode";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";
import { BsFillPlayFill } from "react-icons/bs";
import { FiCopy } from "react-icons/fi";
import { MdOutlineSaveAlt } from "react-icons/md";
import SaveModal from "./SaveModal";
import AuthContext from "../store/auth-context";
// import useLocalStorage from "../hooks/useLocalStorage";

const CodeBox = () => {
  const [languageCode, setLanguageCode] = useState("");
  const [language, setLanguage] = useState("clike");
  const [theme, setTheme] = useState("dracula");
  const [status, setStatus] = useState("");
  const [runStatus, setRunStatus] = useState("NA");
  const [runtime, setRuntime] = useState("0 sec");
  const [memoryUsed, setMemoryUsed] = useState("0 Kb");
  const [result, setResult] = useState("");
  const [input, setInput] = useState("");
  const [showSaveModal, setShowSaveModal] = useState(false);

  const ctx = useContext(AuthContext);

  const notifyCompleted = () => {
    toast.success("Completed successfully", {
      id: "success123",
    });
  };

  // useEffect(() => {
  //   const unloadCallback = (event) => {
  //     event.preventDefault();
  //     event.returnValue = "";
  //     return "";
  //   };

  //   window.addEventListener("beforeunload", unloadCallback);
  //   return () => window.removeEventListener("beforeunload", unloadCallback);
  // }, []);

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
    input: input,
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
    setResult("");
    setStatus("Running...");
    setRunStatus("NA");
    setRuntime("0 sec");
    setMemoryUsed("0 Kb");
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
        const {
          status: status_code,
          time_used,
          memory_used,
          output,
        } = status.data.result.run_status;
        setStatus("Completed");
        clearInterval(intervalId);
        notifyCompleted();
        setRunStatus(`${status_code}CEPTED`);
        setRuntime(`${time_used} sec`);
        setMemoryUsed(`${memory_used} Kb`);
        const result = await axios.get(output);
        setResult(result.data);
        console.log(status);
      }
    }, 500);
  };

  const changeInputHandler = (event) => {
    setInput(event.target.value);
  };

  const copyToClipboardHandler = () => {
    navigator.clipboard.writeText(languageCode);
    toast.success("Copied to clipboard", {
      id: "success123",
    });
  };

  const saveCodeHandler = () => {
    if (ctx.userInfo == null) {
      toast.error("Sign in to save", {
        id: "error123",
      });
    } else {
      setShowSaveModal(true);
    }
  };

  const cancelHandler = () => {
    setShowSaveModal(false);
  };

  const saveFileHandler = async (filename) => {
    if(filename.length === 0) {
      toast.error("Filename is empty",{
        id: "error123"
      });
    }
    const body = {
      userId: ctx.userInfo._id,
      code: languageCode,
      filename: filename,
      language: language,
    };
    const response = await axios.post(
      `http://localhost:5000/save`,
      JSON.stringify(body),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if(response.status === 200) {
      toast.success("Suucessfully saved",{
        id: "success123"
      });
    }
    else{
      toast.error("Could not save file",{
        id: "error123"
      });
    }
    setShowSaveModal(false);
  };

  return (
    <React.Fragment>
      {showSaveModal && (
        <SaveModal cancel={cancelHandler} save={saveFileHandler} />
      )}
      <div className="h-full">
        <Toaster />
        <div className="px-12 py-4">
          <div className="flex items-center justify-between w-1/2">
            <div>
              <select
                name="language"
                id="language"
                onChange={languageChangeHandler}
                className="bg-purple-600 font-normal text-sm text-white focus:outline-none rounded px-4 py-1.5"
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
                onClick={saveCodeHandler}
                className="bg-purple-600 flex justify-between items-center font-normal text-sm text-white focus:outline-none rounded px-4 py-1.5"
              >
                <MdOutlineSaveAlt size={20} className="mr-2" />
                Save
              </button>
            </div>
            <div className="">
              <button
                onClick={copyToClipboardHandler}
                className="bg-purple-600 flex justify-between items-center font-normal text-sm text-white focus:outline-none rounded px-4 py-1.5"
              >
                <FiCopy size={20} className="mr-2" />
                Copy
              </button>
            </div>
            <div className="">
              <select
                name="themes"
                id="themes"
                onChange={themeChangeHandler}
                className="bg-purple-600 font-normal text-sm text-white focus:outline-none rounded px-4 py-1.5"
              >
                <option value="dracula" className="rounded">
                  Dracula
                </option>
                <option value="ayu-dark">ayu-dark</option>
                <option value="base16-light">base16-light</option>
                <option value="eclipse">eclipse</option>
              </select>
            </div>
            <div className="">
              <button
                onClick={clickRunHandler}
                className="flex items-center justify-between bg-green-600 font-normal text-sm text-white focus:outline-none rounded px-4 py-1.5"
              >
                <BsFillPlayFill size={20} className="mr-1" />
                Run
              </button>
            </div>
          </div>
        </div>

        <div className="h-full flex">
          <div className="h-full w-3/5 border-2 border-l-0 border-gray-300">
            <CodeEditor
              language={language}
              value={languageCode}
              onChange={onCodeChangeHandler}
              theme={theme}
            />
          </div>
          <div className="w-2/5 h-full flex flex-col">
            <div className="w-full h-2/3 border-t border-gray-300 flex flex-col">
              <h2 className="px-6 py-2 bg-white bg-opacity-20 text-gray-900">
                Input
              </h2>
              <textarea
                onChange={changeInputHandler}
                className="w-full h-full px-4 py-4 focus:outline-none"
                value={input}
                placeholder="Enter Input"
              ></textarea>
            </div>
            <div className="w-full h-full flex flex-col">
              <div className="flex items-center justify-between px-6 py-2">
                <div className="bg-white bg-opacity-20 text-gray-900">
                  Output
                </div>
                <div className="text-gray-500 text-sm">
                  Status :{" "}
                  <span
                    className={`${
                      status === "Completed"
                        ? "text-green-600"
                        : "text-yellow-500"
                    } text-yellow-500 text-xs`}
                  >
                    {runStatus}
                  </span>
                </div>
                <div className="text-gray-500 text-sm">
                  Runtime :{" "}
                  <span
                    className={`${
                      status === "Completed"
                        ? "text-green-600"
                        : "text-yellow-500"
                    } text-yellow-500 text-xs`}
                  >
                    {runtime}
                  </span>
                </div>
                <div className="text-gray-500 text-sm">
                  Memory Used :{" "}
                  <span
                    className={`${
                      status === "Completed"
                        ? "text-green-600"
                        : "text-yellow-500"
                    } text-yellow-500 text-xs`}
                  >
                    {memoryUsed}
                  </span>
                </div>
              </div>
              <div className="w-full h-full bg-white">
                {result.length === 0 && (
                  <div
                    className={`flex items-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-3xl ${
                      status === "Completed"
                        ? "text-green-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {status === "Running..." && (
                      <CgSpinner size={24} className="mr-3 animate-spin" />
                    )}
                    {status === "Running..." && status}
                  </div>
                )}
                <div className="px-4 py-4">{result}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CodeBox;
