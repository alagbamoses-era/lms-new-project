# Learning Management System (LMS)

## Overview

The Learning Management System (LMS) is a full-stack web application designed to manage online learning activities, user accounts, courses, programmes, and academic resources.

The system provides a platform where administrators can manage users, courses, programmes, and learning content, while users can access relevant educational resources based on their roles.

The project is built using a modern frontend and backend architecture:

- **Frontend:** React.js
- **Backend:** Django REST Framework (DRF)
- **Database:** PostgreSQL / SQLite
- **Authentication:** JWT Authentication
- **State Management:** Redux Toolkit
- **UI Framework:** Material UI


---

# Features

## Authentication & User Management

- Secure user login using JWT authentication
- User logout functionality
- Protected routes
- Role-based user management
- Create, edit, view, and manage user accounts
- Password encryption using Django authentication


## User Profiles

Users can have:

- Username
- Email address
- Password
- Role
- Gender
- Programme


## Course Management

Administrators can:

- Create courses
- Update courses
- View available courses
- Manage course information
- Assign courses to users


## Programme Management

The system supports:

- Creating programmes
- Managing programme details
- Linking users to programmes


## Role Management

Administrators can manage:

- User roles
- Permissions
- Access levels


## Responsive Interface

The application provides:

- Responsive navigation
- Modern dashboard layout
- Form validation
- User-friendly interface


---

# Technology Stack

## Frontend

| Technology | Purpose |
|------------|---------|
| React.js | User interface |
| React Router | Page navigation |
| Redux Toolkit | Application state management |
| Redux Persist | Persist authentication state |
| Axios | API communication |
| Formik | Form handling |
| Yup | Form validation |
| Material UI | UI components |


## Backend

| Technology | Purpose |
|------------|---------|
| Django | Backend framework |
| Django REST Framework | REST API development |
| Simple JWT | Authentication |
| PostgreSQL | Database |
| Python | Programming language |


LMS/

├── backend/
│
│ ├── core/
│ │ ├── models.py
│ │ ├── serializers.py
│ │ ├── views.py
│ │ └── urls.py
│ │
│ ├── manage.py
│ └── requirements.txt
│

├── frontend/
│
│ ├── src/
│ │
│ ├── Components/
│ │ ├── LoginForm.jsx
│ │ ├── Navbar.jsx
│ │ └── forms/
│ │
│ ├── Pages/
│ │ ├── Home.jsx
│ │ ├── Create.jsx
│ │ ├── Courses.jsx
│ │ └── ManageUsers.jsx
│ │
│ ├── store/
│ │ └── Redux configuration
│ │
│ └── App.jsx
│
└── README.md




---

# Installation Guide

## 1. Clone Repository

```bash
git clone https://github.com/yourusername/learning-management-system.git


Navigate into the project:

cd learning-management-system
Backend Setup

Navigate to backend:

cd backend

Create virtual environment:

python -m venv venv

Activate environment:

Windows
venv\Scripts\activate
Linux/Mac
source venv/bin/activate

Install dependencies:

pip install -r requirements.txt

Run migrations:

python manage.py makemigrations

python manage.py migrate

Create administrator account:

python manage.py createsuperuser

Start Django server:

python manage.py runserver

Backend will run on:

https://lms-new-project-902l.onrender.com
Frontend Setup

Open another terminal:

cd frontend

Install packages:

npm install

Start React application:

npm start

Frontend will run on:

http://localhost:3000
API Endpoints
Authentication
Method	Endpoint	Description
POST	/api/auth/login/	User login
POST	/api/auth/token/refresh/	Refresh JWT token
Users
Method	Endpoint	Description
GET	/api/users/	Get users
POST	/api/users/	Create user
PUT	/api/users/{id}/	Update user
DELETE	/api/users/{id}/	Delete user
Courses
Method	Endpoint	Description
GET	/api/courses/	View courses
POST	/api/courses/	Create course
Authentication Flow
User opens the application.
User is redirected to the login page.
User enters email and password.
Backend validates credentials.
JWT tokens are returned.
Tokens are stored using Redux Persist.
Protected pages become available.
Security Features
JWT authentication
Password hashing
Protected API endpoints
Protected frontend routes
Permission-based access control
Future Improvements

Possible future features:

Student dashboard
Teacher dashboard
Course enrolment system
Assignment submission
Online examinations
Notifications
File uploads
Progress tracking
Reports and analytics
Contributors


Developed by:
Moses Agunbiade

Learning Management System Project
License

This project is developed for educational purposes.



