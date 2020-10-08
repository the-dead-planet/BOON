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
        path: '/sprints',
    },
    {
        title: 'HELP',
        text: 'your fans to get transparency of your developments.',
        link: 'Projects overview',
        path: '/projects',
    },
    {
        title: 'GOSS',
        text: 'about the stars behind productivity in your team.',
        link: 'Meet the teams',
        path: '/teams',
    },
];

const PATHS = {
    root: '/',
    home: '/home',
    sprints: '/sprints',
    posts: '/posts',
    projects: '/projects',
    teams: '/teams',
    login: '/login',
    logout: '/logout',
    register: '/register',
    main: '/sprints',
    addPost: '/add-post',
    add: '/add',
    edit: '/edit',
};

const NAV_LINKS = [
    { name: ' - Sprints - ', path: PATHS.sprints },
    { name: ' - Projects - ', path: PATHS.projects },
    { name: ' - Teams - ', path: PATHS.teams },
];

export { APP_NAME, DICTIONARY, LANDING_CONTENTS, PATHS, NAV_LINKS };
