import { CharacterId } from '@salutejs/client';
import { GetStaticPaths } from 'next';
import Router from 'next/router';
import { createGlobalStyle } from 'styled-components';
import { darkSber, lightEva, lightJoy } from '@salutejs/plasma-tokens/themes';

const themes = {
    sber: createGlobalStyle(darkSber),
    eva: createGlobalStyle(lightEva),
    joy: createGlobalStyle(lightJoy),
};

export const getCharacterStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [{ params: { character: 'eva' } }, { params: { character: 'sber' } }, { params: { character: 'joy' } }],
        fallback: false,
    };
};

const knownCharacters = ['joy', 'eva', 'sber'] as const;

const isKnownCharacter = (character?: string): character is CharacterId => {
    return knownCharacters.includes(character as 'sber' | 'joy' | 'eva');
};

// работает корректно для пре-рендера
export const useCharacter = (): CharacterId => {
    return 'sber';    
};

export const replaceCharacterInUrl = (character: CharacterId) => {
    return Router.asPath.replace(new RegExp(`/(${knownCharacters.join('|')})(.*)`), `/${character}$2`);
};

export const useCharacterTheme = () => {
    const initialCharacter = useCharacter();

    return themes[initialCharacter];
};
