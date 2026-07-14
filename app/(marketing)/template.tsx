// Smooth fade-in for the marketing landing on navigation.
export default function MarketingTemplate({ children }: { children: React.ReactNode }) {
  return <div className="route-transition">{children}</div>
}
