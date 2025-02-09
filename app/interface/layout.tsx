import ProtectedRoute from "../components/ProtectedRoute";

export default function InterfaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <section>
        <div>{children}</div>
      </section>
    </ProtectedRoute>
  );
}
