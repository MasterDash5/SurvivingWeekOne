"use client"
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import background from "@/public/background.png" 

export default function Home() {
	const router = useRouter();
	const [playerName, setPlayerName] = useState('John Doe');

	const clickGame = () => {
		router.push(`/game?playerName=${encodeURIComponent(playerName)}`);
	};

	const playernameChange = (event) => {
		setPlayerName(event.target.value);
	};

  return (
		<div>
		 	<Image src={background} alt="background" layout="fill" objectFit="cover" quality={100} priority className="-z-10 blur-xs"/>
		  <div className="w-1/3 bg-zinc-900 text-white m-auto mt-24 rounded-md">
			  <div className="flex flex-col justify-center">
					<h1 className="text-4xl font-bold m-10 mb-6 text-center text-[#fd0]">Surviving Week One</h1>
					<div>
						<label className="block mb-2 text-sm font-medium text-white w-3/5 m-auto">Player name</label>
						<input onChange={playernameChange} placeholder="John Doe" className="gap-6 bg-zinc-700 text-white text-sm rounded-md focus:ring-yellow-500 block w-3/5 m-auto mb-6 h-6 px-2.5"/>
					</div>
				  <button onClick={clickGame} className="bg-zinc-700 hover:bg-yellow-500 rounded-md mb-8 m-auto h-16 w-3/5">Start Game</button>
		 	  </div>
		  </div>
		</div>
  );
}
