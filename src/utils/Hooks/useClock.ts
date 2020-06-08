import { useEffect, useReducer } from 'react';

interface State {
  hour: number;
  minute: number;
  second: number;
}

interface Action {
  type: string;
  payload?: any;
}

function getState(): State {
  const now = new Date();
  return {
    hour: now.getHours(),
    minute: now.getMinutes(),
    second: now.getSeconds(),
  };
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'tick':
      return getState();
    default:
      return state;
  }
}

/**
 * 时钟逻辑抽离
 * 返回一个当前的 时/分/秒 对象
 * exp：
        const [flag, setFlag] = useState<boolean>(false)
        const { hour, minute, second } = useClock();
        useEffect(() => {
            if (!flag) {
                setTimeout(() => {
                    console.log(hour, minute, second);
                }, 1000);
            }
        });
 */
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
