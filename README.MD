This is a AI chatbot with voice recognition. It was created with React, Nodejs, Langchain OpenAi, and ChatGPT.

## Dependencies
### Backend
* [OpenAI](https://openai.com/)
* [ChatGPT](https://platform.openai.com/)
* [Nodejs](https://nodejs.org/en)
* [Langchain](https://www.langchain.com/)

### Frontend
* [React](https://react.dev/)
* [Vite](https://vitejs.dev/)

## Installation
* Clone this repo `https://github.com/EBEREGIT/LangChainBotWithPersonalData`
* Navigate into the repo `cd LangChainBotWithPersonalData`

* Navigate into the `backend` folder `cd backend`
* Install the dependencies ``npm install``
* Create a file and name it `.env`
* Go to https://platform.openai.com/api-keys and create an API key and copy it.
* In the `.env` file, create a variable `OPENAI_API_KEY="The key you copied"` and save it.
* Go to the terminal and run the `index.js` file `node index`

*That will start the backend server on port `8000`: http://localhost:8000/*

* Navigate into the `frontend` folder `cd frontend`
* Install the dependencies ``npm install``
* Start the local server ``npm run dev``

*That will open the project on your default browser: http://127.0.0.1:5173/. You can now chat with the AI from your browser*
