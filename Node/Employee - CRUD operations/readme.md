# Employee Management API (Node.js + Express + MongoDB)

## Setup
 - Clone the repository
 - Run npm install
 - Connect to MongoDB (update the URI in index.js)
 - Start the server:nodemon index.js or node index.js
 - Server runs at http://localhost:3000/

## Project Structure
- index.js → Main entry file
- models/employee.model.js → Employee schema
- controller/employee.controller.js → Functions (Create, Read, Update, Delete)
- routes/employee.routes.js → API routes

## API Endpoints
- POST /employee/ → Create a new employee
- GET /employee/ → Get all employees
- GET /employee/:id → Get employee by ID
- PUT /employee/:id → Update employee by ID
- DELETE /employee/:id → Delete employee by ID