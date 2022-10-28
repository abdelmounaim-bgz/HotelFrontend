import {  useNavigate  } from "react-router-dom";

import { useEffect} from "react";
import Footer from "../components/PageElement/Footer";
import Hotel from "../components/hotel/DeviceAmount";
import Header from "../components/PageElement/Header";
import SideBar from "../components/PageElement/SideBar";
import Distributors from "../components/Distributors/Distributors";
import { Route, Routes } from "react-router-dom";
import My_information from "../components/My_informations/My_informations";
import HotelList from "../components/hotel/HotelList";
import Historique from "../components/hotel/Historique";
import Help from "../components/Help/Help";

const Home = () => {
    useEffect(()=> {
        checkConnecxion()
      } ,[]) 
    
      let navigate = useNavigate();
    const checkConnecxion= ()=> {
        if( !localStorage.getItem('token') ){
            navigate("/")
        }  
    }
    return(
        <div>
        <Header />
        <SideBar/>

        <Routes>
            <Route path="/Ditributors" element={<Distributors/>} /> 
            <Route path="/hotels/" element={<HotelList/>} />   
            <Route path="/hotels/historique" element={<Historique/>} />   
            <Route path="/My_information" element={<My_information/>} />   
            <Route path="/Help" element={<Help/>} />
        </Routes>
        
        </div>

    )
}
export default Home;