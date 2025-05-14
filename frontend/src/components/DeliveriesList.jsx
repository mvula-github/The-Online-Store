/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";

export default function DeliveriesList() {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const res = await axios.get(
          "https://your-backend-domain.com/api/deliveries",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setDeliveries(res.data.resources || res.data);
      } catch (err) {
        setDeliveries([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDeliveries();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        Loading deliveries...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Deliveries</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4">Delivery ID</th>
              <th className="py-2 px-4">Address</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-4 text-gray-400">
                  No deliveries found.
                </td>
              </tr>
            ) : (
              deliveries.map((delivery) => (
                <tr key={delivery.id} className="hover:bg-gray-50 transition">
                  <td className="py-2 px-4 font-mono">{delivery.id}</td>
                  <td className="py-2 px-4">{delivery.deliveryAddress}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold
                      ${
                        delivery.deliveryStatus === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : delivery.deliveryStatus === "shipped"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {delivery.deliveryStatus}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
