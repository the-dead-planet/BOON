import { withPush } from '../utils/routingDecorators';
import { guestPage } from '../utils/authenticatedPage';
import AppLayout from '../layouts/AppLayout';
import Content from '../components/landing/Content';
import Header from '../components/landing/Header';
import { Mode, ThemeType, User, NotificationProps } from '../logic/types';

interface Props {
    user: User;
    themeType: ThemeType;
    setThemeType: any;
    mode: Mode;
    setMode: any;
    push: string;
    notificationsProps: NotificationProps;
    showError: any;
}

const Home = ({ user, themeType, setThemeType, mode, setMode, push, notificationsProps }: Props) => (
    <AppLayout
        user={user}
        themeType={themeType}
        setThemeType={setThemeType}
        mode={mode}
        setMode={setMode}
        {...notificationsProps}
    >
        <Header user={user} themeType={themeType} setThemeType={setThemeType} mode={mode} setMode={setMode} />

        <Content user={user} themeType={themeType} setThemeType={setThemeType} mode={mode} setMode={setMode} />
    </AppLayout>
);

export default guestPage(withPush(Home));
