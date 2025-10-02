import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/lib/auth-context'
import Navbar from '@/components/Navbar'

const inter = Inter({ 
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap'
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Proj•Link - Платформа для поиска команды',
  description: 'Найдите команду для своего проекта или присоединитесь к интересным инициативам. Создавайте, участвуйте, развивайтесь вместе!',
  keywords: 'проекты, команда, разработка, стартап, сотрудничество, projlink',
  authors: [{ name: 'Proj•Link Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#e11d48',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          <div className="min-h-screen bg-background">
            <Navbar />
            <main className="relative">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
