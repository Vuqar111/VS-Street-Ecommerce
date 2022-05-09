import React, { useState } from 'react';

export default function SearchBox(props) {
  const [name, setName] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search/name/${name}`);
  };
  return (
    <form className="searchmobile" onSubmit={submitHandler}>
      <div className="searchmobilediv">
        <input
          type="text"
          name="q"
          id="q"
          placeholder='Məhsulun adını yazın'
          onChange={(e) => setName(e.target.value)}
        ></input>
        <button type="submit" className='searchbtndiv'>
          <i className="fa fa-search"></i>
        </button>
      </div>
    </form>
  );
}
