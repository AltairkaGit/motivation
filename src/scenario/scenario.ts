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
    next_quote,
    next_quote_rejected,
    repeat_ask,
    repeat_rejected,
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
        match: regexp(/^(цитата из категории|категория) (?<category>.+)$/i, {normalized: false}),  
        // @ts-ignore
        handle: category
    },
    CategoryAction: {
        match: action('category'),  
        // @ts-ignore
        handle: category
    },
    Random: {
        match: regexp(/^(случайная) (цитата?)$/i, {normalized: false}),  
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
        match: regexp(/^(обратно|назад|давай обратно|давай назад|вернись назад|открой предыдущий экран|верни обратно|предыдущий экран|вернись|верни)$/i, {normalized: false}),
        handle: back
    },
    CategoryExplicit: {
        match: regexp(/^(мотивация и успех|счастье и благодарность|любовь и отношения|мудрость и самопознание|работа и творчество|спорт и здоровье|бизнес и финансы|путешествия|искусство и культура|наука и технологии|мотивация|успех|счастье|благодарность|любовь|отношения|мудрость|самопознание|работа|творчество|спорт|здоровье|бизнес|финансы|путешествия|искусство|культура|наука|техника|технологии|техно)$/i, {normalized: false}),  
        // @ts-ignore
        handle: category_explicit
    },
    NextAsk: {
        match: regexp(/^(следующая) (цитата?)$/i, {normalized: false}),  
        // @ts-ignore
        handle: next_quote
    },
    NextAction: {
        match: action('next_quote_ask'),  
        // @ts-ignore
        handle: next_quote
    },
    NextReject: {
        match: action('next_quote_reject'),
        handle: next_quote_rejected
    },
    RepeatAsk: {
        match: regexp(/^(повтор|повтори)$/i, {normalized: false}),  
        // @ts-ignore
        handle: repeat_ask
    },
    RepeatAskAction: {
        match: action('repeat'),  
        // @ts-ignore
        handle: repeat_ask
    },
    RepeatRejected: {
        match: action('repeat_rejected'),  
        // @ts-ignore
        handle: repeat_rejected
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

Есть кнопки цитата дня, случайная цитата, и кнопки категорий при активации которых будет произведен переход в режим цитаты соответствующей категории
Активировать можно либо нажатием, либо сказав вслух. 
Интерфейс вроде простой и понятный, трудно запутаться.
На васякий случай есть внизу всегда есть подсказки, которые можно либо нажать, либо сказать.

В режиме цитаты отображены:
1. категория цитаты и кнопка назад, которая переводит приложение в реим меню
2. текст цитаты
3. автор цитаты
Ассистент озвучивает вид цитаты, текст и автора, после этого включается голосовой ввод.

Для перехода в режим меню можно сказать одну из команд:
назад; обратно; верни; вернись; давай назад; вернись назад; давай обратно; верни обратно; предыдущий экран;


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