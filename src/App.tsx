import React, { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";

// Lazy load route components
const Index = lazy(() => import("./pages/Index"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Login = lazy(() => import("./pages/Login"));
const AdminBlogEditor = lazy(() => import("./pages/AdminBlogEditor"));
const BugReport = lazy(() => import("./pages/BugReport"));
const FreeTrial = lazy(() => import("./pages/FreeTrial"));
const FreeTrialLanding = lazy(() => import("./pages/FreeTrialLanding"));
const AffiliateSignup = lazy(() => import("./pages/AffiliateSignup"));
const AffiliateDashboard = lazy(() => import("./pages/AffiliateDashboard"));

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <Loader2 className="w-8 h-8 animate-spin text-rich-gold" />
  </div>
);

// Create a new QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
    },
  },
});

const App = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <SessionContextProvider supabaseClient={supabase}>
            <TooltipProvider>
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:id" element={<BlogPost />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/admin/blog/new" element={<AdminBlogEditor />} />
                  <Route
                    path="/admin/blog/edit/:id"
                    element={<AdminBlogEditor />}
                  />
                  <Route path="/bug-report" element={<BugReport />} />
                  <Route path="/free-trial" element={<FreeTrialLanding />} />
                  <Route path="/free-trial/form" element={<FreeTrial />} />
                  <Route path="/affiliate/signup" element={<AffiliateSignup />} />
                  <Route path="/affiliate/dashboard" element={<AffiliateDashboard />} />
                </Routes>
              </Suspense>
              <Toaster />
              <Sonner />
            </TooltipProvider>
          </SessionContextProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default App;