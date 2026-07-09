import React from 'react'
import '../css/Courses.css'

function Courses() {
  return (
    <div className='courses-container'>
      <h1>Courses</h1>  
      <ul className='courses-list'>
        <li>Project Management</li>
        <li>Web Development</li>
        <li>Data Science</li>
        <li>Machine Learning</li>
        <li>Cloud Computing</li>
      </ul>
    </div>
  )
}

export default Courses
