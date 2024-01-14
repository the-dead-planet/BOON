import { Mode } from './types';

declare module '@mui/styles/createPalette' {
    interface PaletteOptions {
        primary?: PaletteColorOptions;
        secondary?: PaletteColorOptions;
        error?: PaletteColorOptions;
        type?: PaletteType;
        mode?: Mode;
        tonalOffset?: number;
        contrastThreshold?: number;
        common?: Partial<CommonColors>;
        grey?: ColorPartial;
        text?: Partial<TypeText>;
        divider?: string;
        action?: Partial<TypeAction>;
        background?: Partial<TypeBackground>;
        getContrastText?: (background: string) => string;
    }
}
