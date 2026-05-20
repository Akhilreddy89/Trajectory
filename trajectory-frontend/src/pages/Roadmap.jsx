import { useEffect ,useState} from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import checkProfile from "../components/Checkprofile.jsx";
import axios from "axios";

function Roadmap() {
    const navigate = useNavigate();
    const [roadmap, setRoadmap] = useState(null);
    const fetchRoadmap = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/roadmap/me", {
                headers: {
                     Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setRoadmap(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchRoadmap();
    }, []);
    return (
        <>
            <Navbar />
{/* {_id: '6a0d7c6ae39dd62db7354dc5', role: 'Frontend Developer', category: 'Frontend', level: 'Beginner', description: 'Frontend roadmap for beginners', …}
category
: 
"Frontend"
createdAt
: 
"2026-05-20T09:18:34.891Z"
description
: 
"Frontend roadmap for beginners"
estimatedDuration
: 
"4 Months"
level
: 
"Beginner"
roadmapImage
: 
""
role
: 
"Frontend Developer"
skillsRequired
: 
(3) ['HTML', 'CSS', 'JavaScript']
stages
: 
[{…}]
updatedAt
: 
"2026-05-20T09:18:34.891Z"
__v
: 
0
_id
: 
"6a0d7c6ae39dd62db7354dc5"
[[Prototype]]
: 
Object */}
            <div className="roadmap">
                <h1>Your Roadmap</h1>
                <p>This is where your personalized roadmap will be displayed.</p>
                {roadmap && (
                    <div>
                        <h2>{roadmap.role}</h2>
                        <p>{roadmap.description}</p>
                        <p>Category: {roadmap.category}</p>
                        <p>Level: {roadmap.level}</p>
                        <p>Estimated Duration: {roadmap.estimatedDuration} </p>
                        <p>Skills Required: {roadmap.skillsRequired.join(", ")}</p>
                        <p>Stages:</p>
                        <ul>
                            {roadmap.stages.map((stage, index) => (
                                <li key={index}>
                                    <h3>{stage.title}</h3>
                                    <p>{stage.description}</p>
                                    <p>Skills: {stage.skills.join(", ")}</p>
                                    <p>Projects: {stage.projects.join(", ")}</p>
                                    <p>Estimated Time: {stage.estimatedTime}</p>
                                    <p>Courses:</p>
                                    <ul>
                                        {stage.courses.map((course, courseIndex) => (
                                            <li key={courseIndex}>
                                                <h4>{course.title}</h4>
                                                <p>{course.description}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
}
export default Roadmap;