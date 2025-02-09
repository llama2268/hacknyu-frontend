import ProtectedRoute from "../components/ProtectedRoute";

export default function InterfaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <section className="min-h-screen bg-slate-100 dark:bg-gray-900 transition-colors duration-200">
        <div className="p-10">{children}</div>
      </section>
    </ProtectedRoute>
  );
}
