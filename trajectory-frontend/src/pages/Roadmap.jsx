import { useEffect ,useState} from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import checkProfile from "../components/Checkprofile.jsx";
import axios from "axios";
import CourseCard from "../components/CourseCard.jsx";


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
            console.log(res.data);
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
                                        {stage.recommendedCourses.map((course, courseIndex) => (
                                            <li key={courseIndex}>
                                                <CourseCard course={course} />
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