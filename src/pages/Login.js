import { useEffect, useState } from "react";
import hotelLogo from "../Images/MAScIR.png"
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import ForgotPassword from "../components/Login/ForgotPassword";
import Sign_in from "../components/Login/Sign_in";
import { Route, Routes , useNavigate } from "react-router-dom";
import Footer from "../components/PageElement/Footer_Login";
import {useTranslation} from 'react-i18next'
import background4 from '../Images/Background3.jpg'
import background2 from '../Images/Background2.jpg'

import '../App.css'
const Login = () => {
  const [ t, i18n ] = useTranslation()

   const [selects, setSelects] = useState("Francais")  
//   const thisUser = useContext(loginContext);
    let navigate = useNavigate();
    useEffect(()=> {
        if(i18n.changeLanguage("fr")){
          setSelects("Francais")
        }else if(i18n.changeLanguage("en")) {
          setSelects("Anglais")
        }
        checkConnecxion()
      } ,[]) 

    const checkConnecxion= ()=> {
        if( localStorage.getItem('token') ){
            navigate("/home/hotels")
        }
    }
  const change_language = (word, language) => {
    setSelects(word)
//    localStorage.setItem(language)
    i18n.changeLanguage(language)
  }
    
    return(
<div>

    <Navbar style={{backgroundColor: "white"}}>
      <Container >
        <Navbar.Brand >        
            <img src={hotelLogo}alt="AdminLTE Logo" className="brand-image  " style={{width: "35px"}} />
            <span style={{color:" #3C8CCF"}}> {t("Système fournisseur serrure")} </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">

        <Dropdown>
          <Dropdown.Toggle  variant="white" id="dropdown-basic">{selects}
          </Dropdown.Toggle>
        
        <Dropdown.Menu>
          <Dropdown.Item onClick={e=>change_language("Francais","fr")}>
            <a type="button"className="nav-link active" aria-current="page" >Francais</a>
          </Dropdown.Item>

          <Dropdown.Item onClick={e=>change_language("Anglais","en")}>
            <a type="button"className="nav-link active" aria-current="page" >Anglais</a>
          </Dropdown.Item>

          <Dropdown.Item onClick={e=>change_language("简体中文","简")}>
            <a type="button"className="nav-link active" aria-current="page" >简体中文</a>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>


        </Navbar.Collapse>
      </Container>
    </Navbar>
 

    <section className="content  login-background"  
      style={{ backgroundImage: `url(${background4})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
      }}>
      
        <div className="signin ">
            <div className="content-header signin_conntainer box-shadow " >
                <div className="container-fluid ">
                    
                <Routes>
                    <Route path="/" element={<Sign_in/>} /> 
                    <Route path="/forgotpassword" element={<ForgotPassword/>} /> 
                </Routes>

                </div>
            </div>
        </div>
    </section>
    <div ></div>
<Footer ></Footer>

</div>
    )
}
export default Login
