
import { motion } from "framer-motion";
import { FAQItemProps } from "@/types";

export const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => (
  <motion.div
    whileHover={{ scale: 1.01 }}
    className="bg-rich-gray/20 p-6 rounded-lg"
  >
    <h3 className="text-xl font-semibold text-white mb-2">{question}</h3>
    <p className="text-gray-300">{answer}</p>
  </motion.div>
);

export const FAQSection: React.FC = () => (
  <div className="py-16 px-4 bg-rich-gray/10">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-white">
        Pertanyaan yang Sering Diajukan
      </h2>
      <div className="space-y-6">
        <FAQItem
          question="Apa perbedaan antara paket sekali bayar dan paket berlangganan?"
          answer="Pengembangan sekali bayar sangat cocok jika Anda membutuhkan website baru yang dibangun dari awal. Paket berlangganan kami (Dasar & Pro) menawarkan pengembangan berkelanjutan tanpa batas, sempurna untuk bisnis yang membutuhkan pembaruan rutin dan peningkatan berkelanjutan."
        />
        <FAQItem
          question="Apa yang termasuk dalam permintaan redesain website?"
          answer="Setiap permintaan dapat mencakup perubahan tata letak, pembaruan konten, fitur baru, atau modifikasi gaya. Kami menangani semuanya mulai dari pembaruan teks sederhana hingga redesain halaman lengkap."
        />
        <FAQItem
          question="Bisakah saya membatalkan langganan kapan saja?"
          answer="Ya, Anda dapat membatalkan langganan kapan saja tanpa pertanyaan. Anda akan terus memiliki akses hingga akhir periode penagihan Anda."
        />
      </div>
    </div>
  </div>
);
