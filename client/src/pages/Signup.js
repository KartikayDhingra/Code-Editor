import React from "react";
import Navbar from "../components/Navbar";
import { FcGoogle } from "react-icons/fc";
import FullScreen from "../components/FullScreen";

const Signup = () => {

    const googleSignInHandler = async () => {
        window.open("http://localhost:5000/auth/google","_self");
    }

  return (
    <FullScreen>
      <Navbar />
      <div className="flex w-4/5 h-4/5 absolute left-1/2 top-24 transform -translate-x-1/2 rounded-xl bg-purple-400 shadow-2xl shadow-black overflow-hidden">
        <div className="w-1/2 h-full">
          <div className="flex justify-between w-3/5 relative left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="animate-bounce text-center py-3 w-2/12 bg-white text-lg text-gray-600 rounded shadow-2xl shadow-black">
              L
            </div>
            <div className="animate-spin text-center py-3 w-2/12 bg-white text-lg text-gray-600 rounded shadow-2xl shadow-blac">
              O
            </div>
            <div className="animate-bounce text-center py-3 w-2/12 bg-white text-lg text-gray-600 rounded shadow-2xl shadow-blac">
              G
            </div>
            <div className="animate-spin text-center py-3 w-2/12 bg-white text-lg text-gray-600 rounded shadow-2xl shadow-blac">
              I
            </div>
            <div className="animate-bounce text-center py-3 w-2/12 bg-white text-lg text-gray-600 rounded shadow-2xl shadow-blac">
              N
            </div>
          </div>
        </div>
        <div className="w-1/2 h-full flex items-center justify-center px-16 py-6 bg-white">
          <div className="w-full h-3/4 flex flex-col gap-y-10 justify-center items-center">
            <h2 className="text-3xl mb-10">Code Editor</h2>
            <form className="flex flex-col gap-y-8 w-full items-center">
              <div className="flex flex-col w-3/5">
                {/* <label className="text-xs text-gray-600">Email</label> */}
                <input
                  className="border-b border-gray-800 px-2 py-1 w-full focus:outline-none focus:border-b focus:border-green-600"
                  placeholder="Email"
                />
              </div>
              <div className="flex flex-col w-3/5">
                {/* <label className="text-xs text-gray-600 block">Password</label> */}
                <input
                  className="border-b border-gray-800 px-2 py-1 w-full focus:outline-none focus:border-b focus:border-green-600"
                  placeholder="Password"
                />
              </div>
              <div className="w-3/5 text-sm text-right">
                <a href="/" className="text-gray-500 text-xs">
                  Forgot password?
                </a>
              </div>
              <div className="w-3/5 text-center">
                <button className="px-10 py-1.5 bg-purple-600 text-white rounded-full">
                  Sign in
                </button>
              </div>
            </form>
            <div className="w-3/5 flex flex-col gap-y-8">
              <div className="w-full flex justify-between items-center">
                <span className="inline-block w-1/3 h-0.5 bg-gray-300 mx-2"></span>
                <span className="text-xs text-gray-400">OR</span>
                <span className="inline-block w-1/3 h-0.5 bg-gray-300 mx-2"></span>
              </div>
              <div className="w-full">
                <button onClick={googleSignInHandler} className="px-4 py-1 mx-auto rounded-sm text-gray-700 flex items-center justify-center">
                  <FcGoogle size={24} className="mr-2" />
                  Sign in with Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </FullScreen>
  );
};

export default Signup;
