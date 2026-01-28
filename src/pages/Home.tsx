import React, { useMemo, useRef, useState } from "react";

type Sector = {
  title: string;
  description: string;
  image: string;
  icon: string; // emoji icon
};

type StaffingFormState = {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  industry: string;
  positionType: string;
  urgency: string;
  numberOfPositions: string;
  businessChallenges: {
    workforceGaps: boolean;
    operationsOptimization: boolean;
    logisticsSupport: boolean;
    leadershipNeeds: boolean;
  };
  description: string;
};

const initialForm: StaffingFormState = {
  companyName: "",
  contactName: "",
  email: "",
  phone: "",
  industry: "",
  positionType: "",
  urgency: "",
  numberOfPositions: "1",
  businessChallenges: {
    workforceGaps: false,
    operationsOptimization: false,
    logisticsSupport: false,
    leadershipNeeds: false,
  },
  description: "",
};

const skillLevels = [
  {
    level: "Entry Level",
    description: "Energetic candidates ready to learn and grow with your organization.",
  },
  {
    level: "Mid-Level",
    description: "Experienced professionals with proven track records and specialized skills.",
  },
  {
    level: "Senior Level",
    description: "Seasoned experts who can mentor teams and drive strategic initiatives.",
  },
  {
    level: "Executive Level",
    description: "C-suite leaders who can transform organizations and deliver results.",
  },
];

const solutions = [
  {
    title: "Workforce Solutions",
    description: "Scale your team quickly with temporary, temp-to-perm, or permanent placements.",
  },
  {
    title: "Logistics Support",
    description: "Streamline operations with skilled logistics and supply chain professionals.",
  },
  {
    title: "Operations Excellence",
    description: "Optimize operations with experienced managers and operational staff.",
  },
  {
    title: "Leadership Gaps",
    description: "Fill critical leadership positions with interim or permanent executive talent.",
  },
];

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="text-sm font-semibold text-slate-700">{children}</label>;
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={[
        "mt-2 w-full rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-900",
        "placeholder:text-slate-400",
        "ring-1 ring-inset ring-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400",
        props.className ?? "",
      ].join(" ")}
    />
  );
}

function SelectInput(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={[
        "mt-2 w-full rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-900",
        "ring-1 ring-inset ring-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400",
        props.className ?? "",
      ].join(" ")}
    >
      {props.children}
    </select>
  );
}

function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={[
        "mt-2 w-full rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-900",
        "placeholder:text-slate-400",
        "ring-1 ring-inset ring-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400",
        props.className ?? "",
      ].join(" ")}
    />
  );
}

export default function Home() {
  const [showStaffingForm, setShowStaffingForm] = useState(false);
  const [form, setForm] = useState<StaffingFormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const findTalentRef = useRef<HTMLElement | null>(null);

  // ✅ Updated images for:
  // i) Healthcare & Medical (working image)
  // iii) Clerical & Administrative (new image)
  // iv) Landscaping & Services (new image)
  const sectors: Sector[] = useMemo(
    () => [
      {
        icon: "🔨",
        title: "Trade & Construction",
        description:
          "Skilled tradespeople, construction workers, and specialized technicians for your projects.",
        image:
          "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=80",
      },
      {
        icon: "🩺",
        title: "Healthcare & Medical",
        description:
          "Medical professionals, nurses, technicians, and healthcare administrators at all levels.",
        image:
          "https://images.unsplash.com/photo-1706958581603-dffa91fec580?auto=format&fit=crop&w=1600&q=80",
      },
      {
        icon: "💼",
        title: "Clerical & Administrative",
        description:
          "Office support, administrative assistants, and clerical staff to keep operations running smoothly.",
        image:
          "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80",
      },
      {
        icon: "👥",
        title: "Executive & Leadership",
        description:
          "C-suite executives, senior managers, and strategic leaders to guide your organization.",
        image:
          "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=1600&q=80",
      },
      {
        icon: "📈",
        title: "Specialized Talent",
        description:
          "Industry-specific experts, consultants, and specialists with niche skills and experience.",
        image:
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
      },
      {
        icon: "🏢",
        title: "Landscaping & Services",
        description:
          "Landscaping professionals, maintenance crews, and service workers for your facilities.",
        image:
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1600&q=80",
      },
    ],
    []
  );

  const openForm = () => {
    setShowStaffingForm(true);
    requestAnimationFrame(() => {
      findTalentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const backToOptions = () => {
    setShowStaffingForm(false);
    setSubmitted(false);
    requestAnimationFrame(() => {
      findTalentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const update = <K extends keyof StaffingFormState>(key: K, value: StaffingFormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const updateChallenge = (key: keyof StaffingFormState["businessChallenges"], value: boolean) => {
    setForm((prev) => ({
      ...prev,
      businessChallenges: { ...prev.businessChallenges, [key]: value },
    }));
  };

  const requiredOk =
    form.companyName.trim() &&
    form.contactName.trim() &&
    form.email.trim() &&
    form.phone.trim() &&
    form.industry.trim() &&
    form.positionType.trim() &&
    form.urgency.trim() &&
    form.numberOfPositions.trim() &&
    form.description.trim();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    if (!requiredOk) return;

    // Later you can connect this to a backend or Google Sheets
    console.log("Staffing Request Submitted:", form);
    alert("Thanks! Your staffing request was submitted.");

    setForm(initialForm);
    setSubmitted(false);
    setShowStaffingForm(false);
  };

  return (
    <main className="bg-white text-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80"
            alt="Team working"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-white/85 ring-1 ring-white/15">
                Staffing • Recruiting • Workforce Solutions
              </div>

              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Building Your Workforce,
                <br className="hidden sm:block" />
                Powering Your Business
              </h1>

              <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
                ARC Labor Group connects businesses with exceptional talent across industries and
                skill levels—from entry-level roles to leadership.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#find-talent"
                  className="inline-flex items-center justify-center rounded-xl bg-[#6FA3D2] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 transition"
                >
                  Find Talent →
                </a>
                {/* 
                <a
                  href="job-seekers"
                  className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
                >
                  Find Work
                </a>
                */}
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-3xl ring-1 ring-white/15 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80"
                  alt="Staffing"
                  className="h-[360px] w-full object-cover sm:h-[420px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Industries We Serve</h2>
            <p className="mt-4 mx-auto max-w-2xl text-slate-600">
              We provide comprehensive staffing solutions across diverse sectors, matching the right
              talent with the right opportunities.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {sectors.map((s, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="h-full w-full object-cover transition duration-300 hover:scale-105"
                    loading="lazy"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-lg">
                      {s.icon}
                    </div>
                    <h3 className="text-lg font-semibold">{s.title}</h3>
                  </div>
                  <p className="text-slate-600">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Talent at Every Level */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Talent at Every Level
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-slate-600">
              From unskilled labor to top-tier executives, we connect you with talent that matches
              your exact requirements.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {skillLevels.map((s, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white p-6 hover:border-slate-400 transition"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white font-semibold">
                  {idx + 1}
                </div>
                <h3 className="text-center text-lg font-semibold">{s.level}</h3>
                <p className="mt-2 text-center text-sm text-slate-600">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solving Your Business Challenges */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Solving Your Business Challenges
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-slate-600">
              We don’t just fill positions—we solve problems. Our comprehensive approach addresses
              your most critical business needs.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {solutions.map((s, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-8"
              >
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="mt-3 text-slate-600">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Find the Right Talent */}
      <section
        id="find-talent"
        ref={(el) => {
          findTalentRef.current = el;
        }}
        className="py-20 bg-slate-50"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white border border-slate-200">
              📋
            </div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Find the Right Talent</h2>
            <p className="mt-4 mx-auto max-w-2xl text-slate-600">
              Choose how you’d like to connect with us to discuss your staffing needs.
            </p>
          </div>

          {!showStaffingForm ? (
            <div className="grid gap-6 md:grid-cols-3">
              {/* Call Us */}
              <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl">
                  📞
                </div>
                <h3 className="text-lg font-semibold">Call Us</h3>
                <p className="mt-2 text-sm text-slate-600">Speak directly with our team</p>

                <p className="mt-4 font-semibold text-slate-900">+1 (XXX) XXX-XXXX</p>

                <a
                  href="tel:+10000000000"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-50 transition"
                >
                  Call Now
                </a>
              </div>

              {/* Email Us */}
              <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl">
                  ✉️
                </div>
                <h3 className="text-lg font-semibold">Email Us</h3>
                <p className="mt-2 text-sm text-slate-600">Send us your requirements</p>

                <p className="mt-4 font-semibold text-slate-900">info@arclaborgroup.com</p>

                <a
                  href="mailto:info@arclaborgroup.com"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-50 transition"
                >
                  Send Email
                </a>
              </div>

              {/* Fill Out Form */}
              <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-100 to-slate-200 p-8 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl border border-slate-200">
                  🧾
                </div>
                <h3 className="text-lg font-semibold">Fill Out Form</h3>
                <p className="mt-2 text-sm text-slate-600">Complete our detailed staffing request</p>

                <p className="mt-4 text-sm font-semibold text-slate-700">Most detailed option</p>

                <button
                  type="button"
                  onClick={openForm}
                  className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition"
                >
                  Start Form
                </button>
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-4xl">
              <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="px-6 pt-10 text-center">
                  <h3 className="text-4xl font-semibold tracking-tight text-slate-900">
                    Staffing Request Form
                  </h3>
                  <p className="mt-4 text-slate-600">
                    Tell us about your staffing needs. We'll connect you with qualified candidates
                    who fit your requirements and company culture.
                  </p>

                  <button
                    type="button"
                    onClick={backToOptions}
                    className="mt-6 inline-flex items-center justify-center text-sm font-semibold text-slate-700 hover:text-slate-900"
                  >
                    ← Back to options
                  </button>
                </div>

                <form onSubmit={onSubmit} className="px-6 pb-8 pt-8">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <FieldLabel>Company Name *</FieldLabel>
                      <TextInput
                        placeholder="Your Company LLC"
                        value={form.companyName}
                        onChange={(e) => update("companyName", e.target.value)}
                      />
                      {submitted && !form.companyName.trim() && (
                        <p className="mt-2 text-xs text-red-600">Company name is required.</p>
                      )}
                    </div>

                    <div>
                      <FieldLabel>Contact Name *</FieldLabel>
                      <TextInput
                        placeholder="Jane Smith"
                        value={form.contactName}
                        onChange={(e) => update("contactName", e.target.value)}
                      />
                      {submitted && !form.contactName.trim() && (
                        <p className="mt-2 text-xs text-red-600">Contact name is required.</p>
                      )}
                    </div>

                    <div>
                      <FieldLabel>Email Address *</FieldLabel>
                      <TextInput
                        type="email"
                        placeholder="contact@company.com"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                      />
                      {submitted && !form.email.trim() && (
                        <p className="mt-2 text-xs text-red-600">Email is required.</p>
                      )}
                    </div>

                    <div>
                      <FieldLabel>Phone Number *</FieldLabel>
                      <TextInput
                        placeholder="(555) 987-6543"
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                      />
                      {submitted && !form.phone.trim() && (
                        <p className="mt-2 text-xs text-red-600">Phone number is required.</p>
                      )}
                    </div>

                    <div>
                      <FieldLabel>Industry *</FieldLabel>
                      <SelectInput value={form.industry} onChange={(e) => update("industry", e.target.value)}>
                        <option value="">Select your industry</option>
                        <option>Trade & Construction</option>
                        <option>Healthcare & Medical</option>
                        <option>Clerical & Administrative</option>
                        <option>Executive & Leadership</option>
                        <option>Specialized Talent</option>
                        <option>Landscaping & Services</option>
                        <option>Other</option>
                      </SelectInput>
                      {submitted && !form.industry.trim() && (
                        <p className="mt-2 text-xs text-red-600">Industry is required.</p>
                      )}
                    </div>

                    <div>
                      <FieldLabel>Position Type *</FieldLabel>
                      <SelectInput
                        value={form.positionType}
                        onChange={(e) => update("positionType", e.target.value)}
                      >
                        <option value="">Select position type</option>
                        <option>Temporary</option>
                        <option>Temp-to-Perm</option>
                        <option>Permanent</option>
                        <option>Contract</option>
                      </SelectInput>
                      {submitted && !form.positionType.trim() && (
                        <p className="mt-2 text-xs text-red-600">Position type is required.</p>
                      )}
                    </div>

                    <div>
                      <FieldLabel>Urgency *</FieldLabel>
                      <SelectInput value={form.urgency} onChange={(e) => update("urgency", e.target.value)}>
                        <option value="">When do you need staff?</option>
                        <option>Immediately</option>
                        <option>Within 1–2 weeks</option>
                        <option>Within 30 days</option>
                        <option>1–3 months</option>
                      </SelectInput>
                      {submitted && !form.urgency.trim() && (
                        <p className="mt-2 text-xs text-red-600">Urgency is required.</p>
                      )}
                    </div>

                    <div>
                      <FieldLabel>Number of Positions *</FieldLabel>
                      <TextInput
                        type="number"
                        min={1}
                        value={form.numberOfPositions}
                        onChange={(e) => update("numberOfPositions", e.target.value)}
                      />
                      {submitted && !form.numberOfPositions.trim() && (
                        <p className="mt-2 text-xs text-red-600">Number of positions is required.</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-8">
                    <FieldLabel>Business Challenges (Select all that apply)</FieldLabel>

                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                      <label className="flex items-center gap-3 text-sm text-slate-700">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-slate-300"
                          checked={form.businessChallenges.workforceGaps}
                          onChange={(e) => updateChallenge("workforceGaps", e.target.checked)}
                        />
                        Workforce gaps
                      </label>

                      <label className="flex items-center gap-3 text-sm text-slate-700">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-slate-300"
                          checked={form.businessChallenges.logisticsSupport}
                          onChange={(e) => updateChallenge("logisticsSupport", e.target.checked)}
                        />
                        Logistics support
                      </label>

                      <label className="flex items-center gap-3 text-sm text-slate-700">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-slate-300"
                          checked={form.businessChallenges.operationsOptimization}
                          onChange={(e) => updateChallenge("operationsOptimization", e.target.checked)}
                        />
                        Operations optimization
                      </label>

                      <label className="flex items-center gap-3 text-sm text-slate-700">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-slate-300"
                          checked={form.businessChallenges.leadershipNeeds}
                          onChange={(e) => updateChallenge("leadershipNeeds", e.target.checked)}
                        />
                        Leadership needs
                      </label>
                    </div>
                  </div>

                  <div className="mt-8">
                    <FieldLabel>Position Description & Requirements *</FieldLabel>
                    <TextArea
                      rows={5}
                      placeholder="Describe the role, required skills, experience level, and any specific qualifications..."
                      value={form.description}
                      onChange={(e) => update("description", e.target.value)}
                    />
                    {submitted && !form.description.trim() && (
                      <p className="mt-2 text-xs text-red-600">Description is required.</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition"
                  >
                    Submit Staffing Request
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
