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
        handle: category, 
    },
    Category2: {
        match: regexp(/^категория (?<category>.+)$/i),  
        // @ts-ignore
        handle: category, 
    },
    Random: {
        match: regexp(/^случайный цитата$/i),  
        handle: random,    
    },
    Random2: {
        match: regexp(/^мотивируй меня$/i, {normalized: false}),  
        handle: random,    
    },
    Random3: {
        match: regexp(/^заряди мотивацией$/i, {normalized: false}),  
        handle: random,    
    },
    Random4: {
        match: regexp(/^мотивация$/i, {normalized: false}),  
        handle: random,    
    },
    Daily: {
        match: regexp(/^цитата дня$/i, {normalized: false}),  
        handle: daily,
    },
    Back: {
        match: regexp(/^в меню$/i, {normalized: false}),
        handle: back
    },
    Say: {
        match: action('say'),
        handle: say
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
