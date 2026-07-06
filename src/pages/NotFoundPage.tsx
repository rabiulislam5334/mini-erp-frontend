import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FileQuestion, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FileQuestion className="mx-auto h-12 w-12 text-primary" />
        <p className="mt-6 font-display text-6xl font-semibold tracking-tight">
          404
        </p>
        <h1 className="mt-3 text-xl font-semibold">Page not found</h1>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          The page you're looking for doesn't exist, or the link is out of date.
        </p>
        <Button className="mt-8" onClick={() => navigate("/")}>
          <ArrowLeft className="mr-1.5 h-4 w-4" />
          Back to home
        </Button>
      </motion.div>
    </div>
  );
}
