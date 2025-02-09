import ProtectedRoute from "../components/ProtectedRoute";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <section className="min-h-screen bg-slate-100 dark:bg-gray-900 transition-colors duration-200">
        {children}
      </section>
    </ProtectedRoute>
  );
}
