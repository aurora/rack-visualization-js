export declare class DeviceSymbols {
    static getSymbolPath(deviceType: string): string;
    static getPatchPanelPorts(): Array<{
        x: number;
        y: number;
        width: number;
        height: number;
    }>;
    static getTapeBackground(): {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    static getTapeDriveCircle1(): {
        cx: number;
        cy: number;
        r: number;
    };
    static getTapeDriveCircle2(): {
        cx: number;
        cy: number;
        r: number;
    };
}
