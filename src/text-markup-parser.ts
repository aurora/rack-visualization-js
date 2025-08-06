import { RackSet, Rack, RackDevice } from './models';

export class TextMarkupParser {
    private lines: string[];
    private currentLine: number;

    constructor(content: string) {
        this.lines = content
            .split(/[\n\r]/)
            .map(line => line.trim())
            .filter(line => line.length > 0);
        this.currentLine = 0;
    }

    public parse(): RackSet {
        const rackSet: RackSet = {
            racks: []
        };
        const rackResult = this.parseRack();
        rackSet.racks.push(rackResult.rack);
        if (rackResult.id) {
            rackSet.id = rackResult.id;
        }
        return rackSet;
    }

    private parseRack(): { rack: Rack; id?: string } {
        const rack: Rack = {
            name: '',
            height: 42,
            devices: []
        };
        
        // Parse header (caption and height)
        const headerResult = this.parseHeader(rack);
        
        // Parse items
        this.parseItems(rack);
        
        const result: { rack: Rack; id?: string } = { rack };
        if (headerResult.id) {
            result.id = headerResult.id;
        }
        return result;
    }

    private parseHeader(rack: Rack): { id?: string } {
        let id: string | undefined;
        
        // Check if first line is an optional ID
        let nextLine = this.peekNextLine();
        if (nextLine.startsWith('id:')) {
            const idLine = this.getNextLine();
            id = idLine.substring(3).trim();
            if (!id) {
                throw new Error(`ID cannot be empty at line ${this.currentLine}`);
            }
        }
        
        // Parse caption line: "caption: <text>"
        const captionLine = this.getNextLine();
        if (!captionLine.startsWith('caption:')) {
            throw new Error(`Expected 'caption:' at line ${this.currentLine}, got: ${captionLine}`);
        }
        
        rack.name = captionLine.substring(8).trim();

        // Parse height line: "height: <int>"
        const heightLine = this.getNextLine();
        if (!heightLine.startsWith('height:')) {
            throw new Error(`Expected 'height:' at line ${this.currentLine}, got: ${heightLine}`);
        }
        
        const heightStr = heightLine.substring(7).trim();
        const height = parseInt(heightStr, 10);
        if (isNaN(height)) {
            throw new Error(`Invalid height value: ${heightStr}`);
        }
        
        rack.height = height;
        
        const result: { id?: string } = {};
        if (id) {
            result.id = id;
        }
        return result;
    }

    private parseItems(rack: Rack): void {
        // Parse items header: "items:"
        const itemsLine = this.getNextLine();
        if (!itemsLine.startsWith('items:')) {
            throw new Error(`Expected 'items:' at line ${this.currentLine}, got: ${itemsLine}`);
        }

        // Parse item list
        while (this.hasMoreLines()) {
            const line = this.peekNextLine();
            if (!line.trimStart().startsWith('-')) {
                break;
            }
                
            const device = this.parseItemEntry();
            rack.devices.push(device);
        }
    }

    private parseItemEntry(): RackDevice {
        let line = this.getNextLine();
        
        // Remove leading whitespace and dash
        line = line.trimStart();
        if (!line.startsWith('-')) {
            throw new Error(`Expected '-' at beginning of item entry at line ${this.currentLine}`);
        }
        
        line = line.substring(1).trim();
        
        // Split at first colon to separate key from label
        const colonIndex = line.indexOf(':');
        if (colonIndex === -1) {
            throw new Error(`Expected ':' in item entry at line ${this.currentLine}`);
        }
        
        const keyPart = line.substring(0, colonIndex).trim();
        const labelPart = line.substring(colonIndex + 1).trim();
        
        const device = this.parseKey(keyPart);
        device.name = this.parseLabel(labelPart);
        const href = this.extractHrefFromLabel(labelPart);
        if (href) {
            device.href = href;
        }
        
        return device;
    }

    private parseKey(keyPart: string): RackDevice {
        const device: RackDevice = {
            type: '',
            name: '',
            height: 1
        };
        
        // Check for height specification [n]
        const heightMatch = keyPart.match(/^(.+?)\[(\d+)\]$/);
        if (heightMatch && heightMatch[1] && heightMatch[2]) {
            keyPart = heightMatch[1].trim();
            device.height = parseInt(heightMatch[2], 10);
        } else {
            device.height = 1; // Default height
        }
        
        // Check for custom type (identifier:identifier)
        const customTypeMatch = keyPart.match(/^([a-zA-Z][a-zA-Z0-9_-]*):([a-zA-Z][a-zA-Z0-9_-]*)$/);
        if (customTypeMatch && customTypeMatch[2]) {
            // For custom types, use the second identifier as the type
            device.type = customTypeMatch[2];
        } else {
            // Simple identifier
            if (!/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(keyPart)) {
                throw new Error(`Invalid identifier: ${keyPart}`);
            }
            
            device.type = keyPart;
        }
        
        return device;
    }

    private parseLabel(labelPart: string): string {
        // Parse Markdown-style links: [text](url)
        const linkMatch = labelPart.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (linkMatch && linkMatch[1]) {
            // This is a link - we'll need to set the href in the calling method
            return linkMatch[1]; // Return just the text part
        }
        
        // Return the label as-is if it's not a link
        return labelPart;
    }
    
    private extractHrefFromLabel(labelPart: string): string | undefined {
        // Extract href from Markdown-style links: [text](url)
        const linkMatch = labelPart.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (linkMatch) {
            return linkMatch[2]; // Return the URL part
        }
        
        return undefined; // No link found
    }

    private getNextLine(): string {
        if (this.currentLine >= this.lines.length) {
            throw new Error('Unexpected end of input');
        }
        
        const line = this.lines[this.currentLine++];
        if (line === undefined) {
            throw new Error('Unexpected undefined line');
        }
        return line;
    }

    private peekNextLine(): string {
        if (this.currentLine >= this.lines.length) {
            return '';
        }
        
        const line = this.lines[this.currentLine];
        return line || '';
    }

    private hasMoreLines(): boolean {
        return this.currentLine < this.lines.length;
    }
}