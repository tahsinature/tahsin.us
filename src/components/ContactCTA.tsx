import { Mail, Github } from "lucide-react";
import { socialLinks } from "@/data/about";

export default function ContactCTA() {
  return (
    <div className="bg-gradient-to-br from-bg-card to-bg-secondary border border-border rounded-lg p-10 md:p-14 text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">Let's work together</h2>
      <p className="text-text-secondary max-w-lg mx-auto mb-6 leading-relaxed">Whether you have a project in mind, want to collaborate, or just want to say hi — my inbox is always open.</p>
      <div className="flex flex-wrap justify-center gap-3">
        <a href={socialLinks.email} className="inline-flex items-center gap-2 bg-accent-yellow text-bg-primary px-6 py-3 rounded font-semibold text-sm hover:brightness-110 transition-all">
          <Mail size={16} />
          Get in touch
        </a>
        <a
          href={socialLinks.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-bg-card border border-border text-text-secondary hover:text-text-primary hover:border-accent-yellow/40 px-6 py-3 rounded font-medium text-sm transition-all"
        >
          <Github size={16} />
          View GitHub
        </a>
      </div>
    </div>
  );
}
