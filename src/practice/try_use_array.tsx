import { useArray } from "../hooks/useArray";
import { useMount } from "../hooks/useMount";

export const TsReactTest = () => {
  const persons: { name: string; age: number }[] = [
    { name: "jack", age: 25 },
    { name: "mmm", age: 28 },
  ];
  const { value, clear, removeIndex, add } = useArray(persons);
  useMount(() => {
    add({ name: "222", age: 30 });
    removeIndex(11);
  });
  return (
    <div>
      <button onClick={() => add({ name: "222", age: 22 })}>add</button>
      <button onClick={() => removeIndex(0)}>remove</button>
      <button onClick={() => clear()}>clear</button>
      {value.map((person, index: number) => (
        <div>
          <span>{index}</span>
          <span>{person.name}</span>
          <span>{person.age}</span>
        </div>
      ))}
    </div>
  );
};
