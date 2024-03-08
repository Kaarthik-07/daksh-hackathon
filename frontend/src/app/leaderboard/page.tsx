'use client';
import React from "react";
import { useState , useEffect } from "react";
import LoadingSpinner from "@/components/loading";
import axios from 'axios';
interface User{
    username : string,
    points : number
}

const LeaderBoard :React.FC= () =>{

    const [users , setusers] = useState<User[]>([]);
    useEffect(()=>{
        const fetch =async () => {
            try{
             const res = await  axios.get('http://localhost:6969/leaderboard');
             if(res){
              console.log(res.data.data);
              setusers(res.data.data);
              
             }
            }
            catch(err){
            console.error(err);
            
            }
        }
        fetch();
    },[])
    return(
        <>
        {users.length > 0 ? (
           <>
           <div className="flex flex-col items-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Leaderboard</h1>
      <div className="flex flex-col w-96 text-black">
        {users.map((user, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-4 rounded-lg ${
              index < 3 ? (index === 0 ? "bg-gold" : index === 1 ? "bg-silver" : "bg-brownish") : "bg-white"
            } mb-2`}
          >
            <span>{index + 1}</span>
            <span>{user.username}</span>
            <span>{user.points} points</span>
          </div>
        ))}
      </div>
    </div>
           </>
        ) : (
            <>
            <LoadingSpinner/>
            </>

        )}
        
        </>
    )
}

export default LeaderBoard;
