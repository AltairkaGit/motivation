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
    px-5 py-2 2xl:px-12 2xl:py-5 3xl:px-20 3xl:py-16 
    text-black bg-white rounded-lg 
    text-xl sm:text-2xl xl:text-3xl 2xl:text-[2.5rem] 3xl:text-[92px] 3xl:rounded-[24px] 
    w-max transition-all duration-150 outline-1
    focus:shadow-dk focus:scale-105 focus:outline
`

const Interface = ({data}: {data: State | undefined}) => {
    const links = useMemo(() => ({
        'menu': <Options key='options' />,
        'quote': <QuoteView key='quote' quote={data as Quote} />
    }), [data])
    return (
        <motion.div className="flex flex-col gap-5 px-5 pt-6 xl:pt-10 xl:px-12 2xl:pt-12 2xl:px-20 3xl:px-32 3xl:pt-24 items-center ">
            <Image src="/static/goblet.svg" alt="" width={0} height={0} className="w-[209px] sm:hidden"/>
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
        <motion.main className='min-h-[125dvh] bg-indigo-500 retative no-scrollbar'>
            <Interface data={data} />
        </motion.main>
    )
}
