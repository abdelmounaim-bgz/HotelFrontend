import React, { Component } from 'react'
import wechat1 from '../../Images/wechat1.jpg'
import wechat2 from '../../Images/wechat2.png'
import './PageElement.css'
export default class FooterLogin extends Component {
  render() {
      return ( 
<>

<style dangerouslySetInnerHTML={{__html: "\nfooter {\n  text-align: center;\n  padding: 3px;\n  background-color: black;\n  color: wite;\n}\n" }} />
<footer className="footer ">
  <div className="container">
    <div className="row">
        <div className="col ">
          <ul className="list-unstyled">
            <li>Phone</li>
            <li className=" mb-4">400-800-1785</li>
            <li>Email</li>
            <li>hotelservice@sciener.com</li>
          </ul>
        </div>
        <div className="col">
          <ul className="list-unstyled">
            <li>Follow us</li>
            <li> 
              <img style={{width: '120px'}} src={wechat1} />
            </li>
          </ul>
        </div>
        <div className="col">
          <ul className="list-unstyled">
            <li>Follow us</li>
            <li> 
              <img style={{width: '120px'}} src={wechat2} />
            </li>
          </ul>
        </div>

    </div>
    <div className="row">
      <p className="col-sm">Copyright(C) 2012-2022 Hangzhou Sciener Technology co.LTDbottom.zhebeian</p>

    </div>

  </div>

</footer>




</>
    )
  }
}
