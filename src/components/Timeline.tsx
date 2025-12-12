import React from "react";
import '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faGraduationCap, faLaptopCode } from '@fortawesome/free-solid-svg-icons';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import '../assets/styles/Timeline.scss'
import { faRobot } from '@fortawesome/free-solid-svg-icons';
import { faMicrochip } from '@fortawesome/free-solid-svg-icons';


function Timeline() {
  return (
    <div id="history">
      <div className="items-container">
        <h1>Career History</h1>
        <VerticalTimeline>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'white', color: 'rgb(39, 40, 34)' }}
            contentArrowStyle={{ borderRight: '7px solid  white' }}
            date="Dec 2025 - Present"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faRobot} />}   
          >
            <h3 className="vertical-timeline-element-title">Machine Learning Engineer Trainee</h3>
            <h4 className="vertical-timeline-element-subtitle">DEPI Scholarship (Training Provider: AMIT) · Cairo, Egypt</h4>
            <p>
              Developing machine learning and deep learning skills through the DEPI Microsoft-based AI track.
              Training includes Python, data preprocessing, visualization, ML techniques, NLP, computer vision, Azure AI services, and MLOps tools.
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Jul 2025 - Present"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Operational Specialist</h3>
            <h4 className="vertical-timeline-element-subtitle">labouchee · Cairo, Egypt</h4>
            <p>
              Managing e-commerce operations, monitoring sales performance, pricing strategies, 
              and promotional campaigns using data-driven insights with Power BI and Excel.
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Aug 2025 - Oct 2025"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faGraduationCap} />}
          >
            <h3 className="vertical-timeline-element-title">Data Analysis Trainee</h3>
            <h4 className="vertical-timeline-element-subtitle">National Telecommunication Institute · Cairo, Egypt</h4>
            <p>
              120-hour professional training in data analysis using SQL, Python, Excel, 
              Power BI, and Tableau. Focused on data cleaning, visualization, and reporting.
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Feb 2023 - Present"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faLaptopCode} />}
          >
            <h3 className="vertical-timeline-element-title">Professional Freelancer</h3>
            <h4 className="vertical-timeline-element-subtitle">Mostaql.com · Remote</h4>
            <p>
              Delivering software solutions, websites, and data-driven tools. 
              Specializing in Python, Django, web development, and data analysis for global clients.
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Jan 2024 - Aug 2024"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faGraduationCap} />}
          >
            <h3 className="vertical-timeline-element-title">Python Instructor</h3>
            <h4 className="vertical-timeline-element-subtitle">schooland collegelistings · Hybrid</h4>
            <p>
              Teaching Python programming to diverse audiences including children. 
              Creating educational resources and providing personalized coaching.
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Jul 2024 - Sep 2024"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">SAP Basis Administrator</h3>
            <h4 className="vertical-timeline-element-subtitle">Jupiter Training Solutions · Cairo, Egypt</h4>
            <p>
              Earned SAP Basis certification. Proficient in system installation, configuration, 
              monitoring, user management, and performance optimization.
            </p>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
    </div>
  );
}

export default Timeline;