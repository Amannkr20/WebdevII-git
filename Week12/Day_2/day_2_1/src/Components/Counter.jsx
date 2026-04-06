import { useState } from "react";
function Counter() {
    //  const [count=>data, setCount=> update fn. used to update data] and html = useState(0);

    const [count, setCount] = useState(0);
    console.log({ count });

    const handleAdd = () => {
        setCount(count + 1);
    };

    const handleReduce = () => {
        setCount(count - 1);
    };

    const handleReset = () => {
        setCount(0);
    };

    return (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={handleAdd}>Add</button>
            <hr />
            <button onClick={handleReduce} disabled={count < 1}>Reduce</button>
            <hr />
            <button onClick={handleReset}>Reset</button>
        </div>
    )
}

export default Counter;
