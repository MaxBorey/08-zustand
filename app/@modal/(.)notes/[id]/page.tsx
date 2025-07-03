import {fetchNoteById} from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotePreviewClient from "./NotePreview.client";

interface NoteModalProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: NoteModalProps) {
  const { id } = await params
  const noteId = Number(id);
  console.log("generateMetadata called for noteId:", noteId); 
  const note = await fetchNoteById(noteId)
  return {
    title: `Note: ${note.title}`,
    description: note.content.slice(0, 30),
  }
}

export default async function NoteModal({ params }: NoteModalProps) {
  const { id } = await params;
  const noteId = +id;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient />
    </HydrationBoundary>
  );
}