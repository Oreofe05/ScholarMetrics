import { useState } from "react";

export default function ExplainerChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    setInput("");

    setTimeout(() => {
      const aiMsg = {
        role: "ai",
        text:
          "This topic is about simplifying complex systems into understandable components. Think of it as breaking down ideas into smaller learning blocks.",
      };

      setMessages((prev) => [...prev, aiMsg]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full">
      
      {/* Quick Actions */}
      <div className="flex gap-2 mb-3">
        <button className="bg-slate-800 px-2 py-1 rounded">
          ✨ Summarize
        </button>
        <button className="bg-slate-800 px-2 py-1 rounded">
          ❓ Flashcards
        </button>
        <button className="bg-slate-800 px-2 py-1 rounded">
          📝 Quiz Me
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-auto space-y-2">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg max-w-xs ${
              m.role === "user"
                ? "bg-indigo-600 ml-auto"
                : "bg-slate-800"
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-2 mt-3">
        <input
          className="flex-1 p-2 bg-slate-800 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about a topic..."
        />

        <button
          onClick={sendMessage}
          className="bg-indigo-600 px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}