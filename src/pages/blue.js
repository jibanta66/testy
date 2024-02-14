import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from "firebase/database";

function DisplayTeacherData() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const db = getDatabase();
      const teachersRef = ref(db, 'registerforteacher');

      onValue(teachersRef, (snapshot) => {
        const teachersData = snapshot.val();
        if (teachersData) {
          const teachersArray = Object.keys(teachersData).map((teacherId) => ({
            teacherId,
            ...teachersData[teacherId],
          }));
          setTeachers(teachersArray);
        }
      });
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Teacher Data</h1>
      <table>
        <thead>
          <tr>
          <th>Student id</th>
            <th>Teacher ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>On Close</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.teacherId}>
                <td>{teacher.StudentId}</td>
              <td>{teacher.TeacherId}</td>
              <td>{teacher.Name}</td>
              <td>{teacher.Location}</td>
              <td>{teacher.Contact}</td>
              <td>{teacher.Status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DisplayTeacherData;
