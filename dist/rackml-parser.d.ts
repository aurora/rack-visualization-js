import { RackSet } from './models';
export declare class RackMLParser {
    static parseRackML(rackmlContent: string): RackSet;
    private static parseRack;
    private static parseDevice;
}
