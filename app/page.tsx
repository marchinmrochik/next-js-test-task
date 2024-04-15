'use client'

import useScroll from '@/hooks/useScroll';
import usePeopleData from "@/hooks/useFetchPeople";
import PeopleList from "@/components/peopleList";

export default function Home() {
    const { people, isLoading, loadNextPage } = usePeopleData();
    const containerRef = useScroll({ callback: loadNextPage });

    return (
        <main className="flex min-h-screen flex-col items-center p-2 max-w-screen-md mx-auto">
            <h1 className="text-3xl font-bold mt-4 mb-4 text-center">Star Wars Characters</h1>
            <div className="container mx-auto mt-4 no-scrollbar overflow-y-auto max-h-screen content-container"
                 ref={containerRef}>
                <PeopleList people={people}/>
                {isLoading && <p className="text-center my-4">Loading...</p>}
            </div>
        </main>
    );
}
