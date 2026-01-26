export default function Footer() {
  return (
    <footer className="bg-[color:var(--navy2)] text-white/80">
      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <div className="font-semibold text-white">ARC Labor Group</div>
          <p className="text-sm mt-2">
            Building exceptional workforces. Your trusted staffing partner.
          </p>
        </div>

        <div>
          <div className="font-semibold text-white">Services</div>
          <ul className="text-sm mt-2 space-y-2">
            <li>Temporary Staffing</li>
            <li>Permanent Placement</li>
            <li>Temp-to-Perm</li>
          </ul>
        </div>

        <div>
          <div className="font-semibold text-white">Industries</div>
          <ul className="text-sm mt-2 space-y-2">
            <li>Construction</li>
            <li>Healthcare</li>
            <li>Administrative</li>
          </ul>
        </div>

        <div>
          <div className="font-semibold text-white">Contact</div>
          <ul className="text-sm mt-2 space-y-2">
            <li>(000) 000-0000</li>
            <li>info@arclaborgroup.com</li>
            <li>123 Business Ave, Suite 100</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 text-center text-sm py-6 text-white/60">
        © {new Date().getFullYear()} ARC Labor Group. All rights reserved.
      </div>
    </footer>
  );
}
