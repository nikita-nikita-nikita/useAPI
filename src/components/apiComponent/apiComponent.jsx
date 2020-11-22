import React, {
    useState,
    useRef
} from 'react';
import {useAPI} from "../../hooks/useAPI/useAPI";
import "./apiComponentStyles.css";

const IdSetter = ({setId}) => {
    const idInput = useRef();
    return (
        <div className="id-setter">
            <input ref={idInput} type='number' max={10} min={1} placeholder='yeah' defaultValue={1} className="id-setter__input"/>
            <button
                className="id-setter__button"
                onClick={() => {
                    setId(+idInput.current.value)
                }}>
                Set ID
            </button>
        </div>
    )
}

const ApiComponentContent = ({id}) => {
    const [data, error, status, refresh, cancel] =
        useAPI(`${id}`, {attemptsNumber: 3, base:'https://jsonplaceholder.typicode.com/users/'});
    if (status === 'idle') {
        return (
            <>
                {data?.name ? <div className="hello_message">Hi, {data.name}!</div> : null}
                <div>
                    Loading...
                </div>
                <button onClick={cancel}>Cancel</button>
            </>
        );
    }

    if (status === 'success') {
        return <div className="hello_message">Hi, {data.name}!</div>;
    }

    if (status === 'error') {
        return (
            <div>
                <p>Oops! Something went wrong.</p>
                <p>{error.message}</p>
                <button type="button" onClick={refresh}>
                    Retry
                </button>
            </div>
        );
    }

};

const ApiContainer = () => {
    const [id, setId] = useState(1);
    // property drill isn't best way
    return (
        <div className="main-container">
            <IdSetter setId={setId}/>
            <ApiComponentContent id={id}/>
        </div>
    );
}

export default ApiContainer;
