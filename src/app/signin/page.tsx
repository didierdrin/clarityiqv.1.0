import React from "react";

const SignInPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-blue-100 relative">
      {/* Background and Design Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-green-300 shadow-lg"></div>
      <div className="absolute top-[67px] right-[34px] w-[100px] h-[100px] bg-green-500 rounded-full"></div>
      <div className="absolute top-[360px] right-[26px] w-[114px] h-[280px] bg-green-400 rounded-lg"></div>
      <div className="absolute top-[234px] left-[-0px] w-[393px] h-[393px] bg-green-200 rounded-full"></div>

      {/* Main Sign-in Container */}
      <div className="relative z-10 w-[996px] h-[568px] bg-white rounded-lg shadow-lg flex flex-col items-center p-6">
        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Sign In</h2>

        {/* Email Input */}
        <div className="relative w-[358px] mb-6">
          <input
            type="email"
            placeholder="example.email@gmail.com"
            className="w-full h-12 px-4 bg-gray-200 rounded-md text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label className="absolute left-4 top-[-8px] text-sm text-gray-600 bg-white px-1">
            Email
          </label>
        </div>

        {/* Password Input */}
        <div className="relative w-[358px] mb-6">
          <input
            type="password"
            placeholder="Enter at least 8+ characters"
            className="w-full h-12 px-4 bg-gray-200 rounded-md text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label className="absolute left-4 top-[-8px] text-sm text-gray-600 bg-white px-1">
            Password
          </label>
          <div className="absolute right-4 top-[14px] text-gray-500 cursor-pointer">
            👁
          </div>
        </div>

        {/* Sign-in Button */}
        <button className="w-[359px] h-12 bg-purple-600 text-white rounded-md shadow-md hover:bg-purple-800 transition">
          Sign In
        </button>

        {/* Forgot Password */}
        <div className="mt-4 text-sm text-blue-600 cursor-pointer hover:underline">
          Forgot password?
        </div>

        {/* Or Sign In With */}
        <div className="flex items-center mt-6">
          <div className="h-[1px] bg-gray-300 flex-grow"></div>
          <div className="px-4 text-gray-600">Or sign in with</div>
          <div className="h-[1px] bg-gray-300 flex-grow"></div>
        </div>

        {/* Social Sign-in Buttons */}
        <div className="flex space-x-4 mt-4">
          <button className="flex items-center justify-center w-[81px] h-[36px] bg-gray-100 rounded-full shadow-sm">
            <span className="text-blue-500">F</span>
          </button>
          <button className="flex items-center justify-center w-[81px] h-[36px] bg-gray-100 rounded-full shadow-sm">
            <span className="text-red-500">G</span>
          </button>
          <button className="flex items-center justify-center w-[81px] h-[36px] bg-gray-100 rounded-full shadow-sm">
            <span className="text-black">A</span>
          </button>
        </div>

        {/* Remember Me */}
        <div className="flex items-center mt-6">
          <input
            type="checkbox"
            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
          />
          <label className="ml-2 text-sm text-gray-700">Remember me</label>
        </div>

        {/* Footer */}
      <div className="absolute bottom-8 flex items-center space-x-2 text-gray-600">
        <div>{"Doesn't have an account?"}</div>
        <a href="/signup" className="text-purple-600 hover:underline">
          Sign up
        </a>
      </div>
      
      </div>

      
    </div>
  );
};

export default SignInPage;
