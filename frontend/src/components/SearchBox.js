import React, { useState } from 'react';

export default function SearchBox(props) {
  const [name, setName] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search/name/${name}`);
  };
  return (
    <form className="search" onSubmit={submitHandler}>
      <div className="searchdiv">
        <input
          type="text"
          name="q"
          id="q"
          placeholder='Search by name or category'
          onChange={(e) => setName(e.target.value)}
        ></input>
        <button  type="submit">
          <i className="fa fa-search"></i>
        </button>
      </div>
    </form>
  );
}
