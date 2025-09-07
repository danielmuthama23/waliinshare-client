import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import SignupSuccess from './pages/SignupSuccess';
import ProtectedRoute from './components/ProtectedRoute';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Blog from './pages/Blog';
import FAQ from './pages/FAQ';
import Terms from './pages/Terms';

// Dashboard pages
import DashboardLayout from './pages/Dashboard/DashboardLayout';
import DashboardHome from './pages/Dashboard/DashboardHome';
import MyShares from './pages/Dashboard/MyShares';
import Buy from './pages/Dashboard/Buy';
import Transfer from './pages/Dashboard/Transfer';
import Sell from './pages/Dashboard/Sell';
import Analytics from './pages/Dashboard/Analytics';
import Profile from './pages/Dashboard/Profile';
import PurchaseSuccess from './pages/Dashboard/PurchaseSuccess';
import PendingTransfers from './pages/Dashboard/PendingTransfers';

// Admin Dashboard pages
import AdminDashboard from './pages/Admin/AdminDashboard';
import Users from './pages/Admin/Users';
import SubAdmins from './pages/Admin/SubAdmins';
import CompanyValue from './pages/Admin/CompanyValue';

import Documents from './pages/Admin/Documents';
import BuySellApproval from './pages/Admin/BuySellApproval';
import TransferShare from './pages/Admin/TransferShare';
import UnderageShareholders from './pages/Admin/UnderageShareholders';
import BlogManager from './pages/Admin/BlogManager';
import BlogCreate from './pages/Admin/BlogCreate.jsx';
import BlogEdit from './pages/Admin/BlogEdit.jsx';
// import AdminAnalytics from './pages/Admin/Analytics';
import Payments from './pages/Admin/Payments';
// import RevenueCut from './pages/Admin/RevenueCut';
// import ChatManager from './pages/Admin/ChatManager';

import SingleBlog from './pages/SingleBlog';

export default function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>

        {/* Public Routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blogs/:id" element={<SingleBlog />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signupsuccess" element={<SignupSuccess />} />
          <Route path="/terms" element={<Terms />} />
        </Route>

        {/* Protected User Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="myshares" element={<MyShares />} />
          <Route path="buy" element={<Buy />} />
          <Route path="transfer" element={<Transfer />} />
          <Route path="sell" element={<Sell />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="profile" element={<Profile />} />
          <Route path="purchase-success" element={<PurchaseSuccess />} />          
          <Route path="pending-transfers" element={<PendingTransfers />} />
        </Route>

        {/* Admin Routes */}

        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="users" element={<Users />} />
         <Route path="subadmins" element={<SubAdmins />} />

           <Route path="company-value" element={<CompanyValue />} />
           <Route path="buy-sell" element={<BuySellApproval />} />

           <Route path="documents" element={<Documents />}/>
           <Route path="blogs" element={<BlogManager />} />
           <Route path="/admin/create-blog" element={<BlogCreate />} />
          <Route path="/admin/edit-blog/:id" element={<BlogEdit />} />
          <Route path="payments" element={<Payments />} />
          <Route path="underage" element={<UnderageShareholders />} />
          <Route path="transfer" element={<TransferShare />} />


          
          {/* 
          
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="revenue" element={<RevenueCut />} />
          <Route path="chat" element={<ChatManager />} />   */}
        </Route>

      </Routes>
    </Router>
  );
}