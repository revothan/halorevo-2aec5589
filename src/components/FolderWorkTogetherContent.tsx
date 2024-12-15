import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { motion } from "framer-motion";

interface FolderWorkTogetherContentProps {
  onClose: () => void;
}

export const FolderWorkTogetherContent = ({ onClose }: FolderWorkTogetherContentProps) => {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"on-boarding-meeting"});
      cal("ui", {
        "theme": "dark",
        "hideEventTypeDetails": false,
        "layout": "month_view"
      });
    })();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 text-gradient">Schedule a Meeting</h2>
        <p className="text-rich-gold/80 text-lg">Let's discuss how we can work together!</p>
      </div>
      
      <div className="h-[600px] w-full">
        <Cal 
          namespace="on-boarding-meeting"
          calLink="revosiagian/on-boarding-meeting"
          style={{width:"100%", height:"100%", overflow:"scroll"}}
          config={{
            layout: "month_view",
            theme: "dark"
          }}
        />
      </div>
    </motion.div>
  );
};