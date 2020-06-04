import { useReducer } from 'react';

import { DistType, PCAType } from '@/components/Picker/DistPicker/type';

interface ActionType {
  type: DistType;
  payload: number | string | undefined;
}

export const initDistValue: PCAType = {
  PROVINCE: undefined,
  CITY: undefined,
  AREA: undefined,
};

function reducer(state: PCAType, action: ActionType) {
  const { type, payload } = action;
  let newState = { ...state };

  if (!payload && payload !== 0) {
    switch (type) {
      case 'PROVINCE':
        newState = { ...initDistValue };
        break;
      case 'CITY':
        newState = { ...newState, CITY: undefined, AREA: undefined };
        break;
      case 'AREA':
        newState = { ...newState, AREA: undefined };
        break;
      default:
        break;
    }
  } else {
    newState[type] = payload;
  }

  return newState;
}

export const useDistPicker = (state: PCAType) => {
  const [newDistValue, dispatch] = useReducer(reducer, state);
  return { newDistValue, dispatch };
};
