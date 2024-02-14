import React, { Component } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import "./student.css";
import { app } from "../fierbase/fierbase";

class Students extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentData: null,
    };
  }

  componentDidMount() {
    const studentsRef = ref(getDatabase(), "students");

    onValue(studentsRef, (snapshot) => {
      this.setState({ studentData: snapshot.val() });
    });
  }

  render() {
    const { studentData } = this.state;

    return (
      <div className="student">
        <h1 className="title">STUDENTS PAGE</h1>
        <div>
          <h2>Student Data:</h2>
          {studentData && (
            <ul>
              {Object.entries(studentData).map(([key, value]) => (
                <li key={key}>
                  <strong>{`Student ID: ${value.studentId}`}</strong>
                  <p>{`Student Name: ${value.studentName}`}</p>
                  <p>{`Parent Name: ${value.parentName}`}</p>
                  <p>{`Age: ${value.age}`}</p>
                  <p>{`Phone: ${value.phone}`}</p>
                  <p>{`Alternate Phone: ${value.alternatePhone}`}</p>
                  <p>{`Email: ${value.email}`}</p>
                  <p>{`Image: `}<img src={value.image} alt="Student" /></p>
                  <p>{`Address: ${value.address}, ${value.city}, ${value.state} - ${value.pincode}`}</p>
                  <p>{`College: ${value.college}`}</p>
                  <p>{`CGPA/Percentage: ${value.cgpaPercentage}`}</p>
                  <p>{`Class: ${value.studentClass}`}</p>
                  <p>{`Subjects: ${Object.keys(value.subjects).filter(subject => value.subjects[subject]).join(', ')}`}</p>
                  <p>{`Class Requirement: ${value.classRequirement}`}</p>
                  <p>{`Additional Note: ${value.additionalNote}`}</p>
                  {/* Add similar lines for other fields */}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default Students;
