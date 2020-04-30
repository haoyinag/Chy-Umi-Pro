/** MutableRefObject泛型接口，接收一个参数，作为useRef的类型定义,参数可以为T类型，即任意类型 */
export type UseRef = React.MutableRefObject<any>; // const inputEl: UseRef = useRef(null);
