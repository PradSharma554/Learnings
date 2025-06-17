import React, { useReducer } from 'react';

const initialState = { count: 0, error: '' };

function reducer(state, action) {
  switch (action.type) {
    case 'increment': {
      if (state.count >= 5) {
        return { ...state, error: 'Count cannot be more than 5' };
      }
      return { count: state.count + 1, error: '' };
    }
    case 'decrement': {
      if (state.count <= 0) {
        return { ...state, error: 'Count cannot be less than 0' };
      }
      return { count: state.count - 1, error: '' };
    }
    default:
      return state;
  }
}

export default function Counter() {
  const [state, dispatchfn] = useReducer(reducer, initialState); //Function, initial state

  return (
    <div>
      <h2>Count: {state.count}</h2>
      {state.error && <p style={{ color: 'red' }}>{state.error}</p>}
      <button onClick={() => dispatchfn(
        { 
            type: 'decrement' 
        }
        )}>-</button>
      
      <button onClick={() => dispatchfn(
        { 
            type: 'increment' 
        }
        )}>+</button>
    </div>
  );
}