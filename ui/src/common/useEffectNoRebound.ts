import { useEffect } from "react";

export const useEffectNoRebound = (effect: React.EffectCallback, delayDebounceTime: number, deps?: React.DependencyList,) => {
    return useEffect(() => {
        const delayDebounceFn = setTimeout(
            effect, delayDebounceTime
        );

        return () => clearTimeout(delayDebounceFn)
    }, deps)
};