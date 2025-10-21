import React from "react";
import '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPython, faMicrosoft } from '@fortawesome/free-brands-svg-icons';
import { faChartLine, faChalkboardTeacher, faShoppingCart, faDatabase } from '@fortawesome/free-solid-svg-icons';
import Chip from '@mui/material/Chip';
import '../assets/styles/Expertise.scss';

const labelsFirst = [
    "Python", "Django", "C#", "Unity", "HTML5", "CSS3", 
    "Bootstrap", "JavaScript", "PHP", "OOP", "MVC Architecture"
];

const labelsSecond = [
    "Power BI", "SQL", "MySQL", "PostgreSQL", "SQL Server", 
    "Alteryx", "SSIS", "Excel", "Data Analysis", "Data Visualization"
];

const labelsThird = [
    "E-commerce Operations", "Sales Performance", "Pricing Strategies", 
    "Promotional Campaigns", "Dashboard Monitoring", "System Optimization",
    "Data-driven Insights", "Operational Analysis"
];

const labelsFourth = [
    "Training & Coaching", "Instructional Design", "Adult Learning", 
    "Technical Training", "Python Teaching", "Web Development Teaching", 
    "Power BI Training", "SQL Training"
];

function Expertise() {
    return (
    <div className="container" id="expertise">
        <div className="skills-container">
            <h1>Expertise</h1>
            <div className="skills-grid">
                <div className="skill">
                    <FontAwesomeIcon icon={faPython} size="3x"/>
                    <h3>Full Stack Development</h3>
                    <p>I develop robust web applications using Python, Django, C#, and Unity. With expertise in both frontend and backend development, I build complete solutions from concept to deployment.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Tech stack:</span>
                        {labelsFirst.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>

                <div className="skill">
                    <FontAwesomeIcon icon={faChartLine} size="3x"/>
                    <h3>Data Analysis & BI</h3>
                    <p>I transform raw data into actionable insights using Power BI, SQL, and advanced analytics tools. Specialized in data visualization, modeling, and business intelligence reporting.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Tech stack:</span>
                        {labelsSecond.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>

                <div className="skill">
                    <FontAwesomeIcon icon={faShoppingCart} size="3x"/>
                    <h3>E-commerce & Operations</h3>
                    <p>Managing and optimizing e-commerce operations using data-driven insights. Monitoring sales performance, pricing strategies, and promotional campaigns to maximize profitability.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Skills:</span>
                        {labelsThird.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>

                <div className="skill">
                    <FontAwesomeIcon icon={faChalkboardTeacher} size="3x"/>
                    <h3>Training & Instruction</h3>
                    <p>I design and deliver comprehensive training programs in programming and data analysis. Experienced in teaching Python, SQL, Power BI, and web development to diverse audiences.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Skills:</span>
                        {labelsFourth.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Expertise;