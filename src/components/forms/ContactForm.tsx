"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { Input, Label, Textarea } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(6),
  email: z.string().email().optional().or(z.literal("")),
  message: z.string().min(5),
  reference: z.string().optional(),
  company: z.string().max(0).optional(), // honeypot
});

interface Props {
  compact?: boolean;
  defaultReference?: string;
}

export function ContactForm({ compact, defaultReference }: Props) {
  const t = useTranslations("contact.form");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const err: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        err[issue.path[0] as string] = issue.message;
      }
      setErrors(err);
      return;
    }
    setErrors({});
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className={cn("grid gap-4", !compact && "sm:grid-cols-2")}>
        <div>
          <Label htmlFor="name">{t("name")}</Label>
          <Input id="name" name="name" required aria-invalid={!!errors.name} />
        </div>
        <div>
          <Label htmlFor="phone">{t("phone")}</Label>
          <Input id="phone" name="phone" type="tel" required aria-invalid={!!errors.phone} />
        </div>
      </div>
      <div>
        <Label htmlFor="email">{t("email")}</Label>
        <Input id="email" name="email" type="email" aria-invalid={!!errors.email} />
      </div>
      {defaultReference && (
        <div>
          <Label htmlFor="reference">{t("reference")}</Label>
          <Input id="reference" name="reference" defaultValue={defaultReference} readOnly />
        </div>
      )}
      <div>
        <Label htmlFor="message">{t("message")}</Label>
        <Textarea id="message" name="message" required aria-invalid={!!errors.message} />
      </div>

      <div className="flex items-center justify-between gap-4 pt-1">
        <div className="text-sm min-h-[1.25rem]">
          {status === "success" && <span className="text-navy font-medium">✓ {t("success")}</span>}
          {status === "error" && <span className="text-red-600">{t("error")}</span>}
        </div>
        <Button type="submit" disabled={status === "loading"}>
          {t("submit")}
        </Button>
      </div>
    </form>
  );
}
