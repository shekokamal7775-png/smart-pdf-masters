import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageSquare, Building2, Clock, Shield, CheckCircle } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { z } from "zod";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact SmartPDFMasters — Get Help, Report Issues & Share Feedback" },
      { name: "description", content: "Contact the SmartPDFMasters team for tool support, feedback, bug reports or partnership enquiries. We read every message and respond within one business day." },
      { name: "keywords", content: "contact SmartPDFMasters, PDF tools support, SmartPDFMasters help" },
      { property: "og:title", content: "Contact SmartPDFMasters — We'd Love to Hear From You" },
      { property: "og:description", content: "Get in touch with the SmartPDFMasters team. We respond to every message within one business day." },
      { property: "og:url", content: "https://www.smartpdfmasters.com/contact" },
    ],
    links: [{ rel: "canonical", href: "https://www.smartpdfmasters.com/contact" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: "Contact SmartPDFMasters",
        url: "https://www.smartpdfmasters.com/contact",
        description: "Contact the SmartPDFMasters team for support, feedback, or partnership enquiries.",
        mainEntity: {
          "@type": "Organization",
          name: "SmartPDFMasters",
          url: "https://www.smartpdfmasters.com",
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer support",
            email: "shekokamal7775@gmail.com",
            availableLanguage: ["English", "Arabic"],
          },
        },
      }),
    }],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80),
  email: z.string().trim().email("Please enter a valid email address"),
  topic: z.string().min(1),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000),
});

const contacts = [
  {
    icon: MessageSquare,
    title: "Tool Support",
    body: "Having trouble with one of our PDF tools? Describe what happened and which tool you were using. We will help you get the result you need.",
    email: "shekokamal7775@gmail.com",
  },
  {
    icon: Shield,
    title: "Privacy & Security",
    body: "Questions about how we handle your files, our GDPR compliance, or a security concern? We take privacy seriously and respond promptly.",
    email: "shekokamal7775@gmail.com",
  },
  {
    icon: Mail,
    title: "Partnerships & Press",
    body: "Interested in working with SmartPDFMasters? We are open to integration partnerships, content collaborations, and press enquiries.",
    email: "shekokamal7775@gmail.com",
  },
];

const faqs = [
  {
    q: "How long does it take to get a reply?",
    a: "We aim to respond to every message within one business day. Most messages receive a reply within a few hours during working hours.",
  },
  {
    q: "My file did not process correctly — what should I include in my message?",
    a: "Please tell us which tool you used, the approximate file size, the device and browser you were using, and what happened when you tried to process your file. This helps us diagnose the issue quickly.",
  },
  {
    q: "Can I request a new PDF tool?",
    a: "Yes — we actively consider tool requests from users. Tell us what task you need to complete and we will let you know if it is on our roadmap.",
  },
  {
    q: "I found a factual error in one of your articles. How do I report it?",
    a: "Please send us the article URL and the specific error you found. We review every report and update content promptly when corrections are needed.",
  },
];

function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "Tool Support",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      toast.error(r.error.issues[0]?.message ?? "Please check your form and try again.");
      return;
    }
    toast.success("Message sent! We will reply within one business day.");
    setSubmitted(true);
    setForm({ name: "", email: "", topic: "Tool Support", message: "" });
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary mb-6">
          Contact Us
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          We read every message
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Whether you need help with a tool, want to report an issue, have feedback on our guides, or are interested in working with us — send us a message and we will get back to you.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 text-primary" />
            Response within 1 business day
          </span>
          <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
            <CheckCircle className="h-4 w-4 text-primary" />
            Every message is read by a team member
          </span>
        </div>
      </div>

      {/* Contact Cards */}
      <div className="grid sm:grid-cols-3 gap-4 mb-14">
        {contacts.map((c) => (
          <div key={c.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-elegant mb-4">
              <c.icon className="h-5 w-5" />
            </div>
            <h3 className="font-display text-lg font-bold mb-2">{c.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">{c.body}</p>
            <a
              href={`mailto:${c.email}`}
              className="text-sm font-medium text-primary hover:underline"
            >
              {c.email}
            </a>
          </div>
        ))}
      </div>

      {/* Form + FAQ */}
      <div className="grid lg:grid-cols-5 gap-10">

        {/* Form */}
        <div className="lg:col-span-3">
          <h2 className="font-display text-2xl font-bold mb-6">Send Us a Message</h2>

          {submitted ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 dark:bg-emerald-950/20 dark:border-emerald-800 p-8 text-center">
              <CheckCircle className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
              <h3 className="font-display text-xl font-bold text-emerald-700 dark:text-emerald-400 mb-2">
                Message Sent!
              </h3>
              <p className="text-sm text-emerald-600 dark:text-emerald-500 mb-4">
                Thank you for reaching out. We will reply to your email within one business day.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-sm text-primary underline hover:text-primary/80"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="rounded-2xl border border-border bg-gradient-card p-8 shadow-soft space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    placeholder="Sara Khalil"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="mt-1.5"
                    maxLength={80}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="mt-1.5"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="topic">Topic</Label>
                <select
                  id="topic"
                  value={form.topic}
                  onChange={(e) => setForm({ ...form, topic: e.target.value })}
                  className="mt-1.5 flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option>Tool Support</option>
                  <option>Bug Report</option>
                  <option>Tool Request</option>
                  <option>Content Correction</option>
                  <option>Privacy or Security</option>
                  <option>Partnership or Press</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <Label htmlFor="message">
                  Message
                  <span className="ml-1 text-xs text-muted-foreground font-normal">
                    (minimum 10 characters)
                  </span>
                </Label>
                <Textarea
                  id="message"
                  rows={6}
                  placeholder="Describe your question or issue in as much detail as possible. If reporting a problem with a tool, include the file type, file size, device, and browser you were using."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="mt-1.5"
                  maxLength={2000}
                  required
                />
                <p className="text-xs text-muted-foreground mt-1 text-right">
                  {form.message.length}/2000
                </p>
              </div>

              <Button type="submit" variant="hero" size="lg" className="w-full">
                Send Message
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                By submitting this form, you agree to our{" "}
                <a href="/privacy" className="text-primary underline">Privacy Policy</a>.
                We will use your email address only to reply to your message.
              </p>
            </form>
          )}
        </div>

        {/* FAQ */}
        <div className="lg:col-span-2">
          <h2 className="font-display text-2xl font-bold mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                <h3 className="font-semibold text-sm mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>

          {/* Direct email */}
          <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-5">
            <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              Prefer to email directly?
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              You can also reach us directly at:
            </p>
            <a
              href="mailto:shekokamal7775@gmail.com"
              className="text-sm font-medium text-primary hover:underline break-all"
            >
              shekokamal7775@gmail.com
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
