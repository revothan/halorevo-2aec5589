
import { motion } from "framer-motion";
import { Rocket } from "lucide-react";

export const FormHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-12 pt-8"
    >
      <div className="inline-flex items-center gap-2 bg-rich-purple/10 px-4 py-2 rounded-full mb-4">
        <Rocket className="w-4 h-4 text-rich-purple" />
        <span className="text-sm font-mono text-rich-purple">
          Penawaran Terbatas: Redesain Website Gratis
        </span>
      </div>
      <h1 className="text-4xl md:text-6xl font-bold mb-4">
        Transformasi <span className="text-gradient">Kehadiran Digital</span> Anda
      </h1>
      <p className="text-xl text-rich-gold/80 max-w-2xl mx-auto">
        Dapatkan redesain website profesional yang mengubah pengunjung menjadi pelanggan.
        Mulai perjalanan Anda hari ini!
      </p>
    </motion.div>
  );
};
