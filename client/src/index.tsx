import { createRoot } from 'react-dom/client';
import services from './services/realImpl';
import * as serviceWorker from './serviceWorker';
import * as State from './app-state';
import App from "./App";
import "./index.css";

const container = document.getElementById('app');
const root = createRoot(container!);

root.render(<div>Checking who you really are...</div>);

(async () => {
    try {
        const { user } = await services.authService.whoami();
        State.user$.next(user);
        root.render(<App />);
    } catch (err) {
        State.notificationHandler.addNotification((err as Error)?.message ?? 'Could not check who you really are.');
        root.render(<div>Goodbye</div>);
    }
})();

serviceWorker.unregister();