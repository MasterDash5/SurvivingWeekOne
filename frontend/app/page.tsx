import Image from "next/image";
import background from "@/public/background.png" 

export default function Home() {
  return (
		<div>
		 	<Image src={background} alt="background" layout="fill" objectFit="cover" quality={100} priority className="-z-10 blur-xs"/>
		  <div className="w-1/3 bg-zinc-900 text-white m-auto mt-16 rounded-md">
			  <div className="flex flex-col justify-center">
					<h1 className="text-4xl font-bold m-10 text-center text-[#fd0]">Surviving Week One</h1>
				  <button className="bg-zinc-700 hover:bg-yellow-500 rounded-md mb-8 m-auto h-16 w-3/5">Start Game</button>
				  <button className="bg-zinc-700 hover:bg-yellow-500 rounded-md mb-8 m-auto h-16 w-3/5">Settings</button>
		 	  </div>
		  </div>
		</div>
  );
}
