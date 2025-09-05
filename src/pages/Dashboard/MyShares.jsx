import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FaChartPie } from 'react-icons/fa';

const MyShares = () => {
  const [shareStats, setShareStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShares = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) {
          console.warn('⚠️ No token found for fetching shares.');
          return;
        }

        const response = await axios.get(`http://localhost:5050/api/purchase/my-shares`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const purchases = response.data;
        const companyTotalShares = 1000;
        const companyValue = 100000;

        // Group by currency
        const statsMap = {};

        purchases.forEach(purchase => {
          const { currency, shares } = purchase;
          const pricePerShare = currency === 'ETB' ? 5500 : 100; // Example conversion
          if (!statsMap[currency]) {
            statsMap[currency] = {
              totalShares: 0,
              pricePerShare,
              companyTotalShares,
              companyValue,
            };
          }
          statsMap[currency].totalShares += shares;
        });

        const finalStats = Object.entries(statsMap).map(([currency, data]) => {
          const totalValue = data.totalShares * data.pricePerShare;
          const proportion = `${data.totalShares}/${data.companyTotalShares} (${((data.totalShares / data.companyTotalShares) * 100).toFixed(2)}%)`;
          return {
            currency,
            ...data,
            totalValue,
            proportion,
          };
        });

        setShareStats(finalStats);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching share data:', error);
        setLoading(false);
      }
    };

    fetchShares();
  }, []);

  if (loading) return <p className="text-center">Loading your shares...</p>;

  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-md text-gray-800 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-4 mb-6">
        <FaChartPie className="text-3xl text-[#16896D]" />
        <h2 className="text-2xl font-bold">My Current Shares</h2>
      </div>

      {shareStats.map((stat, idx) => (
        <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#F0F9F6] p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-[#2F4DA2]">Currency</h3>
            <p className="text-xl mt-2">{stat.currency}</p>
          </div>

          <div className="bg-[#F0F9F6] p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-[#2F4DA2]">Total Shares</h3>
            <p className="text-xl mt-2">{stat.totalShares}</p>
          </div>

          <div className="bg-[#F0F9F6] p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-[#2F4DA2]">Price Per Share</h3>
            <p className="text-xl mt-2">{stat.pricePerShare} {stat.currency}</p>
          </div>

          <div className="bg-[#F0F9F6] p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-[#2F4DA2]">Total Value</h3>
            <p className="text-xl mt-2">{stat.totalValue} {stat.currency}</p>
          </div>

          <div className="bg-[#F0F9F6] p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-[#2F4DA2]">Proportion to Company</h3>
            <p className="text-xl mt-2">{stat.proportion}</p>
          </div>

          <div className="bg-[#F0F9F6] p-4 rounded-lg shadow col-span-full">
            <h3 className="text-lg font-semibold text-[#2F4DA2]">Company Current Value</h3>
            <p className="text-xl mt-2">{stat.companyValue} USD</p>
          </div>
        </div>
      ))}
    </motion.div>
  );
};

export default MyShares;






// import React, { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { FaChartPie } from 'react-icons/fa';
// import axios from 'axios';

// const MyShares = () => {
//   const [userShares, setUserShares] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchShares = async () => {
//       try {
//         const token = sessionStorage.getItem('token');
//         const response = await axios.get('http://localhost:5050/api/purchase/my-shares', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const shareData = response.data;
//         console.log('Fetched share data:', shareData);
//         setUserShares(shareData);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching share data:', error);
//         setUserShares([]);
//         setLoading(false);
//       }
//     };

//     fetchShares();
//   }, []);

//   if (loading) return <p className="text-center">Loading your shares...</p>;
//   if (!userShares.length) return <p className="text-center">No shares found.</p>;

//   const totalShares = userShares.reduce((acc, item) => acc + (item.shares || 0), 0);
//   const pricePerShare = 100; // Static
//   const companyTotalShares = 1000;
//   const companyValue = 100000;
//   const totalValue = totalShares * pricePerShare;
//   const proportion = `${totalShares}/${companyTotalShares} (${((totalShares / companyTotalShares) * 100).toFixed(2)}%)`;

//   return (
//     <motion.div
//       className="bg-white p-6 rounded-xl shadow-md text-gray-800 max-w-3xl mx-auto"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <div className="flex items-center gap-4 mb-6">
//         <FaChartPie className="text-3xl text-[#16896D]" />
//         <h2 className="text-2xl font-bold">My Current Shares</h2>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//         <div className="bg-[#F0F9F6] p-4 rounded-lg shadow">
//           <h3 className="text-lg font-semibold text-[#2F4DA2]">Total Shares</h3>
//           <p className="text-xl mt-2">{totalShares}</p>
//         </div>

//         <div className="bg-[#F0F9F6] p-4 rounded-lg shadow">
//           <h3 className="text-lg font-semibold text-[#2F4DA2]">Price Per Share</h3>
//           <p className="text-xl mt-2">${pricePerShare}</p>
//         </div>

//         <div className="bg-[#F0F9F6] p-4 rounded-lg shadow">
//           <h3 className="text-lg font-semibold text-[#2F4DA2]">Total Value</h3>
//           <p className="text-xl mt-2">${totalValue}</p>
//         </div>

//         <div className="bg-[#F0F9F6] p-4 rounded-lg shadow">
//           <h3 className="text-lg font-semibold text-[#2F4DA2]">Proportion to Company</h3>
//           <p className="text-xl mt-2">{proportion}</p>
//         </div>

//         <div className="bg-[#F0F9F6] p-4 rounded-lg shadow col-span-full">
//           <h3 className="text-lg font-semibold text-[#2F4DA2]">Company Current Value</h3>
//           <p className="text-xl mt-2">${companyValue}</p>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default MyShares;