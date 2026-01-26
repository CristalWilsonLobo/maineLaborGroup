import React, { useMemo, useState } from "react";

type WorkedForOption = { value: string; label: string };

export default function JobTickets() {
  const workedForOptions: WorkedForOption[] = useMemo(
    () => [
      { value: "", label: "Select an option" },
      { value: "arc_labor_group", label: "ARC Labor Group" },
      { value: "client_company_1", label: "Client Company 1" },
      { value: "client_company_2", label: "Client Company 2" },
      { value: "other", label: "Other" },
    ],
    []
  );

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    workedFor: "",
    date: "",
    time: "",
    jobLocation: "",
    ticketFile: null as File | null,
    checks: {
      clear: false,
      signed: false,
      filled: false,
    },
    acknowledge: false,
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function updateChecks<K extends keyof typeof form.checks>(key: K, value: boolean) {
    setForm((prev) => ({ ...prev, checks: { ...prev.checks, [key]: value } }));
  }

  const fileLabel = form.ticketFile
    ? `${form.ticketFile.name} (${Math.round(form.ticketFile.size / 1024)} KB)`
    : "Drop a file here or click to upload";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitted(false);

    // Basic required validation
    if (!form.firstName.trim()) return setError("Please enter your first name.");
    if (!form.lastName.trim()) return setError("Please enter your last name.");
    if (!form.email.trim()) return setError("Please enter your email.");
    if (!form.phone.trim()) return setError("Please enter your phone number.");
    if (!form.workedFor) return setError("Please select who you worked for.");
    if (!form.date) return setError("Please select a date.");
    if (!form.time) return setError("Please select a time.");
    if (!form.jobLocation.trim()) return setError("Please enter the job location.");
    if (!form.ticketFile) return setError("Please upload a picture of the job ticket.");
    if (!form.checks.clear || !form.checks.signed || !form.checks.filled) {
      return setError("Please confirm all job ticket checkboxes.");
    }
    if (!form.acknowledge) return setError("Please confirm that you have read and understood.");

    setSubmitting(true);
    try {
      // TODO: wire this to your backend / email / Google Sheets, etc.
      // For now, we just log the payload.
      const payload = {
        ...form,
        ticketFile: form.ticketFile ? { name: form.ticketFile.name, size: form.ticketFile.size } : null,
      };
      // eslint-disable-next-line no-console
      console.log("Job Ticket Submission:", payload);

      setSubmitted(true);

      // Reset form (optional)
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        workedFor: "",
        date: "",
        time: "",
        jobLocation: "",
        ticketFile: null,
        checks: { clear: false, signed: false, filled: false },
        acknowledge: false,
      });
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="bg-gradient-to-b from-[color:var(--navy)] to-[color:var(--navy2)]">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 py-14 text-white text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15">
          <span className="text-xl" aria-hidden>
            🧾
          </span>
        </div>

        <h1 className="text-5xl font-semibold">Job Ticket Submission</h1>
        <p className="mt-3 text-white/80">
          Please submit your weekly job ticket on every Friday of the week.
        </p>
      </div>

      {/* Form Card */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="-mt-8">
          <div className="mx-auto w-full max-w-3xl rounded-2xl bg-white shadow-xl ring-1 ring-black/5">
            <div className="p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-slate-900">Job Ticket Submission</h2>
              <p className="mt-1 text-sm text-slate-600">
                Please submit your weekly job ticket on every Friday of the week.
              </p>

              <form onSubmit={onSubmit} className="mt-6 space-y-6">
                {/* Row 1 */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      value={form.firstName}
                      onChange={(e) => update("firstName", e.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-slate-400"
                      placeholder="First"
                      autoComplete="given-name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      value={form.lastName}
                      onChange={(e) => update("lastName", e.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-slate-400"
                      placeholder="Last"
                      autoComplete="family-name"
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      type="email"
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-slate-400"
                      placeholder="your.email@example.com"
                      autoComplete="email"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      type="tel"
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-slate-400"
                      placeholder="(555) 123-4567"
                      autoComplete="tel"
                    />
                  </div>
                </div>

                {/* Worked For */}
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Who did you work for? <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={form.workedFor}
                    onChange={(e) => update("workedFor", e.target.value)}
                    className="mt-2 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-slate-400"
                  >
                    {workedForOptions.map((opt) => (
                      <option key={opt.value} value={opt.value} disabled={opt.value === ""}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date & Time */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      value={form.date}
                      onChange={(e) => update("date", e.target.value)}
                      type="date"
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Time <span className="text-red-500">*</span>
                    </label>
                    <input
                      value={form.time}
                      onChange={(e) => update("time", e.target.value)}
                      type="time"
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-slate-400"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Where was the job? <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={form.jobLocation}
                    onChange={(e) => update("jobLocation", e.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-slate-400"
                    placeholder="Job location"
                  />
                </div>

                {/* Upload */}
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Upload Picture of Job Ticket <span className="text-red-500">*</span>
                  </label>

                  <label className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center hover:border-slate-300">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0] ?? null;
                        update("ticketFile", file);
                      }}
                    />
                    <div className="mb-2 text-2xl" aria-hidden>
                      ⬆️
                    </div>
                    <div className="text-sm font-medium text-slate-700">{fileLabel}</div>
                    <div className="mt-1 text-xs text-slate-500">Maximum file size: 10MB</div>
                  </label>
                </div>

                {/* Checkboxes */}
                <div className="space-y-3">
                  <div className="text-sm font-medium text-slate-700">
                    Checkboxes <span className="text-red-500">*</span>
                  </div>

                  <label className="flex items-start gap-3 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 rounded border-slate-300"
                      checked={form.checks.clear}
                      onChange={(e) => updateChecks("clear", e.target.checked)}
                    />
                    <span>My job ticket is clear</span>
                  </label>

                  <label className="flex items-start gap-3 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 rounded border-slate-300"
                      checked={form.checks.signed}
                      onChange={(e) => updateChecks("signed", e.target.checked)}
                    />
                    <span>My job ticket is signed by a supervisor</span>
                  </label>

                  <label className="flex items-start gap-3 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 rounded border-slate-300"
                      checked={form.checks.filled}
                      onChange={(e) => updateChecks("filled", e.target.checked)}
                    />
                    <span>My job ticket is fully filled out</span>
                  </label>
                </div>

                <hr className="border-slate-200" />

                {/* Acknowledge */}
                <div className="space-y-2">
                  <div className="text-sm font-medium text-slate-700">
                    Checkboxes <span className="text-red-500">*</span>
                  </div>

                  <label className="flex items-start gap-3 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 rounded border-slate-300"
                      checked={form.acknowledge}
                      onChange={(e) => update("acknowledge", e.target.checked)}
                    />
                    <div>
                      <div className="font-medium text-slate-800">I have read and understand</div>
                      <p className="mt-1 text-xs leading-relaxed text-slate-500">
                        Expired issues could have tickets submitted on time, fully completed, legible,
                        and signed by your supervisor. Missing, unclear, or late submissions may delay
                        your pay.
                        <br />
                        Submitting accurate tickets ensures timely processing and helps us keep payroll
                        smooth for everyone.
                      </p>
                    </div>
                  </label>
                </div>

                {/* Feedback */}
                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                {submitted && (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                    Submitted successfully. Thank you!
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-xl bg-[color:var(--navy)] px-4 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? "Submitting..." : "Submit"}
                </button>
              </form>
            </div>
          </div>


        </div>
      </div>
    </section>
  );
}
