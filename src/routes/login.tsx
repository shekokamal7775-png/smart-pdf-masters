import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { type FormEvent } from "react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Log in — SmartPDFTools" }, { name: "robots", content: "noindex" }] }),
  component: LoginPage,
});

function LoginPage() {
  const submit = (e: FormEvent) => { e.preventDefault(); toast.info("Authentication is UI-only. Connect Lovable Cloud to enable accounts."); };
  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:py-24">
      <div className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary shadow-elegant">
          <FileText className="h-6 w-6 text-primary-foreground" />
        </div>
        <h1 className="mt-6 font-display text-3xl font-bold">Welcome back</h1>
        <p className="mt-2 text-sm text-muted-foreground">Log in to your SmartPDFTools account</p>
      </div>
      <form onSubmit={submit} className="mt-10 space-y-4 rounded-2xl border border-border bg-card p-6 shadow-soft">
        <div><Label htmlFor="email">Email</Label><Input id="email" type="email" required className="mt-1.5" /></div>
        <div><Label htmlFor="pw">Password</Label><Input id="pw" type="password" required className="mt-1.5" /></div>
        <Button variant="hero" size="lg" className="w-full">Log in <ArrowRight className="h-4 w-4" /></Button>
        <p className="text-center text-sm text-muted-foreground">No account? <Link to="/signup" className="text-primary hover:underline">Sign up free</Link></p>
      </form>
    </div>
  );
}
