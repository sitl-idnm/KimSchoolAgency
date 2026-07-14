// Animates only the dashboard content area on navigation.
// The sidebar lives in dashboard/layout.tsx, so it persists (no flicker).
export default function DashboardTemplate({ children }: { children: React.ReactNode }) {
  return <div className="route-transition" style={{ display:'flex', flexDirection:'column', flex:1, minWidth:0 }}>{children}</div>
}
