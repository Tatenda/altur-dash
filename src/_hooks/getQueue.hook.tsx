import { useEffect, useState } from 'react'
import { handleResponse, authHeader } from '../_helpers';
import { IListItem } from '../_models/queue.model';

export const useGetQueue = (date = null) => {
    const [queue, setQueue] = useState([] as IListItem[])
    const [loading, setLoading] = useState(false as boolean)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        setError(null)
        const requestOptions = {
            method: 'POST',
            headers: { ...authHeader(), 'Content-Type': 'application/json' },
            body: JSON.stringify({ date: date })
        };
        const apiUrl = `${process.env.REACT_APP_SERVER_URL}/queue/get`;
        fetch(apiUrl, requestOptions as RequestInit)
            .then(res => res.json())
            .then(json => {
                setLoading(false)
                if (json) {
                    setQueue(json['data'])
                } else {
                    setQueue([])
                }
            })
            .catch(err => {
                setError(err)
                setLoading(false)
            })
    }, [])
    return { queue, setQueue, loading, error }
}
