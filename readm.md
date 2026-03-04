# AI Interview Preparation Platform

A full-stack intelligent web application that helps candidates prepare for job interviews. By analyzing a candidate's resume, a target job description, and a brief self-description, the platform uses Google's Generative AI to create a highly customized preparation strategy. 

## ✨ Key Features
- **AI-Powered Analysis**: Generates expected technical and behavioral questions tailored entirely to the target role.
- **Skill Gap Detection**: Automatically detects missing skills by comparing your resume against the job description.
- **Preparation Roadmap**: Provides a day-by-day structured timeline to ensure you cover all bases before the interview.
- **Resume Export**: Redesigns and exports your resume into a stunning, ATS-friendly, single-page PDF format.
- **Modern UI**: Features a premium glassmorphic Dashboard, animated loading states, and a highly responsive Landing page.
- **Secure Authentication**: Complete flow with Registration, Login, and Logout protected by JWT and bcrypt hashing.

---

## 🏗️ Architecture & Tech Stack

This project is divided into an isolated **Frontend** and **Backend**.

### Frontend (Client)
- **Framework**: React 19 powered by Vite.
- **Routing**: React Router v7 (`/`, `/login`, `/register`, `/dashboard`, `/interview/:interviewId`).
- **Styling**: SCSS (Sass) for customized, scoped component styling.
- **State & Data Fetching**: React Context API & Axios.

### Backend (Server)
- **Framework**: Node.js with Express.js.
- **Database**: MongoDB (via Mongoose) to securely store users, auth blacklists, and generated interview reports.
- **AI Integration**: `@google/genai` (Google Gemini 2.5 Flash) to process complex text and return structured JSON reports.
- **File Parsing**: `multer` and `pdf-parse` for extracting raw text directly from PDF uploads.
- **Authentication**: JWT (`jsonwebtoken`) and `bcryptjs`.
- **PDF Generation**: `puppeteer` to automate and print HTML into beautifully formatted PDFs without margins.

---

## 🚀 How It Works (The Core Flow)

1. **Onboarding:** A user visits the landing page (`/`), registers, and logs into the application. 
2. **Data Input:** The user navigates to the `/dashboard` and uploads their Resume (PDF). They also provide the specific target Job Description.
3. **Data Parsing:** The Express backend receives the request. `multer` processes the file in memory, and `pdf-parse` extracts the raw text.
4. **AI Generation:** The backend passes the extracted resume text and job description to the Google Gemini API using a strict system prompt.
5. **Insights Creation:** The AI model analyzes the inputs and returns structured JSON data containing:
    - Expected Technical & Behavioral Questions
    - Identified Skill Gaps (with severity levels)
    - A custom Day-by-Day Preparation Plan
6. **Review & Preparation:** The output is saved in MongoDB and displayed on the frontend via a dedicated immersive page (`/interview/:id`).
7. **Resume Formatting:** Users can click "Download Resume" to trigger an automated Puppeteer service that uses AI to rewrite, format, and export their resume as a stunning single-page A4 PDF.

---

## 🛠️ Local Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas URI)
- Google Gemini API Key

### 1. Backend Setup
```bash
cd Backend
npm install

# Create environment variables based on .env.example
cp .env.example .env

# Set up your .env file with actual values:
# PORT=3000
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret_key
# GOOGLE_GENAI_API_KEY=your_gemini_api_key

# Run the development server
npm run dev
```

### 2. Frontend Setup
```bash
cd Frontend
npm install

# Create environment variables based on .env.example
cp .env.example .env

# Verify your VITE_API_BASE_URL points to the backend:
# VITE_API_BASE_URL="http://localhost:3000"

# Run the development server
npm run dev
```

Your app will now be running concurrently! Visit `http://localhost:5173` (or your Vite port) to view the application.
