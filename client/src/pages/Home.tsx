// import { guestPage } from '../utils/authenticatedPage';
import AppLayout from '../layouts/AppLayout';
import Content from '../components/landing/Content';
import Header from '../components/landing/Header';
import { Mode, ThemeType, User, NotificationProps } from '../logic/types';

interface Props {
    user: User;
    themeType: ThemeType;
    onThemeTypeChange: (themeType: ThemeType) => void;
    mode: Mode;
    onModeChange: (mode: Mode) => void;
    push: (path: string) => void;
    notificationsProps: NotificationProps;
    showError: (err: Error) => void;
}

const Home = ({ user, themeType, onThemeTypeChange, mode, onModeChange, notificationsProps }: Props) => (
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

export default Home;
// export default guestPage(Home);
