# Student Management System (Spring Boot + React + MySQL)

## Run
1. MySQL running locally (user `root`, password `root`, edit `backend/src/main/resources/application.properties` if different). DB `student_db` is auto-created.
2. Backend:  `cd backend && mvn spring-boot:run`   (http://localhost:8080)
3. Frontend: `cd frontend && npm install && npm run dev`   (http://localhost:5173)

## Logins
- Admin (auto-created): `admin` / `admin123`
- Teacher: create via `POST /api/users` (Postman, with admin token) body: `{"username":"t1","password":"t123","role":"TEACHER"}`
- Student: created automatically when admin adds a student. Username = email, password = roll no.

## API summary
POST /api/auth/login
GET/POST/PUT/DELETE /api/students, GET /api/students/me, GET /api/students?q=
GET/POST/PUT/DELETE /api/departments, /api/courses
GET /api/attendance/student/{id}, POST/PUT/DELETE /api/attendance
GET /api/marks/student/{id}, POST/PUT/DELETE /api/marks
POST /api/users (admin only)
