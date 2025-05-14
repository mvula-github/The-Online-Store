import { useState } from "react";
import LoginForm from "./components/LoginForm";
import CombinedView from "./components/CombinedView";

function App() {
  const [token, setToken] = useState(localStorage.getItem("jwt"));

  if (!token) {
    return <LoginForm onLogin={setToken} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <nav className="bg-white shadow flex items-center justify-between px-8 py-4">
        <span className="text-xl font-bold text-blue-700">
          The Store Dashboard
        </span>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => {
            localStorage.removeItem("jwt");
            setToken(null);
          }}
        >
          Logout
        </button>
      </nav>
      <main className="max-w-5xl mx-auto py-8">
        <CombinedView />
      </main>
    </div>
  );
}

export default App;
