import Navbar from "@/components/Navbar";
import { SpotlightPreview } from "@/components/hero";
import  {BentoGridThirdDemo} from "../components/explore";
import CardIndex from "@/components/cardIndex";
import Footer from "@/components/Fotter";
import ExampleLayoutComponent from "@/components/loading";
import LoadingSpinner from "@/components/loading";

const App = () =>{
  return(
    <>
    <div className="z-0">
    <SpotlightPreview />
    <Navbar />
    < BentoGridThirdDemo />
    <CardIndex />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <Footer />
    </div>
   <LoadingSpinner />
        </>


  )
}

export default App;