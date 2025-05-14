/* eslint-disable no-unused-vars */

import { useState } from "react";
import LoginForm from "./components/LoginForm";
import CombinedView from "./components/CombinedView";
import {
  CheckCircleIcon,
  TruckIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";
import DarkModeToggle from "./components/DarkModeToggle";

function App() {
  const [token, setToken] = useState(localStorage.getItem("jwt"));
  const [search, setSearch] = useState("");

  if (!token) {
    return <LoginForm onLogin={setToken} />;
  }

  // eslint-disable-next-line no-undef
  const filteredOrders = orders.filter((order) =>
    order.customerName.toLowerCase().includes(search.toLowerCase())
  );

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
        <DarkModeToggle />
      </nav>
      <main className="max-w-5xl mx-auto py-8">
        <input
          type="text"
          placeholder="Search by customer"
          className="mb-4 p-2 border rounded w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <CombinedView />
      </main>
    </div>
  );
}

export default App;
