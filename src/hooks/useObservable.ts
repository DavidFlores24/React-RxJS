import {useEffect, useState} from "react";
import {Observable} from "rxjs";

export function useObservable<T>(observable: Observable<T>, initialValue: T): T {
    const [state, setState] = useState<T>(initialValue);

    useEffect(() => {
        const sub = observable.subscribe(setState);

        return () => {
            sub.unsubscribe();
        }
    }, []);

    return state;
}
