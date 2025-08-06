// Export all models
export * from './models';

// Export parsers
export { RackMLParser } from './rackml-parser';
export { TextMarkupParser } from './text-markup-parser';

// Export generator
export { SvgGenerator } from './svg-generator';

// Export utilities
export { ColorSchemes } from './color-schemes';
export { DeviceSymbols } from './device-symbols';

// Import for internal use
import { RackMLParser } from './rackml-parser';
import { TextMarkupParser } from './text-markup-parser';
import { SvgGenerator } from './svg-generator';
import { RackSet } from './models';

// Main class that combines all functionality
export class RackVisualization {
    private svgGenerator: SvgGenerator;

    constructor() {
        this.svgGenerator = new SvgGenerator();
    }

    /**
     * Parse RackML XML and generate SVG
     */
    public parseRackMLAndGenerateSvg(rackmlContent: string): string {
        const rackSet = RackMLParser.parseRackML(rackmlContent);
        return this.svgGenerator.generateSvg(rackSet);
    }

    /**
     * Parse text markup and generate SVG
     */
    public parseTextMarkupAndGenerateSvg(textContent: string): string {
        const parser = new TextMarkupParser(textContent);
        const rackSet = parser.parse();
        return this.svgGenerator.generateSvg(rackSet);
    }

    /**
     * Generate SVG from RackSet
     */
    public generateSvg(rackSet: RackSet): string {
        return this.svgGenerator.generateSvg(rackSet);
    }
}