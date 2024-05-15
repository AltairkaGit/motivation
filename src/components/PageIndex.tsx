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

const Interface = ({data}: {data: State | undefined}) => {
    const links = useMemo(() => ({
        'menu': <Options key='options' />,
        'quote': <QuoteView key='quote' quote={data as Quote} />
    }), [data?.screen])
    return (
        <motion.div className="flex flex-col xl:flex-row pt-6 pb-40 xl:py-20 px-5 xl:px-20 items-center xl:items-start xl:justify-between gap-5 xl:gap-20">
            <Image src="/static/goblet.svg" alt="" width={0} height={0} className="w-[140px] h-[146px] sm:w-[174px] sm:h-[182px] xl:w-[480px] xl:h-[500px] 2xl:w-[525px] 2xl:h-[548px]"/>
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
    return (
        <motion.main className='h-dvh overflow-x-hidden bg-bg sm:bg-black md:bg-red-600 lg:bg-amber-500 xl:bg-teal-400 2xl:bg-indigo-500'>
            <Interface data={data} />
        </motion.main>
    )
}
