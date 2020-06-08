import { useEffect, useReducer } from 'react';

interface State {
  hour: number;
  minute: number;
  second: number;
}

function getState(): State {
  const now = new Date();
  return {
    hour: now.getHours(),
    minute: now.getMinutes(),
    second: now.getSeconds(),
  };
}

function reducer(state: State, action: { type: string }) {
  switch (action.type) {
    case 'tick':
      return getState();
    default:
      return state;
  }
}

export function useClock() {
  const [state, dispatch] = useReducer(reducer, getState());
  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({
        type: 'tick',
      });
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return state;
}
