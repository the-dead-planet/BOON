// Below file is in .gitignore, generate your own file with content: 'module.exports = <password>'
const password = require('./seeds-data-password');

module.exports = {
    teams: [
        {
            title: 'Alpha',
            body: 'Flatland adipisci velit Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit',
        },
        {
            title: 'Beta',
            body: 'Intelligent beings another world extraordinary claims require extraordinary evidence paroxysm',
        },
        {
            title: 'Gamma',
            body: 'The carbon in our apple pies consectetur quis nostrum exercitationem ullam corporis suscipit',
        },
        {
            title: 'Delta',
            body:
                "The sky calls to us permanence of the stars the only home we've ever known Ut enim ad minima veniam Jean-François Champollion from which we spring",
        },
        {
            title: 'Epsilon',
            body:
                'Globular star cluster invent the universe emerged into consciousness ship of the imagination dispassionate extraterrestrial observer gathered by gravity',
        },
    ],
    // Users should be assigned to one of the teams - handled in seeds.js
    // TODO: store list of skills separately and use references to it in 'skills' attribute of user
    users: [
        {
            username: 'admin',
            email: 'admin@admin.com',
            password: password,
            role: 'Scrum Master',
            country: 'NL',
            skills: ['Scrum', 'Agile', 'Business Analysis'],
            auth: 'admin',
        },
        {
            username: 'cosmic_arena',
            email: 'cosmic@arena.com',
            password: password,
            role: 'Front-end Developer',
            country: 'DE',
            skills: ['javaScript', 'Testing', 'Business Analysis', 'React'],
            auth: undefined,
        },
        {
            username: 'nemo',
            email: 'nemo@nemo.com',
            password: password,
            role: 'Data Engineer',
            country: 'FR',
            skills: ['python', 'R', 'Statistics'],
            auth: undefined,
        },
        {
            username: 'distantEpochs',
            email: 'distant@epochs.com',
            password: password,
            role: 'Product Owner',
            country: 'ES',
            skills: ['Business Analysis', 'Project Management', 'Data Visualization'],
            auth: undefined,
        },
        {
            username: 'galactica',
            email: 'galactica@galactica.com',
            password: password,
            role: 'Full Stack Developer',
            country: 'BR',
            skills: ['javaScript', 'Python', 'Networking', 'C++', 'Machine Learning'],
            auth: undefined,
        },
        {
            username: 'encycLopaedia',
            email: 'encyclopaedia@encyclopaedia.com',
            password: password,
            role: 'Back-end Developer',
            country: 'DE',
            skills: ['C++', 'Python', 'IT Security'],
            auth: undefined,
        },
    ],
    projects: [
        {
            title: 'Tunguska',
            body:
                'Vanquish the impossible Tunguska event bits of moving fluff cosmos trillion dispassionate extraterrestrial observer? Sea of Tranquility citizens of distant epochs paroxysm of global death Sea of Tranquility made in the interiors of collapsing stars another world. Two ghostly white figures in coveralls and helmets are soflty dancing are creatures of the cosmos stirred by starlight Ut enim ad minima veniam stirred by starlight invent the universe? Quis nostrum exercitationem ullam corporis suscipit laboriosam stirred by starlight star stuff harvesting star light adipisci velit the carbon in our apple pies from which we spring?',
        },
        {
            title: 'Globular',
            body:
                "Sea of Tranquility globular star cluster colonies birth with pretty stories for which there's little good evidence prime number. Quis nostrum exercitationem ullam corporis suscipit laboriosam extraordinary claims require extraordinary evidence citizens of distant epochs invent the universe stirred by starlight encyclopaedia galactica? Intelligent beings muse about vel illum qui dolorem eum fugiat quo voluptas nulla pariatur Neque porro quisquam est nisi ut aliquid ex ea commodi consequatur dream of the mind's eye.",
        },
        {
            title: 'Paroxysm',
            body:
                'Rich in mystery brain is the seed of intelligence paroxysm of global death the sky calls to us galaxies adipisci velit. Courage of our questions nisi ut aliquid ex ea commodi consequatur great turbulent clouds rich in heavy atoms culture Ut enim ad minima veniam. Vastness is bearable only through love the carbon in our apple pies something incredible is waiting to be known inconspicuous motes of rock and gas network of wormholes something incredible is waiting to be known.',
        },
    ],
    sprints: [
        {
            number: 1,
            dateFrom: new Date('2019-04-01'),
            dateTo: new Date('2019-04-30'),
            title: 'Adipisci velit',
            body:
                'Astonishment science great turbulent clouds Flatland courage of our questions adipisci velit. Sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt circumnavigated circumnavigated white dwarf the carbon in our apple pies how far away? Another world Ut enim ad minima veniam extraordinary claims require extraordinary evidence two ghostly white figures in coveralls and helmets are soflty dancing Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur the ash of stellar alchemy.',
            posts: [
                {
                    title: 'Worldlets made in the interiors',
                    body:
                        "Circumnavigated quasar rich in mystery Hypatia worldlets made in the interiors of collapsing stars? From which we spring nisi ut aliquid ex ea commodi consequatur tingling of the spine dream of the mind's eye the only home we've ever known Neque porro quisquam est? Emerged into consciousness two ghostly white figures in coveralls and helmets are soflty dancing gathered by gravity stirred by starlight the carbon in our apple pies courage of our questions.",
                },
                {
                    title: 'Cluster quasar',
                    body:
                        "Flatland extraplanetary globular star cluster quasar of brilliant syntheses birth? A mote of dust suspended in a sunbeam ship of the imagination cosmic ocean hearts of the stars concept of the number one white dwarf? Qui dolorem ipsum quia dolor sit amet adipisci velit with pretty stories for which there's little good evidence two ghostly white figures in coveralls and helmets are soflty dancing extraordinary claims require extraordinary evidence consectetur?",
                },
                {
                    title: 'Extraordinary evidence',
                    body:
                        'Extraordinary claims require extraordinary evidence Tunguska event two ghostly white figures in coveralls and helmets are soflty dancing cosmic fugue culture quis nostrum exercitationem ullam corporis suscipit laboriosam. The sky calls to us a still more glorious dawn awaits vanquish the impossible are creatures of the cosmos stirred by starlight Neque porro quisquam est. A mote of dust suspended in a sunbeam descended from astronomers totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo the ash of stellar alchemy adipisci velit the sky calls to us.',
                },
                {
                    title: 'Encyclopaedia',
                    body:
                        "Encyclopaedia galactica a still more glorious dawn awaits astonishment tendrils of gossamer clouds billions upon billions the carbon in our apple pies? Courage of our questions from which we spring dream of the mind's eye something incredible is waiting to be known dispassionate extraterrestrial observer a very small stage in a vast cosmic arena. With pretty stories for which there's little good evidence the ash of stellar alchemy Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur vanquish the impossible the sky calls to us across the centuries.",
                },
                {
                    title: 'Rig Veda',
                    body:
                        "Corpus callosum network of wormholes Rig Veda courage of our questions extraordinary claims require extraordinary evidence the carbon in our apple pies. Vastness is bearable only through love rich in heavy atoms Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur bits of moving fluff finite but unbounded with pretty stories for which there's little good evidence? Circumnavigated made in the interiors of collapsing stars nisi ut aliquid ex ea commodi consequatur qui dolorem ipsum quia dolor sit amet a very small stage in a vast cosmic arena paroxysm of global death.",
                },
                {
                    title: 'Jean-François Champollion',
                    body:
                        'Great turbulent clouds culture Rig Veda Jean-François Champollion vanquish the impossible quasar. Of brilliant syntheses kindling the energy hidden in matter cosmic fugue a very small stage in a vast cosmic arena descended from astronomers stirred by starlight? Consectetur a still more glorious dawn awaits two ghostly white figures in coveralls and helmets are soflty dancing Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium qui dolorem ipsum quia dolor sit amet.',
                },
            ],
        },
        {
            number: 2,
            dateFrom: new Date('2019-05-01'),
            dateTo: new Date('2019-05-30'),
            title: 'Seed of intelligence',
            body:
                "Muse about kindling the energy hidden in matter hearts of the stars brain is the seed of intelligence the only home we've ever known colonies. A still more glorious dawn awaits another world Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit concept of the number one shores of the cosmic ocean Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit. Dream of the mind's eye something incredible is waiting to be known qui dolorem ipsum quia dolor sit amet dream of the mind's eye something incredible is waiting to be known Ut enim ad minima veniam.",
            posts: [
                {
                    title: 'Unbounded inconspicuous',
                    body:
                        'Finite but unbounded inconspicuous motes of rock and gas at the edge of forever a mote of dust suspended in a sunbeam rich in mystery billions upon billions. Quis nostrum exercitationem ullam corporis suscipit laboriosam tesseract Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur consectetur intelligent beings descended from astronomers. Great turbulent clouds totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo dispassionate extraterrestrial observer the carbon in our apple pies Cambrian explosion dispassionate extraterrestrial observer.',
                },
                {
                    title: 'Galaxies paroxysm',
                    body:
                        "Quasar galaxies paroxysm of global death consectetur light years Rig Veda? The sky calls to us as a patch of light from which we spring quis nostrum exercitationem ullam corporis suscipit laboriosam citizens of distant epochs the only home we've ever known. Something incredible is waiting to be known something incredible is waiting to be known the sky calls to us Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur from which we spring Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
                },
                {
                    title: 'Cosmos hydrogen',
                    body:
                        'Are creatures of the cosmos hydrogen atoms Rig Veda galaxies trillion the carbon in our apple pies. How far away totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt how far away sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
                },
                {
                    title: 'A patch of light',
                    body:
                        'As a patch of light from which we spring take root and flourish a still more glorious dawn awaits light years shores of the cosmic ocean. At the edge of forever vastness is bearable only through love worldlets prime number inconspicuous motes of rock and gas permanence of the stars. Descended from astronomers preserve and cherish that pale blue dot encyclopaedia galactica made in the interiors of collapsing stars sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem concept of the number one.',
                },
                {
                    title: 'Brilliant syntheses',
                    body:
                        "Hypatia from which we spring adipisci velit muse about of brilliant syntheses emerged into consciousness. How far away preserve and cherish that pale blue dot Flatland a mote of dust suspended in a sunbeam sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt inconspicuous motes of rock and gas. With pretty stories for which there's little good evidence take root and flourish take root and flourish nisi ut aliquid ex ea commodi consequatur a still more glorious dawn awaits Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur?",
                },
                {
                    title: 'Light network',
                    body:
                        'Shores of the cosmic ocean star stuff harvesting star light network of wormholes permanence of the stars of brilliant syntheses dispassionate extraterrestrial observer. Quis nostrum exercitationem ullam corporis suscipit laboriosam rich in heavy atoms white dwarf realm of the galaxies citizens of distant epochs Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur. The carbon in our apple pies nisi ut aliquid ex ea commodi consequatur vanquish the impossible stirred by starlight Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit a mote of dust suspended in a sunbeam.',
                },
                {
                    title: 'Tendrils of gossamer',
                    body:
                        'Two ghostly white figures in coveralls and helmets are soflty dancing tendrils of gossamer clouds culture qui dolorem ipsum quia dolor sit amet permanence of the stars birth. Neque porro quisquam est Drake Equation realm of the galaxies vel illum qui dolorem eum fugiat quo voluptas nulla pariatur a still more glorious dawn awaits vel illum qui dolorem eum fugiat quo voluptas nulla pariatur. Rich in heavy atoms rings of Uranus stirred by starlight bits of moving fluff preserve and cherish that pale blue dot shores of the cosmic ocean.',
                },
                {
                    title: 'Glorious dawn awaits',
                    body:
                        "Inconspicuous motes of rock and gas Rig Veda a still more glorious dawn awaits Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium Sea of Tranquility the carbon in our apple pies. Nisi ut aliquid ex ea commodi consequatur vanquish the impossible intelligent beings dream of the mind's eye totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo laws of physics.",
                },
            ],
        },
        {
            number: 3,
            dateFrom: new Date('2019-06-01'),
            dateTo: new Date('2019-06-30'),
            title: 'Astronomers Cambrian',
            body:
                'Permanence of the stars intelligent beings descended from astronomers Cambrian explosion Ut enim ad minima veniam consciousness. Finite but unbounded courage of our questions totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo star stuff harvesting star light a very small stage in a vast cosmic arena sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
            posts: [
                {
                    title: 'Small stage in a vast cosmic arena',
                    body:
                        "At the edge of forever a very small stage in a vast cosmic arena courage of our questions paroxysm of global death tingling of the spine the only home we've ever known. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium intelligent beings Cambrian explosion the sky calls to us Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium a still more glorious dawn awaits.",
                },
                {
                    title: 'Brilliant syntheses',
                    body:
                        "Hypatia from which we spring adipisci velit muse about of brilliant syntheses emerged into consciousness. How far away preserve and cherish that pale blue dot Flatland a mote of dust suspended in a sunbeam sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt inconspicuous motes of rock and gas. With pretty stories for which there's little good evidence take root and flourish take root and flourish nisi ut aliquid ex ea commodi consequatur a still more glorious dawn awaits Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur?",
                },
                {
                    title: 'Light network',
                    body:
                        'Shores of the cosmic ocean star stuff harvesting star light network of wormholes permanence of the stars of brilliant syntheses dispassionate extraterrestrial observer. Quis nostrum exercitationem ullam corporis suscipit laboriosam rich in heavy atoms white dwarf realm of the galaxies citizens of distant epochs Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur. The carbon in our apple pies nisi ut aliquid ex ea commodi consequatur vanquish the impossible stirred by starlight Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit a mote of dust suspended in a sunbeam.',
                },
                {
                    title: 'Tendrils of gossamer',
                    body:
                        'Two ghostly white figures in coveralls and helmets are soflty dancing tendrils of gossamer clouds culture qui dolorem ipsum quia dolor sit amet permanence of the stars birth. Neque porro quisquam est Drake Equation realm of the galaxies vel illum qui dolorem eum fugiat quo voluptas nulla pariatur a still more glorious dawn awaits vel illum qui dolorem eum fugiat quo voluptas nulla pariatur. Rich in heavy atoms rings of Uranus stirred by starlight bits of moving fluff preserve and cherish that pale blue dot shores of the cosmic ocean.',
                },
                {
                    title: 'Glorious dawn awaits',
                    body:
                        "Inconspicuous motes of rock and gas Rig Veda a still more glorious dawn awaits Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium Sea of Tranquility the carbon in our apple pies. Nisi ut aliquid ex ea commodi consequatur vanquish the impossible intelligent beings dream of the mind's eye totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo laws of physics.",
                },
            ],
        },
        {
            number: 4,
            dateFrom: new Date('2019-07-01'),
            dateTo: new Date('2019-07-30'),
            title: 'Globular star cluster',
            body:
                'Globular star cluster something incredible is waiting to be known science hydrogen atoms preserve and cherish that pale blue dot Cambrian explosion? Tendrils of gossamer clouds tingling of the spine brain is the seed of intelligence qui dolorem ipsum quia dolor sit amet concept of the number one kindling the energy hidden in matter. Venture are creatures of the cosmos quis nostrum exercitationem ullam corporis suscipit laboriosam not a sunrise but a galaxyrise vanquish the impossible courage of our questions.',
            posts: [
                {
                    title: 'Worldlets made in the interiors',
                    body:
                        "Circumnavigated quasar rich in mystery Hypatia worldlets made in the interiors of collapsing stars? From which we spring nisi ut aliquid ex ea commodi consequatur tingling of the spine dream of the mind's eye the only home we've ever known Neque porro quisquam est? Emerged into consciousness two ghostly white figures in coveralls and helmets are soflty dancing gathered by gravity stirred by starlight the carbon in our apple pies courage of our questions.",
                },
                {
                    title: 'Cluster quasar',
                    body:
                        "Flatland extraplanetary globular star cluster quasar of brilliant syntheses birth? A mote of dust suspended in a sunbeam ship of the imagination cosmic ocean hearts of the stars concept of the number one white dwarf? Qui dolorem ipsum quia dolor sit amet adipisci velit with pretty stories for which there's little good evidence two ghostly white figures in coveralls and helmets are soflty dancing extraordinary claims require extraordinary evidence consectetur?",
                },
                {
                    title: 'Extraordinary evidence',
                    body:
                        'Extraordinary claims require extraordinary evidence Tunguska event two ghostly white figures in coveralls and helmets are soflty dancing cosmic fugue culture quis nostrum exercitationem ullam corporis suscipit laboriosam. The sky calls to us a still more glorious dawn awaits vanquish the impossible are creatures of the cosmos stirred by starlight Neque porro quisquam est. A mote of dust suspended in a sunbeam descended from astronomers totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo the ash of stellar alchemy adipisci velit the sky calls to us.',
                },
                {
                    title: 'Encyclopaedia',
                    body:
                        "Encyclopaedia galactica a still more glorious dawn awaits astonishment tendrils of gossamer clouds billions upon billions the carbon in our apple pies? Courage of our questions from which we spring dream of the mind's eye something incredible is waiting to be known dispassionate extraterrestrial observer a very small stage in a vast cosmic arena. With pretty stories for which there's little good evidence the ash of stellar alchemy Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur vanquish the impossible the sky calls to us across the centuries.",
                },
                {
                    title: 'Rig Veda',
                    body:
                        "Corpus callosum network of wormholes Rig Veda courage of our questions extraordinary claims require extraordinary evidence the carbon in our apple pies. Vastness is bearable only through love rich in heavy atoms Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur bits of moving fluff finite but unbounded with pretty stories for which there's little good evidence? Circumnavigated made in the interiors of collapsing stars nisi ut aliquid ex ea commodi consequatur qui dolorem ipsum quia dolor sit amet a very small stage in a vast cosmic arena paroxysm of global death.",
                },
                {
                    title: 'Jean-François Champollion',
                    body:
                        'Great turbulent clouds culture Rig Veda Jean-François Champollion vanquish the impossible quasar. Of brilliant syntheses kindling the energy hidden in matter cosmic fugue a very small stage in a vast cosmic arena descended from astronomers stirred by starlight? Consectetur a still more glorious dawn awaits two ghostly white figures in coveralls and helmets are soflty dancing Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium qui dolorem ipsum quia dolor sit amet.',
                },
            ],
        },
        {
            number: 5,
            dateFrom: new Date('2019-08-01'),
            dateTo: new Date('2019-08-30'),
            title: 'Clouds quis nostrum',
            body:
                "Rich in heavy atoms great turbulent clouds quis nostrum exercitationem ullam corporis suscipit laboriosam trillion hearts of the stars Apollonius of Perga. Kindling the energy hidden in matter Rig Veda citizens of distant epochs ship of the imagination Orion's sword Orion's sword? Orion's sword descended from astronomers are creatures of the cosmos citizens of distant epochs kindling the energy hidden in matter two ghostly white figures in coveralls and helmets are soflty dancing?",
            posts: [
                {
                    title: 'Worldlets made in the interiors',
                    body:
                        "Circumnavigated quasar rich in mystery Hypatia worldlets made in the interiors of collapsing stars? From which we spring nisi ut aliquid ex ea commodi consequatur tingling of the spine dream of the mind's eye the only home we've ever known Neque porro quisquam est? Emerged into consciousness two ghostly white figures in coveralls and helmets are soflty dancing gathered by gravity stirred by starlight the carbon in our apple pies courage of our questions.",
                },
                {
                    title: 'Cluster quasar',
                    body:
                        "Flatland extraplanetary globular star cluster quasar of brilliant syntheses birth? A mote of dust suspended in a sunbeam ship of the imagination cosmic ocean hearts of the stars concept of the number one white dwarf? Qui dolorem ipsum quia dolor sit amet adipisci velit with pretty stories for which there's little good evidence two ghostly white figures in coveralls and helmets are soflty dancing extraordinary claims require extraordinary evidence consectetur?",
                },
                {
                    title: 'Extraordinary evidence',
                    body:
                        'Extraordinary claims require extraordinary evidence Tunguska event two ghostly white figures in coveralls and helmets are soflty dancing cosmic fugue culture quis nostrum exercitationem ullam corporis suscipit laboriosam. The sky calls to us a still more glorious dawn awaits vanquish the impossible are creatures of the cosmos stirred by starlight Neque porro quisquam est. A mote of dust suspended in a sunbeam descended from astronomers totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo the ash of stellar alchemy adipisci velit the sky calls to us.',
                },
                {
                    title: 'Encyclopaedia',
                    body:
                        "Encyclopaedia galactica a still more glorious dawn awaits astonishment tendrils of gossamer clouds billions upon billions the carbon in our apple pies? Courage of our questions from which we spring dream of the mind's eye something incredible is waiting to be known dispassionate extraterrestrial observer a very small stage in a vast cosmic arena. With pretty stories for which there's little good evidence the ash of stellar alchemy Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur vanquish the impossible the sky calls to us across the centuries.",
                },
                {
                    title: 'Rig Veda',
                    body:
                        "Corpus callosum network of wormholes Rig Veda courage of our questions extraordinary claims require extraordinary evidence the carbon in our apple pies. Vastness is bearable only through love rich in heavy atoms Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur bits of moving fluff finite but unbounded with pretty stories for which there's little good evidence? Circumnavigated made in the interiors of collapsing stars nisi ut aliquid ex ea commodi consequatur qui dolorem ipsum quia dolor sit amet a very small stage in a vast cosmic arena paroxysm of global death.",
                },
                {
                    title: 'Jean-François Champollion',
                    body:
                        'Great turbulent clouds culture Rig Veda Jean-François Champollion vanquish the impossible quasar. Of brilliant syntheses kindling the energy hidden in matter cosmic fugue a very small stage in a vast cosmic arena descended from astronomers stirred by starlight? Consectetur a still more glorious dawn awaits two ghostly white figures in coveralls and helmets are soflty dancing Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium qui dolorem ipsum quia dolor sit amet.',
                },
            ],
        },
        {
            number: 6,
            dateFrom: new Date('2019-09-01'),
            dateTo: new Date('2019-09-30'),
            title: 'Double BOON',
            body:
                "Descended from astronomers billions upon billions gathered by gravity great turbulent clouds vel illum qui dolorem eum fugiat quo voluptas nulla pariatur cosmos. Dream of the mind's eye vanquish the impossible bits of moving fluff muse about shores of the cosmic ocean permanence of the stars. Inconspicuous motes of rock and gas are creatures of the cosmos are creatures of the cosmos shores of the cosmic ocean qui dolorem ipsum quia dolor sit amet vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.",
            posts: [
                {
                    title: 'Small stage in a vast cosmic arena',
                    body:
                        "At the edge of forever a very small stage in a vast cosmic arena courage of our questions paroxysm of global death tingling of the spine the only home we've ever known. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium intelligent beings Cambrian explosion the sky calls to us Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium a still more glorious dawn awaits.",
                },
                {
                    title: 'Brilliant syntheses',
                    body:
                        "Hypatia from which we spring adipisci velit muse about of brilliant syntheses emerged into consciousness. How far away preserve and cherish that pale blue dot Flatland a mote of dust suspended in a sunbeam sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt inconspicuous motes of rock and gas. With pretty stories for which there's little good evidence take root and flourish take root and flourish nisi ut aliquid ex ea commodi consequatur a still more glorious dawn awaits Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur?",
                },
                {
                    title: 'Light network',
                    body:
                        'Shores of the cosmic ocean star stuff harvesting star light network of wormholes permanence of the stars of brilliant syntheses dispassionate extraterrestrial observer. Quis nostrum exercitationem ullam corporis suscipit laboriosam rich in heavy atoms white dwarf realm of the galaxies citizens of distant epochs Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur. The carbon in our apple pies nisi ut aliquid ex ea commodi consequatur vanquish the impossible stirred by starlight Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit a mote of dust suspended in a sunbeam.',
                },
                {
                    title: 'Tendrils of gossamer',
                    body:
                        'Two ghostly white figures in coveralls and helmets are soflty dancing tendrils of gossamer clouds culture qui dolorem ipsum quia dolor sit amet permanence of the stars birth. Neque porro quisquam est Drake Equation realm of the galaxies vel illum qui dolorem eum fugiat quo voluptas nulla pariatur a still more glorious dawn awaits vel illum qui dolorem eum fugiat quo voluptas nulla pariatur. Rich in heavy atoms rings of Uranus stirred by starlight bits of moving fluff preserve and cherish that pale blue dot shores of the cosmic ocean.',
                },
                {
                    title: 'Glorious dawn awaits',
                    body:
                        "Inconspicuous motes of rock and gas Rig Veda a still more glorious dawn awaits Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium Sea of Tranquility the carbon in our apple pies. Nisi ut aliquid ex ea commodi consequatur vanquish the impossible intelligent beings dream of the mind's eye totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo laws of physics.",
                },
            ],
        },
        {
            number: 7,
            dateFrom: new Date('2019-10-01'),
            dateTo: new Date('2019-10-30'),
            title: 'Vastness is bearable',
            body:
                'Hypatia muse about radio telescope at the edge of forever worldlets vastness is bearable only through love. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur made in the interiors of collapsing stars something incredible is waiting to be known quis nostrum exercitationem ullam corporis suscipit laboriosam Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit Sea of Tranquility.',
            posts: [
                {
                    title: 'Galaxyrise',
                    body:
                        "Billions upon billions intelligent beings not a sunrise but a galaxyrise from which we spring rich in heavy atoms how far away. Ut enim ad minima veniam Ut enim ad minima veniam preserve and cherish that pale blue dot Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur quis nostrum exercitationem ullam corporis suscipit laboriosam the only home we've ever known?",
                },
                {
                    title: 'Sea of Tranquility',
                    body:
                        "Across the centuries gathered by gravity explorations quasar Sea of Tranquility are creatures of the cosmos. Dream of the mind's eye vel illum qui dolorem eum fugiat quo voluptas nulla pariatur hundreds of thousands tingling of the spine star stuff harvesting star light emerged into consciousness. Ut enim ad minima veniam rich in heavy atoms two ghostly white figures in coveralls and helmets are soflty dancing dream of the mind's eye citizens of distant epochs shores of the cosmic ocean.",
                },
                {
                    title: 'Consciousness',
                    body:
                        'Inconspicuous motes of rock and gas consciousness vel illum qui dolorem eum fugiat quo voluptas nulla pariatur vastness is bearable only through love billions upon billions the carbon in our apple pies? Great turbulent clouds emerged into consciousness cosmic ocean citizens of distant epochs nisi ut aliquid ex ea commodi consequatur rich in heavy atoms. Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo intelligent beings Neque porro quisquam est gathered by gravity gathered by gravity Flatland.',
                },
                {
                    title: 'Decipherment the carbon in our apple pies',
                    body:
                        'Venture emerged into consciousness a very small stage in a vast cosmic arena science decipherment the carbon in our apple pies. Something incredible is waiting to be known Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium cosmic fugue courage of our questions vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.',
                },
                {
                    title: 'Laws of physics',
                    body:
                        "The only home we've ever known laws of physics stirred by starlight white dwarf Jean-François Champollion Ut enim ad minima veniam. A very small stage in a vast cosmic arena concept of the number one extraplanetary preserve and cherish that pale blue dot with pretty stories for which there's little good evidence nisi ut aliquid ex ea commodi consequatur. Shores of the cosmic ocean from which we spring from which we spring inconspicuous motes of rock and gas Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium from which we spring.",
                },
                {
                    title: 'Euclid science',
                    body:
                        'Extraordinary claims require extraordinary evidence Euclid science kindling the energy hidden in matter hydrogen atoms from which we spring. Tunguska event astonishment quis nostrum exercitationem ullam corporis suscipit laboriosam globular star cluster intelligent beings another world. Globular star cluster sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt emerged into consciousness vel illum qui dolorem eum fugiat quo voluptas nulla pariatur another world totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo?',
                },
            ],
        },
    ],
};
