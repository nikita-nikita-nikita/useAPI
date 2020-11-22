import {useEffect, useRef, useState, useMemo} from "react";

const useUserCache = () => {
    const cache = useRef({users: {}});
    const updateUserCache = (id, data) => cache.current.users[id] = data;
    const getUserFromCache = (id) => cache.current.users[id];
    const clearUserCache = (id) => delete cache.current.users[id];
    return [updateUserCache, getUserFromCache, clearUserCache];
}

const useAPI = (api, {attemptsNumber = 1, base = 'https://'}) => {
    const url = base + api;

    const initialState = {
        data: null,
        error: null,
        status: 'idle'
    };

    const [userState, setUserState] = useState(initialState);
    const [updateUserCache, getUserFromCache, clearUserCache] = useUserCache();
    const [abortController, setAbortController] = useState(null);
    const cancelLoading = () => {
        if(abortController) abortController.abort();
    }
    const getUserResponse = async () => {
        if(attemptsNumber<=0||isNaN(attemptsNumber))
            throw new Error('Wrong attemptsNumber ¯\\_(ツ)_/¯');
        cancelLoading();
        const abort = new AbortController();
        setAbortController(abort);
        setUserState(initialState);
        const cachedUser = getUserFromCache(url);
        if (cachedUser)
            setUserState({data: cachedUser, error: null, status: 'idle'});

        let currentAttemptsNumber = 0;
        while (currentAttemptsNumber<attemptsNumber){
            try {
                const response = await fetch(url, {signal: abort.signal});
                if (!response.ok) throw {code: response.status, message: 'Not found'};
                const data = await response.json();
                setUserState({
                    data,
                    error: null,
                    status: 'success'
                });
                updateUserCache(url, data);
                break;
            } catch (error) {
                if(error.code === 404) clearUserCache(url)
                setUserState({
                    data: null,
                    error,
                    status: 'error'
                });
                currentAttemptsNumber++;
            } finally {
                setAbortController(null);
            }
        }

    }


    useEffect(() => {
        // we use async await syntax and we do not need any action after that, so we can ignore promise, that it returns
        getUserResponse();
        return cancelLoading;
    }, [api, base, attemptsNumber])

    return [...Object.values(userState), getUserResponse, cancelLoading]
}

export {useAPI}
