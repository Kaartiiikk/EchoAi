import { useState } from "react";
import axios from "axios";
import ChatUI from "./components/ChatUI";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false); 

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = {
      role: "user",
      text: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true); // start loading

    try {
      const res = await axios.post("https://echoaibackend1.onrender.com/chat", {
        message: userMessage.text,
      });

      const botMessage = {
        role: "ai",
        text: res.data.reply,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Something went wrong 😅" },
      ]);
    }

    setLoading(false); //  stop loading
  };

  return (
    <ChatUI
      messages={messages}
      input={input}
      setInput={setInput}
      handleSend={handleSend}
      loading={loading}
    />
  );
}

export default App;