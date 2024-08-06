import React from 'react'
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css"

const Footer = () => {
  return (
    <>
        <footer id='footer'>
            <div className="leftFooter">
                <h4>DOWNLOAD OUR APP</h4>
                <p>Download App for Android and IOS mobile phone</p>
                <img src={playStore} alt="playstore" />
                <img src={appStore} alt="appstore" />
            </div>
            <div className="midFooter">
                <h1>ECOMMERCE</h1>
                <p>High Quality is our first quality</p>
                <p>CopyRights 2021 &copy; PRASANGI</p>
            </div>
            <div className="rightFooter">
                <h4>Follow Us</h4>
                <a href="https://www.youtube.com/" target='_blank'>Instgram</a>
                <a href="https://www.youtube.com/">Youtube</a>
                <a href="https://www.youtube.com/">Facebook</a>
            </div>
        </footer>
    </>
  )
}

export default Footer