import AppLayout from '../layouts/AppLayout';
import * as Types from '../logic/types';

interface Props {
    user: Types.User | undefined | null;
    themeType: Types.ThemeType;
    onThemeTypeChange: (themeType: Types.ThemeType) => void;
    mode: Types.Mode;
    onModeChange: (mode: Types.Mode) => void;
    notificationsProps: Types.NotificationProps;
}

export const Team: React.FC<Props> = ({
    user,
    themeType,
    onThemeTypeChange,
    mode,
    onModeChange,
    notificationsProps,
}) => {
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
