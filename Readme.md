# Codexa 🚀

**Turn your startup idea into a comprehensive, actionable plan in seconds. Codexa is your AI co-founder.**

Codexa was built in 48 hours for the **Roo Code Hackathon**. It leverages the power of Large Language Models to act as a strategic partner, transforming a single sentence into a detailed business plan, a technical roadmap, and a ready-to-use project board.

---

## 🌟 Key Features

* **📝 Instant Business Plan:** Generates a complete Lean Canvas business model, including market and competitor analysis.
* **💻 Smart Tech Roadmap:** Recommends a suitable technology stack (frontend, backend, database) to build your product.
* **✅ Actionable Project Bounties:** Creates a list of the first 10-12 developer tasks and displays them on an interactive Kanban board.

---

## 🛠️ How It's Built

Codexa is a **MERN stack** application that intelligently orchestrates a chain of API calls to the Google Gemini API.

### **Tech Stack**

* **Frontend:** Vite + React.js
* **Backend:** Node.js + Express.js
* **Component Library:** MUI (Material-UI)
* **Diagrams & Flowcharts:** React Flow
* **Core AI:** Google Gemini API (`gemini-2.5-flash`) via the `@google/genai` SDK

### **Backend Logic: The "AI Chain"**

The magic of Codexa lies in its backend. Instead of a single, generic prompt, it performs a sequence of three context-aware calls to the Gemini API:

1.  **Business & Market Analysis:** The user's initial idea is sent to generate a Lean Canvas and a competitor analysis.
2.  **Tech Stack Recommendation:** The output from the first call is fed back into the AI to generate a relevant tech stack.
3.  **Project Task Generation:** The combined context of the business plan and tech stack is used to generate a list of actionable developer tasks.

---

## 🚀 Getting Started

Follow these instructions to get a local copy up and running.

### **Prerequisites**

* Node.js (v18.x or later)
* npm

### **Installation**

1.  **Clone the repo**
    ```sh
    git clone [https://github.com/](https://github.com/)[YOUR_GITHUB_USERNAME]/codexa.git
    ```
2.  **Navigate to the Server and Install Dependencies**
    ```sh
    cd codexa/server
    npm install
    ```
3.  **Navigate to the Client and Install Dependencies**
    ```sh
    cd ../client
    npm install
    ```
4.  **Set Up Environment Variables**
    * In the `server` directory, create a `.env` file.
    * Add your Google Gemini API key:
        ```
        GEMINI_API_KEY="YOUR_SECRET_API_KEY_HERE"
        ```

### **Running the Application**

1.  **Run the Backend Server** (from the `server` directory)
    ```sh
    npm run dev
    ```
2.  **Run the Frontend Client** (from the `client` directory, in a new terminal)
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

---

## 🧑‍💻 Team

* **Swastik Sinha** - https://github.com/SwSsinha
* *(Add other team members if applicable)*