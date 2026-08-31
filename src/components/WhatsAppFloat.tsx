import { getWhatsappLink } from "@/config/site";

export function WhatsAppFloat() {
  return (
    <a
      href={getWhatsappLink("geral")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp com Júlia Pinheiro"
      className="focus-ring group fixed bottom-5 right-5 z-40 flex h-14 items-center rounded-full bg-green text-cream shadow-[0_10px_30px_-8px_rgba(20,42,32,0.5)] transition-colors hover:bg-green-deep sm:bottom-7 sm:right-7"
    >
      <span className="flex h-14 w-14 shrink-0 items-center justify-center">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
        >
          <path
            d="M12 3a9 9 0 0 0-7.75 13.53L3 21l4.6-1.22A9 9 0 1 0 12 3Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.5 9.3c0-.4.3-.8.7-.8h.6c.3 0 .6.2.7.5l.4 1.2c.1.3 0 .6-.2.8l-.4.4c.4.9 1.1 1.6 2 2l.4-.4c.2-.2.5-.3.8-.2l1.2.4c.3.1.5.4.5.7v.6c0 .4-.4.7-.8.7-2.9 0-5.9-3-5.9-5.9Z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="max-w-0 overflow-hidden whitespace-nowrap pr-0 text-sm font-semibold opacity-0 transition-all duration-300 group-hover:max-w-[140px] group-hover:pr-5 group-hover:opacity-100">
        Falar no WhatsApp
      </span>
    </a>
  );
}
