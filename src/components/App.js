import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

const URL = "http://localhost:3001/toys";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch(URL)
      .then((r) => r.json())
      .then((data) => setToys(data));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function handleNewToyForm(newToy) {
    setToys([...toys, newToy]);
  }

  function handleDeleteToy(toy) {
    const updatedToys = toys.filter((item) => toy.id !== item.id);
    setToys(updatedToys);
  }

  function handleAddLike(updatedToy) {
    console.log(updatedToy);
    const updatedToys = toys.map((item) =>
      item.id === updatedToy.id ? updatedToy : item
    );
    setToys(updatedToys);
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddNewToy={handleNewToyForm} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer
        toys={toys}
        onDeleteToy={handleDeleteToy}
        onAddLike={handleAddLike}
      />
    </>
  );
}

export default App;
export { URL };
