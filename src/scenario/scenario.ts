import {
    createUserScenario,
    createSystemScenario,
    createSaluteRequest,
    createSaluteResponse,
    createScenarioWalker,
    createMatchers,
    SaluteRequest,
    NLPRequest,
    NLPResponse,
} from '@salutejs/scenario';
import { SaluteMemoryStorage } from '@salutejs/storage-adapter-memory';

import {
    category, daily, random,
    category_explicit,
    noMatchHandler,
    runAppHandler,
    back,
    say,
    init,
    refuseDaily,
} from './handlers';

const { regexp, action } = createMatchers<SaluteRequest>();

const userScenario = createUserScenario({
    Init: {
        match: action('init'),
        handle: init,
        children: {
            yes: {
                match: regexp(/^(да|хочу)$/i, {normalized: false}),
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                handle: daily,
            },
            no: {
                match: regexp(/^(нет|не хочу)$/i, {normalized: false}),
                handle: refuseDaily,
            },
        }
    },
    Category: {
        match: regexp(/^цитата из категория (?<category>.+)$/i),  
        // @ts-ignore
        handle: category
    },
    Category2: {
        match: regexp(/^категория (?<category>.+)$/i),  
        // @ts-ignore
        handle: category
    },
    Random: {
        match: regexp(/^случайный цитата$/i),  
        handle: random
    },
    Random2: {
        match: regexp(/^случайная$/i, {normalized: false}),  
        handle: random
    },
    Daily: {
        match: regexp(/^цитата дня$/i, {normalized: false}),  
        handle: daily
    },
    Say: {
        match: action('say'),
        handle: say
    },
    Back: {
        match: regexp(/^обратно$/i, {normalized: false}),
        handle: back
    },
    Back2: {
        match: regexp(/^назад$/i, {normalized: false}),
        handle: back
    },
    Back3: {
        match: regexp(/^давай обратно$/i, {normalized: false}),
        handle: back
    },
    Back4: {
        match: regexp(/^давай назад$/i, {normalized: false}),
        handle: back
    },
    Back5: {
        match: regexp(/^вернись назад$/i, {normalized: false}),
        handle: back
    },
    Back6: {
        match: regexp(/^открой предыдущий экран$/i, {normalized: false}),
        handle: back
    },
    Back7: {
        match: regexp(/^верни обратно$/i, {normalized: false}),
        handle: back
    },
    Back8: {
        match: regexp(/^предыдущий экран$/i, {normalized: false}),
        handle: back
    },
    Back9: {
        match: regexp(/^вернись$/i, {normalized: false}),
        handle: back
    },
    Back10: {
        match: regexp(/^верни$/i, {normalized: false}),
        handle: back
    },
    Category3: {
        match: regexp(/^мотивация и успех$/i, {normalized: false}),  
        // @ts-ignore
        handle: category_explicit
    },
    Category4: {
        match: regexp(/^счастье и благодарность$/i, {normalized: false}),  
        // @ts-ignore
        handle: category_explicit
    },
    Category5: {
        match: regexp(/^любовь и отношения$/i, {normalized: false}),  
        // @ts-ignore
        handle: category_explicit
    },
    Category6: {
        match: regexp(/^мудрость и самопознание$/i, {normalized: false}),  
        // @ts-ignore
        handle: category_explicit
    },
    Category7: {
        match: regexp(/^работа и творчество$/i, {normalized: false}),  
        // @ts-ignore
        handle: category_explicit
    },
    Category8: {
        match: regexp(/^спорт и здоровье$/i, {normalized: false}),  
        // @ts-ignore
        handle: category_explicit
    },
    Category9: {
        match: regexp(/^бизнес и финансы$/i, {normalized: false}),  
        // @ts-ignore
        handle: category_explicit
    },
    Category10: {
        match: regexp(/^путешествия$/i, {normalized: false}),  
        // @ts-ignore
        handle: category_explicit
    },
    Category11: {
        match: regexp(/^искусство и культура$/i, {normalized: false}),  
        // @ts-ignore
        handle: category_explicit
    },
    Category12: {
        match: regexp(/^наука и технологии$/i, {normalized: false}),  
        // @ts-ignore
        handle: category_explicit
    },
    Category13: {
        match: regexp(/^мотивация$/i, {normalized: false}),  
        // @ts-ignore
        handle: category_explicit
    },
    Category14: {
        match: regexp(/^успех$/i, {normalized: false}),  
        // @ts-ignore
        handle: category_explicit
    },
    Category15: {
        match: regexp(/^счастье$/i, {normalized: false}),  
        // @ts-ignore
        handle: category_explicit
    },
    Category16: {
        match: regexp(/^благодарность$/i, {normalized: false}),  
        // @ts-ignore
        handle: category_explicit
    },
    Category17: {
        match: regexp(/^любовь$/i, {normalized: false}),  
        // @ts-ignore
        handle: category_explicit
    },
    Category18: {
        match: regexp(/^отношения$/i, {normalized: false}),  
        // @ts-ignore
        handle: category_explicit
    },
    Category19: {
        match: regexp(/^мудрость$/i, {normalized: false}),  
        // @ts-ignore
        handle: category_explicit
    },
    Category20: {
        match: regexp(/^самопознание$/i, {normalized: false}),  
        // @ts-ignore
        handle: category_explicit
    },
    Category21: {
        match: regexp(/^работа$/i, {normalized: false}),  
        // @ts-ignore
        handle: category_explicit
    },
    Category22: {
        match: regexp(/^творчество$/i, {normalized: false}),  
        // @ts-ignore
        handle: category_explicit
    },
    Category23: {
        match: regexp(/^спорт$/i, {normalized: false}),  
        // @ts-ignore
        handle: category_explicit
    },
    Category24: {
        match: regexp(/^здоровье$/i, {normalized: false}),  
        // @ts-ignore
        handle: category_explicit
    },
    Category25: {
        match: regexp(/^бизнес$/i, {normalized: false}),  
        // @ts-ignore
        handle: category_explicit
    },
    Category26: {
        match: regexp(/^финансы$/i, {normalized: false}),  
        // @ts-ignore
        handle: category_explicit
    },
    Category27: {
        match: regexp(/^путешествия$/i, {normalized: false}),  
        // @ts-ignore
        handle: category_explicit
    },
    Category28: {
        match: regexp(/^искусство$/i, {normalized: false}),  
        // @ts-ignore
        handle: category_explicit
    },
    Category29: {
        match: regexp(/^культурас$/i, {normalized: false}),  
        // @ts-ignore
        handle: category_explicit
    },
    Category30: {
        match: regexp(/^наука$/i, {normalized: false}),  
        // @ts-ignore
        handle: category_explicit
    },
    Category31: {
        match: regexp(/^технологии$/i, {normalized: false}),  
        // @ts-ignore
        handle: category_explicit
    },
});

const scenarioWalker = createScenarioWalker({
    systemScenario: createSystemScenario({
        // @ts-ignore
        RUN_APP: runAppHandler,
        // @ts-ignore
        NO_MATCH: noMatchHandler,
    }),
    userScenario,
});

const storage = new SaluteMemoryStorage();

export const handleNlpRequest = async (request: NLPRequest): Promise<NLPResponse> => {
    const req = createSaluteRequest(request);
    const res = createSaluteResponse(request);

    const sessionId = request.uuid.userId;
    const session = await storage.resolve(sessionId);

    await scenarioWalker({ req, res, session });
    await storage.save({ id: sessionId, session });

    return res.message;
};


/*
Описание:
Есть два режима: 1. меню, 2. цитата
Три вида мотивирующих цитат: 1. цитата дня, 2. случайная цитата, 3. цитата из категории
Категории: Мотивация и успех, Счастье и благодарность, Любовь и отношения, Мудрость и самопознание, Работа и творчество, Спорт и здоровье, Бизнес и финансы, Путешествия, Искусство и культура, Наука и технологии.

В режиме меню отображены инструкции основных сценариев работы смартаппа, т.е. что нужно сказать или сделать для работы определенного сценария.
Инструкции являются по совместительству кнопками, на которые можно нажать

Есть кнопки цитата дня, случайная цитата, и кнопки категорий при активации которых будет произведен переход в режим цитаты соответствующего вида
Активировать можно либо нажатием, либо сказав вслух. Интерфейс вроде простой и понятный, трудно запутаться.
На васякий случай есть внизу всегда есть подсказки, которые можно либо нажать, либо сказать.

В режиме цитаты отображены:
1. категория цитаты и кнопка назад, которая переводит приложение в реим меню
2. текст цитаты
3. автор цитаты
Ассистент озвучивает вид цитаты, текст и автора, после этого включается голосовой ввод и можно сказать "в меню" или "назад" для перехода в режим меню.


Для перехода в режим цитаты можно сказать:
"цитата дня" - для цитаты дня
"цитата из категории " + одна из категорий иди "категория" + одна из категорий - для цитаты определенной категории
"случайная цитата" или "мотивируй меня" или "заряди мотивацией" или "мотивация" - для случайной цитаты

Также при запуске приложения ассистент спрашивает "Хотите услышать цитату дня?" 
тут можно либо согласиться: "да" или "хочу", тогда произвойдет переход в режим цитаты с цитатой дня, 
либо отклонить: "нет" или "не хочу" тогда вы останетесь в режиме меню и ассистент предложит другие варианты.

Также в режиме цитаты можно запрашивать и другие цитаты без перехода в режим меню
Например, сказать "цитата дня", прослушать, вдохновиться, затем сказать "случайная цитата" и вдохновиться вновь.
*/  

/*
    Иногда при старте не включается автопрослушивание пользователя, необходимо нажать на шарик ассистента

    Также автопрослушивание может выключаться во время работы приложения (или не включиться после того, как помощник озвучил цитату и автора), также нужно нажать на шарик ассистента

    На смартфоне кнопки не нажимаются, нужно пользоваться голосовым вводом
*/