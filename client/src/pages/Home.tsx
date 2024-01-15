import AppLayout from '../layouts/AppLayout';
import Content from '../components/landing/Content';
import Header from '../components/landing/Header';
import * as Types from '../logic/types';

interface Props {
    user: Types.User;
    themeType: Types.ThemeType;
    onThemeTypeChange: (themeType: Types.ThemeType) => void;
    mode: Types.Mode;
    onModeChange: (mode: Types.Mode) => void;
    push: (path: string) => void;
    notificationsProps: Types.NotificationProps;
    showError: (err: Error) => void;
}

export const Home = ({ user, themeType, onThemeTypeChange, mode, onModeChange, notificationsProps }: Props) => {
    return (
        <AppLayout
            user={user}
            themeType={themeType}
            onThemeTypeChange={onThemeTypeChange}
            mode={mode}
            onModeChange={onModeChange}
            {...notificationsProps}
        >
            <Header user={user} themeType={themeType} onThemeTypeChange={onThemeTypeChange} mode={mode} onModeChange={onModeChange} />
            <Content user={user} themeType={themeType} onThemeTypeChange={onThemeTypeChange} mode={mode} onModeChange={onModeChange} />
        </AppLayout>
    );
}
