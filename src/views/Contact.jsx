"use client";

import { useState } from "react";
import { Mail, CheckCircle, AlertCircle, Send } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

const inquiryTypes = [
  "General program inquiry",
  "Neighborhood preparedness question",
  "Request for additional information",
  "Organizational or institutional inquiry",
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", inquiryType: inquiryTypes[0], message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.email.trim()) e.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Please enter a valid email address.";
    if (!form.message.trim()) e.message = "Please enter your message.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    // NOTE: The recipient email address is configurable and should be set
    // before this form sends real messages. This simulates a successful submission.
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  const handleChange = (field) => (ev) => {
    setForm({ ...form, [field]: ev.target.value });
    if (errors[field]) setErrors({ ...errors, [field]: undefined });
  };

  if (submitted) {
    return (
      <section className="bg-background">
        <div className="container-narrow py-20 lg:py-28 text-center">
          <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-secondary/10 text-secondary mb-6">
            <CheckCircle className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-semibold text-primary mb-3">Thank you for reaching out.</h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-md mx-auto">
            Your message has been received. We appreciate your interest in SPAN Disaster Services.
          </p>
          <button
            onClick={() => { setSubmitted(false); setForm({ name: "", email: "", inquiryType: inquiryTypes[0], message: "" }); }}
            className="mt-8 inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md text-base font-semibold hover:bg-primary/90 transition-all focus-ring min-h-[48px]"
          >
            Send another message
          </button>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-background border-b border-border">
        <div className="container-span py-14 lg:py-20">
          <SectionHeading
            eyebrow="Contact SPAN"
            title="Get in touch with our team."
            description="Have a question about neighborhood preparedness, the SPAN program, or working with your community? We'd like to hear from you."
          />
        </div>
      </section>

      <section className="bg-background">
        <div className="container-span py-12 lg:py-16">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} noValidate className="bg-card rounded-2xl p-7 lg:p-8 border border-border space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-primary mb-1.5">
                    Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange("name")}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={`w-full px-4 py-3 rounded-lg border bg-background text-foreground focus-ring ${errors.name ? "border-destructive" : "border-border"}`}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1.5 text-sm text-destructive flex items-center gap-1.5">
                      <AlertCircle className="h-4 w-4" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-primary mb-1.5">
                    Email <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange("email")}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={`w-full px-4 py-3 rounded-lg border bg-background text-foreground focus-ring ${errors.email ? "border-destructive" : "border-border"}`}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1.5 text-sm text-destructive flex items-center gap-1.5">
                      <AlertCircle className="h-4 w-4" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="inquiryType" className="block text-sm font-semibold text-primary mb-1.5">
                    Inquiry Type
                  </label>
                  <select
                    id="inquiryType"
                    value={form.inquiryType}
                    onChange={handleChange("inquiryType")}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus-ring"
                  >
                    {inquiryTypes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-primary mb-1.5">
                    Message <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange("message")}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className={`w-full px-4 py-3 rounded-lg border bg-background text-foreground focus-ring resize-y ${errors.message ? "border-destructive" : "border-border"}`}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1.5 text-sm text-destructive flex items-center gap-1.5">
                      <AlertCircle className="h-4 w-4" />
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-md text-base font-semibold hover:brightness-110 transition-all focus-ring min-h-[48px] disabled:opacity-60"
                >
                  <Send className="h-4 w-4" />
                  {submitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <div className="bg-muted/50 rounded-xl p-6 border border-border">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-secondary/10 text-secondary mb-4">
                  <Mail className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-primary mb-2">About Your Inquiry</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Whether you are a resident looking to prepare your neighborhood, a community
                  organizer, or an institutional partner, we welcome your questions about the SPAN
                  program.
                </p>
              </div>
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-semibold text-primary mb-2">Before You Write</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Many common questions are answered in our{" "}
                  <a href="/resources" className="text-secondary underline hover:no-underline">Resource Library</a>{" "}
                  and{" "}
                  <a href="/neighborhood-preparedness" className="text-secondary underline hover:no-underline">Neighborhood Preparedness</a>{" "}
                  pages. Feel free to explore those first.
                </p>
              </div>
              <p className="text-xs text-muted-foreground italic px-1">
                The recipient email address for this form is configurable and should be set before
                the form is made live. We do not promise specific response times.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
