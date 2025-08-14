import Image from "next/image";

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

      <div className="flex-1 bg-black-900 text-white justify-center flex flex-col">
        <div className="flex flex-col md:flex-row mt-auto">
          <button>
						text
          </button>
        </div>
      </div>
    </div>
  );
}
