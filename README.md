# Primetrade AI Assignment

A scalable REST API with Role-Based Access Control and a simple React front-end dashboard.

## Overview

### Backend Features
- FastAPI & Python
- PostgreSQL via Docker Local instance
- Role-Based Access Control (Admin vs User)
- JWT Authentication and Password Hashing
- Scalable structured layout (`core`, `api`, `crud`, `db`, `schemas`)

### Frontend Features
- React.js with Vite
- Login, Register, and Dashboard routing
- LocalStorage based token persistence
- Task CRUD Interface

### Scalability Note
This project architecture establishes a sound foundation for enterprise scale:
- **Microservices Ready:** The backend is modularly decoupled from the frontend. We can easily extract entities (like Tasks) into their own decoupled service.
- **Docker Environments:** Using docker-compose ensures the infrastructure remains perfectly mirrored across all environments.
- **Caching & Load Balancing:** As traffic increases, the application is stateless because of JWTs. This makes adding a load balancer (like NGINX/HAProxy) seamless. In-memory data caching could naturally be added via Redis or Memcached within the `crud` layer without disturbing API logic. 

## Getting Started

### 1. Database (Docker)
```bash
docker compose up -d
```

### 2. Backend API
```bash
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```
View Interactive Postman alternative (Swagger API docs) at: `http://localhost:8000/docs`

### 3. Frontend App
```bash
cd frontend
npm install
npm run dev
```
Navigate to: `http://localhost:5173`
