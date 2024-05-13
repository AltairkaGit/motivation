import { ReactNode } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { itemVariants, listVariants } from "../ui/variants"
import { Quote } from "../scenario/types"
import Image from "next/image"
import { executors } from "../state/state"

export const QuoteView = ({quote}: {quote: Quote}) => (
    <motion.div className="flex-1" variants={itemVariants} transition={{duration: 1}} initial="out" animate="in" exit="out">
        <AnimatePresence mode="wait">
        <motion.div key={quote.id} className="flex flex-col gap-4" variants={listVariants} initial="out" animate="in" exit="out">
            <motion.div className="px-5 py-2 text-black bg-white rounded-lg text-2xl w-max flex gap-4" variants={itemVariants} transition={{duration: 1}}>
                <motion.button onClick={executors.back} className="w-8 flex items-center justify-center duration-300 rounded-md hover:shadow-dk">
                    <Image width={10} height={16} src="/static/back.svg" alt="<" />
                </motion.button>
                {quote.category[0].toUpperCase() + quote.category.slice(1)}
            </motion.div>
            <motion.div className="text-black text-3xl text-justify" variants={itemVariants} transition={{duration: 1}}>
                " {quote.quote} "
            </motion.div>
            <motion.div className="px-5 py-2 text-black relative rounded-lg text-2xl self-end" variants={itemVariants} transition={{duration: 1}}>
                <motion.div className="w-[120%] h-[1px] absolute top-0 right-0 z-10 bg-black"></motion.div>
                {quote.author}
            </motion.div>
        </motion.div>
        </AnimatePresence>
    </motion.div>
    
)