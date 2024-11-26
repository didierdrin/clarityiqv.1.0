"use client";
import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, useAuth } from "@/providers/authprovider";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    // Update the title when loading starts or stops
    if (loading) {
      document.title = "Loggin in...";
    } else {
      document.title = "Login - ClarityIQ";
    }
  }, [loading]);

  const navigatetoForgotpassword = () => {
    document.title = "Forgot Password...";
    window.location.href = "/forgotpassword";
    router.push("/forgotpassword");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    setLoading(true); 
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      setCookie("auth_token", token, { maxAge: 60 * 60 * 24 * 7 }); // 1 week
      login(email, password);
      setLoading(false);
      window.location.href = "/";
      router.push("/");
    } catch (err) {
      setError("Failed to log in. Please check your email/password.");
      console.error(err);
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true); 
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      setCookie("auth_token", token, { maxAge: 60 * 60 * 24 * 7 }); // 1 week
      setLoading(false); 
      window.location.href = "/";
      router.push("/");
    } catch (error) {
      setError("Failed to log in with Google. Please try again.");
      console.error(error);
      setLoading(false); 
    }
  };
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
        <form onSubmit={handleSubmit} className="">
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {/* Email Input */}
        <div className="relative w-[358px] mb-6">
          <input
          id="email"
            type="email"
            placeholder="example.email@gmail.com"
            className="w-full h-12 px-4 bg-gray-200 rounded-md text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="absolute left-4 top-[-8px] text-sm text-gray-600 bg-white px-1">
            Email
          </label>
        </div>

        {/* Password Input */}
        <div className="relative w-[358px] mb-6">
          <input
          id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter at least 8+ characters"
            className="w-full h-12 px-4 bg-gray-200 rounded-md text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label className="absolute left-4 top-[-8px] text-sm text-gray-600 bg-white px-1">
            Password
          </label>
          <div className="absolute right-4 top-[14px] text-gray-500 cursor-pointer">
            {showPassword ? <FaEyeSlash /> : <FaEye /> }
          </div>
        </div>

        {/* Sign-in Button */}
        <button type="submit" className="w-[359px] h-12 bg-purple-600 text-white rounded-md shadow-md hover:bg-purple-800 transition">
          Sign In
        </button>

        </form>

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
          
          <button onClick={handleGoogleSignIn} className="flex items-center justify-center w-[240px] h-[36px] bg-slate-200 hover:bg-black rounded-full shadow-sm">
            <span className="text-red-500">G Continue with Google</span>
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
