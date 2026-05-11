import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { type FormEvent } from "react";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Sign up free — SmartPDFTools" }, { name: "robots", content: "noindex" }] }),
  component: SignupPage,
});

function SignupPage() {
  const submit = (e: FormEvent) => { e.preventDefault(); toast.info("Authentication is UI-only. Connect Lovable Cloud to enable accounts."); };
  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:py-24">
      <div className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary shadow-elegant">
          <FileText className="h-6 w-6 text-primary-foreground" />
        </div>
        <h1 className="mt-6 font-display text-3xl font-bold">Create your free account</h1>
        <p className="mt-2 text-sm text-muted-foreground">Join 12 million users — no credit card required</p>
      </div>
      <form onSubmit={submit} className="mt-10 space-y-4 rounded-2xl border border-border bg-card p-6 shadow-soft">
        <div><Label htmlFor="name">Full name</Label><Input id="name" required className="mt-1.5" /></div>
        <div><Label htmlFor="email">Email</Label><Input id="email" type="email" required className="mt-1.5" /></div>
        <div><Label htmlFor="pw">Password</Label><Input id="pw" type="password" required className="mt-1.5" /></div>
        <Button variant="hero" size="lg" className="w-full">Create account</Button>
        <ul className="space-y-1.5 text-xs text-muted-foreground pt-2">
          {["Free forever plan", "All 16 tools included", "Cancel anytime"].map((x) => (
            <li key={x} className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-primary" /> {x}</li>
          ))}
        </ul>
        <p className="text-center text-sm text-muted-foreground">Already have one? <Link to="/login" className="text-primary hover:underline">Log in</Link></p>
      </form>
    </div>
  );
}
