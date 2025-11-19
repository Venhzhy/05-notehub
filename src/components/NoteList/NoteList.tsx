import React from "react";
import type { Note } from "../../types/note";
import { deleteNote } from "../../services/noteService";
import css from "./NoteList.module.css";

export interface NoteListProps {
  notes: Note[];
  onDataChanged: () => void;
}

const NoteList = ({ notes, onDataChanged }: NoteListProps) => {
  const handleDeleteClick = async (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ): Promise<void> => {
    event.preventDefault();
    try {
      await deleteNote(id);
      onDataChanged();
    } catch (err) {
      console.error(err);
    }
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
