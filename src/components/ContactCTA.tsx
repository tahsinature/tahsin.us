import { Mail, Github } from "lucide-react";
import { getSocial } from "@/data/social-profiles";
import { FadeIn, motion } from "@/components/MotionWrapper";

export default function ContactCTA() {
  return (
    <FadeIn>
      <div className="bg-gradient-to-br from-card to-secondary border border-border rounded-lg p-10 md:p-14 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Let's connect</h2>
        <p className="text-muted-foreground max-w-lg mx-auto mb-8 leading-relaxed">
          I'm always up for interesting conversations — whether it's about engineering, open source, or ideas worth building.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <motion.a
            href={getSocial("email")?.href}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded font-semibold text-sm hover:brightness-110 transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
          >
            <Mail size={16} />
            Get in touch
          </motion.a>
          <motion.a
            href={getSocial("github")?.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 px-6 py-3 rounded font-medium text-sm transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
          >
            <Github size={16} />
            View GitHub
          </motion.a>
        </div>
      </div>
    </FadeIn>
  );
}
