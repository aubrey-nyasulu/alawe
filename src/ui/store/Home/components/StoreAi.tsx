"use client";

import Script from 'next/script';

export default function StoreAi() {
    return (
        <>
            {/* Botpress Webchat Script */}
            <Script
                src="https://cdn.botpress.cloud/webchat/v2.2/inject.js"
                strategy="beforeInteractive" // Ensures the script loads before the page is interactive
            />

            {/* Custom Botpress Script */}
            <Script
                src="https://files.bpcontent.cloud/2024/11/04/14/20241104141203-LGLWNNRV.js"
                strategy="afterInteractive"  // Loads the script after the page becomes interactive
            />
        </>
    )
}
