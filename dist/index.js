"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RackVisualization = exports.DeviceSymbols = exports.ColorSchemes = exports.SvgGenerator = exports.TextMarkupParser = exports.RackMLParser = void 0;
// Export all models
__exportStar(require("./models"), exports);
// Export parsers
var rackml_parser_1 = require("./rackml-parser");
Object.defineProperty(exports, "RackMLParser", { enumerable: true, get: function () { return rackml_parser_1.RackMLParser; } });
var text_markup_parser_1 = require("./text-markup-parser");
Object.defineProperty(exports, "TextMarkupParser", { enumerable: true, get: function () { return text_markup_parser_1.TextMarkupParser; } });
// Export generator
var svg_generator_1 = require("./svg-generator");
Object.defineProperty(exports, "SvgGenerator", { enumerable: true, get: function () { return svg_generator_1.SvgGenerator; } });
// Export utilities
var color_schemes_1 = require("./color-schemes");
Object.defineProperty(exports, "ColorSchemes", { enumerable: true, get: function () { return color_schemes_1.ColorSchemes; } });
var device_symbols_1 = require("./device-symbols");
Object.defineProperty(exports, "DeviceSymbols", { enumerable: true, get: function () { return device_symbols_1.DeviceSymbols; } });
// Import for internal use
const rackml_parser_2 = require("./rackml-parser");
const text_markup_parser_2 = require("./text-markup-parser");
const svg_generator_2 = require("./svg-generator");
// Main class that combines all functionality
class RackVisualization {
    constructor() {
        this.svgGenerator = new svg_generator_2.SvgGenerator();
    }
    /**
     * Parse RackML XML and generate SVG
     */
    parseRackMLAndGenerateSvg(rackmlContent) {
        const rackSet = rackml_parser_2.RackMLParser.parseRackML(rackmlContent);
        return this.svgGenerator.generateSvg(rackSet);
    }
    /**
     * Parse text markup and generate SVG
     */
    parseTextMarkupAndGenerateSvg(textContent) {
        const parser = new text_markup_parser_2.TextMarkupParser(textContent);
        const rackSet = parser.parse();
        return this.svgGenerator.generateSvg(rackSet);
    }
    /**
     * Generate SVG from RackSet
     */
    generateSvg(rackSet) {
        return this.svgGenerator.generateSvg(rackSet);
    }
}
exports.RackVisualization = RackVisualization;
