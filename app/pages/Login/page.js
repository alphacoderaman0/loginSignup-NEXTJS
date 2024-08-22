'use client'
import React from 'react'
import { useState } from 'react';
import Link from 'next/link';
export default function Login() {
  // toggle eye functionality starts
  const passIn = document.getElementById('password');
  function toggle(){
    try {
      const type =
      passIn.getAttribute('type') ===
      'password' ? 'text' : 'password';
      passIn.setAttribute('type', type);
    } catch (error){}
  }
  // toggle eye functionality starts

  //login functionality Starts
  const [email,setEmail] =useState('');
  const [pass,setPass] =useState('');
  const [err , setErr] = useState('');
  const [success , setSuccess] = useState('');
  const handlelogin = async(e) =>{
    e.preventDefault();
    try {
      const res = await fetch("/api/login",{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({ email ,pass })});
      if (!res.ok) {
        setErr("Invalid Credential")
        window.setTimeout(closeError, 2000);
        function closeError(){
        document.getElementById("err").style.display="none";
        }
      }
      else{
        setSuccess(`${email} , Logged in Successfully`);
        const myTimeout = setTimeout(navigate, 2000);
        function navigate() {
          window.location.href = '/Dashboard';
        }
    }
    } catch (error) {
      setErr("invalid credential")
    }
  }
  localStorage.setItem('email' , email);
  //login functionality ends
    return (
      <div className="w-full flex justify-center">
        {/* main div starts */}
        <div className="max-w-md w-full bg-gradient-to-r from-blue-800 to-purple-600 rounded-xl shadow-2xl overflow-hidden p-8 space-y-8 hover:shadow-3xl mx-4">
        {/* err success starts */}
            {success && (
              <div className="flex justify-center bg-green-500 text-white text-md py-1 px-3 rounded-md mt-2">
                {success}
              </div>
            )}
            {err && (
              <div id="err" className="flex justify-center bg-red-500 text-white text-lg py-1 px-3 rounded-md mt-2">
                {err}
              </div>
            )}
        {/* err success ends */}

        {/* heading Sarts */}
            <h2 className="text-center text-4xl font-extrabold text-white">
              Welcome
            </h2>
            <p className="text-center text-gray-200">
            Sign in to your account
            </p>
        {/* heading ends */}

        {/* form starts */}
            <form onSubmit={handlelogin} className="space-y-6">
              {/* input Starts */}
              <div className="relative">
                <input onChange={(e)=>setEmail(e.target.value)} placeholder="john@example.com" className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500" required="" id="email" name="email" type="email"/>
                <label
                  className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
                  htmlFor="email"
                  >Email address</label>
              </div>
              <div className="relative">
                {/* toggle btn starts */}
                <p onClick={toggle} id="togglebtn" className='grayscale hover:grayscale-0 absolute top-2 left-80'><img id='eye' src="/eye.png" alt="" width={30} /></p>
                {/* toggle btn ends */}
                <input
                  onChange={(e)=>setPass(e.target.value)}
                  placeholder="Password"
                  className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
                  required=""
                  id="password"
                  name="pass"
                  type="password"/>
                <label
                  className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
                  htmlFor="password"
                  >Password</label>
              </div>
              {/* input ends */}

              {/* button starts */}
              <button
                className="w-full py-2 px-4 bg-purple-500 hover:bg-purple-700 rounded-md shadow-lg text-white font-semibold transition duration-200"
                type="submit"
              >
              Sign In
              </button>
              {/* button ends */}
            </form>
        {/* form ends */}

        {/* other starts */}
            <div className="text-center text-gray-300">
              Don't have an account?
              <Link className="text-purple-300 hover:underline" href="/pages/Signup">Sign up</Link>
            </div>
        {/* other ends */}
        </div>
        {/* main div ends */}
      </div>
    );
  }