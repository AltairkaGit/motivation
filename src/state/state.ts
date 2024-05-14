import { QueryClient } from 'react-query';

import { InputActionType, Quote, QuoteRes } from '../scenario/types';
import { assistantInstance } from '../utils/assistant';

export const queryClient = new QueryClient();

export interface State {
    id: number | null,
    quote: string,
    author: string,
    category: string,
}

const initialState: State = {
    id: null,
    quote: '',
    author: '',
    category: ''
}


function setQuote(quote: Quote) {
    queryClient.setQueryData<State>('quote', (prev = initialState) => ({
        ...prev,
        ...quote
    }))
}

const categoryById: any = {}
const idByCategory: any = {}
export const categories: {name:string, id:number}[] = []

const API = 'https://johnshelby.ru:8000'

const banList: number[] = []
const BanListSize = 5
const addInBanList = (id: number) => {
    if (banList.includes(id)) return
    if (banList.length == BanListSize) banList.shift()
    banList.push(id)
}
const banListToParams = () => {
    const res = banList.join(',')
    return 'ban='+res
}

const loadCategories = () => {
    // const result = await fetch(API + '/categories')
    const json = [
        {
            "name": "мотивация и успех",
            "id": 1
        },
        {
            "name": "счастье и благодарность",
            "id": 2
        },
        {
            "name": "любовь и отношения",
            "id": 3
        },
        {
            "name": "мудрость и самопознание",
            "id": 4
        },
        {
            "name": "работа и творчество",
            "id": 5
        },
        {
            "name": "спорт и здоровье",
            "id": 6
        },
        {
            "name": "бизнес и финансы",
            "id": 7
        },
        {
            "name": "путешествия",
            "id": 8
        },
        {
            "name": "искусство и культура",
            "id": 9
        },
        {
            "name": "наука и технологии",
            "id": 10
        }
    ]
    for (let category of json) {
        categoryById[category.id] = category.name
        idByCategory[category.name] = category.id
        categories.push(category)
    }
}
loadCategories()

const random = async () => {
    const result = await fetch(API + '/quotes' + '?' + banListToParams())
    if (result.ok) {
        const quote = await result.json() as QuoteRes
        addInBanList(quote.id)
        setQuote({...quote, category: categoryById[quote.categoryId]})
        assistantInstance?.sendActionPromisified!({type: 'say', payload: {quote}})
    } else {
        console.log(result)
    }
}

const daily = async () => {
    const result = await fetch(API + '/quotes/daily')
    if (result.ok) {
        const quote = await result.json() as QuoteRes
        addInBanList(quote.id)
        setQuote({...quote, category: categoryById[quote.categoryId]})
        assistantInstance?.sendActionPromisified!({type: 'say', payload: {quote}})
    } else {
        console.log(result)
    }
}

const retreiveCategoryId = (category: string) => {
    let id = idByCategory[category]
    if (id) return id
    for (let k of Object.keys(idByCategory)) {
        const words = k.split(' и ')
        if (words.includes(category)) {
            id = idByCategory[k]
            break
        }
    }
    category.split(' и ').forEach(word => {
        if (id) return
        for (let k of Object.keys(idByCategory)) {
            const words = k.split(' и ').map(w => w.slice(0, 4))
            if (words.includes(word.slice(0, 4))) {
                id = idByCategory[k]
                break
            }
        }
    })
    return id
}

const category = async (category: string) => {
    let retrievedCategoryId = retreiveCategoryId(category)
    if (!retrievedCategoryId) {
        return
    }
    const result = await fetch(API + `/quotes/${retrievedCategoryId}` + '?' + banListToParams())
    if (result.ok) {
        const quote = await result.json() as QuoteRes
        addInBanList(quote.id)
        setQuote({...quote, category: categoryById[quote.categoryId]})
        assistantInstance?.sendActionPromisified!({type: 'say', payload: {quote}})
    } else if (result.status == 404) {
        console.log('all of the caregory is in ban list')
    } else {
        console.log(result)
    }
}

const back = () => {
    queryClient.setQueryData<State>('quote', (prev = initialState) => ({
        ...initialState,
    }))
}

export const executors = {
    back,
    category,
    daily,
    random
}

export function smartAppDataHandler(action: InputActionType) {
    switch (action.type) {
        case 'daily':
            daily()
            break
        case 'category':
            const { category: cat } = action.payload;
            category(cat)
            break
        case 'random':
            random()
            break
        case 'back':
            back()
            break
        case 'test':
            console.log(action.payload)
            break

    }
}