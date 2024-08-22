"use client"
import Link from "next/link";
export default function Dashboard(){
 
    return(
        <div className="max-w-md w-full bg-gradient-to-r from-blue-800 to-purple-600 rounded-xl shadow-2xl overflow-hidden p-8 space-y-8 hover:shadow-3xl mx-4 text-white">
            <div className="leading-10 flex flex-col justify-center items-center py-4">
                <h1 className="font-bold uppercase text-2xl">
                  welcome to Dashboard
                </h1>
                <h1 className="text-md font-semibold">
                  You have Successfully Logged In.
                </h1>
                <p className="text-sm">
                  This is an Demo Page , created using NEXTJS 
                </p>
                {/* <p>Name : {localStorage.getItem('name')}</p> */}
                <p className="border-t mt-4">Email : {localStorage.getItem('email')}</p>
            </div>
            <Link href={'/'} className="hover:bg-red-800 rounded-2xl font-bold bg-red-600 text-white uppercase px-3 py-2 flex justify-center" >Logout</Link>
        </div>
    )
}