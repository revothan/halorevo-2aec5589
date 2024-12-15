import { motion } from "framer-motion";

interface FolderWorkTogetherContentProps {
  onClose: () => void;
}

export const FolderWorkTogetherContent = ({ onClose }: FolderWorkTogetherContentProps) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      <motion.div variants={item} className="w-full h-[80vh]">
        <div style={{width:"100%", height:"100%", overflow:"scroll"}} id="my-cal-inline"></div>
        <script type="text/javascript" dangerouslySetInnerHTML={{
          __html: `
            (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
            Cal("init", "on-boarding-meeting", {origin:"https://cal.com"});

            Cal.ns["on-boarding-meeting"]("inline", {
              elementOrSelector:"#my-cal-inline",
              config: {"layout":"month_view"},
              calLink: "revosiagian/on-boarding-meeting",
            });

            Cal.ns["on-boarding-meeting"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
          `
        }} />
      </motion.div>
    </motion.div>
  );
};