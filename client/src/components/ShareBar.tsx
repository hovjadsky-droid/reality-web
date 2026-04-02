/**
 * ShareBar.tsx – Komponenta pro sdílení nemovitostí
 * Design: Modern Geometric Prestige
 * Sociální sítě: Facebook, WhatsApp, E-mail, Kopírování odkazu
 */

import { useState } from "react";
import { Facebook, MessageCircle, Mail, Copy, Check } from "lucide-react";
import { toast } from "sonner";

interface ShareBarProps {
  title: string;
  url: string;
  description?: string;
}

export default function ShareBar({ title, url, description }: ShareBarProps) {
  const [copied, setCopied] = useState(false);

  const shareText = `${title} – ${description || "Nemovitost na prodej"}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success("Odkaz zkopírován do schránky");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(shareText)}`;
    window.open(facebookUrl, "_blank", "width=600,height=400");
  };

  const handleShareWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${url}`)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleShareEmail = () => {
    const subject = `Zajímavá nemovitost: ${title}`;
    const body = `Podívej se na tuto nemovitost:\n\n${shareText}\n\n${url}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div>
      <div
        className="text-xs uppercase tracking-widest mb-4"
        style={{ color: "oklch(0.72 0.12 75)", fontFamily: "'Outfit', sans-serif" }}
      >
        Sdílení
      </div>
      <div className="flex flex-col gap-2">
        {/* Facebook */}
        <button
          onClick={handleShareFacebook}
          className="flex items-center gap-3 px-4 py-3 transition-all"
          style={{
            background: "oklch(0.97 0.005 240)",
            border: "1px solid oklch(0.92 0.004 286.32)",
            color: "oklch(0.18 0.04 240)",
            fontFamily: "'Outfit', sans-serif",
            fontSize: "0.9rem",
            fontWeight: 500,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "#1877F2";
            (e.currentTarget as HTMLButtonElement).style.color = "white";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#1877F2";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "oklch(0.97 0.005 240)";
            (e.currentTarget as HTMLButtonElement).style.color = "oklch(0.18 0.04 240)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "oklch(0.92 0.004 286.32)";
          }}
        >
          <Facebook size={16} />
          Facebook
        </button>

        {/* WhatsApp */}
        <button
          onClick={handleShareWhatsApp}
          className="flex items-center gap-3 px-4 py-3 transition-all"
          style={{
            background: "oklch(0.97 0.005 240)",
            border: "1px solid oklch(0.92 0.004 286.32)",
            color: "oklch(0.18 0.04 240)",
            fontFamily: "'Outfit', sans-serif",
            fontSize: "0.9rem",
            fontWeight: 500,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "#25D366";
            (e.currentTarget as HTMLButtonElement).style.color = "white";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#25D366";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "oklch(0.97 0.005 240)";
            (e.currentTarget as HTMLButtonElement).style.color = "oklch(0.18 0.04 240)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "oklch(0.92 0.004 286.32)";
          }}
        >
          <MessageCircle size={16} />
          WhatsApp
        </button>

        {/* E-mail */}
        <button
          onClick={handleShareEmail}
          className="flex items-center gap-3 px-4 py-3 transition-all"
          style={{
            background: "oklch(0.97 0.005 240)",
            border: "1px solid oklch(0.92 0.004 286.32)",
            color: "oklch(0.18 0.04 240)",
            fontFamily: "'Outfit', sans-serif",
            fontSize: "0.9rem",
            fontWeight: 500,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "oklch(0.72 0.12 75)";
            (e.currentTarget as HTMLButtonElement).style.color = "white";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "oklch(0.72 0.12 75)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "oklch(0.97 0.005 240)";
            (e.currentTarget as HTMLButtonElement).style.color = "oklch(0.18 0.04 240)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "oklch(0.92 0.004 286.32)";
          }}
        >
          <Mail size={16} />
          E-mail
        </button>

        {/* Copy link */}
        <button
          onClick={handleCopyLink}
          className="flex items-center gap-3 px-4 py-3 transition-all"
          style={{
            background: copied ? "oklch(0.55 0.15 145)" : "oklch(0.97 0.005 240)",
            border: copied ? "1px solid oklch(0.55 0.15 145)" : "1px solid oklch(0.92 0.004 286.32)",
            color: copied ? "white" : "oklch(0.18 0.04 240)",
            fontFamily: "'Outfit', sans-serif",
            fontSize: "0.9rem",
            fontWeight: 500,
          }}
          onMouseEnter={(e) => {
            if (!copied) {
              (e.currentTarget as HTMLButtonElement).style.background = "oklch(0.18 0.04 240)";
              (e.currentTarget as HTMLButtonElement).style.color = "white";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "oklch(0.18 0.04 240)";
            }
          }}
          onMouseLeave={(e) => {
            if (!copied) {
              (e.currentTarget as HTMLButtonElement).style.background = "oklch(0.97 0.005 240)";
              (e.currentTarget as HTMLButtonElement).style.color = "oklch(0.18 0.04 240)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "oklch(0.92 0.004 286.32)";
            }
          }}
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? "Zkopírováno" : "Kopírovat odkaz"}
        </button>
      </div>
    </div>
  );
}
