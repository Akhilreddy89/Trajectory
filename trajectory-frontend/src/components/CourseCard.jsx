import '../style/CourseCard.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function CourseCard({ course }) {
  const navigate = useNavigate();
  const saveCourse=async()=>{
    try {
      await axios.post(
        `http://localhost:5000/api/save-course/${course._id}`,
        { courseId: course._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Course saved successfully!");
    }
    catch (err) {
      console.error(err);
      alert("Failed to save course");
    }
  }
  const handleClick = () => {
    saveCourse();
  }
  

  return (
    //how to handle when user clicks on the course card to navigate to the course details page
    <div className="course-card" onClick={() => navigate(`/course/${course._id}`)}>
      <h4 className="course-title">{course.title}</h4>

      <p className="course-source">{course.source}</p>
      {/* <p className="course-description">{course.description}</p> */}
      <p>{(course.skills || []).join(", ")}</p>
      <p className="course-category">{course.category}</p>
      <p>{course.url && (
        <a href={course.url} target="_blank" rel="noopener noreferrer">
          Go to Course
        </a>
      )}</p>

      <br />
      <button onClick={handleClick}>Save</button>
    </div>
  );
}

export default CourseCard;