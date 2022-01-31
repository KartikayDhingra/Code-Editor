import React, { useEffect, useContext, useState} from "react";
import Navbar from "../components/Navbar";
import CodeCard from "../components/CodeCard";
import AuthContext from "../store/auth-context";
import axios from "axios";
import { NavLink } from "react-router-dom";

const SavedCodes = () => {

    const ctx = useContext(AuthContext);
    const [savedCodes, setSavedCodes] = useState([]);

    useEffect(() => {
        showSavedCodesHandler();
    },[]);

    const showSavedCodesHandler = async () => {
        const body = {
          userId : ctx.userInfo._id
        }
        const codes = await axios.get("http://localhost:5000/save/saved-codes",
          JSON.stringify(body),
          {
            headers: {
              "Content-Type": "application/json",
            }
          }
        );
        setSavedCodes(codes.data);
      }

    return <div>
        <Navbar />
        <div className="px-20 py-10 bg-gray-100 flex flex-col h-screen w-screen">
            <div className="mb-14">
                <NavLink to="/" exact className="px-4 py-2 bg-purple-600 text-white text-sm rounded-md">Back to home</NavLink>
            </div>
            {savedCodes.length > 0 ? <div className="flex flex-row justify-start gap-x-20 gap-y-16 items-center w-full flex-wrap px-20">
                {savedCodes.map( code => {
                    return <CodeCard key={code._id} id={code._id} filename={code.filename} />
                })}
            </div> : <h2 className="text-xl text-center">No files saved</h2>}
        </div>
    </div>
}

export default SavedCodes;