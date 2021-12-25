import { createStitches } from '@stitches/react';

export const MAIN_ACCENT = "#1C71DA"

export const {
    styled,
    css,
    globalCss,
    keyframes,
    getCssText,
    theme,
    createTheme,
    config,
} = createStitches({
    theme: {
        colors: {
            accent: MAIN_ACCENT
        },
    },
});
