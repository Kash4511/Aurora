import { useEffect, useRef, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

const ChatPage = () => {
  const { id } = useParams(); // other user's id
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [showConnectionAlert, setShowConnectionAlert] = useState(false);

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const alertTimeoutRef = useRef(null);
  const localStorageKey = `chat_messages_${id}`;

  // Auto-scroll
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load from localStorage first
  useEffect(() => {
    const savedMessages = localStorage.getItem(localStorageKey);
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (err) {
        console.error("Failed to parse saved messages:", err);
      }
    }
  }, [localStorageKey]);

  // Save messages to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(localStorageKey, JSON.stringify(messages));
    }
  }, [messages, localStorageKey]);

  // Fetch chat history via REST
  const fetchChatHistory = useCallback(async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      const res = await fetch(
        `https://aurora-vtm6.onrender.com/chat/${id}/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch chat history");
      const data = await res.json();
      setMessages((prev) => {
        const merged = [...prev, ...data];
        const unique = Array.from(
          new Map(merged.map((m) => [m.id, m])).values()
        );
        return unique.sort((a, b) => new Date(a.date) - new Date(b.date));
      });
    } catch (err) {
      console.error(err);
    }
  }, [id]);

  // WebSocket setup
  const setupWebSocket = useCallback(() => {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    if (socketRef.current && socketRef.current.readyState !== WebSocket.CLOSED) {
      socketRef.current.close();
    }

    // Show connecting alert
    setShowConnectionAlert(true);
    if (alertTimeoutRef.current) clearTimeout(alertTimeoutRef.current);
    alertTimeoutRef.current = setTimeout(() => setShowConnectionAlert(false), 3000);

    const wsUrl =
      window.location.hostname === "localhost"
        ? `ws://localhost:8000/ws/chat/${id}/?token=${token}`
        : `wss://aurora-vtm6.onrender.com/ws/chat/${id}/?token=${token}`;

    const socket = new WebSocket(wsUrl);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocket Connected");
      setIsConnected(true);
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === "history" && Array.isArray(data.messages)) {
          if (data.messages.length > 0) {
            setMessages((prev) => {
              const merged = [...prev, ...data.messages];
              const unique = Array.from(
                new Map(merged.map((m) => [m.id, m])).values()
              );
              return unique.sort((a, b) => new Date(a.date) - new Date(b.date));
            });
          }
        } else if (data.message && data.sender) {
          setMessages((prev) => {
            const exists = prev.some((m) => m.id === data.id);
            return exists ? prev : [...prev, data];
          });
        }
      } catch (err) {
        console.error("Failed to parse message:", err);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket Error", error);
      setIsConnected(false);
    };

    socket.onclose = (event) => {
      console.warn("WebSocket Disconnected", event.code, event.reason);
      setIsConnected(false);

      reconnectTimeoutRef.current = setTimeout(() => {
        console.log("Reconnecting...");
        setupWebSocket();
      }, 3000);
    };
  }, [id]);

  // Initialize
  useEffect(() => {
    fetchChatHistory();
    setupWebSocket();

    return () => {
      if (socketRef.current) socketRef.current.close();
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
      if (alertTimeoutRef.current) clearTimeout(alertTimeoutRef.current);
    };
  }, [id, setupWebSocket, fetchChatHistory]);

  // Send message
  const sendMessage = () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN && input.trim()) {
      socketRef.current.send(JSON.stringify({ message: input }));
      setInput("");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Chat with User {id}</h2>
      {showConnectionAlert && (
        <div style={{
          padding: "10px",
          backgroundColor: "#fff3cd",
          color: "#856404",
          borderRadius: "4px",
          marginBottom: "15px",
          transition: "opacity 0.5s ease-in-out"
        }}>
          Connecting...
        </div>
      )}
      <div style={{
        border: "1px solid #ccc",
        padding: 20,
        minHeight: 300,
        maxHeight: 500,
        overflowY: "auto"
      }}>
        {messages.map((msg, idx) =>
          msg.sender && msg.message ? (
            <div key={idx} style={{ 
              marginBottom: 10, 
              textAlign: msg.sender === localStorage.getItem("username") ? "right" : "left"
            }}>
              <strong>{msg.sender}:</strong> {msg.message}
            </div>
          ) : null
        )}
        <div ref={messagesEndRef} />
      </div>
      <div style={{ marginTop: 15, display: "flex" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          style={{ flexGrow: 1, padding: 10 }}
          disabled={!isConnected}
        />
        <button
          onClick={sendMessage}
          style={{
            marginLeft: 10,
            padding: "10px 20px",
            backgroundColor: isConnected ? "#4CAF50" : "#cccccc",
            color: "white",
            border: "none",
            borderRadius: 4,
            cursor: isConnected ? "pointer" : "not-allowed"
          }}
          disabled={!isConnected}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
