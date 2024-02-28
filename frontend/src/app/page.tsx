import Navbar from "@/components/Navbar";
import { SpotlightPreview } from "@/components/hero";
import  {BentoGridThirdDemo} from "../components/explore";

const App = () =>{
  return(
    <>
    <div className="z-0">
    <SpotlightPreview />
    <Navbar />
    < BentoGridThirdDemo />
    </div>
    </>


  )
}

export default App;