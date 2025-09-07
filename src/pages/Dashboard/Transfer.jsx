// client/src/pages/Dashboard/Transfer.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Transfer() {
  const [formData, setFormData] = useState({
    searchEmail: '',
    recipientFound: false,
    recipientName: '',
    recipientId: '',
    //sharesToTransfer: '',
    recipientFullName: '',
    recipientCountry: '',
    recipientCity: '',
    recipientAddress: '',
    recipientPhone: '',
    currentSharePrice: '',
    note: '',
    termsAccepted: false,
    setTermsAccepted :false,
  });

  const [sharesToTransfer, setSharesToTransfer] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [pricePerShareUSD] = useState(100);
  const [pricePerShareETB] = useState(5500);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

   useEffect(() => {
    const pricePerShare = currency === 'USD' ? pricePerShareUSD : pricePerShareETB;
    const shares = Number(sharesToTransfer) || 0;
  
    setFormData((prev) => ({
      ...prev,
      currentSharePrice: pricePerShare,
    }));
  
    setTotalPrice(shares * pricePerShare);
  }, [sharesToTransfer, currency]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // const handleSearch = () => {
  //   // Simulate recipient lookup
  //   setFormData({
  //     ...formData,
  //     recipientFound: true,
  //     recipientName: 'John Doe',
  //     recipientId: '123456789',
  //   });
  // };
const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5050/api/users/findByEmail/${formData.searchEmail}`);
  
      const user = response.data;
  
      setFormData(prev => ({
        ...prev,
        recipientFound: true,
        recipientName: user.fullName || user.name || 'Unknown',
        recipientId: user._id,
        recipientFullName: user.fullName, // pre-fill the name
        recipientCountry: user.country || '',
        recipientCity: user.city || '',
        recipientAddress: user.address || '',
        recipientPhone: user.phone || '',
      }));
    } catch (error) {
      alert('User not found. Please check the email or ask the user to register.');
      setFormData(prev => ({
        ...prev,
        recipientFound: false,
        recipientName: '',
        recipientId: '',
      }));
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!formData.termsAccepted) {
  //     alert('Please accept the terms and conditions.');
  //     return;
  //   }
  //   console.log('Transfer Submitted:', formData);
  //   alert('Share transfer request submitted! Awaiting recipient and admin approval.');
  // };
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.termsAccepted) {
    alert('Please accept the terms and conditions.');
    return;
  }
  const currentUserId = sessionStorage.getItem("userId");

  const transferPayload = {
    fromUserId: currentUserId,
    toUserId: formData.recipientId,
    toUserEmail: formData.searchEmail, // ✅ This must not be empty
    sharesToTransfer: Number(sharesToTransfer),
    pricePerShare: Number(formData.currentSharePrice),
    note: formData.note,
  };
  console.log("Sending transfer payload:", transferPayload); // 🧪 Debug

  
   try {
    await axios.post("http://localhost:5050/api/transfers", transferPayload);
    alert('Share transfer request submitted! Awaiting recipient and admin approval.');
    navigate('/dashboard');
    //navigate('/my-shares');
  } 
  catch (error) {
    console.error('Transfer Error:', error.response?.data || error.message);
    alert('Failed to submit transfer request.');
  }
};

  return (
    <motion.div
      className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-[#2F4DA2]">Transfer a Share</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <input
            type="email"
            name="searchEmail"
            value={formData.searchEmail}
            onChange={handleChange}
            placeholder="Recipient Email"
            className="flex-grow px-4 py-2 border rounded-md focus:outline-[#16896D]"
            required
          />
          <button
            type="button"
            onClick={handleSearch}
            className="bg-[#16896D] text-white px-4 rounded hover:bg-[#0e705a]"
          >
            Search
          </button>
        </div>

        {formData.recipientFound && (
          <>
            <div className="bg-gray-50 p-4 border rounded-md">
              <p><strong>Name:</strong> {formData.recipientName}</p>
              <p><strong>User ID:</strong> {formData.recipientId}</p>
            </div>

            <input
              type="text"
              name="recipientFullName"
              placeholder="Recipient Full Name"
              value={formData.recipientFullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-[#16896D]"
            />

            <input
              type="text"
              name="recipientCountry"
              placeholder="Recipient Country"
              value={formData.recipientCountry}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-[#16896D]"
            />

            <input
              type="text"
              name="recipientCity"
              placeholder="Recipient City"
              value={formData.recipientCity}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-[#16896D]"
            />

            <input
              type="text"
              name="recipientAddress"
              placeholder="Recipient Address"
              value={formData.recipientAddress}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-[#16896D]"
            />

            <input
              type="text"
              name="recipientPhone"
              placeholder="Recipient Phone Number"
              value={formData.recipientPhone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-[#16896D]"
            />
          </>
        )}
        {/* Currency Selection */}
        <div>
          <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
            Select Currency
          </label>
          <select
            name="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-[#16896D]"
          >
            <option value="USD">USD</option>
            <option value="ETB">ETB</option>
          </select>
        </div>

        <input
          type="number"
          name="sharesToTransfer"
          placeholder="Number of Shares"
          value={sharesToTransfer}
          onChange={(e) => setSharesToTransfer(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-[#16896D]"
        />

        <input
          type="number"
          name="currentSharePrice"
          placeholder="Current Share Price"
          value={formData.currentSharePrice}
          readOnly
          className="w-full px-4 py-2 border rounded-md focus:outline-[#16896D]"
        />
        <p className="text-lg font-semibold mt-2">
          Total Price: {currency === 'USD' ? `$${totalPrice}` : `${totalPrice} ETB`}
        </p>


        <textarea
          name="note"
          placeholder="Optional Note"
          value={formData.note}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-[#16896D]"
        />
  {/* Terms
  <div className="flex items-center mt-4 mb-6">
          <input type="checkbox" id="terms" checked={termsAccepted} onChange={() => setTermsAccepted(!termsAccepted)} className="mr-2" />
          <label htmlFor="terms" className="text-sm text-gray-700">
            I agree to the{' '}
            <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline hover:text-indigo-800">Terms and Conditions</a>
          </label>
        </div> */}
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleChange}
          />
          <span className="text-sm text-gray-700">
              I agree to the{' '}
              <Link
                to="/terms"
                className="text-[#2F4DA2] font-semibold underline hover:text-[#1d3b82]"
              >
                terms and conditions
              </Link>.
            </span>

        </label>

        <button
          type="submit"
          className="w-full bg-[#2F4DA2] text-white py-2 rounded-md hover:bg-[#1d3b82]"
        >
          Submit Transfer
        </button>
      </form>
    </motion.div>
  );
}