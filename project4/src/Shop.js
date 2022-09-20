import React from "react";
import Item from "./Item.js";
import { useState } from "react";
import uuid from "react-uuid";

export default function Shop() {
  const [items, setItems] = useState([]);
  const [desc, setDesc] = useState("");
  const [name, setName] = useState("");
  // const [idCounter, setIdCounter] = useState({ counter: 0 });

  const handleSubmitClick = (e) => {
    e.preventDefault();
    if (name !== "" && desc !== "") {
      // setIdCounter({ counter: idCounter.counter + 1 });
      setItems([...items, { id: uuid(), name: name, desc: desc }]);
      setName("");
      setDesc("");
      console.log(items[items.length - 1]);
      console.log(items.length);
    }
  };

  const handleDeleteClick = (id) => {
    const delItem = () => items.filter((item) => item.id !== id);
    setItems(delItem);
    console.log(id);
  };

  const itemsList = () => {
    return items.map((item) => {
      return (
        <li className="ui-item-list" key={item.id}>
          <Item info={item} />
          <button
            className="item-button"
            onClick={() => handleDeleteClick(item.id)}
          >
            Удалить
          </button>
        </li>
      );
    });
  };

  return (
    <>
      <form onSubmit={handleSubmitClick}>
        <div>
          <input
            type="text"
            placeholder="Название товара"
            className="ui-textfield"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Описание товара"
            className="ui-textfield"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className="form-footer">
          <div className="validation"></div>
          <input type="submit" className="ui-button" value="Добавить" />
          {name === "" || desc === "" ? <p>Заполнены не все поля</p> : null}
        </div>
      </form>

      <div>
        {!items ? <p className="ui-title">Добавьте первый товар</p> : null}
      </div>

      <ul className="ui-list">{itemsList()}</ul>
    </>
  );
}
