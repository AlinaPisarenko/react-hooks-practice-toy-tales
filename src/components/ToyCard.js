import React from "react";
import { URL } from "./App";

function ToyCard({ toy, onDeleteToy, onAddLike }) {
  const { id, image, likes, name } = toy;

  function handleClick() {
    fetch(`${URL}/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => onDeleteToy(toy));
  }

  function handleLikeClick() {
    const updatedToy = {
      likes: likes + 1,
    };
    fetch(`${URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedToy),
    })
      .then((r) => r.json())
      .then(onAddLike);
  }

  return (
    <div className="card">
      <h2>{name}</h2>
      <img src={image} alt={name} className="toy-avatar" />
      <p>{likes} Likes </p>
      <button onClick={handleLikeClick} className="like-btn">
        Like {"<3"}
      </button>
      <button onClick={handleClick} className="del-btn">
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;
