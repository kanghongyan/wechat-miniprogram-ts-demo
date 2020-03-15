/**
 * loopQuery({
 *     execFunc: (nextCb, currentCount) => {},
 *     endFunc: (endCount) => {}
 * }, 3000, 10, callback)
 *
 * 每隔3s执行一次func，最多执行10次
 * 如果nextCb(false)，不再执行execFunc，直接调用endFunc
 * 如果nextCb(false)，则继续执行，10次都执行完后，再调用endFunc
 *
 * @param funcs
 * @param delay
 * @param maxCount
 * @param timer
 */

interface IFuncs {
    execFunc: (nextCb: (isNext: boolean) => void, currentCount?: number) => {},
    endFunc: (count?: number) => void
}

function loopQuery(
    funcs: IFuncs ,
    delay: number,
    maxCount: number,
    timer?
): void {

    let _count: number = maxCount || 10;
    const callback = funcs.endFunc;
    const func = funcs.execFunc;

    const next = (isNext) => {

        if (_count <= 0 || !isNext) {
            clearTimeout(timer);
            callback && callback(_count);
            _count = 0;
            return
        }

        _count -- ;

        timer = setTimeout(async () => {

            func(next, _count);

        }, delay || 5000)
    };

    // start
    next(true)

}

export {
    loopQuery
}
