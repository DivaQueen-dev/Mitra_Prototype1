import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useTheme } from "@/hooks/useTheme";
import ChatBot from "@/components/app/ChatBot";

import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AppLayout from "./components/app/AppLayout";
import Home from "./pages/app/Home";
import Features from "./pages/app/Features";
import AppResources from "./pages/app/Resources";
import Community from "./pages/app/Community";
import Groups from "./pages/app/Groups";
import AcademicDashboard from "./pages/app/AcademicDashboard";
import About from "./pages/app/About";
import Contact from "./pages/app/Contact";
import Profile from "./pages/app/Profile";

// Admin imports
import AdminSignIn from "./pages/AdminSignIn";
import AdminSignUp from "./pages/AdminSignUp";
import AdminLayout from "./components/admin/AdminLayout";
import Overview from "./pages/admin/Overview";
import Students from "./pages/admin/Students";
import AdminResources from "./pages/admin/Resources";
import Forum from "./pages/admin/Forum";
import Reports from "./pages/admin/Reports";



const App = () => {
  // Initialize theme system
  useTheme();
  
  return (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      
      {/* Student App Routes */}
      <Route path="/app" element={<AppLayout />}>
        <Route path="home" element={<Home />} />
        <Route path="features" element={<Features />} />
        <Route path="resources" element={<AppResources />} />
        <Route path="community" element={<Community />} />
        <Route path="groups" element={<Groups />} />
        <Route path="academic" element={<AcademicDashboard />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      
      {/* Admin Routes */}
      <Route path="/admin/signin" element={<AdminSignIn />} />
      <Route path="/admin/signup" element={<AdminSignUp />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="overview" element={<Overview />} />
        <Route path="students" element={<Students />} />
        <Route path="resources" element={<AdminResources />} />
        <Route path="forum" element={<Forum />} />
        <Route path="reports" element={<Reports />} />
      </Route>
      
      <Route path="*" element={<NotFound />} />
    </Routes>
    
    {/* Global Personal AI ChatBot - available on all pages */}
    <ChatBot />
  </TooltipProvider>
  );
};

export default App;
