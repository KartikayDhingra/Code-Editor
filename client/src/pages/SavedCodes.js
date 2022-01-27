import React from "react";
import Navbar from "../components/Navbar";
import CodeCard from "../components/CodeCard";

const SavedCodes = () => {
    return <div>
        <Navbar />
        <div className="px-20 py-10 bg-gray-100 flex flex-col h-screen w-screen">
            <div className="mb-14">
                <a href="/" className="px-4 py-2 bg-purple-600 text-white text-sm rounded-md">Back to home</a>
            </div>
            <div className="flex flex-row justify-start gap-x-20 gap-y-16 items-center w-full flex-wrap px-20">
                <CodeCard />
                <CodeCard />
                <CodeCard />
                <CodeCard />
                <CodeCard />
                <CodeCard />
                <CodeCard />
            </div>
            
        </div>
    </div>
}

export default SavedCodes;