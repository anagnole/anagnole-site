import { notFound } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }
  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-8 flex items-center gap-3">
        <span className="inline-block h-2 w-2 rounded-full bg-red-500" />
        <span className="font-mono text-xs uppercase tracking-widest text-red-600 dark:text-red-400">
          Admin — local only
        </span>
      </div>
      {children}
    </div>
  );
}
