"use client";

import { config } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type LoadingScreenProps = {
  isLoading: boolean;
};

const LoadingScreen = ({ isLoading }: LoadingScreenProps) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#fcf7f3]"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="flex flex-col items-center"
          >
            <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-widest text-[#3A2A1F] relative">
              {config.brandName}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C8A165]/30 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </h1>
            <div className="mt-8 relative h-12 w-12">
              <motion.div
                className="absolute inset-0 rounded-full border-t-2 border-r-2 border-[#C8A165]"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-2 rounded-full border-b-2 border-l-2 border-[#3A2A1F]/30"
                animate={{ rotate: -360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
