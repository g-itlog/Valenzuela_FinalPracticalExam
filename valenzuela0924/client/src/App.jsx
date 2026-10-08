import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [students, setStudents] = useState([]);

  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [age, setAge] = useState("");
  const [editingId, setEditingId] = useState(null);

  const addStudent = () => {
    axios.post("https://valenzuela-final-practical-exam.vercel.app/students", {
      name: name,
      course: course,
      age: age,
    })
      .then(() => {
        setName("");
        setCourse("");
        setAge("");

        axios.get("https://valenzuela-final-practical-exam.vercel.app/students")
          .then((response) => {
            setStudents(response.data);
          });
      });
  };

  const updateStudent = () => {
    axios
      .put(`https://valenzuela-final-practical-exam.vercel.app/students/${editingId}`, {
        name: name,
        course: course,
        age: age,
      })
      .then(() => {
        setName("");
        setCourse("");
        setAge("");
        setEditingId(null);

        axios.get("https://valenzuela-final-practical-exam.vercel.app/students").then((response) => {
          setStudents(response.data);
        });
      });
  };

  const deleteStudent = (id) => {
    axios.delete(`https://valenzuela-final-practical-exam.vercel.app/students/${id}`).then(() => {
      axios.get("https://valenzuela-final-practical-exam.vercel.app/students").then((response) => {
        setStudents(response.data);
      });
    });
  };

  const editStudent = (student) => {
    setName(student.name);
    setCourse(student.course);
    setAge(student.age);
    setEditingId(student._id);
  }


  useEffect(() => {

    axios
      .get("https://valenzuela-final-practical-exam.vercel.app/students")
      .then((response) => {
        setStudents(response.data);
      });

  }, []);


  return (
    <div>
      <h1>Student Management System</h1>
  
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Course"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
      />

      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <button onClick={editingId ? updateStudent : addStudent}>
        {editingId ? "Update Student" : "Add Student"}
      </button>

      <h2>Students</h2>

      {students.map((student) => (
        <div key={student._id}>
          <p>Name: {student.name}</p>
          <p>Course: {student.course}</p>
          <p>Age: {student.age}</p>

          <button onClick={() => editStudent(student)}>
            Edit
          </button>

          <button onClick={() => deleteStudent(student._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
