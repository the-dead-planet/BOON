import * as rxjs from 'rxjs';
import * as Types from './types'

/**
 * Function building a function that will generate the next number on every call.
 * @returns 
 */
const buildUniqueIdGenerator = (): (() => number) => {
    let ctr = 0;
    return () => {
        ctr += 1;
        return ctr;
    };
};

const generateUniqueId = buildUniqueIdGenerator();

/**
 * Holds information about current notifications and provides methods to add new notifications.
 */
export default class NotificationHandler {
    public notifications$: rxjs.BehaviorSubject<Types.Notification[]>;

    public constructor(notifications?: Types.Notification[]) {
        this.notifications$ = new rxjs.BehaviorSubject<Types.Notification[]>(notifications ?? []);
    }

    public static make(message: string): Types.Notification {
        const id = generateUniqueId();
        return { id, message };
    }

    public addNotification = (message: string) => {
        this.notifications$.next([...this.notifications$.value, NotificationHandler.make(message)]);
    }

    public removeNotification = (id: number) => {
        this.notifications$.next(this.notifications$.value.filter((n) => n.id !== id));
    }

    /**
     * Clears notification after a given timeout in ms (defaults to 5s)
     * @param notificationId Id of the noti
     * @param timeout In milliseconds
     */
    public triggerClear = (notificationId: number, timeout = 5000): Types.Notification | undefined => {
        setTimeout(() => {
            this.removeNotification(notificationId);
        }, timeout);

        return this.notifications$.value.find((n) => n.id === notificationId);
    };
}
