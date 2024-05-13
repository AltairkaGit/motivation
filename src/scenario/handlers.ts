import { SaluteHandler, SaluteRequest, Surface, Device } from '@salutejs/scenario'

import { DeviceFamily } from '../types'

import { CategoryVariables, CategoryCommand, RandomCommand, DailyCommand, TestCommand, QuoteRes, BackCommand, Quote } from './types'

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

    res.setPronounceText('Хотите услышать цитату дня?')
    res.setAutoListening(true)

    res.overrideFrontendEndpoint(`${req.appInfo.frontendEndpoint}/joy/@${getDeviceFamily(device)}`)
}

export const noMatchHandler: SaluteHandler<SaluteRequest<any>> = ({ req, res }) => {
    res.setPronounceText('Не понятно')
    res.setPronounceText('Вы сказали: ' + req.message.original_text)
    res.appendCommand<TestCommand>({ type: 'test', payload: { req } })
    res.appendSuggestions(['В меню', 'Цитата дня', 'Случайная цитата'])
    res.setAutoListening(true)
}

export const init: SaluteHandler<SaluteRequest<any>> = async ({ res, req }) => {
    res.appendSuggestions(['Хочу', 'Случайная цитата', 'Категория мотивация и успех'])
    res.setAutoListening(true)  
}

export const refuseDaily: SaluteHandler<SaluteRequest<any>> = async ({ res, req }) => {
    res.appendSuggestions(['Случайная цитата', 'Категория мотивация и успех', 'Цитата дня'])
    res.setPronounceText('Хорошо, можете выбрать другую цитату')
    res.setAutoListening(true)
}

export const random: SaluteHandler<SaluteRequest<any>> = async ({req, res}) => {
    res.appendCommand<RandomCommand>({ type: 'random', payload: {} })
    res.appendSuggestions(['В меню', 'Цитата дня'])
    res.setPronounceText('Случайная цитата')
}

export const daily: SaluteHandler<SaluteRequest<any>> = async ({req, res}) => {
    res.appendCommand<DailyCommand>({ type: 'daily', payload: {} })
    res.appendSuggestions(['В меню', 'Случайная цитата'])
    res.setPronounceText('Цитата дня')
}

export const category: SaluteHandler<SaluteRequest<CategoryVariables>> = async ({req, res}) => {
    const { category } = req.variables
    res.appendCommand<CategoryCommand>({ type: 'category', payload: {category} })
    res.appendSuggestions(['В меню', 'Цитата дня', 'Случайная цитата'])
    const toSay = 'Цитата из категории ' + category
    res.setPronounceText(toSay)
}

export const say: SaluteHandler<SaluteRequest<any>> = async ({req, res}) => {
    const {quote} = req.variables
    
    const toSay = (quote?.quote ?? '') + (quote?.quote ? '. Автор: ' : '') + (quote?.author ?? '')
    res.setAutoListening(false)
    res.setPronounceText(toSay)
    res.setAutoListening(true)
}

export const back: SaluteHandler<SaluteRequest<any>> = async ({req, res}) => {
    res.appendCommand<BackCommand>({ type: 'back', payload: {} })
    res.appendSuggestions(['Цитата дня', 'Случайная цитата', 'Цитата из категории мотивация и успех'])
    res.setAutoListening(false)
    res.setPronounceText('Меню')
    res.setAutoListening(true)
}

export const test: SaluteHandler<SaluteRequest<any>> = ({ req, res }) => {
    res.setPronounceText('Тест')
    res.setPronounceText('Вы сказали: ' + req.message.original_text)
    res.appendCommand<TestCommand>({ type: 'test', payload: { req } })
}