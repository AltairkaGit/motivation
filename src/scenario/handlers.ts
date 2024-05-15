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
    res.setPronounceText('Неизвестная команда')
    res.appendSuggestions(['Цитата дня', 'Случайная цитата', 'Мотивация и успех'])
    res.setAutoListening(true)
}

export const init: SaluteHandler<SaluteRequest<any>> = async ({ res, req }) => {
    res.appendSuggestions(['Да', 'Нет', 'Случайная цитата', 'Мотивация и успех'])
    res.setAutoListening(true)  
}

export const refuseDaily: SaluteHandler<SaluteRequest<any>> = async ({ res, req }) => {
    res.appendSuggestions(['Случайная цитата', 'Мотивация и успех', 'Цитата дня'])
    res.setPronounceText('Хорошо, можете выбрать другую цитату')
    res.setAutoListening(true)
}

export const random: SaluteHandler<SaluteRequest<any>> = async ({req, res}) => {
    res.appendCommand<RandomCommand>({ type: 'random', payload: {} })
    res.appendSuggestions(['Назад', 'Цитата дня'])
}

export const daily: SaluteHandler<SaluteRequest<any>> = async ({req, res}) => {
    res.appendCommand<DailyCommand>({ type: 'daily', payload: {} })
    res.appendSuggestions(['Назад', 'Случайная цитата'])
}

export const category: SaluteHandler<SaluteRequest<CategoryVariables>> = async ({req, res}) => {
    const { category } = req.variables
    res.appendCommand<CategoryCommand>({ type: 'category', payload: {category} })
    res.appendSuggestions(['Назад', 'Цитата дня', 'Случайная цитата'])
}

export const category_explicit: SaluteHandler<SaluteRequest<CategoryVariables>> = async ({req, res}) => {
    const category = req.message.original_text
    res.appendCommand<CategoryCommand>({ type: 'category', payload: {category} })
    res.appendSuggestions(['Назад', 'Цитата дня', 'Случайная цитата'])
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
    res.appendSuggestions(['Цитата дня', 'Случайная цитата', 'Мотивация и успех'])
    res.setAutoListening(false)
    res.setPronounceText('Меню')
    res.setAutoListening(true)
}