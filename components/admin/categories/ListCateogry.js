import React, { useRef, useState } from 'react';
import { AiFillDelete, AiTwotoneEdit } from 'react-icons/ai';
import styles from './styles.module.scss';
import axios from 'axios';
import { toast } from 'react-toastify';

const ListCateogry = ({ category, setCategories }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const input = useRef(null);

  const handleRemove = async (id) => {
    try {
      const { data } = await axios.delete(`/api/admin/category/${id}`);
      setCategories(data.categories);
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      console.log("updated", id);
      const { data } = await axios.put('/api/admin/category', {
        id, name
      });
      console.log("DATA UPDATED", data);
      setCategories(data.categories);
      toast.success(data.message);
      setOpen(false);
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  return (
    <div className={styles.list__item}>
      <input
        className={open ? styles.open : ""}
        type="text"
        value={name ? name : category.name}
        onChange={(e) => setName(e.target.value)}
        disabled={!open}
        ref={input}
      />

      {open && (
        <div className={styles.list__item_expand}>
          <button
            className={styles.btn}
            onClick={() => handleUpdate(category._id)}
          >
            Save
          </button>

          <button
            className={styles.btn}
            onClick={() => {
              setOpen(false);
              setName("");
            }}
          >
            Cancel
          </button>
        </div>
      )}

      <div className={styles.list__item_actions}>
        {!open && (
          <AiTwotoneEdit
            onClick={() => {
              setOpen((prev) => !prev);
              input.current.focus();
            }}
          />
        )}

        <AiFillDelete onClick={() => handleRemove(category._id)} />
      </div>
    </div>
  )
}

export default ListCateogry;