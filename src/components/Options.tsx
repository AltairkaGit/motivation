'use client'

import { motion } from 'framer-motion'
import { categories, executors } from '../state/state'
import { itemVariants, listVariants } from '../ui/variants'

export const Options = () => {
    const categoryClick = (category:string) => () => {
        executors.category(category)
    } 
    return (       
        <motion.div className='flex flex-col gap-6 flex-1' variants={listVariants} initial='out' animate='in' exit='out'>
            <motion.div className='text-2xl lg:text-4xl xl:text-5xl 2xl:text-7xl' variants={itemVariants}  transition={{duration: 1}}>
                Прослушайте:
            </motion.div>
            <motion.div className='flex gap-5 flex-wrap' variants={listVariants}>
                <motion.button onClick={executors.daily} className='px-5 py-2 text-black bg-white rounded-lg text-xl lg:text-3xl xl:text-4xl w-max' variants={itemVariants} transition={{duration: 1}}>
                    Цитата дня
                </motion.button>
                <motion.button onClick={executors.random} className='px-5 py-2 text-black bg-white rounded-lg text-xl lg:text-3xl xl:text-4xl w-max' variants={itemVariants} transition={{duration: 1}}>
                    Случайная цитата
                </motion.button>
            </motion.div>
            <motion.div className='text-2xl lg:text-4xl xl:text-5xl 2xl:text-7xl' variants={itemVariants} transition={{duration: 1}}>
                Или цитата из категории:
            </motion.div>
            <motion.ul className='flex gap-5 flex-wrap' variants={listVariants} >
                {
                    categories.map(({name, id}) => <motion.li key={id} variants={itemVariants} transition={{duration: 1}}>
                        <motion.button onClick={categoryClick(name)} className='px-5 py-2 text-black bg-white rounded-lg text-xl lg:text-3xl xl:text-4xl w-max'>
                            {name[0].toUpperCase() + name.slice(1)}
                        </motion.button>
                    </motion.li> )
                }
            </motion.ul>
        </motion.div>
    )
}