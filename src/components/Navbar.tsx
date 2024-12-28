import { Minus, Square, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between bg-rich-gray px-4 py-2 border-b border-rich-gray/30">
      <div className="text-sm text-rich-gold/70 font-mono">
        halo-revo.exe
      </div>
      <div className="flex items-center gap-4">
        <Link to="/blog">
          <Button variant="ghost" className="text-rich-gold/70 hover:text-rich-gold">
            Blog
          </Button>
        </Link>
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