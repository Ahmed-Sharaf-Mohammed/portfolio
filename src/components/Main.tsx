import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import '../assets/styles/Main.scss';

function Main() {

  return (
    <div className="container">
      <div className="about-section">
        <div className="image-wrapper">
          <img src="https://media.licdn.com/dms/image/v2/D4D03AQFhtH_ezmN0Dw/profile-displayphoto-crop_800_800/B4DZn2UN9oIcAI-/0/1760774120021?e=1762387200&v=beta&t=k0zkFjOrEz-zMuWa5jOK0P92NKN3thv735l8HEKdM2E" alt="Avatar" />
        </div>
        <div className="content">
          <div className="social_icons">
            <a href="https://github.com/ahmed-Sharaf-Mohammed/" target="_blank" rel="noreferrer"><GitHubIcon/></a>
            <a href="https://www.linkedin.com/in/ahmed-sharaf-mohammed/" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
          </div>
          <h1>Ahmed Sharaf</h1>
          <p>Data Scientist</p>

          <div className="mobile_social_icons">
            <a href="https://github.com/ahmed-Sharaf-Mohammed/" target="_blank" rel="noreferrer"><GitHubIcon/></a>
            <a href="https://www.linkedin.com/in/ahmed-sharaf-mohammed/" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;