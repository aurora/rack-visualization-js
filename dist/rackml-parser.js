"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RackMLParser = void 0;
class RackMLParser {
    static parseRackML(rackmlContent) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(rackmlContent, 'text/xml');
        const racksElement = doc.documentElement;
        if (racksElement.tagName !== 'racks') {
            throw new Error("Root element must be 'racks'");
        }
        const rackSet = {
            racks: []
        };
        const baseAttr = racksElement.getAttribute('base');
        if (baseAttr) {
            rackSet.base = baseAttr;
        }
        const idAttr = racksElement.getAttribute('id');
        if (idAttr) {
            rackSet.id = idAttr;
        }
        const rackNodes = racksElement.getElementsByTagName('rack');
        for (let i = 0; i < rackNodes.length; i++) {
            const rackNode = rackNodes[i];
            if (rackNode) {
                const rack = this.parseRack(rackNode);
                rackSet.racks.push(rack);
            }
        }
        return rackSet;
    }
    static parseRack(rackElement) {
        const rack = {
            name: rackElement.getAttribute('name') || '',
            height: parseInt(rackElement.getAttribute('height') || '42', 10),
            devices: []
        };
        const deviceNodes = rackElement.children;
        for (let i = 0; i < deviceNodes.length; i++) {
            const deviceNode = deviceNodes[i];
            if (deviceNode) {
                const device = this.parseDevice(deviceNode);
                if (device) {
                    rack.devices.push(device);
                }
            }
        }
        return rack;
    }
    static parseDevice(deviceElement) {
        var _a;
        const deviceType = deviceElement.tagName;
        // Skip gap elements - they don't create actual devices
        if (deviceType === 'gap') {
            return null;
        }
        const device = {
            type: deviceType,
            name: ((_a = deviceElement.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || '',
            height: parseInt(deviceElement.getAttribute('height') || '1', 10)
        };
        const hrefAttr = deviceElement.getAttribute('href');
        if (hrefAttr) {
            device.href = hrefAttr;
        }
        const colorAttr = deviceElement.getAttribute('color');
        if (colorAttr) {
            device.color = colorAttr;
        }
        const atAttribute = deviceElement.getAttribute('at');
        if (atAttribute) {
            device.position = parseInt(atAttribute, 10);
        }
        return device;
    }
}
exports.RackMLParser = RackMLParser;
