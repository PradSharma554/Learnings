import React, { useRef, useEffect, useState } from 'react';

export default function UseRefExample() {
  const inputRef = useRef(null);       // for focusing input
  const renderCount = useRef(1);       // for tracking renders

  const [text, setText] = useState('');

  useEffect(() => {
    renderCount.current += 1;
  });

  const focusInput = () => {
    inputRef.current.focus();          // focus the input field
  };

  return (
    <div>
      <h2>Render Count: {renderCount.current}</h2>

      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}