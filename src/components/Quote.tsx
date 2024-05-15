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
            <motion.div className=" flex gap-4" variants={itemVariants} transition={{duration: 1}}>
                <motion.button onClick={executors.back} className="text-black bg-white rounded-lg w-12 xl:w-14 flex items-center justify-center rounded-md">
                    <Image width={10} height={16} src="/static/back.svg" alt="<" />
                </motion.button>
                <motion.button onClick={() => executors.category(quote.category)} className='px-5 py-2 text-black bg-white rounded-lg text-xl lg:text-3xl xl:text-4xl w-max' variants={itemVariants} transition={{duration: 1}}>
                    {quote.category[0].toUpperCase() + quote.category.slice(1)}
                </motion.button>
            </motion.div>
            <motion.div className="text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-justify relative" variants={itemVariants} transition={{duration: 1}}>
                <motion.div className="h-[1px] absolute -bottom-2 right-0 left-0 z-10 bg-white"></motion.div>
                "{quote.quote}"
            </motion.div>
            <motion.div className="px-5 py-2 rounded-lg text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl self-end" variants={itemVariants} transition={{duration: 1}}>
                {quote.author}
            </motion.div>
            <motion.div variants={itemVariants} className="flex gap-5">
                <motion.button onClick={executors.next_quote} className='px-5 py-2 text-black bg-white rounded-lg text-xl lg:text-3xl xl:text-4xl w-max' variants={itemVariants} transition={{duration: 1}}>
                    Следующая
                </motion.button>
                <motion.button onClick={executors.repeat} className='px-5 py-2 text-black bg-white rounded-lg text-xl lg:text-3xl xl:text-4xl w-max' variants={itemVariants} transition={{duration: 1}}>
                    Повторить
                </motion.button>
            </motion.div>
        </motion.div>
        </AnimatePresence>
    </motion.div>
    
)