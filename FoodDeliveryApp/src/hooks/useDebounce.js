import { useEffect } from 'react'

function useDebounce(value, delay, callback) {
    useEffect(() => {
        const handler = setTimeout(() => {
            callback()
        }, delay)

        return () => clearTimeout(handler)
    }, [value])
}

export default useDebounce
