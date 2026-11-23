import {clsx} from 'clsx';
import {usePresence} from 'motion/react';
import {useAnimate} from 'motion/react-mini';
import {ReactNode, useEffect, useLayoutEffect, useRef} from 'react';

import {IModalMotion, IModalOptions} from '../types';
import styles from './motion-drawer.module.scss';


/**
 * 在 client 用 useLayoutEffect，SSR 退回 useEffect 以免警告。
 * 動畫必須在瀏覽器繪製之前啟動：用 useEffect 的話，彈窗會先以最終樣子畫出一格，
 * 下一格才跳回起點開始進場，看起來會閃一下。
 */
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;


/**
 * 預設動畫
 * 遮罩: 淡入、淡出
 * 內容: 進場由上方略為縮小處彈入，離場略為縮小並往上快速淡出
 */
const defaultMaskMotion: Required<IModalMotion> = {
    enter: {keyframes: {opacity: [0, 1]}, options: {duration: .3}},
    // 離場要比進場快，與內容同時結束
    exit: {keyframes: {opacity: 0}, options: {duration: .18, ease: 'easeOut'}},
};

const defaultContentMotion: Required<IModalMotion> = {
    enter: {
        keyframes: {opacity: [0, 1], transform: ['translateY(-20px) scale(.8)', 'translateY(0) scale(1)']},
        // 帶一點回彈的曲線，近似原本的 spring
        options: {duration: .4, ease: [.22, 1.2, .36, 1]},
    },
    exit: {
        // 短而且一開始就明顯變淡 (easeOut)：按下後立刻有反應，不拖尾
        keyframes: {opacity: 0, transform: 'translateY(-8px) scale(.96)'},
        options: {duration: .18, ease: 'easeOut'},
    },
};

interface IProps {
    modalOptions?: IModalOptions
    children: ReactNode
}


/**
 * 是否不播放動畫
 * - 環境不支援 Web Animations API (例如測試環境)
 * - 使用者開啟「減少動態效果」
 */
const checkIsSkipMotion = (el: Element|null): boolean => {
    if(!el || typeof el.animate !== 'function') return true;
    return typeof window.matchMedia === 'function'
        && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};


/**
 * 開啟動畫抽屜
 *
 * 離場後才移除節點由 AnimatePresence + usePresence 處理 (需放在 AnimatePresence 內)，
 * 動畫由 motion mini (Web Animations API) 播放
 *
 * @param children
 * @param modalOptions
 */
const MotionDrawer = ({
    children,
    modalOptions,
}: IProps) => {
    const [isPresent, safeToRemove] = usePresence();
    const [scope, animate] = useAnimate<HTMLDivElement>();
    const maskRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // 離場動畫結束時用來確認「是否仍在離場」：離場途中又進場的話，舊的離場不可以把節點移除
    const isPresentRef = useRef(isPresent);
    isPresentRef.current = isPresent;

    useIsomorphicLayoutEffect(() => {
        const maskEl = maskRef.current;
        const contentEl = contentRef.current;
        const step = isPresent ? 'enter': 'exit';
        const contentMotion = modalOptions?.motion?.[step] ?? defaultContentMotion[step];
        const maskMotion = defaultMaskMotion[step];

        if(checkIsSkipMotion(contentEl) || !maskEl || !contentEl){
            if(!isPresent) safeToRemove?.();
            return;
        }

        const animations = [
            animate(maskEl, maskMotion.keyframes, maskMotion.options),
            animate(contentEl, contentMotion.keyframes, contentMotion.options),
        ];

        if(!isPresent){
            // 離場動畫播完才讓 AnimatePresence 移除節點；動畫被中斷時也要移除，避免節點殘留
            Promise.all(animations)
                .catch(() => undefined)
                .then(() => {
                    if(!isPresentRef.current) safeToRemove?.();
                });
        }
    }, [isPresent]);

    return <div
        ref={scope}
        className={styles.motionDrawer}
        data-exiting={isPresent ? undefined: ''}
    >
        <div ref={maskRef} className={styles.motionMaskWrapper}/>
        <div
            ref={contentRef}
            className={clsx(styles.motionAnimationWrapper, modalOptions?.className)}
        >
            {children}
        </div>
    </div>;
};


export default MotionDrawer;
