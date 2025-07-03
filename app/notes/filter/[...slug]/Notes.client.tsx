'use client';

import { useState } from 'react';
import css from './Notes.module.css';
import NoteList from '../../../../components/NoteList/NoteList';
import Pagination from '../../../../components/Pagination/Pagination';
import SearchBox from '../../../../components/SearchBox/SearchBox';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { getNotes } from '../../../../lib/api';
import { Note } from '../../../../types/note';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import { NotesApiResponse, NoteTag } from '@/types/note';

interface NotesClientProps {
  initialNotes: Note[];
  initialTotalPages: number;
  initialPage: number;
  initialSearch: string;
  initialTotal: number;
  tag?: NoteTag;
}

export default function NotesClient({
  initialNotes,
  initialTotalPages,
  initialPage,
  initialSearch,
  initialTotal,
  tag: initialTag,
}: NotesClientProps) {
  const [page, setPage] = useState(initialPage);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tag = initialTag;

  const invalidData =
    !Array.isArray(initialNotes) ||
    typeof initialTotalPages !== 'number' ||
    typeof initialPage !== 'number' ||
    typeof initialSearch !== 'string' ||
    typeof initialTotal !== 'number';

  const { data, isLoading, isError, error, isSuccess } = useQuery<NotesApiResponse, Error>({
    queryKey: ['notes', debouncedSearchTerm, page, tag],
    queryFn: () => getNotes(debouncedSearchTerm, page, 12, tag),
    initialData:
      page === initialPage &&
      debouncedSearchTerm === initialSearch &&
      tag === initialTag
        ? {
            notes: initialNotes,
            page: initialPage,
            perPage: 12,
            total: initialTotal,
            totalPages: initialTotalPages,
          }
        : undefined,
    placeholderData: (previousData) => previousData,
    refetchOnMount: false,
  });

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }
  function closeModal() {
    setIsModalOpen(false);
  }

  const notes: Note[] = data?.notes ?? [];
  const totalPages: number = data?.totalPages ?? 1;

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox
          value={searchTerm}
          onChange={(value) => {
            setSearchTerm(value);
            setPage(1);
          }}
        />

        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            forcePage={page - 1}
            onPageChange={({ selected }) => setPage(selected + 1)}
        />
        )}

        <button className={css.button} onClick={toggleModal}>
          Create note +
        </button>
      </div>

      {isLoading && <strong>Loading notes...</strong>}
      {isError && <div style={{ color: 'red' }}>Error loading notes</div>}
      {isSuccess && notes.length > 0 && <NoteList notes={notes} />}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}
