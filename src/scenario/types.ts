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

export interface TestCommand extends SaluteCommand {
    type: 'test';
    payload: any
}

export type InputActionType = BackCommand | CategoryCommand | RandomCommand | DailyCommand | TestCommand;

export interface CategoryVariables extends SaluteRequestVariable {
    category: string
}