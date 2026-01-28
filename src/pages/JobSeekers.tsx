import React, { useMemo, useState } from "react";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  category: string;
  experience: string;
  resume: File | null;
};

export default function JobSeekers() {
  const categories = useMemo(
    () => [
      "Trade & Construction",
      "Healthcare & Medical",
      "Clerical & Administrative",
      "Executive & Leadership",
      "Specialized Talent",
      "Landscaping & Services",
      "Other",
    ],
    []
  );

  const experienceLevels = useMemo(
    () => [
      "0-1 years",
      "2-4 years",
      "5-7 years",
      "8-10 years",
      "10+ years",
    ],
    []
  );

  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    category: "",
    experience: "",
    resume: null,
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validate(): string | null {
    if (!form.firstName.trim()) return "First name is required.";
    if (!form.lastName.trim()) return "Last name is required.";
    if (!form.email.trim()) return "Email address is required.";
    if (!form.phone.trim()) return "Phone number is required.";
    if (!form.category) return "Category of work is required.";
    if (!form.experience) return "Years of experience is required.";
    if (!form.resume) return "Please upload your resume.";
    // 10MB max (matches your screenshot copy)
    if (form.resume && form.resume.size > 10 * 1024 * 1024)
      return "Resume must be 10MB or smaller.";
    return null;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setSubmitting(true);

    try {
      // TODO: connect this to your backend/email/DB.
      // For now we just simulate success.
      await new Promise((r) => setTimeout(r, 600));

      setSubmitted(true);
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        category: "",
        experience: "",
        resume: null,
      });
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
    <section className="bg-gradient-to-b from-[color:var(--navy)] to-[color:var(--navy2)]">
      {/* Hero */}
      <div className="max-w-6xl mx-auto px-4 py-14 text-white text-center">
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15">
          <span className="text-xl">👥</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-semibold">Join Our Talent Network</h1>
        <p className="mt-3 text-white/80 max-w-2xl mx-auto">
          Submit your information and resume to be considered for current and future job
          opportunities across all industries and skill levels.
        </p>
      </div>
    </section>
      {/* Form Card */}
      <section>
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="-mt-8 mx-auto max-w-3xl">
          <div className="mt-16 rounded-2xl bg-white shadow-xl ring-1 ring-slate-200">
            <div className="p-8">
              <h2 className="text-xl font-semibold text-slate-900">Job Seeker Application</h2>
              <p className="mt-2 text-slate-600">
                Fill out the form below to submit your information and resume. We’ll match you with
                opportunities that fit your skills and experience.
              </p>

              {submitted && (
                <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-900">
                  Application submitted successfully. We’ll reach out if there’s a match.
                </div>
              )}

              {error && (
                <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-900">
                  {error}
                </div>
              )}

              <form onSubmit={onSubmit} className="mt-8 space-y-6">
                {/* Row 1 */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      value={form.firstName}
                      onChange={(e) => update("firstName", e.target.value)}
                      placeholder="John"
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-400 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      value={form.lastName}
                      onChange={(e) => update("lastName", e.target.value)}
                      placeholder="Doe"
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-400 focus:bg-white"
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="john.doe@example.com"
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-400 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="(555) 123-4567"
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-400 focus:bg-white"
                    />
                  </div>
                </div>

                {/* Row 3 */}
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Category of Work <span className="text-red-500">*</span>
                  </label>
                  <div className="relative mt-2">
                    <select
                      value={form.category}
                      onChange={(e) => update("category", e.target.value)}
                      className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-10 text-slate-900 outline-none focus:border-slate-400 focus:bg-white"
                    >
                      <option value="" disabled>
                        Select a category
                      </option>
                      {categories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                      ▾
                    </span>
                  </div>
                </div>

                {/* Row 4 */}
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Years of Experience <span className="text-red-500">*</span>
                  </label>
                  <div className="relative mt-2">
                    <select
                      value={form.experience}
                      onChange={(e) => update("experience", e.target.value)}
                      className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-10 text-slate-900 outline-none focus:border-slate-400 focus:bg-white"
                    >
                      <option value="" disabled>
                        Select experience level
                      </option>
                      {experienceLevels.map((x) => (
                        <option key={x} value={x}>
                          {x}
                        </option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                      ▾
                    </span>
                  </div>
                </div>

                {/* Upload */}
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Upload Resume <span className="text-red-500">*</span>
                  </label>

                  <label className="mt-2 block cursor-pointer rounded-2xl border-2 border-dashed border-slate-200 bg-white px-6 py-10 text-center hover:bg-slate-50 transition">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={(e) => update("resume", e.target.files?.[0] ?? null)}
                    />

                    <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                      <span className="text-xl">⬆️</span>
                    </div>

                    <div className="text-slate-900 font-medium">
                      {form.resume ? form.resume.name : "Click to upload your resume"}
                    </div>
                    <div className="mt-1 text-sm text-slate-500">PDF, DOC, or DOCX (Max 10MB)</div>
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-xl bg-[color:var(--navy)] px-6 py-3 text-sm font-semibold text-white hover:opacity-95 disabled:opacity-60"
                >
                  {submitting ? "Submitting..." : "Submit Application"}
                </button>

                <p className="text-center text-xs text-slate-500">
                  By submitting this form, you agree to be contacted by ARC Labor Group regarding job
                  opportunities that match your profile.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      </section>
    </div>
  );
}
