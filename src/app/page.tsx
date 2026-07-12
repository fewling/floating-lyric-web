import { getTranslations } from 'next-intl/server'

export default async function Home() {
  const t = await getTranslations('nav')

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-2">
      <h1 className="font-display text-4xl font-extrabold">Floating Lyrics</h1>
      <p className="text-sm text-muted">{t('features')}</p>
    </main>
  )
}
