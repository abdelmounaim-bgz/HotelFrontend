import {useState,useEffect} from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from "react-router-dom";
import axios from 'axios';
import {useTranslation} from 'react-i18next'

 export default function () {
  const [selects, setSelects] = useState("Francais")  
  const [user, setUser] = useState([])
  const [ t, i18n ] = useTranslation()

  useEffect(()=> {
    getUser()
},[])

const getUser = async () => {
  const config = {headers: { Authorization : 'Bearer ' +localStorage.getItem('token')}}
  const data = await axios.get(`http://localhost:3000/users/${localStorage.getItem('id')}`,localStorage.getItem('id') , {config} )
  setUser(data.data)
}

const Deconnexion = ()=> {
  localStorage.removeItem("token");
  localStorage.removeItem("id");  
}
const change_language = (word, language) => {
  setSelects(word)
  i18n.changeLanguage(language)
}

  return (
    <div>       
        <nav className="main-header navbar navbar-expand navbar-white navbar-light" >
    {/* Left navbar links */}
    <ul className="navbar-nav">
      <li className="nav-item d-none d-sm-inline-block">
        <t className="text-primary">&nbsp; {user.username}&nbsp;</t>

        <a >&nbsp; {t('code fournisseur')}：{user.lockSupplier}</a>
      </li>
    </ul>
    {/* Right navbar links */}
    <ul className="navbar-nav ml-auto">
      {/* Messages Dropdown Menu */}

      <li className="nav-item dropdown">
 
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

        </Dropdown.Menu>
      </Dropdown>
      </li>
      {/* Notifications Dropdown Menu */}
      <li className="nav-item  dropdown globe">
      <Dropdown>
        <Dropdown.Toggle  variant="white" id="dropdown-basic">{user.contact}
        </Dropdown.Toggle>
        
        <Dropdown.Menu>
          <Dropdown.Item href="">
            <Link to="/home/My_information" className="nav-link active" aria-current="page"  >{t("Information de base")}</Link>
          </Dropdown.Item>
          <Dropdown.Item href="">
          <Link to="/login" className="nav-link active" aria-current="page" onClick={()=>Deconnexion()}>{t("Déconnexion")}</Link>
            </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      </li>
      
      <li className="nav-item">

      </li>
    </ul>
  </nav>

</div>

        
  )
}
