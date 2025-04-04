import * as Routes from '../routes';
import * as Types from '../logic/types';

const APP_NAME = 'BOON';

const DICTIONARY = {
    explanation:
        'Boon derives from the Old Norse bón, a request for a favor. Think of a boon as a favor that no one has necessarily asked for, something extra. "We\'d just spent our last dollar on a cup of coffee so it was a real boon to find a ten dollar bill lying on the sidewalk." Boon can also be an adjective for someone friendly and welcoming, as in "a boon companion."',
    definitions: [
        {
            clause: 'noun',
            body: 'something that is very helpful and improves the quality of life',
            example:
                "Getting called out of school on the day of the test was a boon for Sam, as he hadn't remembered to study.",
            synonyms: 'blessing',
        },
        // {
        //     clause: "adjective",
        //     body: "very close and convivial",
        //     example: "boon companions",
        //     synonyms: "close",
        // },
    ],
};

const LANDING_CONTENTS = [
    {
        title: 'BRAG',
        text: 'about all the cool stuff you developed last sprint.',
        link: 'Sprint news',
        path: Routes.Types.RouterPaths.Sprints,
    },
    {
        title: 'HELP',
        text: 'your fans to get transparency of your developments.',
        link: 'Projects overview',
        path: Routes.Types.RouterPaths.Projects,
    },
    {
        title: 'GOSS',
        text: "about the superstars behind your team's success.",
        link: 'Meet the teams',
        path: Routes.Types.RouterPaths.Teams,
    },
];

const QUOTES = [
    'But first coffee!',
    'Go your own way!',
    'Then nothing goes right. Go Left.',
    "I'm not lazy. I'm on energy saving mode",
    'Make goals. Organize your week. Stay focused.',
    'Success is when you find people copying you.',
    'Do it right now or regret later.',
    "Design won't save the world. But damn sure makes it look good.",
    'Formal education will make you a living. Self-education will make you a fortune.',
    "Don't deliver a product. Deliver an experience.",
    'Simplicity is not the goal. It is the by-product of a good idea and modest expectations.',
    'Successful brands are an experience, not an entity.',
    'Your brand is what people say about you when you are not in the room.',
];

const NAV_LINKS = [
    { name: 'Sprints', path: Routes.Types.RouterPaths.Sprints },
    { name: 'Projects', path: Routes.Types.RouterPaths.Projects },
    { name: 'Teams', path: Routes.Types.RouterPaths.Teams },
];

const THEME_TYPES: Array<Types.ThemeType> = ['default', 'vintage', 'frostic'];
const MODES: Array<Types.Mode> = ['light', 'dark'];

export { APP_NAME, DICTIONARY, LANDING_CONTENTS, NAV_LINKS, QUOTES, THEME_TYPES, MODES };
