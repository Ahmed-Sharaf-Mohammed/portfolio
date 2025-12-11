import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import '../assets/styles/Main.scss';

function Main() {

  return (
    <div className="container">
      <div className="about-section">
        <div className="image-wrapper">
          <img src="https://media.licdn.com/dms/image/v2/D4D03AQFhtH_ezmN0Dw/profile-displayphoto-scale_400_400/B4DZn2UN9oIcAg-/0/1760774120110?e=1767225600&v=beta&t=RMt6vakxZbir5pS4lZ9jXzPmRIVOl7GEV5icp36tTno" />
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
