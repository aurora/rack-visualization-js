export * from './models';
export { RackMLParser } from './rackml-parser';
export { TextMarkupParser } from './text-markup-parser';
export { SvgGenerator } from './svg-generator';
export { ColorSchemes } from './color-schemes';
export { DeviceSymbols } from './device-symbols';
import { RackSet } from './models';
export declare class RackVisualization {
    private svgGenerator;
    constructor();
    /**
     * Parse RackML XML and generate SVG
     */
    parseRackMLAndGenerateSvg(rackmlContent: string): string;
    /**
     * Parse text markup and generate SVG
     */
    parseTextMarkupAndGenerateSvg(textContent: string): string;
    /**
     * Generate SVG from RackSet
     */
    generateSvg(rackSet: RackSet): string;
}
