import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../types/note";
import { deleteNote } from "../../services/noteService";
import css from "./NoteList.module.css";

export interface NoteListProps {
  notes: Note[];
  onDataChanged: () => void;
}

const NoteList = ({ notes, onDataChanged }: NoteListProps) => {
  const queryClient = useQueryClient();

  const deleteNoteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["notes"] });
      onDataChanged();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleDeleteClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ): void => {
    event.preventDefault();
    deleteNoteMutation.mutate(id);
  };

  if (notes.length === 0) {
    return null;
  }

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button
              type="button"
              className={css.button}
              onClick={(event) => handleDeleteClick(event, note.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;

