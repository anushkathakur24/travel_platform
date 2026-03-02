import { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I’m your AI Travel Assistant 🤖. Ask me anything!" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "✨ Based on your interests, I recommend Goa for beaches or Manali for mountains!"
        }
      ]);
    }, 800);
  };

  return (
    <>
      {/* Floating Button */}
      <Button
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          fontSize: "24px",
          zIndex: 1000
        }}
        onClick={() => setOpen(!open)}
      >
        🤖
      </Button>

      {/* Chat Window */}
      {open && (
        <Card
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "340px",
            height: "460px",
            zIndex: 1000
          }}
        >
          <Card.Header>AI Travel Assistant</Card.Header>
          <Card.Body style={{ overflowY: "auto", fontSize: "14px" }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  textAlign: msg.sender === "user" ? "right" : "left",
                  marginBottom: "8px"
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    padding: "6px 10px",
                    borderRadius: "12px",
                    background:
                      msg.sender === "user" ? "#0d6efd" : "#e9ecef",
                    color: msg.sender === "user" ? "white" : "black"
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </Card.Body>
          <Card.Footer>
            <Form.Control
              placeholder="Ask about destinations..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
          </Card.Footer>
        </Card>
      )}
    </>
  );
}