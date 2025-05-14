import { useState } from "react";
import LoginForm from "./components/LoginForm";

function App() {
  const [token, setToken] = useState(localStorage.getItem("jwt"));

  if (!token) {
    return <LoginForm onLogin={setToken} />;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">
        Welcome to The Store Dashboard
      </h1>
      {/* Later: Add navigation and dashboard here */}
      <button
        className="mt-4 bg-gray-200 px-4 py-2 rounded"
        onClick={() => {
          localStorage.removeItem("jwt");
          setToken(null);
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default App;
