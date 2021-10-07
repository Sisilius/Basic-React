import React, {useState} from 'react';

const Counter = () => {
    const [count, setCount] = useState(0) //Тут мы научились использовать состояния

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <button onClick={() => setCount(count - 1)}>Decrement</button>
        </div>
    );
};

export default Counter;