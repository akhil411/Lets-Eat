import React from 'react'

export default function Footer() {
    return (
        <div className="footer-container d-flex">
            <div className="footer-content d-flex flex-row flex-wrap justify-content-around">
                <div className="d-flex flex-column flex-fill p-4 mx-2 ">
                    <img src="../assets/images/main-logo.png" className="footer-logo-image" alt="logo"></img>
                    <div className="footer-contact-box box"><a href="tel:+9199612 02144">CALL US</a></div>
                </div>
                <div className="d-flex flex-column flex-fill p-4 mx-2 text-left contact-details">
                </div>
            </div>
        </div>
    )
}