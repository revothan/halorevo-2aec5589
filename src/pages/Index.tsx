import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Minus, Square, X } from "lucide-react";

const Index = () => {
  return (
    <main className="bg-rich-black min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto glass-card overflow-hidden border border-white/10">
        {/* Window Controls */}
        <div className="flex items-center justify-between bg-rich-gray/80 px-4 py-2 border-b border-white/10">
          <div className="text-sm text-white/70">portfolio.exe</div>
          <div className="flex gap-2">
            <button className="p-1 hover:bg-white/10 rounded">
              <Minus className="w-4 h-4" />
            </button>
            <button className="p-1 hover:bg-white/10 rounded">
              <Square className="w-4 h-4" />
            </button>
            <button className="p-1 hover:bg-white/10 rounded">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="overflow-y-auto">
          <Hero />
          <Services />
        </div>
      </div>
    </main>
  );
};

export default Index;