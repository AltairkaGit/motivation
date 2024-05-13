export const itemVariants = {
    in: {
        x: 0,
        opacity: 1
    },
    out: {
        x: '-1rem',
        opacity: 0
    }
}

export const listVariants = {    
    in: {transition: {staggerChildren: 0.1, staggerDirection: 1}}, 
    out: {transition: {staggerChildren: 0.1, staggerDirection: -1}}
}

export const itemListVariants = {
    in: {
        x: 0,
        opacity: 1,
        transition: {staggerChildren: 0.05, staggerDirection: 1}
    },
    out: {
        x: '-1rem',
        opacity: 0,
        transition: {staggerChildren: 0.05, staggerDirection: -1}
    }
}