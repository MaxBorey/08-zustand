import NoteDetailsClient from "./NoteDetails.client";
import { fetchNoteById } from "@/lib/api";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const noteId = Number(id);

  const note = await fetchNoteById(noteId);

  return {
    title: note ? `Note: ${note.title}` : "Note not found",
    description: note ? note.content.slice(0, 30) : "No content available",
  };
}

export default async function NotePage({ params }: PageProps) {
  const { id } = await params;
  const noteId = Number(id);

  return <NoteDetailsClient noteId={noteId} />;
}
