import {
  CheckCircle,
  Edit,
  Upload,
  FileText,
  Gift,
  AlertCircle,
} from 'lucide-react';

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
      <section className="rounded-2xl border border-border bg-white px-10 py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className={`rounded-xl  p-4 text-white flex items-center justify-center`}
              style={{
                background: `linear-gradient(to bottom, ${from}, ${to})`,
              }}
            >
              {icon}
            </div>
            <div className="space-y-0.5">
              <p className="font-medium text-neutral-900">{title}</p>
              <p className="text-sm text-neutral-500">{subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {status && (
              <div className="rounded-full border border-emerald-500 px-3 py-2 text-xs text-emerald-600 bg-emerald-500/10 flex items-center gap-2">
                <CheckCircle size={16} />
                <span>{status}</span>
              </div>
            )}

            {edit && (
              <div className="p-3 rounded-xl border border-border flex items-center gap-2 cursor-pointer hover:bg-foreground-200 hover:text-neutral-900 transition">
                <Edit size={14} />

                <span className="text-xs">Edit</span>
              </div>
            )}

            {document && (
              <div className="p-3 rounded-xl border border-border flex items-center gap-2 cursor-pointer hover:bg-foreground-200 hover:text-neutral-900 transition">
                <Upload size={14} />

                <span className="text-xs">Upload New Document</span>
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
  return <div className="grid grid-cols-2 gap-x-16 gap-y-6">{children}</div>;
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
    <div className="flex items-start gap-4">
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
      className="flex items-center justify-between rounded-xl border border-border px-6 py-6"
      key={key}
    >
      <div className="flex  gap-6">
        <div className=" text-primary h-12 w-12 flex items-center justify-center  bg-primary/10 rounded-xl">
          <FileText size={20} className="text-primary" />
        </div>

        <div className="space-y-3">
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
    <div className="rounded-2xl bg-linear-to-r from-black to-primary-text-100 p-6 space-y-8">
      <div className="flex gap-6">
        <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center">
          <AlertCircle size={24} className="text-primary" />
        </div>
        <div className="max-w-3xl space-y-4">
          <h3 className="font-semibold text-white">
            Need to Update Your Information?
          </h3>
          <p className="text-white/40">
            Some changes may require re-verification. Contact our vendor support
            team for assistance with major account updates.
          </p>
        </div>
      </div>

      <div className="space-x-4">
        <button className="mt-4 rounded-xl bg-primary px-8 py-4 text-sm text-primary-text-100 cursor-pointer hover:bg-primary-hover">
          Contact Support
        </button>

        <button className="mt-4 rounded-xl bg-white px-8 py-4 text-sm text-primary-text-100 cursor-pointer hover:bg-foreground-200 transition">
          Documentation
        </button>
      </div>
    </div>
  );
}
