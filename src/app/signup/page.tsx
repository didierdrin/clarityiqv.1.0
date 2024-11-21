import React from "react";

const SignUpPage = () => {
  return (
    <div className="relative flex items-center justify-center w-screen h-screen bg-white">
      {/* Background Shapes */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-gray-200"></div>
      <div className="absolute top-[46px] left-[657px] w-[740px] h-[913px] bg-cover bg-center bg-no-repeat rounded-lg shadow-lg" style={{ backgroundImage: "url('./images/rectangle80.jpg')" }}></div>

      {/* Main Container */}
      <div className="relative w-full max-w-lg p-8 bg-white rounded-xl shadow-lg z-10">
        {/* Title */}
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          Create your account
        </h1>

        {/* Social Sign-Up Buttons */}
        <div className="flex justify-around mb-6">
          <button className="flex items-center justify-center w-16 h-16 bg-red-600 text-white rounded-full shadow-md hover:bg-red-700 transition">
            <span className="text-lg">G</span>
          </button>
          <button className="flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition">
            <span className="text-lg">F</span>
          </button>
          <button className="flex items-center justify-center w-16 h-16 bg-gray-800 text-white rounded-full shadow-md hover:bg-gray-900 transition">
            <span className="text-lg">A</span>
          </button>
        </div>

        {/* OR Divider */}
        <div className="relative flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="mx-4 text-sm text-gray-600">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Email Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="example.email@gmail.com"
            className="w-full h-12 px-4 bg-gray-100 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        </div>

        {/* Continue Button */}
        <button className="w-full py-3 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-900 transition">
          Continue
        </button>

        {/* Login Redirect */}
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
