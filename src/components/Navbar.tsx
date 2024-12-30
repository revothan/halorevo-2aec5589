import { Minus, Square, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSessionContext } from "@supabase/auth-helpers-react";

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { session } = useSessionContext();

  return (
    <div className="flex items-center justify-between bg-rich-gray px-4 py-2 border-b border-rich-gray/30">
      <div className="text-sm text-rich-gold/70 font-mono">
        {isHome ? "halo-revo.exe" : "halo-revo-blog.exe"}
      </div>
      <div className="flex items-center gap-4">
        {isHome ? (
          <>
            <Link to="/blog">
              <Button
                variant="ghost"
                className="text-rich-gold/70 hover:text-rich-gold hover:bg-rich-gray/50"
              >
                Blog
              </Button>
            </Link>
            {session && (
              <Link to="/bug-report">
                <Button
                  variant="ghost"
                  className="text-rich-gold/70 hover:text-rich-gold hover:bg-rich-gray/50"
                >
                  Report Bug
                </Button>
              </Link>
            )}
            {!session && (
              <Link to="/login">
                <Button
                  variant="ghost"
                  className="text-rich-gold/70 hover:text-rich-gold hover:bg-rich-gray/50"
                >
                  Log In
                </Button>
              </Link>
            )}
          </>
        ) : (
          <>
            <Link to="/">
              <Button
                variant="ghost"
                className="text-rich-gold/70 hover:text-rich-gold hover:bg-rich-gray/50"
              >
                Home
              </Button>
            </Link>
            {session && (
              <Link to="/bug-report">
                <Button
                  variant="ghost"
                  className="text-rich-gold/70 hover:text-rich-gold hover:bg-rich-gray/50"
                >
                  Report Bug
                </Button>
              </Link>
            )}
            {!session && (
              <Link to="/login">
                <Button
                  variant="ghost"
                  className="text-rich-gold/70 hover:text-rich-gold hover:bg-rich-gray/50"
                >
                  Log In
                </Button>
              </Link>
            )}
          </>
        )}
        <div className="flex gap-2">
          <button className="p-1 hover:bg-rich-gray/50 rounded">
            <Minus className="w-4 h-4 text-rich-gold/70" />
          </button>
          <button className="p-1 hover:bg-rich-gray/50 rounded">
            <Square className="w-4 h-4 text-rich-gold/70" />
          </button>
          <button className="p-1 hover:bg-rich-gray/50 rounded">
            <X className="w-4 h-4 text-rich-gold/70" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;