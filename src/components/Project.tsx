import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faTimes, faPause, faPlay, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import '../assets/styles/Project.scss';





// استيراد الصور
import Iraq from '../assets/images/iraq.png';
import Iraq1 from '../assets/images/iraq1.png';

import joblance1 from '../assets/images/Joblance.png';
import joblance2 from '../assets/images/Joblance1.png';
import joblance3 from '../assets/images/Joblance2.png';
import joblance4 from '../assets/images/Joblance3.png';

import girljump1 from '../assets/images/girljumb.png';
import girljump2 from '../assets/images/girljumb1.png';

import tmirs1 from '../assets/images/tmirs.png';

import npuzzle1 from '../assets/images/npuzzle.png';

// تعريف الفيديوهات بنفس طريقة الصور
const joblancev1 = "https://www.youtube.com/embed/gU6LP4_vnvc?si=vSjRfoxHR_6-9KWR";
const girljumpv1 = "https://www.youtube.com/embed/BaBA67FM1lQ?si=bVqSf8GUaMDxfE4j";
/*const tmirsv1 = "https://youtu.be/XYZ12345678";
const npuzzlev1 = "https://youtu.be/ABC98765432";
const eshopv1 = "https://youtu.be/DEF45678901";
const dataprojectsv1 = "https://youtu.be/GHI23456789";
*/


interface ProjectType {
    id: number;
    title: string;
    description: string;
    images: string[];
    videos?: string[]; 
    technologies: string[];
    details: string;
    projectLink?: string; 
    githubLink?: string; 
}

// نوع للوسائط (صور أو فيديوهات)
type MediaItem = {
    type: 'image' | 'video';
    url: string;
};

function Project() {
    const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
    const [currentMediaIndex, setCurrentMediaIndex] = useState<number>(0);
    const [autoPlayEnabled, setAutoPlayEnabled] = useState<boolean>(true);
    const [gridMediaIndices, setGridMediaIndices] = useState<{ [key: number]: number }>({});
    
    const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

    const projects: ProjectType[] = [
        {
            id: 1,
            title: "Iraq Business Intelligence & Market Analysis",
            description: "This project delivers a comprehensive data analysis of over 400,000 business reviews and ratings across Iraq, transforming raw business data into strategic market insights.",
            images: [Iraq1, Iraq],
            technologies: ["Python", "Django", "SQL Server 2022", "Machine Learning", "scraping", "Power BI"],
            details: "I led a comprehensive business intelligence project analyzing over 400,000 Iraqi business reviews and ratings to provide actionable insights for entrepreneurs, investors, and policymakers. The project involved data collection by scraping business information from Google Maps, followed by data cleaning and integration of 20+ Excel datasets into a centralized SQL Server database. Using Python and SQL, I performed advanced analysis to uncover market trends, sector performance, competitive landscapes, and customer satisfaction across 15+ governorates and 20+ business sectors. Insights were visualized through interactive dashboards in Power BI and Dash, highlighting geographic hotspots, underserved sectors, digital gaps, and high-growth opportunities. Additionally, a detailed Data Story report summarized findings and offered data-driven recommendations for market entry strategies, investment decisions, and operational improvements, effectively transforming raw business data into strategic intelligence for stakeholders.",
            projectLink: "https://egyptianemperors.pythonanywhere.com/", 
            githubLink: "https://github.com/Ahmed-Sharaf-Mohammed/Iraq-google-maps-scraping-2024"
        },

        {
            id: 2,
            title: "Job Lance - Career Platform",
            description: "An innovative career development platform with diverse job listings and user-friendly interface. Built as graduation project with Excellent grade (97/100).",
            images: [joblance1, joblance2, joblance3, joblance4],
            videos: [joblancev1],
            technologies: ["Python", "Django", "Data Analysis", "Machine Learning"],
            details: "Job Lance is a comprehensive career platform that connects job seekers with employers. Features include intelligent job matching, resume builder, and a dedicated section for skilled craftsmen.",
            //projectLink: "https://joblance.example.com", 
            githubLink: "https://github.com/Ahmed-Sharaf-Mohammed/Joblance"
        },
        {
            id: 3,
            title: "Girl Jump - 3D Game",
            description: "A Unity-based 3D game with female protagonist navigating dynamic environments. Developed with C# and Unity game engine.",
            images: [girljump1, girljump2],
            videos: [girljumpv1],
            technologies: ["C#", "Unity", "3D Game Development"],
            details: "An immersive 3D platformer game featuring a female protagonist. The game includes challenging levels, dynamic obstacles, and smooth character controls.",
            githubLink: "https://github.com/Ahmed-Sharaf-Mohammed/Girl-jump_Unity-3D-Game"

        },
        {
            id: 4,
            title: "TMIRS - Text Mining Toolkit",
            description: "Python-based system for processing textual data, performing tasks like tokenization and computing TF-IDF for information retrieval.",
            images: [tmirs1],
            videos: [],
            technologies: ["Python", "NLP", "Text Mining", "TF-IDF"],
            details: "A comprehensive text mining and information retrieval system that processes large volumes of text data. Implements advanced NLP techniques for text analysis and similarity computation.",
            githubLink: "https://github.com/Ahmed-Sharaf-Mohammed/Text-Mining-and-Information-Retrieval-System"
        },
        {
            id: 5,
            title: "N-Puzzle Solver",
            description: "Python program for solving n-puzzle problems using Manhattan distance heuristic and advanced algorithms.",
            images: [npuzzle1],
            videos: [],
            technologies: ["Python", "Algorithms", "AI", "Problem Solving"],
            details: "An intelligent puzzle solver that uses heuristic search algorithms to find optimal solutions for n-puzzle problems. Implements A* search with Manhattan distance.",
            githubLink: "https://github.com/Ahmed-Sharaf-Mohammed/N-Puzzel_Manhattan-Distances"

        },
        {
            id: 6,
            title: "E-Shop - Online Store",
            description: "Online clothing store built with PHP, featuring seamless shopping experience with shopping cart functionality.",
            images: [npuzzle1],
            videos: [],
            technologies: ["PHP", "HTML/CSS", "JavaScript", "MySQL"],
            details: "A fully functional e-commerce website for clothing retail. Includes user authentication, product catalog, shopping cart, and order management system.",
            githubLink: "https://github.com/Ahmed-Sharaf-Mohammed/PHP_Eshop"
        },
        {
            id: 7,
            title: "Data Analysis Projects",
            description: "Collection of data analysis projects using Power BI, Alteryx, SSIS, and MS Project for data transformation, visualization, and modeling.",
            images: [npuzzle1],
            videos: [],
            technologies: ["Power BI", "Alteryx", "SSIS", "Data Visualization"],
            details: "Multiple data analysis projects focusing on different domains including finance, e-commerce, and education. Transforms raw data into actionable insights through advanced visualization techniques.",
            githubLink: "https://github.com/Ahmed-Sharaf-Mohammed/data-projects"
        }
    ];

    // دالة لدمج الصور والفيديوهات في مصفوفة واحدة
    const getProjectMedia = (project: ProjectType): MediaItem[] => {
        const media: MediaItem[] = [];
        
        // إضافة الصور أولاً
        project.images.forEach(image => {
            media.push({ type: 'image', url: image });
        });
        
        // إضافة الفيديوهات إذا وجدت
        project.videos?.forEach(video => {
            media.push({ type: 'video', url: video });
        });
        
        return media;
    };

    // Auto-play for grid media - FIXED VERSION
    useEffect(() => {
        // تنظيف أي interval قديم
        if (autoPlayRef.current) {
            clearInterval(autoPlayRef.current);
        }

        if (autoPlayEnabled) {
            autoPlayRef.current = setInterval(() => {
                setGridMediaIndices(prev => {
                    const newIndices = { ...prev };
                    
                    // تحديث كل مشروع له أكثر من وسائط
                    projects.forEach(project => {
                        const projectMedia = getProjectMedia(project);
                        if (projectMedia.length > 1) {
                            const currentIndex = prev[project.id] || 0;
                            newIndices[project.id] = (currentIndex + 1) % projectMedia.length;
                        }
                    });
                    
                    return newIndices;
                });
            }, 3000); // تغيير الوسائط كل 3 ثواني
        }

        return () => {
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current);
            }
        };
    }, [autoPlayEnabled]);

    // تهيئة الحالة الأولية
    useEffect(() => {
        const initialIndices: { [key: number]: number } = {};
        projects.forEach(project => {
            initialIndices[project.id] = 0;
        });
        setGridMediaIndices(initialIndices);
    }, []);

    const toggleAutoPlay = (): void => {
        setAutoPlayEnabled(!autoPlayEnabled);
    };

    const openModal = (project: ProjectType): void => {
        setSelectedProject(project);
        setCurrentMediaIndex(0);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = (): void => {
        setSelectedProject(null);
        setCurrentMediaIndex(0);
        document.body.style.overflow = 'auto';
    };

    const nextMedia = (): void => {
        if (selectedProject) {
            const projectMedia = getProjectMedia(selectedProject);
            setCurrentMediaIndex((prevIndex: number) => 
                (prevIndex + 1) % projectMedia.length
            );
        }
    };

    const prevMedia = (): void => {
        if (selectedProject) {
            const projectMedia = getProjectMedia(selectedProject);
            setCurrentMediaIndex((prevIndex: number) => 
                prevIndex === 0 ? projectMedia.length - 1 : prevIndex - 1
            );
        }
    };

    const goToMedia = (index: number): void => {
        setCurrentMediaIndex(index);
    };

    const nextGridMedia = (projectId: number, event: React.MouseEvent): void => {
        event.stopPropagation();
        const project = projects.find(p => p.id === projectId);
        if (project) {
            const projectMedia = getProjectMedia(project);
            setGridMediaIndices(prev => ({
                ...prev,
                [projectId]: ((prev[projectId] || 0) + 1) % projectMedia.length
            }));
        }
    };

    const prevGridMedia = (projectId: number, event: React.MouseEvent): void => {
        event.stopPropagation();
        const project = projects.find(p => p.id === projectId);
        if (project) {
            const projectMedia = getProjectMedia(project);
            setGridMediaIndices(prev => ({
                ...prev,
                [projectId]: prev[projectId] === 0 ? projectMedia.length - 1 : (prev[projectId] || 0) - 1
            }));
        }
    };

    // دالة لعرض الوسائط في الـ Grid
    const renderGridMedia = (project: ProjectType, currentIndex: number) => {
        const projectMedia = getProjectMedia(project);
        const currentMedia = projectMedia[currentIndex];

        if (currentMedia.type === 'video') {
            return (
                <div className="video-container">
                    <div className="video-thumbnail">
                        <div className="play-icon">
                            <FontAwesomeIcon icon={faPlay} size="2x" />
                        </div>
                        <img 
                            src={`https://img.youtube.com/vi/${getYouTubeId(currentMedia.url)}/hqdefault.jpg`}
                            alt={`${project.title} video thumbnail`}
                            className="zoom"
                        />
                        <div className="video-badge">Video</div>
                    </div>
                </div>
            );
        }

        return (
            <img 
                src={currentMedia.url} 
                className="zoom" 
                alt={project.title} 
                width="100%"
            />
        );
    };

    // دالة لعرض الوسائط في الـ Modal
    const renderModalMedia = (project: ProjectType, currentIndex: number) => {
        const projectMedia = getProjectMedia(project);
        const currentMedia = projectMedia[currentIndex];

        if (currentMedia.type === 'video') {
            return (
                <div className="video-container">
                    <iframe
                        src={currentMedia.url}
                        title={`${project.title} video`}
                        className="carousel-video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            );
        }

        return (
            <img 
                src={currentMedia.url} 
                alt={`${project.title} - ${currentIndex + 1}`}
                className="carousel-image"
            />
        );
    };

    // دالة لاستخراج ID من رابط اليوتيوب
    const getYouTubeId = (url: string): string => {
        const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
        return match ? match[1] : '';
    };

    // دالة لفتح رابط المشروع في نافذة جديدة
    const openProjectLink = (url: string, event: React.MouseEvent) => {
        event.stopPropagation();
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="projects-container" id="projects">
            <div className="projects-header">
                <h1>Personal Projects</h1>
                {/*<button className="autoplay-toggle" onClick={toggleAutoPlay}>
                    <FontAwesomeIcon icon={autoPlayEnabled ? faPause : faPlay} />
                    <span>{autoPlayEnabled ? 'إيقاف التشغيل التلقائي' : 'تشغيل التلقائي'}</span>
                </button>*/}
            </div>
            
            <div className="projects-grid">
                {projects.map((project: ProjectType) => {
                    const currentIndex = gridMediaIndices[project.id] || 0;
                    const projectMedia = getProjectMedia(project);
                    
                    return (
                        <div key={project.id} className="project" onClick={() => openModal(project)}>
                            <div className="project-image-container">
                                {renderGridMedia(project, currentIndex)}
                                
                                {/* رابط المشروع على الصورة */}
                                {(project.projectLink || project.githubLink) && (
                                    <div className="project-links-overlay">
                                        {project.projectLink && (
                                            <button 
                                                className="project-link-icon"
                                                onClick={(e) => openProjectLink(project.projectLink!, e)}
                                                title="Visit Project"
                                            >
                                                <FontAwesomeIcon icon={faExternalLinkAlt} />
                                            </button>
                                        )}
                                        {project.githubLink && (
                                            <button 
                                                className="github-link-icon"
                                                onClick={(e) => openProjectLink(project.githubLink!, e)}
                                                title="View on GitHub"
                                            >
                                                <FontAwesomeIcon icon={faGithub} />
                                            </button>
                                        )}
                                    </div>
                                )}

                                {projectMedia.length > 1 && (
                                    <>
                                        <div className="image-counter">
                                            <span>{currentIndex + 1} / {projectMedia.length}</span>
                                        </div>
                                        
                                        <div className="grid-carousel-controls">
                                            <button 
                                                className="grid-carousel-btn prev" 
                                                onClick={(e) => prevGridMedia(project.id, e)}
                                            >
                                                <FontAwesomeIcon icon={faChevronLeft} />
                                            </button>
                                            <button 
                                                className="grid-carousel-btn next" 
                                                onClick={(e) => nextGridMedia(project.id, e)}
                                            >
                                                <FontAwesomeIcon icon={faChevronRight} />
                                            </button>
                                        </div>

                                        <div className="grid-carousel-indicators">
                                            {projectMedia.map((media, index: number) => (
                                                <button
                                                    key={index}
                                                    className={`grid-indicator ${index === currentIndex ? 'active' : ''} ${media.type === 'video' ? 'video-indicator' : ''}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setGridMediaIndices(prev => ({
                                                            ...prev,
                                                            [project.id]: index
                                                        }));
                                                    }}
                                                    title={media.type === 'video' ? 'Video' : 'Image'}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                            <h2>{project.title}</h2>
                            <p>{project.description}</p>
                            <div className="tech-tags">
                                {project.technologies.map((tech: string, index: number) => (
                                    <span key={index} className="tech-tag">{tech}</span>
                                ))}

                                {/* أيقونات الروابط في تاج */}
                                {project.projectLink && (
                                    <span 
                                        className="tech-tag link-tag"
                                        onClick={(e) => openProjectLink(project.projectLink!, e)}
                                    >
                                        <FontAwesomeIcon icon={faExternalLinkAlt} /> Visit Site
                                    </span>
                                )}
                                {project.githubLink && (
                                    <span 
                                        className="tech-tag github-tag"
                                        onClick={(e) => openProjectLink(project.githubLink!, e)}
                                    >
                                        <FontAwesomeIcon icon={faGithub} /> GitHub
                                    </span>
                                )}

                            </div>
                        </div>
                    );
                })}
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
                                {renderModalMedia(selectedProject, currentMediaIndex)}
                                
                                {getProjectMedia(selectedProject).length > 1 && (
                                    <>
                                        <button className="carousel-btn prev" onClick={prevMedia}>
                                            <FontAwesomeIcon icon={faChevronLeft} />
                                        </button>
                                        <button className="carousel-btn next" onClick={nextMedia}>
                                            <FontAwesomeIcon icon={faChevronRight} />
                                        </button>
                                        
                                        <div className="carousel-indicators">
                                            {getProjectMedia(selectedProject).map((media, index: number) => (
                                                <button
                                                    key={index}
                                                    className={`indicator ${index === currentMediaIndex ? 'active' : ''} ${media.type === 'video' ? 'video-indicator' : ''}`}
                                                    onClick={() => goToMedia(index)}
                                                    title={media.type === 'video' ? 'Video' : 'Image'}
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
                            {/* أزرار الروابط في المودال */}
                            <div className="modal-project-links">
                                {selectedProject.projectLink && (
                                    <a 
                                        href={selectedProject.projectLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="project-link-btn"
                                    >
                                        <FontAwesomeIcon icon={faExternalLinkAlt} /> Visit Project
                                    </a>
                                )}
                                {selectedProject.githubLink && (
                                    <a 
                                        href={selectedProject.githubLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="github-link-btn"
                                    >
                                        <FontAwesomeIcon icon={faGithub} /> View on GitHub
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Project;