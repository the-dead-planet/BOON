import { authenticatedPage } from '../utils/authenticatedPage';
import AppLayout from '../layouts/AppLayout';
import { WithShowErrorInjectedProps } from '../utils/withShowError';
import { User, NotificationProps, ThemeType, Mode } from '../logic/types';

interface SprintProps {
    user: User | undefined | null;
    themeType: ThemeType;
    setThemeType: any;
    mode: Mode;
    setMode: any;
    notificationsProps: NotificationProps;
}

// If path is /sprints, redirect to the newest sprint
const Team = ({
    user,
    themeType,
    setThemeType,
    mode,
    setMode,
    notificationsProps,
}: SprintProps & WithShowErrorInjectedProps) => {
    return (
        <AppLayout
            user={user}
            themeType={themeType}
            setThemeType={setThemeType}
            mode={mode}
            setMode={setMode}
            appBar={true}
            navPanel={{
                side: 'left',
                content: [{ header: 'Navigation', list: [{ id: '', name: `Back to home`, path: '/' }] }],
            }}
            {...notificationsProps}
        >
            <div style={{ margin: '0 5em' }}>Teams overview will go here</div>
        </AppLayout>
    );
};

export default authenticatedPage(Team);
