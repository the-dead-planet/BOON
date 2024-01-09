import { authenticatedPage } from '../utils/authenticatedPage';
import AppLayout from '../layouts/AppLayout';
import { WithShowErrorInjectedProps } from '../utils/withShowError';
import { User, NotificationProps, ThemeType, Mode } from '../logic/types';

interface SprintProps {
    user: User | undefined | null;
    themeType: ThemeType;
    onThemeTypeChange: (themeType: ThemeType) => void;
    mode: Mode;
    onModeChange: (mode: Mode) => void;
    notificationsProps: NotificationProps;
}

// If path is /sprints, redirect to the newest sprint
const Team = ({
    user,
    themeType,
    onThemeTypeChange,
    mode,
    onModeChange,
    notificationsProps,
}: SprintProps & WithShowErrorInjectedProps) => {
    return (
        <AppLayout
            user={user}
            themeType={themeType}
            onThemeTypeChange={onThemeTypeChange}
            mode={mode}
            onModeChange={onModeChange}
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
