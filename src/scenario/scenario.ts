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
} from '@salutejs/scenario'
import { SaluteMemoryStorage } from '@salutejs/storage-adapter-memory'

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
    avaliableCommands,
} from './handlers'

const { regexp, action } = createMatchers<SaluteRequest>()

const userScenario = createUserScenario({
    Init: {
        match: action('init'),
        handle: init,
        children: {
            no: {
                match: regexp(/^.*\s?(нет|не хочу|откажусь|отказ.*|не интерес.*)\s?.*$/i, {normalized: false}),
                handle: refuseDaily,
            },
            yes: {
                match: regexp(/^.*\s?(да|хочу|расскажи|интерес.*)\s?.*$/i, {normalized: false}),
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                handle: daily,
            },
        }
    },
    Category: {
        match: regexp(/^.*\s?((цитата|цитату) из категории|категория) (?<category>.+)\s?.*$/i, {normalized: false}),  
        // @ts-ignore
        handle: category
    },
    CategoryAction: {
        match: action('category'),  
        // @ts-ignore
        handle: category
    },
    Random: {
        match: regexp(/^.*\s?(случайн(ая|ую)|рандомн(ая|ую)|люб(ая|ую)|как(ая|ую) нибудь)( (цитата|цитату))?\s?.*$/i, {normalized: false}),  
        handle: random
    },
    Daily: {
        match: regexp(/^.*\s?(цитат(а|у)) дня\s?.*$/i, {normalized: false}),  
        handle: daily
    },
    Say: {
        match: action('say'),
        handle: say
    },
    NextAsk: {
        match: regexp(/^.*\s?(ещё|следующая|следующую|некст|из этой же категории|очередн(ая|ую))\s?.*$/i, {normalized: false}),  
        // @ts-ignore
        handle: next_quote
    },
    Back: {
        match: regexp(/^.*\s?(категориям|категории|список|списку|все.* цитат.*)\s?.*$/i, {normalized: false}),
        handle: back
    },
    CategoryExplicit: {
        match: regexp(/^.*\s?(?<category>мот.*|усп.*|сча.*|бла.*|люб.*|отн.*|муд.*|сам.*|раб.*|тво.*|спо.*|здо.*|биз.*|фин.*|пут.*|иск.*|кул.*|нау.*|тех.*)\s?.*$/i, {normalized: false}),  
        // @ts-ignore
        handle: category_explicit
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
        match: regexp(/^.*\s?(повтор.*)\s?.*$/i, {normalized: false}),  
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
    AvaliableCommands: {
        match: regexp(/^.*\s?(команд.*|.*пользов.*|инструк.*|виды)\s?.*$/i, {normalized: false}),  
        // @ts-ignore
        handle: avaliableCommands
    }
})

const scenarioWalker = createScenarioWalker({
    systemScenario: createSystemScenario({
        // @ts-ignore
        RUN_APP: runAppHandler,
        // @ts-ignore
        NO_MATCH: noMatchHandler,
    }),
    userScenario,
})

const storage = new SaluteMemoryStorage()

export const handleNlpRequest = async (request: NLPRequest): Promise<NLPResponse> => {
    const req = createSaluteRequest(request)
    const res = createSaluteResponse(request)

    const sessionId = request.uuid.userId
    const session = await storage.resolve(sessionId)

    await scenarioWalker({ req, res, session })
    await storage.save({ id: sessionId, session })

    return res.message
}