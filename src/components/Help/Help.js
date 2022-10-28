import { useEffect,useState,useReducer  } from 'react'

import 'react-phone-number-input/style.css'
import {useTranslation} from 'react-i18next'
import Footer from '../PageElement/Footer';
import '../../App.css'

import download_driver from '../../Images/download_driver.jpg'
import install_driver from '../../Images/install driver.jpg'
import install_assintant_64 from '../../Images/install assintant 64.jpg'
import install_assintant_86 from '../../Images/install assintant 86.jpg'
import Card_incoder_icon from '../../Images/Card incoder icon.jpg'
import application_runnung from '../../Images/application runnung.jpg'
import './Help.css'
function Help() {
    const [ t, i18n ] = useTranslation()

  return (
    <div>
    <div className="content-wrapper page-container" >
      {/* Content Header (Page header) */}
      <div className="content-header ">
        <div className="container-fluid ">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0 text-dark"> Help
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
          <div className="card-header col-12 help-page" >
            <div>
                <h3>What is our application? </h3>
            </div>
            <p>
                This system is for suppliers who provide locks for hotels. Suppliers can managetheirclients and distributors in this system. Distributors can also manage their hotels and sub-distributors in this system.
            </p>
            <div>
                <h3> User manual </h3> 
                <p> Download lock supplier system user manual for more details <a href='https://supplier.sciener.com/plug-in/manual_en.pdf' download>click here</a></p> 
            </div>
                <h3>Before using</h3>
            <div>
                <label>1- Install card encoder driver: </label> 
                <p> To download the card encoder driver <a href='https://supplier.sciener.com/plug-in/CardEncoderAssistant.zip' download>click here</a> </p> 

                <p>If the device driver has not been installed, please download it from the system and install it first.</p>

                <center><img src={download_driver} style={{width: '600px'}} className="mb-2"></img></center>
                <center><img src={install_driver} style={{width: '600px'}}  className="mb-3"></img></center>

            </div>
                    
            <div >
            
                <label>2- Download card encoder assistant: </label> 

                <p> To download the card encoder assistant <a href='https://supplier.sciener.com/plug-in/CardEncoderAssistant.zip' download>click here</a> </p> 
                <p> And then click install.</p>

                <center><img src={install_assintant_64} style={{width: '600px'}}  className="mb-2"></img></center>
                <center><img src={install_assintant_86} style={{width: '600px'}}  className="mb-3"></img></center>

                <p>There will be an icon on the desktop once the software has been installed.</p>

                <center><img src={Card_incoder_icon} style={{width: '120px'}}  className="mb-2"></img></center>
                <center><img src={application_runnung} style={{width: '600px'}}  className="mb-3"></img></center>

                <p >The card encoder assistant can only run on Windows system.</p>
                <p >To encrypt card or card encoder, please make sure the card encoder is ready for using. </p>

            </div>
            
          </div>
        </div>
      </div>
    </div>
            </div>
          </div>
        </div>
      </section>
      <Footer></Footer>
  
    </div>
</div>
  )
}

export default Help