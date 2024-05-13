'use client'

import { AnimatePresence, motion } from "framer-motion";
import { QuoteView } from "./Quote";
import { useQuery } from "react-query";
import { Quote } from "../scenario/types";
import Image from "next/image";
import { Options } from "./Options";
import { useEffect } from "react";
import { assistantInstance } from "../utils/assistant";

const Album = ({data}: {data: Quote | undefined}) => (
<motion.div className="hidden xl:flex py-20 px-20 justify-between gap-20">
    <Image src="/static/goblet.svg" alt="" width={525} height={548}/>
    <AnimatePresence mode="wait">
    {
        (data && data.id)
        ? <QuoteView key='quote' quote={data} />
        : <Options key='options' />
    }
    </AnimatePresence>
</motion.div>
)

const Portrait = ({data}: {data: Quote | undefined}) => (
    <motion.div className="flex flex-col px-16 items-center pt-6 pb-32 xl:hidden gap-5">
    <Image src="/static/goblet.svg" alt="" width={200} height={209}/>
    <AnimatePresence mode="wait">
    {
        (data && data.id)
        ? <QuoteView key='quote' quote={data} />
        : <Options key='options' />
    }
    </AnimatePresence>
    </motion.div>
)

// @ts-ignore
export const PageIndex = () => {
    const { data } = useQuery<Quote>('quote')
    useEffect(() => {
        assistantInstance?.sendActionPromisified!({type: 'init'})
    }, [])
    return (
        <motion.main className='h-dvh overflow-x-hidden bg-bg'>
            <Album data={data} />
            <Portrait data={data} />
        </motion.main>
    )
}
