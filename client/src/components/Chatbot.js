import { useState, useRef, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { api } from "../utils/api";
import { BotIcon, XIcon, SendIcon } from "./Icons";

export default function Chatbot() {
  const [open,     setOpen]     = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I'm your AI Travel Assistant 🤖\nAsk me about destinations, packing, visas, food, or anything travel!" }
  ]);
  const [input,    setInput]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setMessages(prev => [...prev, { sender: "user", text }]);
    setInput("");
    setLoading(true);
    try {
      const data = await api.post("/api/chat", { message: text });
      setMessages(prev => [...prev, { sender: "bot", text: data.botReply }]);
    } catch {
      setMessages(prev => [...prev, { sender: "bot", text: "Sorry, I'm offline right now. Try again in a moment! 🙏" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        className="chatbot-toggle"
        onClick={() => setOpen(!open)}
        title="AI Travel Assistant"
        style={{
          position: "fixed", bottom: 24, right: 24,
          width: 60, height: 60,
          borderRadius: "50%",
          fontSize: "1.5rem",
          zIndex: 1100,
          cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
          transform: open ? "rotate(180deg)" : "rotate(0deg)"
        }}
      >
        {open ? <XIcon size={20} color="white" /> : <BotIcon size={26} color="white" />}
      </button>

      {/* Chat Window */}
      {open && (
        <div
          style={{
            position: "fixed", bottom: 96, right: 24,
            width: 360, height: 500,
            background: "var(--surface)",
            borderRadius: "var(--radius-xl)",
            boxShadow: "var(--shadow-xl)",
            zIndex: 1100,
            display: "flex", flexDirection: "column",
            overflow: "hidden",
            animation: "fadeUp 0.35s ease both",
            border: "1px solid var(--border)"
          }}
        >
          {/* Header */}
          <div style={{
            background: "linear-gradient(135deg, var(--brand-700), #7c3aed)",
            padding: "16px 20px",
            color: "white",
            display: "flex", alignItems: "center", gap: 12
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: "50%",
              background: "rgba(255,255,255,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <BotIcon size={22} color="white" />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>AI Travel Assistant</div>
              <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.75)", display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
                Online — ask me anything!
              </div>
            </div>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: "auto", padding: "16px 14px",
            display: "flex", flexDirection: "column", gap: 10
          }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: "flex", justifyContent: msg.sender === "user" ? "flex-end" : "flex-start" }}>
                {msg.sender === "bot" && (
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%",
                    background: "linear-gradient(135deg, var(--brand-600), #7c3aed)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.75rem", marginRight: 8, flexShrink: 0, alignSelf: "flex-end"
                  }}>
                    <BotIcon size={14} color="white" />
                  </div>
                )}
                <div style={{
                  maxWidth: "78%",
                  padding: "10px 14px",
                  borderRadius: msg.sender === "user"
                    ? "18px 18px 4px 18px"
                    : "18px 18px 18px 4px",
                  background: msg.sender === "user"
                    ? "linear-gradient(135deg, var(--brand-600), var(--brand-700))"
                    : "var(--surface-3)",
                  color: msg.sender === "user" ? "white" : "var(--text-primary)",
                  fontSize: "0.88rem",
                  lineHeight: 1.55,
                  whiteSpace: "pre-wrap",
                  boxShadow: "var(--shadow-sm)"
                }}>
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--brand-600), #7c3aed)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <BotIcon size={14} color="white" />
                </div>
                <div style={{
                  background: "var(--surface-3)", borderRadius: "18px 18px 18px 4px",
                  padding: "10px 18px", display: "flex", gap: 5, alignItems: "center"
                }}>
                  {[1,2,3].map(d => (
                    <div key={d} style={{
                      width: 7, height: 7, borderRadius: "50%",
                      background: "var(--brand-400)",
                      animation: `float ${0.8 + d*0.15}s ease-in-out infinite`,
                      animationDelay: `${d * 0.15}s`
                    }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: "12px 14px",
            borderTop: "1px solid var(--border)",
            display: "flex", gap: 8
          }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
              placeholder="Ask about destinations…"
              disabled={loading}
              style={{
                flex: 1, border: "1.5px solid var(--border)",
                borderRadius: 50, padding: "9px 18px",
                fontSize: "0.88rem", outline: "none",
                transition: "border-color 0.2s",
                background: "var(--surface-2)"
              }}
              onFocus={e => e.target.style.borderColor = "var(--brand-500)"}
              onBlur={e => e.target.style.borderColor = "var(--border)"}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              style={{
                width: 40, height: 40, borderRadius: "50%",
                background: input.trim()
                  ? "linear-gradient(135deg, var(--brand-600), var(--brand-700))"
                  : "var(--surface-3)",
                border: "none", color: "white",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: input.trim() ? "pointer" : "not-allowed",
                fontSize: "1rem", transition: "all 0.2s",
                flexShrink: 0
              }}
            >
              {loading ? <Spinner size="sm" animation="border" style={{ width: 16, height: 16 }} /> : <SendIcon size={16} color="white" />}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
