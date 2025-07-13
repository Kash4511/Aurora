import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

const Chat = () => {
  const { id } = useParams(); // id = other user's id or room name
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const socketRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    // Use wss:// for production
    const wsUrl = `wss://aurora-vtm6.onrender.com/ws/chat/${id}/?token=${token}`;
    socketRef.current = new WebSocket(wsUrl);

    socketRef.current.onopen = () => {
      console.log("✅ WebSocket Connected");
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, data]);
    };

    socketRef.current.onerror = (error) => {
      console.error("❌ WebSocket Error", error);
    };

    socketRef.current.onclose = () => {
      console.warn("⚠️ WebSocket Disconnected");
    };

    return () => {
      socketRef.current.close();
    };
  }, [id]);

  const sendMessage = () => {
    if (socketRef.current && input.trim()) {
      socketRef.current.send(JSON.stringify({ message: input }));
      setInput("");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Chat Room: {id}</h2>
      <div style={{ border: "1px solid #ccc", padding: 20, minHeight: 200 }}>
        {messages.map((msg, idx) => (
          <div key={idx}>
            <strong>User {msg.sender}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === "Enter" && sendMessage()}
        placeholder="Type a message..."
        style={{ marginTop: 10, width: 300, padding: 8 }}
      />
      <button onClick={sendMessage} style={{ marginLeft: 10 }}>Send</button>
    </div>
  );
};

export default Chat;
