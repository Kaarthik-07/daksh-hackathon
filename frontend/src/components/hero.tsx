  "use client";
  import React from "react";
  import { BackgroundBeams } from "./ui/background-beams";
  import { Spotlight } from "./ui/Spotlight";
  import ChatModule from "../components/chat";
  export function SpotlightPreview() {
    return (
      <>
      <div className="h-[40rem] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />
        <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
          <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          DORA AI
          <br /> 
         <span className="text-2xl"> Revolutionizing Learning with Artificial Intelligence
  is the new trend.</span>
          </h1>
          <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
          Welcome to Dora AI: Transformative AI-Powered Education for Kids! Embark on an interactive journey where learning meets adventure through captivating narratives and rich graphics. Join us in shaping the future of education!
          </p>
        </div>
        <h1 className="text-red-500"></h1>
        <BackgroundBeams />
      </div>
      <ChatModule />
      </>
) };
