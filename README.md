Primetrade AI Assignment

A REST API with Role-Based Access Control and a minimal React front-end dashboard.

Project Structure

- backend/: Contains the FastAPI application.
  - app/api/: Route controllers and endpoints.
  - app/core/: Security and configuration settings.
  - app/crud/: Database operations layer.
  - app/db/: Models and database connection.
  - app/schemas/: Pydantic validation models.
- frontend/: Contains the React application created with Vite.
  - src/components/: React UI components.
  - src/api/: API clients mapped to the backend.
  - src/index.css: Main styling file.

Requirements
- Python 3.9 or higher
- Node.js 18 or higher
- Docker and Docker Compose

Setup Instructions

1. Database Configuration
The project uses PostgreSQL instantiated via Docker.
To start the database:
> docker compose up -d

2. Backend Setup
Navigate to the backend directory:
> cd backend

Create and activate a virtual environment:
> python -m venv venv
> .\venv\Scripts\activate

Install dependencies:
> pip install -r requirements.txt

The backend uses a .env file to manage configurations. A default .env has been generated for you with standard database credentials.

Start the backend:
> uvicorn app.main:app --reload

The API will run at http://localhost:8000
API Documentation is available at http://localhost:8000/docs

3. Frontend Setup
Navigate to the frontend directory:
> cd frontend

Install packages:
> npm install

The frontend uses a .env file to manage the API url. A default .env has been generated.

Start the frontend:
> npm run dev

The site will run at http://localhost:5173

## API Documentation

- Postman Collection:
The Postman collection for testing all APIs is included in this repository.

File: `Primetrade_Postman_Collection.json`

You can import this file into Postman to test all endpoints easily.

## Scalability Note

This application is designed with scalability in mind.

1. Microservices Architecture:
The system can be divided into independent services such as authentication, task management, and analytics.

2. Caching (Redis):
Frequently accessed data can be cached to reduce database load.

3. Load Balancing:
A load balancer can distribute traffic across multiple servers.

4. Database Scaling:
PostgreSQL can be scaled using indexing and read replicas.

5. Containerization:
Docker enables horizontal scaling.

6. Asynchronous Processing:
Background tasks can be handled using queues like Celery.

Built for the Primetrade AI Assignment.
