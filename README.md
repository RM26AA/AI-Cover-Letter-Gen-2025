# Cover Letter Generator

A personalized cover letter generator that uses the Gemini API to create professional, tailored cover letters. The tool generates a polished letter based on a user’s experience, skills, and the specific job they are applying for.

## Features

- Generates cover letters based on user-provided data
- Tailors content to the job title, company, and job description
- Supports customization of tone and length
- Easy to integrate with web or command-line applications

## Input

Users provide the following information:

- **Personal Information**: Name, email, phone, LinkedIn/portfolio
- **Job Information**: Job title, company, job description
- **Professional Background**: Current/previous job, skills, experience, education
- **Preferences**: Tone (professional, enthusiastic, etc.), letter length

Example input JSON:

```json
{
  "user": {
    "name": "Jane Doe",
    "email": "jane.doe@example.com",
    "phone": "555-123-4567",
    "linkedin": "linkedin.com/in/janedoe"
  },
  "job": {
    "title": "Software Engineer",
    "company": "TechCorp",
    "description": "Looking for a software engineer with 3+ years of experience in backend development, especially in Python and APIs."
  },
  "background": {
    "current_job": "Backend Developer at DevSolutions",
    "experience": [
      "Developed API services in Python and Node.js",
      "Led a team of 3 developers for internal projects",
      "Optimized database queries improving performance by 20%"
    ],
    "skills": ["Python", "Node.js", "APIs", "SQL", "Team Leadership"],
    "education": "B.S. in Computer Science, University of Somewhere, 2020"
  },
  "preferences": {
    "tone": "professional",
    "length": "medium"
  }
}
```

## Installation

1. Clone the repository:
```
git clone https://github.com/yourusername/cover-letter-generator.git
```

2. Install dependencies (example for Node.js):
```
npm install
```

3. Set your Gemini API key as an environment variable:
```
export GEMINI_API_KEY="your_api_key_here"
```

## Usage

```
node generateCoverLetter.js
```

- The script will prompt for user details or read from a JSON input file.
- The generated cover letter will be returned as text file or saved to a DOC file.

## License

MIT License

# Lovable project

## Project info

**URL**: https://lovable.dev/projects/d69a90e5-5192-4d76-9b10-de28608cf8da

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/d69a90e5-5192-4d76-9b10-de28608cf8da) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/d69a90e5-5192-4d76-9b10-de28608cf8da) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
