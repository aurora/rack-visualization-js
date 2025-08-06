import { ColorScheme } from './models';
export declare class ColorSchemes {
    private static readonly schemes;
    static getColor(deviceType: string, scheme?: string): string;
    static getSchemes(): {
        [key: string]: ColorScheme;
    };
}
