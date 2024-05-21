'use client'

import { motion } from 'framer-motion'
import { categories, executors } from '../state/state'
import { itemVariants, listVariants } from '../ui/variants'
import { button } from './PageIndex'

const label = 'text-2xl xl:text-5xl 2xl:text-7xl 3xl:text-[148px] font-serif'
const container = 'flex gap-5 xl:gap-5 2xl:gap-8 3xl:gap-14 flex-wrap' 

export const Options = () => {
    const categoryClick = (category:string) => () => {
        executors.category(category)
    } 
    return (       
        <motion.div className='flex flex-col gap-6 3xl:gap-16 flex-1 z-10' variants={listVariants} initial='out' animate='in' exit='out'>
            <motion.div className={label} variants={itemVariants}  transition={{duration: 1}}>
                Прослушайте:
            </motion.div>
            <motion.ul className={container} variants={listVariants}>
                <motion.li variants={itemVariants} transition={{duration: 1}}>
                    <motion.button onClick={executors.daily} className={button}>
                        Цитата дня
                    </motion.button>
                </motion.li>
                <motion.li variants={itemVariants} transition={{duration: 1}}>
                    <motion.button onClick={executors.random} className={button}>
                        Случайная цитата
                    </motion.button>
                </motion.li>                
            </motion.ul>
            <motion.div className={label} variants={itemVariants} transition={{duration: 1}}>
                Или цитата из категории:
            </motion.div>
            <motion.ul className={container} variants={listVariants} >
                {
                    categories.map(({name, id}) => <motion.li key={id} variants={itemVariants} transition={{duration: 1}}>
                        <motion.button onClick={categoryClick(name)} className={button}>
                            {name[0].toUpperCase() + name.slice(1)}
                        </motion.button>
                    </motion.li> )
                }
            </motion.ul>
        </motion.div>
    )
}