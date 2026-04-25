# My Portfolio & Apps

Welcome to my professional portfolio! This project is built with **React**, **TypeScript**, and **Vite**, and is designed to be hosted on **AWS Amplify**.

## Features
- **Modern Portfolio**: Showcases my skills and projects.
- **Live Web Apps**: Integrated interactive tools like the **Password Strength Checker**.
- **Responsive Design**: Works on mobile, tablet, and desktop.
- **AWS Amplify Ready**: Continuous deployment enabled via GitHub.

## Featured Projects
### 1. Smart File Organiser
A Python-based automation tool that streamlines digital workspace management by automatically sorting files into organized directories based on extensions.
- **GitHub**: [Smart-File-Organsier](https://github.com/Guhan-VS/Smart-File-Organsier)

### 2. Password Strength Checker
A web-based version of my Python tool. It uses real-time regex analysis to provide security feedback based on OWASP guidelines.

---

## 🚀 How to Deploy to AWS Amplify

### Step 1: Push to GitHub
1. Create a new repository on GitHub named `portfolio`.
2. Link your local project to GitHub:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Connect to AWS Amplify
1. Log in to the [AWS Management Console](https://console.aws.amazon.com/).
2. Search for **AWS Amplify**.
3. Click **"Create new app"** and select **GitHub**.
4. Authorize AWS to access your GitHub and select the `portfolio` repository.
5. Amplify will automatically detect the **Vite** build settings:
   - **Build command**: `npm run build`
   - **Output directory**: `dist`
6. Click **"Save and deploy"**.

### Step 3: View your Site!
Amplify will provide a URL (e.g., `https://main.d12345.amplifyapp.com`) where your portfolio is live. Every time you `git push`, your site will update automatically!

---

## Local Development
1. Install dependencies: `npm install`
2. Run locally: `npm run dev`
3. Build project: `npm run build`
