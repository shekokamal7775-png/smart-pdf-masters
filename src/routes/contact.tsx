import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageSquare, Building2 } from "lucide-react";
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
      { title: "Contact SmartPDFTools — We'd Love to Hear From You" },
      { name: "description", content: "Get in touch with SmartPDFTools support, sales or partnerships team. We typically respond within one business day." },
      { property: "og:title", content: "Contact SmartPDFTools" },
      { property: "og:description", content: "Reach our support, sales or partnerships team — we usually reply within a day." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email(),
  topic: z.string().min(1),
  message: z.string().trim().min(10).max(2000),
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", topic: "Support", message: "" });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) { toast.error(r.error.issues[0]?.message ?? "Invalid form"); return; }
    toast.success("Message sent! We'll reply within one business day.");
    setForm({ name: "", email: "", topic: "Support", message: "" });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <h1 className="font-display text-5xl sm:text-6xl font-bold tracking-tight">Talk to us</h1>
        <p className="mt-4 text-muted-foreground">We typically reply within one business day.</p>
      </div>

      <div className="mt-14 grid lg:grid-cols-3 gap-6">
        {[
          { icon: MessageSquare, title: "Support", body: "Help with a tool or your account.", email: "support@smartpdftools.com" },
          { icon: Building2, title: "Sales", body: "Business plans, SSO, custom contracts.", email: "sales@smartpdftools.com" },
          { icon: Mail, title: "Partnerships", body: "Integrations, affiliates, press.", email: "partners@smartpdftools.com" },
        ].map((c) => (
          <div key={c.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-elegant">
              <c.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-display text-lg font-bold">{c.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{c.body}</p>
            <a href={`mailto:${c.email}`} className="mt-3 inline-block text-sm font-medium text-primary hover:underline">{c.email}</a>
          </div>
        ))}
      </div>

      <form onSubmit={submit} className="mt-12 mx-auto max-w-2xl rounded-3xl border border-border bg-gradient-card p-8 shadow-soft space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1.5" maxLength={80} required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1.5" required />
          </div>
        </div>
        <div>
          <Label htmlFor="topic">Topic</Label>
          <select id="topic" value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })}
            className="mt-1.5 flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm">
            <option>Support</option>
            <option>Sales</option>
            <option>Partnership</option>
            <option>Bug report</option>
          </select>
        </div>
        <div>
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="mt-1.5" maxLength={2000} required />
        </div>
        <Button type="submit" variant="hero" size="lg" className="w-full">Send message</Button>
      </form>
    </div>
  );
}
