import React , {useState, useRef, useContext} from"react"
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import emailjs from '@emailjs/browser';
import PhoneInput from 'react-phone-number-input'

import UserContext from '../../ContextHandler'
import {useTranslation} from 'react-i18next'
const AddHotel = (props) => { 
  const [ t, i18n ] = useTranslation()
  const {user, setUser} = useContext(UserContext);
  const [name, setname] = useState("")
  const [admin_name, setadmin_name] = useState("")
  const [adress, setadress] = useState("")
  const [account, setaccount] = useState("")
  const [general_card, setgeneral_card] = useState(false)
  const [enable, setenable] = useState(true)
  const [country, setcountry] = useState("")
  const [phone, setphone] = useState("")
  const [idHotel, setidHotel] = useState("")
  const [Role,setRole] = useState("")
  const [errorName , seterrorName] = useState()
  const [ErrorAccount , setErrorAccount] = useState()

  const form = useRef();
  const config = { headers: { Authorization : 'Bearer ' +localStorage.getItem('token') } }

  const AddHotel =() =>{

    let error = false
    
    if(name == null || name == ""){
      seterrorName("username is required")
      error = true
    }
    if(phone == "" && account == ""|| phone == "" && account == null || phone == null && account == ""|| phone == null && account == null ){
      setErrorAccount("You must provide an Email or phone number")
      error = true
    }
    if (error == false){
      const tmp_date = new Date().toISOString().split("T")
      const date = `${tmp_date[0]}`

      const contact = 0
      const Created_By = user.username
      const lockSupplier = user.lockSupplier
      const hotel = { name, admin_name, country, adress, account,  date, general_card, phone, contact, Role, lockSupplier ,Created_By ,enable }

      axios.post(`http://192.168.12.54:3000/hotels/${localStorage.getItem('id')}`,hotel, config).then(
        res => {
          props.handleClose()     
          
          setname("")
          setcountry("")
          setadress("")
          setadmin_name("")
          setaccount("")
          setphone("")
          setgeneral_card(false)
          console.log("res.data.id "+ res.data.id)
          setidHotel(res.data.id)

          props.update()
        },
        err => {
          console.log( err.response.data)
          alert(err.response.data.error.message)

        }
      )
    }
  }
/*
  const addHotelUser = (idHotel) => {

    const username = name
    const email = account
    let password = Math.floor(Math.random() * (99999999 - 10000001 ) ) + 10000000
    password = password.toString()
    console.log("le mot de passe: " + password)
    const role = 2
    const user = {username, email, password, idHotel, role}

    axios.post(`http://192.168.12.54:3000/users`,user, config).then(
      res => { console.log(res.data);console.log(password)}) 
  }

  const addHotelNumber =() => {
    user.hotelNumber += 1
    setUser(user)
    
    axios.put(`http://192.168.12.54:3000/usersAttribute/${user.id}`, user, { config }).then(
      res => {console.log("Hotel number: ."+ res.data.hotelNumber)})
  }
 
  const sendEmail = () => {
    emailjs.sendForm('service_az2xq8w', 'template_ui567fk', form.current, 'ztrTnhG0BAYQaVBCq')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  };
*/
    const setphoneNumber = () => {
      setphone()
      setErrorAccount("")
    } 
    return(
    <Modal show={props.show} onHide={props.handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>{t("Créer un hôtel")}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form ref={form}>
        <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
          <Form.Label> {t("Nom de l'hôtel")}  </Form.Label>
          <div  className="mb-2">
            <Form.Control
              type=  "text"
              placeholder={t("Ecrire ici")}
              autoFocus
              className="mb-1"
              value={name}
              onChange={(e) => {setname(e.target.value); seterrorName("")}}
            />
            <center>
              <p className="mb-1" style={{ color: "red", fontSize:"13px"}}>{errorName}</p>
            </center>
          </div>
          <Form.Label> {t("Country/Region")} </Form.Label>
          <Form.Control
            type=  "text"
            placeholder={t("Ecrire ici")}
            autoFocus
            value={country}
            className="mb-2" 
            onChange={(e) => setcountry(e.target.value)}
            />

          <Form.Label> {t("Adresse")} </Form.Label>
          <Form.Control
            type = "text"
            placeholder={t("Ecrire ici")}
            autoFocus
            className="mb-2"
            value={adress}
            onChange={(e) => setadress(e.target.value)}/>

          <Form.Label> {t("Nom Admin")} </Form.Label>
          <Form.Control
            type=  "email"
            placeholder={t("Ecrire ici")}
            autoFocus
            className="mb-2"
            value={admin_name}
            onChange={(e) => setadmin_name(e.target.value)}/>
          
          <Form.Label > {t("Administrateur")} : &nbsp; </Form.Label>
                <Form.Check
                  inline  value="email"
                  label={t("Adresse e-mail")}
                  name="group1"
                  type="radio"
                  defaultChecked
                  onChange={(e)=>props.changeEmail()}
                  id="inline-Check-1"
                 />
                <Form.Check
                  inline value="Telephone"
                  label={t("Téléphone")}
                  name="group1"                  
                  type="radio"
                  id="inline-Check-2"
                  onChange={(e)=> props.changeTelephone()}
                />

          <div className="button mb-2">
          {props.contactType  ?
          <Form.Control
            type=  "email"
            placeholder={t("Ecrire ici")}
            autoFocus
            className="mb-1  "
            value={account}
            onChange={(e) => {setaccount(e.target.value); setErrorAccount("")}}
          />
          :
          <PhoneInput
            type = "text"
            name="telephone"
            autoFocus
            className="button mb-1"
            placeholder={t("Ecrire ici")}
            value={phone}
            onChange= {setphone}
          />
          }
          
            <center>
              <p className="mb-1" style={{ color: "red", fontSize:"13px"}}>{ErrorAccount}</p>
            </center>
          </div>


          <Form.Label inline> {t("Support pass général")}: </Form.Label> &nbsp;
          <Form.Check 
            center 
            inline
            type="switch"
            id="custom-switch"
            checked={general_card}
            value={general_card}
            onChange={(e) => setgeneral_card(!general_card)}
          />

        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => props.handleClose()}>
        {t("Cancel")}
      </Button>
      <Button variant="primary" onClick={() => AddHotel() } >
        {t("Enregister")} 
      </Button>
    </Modal.Footer>
    </Modal>
  )
}
export default AddHotel