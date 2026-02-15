/* =============================================
   COORG ESTATE - MYSTERY ADVENTURE GAME
   A traditional Coorg coffee estate exploration game
   ============================================= */

// =============================================
// CONSTANTS & CONFIGURATION
// =============================================

const TILE_SIZE = 32;

// Exterior map dimensions (30x20)
const EXTERIOR_WIDTH = 30;
const EXTERIOR_HEIGHT = 20;
const EXTERIOR_CANVAS_WIDTH = EXTERIOR_WIDTH * TILE_SIZE;   // 960px
const EXTERIOR_CANVAS_HEIGHT = EXTERIOR_HEIGHT * TILE_SIZE; // 640px

// Interior map dimensions (30x22) - rebuilt from reference_house_layout_v2.png
const INTERIOR_WIDTH = 30;
const INTERIOR_HEIGHT = 22;
const INTERIOR_CANVAS_WIDTH = INTERIOR_WIDTH * TILE_SIZE;   // 960px
const INTERIOR_CANVAS_HEIGHT = INTERIOR_HEIGHT * TILE_SIZE; // 704px

const PLAYER_SPEED = 3;

// Exterior Tile Types
const EXT_TILES = {
    COFFEE_PLANTATION: 0,
    DIRT_PATH: 1,
    DENSE_FOREST: 2,
    CLEARED_LAND: 3,
    HOUSE_ROOF: 4,
    OUTBUILDING: 5,
    SOLAR_BUILDINGS: 6,
    ROAD: 7,
    GATE: 8,
    HOUSE_ENTRANCE: 9,
    WELL: 10,
    JACKFRUIT_TREE: 11,
    STORAGE_SHED: 12,
    SAFE: 13,
    POND: 14,
    FLOWERS: 15,
    WITHERED_TREE: 16,  // Blocked entrance to coffee estate (can be cut)
    PEPPER_TREE: 17,    // Pepper vine tree in coffee estate
    CAT: 18,            // Decorative cat
    AXE: 19,            // Axe to cut withered trees
    SHOVEL: 20,         // Shovel to dig up buried items
    BURIED_SAFE: 21,    // Buried safe near jackfruit tree (needs digging)
    KITTEN: 22,         // Small kitten
    NPC_DAD: 23,        // Dad feeding cats
    WHITE_CAT: 24,      // Lost white cat (Dad's favorite)
    COFFEE_BEANS: 25,   // Drying coffee beans
    TO_LAKE: 26,        // Transition to lake area
    // Lake area tiles
    LAKE_WATER: 30,     // Deep lake water
    LAKE_EDGE: 31,      // Lake shore/edge
    PADDY_FIELD: 32,    // Rice paddy field
    PADDY_WATER: 33,    // Flooded paddy
    LAKE_HOUSE: 34,     // House near lake
    LAKE_DOCK: 35,      // Wooden dock
    LAKE_PATH: 36,      // Path in lake area
    LAKE_GRASS: 38,     // Grass in lake area
    LAKE_TREE: 39,      // Trees in lake area
    TO_ESTATE: 37,      // Transition back to estate
    BOAT: 40,           // Boat on water
    FISHING_ROD: 41,    // Fishing rod pickup
    TO_PLANTATION: 42   // Transition to plantation management
};

// Interior Tile Types
const INT_TILES = {
    WOOD_FLOOR: 0,
    WALL: 1,
    PILLAR: 2,
    SUNKEN_COURT: 3,
    DOORWAY: 4,
    RUG: 5,
    PLANT_AREA: 6,
    SOFA: 10,
    COFFEE_TABLE: 11,
    CABINET: 12,
    SIDE_TABLE: 13,
    WALL_ART: 14,
    WALL_CLOCK: 15,
    HANGING_LAMP: 16,
    EXIT_TO_EXTERIOR: 17,
    // Bedroom tiles
    BED_TOP: 20,
    BED_BOTTOM: 21,
    DRESSER: 22,
    BOOKSHELF: 23,
    WINDOW: 24,
    // Kitchen tiles
    COUNTER: 30,
    STOVE: 31,
    SINK: 32,
    FRIDGE: 33,
    KITCHEN_TABLE: 34,
    TILE_FLOOR: 35,
    // Dining tiles
    DINING_TABLE: 36,
    DINING_CHAIR: 37,
    // Living room tiles
    TV_STAND: 38,
    SWING: 39,
    // Outside/veranda
    OUTSIDE: 40,
    // NPCs
    NPC_MANVI: 41,
    NPC_MOM: 42,
    // Special
    BACK_DOOR: 43     // Kitchen back door to shed
};

// Blocked tiles
const EXT_SOLID = [EXT_TILES.DENSE_FOREST, EXT_TILES.HOUSE_ROOF, EXT_TILES.OUTBUILDING,
                   EXT_TILES.SOLAR_BUILDINGS, EXT_TILES.POND, EXT_TILES.STORAGE_SHED,
                   EXT_TILES.WELL, EXT_TILES.JACKFRUIT_TREE, EXT_TILES.SAFE,
                   EXT_TILES.WITHERED_TREE, EXT_TILES.PEPPER_TREE, EXT_TILES.CAT,
                   EXT_TILES.BURIED_SAFE, EXT_TILES.AXE, EXT_TILES.SHOVEL, EXT_TILES.KITTEN,
                   EXT_TILES.NPC_DAD, EXT_TILES.WHITE_CAT, EXT_TILES.COFFEE_BEANS,
                   EXT_TILES.LAKE_WATER, EXT_TILES.LAKE_EDGE, EXT_TILES.PADDY_WATER,
                   EXT_TILES.LAKE_HOUSE, EXT_TILES.LAKE_TREE, EXT_TILES.BOAT,
                   EXT_TILES.FISHING_ROD];
const INT_SOLID = [INT_TILES.WALL, INT_TILES.PILLAR, INT_TILES.SUNKEN_COURT,
                   INT_TILES.PLANT_AREA, INT_TILES.SOFA, INT_TILES.CABINET,
                   INT_TILES.BED_TOP, INT_TILES.BED_BOTTOM, INT_TILES.DRESSER,
                   INT_TILES.BOOKSHELF, INT_TILES.COUNTER, INT_TILES.STOVE,
                   INT_TILES.SINK, INT_TILES.FRIDGE, INT_TILES.KITCHEN_TABLE,
                   INT_TILES.DINING_TABLE, INT_TILES.TV_STAND, INT_TILES.SWING,
                   INT_TILES.NPC_MANVI, INT_TILES.NPC_MOM, INT_TILES.BACK_DOOR];

// Game states
const STATES = {
    LOGIN: 'LOGIN',
    START: 'START',
    CHARACTER_SELECT: 'CHARACTER_SELECT',
    INTRO: 'INTRO',
    EXTERIOR_PLAY: 'EXTERIOR_PLAY',
    INTERIOR_PLAY: 'INTERIOR_PLAY',
    LAKE_PLAY: 'LAKE_PLAY',
    SHED_PLAY: 'SHED_PLAY',
    DIALOGUE: 'DIALOGUE',
    CODE_INPUT: 'CODE_INPUT',
    QUANTITY_SELECT: 'QUANTITY_SELECT',
    PHOTO_VIEW: 'PHOTO_VIEW',
    WIN: 'WIN',
    // Plantation mode states
    PLANTATION_INTRO: 'PLANTATION_INTRO',
    PLANTATION_PLAY: 'PLANTATION_PLAY',
    PLANTATION_MENU: 'PLANTATION_MENU',
    PLANTATION_EVENT: 'PLANTATION_EVENT',
    MINIGAME_PICKING: 'MINIGAME_PICKING',
    MINIGAME_SORTING: 'MINIGAME_SORTING',
    MINIGAME_PROCESSING: 'MINIGAME_PROCESSING'
};

// No login required for public version
const SESSION_KEY = 'coorg_coffee_session';

// Current map type
const MAPS = {
    EXTERIOR: 'EXTERIOR',
    INTERIOR: 'INTERIOR',
    LAKE: 'LAKE',
    SHED: 'SHED',
    PLANTATION: 'PLANTATION'
};

// Lake map dimensions (30x20, same as exterior)
const LAKE_WIDTH = 30;
const LAKE_HEIGHT = 20;
const LAKE_CANVAS_WIDTH = LAKE_WIDTH * TILE_SIZE;
const LAKE_CANVAS_HEIGHT = LAKE_HEIGHT * TILE_SIZE;

// Shed map dimensions (10x12 - storage shed)
const SHED_WIDTH = 10;
const SHED_HEIGHT = 12;
const SHED_CANVAS_WIDTH = SHED_WIDTH * TILE_SIZE;   // 320px
const SHED_CANVAS_HEIGHT = SHED_HEIGHT * TILE_SIZE; // 384px

// Shed Tile Types
const SHED_TILES = {
    FLOOR: 0,           // Dirt/concrete floor
    WALL: 1,            // Wooden walls
    DOOR: 2,            // Exit back to kitchen
    WORKBENCH: 3,       // Wooden workbench
    SHELF: 4,           // Wall shelf with items
    AXE: 5,             // The axe on the wall
    TOOLS: 6,           // Hanging garden tools
    BARREL: 7,          // Old barrels/crates
    WINDOW: 8,          // Small window
    PLANT_POT: 9        // Old plant pots
};

// Shed solid tiles
const SHED_SOLID = [SHED_TILES.WALL, SHED_TILES.WORKBENCH, SHED_TILES.SHELF,
                    SHED_TILES.AXE, SHED_TILES.TOOLS, SHED_TILES.BARREL, SHED_TILES.PLANT_POT];

// =============================================
// PLANTATION SYSTEM - Coffee Estate Management
// =============================================

// Plantation map dimensions (40x30 tiles)
const PLANTATION_WIDTH = 40;
const PLANTATION_HEIGHT = 30;
const PLANTATION_CANVAS_WIDTH = PLANTATION_WIDTH * TILE_SIZE;   // 1280px
const PLANTATION_CANVAS_HEIGHT = PLANTATION_HEIGHT * TILE_SIZE; // 960px

// Plantation Tile Types
const PLANT_TILES = {
    // Terrain & paths
    PLANTATION_PATH: 0,
    PLANTATION_GRASS: 1,
    SHADE_TREE: 2,
    FOREST_BORDER: 3,

    // Coffee plant stages (Arabica uses 10-19, Robusta uses 20-29)
    ARABICA_EMPTY: 10,
    ARABICA_SEEDLING: 11,
    ARABICA_YOUNG: 12,
    ARABICA_MATURE: 13,
    ARABICA_FLOWERING: 14,
    ARABICA_GREEN_BERRY: 15,
    ARABICA_RIPE: 16,
    ARABICA_OVERRIPE: 17,
    ARABICA_DISEASED: 18,

    ROBUSTA_EMPTY: 20,
    ROBUSTA_SEEDLING: 21,
    ROBUSTA_YOUNG: 22,
    ROBUSTA_MATURE: 23,
    ROBUSTA_FLOWERING: 24,
    ROBUSTA_GREEN_BERRY: 25,
    ROBUSTA_RIPE: 26,
    ROBUSTA_OVERRIPE: 27,
    ROBUSTA_DISEASED: 28,

    // Infrastructure (30-49)
    WATER_TANK: 30,
    PUMP_HOUSE: 31,
    GENERATOR: 32,
    PROCESSING_SHED: 33,
    STORAGE_BUILDING: 34,
    WORKER_QUARTERS: 35,
    DRYING_YARD_EMPTY: 36,
    DRYING_YARD_WET: 37,
    DRYING_YARD_DRY: 38,
    FERMENTATION_TANK: 39,

    // Interactables (50-59)
    NOTICE_BOARD: 50,
    PHONE_BOOTH: 51,
    DAD_NPC_PLANT: 52,
    SORTING_TABLE: 53,
    PEPPER_VINE: 54,
    PICKING_ZONE: 55,         // Area for cherry picking mini-game

    // NPCs (70-79)
    NPC_PICKER: 70,           // Coffee picker worker
    NPC_SUPERVISOR: 71,       // Estate supervisor
    NPC_BUYER: 72,            // Coffee buyer (visits during harvest)
    NPC_NEIGHBOR: 73,         // Neighboring Kodava planter

    // Wildlife (80-89)
    WILDLIFE_ELEPHANT: 80,    // Wild elephant (event)
    WILDLIFE_BOAR: 81,        // Wild boar (event)
    WILDLIFE_MONKEY: 82,      // Macaque (event)
    WILDLIFE_HORNBILL: 83,    // Malabar hornbill (decoration)
    WILDLIFE_SNAKE: 84,       // King cobra warning

    // Transitions
    TO_ESTATE: 60
};

// Plantation solid tiles
const PLANT_SOLID = [
    PLANT_TILES.SHADE_TREE, PLANT_TILES.FOREST_BORDER,
    PLANT_TILES.WATER_TANK, PLANT_TILES.PUMP_HOUSE, PLANT_TILES.GENERATOR,
    PLANT_TILES.PROCESSING_SHED, PLANT_TILES.STORAGE_BUILDING, PLANT_TILES.WORKER_QUARTERS,
    PLANT_TILES.FERMENTATION_TANK, PLANT_TILES.NOTICE_BOARD, PLANT_TILES.PHONE_BOOTH,
    PLANT_TILES.DAD_NPC_PLANT, PLANT_TILES.SORTING_TABLE, PLANT_TILES.PEPPER_VINE,
    PLANT_TILES.NPC_PICKER, PLANT_TILES.NPC_SUPERVISOR, PLANT_TILES.NPC_BUYER, PLANT_TILES.NPC_NEIGHBOR,
    PLANT_TILES.WILDLIFE_ELEPHANT, PLANT_TILES.WILDLIFE_BOAR, PLANT_TILES.WILDLIFE_MONKEY,
    PLANT_TILES.WILDLIFE_HORNBILL, PLANT_TILES.WILDLIFE_SNAKE
];

// Plantation season definitions
const SEASONS = {
    POST_HARVEST: { name: 'Post-Harvest', months: [1, 2], color: '#d4a574' },
    BLOSSOM: { name: 'Blossom Season', months: [3, 4], color: '#ffb6c1' },
    PLANTING: { name: 'Planting Season', months: [5], color: '#90ee90' },
    MONSOON: { name: 'Monsoon', months: [6, 7, 8, 9], color: '#87ceeb' },
    RIPENING: { name: 'Ripening', months: [10, 11], color: '#ffa500' },
    HARVEST: { name: 'Harvest Season', months: [11, 12, 1, 2], color: '#ff6347' }
};

// =============================================
// COORG AUTHENTIC EVENTS SYSTEM
// =============================================

const COORG_EVENTS = {
    // Wildlife Events - Authentic to Kodagu region
    WILDLIFE: {
        ELEPHANT_RAID: {
            id: 'elephant_raid',
            title: 'Elephant Alert!',
            description: 'A herd of wild elephants from Nagarhole has entered the estate! They are trampling through the coffee plants.',
            seasons: ['MONSOON', 'RIPENING', 'HARVEST'],
            chance: 0.08,
            dadTip: 'In Coorg, we use firecrackers and searchlights to scare elephants. Never approach them - they are dangerous! The Forest Department should be called.',
            options: [
                { label: 'Call Forest Dept (₹0)', cost: 0, effect: 'forest_help', description: 'Safe but slow - takes 2 days' },
                { label: 'Use Firecrackers (₹500)', cost: 500, effect: 'scare_away', description: 'Quick but some damage' },
                { label: 'Wait It Out', cost: 0, effect: 'damage', description: 'Risk major crop damage' }
            ],
            effects: {
                forest_help: { delay: 2, damage: 0.1, message: 'Forest Department guided the elephants safely back to the forest.' },
                scare_away: { delay: 0, damage: 0.15, message: 'The firecrackers worked! Some plants were trampled but most are safe.' },
                damage: { delay: 0, damage: 0.35, message: 'The elephants feasted on ripe berries and trampled many plants.' }
            }
        },
        WILD_BOAR: {
            id: 'wild_boar',
            title: 'Wild Boar Damage',
            description: 'Wild boars have been rooting through the plantation at night, disturbing soil and damaging young plants.',
            seasons: ['PLANTING', 'MONSOON'],
            chance: 0.12,
            dadTip: 'Boars are attracted to the insects in moist soil. We Kodavas traditionally guard the fields at night. A proper fence is the long-term solution.',
            options: [
                { label: 'Install Fencing (₹8,000)', cost: 8000, effect: 'fence', description: 'Permanent protection' },
                { label: 'Night Patrol (₹1,500)', cost: 1500, effect: 'patrol', description: 'Hire guards for a week' },
                { label: 'Set Traps (₹500)', cost: 500, effect: 'traps', description: 'Humane capture traps' }
            ],
            effects: {
                fence: { delay: 3, damage: 0, message: 'Fencing installed. No more boar problems!', permanent: true },
                patrol: { delay: 0, damage: 0.05, message: 'Night patrol scared off the boars.' },
                traps: { delay: 1, damage: 0.08, message: 'Trapped a boar family - relocated them to the forest.' }
            }
        },
        MONKEY_MENACE: {
            id: 'monkey_menace',
            title: 'Macaque Invasion',
            description: 'A troop of bonnet macaques has discovered your ripening coffee cherries. They are eating and scattering berries everywhere!',
            seasons: ['RIPENING', 'HARVEST'],
            chance: 0.15,
            dadTip: 'These clever fellows know the best cherries! In our family, we used langur sounds to scare them. Now people use recorded calls or hire monkey-catchers.',
            options: [
                { label: 'Recorded Langur Calls (₹300)', cost: 300, effect: 'sound', description: 'Temporary solution' },
                { label: 'Hire Monkey Catchers (₹2,000)', cost: 2000, effect: 'catch', description: 'Professional relocation' },
                { label: 'Chase Them (Free)', cost: 0, effect: 'chase', description: 'They will return tomorrow' }
            ],
            effects: {
                sound: { delay: 0, damage: 0.05, message: 'The langur calls worked for now. They may return in a few days.' },
                catch: { delay: 1, damage: 0.08, message: 'Monkey catchers relocated the troop to a distant forest.' },
                chase: { delay: 0, damage: 0.12, message: 'You chased them away but they took many cherries with them!' }
            }
        },
        SNAKE_SIGHTING: {
            id: 'snake_sighting',
            title: 'King Cobra Spotted!',
            description: 'Workers spotted a large King Cobra near the processing shed. Everyone is afraid to work.',
            seasons: ['MONSOON', 'POST_HARVEST'],
            chance: 0.10,
            dadTip: 'The King Cobra is sacred to us Kodavas - it is Lord Subramanya\'s serpent. Never kill it! Call the snake rescuer or wait for it to leave.',
            options: [
                { label: 'Call Snake Rescuer (₹1,000)', cost: 1000, effect: 'rescue', description: 'Safe professional handling' },
                { label: 'Pray & Wait (Free)', cost: 0, effect: 'wait', description: 'Traditional approach - 1 day pause' },
                { label: 'Create Loud Noise (₹100)', cost: 100, effect: 'noise', description: 'Scare it away with drums' }
            ],
            effects: {
                rescue: { delay: 0, workerMorale: 10, message: 'The snake rescuer safely relocated the cobra. Workers feel safe.' },
                wait: { delay: 1, workerMorale: 5, message: 'After prayers at the Nagaradhane, the cobra left peacefully.' },
                noise: { delay: 0, workerMorale: 0, message: 'The drumming worked! The cobra slithered into the forest.' }
            }
        },
        HORNBILL_VISIT: {
            id: 'hornbill_visit',
            title: 'Malabar Hornbills!',
            description: 'A pair of Great Hornbills has made a nest in the old fig tree! Their presence is considered very auspicious.',
            seasons: ['BLOSSOM', 'MONSOON'],
            chance: 0.05,
            dadTip: 'The Hornbill - we call it "Malabar Kombe" - is a sign of a healthy forest. They eat the pepper berries and disperse seeds. A blessing!',
            options: [
                { label: 'Celebrate! (₹500)', cost: 500, effect: 'celebrate', description: 'Hold a small puja' },
                { label: 'Protect the Tree (₹200)', cost: 200, effect: 'protect', description: 'Install a guard fence' }
            ],
            effects: {
                celebrate: { delay: 0, workerMorale: 15, luck: 0.1, message: 'The puja brought blessings. Workers are in high spirits!' },
                protect: { delay: 0, workerMorale: 10, luck: 0.05, message: 'The hornbills feel safe. Good fortune for the estate!' }
            }
        }
    },

    // Weather Events - Coorg's unique climate
    WEATHER: {
        BLOSSOM_SHOWERS: {
            id: 'blossom_showers',
            title: 'Blossom Showers!',
            description: 'The first pre-monsoon showers have arrived! The coffee plants begin to flower beautifully.',
            seasons: ['BLOSSOM'],
            chance: 0.40,
            isPositive: true,
            dadTip: 'These March-April showers are everything to Coorg coffee! After months of dry weather, this rain triggers flowering. More flowers mean more cherries!',
            options: [
                { label: 'Wonderful!', cost: 0, effect: 'bloom', description: 'Watch the magic happen' }
            ],
            effects: {
                bloom: { triggerFlowering: true, message: 'White jasmine-scented flowers cover the estate. The air is fragrant!' }
            }
        },
        HEAVY_MIST: {
            id: 'heavy_mist',
            title: 'Dense Morning Mist',
            description: 'Thick mist has blanketed the estate for several days. Work is difficult and some plants show fungal signs.',
            seasons: ['MONSOON', 'RIPENING'],
            chance: 0.15,
            dadTip: 'Coorg\'s mist is beautiful but dangerous for coffee. High humidity causes leaf rust fungus. We must spray preventive fungicide.',
            options: [
                { label: 'Spray Fungicide (₹2,500)', cost: 2500, effect: 'spray', description: 'Prevent infection' },
                { label: 'Improve Drainage (₹1,500)', cost: 1500, effect: 'drain', description: 'Long-term solution' },
                { label: 'Wait for Sun', cost: 0, effect: 'wait', description: 'Risk fungal spread' }
            ],
            effects: {
                spray: { delay: 0, damage: 0, message: 'Fungicide applied. Plants protected from leaf rust.' },
                drain: { delay: 2, damage: 0.05, message: 'Better drainage installed. Future mist will be less harmful.' },
                wait: { delay: 0, damage: 0.20, message: 'Leaf rust has spread to several plants. Treat them quickly!' }
            }
        },
        UNSEASONAL_RAIN: {
            id: 'unseasonal_rain',
            title: 'Unseasonal Downpour',
            description: 'Unexpected heavy rain during harvest season! The drying coffee is at risk.',
            seasons: ['HARVEST', 'POST_HARVEST'],
            chance: 0.10,
            dadTip: 'Quick! Cover the drying yards with tarpaulins! If wet coffee sits too long, it will ferment badly and taste sour.',
            options: [
                { label: 'Cover Immediately! (₹800)', cost: 800, effect: 'cover', description: 'Buy emergency tarps' },
                { label: 'Move to Shed (Free)', cost: 0, effect: 'move', description: 'Quick but labor-intensive' }
            ],
            effects: {
                cover: { delay: 0, inventoryLoss: 0, message: 'Tarps secured! The drying beans are safe.' },
                move: { delay: 0, inventoryLoss: 0.05, message: 'Workers moved most beans inside. Some got wet but are salvageable.' }
            }
        },
        DROUGHT_SPELL: {
            id: 'drought_spell',
            title: 'Extended Dry Spell',
            description: 'No rain for weeks. The water tank is depleting fast and plants are stressed.',
            seasons: ['POST_HARVEST', 'BLOSSOM'],
            chance: 0.12,
            dadTip: 'Coorg usually has good rainfall, but climate is changing. We must use mulching to retain soil moisture and order tanker water if needed.',
            options: [
                { label: 'Order Water Tanker (₹5,000)', cost: 5000, effect: 'tanker', description: 'Fill the tank' },
                { label: 'Apply Mulch (₹1,500)', cost: 1500, effect: 'mulch', description: 'Conserve soil moisture' },
                { label: 'Ration Water (Free)', cost: 0, effect: 'ration', description: 'Plants will suffer' }
            ],
            effects: {
                tanker: { delay: 0, water: 4000, message: 'Tanker delivered 4000L of water.' },
                mulch: { delay: 1, waterReduction: 0.5, message: 'Mulching applied. Water consumption reduced by 50%!' },
                ration: { delay: 0, plantHealth: -20, message: 'Plants are stressed. Health declining.' }
            }
        },
        THUNDERSTORM: {
            id: 'thunderstorm',
            title: 'Severe Thunderstorm',
            description: 'A powerful storm with lightning has knocked out the power grid. Shade trees have fallen.',
            seasons: ['MONSOON'],
            chance: 0.08,
            dadTip: 'Monsoon storms are fierce in the Ghats! Check the generator fuel. Fallen trees must be cleared quickly - they can damage plants underneath.',
            options: [
                { label: 'Emergency Cleanup (₹3,000)', cost: 3000, effect: 'cleanup', description: 'Hire extra labor' },
                { label: 'DIY Cleanup (Free)', cost: 0, effect: 'diy', description: 'Takes 3 days' }
            ],
            effects: {
                cleanup: { delay: 1, damage: 0.05, powerOut: 2, message: 'Trees cleared quickly. Minor damage to plants.' },
                diy: { delay: 3, damage: 0.15, powerOut: 3, message: 'Slow cleanup. Some plants crushed under debris.' }
            }
        }
    },

    // Cultural Events - Kodava traditions
    CULTURAL: {
        KAILPODH: {
            id: 'kailpodh',
            title: 'Kailpodh Festival!',
            description: 'It\'s the harvest thanksgiving festival of Kodagu! Workers want time off to celebrate with their families.',
            seasons: ['HARVEST'],
            chance: 0.20,
            isPositive: true,
            dadTip: 'Kailpodh in September celebrates our weapons and ancestors. Every Kodava house takes out the ceremonial swords. Give workers leave - they\'ll work harder after!',
            options: [
                { label: 'Give 2-Day Holiday', cost: 0, effect: 'holiday', description: 'Workers celebrate' },
                { label: 'Half-Day + Bonus (₹2,000)', cost: 2000, effect: 'bonus', description: 'Work in morning, feast in evening' }
            ],
            effects: {
                holiday: { delay: 2, workerMorale: 25, message: 'Workers are grateful! They returned energized for harvest.' },
                bonus: { delay: 0.5, workerMorale: 20, money: -2000, message: 'The bonus was appreciated. Festival feast was grand!' }
            }
        },
        CAUVERY_THEERTHODBHAVA: {
            id: 'cauvery_festival',
            title: 'Cauvery Theerthodbhava',
            description: 'The sacred moment when Goddess Cauvery rises at Talacauvery! A major pilgrimage event.',
            seasons: ['RIPENING'],  // October 17
            chance: 0.15,
            isPositive: true,
            dadTip: 'This is our most sacred day! At dawn on Tula Sankramana, the spring at Talacauvery miraculously rises. Take blessings - the water is holy.',
            options: [
                { label: 'Take Workers to Temple (₹1,500)', cost: 1500, effect: 'pilgrimage', description: 'Full day off' },
                { label: 'Evening Puja at Estate (₹500)', cost: 500, effect: 'puja', description: 'Celebrate locally' }
            ],
            effects: {
                pilgrimage: { delay: 1, workerMorale: 30, luck: 0.15, message: 'The sacred waters blessed everyone. Great auspiciousness!' },
                puja: { delay: 0, workerMorale: 15, luck: 0.05, message: 'The estate puja brought peace and blessings.' }
            }
        },
        PUTTARI: {
            id: 'puttari',
            title: 'Puttari - New Rice Festival',
            description: 'Time for Puttari, the rice harvest festival! The neighboring paddy fields are golden.',
            seasons: ['RIPENING'],  // November-December
            chance: 0.15,
            isPositive: true,
            dadTip: 'Puttari means "new rice" in Kodava. We offer the first rice to ancestors at the Ainmane. It\'s also when we hunt with the traditional Kodava rituals.',
            options: [
                { label: 'Host Feast (₹3,000)', cost: 3000, effect: 'feast', description: 'Traditional pandi curry feast' },
                { label: 'Simple Celebration (₹500)', cost: 500, effect: 'simple', description: 'Rice payasam for all' }
            ],
            effects: {
                feast: { delay: 0, workerMorale: 35, message: 'The feast was legendary! Pandi curry, kadambuttu, and payasam!' },
                simple: { delay: 0, workerMorale: 15, message: 'Workers enjoyed the traditional payasam.' }
            }
        },
        BUYER_VISIT: {
            id: 'buyer_visit',
            title: 'Coffee Buyer Arrival',
            description: 'A renowned coffee buyer from Bangalore has come to assess your harvest! Good prices possible.',
            seasons: ['HARVEST', 'POST_HARVEST'],
            chance: 0.12,
            isPositive: true,
            dadTip: 'Impress him with our MNEB beans - that\'s Mysore Nuggets Extra Bold, our premium grade! If he likes it, he\'ll pay above market rate.',
            options: [
                { label: 'Show Premium Beans', cost: 0, effect: 'premium', description: 'Offer MNEB grade' },
                { label: 'Full Estate Tour', cost: 0, effect: 'tour', description: 'Show entire operation' }
            ],
            effects: {
                premium: { delay: 0, priceBonus: 0.15, message: 'He was impressed with the MNEB quality! Premium price secured.' },
                tour: { delay: 0, priceBonus: 0.25, recurring: true, message: 'He loved the estate! He\'ll be a regular buyer now.' }
            }
        },
        AINMANE_CEREMONY: {
            id: 'ainmane_ceremony',
            title: 'Ainmane Gathering',
            description: 'Your clan\'s Ainmane (ancestral home) is hosting the annual family gathering. Important for relations.',
            seasons: ['POST_HARVEST', 'BLOSSOM'],
            chance: 0.10,
            isPositive: true,
            dadTip: 'The Ainmane is the heart of Kodava culture - the eldest member lives there with our ancestors\' weapons and valuables. We must attend!',
            options: [
                { label: 'Attend with Gifts (₹2,000)', cost: 2000, effect: 'attend', description: 'Bring estate coffee' },
                { label: 'Send Representative (₹500)', cost: 500, effect: 'send', description: 'Worker delivers gifts' }
            ],
            effects: {
                attend: { delay: 1, reputation: 20, message: 'Elders blessed your estate. A young cousin may join to learn!' },
                send: { delay: 0, reputation: 5, message: 'The family appreciated the gesture.' }
            }
        }
    },

    // Pest & Disease Events (from plan)
    PEST: {
        BERRY_BORER: {
            id: 'berry_borer',
            title: 'Coffee Berry Borer!',
            description: 'The dreaded berry borer beetle has been spotted! These tiny pests bore into cherries and ruin the beans inside.',
            seasons: ['RIPENING', 'HARVEST'],
            chance: 0.15,
            dadTip: 'The borer is coffee\'s worst enemy! Spray Beauveria bassiana - it\'s a fungus that kills the beetle naturally. Or release braconid wasps - they are natural predators.',
            options: [
                { label: 'Bio-spray (₹2,000)', cost: 2000, effect: 'spray', description: 'Beauveria bassiana' },
                { label: 'Predator Wasps (₹5,000)', cost: 5000, effect: 'predator', description: 'Natural but slow' },
                { label: 'Do Nothing', cost: 0, effect: 'nothing', description: 'Risk major loss' }
            ],
            effects: {
                spray: { delay: 1, damage: 0.10, message: 'Bio-spray applied. Borer population reducing.' },
                predator: { delay: 3, damage: 0.05, permanent: true, message: 'Wasps established! Long-term protection.' },
                nothing: { delay: 0, damage: 0.40, message: 'Borer infestation spread. Heavy losses!' }
            }
        },
        LEAF_RUST: {
            id: 'leaf_rust',
            title: 'Coffee Leaf Rust',
            description: 'Orange powdery spots on the leaves - it\'s Hemileia vastatrix, the feared coffee rust fungus!',
            seasons: ['MONSOON'],
            chance: 0.12,
            dadTip: 'Leaf rust wiped out Ceylon\'s coffee in the 1870s! Act fast - remove infected leaves and spray copper fungicide. Good shade management helps prevent it.',
            options: [
                { label: 'Copper Spray (₹3,000)', cost: 3000, effect: 'copper', description: 'Standard treatment' },
                { label: 'Prune Infected (₹1,000)', cost: 1000, effect: 'prune', description: 'Manual removal' },
                { label: 'Both (₹3,500)', cost: 3500, effect: 'both', description: 'Most effective' }
            ],
            effects: {
                copper: { delay: 2, damage: 0.12, message: 'Fungicide slowing the spread.' },
                prune: { delay: 1, damage: 0.20, message: 'Infected branches removed but some spread.' },
                both: { delay: 2, damage: 0.05, message: 'Combination treatment was very effective!' }
            }
        },
        STEM_BORER: {
            id: 'stem_borer',
            title: 'White Stem Borer',
            description: 'Dead branches spotted - the white stem borer has attacked! Larvae tunnel through the main stem.',
            seasons: ['MONSOON', 'POST_HARVEST'],
            chance: 0.08,
            dadTip: 'A nasty pest! Inject chlorpyriphos into the bore holes with a syringe. For severe cases, we must cut and burn affected plants.',
            options: [
                { label: 'Inject Treatment (₹4,000)', cost: 4000, effect: 'inject', description: 'Save infected plants' },
                { label: 'Remove & Burn (₹1,500)', cost: 1500, effect: 'remove', description: 'Prevent spread' },
                { label: 'Call Expert (₹3,000)', cost: 3000, effect: 'expert', description: 'Coffee Board specialist' }
            ],
            effects: {
                inject: { delay: 2, damage: 0.08, message: 'Treatment saved most affected plants.' },
                remove: { delay: 1, damage: 0.15, plantLoss: 3, message: 'Removed 3 badly infected plants. Spread stopped.' },
                expert: { delay: 1, damage: 0.05, message: 'Expert identified early and treated efficiently!' }
            }
        }
    },

    // Labor Events
    LABOR: {
        SHORTAGE: {
            id: 'labor_shortage',
            title: 'Worker Shortage',
            description: 'It\'s peak harvest but workers are scarce - many have gone to other estates or government work.',
            seasons: ['HARVEST'],
            chance: 0.20,
            dadTip: 'Labor shortage is the biggest challenge now! Everyone wants MGNREGA jobs. Offer better wages or call workers from Hassan district.',
            options: [
                { label: 'Increase Wages 20% (₹/day)', cost: 0, effect: 'wage', description: 'Attract local workers' },
                { label: 'Hire from Hassan (₹5,000)', cost: 5000, effect: 'import', description: 'Transport + advance' },
                { label: 'Family Picking Day', cost: 0, effect: 'family', description: 'Everyone pitches in!' }
            ],
            effects: {
                wage: { delay: 2, workers: 3, wageIncrease: 0.20, message: 'Higher wages attracted 3 new workers!' },
                import: { delay: 1, workers: 5, message: 'Workers from Hassan joined the team.' },
                family: { delay: 0, harvest: 0.15, message: 'Family picking was fun! Got 15% of harvest done.' }
            }
        },
        DISPUTE: {
            id: 'worker_dispute',
            title: 'Worker Dispute',
            description: 'Two senior workers are in a heated argument about work assignments. Others are taking sides.',
            seasons: ['HARVEST', 'MONSOON'],
            chance: 0.08,
            dadTip: 'Worker harmony is crucial! Listen to both sides and make a fair decision. Sometimes a small bonus or day off calms things.',
            options: [
                { label: 'Mediate Personally', cost: 0, effect: 'mediate', description: 'Spend time talking' },
                { label: 'Bonus for Both (₹1,000)', cost: 1000, effect: 'bonus', description: 'Peace offering' },
                { label: 'Ignore It', cost: 0, effect: 'ignore', description: 'May escalate' }
            ],
            effects: {
                mediate: { delay: 0, workerMorale: 10, message: 'You heard both sides. Dispute resolved fairly.' },
                bonus: { delay: 0, workerMorale: 15, message: 'The bonus smoothed things over.' },
                ignore: { delay: 0, workerMorale: -20, workerLoss: 1, message: 'One worker quit in frustration!' }
            }
        }
    }
};

// Track triggered events (prevent repeats within same season)
let triggeredEvents = new Set();
let lastEventCheck = null;
let pendingEventEffect = null;  // Store effect to apply after event closes

// Plantation management data
const plantation = {
    // Calendar system
    calendar: {
        day: 1,
        month: 11,  // Start in November (harvest season)
        year: 2066,
        season: 'HARVEST',
        dayPhase: 'MORNING'  // MORNING, AFTERNOON, EVENING
    },

    // Plant grids (6x6 = 36 plants each)
    plants: {
        arabica: [],
        robusta: []
    },

    // Workers
    workers: [],
    maxWorkers: 10,

    // Tutorial tracking
    tutorialComplete: false,
    shownTips: new Set(),

    // Plantation mode active
    active: false
};

// Resource management
const plantationResources = {
    // Starting capital
    money: 50000,

    // Water system
    water: {
        stored: 3000,
        tankCapacity: 5000,
        dailyUsagePerWorker: 10,
        dailyUsagePerPlant: 2
    },

    // Power system
    power: {
        gridAvailable: true,
        generatorFuel: 50,
        fuelCapacity: 100,
        dailyFuelConsumption: 5
    },

    // Coffee inventory (in kg)
    inventory: {
        cherries: { arabica: 0, robusta: 0 },
        parchment: { arabica: 0, robusta: 0 },
        greenBeans: {
            arabica: { MNEB: 0, A: 0, B: 0, C: 0 },
            robusta: { A: 0, B: 0, C: 0 }
        }
    },

    // Supplies
    supplies: {
        fertilizer: 20,
        pesticide: 10,
        seedlings: { arabica: 0, robusta: 0 }
    }
};

// Market prices (per kg, with variance)
const marketPrices = {
    arabica: {
        MNEB: { base: 450, variance: 50 },
        A: { base: 350, variance: 40 },
        B: { base: 280, variance: 30 },
        C: { base: 200, variance: 25 }
    },
    robusta: {
        A: { base: 180, variance: 20 },
        B: { base: 140, variance: 15 },
        C: { base: 100, variance: 10 }
    }
};

// Current calculated prices (updated daily)
let currentMarketPrices = {
    arabica: { MNEB: 450, A: 350, B: 280, C: 200 },
    robusta: { A: 180, B: 140, C: 100 },
    seasonModifier: 1.0,
    lastUpdated: null
};

// Season modifiers for coffee prices
const SEASON_PRICE_MODIFIERS = {
    POST_HARVEST: 0.95,    // Prices lower after harvest glut
    BLOSSOM: 1.0,          // Normal prices
    PLANTING: 1.05,        // Slightly higher
    MONSOON: 1.1,          // Higher - less available
    RIPENING: 1.15,        // Higher - anticipation of harvest
    HARVEST: 0.9           // Lower - market flooded with beans
};

// Calculate current market prices based on season and random variance
function updateMarketPrices() {
    const season = plantation.calendar.season;
    const modifier = SEASON_PRICE_MODIFIERS[season] || 1.0;
    currentMarketPrices.seasonModifier = modifier;
    currentMarketPrices.lastUpdated = `${plantation.calendar.month}/${plantation.calendar.day}`;

    // Calculate arabica prices
    for (const grade of ['MNEB', 'A', 'B', 'C']) {
        const priceData = marketPrices.arabica[grade];
        const variance = (Math.random() * 2 - 1) * priceData.variance; // -variance to +variance
        currentMarketPrices.arabica[grade] = Math.round((priceData.base + variance) * modifier);
    }

    // Calculate robusta prices
    for (const grade of ['A', 'B', 'C']) {
        const priceData = marketPrices.robusta[grade];
        const variance = (Math.random() * 2 - 1) * priceData.variance;
        currentMarketPrices.robusta[grade] = Math.round((priceData.base + variance) * modifier);
    }

    // Add buyer premium if applicable
    if (plantation.priceBonus && plantation.priceBonus > 0) {
        for (const grade in currentMarketPrices.arabica) {
            currentMarketPrices.arabica[grade] = Math.round(currentMarketPrices.arabica[grade] * (1 + plantation.priceBonus));
        }
        for (const grade in currentMarketPrices.robusta) {
            currentMarketPrices.robusta[grade] = Math.round(currentMarketPrices.robusta[grade] * (1 + plantation.priceBonus));
        }
    }
}

// Worker types
const WORKER_TYPES = {
    PICKER: {
        name: 'Cherry Picker',
        wage: 600,
        skills: ['picking'],
        description: 'Skilled at harvesting ripe cherries',
        baseEfficiency: 0.8
    },
    PROCESSOR: {
        name: 'Processing Worker',
        wage: 500,
        skills: ['drying', 'sorting', 'processing'],
        description: 'Handles pulping, drying, and sorting',
        baseEfficiency: 0.75
    },
    MAINTENANCE: {
        name: 'Estate Worker',
        wage: 450,
        skills: ['watering', 'pruning', 'pestControl'],
        description: 'General upkeep and pest control',
        baseEfficiency: 0.7
    }
};

// Task definitions for worker assignment
const WORKER_TASKS = {
    IDLE: { name: 'Resting', energyCost: 0, output: 0 },
    PICKING: { name: 'Picking Cherries', energyCost: 15, output: 'cherries', requiredSkill: 'picking' },
    WATERING: { name: 'Watering Plants', energyCost: 10, output: 'plantHealth', requiredSkill: 'watering' },
    PRUNING: { name: 'Pruning Plants', energyCost: 12, output: 'plantHealth', requiredSkill: 'pruning' },
    PEST_CONTROL: { name: 'Pest Control', energyCost: 12, output: 'pestRemoval', requiredSkill: 'pestControl' },
    DRYING: { name: 'Drying Beans', energyCost: 8, output: 'parchment', requiredSkill: 'drying' },
    SORTING: { name: 'Sorting Beans', energyCost: 10, output: 'greenBeans', requiredSkill: 'sorting' },
    PROCESSING: { name: 'Processing', energyCost: 14, output: 'processing', requiredSkill: 'processing' }
};

// Available workers pool (regenerates when hiring)
let availableWorkersPool = [];

// Initialize plant grids
// Map from tile type to stage name
const TILE_TO_STAGE = {
    [PLANT_TILES.ARABICA_SEEDLING]: 'SEEDLING',
    [PLANT_TILES.ARABICA_YOUNG]: 'YOUNG',
    [PLANT_TILES.ARABICA_MATURE]: 'MATURE',
    [PLANT_TILES.ARABICA_FLOWERING]: 'FLOWERING',
    [PLANT_TILES.ARABICA_GREEN_BERRY]: 'GREEN_BERRY',
    [PLANT_TILES.ARABICA_RIPE]: 'RIPE',
    [PLANT_TILES.ARABICA_OVERRIPE]: 'OVERRIPE',
    [PLANT_TILES.ARABICA_DISEASED]: 'DISEASED',
    [PLANT_TILES.ROBUSTA_SEEDLING]: 'SEEDLING',
    [PLANT_TILES.ROBUSTA_YOUNG]: 'YOUNG',
    [PLANT_TILES.ROBUSTA_MATURE]: 'MATURE',
    [PLANT_TILES.ROBUSTA_FLOWERING]: 'FLOWERING',
    [PLANT_TILES.ROBUSTA_GREEN_BERRY]: 'GREEN_BERRY',
    [PLANT_TILES.ROBUSTA_RIPE]: 'RIPE',
    [PLANT_TILES.ROBUSTA_OVERRIPE]: 'OVERRIPE',
    [PLANT_TILES.ROBUSTA_DISEASED]: 'DISEASED'
};

// Map from stage name to tile offset (add to base: arabica=10, robusta=20)
const STAGE_TO_TILE_OFFSET = {
    'EMPTY': 0, 'SEEDLING': 1, 'YOUNG': 2, 'MATURE': 3,
    'FLOWERING': 4, 'GREEN_BERRY': 5, 'RIPE': 6, 'OVERRIPE': 7, 'DISEASED': 8
};

function initializePlantationPlants() {
    plantation.plants.arabica = [];
    plantation.plants.robusta = [];
    plantation.plantMap = {}; // Map of "x,y" -> plant object

    // Scan the map to find actual coffee plant positions
    for (let y = 0; y < PLANTATION_MAP.length; y++) {
        for (let x = 0; x < PLANTATION_MAP[y].length; x++) {
            const tile = PLANTATION_MAP[y][x];

            // Check if this is an arabica tile (10-18)
            if (tile >= 10 && tile <= 18) {
                const stage = TILE_TO_STAGE[tile] || 'MATURE';
                const plant = {
                    id: `A_${x}_${y}`,
                    type: 'arabica',
                    x: x,
                    y: y,
                    stage: stage,
                    health: 100,
                    waterLevel: 70,
                    daysInStage: 0,
                    hasPest: false,
                    pestType: null,
                    yield: 2.5
                };
                plantation.plants.arabica.push(plant);
                plantation.plantMap[`${x},${y}`] = plant;
            }
            // Check if this is a robusta tile (20-28)
            else if (tile >= 20 && tile <= 28) {
                const stage = TILE_TO_STAGE[tile] || 'MATURE';
                const plant = {
                    id: `R_${x}_${y}`,
                    type: 'robusta',
                    x: x,
                    y: y,
                    stage: stage,
                    health: 100,
                    waterLevel: 70,
                    daysInStage: 0,
                    hasPest: false,
                    pestType: null,
                    yield: 4.0
                };
                plantation.plants.robusta.push(plant);
                plantation.plantMap[`${x},${y}`] = plant;
            }
        }
    }
    console.log(`Initialized ${plantation.plants.arabica.length} Arabica and ${plantation.plants.robusta.length} Robusta plants from map`);
}

// Update map tile to reflect plant stage
function syncPlantToMap(plant) {
    const baseOffset = plant.type === 'arabica' ? 10 : 20;
    const stageOffset = STAGE_TO_TILE_OFFSET[plant.stage] || 3; // default to MATURE
    PLANTATION_MAP[plant.y][plant.x] = baseOffset + stageOffset;
}

// Get plant at a map position
function getPlantAt(x, y) {
    return plantation.plantMap ? plantation.plantMap[`${x},${y}`] : null;
}

// Plantation Map (40x30 tiles)
// Legend: 0=path, 1=grass, 2=shade_tree, 3=forest, 10-18=arabica stages, 20-28=robusta stages
// 30-39=infrastructure, 50-59=interactables, 60=exit
// Organic forest layout - asymmetric, natural clustering
const PLANTATION_MAP = [
    // Row 0: Forest border with ENTRANCE gap
    [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,1,1,1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
    // Row 1: Open entrance area
    [3,3,1,1,2,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,2,1,1,1,1,3,3],
    // Row 2-3: Dad, notice board area - organic clearing (added neighbor NPC)
    [3,3,1,1,1,16,1,1,2,1,1,1,16,1,1,1,1,1,1,1,1,1,1,16,1,1,1,50,1,30,30,1,1,73,1,16,1,1,3,3],
    [3,3,1,52,1,1,16,1,1,1,16,1,1,2,1,16,1,1,1,1,1,1,16,1,1,2,1,1,1,1,1,1,31,1,1,1,2,1,3,3],
    // Row 4-5: Arabica clusters - natural groupings
    [3,3,2,1,16,16,1,16,1,55,1,16,16,1,1,16,1,2,1,1,16,1,1,16,16,1,1,16,1,55,2,1,16,16,1,1,1,1,3,3],
    [3,3,1,16,1,16,16,1,2,1,16,1,16,1,16,16,1,1,16,1,1,16,16,1,16,1,16,1,16,16,1,16,1,16,1,1,16,1,3,3],
    // Row 6-7: More arabica with shade trees scattered randomly
    [3,3,1,1,16,1,1,16,1,16,1,1,2,16,1,1,16,16,1,16,1,1,16,1,2,1,16,16,1,1,16,1,1,2,16,16,1,1,3,3],
    [3,3,16,1,1,2,16,1,16,1,16,16,1,1,16,1,1,1,2,1,16,16,1,16,1,16,1,1,16,1,1,16,16,1,1,16,1,2,3,3],
    // Row 8-9: Transition area with mixed plants (added picker NPC and hornbill)
    [3,3,1,16,16,1,1,16,1,2,1,16,1,16,1,16,16,70,1,16,1,1,2,1,16,1,16,16,83,16,2,1,1,16,1,1,16,1,3,3],
    [3,3,1,1,1,16,1,1,16,1,1,1,16,1,2,1,1,16,1,1,1,16,1,1,1,16,1,1,2,1,1,16,1,1,16,1,1,1,3,3],
    // Row 10-12: Processing area - natural clearing with buildings (added supervisor)
    [3,3,1,2,1,1,1,1,1,1,33,33,33,1,71,1,2,1,1,1,1,1,1,1,2,1,1,1,39,39,1,1,1,2,1,1,1,1,3,3],
    [3,3,1,1,1,2,1,1,1,1,33,33,33,1,1,36,36,36,1,1,37,37,37,1,1,38,38,38,39,39,53,1,1,1,1,2,1,1,3,3],
    [3,3,1,1,1,1,1,2,1,1,1,1,1,1,1,36,36,36,1,1,37,37,37,1,1,38,38,38,1,1,1,1,2,1,1,1,1,1,3,3],
    // Row 13-14: Robusta section starts - different clustering pattern
    [3,3,1,26,1,26,26,1,1,2,1,26,1,26,26,1,1,26,1,1,2,1,26,26,1,26,1,1,26,26,1,1,2,1,26,1,1,1,3,3],
    [3,3,26,1,26,1,1,26,26,1,26,1,2,1,26,26,1,1,26,26,1,26,1,1,26,1,26,26,1,1,26,26,1,26,1,26,1,1,3,3],
    // Row 15-16: Dense robusta area
    [3,3,1,2,1,26,26,1,26,55,1,26,26,1,26,1,26,1,2,1,26,1,26,26,1,2,1,26,55,26,26,1,26,1,26,1,2,1,3,3],
    [3,3,26,1,26,1,26,26,1,26,2,1,26,26,1,26,1,26,1,26,26,1,26,1,26,1,26,1,26,26,1,26,2,26,1,26,1,1,3,3],
    // Row 17-18: Robusta with natural gaps
    [3,3,1,26,1,2,1,26,26,1,1,26,1,26,2,1,26,1,1,26,1,2,26,1,26,26,1,26,2,1,26,1,1,26,26,1,26,1,3,3],
    [3,3,1,1,26,1,26,1,26,26,1,1,2,1,26,26,1,26,26,1,1,26,1,26,1,1,26,1,1,26,26,1,26,1,2,1,1,2,3,3],
    // Row 19: Open corridor
    [3,3,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,3,3],
    // Row 20-22: Infrastructure scattered naturally
    [3,3,1,35,35,35,1,1,2,1,1,1,1,1,2,1,1,1,1,1,1,1,1,32,32,1,1,2,1,1,1,1,1,2,1,1,1,1,3,3],
    [3,3,1,35,35,35,1,1,51,1,1,2,34,34,34,1,1,1,2,1,1,1,1,32,32,1,1,1,1,2,1,1,1,1,1,2,1,1,3,3],
    [3,3,2,1,1,1,1,1,1,1,1,1,34,34,34,1,2,1,1,1,1,2,1,1,1,1,1,1,2,1,1,1,1,1,2,1,1,1,3,3],
    // Row 23-26: Lower forest area with pepper vines
    [3,3,1,1,54,1,2,1,1,54,1,1,1,54,1,1,2,1,54,1,1,1,54,1,2,1,54,1,1,1,54,2,1,1,54,1,1,1,3,3],
    [3,3,1,2,1,1,1,54,1,2,1,1,54,1,1,2,1,54,1,1,2,1,1,54,1,1,2,54,1,1,1,1,54,1,2,1,1,2,3,3],
    [3,3,1,1,54,2,1,1,1,1,54,1,2,1,1,54,1,1,1,54,1,2,1,1,54,1,1,1,54,2,1,1,1,54,1,1,54,1,3,3],
    [3,3,2,1,1,1,1,2,54,1,1,1,1,2,54,1,1,1,1,1,2,1,1,54,1,1,2,1,1,1,2,54,1,1,1,2,1,1,3,3],
    // Row 27-28: EXIT area - clear path through forest
    [3,3,1,1,2,1,1,1,1,2,1,1,1,1,2,1,1,1,1,60,60,60,1,1,1,2,1,1,1,1,2,1,1,1,1,2,1,1,3,3],
    [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,60,60,60,1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
    // Row 29: Forest border (south)
    [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]
];

// Plantation colors - darker forest atmosphere
const PLANTATION_COLORS = {
    path: '#8a6a50',
    path_dark: '#6a4a30',
    grass: '#3a7a3a',           // Darker forest grass
    grass_dark: '#2a5a2a',      // Even darker grass shadows
    grass_light: '#4a8a4a',     // Slightly lighter grass highlights
    shade_tree_leaves: '#1a4a1a', // Dark tree canopy
    shade_tree_trunk: '#4a3018',  // Dark trunk
    forest: '#0a2a0a',          // Very dark forest border
    // Coffee plant colors
    plant_base: '#2a5a2a',
    plant_leaves: '#3a7a3a',
    cherry_green: '#348a34',
    cherry_ripe: '#cc2222',
    cherry_overripe: '#551111',
    flower_white: '#eeeedd',
    // Infrastructure
    building_wall: '#806040',
    building_roof: '#604020',
    building_dark: '#402010',
    tank_blue: '#3366aa',
    drying_yard: '#a08060',
    drying_wet: '#6a4020',
    drying_dry: '#b08050',
    ferment_tank: '#606060'
};

// =============================================
// COLOR PALETTES - Pokemon Style
// =============================================

const EXTERIOR_COLORS = {
    // Grass
    grass_light: '#98d878',
    grass_mid: '#80c860',
    grass_dark: '#68b048',
    grass_accent: '#58a038',
    // Trees
    tree_dark: '#305830',
    tree_mid: '#408040',
    tree_light: '#58a048',
    tree_trunk: '#805830',
    // Paths
    path_light: '#e8d8b8',
    path_mid: '#d8c8a8',
    path_dark: '#c8b898',
    // House
    roof_red: '#e86048',
    roof_dark: '#c04830',
    roof_shadow: '#a03820',
    wall_cream: '#f8f0e0',
    wall_shadow: '#e0d8c8',
    window_blue: '#58a8f8',
    window_dark: '#4088d8',
    window_frame: '#f8f8f8',
    door_brown: '#a06030',
    door_dark: '#805020',
    // Water
    water_light: '#58b8f8',
    water_mid: '#4898d8',
    water_dark: '#3878b8',
    // Flowers
    flower_red: '#e85048',
    flower_pink: '#f898a8',
    flower_yellow: '#f8d848',
    // Fence
    fence_white: '#f8f8f8',
    fence_shadow: '#d8d8d8',
    // Road
    road_gray: '#989898',
    road_dark: '#787878',
    // Lake - Pokemon style colors
    lake_deep: '#4088c8',
    lake_mid: '#5098d8',
    lake_light: '#60a8e8',
    lake_wave: '#70b8f0',
    lake_edge: '#987050',
    lake_edge_dark: '#785838',
    lake_grass: '#58c850',
    lake_grass_dark: '#48a840',
    lake_grass_light: '#68d860',
    lake_path: '#c8a070',
    lake_path_dark: '#a88050',
    // Paddy
    paddy_green: '#80c040',
    paddy_dark: '#60a020',
    paddy_water: '#5898c8',
    // Dock
    dock_wood: '#b08860',
    dock_dark: '#906840',
    // House - Pokemon style red roof
    house_wall: '#f0e8d8',
    house_roof: '#b04830',
    house_roof_dark: '#903828',
    house_window: '#68b8e8',
    house_door: '#704028',
    // Trees - Fuller Pokemon style
    tree_trunk: '#705838',
    tree_green: '#40a048',
    tree_green_light: '#58c058',
    tree_dark: '#308030',
    tree_shadow: 'rgba(0,0,0,0.2)'
};

const INTERIOR_COLORS = {
    // Floor
    floor_wood: '#e8c078',
    floor_wood_dark: '#d0a860',
    floor_tile: '#f0e8d8',
    floor_tile_dark: '#e0d8c8',
    // Kitchen floor
    kitchen_tile: '#d8d0c0',
    kitchen_tile_dark: '#c8c0b0',
    // Walls
    wall_cream: '#f8f0e0',
    wall_shadow: '#e8e0d0',
    wall_base: '#d0c8b8',
    // Furniture
    wood_dark: '#805830',
    wood_mid: '#a07040',
    wood_light: '#c09060',
    // Cushion/Rug
    cushion_green: '#68a048',
    cushion_dark: '#588838',
    rug_red: '#c86048',
    rug_dark: '#a84830',
    // Plants
    plant_green: '#58a038',
    plant_dark: '#408028',
    plant_pot: '#c08050',
    // Metal
    brass_gold: '#d8a830',
    brass_dark: '#b88820'
};

// =============================================
// PUZZLE SOLUTION
// =============================================
const PUZZLE_SOLUTION = '2026';  // Grandparents' wedding date - January 11th, 2026

// Code input mode - 'safe' for mystery puzzle, 'plantation' for plantation access
let codeInputMode = 'safe';

// =============================================
// MAP DATA
// =============================================

// Exterior Map (30x20) - Based on satellite imagery
const EXTERIOR_MAP = [
    // Row 0: Top border of trees (plantation entrance at column 18)
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,42,2,2,2,2,2,2,2,2,2,2,2],
    // Row 1: Trees | Left coffee (enclosed) | Cleared path to plantation | Right coffee (enclosed) | Trees
    [2,0,0,17,0,0,0,0,2,3,3,3,3,3,3,3,3,3,3,3,3,2,0,0,0,0,17,0,0,2],
    // Row 2: Left coffee | Cleared + Brown Cat + Well | Right coffee
    [2,0,0,0,0,0,0,0,2,3,3,3,3,3,3,3,3,18,10,3,3,2,0,0,0,0,0,0,0,2],
    // Row 3: Left coffee + Jackfruit + Buried Safe | Cleared + Kitten | Right coffee
    [2,0,0,11,21,0,0,0,2,3,3,3,3,3,3,3,3,22,3,3,3,2,0,0,0,0,0,0,0,2],
    // Row 4: Left coffee | Cleared | Path to house | Right coffee + Pepper
    [2,0,0,0,0,17,0,0,2,3,3,3,3,3,3,3,3,3,3,3,3,2,0,0,17,0,0,0,0,2],
    // Row 5: Left coffee | House roof row 1 (narrow top of oval) | Right coffee
    [2,0,0,0,0,0,0,0,2,3,3,3,4,4,4,4,4,4,3,3,3,2,0,0,0,11,0,0,0,2],
    // Row 6: Left coffee + Pepper | House roof row 2 (wider - bulging out) | Right coffee
    [2,0,17,0,0,0,0,0,2,3,3,4,4,4,4,4,4,4,4,3,3,2,0,0,0,0,0,17,0,2],
    // Row 7: Left coffee | House roof row 3 | Right coffee + Hidden White Cat (Snowy)
    [2,0,0,0,17,0,0,0,2,3,3,4,4,4,4,4,4,4,4,3,3,2,0,0,0,24,0,0,0,2],
    // Row 8: Left coffee | House roof row 4 | Right coffee
    [2,0,0,0,0,0,0,0,2,3,3,4,4,4,4,4,4,4,4,3,3,2,0,0,0,0,0,0,0,2],
    // Row 9: Coffee | House roof bottom | Coffee (withered trees in tree border at cols 8 and 21)
    [2,0,0,0,0,0,0,0,16,3,3,4,4,4,4,4,4,4,4,3,3,16,0,0,0,0,0,0,0,2],
    // Row 10: Coffee | House entrance with doors | Coffee
    [2,0,0,0,0,0,0,0,2,3,3,3,1,1,9,9,1,1,3,3,3,2,0,0,0,0,0,0,0,2],
    // Row 11: Trees (enclosing coffee) | Front yard (cleared) | Pond | Trees (enclosing coffee)
    [2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,2,14,14,2,2,2,2,2,2],
    // Row 12: Trees | Left flowers (start) | Front yard + Cat + Dad | Right flowers (start) + Pond | Trees
    [2,2,2,2,15,15,3,3,3,3,18,3,3,3,23,3,3,3,3,3,15,15,14,14,15,15,2,2,2,2],
    // Row 13: Trees | Left flowers (wider) | Front yard + Drying Coffee Beans | Right flowers (wider) | Trees
    [2,2,2,15,15,15,15,3,3,25,25,25,25,25,25,25,25,3,3,15,15,15,15,15,15,15,15,2,2,2],
    // Row 14: Trees | Left flowers (wider) | Front yard + More Coffee Beans | Right flowers (wider) | Trees
    [2,2,15,15,15,15,15,3,3,25,25,25,25,25,25,25,25,3,3,15,15,15,15,15,15,15,15,15,2,2],
    // Row 15: Trees | Left flowers (widest) | Path toward gate | Right flowers (widest) | Trees
    [2,2,15,15,15,15,15,15,3,3,3,3,3,3,3,3,3,3,15,15,15,15,15,15,15,15,15,15,2,2],
    // Row 16: Trees | Left flowers | Path to gate | Right flowers | Trees
    [2,2,2,15,15,15,15,3,3,3,3,3,3,3,3,3,3,3,3,15,15,15,15,15,15,15,15,2,2,2],
    // Row 17: Trees | Left flowers | Gate area | Right flowers | Trees
    [2,2,2,2,15,15,3,3,3,3,3,8,8,3,3,3,3,3,3,3,3,15,15,15,15,15,2,2,2,2],
    // Row 18: Trees | Gate path + Path to Lake | Trees
    [2,2,2,2,2,2,2,2,3,3,3,1,1,3,3,3,3,3,26,3,3,3,2,2,2,2,2,2,2,2],
    // Row 19: Bottom border of trees
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
];

// Lake Map (30x20) - Pokemon Lake of Rage style
// Legend: 30=lake water, 31=lake edge, 32=paddy field, 33=paddy water
//         34=lake house, 35=dock, 36=path, 37=to estate, 38=grass, 39=tree
const LAKE_MAP = [
    // Row 0: Trees border top
    [39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39],
    // Row 1: Trees | Lake starts | Grass with trees
    [39,39,38,38,31,31,30,30,30,30,30,30,30,30,30,30,30,30,31,31,38,38,39,38,38,38,38,38,38,39],
    // Row 2: Trees | Lake expands | Grass
    [39,38,38,31,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,31,38,38,38,38,38,38,38,38,39],
    // Row 3: Paddy | Lake wide | Grass with path
    [39,38,32,31,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,31,38,38,36,36,38,38,38,39],
    // Row 4: Paddy | Lake | Peninsula starts | Grass
    [39,38,32,31,30,30,30,30,30,30,30,30,30,30,30,30,30,31,31,38,38,38,38,38,36,38,38,38,38,39],
    // Row 5: Paddy | Lake | Peninsula (grass into lake) | Path
    [39,38,33,31,30,30,30,30,30,30,30,30,30,30,30,31,38,38,38,38,38,38,38,38,36,38,38,39,39,39],
    // Row 6: Path to dock | Lake | Peninsula tip | Grass
    [39,36,36,36,31,30,30,30,30,30,30,30,30,30,31,38,38,39,38,38,38,38,38,38,36,38,38,38,38,39],
    // Row 7: Path to dock | Lake continues | Grass area
    [39,38,36,36,31,30,30,30,30,30,30,30,30,30,30,31,38,38,38,38,38,38,38,38,36,38,38,38,38,39],
    // Row 8: Path + Dock area + Boat | Lake | Open grass
    [39,38,36,36,35,35,40,30,30,30,30,30,30,30,30,30,31,38,38,38,38,38,38,38,36,38,38,38,38,39],
    // Row 9: Grass + Fishing Rod + Path | Lake narrows | Big grass area | Trees
    [39,41,38,36,31,30,30,30,30,30,30,30,30,30,30,30,31,31,38,38,38,38,38,36,36,38,38,39,39,39],
    // Row 10: Trees | Lake bottom part | Grass | House area
    [39,39,38,38,31,30,30,30,30,30,30,30,30,30,30,31,31,38,38,38,38,38,38,36,38,38,38,38,38,39],
    // Row 11: Trees | Lake edge | Large grass | House
    [39,39,38,38,31,31,30,30,30,30,30,30,30,31,31,31,38,38,38,38,39,38,38,36,38,34,34,38,38,39],
    // Row 12: Trees | Lake corner | Grass | House continued
    [39,39,39,38,38,31,31,31,30,30,30,31,31,31,38,38,38,38,38,39,39,38,38,36,38,34,34,38,38,39],
    // Row 13: Trees | Grass | More grass | Path to house
    [39,39,38,38,38,38,31,31,31,31,31,31,38,38,38,38,38,38,39,39,38,38,38,36,36,36,36,38,38,39],
    // Row 14: Trees | Grass with trees | Path area
    [39,38,38,38,39,38,38,38,38,38,38,38,38,38,38,39,38,38,38,38,38,38,38,38,38,38,38,38,38,39],
    // Row 15: Trees | Grass | Main path
    [39,38,38,38,38,38,39,38,38,38,38,38,38,38,38,38,38,39,38,38,38,38,38,38,38,38,38,38,38,39],
    // Row 16: Trees | Path connecting to estate
    [39,38,38,38,38,38,38,38,38,36,36,36,36,36,36,36,36,36,36,36,38,38,38,38,38,38,38,38,38,39],
    // Row 17: Trees | Grass | Exit to estate
    [39,38,38,38,38,38,38,38,38,36,38,37,37,38,36,38,38,38,38,38,38,38,38,38,38,38,38,38,38,39],
    // Row 18: Trees | Grass
    [39,38,38,38,38,38,38,38,38,36,38,38,38,38,36,38,38,38,38,38,38,38,38,38,38,38,38,38,38,39],
    // Row 19: Bottom trees
    [39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39]
];

// Shed Map (10x12) - Storage shed behind kitchen
// Legend: 0=floor, 1=wall, 2=door(exit), 3=workbench, 4=shelf, 5=axe, 6=tools, 7=barrel, 8=window, 9=plant_pot
const SHED_MAP = [
    // Row 0: Top wall with window
    [1, 1, 1, 1, 8, 8, 1, 1, 1, 1],
    // Row 1: Wall | Shelf | Wall
    [1, 4, 4, 4, 0, 0, 4, 4, 4, 1],
    // Row 2: Wall | Floor space | Wall
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    // Row 3: Wall | Floor space | Wall
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    // Row 4: Wall | Axe on wall | Tools on wall | Wall
    [1, 5, 0, 0, 0, 0, 0, 0, 6, 1],
    // Row 5: Wall | Floor | Workbench | Floor | Wall
    [1, 0, 0, 3, 3, 3, 3, 0, 0, 1],
    // Row 6: Wall | Floor space | Wall
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    // Row 7: Wall | Barrel | Floor | Barrel | Wall
    [1, 7, 0, 0, 0, 0, 0, 0, 7, 1],
    // Row 8: Wall | Barrel | Floor | Plant pots | Wall
    [1, 7, 0, 0, 0, 0, 0, 0, 9, 1],
    // Row 9: Wall | Floor space | Wall
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    // Row 10: Wall | Floor space | Wall
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    // Row 11: Bottom wall with door (exit back to kitchen)
    [1, 1, 1, 1, 2, 2, 1, 1, 1, 1]
];

// Shed colors
const SHED_COLORS = {
    floor_dirt: '#a08060',
    floor_dark: '#8a6a4a',
    wall_wood: '#8b6914',
    wall_dark: '#6a4a10',
    wall_light: '#a88828',
    workbench: '#6a4a30',
    workbench_top: '#c09060',
    shelf_blue: '#4a6a9a',
    shelf_blue_dark: '#3a5a7a',
    shelf_blue_light: '#6a8aba',
    axe_handle: '#8b6914',
    axe_blade: '#a0a0a0',
    tools_metal: '#808080',
    tools_handle: '#6a4a30',
    barrel_wood: '#7a5a30',
    barrel_band: '#505050',
    window_frame: '#6a4a10',
    window_glass: '#a0d0ff',
    pot_terra: '#c06030'
};

// Interior Map (30x22) - Rebuilt from scratch using reference_house_layout_v2.png
// Legend: 0=floor, 1=wall, 2=pillar, 3=courtyard, 4=doorway, 5=rug, 6=plant
//         10=sofa, 11=table, 12=cabinet, 14=wallart, 17=exit
//         20/21=bed, 22=dresser, 23=bookshelf, 24=window
//         30=counter, 31=stove, 32=sink, 33=fridge, 34=kitchentable, 35=tilefloor
//         36=diningtable, 38=tv_stand, 39=swing
// Red text instructions: !!Add Dining table, !!Add Floor Space with TV, !!Add swing, !!Add Floor Space, !!Add Sofa 1/2
const INTERIOR_MAP = [
    // Row 0: Top walls
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    // Row 1: Left Bedroom | Dining (wall art) | Kitchen (appliances)
    [1, 24, 0, 20, 20, 0, 22, 0, 1, 0, 14, 0, 0, 0, 0, 0, 0, 14, 0, 1, 35, 35, 35, 30, 31, 32, 30, 35, 35, 1],
    // Row 2: Left Bedroom | Dining table | Kitchen (fridge)
    [1, 0, 0, 21, 21, 0, 0, 0, 1, 0, 0, 0, 0, 36, 36, 0, 0, 0, 0, 1, 35, 33, 35, 35, 35, 35, 35, 35, 35, 1],
    // Row 3: Left Bedroom | Dining table | Kitchen + Back Door
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 36, 36, 0, 0, 0, 0, 1, 35, 35, 35, 35, 35, 35, 35, 35, 43, 1],
    // Row 4: Left Bedroom (bookshelf) | Dining | Kitchen (table)
    [1, 0, 0, 0, 0, 0, 0, 23, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 35, 35, 0, 0, 35, 34, 34, 35, 35, 1],
    // Row 5: Left Bedroom wall + Door | Open Dining | Kitchen wall + Door
    [1, 1, 1, 1, 4, 4, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 4, 4, 1, 1, 1, 1, 1, 1],
    // Row 6: TV area | Pillars + Courtyard | Floor Space (right)
    [1, 38, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 3, 3, 3, 3, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    // Row 7: Floor + Mom | Courtyard | Floor
    [1, 0, 0, 0, 0, 42, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    // Row 8: Floor | Courtyard | Floor
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    // Row 9: Floor | Pillars | Floor
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    // Row 10: Floor | Swing | Floor
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 39, 39, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    // Row 11: Door to left room | Rug + Sofas | Door to right room
    [1, 1, 1, 4, 4, 1, 1, 1, 1, 0, 10, 5, 5, 5, 5, 5, 5, 10, 0, 1, 1, 1, 1, 4, 4, 1, 1, 1, 1, 1],
    // Row 12: Left Room | Rug + Coffee Table | Right Room (mirrored)
    [1, 24, 0, 0, 0, 22, 0, 0, 1, 0, 10, 5, 11, 11, 11, 11, 5, 10, 0, 1, 0, 0, 22, 0, 0, 0, 0, 24, 0, 1],
    // Row 13: Left Room (bed) | Rug | Right Room (bed + Manvi)
    [1, 0, 0, 20, 20, 0, 0, 0, 1, 0, 0, 5, 5, 5, 5, 5, 5, 0, 0, 1, 0, 0, 0, 20, 20, 0, 41, 0, 0, 1],
    // Row 14: Left Room (bed bottom) | Floor (cabinet, art) | Right Room (bed bottom + cabinet)
    [1, 0, 0, 21, 21, 0, 0, 0, 1, 0, 12, 0, 0, 14, 14, 0, 0, 12, 0, 1, 0, 0, 0, 21, 21, 0, 0, 12, 0, 1],
    // Row 15: Left Room (bookshelf) | Floor (plants) | Right Room (bookshelf)
    [1, 0, 0, 0, 0, 0, 0, 23, 1, 0, 0, 0, 6, 0, 0, 6, 0, 0, 0, 1, 23, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    // Row 16: Left Room closes | Floor | Right Room closes
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    // Row 17: Outside (left) | Living corridor | Outside (right)
    [40, 40, 40, 40, 40, 40, 40, 40, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40],
    // Row 18: Outside (left) | Living corridor | Outside (right)
    [40, 40, 40, 40, 40, 40, 40, 40, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40],
    // Row 19: Outside (left) | Living corridor | Outside (right)
    [40, 40, 40, 40, 40, 40, 40, 40, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40],
    // Row 20: Outside (left) | Living corridor | Outside (right)
    [40, 40, 40, 40, 40, 40, 40, 40, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40],
    // Row 21: Exit row
    [40, 40, 40, 40, 40, 40, 40, 40, 1, 1, 17, 17, 17, 17, 17, 17, 17, 17, 1, 1, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40]
];

// =============================================
// CLUE DATA
// =============================================

const CLUE_DATA = {
    // Exterior clues
    'WELL': {
        name: 'Old Well',
        dialogues: [
            '{NAME} peers into the ancient stone well...',
            'Carved into the weathered stone are roman numerals.',
            '"IV - VII - III" reads the inscription.',
            'These numbers must mean something important...'
        ],
        hint: 'IV-VII-III carved in stone'
    },
    'JACKFRUIT': {
        name: 'Old Jackfruit Tree',
        dialogues: [
            'A massive jackfruit tree, at least a hundred years old.',
            '{NAME} notices a metal plate nailed to the trunk.',
            '"Planted 1947 - First Harvest: 47 acres"',
            'The estate has deep roots here...'
        ],
        hint: 'Planted 1947'
    },
    // Interior clues
    'CLOCK': {
        name: "Grandfather's Clock",
        dialogues: [
            'An antique pendulum clock, still keeping perfect time.',
            '{NAME} examines the ornate clock face closely.',
            'Strange... roman numerals IV, VII, III are engraved on the frame.',
            '4... 7... 3... Could this be part of a code?'
        ],
        hint: 'IV-VII-III on the frame'
    },
    'CABINET': {
        name: "Manvi's Closet",
        dialogues: [
            "This is Manvi's closet - her name is elegantly carved on the door.",
            '{NAME} notices something odd... the back panel seems loose.',
            'Pushing it aside reveals a hidden compartment! Inside lies a yellowed letter...',
            '"The family treasure lies buried beneath the old jackfruit tree."',
            '"Remember our family numbers - the clock knows. You\'ll need a shovel to unearth it."',
            'A secret that has been hidden for generations!'
        ],
        hint: 'Buried under jackfruit tree'
    },
    'PHOTO': {
        name: 'Old Family Portrait',
        dialogues: [
            'A sepia-toned photograph in an ornate wooden frame.',
            'Three generations of the family stand before this very house.',
            "{NAME} notices grandfather's handwriting on the back: 'Est. 1947'",
            'The year the estate was established... and the numbers appear again.'
        ],
        hint: 'Established 1947'
    },
    'TABLE': {
        name: 'Coffee Table',
        dialogues: [
            'A glass-top coffee table with intricate carved wooden base.',
            '{NAME} notices a small decorative box underneath.',
            'Inside are old coffee beans and a faded note:',
            '"First harvest: 47 acres, 3 workers, 4 seasons of patience."'
        ],
        hint: 'Numbers confirmed: 4-7-3'
    }
};

const SAFE_DIALOGUES = {
    locked: [
        'The old safe from the lake sits dripping wet before you.',
        'It has a 4-digit combination lock.',
        'You need to gather more clues around the estate...'
    ],
    ready: [
        'Grandfather\'s safe awaits.',
        'The clues point to a special year: 20__ + twenty-six',
        'Enter the 4-digit wedding year...'
    ]
};

const GATE_DIALOGUE = [
    'The old iron gate marks the entrance to the estate.',
    '"Coorg Coffee Estate - Since 1947" reads the sign.',
    '{NAME} steps through onto the red dirt path...'
];

const ENTRANCE_DIALOGUE = [
    'The front veranda of the traditional Coorg home.',
    'Terracotta tiles and wooden pillars frame the entrance.',
    'Press E to enter the house...'
];

// =============================================
// GAME STATE
// =============================================

let gameState = STATES.LOGIN;

// Check if already authenticated
function checkAuth() {
    // No login required for public version
    return true;
}

function attemptLogin() {
    // No login required - go directly to start
    gameState = STATES.START;
}

// Initialize - skip login, go directly to start
function initLogin() {
    // Public version - no login required
    const loginScreen = document.getElementById('login-screen');
    if (loginScreen) loginScreen.classList.add('hidden');
    gameState = STATES.START;
}
let currentMap = MAPS.EXTERIOR;

// Intro animation state
let intro = {
    carX: -100,
    carY: 0,
    phase: 0,
    textIndex: 0,
    textOpacity: 0,
    frameCount: 0,
    storyLines: [
        'Deep in the Western Ghats of Karnataka...',
        'Lies the misty hill district of Coorg.',
        'Known as the "Scotland of India"...',
        'Land of coffee, cardamom, and ancient forests.',
        'The Kodava people have called these hills home for centuries...',
        'Proud warriors, skilled farmers, keepers of tradition.',
        'This coffee estate has been producing beans since 1947.',
        'Both Arabica and Robusta thrive in this climate.',
        'Now it\'s your turn to manage the plantation.',
        'Learn the art of coffee cultivation.',
        'From seedling to harvest, from cherry to cup.',
        'Welcome to Coorg Coffee Plantation!'
    ],
    skipHint: 'Press E to continue | ESC to skip'
};

let player = {
    x: 10 * TILE_SIZE,
    y: 16 * TILE_SIZE,
    width: 24,
    height: 24,
    direction: 'up',
    frame: 0,
    name: 'Explorer',
    gender: 'male',
    hasAxe: false,
    hasShovel: false,
    foundSnowy: false,
    money: 0,
    hasFishingRod: false,
    inBoat: false,
    boatX: 0,
    boatY: 0,
    // Mystery chain flags
    heardMysteryStory: false,      // Dad told about grandmother's ring
    foundTreeCarving: false,       // Found carving on withered tree (clue: "20")
    foundCollarClue: false,        // Found scroll on Snowy's collar (clue: "26")
    boughtCamera: false,           // Bought camera for Manvi
    foundClosetClue: false,        // Found photo in Manvi's closet (confirms date)
    foundBuriedJournal: false,     // Dug up grandfather's journal (clue: "7" - day)
    caughtLakeSafe: false,         // Fished out the safe from lake
    hasWeddingRing: false,         // Found the wedding ring!
    seenShimmerHint: false         // Seen the shimmer hint over the safe zone
};

// Mom NPC - moves around the house
let mom = {
    x: 5,   // Current tile X position
    y: 7,   // Current tile Y position
    lastMove: 0,
    moveInterval: 3000,  // Move every 3 seconds
    activities: [
        'dusting the furniture',
        'talking on the phone about the neighbor\'s dog',
        'reorganizing the cushions',
        'wiping the windows',
        'checking something on her phone',
        'looking for her reading glasses',
        'watering the plants',
        'straightening the picture frames'
    ],
    // Valid positions Mom can move to (floor tiles in main areas)
    validPositions: [
        {x: 11, y: 5}, {x: 14, y: 5}, {x: 16, y: 5},  // Dining area
        {x: 3, y: 7}, {x: 5, y: 7}, {x: 7, y: 7},      // Left side
        {x: 22, y: 7}, {x: 24, y: 7}, {x: 26, y: 7},   // Right side
        {x: 11, y: 9}, {x: 14, y: 9}, {x: 17, y: 9},   // Near courtyard
        {x: 12, y: 16}, {x: 14, y: 16}, {x: 16, y: 16} // Near exit
    ]
};

let collectedClues = [];
let readClues = [];
let currentDialogue = null;
let dialogueIndex = 0;

let keys = {
    up: false,
    down: false,
    left: false,
    right: false
};

// Grass/coffee animation system (Pokemon-style rustling)
let grassAnimations = [];
let lastPlayerTileX = -1;
let lastPlayerTileY = -1;

function addGrassAnimation(tileX, tileY) {
    // Don't add if animation already exists at this tile
    if (grassAnimations.some(a => a.tileX === tileX && a.tileY === tileY)) return;

    grassAnimations.push({
        tileX: tileX,
        tileY: tileY,
        frame: 0,
        maxFrames: 12
    });
}

function updateGrassAnimations() {
    for (let i = grassAnimations.length - 1; i >= 0; i--) {
        grassAnimations[i].frame++;
        if (grassAnimations[i].frame >= grassAnimations[i].maxFrames) {
            grassAnimations.splice(i, 1);
        }
    }
}

function drawGrassAnimations() {
    for (const anim of grassAnimations) {
        const px = anim.tileX * TILE_SIZE;
        const py = anim.tileY * TILE_SIZE;
        const progress = anim.frame / anim.maxFrames;

        // Draw rustling grass/leaves effect
        ctx.save();
        ctx.globalAlpha = 1 - progress; // Fade out

        // Animate leaves popping out
        const offset = Math.sin(progress * Math.PI) * 8;

        // Left leaf
        ctx.fillStyle = '#4a7a44';
        ctx.beginPath();
        ctx.ellipse(px + 8 - offset, py + 16 - offset * 2, 6, 4, -0.5, 0, Math.PI * 2);
        ctx.fill();

        // Right leaf
        ctx.fillStyle = '#3a6a34';
        ctx.beginPath();
        ctx.ellipse(px + 24 + offset, py + 14 - offset * 1.5, 5, 3, 0.5, 0, Math.PI * 2);
        ctx.fill();

        // Center leaf (goes up)
        ctx.fillStyle = '#5a8a54';
        ctx.beginPath();
        ctx.ellipse(px + 16, py + 10 - offset * 2.5, 4, 6, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }
}

// =============================================
// DOM ELEMENTS
// =============================================

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const gameContainer = document.getElementById('game-container');

const startScreen = document.getElementById('start-screen');
const winScreen = document.getElementById('win-screen');
const characterSelectScreen = document.getElementById('character-select-screen');
const genderButtons = document.querySelectorAll('.gender-btn');
const playerNameInput = document.getElementById('player-name');
const characterPreview = document.getElementById('character-preview');
const previewCtx = characterPreview.getContext('2d');
const dialogueBox = document.getElementById('dialogue-box');
const dialogueSpeaker = document.getElementById('dialogue-speaker');
const dialogueText = document.getElementById('dialogue-text');
const codeModal = document.getElementById('code-modal');
const codeInput = document.getElementById('code-input');
const codeFeedback = document.getElementById('code-feedback');
const photoModal = document.getElementById('photo-modal');
const loginScreen = document.getElementById('login-screen');
const loginPassword = document.getElementById('login-password');
const loginButton = document.getElementById('login-button');
const loginError = document.getElementById('login-error');
const clueCounter = document.getElementById('clue-counter');
const clueList = document.getElementById('clue-list');
const uiOverlay = document.getElementById('ui-overlay');
const locationLabel = document.getElementById('location-label');
const walletDisplay = document.getElementById('wallet');
const quantityModal = document.getElementById('quantity-modal');
const quantityInput = document.getElementById('quantity-input');
const quantityPrice = document.getElementById('quantity-price');
const quantitySubmit = document.getElementById('quantity-submit');
const quantityCancel = document.getElementById('quantity-cancel');
const quantityFeedback = document.getElementById('quantity-feedback');

// =============================================
// AUDIO SYSTEM
// =============================================

let audioCtx = null;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
}

function playBeep(frequency = 440, duration = 0.1, volume = 0.3) {
    if (!audioCtx) return;
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.frequency.value = frequency;
    oscillator.type = 'square';
    gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
    oscillator.start(audioCtx.currentTime);
    oscillator.stop(audioCtx.currentTime + duration);
}

function playWalkSound() { playBeep(200, 0.05, 0.1); }
function playInteractSound() { playBeep(600, 0.1, 0.2); }
function playClueSound() { playBeep(800, 0.15, 0.25); setTimeout(() => playBeep(1000, 0.15, 0.25), 150); }
function playTransitionSound() { playBeep(400, 0.2, 0.2); setTimeout(() => playBeep(600, 0.2, 0.2), 200); }
function playWinSound() {
    playBeep(523, 0.2, 0.3);
    setTimeout(() => playBeep(659, 0.2, 0.3), 200);
    setTimeout(() => playBeep(784, 0.2, 0.3), 400);
    setTimeout(() => playBeep(1047, 0.4, 0.3), 600);
}
function playErrorSound() { playBeep(200, 0.2, 0.2); setTimeout(() => playBeep(150, 0.3, 0.2), 200); }

// =============================================
// DRAWING FUNCTIONS - EXTERIOR (Pokemon Style)
// =============================================

// Helper to draw grass base
function drawGrassBase(px, py) {
    ctx.fillStyle = EXTERIOR_COLORS.grass_mid;
    ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
    // Grass texture pattern
    ctx.fillStyle = EXTERIOR_COLORS.grass_dark;
    ctx.fillRect(px + 2, py + 2, 2, 2);
    ctx.fillRect(px + 14, py + 6, 2, 2);
    ctx.fillRect(px + 26, py + 2, 2, 2);
    ctx.fillRect(px + 8, py + 14, 2, 2);
    ctx.fillRect(px + 22, py + 18, 2, 2);
    ctx.fillRect(px + 4, py + 26, 2, 2);
    ctx.fillRect(px + 18, py + 28, 2, 2);
}

function drawExteriorTile(tileType, x, y) {
    const px = x * TILE_SIZE;
    const py = y * TILE_SIZE;

    switch (tileType) {
        case EXT_TILES.COFFEE_PLANTATION:
            // Grass with coffee plants
            drawGrassBase(px, py);
            // Small coffee bush
            ctx.fillStyle = EXTERIOR_COLORS.tree_mid;
            ctx.fillRect(px + 10, py + 12, 12, 10);
            ctx.fillStyle = EXTERIOR_COLORS.tree_light;
            ctx.fillRect(px + 12, py + 14, 8, 6);
            // Coffee berries
            ctx.fillStyle = EXTERIOR_COLORS.flower_red;
            ctx.fillRect(px + 14, py + 16, 2, 2);
            ctx.fillRect(px + 18, py + 18, 2, 2);
            break;

        case EXT_TILES.DIRT_PATH:
            ctx.fillStyle = EXTERIOR_COLORS.path_mid;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Path texture
            ctx.fillStyle = EXTERIOR_COLORS.path_light;
            ctx.fillRect(px + 4, py + 4, 4, 4);
            ctx.fillRect(px + 20, py + 12, 4, 4);
            ctx.fillRect(px + 8, py + 24, 4, 4);
            ctx.fillStyle = EXTERIOR_COLORS.path_dark;
            ctx.fillRect(px + 16, py + 6, 2, 2);
            ctx.fillRect(px + 6, py + 18, 2, 2);
            ctx.fillRect(px + 24, py + 26, 2, 2);
            break;

        case EXT_TILES.DENSE_FOREST:
            // Pokemon-style tree
            drawGrassBase(px, py);
            // Tree trunk
            ctx.fillStyle = EXTERIOR_COLORS.tree_trunk;
            ctx.fillRect(px + 12, py + 20, 8, 12);
            // Tree foliage - layered circles effect
            ctx.fillStyle = EXTERIOR_COLORS.tree_dark;
            ctx.fillRect(px + 2, py + 4, 28, 20);
            ctx.fillRect(px + 6, py, 20, 24);
            ctx.fillStyle = EXTERIOR_COLORS.tree_mid;
            ctx.fillRect(px + 4, py + 6, 24, 14);
            ctx.fillRect(px + 8, py + 2, 16, 18);
            ctx.fillStyle = EXTERIOR_COLORS.tree_light;
            ctx.fillRect(px + 8, py + 4, 8, 8);
            ctx.fillRect(px + 6, py + 8, 6, 6);
            break;

        case EXT_TILES.CLEARED_LAND:
            ctx.fillStyle = EXTERIOR_COLORS.path_light;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            ctx.fillStyle = EXTERIOR_COLORS.path_mid;
            ctx.fillRect(px + 6, py + 6, 4, 4);
            ctx.fillRect(px + 20, py + 18, 4, 4);
            ctx.fillStyle = EXTERIOR_COLORS.path_dark;
            ctx.fillRect(px + 14, py + 12, 2, 2);
            break;

        case EXT_TILES.HOUSE_ROOF:
            // Pokemon-style red roof
            ctx.fillStyle = EXTERIOR_COLORS.roof_red;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Roof tile lines
            ctx.fillStyle = EXTERIOR_COLORS.roof_dark;
            ctx.fillRect(px, py + 7, TILE_SIZE, 2);
            ctx.fillRect(px, py + 15, TILE_SIZE, 2);
            ctx.fillRect(px, py + 23, TILE_SIZE, 2);
            ctx.fillStyle = EXTERIOR_COLORS.roof_shadow;
            ctx.fillRect(px, py + 31, TILE_SIZE, 1);
            break;

        case EXT_TILES.OUTBUILDING:
            // Small building/wall
            ctx.fillStyle = EXTERIOR_COLORS.wall_cream;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            ctx.fillStyle = EXTERIOR_COLORS.wall_shadow;
            ctx.fillRect(px, py + 28, TILE_SIZE, 4);
            // Outline
            ctx.fillStyle = '#404040';
            ctx.fillRect(px, py, TILE_SIZE, 1);
            ctx.fillRect(px, py, 1, TILE_SIZE);
            ctx.fillRect(px + 31, py, 1, TILE_SIZE);
            break;

        case EXT_TILES.SOLAR_BUILDINGS:
            drawGrassBase(px, py);
            // Solar panel structure
            ctx.fillStyle = '#404050';
            ctx.fillRect(px + 4, py + 4, 24, 24);
            ctx.fillStyle = '#5060a0';
            ctx.fillRect(px + 6, py + 6, 9, 9);
            ctx.fillRect(px + 17, py + 6, 9, 9);
            ctx.fillRect(px + 6, py + 17, 9, 9);
            ctx.fillRect(px + 17, py + 17, 9, 9);
            ctx.fillStyle = '#7080c0';
            ctx.fillRect(px + 8, py + 8, 4, 4);
            ctx.fillRect(px + 19, py + 8, 4, 4);
            ctx.fillRect(px + 8, py + 19, 4, 4);
            ctx.fillRect(px + 19, py + 19, 4, 4);
            break;

        case EXT_TILES.ROAD:
            ctx.fillStyle = EXTERIOR_COLORS.road_gray;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Road markings
            ctx.fillStyle = EXTERIOR_COLORS.road_dark;
            ctx.fillRect(px + 2, py + 2, 2, 2);
            ctx.fillRect(px + 28, py + 28, 2, 2);
            ctx.fillStyle = '#b0b0b0';
            ctx.fillRect(px + 14, py + 4, 4, 8);
            ctx.fillRect(px + 14, py + 20, 4, 8);
            break;

        case EXT_TILES.GATE:
            // Path with fence posts
            ctx.fillStyle = EXTERIOR_COLORS.path_mid;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Fence posts
            ctx.fillStyle = EXTERIOR_COLORS.fence_white;
            ctx.fillRect(px + 2, py + 4, 6, 24);
            ctx.fillRect(px + 24, py + 4, 6, 24);
            ctx.fillStyle = EXTERIOR_COLORS.fence_shadow;
            ctx.fillRect(px + 6, py + 4, 2, 24);
            ctx.fillRect(px + 28, py + 4, 2, 24);
            // Gate top bar
            ctx.fillStyle = EXTERIOR_COLORS.fence_white;
            ctx.fillRect(px, py + 4, TILE_SIZE, 4);
            break;

        case EXT_TILES.HOUSE_ENTRANCE:
            // Door area on wall
            ctx.fillStyle = EXTERIOR_COLORS.wall_cream;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Door
            ctx.fillStyle = EXTERIOR_COLORS.door_brown;
            ctx.fillRect(px + 8, py + 4, 16, 24);
            ctx.fillStyle = EXTERIOR_COLORS.door_dark;
            ctx.fillRect(px + 8, py + 4, 16, 2);
            ctx.fillRect(px + 8, py + 4, 2, 24);
            // Door handle
            ctx.fillStyle = EXTERIOR_COLORS.brass_gold;
            ctx.fillRect(px + 20, py + 16, 2, 4);
            // Welcome mat
            ctx.fillStyle = EXTERIOR_COLORS.rug_red;
            ctx.fillRect(px + 6, py + 28, 20, 4);
            // Base shadow
            ctx.fillStyle = EXTERIOR_COLORS.wall_shadow;
            ctx.fillRect(px, py + 28, TILE_SIZE, 4);
            break;

        case EXT_TILES.WELL:
            ctx.fillStyle = EXTERIOR_COLORS.path_light;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Well structure
            ctx.fillStyle = '#808080';
            ctx.fillRect(px + 6, py + 8, 20, 18);
            ctx.fillStyle = '#606060';
            ctx.fillRect(px + 8, py + 10, 16, 14);
            ctx.fillStyle = EXTERIOR_COLORS.water_dark;
            ctx.fillRect(px + 10, py + 12, 12, 10);
            // Well roof
            ctx.fillStyle = EXTERIOR_COLORS.tree_trunk;
            ctx.fillRect(px + 14, py + 2, 4, 8);
            ctx.fillStyle = EXTERIOR_COLORS.roof_red;
            ctx.fillRect(px + 4, py, 24, 6);
            ctx.fillStyle = EXTERIOR_COLORS.roof_dark;
            ctx.fillRect(px + 4, py + 4, 24, 2);
            if (readClues.includes('WELL')) {
                ctx.fillStyle = '#ffff00';
                ctx.fillRect(px + 14, py + 26, 4, 4);
            }
            break;

        case EXT_TILES.JACKFRUIT_TREE:
            drawGrassBase(px, py);
            // Large fruit tree
            ctx.fillStyle = EXTERIOR_COLORS.tree_trunk;
            ctx.fillRect(px + 12, py + 18, 8, 14);
            // Foliage
            ctx.fillStyle = EXTERIOR_COLORS.tree_dark;
            ctx.fillRect(px + 2, py + 2, 28, 20);
            ctx.fillStyle = EXTERIOR_COLORS.tree_mid;
            ctx.fillRect(px + 4, py + 4, 24, 16);
            ctx.fillStyle = EXTERIOR_COLORS.tree_light;
            ctx.fillRect(px + 6, py + 6, 8, 8);
            // Jackfruits
            ctx.fillStyle = '#b0a030';
            ctx.fillRect(px + 8, py + 14, 4, 6);
            ctx.fillRect(px + 20, py + 12, 4, 6);
            if (readClues.includes('JACKFRUIT')) {
                ctx.fillStyle = '#ffff00';
                ctx.fillRect(px + 14, py + 26, 4, 4);
            }
            break;

        case EXT_TILES.PEPPER_TREE:
            // Draw coffee base
            ctx.fillStyle = '#2d5a27';
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Pepper vine pole/tree
            ctx.fillStyle = '#6b4423';
            ctx.fillRect(px + 13, py + 4, 6, 28);
            // Vine foliage wrapping around
            ctx.fillStyle = '#1a4a1a';
            ctx.fillRect(px + 8, py + 6, 16, 8);
            ctx.fillRect(px + 6, py + 14, 20, 6);
            ctx.fillRect(px + 8, py + 20, 16, 6);
            // Pepper berries (small black/green dots)
            ctx.fillStyle = '#2a2a2a';
            ctx.fillRect(px + 10, py + 8, 2, 2);
            ctx.fillRect(px + 18, py + 10, 2, 2);
            ctx.fillRect(px + 12, py + 16, 2, 2);
            ctx.fillRect(px + 16, py + 18, 2, 2);
            ctx.fillRect(px + 10, py + 22, 2, 2);
            ctx.fillRect(px + 18, py + 22, 2, 2);
            break;

        case EXT_TILES.CAT: {
            // Draw cleared land base
            ctx.fillStyle = EXTERIOR_COLORS.path_light;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            ctx.fillStyle = EXTERIOR_COLORS.path_dark;
            for (let i = 0; i < 3; i++) {
                ctx.fillRect(px + 4 + i * 10, py + 8 + (i % 2) * 12, 4, 4);
            }
            // Cat body (sitting) - brown cat near well (col 17, row 2), gray elsewhere
            const isBrownCat = (x === 17 && y === 2);
            ctx.fillStyle = isBrownCat ? '#8B4513' : '#808080';
            ctx.fillRect(px + 10, py + 16, 12, 10);
            // Cat head
            ctx.fillRect(px + 11, py + 10, 10, 8);
            // Cat ears
            ctx.fillRect(px + 10, py + 8, 4, 4);
            ctx.fillRect(px + 18, py + 8, 4, 4);
            // Cat tail
            ctx.fillRect(px + 20, py + 14, 8, 3);
            ctx.fillRect(px + 26, py + 11, 3, 5);
            // Eyes
            ctx.fillStyle = '#ffff00';
            ctx.fillRect(px + 13, py + 12, 2, 2);
            ctx.fillRect(px + 17, py + 12, 2, 2);
            // Nose
            ctx.fillStyle = '#ff9999';
            ctx.fillRect(px + 15, py + 15, 2, 1);
            break;
        }

        case EXT_TILES.KITTEN:
            // Draw cleared land base
            ctx.fillStyle = EXTERIOR_COLORS.path_light;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            ctx.fillStyle = EXTERIOR_COLORS.path_dark;
            for (let i = 0; i < 3; i++) {
                ctx.fillRect(px + 4 + i * 10, py + 8 + (i % 2) * 12, 4, 4);
            }
            // Small kitten body (brown like mother)
            ctx.fillStyle = '#A0522D';
            ctx.fillRect(px + 12, py + 20, 8, 6);
            // Kitten head
            ctx.fillRect(px + 13, py + 16, 6, 5);
            // Kitten ears
            ctx.fillRect(px + 12, py + 14, 3, 3);
            ctx.fillRect(px + 17, py + 14, 3, 3);
            // Kitten tail
            ctx.fillRect(px + 18, py + 18, 6, 2);
            // Eyes
            ctx.fillStyle = '#00ff00';
            ctx.fillRect(px + 14, py + 17, 2, 2);
            ctx.fillRect(px + 16, py + 17, 2, 2);
            // Nose
            ctx.fillStyle = '#ffaaaa';
            ctx.fillRect(px + 15, py + 19, 2, 1);
            break;

        case EXT_TILES.NPC_DAD:
            // Draw cleared land base
            ctx.fillStyle = EXTERIOR_COLORS.path_light;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            ctx.fillStyle = EXTERIOR_COLORS.path_dark;
            for (let i = 0; i < 3; i++) {
                ctx.fillRect(px + 4 + i * 10, py + 8 + (i % 2) * 12, 4, 4);
            }
            // Dad - adult male figure, slightly larger
            // Body (green polo shirt)
            ctx.fillStyle = '#2e8b57';
            ctx.fillRect(px + 10, py + 14, 12, 10);
            // Arms
            ctx.fillRect(px + 6, py + 14, 4, 8);
            ctx.fillRect(px + 22, py + 14, 4, 8);
            // Pants (khaki)
            ctx.fillStyle = '#c8b878';
            ctx.fillRect(px + 10, py + 24, 5, 6);
            ctx.fillRect(px + 17, py + 24, 5, 6);
            // Head (skin tone)
            ctx.fillStyle = '#e8c8a8';
            ctx.fillRect(px + 11, py + 4, 10, 10);
            // Hair (dark, slightly receding)
            ctx.fillStyle = '#3a3a3a';
            ctx.fillRect(px + 11, py + 3, 10, 3);
            ctx.fillRect(px + 12, py + 6, 2, 2);
            ctx.fillRect(px + 18, py + 6, 2, 2);
            // Eyes
            ctx.fillStyle = '#000000';
            ctx.fillRect(px + 13, py + 8, 2, 2);
            ctx.fillRect(px + 17, py + 8, 2, 2);
            // Smile
            ctx.fillStyle = '#c09080';
            ctx.fillRect(px + 14, py + 11, 4, 1);
            // Cat food bowl in hand
            ctx.fillStyle = '#808080';
            ctx.fillRect(px + 4, py + 20, 6, 3);
            ctx.fillStyle = '#8b4513';
            ctx.fillRect(px + 5, py + 19, 4, 2);
            break;

        case EXT_TILES.WHITE_CAT:
            // Draw coffee plantation base (dark green)
            ctx.fillStyle = EXTERIOR_COLORS.grass_dark;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Coffee plant rows
            ctx.fillStyle = '#2a5a2a';
            ctx.fillRect(px + 2, py + 20, 28, 10);
            ctx.fillRect(px + 4, py + 16, 24, 6);
            // Pepper vine pole (tall wooden pole)
            ctx.fillStyle = '#8b6914';
            ctx.fillRect(px + 14, py + 2, 4, 28);
            // Pepper vines climbing the pole
            ctx.fillStyle = '#3a7a3a';
            ctx.fillRect(px + 10, py + 4, 12, 4);
            ctx.fillRect(px + 8, py + 10, 16, 4);
            ctx.fillRect(px + 6, py + 16, 20, 4);
            // Pepper clusters (green and black)
            ctx.fillStyle = '#2d5a27';
            ctx.fillRect(px + 8, py + 6, 3, 3);
            ctx.fillRect(px + 20, py + 8, 3, 3);
            ctx.fillStyle = '#1a1a1a';
            ctx.fillRect(px + 22, py + 12, 2, 2);
            ctx.fillRect(px + 8, py + 14, 2, 2);
            ctx.fillRect(px + 6, py + 18, 2, 2);
            // White cat hiding behind the pepper vine - just white fur peeking
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(px + 4, py + 12, 4, 5);
            // Cat ears peeking out
            ctx.fillRect(px + 3, py + 10, 2, 3);
            ctx.fillRect(px + 6, py + 10, 2, 3);
            // Inner ears
            ctx.fillStyle = '#ffcccc';
            ctx.fillRect(px + 4, py + 11, 1, 1);
            ctx.fillRect(px + 6, py + 11, 1, 1);
            // One blue eye peeking
            ctx.fillStyle = '#4488ff';
            ctx.fillRect(px + 5, py + 13, 2, 2);
            break;

        case EXT_TILES.COFFEE_BEANS:
            // Draw cleared land base
            ctx.fillStyle = EXTERIOR_COLORS.path_light;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            ctx.fillStyle = EXTERIOR_COLORS.path_dark;
            for (let i = 0; i < 3; i++) {
                ctx.fillRect(px + 4 + i * 10, py + 8 + (i % 2) * 12, 4, 4);
            }
            // Red coffee cherries spread out to dry
            ctx.fillStyle = '#cc0000';
            ctx.fillRect(px + 2, py + 4, 4, 3);
            ctx.fillRect(px + 8, py + 6, 4, 3);
            ctx.fillRect(px + 14, py + 3, 4, 3);
            ctx.fillRect(px + 20, py + 5, 4, 3);
            ctx.fillRect(px + 26, py + 4, 4, 3);
            ctx.fillRect(px + 4, py + 12, 4, 3);
            ctx.fillRect(px + 10, py + 14, 4, 3);
            ctx.fillRect(px + 18, py + 12, 4, 3);
            ctx.fillRect(px + 24, py + 15, 4, 3);
            ctx.fillRect(px + 6, py + 20, 4, 3);
            ctx.fillRect(px + 12, py + 22, 4, 3);
            ctx.fillRect(px + 20, py + 21, 4, 3);
            ctx.fillRect(px + 26, py + 23, 4, 3);
            // Darker red highlights
            ctx.fillStyle = '#8b0000';
            ctx.fillRect(px + 3, py + 5, 2, 1);
            ctx.fillRect(px + 9, py + 7, 2, 1);
            ctx.fillRect(px + 15, py + 4, 2, 1);
            ctx.fillRect(px + 21, py + 6, 2, 1);
            ctx.fillRect(px + 5, py + 13, 2, 1);
            ctx.fillRect(px + 11, py + 15, 2, 1);
            ctx.fillRect(px + 19, py + 13, 2, 1);
            ctx.fillRect(px + 7, py + 21, 2, 1);
            ctx.fillRect(px + 13, py + 23, 2, 1);
            ctx.fillRect(px + 21, py + 22, 2, 1);
            break;

        case EXT_TILES.TO_LAKE:
            // Draw path with arrow pointing to lake
            ctx.fillStyle = EXTERIOR_COLORS.path_light;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            ctx.fillStyle = EXTERIOR_COLORS.path_dark;
            for (let i = 0; i < 3; i++) {
                ctx.fillRect(px + 4 + i * 10, py + 8 + (i % 2) * 12, 4, 4);
            }
            // Arrow pointing right (to lake)
            ctx.fillStyle = '#4080c0';
            ctx.fillRect(px + 8, py + 14, 12, 4);
            ctx.fillRect(px + 16, py + 10, 4, 12);
            ctx.fillRect(px + 20, py + 12, 4, 8);
            ctx.fillRect(px + 24, py + 14, 4, 4);
            break;

        case EXT_TILES.TO_PLANTATION:
            // Draw path leading to plantation (cleared land style with green arrow)
            ctx.fillStyle = EXTERIOR_COLORS.path_light;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Add some texture (like cleared land)
            ctx.fillStyle = EXTERIOR_COLORS.path_mid;
            ctx.fillRect(px + 6, py + 6, 4, 4);
            ctx.fillRect(px + 20, py + 18, 4, 4);
            // Arrow pointing up (to plantation)
            ctx.fillStyle = '#2d5a27';  // Coffee plantation green
            ctx.fillRect(px + 14, py + 12, 4, 12);  // Vertical line
            ctx.fillRect(px + 10, py + 12, 12, 4);  // Horizontal line
            ctx.fillRect(px + 12, py + 8, 8, 4);    // Arrow head
            ctx.fillRect(px + 14, py + 4, 4, 4);    // Arrow tip
            // "P" label
            ctx.fillStyle = '#1a3a1a';
            ctx.font = '10px monospace';
            ctx.fillText('P', px + 22, py + 26);
            break;

        case EXT_TILES.LAKE_WATER:
            // Deep lake water with wave pattern
            ctx.fillStyle = EXTERIOR_COLORS.lake_deep;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Wave pattern
            ctx.fillStyle = EXTERIOR_COLORS.lake_wave;
            const waveOffset = (Date.now() / 500) % 2;
            for (let i = 0; i < 3; i++) {
                ctx.fillRect(px + ((i * 10 + waveOffset * 5) % 32), py + 4 + i * 10, 8, 2);
            }
            ctx.fillStyle = EXTERIOR_COLORS.lake_light;
            ctx.fillRect(px + 12, py + 8, 6, 2);
            ctx.fillRect(px + 4, py + 20, 6, 2);
            break;

        case EXT_TILES.LAKE_EDGE:
            // Lake shore/edge - brown dirt meeting water
            ctx.fillStyle = EXTERIOR_COLORS.lake_edge;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Some grass tufts
            ctx.fillStyle = EXTERIOR_COLORS.grass_mid;
            ctx.fillRect(px + 4, py + 4, 4, 4);
            ctx.fillRect(px + 20, py + 8, 6, 4);
            ctx.fillRect(px + 8, py + 22, 5, 4);
            // Water edge
            ctx.fillStyle = EXTERIOR_COLORS.lake_mid;
            ctx.fillRect(px + 24, py + 20, 8, 12);
            break;

        case EXT_TILES.PADDY_FIELD:
            // Rice paddy field - green with grid pattern
            ctx.fillStyle = EXTERIOR_COLORS.paddy_green;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Rice plant rows
            ctx.fillStyle = EXTERIOR_COLORS.paddy_dark;
            for (let i = 0; i < 4; i++) {
                ctx.fillRect(px, py + 2 + i * 8, TILE_SIZE, 2);
            }
            // Individual plants
            ctx.fillStyle = '#80b030';
            for (let row = 0; row < 4; row++) {
                for (let col = 0; col < 4; col++) {
                    ctx.fillRect(px + 2 + col * 8, py + 4 + row * 8, 4, 4);
                }
            }
            break;

        case EXT_TILES.PADDY_WATER:
            // Flooded paddy - water visible between plants
            ctx.fillStyle = EXTERIOR_COLORS.paddy_water;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Rice plants in water
            ctx.fillStyle = EXTERIOR_COLORS.paddy_green;
            for (let row = 0; row < 4; row++) {
                for (let col = 0; col < 4; col++) {
                    ctx.fillRect(px + 2 + col * 8, py + 2 + row * 8, 5, 5);
                }
            }
            // Water shine
            ctx.fillStyle = '#80b0d0';
            ctx.fillRect(px + 6, py + 6, 3, 2);
            ctx.fillRect(px + 22, py + 14, 3, 2);
            break;

        case EXT_TILES.LAKE_HOUSE:
            // Small house/building near lake
            ctx.fillStyle = EXTERIOR_COLORS.grass_mid;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // House base
            ctx.fillStyle = '#e8d8c8';
            ctx.fillRect(px + 2, py + 12, 28, 18);
            // Roof (red like Pokemon style)
            ctx.fillStyle = '#c04830';
            ctx.fillRect(px, py + 4, TILE_SIZE, 10);
            ctx.fillStyle = '#a03820';
            ctx.fillRect(px + 2, py + 6, 28, 2);
            // Door
            ctx.fillStyle = '#805020';
            ctx.fillRect(px + 12, py + 18, 8, 12);
            // Window
            ctx.fillStyle = '#58a8f8';
            ctx.fillRect(px + 4, py + 16, 6, 6);
            ctx.fillRect(px + 22, py + 16, 6, 6);
            break;

        case EXT_TILES.LAKE_DOCK:
            // Wooden dock extending into water
            ctx.fillStyle = EXTERIOR_COLORS.lake_mid;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Wooden planks
            ctx.fillStyle = '#a08060';
            ctx.fillRect(px + 4, py, 24, TILE_SIZE);
            // Plank lines
            ctx.fillStyle = '#806040';
            for (let i = 0; i < 4; i++) {
                ctx.fillRect(px + 4, py + 2 + i * 8, 24, 2);
            }
            // Support posts
            ctx.fillStyle = '#604020';
            ctx.fillRect(px + 6, py + 8, 4, 16);
            ctx.fillRect(px + 22, py + 8, 4, 16);
            break;

        case EXT_TILES.LAKE_PATH:
            // Path in lake area
            ctx.fillStyle = EXTERIOR_COLORS.path_light;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            ctx.fillStyle = EXTERIOR_COLORS.path_dark;
            for (let i = 0; i < 4; i++) {
                ctx.fillRect(px + 2 + i * 8, py + 4 + (i % 2) * 16, 4, 4);
            }
            break;

        case EXT_TILES.LAKE_GRASS:
            // Grass in lake area (slightly different shade)
            ctx.fillStyle = '#88c858';
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Grass texture
            ctx.fillStyle = '#78b848';
            for (let i = 0; i < 5; i++) {
                ctx.fillRect(px + 2 + (i * 7) % 28, py + 4 + (i * 11) % 24, 4, 4);
            }
            // Small grass tufts
            ctx.fillStyle = '#68a838';
            ctx.fillRect(px + 8, py + 16, 3, 5);
            ctx.fillRect(px + 20, py + 8, 3, 5);
            break;

        case EXT_TILES.LAKE_TREE:
            // Pine tree (Pokemon style)
            ctx.fillStyle = '#88c858';
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Tree trunk
            ctx.fillStyle = '#805830';
            ctx.fillRect(px + 12, py + 22, 8, 10);
            // Tree foliage (triangular pine shape)
            ctx.fillStyle = '#308030';
            ctx.fillRect(px + 8, py + 18, 16, 6);
            ctx.fillRect(px + 6, py + 12, 20, 8);
            ctx.fillRect(px + 4, py + 6, 24, 8);
            ctx.fillRect(px + 8, py + 2, 16, 6);
            ctx.fillRect(px + 12, py, 8, 4);
            // Highlight
            ctx.fillStyle = '#409040';
            ctx.fillRect(px + 10, py + 8, 4, 4);
            ctx.fillRect(px + 8, py + 14, 4, 3);
            break;

        case EXT_TILES.TO_ESTATE:
            // Path back to estate with arrow
            ctx.fillStyle = EXTERIOR_COLORS.path_light;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            ctx.fillStyle = EXTERIOR_COLORS.path_dark;
            for (let i = 0; i < 3; i++) {
                ctx.fillRect(px + 4 + i * 10, py + 8 + (i % 2) * 12, 4, 4);
            }
            // Arrow pointing down (to estate)
            ctx.fillStyle = '#80a040';
            ctx.fillRect(px + 14, py + 4, 4, 12);
            ctx.fillRect(px + 10, py + 12, 12, 4);
            ctx.fillRect(px + 12, py + 16, 8, 4);
            ctx.fillRect(px + 14, py + 20, 4, 8);
            break;

        case EXT_TILES.AXE:
            // Draw cleared land base
            ctx.fillStyle = EXTERIOR_COLORS.path_light;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            ctx.fillStyle = EXTERIOR_COLORS.path_dark;
            for (let i = 0; i < 3; i++) {
                ctx.fillRect(px + 4 + i * 10, py + 8 + (i % 2) * 12, 4, 4);
            }
            // Axe handle
            ctx.fillStyle = '#8b4513';
            ctx.fillRect(px + 14, py + 10, 4, 18);
            // Axe head
            ctx.fillStyle = '#a0a0a0';
            ctx.fillRect(px + 8, py + 8, 16, 6);
            ctx.fillRect(px + 6, py + 10, 6, 4);
            // Axe shine
            ctx.fillStyle = '#d0d0d0';
            ctx.fillRect(px + 10, py + 9, 8, 2);
            break;

        case EXT_TILES.SHOVEL:
            // Draw cleared land base
            ctx.fillStyle = EXTERIOR_COLORS.path_light;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            ctx.fillStyle = EXTERIOR_COLORS.path_dark;
            for (let i = 0; i < 3; i++) {
                ctx.fillRect(px + 4 + i * 10, py + 8 + (i % 2) * 12, 4, 4);
            }
            // Shovel handle
            ctx.fillStyle = '#8b4513';
            ctx.fillRect(px + 14, py + 6, 4, 20);
            // Handle grip
            ctx.fillStyle = '#654321';
            ctx.fillRect(px + 12, py + 4, 8, 4);
            // Shovel blade
            ctx.fillStyle = '#707070';
            ctx.fillRect(px + 10, py + 22, 12, 8);
            ctx.fillRect(px + 12, py + 26, 8, 4);
            // Blade shine
            ctx.fillStyle = '#909090';
            ctx.fillRect(px + 12, py + 23, 8, 3);
            break;

        case EXT_TILES.BURIED_SAFE:
            // Looks like coffee plantation but with subtle mound/disturbance
            ctx.fillStyle = EXTERIOR_COLORS.grass_dark;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Coffee plant details
            ctx.fillStyle = EXTERIOR_COLORS.grass_mid;
            ctx.fillRect(px + 2, py + 2, 4, 4);
            ctx.fillRect(px + 14, py + 6, 4, 4);
            ctx.fillRect(px + 26, py + 2, 4, 4);
            ctx.fillRect(px + 8, py + 14, 4, 4);
            // Subtle mound/disturbed earth hint
            ctx.fillStyle = '#5a4a3a';
            ctx.fillRect(px + 8, py + 18, 16, 10);
            ctx.fillStyle = '#6a5a4a';
            ctx.fillRect(px + 10, py + 20, 12, 6);
            // Small rocks around mound
            ctx.fillStyle = '#808080';
            ctx.fillRect(px + 6, py + 22, 3, 3);
            ctx.fillRect(px + 23, py + 24, 3, 3);
            break;

        case EXT_TILES.STORAGE_SHED:
            drawGrassBase(px, py);
            // Small shed
            ctx.fillStyle = EXTERIOR_COLORS.wall_cream;
            ctx.fillRect(px + 2, py + 10, 28, 20);
            ctx.fillStyle = EXTERIOR_COLORS.roof_red;
            ctx.fillRect(px, py + 2, TILE_SIZE, 12);
            ctx.fillStyle = EXTERIOR_COLORS.roof_dark;
            ctx.fillRect(px, py + 10, TILE_SIZE, 2);
            // Door
            ctx.fillStyle = EXTERIOR_COLORS.door_brown;
            ctx.fillRect(px + 12, py + 16, 8, 14);
            break;

        case EXT_TILES.SAFE:
            drawGrassBase(px, py);
            // Safe box
            ctx.fillStyle = '#505050';
            ctx.fillRect(px + 6, py + 8, 20, 20);
            ctx.fillStyle = '#404040';
            ctx.fillRect(px + 8, py + 10, 16, 16);
            ctx.fillStyle = '#606060';
            ctx.fillRect(px + 10, py + 12, 12, 12);
            // Dial
            ctx.fillStyle = EXTERIOR_COLORS.brass_gold;
            ctx.fillRect(px + 14, py + 16, 4, 4);
            // Handle
            ctx.fillStyle = '#707070';
            ctx.fillRect(px + 20, py + 14, 4, 8);
            break;

        case EXT_TILES.POND:
            // Pokemon-style water
            ctx.fillStyle = EXTERIOR_COLORS.water_mid;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Water ripples
            ctx.fillStyle = EXTERIOR_COLORS.water_light;
            ctx.fillRect(px + 4, py + 8, 8, 2);
            ctx.fillRect(px + 16, py + 4, 10, 2);
            ctx.fillRect(px + 8, py + 20, 12, 2);
            ctx.fillStyle = EXTERIOR_COLORS.water_dark;
            ctx.fillRect(px + 2, py + 14, 6, 2);
            ctx.fillRect(px + 20, py + 24, 8, 2);
            // Edge
            ctx.fillStyle = EXTERIOR_COLORS.grass_dark;
            ctx.fillRect(px, py, 2, TILE_SIZE);
            ctx.fillRect(px, py, TILE_SIZE, 2);
            break;

        case EXT_TILES.FLOWERS:
            drawGrassBase(px, py);
            // Pokemon-style flower patch
            ctx.fillStyle = EXTERIOR_COLORS.flower_red;
            ctx.fillRect(px + 4, py + 6, 4, 4);
            ctx.fillRect(px + 14, py + 4, 4, 4);
            ctx.fillRect(px + 24, py + 8, 4, 4);
            ctx.fillRect(px + 8, py + 16, 4, 4);
            ctx.fillRect(px + 18, py + 18, 4, 4);
            ctx.fillRect(px + 6, py + 26, 4, 4);
            ctx.fillRect(px + 22, py + 24, 4, 4);
            // Flower centers
            ctx.fillStyle = EXTERIOR_COLORS.flower_yellow;
            ctx.fillRect(px + 5, py + 7, 2, 2);
            ctx.fillRect(px + 15, py + 5, 2, 2);
            ctx.fillRect(px + 25, py + 9, 2, 2);
            ctx.fillRect(px + 9, py + 17, 2, 2);
            ctx.fillRect(px + 19, py + 19, 2, 2);
            break;

        case EXT_TILES.WITHERED_TREE:
            // Coffee plantation base (walkable)
            ctx.fillStyle = EXTERIOR_COLORS.coffee_dark;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            ctx.fillStyle = EXTERIOR_COLORS.coffee_mid;
            ctx.fillRect(px + 2, py + 2, 4, 4);
            ctx.fillRect(px + 14, py + 6, 4, 4);
            ctx.fillRect(px + 26, py + 2, 4, 4);
            ctx.fillRect(px + 8, py + 14, 4, 4);
            // Withered/dead tree (brown/gray, smaller)
            ctx.fillStyle = '#8B7355';  // Faded brown trunk
            ctx.fillRect(px + 12, py + 16, 8, 14);
            // Sparse, dead branches
            ctx.fillStyle = '#6B5344';  // Darker dead wood
            ctx.fillRect(px + 8, py + 8, 16, 10);
            ctx.fillStyle = '#9B8B7B';  // Grayish dead leaves
            ctx.fillRect(px + 6, py + 4, 6, 6);
            ctx.fillRect(px + 18, py + 6, 6, 5);
            ctx.fillRect(px + 10, py + 2, 8, 5);
            break;
    }
}

// =============================================
// DRAWING FUNCTIONS - LAKE (Pokemon Style)
// =============================================

function drawLakeTile(tileType, x, y) {
    const px = x * TILE_SIZE;
    const py = y * TILE_SIZE;

    switch (tileType) {
        case EXT_TILES.LAKE_GRASS:
            // Pokemon-style grass base
            ctx.fillStyle = EXTERIOR_COLORS.lake_grass;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Scattered grass tufts (like Pokemon)
            ctx.fillStyle = EXTERIOR_COLORS.lake_grass_dark;
            // Small V-shaped grass tufts
            ctx.fillRect(px + 6, py + 8, 2, 4);
            ctx.fillRect(px + 8, py + 10, 2, 2);
            ctx.fillRect(px + 20, py + 6, 2, 4);
            ctx.fillRect(px + 22, py + 8, 2, 2);
            ctx.fillRect(px + 12, py + 20, 2, 4);
            ctx.fillRect(px + 14, py + 22, 2, 2);
            ctx.fillRect(px + 26, py + 18, 2, 4);
            ctx.fillRect(px + 28, py + 20, 2, 2);
            break;

        case EXT_TILES.LAKE_PATH:
            // Dirt path
            ctx.fillStyle = EXTERIOR_COLORS.lake_path;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Path texture - small pebbles
            ctx.fillStyle = EXTERIOR_COLORS.lake_path_dark;
            ctx.fillRect(px + 4, py + 6, 3, 2);
            ctx.fillRect(px + 14, py + 12, 4, 2);
            ctx.fillRect(px + 24, py + 8, 3, 2);
            ctx.fillRect(px + 8, py + 22, 3, 2);
            ctx.fillRect(px + 20, py + 26, 4, 2);
            break;

        case EXT_TILES.LAKE_WATER:
            // Pokemon-style water with diagonal wave pattern
            ctx.fillStyle = EXTERIOR_COLORS.lake_deep;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Diagonal wave lines (Pokemon style)
            ctx.fillStyle = EXTERIOR_COLORS.lake_mid;
            // Wave pattern going diagonally
            for (let i = 0; i < 4; i++) {
                const offset = i * 8;
                ctx.fillRect(px + offset, py + 2 + offset, 6, 2);
                ctx.fillRect(px + offset + 2, py + 6 + offset, 4, 2);
            }
            // Second set of waves
            ctx.fillStyle = EXTERIOR_COLORS.lake_light;
            ctx.fillRect(px + 4, py + 4, 3, 1);
            ctx.fillRect(px + 12, py + 12, 3, 1);
            ctx.fillRect(px + 20, py + 20, 3, 1);
            ctx.fillRect(px + 24, py + 6, 3, 1);
            ctx.fillRect(px + 8, py + 24, 3, 1);
            break;

        case EXT_TILES.LAKE_EDGE:
            // Thin brown edge like Pokemon (grass with thin water border)
            ctx.fillStyle = EXTERIOR_COLORS.lake_grass;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Thin brown border at bottom
            ctx.fillStyle = EXTERIOR_COLORS.lake_edge;
            ctx.fillRect(px, py + 26, TILE_SIZE, 6);
            ctx.fillStyle = EXTERIOR_COLORS.lake_edge_dark;
            ctx.fillRect(px, py + 28, TILE_SIZE, 4);
            // Grass tufts on top
            ctx.fillStyle = EXTERIOR_COLORS.lake_grass_dark;
            ctx.fillRect(px + 8, py + 10, 2, 4);
            ctx.fillRect(px + 22, py + 14, 2, 4);
            break;

        case EXT_TILES.PADDY_FIELD:
            // Rice paddy (green) - more natural look
            ctx.fillStyle = EXTERIOR_COLORS.paddy_green;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Rice plant clusters
            ctx.fillStyle = EXTERIOR_COLORS.paddy_dark;
            ctx.fillRect(px + 2, py + 4, 4, 6);
            ctx.fillRect(px + 10, py + 8, 4, 6);
            ctx.fillRect(px + 18, py + 2, 4, 6);
            ctx.fillRect(px + 26, py + 10, 4, 6);
            ctx.fillRect(px + 6, py + 18, 4, 6);
            ctx.fillRect(px + 14, py + 22, 4, 6);
            ctx.fillRect(px + 22, py + 20, 4, 6);
            break;

        case EXT_TILES.PADDY_WATER:
            // Flooded paddy - more subtle
            ctx.fillStyle = EXTERIOR_COLORS.paddy_green;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Water reflection between plants
            ctx.fillStyle = EXTERIOR_COLORS.paddy_water;
            ctx.fillRect(px + 6, py + 6, 6, 4);
            ctx.fillRect(px + 18, py + 12, 6, 4);
            ctx.fillRect(px + 8, py + 22, 6, 4);
            // Rice shoots
            ctx.fillStyle = EXTERIOR_COLORS.paddy_dark;
            ctx.fillRect(px + 2, py + 2, 3, 8);
            ctx.fillRect(px + 14, py + 4, 3, 8);
            ctx.fillRect(px + 26, py + 6, 3, 8);
            ctx.fillRect(px + 4, py + 18, 3, 8);
            ctx.fillRect(px + 20, py + 20, 3, 8);
            break;

        case EXT_TILES.LAKE_DOCK:
            // Water underneath with waves
            ctx.fillStyle = EXTERIOR_COLORS.lake_deep;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            ctx.fillStyle = EXTERIOR_COLORS.lake_mid;
            ctx.fillRect(px + 2, py + 4, 4, 2);
            ctx.fillRect(px + 24, py + 26, 4, 2);
            // Wooden dock planks - horizontal
            ctx.fillStyle = EXTERIOR_COLORS.dock_wood;
            ctx.fillRect(px, py + 10, TILE_SIZE, 14);
            // Plank gaps
            ctx.fillStyle = EXTERIOR_COLORS.dock_dark;
            ctx.fillRect(px, py + 15, TILE_SIZE, 2);
            ctx.fillRect(px, py + 21, TILE_SIZE, 2);
            break;

        case EXT_TILES.LAKE_HOUSE:
            // Pokemon-style house with red roof (2x2 tiles, this is top-left)
            ctx.fillStyle = EXTERIOR_COLORS.lake_grass;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // House wall
            ctx.fillStyle = EXTERIOR_COLORS.house_wall;
            ctx.fillRect(px + 2, py + 14, 28, 18);
            // Red roof (Pokemon style - horizontal stripes)
            ctx.fillStyle = EXTERIOR_COLORS.house_roof;
            ctx.fillRect(px, py + 4, TILE_SIZE, 12);
            ctx.fillStyle = EXTERIOR_COLORS.house_roof_dark;
            ctx.fillRect(px, py + 8, TILE_SIZE, 2);
            ctx.fillRect(px, py + 12, TILE_SIZE, 2);
            // Window
            ctx.fillStyle = EXTERIOR_COLORS.house_window;
            ctx.fillRect(px + 8, py + 18, 6, 6);
            // Window frame
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(px + 10, py + 18, 2, 6);
            ctx.fillRect(px + 8, py + 20, 6, 2);
            // Door (on right side)
            ctx.fillStyle = EXTERIOR_COLORS.house_door;
            ctx.fillRect(px + 20, py + 16, 8, 14);
            break;

        case EXT_TILES.LAKE_TREE:
            // Pokemon-style fuller, rounder tree
            ctx.fillStyle = EXTERIOR_COLORS.lake_grass;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Shadow under tree
            ctx.fillStyle = EXTERIOR_COLORS.tree_shadow;
            ctx.fillRect(px + 6, py + 26, 20, 6);
            // Tree trunk
            ctx.fillStyle = EXTERIOR_COLORS.tree_trunk;
            ctx.fillRect(px + 13, py + 20, 6, 12);
            // Fuller, rounder foliage (like Pokemon cypress/pine)
            ctx.fillStyle = EXTERIOR_COLORS.tree_green;
            // Bottom layer (widest)
            ctx.fillRect(px + 4, py + 14, 24, 8);
            // Middle layer
            ctx.fillRect(px + 6, py + 8, 20, 8);
            // Top layer
            ctx.fillRect(px + 8, py + 2, 16, 8);
            // Tip
            ctx.fillRect(px + 12, py - 2, 8, 6);
            // Lighter highlights
            ctx.fillStyle = EXTERIOR_COLORS.tree_green_light;
            ctx.fillRect(px + 6, py + 10, 6, 4);
            ctx.fillRect(px + 10, py + 4, 4, 4);
            // Darker shadows
            ctx.fillStyle = EXTERIOR_COLORS.tree_dark;
            ctx.fillRect(px + 20, py + 16, 6, 4);
            ctx.fillRect(px + 18, py + 10, 6, 4);
            ctx.fillRect(px + 16, py + 4, 6, 4);
            break;

        case EXT_TILES.TO_ESTATE:
            // Path leading back
            ctx.fillStyle = EXTERIOR_COLORS.lake_path;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Arrow indicator
            ctx.fillStyle = '#ffd700';
            ctx.fillRect(px + 12, py + 4, 8, 4);
            ctx.fillRect(px + 14, py + 8, 4, 16);
            break;

        case EXT_TILES.BOAT:
            // Water underneath
            ctx.fillStyle = EXTERIOR_COLORS.lake_deep;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Wave pattern
            ctx.fillStyle = EXTERIOR_COLORS.lake_mid;
            ctx.fillRect(px + 2, py + 4, 6, 2);
            ctx.fillRect(px + 22, py + 26, 6, 2);
            // Boat hull (brown wooden boat)
            ctx.fillStyle = '#8B4513';
            ctx.fillRect(px + 4, py + 8, 24, 16);
            // Boat front (pointed)
            ctx.fillRect(px + 2, py + 10, 4, 12);
            // Boat back
            ctx.fillRect(px + 26, py + 10, 4, 12);
            // Inner boat (lighter wood)
            ctx.fillStyle = '#A0522D';
            ctx.fillRect(px + 6, py + 10, 20, 12);
            // Seat
            ctx.fillStyle = '#654321';
            ctx.fillRect(px + 10, py + 14, 12, 4);
            // Oars
            ctx.fillStyle = '#8B7355';
            ctx.fillRect(px + 2, py + 14, 6, 2);
            ctx.fillRect(px + 24, py + 16, 6, 2);
            break;

        case EXT_TILES.FISHING_ROD:
            // Grass base
            ctx.fillStyle = EXTERIOR_COLORS.lake_grass;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Grass tufts
            ctx.fillStyle = EXTERIOR_COLORS.lake_grass_dark;
            ctx.fillRect(px + 20, py + 8, 2, 4);
            ctx.fillRect(px + 6, py + 20, 2, 4);
            // Fishing rod (lying on ground)
            // Rod handle (cork colored)
            ctx.fillStyle = '#D2691E';
            ctx.fillRect(px + 4, py + 12, 8, 4);
            // Rod shaft (darker)
            ctx.fillStyle = '#4a4a4a';
            ctx.fillRect(px + 10, py + 13, 16, 2);
            // Rod tip (thin)
            ctx.fillStyle = '#666666';
            ctx.fillRect(px + 24, py + 13, 6, 1);
            // Reel
            ctx.fillStyle = '#2F4F4F';
            ctx.fillRect(px + 8, py + 10, 4, 3);
            // Fishing line (coiled)
            ctx.fillStyle = '#87CEEB';
            ctx.fillRect(px + 26, py + 12, 2, 4);
            ctx.fillRect(px + 28, py + 14, 2, 6);
            break;

        default:
            // Default grass
            ctx.fillStyle = EXTERIOR_COLORS.lake_grass;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            break;
    }
}

// =============================================
// DRAWING FUNCTIONS - SHED
// =============================================

function drawShedTile(tileType, x, y) {
    const px = x * TILE_SIZE;
    const py = y * TILE_SIZE;

    switch (tileType) {
        case SHED_TILES.FLOOR:
            // Dirt/concrete floor
            ctx.fillStyle = SHED_COLORS.floor_dirt;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Add some texture
            ctx.fillStyle = SHED_COLORS.floor_dark;
            for (let i = 0; i < 3; i++) {
                ctx.fillRect(px + Math.random() * 28, py + Math.random() * 28, 3, 3);
            }
            break;

        case SHED_TILES.WALL:
            // Wooden wall with planks
            ctx.fillStyle = SHED_COLORS.wall_wood;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Horizontal plank lines
            ctx.fillStyle = SHED_COLORS.wall_dark;
            ctx.fillRect(px, py + 7, TILE_SIZE, 2);
            ctx.fillRect(px, py + 15, TILE_SIZE, 2);
            ctx.fillRect(px, py + 23, TILE_SIZE, 2);
            // Vertical supports
            ctx.fillRect(px + 15, py, 2, TILE_SIZE);
            break;

        case SHED_TILES.DOOR:
            // Floor base
            ctx.fillStyle = SHED_COLORS.floor_dirt;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Door frame
            ctx.fillStyle = SHED_COLORS.wall_dark;
            ctx.fillRect(px + 2, py, 28, 6);
            // Door opening (dark)
            ctx.fillStyle = '#404040';
            ctx.fillRect(px + 4, py + 4, 24, 28);
            // Light from outside
            ctx.fillStyle = '#80a080';
            ctx.fillRect(px + 6, py + 6, 20, 24);
            // Door text hint
            ctx.fillStyle = '#505050';
            ctx.font = '8px Arial';
            ctx.fillText('EXIT', px + 8, py + 20);
            break;

        case SHED_TILES.WORKBENCH:
            // Floor base
            ctx.fillStyle = SHED_COLORS.floor_dirt;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Workbench legs
            ctx.fillStyle = SHED_COLORS.workbench;
            ctx.fillRect(px + 2, py + 20, 4, 12);
            ctx.fillRect(px + 26, py + 20, 4, 12);
            // Workbench top
            ctx.fillStyle = SHED_COLORS.workbench_top;
            ctx.fillRect(px, py + 12, TILE_SIZE, 10);
            ctx.fillStyle = SHED_COLORS.workbench;
            ctx.fillRect(px, py + 20, TILE_SIZE, 2);
            break;

        case SHED_TILES.SHELF:
            // Wall base
            ctx.fillStyle = SHED_COLORS.wall_wood;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            ctx.fillStyle = SHED_COLORS.wall_dark;
            ctx.fillRect(px, py + 15, TILE_SIZE, 2);
            // Blue shelf unit
            ctx.fillStyle = SHED_COLORS.shelf_blue;
            ctx.fillRect(px + 2, py + 4, 28, 26);
            // Shelf boards
            ctx.fillStyle = SHED_COLORS.shelf_blue_dark;
            ctx.fillRect(px + 2, py + 4, 28, 2);
            ctx.fillRect(px + 2, py + 14, 28, 2);
            ctx.fillRect(px + 2, py + 24, 28, 2);
            // Side edges
            ctx.fillRect(px + 2, py + 4, 2, 26);
            ctx.fillRect(px + 28, py + 4, 2, 26);
            // Items on shelf (boxes/jars)
            ctx.fillStyle = '#d0a060';
            ctx.fillRect(px + 6, py + 6, 6, 6);
            ctx.fillStyle = '#c06040';
            ctx.fillRect(px + 16, py + 7, 5, 5);
            ctx.fillStyle = '#80a080';
            ctx.fillRect(px + 8, py + 16, 8, 6);
            ctx.fillRect(px + 20, py + 17, 6, 5);
            break;

        case SHED_TILES.AXE:
            // Wall base
            ctx.fillStyle = SHED_COLORS.wall_wood;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            ctx.fillStyle = SHED_COLORS.wall_dark;
            ctx.fillRect(px, py + 15, TILE_SIZE, 2);
            // Axe on wall (if not taken)
            if (!player.hasAxe) {
                // Axe handle
                ctx.fillStyle = SHED_COLORS.axe_handle;
                ctx.fillRect(px + 14, py + 6, 4, 22);
                // Axe blade
                ctx.fillStyle = SHED_COLORS.axe_blade;
                ctx.beginPath();
                ctx.moveTo(px + 8, py + 6);
                ctx.lineTo(px + 14, py + 6);
                ctx.lineTo(px + 14, py + 14);
                ctx.lineTo(px + 4, py + 14);
                ctx.closePath();
                ctx.fill();
                // Blade edge highlight
                ctx.fillStyle = '#c0c0c0';
                ctx.fillRect(px + 4, py + 12, 10, 2);
            }
            break;

        case SHED_TILES.TOOLS:
            // Wall base
            ctx.fillStyle = SHED_COLORS.wall_wood;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            ctx.fillStyle = SHED_COLORS.wall_dark;
            ctx.fillRect(px, py + 15, TILE_SIZE, 2);
            // Hanging tools (rake, hoe)
            // Rake
            ctx.fillStyle = SHED_COLORS.tools_handle;
            ctx.fillRect(px + 6, py + 4, 3, 24);
            ctx.fillStyle = SHED_COLORS.tools_metal;
            ctx.fillRect(px + 3, py + 4, 9, 3);
            // Hoe
            ctx.fillStyle = SHED_COLORS.tools_handle;
            ctx.fillRect(px + 20, py + 4, 3, 24);
            ctx.fillStyle = SHED_COLORS.tools_metal;
            ctx.fillRect(px + 17, py + 4, 9, 4);
            break;

        case SHED_TILES.BARREL:
            // Floor base
            ctx.fillStyle = SHED_COLORS.floor_dirt;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Barrel
            ctx.fillStyle = SHED_COLORS.barrel_wood;
            ctx.fillRect(px + 4, py + 4, 24, 26);
            // Barrel bands
            ctx.fillStyle = SHED_COLORS.barrel_band;
            ctx.fillRect(px + 4, py + 8, 24, 3);
            ctx.fillRect(px + 4, py + 20, 24, 3);
            // Barrel curve illusion
            ctx.fillStyle = SHED_COLORS.wall_light;
            ctx.fillRect(px + 6, py + 4, 2, 26);
            break;

        case SHED_TILES.WINDOW:
            // Wall base
            ctx.fillStyle = SHED_COLORS.wall_wood;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Window frame
            ctx.fillStyle = SHED_COLORS.window_frame;
            ctx.fillRect(px + 4, py + 6, 24, 20);
            // Window glass
            ctx.fillStyle = SHED_COLORS.window_glass;
            ctx.fillRect(px + 6, py + 8, 20, 16);
            // Window cross
            ctx.fillStyle = SHED_COLORS.window_frame;
            ctx.fillRect(px + 15, py + 8, 2, 16);
            ctx.fillRect(px + 6, py + 15, 20, 2);
            // Light reflection
            ctx.fillStyle = 'rgba(255,255,255,0.3)';
            ctx.fillRect(px + 8, py + 10, 6, 4);
            break;

        case SHED_TILES.PLANT_POT:
            // Floor base
            ctx.fillStyle = SHED_COLORS.floor_dirt;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Terracotta pot
            ctx.fillStyle = SHED_COLORS.pot_terra;
            ctx.fillRect(px + 8, py + 16, 16, 14);
            ctx.fillRect(px + 6, py + 14, 20, 4);
            // Pot rim
            ctx.fillStyle = '#d07040';
            ctx.fillRect(px + 6, py + 14, 20, 2);
            // Dead/dried plant
            ctx.fillStyle = '#806040';
            ctx.fillRect(px + 14, py + 6, 4, 10);
            ctx.fillRect(px + 10, py + 8, 4, 6);
            ctx.fillRect(px + 18, py + 10, 4, 4);
            break;
    }
}

// =============================================
// DRAWING FUNCTIONS - PLANTATION
// =============================================

function drawPlantationTile(tileType, x, y) {
    const px = x * TILE_SIZE;
    const py = y * TILE_SIZE;

    switch (tileType) {
        case PLANT_TILES.PLANTATION_PATH:
            // Dirt path
            ctx.fillStyle = PLANTATION_COLORS.path;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            ctx.fillStyle = PLANTATION_COLORS.path_dark;
            ctx.fillRect(px + 4, py + 8, 3, 3);
            ctx.fillRect(px + 20, py + 16, 3, 3);
            ctx.fillRect(px + 12, py + 24, 3, 3);
            break;

        case PLANT_TILES.PLANTATION_GRASS:
            // Forest floor grass with Petalburg Woods style dots
            ctx.fillStyle = PLANTATION_COLORS.grass;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Light spots scattered like forest floor
            ctx.fillStyle = PLANTATION_COLORS.grass_light;
            ctx.fillRect(px + 4, py + 4, 2, 2);
            ctx.fillRect(px + 14, py + 8, 2, 2);
            ctx.fillRect(px + 26, py + 6, 2, 2);
            ctx.fillRect(px + 8, py + 18, 2, 2);
            ctx.fillRect(px + 20, py + 22, 2, 2);
            ctx.fillRect(px + 28, py + 16, 2, 2);
            // Dark shadows
            ctx.fillStyle = PLANTATION_COLORS.grass_dark;
            ctx.fillRect(px + 10, py + 12, 2, 2);
            ctx.fillRect(px + 24, py + 26, 2, 2);
            break;

        case PLANT_TILES.SHADE_TREE:
            // Grass base
            ctx.fillStyle = PLANTATION_COLORS.grass;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Tree trunk
            ctx.fillStyle = PLANTATION_COLORS.shade_tree_trunk;
            ctx.fillRect(px + 12, py + 18, 8, 14);
            // Tree canopy (silver oak style)
            ctx.fillStyle = PLANTATION_COLORS.shade_tree_leaves;
            ctx.fillRect(px + 2, py + 2, 28, 18);
            ctx.fillRect(px + 6, py, 20, 20);
            ctx.fillStyle = '#3a7a3a';
            ctx.fillRect(px + 6, py + 4, 12, 10);
            break;

        case PLANT_TILES.FOREST_BORDER:
            // Dense forest
            ctx.fillStyle = PLANTATION_COLORS.forest;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            ctx.fillStyle = '#2a4a2a';
            ctx.fillRect(px + 4, py + 4, 24, 20);
            ctx.fillRect(px + 8, py, 16, 24);
            break;

        // Arabica plant stages (16 = RIPE)
        case PLANT_TILES.ARABICA_EMPTY:
        case PLANT_TILES.ROBUSTA_EMPTY:
            ctx.fillStyle = PLANTATION_COLORS.grass;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Empty plot marker
            ctx.fillStyle = '#8b7355';
            ctx.fillRect(px + 8, py + 8, 16, 16);
            break;

        case PLANT_TILES.ARABICA_SEEDLING:
        case PLANT_TILES.ROBUSTA_SEEDLING:
            ctx.fillStyle = PLANTATION_COLORS.grass;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Small sprout
            ctx.fillStyle = '#4a8a4a';
            ctx.fillRect(px + 14, py + 18, 4, 8);
            ctx.fillRect(px + 12, py + 16, 8, 4);
            break;

        case PLANT_TILES.ARABICA_YOUNG:
        case PLANT_TILES.ROBUSTA_YOUNG:
            ctx.fillStyle = PLANTATION_COLORS.grass;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Small bush
            ctx.fillStyle = PLANTATION_COLORS.plant_base;
            ctx.fillRect(px + 10, py + 14, 12, 12);
            ctx.fillStyle = PLANTATION_COLORS.plant_leaves;
            ctx.fillRect(px + 8, py + 12, 16, 10);
            break;

        case PLANT_TILES.ARABICA_MATURE:
        case PLANT_TILES.ROBUSTA_MATURE:
            ctx.fillStyle = PLANTATION_COLORS.grass;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Full bush (no berries)
            ctx.fillStyle = PLANTATION_COLORS.plant_base;
            ctx.fillRect(px + 6, py + 10, 20, 18);
            ctx.fillStyle = PLANTATION_COLORS.plant_leaves;
            ctx.fillRect(px + 4, py + 8, 24, 14);
            ctx.fillRect(px + 8, py + 4, 16, 18);
            break;

        case PLANT_TILES.ARABICA_FLOWERING:
        case PLANT_TILES.ROBUSTA_FLOWERING:
            ctx.fillStyle = PLANTATION_COLORS.grass;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Bush with white flowers
            ctx.fillStyle = PLANTATION_COLORS.plant_base;
            ctx.fillRect(px + 6, py + 10, 20, 18);
            ctx.fillStyle = PLANTATION_COLORS.plant_leaves;
            ctx.fillRect(px + 4, py + 8, 24, 14);
            // White flowers
            ctx.fillStyle = PLANTATION_COLORS.flower_white;
            ctx.fillRect(px + 8, py + 10, 3, 3);
            ctx.fillRect(px + 16, py + 8, 3, 3);
            ctx.fillRect(px + 12, py + 14, 3, 3);
            ctx.fillRect(px + 20, py + 12, 3, 3);
            break;

        case PLANT_TILES.ARABICA_GREEN_BERRY:
        case PLANT_TILES.ROBUSTA_GREEN_BERRY:
            ctx.fillStyle = PLANTATION_COLORS.grass;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Bush with green berries
            ctx.fillStyle = PLANTATION_COLORS.plant_base;
            ctx.fillRect(px + 6, py + 10, 20, 18);
            ctx.fillStyle = PLANTATION_COLORS.plant_leaves;
            ctx.fillRect(px + 4, py + 8, 24, 14);
            // Green berries
            ctx.fillStyle = PLANTATION_COLORS.cherry_green;
            ctx.fillRect(px + 8, py + 12, 4, 4);
            ctx.fillRect(px + 18, py + 10, 4, 4);
            ctx.fillRect(px + 12, py + 16, 4, 4);
            break;

        case PLANT_TILES.ARABICA_RIPE:
        case PLANT_TILES.ROBUSTA_RIPE:
            ctx.fillStyle = PLANTATION_COLORS.grass;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Bush with red berries (harvestable!)
            ctx.fillStyle = PLANTATION_COLORS.plant_base;
            ctx.fillRect(px + 6, py + 10, 20, 18);
            ctx.fillStyle = PLANTATION_COLORS.plant_leaves;
            ctx.fillRect(px + 4, py + 8, 24, 14);
            // Red berries
            ctx.fillStyle = PLANTATION_COLORS.cherry_ripe;
            ctx.fillRect(px + 8, py + 12, 4, 4);
            ctx.fillRect(px + 18, py + 10, 4, 4);
            ctx.fillRect(px + 12, py + 16, 4, 4);
            ctx.fillRect(px + 22, py + 14, 4, 4);
            ctx.fillRect(px + 6, py + 18, 4, 4);
            break;

        case PLANT_TILES.ARABICA_OVERRIPE:
        case PLANT_TILES.ROBUSTA_OVERRIPE:
            ctx.fillStyle = PLANTATION_COLORS.grass;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Bush with dark berries
            ctx.fillStyle = PLANTATION_COLORS.plant_base;
            ctx.fillRect(px + 6, py + 10, 20, 18);
            ctx.fillStyle = PLANTATION_COLORS.plant_leaves;
            ctx.fillRect(px + 4, py + 8, 24, 14);
            // Dark overripe berries
            ctx.fillStyle = PLANTATION_COLORS.cherry_overripe;
            ctx.fillRect(px + 8, py + 12, 4, 4);
            ctx.fillRect(px + 18, py + 10, 4, 4);
            ctx.fillRect(px + 12, py + 16, 4, 4);
            break;

        case PLANT_TILES.ARABICA_DISEASED:
        case PLANT_TILES.ROBUSTA_DISEASED:
            ctx.fillStyle = PLANTATION_COLORS.grass;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Wilted/diseased bush
            ctx.fillStyle = '#6a5a3a';
            ctx.fillRect(px + 8, py + 12, 16, 14);
            ctx.fillStyle = '#8a7a4a';
            ctx.fillRect(px + 6, py + 10, 20, 10);
            // Disease spots
            ctx.fillStyle = '#aa6633';
            ctx.fillRect(px + 10, py + 12, 3, 3);
            ctx.fillRect(px + 18, py + 14, 3, 3);
            break;

        // Infrastructure
        case PLANT_TILES.WATER_TANK:
            ctx.fillStyle = PLANTATION_COLORS.grass;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Blue water tank
            ctx.fillStyle = PLANTATION_COLORS.tank_blue;
            ctx.fillRect(px + 4, py + 4, 24, 24);
            ctx.fillStyle = '#3377bb';
            ctx.fillRect(px + 4, py + 4, 24, 4);
            ctx.fillStyle = '#66aaee';
            ctx.fillRect(px + 8, py + 10, 8, 8);
            break;

        case PLANT_TILES.PUMP_HOUSE:
            ctx.fillStyle = PLANTATION_COLORS.grass;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Small pump building
            ctx.fillStyle = PLANTATION_COLORS.building_wall;
            ctx.fillRect(px + 4, py + 8, 24, 20);
            ctx.fillStyle = PLANTATION_COLORS.building_roof;
            ctx.fillRect(px + 2, py + 4, 28, 6);
            // Pipe
            ctx.fillStyle = '#808080';
            ctx.fillRect(px + 12, py + 14, 8, 4);
            break;

        case PLANT_TILES.GENERATOR:
            ctx.fillStyle = PLANTATION_COLORS.grass;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Generator unit
            ctx.fillStyle = '#606060';
            ctx.fillRect(px + 4, py + 8, 24, 20);
            ctx.fillStyle = '#404040';
            ctx.fillRect(px + 4, py + 8, 24, 4);
            // Vents
            ctx.fillStyle = '#303030';
            ctx.fillRect(px + 8, py + 16, 16, 2);
            ctx.fillRect(px + 8, py + 20, 16, 2);
            break;

        case PLANT_TILES.PROCESSING_SHED:
            // Large building
            ctx.fillStyle = PLANTATION_COLORS.building_wall;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            ctx.fillStyle = PLANTATION_COLORS.building_roof;
            ctx.fillRect(px, py, TILE_SIZE, 8);
            ctx.fillStyle = PLANTATION_COLORS.building_dark;
            ctx.fillRect(px, py + 28, TILE_SIZE, 4);
            break;

        case PLANT_TILES.STORAGE_BUILDING:
            ctx.fillStyle = PLANTATION_COLORS.building_wall;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            ctx.fillStyle = PLANTATION_COLORS.building_roof;
            ctx.fillRect(px, py, TILE_SIZE, 6);
            // Storage boxes hint
            ctx.fillStyle = '#8b6914';
            ctx.fillRect(px + 6, py + 12, 8, 8);
            ctx.fillRect(px + 18, py + 14, 8, 8);
            break;

        case PLANT_TILES.WORKER_QUARTERS:
            ctx.fillStyle = PLANTATION_COLORS.building_wall;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            ctx.fillStyle = PLANTATION_COLORS.building_roof;
            ctx.fillRect(px, py, TILE_SIZE, 6);
            // Window
            ctx.fillStyle = '#87ceeb';
            ctx.fillRect(px + 10, py + 12, 12, 8);
            ctx.fillStyle = '#654321';
            ctx.fillRect(px + 15, py + 12, 2, 8);
            break;

        case PLANT_TILES.DRYING_YARD_EMPTY:
            ctx.fillStyle = PLANTATION_COLORS.drying_yard;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            ctx.fillStyle = '#c4a886';
            ctx.fillRect(px, py, TILE_SIZE, 2);
            ctx.fillRect(px, py, 2, TILE_SIZE);
            break;

        case PLANT_TILES.DRYING_YARD_WET:
            ctx.fillStyle = PLANTATION_COLORS.drying_yard;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Wet cherries spread out
            ctx.fillStyle = PLANTATION_COLORS.drying_wet;
            for (let i = 0; i < 12; i++) {
                const bx = 4 + (i % 4) * 7;
                const by = 4 + Math.floor(i / 4) * 9;
                ctx.fillRect(px + bx, py + by, 5, 5);
            }
            break;

        case PLANT_TILES.DRYING_YARD_DRY:
            ctx.fillStyle = PLANTATION_COLORS.drying_yard;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Dried beans (lighter color)
            ctx.fillStyle = PLANTATION_COLORS.drying_dry;
            for (let i = 0; i < 12; i++) {
                const bx = 4 + (i % 4) * 7;
                const by = 4 + Math.floor(i / 4) * 9;
                ctx.fillRect(px + bx, py + by, 5, 5);
            }
            break;

        case PLANT_TILES.FERMENTATION_TANK:
            ctx.fillStyle = PLANTATION_COLORS.grass;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Cement tank
            ctx.fillStyle = PLANTATION_COLORS.ferment_tank;
            ctx.fillRect(px + 2, py + 4, 28, 24);
            ctx.fillStyle = '#505050';
            ctx.fillRect(px + 2, py + 4, 28, 4);
            // Water/contents hint
            ctx.fillStyle = '#7a5a3a';
            ctx.fillRect(px + 4, py + 10, 24, 16);
            break;

        // Interactables
        case PLANT_TILES.NOTICE_BOARD:
            ctx.fillStyle = PLANTATION_COLORS.grass;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Wooden board
            ctx.fillStyle = '#6b4423';
            ctx.fillRect(px + 14, py + 16, 4, 14);
            ctx.fillRect(px + 4, py + 4, 24, 14);
            ctx.fillStyle = '#f5f5dc';
            ctx.fillRect(px + 6, py + 6, 20, 10);
            // Text lines
            ctx.fillStyle = '#333';
            ctx.fillRect(px + 8, py + 8, 16, 2);
            ctx.fillRect(px + 8, py + 12, 12, 2);
            break;

        case PLANT_TILES.PHONE_BOOTH:
            ctx.fillStyle = PLANTATION_COLORS.grass;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Phone booth
            ctx.fillStyle = '#cc4444';
            ctx.fillRect(px + 8, py + 4, 16, 24);
            ctx.fillStyle = '#aa3333';
            ctx.fillRect(px + 8, py + 4, 16, 4);
            // Glass
            ctx.fillStyle = '#aaddff';
            ctx.fillRect(px + 10, py + 10, 12, 10);
            break;

        case PLANT_TILES.DAD_NPC_PLANT:
            ctx.fillStyle = PLANTATION_COLORS.grass;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Dad sprite (simplified)
            ctx.fillStyle = '#f5deb3';
            ctx.fillRect(px + 12, py + 4, 8, 8); // Head
            ctx.fillStyle = '#4a6a8a';
            ctx.fillRect(px + 10, py + 12, 12, 14); // Body
            ctx.fillStyle = '#3a3a3a';
            ctx.fillRect(px + 11, py + 26, 4, 4); // Feet
            ctx.fillRect(px + 17, py + 26, 4, 4);
            break;

        case PLANT_TILES.SORTING_TABLE:
            ctx.fillStyle = PLANTATION_COLORS.grass;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Sorting table
            ctx.fillStyle = '#8b6914';
            ctx.fillRect(px + 2, py + 12, 28, 16);
            ctx.fillStyle = '#6b4914';
            ctx.fillRect(px + 4, py + 26, 4, 4);
            ctx.fillRect(px + 24, py + 26, 4, 4);
            // Beans on table
            ctx.fillStyle = '#5a3a2a';
            ctx.fillRect(px + 6, py + 14, 6, 4);
            ctx.fillRect(px + 16, py + 16, 6, 4);
            break;

        case PLANT_TILES.PEPPER_VINE:
            ctx.fillStyle = PLANTATION_COLORS.grass;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Pepper vine on tree
            ctx.fillStyle = '#5a3a2a';
            ctx.fillRect(px + 14, py + 8, 4, 22);
            ctx.fillStyle = '#2d5a27';
            ctx.fillRect(px + 10, py + 6, 12, 8);
            ctx.fillRect(px + 8, py + 12, 16, 6);
            // Pepper berries
            ctx.fillStyle = '#1a3a1a';
            ctx.fillRect(px + 12, py + 8, 2, 2);
            ctx.fillRect(px + 18, py + 10, 2, 2);
            ctx.fillRect(px + 10, py + 14, 2, 2);
            break;

        case PLANT_TILES.PICKING_ZONE:
            // Harvest area marker
            ctx.fillStyle = PLANTATION_COLORS.grass;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Basket with cherries
            ctx.fillStyle = '#8b4513';
            ctx.fillRect(px + 6, py + 14, 20, 14);
            ctx.fillStyle = '#cd853f';
            ctx.fillRect(px + 8, py + 16, 16, 10);
            // Cherries in basket
            ctx.fillStyle = '#cc2222';
            ctx.beginPath();
            ctx.arc(px + 12, py + 18, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(px + 18, py + 19, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(px + 15, py + 22, 3, 0, Math.PI * 2);
            ctx.fill();
            // "PICK" text hint
            ctx.fillStyle = '#ffd700';
            ctx.font = 'bold 8px monospace';
            ctx.fillText('PICK', px + 6, py + 10);
            break;

        case PLANT_TILES.TO_ESTATE:
            // Clear EXIT marker - bright visible path
            ctx.fillStyle = '#c8a870';  // Bright tan path
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Border
            ctx.fillStyle = '#a08050';
            ctx.fillRect(px, py, TILE_SIZE, 2);
            ctx.fillRect(px, py, 2, TILE_SIZE);
            // Arrow pointing down (to exit)
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(px + 14, py + 6, 4, 12);   // Vertical line
            ctx.fillRect(px + 10, py + 14, 12, 4);  // Horizontal line
            ctx.fillRect(px + 12, py + 18, 8, 4);   // Arrow head
            ctx.fillRect(px + 14, py + 22, 4, 6);   // Arrow tip
            // "EXIT" text
            ctx.fillStyle = '#402010';
            ctx.font = 'bold 8px monospace';
            ctx.fillText('EXIT', px + 4, py + 30);
            break;

        // ===== NPCs =====
        case PLANT_TILES.NPC_PICKER:
            ctx.fillStyle = PLANTATION_COLORS.grass;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Coffee picker with traditional basket
            ctx.fillStyle = '#8b5a2b';  // Skin tone
            ctx.fillRect(px + 12, py + 4, 8, 8);  // Head
            ctx.fillStyle = '#2e4a2e';  // Green work clothes
            ctx.fillRect(px + 10, py + 12, 12, 12); // Body
            ctx.fillStyle = '#3a3a3a';
            ctx.fillRect(px + 11, py + 24, 4, 4);  // Feet
            ctx.fillRect(px + 17, py + 24, 4, 4);
            // Head cloth (mundasu)
            ctx.fillStyle = '#f0e68c';
            ctx.fillRect(px + 11, py + 2, 10, 4);
            // Picking basket on back
            ctx.fillStyle = '#8b4513';
            ctx.fillRect(px + 20, py + 10, 8, 12);
            ctx.fillStyle = '#cd853f';
            ctx.fillRect(px + 21, py + 11, 6, 10);
            break;

        case PLANT_TILES.NPC_SUPERVISOR:
            ctx.fillStyle = PLANTATION_COLORS.grass;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Estate supervisor (maistri)
            ctx.fillStyle = '#d2b48c';  // Skin tone
            ctx.fillRect(px + 12, py + 4, 8, 8);  // Head
            ctx.fillStyle = '#f5f5dc';  // White shirt
            ctx.fillRect(px + 10, py + 12, 12, 12); // Body
            ctx.fillStyle = '#4a3728';  // Brown pants
            ctx.fillRect(px + 11, py + 22, 10, 6);
            ctx.fillStyle = '#3a3a3a';
            ctx.fillRect(px + 11, py + 26, 4, 4);
            ctx.fillRect(px + 17, py + 26, 4, 4);
            // Clipboard
            ctx.fillStyle = '#8b6914';
            ctx.fillRect(px + 4, py + 14, 6, 8);
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(px + 5, py + 16, 4, 4);
            break;

        case PLANT_TILES.NPC_BUYER:
            ctx.fillStyle = PLANTATION_COLORS.grass;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Coffee buyer from Bangalore
            ctx.fillStyle = '#d2b48c';
            ctx.fillRect(px + 12, py + 4, 8, 8);  // Head
            ctx.fillStyle = '#4a4a6a';  // Dark blue shirt (formal)
            ctx.fillRect(px + 10, py + 12, 12, 12);
            ctx.fillStyle = '#3a3a4a';  // Dark pants
            ctx.fillRect(px + 11, py + 22, 10, 6);
            ctx.fillStyle = '#1a1a1a';
            ctx.fillRect(px + 11, py + 26, 4, 4);
            ctx.fillRect(px + 17, py + 26, 4, 4);
            // Briefcase
            ctx.fillStyle = '#5a4a3a';
            ctx.fillRect(px + 22, py + 18, 8, 6);
            ctx.fillStyle = '#8b7355';
            ctx.fillRect(px + 23, py + 20, 6, 3);
            break;

        case PLANT_TILES.NPC_NEIGHBOR:
            ctx.fillStyle = PLANTATION_COLORS.grass;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Kodava neighbor in traditional dress
            ctx.fillStyle = '#d2b48c';
            ctx.fillRect(px + 12, py + 4, 8, 8);  // Head
            ctx.fillStyle = '#1a1a1a';  // Black kupya (traditional coat)
            ctx.fillRect(px + 8, py + 12, 16, 14);
            ctx.fillStyle = '#cd5c5c';  // Red chele (sash)
            ctx.fillRect(px + 10, py + 14, 12, 3);
            ctx.fillStyle = '#3a3a3a';
            ctx.fillRect(px + 11, py + 26, 4, 4);
            ctx.fillRect(px + 17, py + 26, 4, 4);
            // Odikathi (ceremonial knife) at waist
            ctx.fillStyle = '#c0c0c0';
            ctx.fillRect(px + 22, py + 16, 6, 2);
            ctx.fillStyle = '#8b4513';
            ctx.fillRect(px + 22, py + 18, 4, 4);
            break;

        // ===== Wildlife =====
        case PLANT_TILES.WILDLIFE_ELEPHANT:
            ctx.fillStyle = PLANTATION_COLORS.grass;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Elephant (large, gray)
            ctx.fillStyle = '#707070';
            ctx.fillRect(px + 4, py + 8, 24, 16);  // Body
            ctx.fillRect(px + 2, py + 4, 12, 12);  // Head
            ctx.fillStyle = '#606060';
            ctx.fillRect(px + 0, py + 10, 6, 12);  // Trunk
            ctx.fillRect(px + 6, py + 22, 6, 8);   // Legs
            ctx.fillRect(px + 20, py + 22, 6, 8);
            // Tusks
            ctx.fillStyle = '#f5f5dc';
            ctx.fillRect(px + 2, py + 14, 2, 6);
            break;

        case PLANT_TILES.WILDLIFE_BOAR:
            ctx.fillStyle = PLANTATION_COLORS.grass;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Wild boar
            ctx.fillStyle = '#4a3a2a';
            ctx.fillRect(px + 6, py + 12, 20, 12);  // Body
            ctx.fillRect(px + 2, py + 14, 8, 8);    // Head
            ctx.fillStyle = '#3a2a1a';
            ctx.fillRect(px + 8, py + 22, 4, 6);    // Legs
            ctx.fillRect(px + 20, py + 22, 4, 6);
            // Snout
            ctx.fillStyle = '#6a5a4a';
            ctx.fillRect(px, py + 16, 4, 4);
            // Tusks
            ctx.fillStyle = '#f5f5dc';
            ctx.fillRect(px, py + 14, 2, 2);
            break;

        case PLANT_TILES.WILDLIFE_MONKEY:
            ctx.fillStyle = PLANTATION_COLORS.grass;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Bonnet macaque
            ctx.fillStyle = '#a08060';
            ctx.fillRect(px + 12, py + 4, 10, 10);  // Head with bonnet shape
            ctx.fillRect(px + 10, py + 14, 12, 10); // Body
            ctx.fillStyle = '#f5deb3';  // Face
            ctx.fillRect(px + 14, py + 6, 6, 6);
            ctx.fillStyle = '#8a7050';
            ctx.fillRect(px + 12, py + 22, 4, 6);   // Legs
            ctx.fillRect(px + 18, py + 22, 4, 6);
            // Tail
            ctx.fillStyle = '#907050';
            ctx.fillRect(px + 22, py + 16, 6, 3);
            ctx.fillRect(px + 26, py + 12, 3, 6);
            break;

        case PLANT_TILES.WILDLIFE_HORNBILL:
            ctx.fillStyle = PLANTATION_COLORS.grass;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Shade tree with hornbill
            ctx.fillStyle = PLANTATION_COLORS.shade_tree_trunk;
            ctx.fillRect(px + 14, py + 18, 4, 14);
            ctx.fillStyle = PLANTATION_COLORS.shade_tree_leaves;
            ctx.fillRect(px + 4, py + 4, 24, 16);
            // Malabar Great Hornbill
            ctx.fillStyle = '#1a1a1a';
            ctx.fillRect(px + 8, py + 8, 8, 6);  // Body
            ctx.fillStyle = '#f5f5dc';
            ctx.fillRect(px + 4, py + 10, 6, 3);  // Wing markings
            // Large beak with casque
            ctx.fillStyle = '#ffd700';
            ctx.fillRect(px + 16, py + 8, 8, 3);
            ctx.fillStyle = '#ff8c00';
            ctx.fillRect(px + 16, py + 6, 6, 3);  // Casque
            break;

        case PLANT_TILES.WILDLIFE_SNAKE:
            ctx.fillStyle = PLANTATION_COLORS.grass;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // King Cobra coiled
            ctx.fillStyle = '#3a4a3a';
            ctx.fillRect(px + 8, py + 14, 16, 12);  // Coiled body
            ctx.fillStyle = '#4a5a4a';
            ctx.fillRect(px + 10, py + 16, 12, 8);
            // Hood raised
            ctx.fillStyle = '#2a3a2a';
            ctx.fillRect(px + 12, py + 4, 8, 12);
            ctx.fillStyle = '#5a6a5a';
            ctx.fillRect(px + 14, py + 8, 4, 6);
            // Eyes
            ctx.fillStyle = '#ffcc00';
            ctx.fillRect(px + 13, py + 6, 2, 2);
            ctx.fillRect(px + 17, py + 6, 2, 2);
            // Warning pattern (hood marking)
            ctx.fillStyle = '#ffd700';
            ctx.fillRect(px + 14, py + 10, 4, 2);
            break;

        default:
            // Unknown tile - draw as grass
            ctx.fillStyle = PLANTATION_COLORS.grass;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
    }
}

// =============================================
// DRAWING FUNCTIONS - INTERIOR (Pokemon Style)
// =============================================

// Helper to draw wood floor
function drawWoodFloor(px, py) {
    ctx.fillStyle = INTERIOR_COLORS.floor_wood;
    ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
    // Wood plank pattern
    ctx.fillStyle = INTERIOR_COLORS.floor_wood_dark;
    ctx.fillRect(px, py + 15, TILE_SIZE, 2);
    ctx.fillRect(px + 15, py, 2, TILE_SIZE);
}

function drawInteriorTile(tileType, x, y) {
    const px = x * TILE_SIZE;
    const py = y * TILE_SIZE;

    switch (tileType) {
        case INT_TILES.WOOD_FLOOR:
            drawWoodFloor(px, py);
            break;

        case INT_TILES.WALL:
            ctx.fillStyle = INTERIOR_COLORS.wall_cream;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Baseboard
            ctx.fillStyle = INTERIOR_COLORS.wall_base;
            ctx.fillRect(px, py + 26, TILE_SIZE, 6);
            ctx.fillStyle = INTERIOR_COLORS.wood_mid;
            ctx.fillRect(px, py + 26, TILE_SIZE, 2);
            break;

        case INT_TILES.PILLAR:
            drawWoodFloor(px, py);
            // Pokemon-style pillar (square)
            ctx.fillStyle = '#f0f0f0';
            ctx.fillRect(px + 8, py + 4, 16, 24);
            ctx.fillStyle = '#e0e0e0';
            ctx.fillRect(px + 20, py + 4, 4, 24);
            ctx.fillStyle = '#d0d0d0';
            ctx.fillRect(px + 8, py + 24, 16, 4);
            // Top decoration
            ctx.fillStyle = '#f8f8f8';
            ctx.fillRect(px + 6, py + 2, 20, 4);
            break;

        case INT_TILES.SUNKEN_COURT:
            // Indoor water feature / courtyard
            ctx.fillStyle = INTERIOR_COLORS.floor_tile;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            ctx.fillStyle = EXTERIOR_COLORS.water_mid;
            ctx.fillRect(px + 2, py + 2, 28, 28);
            ctx.fillStyle = EXTERIOR_COLORS.water_light;
            ctx.fillRect(px + 6, py + 8, 8, 2);
            ctx.fillRect(px + 18, py + 16, 8, 2);
            ctx.fillStyle = EXTERIOR_COLORS.water_dark;
            ctx.fillRect(px + 4, py + 20, 6, 2);
            break;

        case INT_TILES.DOORWAY:
            drawWoodFloor(px, py);
            // Door frame
            ctx.fillStyle = INTERIOR_COLORS.wood_mid;
            ctx.fillRect(px + 2, py, 4, 6);
            ctx.fillRect(px + 26, py, 4, 6);
            ctx.fillRect(px + 2, py, 28, 4);
            break;

        case INT_TILES.RUG:
            drawWoodFloor(px, py);
            // Pokemon-style rug
            ctx.fillStyle = INTERIOR_COLORS.cushion_green;
            ctx.fillRect(px + 2, py + 2, 28, 28);
            ctx.fillStyle = INTERIOR_COLORS.cushion_dark;
            ctx.fillRect(px + 4, py + 4, 24, 24);
            ctx.fillStyle = INTERIOR_COLORS.cushion_green;
            ctx.fillRect(px + 6, py + 6, 20, 20);
            // Pattern
            ctx.fillStyle = INTERIOR_COLORS.cushion_dark;
            ctx.fillRect(px + 10, py + 10, 12, 12);
            break;

        case INT_TILES.PLANT_AREA:
            drawWoodFloor(px, py);
            // Pot
            ctx.fillStyle = INTERIOR_COLORS.plant_pot;
            ctx.fillRect(px + 8, py + 18, 16, 12);
            ctx.fillStyle = '#a06840';
            ctx.fillRect(px + 10, py + 16, 12, 4);
            // Plant
            ctx.fillStyle = INTERIOR_COLORS.plant_dark;
            ctx.fillRect(px + 10, py + 4, 12, 16);
            ctx.fillStyle = INTERIOR_COLORS.plant_green;
            ctx.fillRect(px + 6, py + 6, 8, 10);
            ctx.fillRect(px + 18, py + 8, 8, 8);
            ctx.fillRect(px + 12, py + 2, 8, 10);
            // Flower
            ctx.fillStyle = EXTERIOR_COLORS.flower_pink;
            ctx.fillRect(px + 14, py + 4, 4, 4);
            break;

        case INT_TILES.SOFA:
            drawWoodFloor(px, py);
            // Pokemon-style couch
            ctx.fillStyle = INTERIOR_COLORS.wood_dark;
            ctx.fillRect(px + 2, py + 6, 28, 22);
            ctx.fillStyle = INTERIOR_COLORS.cushion_green;
            ctx.fillRect(px + 4, py + 8, 24, 16);
            ctx.fillStyle = INTERIOR_COLORS.cushion_dark;
            ctx.fillRect(px + 4, py + 20, 24, 4);
            // Cushions
            ctx.fillStyle = INTERIOR_COLORS.cushion_green;
            ctx.fillRect(px + 6, py + 10, 10, 8);
            ctx.fillRect(px + 18, py + 10, 10, 8);
            ctx.fillStyle = '#78b858';
            ctx.fillRect(px + 8, py + 12, 6, 4);
            ctx.fillRect(px + 20, py + 12, 6, 4);
            break;

        case INT_TILES.COFFEE_TABLE:
            drawWoodFloor(px, py);
            // Table
            ctx.fillStyle = INTERIOR_COLORS.wood_dark;
            ctx.fillRect(px + 4, py + 10, 24, 14);
            ctx.fillStyle = INTERIOR_COLORS.wood_mid;
            ctx.fillRect(px + 6, py + 8, 20, 12);
            // Glass top shine
            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.fillRect(px + 8, py + 10, 8, 4);
            // Legs
            ctx.fillStyle = INTERIOR_COLORS.wood_dark;
            ctx.fillRect(px + 6, py + 22, 4, 6);
            ctx.fillRect(px + 22, py + 22, 4, 6);
            if (readClues.includes('TABLE')) {
                ctx.fillStyle = '#ffff00';
                ctx.fillRect(px + 14, py + 2, 4, 4);
            }
            break;

        case INT_TILES.CABINET:
            drawWoodFloor(px, py);
            // Large cabinet
            ctx.fillStyle = INTERIOR_COLORS.wood_dark;
            ctx.fillRect(px + 2, py + 2, 28, 28);
            ctx.fillStyle = INTERIOR_COLORS.wood_mid;
            ctx.fillRect(px + 4, py + 4, 11, 11);
            ctx.fillRect(px + 17, py + 4, 11, 11);
            ctx.fillRect(px + 4, py + 17, 24, 11);
            // Handles
            ctx.fillStyle = INTERIOR_COLORS.brass_gold;
            ctx.fillRect(px + 14, py + 8, 4, 2);
            ctx.fillRect(px + 14, py + 22, 4, 2);
            if (readClues.includes('CABINET')) {
                ctx.fillStyle = '#ffff00';
                ctx.fillRect(px + 26, py + 2, 4, 4);
            }
            break;

        case INT_TILES.SIDE_TABLE:
            drawWoodFloor(px, py);
            // Small table
            ctx.fillStyle = INTERIOR_COLORS.wood_dark;
            ctx.fillRect(px + 8, py + 12, 16, 12);
            ctx.fillStyle = INTERIOR_COLORS.wood_mid;
            ctx.fillRect(px + 6, py + 10, 20, 4);
            // Vase
            ctx.fillStyle = '#6090c0';
            ctx.fillRect(px + 12, py + 2, 8, 10);
            ctx.fillStyle = '#4070a0';
            ctx.fillRect(px + 14, py + 4, 4, 6);
            break;

        case INT_TILES.WALL_ART:
            // Wall with picture frame
            ctx.fillStyle = INTERIOR_COLORS.wall_cream;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            ctx.fillStyle = INTERIOR_COLORS.wall_base;
            ctx.fillRect(px, py + 26, TILE_SIZE, 6);
            // Frame
            ctx.fillStyle = INTERIOR_COLORS.wood_dark;
            ctx.fillRect(px + 6, py + 4, 20, 16);
            ctx.fillStyle = '#f0e8d8';
            ctx.fillRect(px + 8, py + 6, 16, 12);
            // Picture content
            ctx.fillStyle = '#90c070';
            ctx.fillRect(px + 10, py + 12, 12, 4);
            ctx.fillStyle = '#70a8d0';
            ctx.fillRect(px + 10, py + 8, 12, 4);
            ctx.fillStyle = '#f8d848';
            ctx.fillRect(px + 18, py + 8, 4, 4);
            if ((x === 2 && y === 2) && readClues.includes('PHOTO')) {
                ctx.fillStyle = '#ffff00';
                ctx.fillRect(px + 26, py + 2, 4, 4);
            }
            break;

        case INT_TILES.WALL_CLOCK:
            // Wall with clock
            ctx.fillStyle = INTERIOR_COLORS.wall_cream;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            ctx.fillStyle = INTERIOR_COLORS.wall_base;
            ctx.fillRect(px, py + 26, TILE_SIZE, 6);
            // Clock body
            ctx.fillStyle = INTERIOR_COLORS.wood_dark;
            ctx.fillRect(px + 8, py + 2, 16, 24);
            // Clock face
            ctx.fillStyle = '#f8f8e8';
            ctx.fillRect(px + 10, py + 4, 12, 12);
            // Clock hands
            ctx.fillStyle = '#303030';
            ctx.fillRect(px + 15, py + 7, 2, 5);
            ctx.fillRect(px + 15, py + 10, 4, 2);
            // Pendulum area
            ctx.fillStyle = INTERIOR_COLORS.wood_mid;
            ctx.fillRect(px + 10, py + 16, 12, 8);
            ctx.fillStyle = INTERIOR_COLORS.brass_gold;
            ctx.fillRect(px + 14, py + 18, 4, 4);
            if (readClues.includes('CLOCK')) {
                ctx.fillStyle = '#ffff00';
                ctx.fillRect(px + 26, py + 2, 4, 4);
            }
            break;

        case INT_TILES.HANGING_LAMP:
            drawWoodFloor(px, py);
            // Chain
            ctx.fillStyle = INTERIOR_COLORS.brass_dark;
            ctx.fillRect(px + 14, py, 4, 10);
            // Lamp
            ctx.fillStyle = INTERIOR_COLORS.brass_gold;
            ctx.fillRect(px + 8, py + 10, 16, 12);
            ctx.fillStyle = '#f8e8a0';
            ctx.fillRect(px + 10, py + 12, 12, 8);
            // Light glow effect
            ctx.fillStyle = 'rgba(255, 248, 200, 0.3)';
            ctx.fillRect(px + 6, py + 22, 20, 10);
            break;

        case INT_TILES.EXIT_TO_EXTERIOR:
            drawWoodFloor(px, py);
            // Doormat
            ctx.fillStyle = INTERIOR_COLORS.rug_red;
            ctx.fillRect(px + 4, py + 20, 24, 10);
            ctx.fillStyle = INTERIOR_COLORS.rug_dark;
            ctx.fillRect(px + 6, py + 22, 20, 6);
            // Exit arrow
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(px + 14, py + 26, 4, 4);
            ctx.fillRect(px + 12, py + 28, 8, 2);
            break;

        // ========== BEDROOM TILES ==========
        case INT_TILES.BED_TOP:
            drawWoodFloor(px, py);
            // Headboard
            ctx.fillStyle = INTERIOR_COLORS.wood_dark;
            ctx.fillRect(px + 2, py + 2, 28, 8);
            ctx.fillStyle = INTERIOR_COLORS.wood_mid;
            ctx.fillRect(px + 4, py + 4, 24, 4);
            // Pillow
            ctx.fillStyle = '#f8f8f8';
            ctx.fillRect(px + 4, py + 12, 24, 10);
            ctx.fillStyle = '#e8e8e8';
            ctx.fillRect(px + 6, py + 14, 8, 6);
            ctx.fillRect(px + 18, py + 14, 8, 6);
            // Blanket top
            ctx.fillStyle = '#e85048';
            ctx.fillRect(px + 2, py + 22, 28, 10);
            ctx.fillStyle = '#c04038';
            ctx.fillRect(px + 2, py + 28, 28, 4);
            break;

        case INT_TILES.BED_BOTTOM:
            drawWoodFloor(px, py);
            // Blanket body
            ctx.fillStyle = '#e85048';
            ctx.fillRect(px + 2, py, 28, 24);
            ctx.fillStyle = '#c04038';
            ctx.fillRect(px + 2, py + 8, 28, 4);
            ctx.fillRect(px + 2, py + 18, 28, 4);
            // Bed frame
            ctx.fillStyle = INTERIOR_COLORS.wood_dark;
            ctx.fillRect(px + 2, py + 24, 28, 6);
            ctx.fillStyle = INTERIOR_COLORS.wood_mid;
            ctx.fillRect(px + 4, py + 24, 8, 4);
            ctx.fillRect(px + 20, py + 24, 8, 4);
            break;

        case INT_TILES.DRESSER:
            drawWoodFloor(px, py);
            // Dresser body
            ctx.fillStyle = INTERIOR_COLORS.wood_dark;
            ctx.fillRect(px + 4, py + 4, 24, 26);
            ctx.fillStyle = INTERIOR_COLORS.wood_mid;
            // Drawers
            ctx.fillRect(px + 6, py + 6, 20, 6);
            ctx.fillRect(px + 6, py + 14, 20, 6);
            ctx.fillRect(px + 6, py + 22, 20, 6);
            // Handles
            ctx.fillStyle = INTERIOR_COLORS.brass_gold;
            ctx.fillRect(px + 14, py + 8, 4, 2);
            ctx.fillRect(px + 14, py + 16, 4, 2);
            ctx.fillRect(px + 14, py + 24, 4, 2);
            break;

        case INT_TILES.BOOKSHELF:
            drawWoodFloor(px, py);
            // Shelf frame
            ctx.fillStyle = INTERIOR_COLORS.wood_dark;
            ctx.fillRect(px + 2, py + 2, 28, 28);
            ctx.fillStyle = INTERIOR_COLORS.wood_mid;
            ctx.fillRect(px + 4, py + 4, 24, 24);
            // Shelves
            ctx.fillStyle = INTERIOR_COLORS.wood_dark;
            ctx.fillRect(px + 4, py + 12, 24, 2);
            ctx.fillRect(px + 4, py + 20, 24, 2);
            // Books
            ctx.fillStyle = '#e85048';
            ctx.fillRect(px + 6, py + 5, 4, 6);
            ctx.fillStyle = '#4898d8';
            ctx.fillRect(px + 11, py + 5, 3, 6);
            ctx.fillStyle = '#58a038';
            ctx.fillRect(px + 15, py + 5, 5, 6);
            ctx.fillStyle = '#f8d848';
            ctx.fillRect(px + 21, py + 5, 4, 6);
            ctx.fillStyle = '#9868a8';
            ctx.fillRect(px + 6, py + 14, 5, 5);
            ctx.fillStyle = '#e88848';
            ctx.fillRect(px + 12, py + 14, 4, 5);
            ctx.fillStyle = '#58a8f8';
            ctx.fillRect(px + 18, py + 14, 6, 5);
            break;

        case INT_TILES.WINDOW:
            // Wall with window
            ctx.fillStyle = INTERIOR_COLORS.wall_cream;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            ctx.fillStyle = INTERIOR_COLORS.wall_base;
            ctx.fillRect(px, py + 26, TILE_SIZE, 6);
            // Window frame
            ctx.fillStyle = INTERIOR_COLORS.wood_mid;
            ctx.fillRect(px + 4, py + 4, 24, 20);
            // Window glass (sky blue)
            ctx.fillStyle = '#88c8f8';
            ctx.fillRect(px + 6, py + 6, 9, 7);
            ctx.fillRect(px + 17, py + 6, 9, 7);
            ctx.fillStyle = '#a8d8f8';
            ctx.fillRect(px + 6, py + 15, 9, 7);
            ctx.fillRect(px + 17, py + 15, 9, 7);
            // Window cross
            ctx.fillStyle = INTERIOR_COLORS.wood_mid;
            ctx.fillRect(px + 15, py + 6, 2, 16);
            ctx.fillRect(px + 6, py + 13, 20, 2);
            break;

        // ========== KITCHEN TILES ==========
        case INT_TILES.TILE_FLOOR:
            // Kitchen tile floor
            ctx.fillStyle = '#f0e8e0';
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            ctx.fillStyle = '#e0d8d0';
            ctx.fillRect(px, py + 15, TILE_SIZE, 2);
            ctx.fillRect(px + 15, py, 2, TILE_SIZE);
            ctx.fillStyle = '#d0c8c0';
            ctx.fillRect(px, py, TILE_SIZE, 1);
            ctx.fillRect(px, py, 1, TILE_SIZE);
            break;

        case INT_TILES.COUNTER:
            // Kitchen tile floor base
            ctx.fillStyle = '#f0e8e0';
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Counter
            ctx.fillStyle = '#d0c8c0';
            ctx.fillRect(px, py + 2, TILE_SIZE, 28);
            ctx.fillStyle = '#e8e0d8';
            ctx.fillRect(px + 2, py, TILE_SIZE - 4, 6);
            ctx.fillStyle = '#c8c0b8';
            ctx.fillRect(px + 2, py + 8, TILE_SIZE - 4, 20);
            // Cabinet doors
            ctx.fillStyle = '#b8b0a8';
            ctx.fillRect(px + 4, py + 10, 10, 16);
            ctx.fillRect(px + 18, py + 10, 10, 16);
            // Handles
            ctx.fillStyle = '#808080';
            ctx.fillRect(px + 12, py + 16, 2, 4);
            ctx.fillRect(px + 18, py + 16, 2, 4);
            break;

        case INT_TILES.STOVE:
            // Kitchen tile floor base
            ctx.fillStyle = '#f0e8e0';
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Stove body
            ctx.fillStyle = '#404040';
            ctx.fillRect(px + 2, py + 2, 28, 28);
            ctx.fillStyle = '#303030';
            ctx.fillRect(px + 2, py + 20, 28, 10);
            // Burners
            ctx.fillStyle = '#202020';
            ctx.fillRect(px + 5, py + 5, 8, 8);
            ctx.fillRect(px + 19, py + 5, 8, 8);
            // Burner rings
            ctx.fillStyle = '#505050';
            ctx.fillRect(px + 7, py + 7, 4, 4);
            ctx.fillRect(px + 21, py + 7, 4, 4);
            // Oven door
            ctx.fillStyle = '#383838';
            ctx.fillRect(px + 4, py + 22, 24, 6);
            // Handle
            ctx.fillStyle = '#606060';
            ctx.fillRect(px + 10, py + 24, 12, 2);
            break;

        case INT_TILES.SINK:
            // Kitchen tile floor base
            ctx.fillStyle = '#f0e8e0';
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Counter with sink
            ctx.fillStyle = '#d0c8c0';
            ctx.fillRect(px, py + 2, TILE_SIZE, 28);
            ctx.fillStyle = '#e8e0d8';
            ctx.fillRect(px + 2, py, TILE_SIZE - 4, 6);
            // Sink basin
            ctx.fillStyle = '#b0b0b0';
            ctx.fillRect(px + 6, py + 2, 20, 12);
            ctx.fillStyle = '#909090';
            ctx.fillRect(px + 8, py + 4, 16, 8);
            // Faucet
            ctx.fillStyle = '#c0c0c0';
            ctx.fillRect(px + 14, py, 4, 6);
            ctx.fillRect(px + 12, py, 8, 2);
            // Cabinet below
            ctx.fillStyle = '#c8c0b8';
            ctx.fillRect(px + 2, py + 16, TILE_SIZE - 4, 12);
            ctx.fillStyle = '#b8b0a8';
            ctx.fillRect(px + 4, py + 18, 10, 8);
            ctx.fillRect(px + 18, py + 18, 10, 8);
            break;

        case INT_TILES.FRIDGE:
            // Kitchen tile floor base
            ctx.fillStyle = '#f0e8e0';
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Fridge body
            ctx.fillStyle = '#e8e8e8';
            ctx.fillRect(px + 4, py + 2, 24, 28);
            ctx.fillStyle = '#d8d8d8';
            ctx.fillRect(px + 6, py + 4, 20, 10);
            ctx.fillRect(px + 6, py + 16, 20, 12);
            // Handles
            ctx.fillStyle = '#b0b0b0';
            ctx.fillRect(px + 22, py + 6, 2, 6);
            ctx.fillRect(px + 22, py + 20, 2, 6);
            // Line between freezer and fridge
            ctx.fillStyle = '#c0c0c0';
            ctx.fillRect(px + 4, py + 14, 24, 2);
            break;

        case INT_TILES.KITCHEN_TABLE:
            // Kitchen tile floor base
            ctx.fillStyle = '#f0e8e0';
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            ctx.fillStyle = '#e0d8d0';
            ctx.fillRect(px, py + 15, TILE_SIZE, 2);
            ctx.fillRect(px + 15, py, 2, TILE_SIZE);
            // Small table
            ctx.fillStyle = INTERIOR_COLORS.wood_dark;
            ctx.fillRect(px + 6, py + 8, 20, 16);
            ctx.fillStyle = INTERIOR_COLORS.wood_mid;
            ctx.fillRect(px + 8, py + 6, 16, 14);
            // Legs
            ctx.fillStyle = INTERIOR_COLORS.wood_dark;
            ctx.fillRect(px + 8, py + 22, 3, 6);
            ctx.fillRect(px + 21, py + 22, 3, 6);
            break;

        // ========== DINING TILES ==========
        case INT_TILES.DINING_TABLE:
            drawWoodFloor(px, py);
            // Large dining table - top view
            ctx.fillStyle = INTERIOR_COLORS.wood_dark;
            ctx.fillRect(px + 2, py + 4, 28, 24);
            ctx.fillStyle = INTERIOR_COLORS.wood_mid;
            ctx.fillRect(px + 4, py + 6, 24, 20);
            // Table surface highlight
            ctx.fillStyle = INTERIOR_COLORS.wood_light;
            ctx.fillRect(px + 6, py + 8, 8, 4);
            // Decorative centerpiece
            ctx.fillStyle = '#f8f8e8';
            ctx.fillRect(px + 12, py + 12, 8, 8);
            ctx.fillStyle = INTERIOR_COLORS.plant_green;
            ctx.fillRect(px + 14, py + 14, 4, 4);
            break;

        case INT_TILES.DINING_CHAIR:
            drawWoodFloor(px, py);
            // Chair back
            ctx.fillStyle = INTERIOR_COLORS.wood_dark;
            ctx.fillRect(px + 8, py + 4, 16, 6);
            ctx.fillStyle = INTERIOR_COLORS.wood_mid;
            ctx.fillRect(px + 10, py + 6, 12, 2);
            // Chair seat
            ctx.fillStyle = INTERIOR_COLORS.wood_dark;
            ctx.fillRect(px + 6, py + 10, 20, 14);
            ctx.fillStyle = INTERIOR_COLORS.cushion_green;
            ctx.fillRect(px + 8, py + 12, 16, 10);
            // Chair legs
            ctx.fillStyle = INTERIOR_COLORS.wood_dark;
            ctx.fillRect(px + 6, py + 24, 4, 6);
            ctx.fillRect(px + 22, py + 24, 4, 6);
            break;

        // ========== LIVING ROOM TILES ==========
        case INT_TILES.TV_STAND:
            drawWoodFloor(px, py);
            // TV stand/cabinet (on the left, TV faces right toward center)
            ctx.fillStyle = INTERIOR_COLORS.wood_dark;
            ctx.fillRect(px + 2, py + 4, 12, 24);
            ctx.fillStyle = INTERIOR_COLORS.wood_mid;
            ctx.fillRect(px + 4, py + 6, 8, 9);
            ctx.fillRect(px + 4, py + 17, 8, 9);
            // TV screen (facing right)
            ctx.fillStyle = '#303030';
            ctx.fillRect(px + 14, py + 4, 14, 24);
            ctx.fillStyle = '#404040';
            ctx.fillRect(px + 16, py + 6, 10, 20);
            // Screen reflection
            ctx.fillStyle = '#505050';
            ctx.fillRect(px + 18, py + 8, 4, 6);
            break;

        case INT_TILES.SWING:
            drawWoodFloor(px, py);
            // Swing chains
            ctx.fillStyle = INTERIOR_COLORS.brass_gold;
            ctx.fillRect(px + 6, py, 2, 16);
            ctx.fillRect(px + 24, py, 2, 16);
            // Chain links
            ctx.fillStyle = INTERIOR_COLORS.brass_dark;
            ctx.fillRect(px + 6, py + 4, 2, 2);
            ctx.fillRect(px + 6, py + 10, 2, 2);
            ctx.fillRect(px + 24, py + 4, 2, 2);
            ctx.fillRect(px + 24, py + 10, 2, 2);
            // Swing seat
            ctx.fillStyle = INTERIOR_COLORS.wood_dark;
            ctx.fillRect(px + 4, py + 16, 24, 6);
            ctx.fillStyle = INTERIOR_COLORS.wood_mid;
            ctx.fillRect(px + 6, py + 14, 20, 4);
            // Cushion on seat
            ctx.fillStyle = INTERIOR_COLORS.cushion_green;
            ctx.fillRect(px + 8, py + 16, 16, 4);
            break;

        case INT_TILES.OUTSIDE:
            // Outside/veranda area - grass/garden look
            ctx.fillStyle = '#2d5a27'; // Coffee plantation green
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            // Some grass detail
            ctx.fillStyle = '#3d6a37';
            ctx.fillRect(px + 4, py + 8, 3, 8);
            ctx.fillRect(px + 12, py + 4, 3, 10);
            ctx.fillRect(px + 20, py + 12, 3, 8);
            ctx.fillRect(px + 26, py + 6, 3, 10);
            break;

        case INT_TILES.NPC_MANVI:
            // Draw floor first
            drawWoodFloor(px, py);
            // Girl character - Manvi (Tanvi's sister)
            // Hair (long, dark)
            ctx.fillStyle = '#2a1a0a';
            ctx.fillRect(px + 10, py + 4, 12, 6);
            ctx.fillRect(px + 8, py + 8, 16, 4);
            ctx.fillRect(px + 8, py + 12, 4, 10);  // Left hair
            ctx.fillRect(px + 20, py + 12, 4, 10); // Right hair
            // Face
            ctx.fillStyle = '#e8c4a0';
            ctx.fillRect(px + 12, py + 8, 8, 8);
            // Eyes
            ctx.fillStyle = '#3a2a1a';
            ctx.fillRect(px + 13, py + 10, 2, 2);
            ctx.fillRect(px + 17, py + 10, 2, 2);
            // White top
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(px + 10, py + 16, 12, 6);
            // Top details/shadow
            ctx.fillStyle = '#e8e8e8';
            ctx.fillRect(px + 10, py + 20, 12, 2);
            // Red shorts
            ctx.fillStyle = '#cc2222';
            ctx.fillRect(px + 10, py + 22, 12, 4);
            // Legs
            ctx.fillStyle = '#e8c4a0';
            ctx.fillRect(px + 11, py + 26, 4, 2);
            ctx.fillRect(px + 17, py + 26, 4, 2);
            // Feet
            ctx.fillStyle = '#5a3a2a';
            ctx.fillRect(px + 11, py + 28, 4, 2);
            ctx.fillRect(px + 17, py + 28, 4, 2);
            break;

        case INT_TILES.NPC_MOM:
            // Draw floor first
            drawWoodFloor(px, py);
            // Mom character - busy housewife with phone
            // Hair (tied up in bun, dark brown)
            ctx.fillStyle = '#3a2a1a';
            ctx.fillRect(px + 11, py + 2, 10, 6);
            ctx.fillRect(px + 13, py + 0, 6, 4);  // Bun on top
            ctx.fillRect(px + 10, py + 6, 12, 4);
            // Face
            ctx.fillStyle = '#e8c4a0';
            ctx.fillRect(px + 12, py + 8, 8, 8);
            // Eyes
            ctx.fillStyle = '#3a2a1a';
            ctx.fillRect(px + 13, py + 10, 2, 2);
            ctx.fillRect(px + 17, py + 10, 2, 2);
            // Smile
            ctx.fillStyle = '#cc8888';
            ctx.fillRect(px + 14, py + 14, 4, 1);
            // Saree (green with gold border)
            ctx.fillStyle = '#228844';
            ctx.fillRect(px + 9, py + 16, 14, 12);
            // Saree pallu (drape over shoulder)
            ctx.fillRect(px + 6, py + 16, 4, 8);
            // Gold border
            ctx.fillStyle = '#daa520';
            ctx.fillRect(px + 9, py + 26, 14, 2);
            ctx.fillRect(px + 6, py + 22, 4, 2);
            // Phone in hand
            ctx.fillStyle = '#333333';
            ctx.fillRect(px + 22, py + 12, 4, 6);
            ctx.fillStyle = '#4488ff';
            ctx.fillRect(px + 23, py + 13, 2, 4);
            // Arm holding phone
            ctx.fillStyle = '#e8c4a0';
            ctx.fillRect(px + 20, py + 16, 4, 2);
            // Feet
            ctx.fillStyle = '#8b4513';
            ctx.fillRect(px + 11, py + 28, 4, 2);
            ctx.fillRect(px + 17, py + 28, 4, 2);
            break;

        case INT_TILES.BACK_DOOR:
            // Kitchen floor as base
            ctx.fillStyle = INTERIOR_COLORS.kitchen_tile;
            ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            ctx.fillStyle = INTERIOR_COLORS.kitchen_tile_dark;
            for (let i = 0; i < 4; i++) {
                ctx.fillRect(px + i * 8, py, 1, TILE_SIZE);
                ctx.fillRect(px, py + i * 8, TILE_SIZE, 1);
            }
            // Door frame
            ctx.fillStyle = '#5a4030';
            ctx.fillRect(px + 4, py + 2, 24, 28);
            // Door
            ctx.fillStyle = '#8b6914';
            ctx.fillRect(px + 6, py + 4, 20, 24);
            // Door handle
            ctx.fillStyle = '#c0a060';
            ctx.fillRect(px + 22, py + 14, 3, 4);
            // Window on door
            ctx.fillStyle = '#a0d0ff';
            ctx.fillRect(px + 10, py + 6, 12, 8);
            ctx.fillStyle = '#80b0e0';
            ctx.fillRect(px + 15, py + 6, 2, 8);
            ctx.fillRect(px + 10, py + 9, 12, 2);
            break;
    }
}

// =============================================
// MAP DRAWING
// =============================================

function drawMap() {
    if (currentMap === MAPS.EXTERIOR) {
        for (let y = 0; y < EXTERIOR_HEIGHT; y++) {
            for (let x = 0; x < EXTERIOR_WIDTH; x++) {
                drawExteriorTile(EXTERIOR_MAP[y][x], x, y);
            }
        }
    } else if (currentMap === MAPS.LAKE) {
        for (let y = 0; y < LAKE_HEIGHT; y++) {
            for (let x = 0; x < LAKE_WIDTH; x++) {
                drawLakeTile(LAKE_MAP[y][x], x, y);
            }
        }
    } else if (currentMap === MAPS.SHED) {
        for (let y = 0; y < SHED_HEIGHT; y++) {
            for (let x = 0; x < SHED_WIDTH; x++) {
                drawShedTile(SHED_MAP[y][x], x, y);
            }
        }
    } else if (currentMap === MAPS.PLANTATION) {
        for (let y = 0; y < PLANTATION_HEIGHT; y++) {
            for (let x = 0; x < PLANTATION_WIDTH; x++) {
                drawPlantationTile(PLANTATION_MAP[y][x], x, y);
            }
        }
    } else {
        for (let y = 0; y < INTERIOR_HEIGHT; y++) {
            for (let x = 0; x < INTERIOR_WIDTH; x++) {
                drawInteriorTile(INTERIOR_MAP[y][x], x, y);
            }
        }
    }
}

// =============================================
// PLAYER DRAWING (Pokemon Style)
// =============================================

function drawPlayer() {
    const px = player.x;
    const py = player.y;

    const isFemale = player.gender === 'female';

    // Pokemon-style colors
    const skinColor = '#f8d0a0';
    const skinShadow = '#e0b888';
    const hairColor = isFemale ? '#483018' : '#402810';
    const shirtColor = isFemale ? '#e85888' : '#e85048';
    const shirtDark = isFemale ? '#c84070' : '#c04038';
    const pantsColor = isFemale ? '#5878a8' : '#3868a8';
    const pantsDark = isFemale ? '#486090' : '#285090';

    // If player is in boat, draw boat underneath player
    if (player.inBoat) {
        // Boat hull
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(px - 4, py + 10, 32, 18);
        // Boat front
        ctx.fillRect(px - 6, py + 12, 4, 14);
        // Boat back
        ctx.fillRect(px + 26, py + 12, 4, 14);
        // Inner boat
        ctx.fillStyle = '#A0522D';
        ctx.fillRect(px - 2, py + 12, 28, 14);
        // Oars
        ctx.fillStyle = '#8B7355';
        ctx.fillRect(px - 10, py + 16, 8, 2);
        ctx.fillRect(px + 26, py + 18, 8, 2);
        // No shadow when in boat
    } else {
        // Shadow (only when not in boat)
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fillRect(px + 4, py + 22, 16, 4);
    }

    // Only draw legs/feet when not in boat
    if (!player.inBoat) {
        // Feet/Shoes
        ctx.fillStyle = '#483828';
        ctx.fillRect(px + 6, py + 20, 5, 4);
        ctx.fillRect(px + 13, py + 20, 5, 4);

        // Legs/Pants
        ctx.fillStyle = pantsColor;
        ctx.fillRect(px + 7, py + 14, 4, 7);
        ctx.fillRect(px + 13, py + 14, 4, 7);
        ctx.fillStyle = pantsDark;
        ctx.fillRect(px + 9, py + 14, 2, 6);
        ctx.fillRect(px + 15, py + 14, 2, 6);
    }

    // Body/Shirt
    ctx.fillStyle = shirtColor;
    ctx.fillRect(px + 5, py + 6, 14, 9);
    ctx.fillStyle = shirtDark;
    ctx.fillRect(px + 5, py + 12, 14, 3);
    // Collar
    ctx.fillStyle = '#f8f8f8';
    ctx.fillRect(px + 10, py + 6, 4, 2);

    // Arms
    ctx.fillStyle = skinColor;
    ctx.fillRect(px + 3, py + 7, 3, 6);
    ctx.fillRect(px + 18, py + 7, 3, 6);

    // Head
    ctx.fillStyle = skinColor;
    ctx.fillRect(px + 6, py - 2, 12, 10);
    ctx.fillStyle = skinShadow;
    ctx.fillRect(px + 16, py, 2, 6);

    // Hair
    ctx.fillStyle = hairColor;
    if (isFemale) {
        // Girl hair - longer with bangs
        ctx.fillRect(px + 4, py - 6, 16, 8);
        ctx.fillRect(px + 4, py - 2, 4, 10);
        ctx.fillRect(px + 16, py - 2, 4, 10);
        ctx.fillRect(px + 6, py - 2, 12, 3);
    } else {
        // Boy hair - spiky
        ctx.fillRect(px + 5, py - 5, 14, 6);
        ctx.fillRect(px + 7, py - 7, 3, 3);
        ctx.fillRect(px + 12, py - 8, 4, 4);
        ctx.fillRect(px + 17, py - 6, 2, 3);
    }

    // Face details based on direction
    if (player.direction !== 'up') {
        // Eyes
        ctx.fillStyle = '#202020';
        const eyeOffset = player.direction === 'left' ? -1 : player.direction === 'right' ? 1 : 0;
        ctx.fillRect(px + 8 + eyeOffset, py + 2, 2, 2);
        ctx.fillRect(px + 14 + eyeOffset, py + 2, 2, 2);

        // Eye shine
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(px + 8 + eyeOffset, py + 2, 1, 1);
        ctx.fillRect(px + 14 + eyeOffset, py + 2, 1, 1);
    }

    // Mouth (only when facing down)
    if (player.direction === 'down') {
        ctx.fillStyle = '#c08070';
        ctx.fillRect(px + 11, py + 5, 2, 1);
    }
}

// =============================================
// CHARACTER PREVIEW (Pokemon Style)
// =============================================

function drawCharacterPreview(gender) {
    const w = characterPreview.width;
    const h = characterPreview.height;
    const isFemale = gender === 'female';

    previewCtx.clearRect(0, 0, w, h);

    // Pokemon-style colors
    const skinColor = '#f8d0a0';
    const skinShadow = '#e0b888';
    const hairColor = isFemale ? '#483018' : '#402810';
    const shirtColor = isFemale ? '#e85888' : '#e85048';
    const shirtDark = isFemale ? '#c84070' : '#c04038';
    const pantsColor = isFemale ? '#5878a8' : '#3868a8';
    const pantsDark = isFemale ? '#486090' : '#285090';

    const cx = w / 2;
    const cy = h / 2;

    // Scale factor for preview (2x)
    const s = 2;

    // Shadow
    previewCtx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    previewCtx.fillRect(cx - 8*s, cy + 11*s, 16*s, 4*s);

    // Feet/Shoes
    previewCtx.fillStyle = '#483828';
    previewCtx.fillRect(cx - 6*s, cy + 10*s, 5*s, 4*s);
    previewCtx.fillRect(cx + 1*s, cy + 10*s, 5*s, 4*s);

    // Legs/Pants
    previewCtx.fillStyle = pantsColor;
    previewCtx.fillRect(cx - 5*s, cy + 4*s, 4*s, 7*s);
    previewCtx.fillRect(cx + 1*s, cy + 4*s, 4*s, 7*s);
    previewCtx.fillStyle = pantsDark;
    previewCtx.fillRect(cx - 3*s, cy + 4*s, 2*s, 6*s);
    previewCtx.fillRect(cx + 3*s, cy + 4*s, 2*s, 6*s);

    // Body/Shirt
    previewCtx.fillStyle = shirtColor;
    previewCtx.fillRect(cx - 7*s, cy - 4*s, 14*s, 9*s);
    previewCtx.fillStyle = shirtDark;
    previewCtx.fillRect(cx - 7*s, cy + 2*s, 14*s, 3*s);
    // Collar
    previewCtx.fillStyle = '#f8f8f8';
    previewCtx.fillRect(cx - 2*s, cy - 4*s, 4*s, 2*s);

    // Arms
    previewCtx.fillStyle = skinColor;
    previewCtx.fillRect(cx - 9*s, cy - 3*s, 3*s, 6*s);
    previewCtx.fillRect(cx + 6*s, cy - 3*s, 3*s, 6*s);

    // Head
    previewCtx.fillStyle = skinColor;
    previewCtx.fillRect(cx - 6*s, cy - 12*s, 12*s, 10*s);
    previewCtx.fillStyle = skinShadow;
    previewCtx.fillRect(cx + 4*s, cy - 10*s, 2*s, 6*s);

    // Hair
    previewCtx.fillStyle = hairColor;
    if (isFemale) {
        // Girl hair - longer with bangs
        previewCtx.fillRect(cx - 8*s, cy - 16*s, 16*s, 8*s);
        previewCtx.fillRect(cx - 8*s, cy - 12*s, 4*s, 14*s);
        previewCtx.fillRect(cx + 4*s, cy - 12*s, 4*s, 14*s);
        previewCtx.fillRect(cx - 6*s, cy - 12*s, 12*s, 3*s);
    } else {
        // Boy hair - spiky
        previewCtx.fillRect(cx - 7*s, cy - 15*s, 14*s, 6*s);
        previewCtx.fillRect(cx - 5*s, cy - 17*s, 3*s, 3*s);
        previewCtx.fillRect(cx, cy - 18*s, 4*s, 4*s);
        previewCtx.fillRect(cx + 5*s, cy - 16*s, 2*s, 3*s);
    }

    // Eyes
    previewCtx.fillStyle = '#202020';
    previewCtx.fillRect(cx - 4*s, cy - 8*s, 2*s, 3*s);
    previewCtx.fillRect(cx + 2*s, cy - 8*s, 2*s, 3*s);

    // Eye shine
    previewCtx.fillStyle = '#ffffff';
    previewCtx.fillRect(cx - 4*s, cy - 8*s, 1*s, 1*s);
    previewCtx.fillRect(cx + 2*s, cy - 8*s, 1*s, 1*s);

    // Mouth
    previewCtx.fillStyle = '#c08070';
    previewCtx.fillRect(cx - 1*s, cy - 4*s, 2*s, 1*s);
}

// =============================================
// COLLISION DETECTION
// =============================================

function getCurrentMapData() {
    if (currentMap === MAPS.EXTERIOR) {
        return EXTERIOR_MAP;
    } else if (currentMap === MAPS.LAKE) {
        return LAKE_MAP;
    } else if (currentMap === MAPS.SHED) {
        return SHED_MAP;
    } else if (currentMap === MAPS.PLANTATION) {
        return PLANTATION_MAP;
    }
    return INTERIOR_MAP;
}

function getCurrentMapSize() {
    if (currentMap === MAPS.EXTERIOR) {
        return { width: EXTERIOR_WIDTH, height: EXTERIOR_HEIGHT };
    } else if (currentMap === MAPS.LAKE) {
        return { width: LAKE_WIDTH, height: LAKE_HEIGHT };
    } else if (currentMap === MAPS.SHED) {
        return { width: SHED_WIDTH, height: SHED_HEIGHT };
    } else if (currentMap === MAPS.PLANTATION) {
        return { width: PLANTATION_WIDTH, height: PLANTATION_HEIGHT };
    }
    return { width: INTERIOR_WIDTH, height: INTERIOR_HEIGHT };
}

function getCurrentSolidTiles() {
    if (currentMap === MAPS.EXTERIOR || currentMap === MAPS.LAKE) {
        return EXT_SOLID;
    } else if (currentMap === MAPS.SHED) {
        return SHED_SOLID;
    } else if (currentMap === MAPS.PLANTATION) {
        return PLANT_SOLID;
    }
    return INT_SOLID;
}

function getTileAt(pixelX, pixelY) {
    const mapData = getCurrentMapData();
    const mapSize = getCurrentMapSize();
    const tileX = Math.floor(pixelX / TILE_SIZE);
    const tileY = Math.floor(pixelY / TILE_SIZE);

    if (tileX < 0 || tileX >= mapSize.width || tileY < 0 || tileY >= mapSize.height) {
        return -1;
    }
    return mapData[tileY][tileX];
}

function isSolid(pixelX, pixelY) {
    const tile = getTileAt(pixelX, pixelY);

    // If player is in boat, can ONLY move on water tiles
    if (player.inBoat && currentMap === MAPS.LAKE) {
        // Only water tiles are passable when in boat
        if (tile === EXT_TILES.LAKE_WATER || tile === EXT_TILES.LAKE_EDGE) {
            return false;
        }
        // Everything else (land, dock, grass, etc.) is solid when in boat
        return true;
    }

    return getCurrentSolidTiles().includes(tile);
}

function canMoveTo(newX, newY) {
    const padding = 4;
    const left = newX + padding;
    const right = newX + player.width - padding;
    const top = newY + padding;
    const bottom = newY + player.height - padding;

    if (isSolid(left, top)) return false;
    if (isSolid(right, top)) return false;
    if (isSolid(left, bottom)) return false;
    if (isSolid(right, bottom)) return false;
    if (isSolid((left + right) / 2, top)) return false;
    if (isSolid((left + right) / 2, bottom)) return false;
    if (isSolid(left, (top + bottom) / 2)) return false;
    if (isSolid(right, (top + bottom) / 2)) return false;

    return true;
}

// =============================================
// MAP TRANSITIONS
// =============================================

function transitionToInterior() {
    playTransitionSound();
    currentMap = MAPS.INTERIOR;
    canvas.width = INTERIOR_CANVAS_WIDTH;
    canvas.height = INTERIOR_CANVAS_HEIGHT;
    updateGameContainerSize();
    player.x = 13 * TILE_SIZE;
    player.y = 20 * TILE_SIZE;
    player.direction = 'up';
    gameState = STATES.INTERIOR_PLAY;
    updateLocationLabel();
}

function transitionToExterior() {
    playTransitionSound();
    currentMap = MAPS.EXTERIOR;
    canvas.width = EXTERIOR_CANVAS_WIDTH;
    canvas.height = EXTERIOR_CANVAS_HEIGHT;
    updateGameContainerSize();
    player.x = 9 * TILE_SIZE;
    player.y = 10 * TILE_SIZE;
    player.direction = 'down';
    gameState = STATES.EXTERIOR_PLAY;
    updateLocationLabel();
}

function transitionToLake() {
    playTransitionSound();
    currentMap = MAPS.LAKE;
    canvas.width = LAKE_CANVAS_WIDTH;
    canvas.height = LAKE_CANVAS_HEIGHT;
    updateGameContainerSize();
    // Spawn near the TO_ESTATE exit (row 17, col 11-12), on the path at row 16
    player.x = 12 * TILE_SIZE;
    player.y = 16 * TILE_SIZE;
    player.direction = 'up';
    gameState = STATES.LAKE_PLAY;
    updateLocationLabel();
}

function transitionFromLake() {
    playTransitionSound();
    currentMap = MAPS.EXTERIOR;
    canvas.width = EXTERIOR_CANVAS_WIDTH;
    canvas.height = EXTERIOR_CANVAS_HEIGHT;
    updateGameContainerSize();
    // Return to near the TO_LAKE tile (row 18, col 18)
    player.x = 17 * TILE_SIZE;
    player.y = 17 * TILE_SIZE;
    player.direction = 'down';
    player.inBoat = false; // Exit boat when leaving lake
    gameState = STATES.EXTERIOR_PLAY;
    updateLocationLabel();
}

function transitionToShed() {
    playTransitionSound();
    currentMap = MAPS.SHED;
    canvas.width = SHED_CANVAS_WIDTH;
    canvas.height = SHED_CANVAS_HEIGHT;
    updateGameContainerSize();
    // Spawn near the door (bottom center, row 10)
    player.x = 4 * TILE_SIZE;
    player.y = 10 * TILE_SIZE;
    player.direction = 'up';
    gameState = STATES.SHED_PLAY;
    updateLocationLabel();
}

function transitionFromShed() {
    playTransitionSound();
    currentMap = MAPS.INTERIOR;
    canvas.width = INTERIOR_CANVAS_WIDTH;
    canvas.height = INTERIOR_CANVAS_HEIGHT;
    updateGameContainerSize();
    // Return to kitchen near the back door (col 28, row 3)
    player.x = 27 * TILE_SIZE;
    player.y = 3 * TILE_SIZE;
    player.direction = 'left';
    gameState = STATES.INTERIOR_PLAY;
    updateLocationLabel();
}

function transitionToPlantation() {
    playTransitionSound();
    currentMap = MAPS.PLANTATION;
    canvas.width = PLANTATION_CANVAS_WIDTH;
    canvas.height = PLANTATION_CANVAS_HEIGHT;
    updateGameContainerSize();
    // Spawn at the south entrance on clear grass (tile 1) next to TO_ESTATE exit
    // Row 27 has exit at columns 19-21, with grass at column 18
    player.x = 18 * TILE_SIZE;
    player.y = 27 * TILE_SIZE;
    player.direction = 'up';
    gameState = STATES.PLANTATION_PLAY;
    plantation.active = true;

    // Initialize market prices if not already done
    if (typeof updateMarketPrices === 'function' && !currentMarketPrices.lastUpdated) {
        updateMarketPrices();
    }

    updateLocationLabel();
    updatePlantationHUD();
    showPlantationHUD();
    console.log('Transitioned to plantation. State:', gameState, 'Map:', currentMap);
}

function transitionFromPlantation() {
    playTransitionSound();
    currentMap = MAPS.EXTERIOR;
    canvas.width = EXTERIOR_CANVAS_WIDTH;
    canvas.height = EXTERIOR_CANVAS_HEIGHT;
    updateGameContainerSize();
    // Spawn on the cleared path below the plantation entrance (row 1, column 18)
    player.x = 18 * TILE_SIZE;
    player.y = 1 * TILE_SIZE;
    player.direction = 'down';
    gameState = STATES.EXTERIOR_PLAY;
    hidePlantationHUD();
    updateLocationLabel();
}

function skipToPlantation() {
    console.log('skipToPlantation called');

    // Hide all screens
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('win-screen').classList.add('hidden');
    document.getElementById('ui-overlay').classList.add('hidden');

    // Set default player name
    player.name = 'Explorer';

    // Initialize plantation
    if (plantation.plants.arabica.length === 0) {
        initializePlantationPlants();
    }

    // Skip intro and go directly to plantation
    plantation.tutorialComplete = true;
    transitionToPlantation();

    // Force show the HUD (backup)
    document.getElementById('plantation-hud').classList.remove('hidden');
    document.getElementById('plantation-hud').style.display = 'block';

    // Focus canvas for keyboard input
    canvas.focus();

    console.log('skipToPlantation complete. State:', gameState);
}

function startPlantationMode() {
    // Hide win screen and start screen
    document.getElementById('win-screen').classList.add('hidden');
    document.getElementById('start-screen').classList.add('hidden');

    // Initialize plantation plants if not already done
    if (plantation.plants.arabica.length === 0) {
        initializePlantationPlants();
    }

    // Reset plantation calendar to harvest season start
    plantation.calendar = {
        day: 1,
        month: 11, // November
        year: 2066,
        season: 'HARVEST',
        dayPhase: 'MORNING'
    };

    // Start with tutorial if not completed
    if (!plantation.tutorialComplete) {
        gameState = STATES.PLANTATION_INTRO;
        showPlantationIntro();
    } else {
        transitionToPlantation();
    }
}

// =============================================
// PLANTATION TUTORIAL SYSTEM
// =============================================

const plantationTutorial = {
    active: false,
    currentStep: 0,
    highlightElement: null,
    steps: [
        {
            id: 'welcome',
            title: 'Welcome to the Estate!',
            messages: [
                "I'm so proud you found grandmother's ring!",
                "Now it's time to learn the family business.",
                "Running a Coorg coffee plantation is both an art and a science.",
                "Let me show you around..."
            ],
            highlight: null,
            action: null
        },
        {
            id: 'hud_overview',
            title: 'The Estate Dashboard',
            messages: [
                "Look at the top of the screen - that's your estate status bar.",
                "You can see the current date, season, and time of day.",
                "The season is crucial - different activities happen in different seasons!"
            ],
            highlight: '#plantation-top-bar',
            action: null
        },
        {
            id: 'resources',
            title: 'Managing Resources',
            messages: [
                "See your resources: Money (₹), Water, Power, and Workers.",
                "Money pays for workers and supplies. Water keeps plants healthy.",
                "Power runs the processing equipment. Workers do the hard work!",
                "Keep an eye on these - running low can hurt your harvest."
            ],
            highlight: '#resource-bar',
            action: null
        },
        {
            id: 'seasons',
            title: 'The Coffee Seasons',
            messages: [
                "Coorg has 6 coffee seasons:",
                "☀️ POST-HARVEST (Jan-Feb): Prune trees, process remaining beans",
                "🌸 BLOSSOM (Mar-Apr): Flowers bloom after the 'blossom showers'",
                "🌱 PLANTING (May): Plant new seedlings before monsoon",
                "🌧️ MONSOON (Jun-Sep): Heavy rains, berries develop",
                "🍒 RIPENING (Oct-Nov): Berries turn from green to red",
                "✂️ HARVEST (Nov-Feb): Pick ripe cherries - your busiest time!"
            ],
            highlight: '#season-name',
            action: null
        },
        {
            id: 'dashboard_intro',
            title: 'The Dashboard',
            messages: [
                "Click the 'Dashboard' button to see detailed information.",
                "You can view your plants, workers, inventory, and market prices.",
                "Try opening it now!"
            ],
            highlight: '#dashboard-button',
            action: 'open_dashboard',
            waitForAction: true
        },
        {
            id: 'dashboard_tabs',
            title: 'Dashboard Tabs',
            messages: [
                "Great! The dashboard has 5 tabs:",
                "📊 Overview: Quick summary of your estate",
                "🌿 Plants: Health and growth status of all coffee trees",
                "👷 Workers: Hire, assign tasks, check morale",
                "📦 Inventory: Your cherries, parchment, and green beans",
                "💰 Market: Current prices and selling interface"
            ],
            highlight: '#dashboard-tabs',
            action: null
        },
        {
            id: 'coffee_types',
            title: 'Coffee Varieties',
            messages: [
                "We grow two types of coffee:",
                "☕ ARABICA: Premium quality, subtle flavors, higher prices",
                "   - Needs shade, prone to pests, but worth more",
                "☕ ROBUSTA: Hardy, strong taste, reliable yields",
                "   - Easier to grow, resistant to disease",
                "Both have their place on a successful estate!"
            ],
            highlight: null,
            action: null
        },
        {
            id: 'workers',
            title: 'Hiring Workers',
            messages: [
                "You'll need workers to run the estate.",
                "🍒 PICKERS harvest ripe cherries during harvest season",
                "⚙️ PROCESSORS handle pulping, drying, and sorting beans",
                "🔧 MAINTENANCE workers water plants and control pests",
                "Visit the Phone Booth to hire workers, or use Dashboard > Workers."
            ],
            highlight: null,
            action: null
        },
        {
            id: 'minigames',
            title: 'Mini-Games',
            messages: [
                "Running the estate involves hands-on work!",
                "🍒 CHERRY PICKING: Click ripe (red) cherries, avoid green ones",
                "📊 BEAN SORTING: Grade beans by size and color (1-4 keys)",
                "⚗️ PROCESSING: Time the fermentation perfectly for quality",
                "Good performance means better yields and higher quality!"
            ],
            highlight: null,
            action: null
        },
        {
            id: 'selling',
            title: 'Selling Your Coffee',
            messages: [
                "After processing, sell your beans at market!",
                "Prices change daily based on season and demand.",
                "Higher grades (MNEB, A) fetch premium prices.",
                "Check the Notice Board for current market prices.",
                "Use Dashboard > Market to sell your stock."
            ],
            highlight: null,
            action: null
        },
        {
            id: 'tips',
            title: 'Final Tips',
            messages: [
                "Here are some tips to succeed:",
                "💧 Keep water reserves high, especially in dry season",
                "👷 Hire workers BEFORE harvest season - there's a labor shortage!",
                "🐛 Watch for pests - treat them early or lose your crop",
                "💰 Don't spend all your money - save for emergencies",
                "📅 Press 'End Phase' to advance time",
                "Talk to me anytime by pressing E when facing me!"
            ],
            highlight: '#advance-time-button',
            action: null
        },
        {
            id: 'complete',
            title: 'Good Luck!',
            messages: [
                "That's everything you need to know to start!",
                "Remember, I'm always here to help.",
                "Now go make our family proud! ☕",
                "Press M anytime to save your progress."
            ],
            highlight: null,
            action: 'complete'
        }
    ]
};

function showPlantationIntro() {
    // Show skip option first
    showTutorialSkipOption();
}

function showTutorialSkipOption() {
    // Create skip modal
    let modal = document.getElementById('tutorial-skip-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'tutorial-skip-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.85);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;
        document.body.appendChild(modal);
    }

    modal.innerHTML = `
        <div style="background: linear-gradient(135deg, #2a3a2a, #1a2a1a); border-radius: 12px; padding: 30px; max-width: 450px; text-align: center; border: 2px solid #4a6a4a;">
            <h2 style="color: #ffd700; margin-bottom: 20px;">Welcome to the Plantation!</h2>
            <p style="color: #ccc; margin-bottom: 25px; line-height: 1.6;">
                Would you like Dad to show you how to run the coffee estate?
            </p>
            <div style="display: flex; gap: 15px; justify-content: center;">
                <button onclick="startPlantationTutorial()" style="
                    padding: 12px 24px;
                    font-size: 16px;
                    background: linear-gradient(135deg, #4a7a2a, #2a5a1a);
                    color: #fff;
                    border: 2px solid #6a9a4a;
                    border-radius: 8px;
                    cursor: pointer;
                ">
                    Yes, teach me!
                </button>
                <button onclick="skipPlantationTutorial()" style="
                    padding: 12px 24px;
                    font-size: 16px;
                    background: linear-gradient(135deg, #3a3a3a, #2a2a2a);
                    color: #aaa;
                    border: 2px solid #5a5a5a;
                    border-radius: 8px;
                    cursor: pointer;
                ">
                    Skip tutorial
                </button>
            </div>
        </div>
    `;
    modal.style.display = 'flex';
}

function startPlantationTutorial() {
    // Hide skip modal
    const skipModal = document.getElementById('tutorial-skip-modal');
    if (skipModal) skipModal.style.display = 'none';

    // Initialize tutorial
    plantationTutorial.active = true;
    plantationTutorial.currentStep = 0;

    // Transition to plantation first so elements exist
    transitionToPlantation();

    // Ensure canvas has focus for keyboard input
    canvas.focus();

    // Start first step after a short delay
    setTimeout(() => {
        showTutorialStep(0);
    }, 500);
}

function skipPlantationTutorial() {
    // Hide skip modal
    const skipModal = document.getElementById('tutorial-skip-modal');
    if (skipModal) skipModal.style.display = 'none';

    // Mark as complete and transition
    plantation.tutorialComplete = true;
    plantationTutorial.active = false;
    transitionToPlantation();

    // Ensure canvas has focus for keyboard input
    canvas.focus();

    // Show brief message
    showDialogue("Dad", [
        "Alright! If you need help, just talk to me anytime.",
        "Good luck with the estate!"
    ]);
}

function showTutorialStep(stepIndex) {
    if (stepIndex >= plantationTutorial.steps.length) {
        completePlantationTutorial();
        return;
    }

    const step = plantationTutorial.steps[stepIndex];
    plantationTutorial.currentStep = stepIndex;

    // Remove previous highlight
    removeTutorialHighlight();

    // Add new highlight if specified
    if (step.highlight) {
        addTutorialHighlight(step.highlight);
    }

    // Show dialogue with step content
    const stepCounter = `(${stepIndex + 1}/${plantationTutorial.steps.length})`;

    showDialogue(`Dad - ${step.title} ${stepCounter}`, step.messages, () => {
        // Handle action if specified
        if (step.action === 'complete') {
            completePlantationTutorial();
        } else if (step.action === 'open_dashboard' && step.waitForAction) {
            // Wait for player to open dashboard
            waitForDashboardOpen();
        } else {
            // Auto-advance to next step
            showTutorialStep(stepIndex + 1);
        }
    });
}

function addTutorialHighlight(selector) {
    const element = document.querySelector(selector);
    if (!element) return;

    // Store reference
    plantationTutorial.highlightElement = element;

    // Add highlight effect
    element.style.transition = 'all 0.3s';
    element.style.boxShadow = '0 0 20px 5px rgba(255, 215, 0, 0.7)';
    element.style.border = '2px solid #ffd700';
    element.style.position = 'relative';
    element.style.zIndex = '1000';

    // Add pulsing animation
    element.style.animation = 'tutorialPulse 1.5s infinite';
}

function removeTutorialHighlight() {
    if (plantationTutorial.highlightElement) {
        const element = plantationTutorial.highlightElement;
        element.style.boxShadow = '';
        element.style.border = '';
        element.style.animation = '';
        element.style.zIndex = '';
        plantationTutorial.highlightElement = null;
    }

    // Also remove any highlight by selector
    document.querySelectorAll('[data-tutorial-highlight]').forEach(el => {
        el.style.boxShadow = '';
        el.style.border = '';
        el.style.animation = '';
    });
}

function waitForDashboardOpen() {
    // Create a listener for dashboard opening
    const checkInterval = setInterval(() => {
        const dashboard = document.getElementById('plantation-dashboard');
        if (dashboard && !dashboard.classList.contains('hidden')) {
            clearInterval(checkInterval);
            removeTutorialHighlight();

            // Continue to next step after dashboard is open
            setTimeout(() => {
                showTutorialStep(plantationTutorial.currentStep + 1);
            }, 500);
        }
    }, 100);

    // Timeout after 30 seconds
    setTimeout(() => {
        clearInterval(checkInterval);
        if (plantationTutorial.active) {
            // Auto-advance if player doesn't open dashboard
            showTutorialStep(plantationTutorial.currentStep + 1);
        }
    }, 30000);
}

function completePlantationTutorial() {
    plantationTutorial.active = false;
    plantation.tutorialComplete = true;
    removeTutorialHighlight();

    // Hide any modals
    const skipModal = document.getElementById('tutorial-skip-modal');
    if (skipModal) skipModal.style.display = 'none';

    // Close dashboard if open
    closeDashboard();

    // Set proper game state
    gameState = STATES.PLANTATION_PLAY;

    // Ensure canvas has focus for keyboard input
    canvas.focus();

    // Auto-save after tutorial
    autoSave();
}

// Add CSS for tutorial pulse animation
function addTutorialStyles() {
    if (document.getElementById('tutorial-styles')) return;

    const style = document.createElement('style');
    style.id = 'tutorial-styles';
    style.textContent = `
        @keyframes tutorialPulse {
            0%, 100% {
                box-shadow: 0 0 20px 5px rgba(255, 215, 0, 0.7);
            }
            50% {
                box-shadow: 0 0 30px 10px rgba(255, 215, 0, 0.9);
            }
        }

        #tutorial-skip-modal button:hover {
            transform: scale(1.05);
            transition: transform 0.2s;
        }
    `;
    document.head.appendChild(style);
}

// Initialize tutorial styles on load
addTutorialStyles();

function showPlantationHUD() {
    const hud = document.getElementById('plantation-hud');
    const uiOverlay = document.getElementById('ui-overlay');
    if (hud) hud.classList.remove('hidden');
    if (uiOverlay) uiOverlay.classList.add('hidden');
}

function hidePlantationHUD() {
    const hud = document.getElementById('plantation-hud');
    const uiOverlay = document.getElementById('ui-overlay');
    if (hud) hud.classList.add('hidden');
    if (uiOverlay) uiOverlay.classList.remove('hidden');
}

function updatePlantationHUD() {
    const dayPhaseEl = document.getElementById('day-phase');
    const dateEl = document.getElementById('calendar-date');
    const seasonEl = document.getElementById('season-name');
    const moneyEl = document.getElementById('plant-money-display');
    const waterEl = document.getElementById('water-display');
    const powerEl = document.getElementById('power-display');
    const workersEl = document.getElementById('workers-display');
    const cherriesEl = document.getElementById('cherries-count');
    const beansEl = document.getElementById('beans-count');

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    if (dayPhaseEl) dayPhaseEl.textContent = plantation.calendar.dayPhase;
    if (dateEl) dateEl.textContent = `${months[plantation.calendar.month - 1]} ${plantation.calendar.day}, ${plantation.calendar.year}`;
    if (seasonEl) seasonEl.textContent = SEASONS[plantation.calendar.season]?.name || plantation.calendar.season;
    if (moneyEl) {
        moneyEl.textContent = `₹${plantationResources.money.toLocaleString('en-IN')}`;
        // Visual warning for low money
        if (plantationResources.money < 5000) {
            moneyEl.style.color = '#ff4444';
            moneyEl.style.animation = 'pulse 1s infinite';
        } else if (plantationResources.money < 10000) {
            moneyEl.style.color = '#ffaa00';
            moneyEl.style.animation = 'none';
        } else {
            moneyEl.style.color = '#44ff44';
            moneyEl.style.animation = 'none';
        }
    }
    if (waterEl) {
        waterEl.textContent = `${plantationResources.water.stored}L`;
        // Visual warning for low water
        if (plantationResources.water.stored < 500) {
            waterEl.style.color = '#ff4444';
        } else if (plantationResources.water.stored < 1000) {
            waterEl.style.color = '#ffaa00';
        } else {
            waterEl.style.color = '#44aaff';
        }
    }
    if (powerEl) powerEl.textContent = plantationResources.power.gridAvailable ? 'Grid OK' : 'Generator';
    if (workersEl) workersEl.textContent = `${plantation.workers.length} Workers`;

    const totalCherries = plantationResources.inventory.cherries.arabica + plantationResources.inventory.cherries.robusta;
    const totalBeans = Object.values(plantationResources.inventory.greenBeans.arabica).reduce((a, b) => a + b, 0) +
                       Object.values(plantationResources.inventory.greenBeans.robusta).reduce((a, b) => a + b, 0);
    if (cherriesEl) cherriesEl.textContent = `Cherries: ${totalCherries.toFixed(1)}kg`;
    if (beansEl) beansEl.textContent = `Beans: ${totalBeans.toFixed(1)}kg`;
}

function openDashboard() {
    // Allow opening dashboard in plantation mode
    gameState = STATES.PLANTATION_MENU;
    const dashboard = document.getElementById('plantation-dashboard');
    if (dashboard) {
        dashboard.classList.remove('hidden');
        showDashboardTab('overview');
    }
}

function closeDashboard() {
    console.log('closeDashboard called');
    const dashboard = document.getElementById('plantation-dashboard');
    if (dashboard) {
        dashboard.classList.add('hidden');
    }
    // Always restore to plantation play state
    gameState = STATES.PLANTATION_PLAY;
    currentMap = MAPS.PLANTATION;
    console.log('Dashboard closed. State:', gameState);
}

function showDashboardTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.dash-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.tab === tabName) tab.classList.add('active');
    });

    const tabContent = document.getElementById('tab-content');
    if (!tabContent) return;

    switch (tabName) {
        case 'overview':
            tabContent.innerHTML = renderOverviewTab();
            break;
        case 'plants':
            tabContent.innerHTML = renderPlantsTab();
            break;
        case 'workers':
            tabContent.innerHTML = renderWorkersTab();
            break;
        case 'inventory':
            tabContent.innerHTML = renderInventoryTab();
            break;
        case 'market':
            tabContent.innerHTML = renderMarketTab();
            break;
    }
}

function renderOverviewTab() {
    const season = SEASONS[plantation.calendar.season];
    const cal = plantation.calendar;
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dateStr = `${monthNames[cal.month - 1]} ${cal.day}, ${cal.year}`;

    // Calculate water and fuel percentages
    const waterPct = Math.round((plantationResources.water.stored / plantationResources.water.tankCapacity) * 100);
    const fuelPct = Math.round((plantationResources.power.generatorFuel / plantationResources.power.fuelCapacity) * 100);

    // Get plant health summary
    const allPlants = [...plantation.plants.arabica, ...plantation.plants.robusta];
    const healthyPlants = allPlants.filter(p => p.health >= 70).length;
    const sickPlants = allPlants.filter(p => p.health < 40).length;
    const ripePlants = allPlants.filter(p => p.stage === 'RIPE' || p.stage === 'OVERRIPE').length;

    // Get inventory summary
    const totalCherries = plantationResources.inventory.cherries.arabica + plantationResources.inventory.cherries.robusta;
    const totalBeans = Object.values(plantationResources.inventory.greenBeans.arabica).reduce((a, b) => a + b, 0) +
                       Object.values(plantationResources.inventory.greenBeans.robusta).reduce((a, b) => a + b, 0);

    // Season color coding
    const seasonColors = {
        'POST_HARVEST': '#8a7a5a',
        'BLOSSOM': '#ff9a9a',
        'PLANTING': '#7aba7a',
        'MONSOON': '#5a8aba',
        'RIPENING': '#ffba5a',
        'HARVEST': '#ff7a5a'
    };
    const seasonColor = seasonColors[plantation.calendar.season] || '#90ee90';

    return `
        <div class="overview-section">
            <div class="overview-header">
                <div class="date-display-large">
                    <span class="day-phase-icon">${cal.dayPhase === 'MORNING' ? '🌅' : cal.dayPhase === 'AFTERNOON' ? '☀️' : '🌙'}</span>
                    <span class="date-text">${dateStr}</span>
                    <span class="phase-text">${cal.dayPhase.charAt(0) + cal.dayPhase.slice(1).toLowerCase()}</span>
                </div>
                <div class="season-badge" style="background: ${seasonColor};">
                    ${season?.name || plantation.calendar.season}
                </div>
            </div>

            <p class="season-desc">${season?.description || ''}</p>

            <div class="stat-grid-enhanced">
                <div class="stat-box money">
                    <span class="stat-icon">💰</span>
                    <div class="stat-content">
                        <span class="stat-label">Balance</span>
                        <span class="stat-value">₹${plantationResources.money.toLocaleString('en-IN')}</span>
                    </div>
                </div>

                <div class="stat-box water">
                    <span class="stat-icon">💧</span>
                    <div class="stat-content">
                        <span class="stat-label">Water Tank</span>
                        <div class="resource-bar">
                            <div class="resource-fill water-fill" style="width: ${waterPct}%"></div>
                            <span class="resource-text">${plantationResources.water.stored}L</span>
                        </div>
                    </div>
                </div>

                <div class="stat-box power ${plantationResources.power.gridAvailable ? 'grid-on' : 'grid-off'}">
                    <span class="stat-icon">${plantationResources.power.gridAvailable ? '⚡' : '🔋'}</span>
                    <div class="stat-content">
                        <span class="stat-label">Power</span>
                        ${plantationResources.power.gridAvailable ?
                            '<span class="stat-value grid-status">Grid Connected</span>' :
                            `<div class="resource-bar">
                                <div class="resource-fill fuel-fill" style="width: ${fuelPct}%"></div>
                                <span class="resource-text">${plantationResources.power.generatorFuel}L fuel</span>
                            </div>`
                        }
                    </div>
                </div>

                <div class="stat-box workers">
                    <span class="stat-icon">👷</span>
                    <div class="stat-content">
                        <span class="stat-label">Workers</span>
                        <span class="stat-value">${plantation.workers.length}<span class="stat-max">/${plantation.maxWorkers}</span></span>
                    </div>
                </div>
            </div>

            <div class="quick-stats">
                <div class="quick-stat ${healthyPlants === allPlants.length ? 'good' : sickPlants > 0 ? 'bad' : 'warn'}">
                    <span class="qs-icon">🌱</span>
                    <span class="qs-value">${healthyPlants}/${allPlants.length}</span>
                    <span class="qs-label">Healthy Plants</span>
                </div>
                <div class="quick-stat ${ripePlants > 0 ? 'good' : ''}">
                    <span class="qs-icon">🍒</span>
                    <span class="qs-value">${ripePlants}</span>
                    <span class="qs-label">Ready to Pick</span>
                </div>
                <div class="quick-stat">
                    <span class="qs-icon">🫘</span>
                    <span class="qs-value">${totalCherries.toFixed(1)}kg</span>
                    <span class="qs-label">Cherries</span>
                </div>
                <div class="quick-stat ${totalBeans > 0 ? 'good' : ''}">
                    <span class="qs-icon">☕</span>
                    <span class="qs-value">${totalBeans.toFixed(1)}kg</span>
                    <span class="qs-label">Beans to Sell</span>
                </div>
            </div>

            ${sickPlants > 0 ? `<div class="alert-box warning">⚠️ ${sickPlants} plant(s) need attention! Check the Plants tab.</div>` : ''}
            ${ripePlants > 5 ? `<div class="alert-box info">🍒 Harvest time! ${ripePlants} plants are ready for picking.</div>` : ''}
        </div>
    `;
}

function renderPlantsTab() {
    const arabicaByStage = {};
    const robustaByStage = {};

    plantation.plants.arabica.forEach(p => {
        arabicaByStage[p.stage] = (arabicaByStage[p.stage] || 0) + 1;
    });
    plantation.plants.robusta.forEach(p => {
        robustaByStage[p.stage] = (robustaByStage[p.stage] || 0) + 1;
    });

    // Stage colors and icons
    const stageStyles = {
        'SEEDLING': { color: '#7aba7a', icon: '🌱' },
        'YOUNG': { color: '#5a9a5a', icon: '🌿' },
        'MATURE': { color: '#3a8a3a', icon: '🌳' },
        'FLOWERING': { color: '#ffaaff', icon: '🌸' },
        'GREEN_BERRY': { color: '#7aba5a', icon: '🟢' },
        'RIPE': { color: '#ff5a5a', icon: '🔴' },
        'OVERRIPE': { color: '#8a3a3a', icon: '🟤' },
        'DISEASED': { color: '#5a5a5a', icon: '🦠' }
    };

    // Calculate health statistics
    const arabicaHealth = plantation.plants.arabica.reduce((sum, p) => sum + p.health, 0) / Math.max(1, plantation.plants.arabica.length);
    const robustaHealth = plantation.plants.robusta.reduce((sum, p) => sum + p.health, 0) / Math.max(1, plantation.plants.robusta.length);
    const arabicaPests = plantation.plants.arabica.filter(p => p.hasPest).length;
    const robustaPests = plantation.plants.robusta.filter(p => p.hasPest).length;

    // Create health grid (visual representation of all plants)
    const createHealthGrid = (plants, type) => {
        if (plants.length === 0) return '<div class="health-grid-empty">No plants</div>';

        return `<div class="health-grid">
            ${plants.map((p, i) => {
                const healthColor = p.health >= 70 ? '#4a9a4a' :
                                   p.health >= 40 ? '#9a9a4a' : '#9a4a4a';
                const stageStyle = stageStyles[p.stage] || { color: '#888', icon: '?' };
                const pestClass = p.hasPest ? 'has-pest' : '';
                return `<div class="plant-cell ${pestClass}"
                            style="background: ${healthColor};"
                            title="${type} #${i+1}: ${p.stage}, Health: ${p.health}%${p.hasPest ? ' (PEST!)' : ''}">
                    <span class="plant-icon">${stageStyle.icon}</span>
                </div>`;
            }).join('')}
        </div>`;
    };

    // Create stage summary with icons
    const createStageSummary = (stageData) => {
        const stageOrder = ['SEEDLING', 'YOUNG', 'MATURE', 'FLOWERING', 'GREEN_BERRY', 'RIPE', 'OVERRIPE', 'DISEASED'];
        return stageOrder
            .filter(stage => stageData[stage])
            .map(stage => {
                const style = stageStyles[stage] || { color: '#888', icon: '?' };
                return `<span class="stage-badge" style="background: ${style.color}20; border-color: ${style.color};">
                    ${style.icon} ${stage.replace('_', ' ')}: ${stageData[stage]}
                </span>`;
            }).join('');
    };

    return `
        <div class="plants-section">
            <div class="plant-type-section">
                <div class="plant-header">
                    <h3>☕ Arabica Plants (${plantation.plants.arabica.length})</h3>
                    <div class="plant-health-bar">
                        <div class="health-fill" style="width: ${arabicaHealth}%; background: ${arabicaHealth >= 70 ? '#4a9a4a' : arabicaHealth >= 40 ? '#9a9a4a' : '#9a4a4a'};"></div>
                        <span class="health-text">Avg Health: ${arabicaHealth.toFixed(0)}%</span>
                    </div>
                </div>
                ${arabicaPests > 0 ? `<div class="pest-alert">🦠 ${arabicaPests} plant(s) have pest infestation!</div>` : ''}
                <div class="stage-list">
                    ${createStageSummary(arabicaByStage)}
                </div>
                <h4>Health Grid</h4>
                ${createHealthGrid(plantation.plants.arabica, 'Arabica')}
            </div>

            <div class="plant-type-section">
                <div class="plant-header">
                    <h3>🫘 Robusta Plants (${plantation.plants.robusta.length})</h3>
                    <div class="plant-health-bar">
                        <div class="health-fill" style="width: ${robustaHealth}%; background: ${robustaHealth >= 70 ? '#4a9a4a' : robustaHealth >= 40 ? '#9a9a4a' : '#9a4a4a'};"></div>
                        <span class="health-text">Avg Health: ${robustaHealth.toFixed(0)}%</span>
                    </div>
                </div>
                ${robustaPests > 0 ? `<div class="pest-alert">🦠 ${robustaPests} plant(s) have pest infestation!</div>` : ''}
                <div class="stage-list">
                    ${createStageSummary(robustaByStage)}
                </div>
                <h4>Health Grid</h4>
                ${createHealthGrid(plantation.plants.robusta, 'Robusta')}
            </div>

            <div class="plant-legend">
                <span class="legend-item"><span class="legend-color" style="background: #4a9a4a;"></span> Healthy (70%+)</span>
                <span class="legend-item"><span class="legend-color" style="background: #9a9a4a;"></span> Fair (40-69%)</span>
                <span class="legend-item"><span class="legend-color" style="background: #9a4a4a;"></span> Poor (&lt;40%)</span>
            </div>
        </div>
    `;
}

function renderWorkersTab() {
    const weeklyWages = calculateWeeklyWageBill();

    if (plantation.workers.length === 0) {
        return `
            <div class="workers-section">
                <div class="empty-workers">
                    <span class="empty-icon">👷</span>
                    <p>No workers hired yet.</p>
                    <p class="hint">Workers help with picking, processing, and maintenance.</p>
                    <button class="dash-action-btn primary" onclick="closeDashboard(); setTimeout(openHiringModal, 300);">
                        Hire Workers
                    </button>
                </div>
            </div>
        `;
    }

    // Calculate team stats (handle division by zero when no workers)
    const workerCount = plantation.workers.length;
    const avgMorale = workerCount > 0 ? plantation.workers.reduce((sum, w) => sum + w.morale, 0) / workerCount : 0;
    const avgEnergy = workerCount > 0 ? plantation.workers.reduce((sum, w) => sum + w.energy, 0) / workerCount : 0;
    const activeWorkers = plantation.workers.filter(w => w.task !== 'IDLE').length;
    const lowMoraleCount = plantation.workers.filter(w => w.morale < 40).length;

    // Worker type icons
    const typeIcons = {
        'PICKER': '🍒',
        'PROCESSOR': '⚙️',
        'MAINTENANCE': '🔧'
    };

    return `
        <div class="workers-section">
            <div class="worker-summary-grid">
                <div class="ws-stat">
                    <span class="ws-label">Team Size</span>
                    <span class="ws-value">${plantation.workers.length}<span class="ws-max">/${plantation.maxWorkers}</span></span>
                </div>
                <div class="ws-stat">
                    <span class="ws-label">Active Now</span>
                    <span class="ws-value ${activeWorkers > 0 ? 'active' : ''}">${activeWorkers}</span>
                </div>
                <div class="ws-stat">
                    <span class="ws-label">Weekly Wages</span>
                    <span class="ws-value wage">₹${weeklyWages.toLocaleString()}</span>
                </div>
                <div class="ws-stat">
                    <span class="ws-label">Team Morale</span>
                    <div class="mini-bar">
                        <div class="mini-fill" style="width: ${avgMorale}%; background: ${getMoraleColor(avgMorale)};"></div>
                    </div>
                </div>
            </div>

            ${lowMoraleCount > 0 ? `<div class="alert-box warning">⚠️ ${lowMoraleCount} worker(s) have low morale!</div>` : ''}

            <div class="worker-cards">
                ${plantation.workers.map(w => {
                    const typeInfo = WORKER_TYPES[w.type];
                    const taskInfo = WORKER_TASKS[w.task] || WORKER_TASKS.IDLE;
                    const typeIcon = typeIcons[w.type] || '👤';
                    const isWorking = w.task !== 'IDLE';

                    return `
                        <div class="worker-card-dash ${isWorking ? 'working' : 'idle'} ${w.morale < 40 ? 'low-morale' : ''}">
                            <div class="wc-header">
                                <span class="wc-icon">${typeIcon}</span>
                                <span class="wc-name">${w.name}</span>
                                <span class="wc-type">${typeInfo ? typeInfo.name : w.type}</span>
                            </div>
                            <div class="wc-task ${isWorking ? 'active-task' : ''}">
                                ${isWorking ? '🔄' : '💤'} ${taskInfo.name}
                            </div>
                            <div class="wc-bars">
                                <div class="wc-bar-group">
                                    <span class="bar-label">😊 Morale</span>
                                    <div class="wc-bar">
                                        <div class="wc-fill" style="width: ${w.morale}%; background: ${getMoraleColor(w.morale)};"></div>
                                    </div>
                                    <span class="bar-value">${w.morale}%</span>
                                </div>
                                <div class="wc-bar-group">
                                    <span class="bar-label">⚡ Energy</span>
                                    <div class="wc-bar">
                                        <div class="wc-fill" style="width: ${w.energy}%; background: ${getEnergyColor(w.energy)};"></div>
                                    </div>
                                    <span class="bar-value">${Math.round(w.energy)}%</span>
                                </div>
                            </div>
                            <div class="wc-footer">
                                <span class="wc-days">${w.daysWorked} days worked</span>
                                <span class="wc-wage">₹${typeInfo ? typeInfo.wage : 0}/day</span>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>

            <div class="worker-actions-bar">
                <button class="dash-action-btn" onclick="closeDashboard(); setTimeout(openWorkerManageModal, 300);">
                    Manage Tasks
                </button>
                <button class="dash-action-btn" onclick="closeDashboard(); setTimeout(openHiringModal, 300);">
                    Hire More
                </button>
            </div>
        </div>
    `;
}

function renderInventoryTab() {
    const inv = plantationResources.inventory;

    // Calculate totals
    const totalCherries = inv.cherries.arabica + inv.cherries.robusta;
    const totalParchment = inv.parchment.arabica + inv.parchment.robusta;
    const totalGreenArabica = inv.greenBeans.arabica.MNEB + inv.greenBeans.arabica.A + inv.greenBeans.arabica.B + inv.greenBeans.arabica.C;
    const totalGreenRobusta = inv.greenBeans.robusta.A + inv.greenBeans.robusta.B + inv.greenBeans.robusta.C;
    const totalGreen = totalGreenArabica + totalGreenRobusta;

    // Get current value if prices exist
    let totalValue = 0;
    if (currentMarketPrices.lastUpdated) {
        totalValue = (inv.greenBeans.arabica.MNEB * currentMarketPrices.arabica.MNEB) +
                     (inv.greenBeans.arabica.A * currentMarketPrices.arabica.A) +
                     (inv.greenBeans.arabica.B * currentMarketPrices.arabica.B) +
                     (inv.greenBeans.arabica.C * currentMarketPrices.arabica.C) +
                     (inv.greenBeans.robusta.A * currentMarketPrices.robusta.A) +
                     (inv.greenBeans.robusta.B * currentMarketPrices.robusta.B) +
                     (inv.greenBeans.robusta.C * currentMarketPrices.robusta.C);
    }

    // Grade quality indicators
    const gradeColors = {
        'MNEB': '#ffd700',
        'A': '#90ee90',
        'B': '#87ceeb',
        'C': '#dda0dd'
    };

    return `
        <div class="inventory-section">
            <div class="processing-pipeline">
                <div class="pipeline-stage">
                    <div class="stage-icon">🍒</div>
                    <div class="stage-name">Cherries</div>
                    <div class="stage-amount">${totalCherries.toFixed(1)}kg</div>
                </div>
                <div class="pipeline-arrow">→</div>
                <div class="pipeline-stage">
                    <div class="stage-icon">🫛</div>
                    <div class="stage-name">Parchment</div>
                    <div class="stage-amount">${totalParchment.toFixed(1)}kg</div>
                </div>
                <div class="pipeline-arrow">→</div>
                <div class="pipeline-stage highlight">
                    <div class="stage-icon">☕</div>
                    <div class="stage-name">Green Beans</div>
                    <div class="stage-amount">${totalGreen.toFixed(1)}kg</div>
                </div>
                <div class="pipeline-arrow">→</div>
                <div class="pipeline-stage sell">
                    <div class="stage-icon">💰</div>
                    <div class="stage-name">Value</div>
                    <div class="stage-amount">₹${Math.round(totalValue).toLocaleString('en-IN')}</div>
                </div>
            </div>

            <div class="inventory-grid">
                <div class="inv-column">
                    <h3>☕ Arabica</h3>
                    <div class="inv-breakdown">
                        <div class="inv-row cherries">
                            <span class="inv-label">🍒 Cherries</span>
                            <span class="inv-value">${inv.cherries.arabica.toFixed(1)}kg</span>
                        </div>
                        <div class="inv-row parchment">
                            <span class="inv-label">🫛 Parchment</span>
                            <span class="inv-value">${inv.parchment.arabica.toFixed(1)}kg</span>
                        </div>
                        <div class="inv-divider"></div>
                        <div class="inv-row grade" style="border-left: 3px solid ${gradeColors.MNEB}">
                            <span class="inv-label">MNEB</span>
                            <span class="inv-value ${inv.greenBeans.arabica.MNEB > 0 ? 'has-stock' : ''}">${inv.greenBeans.arabica.MNEB.toFixed(1)}kg</span>
                        </div>
                        <div class="inv-row grade" style="border-left: 3px solid ${gradeColors.A}">
                            <span class="inv-label">Grade A</span>
                            <span class="inv-value ${inv.greenBeans.arabica.A > 0 ? 'has-stock' : ''}">${inv.greenBeans.arabica.A.toFixed(1)}kg</span>
                        </div>
                        <div class="inv-row grade" style="border-left: 3px solid ${gradeColors.B}">
                            <span class="inv-label">Grade B</span>
                            <span class="inv-value ${inv.greenBeans.arabica.B > 0 ? 'has-stock' : ''}">${inv.greenBeans.arabica.B.toFixed(1)}kg</span>
                        </div>
                        <div class="inv-row grade" style="border-left: 3px solid ${gradeColors.C}">
                            <span class="inv-label">Grade C</span>
                            <span class="inv-value ${inv.greenBeans.arabica.C > 0 ? 'has-stock' : ''}">${inv.greenBeans.arabica.C.toFixed(1)}kg</span>
                        </div>
                    </div>
                </div>

                <div class="inv-column">
                    <h3>🫘 Robusta</h3>
                    <div class="inv-breakdown">
                        <div class="inv-row cherries">
                            <span class="inv-label">🍒 Cherries</span>
                            <span class="inv-value">${inv.cherries.robusta.toFixed(1)}kg</span>
                        </div>
                        <div class="inv-row parchment">
                            <span class="inv-label">🫛 Parchment</span>
                            <span class="inv-value">${inv.parchment.robusta.toFixed(1)}kg</span>
                        </div>
                        <div class="inv-divider"></div>
                        <div class="inv-row grade" style="border-left: 3px solid ${gradeColors.A}">
                            <span class="inv-label">Grade A</span>
                            <span class="inv-value ${inv.greenBeans.robusta.A > 0 ? 'has-stock' : ''}">${inv.greenBeans.robusta.A.toFixed(1)}kg</span>
                        </div>
                        <div class="inv-row grade" style="border-left: 3px solid ${gradeColors.B}">
                            <span class="inv-label">Grade B</span>
                            <span class="inv-value ${inv.greenBeans.robusta.B > 0 ? 'has-stock' : ''}">${inv.greenBeans.robusta.B.toFixed(1)}kg</span>
                        </div>
                        <div class="inv-row grade" style="border-left: 3px solid ${gradeColors.C}">
                            <span class="inv-label">Grade C</span>
                            <span class="inv-value ${inv.greenBeans.robusta.C > 0 ? 'has-stock' : ''}">${inv.greenBeans.robusta.C.toFixed(1)}kg</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="supplies-section">
                <h3>🧰 Supplies</h3>
                <div class="supplies-grid">
                    <div class="supply-item ${plantationResources.supplies.fertilizer < 5 ? 'low' : ''}">
                        <span class="supply-icon">🌿</span>
                        <span class="supply-name">Fertilizer</span>
                        <span class="supply-value">${plantationResources.supplies.fertilizer} bags</span>
                    </div>
                    <div class="supply-item ${plantationResources.supplies.pesticide < 3 ? 'low' : ''}">
                        <span class="supply-icon">🧴</span>
                        <span class="supply-name">Pesticide</span>
                        <span class="supply-value">${plantationResources.supplies.pesticide} cans</span>
                    </div>
                    <div class="supply-item">
                        <span class="supply-icon">🌱</span>
                        <span class="supply-name">Arabica Seedlings</span>
                        <span class="supply-value">${plantationResources.supplies.seedlings.arabica}</span>
                    </div>
                    <div class="supply-item">
                        <span class="supply-icon">🌱</span>
                        <span class="supply-name">Robusta Seedlings</span>
                        <span class="supply-value">${plantationResources.supplies.seedlings.robusta}</span>
                    </div>
                </div>
            </div>

            ${totalGreen > 0 ? `<button class="dash-action-btn sell-btn" onclick="closeDashboard(); openSellModal();">Sell Coffee (₹${Math.round(totalValue).toLocaleString('en-IN')})</button>` : ''}
        </div>
    `;
}

function renderMarketTab() {
    // Ensure prices are current
    if (!currentMarketPrices.lastUpdated) {
        updateMarketPrices();
    }
    const prices = currentMarketPrices;
    const inv = plantationResources.inventory.greenBeans;

    // Calculate potential sale values
    const arabicaValue = (inv.arabica.MNEB * prices.arabica.MNEB) +
                         (inv.arabica.A * prices.arabica.A) +
                         (inv.arabica.B * prices.arabica.B) +
                         (inv.arabica.C * prices.arabica.C);
    const robustaValue = (inv.robusta.A * prices.robusta.A) +
                         (inv.robusta.B * prices.robusta.B) +
                         (inv.robusta.C * prices.robusta.C);
    const totalValue = arabicaValue + robustaValue;

    // Get trend indicator
    const modifier = prices.seasonModifier;
    let trendIcon = '→';
    let trendClass = 'stable';
    if (modifier >= 1.1) { trendIcon = '↑↑'; trendClass = 'high'; }
    else if (modifier >= 1.05) { trendIcon = '↑'; trendClass = 'rising'; }
    else if (modifier <= 0.9) { trendIcon = '↓↓'; trendClass = 'low'; }
    else if (modifier <= 0.95) { trendIcon = '↓'; trendClass = 'falling'; }

    return `
        <div class="market-section">
            <h3>Current Market Prices <span class="trend-${trendClass}">${trendIcon}</span></h3>
            <p class="market-modifier">Season modifier: ${(modifier * 100).toFixed(0)}%</p>
            <table class="price-table">
                <tr><th>Grade</th><th>Arabica</th><th>Robusta</th></tr>
                <tr><td>MNEB (Premium)</td><td>₹${prices.arabica.MNEB}</td><td>-</td></tr>
                <tr><td>Grade A</td><td>₹${prices.arabica.A}</td><td>₹${prices.robusta.A}</td></tr>
                <tr><td>Grade B</td><td>₹${prices.arabica.B}</td><td>₹${prices.robusta.B}</td></tr>
                <tr><td>Grade C</td><td>₹${prices.arabica.C}</td><td>₹${prices.robusta.C}</td></tr>
            </table>

            <h3>Your Inventory Value</h3>
            <div class="inventory-value">
                <p>Arabica stock value: <strong>₹${arabicaValue.toLocaleString('en-IN')}</strong></p>
                <p>Robusta stock value: <strong>₹${robustaValue.toLocaleString('en-IN')}</strong></p>
                <p class="total-value">Total: <strong>₹${totalValue.toLocaleString('en-IN')}</strong></p>
            </div>

            ${totalValue > 0 ? `<button class="dash-action-btn sell-btn" onclick="closeDashboard(); openSellModal();">Sell Coffee</button>` : '<p class="market-tip">No beans to sell. Process cherries first!</p>'}

            <div class="market-tips">
                <h4>Market Tips:</h4>
                <ul>
                    <li>Prices change daily based on season</li>
                    <li>MNEB (Mysore Nuggets Extra Bold) fetches premium prices</li>
                    <li>Monsoon and ripening seasons have higher prices</li>
                    <li>Harvest season floods the market - prices drop</li>
                </ul>
            </div>
        </div>
    `;
}

function advanceTime() {
    // Advance time in plantation mode
    const phases = ['MORNING', 'AFTERNOON', 'EVENING'];
    const currentPhaseIndex = phases.indexOf(plantation.calendar.dayPhase);

    if (currentPhaseIndex < phases.length - 1) {
        // Advance to next phase
        plantation.calendar.dayPhase = phases[currentPhaseIndex + 1];

        // Process worker tasks each phase
        if (typeof processWorkerTasks === 'function') {
            processWorkerTasks();
        }
    } else {
        // End of day - advance to next day
        advanceDay();
    }

    updatePlantationHUD();
    playInteractSound();

    // Show phase transition message
    const workerCount = plantation.workers.filter(w => w.task !== 'IDLE').length;
    const workMessage = workerCount > 0 ?
        `${workerCount} worker${workerCount > 1 ? 's' : ''} continuing their tasks.` :
        'Workers are resting.';

    showDialogue("Time Passes", [
        `It is now ${plantation.calendar.dayPhase.toLowerCase()}.`,
        workMessage
    ]);

    // Auto-save after time advances
    autoSave();
}

function advanceDay() {
    plantation.calendar.dayPhase = 'MORNING';
    plantation.calendar.day++;

    // Handle month overflow
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (plantation.calendar.day > daysInMonth[plantation.calendar.month - 1]) {
        plantation.calendar.day = 1;
        plantation.calendar.month++;

        if (plantation.calendar.month > 12) {
            plantation.calendar.month = 1;
            plantation.calendar.year++;
        }

        // Update season based on month
        updateSeason();
    }

    // Daily resource consumption
    consumeDailyResources();

    // Update plant growth
    if (typeof updatePlantGrowth === 'function') {
        updatePlantGrowth();
    }

    // Worker management - restore energy and update morale
    if (typeof restoreWorkerEnergy === 'function') {
        restoreWorkerEnergy();
    }
    if (typeof updateWorkerMorale === 'function') {
        updateWorkerMorale();
    }

    // Track worker days
    plantation.workers.forEach(w => w.daysWorked++);

    // Check for pending event effects (delayed outcomes)
    if (typeof checkPendingEffects === 'function') {
        checkPendingEffects();
    }

    // Check for random events
    checkRandomEvents();

    // Update market prices daily
    if (typeof updateMarketPrices === 'function') {
        updateMarketPrices();
    }
}

function updateSeason() {
    const month = plantation.calendar.month;
    const oldSeason = plantation.calendar.season;

    if (month >= 1 && month <= 2) {
        plantation.calendar.season = 'POST_HARVEST';
    } else if (month >= 3 && month <= 4) {
        plantation.calendar.season = 'BLOSSOM';
    } else if (month === 5) {
        plantation.calendar.season = 'PLANTING';
    } else if (month >= 6 && month <= 9) {
        plantation.calendar.season = 'MONSOON';
    } else if (month === 10) {
        plantation.calendar.season = 'RIPENING';
    } else {
        plantation.calendar.season = 'HARVEST';
    }

    // Trigger season transition animation if season changed
    if (oldSeason !== plantation.calendar.season) {
        showSeasonTransition(oldSeason, plantation.calendar.season);
    }
}

// Season transition animation overlay
function showSeasonTransition(oldSeason, newSeason) {
    const seasonInfo = SEASONS[newSeason];
    const seasonName = seasonInfo?.name || newSeason;
    const seasonColor = seasonInfo?.color || '#ffffff';

    // Create overlay element
    const overlay = document.createElement('div');
    overlay.id = 'season-transition-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: ${seasonColor};
        opacity: 0;
        z-index: 10000;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        pointer-events: none;
        transition: opacity 0.5s ease;
    `;

    // Season icon based on type
    const seasonIcons = {
        'POST_HARVEST': '🌿',
        'BLOSSOM': '🌸',
        'PLANTING': '🌱',
        'MONSOON': '🌧️',
        'RIPENING': '🍒',
        'HARVEST': '☕'
    };

    const seasonDescriptions = {
        'POST_HARVEST': 'Time to prune and process remaining beans',
        'BLOSSOM': 'Watch for the flowering showers!',
        'PLANTING': 'Perfect time to plant new seedlings',
        'MONSOON': 'The rains bring growth to the estate',
        'RIPENING': 'The cherries are developing nicely',
        'HARVEST': 'Time to pick the ripe coffee cherries!'
    };

    overlay.innerHTML = `
        <div style="font-size: 80px; margin-bottom: 20px; animation: seasonBounce 0.6s ease;">${seasonIcons[newSeason] || '🌴'}</div>
        <div style="font-size: 48px; font-weight: bold; color: #1a1a2e; text-shadow: 2px 2px 4px rgba(255,255,255,0.5); margin-bottom: 10px;">${seasonName}</div>
        <div style="font-size: 20px; color: #333; max-width: 400px; text-align: center;">${seasonDescriptions[newSeason] || ''}</div>
    `;

    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes seasonBounce {
            0% { transform: scale(0) rotate(-20deg); }
            50% { transform: scale(1.2) rotate(10deg); }
            100% { transform: scale(1) rotate(0deg); }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(overlay);

    // Play season change sound and track achievement
    PlantationSounds.playSeasonTransition();
    achievements.checkSeason(newSeason);

    // Update ambient sounds for new season
    PlantationSounds.updateAmbient(newSeason, plantation.calendar.dayPhase);

    // Animate in
    setTimeout(() => {
        overlay.style.opacity = '0.95';
    }, 50);

    // Animate out and remove
    setTimeout(() => {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.remove();
            style.remove();

            // Show Dad's seasonal advice
            showSeasonAdvice(newSeason);
        }, 500);
    }, 2500);
}

function playSeasonChangeSound(season) {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    // Create a pleasant chime for season change
    const frequencies = {
        'POST_HARVEST': [392, 494, 587],    // G major
        'BLOSSOM': [523, 659, 784],          // C major high
        'PLANTING': [330, 415, 494],         // E major
        'MONSOON': [294, 370, 440],          // D major
        'RIPENING': [349, 440, 523],         // F major
        'HARVEST': [440, 554, 659]           // A major
    };

    const freqs = frequencies[season] || [440, 554, 659];

    freqs.forEach((freq, i) => {
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.type = 'sine';
        oscillator.frequency.value = freq;

        gainNode.gain.setValueAtTime(0, audioCtx.currentTime + i * 0.15);
        gainNode.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + i * 0.15 + 0.1);
        gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + i * 0.15 + 0.8);

        oscillator.start(audioCtx.currentTime + i * 0.15);
        oscillator.stop(audioCtx.currentTime + i * 0.15 + 0.8);
    });
}

function showSeasonAdvice(season) {
    const advice = {
        'POST_HARVEST': [
            'Dad says: "The harvest is done, but our work continues!"',
            '"This is the time to prune the plants and process any remaining beans."',
            '"Make sure the processing shed is clean and ready."'
        ],
        'BLOSSOM': [
            'Dad says: "Ah, blossom season! My favorite time of year."',
            '"Watch the sky - when the blossom showers come, our plants will flower."',
            '"The fragrance of coffee flowers is unforgettable!"'
        ],
        'PLANTING': [
            'Dad says: "The pre-monsoon rains make this perfect planting weather."',
            '"If you want to expand the estate, now is the time to plant seedlings."',
            '"Young plants need extra care and water."'
        ],
        'MONSOON': [
            'Dad says: "The monsoon brings life to our estate!"',
            '"Watch for pests - the wet weather can bring problems."',
            '"The berries will develop well with all this rain."'
        ],
        'RIPENING': [
            'Dad says: "Look at those berries turning color!"',
            '"Soon they\'ll be ready for harvest. Start preparing."',
            '"Make sure we have enough workers lined up."'
        ],
        'HARVEST': [
            'Dad says: "This is what we\'ve been waiting for all year!"',
            '"Pick only the ripe red cherries - quality matters!"',
            '"It\'s going to be busy, but the rewards are worth it."'
        ]
    };

    const messages = advice[season] || ['A new season begins on the estate.'];
    showDialogue('Season Change', messages);
}

function consumeDailyResources() {
    // Water consumption
    const workerWater = plantation.workers.length * plantationResources.water.dailyUsagePerWorker;
    const plantWater = (plantation.calendar.season !== 'MONSOON') ?
        (plantation.plants.arabica.length + plantation.plants.robusta.length) * plantationResources.water.dailyUsagePerPlant : 0;

    plantationResources.water.stored = Math.max(0, plantationResources.water.stored - workerWater - plantWater);

    // Power consumption (if on generator)
    if (!plantationResources.power.gridAvailable) {
        plantationResources.power.generatorFuel = Math.max(0,
            plantationResources.power.generatorFuel - plantationResources.power.dailyFuelConsumption);
    }

    // Pay workers every 7 days
    if (plantation.calendar.day % 7 === 0 && plantation.workers.length > 0) {
        let totalWages = 0;
        plantation.workers.forEach(worker => {
            const workerType = WORKER_TYPES[worker.type];
            if (workerType) {
                totalWages += workerType.wage * 7;
            }
        });

        if (plantationResources.money >= totalWages) {
            // Can afford wages - pay normally
            plantationResources.money -= totalWages;
            showDialogue('Payday', [
                `Weekly wages paid: ₹${totalWages.toLocaleString('en-IN')}`,
                `Remaining balance: ₹${plantationResources.money.toLocaleString('en-IN')}`
            ]);
        } else if (plantationResources.money > 0) {
            // Partial payment - workers get unhappy
            const partialPay = plantationResources.money;
            plantationResources.money = 0;
            plantation.workers.forEach(w => {
                w.morale = Math.max(10, w.morale - 25);
            });
            showDialogue('Wage Crisis!', [
                `You owed ₹${totalWages.toLocaleString('en-IN')} but only had ₹${partialPay.toLocaleString('en-IN')}.`,
                'Workers received partial pay. Morale has dropped significantly!',
                'Sell coffee or cut costs to avoid losing workers.'
            ]);
        } else {
            // No money - workers very unhappy, some may leave
            plantation.workers.forEach(w => {
                w.morale = Math.max(5, w.morale - 40);
            });
            // Fire workers with very low morale
            const leavingWorkers = plantation.workers.filter(w => w.morale <= 10);
            if (leavingWorkers.length > 0) {
                plantation.workers = plantation.workers.filter(w => w.morale > 10);
                showDialogue('Workers Leaving!', [
                    `You couldn't pay wages of ₹${totalWages.toLocaleString('en-IN')}.`,
                    `${leavingWorkers.length} worker(s) have left due to unpaid wages!`,
                    'Remaining workers are very unhappy. Sell coffee urgently!'
                ]);
            } else {
                showDialogue('Wage Crisis!', [
                    `You couldn't pay wages of ₹${totalWages.toLocaleString('en-IN')}.`,
                    'Workers are very unhappy! They may leave soon.',
                    'Sell coffee beans to pay your workers!'
                ]);
            }
        }
    }
}

// =============================================
// PLANT GROWTH SYSTEM
// =============================================

const PLANT_STAGES = {
    SEEDLING: { minDays: 60, maxDays: 90, nextStage: 'YOUNG' },
    YOUNG: { minDays: 180, maxDays: 270, nextStage: 'MATURE' },
    MATURE: { minDays: 0, maxDays: 0, nextStage: 'FLOWERING' }, // Triggered by season
    FLOWERING: { minDays: 7, maxDays: 14, nextStage: 'GREEN_BERRY' },
    GREEN_BERRY: { minDays: 120, maxDays: 150, nextStage: 'RIPE' },
    RIPE: { minDays: 14, maxDays: 21, nextStage: 'OVERRIPE' },
    OVERRIPE: { minDays: 14, maxDays: 28, nextStage: 'DEAD' },
    DISEASED: { minDays: 0, maxDays: 0, nextStage: null }
};

function updatePlantGrowth() {
    // Update all plants
    [...plantation.plants.arabica, ...plantation.plants.robusta].forEach(plant => {
        if (plant.stage === 'DISEASED' || plant.stage === 'DEAD') return;

        plant.daysInStage++;

        // Update health based on water
        if (plant.waterLevel < 30) {
            plant.health -= 2;
        } else if (plant.waterLevel > 80) {
            plant.health = Math.min(100, plant.health + 0.5);
        }

        // Reduce water level daily (unless monsoon)
        if (plantation.calendar.season !== 'MONSOON') {
            plant.waterLevel = Math.max(0, plant.waterLevel - 3);
        } else {
            plant.waterLevel = Math.min(100, plant.waterLevel + 5);
        }

        // Check for stage progression
        const stageInfo = PLANT_STAGES[plant.stage];
        if (!stageInfo) return;

        // Special case for MATURE - only flowers during blossom season
        if (plant.stage === 'MATURE') {
            if (plantation.calendar.season === 'BLOSSOM' && Math.random() < 0.1) {
                plant.stage = 'FLOWERING';
                plant.daysInStage = 0;
                // Visual effect for flowering
                if (plant.x !== undefined && plant.y !== undefined) {
                    visualEffects.addPlantGrowthAnimation(plant.x, plant.y);
                }
            }
            return;
        }

        // Normal stage progression
        if (stageInfo.nextStage && plant.daysInStage >= stageInfo.minDays) {
            const progressChance = (plant.daysInStage - stageInfo.minDays) /
                                   (stageInfo.maxDays - stageInfo.minDays);
            if (Math.random() < progressChance * 0.3) {
                const oldStage = plant.stage;
                plant.stage = stageInfo.nextStage;
                plant.daysInStage = 0;

                // Visual effect for growth
                if (plant.x !== undefined && plant.y !== undefined) {
                    visualEffects.addPlantGrowthAnimation(plant.x, plant.y);
                }

                // Calculate yield when ripening
                if (stageInfo.nextStage === 'RIPE') {
                    plant.yield = calculatePlantYield(plant);
                }
            }
        }

        // Force progression if past max days
        if (stageInfo.nextStage && plant.daysInStage > stageInfo.maxDays) {
            plant.stage = stageInfo.nextStage;
            plant.daysInStage = 0;
            if (stageInfo.nextStage === 'RIPE') {
                plant.yield = calculatePlantYield(plant);
            }
        }

        // Health check - diseased if too low
        if (plant.health < 20) {
            plant.stage = 'DISEASED';
        }
    });

    // Check for full bloom achievement
    const allPlants = [...plantation.plants.arabica, ...plantation.plants.robusta];
    const maturePlants = allPlants.filter(p => p.stage !== 'SEEDLING' && p.stage !== 'YOUNG');
    if (maturePlants.length > 0) {
        achievements.checkFlowering(maturePlants);
    }

    // Update the map tiles to reflect plant stages
    updatePlantationMapTiles();
}

function calculatePlantYield(plant) {
    // Base yield: 2-5 kg per plant
    let baseYield = 2 + Math.random() * 3;

    // Modify by health
    baseYield *= (plant.health / 100);

    // Modify by water level
    if (plant.waterLevel > 60) {
        baseYield *= 1.1;
    } else if (plant.waterLevel < 30) {
        baseYield *= 0.7;
    }

    // Arabica yields less but higher quality
    if (plant.type === 'arabica') {
        baseYield *= 0.8;
    }

    return Math.round(baseYield * 10) / 10;
}

function updatePlantationMapTiles() {
    // Update all plants to sync their stage with the map tile
    [...plantation.plants.arabica, ...plantation.plants.robusta].forEach(plant => {
        if (plant.x !== undefined && plant.y !== undefined) {
            syncPlantToMap(plant);
        }
    });
}

function waterPlant(plantIndex, plantType) {
    const plants = plantType === 'arabica' ? plantation.plants.arabica : plantation.plants.robusta;
    if (plants[plantIndex]) {
        plants[plantIndex].waterLevel = Math.min(100, plants[plantIndex].waterLevel + 30);
        plantationResources.water.stored -= 10;
        return true;
    }
    return false;
}

function harvestPlant(plantIndex, plantType) {
    const plants = plantType === 'arabica' ? plantation.plants.arabica : plantation.plants.robusta;
    const plant = plants[plantIndex];

    if (!plant || (plant.stage !== 'RIPE' && plant.stage !== 'OVERRIPE')) {
        return { success: false, message: "This plant isn't ready for harvest." };
    }

    const yield = plant.yield || calculatePlantYield(plant);
    const quality = plant.stage === 'RIPE' ? 1.0 : 0.6; // Overripe = lower quality

    // Add to inventory
    plantationResources.inventory.cherries[plantType] += yield;

    // Reset plant to mature stage for next cycle
    plant.stage = 'MATURE';
    plant.daysInStage = 0;
    plant.yield = 0;

    return {
        success: true,
        yield: yield,
        quality: quality,
        message: `Harvested ${yield.toFixed(1)}kg of ${plantType} cherries!`
    };
}

function checkRandomEvents() {
    // Resource warnings (always check these)
    if (plantationResources.water.stored < 500 && !plantation.shownTips.has('lowWater')) {
        plantation.shownTips.add('lowWater');
        showDialogue("Dad", [
            "Water is running low!",
            "You should order a water tanker or wait for the monsoon.",
            "Visit the Phone Booth to order supplies."
        ]);
        return; // Don't stack events
    }

    if (plantationResources.money < 5000 && !plantation.shownTips.has('criticalMoney')) {
        plantation.shownTips.add('criticalMoney');
        showDialogue("Dad (Urgent!)", [
            "We're almost out of money!",
            "If we can't pay workers, they'll leave.",
            "Sell coffee NOW - even lower grades will help!",
            "Go to Dashboard > Market to sell beans."
        ]);
        return;
    }

    if (plantationResources.money < 10000 && !plantation.shownTips.has('lowMoney')) {
        plantation.shownTips.add('lowMoney');
        showDialogue("Dad", [
            "We're running low on funds.",
            "Try selling some of our processed coffee beans.",
            "Visit the Notice Board to see market prices!"
        ]);
        return;
    }

    // Warn about upcoming wage payment
    const weeklyWages = calculateWeeklyWageBill();
    if (weeklyWages > 0 && plantation.calendar.day % 7 === 6 && plantationResources.money < weeklyWages && !plantation.shownTips.has('wageWarning')) {
        plantation.shownTips.add('wageWarning');
        showDialogue("Dad", [
            "Payday is tomorrow!",
            `You need ₹${weeklyWages.toLocaleString('en-IN')} for wages.`,
            `You only have ₹${plantationResources.money.toLocaleString('en-IN')}.`,
            "Sell coffee beans or workers will be unhappy!"
        ]);
        return;
    }

    // Check for random Coorg events
    const currentSeason = plantation.calendar.season;
    const currentDay = `${plantation.calendar.year}-${plantation.calendar.month}-${plantation.calendar.day}`;

    // Only check once per day
    if (lastEventCheck === currentDay) return;
    lastEventCheck = currentDay;

    // Reset triggered events at start of each season
    const seasonKey = `${currentSeason}-${plantation.calendar.year}`;
    if (!triggeredEvents.has('season_' + seasonKey)) {
        triggeredEvents.clear();
        triggeredEvents.add('season_' + seasonKey);
    }

    // Gather all possible events for current season
    const possibleEvents = [];

    for (const category of Object.keys(COORG_EVENTS)) {
        for (const eventKey of Object.keys(COORG_EVENTS[category])) {
            const event = COORG_EVENTS[category][eventKey];
            if (event.seasons.includes(currentSeason) && !triggeredEvents.has(event.id)) {
                possibleEvents.push({ ...event, category });
            }
        }
    }

    // Check each event against its probability
    for (const event of possibleEvents) {
        if (Math.random() < event.chance) {
            triggeredEvents.add(event.id);
            showPlantationEvent(event);
            return; // Only one event per day
        }
    }
}

function showPlantationEvent(event) {
    const eventModal = document.getElementById('plantation-event');
    const eventTitle = document.getElementById('event-title');
    const eventDescription = document.getElementById('event-description');
    const dadTip = document.getElementById('dad-tip-text');
    const optionsContainer = document.getElementById('event-options');

    if (!eventModal || !eventTitle || !eventDescription || !optionsContainer) {
        console.error('Event modal elements not found');
        return;
    }

    // Set content
    eventTitle.textContent = event.title;
    eventDescription.textContent = event.description;
    if (dadTip) dadTip.textContent = event.dadTip;

    // Clear and add option buttons
    optionsContainer.innerHTML = '';
    event.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'event-option-btn';
        btn.innerHTML = `
            <span class="option-label">${option.label}</span>
            <span class="option-desc">${option.description}</span>
        `;

        // Check if player can afford this option
        if (option.cost > plantationResources.money) {
            btn.disabled = true;
            btn.classList.add('disabled');
            btn.title = 'Not enough money';
        }

        btn.addEventListener('click', () => handleEventOption(event, option));
        optionsContainer.appendChild(btn);
    });

    // Show modal and set state
    eventModal.classList.remove('hidden');
    gameState = STATES.PLANTATION_EVENT;

    // Style based on event type and play appropriate sound
    if (event.isPositive) {
        eventModal.classList.add('positive');
        PlantationSounds.playCoinSound();
    } else {
        eventModal.classList.remove('positive');
        PlantationSounds.playEventAlert();
    }
}

function handleEventOption(event, option) {
    // Deduct cost
    if (option.cost > 0) {
        plantationResources.money -= option.cost;
    }

    // Get the effect details
    const effectDetails = event.effects[option.effect];

    // Store pending effect for delayed effects
    if (effectDetails.delay && effectDetails.delay > 0) {
        pendingEventEffect = {
            effect: effectDetails,
            daysRemaining: effectDetails.delay,
            event: event
        };
    } else {
        // Apply immediate effects
        applyEventEffect(effectDetails, event);
    }

    // Hide event modal
    const eventModal = document.getElementById('plantation-event');
    if (eventModal) eventModal.classList.add('hidden');

    // Show result message
    showDialogue("Result", [effectDetails.message]);

    // Update HUD
    updatePlantationHUD();
}

function applyEventEffect(effect, event) {
    // Water effects
    if (effect.water) {
        plantationResources.water.stored = Math.min(
            plantationResources.water.tankCapacity,
            plantationResources.water.stored + effect.water
        );
    }

    // Damage to plants (percentage)
    if (effect.damage) {
        const allPlants = [...plantation.plants.arabica, ...plantation.plants.robusta];
        const plantsToAffect = Math.floor(allPlants.length * effect.damage);

        for (let i = 0; i < plantsToAffect; i++) {
            const plant = allPlants[Math.floor(Math.random() * allPlants.length)];
            if (plant) {
                plant.health = Math.max(10, plant.health - 30);
                // If health gets too low, plant becomes diseased
                if (plant.health < 30) {
                    plant.stage = 'DISEASED';
                    syncPlantToMap(plant);
                }
            }
        }
    }

    // Worker morale effects
    if (effect.workerMorale) {
        plantation.workers.forEach(worker => {
            worker.morale = Math.min(100, Math.max(0, worker.morale + effect.workerMorale));
        });
    }

    // Power outage
    if (effect.powerOut) {
        plantationResources.power.gridAvailable = false;
        // Will be restored after delay days
        setTimeout(() => {
            plantationResources.power.gridAvailable = true;
        }, effect.powerOut * 10000); // Simplified for game time
    }

    // Trigger flowering for all mature plants (blossom showers)
    if (effect.triggerFlowering) {
        const maturePlants = [...plantation.plants.arabica, ...plantation.plants.robusta]
            .filter(p => p.stage === 'MATURE');

        maturePlants.forEach(plant => {
            plant.stage = 'FLOWERING';
            plant.daysInStage = 0;
            syncPlantToMap(plant);
        });
    }

    // Price bonus for sales
    if (effect.priceBonus) {
        plantation.priceBonus = (plantation.priceBonus || 0) + effect.priceBonus;
        if (effect.recurring) {
            plantation.recurringBuyer = true;
        }
    }

    // Plant health reduction (for drought)
    if (effect.plantHealth) {
        plantation.plants.arabica.forEach(p => p.health = Math.max(10, p.health + effect.plantHealth));
        plantation.plants.robusta.forEach(p => p.health = Math.max(10, p.health + effect.plantHealth));
    }

    // Water consumption reduction (mulching)
    if (effect.waterReduction) {
        plantationResources.water.dailyUsagePerPlant *= (1 - effect.waterReduction);
    }

    // Worker changes
    if (effect.workers) {
        // Add temporary workers
        for (let i = 0; i < effect.workers; i++) {
            if (plantation.workers.length < plantation.maxWorkers) {
                plantation.workers.push({
                    id: Date.now() + i,
                    type: 'PICKER',
                    name: getRandomKodavaName(),
                    wage: effect.wageIncrease ? 720 : 600,
                    morale: 70,
                    energy: 100,
                    efficiency: 0.7 + Math.random() * 0.2
                });
            }
        }
    }

    // Worker loss
    if (effect.workerLoss) {
        for (let i = 0; i < effect.workerLoss && plantation.workers.length > 0; i++) {
            plantation.workers.pop();
        }
    }

    // Inventory loss (rain damage to drying beans)
    if (effect.inventoryLoss) {
        const loss = effect.inventoryLoss;
        plantationResources.inventory.parchment.arabica *= (1 - loss);
        plantationResources.inventory.parchment.robusta *= (1 - loss);
    }

    // Luck bonus (affects future random events positively)
    if (effect.luck) {
        plantation.luckBonus = (plantation.luckBonus || 0) + effect.luck;
    }

    // Money effect
    if (effect.money) {
        plantationResources.money += effect.money;
    }

    // Permanent protection (fencing, etc.)
    if (effect.permanent) {
        plantation.permanentProtection = plantation.permanentProtection || [];
        plantation.permanentProtection.push(event.id);
    }
}

// Check for pending effects at start of each day
function checkPendingEffects() {
    if (pendingEventEffect) {
        pendingEventEffect.daysRemaining--;
        if (pendingEventEffect.daysRemaining <= 0) {
            applyEventEffect(pendingEventEffect.effect, pendingEventEffect.event);
            showDialogue("Update", [pendingEventEffect.effect.message]);
            pendingEventEffect = null;
        }
    }
}

// Helper function for random Kodava names
function getRandomKodavaName() {
    const names = [
        'Somanna', 'Ponnappa', 'Bopanna', 'Muthanna', 'Chengappa',
        'Appanna', 'Kuttappa', 'Narayanappa', 'Devaiah', 'Machaiah',
        'Kaveri', 'Nandini', 'Ganga', 'Lakshmi', 'Parvathi',
        'Subbamma', 'Puttamma', 'Ammani', 'Thimmakka', 'Chandramma'
    ];
    return names[Math.floor(Math.random() * names.length)];
}

// Dashboard tab click handlers
document.querySelectorAll('.dash-tab').forEach(tab => {
    tab.addEventListener('click', () => showDashboardTab(tab.dataset.tab));
});

function updateLocationLabel() {
    if (locationLabel) {
        if (currentMap === MAPS.EXTERIOR) {
            locationLabel.textContent = 'Estate Grounds';
        } else if (currentMap === MAPS.INTERIOR) {
            locationLabel.textContent = 'Inside the House';
        } else if (currentMap === MAPS.LAKE) {
            locationLabel.textContent = 'Lake & Paddy Fields';
        } else if (currentMap === MAPS.SHED) {
            locationLabel.textContent = 'Storage Shed';
        } else if (currentMap === MAPS.PLANTATION) {
            locationLabel.textContent = 'Coffee Plantation';
        }
    }
}

function updateGameContainerSize() {
    if (gameContainer) {
        if (currentMap === MAPS.EXTERIOR) {
            gameContainer.style.width = EXTERIOR_CANVAS_WIDTH + 'px';
            gameContainer.style.height = EXTERIOR_CANVAS_HEIGHT + 'px';
        } else if (currentMap === MAPS.LAKE) {
            gameContainer.style.width = LAKE_CANVAS_WIDTH + 'px';
            gameContainer.style.height = LAKE_CANVAS_HEIGHT + 'px';
        } else if (currentMap === MAPS.SHED) {
            gameContainer.style.width = SHED_CANVAS_WIDTH + 'px';
            gameContainer.style.height = SHED_CANVAS_HEIGHT + 'px';
        } else if (currentMap === MAPS.PLANTATION) {
            gameContainer.style.width = PLANTATION_CANVAS_WIDTH + 'px';
            gameContainer.style.height = PLANTATION_CANVAS_HEIGHT + 'px';
        } else {
            gameContainer.style.width = INTERIOR_CANVAS_WIDTH + 'px';
            gameContainer.style.height = INTERIOR_CANVAS_HEIGHT + 'px';
        }
    }
}

// =============================================
// INTERACTION SYSTEM
// =============================================

function getFacingTile() {
    const centerX = player.x + player.width / 2;
    const centerY = player.y + player.height / 2;

    let targetX = centerX;
    let targetY = centerY;

    switch (player.direction) {
        case 'up': targetY -= TILE_SIZE; break;
        case 'down': targetY += TILE_SIZE; break;
        case 'left': targetX -= TILE_SIZE; break;
        case 'right': targetX += TILE_SIZE; break;
    }

    const tileX = Math.floor(targetX / TILE_SIZE);
    const tileY = Math.floor(targetY / TILE_SIZE);

    return {
        x: tileX,
        y: tileY,
        type: getTileAt(targetX, targetY)
    };
}

function interact() {
    const facing = getFacingTile();

    if (currentMap === MAPS.EXTERIOR) {
        handleExteriorInteraction(facing);
    } else if (currentMap === MAPS.LAKE) {
        handleLakeInteraction(facing);
    } else if (currentMap === MAPS.SHED) {
        handleShedInteraction(facing);
    } else if (currentMap === MAPS.PLANTATION) {
        handlePlantationInteraction(facing);
    } else {
        handleInteriorInteraction(facing);
    }
}

function handleExteriorInteraction(facing) {
    switch (facing.type) {
        case EXT_TILES.HOUSE_ENTRANCE:
            showDialogue('House Entrance', ENTRANCE_DIALOGUE, () => {
                transitionToInterior();
            });
            break;

        case EXT_TILES.GATE:
            showDialogue('Estate Gate', GATE_DIALOGUE);
            break;

        case EXT_TILES.WELL:
            handleClueInteraction('WELL', CLUE_DATA.WELL);
            break;

        case EXT_TILES.JACKFRUIT_TREE:
            handleClueInteraction('JACKFRUIT', CLUE_DATA.JACKFRUIT);
            break;

        case EXT_TILES.SAFE:
            handleSafeInteraction();
            break;

        case EXT_TILES.WITHERED_TREE:
            playInteractSound();
            if (player.hasAxe) {
                // Player has axe - cut down the tree and reveal carving
                player.foundTreeCarving = true;
                showDialogue('Withered Tree', [
                    '{NAME} swings the axe at the brittle branches...',
                    'CRACK! The withered tree falls apart!',
                    'Wait... there\'s something carved into the trunk!',
                    'Old letters, weathered but still readable:',
                    '"20__ - The year our love began"',
                    'Grandfather must have carved this! The first two digits of a year...'
                ]);
                // Remove the withered tree (replace with cleared land)
                EXTERIOR_MAP[facing.y][facing.x] = EXT_TILES.CLEARED_LAND;
            } else {
                showDialogue('Withered Tree', [
                    'An old, withered tree blocks the path to the coffee estate.',
                    'Its dried branches are tangled but brittle.',
                    'Strange... there seem to be some old carvings on the trunk.',
                    'If only you had something sharp to cut it down...'
                ]);
            }
            break;

        case EXT_TILES.CAT:
            playInteractSound();
            // Brown cat near the well, gray cat elsewhere
            if (facing.x === 17 && facing.y === 2) {
                showDialogue('Brown Cat', [
                    'A beautiful brown cat sits watchfully near the well.',
                    'She keeps a protective eye on her kitten nearby.',
                    'She purrs warmly as you approach.'
                ]);
            } else {
                showDialogue('Estate Cat', [
                    'A lazy gray cat lounges in the warm sun.',
                    'It purrs contentedly and stretches.',
                    'These estate cats help keep the mice away from the coffee stores.'
                ]);
            }
            break;

        case EXT_TILES.KITTEN:
            playInteractSound();
            showDialogue('Kitten', [
                'Mew! Mew!',
                'The tiny kitten plays in the warm sunshine.',
                'It pounces on a fallen leaf and tumbles over.',
                'So adorable!'
            ]);
            break;

        case EXT_TILES.NPC_DAD:
            playInteractSound();
            if (!player.heardMysteryStory) {
                // First time - introduce the mystery
                player.heardMysteryStory = true;
                showDialogue('Dad', [
                    'Oh, {NAME}! Welcome to the estate.',
                    'You know, grandmother has been asking about her ring again.',
                    'When her memory started fading, she would misplace things...',
                    'One day she almost lost her wedding ring. Grandfather was so worried.',
                    'He hid it somewhere safe... a special place on the estate.',
                    'He left little clues around, hoping she\'d get better and find it.',
                    'But she never did... and then grandfather passed away.',
                    'He never told anyone where it was hidden.',
                    'Oh! By the way, Snowy is missing. My white cat ran off again!',
                    'She loves the coffee estate. Could you find her for me?',
                    'Maybe she knows where some of grandfather\'s clues are hidden...'
                ]);
            } else if (!player.foundSnowy) {
                showDialogue('Dad', [
                    'Still looking for Snowy?',
                    'She loves hiding in the pepper vines in the coffee estate.',
                    'You\'ll need to cut through that withered tree blocking the path.',
                    'Check the shed behind the kitchen - there\'s a back door that leads to it.'
                ]);
            } else if (player.foundSnowy && !player.caughtLakeSafe) {
                showDialogue('Dad', [
                    'You found Snowy! Thank you so much!',
                    'You know, grandfather spent his last days at the lake.',
                    'He would sit there for hours, lost in memories.',
                    'I think... the ring might have something to do with the lake.',
                    'If you find all the clues, maybe you can solve this mystery!',
                    'Feel free to sell some coffee if you need money for anything.'
                ]);
            } else {
                showDialogue('Dad', [
                    'Did you find something in the lake?',
                    'Use the clues you\'ve gathered to figure out the combination!',
                    'Grandmother would be so happy to have her ring back...',
                    'She asks about it every single day.'
                ]);
            }
            break;

        case EXT_TILES.WHITE_CAT:
            playInteractSound();
            if (!player.foundSnowy) {
                player.foundSnowy = true;
                player.foundCollarClue = true;
                showDialogue('White Cat', [
                    'You spot something white hiding behind the pepper vine!',
                    'It\'s Snowy! Dad\'s lost white cat!',
                    'She peers at you with curious blue eyes... Meow!',
                    'Wait, there\'s a tiny scroll attached to her collar!',
                    '{NAME} carefully unfolds the yellowed paper...',
                    '"My dearest, the year ends in twenty-six, our lucky number."',
                    'Twenty-six! This must be another clue from grandfather!',
                    'Snowy seems proud of her secret. You should tell Dad!'
                ]);
            } else {
                showDialogue('White Cat', [
                    'Snowy purrs contentedly.',
                    'She nuzzles against your hand.',
                    'The little scroll on her collar reminds you: "twenty-six"'
                ]);
            }
            break;

        case EXT_TILES.COFFEE_BEANS:
            playInteractSound();
            if (player.foundSnowy) {
                // Player found Snowy, Dad is happy and allows selling
                showDialogue('Drying Coffee Beans', [
                    'Bright red coffee cherries spread out to dry in the sun.',
                    'These could fetch a good price at the market...',
                    'You reach toward the cherries...'
                ], () => {
                    // Move Dad to near the player
                    if (EXTERIOR_MAP[4][16] === EXT_TILES.NPC_DAD) {
                        EXTERIOR_MAP[4][16] = EXT_TILES.CLEARED_LAND;
                    }
                    const playerTileX = Math.floor(player.x / TILE_SIZE);
                    const playerTileY = Math.floor(player.y / TILE_SIZE);
                    const tryPositions = [
                        {x: playerTileX - 1, y: playerTileY},
                        {x: playerTileX + 1, y: playerTileY},
                        {x: playerTileX, y: playerTileY - 1},
                        {x: playerTileX, y: playerTileY + 1}
                    ];
                    for (const pos of tryPositions) {
                        if (pos.x >= 0 && pos.x < EXTERIOR_WIDTH && pos.y >= 0 && pos.y < EXTERIOR_HEIGHT) {
                            const tile = EXTERIOR_MAP[pos.y][pos.x];
                            if (tile === EXT_TILES.CLEARED_LAND || tile === EXT_TILES.DIRT_PATH) {
                                EXTERIOR_MAP[pos.y][pos.x] = EXT_TILES.NPC_DAD;
                                break;
                            }
                        }
                    }
                    showDialogue('Dad', [
                        'Oh! You want to help sell the coffee?',
                        'You know what, since you found Snowy for me...',
                        'Go ahead! Sell some cherries online.',
                        'Thanks for finding my cat. She means the world to me.',
                        'Dad smiles and heads back to the cats.'
                    ], () => {
                        // Move Dad back first
                        for (let y = 0; y < EXTERIOR_HEIGHT; y++) {
                            for (let x = 0; x < EXTERIOR_WIDTH; x++) {
                                if (EXTERIOR_MAP[y][x] === EXT_TILES.NPC_DAD && !(y === 4 && x === 16)) {
                                    EXTERIOR_MAP[y][x] = EXT_TILES.CLEARED_LAND;
                                }
                            }
                        }
                        EXTERIOR_MAP[4][16] = EXT_TILES.NPC_DAD;

                        // Open quantity selection modal
                        openQuantityModal();
                    });
                });
            } else {
                // Player hasn't found Snowy yet, Dad stops them
                showDialogue('Drying Coffee Beans', [
                    'Bright red coffee cherries spread out to dry in the sun.',
                    'Hmm... these could fetch a good price at the market...',
                    'Maybe you should try to sell them?',
                    'You reach toward the cherries...'
                ], () => {
                    // Move Dad to near the player
                    if (EXTERIOR_MAP[4][16] === EXT_TILES.NPC_DAD) {
                        EXTERIOR_MAP[4][16] = EXT_TILES.CLEARED_LAND;
                    }
                    const playerTileX = Math.floor(player.x / TILE_SIZE);
                    const playerTileY = Math.floor(player.y / TILE_SIZE);
                    const tryPositions = [
                        {x: playerTileX - 1, y: playerTileY},
                        {x: playerTileX + 1, y: playerTileY},
                        {x: playerTileX, y: playerTileY - 1},
                        {x: playerTileX, y: playerTileY + 1}
                    ];
                    for (const pos of tryPositions) {
                        if (pos.x >= 0 && pos.x < EXTERIOR_WIDTH && pos.y >= 0 && pos.y < EXTERIOR_HEIGHT) {
                            const tile = EXTERIOR_MAP[pos.y][pos.x];
                            if (tile === EXT_TILES.CLEARED_LAND || tile === EXT_TILES.DIRT_PATH) {
                                EXTERIOR_MAP[pos.y][pos.x] = EXT_TILES.NPC_DAD;
                                break;
                            }
                        }
                    }
                    showDialogue('Dad', [
                        'Whoa whoa whoa! What do you think you\'re doing?!',
                        'These cherries aren\'t ready to sell yet!',
                        'They need at least two more weeks of drying.',
                        'If we sell them now, they\'ll be too moist and won\'t roast properly.',
                        'Patience! Good coffee takes time.',
                        'Dad walks back to the cats, shaking his head.'
                    ], () => {
                        // Move Dad back to his original position
                        for (let y = 0; y < EXTERIOR_HEIGHT; y++) {
                            for (let x = 0; x < EXTERIOR_WIDTH; x++) {
                                if (EXTERIOR_MAP[y][x] === EXT_TILES.NPC_DAD && !(y === 4 && x === 16)) {
                                    EXTERIOR_MAP[y][x] = EXT_TILES.CLEARED_LAND;
                                }
                            }
                        }
                        EXTERIOR_MAP[4][16] = EXT_TILES.NPC_DAD;
                    });
                });
            }
            break;

        case EXT_TILES.AXE:
            playInteractSound();
            if (!player.hasAxe) {
                player.hasAxe = true;
                showDialogue('Found Axe!', [
                    '{NAME} picks up an old woodcutter\'s axe.',
                    'The blade is still sharp despite some rust.',
                    'This could be useful for clearing overgrown paths!'
                ]);
                // Remove axe from map (replace with cleared land)
                EXTERIOR_MAP[facing.y][facing.x] = EXT_TILES.CLEARED_LAND;
            }
            break;

        case EXT_TILES.PEPPER_TREE:
            playInteractSound();
            showDialogue('Pepper Vine', [
                'A tall pepper vine climbs up a supporting pole.',
                'Small green and black peppercorns hang in clusters.',
                'Pepper is one of the prized crops of Coorg alongside coffee.'
            ]);
            break;

        case EXT_TILES.COFFEE_PLANTATION:
            playInteractSound();
            showDialogue('Coffee Plantation', [
                'Rows of coffee plants stretch out before you.',
                'The red coffee berries glisten in the sunlight.',
                'This is the heart of the Coorg estate.'
            ]);
            break;

        case EXT_TILES.SHOVEL:
            playInteractSound();
            if (!player.hasShovel) {
                player.hasShovel = true;
                showDialogue('Found Shovel!', [
                    '{NAME} picks up an old gardening shovel.',
                    'It\'s sturdy and well-maintained.',
                    'This could be useful for digging!'
                ]);
                // Remove shovel from map (replace with cleared land)
                EXTERIOR_MAP[facing.y][facing.x] = EXT_TILES.CLEARED_LAND;
            }
            break;

        case EXT_TILES.BURIED_SAFE:
            playInteractSound();
            if (player.hasShovel) {
                // Player has shovel - dig up grandfather's journal
                if (!player.foundBuriedJournal) {
                    player.foundBuriedJournal = true;
                    showDialogue('Digging...', [
                        '{NAME} starts digging at the disturbed earth...',
                        'The shovel strikes something wrapped in oilcloth!',
                        'It\'s grandfather\'s old journal!',
                        '{NAME} carefully unwraps it and reads the final entry:',
                        '"My love, your ring rests where we spent our happiest days."',
                        '"Row to the far corner where the morning sun first touches the water."',
                        '"Cast your line there, and you shall find what was lost."',
                        '"January 11th - the day we promised forever."',
                        'January 11th! Their wedding day...',
                        'The safe is hidden in the top right corner of the lake!',
                        'Take the boat and row to the northeast part of the lake.'
                    ]);
                    // Replace with cleared land
                    EXTERIOR_MAP[facing.y][facing.x] = EXT_TILES.CLEARED_LAND;
                } else {
                    showDialogue('Dug Earth', [
                        'This is where you found grandfather\'s journal.',
                        'The safe is in the top right corner of the lake.',
                        'Row the boat to the northeast and fish there!',
                        'The code is their wedding year: 2026.'
                    ]);
                }
            } else {
                showDialogue('Disturbed Earth', [
                    'The ground here looks disturbed, like something was buried.',
                    'There are small rocks and a mound of earth...',
                    'You would need a shovel to dig here.'
                ]);
            }
            break;
    }
}

function handleInteriorInteraction(facing) {
    switch (facing.type) {
        case INT_TILES.EXIT_TO_EXTERIOR:
            transitionToExterior();
            break;

        case INT_TILES.WALL_CLOCK:
            handleClueInteraction('CLOCK', CLUE_DATA.CLOCK);
            break;

        case INT_TILES.CABINET:
            // Only the closet in Manvi's room (row 14, col 27) has the clue
            if (facing.x === 27 && facing.y === 14) {
                playInteractSound();
                if (player.boughtCamera) {
                    // Player bought camera - can now look inside and find the clue
                    if (!player.foundClosetClue) {
                        player.foundClosetClue = true;
                        showDialogue('Manvi\'s Closet', [
                            'Manvi steps aside with a smirk.',
                            '{NAME} carefully opens the antique closet...',
                            'Behind some old shawls, there\'s a hidden compartment!',
                            'Inside lies a faded photograph...',
                            'It shows grandfather and grandmother on their wedding day!',
                            'Written on the back: "January 11th, 2026 - The happiest day"',
                            'January 11th, 2026... That\'s the complete date!',
                            '2-0-2-6... could this be the combination?'
                        ]);
                    } else {
                        showDialogue('Manvi\'s Closet', [
                            'The wedding photograph shows: "January 11th, 2026"',
                            '2-0-2-6... the wedding year.'
                        ]);
                    }
                } else {
                    // Move Manvi from her original position to in front of the closet
                    // Remove Manvi from original position (26, 13)
                    if (INTERIOR_MAP[13][26] === INT_TILES.NPC_MANVI) {
                        INTERIOR_MAP[13][26] = INT_TILES.WOOD_FLOOR;
                    }
                    // Also check if she's already moved somewhere in row 14
                    for (let x = 20; x < 27; x++) {
                        if (INTERIOR_MAP[14][x] === INT_TILES.NPC_MANVI) {
                            INTERIOR_MAP[14][x] = INT_TILES.WOOD_FLOOR;
                        }
                    }
                    // Place Manvi in front of closet (col 26, not 27 where closet is)
                    INTERIOR_MAP[14][26] = INT_TILES.NPC_MANVI;
                    showDialogue('Manvi', [
                        'Hey! What do you think you\'re doing?!',
                        'Manvi rushes over and blocks the closet.',
                        'You can NOT look inside my closet!',
                        '...unless you buy me a camera.',
                        'A nice one. Worth 1.6 lakhs.',
                        'Then maybe I\'ll let you peek inside. Maybe.',
                        'Manvi crosses her arms and stares at you.'
                    ], () => {
                        showDialogue(player.name, [
                            '(1.6 lakhs... that\'s a lot of money.)',
                            '(Maybe I could sell some coffee to earn that much...)',
                            '(But Dad would never let me touch the harvest...)',
                            '(Unless I did something nice for him first.)'
                        ]);
                    });
                }
            } else if (facing.x === 10 && facing.y === 14) {
                // Main hall closet - contains the shovel
                playInteractSound();
                if (!player.hasShovel) {
                    player.hasShovel = true;
                    showDialogue('Hall Closet', [
                        '{NAME} opens the old wooden closet...',
                        'Behind some dusty coats and umbrellas...',
                        'There\'s an old gardening shovel!',
                        '{NAME} takes the shovel.',
                        'This could be useful for digging!'
                    ]);
                } else {
                    showDialogue('Hall Closet', [
                        'An old closet with coats and umbrellas.',
                        'You already took the shovel from here.'
                    ]);
                }
            } else {
                playInteractSound();
                showDialogue('Closet', ['A beautiful rosewood closet with intricate carvings.', 'Just ordinary clothes and belongings inside.']);
            }
            break;

        case INT_TILES.WALL_ART:
            if (facing.x === 2 && facing.y === 2) {
                handleClueInteraction('PHOTO', CLUE_DATA.PHOTO);
            } else {
                playInteractSound();
                showDialogue('Artwork', ['A beautiful traditional painting in the Kalamkari style.']);
            }
            break;

        case INT_TILES.COFFEE_TABLE:
            handleClueInteraction('TABLE', CLUE_DATA.TABLE);
            break;

        case INT_TILES.SOFA:
            playInteractSound();
            showDialogue('Wooden Sofa', ['A traditional wooden divan with olive green cushions.', 'It looks very comfortable...']);
            break;

        case INT_TILES.SIDE_TABLE:
            playInteractSound();
            showDialogue('Side Table', ['An antique side table with spiral-carved legs.', 'A decorative vase sits on top.']);
            break;

        case INT_TILES.SUNKEN_COURT:
            playInteractSound();
            showDialogue('Sunken Courtyard', ['The traditional "nadubane" - an open courtyard at the heart of the home.', 'A shallow pool of water reflects the skylight above.']);
            break;

        case INT_TILES.PILLAR:
            playInteractSound();
            showDialogue('White Pillar', ['A sturdy white column supporting the roof structure.', 'It frames the central courtyard beautifully.']);
            break;

        case INT_TILES.PLANT_AREA:
            playInteractSound();
            showDialogue('Indoor Plants', ['Lush tropical plants thrive in the natural light.', 'You spot an Anthurium with pink flowers.']);
            break;

        case INT_TILES.BED_TOP:
        case INT_TILES.BED_BOTTOM:
            playInteractSound();
            showDialogue('Bed', ['A comfortable bed with colorful traditional bedding.', 'The pillows look freshly fluffed.']);
            break;

        case INT_TILES.DRESSER:
            playInteractSound();
            showDialogue('Dresser', ['A wooden dresser with brass handles.', 'Family photos are arranged on top.']);
            break;

        case INT_TILES.BOOKSHELF:
            playInteractSound();
            showDialogue('Bookshelf', ['Shelves lined with old books and photo albums.', 'You see titles about coffee cultivation and Coorg history.']);
            break;

        case INT_TILES.WINDOW:
            playInteractSound();
            showDialogue('Window', ['Sunlight streams through the window.', 'You can see the coffee plantation outside.']);
            break;

        case INT_TILES.COUNTER:
            playInteractSound();
            showDialogue('Kitchen Counter', ['A clean granite counter with cooking utensils.', 'The smell of spices lingers in the air.']);
            break;

        case INT_TILES.STOVE:
            playInteractSound();
            showDialogue('Stove', ['A traditional gas stove.', 'A pot of filter coffee is brewing...']);
            break;

        case INT_TILES.SINK:
            playInteractSound();
            showDialogue('Sink', ['A stainless steel sink with running water.', 'Some dishes are drying on the rack.']);
            break;

        case INT_TILES.FRIDGE:
            playInteractSound();
            showDialogue('Refrigerator', ['A large refrigerator humming quietly.', 'Magnets with family photos cover the door.']);
            break;

        case INT_TILES.KITCHEN_TABLE:
            playInteractSound();
            showDialogue('Kitchen Table', ['A small wooden table for quick meals.', 'A bowl of fresh fruits sits in the center.']);
            break;

        case INT_TILES.DINING_TABLE:
            playInteractSound();
            showDialogue('Dining Table', ['A large wooden dining table that seats the whole family.', 'Traditional brass plates are set for the next meal.']);
            break;

        case INT_TILES.TV_STAND:
            playInteractSound();
            showDialogue('Television', ['An old CRT television on a wooden stand.', 'The news is playing softly in the background.']);
            break;

        case INT_TILES.SWING:
            playInteractSound();
            showDialogue('Traditional Swing', ['A beautiful wooden swing hanging from brass chains.', 'It sways gently... perfect for an afternoon nap.']);
            break;

        case INT_TILES.RUG:
            playInteractSound();
            showDialogue('Woven Rug', ['A hand-woven green rug with intricate patterns.', 'It adds warmth to the living area.']);
            break;

        case INT_TILES.DOORWAY:
            playInteractSound();
            showDialogue('Doorway', ['An open passage leading to another room.']);
            break;

        case INT_TILES.OUTSIDE:
            playInteractSound();
            showDialogue('Garden', ['The lush green garden surrounds the house.', 'You can smell the coffee blossoms in the air.']);
            break;

        case INT_TILES.NPC_MANVI:
            playInteractSound();
            if (player.boughtCamera) {
                showDialogue('Manvi', [
                    'Thanks for the camera! It\'s amazing!',
                    'I\'ve been taking photos of everything.',
                    'You can look in my closet anytime now.',
                    'That old photo in there is pretty interesting...'
                ]);
            } else if (player.money >= 160000) {
                // Player has enough money - offer to buy camera
                showDialogue('Manvi', [
                    'Oh? You have money now?',
                    'A camera costs ₹1,60,000...',
                    'You have ₹' + player.money.toLocaleString() + '.',
                    'Buy me a camera and I\'ll let you see inside my closet!'
                ], () => {
                    // Ask if they want to buy
                    showDialogue(player.name, [
                        '(Should I spend ₹1,60,000 on a camera for Manvi?)',
                        '(She said she\'d let me look in her closet...)',
                        '(There might be something important in there.)'
                    ], () => {
                        // Actually buy the camera
                        player.money -= 160000;
                        player.boughtCamera = true;
                        updateWallet();
                        showDialogue('Manvi', [
                            'REALLY?! You\'re buying it?!',
                            '*Manvi\'s eyes light up*',
                            'Thank you thank you thank you!',
                            'I\'ll go order it right now!',
                            '...Fine, you can look in my closet. But don\'t touch anything else!'
                        ]);
                    });
                });
            } else {
                showDialogue('Manvi', [
                    '...',
                    'Manvi just gives you a blank look.',
                    'You want to see my closet?',
                    'Buy me a camera first. ₹1,60,000.',
                    'You only have ₹' + player.money.toLocaleString() + '. Not enough.'
                ]);
            }
            break;

        case INT_TILES.NPC_MOM:
            playInteractSound();
            if (!player.hasShovel) {
                showDialogue('Mom', [
                    '"Oh! Hi sweetie, one second..."',
                    'She\'s busy tidying up.',
                    '"I\'m SO busy right now! The house won\'t clean itself!"',
                    '"Oh, by the way - if you need any gardening tools..."',
                    '"Check the hall closet near the sofas. There\'s an old shovel in there."',
                    '"Now run along, I have work to do!"'
                ]);
            } else {
                const activity = mom.activities[Math.floor(Math.random() * mom.activities.length)];
                showDialogue('Mom', [
                    '"Oh! Hi sweetie, one second..."',
                    `She's busy ${activity}.`,
                    '"I\'m SO busy right now! The house won\'t clean itself!"',
                    '"Did you eat? There\'s food in the kitchen!"',
                    'She goes back to multitasking.'
                ]);
            }
            break;

        case INT_TILES.BACK_DOOR:
            playInteractSound();
            showDialogue('Back Door', [
                '{NAME} opens the kitchen back door...',
                'It leads to a small storage shed behind the house.'
            ], () => {
                transitionToShed();
            });
            break;
    }
}

function handleLakeInteraction(facing) {
    // Check if player wants to exit boat by pressing E near land
    if (player.inBoat) {
        const landTiles = [EXT_TILES.LAKE_DOCK, EXT_TILES.LAKE_GRASS, EXT_TILES.LAKE_PATH,
                          EXT_TILES.TO_ESTATE, EXT_TILES.PADDY_FIELD];
        if (landTiles.includes(facing.type)) {
            // Exit boat onto land
            playInteractSound();

            // Place the boat at player's current water position before exiting
            const currentTileX = Math.floor((player.x + player.width / 2) / TILE_SIZE);
            const currentTileY = Math.floor((player.y + player.height / 2) / TILE_SIZE);
            LAKE_MAP[currentTileY][currentTileX] = EXT_TILES.BOAT;

            player.inBoat = false;
            // Move player to the land tile they're facing
            player.x = facing.x * TILE_SIZE;
            player.y = facing.y * TILE_SIZE;
            showDialogue('Boat', [
                'You carefully step out of the boat onto solid ground.',
                'The boat bobs gently in the water nearby.'
            ]);
            return;
        }
    }

    switch (facing.type) {
        case EXT_TILES.TO_ESTATE:
            transitionFromLake();
            break;

        case EXT_TILES.LAKE_WATER:
            playInteractSound();
            // Allow fishing (from boat or from shore)
            if (player.hasFishingRod) {
                doFishing();
                return;
            }
            if (player.caughtLakeSafe && !player.hasWeddingRing) {
                // Player caught the safe but hasn't opened it yet
                showDialogue('Lake', [
                    'You already pulled grandfather\'s safe from the lake.',
                    'Time to enter the combination!',
                    'Remember: 20 (tree) + 26 (collar) = 2026'
                ], () => {
                    openCodeModal();
                });
            } else if (player.hasWeddingRing) {
                showDialogue('Lake', [
                    'The lake where you found grandmother\'s ring.',
                    'The water sparkles peacefully in the sunlight.'
                ]);
            } else {
                showDialogue('Lake', [
                    'The crystal clear water shimmers in the sunlight.',
                    'You can see fish swimming beneath the surface.',
                    'It\'s the famous Kaakabe Lake of Coorg.'
                ]);
            }
            break;

        case EXT_TILES.LAKE_EDGE:
            playInteractSound();
            // Allow fishing from shore
            if (player.hasFishingRod) {
                doFishing();
                return;
            }
            showDialogue('Lakeshore', [
                'The muddy shore is dotted with small shells.',
                'Waterfowl tracks crisscross the soft ground.'
            ]);
            break;

        case EXT_TILES.PADDY_FIELD:
        case EXT_TILES.PADDY_WATER:
            playInteractSound();
            showDialogue('Paddy Field', [
                'Lush green rice paddy stretches before you.',
                'The flooded fields reflect the sky like mirrors.',
                'Traditional Coorg farming at its finest.'
            ]);
            break;

        case EXT_TILES.LAKE_DOCK:
            playInteractSound();
            showDialogue('Wooden Dock', [
                'A weathered wooden dock extends into the lake.',
                'An old fishing boat is tied to one of the posts.',
                'The planks creak softly underfoot.'
            ]);
            break;

        case EXT_TILES.LAKE_HOUSE:
            playInteractSound();
            showDialogue('Lake House', [
                'A cozy cottage overlooks the lake.',
                'Smoke curls from the chimney.',
                'The house has been here for generations.'
            ]);
            break;

        case EXT_TILES.LAKE_TREE:
            playInteractSound();
            showDialogue('Pine Tree', [
                'A tall pine tree sways gently in the breeze.',
                'Its needles whisper ancient secrets.',
                'These trees have watched over the lake for centuries.'
            ]);
            break;

        case EXT_TILES.BOAT:
            playInteractSound();
            if (player.inBoat) {
                // Exit boat
                player.inBoat = false;
                showDialogue('Boat', [
                    'You carefully step out of the boat.',
                    'Your feet find solid ground again.'
                ]);
            } else {
                // Enter boat - move player onto the water
                player.inBoat = true;
                player.boatX = facing.x;
                player.boatY = facing.y;
                // Move player to the boat's position (on water)
                player.x = facing.x * TILE_SIZE;
                player.y = facing.y * TILE_SIZE;
                // Change the boat tile to water (boat is now with player)
                LAKE_MAP[facing.y][facing.x] = EXT_TILES.LAKE_WATER;
                showDialogue('Boat', [
                    'You climb into the wooden rowboat.',
                    'The boat rocks gently as you settle in.',
                    'Use the oars to explore the lake!',
                    '(You can now move across the water)'
                ]);
            }
            break;

        case EXT_TILES.FISHING_ROD:
            playInteractSound();
            if (!player.hasFishingRod) {
                player.hasFishingRod = true;
                // Remove fishing rod from map
                LAKE_MAP[facing.y][facing.x] = EXT_TILES.LAKE_GRASS;
                showDialogue('Fishing Rod', [
                    'You found a fishing rod!',
                    'It\'s an old bamboo rod with a simple reel.',
                    'Perfect for catching some lake fish.',
                    '(Press E near water to fish!)'
                ]);
            }
            break;

        default:
            // Check if player has fishing rod and is near water
            if (player.hasFishingRod && (facing.type === EXT_TILES.LAKE_WATER || facing.type === EXT_TILES.LAKE_EDGE)) {
                doFishing();
            }
            break;
    }
}

function doFishing() {
    playInteractSound();

    // Check if player has found all mystery clues and can catch the safe
    const hasAllClues = player.foundTreeCarving && player.foundCollarClue && player.foundBuriedJournal;

    // If player has all clues and hasn't caught safe yet, chance to catch it
    if (hasAllClues && !player.caughtLakeSafe) {
        // The safe is hidden in the top right corner of the lake (columns 14-18, rows 1-4)
        const playerTileX = Math.floor((player.x + player.width / 2) / TILE_SIZE);
        const playerTileY = Math.floor((player.y + player.height / 2) / TILE_SIZE);
        const inSafeZone = playerTileX >= 14 && playerTileX <= 18 && playerTileY >= 1 && playerTileY <= 4;

        // 70% chance in the right spot, 5% chance elsewhere
        const safeChance = Math.random();
        const catchThreshold = inSafeZone ? 0.7 : 0.05;

        if (safeChance < catchThreshold) {
            player.caughtLakeSafe = true;
            showDialogue('🎣 What\'s This?!', [
                'You cast your line into the lake...',
                'Something HEAVY is on the line!',
                'This doesn\'t feel like a fish...',
                '{NAME} pulls with all their strength!',
                'It\'s... IT\'S AN OLD SAFE!',
                'This must be grandfather\'s hidden safe!',
                'The ring must be inside! But it needs a code...',
                'The clues you\'ve gathered: 20 (tree) + 26 (collar) = 2026',
                'Try: 2026 - their wedding year!'
            ], () => {
                openCodeModal();
            });
            return;
        }
    }

    const catchChance = Math.random();
    if (catchChance < 0.4) {
        // Caught a fish!
        const fishTypes = [
            { name: 'Mahseer', value: 500, rarity: 'common' },
            { name: 'Catla', value: 300, rarity: 'common' },
            { name: 'Rohu', value: 400, rarity: 'common' },
            { name: 'Golden Mahseer', value: 2000, rarity: 'rare' },
            { name: 'Giant Catfish', value: 1500, rarity: 'rare' }
        ];
        const isRare = Math.random() < 0.15;
        const availableFish = fishTypes.filter(f => isRare ? f.rarity === 'rare' : f.rarity === 'common');
        const caughtFish = availableFish[Math.floor(Math.random() * availableFish.length)];

        player.money += caughtFish.value;
        updateWallet();

        if (caughtFish.rarity === 'rare') {
            showDialogue('🎣 Amazing Catch!', [
                `You cast your line into the lake...`,
                `Something big is pulling!`,
                `WOW! You caught a ${caughtFish.name}!`,
                `That's a rare catch worth ₹${caughtFish.value}!`
            ]);
        } else {
            showDialogue('🎣 Fishing', [
                `You cast your line into the lake...`,
                `...`,
                `You feel a tug!`,
                `You caught a ${caughtFish.name}!`,
                `Sold for ₹${caughtFish.value}.`
            ]);
        }
    } else if (catchChance < 0.7) {
        // Nothing
        showDialogue('🎣 Fishing', [
            'You cast your line into the lake...',
            '...',
            'Nothing biting right now.',
            'Try again!'
        ]);
    } else {
        // Got away
        showDialogue('🎣 Fishing', [
            'You cast your line into the lake...',
            'You feel a strong tug!',
            '...but the fish got away!',
            'Better luck next time.'
        ]);
    }
}

function handleShedInteraction(facing) {
    switch (facing.type) {
        case SHED_TILES.DOOR:
            // Exit back to kitchen
            showDialogue('Exit', [
                '{NAME} heads back through the door...'
            ], () => {
                transitionFromShed();
            });
            break;

        case SHED_TILES.AXE:
            playInteractSound();
            if (!player.hasAxe) {
                player.hasAxe = true;
                showDialogue('Axe', [
                    'A sharp woodcutter\'s axe hangs on the wall.',
                    '{NAME} takes the axe!',
                    'This could cut through those withered trees blocking the path.'
                ]);
            } else {
                showDialogue('Wall', [
                    'An empty hook where the axe used to hang.'
                ]);
            }
            break;

        case SHED_TILES.WORKBENCH:
            playInteractSound();
            showDialogue('Workbench', [
                'An old wooden workbench covered in sawdust.',
                'Various tools and hardware are scattered about.',
                'Grandfather must have done a lot of repairs here.'
            ]);
            break;

        case SHED_TILES.SHELF:
            playInteractSound();
            showDialogue('Shelf', [
                'Dusty shelves lined with old jars and boxes.',
                'There\'s fertilizer, seeds, and gardening supplies.',
                'Some of these labels are from decades ago!'
            ]);
            break;

        case SHED_TILES.TOOLS:
            playInteractSound();
            showDialogue('Garden Tools', [
                'Rakes, hoes, and other garden tools hang on the wall.',
                'They\'re a bit rusty but still usable.',
                'The estate has been well-maintained over the years.'
            ]);
            break;

        case SHED_TILES.BARREL:
            playInteractSound();
            showDialogue('Barrel', [
                'Old wooden barrels, probably used for storing coffee beans.',
                'They smell faintly of roasted coffee.',
                'A reminder of the estate\'s coffee heritage.'
            ]);
            break;

        case SHED_TILES.WINDOW:
            playInteractSound();
            showDialogue('Window', [
                'A small window lets in some dusty light.',
                'Through it, you can see the back of the house.',
                'The glass is old and slightly warped.'
            ]);
            break;

        case SHED_TILES.PLANT_POT:
            playInteractSound();
            showDialogue('Plant Pots', [
                'Old terracotta pots with dried-up plants.',
                'They haven\'t been watered in a long time.',
                'Maybe grandmother used these for her seedlings.'
            ]);
            break;

        default:
            // Floor or wall - no interaction
            break;
    }
}

function handlePlantationInteraction(facing) {
    switch (facing.type) {
        case PLANT_TILES.TO_ESTATE:
            showDialogue('Exit', [
                '{NAME} heads back to the main estate...'
            ], () => {
                transitionFromPlantation();
            });
            break;

        case PLANT_TILES.DAD_NPC_PLANT:
            playInteractSound();
            showPlantationDadDialogue();
            break;

        case PLANT_TILES.NOTICE_BOARD:
            playInteractSound();
            showNoticeBoard();
            break;

        case PLANT_TILES.PHONE_BOOTH:
            playInteractSound();
            showPhoneBooth();
            break;

        case PLANT_TILES.WATER_TANK:
            playInteractSound();
            showDialogue('Water Tank', [
                `Water Level: ${plantationResources.water.stored}/${plantationResources.water.tankCapacity} liters`,
                plantation.calendar.season === 'MONSOON' ?
                    'The tank is filling up from the monsoon rains!' :
                    'Water is consumed daily by workers and plants.',
                'Order a tanker from the Phone Booth if running low.'
            ]);
            break;

        case PLANT_TILES.PROCESSING_SHED:
            playInteractSound();
            if (plantationResources.inventory.cherries.arabica > 0 ||
                plantationResources.inventory.cherries.robusta > 0) {
                showDialogue('Processing Shed', [
                    'The coffee processing shed is ready.',
                    `You have ${plantationResources.inventory.cherries.arabica.toFixed(1)}kg Arabica and ${plantationResources.inventory.cherries.robusta.toFixed(1)}kg Robusta cherries.`,
                    'Would you like to start processing?'
                ], () => {
                    // TODO: Start processing mini-game
                    showDialogue('Processing', ['Processing mini-game coming soon!']);
                });
            } else {
                showDialogue('Processing Shed', [
                    'The coffee processing equipment awaits.',
                    'Harvest some coffee cherries first, then bring them here for processing.',
                    'Arabica uses wet processing, Robusta uses dry processing.'
                ]);
            }
            break;

        case PLANT_TILES.DRYING_YARD:
            playInteractSound();
            showDialogue('Drying Yard', [
                'A large concrete yard for drying coffee beans.',
                'Beans must be turned regularly to dry evenly.',
                'It takes 14-21 days to properly dry coffee in the sun.'
            ]);
            break;

        case PLANT_TILES.FERMENTATION_TANK:
            playInteractSound();
            const hasCherriesForProcess = plantationResources.inventory.cherries.arabica >= 1 ||
                               plantationResources.inventory.cherries.robusta >= 1;
            if (hasCherriesForProcess) {
                showDialogue('Fermentation Tank', [
                    'Ready to process coffee cherries!',
                    'Wet processing: Pulping → Fermenting → Washing → Drying',
                    'Optimal fermentation: 36-48 hours',
                    'Press E to start processing...'
                ], () => {
                    const processType = plantationResources.inventory.cherries.arabica >=
                                      plantationResources.inventory.cherries.robusta ? 'arabica' : 'robusta';
                    startProcessingGame(processType);
                });
            } else {
                showDialogue('Fermentation Tank', [
                    'Cement tanks for fermenting Arabica coffee.',
                    'Fermentation removes the mucilage from the beans.',
                    'Harvest some cherries first to process!'
                ]);
            }
            break;

        case PLANT_TILES.SORTING_TABLE:
            playInteractSound();
            if (plantationResources.inventory.parchment.arabica >= 1 ||
                plantationResources.inventory.parchment.robusta >= 1) {
                showDialogue('Sorting Table', [
                    'Time to sort and grade the coffee beans!',
                    'Sort by size, color, and shape.',
                    'Keys: 1=MNEB, 2=A, 3=B, 4=C, R=Reject',
                    'Press E to start sorting...'
                ], () => {
                    const sortType = plantationResources.inventory.parchment.arabica >=
                                      plantationResources.inventory.parchment.robusta ? 'arabica' : 'robusta';
                    startSortingGame(sortType);
                });
            } else {
                showDialogue('Sorting Table', [
                    'A long table for hand-sorting coffee beans.',
                    'Process some cherries first to get parchment beans!'
                ]);
            }
            break;

        case PLANT_TILES.PICKING_ZONE:
            playInteractSound();
            // Check if there are ripe plants
            const ripePlantsForPick = [...plantation.plants.arabica, ...plantation.plants.robusta]
                .filter(p => p.stage === 'RIPE' || p.stage === 'OVERRIPE');
            if (ripePlantsForPick.length > 0) {
                // Determine which type has more ripe plants
                const ripeArabica = plantation.plants.arabica.filter(p => p.stage === 'RIPE' || p.stage === 'OVERRIPE').length;
                const ripeRobusta = plantation.plants.robusta.filter(p => p.stage === 'RIPE' || p.stage === 'OVERRIPE').length;
                const pickType = ripeArabica >= ripeRobusta ? 'arabica' : 'robusta';

                showDialogue('Harvest Zone', [
                    `There are ${ripePlantsForPick.length} plants ready for harvest!`,
                    'Click red cherries (ripe) for +10 points.',
                    'Avoid green cherries (unripe) - they give -5!',
                    'Press E to start picking...'
                ], () => {
                    startPickingGame(pickType);
                });
            } else {
                showDialogue('Harvest Zone', [
                    'The plants aren\'t ready for harvest yet.',
                    'Coffee cherries take 8-9 months to ripen after flowering.',
                    `Current season: ${SEASONS[plantation.calendar.season]?.name || plantation.calendar.season}`
                ]);
            }
            break;

        case PLANT_TILES.WORKER_QUARTERS:
            playInteractSound();
            showDialogue('Worker Quarters', [
                `Currently ${plantation.workers.length} workers are employed.`,
                plantation.workers.length > 0 ?
                    `Workers need food, water, and fair wages to stay happy.` :
                    'Hire workers from the Phone Booth to help with the plantation.',
                'Happy workers are more efficient!'
            ]);
            break;

        case PLANT_TILES.STORAGE:
            playInteractSound();
            const inv = plantationResources.inventory;
            showDialogue('Storage', [
                'Estate storage room contents:',
                `Cherries: ${inv.cherries.arabica.toFixed(1)}kg Arabica, ${inv.cherries.robusta.toFixed(1)}kg Robusta`,
                `Parchment: ${inv.parchment.arabica.toFixed(1)}kg Arabica, ${inv.parchment.robusta.toFixed(1)}kg Robusta`,
                `Supplies: ${plantationResources.supplies.fertilizer} bags fertilizer, ${plantationResources.supplies.pesticide} cans pesticide`
            ]);
            break;

        case PLANT_TILES.GENERATOR:
            playInteractSound();
            showDialogue('Generator House', [
                plantationResources.power.gridAvailable ?
                    'The estate is connected to the power grid.' :
                    'Power outage! Running on generator backup.',
                `Generator fuel: ${plantationResources.power.generatorFuel}/${plantationResources.power.fuelCapacity} liters`,
                'The generator runs the processing equipment during outages.'
            ]);
            break;

        case PLANT_TILES.PUMP_HOUSE:
            playInteractSound();
            showDialogue('Pump House', [
                'The pump draws water from the estate well.',
                plantationResources.power.gridAvailable ?
                    'Pump is running normally.' :
                    'Pump is running on backup generator power.',
                'Irrigation is essential during the dry season.'
            ]);
            break;

        // Arabica coffee plant interactions
        case PLANT_TILES.ARABICA_RIPE:
            playInteractSound();
            showDialogue('Ripe Arabica Coffee', [
                'Beautiful red Arabica cherries ready for picking!',
                'Arabica is the premium variety - sweeter and more aromatic.',
                'Press E to harvest these cherries.'
            ], () => {
                harvestCoffee(facing, 'arabica');
            });
            break;

        case PLANT_TILES.ARABICA_OVERRIPE:
            playInteractSound();
            showDialogue('Overripe Arabica', [
                'These Arabica cherries are overripe - harvest quickly!',
                'They\'ll still make decent coffee but quality is lower.',
                'Press E to harvest before they spoil.'
            ], () => {
                harvestCoffee(facing, 'arabica', true);
            });
            break;

        case PLANT_TILES.ARABICA_GREEN_BERRY:
            playInteractSound();
            showDialogue('Green Arabica Berries', [
                'Young green Arabica berries developing.',
                'They\'ll turn red when ripe in a few months.',
                'Patience is key to quality coffee!'
            ]);
            break;

        case PLANT_TILES.ARABICA_FLOWERING:
            playInteractSound();
            showDialogue('Flowering Arabica', [
                'Delicate white Arabica blossoms!',
                'These fragrant flowers will become coffee cherries.',
                'Blossom showers trigger flowering in Coorg.'
            ]);
            break;

        case PLANT_TILES.ARABICA_MATURE:
            playInteractSound();
            showDialogue('Mature Arabica Plant', [
                'A healthy mature Arabica coffee plant.',
                'Waiting for the blossom season to flower.',
                'Arabica grows best under shade trees.'
            ]);
            break;

        // Robusta coffee plant interactions
        case PLANT_TILES.ROBUSTA_RIPE:
            playInteractSound();
            showDialogue('Ripe Robusta Coffee', [
                'Dark red Robusta cherries ready for harvest!',
                'Robusta is hardier with higher caffeine content.',
                'Press E to harvest these cherries.'
            ], () => {
                harvestCoffee(facing, 'robusta');
            });
            break;

        case PLANT_TILES.ROBUSTA_OVERRIPE:
            playInteractSound();
            showDialogue('Overripe Robusta', [
                'These Robusta cherries are past their prime.',
                'Harvest now before they fall and rot!',
                'Press E to harvest.'
            ], () => {
                harvestCoffee(facing, 'robusta', true);
            });
            break;

        case PLANT_TILES.ROBUSTA_GREEN_BERRY:
            playInteractSound();
            showDialogue('Green Robusta Berries', [
                'Green Robusta berries growing strong.',
                'Robusta takes a bit longer to ripen than Arabica.',
                'These will be ready in a few months.'
            ]);
            break;

        case PLANT_TILES.ROBUSTA_FLOWERING:
            playInteractSound();
            showDialogue('Flowering Robusta', [
                'Robusta flowers blooming!',
                'Robusta plants are more disease-resistant.',
                'Good for blending with Arabica.'
            ]);
            break;

        case PLANT_TILES.ROBUSTA_MATURE:
            playInteractSound();
            showDialogue('Mature Robusta Plant', [
                'A sturdy mature Robusta plant.',
                'Robusta can tolerate more sun than Arabica.',
                'Ready to flower when conditions are right.'
            ]);
            break;

        case PLANT_TILES.ARABICA_SEEDLING:
        case PLANT_TILES.ROBUSTA_SEEDLING:
            playInteractSound();
            const seedlingType = facing.type === PLANT_TILES.ARABICA_SEEDLING ? 'Arabica' : 'Robusta';
            showDialogue(`${seedlingType} Seedling`, [
                `A tender ${seedlingType} seedling.`,
                'It will take 2-3 years to mature and bear fruit.',
                'Keep it watered and protected from pests.'
            ]);
            break;

        case PLANT_TILES.ARABICA_YOUNG:
        case PLANT_TILES.ROBUSTA_YOUNG:
            playInteractSound();
            const youngType = facing.type === PLANT_TILES.ARABICA_YOUNG ? 'Arabica' : 'Robusta';
            showDialogue(`Young ${youngType} Plant`, [
                `A growing ${youngType} coffee plant.`,
                'Another year or two until it matures.',
                'Make sure it gets enough water and shade.'
            ]);
            break;

        case PLANT_TILES.ARABICA_DISEASED:
        case PLANT_TILES.ROBUSTA_DISEASED:
            playInteractSound();
            const diseaseType = facing.type === PLANT_TILES.ARABICA_DISEASED ? 'Arabica' : 'Robusta';
            showDialogue(`Diseased ${diseaseType}`, [
                'This plant is infected and needs treatment!',
                'Use pesticide from your supplies to cure it.',
                'Untreated disease can spread to nearby plants.',
                `Supplies: ${plantationResources.supplies.pesticide} cans of pesticide`
            ]);
            break;

        case PLANT_TILES.SHADE_TREE:
            playInteractSound();
            showDialogue('Shade Tree', [
                'A tall silver oak tree providing shade for the coffee.',
                'Coffee plants thrive under partial shade - it slows ripening for better flavor.',
                'These trees also provide habitat for birds that eat coffee pests.',
                'In Coorg, shade-grown coffee is traditional and produces premium beans.'
            ]);
            break;

        case PLANT_TILES.PEPPER_VINE:
            playInteractSound();
            showDialogue('Black Pepper Vine', [
                'A pepper vine climbing up a support pole.',
                'Coorg estates traditionally grow pepper alongside coffee.',
                'The vines provide additional income between coffee harvests.',
                'Black pepper from Coorg is famous for its bold, spicy flavor.'
            ]);
            break;

        case PLANT_TILES.FOREST_BORDER:
            playInteractSound();
            showDialogue('Dense Forest', [
                'Thick forest surrounds the estate.',
                'The forest helps maintain the microclimate for coffee.',
                'Wildlife from the forest includes elephants, deer, and many bird species.',
                'Coorg is one of the most biodiverse regions in India.'
            ]);
            break;

        // ===== NPC Interactions =====
        case PLANT_TILES.NPC_PICKER:
            playInteractSound();
            showPickerDialogue();
            break;

        case PLANT_TILES.NPC_SUPERVISOR:
            playInteractSound();
            showSupervisorDialogue();
            break;

        case PLANT_TILES.NPC_BUYER:
            playInteractSound();
            showBuyerDialogue();
            break;

        case PLANT_TILES.NPC_NEIGHBOR:
            playInteractSound();
            showNeighborDialogue();
            break;

        // ===== Wildlife Interactions =====
        case PLANT_TILES.WILDLIFE_HORNBILL:
            playInteractSound();
            showDialogue('Malabar Great Hornbill', [
                'A magnificent Malabar Great Hornbill sits in the tree!',
                'Its loud "kok-kok-kok" call echoes through the plantation.',
                'In Kodava tradition, hornbills are sacred - a sign of a healthy forest.',
                'They eat wild figs and pepper, spreading seeds throughout the estate.',
                'Seeing one is considered very auspicious for the harvest!'
            ]);
            break;

        case PLANT_TILES.WILDLIFE_ELEPHANT:
            playInteractSound();
            showDialogue('Wild Elephant', [
                'Careful! A wild elephant from Nagarhole forest!',
                'Elephants raid coffee estates looking for ripe cherries and bananas.',
                'Never approach them - they can be dangerous.',
                'The Forest Department helps manage elephant-human conflict in Coorg.'
            ]);
            break;

        case PLANT_TILES.WILDLIFE_BOAR:
            playInteractSound();
            showDialogue('Wild Boar', [
                'A wild boar is rooting through the soil!',
                'They dig for grubs and roots, disturbing plant beds.',
                'Boars mostly come at night - fencing helps keep them out.',
                'The Kodavas traditionally hunt wild boar as part of their culture.'
            ]);
            break;

        case PLANT_TILES.WILDLIFE_MONKEY:
            playInteractSound();
            showDialogue('Bonnet Macaque', [
                'Cheeky bonnet macaques are raiding the ripe cherries!',
                'These clever monkeys know exactly which cherries are sweetest.',
                'Recorded langur calls or scarecrows help deter them.',
                'Still, they help disperse seeds in the forest!'
            ]);
            break;

        case PLANT_TILES.WILDLIFE_SNAKE:
            playInteractSound();
            showDialogue('King Cobra', [
                'A King Cobra! The world\'s largest venomous snake.',
                'In Kodava culture, the cobra is sacred - Lord Subramanya\'s serpent.',
                'Never harm or kill a cobra - it brings terrible luck.',
                'They control rat populations and are rarely aggressive if left alone.',
                'Step back slowly and let it pass.'
            ]);
            break;

        default:
            // Floor, path - no interaction
            break;
    }
}

// Harvest coffee from a plant
function harvestCoffee(facing, coffeeType, isOverripe = false) {
    // Find the plant object at this position
    const plant = getPlantAt(facing.x, facing.y);

    // Calculate harvest amount based on plant yield or default
    const baseAmount = plant ? plant.yield : (isOverripe ? 0.3 : 0.5);
    const harvestAmount = isOverripe ? baseAmount * 0.6 : baseAmount;

    // Add to inventory
    plantationResources.inventory.cherries[coffeeType] += harvestAmount;

    // Update the plant object if it exists
    if (plant) {
        plant.stage = 'MATURE';
        plant.daysInStage = 0;
        plant.yield = 0;
        // Sync to map
        syncPlantToMap(plant);
    } else {
        // Fallback: just update the map tile
        const matureTile = coffeeType === 'arabica' ? PLANT_TILES.ARABICA_MATURE : PLANT_TILES.ROBUSTA_MATURE;
        PLANTATION_MAP[facing.y][facing.x] = matureTile;
    }

    // Show harvest feedback
    const typeName = coffeeType === 'arabica' ? 'Arabica' : 'Robusta';
    const healthInfo = plant ? ` (Plant health: ${plant.health.toFixed(0)}%)` : '';
    showDialogue('Harvested!', [
        `Picked ${harvestAmount.toFixed(1)}kg of ${typeName} cherries!`,
        isOverripe ? 'Quality: Fair (overripe)' : 'Quality: Excellent (ripe)',
        `Total ${typeName} cherries: ${plantationResources.inventory.cherries[coffeeType].toFixed(1)}kg${healthInfo}`
    ]);

    // Update HUD
    updatePlantationHUD();
}

function showPlantationDadDialogue() {
    const season = plantation.calendar.season;
    const seasonTips = {
        'POST_HARVEST': [
            "This is the post-harvest season - time for maintenance!",
            "Prune the plants, clear weeds, and repair equipment.",
            "A good time to process any remaining cherries."
        ],
        'BLOSSOM': [
            "Blossom season! Watch for the beautiful white flowers.",
            "The 'blossom showers' in March-April trigger flowering.",
            "More flowers mean more cherries come harvest time."
        ],
        'PLANTING': [
            "Planting season before the monsoon arrives.",
            "Good time to plant new seedlings in prepared soil.",
            "Make sure they're well-watered to get established."
        ],
        'MONSOON': [
            "The monsoon is crucial for our coffee!",
            "The rains help the berries develop properly.",
            "Watch out for fungal diseases in this wet weather."
        ],
        'RIPENING': [
            "Ripening season - the berries are changing color!",
            "Green berries slowly turn to red when ripe.",
            "Start preparing for the harvest!"
        ],
        'HARVEST': [
            "It's harvest time! The most exciting season.",
            "Pick only the red, ripe cherries for best quality.",
            "Hire extra workers - we'll need all hands on deck!"
        ]
    };

    const tips = seasonTips[season] || ["How can I help you today?"];
    showDialogue("Dad", [
        `Ah, ${player.name}! Good to see you checking on things.`,
        ...tips,
        "Press the Dashboard button to see estate status."
    ]);
}

function showNoticeBoard() {
    // Ensure prices are up to date
    if (!currentMarketPrices.lastUpdated) {
        updateMarketPrices();
    }

    const prices = currentMarketPrices;
    const inv = plantationResources.inventory.greenBeans;
    const totalArabica = inv.arabica.MNEB + inv.arabica.A + inv.arabica.B + inv.arabica.C;
    const totalRobusta = inv.robusta.A + inv.robusta.B + inv.robusta.C;
    const hasBeansToSell = totalArabica > 0 || totalRobusta > 0;

    // Get season trend indicator
    const modifier = currentMarketPrices.seasonModifier;
    let trend = '→ Stable';
    if (modifier >= 1.1) trend = '↑ High demand';
    else if (modifier >= 1.05) trend = '↗ Rising';
    else if (modifier <= 0.9) trend = '↓ Market flooded';
    else if (modifier <= 0.95) trend = '↘ Declining';

    // Weather forecast based on season
    const weatherForecast = {
        'POST_HARVEST': 'Dry conditions. Good for processing.',
        'BLOSSOM': 'Light showers expected. Blossom trigger possible!',
        'PLANTING': 'Pre-monsoon rains approaching. Plant soon!',
        'MONSOON': 'Heavy rains. Protect drying beans!',
        'RIPENING': 'Occasional showers. Berries developing well.',
        'HARVEST': 'Clear skies. Ideal picking weather.'
    };

    showDialogue('Notice Board', [
        '=== COFFEE BOARD MARKET PRICES ===',
        `Market trend: ${trend}`,
        `Arabica MNEB: ₹${prices.arabica.MNEB}/kg | A: ₹${prices.arabica.A}/kg`,
        `Arabica B: ₹${prices.arabica.B}/kg | C: ₹${prices.arabica.C}/kg`,
        `Robusta A: ₹${prices.robusta.A}/kg | B: ₹${prices.robusta.B}/kg | C: ₹${prices.robusta.C}/kg`,
        '--- Weather Forecast ---',
        weatherForecast[plantation.calendar.season] || 'Conditions normal.',
        hasBeansToSell ? `\nYou have ${totalArabica.toFixed(1)}kg Arabica and ${totalRobusta.toFixed(1)}kg Robusta beans to sell.` : ''
    ], () => {
        if (hasBeansToSell) {
            openSellModal();
        }
    });
}

function showPhoneBooth() {
    showDialogue('Phone Booth', [
        'Estate Phone - What would you like to do?',
        'Press E again to hire workers, or use options below:',
        '• Water Tanker (2000L): ₹5,000',
        '• Generator Fuel (50L): ₹3,000',
        '• Fertilizer (10 bags): ₹2,000',
        '• Pesticide (5 cans): ₹3,000'
    ], () => {
        // Open hiring modal after dialogue
        openHiringModal();
    });
}

// ===== NPC Dialogue Functions =====

function showPickerDialogue() {
    const season = plantation.calendar.season;
    const ripePlants = [...plantation.plants.arabica, ...plantation.plants.robusta]
        .filter(p => p.stage === 'RIPE' || p.stage === 'OVERRIPE').length;

    // Picker dialogues based on season and work status
    const pickerDialogues = {
        'HARVEST': [
            'Namaskara! Busy picking today.',
            ripePlants > 0 ?
                `There are ${ripePlants} bushes with ripe cherries left to pick!` :
                'We\'ve picked most of the ripe cherries. Good harvest this year!',
            'We Kodavas have been growing coffee here for generations.',
            'My grandmother used to pick cherries in this very estate!'
        ],
        'MONSOON': [
            'Namaskara! Taking shelter from the rain.',
            'The monsoon is good for the coffee - makes the berries plump.',
            'We do maintenance work during the rains.',
            'The leeches are terrible this time of year though!'
        ],
        'BLOSSOM': [
            'Namaskara! Have you seen the flowers?',
            'When the blossom showers come, the whole estate turns white!',
            'The scent is like jasmine - so beautiful.',
            'More flowers mean more cherries for us to pick later!'
        ],
        'default': [
            'Namaskara! How can I help?',
            'Picking coffee is hard work, but honest work.',
            'I learned this from my father, and he from his father.',
            'Coorg coffee is the best in India - people pay good money for it!'
        ]
    };

    const dialogues = pickerDialogues[season] || pickerDialogues['default'];
    showDialogue('Somanna (Picker)', dialogues);
}

function showSupervisorDialogue() {
    const workers = plantation.workers.length;
    const season = plantation.calendar.season;
    const water = plantationResources.water.stored;

    // Supervisor tracks estate status and gives reports
    const supervisorDialogues = [
        `Good day, ${player.name}. Here\'s the estate status:`,
        `Workers: ${workers}/${plantation.maxWorkers} | Water: ${water}L`,
        season === 'HARVEST' ?
            'Harvest is in full swing. We need more pickers!' :
            season === 'MONSOON' ?
            'Monsoon maintenance going well. Watching for leaf rust.' :
            `${SEASONS[season]?.name || season} - Work proceeding normally.`
    ];

    // Add random tip
    const tips = [
        'Remember, quality over quantity. Red cherries only!',
        'The arabica section is producing well this year.',
        'Some robusta plants need more shade - consider planting silver oak.',
        'The fermentation tanks were cleaned last week.',
        'Coffee Board inspector may visit next month. Keep records ready.'
    ];
    supervisorDialogues.push(tips[Math.floor(Math.random() * tips.length)]);

    showDialogue('Ponnappa (Supervisor)', supervisorDialogues);
}

function showBuyerDialogue() {
    const inv = plantationResources.inventory.greenBeans;
    const totalBeans = inv.arabica.MNEB + inv.arabica.A + inv.arabica.B + inv.arabica.C +
                       inv.robusta.A + inv.robusta.B + inv.robusta.C;

    // Ensure prices are current
    if (!currentMarketPrices.lastUpdated) {
        updateMarketPrices();
    }

    // Buyer appears during harvest and wants to purchase beans
    const buyerDialogues = totalBeans > 0 ? [
        'Namaskara! I\'m from the Bangalore Coffee Trading Company.',
        'I heard your estate produces excellent Mysore Nuggets.',
        `You have ${totalBeans.toFixed(1)}kg of processed beans available.`,
        `Today\'s MNEB price: ₹${currentMarketPrices.arabica.MNEB}/kg!`,
        plantation.priceBonus > 0 ?
            'As a regular buyer, I\'m adding a 15% premium to all grades.' :
            'Sell me quality beans and I\'ll become a regular buyer!',
        'Would you like to sell now? Press E to continue...'
    ] : [
        'Namaskara! I\'m from the Bangalore Coffee Trading Company.',
        'I came to purchase your estate\'s coffee, but...',
        'You don\'t have any processed beans ready for sale.',
        'Process your cherries first - pulp, ferment, dry, and sort!',
        'I\'ll return when you have stock. Good beans fetch good prices!'
    ];

    showDialogue('Mr. Ramesh (Coffee Buyer)', buyerDialogues, () => {
        if (totalBeans > 0) {
            // Open sell modal after dialogue
            openSellModal();
        }
    });
}

function showNeighborDialogue() {
    // Kodava neighbor shares cultural wisdom and estate advice
    const neighborDialogues = [
        'Hosa pola! (Kodava greeting)',
        'I am from the Ponnappa family - we\'ve been neighbors for five generations.',
        'Our Ainmane (ancestral home) still has the original peeche (sword) from 1857.',
        'In Coorg, coffee and tradition go together.',
        'Have you prepared for Kailpodh yet? It\'s the most important festival!',
        'We Kodavas offer first harvest to our ancestors before selling.',
        'The old ways are the best ways for coffee cultivation.',
        'May your trees bear plenty and your harvest be blessed!'
    ];

    // Add random cultural fact
    const culturalFacts = [
        'Did you know? Coorg was never conquered by any empire!',
        'The Kodavas are the only civilians allowed to carry arms in India.',
        'Our traditional dress - the kupya and chele - is worn at all festivals.',
        'Pandi curry with kadambuttu is the traditional feast!',
        'Every Kodava family has weapons displayed in their Ainmane.',
        'We trace our ancestry to the soldiers of Alexander the Great.',
        'The River Cauvery is born here in Kodagu - at Talacauvery.'
    ];

    const randomFact = culturalFacts[Math.floor(Math.random() * culturalFacts.length)];
    neighborDialogues.push(randomFact);

    showDialogue('Appanna (Neighbor)', neighborDialogues);
}

// =============================================
// LABOR MANAGEMENT SYSTEM
// =============================================

function openHiringModal() {
    // Generate available workers pool
    generateAvailableWorkers();

    // Render the modal
    renderHiringModal();

    // Show modal
    const modal = document.getElementById('hiring-modal');
    if (modal) {
        modal.classList.remove('hidden');
        gameState = STATES.PLANTATION_MENU;
    }
}

function closeHiringModal() {
    const modal = document.getElementById('hiring-modal');
    if (modal) {
        modal.classList.add('hidden');
        gameState = STATES.PLANTATION_PLAY;
    }
}

function generateAvailableWorkers() {
    // Fewer workers available during peak harvest (labor shortage)
    const isHarvestSeason = plantation.calendar.season === 'HARVEST';
    const baseCount = isHarvestSeason ? 2 : 4;
    const count = baseCount + Math.floor(Math.random() * 2);

    availableWorkersPool = [];

    for (let i = 0; i < count; i++) {
        const workerTypes = Object.keys(WORKER_TYPES);
        const type = workerTypes[Math.floor(Math.random() * workerTypes.length)];
        const typeInfo = WORKER_TYPES[type];

        // Generate random stats
        const efficiency = typeInfo.baseEfficiency + (Math.random() * 0.2 - 0.1);
        const morale = 60 + Math.floor(Math.random() * 30);

        // Hiring cost is one week's advance
        const hiringCost = typeInfo.wage * 7;

        availableWorkersPool.push({
            id: Date.now() + i + Math.random(),
            name: getRandomKodavaName(),
            type: type,
            efficiency: Math.round(efficiency * 100) / 100,
            morale: morale,
            energy: 100,
            task: 'IDLE',
            hiringCost: hiringCost,
            daysWorked: 0
        });
    }
}

function renderHiringModal() {
    const container = document.getElementById('available-workers');
    const currentCount = document.getElementById('current-worker-count');
    const maxCount = document.getElementById('max-worker-count');
    const wageBill = document.getElementById('weekly-wage-bill');

    if (!container) return;

    // Update summary
    if (currentCount) currentCount.textContent = plantation.workers.length;
    if (maxCount) maxCount.textContent = plantation.maxWorkers;
    if (wageBill) wageBill.textContent = calculateWeeklyWageBill().toLocaleString();

    // Check if at max workers
    const atMax = plantation.workers.length >= plantation.maxWorkers;

    // Render available workers
    if (availableWorkersPool.length === 0) {
        container.innerHTML = `
            <div class="no-workers">
                <p>No workers available for hire today.</p>
                <p>Check back tomorrow or during non-harvest season.</p>
            </div>
        `;
    } else {
        container.innerHTML = availableWorkersPool.map((worker, index) => {
            const typeInfo = WORKER_TYPES[worker.type];
            const canAfford = plantationResources.money >= worker.hiringCost;
            const disabled = atMax || !canAfford;

            return `
                <div class="worker-card">
                    <div class="worker-info">
                        <div class="worker-name">${worker.name}</div>
                        <div class="worker-type">${typeInfo.name}</div>
                        <div class="worker-stats">
                            Efficiency: ${Math.round(worker.efficiency * 100)}% |
                            Morale: ${worker.morale}%
                        </div>
                        <div class="worker-wage">
                            Hiring Cost: ₹${worker.hiringCost.toLocaleString()} (1 week advance)
                        </div>
                    </div>
                    <div class="worker-actions">
                        <button class="hire-btn"
                                onclick="hireWorker(${index})"
                                ${disabled ? 'disabled' : ''}
                                title="${atMax ? 'Maximum workers reached' : !canAfford ? 'Not enough money' : 'Hire this worker'}">
                            Hire
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }
}

function hireWorker(poolIndex) {
    if (poolIndex < 0 || poolIndex >= availableWorkersPool.length) return;
    if (plantation.workers.length >= plantation.maxWorkers) {
        showDialogue('Cannot Hire', ['You already have the maximum number of workers (10).']);
        return;
    }

    const worker = availableWorkersPool[poolIndex];
    if (plantationResources.money < worker.hiringCost) {
        showDialogue('Cannot Hire', ['Not enough money to pay the hiring advance.']);
        return;
    }

    // Deduct hiring cost
    plantationResources.money -= worker.hiringCost;

    // Add to plantation workers
    plantation.workers.push({
        id: worker.id,
        name: worker.name,
        type: worker.type,
        efficiency: worker.efficiency,
        morale: worker.morale,
        energy: worker.energy,
        task: 'IDLE',
        daysWorked: 0,
        paidUntil: plantation.calendar.day + 7 // Paid for first week
    });

    // Remove from available pool
    availableWorkersPool.splice(poolIndex, 1);

    // Play sound and update
    PlantationSounds.playWorkerHired();
    achievements.checkWorkers(plantation.workers.length);
    visualEffects.addScreenText(480, 300, `${worker.name} hired!`, '#90ee90');
    renderHiringModal();
    updatePlantationHUD();

    showDialogue('Worker Hired', [
        `${worker.name} has joined your estate!`,
        `They will work as a ${WORKER_TYPES[worker.type].name}.`,
        'Assign them tasks from the Dashboard > Workers tab.'
    ]);
    autoSave();
}

function calculateWeeklyWageBill() {
    let total = 0;
    plantation.workers.forEach(worker => {
        const typeInfo = WORKER_TYPES[worker.type];
        if (typeInfo) {
            total += typeInfo.wage * 7;
        }
    });
    return total;
}

function openWorkerManageModal() {
    renderWorkerManageModal();
    const modal = document.getElementById('worker-manage-modal');
    if (modal) {
        modal.classList.remove('hidden');
        gameState = STATES.PLANTATION_MENU;
    }
}

function closeWorkerManageModal() {
    const modal = document.getElementById('worker-manage-modal');
    if (modal) {
        modal.classList.add('hidden');
        gameState = STATES.PLANTATION_PLAY;
    }
}

function renderWorkerManageModal() {
    const container = document.getElementById('worker-list');
    if (!container) return;

    if (plantation.workers.length === 0) {
        container.innerHTML = `
            <div class="no-workers">
                <p>No workers hired yet.</p>
                <p>Visit the Phone Booth to hire workers!</p>
            </div>
        `;
        return;
    }

    container.innerHTML = plantation.workers.map((worker, index) => {
        const typeInfo = WORKER_TYPES[worker.type];
        const availableTasks = getAvailableTasksForWorker(worker);

        return `
            <div class="worker-card">
                <div class="worker-info">
                    <div class="worker-name">${worker.name}</div>
                    <div class="worker-type">${typeInfo.name}</div>
                    <div class="worker-bar-container">
                        <span class="bar-label">Morale:</span>
                        <div class="worker-bar morale-bar">
                            <div class="worker-bar-fill" style="width: ${worker.morale}%; background: ${getMoraleColor(worker.morale)}"></div>
                        </div>
                        <span class="bar-label">Energy:</span>
                        <div class="worker-bar energy-bar">
                            <div class="worker-bar-fill" style="width: ${worker.energy}%; background: ${getEnergyColor(worker.energy)}"></div>
                        </div>
                    </div>
                    <div class="worker-stats">
                        Task:
                        <select class="task-select" onchange="assignWorkerTask(${index}, this.value)">
                            ${availableTasks.map(task =>
                                `<option value="${task}" ${worker.task === task ? 'selected' : ''}>
                                    ${WORKER_TASKS[task].name}
                                </option>`
                            ).join('')}
                        </select>
                    </div>
                </div>
                <div class="worker-actions">
                    <button class="fire-btn" onclick="fireWorker(${index})">
                        Fire
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function getAvailableTasksForWorker(worker) {
    const tasks = ['IDLE']; // Everyone can rest
    const typeInfo = WORKER_TYPES[worker.type];

    if (!typeInfo) return tasks;

    // Add tasks based on worker skills
    Object.keys(WORKER_TASKS).forEach(taskKey => {
        const task = WORKER_TASKS[taskKey];
        if (task.requiredSkill && typeInfo.skills.includes(task.requiredSkill)) {
            tasks.push(taskKey);
        }
    });

    return tasks;
}

function assignWorkerTask(workerIndex, task) {
    if (workerIndex < 0 || workerIndex >= plantation.workers.length) return;

    const worker = plantation.workers[workerIndex];
    worker.task = task;

    playInteractSound();
}

function fireWorker(workerIndex) {
    if (workerIndex < 0 || workerIndex >= plantation.workers.length) return;

    const worker = plantation.workers[workerIndex];

    // Remove worker
    plantation.workers.splice(workerIndex, 1);

    // Play sound and update
    playErrorSound();
    renderWorkerManageModal();
    updatePlantationHUD();

    showDialogue('Worker Released', [
        `${worker.name} has left the estate.`,
        'They wished you well and hope to work together again someday.'
    ]);
}

function getMoraleColor(morale) {
    if (morale >= 70) return '#6bff6b';
    if (morale >= 40) return '#ffd93d';
    return '#ff6b6b';
}

function getEnergyColor(energy) {
    if (energy >= 70) return '#6b9fff';
    if (energy >= 40) return '#9b6bff';
    return '#ff6b6b';
}

function processWorkerTasks() {
    // Called each time phase (morning/afternoon/evening)
    plantation.workers.forEach(worker => {
        const task = WORKER_TASKS[worker.task];
        if (!task || worker.task === 'IDLE') {
            // Resting recovers energy
            worker.energy = Math.min(100, worker.energy + 10);
            return;
        }

        // Check if worker has enough energy
        if (worker.energy < task.energyCost) {
            // Too tired, automatically rest
            worker.task = 'IDLE';
            worker.energy = Math.min(100, worker.energy + 5);
            return;
        }

        // Perform task
        const output = performWorkerTask(worker, task);
        worker.energy -= task.energyCost;

        // Low energy affects morale
        if (worker.energy < 20) {
            worker.morale = Math.max(0, worker.morale - 2);
        }

        // Completing tasks boosts morale slightly
        if (output > 0) {
            worker.morale = Math.min(100, worker.morale + 1);
        }
    });
}

function performWorkerTask(worker, task) {
    const efficiency = worker.efficiency * (worker.morale / 100);

    switch (task.output) {
        case 'cherries':
            // Find a ripe plant and harvest
            const ripePlants = [...plantation.plants.arabica, ...plantation.plants.robusta]
                .filter(p => p.stage === 'RIPE' || p.stage === 'OVERRIPE');
            if (ripePlants.length > 0) {
                const plant = ripePlants[Math.floor(Math.random() * ripePlants.length)];
                const harvest = (plant.yield || 0.5) * efficiency;
                const coffeeType = plant.type;

                plantationResources.inventory.cherries[coffeeType] += harvest;
                plant.stage = 'MATURE';
                plant.daysInStage = 0;
                plant.yield = 0;
                syncPlantToMap(plant);

                return harvest;
            }
            return 0;

        case 'plantHealth':
            // Improve random plant health
            const allPlants = [...plantation.plants.arabica, ...plantation.plants.robusta];
            if (allPlants.length > 0) {
                const plant = allPlants[Math.floor(Math.random() * allPlants.length)];
                const healthBoost = 5 * efficiency;
                plant.health = Math.min(100, plant.health + healthBoost);
                plant.waterLevel = Math.min(100, plant.waterLevel + 10);
                return healthBoost;
            }
            return 0;

        case 'pestRemoval':
            // Find diseased plants and treat
            const diseasedPlants = [...plantation.plants.arabica, ...plantation.plants.robusta]
                .filter(p => p.stage === 'DISEASED' || p.hasPest);
            if (diseasedPlants.length > 0 && plantationResources.supplies.pesticide > 0) {
                const plant = diseasedPlants[0];
                plant.hasPest = false;
                if (plant.stage === 'DISEASED') {
                    plant.stage = 'MATURE';
                    syncPlantToMap(plant);
                }
                plant.health = Math.min(100, plant.health + 20);
                plantationResources.supplies.pesticide -= 0.1;
                achievements.checkPestTreated();  // Track pest treatment for achievement
                return 1;
            }
            return 0;

        case 'parchment':
            // Convert cherries to parchment (simplified)
            const cherryTypes = ['arabica', 'robusta'];
            for (const type of cherryTypes) {
                if (plantationResources.inventory.cherries[type] >= 1) {
                    const processed = Math.min(plantationResources.inventory.cherries[type], 2 * efficiency);
                    plantationResources.inventory.cherries[type] -= processed;
                    plantationResources.inventory.parchment[type] += processed * 0.6; // ~60% yield
                    return processed;
                }
            }
            return 0;

        case 'greenBeans':
            // Convert parchment to green beans
            for (const type of ['arabica', 'robusta']) {
                if (plantationResources.inventory.parchment[type] >= 1) {
                    const processed = Math.min(plantationResources.inventory.parchment[type], 1.5 * efficiency);
                    plantationResources.inventory.parchment[type] -= processed;

                    // Distribute to grades based on efficiency
                    const gradeA = processed * 0.3 * efficiency;
                    const gradeB = processed * 0.4;
                    const gradeC = processed * 0.2;
                    const gradeMNEB = type === 'arabica' ? processed * 0.1 * efficiency : 0;

                    if (type === 'arabica') {
                        plantationResources.inventory.greenBeans.arabica.MNEB += gradeMNEB;
                        plantationResources.inventory.greenBeans.arabica.A += gradeA;
                        plantationResources.inventory.greenBeans.arabica.B += gradeB;
                        plantationResources.inventory.greenBeans.arabica.C += gradeC;
                    } else {
                        plantationResources.inventory.greenBeans.robusta.A += gradeA;
                        plantationResources.inventory.greenBeans.robusta.B += gradeB;
                        plantationResources.inventory.greenBeans.robusta.C += gradeC;
                    }
                    return processed;
                }
            }
            return 0;

        default:
            return 0;
    }
}

function updateWorkerMorale() {
    // Called at end of day
    plantation.workers.forEach(worker => {
        // Base morale change
        let moraleChange = 0;

        // Low energy hurts morale
        if (worker.energy < 30) {
            moraleChange -= 3;
        }

        // Having too many workers reduces individual morale (crowding)
        if (plantation.workers.length > 8) {
            moraleChange -= 1;
        }

        // Seasonal bonuses
        if (plantation.calendar.season === 'HARVEST') {
            moraleChange += 2; // Exciting harvest time!
        }

        // Random small variation
        moraleChange += Math.floor(Math.random() * 3) - 1;

        worker.morale = Math.max(0, Math.min(100, worker.morale + moraleChange));

        // Very low morale - worker might quit
        if (worker.morale <= 10) {
            const quitChance = (10 - worker.morale) * 0.05;
            if (Math.random() < quitChance) {
                const name = worker.name;
                plantation.workers = plantation.workers.filter(w => w.id !== worker.id);
                showDialogue('Worker Quit', [
                    `${name} has left the estate due to low morale.`,
                    'Try to keep workers happy with reasonable workloads!'
                ]);
            }
        }
    });
}

function restoreWorkerEnergy() {
    // Called at start of new day (morning)
    plantation.workers.forEach(worker => {
        // Restore some energy overnight
        worker.energy = Math.min(100, worker.energy + 40);
    });
}

// Add button event listeners for modals
document.getElementById('close-hiring-btn')?.addEventListener('click', closeHiringModal);
document.getElementById('close-worker-manage-btn')?.addEventListener('click', closeWorkerManageModal);

// =============================================
// COFFEE SELLING SYSTEM
// =============================================

function openSellModal() {
    const modal = document.getElementById('sell-modal');
    if (!modal) return;

    // Ensure prices are current
    if (!currentMarketPrices.lastUpdated) {
        updateMarketPrices();
    }

    modal.classList.remove('hidden');
    gameState = STATES.PLANTATION_MENU;

    // Populate price grid
    const priceGrid = document.getElementById('sell-price-grid');
    const prices = currentMarketPrices;
    priceGrid.innerHTML = `
        <div class="price-item"><div class="grade">Arabica MNEB</div><div class="price">₹${prices.arabica.MNEB}</div></div>
        <div class="price-item"><div class="grade">Arabica A</div><div class="price">₹${prices.arabica.A}</div></div>
        <div class="price-item"><div class="grade">Arabica B</div><div class="price">₹${prices.arabica.B}</div></div>
        <div class="price-item"><div class="grade">Arabica C</div><div class="price">₹${prices.arabica.C}</div></div>
        <div class="price-item"><div class="grade">Robusta A</div><div class="price">₹${prices.robusta.A}</div></div>
        <div class="price-item"><div class="grade">Robusta B</div><div class="price">₹${prices.robusta.B}</div></div>
        <div class="price-item"><div class="grade">Robusta C</div><div class="price">₹${prices.robusta.C}</div></div>
        <div class="price-item"><div class="grade">-</div><div class="price">-</div></div>
    `;

    // Populate stock grid
    const stockGrid = document.getElementById('sell-stock-grid');
    const inv = plantationResources.inventory.greenBeans;
    stockGrid.innerHTML = `
        <div class="stock-item ${inv.arabica.MNEB <= 0 ? 'empty' : ''}"><div class="grade">Arabica MNEB</div><div class="amount">${inv.arabica.MNEB.toFixed(1)}kg</div></div>
        <div class="stock-item ${inv.arabica.A <= 0 ? 'empty' : ''}"><div class="grade">Arabica A</div><div class="amount">${inv.arabica.A.toFixed(1)}kg</div></div>
        <div class="stock-item ${inv.arabica.B <= 0 ? 'empty' : ''}"><div class="grade">Arabica B</div><div class="amount">${inv.arabica.B.toFixed(1)}kg</div></div>
        <div class="stock-item ${inv.arabica.C <= 0 ? 'empty' : ''}"><div class="grade">Arabica C</div><div class="amount">${inv.arabica.C.toFixed(1)}kg</div></div>
        <div class="stock-item ${inv.robusta.A <= 0 ? 'empty' : ''}"><div class="grade">Robusta A</div><div class="amount">${inv.robusta.A.toFixed(1)}kg</div></div>
        <div class="stock-item ${inv.robusta.B <= 0 ? 'empty' : ''}"><div class="grade">Robusta B</div><div class="amount">${inv.robusta.B.toFixed(1)}kg</div></div>
        <div class="stock-item ${inv.robusta.C <= 0 ? 'empty' : ''}"><div class="grade">Robusta C</div><div class="amount">${inv.robusta.C.toFixed(1)}kg</div></div>
        <div class="stock-item empty"><div class="grade">-</div><div class="amount">-</div></div>
    `;

    // Set initial selection and update display
    updateSellGrades();
    updateSellTotal();
}

function closeSellModal() {
    const modal = document.getElementById('sell-modal');
    if (modal) {
        modal.classList.add('hidden');
        gameState = STATES.PLANTATION_PLAY;
    }
}

function updateSellGrades() {
    const coffeeType = document.getElementById('sell-coffee-type').value;
    const gradeSelect = document.getElementById('sell-grade');

    if (coffeeType === 'arabica') {
        gradeSelect.innerHTML = `
            <option value="MNEB">MNEB (Premium)</option>
            <option value="A">Grade A</option>
            <option value="B">Grade B</option>
            <option value="C">Grade C</option>
        `;
    } else {
        gradeSelect.innerHTML = `
            <option value="A">Grade A</option>
            <option value="B">Grade B</option>
            <option value="C">Grade C</option>
        `;
    }

    updateSellTotal();
}

function updateSellTotal() {
    const coffeeType = document.getElementById('sell-coffee-type').value;
    const grade = document.getElementById('sell-grade').value;
    const quantity = parseFloat(document.getElementById('sell-quantity').value) || 0;

    const inv = plantationResources.inventory.greenBeans;
    const available = coffeeType === 'arabica' ? inv.arabica[grade] : inv.robusta[grade];
    const pricePerKg = currentMarketPrices[coffeeType][grade];

    document.getElementById('sell-available-amount').textContent = available.toFixed(1);
    document.getElementById('sell-price-per-kg').textContent = `₹${pricePerKg}`;

    const total = Math.min(quantity, available) * pricePerKg;
    document.getElementById('sell-total-amount').textContent = `₹${total.toLocaleString('en-IN')}`;

    // Feedback if trying to sell more than available
    const feedback = document.getElementById('sell-feedback');
    if (quantity > available && available > 0) {
        feedback.textContent = `Only ${available.toFixed(1)}kg available`;
    } else if (available <= 0) {
        feedback.textContent = 'No stock of this grade!';
    } else {
        feedback.textContent = '';
    }
}

function setSellMax() {
    const coffeeType = document.getElementById('sell-coffee-type').value;
    const grade = document.getElementById('sell-grade').value;

    const inv = plantationResources.inventory.greenBeans;
    const available = coffeeType === 'arabica' ? inv.arabica[grade] : inv.robusta[grade];

    document.getElementById('sell-quantity').value = available.toFixed(1);
    updateSellTotal();
}

function confirmSell() {
    const coffeeType = document.getElementById('sell-coffee-type').value;
    const grade = document.getElementById('sell-grade').value;
    const quantity = parseFloat(document.getElementById('sell-quantity').value) || 0;

    const inv = plantationResources.inventory.greenBeans;
    const available = coffeeType === 'arabica' ? inv.arabica[grade] : inv.robusta[grade];
    const pricePerKg = currentMarketPrices[coffeeType][grade];

    if (quantity <= 0) {
        document.getElementById('sell-feedback').textContent = 'Enter a valid quantity!';
        return;
    }

    if (available <= 0) {
        document.getElementById('sell-feedback').textContent = 'No stock available!';
        return;
    }

    const sellAmount = Math.min(quantity, available);
    const totalPrice = Math.round(sellAmount * pricePerKg);

    // Deduct from inventory (ensure non-negative)
    if (coffeeType === 'arabica') {
        plantationResources.inventory.greenBeans.arabica[grade] = Math.max(0,
            plantationResources.inventory.greenBeans.arabica[grade] - sellAmount);
    } else {
        plantationResources.inventory.greenBeans.robusta[grade] = Math.max(0,
            plantationResources.inventory.greenBeans.robusta[grade] - sellAmount);
    }

    // Add money
    plantationResources.money += totalPrice;

    // Track achievements
    achievements.checkEarnings(totalPrice);
    achievements.checkWallet(plantationResources.money);

    // Close modal and show result
    closeSellModal();
    updatePlantationHUD();

    // Play coin sound and show floating text
    PlantationSounds.playCoinSound();
    visualEffects.addScreenText(480, 300, `+₹${totalPrice.toLocaleString('en-IN')}`, '#00ff00');

    showDialogue('Sale Complete!', [
        `Sold ${sellAmount.toFixed(1)}kg of ${coffeeType.charAt(0).toUpperCase() + coffeeType.slice(1)} Grade ${grade}`,
        `Price: ₹${pricePerKg}/kg`,
        `Total received: ₹${totalPrice.toLocaleString('en-IN')}`,
        `Your balance: ₹${plantationResources.money.toLocaleString('en-IN')}`
    ]);
    autoSave();
}

function sellAllBeans() {
    const inv = plantationResources.inventory.greenBeans;
    const prices = currentMarketPrices;

    let totalSold = 0;
    let totalEarned = 0;
    const sales = [];

    // Sell all arabica grades
    for (const grade of ['MNEB', 'A', 'B', 'C']) {
        const amount = inv.arabica[grade];
        if (amount > 0) {
            const earned = Math.round(amount * prices.arabica[grade]);
            sales.push(`Arabica ${grade}: ${amount.toFixed(1)}kg = ₹${earned.toLocaleString('en-IN')}`);
            totalSold += amount;
            totalEarned += earned;
            inv.arabica[grade] = 0;
        }
    }

    // Sell all robusta grades
    for (const grade of ['A', 'B', 'C']) {
        const amount = inv.robusta[grade];
        if (amount > 0) {
            const earned = Math.round(amount * prices.robusta[grade]);
            sales.push(`Robusta ${grade}: ${amount.toFixed(1)}kg = ₹${earned.toLocaleString('en-IN')}`);
            totalSold += amount;
            totalEarned += earned;
            inv.robusta[grade] = 0;
        }
    }

    if (totalSold <= 0) {
        document.getElementById('sell-feedback').textContent = 'No beans to sell!';
        return;
    }

    // Add money
    plantationResources.money += totalEarned;

    // Track achievements
    achievements.checkEarnings(totalEarned);
    achievements.checkWallet(plantationResources.money);

    // Close modal and show result
    closeSellModal();
    updatePlantationHUD();

    // Play coin sound and show floating text
    PlantationSounds.playCoinSound();
    visualEffects.addScreenText(480, 300, `+₹${totalEarned.toLocaleString('en-IN')}`, '#00ff00');

    showDialogue('Bulk Sale Complete!', [
        `Total sold: ${totalSold.toFixed(1)}kg`,
        ...sales.slice(0, 4), // Show first 4 sales
        sales.length > 4 ? `...and ${sales.length - 4} more grades` : '',
        `Total earned: ₹${totalEarned.toLocaleString('en-IN')}`,
        `New balance: ₹${plantationResources.money.toLocaleString('en-IN')}`
    ].filter(s => s));
    autoSave();
}

// Update market prices at the start of each new day
function onNewDay() {
    updateMarketPrices();
}

function handleClueInteraction(clueKey, clueData) {
    if (!collectedClues.includes(clueKey)) {
        playClueSound();
        collectedClues.push(clueKey);
        updateClueUI();
    } else {
        playInteractSound();
    }

    showDialogue(clueData.name, clueData.dialogues, () => {
        if (!readClues.includes(clueKey)) {
            readClues.push(clueKey);
        }
    });
}

function handleSafeInteraction() {
    playInteractSound();

    if (readClues.length < 4) {
        showDialogue('Old Safe', SAFE_DIALOGUES.locked);
    } else {
        showDialogue('Old Safe', SAFE_DIALOGUES.ready, () => {
            openCodeModal();
        });
    }
}

// =============================================
// DIALOGUE SYSTEM
// =============================================

function showDialogue(speaker, messages, onComplete = null) {
    gameState = STATES.DIALOGUE;
    currentDialogue = {
        speaker: speaker,
        messages: messages,
        onComplete: onComplete
    };
    dialogueIndex = 0;
    updateDialogueDisplay();
    dialogueBox.classList.remove('hidden');
}

function updateDialogueDisplay() {
    dialogueSpeaker.textContent = currentDialogue.speaker;
    const message = currentDialogue.messages[dialogueIndex].replace('{NAME}', player.name);
    dialogueText.textContent = message;
}

function advanceDialogue() {
    playInteractSound();
    dialogueIndex++;

    if (dialogueIndex >= currentDialogue.messages.length) {
        const onComplete = currentDialogue.onComplete;
        closeDialogue();
        if (onComplete) {
            onComplete();
        }
    } else {
        updateDialogueDisplay();
    }
}

function closeDialogue() {
    dialogueBox.classList.add('hidden');
    currentDialogue = null;
    dialogueIndex = 0;

    if (gameState === STATES.DIALOGUE) {
        if (currentMap === MAPS.EXTERIOR) {
            gameState = STATES.EXTERIOR_PLAY;
        } else if (currentMap === MAPS.LAKE) {
            gameState = STATES.LAKE_PLAY;
        } else if (currentMap === MAPS.PLANTATION) {
            gameState = STATES.PLANTATION_PLAY;
        } else if (currentMap === MAPS.SHED) {
            gameState = STATES.SHED_PLAY;
        } else {
            gameState = STATES.INTERIOR_PLAY;
        }
    }

    // Ensure canvas has focus for keyboard input
    canvas.focus();
}

// =============================================
// CODE INPUT MODAL
// =============================================

function openCodeModal(mode = 'safe') {
    codeInputMode = mode;
    gameState = STATES.CODE_INPUT;
    codeModal.classList.remove('hidden');
    codeInput.value = '';
    codeFeedback.textContent = '';

    // Update modal text based on mode
    const codeHint = document.getElementById('code-hint');
    if (mode === 'plantation') {
        codeHint.textContent = 'Enter the special date to access the plantation...';
    } else {
        codeHint.textContent = 'What year did they wed? Use the clues...';
    }

    codeInput.focus();
}

function closeCodeModal() {
    codeModal.classList.add('hidden');
    if (currentMap === MAPS.EXTERIOR) {
        gameState = STATES.EXTERIOR_PLAY;
    } else if (currentMap === MAPS.LAKE) {
        gameState = STATES.LAKE_PLAY;
    } else {
        gameState = STATES.INTERIOR_PLAY;
    }
}

function submitCode() {
    const entered = codeInput.value.trim();

    if (entered === PUZZLE_SOLUTION) {
        playWinSound();
        codeModal.classList.add('hidden');

        if (codeInputMode === 'plantation') {
            // Grant access to plantation
            showDialogue('Access Granted', [
                'The date unlocks the path to the plantation!',
                'Dad appears at the entrance...',
                '"Ah, you remembered the special date!"',
                '"Come, let me show you around the coffee fields."'
            ], () => {
                transitionToPlantation();
            });
        } else {
            // Original safe opening logic
            player.hasWeddingRing = true;
            showDialogue('The Safe Opens!', [
                'Click... Click... CLICK!',
                'The old combination lock releases!',
                '{NAME} slowly opens the weathered safe...',
                'Inside, wrapped in faded velvet...',
                'Grandmother\'s wedding ring!',
                'A beautiful gold band with a delicate ruby stone.',
                '"January 11th, 2026" is engraved inside.',
                'And beneath the ring... a photograph!'
            ], () => {
                showEngagementPhoto();
            });
        }
    } else {
        playErrorSound();
        if (codeInputMode === 'plantation') {
            codeFeedback.textContent = 'Wrong date! Think about the special family date...';
        } else {
            codeFeedback.textContent = 'Wrong code! Think about their wedding year...';
        }
        codeInput.value = '';
        codeInput.focus();
    }
}

function showEngagementPhoto() {
    gameState = STATES.PHOTO_VIEW;
    photoModal.classList.remove('hidden');
}

function closeEngagementPhoto() {
    photoModal.classList.add('hidden');
    showWinScreen();
}

// =============================================
// QUANTITY SELECTION MODAL
// =============================================

const PRICE_PER_KG = 500;
const MAX_SALE_AMOUNT = 500000; // 5 lakhs

function openQuantityModal() {
    gameState = STATES.QUANTITY_SELECT;
    quantityModal.classList.remove('hidden');
    quantityInput.value = '';
    quantityPrice.textContent = 'Total: ₹0';
    quantityFeedback.textContent = '';
    quantityInput.focus();
}

function closeQuantityModal() {
    quantityModal.classList.add('hidden');
    if (currentMap === MAPS.EXTERIOR) {
        gameState = STATES.EXTERIOR_PLAY;
    } else if (currentMap === MAPS.LAKE) {
        gameState = STATES.LAKE_PLAY;
    } else {
        gameState = STATES.INTERIOR_PLAY;
    }
}

function updateQuantityPrice() {
    const qty = parseInt(quantityInput.value) || 0;
    const price = qty * PRICE_PER_KG;

    if (price > MAX_SALE_AMOUNT) {
        quantityPrice.textContent = `Total: ₹${price.toLocaleString('en-IN')}`;
        quantityPrice.style.color = '#ff6b6b';
        quantityFeedback.textContent = 'Exceeds maximum limit!';
    } else {
        quantityPrice.textContent = `Total: ₹${price.toLocaleString('en-IN')}`;
        quantityPrice.style.color = '#90ee90';
        quantityFeedback.textContent = '';
    }
}

function submitQuantity() {
    const qty = parseInt(quantityInput.value) || 0;
    const price = qty * PRICE_PER_KG;

    if (qty <= 0) {
        quantityFeedback.textContent = 'Please enter a valid quantity!';
        return;
    }

    if (price > MAX_SALE_AMOUNT) {
        quantityFeedback.textContent = 'Amount exceeds ₹5,00,000 limit!';
        return;
    }

    sellCoffee(qty, price);
}

function sellCoffee(quantity, price) {
    closeQuantityModal();

    // Show phone selling sequence
    showDialogue('📱 Phone', [
        'You open the CoffeeMarket app on your phone...',
        `Listing: "${quantity} kg Fresh Coorg Coffee Cherries"`,
        'Uploading photos...',
        '✓ Listed successfully!',
        '...',
        '🔔 New buyer! Order confirmed.'
    ], () => {
        // Give player money
        player.money += price;
        updateWallet();
        showDialogue('💰 Payment Received!', [
            `₹${price.toLocaleString('en-IN')} has been added to your wallet!`,
            `${quantity} kg of coffee cherries sold successfully.`
        ]);
    });
}

// Quantity input event listeners
quantityInput.addEventListener('input', updateQuantityPrice);

quantitySubmit.addEventListener('click', submitQuantity);

quantityCancel.addEventListener('click', () => {
    closeQuantityModal();
});

quantityInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        submitQuantity();
    } else if (e.key === 'Escape') {
        closeQuantityModal();
    }
});

// =============================================
// UI UPDATES
// =============================================

function updateClueUI() {
    clueCounter.textContent = `Clues: ${collectedClues.length}/4`;

    clueList.innerHTML = '';
    collectedClues.forEach(clueKey => {
        const clueData = CLUE_DATA[clueKey];
        if (clueData) {
            const item = document.createElement('div');
            item.className = 'clue-item';
            item.textContent = `✓ ${clueData.name}`;
            clueList.appendChild(item);
        }
    });
}

function updateWallet() {
    walletDisplay.textContent = `💰 Wallet: ₹${player.money}`;
}

// =============================================
// GAME STATE MANAGEMENT
// =============================================

function showStartScreen() {
    gameState = STATES.START;
    startScreen.classList.remove('hidden');
    winScreen.classList.add('hidden');
    characterSelectScreen.classList.add('hidden');
    uiOverlay.style.display = 'none';

    // Check for saved game and show Continue button
    const saveInfo = getSaveInfo();
    const continueBtn = document.getElementById('continue-game');
    const saveInfoDiv = document.getElementById('save-info');
    const saveInfoText = document.getElementById('save-info-text');

    if (saveInfo && continueBtn) {
        continueBtn.classList.remove('hidden');
        if (saveInfoDiv && saveInfoText) {
            saveInfoDiv.classList.remove('hidden');
            saveInfoText.textContent = `Saved: ${saveInfo.playerName} - ${saveInfo.dateString}`;
        }
    } else if (continueBtn) {
        continueBtn.classList.add('hidden');
        if (saveInfoDiv) saveInfoDiv.classList.add('hidden');
    }
}

function startGame() {
    initAudio();
    gameState = STATES.CHARACTER_SELECT;
    startScreen.classList.add('hidden');
    characterSelectScreen.classList.remove('hidden');
    playerNameInput.focus();
    drawCharacterPreview(player.gender);
}

function confirmCharacterSelection() {
    const name = playerNameInput.value.trim() || 'Manager';
    player.name = name;

    playInteractSound();
    characterSelectScreen.classList.add('hidden');

    // Go directly to plantation (skip intro for public version)
    startPlantationDirectly();
}

function startPlantationDirectly() {
    // Initialize plantation and start playing
    initializePlantationPlants();
    transitionToPlantation();

    // Show welcome dialogue
    showDialogue('Welcome to Coorg!', [
        `Welcome to the coffee estate, ${player.name}!`,
        'This plantation grows both Arabica and Robusta coffee.',
        'Your job is to manage the estate through the seasons.',
        'Hire workers, harvest cherries, process beans, and sell to market!',
        'Use the Dashboard to track your progress. Good luck!'
    ]);
}

function startIntro() {
    // Reset intro state
    intro.carX = -100;
    intro.phase = 0;
    intro.textIndex = 0;
    intro.textOpacity = 0;
    intro.frameCount = 0;

    // Set canvas size for intro scene
    canvas.width = 640;
    canvas.height = 400;
    gameContainer.style.width = '640px';
    gameContainer.style.height = '400px';

    gameState = STATES.INTRO;
    uiOverlay.style.display = 'none';
}

function updateIntro() {
    intro.frameCount++;

    if (intro.phase === 0) {
        // Car arriving from left
        intro.carX += 1.5;
        if (intro.carX >= 220) {
            intro.phase = 1;
            intro.frameCount = 0;
        }
    } else if (intro.phase === 1) {
        // Car stopped, wait a moment
        if (intro.frameCount > 90) {
            intro.phase = 2;
            intro.frameCount = 0;
        }
    } else if (intro.phase === 2) {
        // Show text lines - fade in only, wait for player input to advance
        intro.textOpacity = Math.min(1, intro.textOpacity + 0.02);
    }
}

function drawIntro() {
    const w = canvas.width;
    const h = canvas.height;

    // Sky gradient (evening colors)
    const skyGradient = ctx.createLinearGradient(0, 0, 0, h * 0.6);
    skyGradient.addColorStop(0, '#1a0a2e');
    skyGradient.addColorStop(0.5, '#4a2060');
    skyGradient.addColorStop(1, '#f4a460');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, w, h * 0.6);

    // Sun/moon
    ctx.fillStyle = '#ffcc66';
    ctx.beginPath();
    ctx.arc(w - 80, 80, 30, 0, Math.PI * 2);
    ctx.fill();

    // Mountains in background
    ctx.fillStyle = '#2d4a3d';
    ctx.beginPath();
    ctx.moveTo(0, h * 0.5);
    ctx.lineTo(100, h * 0.35);
    ctx.lineTo(200, h * 0.45);
    ctx.lineTo(320, h * 0.3);
    ctx.lineTo(450, h * 0.42);
    ctx.lineTo(550, h * 0.35);
    ctx.lineTo(w, h * 0.45);
    ctx.lineTo(w, h * 0.6);
    ctx.lineTo(0, h * 0.6);
    ctx.closePath();
    ctx.fill();

    // Coffee plantation hills
    ctx.fillStyle = '#1a3a2a';
    ctx.beginPath();
    ctx.moveTo(0, h * 0.55);
    ctx.lineTo(150, h * 0.5);
    ctx.lineTo(300, h * 0.55);
    ctx.lineTo(450, h * 0.48);
    ctx.lineTo(w, h * 0.55);
    ctx.lineTo(w, h * 0.65);
    ctx.lineTo(0, h * 0.65);
    ctx.closePath();
    ctx.fill();

    // Road
    ctx.fillStyle = '#3a3a3a';
    ctx.fillRect(0, h * 0.6, w, h * 0.15);

    // Road markings
    ctx.fillStyle = '#f0f0f0';
    for (let x = -50 + (intro.frameCount % 80); x < w; x += 80) {
        ctx.fillRect(x, h * 0.67, 40, 4);
    }

    // Ground/grass below road
    ctx.fillStyle = '#2d5a27';
    ctx.fillRect(0, h * 0.75, w, h * 0.25);

    // Coffee plants pattern
    ctx.fillStyle = '#1a4a1a';
    for (let x = 0; x < w; x += 30) {
        for (let y = h * 0.76; y < h; y += 20) {
            ctx.beginPath();
            ctx.arc(x + Math.random() * 10, y, 8, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Trees silhouettes
    for (let i = 0; i < 5; i++) {
        const tx = 50 + i * 140;
        const ty = h * 0.58;
        ctx.fillStyle = '#0a2a0a';
        // Tree trunk
        ctx.fillRect(tx + 10, ty, 8, 30);
        // Tree foliage
        ctx.beginPath();
        ctx.arc(tx + 14, ty - 5, 20, 0, Math.PI * 2);
        ctx.fill();
    }

    // Draw the car
    drawCar(intro.carX, h * 0.58);

    // Text overlay with gradient background
    if (intro.phase >= 1) {
        // Dark overlay for text at top
        const overlayGradient = ctx.createLinearGradient(0, 0, 0, h * 0.4);
        overlayGradient.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
        overlayGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = overlayGradient;
        ctx.fillRect(0, 0, w, h * 0.4);

        // Story text - single large font only
        ctx.textAlign = 'center';
        ctx.font = 'italic 22px Georgia, serif';

        const currentLine = intro.storyLines[intro.textIndex];
        if (currentLine) {
            // Text shadow for depth
            ctx.fillStyle = `rgba(0, 0, 0, ${intro.textOpacity * 0.8})`;
            ctx.fillText(currentLine, w/2 + 2, 70 + 2);

            // Main text in warm golden color
            ctx.fillStyle = `rgba(255, 220, 120, ${intro.textOpacity})`;
            ctx.fillText(currentLine, w/2, 70);
        }
    }

    // Skip hint
    ctx.textAlign = 'right';
    ctx.font = '12px Arial';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fillText(intro.phase === 2 ? 'Press E to continue | ESC to skip' : 'ESC to skip', w - 20, h - 20);

    // Title at top
    if (intro.phase === 0) {
        ctx.textAlign = 'center';
        ctx.font = 'bold 28px Georgia, serif';
        ctx.fillStyle = '#ffd700';
        ctx.fillText('Coorg Estate Mystery', w/2, 50);
    }
}

function drawCar(x, y) {
    // Car body
    ctx.fillStyle = '#2a4a7a';
    ctx.fillRect(x, y + 10, 80, 25);

    // Car top
    ctx.fillStyle = '#3a5a8a';
    ctx.fillRect(x + 15, y, 45, 15);

    // Windows
    ctx.fillStyle = '#a0d0ff';
    ctx.fillRect(x + 18, y + 2, 18, 10);
    ctx.fillRect(x + 40, y + 2, 18, 10);

    // Headlights
    ctx.fillStyle = '#ffff88';
    ctx.fillRect(x + 75, y + 15, 5, 8);

    // Taillights
    ctx.fillStyle = '#ff4444';
    ctx.fillRect(x, y + 15, 4, 8);

    // Wheels
    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath();
    ctx.arc(x + 20, y + 35, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + 60, y + 35, 10, 0, Math.PI * 2);
    ctx.fill();

    // Wheel hubcaps
    ctx.fillStyle = '#808080';
    ctx.beginPath();
    ctx.arc(x + 20, y + 35, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + 60, y + 35, 4, 0, Math.PI * 2);
    ctx.fill();

    // Draw player silhouette in car window
    ctx.fillStyle = '#304050';
    ctx.fillRect(x + 42, y + 3, 12, 8);
}

function endIntro() {
    currentMap = MAPS.EXTERIOR;
    canvas.width = EXTERIOR_CANVAS_WIDTH;
    canvas.height = EXTERIOR_CANVAS_HEIGHT;
    updateGameContainerSize();
    gameState = STATES.EXTERIOR_PLAY;
    uiOverlay.style.display = 'block';
    updateLocationLabel();
    resetGame();
}

function showWinScreen() {
    gameState = STATES.WIN;
    winScreen.classList.remove('hidden');
    uiOverlay.style.display = 'none';
}

function resetGame() {
    if (currentMap === MAPS.EXTERIOR) {
        player.x = 10 * TILE_SIZE;
        player.y = 16 * TILE_SIZE;
    } else {
        player.x = 13 * TILE_SIZE;
        player.y = 20 * TILE_SIZE;
    }
    player.direction = 'up';
    player.hasAxe = false;
    player.hasShovel = false;
    player.foundSnowy = false;
    player.money = 0;
    player.hasFishingRod = false;
    player.inBoat = false;
    // Reset mystery chain flags
    player.heardMysteryStory = false;
    player.foundTreeCarving = false;
    player.foundCollarClue = false;
    player.boughtCamera = false;
    player.foundClosetClue = false;
    player.foundBuriedJournal = false;
    player.caughtLakeSafe = false;
    player.hasWeddingRing = false;
    player.seenShimmerHint = false;
    collectedClues = [];
    readClues = [];
    updateClueUI();
    updateWallet();
    closeDialogue();
    codeModal.classList.add('hidden');
    quantityModal.classList.add('hidden');

    // Restore lake map items
    LAKE_MAP[9][1] = EXT_TILES.FISHING_ROD;  // Restore fishing rod
    LAKE_MAP[8][6] = EXT_TILES.BOAT;         // Restore boat at dock

    // Restore modified map tiles (axe and shovel are now found via interactions, not map tiles)
    EXTERIOR_MAP[9][8] = EXT_TILES.WITHERED_TREE;   // Restore left withered tree
    EXTERIOR_MAP[9][21] = EXT_TILES.WITHERED_TREE;  // Restore right withered tree
    EXTERIOR_MAP[3][4] = EXT_TILES.BURIED_SAFE;     // Restore buried safe

    // Restore Manvi's position in interior map
    // Clear any position she might have moved to in row 14
    for (let x = 20; x < 28; x++) {
        if (INTERIOR_MAP[14][x] === INT_TILES.NPC_MANVI) {
            INTERIOR_MAP[14][x] = INT_TILES.WOOD_FLOOR;
        }
    }
    // Restore her to original position
    INTERIOR_MAP[13][26] = INT_TILES.NPC_MANVI;

    // Restore Mom's position
    // Clear any position she might have moved to
    for (let y = 0; y < INTERIOR_HEIGHT; y++) {
        for (let x = 0; x < INTERIOR_WIDTH; x++) {
            if (INTERIOR_MAP[y][x] === INT_TILES.NPC_MOM) {
                INTERIOR_MAP[y][x] = INT_TILES.WOOD_FLOOR;
            }
        }
    }
    // Restore her to original position
    mom.x = 5;
    mom.y = 7;
    INTERIOR_MAP[7][5] = INT_TILES.NPC_MOM;
}

function restartGame() {
    winScreen.classList.add('hidden');
    startScreen.classList.add('hidden');
    characterSelectScreen.classList.add('hidden');
    photoModal.classList.add('hidden');
    currentMap = MAPS.EXTERIOR;
    canvas.width = EXTERIOR_CANVAS_WIDTH;
    canvas.height = EXTERIOR_CANVAS_HEIGHT;
    updateGameContainerSize();
    uiOverlay.style.display = 'block';
    gameState = STATES.EXTERIOR_PLAY;
    updateLocationLabel();
    resetGame();
}

// =============================================
// INPUT HANDLING
// =============================================

document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();

    // Don't process game keys during login
    if (gameState === STATES.LOGIN) {
        return;
    }

    if (gameState === STATES.START) {
        if (e.key === 'Enter') startGame();
        return;
    }

    if (gameState === STATES.CHARACTER_SELECT) {
        if (e.key === 'Enter') confirmCharacterSelection();
        return;
    }

    if (gameState === STATES.INTRO) {
        if (e.key === 'Escape') {
            // Skip entire intro
            endIntro();
        } else if ((key === 'e' || e.key === 'Enter' || e.key === ' ') && intro.phase === 2) {
            // Advance to next line only when in text phase
            e.preventDefault();
            if (intro.textIndex < intro.storyLines.length - 1) {
                intro.textIndex++;
                intro.textOpacity = 0;
                intro.frameCount = 0;
            } else {
                // Last line, end intro
                endIntro();
            }
        }
        return;
    }

    if (gameState === STATES.WIN) {
        if (e.key === 'Enter' || key === 'r') restartGame();
        return;
    }

    if (gameState === STATES.DIALOGUE) {
        if (key === 'e' || e.key === ' ') {
            e.preventDefault();
            advanceDialogue();
        }
        return;
    }

    if (gameState === STATES.CODE_INPUT) {
        if (e.key === 'Enter') submitCode();
        else if (e.key === 'Escape') closeCodeModal();
        return;
    }

    if (gameState === STATES.PHOTO_VIEW) {
        if (key === 'e' || e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            closeEngagementPhoto();
        }
        return;
    }

    if (gameState === STATES.EXTERIOR_PLAY || gameState === STATES.INTERIOR_PLAY ||
        gameState === STATES.LAKE_PLAY || gameState === STATES.SHED_PLAY ||
        gameState === STATES.PLANTATION_PLAY) {
        if (key === 'w' || e.key === 'ArrowUp') { keys.up = true; e.preventDefault(); }
        if (key === 's' || e.key === 'ArrowDown') { keys.down = true; e.preventDefault(); }
        if (key === 'a' || e.key === 'ArrowLeft') { keys.left = true; e.preventDefault(); }
        if (key === 'd' || e.key === 'ArrowRight') { keys.right = true; e.preventDefault(); }
        if (key === 'e' || e.key === ' ') { e.preventDefault(); interact(); }
        if (key === 'r') resetGame();

        // Save/Load shortcuts
        if (e.key === 'F5') { e.preventDefault(); saveGame(); showAutoSaveIndicator(); }
        if (e.key === 'F9') { e.preventDefault(); handleLoadGame(); }
        if (key === 'm') { e.preventDefault(); showSaveLoadMenu(); }
    }

    // Allow save/load menu from start screen too
    if (gameState === STATES.START && key === 'm') {
        e.preventDefault();
        showSaveLoadMenu();
    }
});

document.addEventListener('keyup', (e) => {
    const key = e.key.toLowerCase();
    if (key === 'w' || e.key === 'ArrowUp') keys.up = false;
    if (key === 's' || e.key === 'ArrowDown') keys.down = false;
    if (key === 'a' || e.key === 'ArrowLeft') keys.left = false;
    if (key === 'd' || e.key === 'ArrowRight') keys.right = false;
});

// Button listeners
document.getElementById('code-submit').addEventListener('click', submitCode);
document.getElementById('code-cancel').addEventListener('click', closeCodeModal);
document.getElementById('restart-button').addEventListener('click', restartGame);
document.getElementById('plantation-button').addEventListener('click', startPlantationMode);
document.getElementById('skip-to-plantation').addEventListener('click', skipToPlantation);

// Plantation button listeners
document.getElementById('dashboard-button').addEventListener('click', openDashboard);
document.getElementById('advance-time-button').addEventListener('click', advanceTime);
document.getElementById('close-dashboard').addEventListener('click', closeDashboard);

// Login event listeners
loginButton.addEventListener('click', attemptLogin);
loginPassword.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        attemptLogin();
    }
});

// Initialize login check on page load
initLogin();

genderButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        genderButtons.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        player.gender = btn.dataset.gender;
        playInteractSound();
        drawCharacterPreview(player.gender);
    });
});

// =============================================
// GAME LOOP
// =============================================

let lastWalkSound = 0;

function update() {
    // Debug: log state occasionally
    if (Math.random() < 0.01) {
        console.log('Update called. State:', gameState);
    }

    if (gameState !== STATES.EXTERIOR_PLAY && gameState !== STATES.INTERIOR_PLAY &&
        gameState !== STATES.LAKE_PLAY && gameState !== STATES.SHED_PLAY &&
        gameState !== STATES.PLANTATION_PLAY) return;

    let dx = 0;
    let dy = 0;

    if (keys.up) { dy = -PLAYER_SPEED; player.direction = 'up'; }
    if (keys.down) { dy = PLAYER_SPEED; player.direction = 'down'; }
    if (keys.left) { dx = -PLAYER_SPEED; player.direction = 'left'; }
    if (keys.right) { dx = PLAYER_SPEED; player.direction = 'right'; }

    if (dx !== 0 && dy !== 0) {
        dx *= 0.707;
        dy *= 0.707;
    }

    if (dx !== 0) {
        const newX = player.x + dx;
        if (canMoveTo(newX, player.y)) player.x = newX;
    }

    if (dy !== 0) {
        const newY = player.y + dy;
        if (canMoveTo(player.x, newY)) player.y = newY;
    }

    const mapSize = getCurrentMapSize();
    const canvasW = mapSize.width * TILE_SIZE;
    const canvasH = mapSize.height * TILE_SIZE;
    player.x = Math.max(0, Math.min(player.x, canvasW - player.width));
    player.y = Math.max(0, Math.min(player.y, canvasH - player.height));

    // Check for grass/coffee animation (Pokemon-style rustling)
    if (gameState === STATES.EXTERIOR_PLAY) {
        const playerCenterX = player.x + player.width / 2;
        const playerCenterY = player.y + player.height / 2;
        const currentTileX = Math.floor(playerCenterX / TILE_SIZE);
        const currentTileY = Math.floor(playerCenterY / TILE_SIZE);

        // Check if player moved to a new tile
        if (currentTileX !== lastPlayerTileX || currentTileY !== lastPlayerTileY) {
            // Check if this tile is coffee plantation
            const tileType = EXTERIOR_MAP[currentTileY] && EXTERIOR_MAP[currentTileY][currentTileX];
            if (tileType === EXT_TILES.COFFEE_PLANTATION) {
                addGrassAnimation(currentTileX, currentTileY);
            }
            lastPlayerTileX = currentTileX;
            lastPlayerTileY = currentTileY;
        }
    }

    // Update grass animations
    updateGrassAnimations();

    // Check for shimmer hint when player is in boat over the safe zone
    if (gameState === STATES.LAKE_PLAY && player.inBoat && !player.seenShimmerHint && !player.caughtLakeSafe) {
        const playerTileX = Math.floor((player.x + player.width / 2) / TILE_SIZE);
        const playerTileY = Math.floor((player.y + player.height / 2) / TILE_SIZE);
        const inSafeZone = playerTileX >= 14 && playerTileX <= 18 && playerTileY >= 1 && playerTileY <= 4;

        if (inSafeZone) {
            player.seenShimmerHint = true;
            showDialogue('{NAME}', [
                'Wait... what\'s that?',
                'There\'s something shimmering beneath the water here...',
                'The water is deeper in this part of the lake.',
                'Maybe I should try fishing here!'
            ]);
        }
    }

    // Check for automatic map transitions
    checkAutoTransitions();

    if ((dx !== 0 || dy !== 0) && Date.now() - lastWalkSound > 200) {
        playWalkSound();
        lastWalkSound = Date.now();
    }

    // Update Mom's position (she moves around the house)
    if (gameState === STATES.INTERIOR_PLAY) {
        updateMomPosition();
    }
}

function updateMomPosition() {
    const now = Date.now();
    if (now - mom.lastMove > mom.moveInterval) {
        // Remove Mom from current position
        if (INTERIOR_MAP[mom.y] && INTERIOR_MAP[mom.y][mom.x] === INT_TILES.NPC_MOM) {
            INTERIOR_MAP[mom.y][mom.x] = INT_TILES.WOOD_FLOOR;
        }

        // Pick a random new position
        const newPos = mom.validPositions[Math.floor(Math.random() * mom.validPositions.length)];

        // Make sure new position is valid (floor tile and not occupied by player)
        const playerTileX = Math.floor(player.x / TILE_SIZE);
        const playerTileY = Math.floor(player.y / TILE_SIZE);

        if (newPos.x !== playerTileX || newPos.y !== playerTileY) {
            mom.x = newPos.x;
            mom.y = newPos.y;
        }

        // Place Mom at new position
        if (INTERIOR_MAP[mom.y] && INTERIOR_MAP[mom.y][mom.x] !== undefined) {
            INTERIOR_MAP[mom.y][mom.x] = INT_TILES.NPC_MOM;
        }

        mom.lastMove = now;
    }
}

function checkAutoTransitions() {
    const centerX = player.x + player.width / 2;
    const centerY = player.y + player.height / 2;
    const currentTile = getTileAt(centerX, centerY);

    if (currentMap === MAPS.EXTERIOR && currentTile === EXT_TILES.HOUSE_ENTRANCE) {
        transitionToInterior();
    } else if (currentMap === MAPS.INTERIOR && currentTile === INT_TILES.EXIT_TO_EXTERIOR) {
        transitionToExterior();
    } else if (currentMap === MAPS.EXTERIOR && currentTile === EXT_TILES.TO_LAKE) {
        transitionToLake();
    } else if (currentMap === MAPS.LAKE && currentTile === EXT_TILES.TO_ESTATE) {
        transitionFromLake();
    } else if (currentMap === MAPS.SHED && currentTile === SHED_TILES.DOOR) {
        transitionFromShed();
    } else if (currentMap === MAPS.PLANTATION && currentTile === PLANT_TILES.TO_ESTATE) {
        transitionFromPlantation();
    } else if (currentMap === MAPS.EXTERIOR && currentTile === EXT_TILES.TO_PLANTATION) {
        // Allow if player has won, tutorial skipped, or plantation was already visited
        if (player.hasWeddingRing || plantation.tutorialComplete || plantation.active) {
            transitionToPlantation();
        } else {
            // Allow entry with the special date code
            showDialogue('Path to Plantation', [
                'The path leads to the coffee plantation fields.',
                'A rusty gate blocks the way...',
                'There\'s a combination lock! Perhaps the special family date?'
            ], () => {
                openCodeModal('plantation');
            });
        }
    }
}

// =============================================
// WEATHER EFFECTS SYSTEM
// =============================================

// =============================================
// 2.5D PARALLAX & DEPTH SYSTEM
// =============================================

const parallax = {
    enabled: true,
    layers: [],
    clouds: [],
    birds: [],
    cameraOffset: { x: 0, y: 0 },
    cameraTilt: 0,
    initialized: false
};

function initParallax() {
    if (parallax.initialized) return;
    parallax.initialized = true;

    // Generate cloud layer
    for (let i = 0; i < 8; i++) {
        parallax.clouds.push({
            x: Math.random() * 1600 - 200,
            y: 20 + Math.random() * 80,
            width: 80 + Math.random() * 120,
            height: 30 + Math.random() * 40,
            speed: 0.1 + Math.random() * 0.2,
            opacity: 0.4 + Math.random() * 0.3
        });
    }

    // Generate distant birds
    for (let i = 0; i < 5; i++) {
        parallax.birds.push({
            x: Math.random() * 1400,
            y: 40 + Math.random() * 60,
            speed: 0.5 + Math.random() * 0.5,
            wingPhase: Math.random() * Math.PI * 2,
            size: 3 + Math.random() * 2
        });
    }
}

function updateParallax() {
    if (!parallax.enabled) return;

    // Update clouds
    parallax.clouds.forEach(cloud => {
        cloud.x += cloud.speed;
        if (cloud.x > 1400) {
            cloud.x = -cloud.width;
            cloud.y = 20 + Math.random() * 80;
        }
    });

    // Update birds
    parallax.birds.forEach(bird => {
        bird.x += bird.speed;
        bird.wingPhase += 0.15;
        if (bird.x > 1400) {
            bird.x = -20;
            bird.y = 40 + Math.random() * 60;
        }
    });

    // Subtle camera movement based on player position
    const targetX = (player.x / (getCurrentMapSize().width * TILE_SIZE) - 0.5) * 10;
    const targetY = (player.y / (getCurrentMapSize().height * TILE_SIZE) - 0.5) * 5;
    parallax.cameraOffset.x += (targetX - parallax.cameraOffset.x) * 0.05;
    parallax.cameraOffset.y += (targetY - parallax.cameraOffset.y) * 0.05;
}

function drawParallaxBackground(canvasWidth, canvasHeight, cameraX, cameraY) {
    if (!parallax.enabled) return;

    initParallax();
    updateParallax();

    const season = plantation.calendar?.season || 'HARVEST';
    const dayPhase = plantation.calendar?.dayPhase || 'MORNING';

    // Sky gradient based on time of day
    const skyGradient = ctx.createLinearGradient(0, 0, 0, canvasHeight * 0.4);
    if (dayPhase === 'MORNING') {
        skyGradient.addColorStop(0, '#87CEEB');  // Light blue
        skyGradient.addColorStop(0.5, '#B0E0E6');
        skyGradient.addColorStop(1, '#E0F0E8');
    } else if (dayPhase === 'AFTERNOON') {
        skyGradient.addColorStop(0, '#5BA3D9');  // Deeper blue
        skyGradient.addColorStop(0.5, '#87CEEB');
        skyGradient.addColorStop(1, '#C8E0D0');
    } else {  // Evening
        skyGradient.addColorStop(0, '#4A6FA5');  // Dusk blue
        skyGradient.addColorStop(0.5, '#D4A574');  // Orange tint
        skyGradient.addColorStop(1, '#E8D0B8');
    }

    // Draw sky (only top portion, rest is map)
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, canvasWidth, 120);

    // Distant mountains (parallax factor 0.1)
    const mountainOffset = cameraX * 0.1 + parallax.cameraOffset.x;
    drawDistantMountains(canvasWidth, mountainOffset, season);

    // Mid-distance hills (parallax factor 0.2)
    const hillOffset = cameraX * 0.2 + parallax.cameraOffset.x * 1.5;
    drawMidHills(canvasWidth, hillOffset, season);

    // Draw clouds
    drawClouds(cameraX);

    // Draw birds
    drawDistantBirds();
}

function drawDistantMountains(canvasWidth, offset, season) {
    // Western Ghats silhouette
    const mountainColor = season === 'MONSOON' ? 'rgba(60, 80, 100, 0.4)' :
                          season === 'HARVEST' ? 'rgba(70, 90, 80, 0.35)' :
                          'rgba(80, 100, 90, 0.3)';

    ctx.fillStyle = mountainColor;
    ctx.beginPath();
    ctx.moveTo(-50, 120);

    // Generate mountain peaks
    const peaks = [
        { x: 100, y: 60 }, { x: 200, y: 75 }, { x: 320, y: 45 },
        { x: 450, y: 70 }, { x: 550, y: 50 }, { x: 700, y: 65 },
        { x: 850, y: 55 }, { x: 1000, y: 72 }, { x: 1150, y: 48 },
        { x: 1300, y: 68 }
    ];

    peaks.forEach((peak, i) => {
        const x = ((peak.x - offset * 0.5) % (canvasWidth + 200)) - 100;
        ctx.lineTo(x, peak.y);
    });

    ctx.lineTo(canvasWidth + 50, 120);
    ctx.closePath();
    ctx.fill();

    // Snow caps on tallest peaks (only in certain seasons)
    if (season !== 'MONSOON') {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        peaks.filter(p => p.y < 55).forEach(peak => {
            const x = ((peak.x - offset * 0.5) % (canvasWidth + 200)) - 100;
            ctx.beginPath();
            ctx.moveTo(x - 15, peak.y + 10);
            ctx.lineTo(x, peak.y);
            ctx.lineTo(x + 15, peak.y + 10);
            ctx.closePath();
            ctx.fill();
        });
    }
}

function drawMidHills(canvasWidth, offset, season) {
    // Closer forested hills
    const hillColor = season === 'MONSOON' ? 'rgba(40, 80, 50, 0.5)' :
                      season === 'BLOSSOM' ? 'rgba(50, 90, 55, 0.45)' :
                      season === 'HARVEST' ? 'rgba(60, 85, 45, 0.45)' :
                      'rgba(45, 85, 50, 0.45)';

    ctx.fillStyle = hillColor;
    ctx.beginPath();
    ctx.moveTo(-50, 120);

    // Smoother, closer hills
    for (let x = -50; x <= canvasWidth + 50; x += 30) {
        const hillX = x - (offset % 60);
        const hillY = 90 + Math.sin((x + offset) * 0.02) * 15 + Math.sin((x + offset) * 0.05) * 8;
        ctx.lineTo(hillX, hillY);
    }

    ctx.lineTo(canvasWidth + 50, 120);
    ctx.closePath();
    ctx.fill();

    // Tree silhouettes on hills
    ctx.fillStyle = season === 'MONSOON' ? 'rgba(30, 60, 40, 0.4)' : 'rgba(35, 65, 40, 0.35)';
    for (let x = 0; x < canvasWidth; x += 40) {
        const treeX = ((x - offset * 0.8) % (canvasWidth + 100)) - 50;
        const baseY = 95 + Math.sin((x + offset * 0.5) * 0.03) * 10;
        drawTreeSilhouette(treeX, baseY, 8 + Math.random() * 6);
    }
}

function drawTreeSilhouette(x, baseY, height) {
    ctx.beginPath();
    ctx.moveTo(x, baseY);
    ctx.lineTo(x - height * 0.6, baseY);
    ctx.lineTo(x - height * 0.3, baseY - height * 0.5);
    ctx.lineTo(x - height * 0.4, baseY - height * 0.5);
    ctx.lineTo(x, baseY - height);
    ctx.lineTo(x + height * 0.4, baseY - height * 0.5);
    ctx.lineTo(x + height * 0.3, baseY - height * 0.5);
    ctx.lineTo(x + height * 0.6, baseY);
    ctx.closePath();
    ctx.fill();
}

function drawClouds(cameraX) {
    parallax.clouds.forEach(cloud => {
        const cloudX = cloud.x - cameraX * 0.05;
        ctx.fillStyle = `rgba(255, 255, 255, ${cloud.opacity})`;

        // Fluffy cloud shape
        ctx.beginPath();
        ctx.ellipse(cloudX, cloud.y, cloud.width * 0.5, cloud.height * 0.4, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(cloudX - cloud.width * 0.25, cloud.y + 5, cloud.width * 0.35, cloud.height * 0.35, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(cloudX + cloud.width * 0.3, cloud.y + 3, cloud.width * 0.4, cloud.height * 0.38, 0, 0, Math.PI * 2);
        ctx.fill();
    });
}

function drawDistantBirds() {
    ctx.fillStyle = 'rgba(40, 40, 50, 0.6)';
    parallax.birds.forEach(bird => {
        const wingAngle = Math.sin(bird.wingPhase) * 0.4;
        ctx.save();
        ctx.translate(bird.x, bird.y);

        // Simple V-shape bird
        ctx.beginPath();
        ctx.moveTo(-bird.size, wingAngle * bird.size);
        ctx.lineTo(0, 0);
        ctx.lineTo(bird.size, wingAngle * bird.size);
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = 'rgba(40, 40, 50, 0.5)';
        ctx.stroke();

        ctx.restore();
    });
}

// Shadow system for 2.5D depth
function drawShadow(x, y, width, height, intensity = 0.3) {
    const shadowOffsetX = 4;
    const shadowOffsetY = 6;

    ctx.fillStyle = `rgba(0, 0, 0, ${intensity})`;
    ctx.beginPath();
    ctx.ellipse(
        x + width / 2 + shadowOffsetX,
        y + height + shadowOffsetY,
        width * 0.5,
        height * 0.15,
        0, 0, Math.PI * 2
    );
    ctx.fill();
}

// Enhanced player drawing with shadow
function drawPlayerWithShadow() {
    // Draw shadow first
    drawShadow(player.x, player.y, TILE_SIZE, TILE_SIZE, 0.25);

    // Then draw the player (original drawPlayer function handles this)
}

// Depth-based fog/haze for distant tiles
function applyDepthFog(tileY, maxY, intensity = 0.15) {
    // Tiles at the top (further away) get more fog
    const depthRatio = 1 - (tileY / maxY);
    const fogAmount = depthRatio * intensity;

    if (fogAmount > 0.01) {
        return `rgba(180, 200, 210, ${fogAmount})`;
    }
    return null;
}

// Add depth scaling for objects (objects further away appear slightly smaller)
function getDepthScale(y, mapHeight) {
    const minScale = 0.85;
    const maxScale = 1.0;
    const depthRatio = y / (mapHeight * TILE_SIZE);
    return minScale + (maxScale - minScale) * depthRatio;
}

// Apply atmospheric perspective - subtle fog/haze at top of screen (distant areas)
function applyAtmosphericPerspective(canvasWidth, canvasHeight) {
    const season = plantation.calendar?.season || 'HARVEST';
    const dayPhase = plantation.calendar?.dayPhase || 'MORNING';

    // Create gradient fog at the top (distant areas appear hazier)
    const fogGradient = ctx.createLinearGradient(0, 0, 0, canvasHeight * 0.5);

    // Fog color varies by season and time
    let fogColor;
    if (season === 'MONSOON') {
        fogColor = dayPhase === 'MORNING' ? '180, 190, 200' : '160, 170, 180';
    } else if (dayPhase === 'EVENING') {
        fogColor = '200, 180, 160';
    } else {
        fogColor = '200, 210, 220';
    }

    const fogIntensity = season === 'MONSOON' ? 0.25 :
                         dayPhase === 'MORNING' ? 0.15 : 0.08;

    fogGradient.addColorStop(0, `rgba(${fogColor}, ${fogIntensity})`);
    fogGradient.addColorStop(0.3, `rgba(${fogColor}, ${fogIntensity * 0.5})`);
    fogGradient.addColorStop(1, `rgba(${fogColor}, 0)`);

    ctx.fillStyle = fogGradient;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight * 0.5);

    // Add subtle vignette effect for depth
    const vignetteGradient = ctx.createRadialGradient(
        canvasWidth / 2, canvasHeight / 2, canvasHeight * 0.3,
        canvasWidth / 2, canvasHeight / 2, canvasHeight * 0.8
    );
    vignetteGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
    vignetteGradient.addColorStop(1, 'rgba(0, 0, 0, 0.15)');

    ctx.fillStyle = vignetteGradient;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}

// Add foreground elements that appear in front of the player (depth layering)
function drawForegroundElements(canvasWidth, canvasHeight, cameraX, cameraY) {
    // Occasional foreground leaves/particles that drift across the camera
    const season = plantation.calendar?.season || 'HARVEST';

    if (season === 'BLOSSOM' || season === 'POST_HARVEST') {
        // Draw a few large foreground leaves/petals (close to camera, blurred)
        ctx.globalAlpha = 0.3;
        for (let i = 0; i < 3; i++) {
            const time = Date.now() * 0.001;
            const x = ((time * 30 + i * 400) % (canvasWidth + 100)) - 50;
            const y = Math.sin(time + i) * 100 + canvasHeight * 0.3;
            const size = 20 + i * 10;

            ctx.fillStyle = season === 'BLOSSOM' ?
                'rgba(255, 200, 210, 0.4)' : 'rgba(180, 140, 80, 0.4)';

            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(time * 0.5 + i);
            ctx.beginPath();
            ctx.ellipse(0, 0, size, size / 2, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
        ctx.globalAlpha = 1.0;
    }
}

const weatherEffects = {
    raindrops: [],
    sunRays: [],
    leaves: [],
    mist: { opacity: 0 },
    lastUpdate: 0,
    initialized: false
};

function initWeatherEffects() {
    if (weatherEffects.initialized) return;
    weatherEffects.initialized = true;

    // Pre-generate raindrops
    for (let i = 0; i < 200; i++) {
        weatherEffects.raindrops.push({
            x: Math.random() * 1280,
            y: Math.random() * 960,
            speed: 8 + Math.random() * 6,
            length: 10 + Math.random() * 15,
            opacity: 0.3 + Math.random() * 0.4
        });
    }

    // Pre-generate sun rays
    for (let i = 0; i < 8; i++) {
        weatherEffects.sunRays.push({
            x: Math.random() * 1280,
            width: 50 + Math.random() * 100,
            opacity: 0.05 + Math.random() * 0.1,
            speed: 0.2 + Math.random() * 0.3
        });
    }

    // Pre-generate falling leaves (for blossom/post-harvest)
    for (let i = 0; i < 30; i++) {
        weatherEffects.leaves.push({
            x: Math.random() * 1280,
            y: Math.random() * 960,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 4,
            fallSpeed: 0.5 + Math.random() * 1,
            swayOffset: Math.random() * Math.PI * 2,
            size: 4 + Math.random() * 6,
            type: Math.random() > 0.5 ? 'leaf' : 'petal'
        });
    }
}

function updateWeatherEffects() {
    const now = Date.now();
    if (now - weatherEffects.lastUpdate < 16) return; // ~60fps
    weatherEffects.lastUpdate = now;

    const season = plantation.calendar.season;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Update raindrops (for monsoon)
    if (season === 'MONSOON') {
        weatherEffects.raindrops.forEach(drop => {
            drop.y += drop.speed;
            drop.x += 2; // Wind effect
            if (drop.y > canvasHeight) {
                drop.y = -drop.length;
                drop.x = Math.random() * canvasWidth;
            }
            if (drop.x > canvasWidth) {
                drop.x = 0;
            }
        });
    }

    // Update sun rays (for dry seasons)
    if (season === 'POST_HARVEST' || season === 'BLOSSOM' || season === 'HARVEST') {
        weatherEffects.sunRays.forEach(ray => {
            ray.x += ray.speed;
            if (ray.x > canvasWidth) {
                ray.x = -ray.width;
            }
            ray.opacity = 0.05 + Math.sin(now / 1000 + ray.x / 100) * 0.05;
        });
    }

    // Update falling leaves/petals
    if (season === 'BLOSSOM' || season === 'POST_HARVEST') {
        weatherEffects.leaves.forEach(leaf => {
            leaf.y += leaf.fallSpeed;
            leaf.x += Math.sin(now / 500 + leaf.swayOffset) * 0.5;
            leaf.rotation += leaf.rotationSpeed;

            if (leaf.y > canvasHeight) {
                leaf.y = -leaf.size;
                leaf.x = Math.random() * canvasWidth;
            }
        });
    }

    // Update mist (for monsoon mornings)
    if (season === 'MONSOON' && plantation.calendar.dayPhase === 'MORNING') {
        weatherEffects.mist.opacity = Math.min(0.15, weatherEffects.mist.opacity + 0.002);
    } else {
        weatherEffects.mist.opacity = Math.max(0, weatherEffects.mist.opacity - 0.005);
    }
}

function drawWeatherEffects() {
    if (currentMap !== MAPS.PLANTATION) return;
    if (!plantation.active) return;

    initWeatherEffects();
    updateWeatherEffects();

    const season = plantation.calendar.season;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Draw rain
    if (season === 'MONSOON') {
        ctx.strokeStyle = 'rgba(180, 200, 255, 0.6)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        weatherEffects.raindrops.forEach(drop => {
            ctx.moveTo(drop.x, drop.y);
            ctx.lineTo(drop.x + 2, drop.y + drop.length);
        });
        ctx.stroke();

        // Rain splash effect at bottom
        ctx.fillStyle = 'rgba(180, 200, 255, 0.3)';
        for (let i = 0; i < 20; i++) {
            const splashX = Math.random() * canvasWidth;
            const splashY = canvasHeight - 10 - Math.random() * 20;
            ctx.beginPath();
            ctx.arc(splashX, splashY, 2, 0, Math.PI * 2);
            ctx.fill();
        }

        // Darken overlay for rain
        ctx.fillStyle = 'rgba(50, 60, 80, 0.2)';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    }

    // Draw sun rays
    if (season === 'POST_HARVEST' || season === 'BLOSSOM' || season === 'HARVEST') {
        const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
        gradient.addColorStop(0, 'rgba(255, 250, 200, 0.15)');
        gradient.addColorStop(1, 'rgba(255, 250, 200, 0)');

        weatherEffects.sunRays.forEach(ray => {
            ctx.fillStyle = `rgba(255, 250, 200, ${ray.opacity})`;
            ctx.beginPath();
            ctx.moveTo(ray.x, 0);
            ctx.lineTo(ray.x + ray.width, 0);
            ctx.lineTo(ray.x + ray.width * 1.5, canvasHeight);
            ctx.lineTo(ray.x + ray.width * 0.5, canvasHeight);
            ctx.closePath();
            ctx.fill();
        });

        // Warm overlay for sunny weather
        if (season === 'POST_HARVEST' || season === 'HARVEST') {
            ctx.fillStyle = 'rgba(255, 200, 100, 0.05)';
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        }
    }

    // Draw falling leaves/petals
    if (season === 'BLOSSOM' || season === 'POST_HARVEST') {
        weatherEffects.leaves.forEach(leaf => {
            ctx.save();
            ctx.translate(leaf.x, leaf.y);
            ctx.rotate(leaf.rotation * Math.PI / 180);

            if (leaf.type === 'petal' && season === 'BLOSSOM') {
                // Pink/white petals for blossom
                ctx.fillStyle = Math.random() > 0.5 ?
                    'rgba(255, 182, 193, 0.8)' : 'rgba(255, 240, 245, 0.8)';
                ctx.beginPath();
                ctx.ellipse(0, 0, leaf.size, leaf.size / 2, 0, 0, Math.PI * 2);
                ctx.fill();
            } else {
                // Brown/orange leaves for post-harvest
                ctx.fillStyle = Math.random() > 0.5 ?
                    'rgba(139, 90, 43, 0.7)' : 'rgba(180, 120, 60, 0.7)';
                ctx.beginPath();
                ctx.ellipse(0, 0, leaf.size, leaf.size / 2, 0, 0, Math.PI * 2);
                ctx.fill();
                // Leaf vein
                ctx.strokeStyle = 'rgba(100, 60, 30, 0.5)';
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(-leaf.size, 0);
                ctx.lineTo(leaf.size, 0);
                ctx.stroke();
            }

            ctx.restore();
        });
    }

    // Draw mist
    if (weatherEffects.mist.opacity > 0) {
        ctx.fillStyle = `rgba(200, 210, 220, ${weatherEffects.mist.opacity})`;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    }

    // Ripening season - golden hour glow
    if (season === 'RIPENING') {
        const gradient = ctx.createRadialGradient(
            canvasWidth * 0.8, canvasHeight * 0.2, 0,
            canvasWidth * 0.8, canvasHeight * 0.2, canvasWidth * 0.8
        );
        gradient.addColorStop(0, 'rgba(255, 180, 100, 0.1)');
        gradient.addColorStop(1, 'rgba(255, 180, 100, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    }

    // Planting season - fresh green tint
    if (season === 'PLANTING') {
        ctx.fillStyle = 'rgba(100, 200, 100, 0.03)';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    }
}

function render() {
    // Handle intro rendering separately
    if (gameState === STATES.INTRO) {
        updateIntro();
        drawIntro();
        return;
    }

    const mapSize = getCurrentMapSize();
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    ctx.clearRect(0, 0, mapSize.width * TILE_SIZE, mapSize.height * TILE_SIZE);

    // Draw 2.5D parallax background for exterior maps
    if (currentMap === MAPS.EXTERIOR || currentMap === MAPS.PLANTATION || currentMap === MAPS.LAKE) {
        drawParallaxBackground(canvasWidth, canvasHeight, cameraX, cameraY);
    }

    drawMap();

    // Apply depth fog to distant areas (subtle atmospheric perspective)
    if (currentMap === MAPS.EXTERIOR || currentMap === MAPS.PLANTATION) {
        applyAtmosphericPerspective(canvasWidth, canvasHeight);
    }

    // Draw grass/coffee rustling animations (on top of map, behind player)
    if (gameState === STATES.EXTERIOR_PLAY) {
        drawGrassAnimations();
    }

    if (gameState === STATES.EXTERIOR_PLAY || gameState === STATES.INTERIOR_PLAY ||
        gameState === STATES.LAKE_PLAY || gameState === STATES.SHED_PLAY ||
        gameState === STATES.PLANTATION_PLAY ||
        gameState === STATES.DIALOGUE || gameState === STATES.CODE_INPUT) {
        // Draw player shadow first (2.5D depth effect)
        if (currentMap !== MAPS.INTERIOR && currentMap !== MAPS.SHED) {
            drawShadow(player.x - cameraX, player.y - cameraY, TILE_SIZE, TILE_SIZE, 0.25);
        }
        drawPlayer();
    }

    // Draw weather effects on top (plantation only)
    if (currentMap === MAPS.PLANTATION &&
        (gameState === STATES.PLANTATION_PLAY || gameState === STATES.DIALOGUE)) {
        drawWeatherEffects();
    }

    // Draw visual effects (floating text, animations) - plantation mode
    if (currentMap === MAPS.PLANTATION) {
        visualEffects.update();
        visualEffects.draw(ctx, cameraX, cameraY);
        visualEffects.drawWarnings();
    }

    // Draw foreground elements (close to camera, creates depth)
    if (currentMap === MAPS.EXTERIOR || currentMap === MAPS.PLANTATION) {
        drawForegroundElements(canvasWidth, canvasHeight, cameraX, cameraY);
    }
}

function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
}

// =============================================
// MINI-GAMES
// =============================================

// ===== MINI-GAME SOUND EFFECTS =====

const MiniGameSounds = {
    audioCtx: null,

    getContext() {
        if (!this.audioCtx) {
            this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        return this.audioCtx;
    },

    // Cherry picking - ripe cherry pop
    playRipePick() {
        const ctx = this.getContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
    },

    // Cherry picking - green cherry buzz
    playGreenPick() {
        const ctx = this.getContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sawtooth';
        osc.frequency.value = 150;
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
    },

    // Cherry picking - overripe squish
    playOverripePick() {
        const ctx = this.getContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
    },

    // Timer warning beep (last 10 seconds)
    playTimerWarning() {
        const ctx = this.getContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'square';
        osc.frequency.value = 800;
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
    },

    // Game start fanfare
    playGameStart() {
        const ctx = this.getContext();
        const notes = [523, 659, 784, 1047]; // C, E, G, C
        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'sine';
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.1);
            gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + i * 0.1 + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.1 + 0.3);
            osc.start(ctx.currentTime + i * 0.1);
            osc.stop(ctx.currentTime + i * 0.1 + 0.3);
        });
    },

    // Game end - success
    playGameSuccess() {
        const ctx = this.getContext();
        const notes = [523, 659, 784, 1047, 1319]; // C major arpeggio
        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'sine';
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.08);
            gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + i * 0.08 + 0.03);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.08 + 0.4);
            osc.start(ctx.currentTime + i * 0.08);
            osc.stop(ctx.currentTime + i * 0.08 + 0.4);
        });
    },

    // Bean sorting - correct sort ding
    playCorrectSort() {
        const ctx = this.getContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1800, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
    },

    // Bean sorting - wrong sort thud
    playWrongSort() {
        const ctx = this.getContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
    },

    // Bean sorting - conveyor belt hum (called periodically)
    conveyorInterval: null,
    playConveyorBelt() {
        if (this.conveyorInterval) return;
        const ctx = this.getContext();
        const playHum = () => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'sine';
            osc.frequency.value = 60 + Math.random() * 10;
            gain.gain.value = 0.03;
            osc.start();
            osc.stop(ctx.currentTime + 0.2);
        };
        this.conveyorInterval = setInterval(playHum, 400);
    },
    stopConveyorBelt() {
        if (this.conveyorInterval) {
            clearInterval(this.conveyorInterval);
            this.conveyorInterval = null;
        }
    },

    // Processing - click/tap sound
    playProcessingTap() {
        const ctx = this.getContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.value = 600 + Math.random() * 200;
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
    },

    // Processing - fermentation bubbling
    fermentInterval: null,
    playFermentationBubbles() {
        if (this.fermentInterval) return;
        const ctx = this.getContext();
        const playBubble = () => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'sine';
            const baseFreq = 300 + Math.random() * 400;
            osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(baseFreq * 2, ctx.currentTime + 0.05);
            gain.gain.setValueAtTime(0.08, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
            osc.start();
            osc.stop(ctx.currentTime + 0.1);
        };
        this.fermentInterval = setInterval(playBubble, 300 + Math.random() * 400);
    },
    stopFermentationBubbles() {
        if (this.fermentInterval) {
            clearInterval(this.fermentInterval);
            this.fermentInterval = null;
        }
    },

    // Processing - stage complete chime
    playStageComplete() {
        const ctx = this.getContext();
        const notes = [659, 784, 988]; // E, G, B
        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'sine';
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.12);
            gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + i * 0.12 + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.12 + 0.3);
            osc.start(ctx.currentTime + i * 0.12);
            osc.stop(ctx.currentTime + i * 0.12 + 0.3);
        });
    },

    // Combo/streak sound (for multiple correct in a row)
    playCombo(streak) {
        const ctx = this.getContext();
        const baseFreq = 440 + (streak * 50);
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.2 + streak * 0.02, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
    }
};

// ===== PLANTATION AMBIENT & UI SOUNDS =====

const PlantationSounds = {
    audioCtx: null,
    rainInterval: null,
    birdInterval: null,
    cricketInterval: null,

    getContext() {
        if (!this.audioCtx) {
            this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        return this.audioCtx;
    },

    // Rain ambient - continuous light noise
    startRain() {
        if (this.rainInterval) return;
        const ctx = this.getContext();
        const playDrop = () => {
            const bufferSize = 2 * ctx.sampleRate;
            const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const output = noiseBuffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                output[i] = Math.random() * 2 - 1;
            }
            const whiteNoise = ctx.createBufferSource();
            whiteNoise.buffer = noiseBuffer;
            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = 400;
            const gain = ctx.createGain();
            gain.gain.value = 0.03;
            whiteNoise.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);
            whiteNoise.start();
            whiteNoise.stop(ctx.currentTime + 0.5);
        };
        this.rainInterval = setInterval(playDrop, 400);
    },

    stopRain() {
        if (this.rainInterval) {
            clearInterval(this.rainInterval);
            this.rainInterval = null;
        }
    },

    // Thunder rumble
    playThunder() {
        const ctx = this.getContext();
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = noiseBuffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 100;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.5);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start();
        noise.stop(ctx.currentTime + 1.5);
    },

    // Bird chirp (morning ambient)
    playBirdChirp() {
        const ctx = this.getContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        const baseFreq = 1800 + Math.random() * 800;
        osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.3, ctx.currentTime + 0.05);
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.9, ctx.currentTime + 0.1);
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.2, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
    },

    startBirds() {
        if (this.birdInterval) return;
        this.birdInterval = setInterval(() => {
            if (Math.random() < 0.3) this.playBirdChirp();
        }, 2000);
    },

    stopBirds() {
        if (this.birdInterval) {
            clearInterval(this.birdInterval);
            this.birdInterval = null;
        }
    },

    // Cricket chirp (evening ambient)
    playCricket() {
        const ctx = this.getContext();
        const playChirp = (delay) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'sine';
            osc.frequency.value = 4000 + Math.random() * 500;
            gain.gain.setValueAtTime(0, ctx.currentTime + delay);
            gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + delay + 0.01);
            gain.gain.linearRampToValueAtTime(0, ctx.currentTime + delay + 0.03);
            osc.start(ctx.currentTime + delay);
            osc.stop(ctx.currentTime + delay + 0.03);
        };
        // Rapid chirp pattern
        for (let i = 0; i < 5; i++) {
            playChirp(i * 0.05);
        }
    },

    startCrickets() {
        if (this.cricketInterval) return;
        this.cricketInterval = setInterval(() => {
            if (Math.random() < 0.4) this.playCricket();
        }, 1500);
    },

    stopCrickets() {
        if (this.cricketInterval) {
            clearInterval(this.cricketInterval);
            this.cricketInterval = null;
        }
    },

    // Stop all ambient sounds
    stopAllAmbient() {
        this.stopRain();
        this.stopBirds();
        this.stopCrickets();
    },

    // Update ambient based on season and time
    updateAmbient(season, dayPhase) {
        this.stopAllAmbient();

        if (season === 'MONSOON') {
            this.startRain();
            // Random thunder
            if (Math.random() < 0.1) {
                setTimeout(() => this.playThunder(), Math.random() * 5000);
            }
        }

        if (dayPhase === 'MORNING' && season !== 'MONSOON') {
            this.startBirds();
        }

        if (dayPhase === 'EVENING') {
            this.startCrickets();
        }
    },

    // Money/coin sound (for transactions)
    playCoinSound() {
        const ctx = this.getContext();
        const notes = [1318, 1568, 2093]; // E6, G6, C7
        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'sine';
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.05);
            gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + i * 0.05 + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.05 + 0.15);
            osc.start(ctx.currentTime + i * 0.05);
            osc.stop(ctx.currentTime + i * 0.05 + 0.15);
        });
    },

    // Money loss sound
    playMoneyLoss() {
        const ctx = this.getContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(400, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
    },

    // Event alert sound (for random events)
    playEventAlert() {
        const ctx = this.getContext();
        const notes = [523, 659, 523, 784]; // C, E, C, G
        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'triangle';
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.15);
            gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + i * 0.15 + 0.03);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.15 + 0.12);
            osc.start(ctx.currentTime + i * 0.15);
            osc.stop(ctx.currentTime + i * 0.15 + 0.15);
        });
    },

    // Season transition fanfare
    playSeasonTransition() {
        const ctx = this.getContext();
        const notes = [392, 440, 494, 523, 587, 659]; // G4 to E5 scale
        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'sine';
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.08);
            gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + i * 0.08 + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.08 + 0.25);
            osc.start(ctx.currentTime + i * 0.08);
            osc.stop(ctx.currentTime + i * 0.08 + 0.25);
        });
    },

    // Worker hired sound
    playWorkerHired() {
        const ctx = this.getContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(880, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
    },

    // Plant growth sound
    playPlantGrowth() {
        const ctx = this.getContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.2);
        osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
    },

    // Button click
    playClick() {
        const ctx = this.getContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.value = 1000;
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
    },

    // Warning sound (low resources)
    playWarning() {
        const ctx = this.getContext();
        for (let i = 0; i < 3; i++) {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'square';
            osc.frequency.value = 600;
            gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.2);
            gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + i * 0.2 + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.2 + 0.1);
            osc.start(ctx.currentTime + i * 0.2);
            osc.stop(ctx.currentTime + i * 0.2 + 0.1);
        }
    }
};

// ===== ACHIEVEMENT SYSTEM =====

const achievements = {
    unlocked: [],

    definitions: {
        FIRST_HARVEST: {
            id: 'FIRST_HARVEST',
            title: 'First Harvest',
            description: 'Harvest your first coffee cherries',
            icon: '🍒'
        },
        COFFEE_CONNOISSEUR: {
            id: 'COFFEE_CONNOISSEUR',
            title: 'Coffee Connoisseur',
            description: 'Sort beans with 90%+ accuracy',
            icon: '☕'
        },
        QUICK_PICKER: {
            id: 'QUICK_PICKER',
            title: 'Quick Picker',
            description: 'Pick 50+ ripe cherries in one game',
            icon: '⚡'
        },
        ESTATE_MANAGER: {
            id: 'ESTATE_MANAGER',
            title: 'Estate Manager',
            description: 'Have 10 workers at once',
            icon: '👥'
        },
        FIRST_MILLION: {
            id: 'FIRST_MILLION',
            title: 'First Million',
            description: 'Earn ₹10,00,000 total',
            icon: '💰'
        },
        PERFECT_FERMENT: {
            id: 'PERFECT_FERMENT',
            title: 'Perfect Fermentation',
            description: 'Complete fermentation in optimal window',
            icon: '🧪'
        },
        FULL_BLOOM: {
            id: 'FULL_BLOOM',
            title: 'Full Bloom',
            description: 'Have all plants flowering',
            icon: '🌸'
        },
        SEASONAL_VET: {
            id: 'SEASONAL_VET',
            title: 'Seasonal Veteran',
            description: 'Experience all 6 seasons',
            icon: '📅'
        },
        COFFEE_BARON: {
            id: 'COFFEE_BARON',
            title: 'Coffee Baron',
            description: 'Have ₹5,00,000 in wallet',
            icon: '👑'
        },
        MASTER_GRADER: {
            id: 'MASTER_GRADER',
            title: 'Master Grader',
            description: 'Sort 500 beans total',
            icon: '🎓'
        },
        MONSOON_SURVIVOR: {
            id: 'MONSOON_SURVIVOR',
            title: 'Monsoon Survivor',
            description: 'Complete monsoon without losing plants',
            icon: '🌧️'
        },
        PEST_CONTROLLER: {
            id: 'PEST_CONTROLLER',
            title: 'Pest Controller',
            description: 'Successfully treat 5 pest outbreaks',
            icon: '🐛'
        }
    },

    // Track progress for achievements
    stats: {
        totalEarnings: 0,
        totalBeansSorted: 0,
        pestsTreated: 0,
        seasonsExperienced: new Set(),
        monsoonPlantsLost: 0,
        inMonsoon: false
    },

    // Check and unlock achievement
    unlock(achievementId) {
        if (this.unlocked.includes(achievementId)) return false;

        const achievement = this.definitions[achievementId];
        if (!achievement) return false;

        this.unlocked.push(achievementId);
        this.showUnlockNotification(achievement);
        this.saveAchievements();
        return true;
    },

    // Check if unlocked
    isUnlocked(achievementId) {
        return this.unlocked.includes(achievementId);
    },

    // Show notification popup
    showUnlockNotification(achievement) {
        // Play achievement sound
        AchievementSounds.playUnlock();

        // Create popup element
        const popup = document.createElement('div');
        popup.className = 'achievement-popup';
        popup.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-info">
                <div class="achievement-title">Achievement Unlocked!</div>
                <div class="achievement-name">${achievement.title}</div>
                <div class="achievement-desc">${achievement.description}</div>
            </div>
        `;

        document.getElementById('game-container').appendChild(popup);

        // Animate in
        setTimeout(() => popup.classList.add('show'), 10);

        // Remove after delay
        setTimeout(() => {
            popup.classList.remove('show');
            setTimeout(() => popup.remove(), 500);
        }, 4000);
    },

    // Save to localStorage
    saveAchievements() {
        localStorage.setItem('coorg_achievements', JSON.stringify({
            unlocked: this.unlocked,
            stats: {
                ...this.stats,
                seasonsExperienced: Array.from(this.stats.seasonsExperienced)
            }
        }));
    },

    // Load from localStorage
    loadAchievements() {
        const saved = localStorage.getItem('coorg_achievements');
        if (saved) {
            const data = JSON.parse(saved);
            this.unlocked = data.unlocked || [];
            if (data.stats) {
                this.stats = {
                    ...this.stats,
                    ...data.stats,
                    seasonsExperienced: new Set(data.stats.seasonsExperienced || [])
                };
            }
        }
    },

    // Check various achievement conditions
    checkEarnings(amount) {
        this.stats.totalEarnings += amount;
        if (this.stats.totalEarnings >= 1000000) {
            this.unlock('FIRST_MILLION');
        }
    },

    checkWallet(amount) {
        if (amount >= 500000) {
            this.unlock('COFFEE_BARON');
        }
    },

    checkWorkers(count) {
        if (count >= 10) {
            this.unlock('ESTATE_MANAGER');
        }
    },

    checkSortingAccuracy(accuracy) {
        if (accuracy >= 90) {
            this.unlock('COFFEE_CONNOISSEUR');
        }
    },

    checkPickingScore(ripeCount) {
        if (ripeCount >= 50) {
            this.unlock('QUICK_PICKER');
        }
    },

    checkBeansSorted(count) {
        this.stats.totalBeansSorted += count;
        if (this.stats.totalBeansSorted >= 500) {
            this.unlock('MASTER_GRADER');
        }
    },

    checkSeason(season) {
        this.stats.seasonsExperienced.add(season);
        if (this.stats.seasonsExperienced.size >= 6) {
            this.unlock('SEASONAL_VET');
        }

        // Track monsoon
        if (season === 'MONSOON') {
            this.stats.inMonsoon = true;
            this.stats.monsoonPlantsLost = 0;
        } else if (this.stats.inMonsoon && season !== 'MONSOON') {
            if (this.stats.monsoonPlantsLost === 0) {
                this.unlock('MONSOON_SURVIVOR');
            }
            this.stats.inMonsoon = false;
        }
    },

    checkPestTreated() {
        this.stats.pestsTreated++;
        if (this.stats.pestsTreated >= 5) {
            this.unlock('PEST_CONTROLLER');
        }
    },

    checkFlowering(plants) {
        const allFlowering = plants.every(p => p.stage === 'FLOWERING');
        if (allFlowering && plants.length > 0) {
            this.unlock('FULL_BLOOM');
        }
    },

    checkFermentation(hours) {
        if (hours >= 36 && hours <= 48) {
            this.unlock('PERFECT_FERMENT');
        }
    }
};

// Achievement unlock sounds
const AchievementSounds = {
    audioCtx: null,

    getContext() {
        if (!this.audioCtx) {
            this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        return this.audioCtx;
    },

    playUnlock() {
        const ctx = this.getContext();
        // Triumphant fanfare
        const notes = [523, 659, 784, 1047, 1319, 1568]; // C major chord + high notes
        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'sine';
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.06);
            gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + i * 0.06 + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.06 + 0.5);
            osc.start(ctx.currentTime + i * 0.06);
            osc.stop(ctx.currentTime + i * 0.06 + 0.5);
        });
        // Add shimmer
        for (let i = 0; i < 5; i++) {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'sine';
            osc.frequency.value = 2000 + Math.random() * 2000;
            gain.gain.setValueAtTime(0, ctx.currentTime + 0.3 + i * 0.05);
            gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.3 + i * 0.05 + 0.01);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3 + i * 0.05 + 0.15);
            osc.start(ctx.currentTime + 0.3 + i * 0.05);
            osc.stop(ctx.currentTime + 0.3 + i * 0.05 + 0.15);
        }
    }
};

// ===== VISUAL POLISH - FLOATING TEXT & ANIMATIONS =====

const visualEffects = {
    floatingTexts: [],
    plantAnimations: [],
    resourceWarnings: new Map(),

    // Add floating text (for money gains/losses, notifications)
    addFloatingText(x, y, text, color = '#FFD700', duration = 2000) {
        this.floatingTexts.push({
            x, y,
            text,
            color,
            startTime: Date.now(),
            duration,
            opacity: 1,
            offsetY: 0
        });
    },

    // Add floating text relative to screen (not world position)
    addScreenText(screenX, screenY, text, color = '#FFD700') {
        this.addFloatingText(screenX, screenY, text, color);
    },

    // Add plant growth animation
    addPlantGrowthAnimation(tileX, tileY) {
        this.plantAnimations.push({
            x: tileX,
            y: tileY,
            startTime: Date.now(),
            duration: 800,
            type: 'growth'
        });
        PlantationSounds.playPlantGrowth();
    },

    // Add resource warning flash
    addResourceWarning(resourceType) {
        this.resourceWarnings.set(resourceType, {
            startTime: Date.now(),
            duration: 2000
        });
        PlantationSounds.playWarning();
    },

    // Update all effects
    update() {
        const now = Date.now();

        // Update floating texts
        this.floatingTexts = this.floatingTexts.filter(ft => {
            const elapsed = now - ft.startTime;
            if (elapsed >= ft.duration) return false;
            ft.opacity = 1 - (elapsed / ft.duration);
            ft.offsetY = -30 * (elapsed / ft.duration);
            return true;
        });

        // Update plant animations
        this.plantAnimations = this.plantAnimations.filter(pa => {
            return (now - pa.startTime) < pa.duration;
        });

        // Update resource warnings
        for (const [key, warning] of this.resourceWarnings) {
            if (now - warning.startTime >= warning.duration) {
                this.resourceWarnings.delete(key);
            }
        }
    },

    // Draw all effects
    draw(ctx, cameraX = 0, cameraY = 0) {
        const now = Date.now();

        // Draw floating texts
        this.floatingTexts.forEach(ft => {
            ctx.save();
            ctx.globalAlpha = ft.opacity;
            ctx.font = 'bold 16px Arial';
            ctx.fillStyle = ft.color;
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 3;
            ctx.textAlign = 'center';
            ctx.strokeText(ft.text, ft.x, ft.y + ft.offsetY);
            ctx.fillText(ft.text, ft.x, ft.y + ft.offsetY);
            ctx.restore();
        });

        // Draw plant growth animations (sparkles)
        this.plantAnimations.forEach(pa => {
            const elapsed = now - pa.startTime;
            const progress = elapsed / pa.duration;
            const px = pa.x * TILE_SIZE - cameraX + TILE_SIZE / 2;
            const py = pa.y * TILE_SIZE - cameraY + TILE_SIZE / 2;

            // Draw expanding ring
            ctx.save();
            ctx.strokeStyle = `rgba(144, 238, 144, ${1 - progress})`;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(px, py, TILE_SIZE * progress, 0, Math.PI * 2);
            ctx.stroke();

            // Draw sparkles
            for (let i = 0; i < 6; i++) {
                const angle = (i / 6) * Math.PI * 2 + progress * Math.PI;
                const dist = TILE_SIZE * 0.5 * (1 + progress);
                const sx = px + Math.cos(angle) * dist;
                const sy = py + Math.sin(angle) * dist;
                ctx.fillStyle = `rgba(255, 255, 100, ${1 - progress})`;
                ctx.beginPath();
                ctx.arc(sx, sy, 3 * (1 - progress), 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        });
    },

    // Draw resource warning indicators on HUD elements
    drawWarnings() {
        const now = Date.now();

        for (const [resourceType, warning] of this.resourceWarnings) {
            const elapsed = now - warning.startTime;
            const flash = Math.sin(elapsed / 100 * Math.PI) > 0;

            let elementId;
            switch (resourceType) {
                case 'money': elementId = 'plant-money-display'; break;
                case 'water': elementId = 'water-display'; break;
                case 'power': elementId = 'power-display'; break;
                case 'workers': elementId = 'workers-display'; break;
            }

            if (elementId) {
                const element = document.getElementById(elementId);
                if (element) {
                    element.style.backgroundColor = flash ? '#ff4444' : '';
                    element.style.color = flash ? '#fff' : '';
                }
            }
        }
    },

    // Clear warning styles
    clearWarnings() {
        ['plant-money-display', 'water-display', 'power-display', 'workers-display'].forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.style.backgroundColor = '';
                el.style.color = '';
            }
        });
    }
};

// Initialize achievements on load
achievements.loadAchievements();

// ===== CHERRY PICKING MINI-GAME =====

const pickingGame = {
    canvas: null,
    ctx: null,
    cherries: [],
    score: 0,
    timer: 60,
    timerInterval: null,
    active: false,
    coffeeType: 'arabica',
    gridSize: 8,
    cherrySize: 56,
    picked: { ripe: 0, green: 0, overripe: 0 }
};

function startPickingGame(coffeeType = 'arabica') {
    pickingGame.coffeeType = coffeeType;
    pickingGame.canvas = document.getElementById('picking-canvas');
    pickingGame.ctx = pickingGame.canvas.getContext('2d');
    pickingGame.score = 0;
    pickingGame.timer = 60;
    pickingGame.cherries = [];
    pickingGame.picked = { ripe: 0, green: 0, overripe: 0 };
    pickingGame.active = true;
    pickingGame.streak = 0;  // Track combo streak

    // Generate cherry grid
    generateCherries();

    // Show game
    document.getElementById('picking-game').classList.remove('hidden');
    gameState = STATES.MINIGAME_PICKING;

    // Play start sound
    MiniGameSounds.playGameStart();

    // Update display
    updatePickingDisplay();

    // Start timer with warning sounds
    pickingGame.timerInterval = setInterval(() => {
        pickingGame.timer--;
        updatePickingDisplay();

        // Timer warning beeps in last 10 seconds
        if (pickingGame.timer <= 10 && pickingGame.timer > 0) {
            MiniGameSounds.playTimerWarning();
        }

        if (pickingGame.timer <= 0) {
            endPickingGame();
        }
    }, 1000);

    // Add click listener
    pickingGame.canvas.addEventListener('click', handlePickingClick);

    // Initial render
    renderPickingGame();
}

function generateCherries() {
    const { gridSize, cherrySize } = pickingGame;

    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            // Random cherry type: 60% ripe, 25% green, 15% overripe
            const rand = Math.random();
            let type;
            if (rand < 0.60) type = 'ripe';
            else if (rand < 0.85) type = 'green';
            else type = 'overripe';

            pickingGame.cherries.push({
                x: col * cherrySize + cherrySize / 2,
                y: row * cherrySize + cherrySize / 2,
                type: type,
                picked: false,
                size: 18 + Math.random() * 8
            });
        }
    }
}

function handlePickingClick(e) {
    if (!pickingGame.active) return;

    const rect = pickingGame.canvas.getBoundingClientRect();
    const scaleX = pickingGame.canvas.width / rect.width;
    const scaleY = pickingGame.canvas.height / rect.height;
    const clickX = (e.clientX - rect.left) * scaleX;
    const clickY = (e.clientY - rect.top) * scaleY;

    // Check if clicked on a cherry
    for (const cherry of pickingGame.cherries) {
        if (cherry.picked) continue;

        const dist = Math.sqrt((clickX - cherry.x) ** 2 + (clickY - cherry.y) ** 2);
        if (dist < cherry.size + 5) {
            cherry.picked = true;

            switch (cherry.type) {
                case 'ripe':
                    pickingGame.score += 10;
                    pickingGame.picked.ripe++;
                    pickingGame.streak++;
                    MiniGameSounds.playRipePick();
                    // Combo sound for streaks of 3+
                    if (pickingGame.streak >= 3) {
                        MiniGameSounds.playCombo(pickingGame.streak);
                    }
                    break;
                case 'green':
                    pickingGame.score -= 5;
                    pickingGame.picked.green++;
                    pickingGame.streak = 0;  // Reset streak
                    MiniGameSounds.playGreenPick();
                    break;
                case 'overripe':
                    pickingGame.score += 3;
                    pickingGame.picked.overripe++;
                    // Overripe doesn't break streak but doesn't add to it
                    MiniGameSounds.playOverripePick();
                    break;
            }

            updatePickingDisplay();
            renderPickingGame();
            break;
        }
    }
}

function updatePickingDisplay() {
    document.getElementById('picking-timer').textContent = `${pickingGame.timer}s`;
    document.getElementById('picking-score').textContent = `Score: ${pickingGame.score}`;
}

function renderPickingGame() {
    const { ctx, canvas, cherries } = pickingGame;

    // Clear canvas with leaf background
    ctx.fillStyle = '#1a3a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw leaf pattern
    ctx.fillStyle = '#2a5a2a';
    for (let i = 0; i < 20; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        ctx.beginPath();
        ctx.ellipse(x, y, 15, 8, Math.random() * Math.PI, 0, Math.PI * 2);
        ctx.fill();
    }

    // Draw cherries
    cherries.forEach(cherry => {
        if (cherry.picked) return;

        const colors = {
            ripe: { main: '#cc2222', highlight: '#ff4444' },
            green: { main: '#22aa22', highlight: '#44cc44' },
            overripe: { main: '#551111', highlight: '#773333' }
        };

        const color = colors[cherry.type];

        // Draw stem
        ctx.strokeStyle = '#4a3018';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cherry.x, cherry.y - cherry.size);
        ctx.lineTo(cherry.x + 3, cherry.y - cherry.size - 8);
        ctx.stroke();

        // Draw cherry pair
        ctx.fillStyle = color.main;
        ctx.beginPath();
        ctx.arc(cherry.x - 5, cherry.y, cherry.size * 0.9, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(cherry.x + 5, cherry.y, cherry.size * 0.9, 0, Math.PI * 2);
        ctx.fill();

        // Highlight
        ctx.fillStyle = color.highlight;
        ctx.beginPath();
        ctx.arc(cherry.x - 7, cherry.y - 4, cherry.size * 0.3, 0, Math.PI * 2);
        ctx.fill();
    });
}

function endPickingGame() {
    pickingGame.active = false;

    if (pickingGame.timerInterval) {
        clearInterval(pickingGame.timerInterval);
        pickingGame.timerInterval = null;
    }

    pickingGame.canvas.removeEventListener('click', handlePickingClick);

    const { picked, coffeeType } = pickingGame;
    const totalPicked = picked.ripe + picked.overripe;
    // Each cherry pair yields 0.05 kg (50g) - a full good game can yield ~2-3 kg
    const yieldKg = totalPicked * 0.05;
    const qualityRatio = picked.ripe / (totalPicked || 1);
    // Bonus yield for high quality picking (mostly ripe cherries)
    const qualityBonus = qualityRatio >= 0.8 ? 1.2 : qualityRatio >= 0.6 ? 1.1 : 1.0;
    const finalYield = yieldKg * qualityBonus;

    plantationResources.inventory.cherries[coffeeType] += finalYield;

    // Check achievements
    achievements.unlock('FIRST_HARVEST');
    achievements.checkPickingScore(picked.ripe);

    // Play success sound
    MiniGameSounds.playGameSuccess();

    document.getElementById('picking-game').classList.add('hidden');
    gameState = STATES.PLANTATION_PLAY;

    const qualityText = qualityRatio >= 0.8 ? 'Excellent' :
                        qualityRatio >= 0.6 ? 'Good' :
                        qualityRatio >= 0.4 ? 'Fair' : 'Poor';

    const bonusText = qualityBonus > 1 ? ` (+${Math.round((qualityBonus - 1) * 100)}% quality bonus!)` : '';

    showDialogue('Picking Complete!', [
        `Score: ${pickingGame.score} points`,
        `Ripe: ${picked.ripe} | Overripe: ${picked.overripe} | Green: ${picked.green}`,
        `Harvest: ${finalYield.toFixed(2)} kg of ${coffeeType}${bonusText}`,
        `Quality: ${qualityText}`
    ]);

    updatePlantationHUD();
    autoSave();
}

// ===== BEAN SORTING MINI-GAME =====

const sortingGame = {
    canvas: null,
    ctx: null,
    beans: [],
    currentBean: null,
    sorted: 0,
    correct: 0,
    total: 30,
    active: false,
    coffeeType: 'arabica',
    results: { MNEB: 0, A: 0, B: 0, C: 0, reject: 0 },
    conveyorX: 0
};

function startSortingGame(coffeeType = 'arabica') {
    // Check if there's parchment to sort
    if (plantationResources.inventory.parchment[coffeeType] < 0.5) {
        showDialogue('No Parchment', [
            `Not enough ${coffeeType} parchment beans to sort.`,
            'Process cherries first to get parchment!'
        ]);
        return;
    }

    sortingGame.coffeeType = coffeeType;
    sortingGame.canvas = document.getElementById('sorting-canvas');
    sortingGame.ctx = sortingGame.canvas.getContext('2d');
    sortingGame.beans = [];
    sortingGame.sorted = 0;
    sortingGame.correct = 0;
    sortingGame.total = 30;
    sortingGame.active = true;
    sortingGame.results = { MNEB: 0, A: 0, B: 0, C: 0, reject: 0 };
    sortingGame.streak = 0;  // Track sorting streak

    generateBeans();
    sortingGame.currentBean = sortingGame.beans.shift();

    document.getElementById('sorting-game').classList.remove('hidden');
    gameState = STATES.MINIGAME_SORTING;

    // Play start sound and conveyor belt
    MiniGameSounds.playGameStart();
    MiniGameSounds.playConveyorBelt();

    updateSortingDisplay();
    document.addEventListener('keydown', handleSortingKey);

    // Add touch/click support for sort bins (mobile)
    setupSortingBinTouch();

    sortingAnimationLoop();
}

function setupSortingBinTouch() {
    document.querySelectorAll('.sort-bin').forEach(bin => {
        const grade = bin.dataset.grade;

        const handleBinTap = (e) => {
            e.preventDefault();
            if (sortingGame.active && sortingGame.currentBean) {
                sortBean(grade);
            }
        };

        bin.addEventListener('touchstart', handleBinTap, { passive: false });
        bin.addEventListener('click', handleBinTap);
    });
}

function generateBeans() {
    for (let i = 0; i < sortingGame.total; i++) {
        const size = 0.2 + Math.random() * 0.8;
        const color = 0.2 + Math.random() * 0.8;
        const shape = 0.2 + Math.random() * 0.8;

        let correctGrade;
        if (size > 0.8 && color > 0.85 && shape > 0.9) correctGrade = 'MNEB';
        else if (size > 0.6 && color > 0.7 && shape > 0.7) correctGrade = 'A';
        else if (size > 0.4 && color > 0.5 && shape > 0.5) correctGrade = 'B';
        else if (size > 0.2 && color > 0.3 && shape > 0.3) correctGrade = 'C';
        else correctGrade = 'reject';

        sortingGame.beans.push({ size, color, shape, correctGrade, x: 800, y: 150 });
    }
}

function handleSortingKey(e) {
    if (!sortingGame.active || !sortingGame.currentBean) return;

    let selectedGrade = null;
    switch (e.key) {
        case '1': selectedGrade = 'MNEB'; break;
        case '2': selectedGrade = 'A'; break;
        case '3': selectedGrade = 'B'; break;
        case '4': selectedGrade = 'C'; break;
        case 'r': case 'R': selectedGrade = 'reject'; break;
        case 'Escape': endSortingGame(true); return;
    }

    if (selectedGrade) {
        e.preventDefault();
        sortBean(selectedGrade);
    }
}

function sortBean(grade) {
    const bean = sortingGame.currentBean;
    if (!bean) return;

    const isCorrect = grade === bean.correctGrade;
    if (isCorrect) {
        sortingGame.correct++;
        sortingGame.streak++;
        MiniGameSounds.playCorrectSort();
        // Combo sound for streaks of 3+
        if (sortingGame.streak >= 3) {
            MiniGameSounds.playCombo(sortingGame.streak);
        }
    } else {
        sortingGame.streak = 0;
        MiniGameSounds.playWrongSort();
    }

    sortingGame.results[grade]++;
    sortingGame.sorted++;

    document.querySelectorAll('.sort-bin').forEach(bin => {
        bin.classList.remove('active', 'correct', 'wrong');
        if (bin.dataset.grade === grade) {
            bin.classList.add('active', isCorrect ? 'correct' : 'wrong');
            setTimeout(() => bin.classList.remove('active', 'correct', 'wrong'), 300);
        }
    });

    if (sortingGame.beans.length > 0) {
        sortingGame.currentBean = sortingGame.beans.shift();
        sortingGame.currentBean.x = 800;
    } else {
        sortingGame.currentBean = null;
        endSortingGame();
    }

    updateSortingDisplay();
}

function updateSortingDisplay() {
    const accuracy = sortingGame.sorted > 0 ?
        Math.round((sortingGame.correct / sortingGame.sorted) * 100) : 100;
    document.getElementById('sort-accuracy').textContent = `${accuracy}%`;
    document.getElementById('sorted-count').textContent = `${sortingGame.sorted}/${sortingGame.total}`;
}

function sortingAnimationLoop() {
    if (!sortingGame.active) return;

    const { ctx, canvas, currentBean } = sortingGame;

    ctx.fillStyle = '#2a2a2a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Conveyor belt
    ctx.fillStyle = '#4a4a4a';
    ctx.fillRect(0, 120, canvas.width, 80);
    ctx.strokeStyle = '#3a3a3a';
    ctx.lineWidth = 2;
    sortingGame.conveyorX = (sortingGame.conveyorX - 2) % 40;
    for (let x = sortingGame.conveyorX; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 120);
        ctx.lineTo(x, 200);
        ctx.stroke();
    }

    if (currentBean) {
        if (currentBean.x > 400) currentBean.x -= 3;

        const beanWidth = 30 + currentBean.size * 20;
        const beanHeight = 20 + currentBean.shape * 15;
        const r = Math.floor(100 + (1 - currentBean.color) * 100);
        const g = Math.floor(60 + currentBean.color * 40);
        const b = Math.floor(30 + currentBean.color * 20);

        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.beginPath();
        ctx.ellipse(currentBean.x, currentBean.y, beanWidth / 2, beanHeight / 2, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = `rgb(${r - 30}, ${g - 20}, ${b - 10})`;
        ctx.beginPath();
        ctx.moveTo(currentBean.x - beanWidth / 4, currentBean.y);
        ctx.lineTo(currentBean.x + beanWidth / 4, currentBean.y);
        ctx.stroke();

        ctx.fillStyle = '#fff';
        ctx.font = '12px monospace';
        ctx.fillText(`Size: ${(currentBean.size * 100).toFixed(0)}%`, 20, 30);
        ctx.fillText(`Color: ${(currentBean.color * 100).toFixed(0)}%`, 20, 50);
        ctx.fillText(`Shape: ${(currentBean.shape * 100).toFixed(0)}%`, 20, 70);
    }

    ctx.fillStyle = '#666';
    ctx.font = '12px monospace';
    ctx.fillText('1:MNEB  2:A  3:B  4:C  R:Reject', canvas.width / 2 - 100, 280);

    requestAnimationFrame(sortingAnimationLoop);
}

function endSortingGame(cancelled = false) {
    sortingGame.active = false;
    document.removeEventListener('keydown', handleSortingKey);
    document.getElementById('sorting-game').classList.add('hidden');
    gameState = STATES.PLANTATION_PLAY;

    // Stop conveyor belt sound
    MiniGameSounds.stopConveyorBelt();

    if (cancelled) { showDialogue('Sorting Cancelled', ['You stopped sorting early.']); return; }

    // Play success sound
    MiniGameSounds.playGameSuccess();

    const { correct, sorted, results, coffeeType } = sortingGame;
    const accuracyPctForAchievement = sorted > 0 ? (correct / sorted * 100) : 0;

    // Check achievements
    achievements.checkSortingAccuracy(accuracyPctForAchievement);
    achievements.checkBeansSorted(sorted);
    const accuracy = sorted > 0 ? (correct / sorted) : 0;
    const inv = plantationResources.inventory.greenBeans;
    // Base multiplier increased, with accuracy bonus for skilled sorting
    const baseMultiplier = 0.15;
    const accuracyBonus = accuracy >= 0.9 ? 1.3 : accuracy >= 0.75 ? 1.15 : accuracy >= 0.5 ? 1.0 : 0.8;
    const multiplier = baseMultiplier * accuracyBonus;

    let totalYield = 0;
    if (coffeeType === 'arabica') {
        const mnebYield = results.MNEB * multiplier * 1.2;
        const aYield = results.A * multiplier;
        const bYield = results.B * multiplier * 0.9;
        const cYield = results.C * multiplier * 0.8;
        inv.arabica.MNEB += mnebYield;
        inv.arabica.A += aYield;
        inv.arabica.B += bYield;
        inv.arabica.C += cYield;
        totalYield = mnebYield + aYield + bYield + cYield;
    } else {
        const aYield = results.A * multiplier;
        const bYield = results.B * multiplier * 0.9;
        const cYield = results.C * multiplier * 0.8;
        inv.robusta.A += aYield;
        inv.robusta.B += bYield;
        inv.robusta.C += cYield;
        totalYield = aYield + bYield + cYield;
    }

    plantationResources.inventory.parchment[coffeeType] = Math.max(0,
        plantationResources.inventory.parchment[coffeeType] - sorted * 0.05);

    const accuracyPct = Math.round(accuracy * 100);
    const bonusText = accuracyBonus > 1 ? ` (+${Math.round((accuracyBonus - 1) * 100)}% accuracy bonus!)` : '';
    showDialogue('Sorting Complete!', [
        `Sorted: ${sorted} beans | Accuracy: ${accuracyPct}%${bonusText}`,
        `MNEB: ${results.MNEB} | A: ${results.A} | B: ${results.B}`,
        `C: ${results.C} | Rejected: ${results.reject}`,
        `Total green beans: ${totalYield.toFixed(2)} kg`
    ]);

    updatePlantationHUD();
    autoSave();
}

// ===== PROCESSING MINI-GAME =====

const processingGame = {
    stage: 'PULPING',
    progress: 0,
    fermentationHours: 0,
    quality: 100,
    active: false,
    coffeeType: 'arabica',
    processType: 'wet',
    interval: null
};

function startProcessingGame(coffeeType = 'arabica') {
    if (plantationResources.inventory.cherries[coffeeType] < 1) {
        showDialogue('No Cherries', [
            `Not enough ${coffeeType} cherries to process.`,
            'Harvest some coffee cherries first!'
        ]);
        return;
    }

    processingGame.coffeeType = coffeeType;
    processingGame.processType = coffeeType === 'arabica' ? 'wet' : 'dry';
    processingGame.stage = 'PULPING';
    processingGame.progress = 0;
    processingGame.fermentationHours = 0;
    processingGame.quality = 100;
    processingGame.active = true;

    document.getElementById('processing-game').classList.remove('hidden');
    document.getElementById('fermentation-timer').classList.add('hidden');
    gameState = STATES.MINIGAME_PROCESSING;

    // Play start sound
    MiniGameSounds.playGameStart();

    updateProcessingDisplay();

    const progressContainer = document.getElementById('processing-progress-container');
    progressContainer.addEventListener('click', handleProcessingClick);
    // Add touch support for faster tapping on mobile
    progressContainer.addEventListener('touchstart', (e) => {
        e.preventDefault();
        handleProcessingClick();
    }, { passive: false });

    document.getElementById('check-ferment-btn')?.addEventListener('click', checkFermentation);
}

function handleProcessingClick() {
    if (!processingGame.active) return;

    if (processingGame.stage === 'PULPING' || processingGame.stage === 'WASHING') {
        processingGame.progress += 5;
        MiniGameSounds.playProcessingTap();
        updateProcessingDisplay();

        if (processingGame.progress >= 100) {
            advanceProcessingStage();
        }
    }
}

function advanceProcessingStage() {
    const { stage, processType } = processingGame;

    // Play stage complete sound
    MiniGameSounds.playStageComplete();

    if (processType === 'wet') {
        switch (stage) {
            case 'PULPING':
                processingGame.stage = 'FERMENTING';
                processingGame.progress = 0;
                document.getElementById('fermentation-timer').classList.remove('hidden');
                // Start fermentation bubbles sound
                MiniGameSounds.playFermentationBubbles();
                processingGame.interval = setInterval(() => {
                    processingGame.fermentationHours += 4;
                    updateProcessingDisplay();
                }, 1000);
                break;
            case 'WASHING':
                processingGame.stage = 'DRYING';
                processingGame.progress = 0;
                startDryingPhase();
                break;
        }
    } else {
        if (stage === 'PULPING') {
            processingGame.stage = 'DRYING';
            processingGame.progress = 0;
            startDryingPhase();
        }
    }
    updateProcessingDisplay();
}

function checkFermentation() {
    if (processingGame.stage !== 'FERMENTING') return;

    if (processingGame.interval) {
        clearInterval(processingGame.interval);
        processingGame.interval = null;
    }

    // Stop fermentation bubbles sound
    MiniGameSounds.stopFermentationBubbles();

    const hours = processingGame.fermentationHours;
    let message, qualityChange;

    if (hours < 12) {
        qualityChange = -30;
        message = [`Only ${hours}h - under-fermented! Quality reduced.`];
        MiniGameSounds.playWrongSort();  // Negative feedback
    } else if (hours >= 36 && hours <= 48) {
        qualityChange = 10;
        message = [`${hours}h - perfect fermentation! Quality bonus!`];
        MiniGameSounds.playStageComplete();  // Positive feedback
        achievements.checkFermentation(hours);  // Check for perfect fermentation achievement
    } else if (hours > 48 && hours <= 60) {
        qualityChange = -10;
        message = [`${hours}h - slightly over-fermented.`];
    } else {
        qualityChange = -40;
        message = [`${hours}h - over-fermented! Quality lost.`];
        MiniGameSounds.playWrongSort();  // Negative feedback
    }

    processingGame.quality += qualityChange;

    showDialogue('Fermentation Check', message, () => {
        processingGame.stage = 'WASHING';
        processingGame.progress = 0;
        document.getElementById('fermentation-timer').classList.add('hidden');
        updateProcessingDisplay();
    });
}

function startDryingPhase() {
    processingGame.interval = setInterval(() => {
        processingGame.progress += 2;
        updateProcessingDisplay();

        if (processingGame.progress >= 100) {
            clearInterval(processingGame.interval);
            endProcessingGame();
        }
    }, 200);
}

function updateProcessingDisplay() {
    const { stage, progress, fermentationHours, processType } = processingGame;

    const stageNames = {
        PULPING: processType === 'wet' ? 'Pulping (click!)' : 'Spreading (click!)',
        FERMENTING: 'Fermenting (wait...)',
        WASHING: 'Washing (click!)',
        DRYING: 'Drying...'
    };

    document.getElementById('processing-title').textContent = `Processing: ${processingGame.coffeeType.toUpperCase()}`;
    document.getElementById('processing-stage').textContent = `Stage: ${stageNames[stage] || stage}`;

    const progressBar = document.getElementById('processing-progress-bar');
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
        progressBar.style.background = stage === 'FERMENTING' ? '#ffd700' : '#4a7a4a';
    }

    if (stage === 'FERMENTING') {
        document.getElementById('ferm-hours').textContent = fermentationHours;
        const hint = document.getElementById('ferm-hint');
        if (hint) {
            if (fermentationHours < 36) { hint.textContent = 'Keep waiting... (36-48h optimal)'; hint.style.color = '#ffd700'; }
            else if (fermentationHours <= 48) { hint.textContent = 'Optimal! Check now!'; hint.style.color = '#6bff6b'; }
            else { hint.textContent = 'Over-fermenting! Check soon!'; hint.style.color = '#ff6b6b'; }
        }
    }

    const instructions = document.getElementById('processing-instructions');
    if (instructions) {
        const msgs = {
            PULPING: 'Click rapidly to pulp cherries!',
            FERMENTING: 'Wait for optimal time (36-48h), then click Check.',
            WASHING: 'Click rapidly to wash beans!',
            DRYING: 'Beans are drying automatically...'
        };
        instructions.textContent = msgs[stage] || '';
    }
}

function endProcessingGame() {
    processingGame.active = false;
    if (processingGame.interval) { clearInterval(processingGame.interval); }
    document.getElementById('processing-progress-container')?.removeEventListener('click', handleProcessingClick);
    document.getElementById('processing-game').classList.add('hidden');
    gameState = STATES.PLANTATION_PLAY;

    // Stop any ongoing sounds and play success
    MiniGameSounds.stopFermentationBubbles();
    MiniGameSounds.playGameSuccess();

    const { coffeeType, quality } = processingGame;
    // Can process up to 10 kg of cherries at once
    const cherriesUsed = Math.min(10, plantationResources.inventory.cherries[coffeeType]);
    // Base 60% conversion rate, quality affects final yield
    const baseYield = cherriesUsed * 0.6;
    // Exceptional quality (100+) gives bonus, low quality gives penalty
    const qualityMultiplier = quality >= 100 ? 1.15 : quality >= 80 ? 1.0 : quality >= 60 ? 0.9 : 0.75;
    const parchmentYield = baseYield * qualityMultiplier;

    plantationResources.inventory.cherries[coffeeType] = Math.max(0,
        plantationResources.inventory.cherries[coffeeType] - cherriesUsed);
    plantationResources.inventory.parchment[coffeeType] += parchmentYield;

    const qualityText = quality >= 100 ? 'Exceptional' : quality >= 80 ? 'High' : quality >= 60 ? 'Standard' : 'Low';
    const bonusText = qualityMultiplier > 1 ? ' (+15% quality bonus!)' : qualityMultiplier < 1 ? ` (${Math.round((1 - qualityMultiplier) * 100)}% quality penalty)` : '';

    showDialogue('Processing Complete!', [
        `Cherries processed: ${cherriesUsed.toFixed(1)}kg`,
        `Parchment yield: ${parchmentYield.toFixed(2)}kg${bonusText}`,
        `Quality: ${qualityText} (${quality}%)`
    ]);

    updatePlantationHUD();
    autoSave();
}

// =============================================
// SAVE/LOAD SYSTEM
// =============================================

const SAVE_KEY = 'coorg_estate_save';
const SAVE_VERSION = 1;

function saveGame() {
    try {
        const saveData = {
            version: SAVE_VERSION,
            timestamp: Date.now(),

            // Player state
            player: {
                x: player.x,
                y: player.y,
                direction: player.direction,
                name: player.name,
                gender: player.gender,
                hasAxe: player.hasAxe,
                hasShovel: player.hasShovel,
                foundSnowy: player.foundSnowy,
                money: player.money,
                hasFishingRod: player.hasFishingRod,
                inBoat: player.inBoat,
                boatX: player.boatX,
                boatY: player.boatY,
                // Mystery flags
                heardMysteryStory: player.heardMysteryStory,
                foundTreeCarving: player.foundTreeCarving,
                foundCollarClue: player.foundCollarClue,
                boughtCamera: player.boughtCamera,
                foundClosetClue: player.foundClosetClue,
                foundBuriedJournal: player.foundBuriedJournal,
                caughtLakeSafe: player.caughtLakeSafe,
                hasWeddingRing: player.hasWeddingRing,
                seenShimmerHint: player.seenShimmerHint
            },

            // Game state
            gameState: gameState,
            currentMap: currentMap,

            // Plantation data
            plantation: {
                calendar: { ...plantation.calendar },
                plants: {
                    arabica: plantation.plants.arabica.map(p => ({ ...p })),
                    robusta: plantation.plants.robusta.map(p => ({ ...p }))
                },
                workers: plantation.workers.map(w => ({ ...w })),
                maxWorkers: plantation.maxWorkers,
                tutorialComplete: plantation.tutorialComplete,
                active: plantation.active,
                shownTips: Array.from(plantation.shownTips || []),
                priceBonus: plantation.priceBonus
            },

            // Plantation resources
            plantationResources: {
                money: plantationResources.money,
                water: { ...plantationResources.water },
                power: { ...plantationResources.power },
                inventory: {
                    cherries: { ...plantationResources.inventory.cherries },
                    parchment: { ...plantationResources.inventory.parchment },
                    greenBeans: {
                        arabica: { ...plantationResources.inventory.greenBeans.arabica },
                        robusta: { ...plantationResources.inventory.greenBeans.robusta }
                    }
                },
                supplies: { ...plantationResources.supplies }
            },

            // Market prices
            currentMarketPrices: { ...currentMarketPrices }
        };

        localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
        console.log('Game saved successfully');
        return true;
    } catch (error) {
        console.error('Failed to save game:', error);
        return false;
    }
}

function loadGame() {
    try {
        const savedData = localStorage.getItem(SAVE_KEY);
        if (!savedData) {
            console.log('No save data found');
            return false;
        }

        const data = JSON.parse(savedData);

        // Version check for future compatibility
        if (data.version !== SAVE_VERSION) {
            console.warn('Save version mismatch, may have compatibility issues');
        }

        // Restore player state
        Object.assign(player, data.player);

        // Restore game state
        gameState = data.gameState;
        currentMap = data.currentMap;

        // Restore plantation data
        plantation.calendar = data.plantation.calendar;
        plantation.plants.arabica = data.plantation.plants.arabica;
        plantation.plants.robusta = data.plantation.plants.robusta;
        plantation.workers = data.plantation.workers;
        plantation.maxWorkers = data.plantation.maxWorkers;
        plantation.tutorialComplete = data.plantation.tutorialComplete;
        plantation.active = data.plantation.active;
        plantation.shownTips = new Set(data.plantation.shownTips || []);
        plantation.priceBonus = data.plantation.priceBonus || 0;

        // Restore plantation resources
        plantationResources.money = data.plantationResources.money;
        plantationResources.water = data.plantationResources.water;
        plantationResources.power = data.plantationResources.power;
        plantationResources.inventory = data.plantationResources.inventory;
        plantationResources.supplies = data.plantationResources.supplies;

        // Restore market prices
        if (data.currentMarketPrices) {
            Object.assign(currentMarketPrices, data.currentMarketPrices);
        }

        // Update UI based on restored state
        updateCanvasForMap();
        updateUI();

        console.log('Game loaded successfully');
        return true;
    } catch (error) {
        console.error('Failed to load game:', error);
        return false;
    }
}

function updateCanvasForMap() {
    if (currentMap === MAPS.EXTERIOR) {
        canvas.width = EXTERIOR_CANVAS_WIDTH;
        canvas.height = EXTERIOR_CANVAS_HEIGHT;
    } else if (currentMap === MAPS.INTERIOR) {
        canvas.width = INTERIOR_CANVAS_WIDTH;
        canvas.height = INTERIOR_CANVAS_HEIGHT;
    } else if (currentMap === MAPS.LAKE) {
        canvas.width = LAKE_CANVAS_WIDTH;
        canvas.height = LAKE_CANVAS_HEIGHT;
    } else if (currentMap === MAPS.SHED) {
        canvas.width = SHED_CANVAS_WIDTH;
        canvas.height = SHED_CANVAS_HEIGHT;
    } else if (currentMap === MAPS.PLANTATION) {
        canvas.width = PLANTATION_CANVAS_WIDTH;
        canvas.height = PLANTATION_CANVAS_HEIGHT;
    }
    updateGameContainerSize();
}

function updateUI() {
    // Update clue UI
    updateClueUI();
    updateWallet();
    updateLocationLabel();

    // Show/hide appropriate screens
    startScreen.classList.add('hidden');
    characterSelectScreen.classList.add('hidden');
    winScreen.classList.add('hidden');
    loginScreen.classList.add('hidden');

    // Handle plantation-specific UI
    if (currentMap === MAPS.PLANTATION || gameState === STATES.PLANTATION_PLAY) {
        showPlantationHUD();
        updatePlantationHUD();
    } else {
        hidePlantationHUD();
    }
}

function hasSaveData() {
    return localStorage.getItem(SAVE_KEY) !== null;
}

function deleteSaveData() {
    localStorage.removeItem(SAVE_KEY);
    console.log('Save data deleted');
}

function getSaveInfo() {
    try {
        const savedData = localStorage.getItem(SAVE_KEY);
        if (!savedData) return null;

        const data = JSON.parse(savedData);
        const saveDate = new Date(data.timestamp);

        return {
            playerName: data.player.name,
            timestamp: data.timestamp,
            dateString: saveDate.toLocaleDateString() + ' ' + saveDate.toLocaleTimeString(),
            isPlantationMode: data.plantation.active,
            hasWon: data.player.hasWeddingRing,
            plantationDay: data.plantation.calendar ?
                `${data.plantation.calendar.season} - Day ${data.plantation.calendar.day}` : null
        };
    } catch (error) {
        return null;
    }
}

// Auto-save after key events
function autoSave() {
    if (gameState === STATES.PLANTATION_PLAY ||
        gameState === STATES.EXTERIOR_PLAY ||
        gameState === STATES.INTERIOR_PLAY ||
        gameState === STATES.LAKE_PLAY) {
        saveGame();
        showAutoSaveIndicator();
    }
}

function showAutoSaveIndicator() {
    // Create or update auto-save indicator
    let indicator = document.getElementById('autosave-indicator');
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.id = 'autosave-indicator';
        indicator.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: rgba(0, 0, 0, 0.7);
            color: #44ff44;
            padding: 8px 16px;
            border-radius: 4px;
            font-size: 14px;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s;
        `;
        document.body.appendChild(indicator);
    }

    indicator.textContent = '💾 Game Saved';
    indicator.style.opacity = '1';

    setTimeout(() => {
        indicator.style.opacity = '0';
    }, 2000);
}

// Show save/load menu
function showSaveLoadMenu() {
    const saveInfo = getSaveInfo();

    let menuContent = `
        <div style="text-align: center; padding: 20px;">
            <h2 style="margin-bottom: 20px;">Save / Load Game</h2>
    `;

    if (saveInfo) {
        menuContent += `
            <div style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <p><strong>Saved Game Found:</strong></p>
                <p>Player: ${saveInfo.playerName}</p>
                <p>Saved: ${saveInfo.dateString}</p>
                ${saveInfo.isPlantationMode ? `<p>Plantation: ${saveInfo.plantationDay}</p>` : ''}
                ${saveInfo.hasWon ? '<p>✅ Mystery Solved</p>' : '<p>🔍 Mystery in progress</p>'}
            </div>
        `;
    } else {
        menuContent += `
            <p style="margin-bottom: 20px; color: #aaa;">No saved game found</p>
        `;
    }

    menuContent += `
            <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                <button onclick="handleSaveGame()" style="padding: 10px 20px; font-size: 16px; cursor: pointer;">
                    💾 Save Game
                </button>
                <button onclick="handleLoadGame()" style="padding: 10px 20px; font-size: 16px; cursor: pointer;"
                    ${!saveInfo ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}>
                    📂 Load Game
                </button>
                <button onclick="closeSaveLoadMenu()" style="padding: 10px 20px; font-size: 16px; cursor: pointer;">
                    ❌ Cancel
                </button>
            </div>
        </div>
    `;

    // Create modal
    let modal = document.getElementById('save-load-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'save-load-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;
        document.body.appendChild(modal);
    }

    modal.innerHTML = `
        <div style="background: #2a2a2a; border-radius: 12px; max-width: 400px; color: white;">
            ${menuContent}
        </div>
    `;
    modal.style.display = 'flex';
}

function closeSaveLoadMenu() {
    const modal = document.getElementById('save-load-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function handleSaveGame() {
    if (saveGame()) {
        closeSaveLoadMenu();
        showDialogue('Game Saved!', [
            'Your progress has been saved.',
            'You can continue from here next time.'
        ]);
    } else {
        showDialogue('Save Failed', [
            'Could not save the game.',
            'Please try again.'
        ]);
    }
}

function handleLoadGame() {
    if (loadGame()) {
        closeSaveLoadMenu();
        showDialogue('Game Loaded!', [
            `Welcome back, ${player.name}!`,
            'Your progress has been restored.'
        ]);
    } else {
        showDialogue('Load Failed', [
            'Could not load the saved game.',
            'The save data may be corrupted.'
        ]);
    }
}

// =============================================
// INITIALIZATION
// =============================================

function init() {
    canvas.width = EXTERIOR_CANVAS_WIDTH;
    canvas.height = EXTERIOR_CANVAS_HEIGHT;
    updateGameContainerSize();
    showStartScreen();
    updateClueUI();
    initMobileControls();
    gameLoop();
}

// =============================================
// MOBILE TOUCH CONTROLS
// =============================================

let isMobile = false;
let mobileControlsEnabled = false;

function detectMobile() {
    return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(max-width: 1000px)').matches
    );
}

function initMobileControls() {
    isMobile = detectMobile();

    if (isMobile) {
        setupMobileControls();
        showMobileControls();
    }

    // Also listen for resize to show/hide controls
    window.addEventListener('resize', () => {
        isMobile = detectMobile();
        if (isMobile && gameState !== STATES.LOGIN && gameState !== STATES.START) {
            showMobileControls();
        } else if (!isMobile) {
            hideMobileControls();
        }
    });
}

function showMobileControls() {
    const controls = document.getElementById('mobile-controls');
    if (controls) {
        controls.classList.remove('hidden');
        mobileControlsEnabled = true;
    }
}

function hideMobileControls() {
    const controls = document.getElementById('mobile-controls');
    if (controls) {
        controls.classList.add('hidden');
        mobileControlsEnabled = false;
    }
}

function setupMobileControls() {
    // D-pad buttons
    const dpadBtns = document.querySelectorAll('.dpad-btn');
    dpadBtns.forEach(btn => {
        const dir = btn.dataset.dir;

        // Touch start - begin movement
        btn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            setKeyState(dir, true);
            btn.classList.add('active');
        }, { passive: false });

        // Touch end - stop movement
        btn.addEventListener('touchend', (e) => {
            e.preventDefault();
            setKeyState(dir, false);
            btn.classList.remove('active');
        }, { passive: false });

        // Touch cancel
        btn.addEventListener('touchcancel', (e) => {
            setKeyState(dir, false);
            btn.classList.remove('active');
        });

        // Mouse support for testing on desktop
        btn.addEventListener('mousedown', (e) => {
            e.preventDefault();
            setKeyState(dir, true);
        });

        btn.addEventListener('mouseup', (e) => {
            setKeyState(dir, false);
        });

        btn.addEventListener('mouseleave', (e) => {
            setKeyState(dir, false);
        });
    });

    // Interact button (A button)
    const interactBtn = document.getElementById('action-interact');
    if (interactBtn) {
        interactBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            handleMobileInteract();
            interactBtn.classList.add('active');
        }, { passive: false });

        interactBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            interactBtn.classList.remove('active');
        }, { passive: false });

        interactBtn.addEventListener('click', (e) => {
            e.preventDefault();
            handleMobileInteract();
        });
    }

    // Menu button
    const menuBtn = document.getElementById('action-menu');
    if (menuBtn) {
        menuBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            handleMobileMenu();
            menuBtn.classList.add('active');
        }, { passive: false });

        menuBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            menuBtn.classList.remove('active');
        }, { passive: false });

        menuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            handleMobileMenu();
        });
    }

    // Prevent canvas touch from scrolling
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
    }, { passive: false });

    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
    }, { passive: false });

    // Handle canvas tap as interact in certain states
    canvas.addEventListener('touchend', (e) => {
        e.preventDefault();
        // Allow tap to interact in dialogue states
        if (gameState === STATES.DIALOGUE) {
            handleMobileInteract();
        }
    }, { passive: false });
}

function setKeyState(dir, pressed) {
    switch (dir) {
        case 'up': keys.up = pressed; break;
        case 'down': keys.down = pressed; break;
        case 'left': keys.left = pressed; break;
        case 'right': keys.right = pressed; break;
    }
}

function handleMobileInteract() {
    // Simulate E key press for various game states
    switch (gameState) {
        case STATES.DIALOGUE:
            advanceDialogue();
            break;

        case STATES.EXTERIOR_PLAY:
        case STATES.INTERIOR_PLAY:
        case STATES.LAKE_PLAY:
        case STATES.SHED_PLAY:
        case STATES.PLANTATION_PLAY:
            checkInteraction();
            break;

        case STATES.START:
            startGame();
            break;

        case STATES.CHARACTER_SELECT:
            confirmCharacterSelection();
            break;

        case STATES.PHOTO_VIEW:
            closePhotoModal();
            break;

        case STATES.WIN:
            // Could trigger restart or plantation
            break;
    }
}

function handleMobileMenu() {
    // Show save/load menu or dashboard depending on state
    if (currentMap === MAPS.PLANTATION) {
        openDashboard();
    } else {
        // Could open save/load menu
        if (typeof toggleSaveLoadMenu === 'function') {
            toggleSaveLoadMenu();
        }
    }
}

// Update dialogue prompt text for mobile
function updateDialoguePromptForMobile() {
    const prompt = document.getElementById('dialogue-prompt');
    if (prompt && isMobile) {
        prompt.textContent = 'Tap A to continue';
    }
}

// Call this when showing dialogue
const originalShowDialogue = showDialogue;
showDialogue = function(speaker, lines, callback) {
    originalShowDialogue(speaker, lines, callback);
    if (isMobile) {
        const prompt = document.getElementById('dialogue-prompt');
        if (prompt) {
            prompt.textContent = 'Tap A to continue';
        }
    }
};

// Handle screen orientation
function handleOrientationChange() {
    // Optionally lock to landscape on mobile
    if (screen.orientation && screen.orientation.lock) {
        // Don't force lock, but game works best in landscape
    }
}

// Canvas resize for responsive layout
function resizeCanvasForMobile() {
    if (!isMobile) return;

    const container = document.getElementById('game-container');
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    // Maintain aspect ratio
    const aspectRatio = EXTERIOR_CANVAS_WIDTH / EXTERIOR_CANVAS_HEIGHT;
    let newWidth = containerWidth;
    let newHeight = containerWidth / aspectRatio;

    if (newHeight > containerHeight) {
        newHeight = containerHeight;
        newWidth = containerHeight * aspectRatio;
    }

    canvas.style.width = newWidth + 'px';
    canvas.style.height = newHeight + 'px';
}

// Listen for orientation changes
window.addEventListener('orientationchange', () => {
    setTimeout(resizeCanvasForMobile, 100);
});

// Also resize on window resize
window.addEventListener('resize', resizeCanvasForMobile);

// =============================================
// REINFORCEMENT LEARNING DATA COLLECTION SYSTEM
// =============================================

const rlSystem = {
    enabled: false,
    recording: false,
    currentEpisode: 0,
    currentStep: 0,
    trajectory: [],
    episodes: [],
    lastState: null,
    lastAction: null,
    episodeReward: 0,

    // Action space enumeration
    ACTIONS: {
        // Movement
        MOVE_UP: 0,
        MOVE_DOWN: 1,
        MOVE_LEFT: 2,
        MOVE_RIGHT: 3,
        // Interactions
        INTERACT: 4,
        OPEN_DASHBOARD: 5,
        CLOSE_DASHBOARD: 6,
        ADVANCE_TIME: 7,
        // Worker management
        HIRE_WORKER: 8,
        FIRE_WORKER: 9,
        ASSIGN_WORKER: 10,
        // Market actions
        SELL_COFFEE: 11,
        BUY_SUPPLIES: 12,
        // Mini-game actions
        PICK_CHERRY: 13,
        SORT_BEAN: 14,
        PROCESS_TAP: 15,
        // Meta
        NO_OP: 16
    },

    // Reverse mapping for logging
    ACTION_NAMES: {},

    // Initialize the RL system
    init() {
        // Build reverse action mapping
        for (const [name, id] of Object.entries(this.ACTIONS)) {
            this.ACTION_NAMES[id] = name;
        }
        console.log('RL Data Collection System initialized');
        console.log('Actions:', Object.keys(this.ACTIONS).length);
    },

    // Start a new episode
    startEpisode() {
        this.currentEpisode++;
        this.currentStep = 0;
        this.trajectory = [];
        this.episodeReward = 0;
        this.lastState = this.getState();
        this.recording = true;
        console.log(`Episode ${this.currentEpisode} started`);
    },

    // End current episode
    endEpisode(terminalReason = 'manual') {
        if (!this.recording) return;

        const episodeData = {
            episode: this.currentEpisode,
            steps: this.currentStep,
            totalReward: this.episodeReward,
            terminalReason: terminalReason,
            trajectory: [...this.trajectory],
            timestamp: new Date().toISOString()
        };

        this.episodes.push(episodeData);
        this.recording = false;

        console.log(`Episode ${this.currentEpisode} ended: ${this.currentStep} steps, reward: ${this.episodeReward.toFixed(2)}`);
        return episodeData;
    },

    // Get current game state as a serializable object
    getState() {
        const allPlants = [...plantation.plants.arabica, ...plantation.plants.robusta];

        return {
            // Time features
            day: plantation.calendar.day,
            month: plantation.calendar.month,
            year: plantation.calendar.year,
            season: plantation.calendar.season,
            dayPhase: plantation.calendar.dayPhase,
            seasonIndex: ['POST_HARVEST', 'BLOSSOM', 'PLANTING', 'MONSOON', 'RIPENING', 'HARVEST'].indexOf(plantation.calendar.season),
            phaseIndex: ['MORNING', 'AFTERNOON', 'EVENING'].indexOf(plantation.calendar.dayPhase),

            // Resources
            money: plantationResources.money,
            water: plantationResources.water.stored,
            waterCapacity: plantationResources.water.tankCapacity,
            waterRatio: plantationResources.water.stored / plantationResources.water.tankCapacity,
            powerAvailable: plantationResources.power.gridAvailable ? 1 : 0,
            generatorFuel: plantationResources.power.generatorFuel,

            // Workers
            workerCount: plantation.workers.length,
            maxWorkers: plantation.maxWorkers,
            workerRatio: plantation.workers.length / plantation.maxWorkers,
            avgWorkerMorale: plantation.workers.length > 0 ?
                plantation.workers.reduce((sum, w) => sum + w.morale, 0) / plantation.workers.length : 0,
            avgWorkerEnergy: plantation.workers.length > 0 ?
                plantation.workers.reduce((sum, w) => sum + w.energy, 0) / plantation.workers.length : 0,

            // Plants summary
            totalPlants: allPlants.length,
            avgPlantHealth: allPlants.length > 0 ?
                allPlants.reduce((sum, p) => sum + p.health, 0) / allPlants.length : 0,
            avgWaterLevel: allPlants.length > 0 ?
                allPlants.reduce((sum, p) => sum + p.waterLevel, 0) / allPlants.length : 0,
            plantsWithPests: allPlants.filter(p => p.hasPest).length,
            diseasedPlants: allPlants.filter(p => p.stage === 'DISEASED').length,

            // Plant stages count
            seedlings: allPlants.filter(p => p.stage === 'SEEDLING').length,
            youngPlants: allPlants.filter(p => p.stage === 'YOUNG').length,
            maturePlants: allPlants.filter(p => p.stage === 'MATURE').length,
            floweringPlants: allPlants.filter(p => p.stage === 'FLOWERING').length,
            greenBerryPlants: allPlants.filter(p => p.stage === 'GREEN_BERRY').length,
            ripePlants: allPlants.filter(p => p.stage === 'RIPE').length,

            // Inventory
            cherriesArabica: plantationResources.inventory.cherries.arabica,
            cherriesRobusta: plantationResources.inventory.cherries.robusta,
            parchmentArabica: plantationResources.inventory.parchment.arabica,
            parchmentRobusta: plantationResources.inventory.parchment.robusta,
            greenBeansTotal: Object.values(plantationResources.inventory.greenBeans.arabica).reduce((a, b) => a + b, 0) +
                            Object.values(plantationResources.inventory.greenBeans.robusta).reduce((a, b) => a + b, 0),

            // Supplies
            fertilizer: plantationResources.supplies?.fertilizer || 0,
            pesticide: plantationResources.supplies?.pesticide || 0,
            seedlings: plantationResources.supplies?.seedlings || 0,

            // Player position (normalized)
            playerX: player.x / (40 * TILE_SIZE),
            playerY: player.y / (30 * TILE_SIZE),

            // Game state
            gameState: gameState
        };
    },

    // Get flattened state as array (for neural network input)
    getStateVector() {
        const state = this.getState();
        return [
            // Time (normalized)
            state.day / 31,
            state.month / 12,
            state.seasonIndex / 5,
            state.phaseIndex / 2,
            // Resources (normalized)
            Math.min(state.money / 500000, 1),
            state.waterRatio,
            state.powerAvailable,
            state.generatorFuel / 100,
            // Workers
            state.workerRatio,
            state.avgWorkerMorale / 100,
            state.avgWorkerEnergy / 100,
            // Plants
            state.avgPlantHealth / 100,
            state.avgWaterLevel / 100,
            state.plantsWithPests / Math.max(state.totalPlants, 1),
            state.diseasedPlants / Math.max(state.totalPlants, 1),
            // Plant stages (normalized)
            state.ripePlants / Math.max(state.totalPlants, 1),
            state.floweringPlants / Math.max(state.totalPlants, 1),
            state.maturePlants / Math.max(state.totalPlants, 1),
            // Inventory (normalized, capped)
            Math.min((state.cherriesArabica + state.cherriesRobusta) / 100, 1),
            Math.min(state.greenBeansTotal / 100, 1),
            // Position
            state.playerX,
            state.playerY
        ];
    },

    // Calculate reward for current step
    calculateReward(prevState, currentState, action) {
        let reward = 0;

        // Money gained/lost (primary reward)
        const moneyDelta = currentState.money - prevState.money;
        reward += moneyDelta / 1000;  // Scale down

        // Plant health maintained
        const healthDelta = currentState.avgPlantHealth - prevState.avgPlantHealth;
        reward += healthDelta * 0.1;

        // Harvest progress (ripe plants)
        const ripeDelta = currentState.ripePlants - prevState.ripePlants;
        reward += ripeDelta * 0.5;

        // Penalties
        // Lost plants to disease
        const diseaseDelta = currentState.diseasedPlants - prevState.diseasedPlants;
        reward -= diseaseDelta * 2;

        // Running out of water
        if (currentState.waterRatio < 0.1 && prevState.waterRatio >= 0.1) {
            reward -= 5;
        }

        // Running out of money
        if (currentState.money < 1000 && prevState.money >= 1000) {
            reward -= 10;
        }

        // Small time penalty to encourage efficiency
        reward -= 0.01;

        return reward;
    },

    // Log an action
    logAction(actionId, metadata = {}) {
        if (!this.recording || !this.enabled) return;

        const currentState = this.getState();
        const stateVector = this.getStateVector();
        const reward = this.lastState ? this.calculateReward(this.lastState, currentState, actionId) : 0;

        const transition = {
            step: this.currentStep,
            timestamp: Date.now(),
            state: stateVector,
            stateFull: currentState,
            action: actionId,
            actionName: this.ACTION_NAMES[actionId],
            reward: reward,
            metadata: metadata
        };

        this.trajectory.push(transition);
        this.episodeReward += reward;
        this.currentStep++;
        this.lastState = currentState;

        return transition;
    },

    // Check for terminal conditions
    checkTerminal() {
        const state = this.getState();

        // Bankruptcy
        if (state.money <= 0) {
            return { terminal: true, reason: 'bankruptcy' };
        }

        // All plants dead
        if (state.totalPlants > 0 && state.diseasedPlants === state.totalPlants) {
            return { terminal: true, reason: 'all_plants_dead' };
        }

        // Year completed (success condition)
        if (state.month === 12 && state.day === 31) {
            return { terminal: true, reason: 'year_complete' };
        }

        return { terminal: false, reason: null };
    },

    // Export all collected data
    exportData() {
        const data = {
            version: '1.0',
            gameVersion: 'bloom',
            exportTime: new Date().toISOString(),
            totalEpisodes: this.episodes.length,
            actionSpace: this.ACTIONS,
            stateFeatures: [
                'day_norm', 'month_norm', 'season_idx', 'phase_idx',
                'money_norm', 'water_ratio', 'power_avail', 'fuel_norm',
                'worker_ratio', 'worker_morale', 'worker_energy',
                'plant_health', 'plant_water', 'pest_ratio', 'disease_ratio',
                'ripe_ratio', 'flowering_ratio', 'mature_ratio',
                'cherries_norm', 'beans_norm',
                'player_x', 'player_y'
            ],
            episodes: this.episodes
        };

        return JSON.stringify(data, null, 2);
    },

    // Download data as JSON file
    downloadData() {
        const data = this.exportData();
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `bloom_rl_data_${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        console.log(`Downloaded ${this.episodes.length} episodes`);
    },

    // Get statistics
    getStats() {
        if (this.episodes.length === 0) return null;

        const rewards = this.episodes.map(e => e.totalReward);
        const steps = this.episodes.map(e => e.steps);

        return {
            episodes: this.episodes.length,
            avgReward: rewards.reduce((a, b) => a + b, 0) / rewards.length,
            maxReward: Math.max(...rewards),
            minReward: Math.min(...rewards),
            avgSteps: steps.reduce((a, b) => a + b, 0) / steps.length,
            totalTransitions: this.episodes.reduce((sum, e) => sum + e.trajectory.length, 0)
        };
    },

    // Toggle recording
    toggle() {
        this.enabled = !this.enabled;
        if (this.enabled) {
            this.startEpisode();
        } else if (this.recording) {
            this.endEpisode('toggled_off');
        }
        console.log(`RL recording: ${this.enabled ? 'ON' : 'OFF'}`);
        return this.enabled;
    }
};

// Initialize RL system
rlSystem.init();

// Hook into game actions for automatic logging
const originalAdvanceTime = advanceTime;
advanceTime = function() {
    originalAdvanceTime();
    if (rlSystem.enabled) {
        rlSystem.logAction(rlSystem.ACTIONS.ADVANCE_TIME);

        // Check for terminal conditions
        const terminal = rlSystem.checkTerminal();
        if (terminal.terminal) {
            rlSystem.endEpisode(terminal.reason);
            rlSystem.startEpisode();  // Auto-start new episode
        }
    }
};

// Hook into sell functions
const originalConfirmSell = confirmSell;
confirmSell = function() {
    originalConfirmSell();
    if (rlSystem.enabled) {
        rlSystem.logAction(rlSystem.ACTIONS.SELL_COFFEE);
    }
};

// Hook into hire function
const originalHireWorker = hireWorker;
hireWorker = function(poolIndex) {
    originalHireWorker(poolIndex);
    if (rlSystem.enabled) {
        rlSystem.logAction(rlSystem.ACTIONS.HIRE_WORKER, { poolIndex });
    }
};

// Keyboard shortcut for RL controls
document.addEventListener('keydown', (e) => {
    // Ctrl+R to toggle recording
    if (e.ctrlKey && e.key === 'r') {
        e.preventDefault();
        const enabled = rlSystem.toggle();
        showDialogue('RL Recording', [enabled ? 'Recording STARTED' : 'Recording STOPPED']);
    }
    // Ctrl+D to download data
    if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        if (rlSystem.episodes.length > 0) {
            rlSystem.downloadData();
        } else {
            showDialogue('RL Data', ['No episodes recorded yet']);
        }
    }
    // Ctrl+S to show stats
    if (e.ctrlKey && e.key === 'i') {
        e.preventDefault();
        const stats = rlSystem.getStats();
        if (stats) {
            showDialogue('RL Statistics', [
                `Episodes: ${stats.episodes}`,
                `Avg Reward: ${stats.avgReward.toFixed(2)}`,
                `Total Transitions: ${stats.totalTransitions}`
            ]);
        } else {
            showDialogue('RL Statistics', ['No data collected yet']);
        }
    }
});

// Expose RL system globally for external access
window.rlSystem = rlSystem;

init();
