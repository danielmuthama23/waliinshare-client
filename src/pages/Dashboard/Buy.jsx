import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { FaMoneyBillWave } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

export default function Buy() {
  const [shares, setShares] = useState(0);
  const [pricePerShare] = useState(100);
  const [totalPrice, setTotalPrice] = useState(0);
  const [gatewayFee, setGatewayFee] = useState(0);
  const [totalWithFee, setTotalWithFee] = useState(0);
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [certificatePhoto, setCertificatePhoto] = useState(null); // NEW

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const token = sessionStorage.getItem('token');
      const decoded = token ? jwtDecode(token) : null;
      if (decoded?.phone) setPhone(decoded.phone);
    } catch (err) {
      console.error('Token decode error', err);
    }
  }, []);

  useEffect(() => {
    const price = shares * pricePerShare;
    setTotalPrice(price);
  }, [shares]);

  useEffect(() => {
    let fee = 0;
    if (paymentMethod === 'stripe') fee = totalPrice * 0.029 + 0.3;
    else if (paymentMethod === 'paypal') fee = totalPrice * 0.035;
    else if (paymentMethod === 'telebirr') fee = totalPrice * 0.015;
    else if (paymentMethod === 'manual') fee = totalPrice * 0.001;
    setGatewayFee(fee);
    setTotalWithFee(totalPrice + fee);
  }, [totalPrice, paymentMethod]);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem('token');

      if (paymentMethod === 'manual') {
        const formData = new FormData();
        formData.append('phone', phone);
        formData.append('shares', shares);
        formData.append('currency', 'USD');
        formData.append('paymentMethod', paymentMethod);
        formData.append('totalPrice', totalPrice.toFixed(2));
        formData.append('gatewayFee', gatewayFee.toFixed(2));
        formData.append('totalWithFee', totalWithFee.toFixed(2));
        formData.append('termsAccepted', termsAccepted);
        if (file) formData.append('screenshot', file);
        if (certificatePhoto) formData.append('certificatePhoto', certificatePhoto); // NEW

        const response = await axios.post(
          'http://localhost:5050/api/purchase',
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        if (response.status === 201) {
          sessionStorage.setItem(
            'purchaseSummary',
            JSON.stringify({
              shares,
              totalWithFee: totalWithFee.toFixed(2),
              paymentMethod,
              receipt: response.data.receipt,
            })
          );
          toast.success('Purchase successful!');
          navigate('/dashboard/purchase-success');
        } else {
          toast.error('Something went wrong. Please try again.');
        }
      } else if (paymentMethod === 'stripe') {
        const response = await axios.post(
          'http://localhost:5050/api/payment/stripe-session',
          {
            shares,
            currency: 'usd',
            phone,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data?.url) {
          window.location.href = response.data.url;
        } else {
          toast.error('Stripe session failed to generate.');
        }
      }
    } catch (error) {
      console.error('Payment Error:', error);
      toast.error('Checkout failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">Buy Shares</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Registered Phone Number</label>
        <input type="text" value={phone} readOnly className="w-full border rounded-md p-2 bg-gray-100" />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Number of Shares</label>
        <input
          type="number"
          min="1"
          value={shares}
          onChange={(e) => {
            const val = parseInt(e.target.value, 10);
            setShares(!isNaN(val) && val > 0 ? val : 0);
          }}
          className="w-full border rounded-md p-2"
        />
      </div>

      <div className="mb-4">
        <p className="text-lg">Price per Share: <span className="font-semibold">${pricePerShare}</span></p>
        <p className="text-lg">Total Price: <span className="font-bold text-indigo-600">${totalPrice.toFixed(2)}</span></p>
        {gatewayFee > 0 && (
          <>
            <p className="text-sm text-gray-600">+ Gateway Fee: <span className="text-red-500">${gatewayFee.toFixed(2)}</span></p>
            <p className="text-lg font-semibold mt-1">Final Total: <span className="text-green-600">${totalWithFee.toFixed(2)}</span></p>
          </>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Select Payment Method</label>
        <select
          className="w-full border rounded-md p-2"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="">-- Select --</option>
          <option value="stripe">Stripe (Credit/Debit)</option>
          <option value="paypal">PayPal</option>
          <option value="telebirr">Telebirr</option>
          <option value="manual">Manual Payment</option>
        </select>
      </div>

      {/* Certificate Photo Upload */}
      <div className="mb-4 bg-blue-50 border border-blue-200 p-4 rounded-md">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upload Certificate Photo
        </label>
        <input
          type="file"
          accept="image/*"
          className="border p-2 w-full rounded-md"
          onChange={(e) => setCertificatePhoto(e.target.files[0])}
        />
        <p className="text-xs text-gray-600 mt-1 italic">
          This photo will be used in your share certificate when generated.
        </p>
      </div>

      {paymentMethod === 'manual' && (
        <div className="mt-4 bg-gray-100 p-4 rounded-xl shadow-inner">
          <h3 className="text-lg font-semibold mb-2">Manual Payment Instructions</h3>
          <p className="text-gray-700 mb-4">Please complete your payment and upload proof below.</p>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Payment Screenshot/Receipt</label>
            <input type="file" accept="image/*,application/pdf" className="border rounded-md p-2 w-full" onChange={(e) => setFile(e.target.files[0])} />
          </div>
          <p className="text-sm text-red-500 italic">Admin will verify your payment before issuing shares.</p>
        </div>
      )}

      <div className="flex items-center mt-4 mb-6">
        <input type="checkbox" id="terms" checked={termsAccepted} onChange={() => setTermsAccepted(!termsAccepted)} className="mr-2" />
        <label htmlFor="terms" className="text-sm text-gray-700">
          I agree to the{' '}
          <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline hover:text-indigo-800">Terms and Conditions</a>
        </label>
      </div>

      {paymentMethod === 'paypal' && termsAccepted && (
        <div className="my-4">
          <PayPalScriptProvider options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID || "ASFPqp8-G4p9LAyKKSgRTscG0x7ghadD9oGXqcVm-3Zp_eXxm37Ri80efnLIZ6l_WPd4KrjwppcqdPLh", currency: "USD" }}>
            <PayPalButtons
              style={{ layout: 'vertical', color: 'blue' }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [{
                    amount: {
                      value: totalWithFee.toFixed(2),
                    },
                    description: `${shares} Waliin Share(s)`,
                  }],
                });
              }}
              onApprove={async (data, actions) => {
                const details = await actions.order.capture();
                const token = sessionStorage.getItem('token');
                try {
                  const response = await axios.post(
                    'http://localhost:5050/api/purchase/paypal',
                    {
                      shares,
                      phone,
                      currency: 'USD',
                      totalPrice: totalPrice.toFixed(2),
                      gatewayFee: gatewayFee.toFixed(2),
                      totalWithFee: totalWithFee.toFixed(2),
                      paypalDetails: details,
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );

                  if (response.status === 201) {
                    sessionStorage.setItem('purchaseSummary', JSON.stringify({
                      shares,
                      totalWithFee: totalWithFee.toFixed(2),
                      paymentMethod,
                      receipt: response.data.receipt,
                    }));
                    toast.success('PayPal payment successful!');
                    navigate('/dashboard/purchase-success');
                  } else {
                    toast.error('Failed to record PayPal purchase.');
                  }
                } catch (err) {
                  console.error('PayPal post error:', err);
                  toast.error('Failed to save PayPal transaction.');
                }
              }}
              onError={(err) => {
                console.error('PayPal error', err);
                toast.error('PayPal payment failed.');
              }}
            />
          </PayPalScriptProvider>
        </div>
      )}

      {paymentMethod !== 'paypal' && (
        <button
          disabled={!shares || !paymentMethod || !termsAccepted || loading}
          onClick={handleCheckout}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md transition font-semibold disabled:opacity-50"
        >
          <FaMoneyBillWave />
          {loading ? 'Processing...' : 'Proceed to Checkout'}
        </button>
      )}
    </div>
  );
}



// old one 


// import React, { useState, useEffect } from 'react';
// import { jwtDecode } from 'jwt-decode';
// import { FaMoneyBillWave } from 'react-icons/fa';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

// export default function Buy() {
//   const [shares, setShares] = useState(0);
//   const [currency, setCurrency] = useState('USD');
//   const [pricePerShareUSD] = useState(100);
//   const [pricePerShareETB] = useState(5500);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [gatewayFee, setGatewayFee] = useState(0);
//   const [totalWithFee, setTotalWithFee] = useState(0);
//   const [phone, setPhone] = useState('');
//   const [paymentMethod, setPaymentMethod] = useState('');
//   const [termsAccepted, setTermsAccepted] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [file, setFile] = useState(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     try {
//       const token = sessionStorage.getItem('token');
//       const decoded = token ? jwtDecode(token) : null;
//       if (decoded?.phone) setPhone(decoded.phone);
//     } catch (err) {
//       console.error('Token decode error', err);
//     }
//   }, []);

//   useEffect(() => {
//     if (phone.startsWith('+251')) {
//       setCurrency('ETB');
//     } else {
//       setCurrency('USD');
//     }
//   }, [phone]);

//   useEffect(() => {
//     const price = shares * (currency === 'USD' ? pricePerShareUSD : pricePerShareETB);
//     setTotalPrice(price);
//   }, [shares, currency]);

//   useEffect(() => {
//     let fee = 0;
//     if (paymentMethod === 'stripe') fee = totalPrice * 0.029 + 0.3;
//     else if (paymentMethod === 'paypal') fee = totalPrice * 0.035;
//     else if (paymentMethod === 'telebirr') fee = totalPrice * 0.015;
//     setGatewayFee(fee);
//     setTotalWithFee(totalPrice + fee);
//   }, [totalPrice, paymentMethod]);

//   const handleCheckout = async () => {
//     try {
//       setLoading(true);
//       const formData = new FormData();
//       formData.append('phone', phone);
//       formData.append('shares', shares);
//       formData.append('currency', currency);
//       formData.append('paymentMethod', paymentMethod);
//       formData.append('totalPrice', totalPrice.toFixed(2));
//       formData.append('gatewayFee', gatewayFee.toFixed(2));
//       formData.append('totalWithFee', totalWithFee.toFixed(2));
//       formData.append('termsAccepted', termsAccepted);

//       if (paymentMethod === 'manual' && file) {
//         formData.append('screenshot', file);
//       }

//       const token = sessionStorage.getItem('token');

//       const response = await axios.post(
//         'http://localhost:5050/api/purchase',
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );

//       if (response.status === 201) {
//         sessionStorage.setItem(
//           'purchaseSummary',
//           JSON.stringify({
//             shares,
//             totalWithFee: totalWithFee.toFixed(2),
//             paymentMethod,
//             currency,
//           })
//         );

//         toast.success('Purchase successful!');
//         navigate('/dashboard/purchase-success');
//       } else {
//         toast.error('Something went wrong. Please try again.');
//       }
//     } catch (error) {
//       console.error('Purchase error:', error);
//       toast.error('Purchase failed. Check console for details.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md">
//       <h2 className="text-2xl font-bold mb-4 text-indigo-700">Buy Shares</h2>

//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700 mb-1">Registered Phone Number</label>
//         <input type="text" value={phone} readOnly className="w-full border rounded-md p-2 bg-gray-100" />
//       </div>

//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700 mb-1">Number of Shares</label>
//         <input type="number" min="1" value={shares} onChange={(e) => setShares(Number(e.target.value))} className="w-full border rounded-md p-2" />
//       </div>

//       <div className="mb-4">
//         <p className="text-lg">Price per Share: <span className="font-semibold">{currency === 'USD' ? `$${pricePerShareUSD}` : `${pricePerShareETB} ETB`}</span></p>
//         <p className="text-lg">Total Price: <span className="font-bold text-indigo-600">{currency === 'USD' ? `$${totalPrice.toFixed(2)}` : `${totalPrice.toFixed(2)} ETB`}</span></p>
//         {gatewayFee > 0 && (
//           <>
//             <p className="text-sm text-gray-600">+ Gateway Fee: <span className="text-red-500">{currency === 'USD' ? `$${gatewayFee.toFixed(2)}` : `${gatewayFee.toFixed(2)} ETB`}</span></p>
//             <p className="text-lg font-semibold mt-1">Final Total: <span className="text-green-600">{currency === 'USD' ? `$${totalWithFee.toFixed(2)}` : `${totalWithFee.toFixed(2)} ETB`}</span></p>
//           </>
//         )}
//       </div>

//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700 mb-1">Select Payment Method</label>
//         <select className="w-full border rounded-md p-2" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
//           <option value="">-- Select --</option>
//           <option value="stripe">Stripe (Credit/Debit)</option>
//           <option value="paypal">PayPal</option>
//           {currency === 'ETB' && <option value="telebirr">Telebirr (Ethiopia Only)</option>}
//           <option value="manual">Manual Payment</option>
//         </select>
//       </div>

//       {paymentMethod === 'manual' && (
//         <div className="mt-4 bg-gray-100 p-4 rounded-xl shadow-inner">
//           <h3 className="text-lg font-semibold mb-2">Manual Payment Instructions</h3>
//           <p className="text-gray-700 mb-4">Please complete your payment and upload proof below.</p>
//           <div className="mb-3">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Upload Payment Screenshot/Receipt</label>
//             <input type="file" accept="image/*,application/pdf" className="border rounded-md p-2 w-full" onChange={(e) => setFile(e.target.files[0])} />
//           </div>
//           <p className="text-sm text-red-500 italic">Admin will verify your payment before issuing shares.</p>
//         </div>
//       )}

//       <div className="flex items-center mt-4 mb-6">
//         <input type="checkbox" id="terms" checked={termsAccepted} onChange={() => setTermsAccepted(!termsAccepted)} className="mr-2" />
//         <label htmlFor="terms" className="text-sm text-gray-700">
//           I agree to the{' '}
//           <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline hover:text-indigo-800">Terms and Conditions</a>
//         </label>
//       </div>

//       <button
//         disabled={!shares || !paymentMethod || !termsAccepted || loading}
//         onClick={handleCheckout}
//         className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md transition font-semibold disabled:opacity-50"
//       >
//         <FaMoneyBillWave />
//         {loading ? 'Processing...' : 'Proceed to Checkout'}
//       </button>
//     </div>
//   );
// }


