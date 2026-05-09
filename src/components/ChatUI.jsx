import { useEffect, useRef } from "react";
import "../styles/Chat.css";
function ChatUI({ messages, input, setInput, handleSend, loading }) {
    const bottomRef = useRef(null);

useEffect(() => {
  bottomRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);
  return (
    <div className="chat-container">
      <div className="messages">
        <div className="chat-header">
  <h2>EchoAI 🤖</h2>
  <p>Your personal AI assistant</p>
</div>
        {messages.map((msg, index) => (
          <div key={index} className={`message-row ${msg.role}`}>
            <div className={`bubble ${msg.role}`}>
              <div>{msg.text}</div>
              <div className="time">{msg.time}</div>
            </div>
          </div>
        ))}
  <div ref={bottomRef}></div>
        {loading && <p>AI is typing...</p>}
      </div>

      {/* Input */}
      <div className="input-container">
        <input
          type="text"
          className="input-box"
          placeholder="Type your message..."
          value={input}
          disabled={loading}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown = {(e)=>{
            if(e.key == "Enter"){
                e.preventDefault();
                handleSend();
            }
          }}
        />

        <button
          className="send-btn"
          onClick={handleSend}
          disabled={loading}
        >
          {loading ? "..." : "Send"}
        </button>
      </div>

    </div>
  );
}

export default ChatUI;