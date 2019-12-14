import React, { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [isAdding, setIsAdding] = useState(false);
  const [newColor, setNewColor] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log("ColorList.js, saveEdit(), PUT RES: ", res);
        updateColors(
          colors.map(c => {
            if (c.id === res.data.id) {
              return res.data;
            } else {
              return c;
            }
          })
        );
        setColorToEdit(initialColor);
        setEditing(false);
      })
      .catch(err => console.log(err));
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then(res => {
        console.log("ColorList, DELETE RES: ", res);
        updateColors(colors.filter(c => c.id !== res.data));
      })
      .catch(err => console.log(err));
  };

  const saveNewColor = e => {
    e.preventDefault();
    axiosWithAuth()
      .post(`/colors/`, newColor)
      .then(res => {
        console.log("ColorList.js, saveNewColor, POST RES: ", res);
        updateColors(res.data);
        setIsAdding(false);
        setNewColor(initialColor);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={e => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <button className="addBtn" onClick={() => setIsAdding(!isAdding)}>
        Add New Color +
      </button>
      {isAdding && (
        <>
          <h2>Add new color name and hex code:</h2>
          <form className="addForm" onSubmit={saveNewColor}>
            <input
              name="color"
              placeholder="color name..."
              value={newColor.color}
              onChange={e =>
                setNewColor({ ...newColor, color: e.target.value })
              }
            />
            <input
              name="hex"
              placeholder="hex number..."
              value={newColor.code.hex}
              onChange={e =>
                setNewColor({ ...newColor, code: { hex: e.target.value } })
              }
            />
            <button type="submit" className="saveBtn">
              Save
            </button>
          </form>
        </>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
