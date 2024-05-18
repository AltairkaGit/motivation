import { SaluteHandler, SaluteRequest, Surface, Device } from '@salutejs/scenario'

import { DeviceFamily } from '../types'

import { CategoryVariables, CategoryCommand, RandomCommand, DailyCommand, QuoteRes, BackCommand, Quote, NextCommand, RepeatAsk } from './types'

const SURFACE_TO_PLATFORM_MAP: Partial<Record<Surface, DeviceFamily>> = {
    SBERBOX: 'sberbox',
    TIME: 'sberbox',
    SATELLITE: 'sberbox',
    TV: 'sberbox',
    TV_HUAWEI: 'sberbox',
    COMPANION: 'mobile',
    SBOL: 'mobile',
    STARGATE: 'portal',
}

const getDeviceFamily = (device: Device | undefined): DeviceFamily => {
    if (!device?.surface) {
        return 'mobile'
    }

    const client = SURFACE_TO_PLATFORM_MAP[device.surface]

    return client || 'mobile'
}

export const runAppHandler: SaluteHandler = async ({ res, req }) => {
    const { device } = req.request.payload

    res.setPronounceText('Рассказать цитату дня?')
    res.setAutoListening(true)

    res.overrideFrontendEndpoint(`${req.appInfo.frontendEndpoint}/sber/@${getDeviceFamily(device)}`)
}

export const noMatchHandler: SaluteHandler<SaluteRequest<any>> = ({ req, res }) => {
    res.setPronounceText('Я не знаю такой команды. Можно воспользоваться кнопками и подсказками на экране')
    res.appendSuggestions(['Цитата дня', 'Случайная', 'Мотивация и успех', 'В категории'])
    res.setAutoListening(true)
}

export const avaliableCommands: SaluteHandler<SaluteRequest<any>> = ({ req, res }) => {
    const toSay = `
        Можно прослушать цитату дня, сказав "Цитата дня".
        Можно услышать случайную цитату, произнеся "Случайная цитата".
        Можно сказать название определенной категории, например "Мотивация и успех".
        Также можно воспользоваться кнопками и подсказками на экране.
    `
    res.setPronounceText(toSay)
    res.appendSuggestions(['Цитата дня', 'Случайная', 'Мотивация и успех', 'В категории'])
    res.setAutoListening(true)
}

export const init: SaluteHandler<SaluteRequest<any>> = async ({ res, req }) => {
    res.appendSuggestions(['Случайная', 'Мотивация и успех', 'Цитата дня'])
    res.setAutoListening(true)  
}

export const refuseDaily: SaluteHandler<SaluteRequest<any>> = async ({ res, req }) => {
    res.appendSuggestions(['Случайная', 'Мотивация и успех', 'Цитата дня'])
    res.setPronounceText('Хорошо, можно выбрать другую цитату')
    res.setAutoListening(true)
}

export const random: SaluteHandler<SaluteRequest<any>> = async ({req, res}) => {
    res.appendCommand<RandomCommand>({ type: 'random', payload: {} })
    res.appendSuggestions(['В категории', 'Следующая', 'Случайная', 'Цитата дня'])
}

export const daily: SaluteHandler<SaluteRequest<any>> = async ({req, res}) => {
    res.appendCommand<DailyCommand>({ type: 'daily', payload: {} })
    res.appendSuggestions(['В категории', 'Следующая', 'Случайная'])
}

export const category: SaluteHandler<SaluteRequest<CategoryVariables>> = async ({req, res}) => {
    const { category } = req.variables
    res.appendCommand<CategoryCommand>({ type: 'category', payload: {category} })
    res.appendSuggestions(['В категории', 'Следующая', 'Случайная', 'Цитата дня'])
}

export const category_explicit: SaluteHandler<SaluteRequest<CategoryVariables>> = async ({req, res}) => {
    const { category } = req.variables
    res.appendCommand<CategoryCommand>({ type: 'category', payload: {category} })
    res.appendSuggestions(['В категории', 'Следующая', 'Случайная', 'Цитата дня'])
}

export const say: SaluteHandler<SaluteRequest<any>> = async ({req, res}) => {
    const {quote} = req.variables
    
    const toSay = (quote?.quote ? quote.quote + ((quote.quote.slice(-1) != '!' && quote.quote.slice(-1) != '?') ? '.' : '') : '') + (quote?.quote ? '. Автор: ' : '') + (quote?.author ?? '')
    res.setAutoListening(false)
    res.setPronounceText(toSay)
    res.setAutoListening(false)
}

export const next_quote: SaluteHandler<SaluteRequest<any>> = async ({req, res}) => {
    res.appendCommand<NextCommand>({ type: 'next_quote', payload: {} })
}

export const next_quote_rejected: SaluteHandler<SaluteRequest<any>> = async ({req, res}) => {
    res.setAutoListening(false)
    res.setPronounceText('Сначала необходимо выбрать категорию')
    res.appendSuggestions(['Мотивация и успех', 'Путешествия', 'В категории', 'Случайная'])
    res.setAutoListening(true)
}

export const back: SaluteHandler<SaluteRequest<any>> = async ({req, res}) => {
    res.appendCommand<BackCommand>({ type: 'back', payload: {} })
    res.appendSuggestions(['Цитата дня', 'Случайная цитата', 'Мотивация и успех'])
    res.setAutoListening(true)
}

export const repeat_ask: SaluteHandler<SaluteRequest<any>> = async ({req, res}) => {
    res.appendCommand<RepeatAsk>({ type: 'repeat', payload: {} })
}

export const repeat_rejected: SaluteHandler<SaluteRequest<any>> = async ({req, res}) => {
    res.setAutoListening(false)
    res.setPronounceText('Пока нечего повторять')
    res.appendSuggestions(['Случайная', 'Цитата дня', 'Мотивация и успех'])
    res.setAutoListening(true)
}