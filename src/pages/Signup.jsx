import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/logo.jpg";
import axios from "../utils/axios";
import { Country, State, City } from "country-state-city";

export default function Signup() {
  const navigate = useNavigate();
  const [age, setAge] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "", email: "", password: "", confirmPassword: "",
    phone: "", phoneCode: "+1", dateOfBirth: "", address: "",
    photoID: null, country: "", state: "", city: "",
    guardianName: "", guardianRelationship: "", guardianContact: "",
  });

  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (!match) return value;
    let formatted = "";
    if (match[1]) formatted += `(${match[1]}`;
    if (match[2]) formatted += match[2].length === 3 ? `) ${match[2]}` : match[2];
    if (match[3]) formatted += `-${match[3]}`;
    return formatted;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photoID") {
      setFormData({ ...formData, photoID: files[0] });
    } else if (name === "country") {
      setFormData({ ...formData, country: value, state: "", city: "" });
      setErrors({ ...errors, country: "", state: "", city: "" });
      const selectedCountry = Country.getAllCountries().find((c) => c.isoCode === value);
      if (selectedCountry) {
        setFormData((prev) => ({ ...prev, phoneCode: `+${selectedCountry.phonecode}` }));
      }
    } else if (name === "state") {
      setFormData({ ...formData, state: value, city: "" });
      setErrors({ ...errors, state: "", city: "" });
    } else if (name === "phone") {
      const formattedPhone = formatPhoneNumber(value);
      setFormData({ ...formData, phone: formattedPhone });
      setErrors({ ...errors, phone: "" });
      return;
    } else {
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email address";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    else if (formData.confirmPassword !== formData.password) newErrors.confirmPassword = "Passwords do not match";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of Birth is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.photoID) newErrors.photoID = "Photo ID is required";

    if (age !== null && age < 18) {
      if (!formData.guardianName.trim()) newErrors.guardianName = "Guardian Name is required";
      if (!formData.guardianRelationship.trim()) newErrors.guardianRelationship = "Guardian Relationship is required";
      if (!formData.guardianContact.trim()) newErrors.guardianContact = "Guardian Contact is required";
      else if (!/^\+?\d{10,15}$/.test(formData.guardianContact)) newErrors.guardianContact = "Invalid guardian contact number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const data = new FormData();
      for (const key in formData) if (key !== "confirmPassword") data.append(key, formData[key]);
      const res = await axios.post(`${baseURL}/auth/signup`, data, { headers: { "Content-Type": "multipart/form-data" } });
      if (res.data.token) {
        sessionStorage.setItem("token", res.data.token);
        navigate("/signupsuccess", { state: { fullName: formData.fullName } });
      }
    } catch (err) {
      setErrors({ general: err.response?.data?.message || "Signup failed. Try again." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (formData.dateOfBirth) {
      const birthDate = new Date(formData.dateOfBirth);
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) calculatedAge--;
      setAge(calculatedAge);
    }
  }, [formData.dateOfBirth]);

  const countries = Country.getAllCountries();
  const states = formData.country ? State.getStatesOfCountry(formData.country) : [];
  const cities = formData.country && formData.state ? City.getCitiesOfState(formData.country, formData.state) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D2F4EA] via-[#B8E4F2] to-[#A3D8E7] dark:from-slate-900 dark:via-slate-950 dark:to-black text-gray-800 dark:text-slate-100 flex items-center justify-center px-4 py-10">
      <motion.div
        className="w-full max-w-2xl bg-white dark:bg-slate-900 p-8 rounded-lg shadow-md"
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Waliin Logo" className="h-12 mb-2" />
          <h2 className="text-3xl font-bold text-[#2F4DA2] dark:text-indigo-200">Create Your WaliinShare Account</h2>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4">
          {["fullName", "email", "dateOfBirth", "address"].map((field) => (
            <div key={field}>
              <input
                type={field === "dateOfBirth" ? "date" : "text"}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1")}
                value={formData[field]}
                onChange={handleChange}
                className={`px-4 py-2 border rounded-md w-full focus:outline-[#16896D] bg-white dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700 ${errors[field] ? "border-red-500" : ""}`}
              />
              {errors[field] && <p className="text-sm text-red-500">{errors[field]}</p>}
            </div>
          ))}

          <div>
            <select
              name="country" value={formData.country} onChange={handleChange}
              className={`px-4 py-2 border rounded-md w-full focus:outline-[#16896D] bg-white dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700 ${errors.country ? "border-red-500" : ""}`}
            >
              <option value="">Select Country</option>
              {countries.map((c) => <option key={c.isoCode} value={c.isoCode}>{c.name}</option>)}
            </select>
            {errors.country && <p className="text-sm text-red-500">{errors.country}</p>}
          </div>

          <div>
            <select
              name="state" value={formData.state} onChange={handleChange} disabled={!states.length}
              className={`px-4 py-2 border rounded-md w-full focus:outline-[#16896D] bg-white dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700 ${errors.state ? "border-red-500" : ""}`}
            >
              <option value="">Select State</option>
              {states.map((s) => <option key={s.isoCode} value={s.isoCode}>{s.name}</option>)}
            </select>
            {errors.state && <p className="text-sm text-red-500">{errors.state}</p>}
          </div>

          <div>
            <select
              name="city" value={formData.city} onChange={handleChange} disabled={!cities.length}
              className={`px-4 py-2 border rounded-md w-full focus:outline-[#16896D] bg-white dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700 ${errors.city ? "border-red-500" : ""}`}
            >
              <option value="">Select City</option>
              {cities.map((ci) => <option key={ci.name} value={ci.name}>{ci.name}</option>)}
            </select>
            {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
          </div>

          <div className="flex space-x-2">
            <input type="text" name="phoneCode" value={formData.phoneCode} readOnly className="px-4 py-2 border rounded-md w-24 bg-gray-100 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700" />
            <input
              type="text" name="phone" placeholder="Mobile Number" value={formData.phone} onChange={handleChange}
              className={`px-4 py-2 border rounded-md flex-1 focus:outline-[#16896D] bg-white dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700 ${errors.phone ? "border-red-500" : ""}`}
            />
          </div>
          {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}

          <div>
            <input
              type={showPassword ? "text" : "password"} name="password" placeholder="Create Password" value={formData.password} onChange={handleChange}
              className={`px-4 py-2 border rounded-md w-full focus:outline-[#16896D] bg-white dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700 ${errors.password ? "border-red-500" : ""}`}
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
          </div>

          <div>
            <input
              type={showPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange}
              className={`px-4 py-2 border rounded-md w-full focus:outline-[#16896D] bg-white dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700 ${errors.confirmPassword ? "border-red-500" : ""}`}
            />
            {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
            <div className="mt-1 text-sm text-gray-600 dark:text-gray-300 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "Hide Password" : "Show Password"}
            </div>
          </div>

          <div>
            <input
              type="file" name="photoID" accept="image/*" onChange={handleChange}
              className={`px-4 py-2 border rounded-md w-full focus:outline-[#16896D] bg-white dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700 ${errors.photoID ? "border-red-500" : ""}`}
            />
            {errors.photoID && <p className="text-sm text-red-500">{errors.photoID}</p>}
          </div>

          {age !== null && age < 18 && (
            <>
              <h4 className="text-lg font-semibold text-[#2F4DA2] dark:text-indigo-200 mt-4">Guardian Information (Required for Underage Users)</h4>
              <div>
                <input
                  type="text" name="guardianName" placeholder="Guardian Full Name" value={formData.guardianName} onChange={handleChange}
                  className={`px-4 py-2 border rounded-md w-full focus:outline-[#16896D] bg-white dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700 ${errors.guardianName ? "border-red-500" : ""}`}
                />
                {errors.guardianName && <p className="text-sm text-red-500">{errors.guardianName}</p>}
              </div>
              <div>
                <input
                  type="text" name="guardianRelationship" placeholder="Relationship with Guardian" value={formData.guardianRelationship} onChange={handleChange}
                  className={`px-4 py-2 border rounded-md w-full focus:outline-[#16896D] bg-white dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700 ${errors.guardianRelationship ? "border-red-500" : ""}`}
                />
                {errors.guardianRelationship && <p className="text-sm text-red-500">{errors.guardianRelationship}</p>}
              </div>
              <div>
                <input
                  type="text" name="guardianContact" placeholder="Guardian Contact Number" value={formData.guardianContact} onChange={handleChange}
                  className={`px-4 py-2 border rounded-md w-full focus:outline-[#16896D] bg-white dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700 ${errors.guardianContact ? "border-red-500" : ""}`}
                />
                {errors.guardianContact && <p className="text-sm text-red-500">{errors.guardianContact}</p>}
              </div>
            </>
          )}

          {errors.general && <p className="text-red-500 text-sm">{errors.general}</p>}

          <button type="submit" disabled={loading} className="bg-[#2F4DA2] hover:bg-[#1A3C85] text-white font-semibold py-2 rounded-md transition">
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 dark:text-gray-300 mt-4">
          Already have an account?{" "}
          <Link to="/signin" className="text-[#16896D] font-medium hover:underline">Sign in here</Link>
        </p>
      </motion.div>
    </div>
  );
}
