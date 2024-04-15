import { useEffect, useRef } from 'react';

interface ScrollProps {
    callback: () => void;
}

const useScroll = ({ callback }: ScrollProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        if (
            containerRef.current &&
            containerRef.current.scrollHeight - containerRef.current.scrollTop <= containerRef.current.clientHeight + 100
        ) {
            callback();
        }
    };

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (containerRef.current) {
                containerRef.current.removeEventListener('scroll', handleScroll);
            }
        };
    }, [containerRef, callback]);

    return containerRef;
};

export default useScroll;
