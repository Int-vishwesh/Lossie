
//icons
import { CopyPlus, Search } from 'lucide-react'; 

const Searchbar = () => {

  return (
    <div>
      <br />
      <br />
      <div id="search" className="flex justify-between max-sm:-mt-0">
        <input type="search" name="" placeholder="search items " 
        className="rounded-[99px] border-slate-400 ml-[25%] border-2 px-4 py-0.5 w-[50%] max-sm:py-0 " />
        <button className="flex -ml-[5%] bg-slate-400 p-1 rounded-[50%] max-sm:-ml-[15%] "><Search color='#2d232e'/> </button>
        <button className="flex mr-[20%] mt-0.5 max-sm:mr-[10%] "> <CopyPlus color='#2d232e'/></button>
      </div>
      
    </div>
  )
}

export default Searchbar;
