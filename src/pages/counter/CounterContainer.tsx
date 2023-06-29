import {
  decrement,
  decrementByAmount,
  increment,
  incrementByAmount,
} from "../../redux/features/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { CounterView } from "./CounterView";

export const CounterContainer = () => {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.counter.value);

  const addOne = () => {
    dispatch(increment());
  };
  const minusOne = () => {
    dispatch(decrement());
  };

  const addByValue = (value: number) => {
    dispatch(incrementByAmount(value));
  };

  const minusByValue = (value: number) => {
    dispatch(decrementByAmount(value));
  };
  return (
    <CounterView {...{ count, addOne, minusOne, addByValue, minusByValue }} />
  );
};
