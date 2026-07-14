// Animates admin content on navigation; admin layout chrome persists.
export default function AdminTemplate({ children }: { children: React.ReactNode }) {
  return <div className="route-transition">{children}</div>
}
