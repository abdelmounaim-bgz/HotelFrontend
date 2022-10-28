import React, { useContext, useEffect,useRef ,useReducer , useState } from 'react';
import axios from 'axios'    
import { Link } from "react-router-dom";

import Table from 'react-bootstrap/Table';
import Pagination from '../Pagination';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import UserContext from '../../ContextHandler'
import {useTranslation} from 'react-i18next'

import Footer from '../PageElement/Footer'
const Historique = ()  => {
  const {user, setUser} = useContext(UserContext);
  const [ t, i18n ] = useTranslation()

  const inputEl = useRef("");
  const [Hotels , setHotels] = useState([])
  const [Loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setpostsPerPage] = useState(7)
  const [searchTerm, setSearchTerm] = useState()
  const [searchResults, setsearchResults] = useState([]);
  const [reducerValue, forceUpdate] = useReducer(x => x+1, 0)

  const [show, setShow] = useState(false);
  const [ShowConfirmation, setShowConfirmation] = useState(false);
  const [generalCardConfirmation, setgeneralCardConfirmation] = useState(false);

  const [modify, setModify] = useState(false);
  const [titleModal, setTitleModal] = useState(false);
  const config  = {
    headers: {
        Authorization : 'Bearer ' +localStorage.getItem('token')
    }
  }
  
  useEffect(()=> {
    getAllHotels()
  } ,[reducerValue])  

  const getAllHotels = async () => {

    setLoading(true)
    axios.get(`http://192.168.12.54:3000/hotelsList/${localStorage.getItem('id')}?filter[where][isDeleted]=true`,config ).then(
        res => {
            setTimeout(() => {
              setLoading(false)
              setHotels(res.data)
              setsearchResults(res.data)  
            },800)
        },
        err => {
            console.log( err)
        }
    )
  }

  const handleUpdate = () => {
    forceUpdate();
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = searchResults.slice(indexOfFirstPost, indexOfLastPost);

  const Paginate = (PageNumber) => {
    setCurrentPage(PageNumber)
  }

  const searchHandler = (term) => {
    setSearchTerm (term)

    if(searchTerm !== ""){
      const newList = Hotels.filter((item) => {
        return Object.values(item)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()); 
      });
        setsearchResults(newList) 
    }else {
        setsearchResults(Hotels) 
    }
  };

  const getSearchTerm = () => {
      searchHandler(inputEl.current.value)
  }

  const handleClose = () => setShow(false);

  const handleDelete = (id) => {
    console.log(id)
    const config = {headers: {Authorization : 'Bearer ' +localStorage.getItem('token')}}
    
    axios.delete(`http://192.168.12.54:3000/hotels/${id}`,config ).then(
      res => {
        forceUpdate();
      },
      err => {
        console.log(err)
      }
    )
  }

  const handleGeneralCard =(post)=> {
    const newpost = post
    newpost.general_card = !newpost.general_card
    console.log(newpost.id)

    const config = {headers: {Authorization : 'Bearer ' +localStorage.getItem('token')}}

      axios.put(`http://192.168.12.54:3000/hotels/${post.id}`, newpost ,config).then(
      res => { forceUpdate();},
      err => { console.log( err) }
    )
  }
 
  const [thisHotel, setThisHotel] = useState(true)
  const [enable, setenable] = useState(true)

  const handleShowAdd = () => {
    setShow(true);  
    setTitleModal("Create un distributeur")
    setenable(true)
  } 
  
  const handleOpenConfirmation=(post) => {
    setShowConfirmation(true); 
    setenable(post.enable)
    setThisHotel(post)
  }
  const handleCloseConfirmation=() => setShowConfirmation(false); 

  const handleEnable =() =>{
    const newpost = thisHotel
    newpost.enable = !newpost.enable
    const config = { headers: { Authorization : 'Bearer ' +localStorage.getItem('token') } }

    axios.put(`http://192.168.12.54:3000/hotelsList/${newpost.id}`,newpost ,config).then(
        res => {
          forceUpdate();
          handleCloseConfirmation();
        },
        err => {
          setLoading(false)
          console.log( err)
        }
      )
    }
  const handleGeneralCardConfirmation = () => { console.log("tets")} 
  const handleCloseGeneralCardConfirmation=() => setgeneralCardConfirmation(false)

  return (
<div>

  <div className="content-wrapper page-container">
    {/* Content Header (Page header) */}
    <div className="content-header ">
      <div className="container-fluid ">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0 text-dark"><Link to="/home/hotels"  aria-current="page">Hotel</Link> / Historique</h1>
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
        
        <div className="card-header ">

          <Table borderless>
                <thead>
                    <tr>
                        <th className="col-xs-12 col-md-3" colSpan={2}>
                            <input className="form-control form-control-navbar" ref ={inputEl} onChange={getSearchTerm} type="search" placeholder="Nom hôtel,  nom admin,  Admin ..." aria-label="Search"/>
                        </th>
                    
                        <th>
                        <button 
                            className="btn btn-outline-dark" 
                            type="button" 
                            disabled={Loading}
                            style={{whiteSpace: 'nowrap'}}
                            onClick={!Loading ? handleUpdate : null}>
                            {Loading ?
                              <div>
                                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                &nbsp; Chargement..
                              </div>
                            : "Rafraîchir"}
                        </button> 

                        </th>
                    </tr>
                </thead>    
                </Table>
        </div>

        <div className="card-body">
          <Table id="example2" className="table  ">
            <thead >           
              <tr >
                <th>Nom</th>
                <th>Crée à</th>
                <th>Heure d'application</th>
                <th>Motif</th>
                <th>Options </th>
              </tr>
            </thead>
            {Loading ?
                <tbody>
                  <tr>
                    <td colSpan={2}></td>
                    <td > <center>{t("Chargement")}  <Spinner animation="border" variant="primary" /></center></td>
                    <td colSpan={2}></td>
                  </tr>
                </tbody>
                
                : <tbody>

                </tbody>
            }
          </Table>

        </div>
      </div>
    </div>
  </div>
</div>

        </div>
      </div>
    </section>          
    <Footer ></Footer>

  </div>

{/*
  <Modal show={ShowConfirmation} onHide={handleCloseConfirmation}>
    <Modal.Body>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        {enable ? 
            <Form.Label> Continuer à bloquer ce compte ? Il ne pourra pas se connecter au système du fournisseur </Form.Label>
            :<Form.Label> continuer à activer ce compte ? </Form.Label>                
        }
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="" onClick={() => handleCloseConfirmation()}>
        Close
      </Button>
      {enable ? 
        <Button variant="danger" onClick={() => handleEnable()}> Disable </Button>
        :<Button variant="primary" onClick={() => handleEnable()}> Enable</Button>
      }  
    </Modal.Footer>
  </Modal>

*/}
</div>


  )
}
export default Historique