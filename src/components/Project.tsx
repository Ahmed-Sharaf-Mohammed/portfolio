import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

// استيراد الصور - هتحتاج تضيف الصور الفعلية بتاعتك
import joblance1 from '../assets/images/mock03.png';
import joblance2 from '../assets/images/mock03.png';
import joblance3 from '../assets/images/mock03.png';

import girljump1 from '../assets/images/mock03.png';
import girljump2 from '../assets/images/mock03.png';

import tmirs1 from '../assets/images/mock03.png';
import tmirs2 from '../assets/images/mock03.png';

import npuzzle1 from '../assets/images/mock03.png';
import eshop1 from '../assets/images/mock03.png';
import dataprojects1 from '../assets/images/mock03.png';
import '../assets/styles/Project.scss';

// تعريف الـ Interface للمشروع
interface ProjectType {
    id: number;
    title: string;
    description: string;
    images: string[];
    technologies: string[];
    details: string;
}


function Project() {
    const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

    const projects: ProjectType[] = [
        {
            id: 1,
            title: "Job Lance - Career Platform",
            description: "An innovative career development platform with diverse job listings and user-friendly interface. Built as graduation project with Excellent grade (97/100).",
            images: [joblance1, joblance2, joblance3],
            technologies: ["Python", "Django", "Data Analysis", "Machine Learning"],
            details: "Job Lance is a comprehensive career platform that connects job seekers with employers. Features include intelligent job matching, resume builder, and a dedicated section for skilled craftsmen."
        },
        {
            id: 2,
            title: "Girl Jump - 3D Game",
            description: "A Unity-based 3D game with female protagonist navigating dynamic environments. Developed with C# and Unity game engine.",
            images: [girljump1, girljump2],
            technologies: ["C#", "Unity", "3D Game Development"],
            details: "An immersive 3D platformer game featuring a female protagonist. The game includes challenging levels, dynamic obstacles, and smooth character controls."
        },
        {
            id: 3,
            title: "TMIRS - Text Mining Toolkit",
            description: "Python-based system for processing textual data, performing tasks like tokenization and computing TF-IDF for information retrieval.",
            images: [tmirs1, tmirs2],
            technologies: ["Python", "NLP", "Text Mining", "TF-IDF"],
            details: "A comprehensive text mining and information retrieval system that processes large volumes of text data. Implements advanced NLP techniques for text analysis and similarity computation."
        },
        {
            id: 4,
            title: "N-Puzzle Solver",
            description: "Python program for solving n-puzzle problems using Manhattan distance heuristic and advanced algorithms.",
            images: [npuzzle1],
            technologies: ["Python", "Algorithms", "AI", "Problem Solving"],
            details: "An intelligent puzzle solver that uses heuristic search algorithms to find optimal solutions for n-puzzle problems. Implements A* search with Manhattan distance."
        },
        {
            id: 5,
            title: "E-Shop - Online Store",
            description: "Online clothing store built with PHP, featuring seamless shopping experience with shopping cart functionality.",
            images: [eshop1],
            technologies: ["PHP", "HTML/CSS", "JavaScript", "MySQL"],
            details: "A fully functional e-commerce website for clothing retail. Includes user authentication, product catalog, shopping cart, and order management system."
        },
        {
            id: 6,
            title: "Data Analysis Projects",
            description: "Collection of data analysis projects using Power BI, Alteryx, SSIS, and MS Project for data transformation, visualization, and modeling.",
            images: [dataprojects1],
            technologies: ["Power BI", "Alteryx", "SSIS", "Data Visualization"],
            details: "Multiple data analysis projects focusing on different domains including finance, e-commerce, and education. Transforms raw data into actionable insights through advanced visualization techniques."
        }
    ];

    const openModal = (project: ProjectType): void => {
        setSelectedProject(project);
        setCurrentImageIndex(0);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = (): void => {
        setSelectedProject(null);
        setCurrentImageIndex(0);
        document.body.style.overflow = 'auto';
    };

    const nextImage = (): void => {
        if (selectedProject) {
            setCurrentImageIndex((prevIndex: number) => 
                (prevIndex + 1) % selectedProject.images.length
            );
        }
    };

    const prevImage = (): void => {
        if (selectedProject) {
            setCurrentImageIndex((prevIndex: number) => 
                prevIndex === 0 ? selectedProject.images.length - 1 : prevIndex - 1
            );
        }
    };

    const goToImage = (index: number): void => {
        setCurrentImageIndex(index);
    };

    return (
        <div className="projects-container" id="projects">
            <h1>Personal Projects</h1>
            <div className="projects-grid">
                {projects.map((project: ProjectType) => (
                    <div key={project.id} className="project" onClick={() => openModal(project)}>
                        <div className="project-image-container">
                            <img 
                                src={project.images[0]} 
                                className="zoom" 
                                alt={project.title} 
                                width="100%"
                            />
                            {project.images.length > 1 && (
                                <div className="image-counter">
                                    <span>{project.images.length} صور</span>
                                </div>
                            )}
                        </div>
                        <h2>{project.title}</h2>
                        <p>{project.description}</p>
                        <div className="tech-tags">
                            {project.technologies.map((tech: string, index: number) => (
                                <span key={index} className="tech-tag">{tech}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {selectedProject && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={closeModal}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                        
                        <div className="modal-carousel">
                            <div className="carousel-container">
                                <img 
                                    src={selectedProject.images[currentImageIndex]} 
                                    alt={`${selectedProject.title} - ${currentImageIndex + 1}`}
                                    className="carousel-image"
                                />
                                
                                {selectedProject.images.length > 1 && (
                                    <>
                                        <button className="carousel-btn prev" onClick={prevImage}>
                                            <FontAwesomeIcon icon={faChevronLeft} />
                                        </button>
                                        <button className="carousel-btn next" onClick={nextImage}>
                                            <FontAwesomeIcon icon={faChevronRight} />
                                        </button>
                                        
                                        <div className="carousel-indicators">
                                            {selectedProject.images.map((_: string, index: number) => (
                                                <button
                                                    key={index}
                                                    className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                                                    onClick={() => goToImage(index)}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="modal-details">
                            <h2>{selectedProject.title}</h2>
                            <p className="project-details">{selectedProject.details}</p>
                            <div className="modal-tech-tags">
                                {selectedProject.technologies.map((tech: string, index: number) => (
                                    <span key={index} className="tech-tag">{tech}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Project;