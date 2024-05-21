'use client'

import { AnimatePresence, motion } from "framer-motion"
import { QuoteView } from "./Quote"
import { useQuery } from "react-query"
import { Quote } from "../scenario/types"
import Image from "next/image"
import { Options } from "./Options"
import { useEffect, useMemo } from "react"
import { assistantInstance } from "../utils/assistant"
import { State } from '../state/state'

export const button = `
    px-6 py-2 2xl:px-12 2xl:py-5 3xl:px-20 3xl:py-16 
    text-black bg-white rounded-lg 
    text-[1.35rem] sm:text-2xl xl:text-3xl 2xl:text-[2.5rem] 3xl:text-[92px] 3xl:rounded-[24px] 
    w-max transition-all duration-150 xl:outline-1
    xl:focus:shadow-dk xl:focus:scale-105 xl:focus:outline
    font-serif
` // normal-case sm:uppercase

const Interface = ({data}: {data: State | undefined}) => {
    const links = useMemo(() => ({
        'menu': <Options key='options' />,
        'quote': <QuoteView key='quote' quote={data as Quote} />
    }), [data])
    return (
        <motion.div className="flex flex-col gap-5 px-5 pt-6 pb-[30vh] sm:min-h-screen xl:pt-10 xl:px-12 2xl:pt-12 2xl:px-20 3xl:px-32 3xl:pt-24 items-center">
            <Image src="/static/goblet.svg" alt="" width={0} height={0} className="w-[160px] sm:hidden"/>
            <AnimatePresence mode="wait">
                { links[data?.screen ?? 'menu'] }
            </AnimatePresence>
        </motion.div>
    )
}

// @ts-ignore
export const PageIndex = () => {
    const { data } = useQuery<State>('quote')
    useEffect(() => {
        assistantInstance?.sendActionPromisified!({type: 'init'})
    }, [])
    useEffect(() => {
        window.scrollTo({top: 0, behavior: 'smooth'})
    }, [data?.screen])
    return (
        <motion.main className={`h-screen overflow-hidden sm:min-h-[auto] sm:h-[100vh] bg-black bg-[url('/static/bg-m.png')] sm:bg-[url('/static/bg.png')] bg-no-repeat bg-cover retative`}>
            <motion.div className="h-screen overflow-y-auto no-scrollbar">
                <Interface data={data} />
            </motion.div>
        </motion.main>
    )
}
