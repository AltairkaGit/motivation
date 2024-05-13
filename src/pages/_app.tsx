import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Container, DeviceThemeProvider } from '@salutejs/plasma-ui';
import { QueryClientProvider } from 'react-query';
import { spatnavInstance } from '@salutejs/spatial';
import { useEffect } from 'react';

import { useCharacterTheme } from '../utils/character';
import { queryClient } from '../state/state';
import { earlyInit } from '../utils/assistant';
import { getPlatformByPath } from '../utils/platform';
import '../../global.css'
import { Cormorant_Garamond } from 'next/font/google'

earlyInit();

const garamond = Cormorant_Garamond({
    subsets: ['cyrillic'],
    weight: "500",
    variable: '--font-garamond',
})
   
function MyApp({ Component, pageProps, router }: AppProps) {
    const { platform, isSberbox, isPortal } = getPlatformByPath(router.asPath);
    const CharacterTheme = useCharacterTheme();

    const detectDeviceCallback = () => {
        switch (platform) {
            case 'mobile':
                return 'mobile' as const;
            case 'portal':
                return 'mobile' as const;
            case 'sberbox':
            default:
                return 'mobile' as const;
        }
    };

    useEffect(() => {
        if (isSberbox || isPortal) {
            spatnavInstance.init();
        }

        return () => {
            if (isSberbox || isPortal) {
                spatnavInstance.unInit();
            }
        };
    }, [isSberbox, isPortal]);

    return (
        <>
            <Head>
                <title>Motivation</title>
                <meta name="description" content="Motivation" />
                <link rel="icon" href="/logo.svg" />
            </Head>
            <DeviceThemeProvider detectDeviceCallback={detectDeviceCallback}>
                <QueryClientProvider client={queryClient}>
                    <CharacterTheme />
                    <div className={`${garamond.variable} font-sans`}>
                        <Component {...pageProps} />
                    </div>                    
                </QueryClientProvider>
            </DeviceThemeProvider>
        </>
    );
}
export default MyApp;
