# Article Summarization with OpenAI GPT-4

This project is a web-based article summarization tool powered by OpenAI GPT-4. It allows users to input URLs of articles, and the application generates concise summaries of those articles.

## Technologies Used

- **OpenAI GPT-4**: Utilized for natural language processing and article summarization.
- **Rapid API**: Used to fetch article content from external sources.
- **Vite with React**: The project is built using Vite and React for a fast and efficient development experience.
- **Tailwind CSS**: Styling is done with Tailwind CSS, making the user interface responsive and visually appealing.
- **Redux for State Management **: Redux is used to manage the application's state, including fetching and storing article content.

## Features

- Input a URL of an article for summarization.
- Get concise summaries of articles in real-time.
- User-friendly interface with responsive design.
- Centralized state management for a seamless user experience.

## Usage

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-project.git

   ```

2. Go through the directory and install node_modules
   cd your-project
   npm install

3. Start the development server:
   npm run dev

4. Open your browser and access the application at http://localhost:3000.

## Configuration

To use this application, you need to set up API keys and other configurations. Here's how:

1. Get an API key from Rapid API for fetching article content.

2. Create a .env file in the project root directory and add your API key:

## REACT_APP_RAPID_API_KEY=your-api-key
