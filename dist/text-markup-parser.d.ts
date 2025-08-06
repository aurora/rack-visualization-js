import { RackSet } from './models';
export declare class TextMarkupParser {
    private lines;
    private currentLine;
    constructor(content: string);
    parse(): RackSet;
    private parseRack;
    private parseHeader;
    private parseItems;
    private parseItemEntry;
    private parseKey;
    private parseLabel;
    private extractHrefFromLabel;
    private getNextLine;
    private peekNextLine;
    private hasMoreLines;
}
