"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Signup() {
  //toggle eye functioality starts
  const passIn = document.getElementById('password');
    function toggle(){
      try {
        const type =
            passIn.getAttribute('type') ===
                'password' ? 'text' : 'password';
        passIn.setAttribute('type', type);
      } catch (error) {
        
      }

    }
  // toggle eye functionality ends
  //add user function starts
  const router = useRouter();
  const [err , setErr] = useState('');
  const [success , setSuccess] = useState('');
  const [addUser, setAddUser] = useState({
    name: "",
    email: "",
    pass: "",
  });
  const handleSaveChanges = ({ target: { name, value } }) => {
    setAddUser({ ...addUser, [name]: value });
  };
  const handleAddSubmit = async (e) => {
    e.preventDefault();
   
    try {
      const reqOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addUser),
    };
    const response = await fetch(
      "http://localhost:3000/api/register",
      reqOption
    );
    const newUser = await response.json();
    if (newUser){
      setSuccess("User Registered Successfully");
      const myTimeout = setTimeout(navigate, 4000);
      function navigate() {
        router.push("/pages/Login");
      }
    }
    } catch (error) {
      setErr("user Already Exists");
      window.setTimeout(closeError, 2000);
        function closeError(){
        document.getElementById("err").style.display="none";
        }
    }
  

    
  };
  //add user function ends
  return (
    <div className="px-4 flex justify-center w-full ">
      {/* main Div Starts */}
      <div className="max-w-lg w-full bg-gradient-to-r from-blue-800 to-purple-600 rounded-xl shadow-2xl overflow-hidden p-8 space-y-8">
        {/* error success Starts */}
        {success && (
              <div className="flex justify-center bg-green-500 text-white text-lg py-1 px-3 rounded-md mt-2">
                {success}
              </div>
            )}
        {err && (
              <div id="err" className="flex justify-center bg-red-500 text-white text-lg py-1 px-3 rounded-md mt-2">
                {err}
              </div>
            )}
            {/* error success ends */}

            {/* heading starts */}
            <h2 className="text-center text-4xl font-extrabold text-white">
              Welcome
            </h2>
            <p className="text-center text-gray-200">
              Create an Account
            </p>
            {/* heading ends */}

            {/* form starts */}
            <form onSubmit={handleAddSubmit} className="space-y-6">
              {/* input Starts */}
              <div className="relative">
                <input
                  placeholder="Enter your name"
                  className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
                  required=""
                  id="name"
                  name="name"
                  type="text"
                  onChange={handleSaveChanges}
                  value={addUser.name}
                />
                <label
                  className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
                  htmlFor="name"
                >
                  Name
                </label>
              </div>
              <div className="relative">
                <input
                  placeholder="john@example.com"
                  className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
                  required=""
                  id="email"
                  name="email"
                  type="email"
                  onChange={handleSaveChanges} value={addUser.email}
                />
                <label
                  className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
                  htmlFor="email"
                >
                  Email address
                </label>
              </div>
              <div className="relative">
                {/* toggle btn starts */}
              <p onClick={toggle} id="togglebtn" className='grayscale hover:grayscale-0 absolute top-2 left-96'><img src="/eye.png" alt="" width={30} /></p>
                {/* toggle btn ends */}
                <input
                  placeholder="Password"
                  className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
                  required
                  id="password"
                  name="pass"
                  type="password"
                  onChange={handleSaveChanges} value={addUser.pass}
                />
                <label
                  className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
                  htmlFor="password"
                >
                  Password
                </label>
              </div>
              {/* input ends */}
              {/* button starts */}
              <button
                className="w-full py-2 px-4 bg-purple-500 hover:bg-purple-700 rounded-md shadow-lg text-white font-semibold transition duration-200"
                type="submit"
              >
              Sign up
              </button>
              {/* button ends */}
            </form>
            {/* form ends */}

            {/* other starts */}
            <p className="text-center text-lg text-gray-200">
              -OR-
            </p>
            <button className="w-full py-2 px-4 bg-purple-500 hover:bg-purple-700 rounded-md shadow-lg text-white font-semibold transition duration-200">
              <a href="/pages/Login">Login with existing Account</a>
            </button>
            {/* other ends */}
      </div>
      {/* main div ends */}
    </div>
  );
}
