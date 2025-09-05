import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  AreaChart, Area, ScatterChart, Scatter, Legend, ResponsiveContainer
} from "recharts";

const Analytics = () => {
  const [timeframe, setTimeframe] = useState("daily");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `${baseURL}/analytics/${userId}?timeframe=${timeframe}&t=${Date.now()}`
        );
        console.log("Analytics API response:", res.data);
        setData(res.data);
      } catch (err) {
        console.error("Error fetching analytics:", err);
        setError("Failed to load analytics.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchAnalytics();
    } else {
      setError("User ID not found.");
    }
  }, [userId, timeframe]);

  // Format X-axis labels based on selected timeframe
  const formatXAxis = (dateStr) => {
    if (timeframe === "weekly") return dateStr.replace(/.*-W/, "W");
    if (timeframe === "monthly") return dateStr.split("-")[1]; // Just the month
    return dateStr; // Daily
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Analytics</h2>

      {/* Timeframe Selector */}
      <div>
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="px-4 py-2 border rounded-md"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      {loading ? (
        <p className="text-gray-600">Loading analytics...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <>
          {/* Your Share Trend */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-2">
              Your Share Trend ({timeframe})
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={formatXAxis} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#16896D"
                  strokeWidth={3}
                  name="Your Share Value"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Company Growth Trend */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-2">
              Company Growth Trend ({timeframe})
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16896D" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#16896D" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" tickFormatter={formatXAxis} />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="companyGrowth"
                  stroke="#16896D"
                  fillOpacity={1}
                  fill="url(#colorGrowth)"
                  name="Company Growth"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Scatter Plot */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-2">
              Share vs Company Growth
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart>
                <CartesianGrid />
                <XAxis dataKey="price" name="Share Value" />
                <YAxis dataKey="companyGrowth" name="Company Growth" />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Legend />
                <Scatter name="Relation" data={data} fill="#16896D" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default Analytics;
