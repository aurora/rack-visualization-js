import { RackSet } from './models';
export declare class SvgGenerator {
    private static readonly DEFAULT_RACK_HEIGHT_UNITS;
    private static readonly DEFAULT_RACK_SPACING_POINTS;
    private static readonly DEFAULT_RACK_UNIT_POINTS;
    private static readonly DEFAULT_RACK_WIDTH_POINTS;
    private static readonly DEFAULT_SVG_MARGIN;
    generateSvg(rackSet: RackSet): string;
    private generateEmptyPattern;
    private generateRack;
    private generateDevice;
    private addDeviceSymbol;
    private generateRackScale;
    private xmlEscape;
    private isAbsoluteUrl;
    private calculateActualRackHeight;
}
