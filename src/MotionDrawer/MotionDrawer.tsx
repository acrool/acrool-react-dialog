import {AnimatePresence, motion} from 'framer-motion';
import {ReactNode} from 'react';

import {TOnExitComplete} from '../types';
import styles from './motion-drawer.module.scss';


const spring = {
    damping: .2,
};

const maskVariantsItem = {
    initial: {opacity: 0, transition: {type:'spring'}},
    visible: {opacity: 1},
    hidden: {opacity: 0},
};

const modalVariantsItem = {
    initial: {transform: 'scale(0)'},
    visible: {transform: 'scale(1)'},
    hidden: {transform: 'scale(0)'},
};

interface IProps {
    className?: string
    isVisible?: boolean
    onExitComplete?: TOnExitComplete
    children: ReactNode
}


/**
 * 右側半抽屜彈窗
 * @param isVisible
 * @param visible
 * @param onExitComplete
 * @param children
 */
const MotionDrawer = ({
    isVisible,
    onExitComplete,
    children,
}: IProps) => {


    /**
     * 渲染顯示介面
     * (AnimatePresence 偵測 motion.div 不渲染則會自己移除Dom)
     */
    const renderMotion = () => {
        if(!isVisible){
            return null;
        }

        return <motion.div
            className={styles.motionDrawer}
            key="modal"
            transition={spring}
            variants={maskVariantsItem}
            animate="visible"
            initial="initial"
            exit="hidden"
        >
            <div className={styles.motionScrollWrapper}>
                <motion.div
                    variants={modalVariantsItem}
                    transition={{type: 'spring', duration: 0.5}}
                >
                    {children}
                </motion.div>
            </div>
        </motion.div>;
    };


    return <>
        <AnimatePresence onExitComplete={onExitComplete}>
            {renderMotion()}
        </AnimatePresence>

    </>;

};


export default MotionDrawer;

