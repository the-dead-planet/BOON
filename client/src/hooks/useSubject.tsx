import * as rxjs from 'rxjs';
import { useState, useEffect } from 'react';

export function useSubject<T>(subject$: rxjs.BehaviorSubject<T>): T {
    const [subject, setSubject] = useState<T>(subject$.value);

    useEffect(() => {
        const subscription = subject$.subscribe(setSubject);

        return () => {
            subscription.unsubscribe();
        };
    }, [subject$]);

    return subject;
}
