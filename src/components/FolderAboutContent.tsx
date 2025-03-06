
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ExternalLink } from "lucide-react";

export const FolderAboutContent = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="space-y-6 text-left">
      <div className="space-y-4">
        <p className="text-rich-gold/90 font-mono">
          Halo! Saya <span className="font-bold text-gradient">Revo Nathanael Siagian</span>, ahli teknologi ramah Anda. 
          Saya mengkhususkan diri dalam <span className="text-rich-purple">pembuatan website</span> dan <span className="text-rich-blue">otomatisasi proses digital</span>, 
          membantu bisnis mengatasi kekacauan dan menaklukkan dunia digital.
        </p>
        
        <p className="text-rich-gold/80 font-mono italic">
          Cerita saya? Yah, katakanlah saya sudah bekerja keras sejak masih memakai popok... hampir.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gradient font-mono">Garis Waktu Legendaris Revo:</h3>
        
        <motion.div 
          className="space-y-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          {[
            { year: "2004", text: "Lahir. Jelas ditakdirkan untuk kebesaran." },
            { year: "2010", text: "Belajar coding. Kenapa? Untuk mendapatkan nyawa tak terbatas dalam game. Spoiler: Tidak berhasil." },
            { year: "2018", text: "Mendirikan Designerku. Ya, anak SMA menjalankan bisnis desain. Saya bahkan memakai kacamata agar terlihat lebih profesional (meskipun tidak membutuhkannya)." },
            { year: "2022-2024", text: "Belajar Ilmu Komputer di Columbia College. Menjadi orang yang coding di kedai kopi." },
            { year: "2022", text: "Bekerja sebagai Koordinator Pemasaran di Baza Dance Studios, Indonesia. Fakta menarik: Saya bisa menjual kelas dansa seperti tidak ada yang bisa, tapi dua kaki kiri saya tetap tidak akan menari." },
            { year: "2023", text: "Meluncurkan Halo Revo—di mana saya menggabungkan keterampilan pemasaran dan teknologi saya menjadi satu mesin otomatisasi yang tak terhentikan." }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="flex gap-4 p-4 glass-card hover:bg-rich-gray/20 transition-colors"
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 }
              }}
            >
              <span className="text-rich-purple font-mono whitespace-nowrap">{item.year}</span>
              <p className="text-rich-gold/80 font-mono">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="space-y-4">
        <p className="text-rich-gold/80 font-mono">
          Ketika saya tidak membangun website atau mengotomatisasi proses, Anda bisa menemukan saya yang terpesona dengan tren teknologi, 
          makan terlalu banyak mie instan, atau berpura-pura menjadi DJ kelas dunia sambil coding dengan irama lo-fi.
        </p>
        
        <p className="text-rich-gold/80 font-mono">
          Penasaran? Siap bekerja sama?
        </p>

        <Button
          onClick={onClose}
          className="w-full font-mono group"
        >
          Lihat portfolio saya
          <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};
