import Navbar from "./navbar";
import Search from "./searchbar";
const Lostfeeds = () => {

  return (
    <main className="">
      <h3 className="text-[18px] mb-5 m-auto text-left ml-[150px] max-sm:-ml-[0px] ">browsing lost items</h3>
      <div className="flex justify-center w-[100%] m-1 max-sm:m-5">
        <div className="flex flex-wrap gap-10 w-[1100px] max-sm:gap-10">
        <div id="lost-item" className="">
            <img src="lost.jpg" className="object-cover rounded-md h-60 w-60 max-sm:h-44 max-sm:w-44" />
          <details>
            <summary className="text-center p-1 text-[#2d123e]">item 1</summary>
            <p className="w-60 max-sm:w-44">item 1 description details or auto caption</p>
          </details>
        </div>
        <div id="lost-item" className="">
            <img src="lost.jpg" className="object-cover rounded-md h-60 w-60 max-sm:h-44 max-sm:w-44" />
          <details>
            <summary className="text-center p-1">item 1</summary>
            <p className="w-60 max-sm:w-44">item 1 description details or auto caption</p>
          </details>
        </div>
        <div id="lost-item" className="">
            <img src="lost.jpg" className="object-cover rounded-md h-60 w-60 max-sm:h-44 max-sm:w-44" />
          <details>
            <summary className="text-center p-1">item 1</summary>
            <p className="w-60 max-sm:w-44">item 1 description details or auto caption</p>
          </details>
        </div>
        <div id="lost-item" className="">
            <img src="lost.jpg" className="object-cover rounded-md h-60 w-60 max-sm:h-44 max-sm:w-44" />
          <details>
            <summary className="text-center p-1">item 1</summary>
            <p className="w-60">item 1 description details or auto caption</p>
          </details>
        </div>
        <div id="lost-item" className="">
            <img src="lost.jpg" className="object-cover rounded-md h-60 w-60 max-sm:h-44 max-sm:w-44" />
          <details>
            <summary className="text-center p-1">item 1</summary>
            <p className="w-60">item 1 description details or auto caption</p>
          </details>
        </div>
        </div>
      </div>

    </main>
  )
};

export default Lostfeeds;
