import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import Logo from "@/components/Logo";
import { siteConfig } from "@/config/site";
import { socialLinks } from "@/data/about";

export default function Footer() {
  return (
    <footer className="border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-8">
        {/* Brand */}
        <div className="flex flex-col items-center text-center mb-10">
          <Logo size={64} className="mb-3" />
          <h3 className="text-text-primary font-semibold text-lg">{siteConfig.name.brand}</h3>
          <p className="text-text-muted text-sm mt-1">{siteConfig.tagline}</p>
        </div>

        {/* Newsletter */}
        {siteConfig.enableNewsletter && (
          <div className="max-w-xl mx-auto mb-12">
            <p className="text-text-secondary text-sm mb-3">Want to know when I publish new content?</p>
            <p className="text-text-muted text-xs mb-4">Enter your email to join my free newsletter</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="me@example.com"
                className="flex-1 bg-bg-card border border-border rounded px-4 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-yellow transition-colors"
              />
              <button className="bg-accent-yellow text-bg-primary px-4 py-2 rounded font-medium text-sm hover:brightness-110 transition-all flex items-center gap-1">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Navigation + Social */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-3">
            <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-text-primary transition-colors" aria-label="GitHub">
              <Github size={18} />
            </a>
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-text-primary transition-colors" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href={socialLinks.email} className="text-text-muted hover:text-text-primary transition-colors" aria-label="Email">
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-border text-center text-xs text-text-muted">
          <p>
            © {siteConfig.startYear}–present {siteConfig.name.brand}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
