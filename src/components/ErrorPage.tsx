import { Col } from '@salutejs/plasma-ui';
import { motion } from 'framer-motion';

export const ErrorPage = ({ status, message }: { status: string; message?: string }) => {
    return (
        <motion.div className='bg-purple text-4xl h-dvh text-center pt-[30dvh]'>
            <Col>{status}</Col>
            {!!message && <Col>{message}</Col>}
        </motion.div>
    );
};
