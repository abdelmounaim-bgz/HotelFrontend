import { useEffect,useState,useReducer  } from 'react'
import Button from 'react-bootstrap/Button';
import axios from 'axios'    
import Table from 'react-bootstrap/Table';
import 'react-phone-number-input/style.css'
import {useTranslation} from 'react-i18next'

import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import M_PhoneNumber from './M_PhoneNumber';
import M_Password from './M_Password';
import Footer from '../PageElement/Footer';
import '../../App.css'
function My_information() {
  const [ t, i18n ] = useTranslation()

  const [user, setUser] = useState([])
  const [show, setShow] = useState(false);
  const [nomBabel, setnomBabel] = useState("test");
  const [type, setType] = useState("");
  const [value, setValue] = useState("");
  const [reducerValue, forceUpdate] = useReducer(y => y+1, 0)
  
//user
  const [id, setId] = useState("");
  const [username, setusername] = useState("")
  const [contact, setcontact] = useState("")
  const [telephone, settelephone] = useState("")
  const [email, setemail] = useState("")
  const [hotelNumber, sethotelNumber] = useState();
  const [enable, setenable] = useState(true);
  const [password, setpassword] = useState("")

  const [error, seterror] = useState("")
  const config = { headers: { Authorization : 'Bearer ' +localStorage.getItem('token')} }

  useEffect(()=> {
      getUser()
  },[reducerValue])

  const handleUpdate = () => forceUpdate();
  
  const getUser = async () => {

    axios.get(`http://192.168.12.54:3000/users/${localStorage.getItem('id')}`,config ).then(
      res => {
        setUser(res.data)
        
        setId(res.data.id)
        setusername(res.data.username)
        setemail(res.data.email)
        setcontact(res.data.contact)
        settelephone(res.data.telephone)
        setpassword(res.data.password)
        sethotelNumber(res.data.hotelNumber)
        setenable(res.data.enable)  
      },
      err => {
        console.log( err.response)
      }
    )
       
  }
  const handleClose = () => {
    setShow(false)
    ClosePhoneNumber()
    seterror("")
  };
   
  const handleShow = (nomBabel,type,value) => {
      setShow(true);
      setnomBabel(nomBabel)
      setType(type)
      setValue(value)
  }

  const handleModify = (nomBabel) =>{
    let error = false
    const newUser = {id, username, contact,  email, telephone, hotelNumber, enable}
    if(nomBabel === t("Nom")){
      newUser.username = value
      if(newUser.username == null || newUser.username == ""){
        seterror("Username is required")
        error = true
      }
    }
    else if(nomBabel === "Contact")
      newUser.contact = value
    else if(nomBabel === "Numéro de téléphone")
      newUser.telephone = value
    else if(nomBabel === "Email"){
      newUser.email = value
      const emailRegPattern = /\S+@\S+\.\S+/;
   
      if(newUser.email == null || newUser.email == "" ){
          seterror("Email adress is required")
          error = true
      } else if (!emailRegPattern.test(newUser.email)) {
          seterror('The email address is not valid');
          error = true
      }
    }
    else if(nomBabel === "Password")
      newUser.username = value
    
    if(error == false ){
      axios.put(`http://192.168.12.54:3000/usersAttribute/${newUser.id}`,newUser ,{config}).then(
        res => {
          handleUpdate();
          handleClose()
        },
        err => {
          console.log(err)
        }
      )
    }
  }
    const [showPassword, setshowPassword] = useState(false)
    const handleClosePassword = () => {setshowPassword(false)}
    const handleOpenPassword = () => {setshowPassword(true)}
    
    const [showPhoneNumber, setshowPhoneNumber] = useState(false)
    const ClosePhoneNumber = () => {setshowPhoneNumber(false)}
    const OpenPhoneNumber = () => {setshowPhoneNumber(true)}

   return (
            <div>
  <div className="content-wrapper page-container" >
    {/* Content Header (Page header) */}
    <div className="content-header ">
      <div className="container-fluid ">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0 text-dark">{t("Information de base")}
            </h1>         

          </div>{/* /.col */}
        </div>{/* /.row */}
        <hr></hr>
      </div>{/* /.container-fluid */}
    </div>

    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3 col-6">
          </div>
        </div>
          <div className="row">
            <div className="container-fluid">
  <div className="row">
    <div className="col-12">
      <div className="card">
        <div className="card-header col-12 votre-information" >

                <Table  borderless>
                <thead>
                    <tr>
                        <td >
                            <label>{t('Votre information')}:</label>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div className="" type=""  >
                                {t('Nom')}
                            </div>
                        </td>
                        <td>
                            <div className="" type=""  >
                                {user.username}
                            </div>
                        </td>
                        <td>
                            <div className="text-primary" type="button" onClick={() => handleShow(t("Nom"),"text",user.username, )} >
                                <a>{t('Modifier')}</a>
                            </div>
                        </td>
                    </tr>    
                    <tr>
                        <td>
                            <div className=""   >
                                {t("Contact")}
                            </div>
                        </td>
                        <td>
                            <div className=""   >
                            {user.contact}
                            </div>
                        </td>
                        <td>
                            <div className="text-primary" type="button" onClick={() => handleShow("Contact","text",user.contact)} >
                                <a>{t("Modifier")}</a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="" type=""  >
                                {t("Numéro de téléphone")}
                            </div>
                        </td>
                        <td>
                            <div className="" type=""  >
                            {user.telephone}
                            </div>
                        </td>
                        <td>
                        <div className="text-primary" type="button" onClick={() => OpenPhoneNumber()} >
                                <a>{t("Modifier")}</a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="" type=""  >
                                {t("Contact e-mail")}
                            </div>
                        </td>
                        <td>
                            <div className="" type=""  >
                            {user.email}
                            </div>
                        </td>
                        <td>
                        <div className="text-primary" type="button" onClick={() => handleShow("Email","email",user.email)} >
                                <a>{t("Modifier")}</a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="" type=""  >
                                {t("Mot de passe")}
                            </div>
                        </td>
                        <td>
                            <div className="" type=""  >
                            ********
                            </div>
                        </td>
                        <td>
                        <div className="text-primary" type="button" onClick={() => handleOpenPassword()} >
                                <a>{t("Modifier")}</a>
                            </div>
                        </td>
                    </tr>
                </tbody>    
                </Table>
  
        </div>
      </div>
    </div>
  </div>
          </div>
        </div>
      </div>
    </section>
{/*
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3 col-6">
          </div>
        </div>
          <div className="row">
            <div className="container-fluid">
  <div className="row">
    <div className="col-12">
      <div className="card">
        <div className="card-header col-12 votre-information">

            <Table  borderless>
            <thead>
                <tr>
                    <td >
                        <label>{t('information de profile')}:</label>
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <div className="" type=""  >
                            {t('Nom')}
                        </div>
                    </td>
                    <td>
                        <div className="" type=""  >
                            {user.username}
                        </div>
                    </td>
                    <td>
                        <div className="text-primary" type="button" onClick={() => handleShow(t("nom"),"text",user.username, )} >
                            <a>{t('Modifier')}</a>
                        </div>
                    </td>
                </tr>    
            </tbody>    
            </Table>
  
        </div>
      </div>
    </div>
  </div>
          </div>
        </div>
      </div>
    </section>*/}
    <Footer></Footer>

  </div>
    
    
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t("Modifier votre information")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <div className=''>
                <Form.Label>{nomBabel}</Form.Label>
                <Form.Control
                  type= {`${type}`}
                  placeholder={t("Ecrire ici")}
                  autoFocus
                  value={value}
                  onChange={(e) => { setValue(e.target.value); seterror("") }}
                />
                <center>
                  <p className="mb-" style={{ color: "red", fontSize:"13px"}}>{error}</p>
                </center>

              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("Cancel")}
          </Button>
          <Button variant="primary" onClick={() => handleModify(nomBabel)}>
            {t("Enregister")}
          </Button>
        </Modal.Footer>
      </Modal>

      <M_Password
        handleClose={handleClosePassword}
        show={showPassword}
        modify={handleModify}
        password={user.password}
        setpassword= {setpassword}
        handleUpdate={handleUpdate}
        ></M_Password>

      <M_PhoneNumber 
        handleClose={ClosePhoneNumber} 
        show={showPhoneNumber} 
        modify={handleModify} 
        telephone={user.telephone} 
        settelephone= {setValue}
      ></M_PhoneNumber>

</div>

        )
    
}
export default My_information