import React from 'react'

export default function Footer() {
    return (
        <div className="footer-container d-flex justify-content-center">
            <div className="footer-content d-flex flex-row flex-wrap">
                <div className="d-flex flex-row flex-fill p-4 mx-2 ">
                    <img src="assets/images/lets-eat-logo.png" className="footer-logo-image" alt="logo"></img>
                    <div className="footer-contact-box mx-4">
                        <a href="https://github.com/akhil411" target="_blank" rel="noopener noreferrer"><img src="assets/images/github.png"
                            title="Github" alt="Github"></img></a>
                        <a href="https://www.linkedin.com/in/akhilvijayan411/" target="_blank" rel="noopener noreferrer"><img
                            src="assets/images/linkedin.png" title="LinkedIn" alt="LinkedIn"></img></a>
                        <a href="https://akhil411.github.io/" target="_blank" rel="noopener noreferrer"><img
                            src="assets/images/resume-icon.png" title="Profile"
                            alt="profile"></img></a>
                    </div>
                </div>
            </div>
        </div>
    )
}