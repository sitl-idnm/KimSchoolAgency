import type { Metadata } from 'next'
import './globals.css'
import YandexMetrika from '@/components/analytics/YandexMetrika'
import CookieBanner from '@/components/CookieBanner'

export const metadata: Metadata = {
  title: 'KIM AI School — Школа AI-мышления для подростков',
  description: 'Школа AI-мышления для подростков 12–17 лет. Учим думать, проверять, создавать проекты и безопасно работать с ИИ.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kim-ai-school.ru'),
  openGraph: {
    title: 'KIM AI School',
    description: 'Школа AI-мышления для подростков 12–17 лет',
    locale: 'ru_RU',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        {children}
        <CookieBanner />
      </body>
      <YandexMetrika />
    </html>
  )
}
