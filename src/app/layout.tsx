import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Container, SSRProvider } from '@/components/bootstrap'
import NavBar from './navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Image Gallery App',
  description: 'A first try to NextJs app router, already tried the old one.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app. */}
        <NavBar />
        <main>
          <Container className='py-4'>
            {children}
          </Container>
        </main>
      </body>
    </html>
  )
}
