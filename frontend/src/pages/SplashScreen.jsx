import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen } from "lucide-react";

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 bg-gradient-to-br from-[#0a0f2c] via-[#0f1f47] to-[#1c295e] text-white flex flex-col items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8 } }}
        >
          {/* Icon + Text Animation Group */}
          <motion.div
            className="flex items-center gap-4 mb-3"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <BookOpen size={60} className="text-white drop-shadow-xl" />
            <motion.h1
              className="text-5xl md:text-6xl font-extrabold tracking-wide drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
            >
              LibraNet
            </motion.h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="text-lg text-white/80 tracking-wide"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            Lecture intelligente. Partage inspiré.
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
