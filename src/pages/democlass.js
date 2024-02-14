import React, { Component } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import Popup from "./pop"; // Import the Popup component
import "./teacher.css";
// Import statements remain the same

class democls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teacherData: null,
      selectedTeacher: null,
      displayDetails: false,
      selectedTeacherForPopup: null, // Track the selected teacher for popup
    };
  }

  componentDidMount() {
    const teachersRef = ref(getDatabase(), "teachers");

    onValue(teachersRef, (snapshot) => {
      this.setState({ teacherData: snapshot.val() });
    });
  }

  handleRowClick = (teacherId) => {
    this.setState({ selectedTeacher: teacherId, displayDetails: true });
  };

  handleRegisterClick = (teacherId) => {
    this.setState({ selectedTeacherForPopup: teacherId });
  };

  closePopup = () => {
    this.setState({ selectedTeacherForPopup: null });
  };

  render() {
    const { teacherData, selectedTeacher, displayDetails, selectedTeacherForPopup } = this.state;

    return (
      <div className="greens">
        <h1 className="title">TEACHERS PAGE</h1>
        <div>
          <h2>Teacher Data:</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Teacher ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teacherData &&
                Object.entries(teacherData).map(([key, value]) => (
                  <tr key={key} onClick={() => this.handleRowClick(key)}>
                    <td>{value.teacherName}</td>
                    <td>{value.address}</td>
                    <td>{value.phone}</td>
                    <td>{value.teacherId}</td>
                    <td>
                      <button onClick={(e) => {
                        e.stopPropagation();
                        this.handleRegisterClick(key);
                      }}>Register</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {displayDetails && selectedTeacher && teacherData && teacherData[selectedTeacher] && (
            <div>
              <h3>{teacherData[selectedTeacher].teacherName}</h3>
              <p>
                <strong>Teacher ID:</strong> {teacherData[selectedTeacher].teacherId}
              </p>
              {/* Render other details */}
            </div>
          )}
          {selectedTeacherForPopup && teacherData && teacherData[selectedTeacherForPopup] && (
            <Popup
              teacherName={teacherData[selectedTeacherForPopup].teacherName}
              address={teacherData[selectedTeacherForPopup].address}
              phone={teacherData[selectedTeacherForPopup].phone}
              teacherId={teacherData[selectedTeacherForPopup].teacherId}
              onClose={this.closePopup}
            />
          )}
        </div>
      </div>
    );
  }
}

export default democls;
