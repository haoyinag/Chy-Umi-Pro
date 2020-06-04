import { useState } from 'react';

/**
 *
 * @param defaultValue 默认状态
 * @param defaultItem 储存的数据，无数据默认
 */
interface ReturnProps<T> {
  state: boolean;
  item: T | undefined;
  toggle: Function;
}

export default function useModalVisible<T>(
  defaultState: boolean,
  defaultItem?: T,
): ReturnProps<T> {
  const [state, setState] = useState({
    state: defaultState,
    item: defaultItem,
  });

  const toggle = (current?: T) => {
    if (state.state) {
      setState({
        state: false,
        item: defaultItem,
      });
    } else {
      setState({
        state: true,
        item: current ? current : defaultItem,
      });
    }
  };

  return {
    ...state,
    toggle,
  };
}
