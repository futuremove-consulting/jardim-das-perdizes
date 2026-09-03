import { buildWhatsAppLink } from "@/lib/leads/whatsapp";

/** WhatsApp brand green (same as the floating FAB). */
const WA_GREEN = "#25D36F";

const WHATSAPP_SVG = (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="white" aria-hidden="true">
    <path d="M12.04 2.01C6.48 2.01 2 6.49 2 12.07c0 2.67 1.94 4.9 4.56 5.58-.03-.46-.09-.92-.09-1.38 0-.35.03-.7.08-1.05-3.17-.67-5.55-3.05-5.55-5.65 0-2.33 1.42-4.38 3.44-5.28-.3-.71-.9-1.38-1.68-1.38-.93 0-1.67.75-1.67 1.67 0 .78.32 1.48.83 1.98-.37.15-1.13.43-1.35 1.53-.08.4-.12.8-.12 1.2 0 .28.03.56.08.84 0 3.26 2.1 5.97 4.92 6.8-.2.17-.4.33-.66.43-.15.06-.31.09-.47.09-.37 0-.7-.1-1.02-.28.04-.77.16-1.52.36-2.26.02-.07.04-.14.04-.21 0-.28-.22-.51-.51-.51s-.51.23-.51.51c0 .28-.22 .51-.51 .51s-.51-.22-.51-.51c0-.28-.22-.51-.51-.51s-.51 .23-.51 .51c0 .28-.22 .51-.51 .51s-.51-.22-.51-.51c-.02-.28-.22-.51-.51-.51s-.51 .23-.51 .51c0 .28-.22 .51-.51 .51s-.51-.22-.51-.51c0-.02 0-.04-.01-.06-.01-.01-.01-.03-.01-.04-2.41-.59-4.1-2.62-4.1-5.09C2 7.82 6.71 3 12.04 3c1.66 0 3.26.41 4.65 1.17.08.05.16.09.24.15-.03.09-.05.18-.08.27-.19-.11-.39-.21-.59-.3-.21-.09-.42-.16-.62-.21.02-.06.05-.13.07-.19.2-.57.46-1.13.5-1.77.01-.07.01-.14.01-.21C19.99 3.32 16.42 2 12.04 2.01Z" />
  </svg>
);

/**
 * Mobile-only sticky bottom CTA (reference pattern — iApartamentos / Tecnisa):
 * a always-visible bar with the form CTA + WhatsApp door on small screens.
 * Server-rendered: the WhatsApp link is deterministic from the env config.
 */
export default function StickyCtaBar() {
  const waHref = buildWhatsAppLink() ?? null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 px-4 py-3 backdrop-blur sm:hidden">
      <div className="flex items-center gap-3">
        <a
          href="#conversao"
          className="flex-1 rounded-full bg-brand px-4 py-3 text-center text-sm font-semibold text-brand-contrast transition-colors hover:opacity-90"
        >
          Quero mais informações
        </a>
        {waHref && (
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar com especialista pelo WhatsApp"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-105"
            style={{ backgroundColor: WA_GREEN }}
          >
            {WHATSAPP_SVG}
          </a>
        )}
      </div>
    </div>
  );
}
