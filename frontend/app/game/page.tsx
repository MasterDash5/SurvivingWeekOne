import Image from "next/image";
import background from "@/public/background.png"

export default function Home() {
  return (
		<div className="h-screen w-full flex">
      <div className="w-2xs bg-zinc-900 text-white p-4 justify-between flex flex-col">
				<div>
				  <h2 className="text-lg font-bold text-center text-[#fd0]">Surviving Week One</h2>
					<div className="mt-8">
						<p>player stats stuff</p>
					</div>
				</div>
				<div className="w-full flex">
        	<button className="bg-zinc-700 hover:bg-yellow-500 rounded-md m-2 w-full">Quit Game</button>
					<button className="bg-zinc-700 hover:bg-yellow-500 rounded-md m-2 w-full">Settings</button>
			  </div>
			</div>

      <div className="flex flex-col w-full h-screen">
	  		<div className="mr-24 ml-24 mt-16 mb-16 bg-zinc-700 opacity-80 h-screen">
					<p>text box</p>
				</div>
				<div className="flex mr-24 ml-24 mb-16 text-white">
					<button className="bg-zinc-700 hover:bg-yellow-500 rounded-md h-12 m-8 mt-2 mb-2 w-1/3">Option 1</button>
				  <button className="bg-zinc-700 hover:bg-yellow-500 rounded-md h-12 m-8 mt-2 mb-2 w-1/3">Option 2</button>
					<button className="bg-zinc-700 hover:bg-yellow-500 rounded-md h-12 m-8 mt-2 mb-2 w-1/3">Option 3</button>
				</div>
      </div>
    </div>
  );
}
