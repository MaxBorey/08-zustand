import css from './page.module.css'

export const metadata = {
  title: 'NoteHub — Simple and Efficient Note Management',
  description: 'NoteHub is a simple and efficient application designed for managing personal notes. It keeps your thoughts organized and accessible in one place, whether you&#8217;re at home or on the go.',
  openGraph: {
    title: 'NoteHub — Simple and Efficient Note Management',
    description: 'NoteHub helps you keep your thoughts organized and accessible anywhere with a clean interface and keyword search.',
    url: 'https://notehub.com',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub main page preview',
      },
    ],
    type: 'website',
  },
};


export default function HomePage() {
  return <main>
  <div className={css.container}>
    <h1 className={css.title}>Welcome to NoteHub</h1>
    <p className={css.description}>
      NoteHub is a simple and efficient application designed for managing
      personal notes. It helps keep your thoughts organized and accessible
      in one place, whether you&apos;re at home or on the go.
    </p>
    <p className={css.description}>
      The app provides a clean interface for writing, editing, and browsing
      notes. With support for keyword search and structured organization,
      NoteHub offers a streamlined experience for anyone who values clarity
      and productivity.
    </p>
  </div>
</main>
}