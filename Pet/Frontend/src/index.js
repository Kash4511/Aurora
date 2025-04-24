import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";

// Find the root DOM node
const appDiv = document.getElementById("app");

// Create a root and render the App component
const root = createRoot(appDiv);
root.render(<App />);