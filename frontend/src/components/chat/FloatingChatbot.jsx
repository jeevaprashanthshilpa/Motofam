import { useState } from "react";
import { MessageSquare, X, Send, Bot } from "lucide-react";

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I am your MOTOFAM assistant. Looking for a verified bike or need help with listing your two-wheeler?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setInput("");

    // Simulate bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Thanks for reaching out! You can browse our verified inventory via the catalog or connect with sellers directly through WhatsApp." }
      ]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-surface-primary hover:bg-surface-primaryHover text-white p-4 rounded-full shadow-2xl transition flex items-center justify-center cursor-pointer"
          aria-label="Open support chat"
        >
          <MessageSquare size={24} />
        </button>
      ) : (
        <div className="bg-surface-card border border-surface-border rounded-2xl shadow-2xl w-80 sm:w-96 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-surface-header text-surface-headerText p-4 flex items-center justify-between border-b border-surface-border">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-surface-primary text-white">
                <Bot size={18} />
              </div>
              <span className="font-bold text-sm text-white">MOTOFAM Assistant</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-surface-muted hover:text-white transition cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="p-4 h-72 overflow-y-auto space-y-3 bg-surface-page text-xs">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-xl leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-surface-primary text-white rounded-br-none"
                      : "bg-surface-card text-surface-text border border-surface-border rounded-bl-none shadow-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 bg-surface-card border-t border-surface-border flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask a question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-surface-page border border-surface-border text-surface-text rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-surface-primary"
            />
            <button
              type="submit"
              className="bg-surface-primary hover:bg-surface-primaryHover text-white p-2 rounded-xl transition cursor-pointer"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}