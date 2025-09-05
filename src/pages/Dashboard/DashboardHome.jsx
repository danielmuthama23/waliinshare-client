import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { jwtDecode } from "jwt-decode";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function DashboardHome() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalShares: 0,
    shareValue: 0,
    ownership: 0,
    currency: "USD",
    sharesAvailable: 1000,
    companyValue: 0,
  });
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("user"));
    const token = sessionStorage.getItem("token");

    if (userData && token) {
      setUser(userData);

      const fetchData = async () => {
        try {
          const decoded = jwtDecode(token);
          const isEthiopian = userData.phone?.startsWith("+251");
          const currency = isEthiopian ? "ETB" : "USD";

          // Fetch user's shares
          const shareRes = await axios.get("/purchase/my-shares", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const purchases = shareRes.data || [];
          const totalShares = purchases.reduce((sum, p) => sum + p.shares, 0);

          // Fetch company data
          const companyRes = await axios.get("/company-value", {
            headers: { Authorization: `Bearer ${token}` },
          });

          const company = companyRes.data;
          const pricePerShare = isEthiopian
            ? company.sharePriceETB
            : company.sharePriceUSD;
          const sharesAvailable = company.sharesAvailable;
          const companyValue = company.totalValueUSD;

          const shareValue = totalShares * pricePerShare;
          const ownership = totalShares / sharesAvailable;

          setStats({
            totalShares,
            shareValue,
            ownership,
            currency,
            sharesAvailable,
            companyValue,
          });
        } catch (error) {
          console.error("Error fetching dashboard stats:", error);
        }
      };

      const fetchChartData = async () => {
        try {
          const res = await axios.get("/purchase/my-shares-trend", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const transformed = res.data.map((entry) => ({
            date: typeof entry.date === "string" ? entry.date : "Unknown",
            shares: entry.totalShares ?? 0,
          }));
          setChartData(transformed);
        } catch (error) {
          console.error("Error fetching chart data:", error);
        }
      };

      fetchData();
      fetchChartData();
    }
  }, []);

  const firstName = user?.fullName?.split(" ")[0] || "User";

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Welcome back, {firstName} 👋
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white shadow-lg rounded-xl p-5">
          <h2 className="text-sm text-gray-500 mb-2">Total Shares</h2>
          <p className="text-2xl font-bold text-indigo-600">
            {stats.totalShares}
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-5">
          <h2 className="text-sm text-gray-500 mb-2">Share Value</h2>
          <p className="text-2xl font-bold text-green-600">
            {stats.currency} {stats.shareValue.toLocaleString()}
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-5">
          <h2 className="text-sm text-gray-500 mb-2">Company Value</h2>
          <p className="text-2xl font-bold text-purple-600">
            ${stats.companyValue.toLocaleString()}
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-5">
          <h2 className="text-sm text-gray-500 mb-2">Ownership</h2>
          <p className="text-2xl font-bold text-blue-600">
            {stats.totalShares} / {stats.sharesAvailable} (
            {(stats.ownership * 100).toFixed(2)}%)
          </p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Share Trend Over Time
        </h2>
        <div className="bg-white shadow rounded-lg p-6 text-gray-500 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="shares"
                stroke="#2F4DA2"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// // old one

// import React from 'react';
// import { useEffect, useState } from 'react';

// export default function DashboardHome() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const userData = JSON.parse(sessionStorage.getItem('user'));
//     if (userData) {
//       setUser(userData);
//     }
//   }, []);

//   const firstName = user?.fullName?.split(' ')[0] || 'User';

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">
//         Welcome back, {firstName} 👋
//       </h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         <div className="bg-white shadow-lg rounded-xl p-5">
//           <h2 className="text-sm text-gray-500 mb-2">Total Shares</h2>
//           <p className="text-2xl font-bold text-indigo-600">0</p>
//         </div>
//         <div className="bg-white shadow-lg rounded-xl p-5">
//           <h2 className="text-sm text-gray-500 mb-2">Share Value (USD)</h2>
//           <p className="text-2xl font-bold text-green-600">$0.00</p>
//         </div>
//         <div className="bg-white shadow-lg rounded-xl p-5">
//           <h2 className="text-sm text-gray-500 mb-2">Company Value</h2>
//           <p className="text-2xl font-bold text-purple-600">$1,000,000</p>
//         </div>
//         <div className="bg-white shadow-lg rounded-xl p-5">
//           <h2 className="text-sm text-gray-500 mb-2">Ownership</h2>
//           <p className="text-2xl font-bold text-blue-600">0 / 1000 (0.00%)</p>
//         </div>
//       </div>

//       <div className="mt-10">
//         <h2 className="text-xl font-semibold text-gray-700 mb-4">Analytics Overview</h2>
//         <div className="bg-white shadow rounded-lg p-6 text-gray-500">
//           Charts and trends will appear here soon.
//         </div>
//       </div>
//     </div>
//   );
// }