import '../style/CourseCard.css';
import axios from 'axios';
function CourseCard({ course }) {
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
    // console.log("Saving course with ID:", course._id);
    saveCourse();
  }

  return (
    <div className="course-card">
      <h4 className="course-title">{course.title}</h4>

      <p className="course-source">{course.source}</p>
      <p className="course-description">{course.description}</p>
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