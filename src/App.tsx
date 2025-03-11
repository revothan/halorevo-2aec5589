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
const TaskDashboard = lazy(() => import("./pages/TaskDashboard"));
const FreeTrial = lazy(() => import("./pages/FreeTrial"));
const FreeTrialLanding = lazy(() => import("./pages/FreeTrialLanding"));
const AffiliateSignup = lazy(() => import("./pages/AffiliateSignup"));
const AffiliateDashboard = lazy(() => import("./pages/AffiliateDashboard"));
const Services = lazy(() => import("./pages/Services"));
const Success = lazy(() => import("./pages/Success"));

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
      retry: 1,
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

                  {/* Blog Routes */}
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/posts/:id" element={<BlogPost />} />

                  {/* Authentication Routes */}
                  <Route path="/login" element={<Login />} />

                  {/* Admin Routes */}
                  <Route path="/admin/blog/new" element={<AdminBlogEditor />} />
                  <Route
                    path="/admin/blog/edit/:id"
                    element={<AdminBlogEditor />}
                  />

                  {/* Dashboard Routes */}
                  <Route path="/dashboard" element={<TaskDashboard />} />

                  {/* Free Trial Routes */}
                  <Route path="/free-trial" element={<FreeTrialLanding />} />
                  <Route path="/free-trial/form" element={<FreeTrial />} />

                  {/* Affiliate Routes */}
                  <Route
                    path="/affiliate/signup"
                    element={<AffiliateSignup />}
                  />
                  <Route
                    path="/affiliate/dashboard"
                    element={<AffiliateDashboard />}
                  />

                  {/* Other Pages */}
                  <Route path="/services" element={<Services />} />
                  <Route path="/success" element={<Success />} />

                  {/* 404 Route - redirects to home page for now */}
                  <Route path="*" element={<Index />} />
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
