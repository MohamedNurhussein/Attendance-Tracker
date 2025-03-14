// app/(authenticated)/layout.tsx
import NavBar from "@/components/navBar";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <div className="pt-16">
        {children}
      </div>
    </>
  );
}