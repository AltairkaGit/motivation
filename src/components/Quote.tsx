import { AnimatePresence, motion } from "framer-motion"
import { itemVariants, listVariants } from "../ui/variants"
import { Quote } from "../scenario/types"
import Image from "next/image"
import { executors } from "../state/state"
import { button } from "./PageIndex"

const Line = () => <motion.div className="h-[1px] absolute -bottom-2 right-0 left-0 z-10 bg-white bg-opacity-50"></motion.div>

const container = 'flex gap-3 xl:gap-6 2xl:gap-8 3xl:gap-14'

export const QuoteView = ({quote}: {quote: Quote}) => (
    <motion.div className="flex-1 w-full" variants={itemVariants} transition={{duration: 1}} initial="out" animate="in" exit="out">
        <AnimatePresence mode="wait">
        <motion.div key={quote.id} className="flex flex-col gap-4 3xl:gap-8" variants={listVariants} initial="out" animate="in" exit="out">
            <motion.ul className={container} variants={itemVariants} transition={{duration: 1}}>
                <motion.li className="w-[44px] xl:w-[52px] 2xl:w-[76px] 3xl:w-[164px]">
                    <motion.button onClick={executors.back} className="text-black bg-white rounded-lg 3xl:rounded-[24px] h-full aspect-square flex items-center justify-center transition-all duration-150 outline-1 focus:shadow-dk focus:scale-105 focus:outline">
                        <Image width={10} height={16} src="/static/back.svg" alt="<" className="3xl:scale-[2.0]" />
                    </motion.button>
                </motion.li>
                <motion.li>
                    <motion.button onClick={() => executors.category(quote.category)} className={button}>
                        {quote.category[0].toUpperCase() + quote.category.slice(1)}
                    </motion.button>
                </motion.li>
            </motion.ul>
            <motion.div className="text-3xl sm:text-4xl xl:text-6xl 2xl:text-7xl 3xl:text-9xl text-justify relative" variants={itemVariants} transition={{duration: 1}}>
                <Line />
                "{quote.quote.replace(`'`, '')}"
            </motion.div>
            <motion.div className="px-5 py-2 rounded-lg text-2xl sm:text-4xl lg:text-5xl 2xl:text-6xl 3xl:text-8xl self-end" variants={itemVariants} transition={{duration: 1}}>
                {quote.author.replace(`'`, '')}
            </motion.div>
            <motion.ul variants={itemVariants} className={container}>
                <motion.li variants={itemVariants} transition={{duration: 1}}>
                    <motion.button onClick={executors.next_ask} className={button}>
                        Следующая
                    </motion.button>
                </motion.li>
                <motion.li variants={itemVariants} transition={{duration: 1}}>
                    <motion.button onClick={executors.repeat_ask} className={button}>
                        Повторить
                    </motion.button>
                </motion.li>
            </motion.ul>
        </motion.div>
        </AnimatePresence>
    </motion.div>
    
)