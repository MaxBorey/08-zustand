import { getNotes } from '@/lib/api';
import NotesClient from './Notes.client';
import { NoteTag } from '@/types/note';

type NotesByTagProps = {
  params: Promise<{ slug: string[] }>;
};

const validTags: NoteTag[] = ['Work', 'Personal', 'Meeting', 'Shopping', 'Todo'];

function isNoteTag(tag: any): tag is NoteTag {
  return validTags.includes(tag);
}

export default async function NotesByTag({ params }: NotesByTagProps) {
  const { slug } = await params;
  const rawTag = !slug || slug.length === 0 || slug[0] === 'all' ? undefined : slug[0];
  const tag = isNoteTag(rawTag) ? rawTag : undefined;

  const data = await getNotes('', 1, 12, tag);

  return (
    <NotesClient
      initialNotes={data.notes}
      initialTotalPages={data.totalPages}
      initialPage={1}
      initialSearch=""
      initialTotal={data.total}
      tag={tag}
    />
  );
}


