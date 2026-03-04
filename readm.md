# AI Interview Preparation Platform

This project is a full-stack web application designed to help users prepare for job interviews. By analyzing a user's resume, job description, and self-description, the application leverages Google's Generative AI to create customized interview preparation reports, including technical and behavioral questions, skill gap analysis, and tailored preparation plans.

## 🏗️ Architecture & Tech Stack

This project is divided into two parts: a **Frontend** client and a **Backend** server.

### Frontend
- **Framework**: React 19 powered by Vite.
- **Routing**: React Router v7 (`/login`, `/register`, `/`, `/interview/:interviewId`).
- **Styling**: SCSS (Sass) for customized component styling.
- **Data Fetching**: Axios for API communication.
- **Functionality**:
  - Handles user authentication (Login/Registration).
  - Protected routes that ensure users are logged in to access the core platform.
  - UI for uploading resumes, entering job descriptions, and viewing the AI-generated interview reports.

### Backend
- **Framework**: Node.js with Express.js.
- **Database**: MongoDB (via Mongoose) to securely store users, auth blacklists, and interview reports.
- **AI Integration**: `@google/genai` (Google Gemini AI) to process text and generate insightful interview preparation data.
- **File Handling**: `multer` for receiving uploaded PDF resumes and `pdf-parse` for extracting text from them.
- **Authentication**: JWT (`jsonwebtoken`) and `bcryptjs` for secure password hashing and session management.
- **Validation**: Schema validation via `zod`.
- **Other Utilities**: `puppeteer` to automate and generate a downloadable PDF version of the AI-enhanced resume or report.

## 🚀 How It Works (The Core Flow)

1. **Authentication:** A user registers and logs into the application. Only authenticated users can generate and view reports.
2. **Data Input:** The user navigates to the dashboard (Home page) and uploads their Resume (PDF). They also provide the specific target Job Description and a brief Self-Description.
3. **Data Parsing:** The Express backend receives the request. `multer` processes the file upload in memory, and `pdf-parse` extracts the raw text from the user's resume.
4. **AI Generation:** The backend controller passes the extracted resume text, job description, and self-description to a dedicated AI service (`@google/genai`).
5. **Insights Creation:** Google's AI model analyzes the inputs and returns structured data containing:
    - Expected Technical Questions
    - Expected Behavioral Questions
    - Identified Skill Gaps based on the resume vs. job description
    - A custom Preparation Plan
6. **Storage & Delivery:** The output is saved permanently in MongoDB and sent back to the React UI, allowing the user to deeply review their interview strategy dynamically via a dedicated page (`/interview/:interviewId`).
7. **Exporting:** Users can optionally trigger an endpoint that utilizes `puppeteer` to export their newly generated data/resume as a neatly formatted downloadable PDF.

## 📂 Folder Structure Highlights

*   **`Frontend/src/features/`**: Modular architecture containing grouped functionalities (e.g., `auth/` components and pages, `interview/` components and pages).
*   **`Backend/src/routes/` & `controllers/`**: Clear separation of concerns mapping HTTP endpoints (`auth.routes.js`, `interview.routes.js`) to executable logic (`auth.controller.js`, `interview.controller.js`).
*   **`Backend/src/services/ai.service.js`**: Abstraction layer dedicated to interacting with the Google GenAI API.

This modular structure ensures that the platform is scalable, secure, and maintainable.
