import { Link } from "@tanstack/react-router";
import { Bot, ChevronDown, MessageCircle, Send, Sparkles, X } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";

type Message = {
  id: number;
  role: "assistant" | "user";
  text: string;
};

const quickPrompts = [
  "Which service fits me?",
  "Tell me about VASP compliance",
  "How do investigations work?",
  "I need training",
];

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    text: "Hi, I'm Nuru Assistant. I can help you find the right NuruTrace service, explain blockchain forensics, or point you to the contact team.",
  },
];

function buildReply(input: string) {
  const text = input.toLowerCase();

  if (text.includes("vasp") || text.includes("compliance") || text.includes("exchange")) {
    return "For VASP compliance, NuruTrace supports crypto businesses with Kenya VASPs Act 2025 readiness, registration support, AML policy drafting, monitoring workflows, and ongoing compliance advisory. The best next step is a short demo call so the team can map your operating model.";
  }

  if (
    text.includes("investigation") ||
    text.includes("forensic") ||
    text.includes("trace") ||
    text.includes("wallet") ||
    text.includes("stolen")
  ) {
    return "For investigations, NuruTrace helps trace wallet activity, analyse transaction flows, prepare forensic reports, and support law-enforcement or private case work. For urgent law-enforcement matters, email info@nurutrace.co.ke and include [URGENT-LEA] in the subject.";
  }

  if (
    text.includes("train") ||
    text.includes("education") ||
    text.includes("lawyer") ||
    text.includes("judge") ||
    text.includes("university")
  ) {
    return "For training, NuruTrace offers legal education, crypto fundamentals, admissibility guidance, and research or academic programmes for lawyers, judges, universities, and policy teams.";
  }

  if (text.includes("bank") || text.includes("mfi") || text.includes("financial")) {
    return "For banks and financial institutions, NuruTrace advises on crypto-rail exposure, risk scoring, sanctions screening, transaction monitoring, and controls for on-ramps, off-ramps, and payment flows.";
  }

  if (text.includes("price") || text.includes("cost") || text.includes("fee")) {
    return "Pricing depends on the engagement. Investigations and tech solutions are usually project-based, while compliance programmes often use monthly retainers. The contact form is the fastest way to get a scoped estimate.";
  }

  if (text.includes("contact") || text.includes("email") || text.includes("demo")) {
    return "You can request a demo through the contact page or email info@nurutrace.co.ke. The team responds within one business day.";
  }

  return "NuruTrace works across blockchain forensics, VASP compliance, bank and MFI advisory, private investigations, legal education, research, and applied blockchain solutions. Tell me your role or the problem you're solving, and I'll point you to the closest service.";
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const widgetRef = useRef<HTMLDivElement>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen, messages]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!widgetRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();

    if (!trimmed) {
      return;
    }

    setMessages((current) => [
      ...current,
      { id: Date.now(), role: "user", text: trimmed },
      { id: Date.now() + 1, role: "assistant", text: buildReply(trimmed) },
    ]);
    setInput("");
    setIsOpen(true);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(input);
  };

  return (
    <div
      ref={widgetRef}
      className="fixed bottom-5 right-5 z-[60] flex max-w-[calc(100vw-2.5rem)] flex-col items-end gap-3 sm:bottom-6 sm:right-6"
    >
      {isOpen && (
        <section
          aria-label="NuruTrace chatbot"
          className="w-[min(380px,calc(100vw-2.5rem))] overflow-hidden rounded-lg border border-[var(--border)] bg-white shadow-[0_24px_70px_-28px_rgba(10,22,40,0.55)]"
        >
          <div className="flex items-start justify-between gap-4 bg-[var(--navy-900)] px-4 py-4 text-white">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-[var(--gold-500)] text-[var(--navy-900)]">
                <Bot size={20} />
              </div>
              <div>
                <h2 className="font-sans text-sm font-semibold">Nuru Assistant</h2>
                <p className="mt-0.5 text-xs text-white/65">Online guidance</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="grid h-8 w-8 place-items-center rounded-md text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close chatbot"
            >
              <X size={17} />
            </button>
          </div>

          <div className="max-h-[360px] space-y-3 overflow-y-auto bg-[var(--cream-50)] px-4 py-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[86%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
                    message.role === "user"
                      ? "bg-[var(--navy-900)] text-white"
                      : "border border-[var(--border)] bg-white text-[var(--grey-700)]"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>

          <div className="border-t border-[var(--border)] bg-white p-4">
            <div className="mb-3 flex flex-wrap gap-2">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => sendMessage(prompt)}
                  className="rounded-md border border-[var(--border)] px-2.5 py-1.5 text-xs font-medium text-[var(--navy-900)] transition-colors hover:border-[var(--gold-500)] hover:bg-[var(--cream-50)]"
                >
                  {prompt}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2">
              <label htmlFor="nuru-chat-message" className="sr-only">
                Message
              </label>
              <input
                id="nuru-chat-message"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about services..."
                className="min-w-0 flex-1 rounded-md border border-[var(--border)] px-3 py-2 text-sm text-[var(--navy-900)] outline-none transition-colors placeholder:text-[var(--grey-700)]/70 focus:border-[var(--gold-500)]"
              />
              <button
                type="submit"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-[var(--gold-500)] text-[var(--navy-900)] transition-colors hover:bg-[var(--gold-300)]"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </form>

            <div className="mt-3 flex items-center justify-between gap-3 text-xs text-[var(--grey-700)]">
              <span className="inline-flex items-center gap-1.5">
                <Sparkles size={13} className="text-[var(--gold-500)]" />
                Guidance only
              </span>
              <Link
                to="/contact"
                className="font-semibold text-[var(--navy-900)] underline-offset-4 hover:underline"
              >
                Request a demo
              </Link>
            </div>
          </div>
        </section>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="inline-flex h-14 items-center gap-3 rounded-full bg-[var(--gold-500)] px-4 font-semibold text-[var(--navy-900)] shadow-[0_16px_44px_-16px_rgba(10,22,40,0.65)] transition-all hover:bg-[var(--gold-300)] hover:shadow-[0_18px_52px_-14px_rgba(10,22,40,0.75)]"
        aria-label={isOpen ? "Minimize chatbot" : "Open chatbot"}
        aria-expanded={isOpen}
      >
        <MessageCircle size={22} />
        <span className="hidden text-sm sm:inline">Chat with us</span>
        {isOpen && <ChevronDown size={18} />}
      </button>
    </div>
  );
}
