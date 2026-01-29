import { CheckCircle, Edit, Upload, FileText, AlertCircle } from 'lucide-react';

export function Section({
  icon,
  title,
  subtitle,
  status,

  from,
  to,
  document,
  edit,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  status?: string;

  from: string;
  to: string;
  document?: true;
  edit?: true;
  children: React.ReactNode;
}) {
  {
    return (
      <section className="rounded-2xl border border-border bg-white py-6 lg:py-8 space-y-8 lg:space-y-12">
        <div className="flex items-start md:items-center justify-between border-b border-border px-4 pb-6 md:pb-6 md:px-10 lg:pb-8">
          <div className="flex items-center gap-4">
            <div
              className={`rounded-xl p-2.5 md:p-4 text-white flex items-center justify-center `}
              style={{
                background: `linear-gradient(to bottom, ${from}, ${to})`,
              }}
            >
              {icon}
            </div>
            <div className="space-y-1 md:space-y-0.5">
              <p className="font-medium text-neutral-900">{title}</p>
              <p className="text-sm text-neutral-500">{subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {status && (
              <div className="md:rounded-full md:border md:border-emerald-500  md:px-3 md:py-2 text-xs text-emerald-600 md:bg-emerald-500/10 flex items-center gap-2">
                <CheckCircle size={16} />
                <span className="hidden md:inline ">{status}</span>
              </div>
            )}

            {edit && (
              <div className="md:p-3 md:rounded-xl md:border md:border-border flex items-center gap-2 cursor-pointer hover:bg-foreground-200 hover:text-neutral-900 transition">
                <Edit size={16} />

                <span className="hidden md:inline md:text-xs">Edit</span>
              </div>
            )}

            {document && (
              <div className="md:p-3 md:rounded-xl md:border md:border-border flex items-center gap-2 cursor-pointer hover:bg-foreground-200 hover:text-neutral-900 transition">
                <Upload size={16} />

                <span className="hidden md:inline  text-xs">
                  Upload New Document
                </span>
              </div>
            )}
          </div>
        </div>

        {children}
      </section>
    );
  }
}

export function InfoGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 md:px-10 grid grid-cols-2 gap-x-16 gap-y-6">
      {children}
    </div>
  );
}

export function InfoRow({
  label,
  value,
  icon,
  highlight,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-start gap-4 col-span-2 md:col-span-1">
      {icon && (
        <div
          className={`${highlight ? 'text-emerald-600' : 'text-neutral-500'}`}
        >
          {icon}
        </div>
      )}

      <div className="space-y-2">
        <p className="text-sm text-neutral-500">{label}</p>
        <p
          className={`text-sm ${
            highlight ? 'text-emerald-600 font-medium' : 'text-neutral-900'
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

export function DocumentRow({
  key,
  name,
  desc,
  verified,
}: {
  key: string;
  name: string;
  desc: string;
  verified: boolean;
}) {
  return (
    <div
      className="flex flex-col md:flex-row items-center justify-between gap-6 rounded-xl border border-border px-6 py-6 "
      key={key}
    >
      <div className="flex flex-col md:flex-row items-center  gap-6">
        <div className=" text-primary h-12 w-12 flex items-center justify-center  bg-primary/10 rounded-xl">
          <FileText size={20} className="text-primary" />
        </div>

        <div className="space-y-3 text-center">
          <p className="text-sm text-neutral-900">{name}</p>

          <p className="text-sm text-neutral-500">{desc}</p>
        </div>
      </div>

      {verified ? (
        <span className="rounded-full border border-emerald-500 px-3 py-2 text-xs text-emerald-600 flex items-center gap-2 bg-emerald-500/10">
          <CheckCircle size={16} />
          Verified
        </span>
      ) : (
        <button className="rounded-xl bg-primary px-4 py-3 text-sm text-primary-text-100">
          Upload
        </button>
      )}
    </div>
  );
}

export function Support() {
  return (
   <div className="rounded-2xl bg-linear-to-r from-black to-primary-text-100 p-4 md:p-6 space-y-6">
  {/* Top content */}
  <div className="flex items-start  gap-4 sm:gap-6">
    <div className="p-2.5 md:p-3 shrink-0 aspect-square bg-[#FBF7EB] rounded-full flex items-center justify-center">
      <AlertCircle className="text-primary w-6 h-6 " />
    </div>

    <div className="space-y-2 md:space-y-4 max-w-none sm:max-w-3xl">
      <h3 className="font-semibold text-white text-sm md:text-base">
        Need to Update Your Information?
      </h3>
      <p className="text-white/40 text-xs md:text-sm leading-relaxed">
        Some changes may require re-verification. Contact our vendor support
        team for assistance with major account updates.
      </p>
    </div>
  </div>

  {/* Actions */}
  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
    <button className="w-full sm:w-auto rounded-xl bg-primary px-6 md:px-8 py-3 md:py-4 text-sm text-primary-text-100 hover:bg-primary-hover transition">
      Contact Support
    </button>

    <button className="w-full sm:w-auto rounded-xl bg-white px-6 md:px-8 py-3 md:py-4 text-sm text-primary-text-100 hover:bg-foreground-200 transition">
      Documentation
    </button>
  </div>
</div>

  );
}
