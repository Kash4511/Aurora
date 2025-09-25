import { useEffect, useRef, useState, useCallback } from "react";
import { useParams, useLocation } from "react-router-dom";
import { API_ENDPOINTS } from "./config";
import "./Css/ChatPage.css";

const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECT_INTERVAL = 3000; // 3 seconds

const ChatPage = () => {
  const { id } = useParams(); // other user's id
  const location = useLocation(); // Access location state
  const [chatUserName, setChatUserName] = useState("User"); // Default username
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [showConnectionAlert, setShowConnectionAlert] = useState(false);

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const alertTimeoutRef = useRef(null);
  const localStorageKey = `chat_messages_${id}`;

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load messages from localStorage
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

  // Fetch chat history from REST API
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchChatHistory = useCallback(async () => {
    try {
      setIsLoading(true);
      setFetchError(null);
      const token = localStorage.getItem("access_token");
      if (!token) {
        setFetchError("Authentication required. Please log in again.");
        return;
      }

      const res = await fetch(API_ENDPOINTS.CHAT_HISTORY(id), {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const errorText = await res.text().catch(() => "Unknown error");
        throw new Error(`Failed to fetch chat history: ${res.status} ${errorText}`);
      }

      const data = await res.json();

      setMessages((prev) => {
        const merged = [...prev, ...data];
        const unique = Array.from(new Map(merged.map((m) => [m.id, m])).values());
        return unique.sort((a, b) => new Date(a.date) - new Date(b.date));
      });
    } catch (err) {
      console.error("Error fetching chat history:", err);
      setFetchError(`Failed to load chat history: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  // WebSocket setup with reconnect logic
  const [wsError, setWsError] = useState(null);
  const [reconnectCount, setReconnectCount] = useState(0);

  const setupWebSocket = useCallback(() => {
    let reconnectAttempts = 0;
    let socket;

    const connect = () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setWsError("Authentication required for WebSocket connection");
        return;
      }

      // Close previous socket if any
      if (socketRef.current && socketRef.current.readyState !== WebSocket.CLOSED) {
        socketRef.current.close();
      }

      // Show temporary connecting alert
      setShowConnectionAlert(true);
      setWsError(null);
      if (alertTimeoutRef.current) clearTimeout(alertTimeoutRef.current);
      alertTimeoutRef.current = setTimeout(() => setShowConnectionAlert(false), 3000);

      const wsUrl =
        window.location.hostname === "localhost"
          ? API_ENDPOINTS.WS_CHAT_LOCAL(id, token)
          : API_ENDPOINTS.WS_CHAT(id, token);

      try {
        socket = new WebSocket(wsUrl);
        socketRef.current = socket;

        socket.onopen = () => {
          console.log("✅ WebSocket Connected");
          setIsConnected(true);
          setWsError(null);
          reconnectAttempts = 0; // reset reconnect attempts
          setReconnectCount(0);

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
                  const unique = Array.from(new Map(merged.map((m) => [m.id, m])).values());
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
          setWsError("Connection error occurred. Please try again later.");
        };

        socket.onclose = (event) => {
          console.warn("WebSocket Disconnected", event.code, event.reason);
          setIsConnected(false);

          if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
            reconnectAttempts += 1;
            setReconnectCount(reconnectAttempts);
            reconnectTimeoutRef.current = setTimeout(() => {
              console.log(`🔁 Reconnecting attempt ${reconnectAttempts}...`);
              connect();
            }, RECONNECT_INTERVAL);
          } else {
            console.error("Max reconnect attempts reached. WebSocket closed.");
            setWsError("Connection lost. Max reconnection attempts reached.");
          }
        };
      } catch (error) {
        console.error("Error creating WebSocket connection:", error);
        setWsError(`Failed to establish connection: ${error.message}`);
      }
    };

    connect();
  }, [id]);

  // Debugging to ensure component is rendering
  useEffect(() => {
    console.log("ChatPage component mounted.");
  }, []);

  // Log the ID retrieved from useParams
  useEffect(() => {
    console.log("Retrieved ID from useParams:", id);
  }, [id]);

  // Fetch username
  const fetchUsername = useCallback(async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        console.error("Authentication required to fetch username.");
        return;
      }

      console.log("Making API call to fetch username for ID:", id);
      const res = await fetch(API_ENDPOINTS.USER_DETAILS(id), {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch username: ${res.status}`);
      }

      const data = await res.json();
      console.log("API response for username:", data);
      setChatUserName(data.username || "User");
    } catch (err) {
      console.error("Error fetching username:", err);
    }
  }, [id]);

  // Initialize
  useEffect(() => {
    fetchChatHistory();
    setupWebSocket();
    fetchUsername();

    return () => {
      if (socketRef.current) socketRef.current.close();
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
      if (alertTimeoutRef.current) clearTimeout(alertTimeoutRef.current);
    };
  }, [id, setupWebSocket, fetchChatHistory, fetchUsername]);

  // Debugging log for username fetch
  useEffect(() => {
    console.log("Fetching username for ID:", id);
    fetchUsername().then(() => {
      console.log("Fetched username:", chatUserName);
    });
  }, [id]);

  // Ensure the username is displayed in the header
  useEffect(() => {
    if (!chatUserName || chatUserName === "User") {
      setChatUserName(location.state?.username || "User");
    }
  }, [location.state, chatUserName]);

  // Send message
  const sendMessage = () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN && input.trim()) {
      socketRef.current.send(JSON.stringify({ message: input }));
      setInput("");
    }
  };

  return (
    <div className="chat-container">
      {/* Header */}
      <div className="chat-header">
        <div className="chat-username">{chatUserName}</div>
        <div className="chat-status">{isConnected ? "Online" : "Offline"}</div>
      </div>

      {/* Messages */}
      <div className="chat-messages">
        {messages.map((msg, idx) => {
          const isSent = msg.sender === localStorage.getItem("username"); // ✅ your messages
          return (
            <div
              key={idx}
              className={`chat-bubble ${isSent ? "sent" : "received"}`}
            >
              <span className="chat-text">{msg.message}</span>
              <span className="chat-time">
                {msg.date
                  ? new Date(msg.date).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : ""}
              </span>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder={`Message ${chatUserName}...`}
        />
        <button onClick={sendMessage} disabled={!isConnected}>
          ➤
        </button>
      </div>
    </div>
  );
};

export default ChatPage;

/* ChatPage.css */

