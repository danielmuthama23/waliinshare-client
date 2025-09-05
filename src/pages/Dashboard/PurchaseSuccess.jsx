import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';

export default function PurchaseSuccess() {
  const [summary, setSummary] = useState(null);
  const { width, height } = useWindowSize();

  useEffect(() => {
    const stored = sessionStorage.getItem("purchaseSummary");
    if (stored) {
      setSummary(JSON.parse(stored));
    }
  }, []);

  const getMethodName = (method) => {
    const map = {
      stripe: 'Stripe (Credit/Debit)',
      paypal: 'PayPal',
      telebirr: 'Telebirr',
      manual: 'Manual Payment',
    };
    return map[method] || method;
  };

  const getReceiptUrl = () => {
    return summary?.receipt
      ? `${import.meta.env.VITE_API_URL || 'http://localhost:5050'}/receipts/${summary.receipt}`
      : null;
  };

  return (
    <div className="relative flex items-center justify-center min-h-[90vh] bg-gradient-to-br from-purple-50 to-indigo-100 px-4">
      {/* 🎉 Confetti */}
      <Confetti width={width} height={height} numberOfPieces={350} recycle={false} />

      <motion.div
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-xl text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <FaCheckCircle className="text-green-500 text-6xl mb-4 mx-auto" />
        <h1 className="text-3xl font-extrabold text-indigo-700 mb-2">Purchase Successful!</h1>
        <p className="text-gray-700 mb-6">
          Thank you for purchasing shares with <strong>Waliin Investment</strong>.
        </p>

        {summary && (
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6 text-left">
            <p className="mb-1"><strong>Shares:</strong> {summary.shares}</p>
            <p className="mb-1"><strong>Total Paid:</strong> ${summary.totalWithFee}</p>
            <p className="mb-1"><strong>Payment Method:</strong> {getMethodName(summary.paymentMethod)}</p>
            {getReceiptUrl() && (
              <p className="mt-2">
                <a
                  href={getReceiptUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-600 underline hover:text-indigo-800 transition"
                >
                  📄 Download Receipt (PDF)
                </a>
              </p>
            )}
          </div>
        )}

        <div className="text-sm text-gray-600 mb-6">
          ✅ A confirmation email will be sent after your payment is verified.<br />
          📩 Your share certificate will be emailed after approval.
        </div>

        <Link
          to="/dashboard"
          className="inline-block px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition"
        >
          Go to Dashboard
        </Link>
      </motion.div>
    </div>
  );
}



// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaCheckCircle } from 'react-icons/fa';
// import { motion } from 'framer-motion';

// export default function PurchaseSuccess() {
//   const [summary, setSummary] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const stored = sessionStorage.getItem("purchaseSummary");
//     if (stored) {
//       setSummary(JSON.parse(stored));
//     }

//     const timeout = setTimeout(() => {
//       navigate("/dashboard");
//     }, 5000);

//     return () => clearTimeout(timeout);
//   }, [navigate]);

//   const getMethodName = (method) => {
//     const map = {
//       stripe: 'Stripe (Credit/Debit)',
//       paypal: 'PayPal',
//       telebirr: 'Telebirr',
//       manual: 'Manual Payment',
//     };
//     return map[method] || method;
//   };

//   return (
//     <motion.div
//       className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center"
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//     >
//       <FaCheckCircle className="text-green-500 text-6xl mb-4" />
//       <h1 className="text-3xl font-bold text-indigo-700 mb-2">Purchase Successful!</h1>
//       <p className="text-gray-600 max-w-md mb-4">
//         Thank you for purchasing shares with Waliin Investment. You’ll receive updates after payment verification.
//       </p>

//       {summary && (
//         <div className="bg-gray-100 rounded-md p-4 w-full max-w-md mb-6 text-left shadow">
//           <p><strong>Shares:</strong> {summary.shares}</p>
//           <p><strong>Total Paid:</strong> ${summary.totalWithFee}</p>
//           <p><strong>Payment Method:</strong> {getMethodName(summary.paymentMethod)}</p>
//         </div>
//       )}

//       <p className="text-sm text-gray-500 italic mb-6">
//         A confirmation email will be sent after your payment is verified.
//       </p>

//       <Link
//         to="/dashboard"
//         className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
//       >
//         Go to Dashboard
//       </Link>
//     </motion.div>
//   );
// }