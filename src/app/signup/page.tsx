"use client";
import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, useAuth } from "@/providers/authprovider";
import { setCookie } from "cookies-next";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { getFirestore, doc, setDoc } from "firebase/firestore"; // Import Firestore
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/navigation"; 

const firestore = getFirestore(); // Initialize Firestore


const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    // Update the title when loading starts or stops
    if (loading) {
      document.title = "Loading...";
    } else {
      document.title = "Signup - ClarityIQ";
    }
  }, [loading]);



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // if (!termsAccepted) {
    //   setError("You must accept the terms and policies.");
    //   return;
    // }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();
      setCookie("auth_token", token, { maxAge: 60 * 60 * 24 * 7 }); // 1 week

      

      // Automatically log the user in after signup
      login(email, password);

      // Store first name, last name, and email in Firestore under customer_info
      const userDocRef = doc(firestore, "client_data", userCredential.user.uid);
      await setDoc(
        userDocRef,
        {
          customer_info: {
            firstName: firstName,
            lastName: lastName,
            email: email,
          },
        },
        { merge: true }
      );

      setLoading(false);
    } catch (err) {
      setError("Failed to create an account. Please try again.");
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
    <div className="relative flex items-center justify-center w-screen h-screen bg-white">
      {/* Background and Design Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-blue-300 shadow-lg"></div>
      <div className="absolute top-[67px] right-[34px] w-[100px] h-[100px] bg-blue-500 rounded-full"></div>
      <div className="absolute top-[360px] right-[26px] w-[114px] h-[280px] bg-blue-400 rounded-lg"></div>
      <div className="absolute top-[234px] left-[-0px] w-[393px] h-[393px] bg-blue-200 rounded-full"></div>

      {/* Background Shapes */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-gray-200"></div>
      <div className="absolute top-[46px] left-[657px] w-[740px] h-[913px] bg-cover bg-center bg-no-repeat rounded-lg shadow-lg" style={{ backgroundImage: "url('./images/rectangle80.jpg')" }}></div> */}

      {/* Main Container */}
      <div className="relative w-full max-w-lg p-8 bg-white rounded-xl shadow-lg z-10">
        {/* Title */}
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          Create your account
        </h1>

        {/* Social Sign-Up Buttons */}
        <div className="flex justify-around mb-6">
          <button onClick={handleGoogleSignIn} className="flex items-center justify-center w-[240px] h-16 bg-red-600 text-white rounded-full shadow-md hover:bg-black transition">
            <span className="text-lg">G Continue with Google</span>
          </button>
          
          
        </div>

        {/* OR Divider */}
        <div className="relative flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="mx-4 text-sm text-gray-600">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 text-black">
        {error && <p className="text-red-500 text-sm">{error}</p>}
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

        {/* Password Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
          id="password"
            type={showPassword ? "text" : "password"}
            placeholder="example.email@gmail.com"
            className="w-full h-12 px-4 bg-gray-100 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
        </div>
        {/* Confirm Password Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm Password
          </label>
          <input
          id="confirmPassword"
            type={showPassword ? "text" : "password"}
            placeholder="example.email@gmail.com"
            className="w-full h-12 px-4 bg-gray-100 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {/* Continue Button */}
        <button type="submit" className="w-full py-3 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-900 transition">
          Sign Up
        </button>
        </form>
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
