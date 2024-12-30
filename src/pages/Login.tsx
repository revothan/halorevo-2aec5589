import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

const Login = () => {
  const { session } = useSessionContext();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (session) {
      navigate(from);
    }
  }, [session, navigate, from]);

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-rich-black min-h-screen p-4 md:p-8"
    >
      <div className="max-w-7xl mx-auto glass-card border border-rich-gray/30 relative">
        <div className="sticky top-0 z-50">
          <Navbar />
        </div>
        <div className="px-6 pt-36 pb-12 md:px-16 lg:px-24">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 text-center"
            >
              <h1 className="text-4xl font-bold bg-gradient-to-r from-rich-gold to-rich-gold/70 bg-clip-text text-transparent mb-4">
                Welcome Back
              </h1>
              <p className="text-rich-gold/70">
                Sign in to access all features and submit bug reports
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass-card p-8"
            >
              <Auth
                supabaseClient={supabase}
                appearance={{
                  theme: ThemeSupa,
                  variables: {
                    default: {
                      colors: {
                        brand: "#B8860B",
                        brandAccent: "#DAA520",
                        inputBackground: "rgb(30, 30, 30)",
                        inputText: "rgb(211, 211, 211)",
                        inputBorder: "rgb(60, 60, 60)",
                        inputBorderFocus: "#B8860B",
                        inputBorderHover: "#DAA520",
                        defaultButtonBackground: "rgb(30, 30, 30)",
                        defaultButtonBackgroundHover: "rgb(40, 40, 40)",
                        defaultButtonBorder: "rgb(60, 60, 60)",
                        defaultButtonText: "rgb(211, 211, 211)",
                      },
                      space: {
                        inputPadding: "12px",
                        buttonPadding: "12px",
                      },
                      borderWidths: {
                        buttonBorderWidth: "1px",
                        inputBorderWidth: "1px",
                      },
                      radii: {
                        borderRadiusButton: "8px",
                        buttonBorderRadius: "8px",
                        inputBorderRadius: "8px",
                      },
                    },
                  },
                  className: {
                    container: "w-full",
                    button: "w-full",
                    input: "w-full",
                  },
                }}
                providers={[]}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.main>
  );
};

export default Login;