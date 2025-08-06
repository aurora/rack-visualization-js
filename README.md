# Rack Visualization JS

A JavaScript/TypeScript library for parsing and rendering server rack diagrams from RackML XML or text markup.

## Installation

### From GitHub Packages

```bash
# Configure npm to use GitHub Packages for @aurora scope
echo "@aurora:registry=https://npm.pkg.github.com" >> ~/.npmrc

# Install the package
npm install @aurora/rack-visualization-js
```

### Authentication

To install from GitHub Packages, you need to authenticate with a GitHub personal access token:

1. Create a personal access token with `read:packages` permission
2. Add it to your `.npmrc` file:
   ```
   //npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
   ```

Or authenticate via npm login:
```bash
npm login --scope=@aurora --registry=https://npm.pkg.github.com
```

## Usage

### Simple Usage

```typescript
import { RackVisualization } from '@aurora/rack-visualization-js';

const rackViz = new RackVisualization();

// Parse RackML XML and generate SVG
const rackmlContent = `
<racks>
  <rack name="Server Rack 1" height="42">
    <server height="2">Web Server 1</server>
    <switch>Network Switch</switch>
    <server height="2">Database Server</server>
  </rack>
</racks>
`;

const svgContent = rackViz.parseRackMLAndGenerateSvg(rackmlContent);

// Parse text markup and generate SVG
const textContent = `
caption: My Server Rack
height: 42
items:
- server[2]: Web Server 1
- switch: Network Switch
- server[2]: Database Server
`;

const svgFromText = rackViz.parseTextMarkupAndGenerateSvg(textContent);
```

### Advanced Usage

```typescript
import { 
  RackMLParser, 
  TextMarkupParser, 
  SvgGenerator, 
  RackSet 
} from '@aurora/rack-visualization-js';

// Use separate parser
const rackSet: RackSet = RackMLParser.parseRackML(rackmlContent);

// Use SVG generator
const svgGenerator = new SvgGenerator();
const svg = svgGenerator.generateSvg(rackSet);

// Use text parser
const textParser = new TextMarkupParser(textContent);
const rackSetFromText = textParser.parse();
```

## RackML XML Format

```xml
<racks id="optional-id" base="optional-base-url">
  <rack name="Rack Name" height="42">
    <server height="2" href="link" color="#ff0000">Server Name</server>
    <switch at="5">Switch at position 5</switch>
    <storage height="4">Storage Array</storage>
    <gap height="2"/>
  </rack>
</racks>
```

## Text Markup Format

```
id: optional-id
caption: Rack Name
height: 42
items:
- server[2]: Server Name
- switch: Switch Name
- storage[4]: [Storage Array](http://example.com)
```

## Supported Device Types

- `server` - Server
- `switch` - Network Switch
- `firewall` - Firewall
- `router` - Router
- `storage` - Storage System
- `pdu` - Power Distribution Unit
- `ups` - Uninterruptible Power Supply
- `patch` - Patch Panel
- `cables` - Cable Management
- `tape` - Tape Drive
- `monitor` - Monitor
- `keyboard` - Keyboard
- `kvm` - KVM Switch
- `blank` - Blank Unit
- `gap` - Gap (XML only)

## API

### RackVisualization

Main class for simple usage.

#### Methods

- `parseRackMLAndGenerateSvg(rackmlContent: string): string` - Parses RackML XML and generates SVG
- `parseTextMarkupAndGenerateSvg(textContent: string): string` - Parses text markup and generates SVG
- `generateSvg(rackSet: RackSet): string` - Generates SVG from RackSet

### RackMLParser

Parser for RackML XML format.

#### Methods

- `static parseRackML(rackmlContent: string): RackSet` - Parses RackML XML

### TextMarkupParser

Parser for text markup format.

#### Methods

- `constructor(content: string)` - Creates parser with content
- `parse(): RackSet` - Parses the content

### SvgGenerator

Generator for SVG output.

#### Methods

- `generateSvg(rackSet: RackSet): string` - Generates SVG from RackSet

## License

MIT