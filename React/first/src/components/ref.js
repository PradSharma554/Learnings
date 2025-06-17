import React, { useRef, useEffect, useState } from 'react';

export default function UseRefVsStateExample() {
  const inputRef = useRef(null);
  const renderCountRef = useRef(1);
  const [renderCountState, setRenderCountState] = useState(1);
  const [text, setText] = useState('');

  useEffect(() => {
    renderCountRef.current += 1;
  });

  const handleClick = () => {
    setRenderCountState(renderCountState + 1);
  };

  return (
    <div>
      <h2>useRef Count: {renderCountRef.current}</h2>
      <h2>useState Count: {renderCountState}</h2>

      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={() => inputRef.current.focus()}>Focus Input</button>
      <button onClick={handleClick}>Increase State Count</button>      {/* Triggers re-render, hence render count also increases */}
    </div>
  );
}