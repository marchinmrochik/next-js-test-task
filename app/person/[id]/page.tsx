'use client'

import PersonInfo from "@/components/personInfo";
import {useFetchPerson} from "@/hooks/useFetchPerson";
import Link from "next/link";

export default function Person({params}: any) {
    const { isLoading, selectedPerson}  = useFetchPerson(params.id)

    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <Link
                className="absolute left-4 max-[670px]:bottom-4 min-[671px]:top-4 bg-blue-500 text-white
                 px-4 py-2 rounded hover:bg-blue-700 z-10"
                href={'/'}
                data-testid="link-back"
            >
                Back
            </Link>
            <h1 className="text-3xl font-bold mb-4 mt-4">{selectedPerson?.name}</h1>
            {
                isLoading
                    ? <p className="text-center my-4">Loading...</p>
                    : <PersonInfo selectedPerson={selectedPerson!}/>
            }
        </main>
    );
};

