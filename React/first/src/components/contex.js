import React, { createContext, useContext, useReducer } from 'react';

// 1. Context
const CounterContext = createContext();

const initialState = { count: 0, error: '' };

// 2. Reducer
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      if (state.count >= 5) return { ...state, error: 'Max is 5' };
      return { count: state.count + 1, error: '' };
    case 'decrement':
      if (state.count <= 0) return { ...state, error: 'Min is 0' };
      return { count: state.count - 1, error: '' };
    default:
      return state;
  }
}

// 3. Provider
function CounterProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
}

// 4. Usage
function CounterControls() {
  const { state, dispatch } = useContext(CounterContext);
  return (
    <div>
      <h2>Count: {state.count}</h2>
      {state.error && <p style={{ color: 'red' }}>{state.error}</p>}
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
    </div>
  );
}

// 5. App
export default function App() {
  return (
    <CounterProvider>
      <CounterControls />
    </CounterProvider>
  );
}