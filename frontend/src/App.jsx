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
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import jwt_decode from "jwt-decode";
import OrderList from "./components/OrderList";
import DeliveriesList from "./components/DeliveriesList";

function App() {
  const [token, setToken] = useState(localStorage.getItem("jwt"));
  const [search, setSearch] = useState("");

  // Role-based view (optional)
  let user = null;
  if (token) {
    try {
      user = jwt_decode(token);
    } catch {
      user = null;
    }
  }

  if (!token) {
    return <LoginForm onLogin={setToken} />;
  }

  // eslint-disable-next-line no-undef
  const filteredOrders = orders.filter((order) =>
    order.customerName.toLowerCase().includes(search.toLowerCase())
  );

  toast.error("Login failed!");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <nav className="bg-white dark:bg-gray-900 shadow flex items-center justify-between px-8 py-4">
        <span className="text-xl font-bold text-blue-700 dark:text-blue-200">
          The Store Dashboard
        </span>
        <div className="flex items-center">
          {user && (
            <span className="mr-4 text-gray-700 dark:text-gray-200">
              {user.role && `Role: ${user.role}`}
            </span>
          )}
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
        </div>
      </nav>
      <main className="max-w-5xl mx-auto py-8">
        <input
          type="text"
          placeholder="Search by customer or address"
          className="mb-4 p-2 border rounded w-full dark:bg-gray-800 dark:text-gray-100"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <CombinedView search={search} />
      </main>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
