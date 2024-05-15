/* eslint-disable @typescript-eslint/ban-ts-comment */
import { SaluteRequestVariable } from '@salutejs/scenario';

type SaluteCommand = {
    type: string;
    payload?: Record<string, unknown> | Array<unknown>;
};


export interface QuoteRes {
    id: number,
    quote: string,
    author: string,
    categoryId: number
}

export interface Quote {
    id: number,
    quote: string,
    author: string,
    category: string
}
export interface InitCommand extends SaluteCommand {
    type: 'init';
    payload: {};
}

export interface CategoryCommand extends SaluteCommand {
    type: 'category';
    payload: {
        category: string
    };
}

export interface RandomCommand extends SaluteCommand {
    type: 'random',
    payload: {
    }
}

export interface DailyCommand extends SaluteCommand {
    type: 'daily',
    payload: {
    }
}

export interface BackCommand extends SaluteCommand {
    type: 'back',
    payload: {
    }
}

export interface NextCommand extends SaluteCommand {
    type: 'next_quote';
    payload: any
}

export interface NextCategoryCommand extends SaluteCommand {
    type: 'next_quote_category';
    payload: any
}

export interface NextRejectedCommand extends SaluteCommand {
    type: 'next_quote_rejected';
    payload: any
}

export interface RepeatAsk extends SaluteCommand {
    type: 'repeat';
    payload: any
}

export interface RepeatRejected extends SaluteCommand {
    type: 'repeat_rejected';
    payload: any
}

export type InputActionType = BackCommand | CategoryCommand | RandomCommand | DailyCommand | NextCommand | NextCategoryCommand | NextRejectedCommand | RepeatAsk | RepeatRejected;

export interface CategoryVariables extends SaluteRequestVariable {
    category: string
}