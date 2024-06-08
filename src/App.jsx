import { useState } from "react";
import "./App.css";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const [error, setError] = useState("");

  async function generateAnswer(e) {
    e.preventDefault();
    setAnswer("");
    setError("");
    setGeneratingAnswer(true);

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT}`,
        {
          contents: [{ parts: [{ text: question }] }],
        }
      );

      setAnswer(
        response.data.candidates[0].content.parts[0].text
      );
    } catch (error) {
      console.log(error);
      setError("Sorry - Something went wrong. Please try again!");
    }

    setGeneratingAnswer(false);
  }

  return (
    <div className="bg-white h-screen p-3">
      <div className="w-full md:w-2/3 m-auto text-center">
        <a href="https://github.com/Vishesh-Pandey/chat-ai" target="_blank">
          <h1 className="text-3xl">HAPPY BOT</h1>
        </a>
        <form onSubmit={generateAnswer} className="mt-4">
          <textarea
            required
            className="border rounded w-full h-40 px-4 py-2 my-2"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask anything"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
            disabled={generatingAnswer}
          >
            {generatingAnswer ? "Generating..." : "Generate answer"}
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
      <div className="w-full md:w-2/3 m-auto text-center mt-4">
        {answer && (
          <div className="bg-gray-100 p-4 rounded">
            <ReactMarkdown>{answer}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
