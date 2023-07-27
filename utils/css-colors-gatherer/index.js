const fs = require('fs');

const parseCssVariables = cssContent => {
  const variableRegex = /--(\w+?-?\w+):\s*(\d+)\s+(\d+)\s+(\d+);/g;
  const variables = [];
  let match;

  while ((match = variableRegex.exec(cssContent))) {
    const name = match[1];
    const r = parseInt(match[2]);
    const g = parseInt(match[3]);
    const b = parseInt(match[4]);
    const hex = RGBToHex(r, g, b);

    variables.push({ name, rgb: { r, g, b }, hex });
  }

  return variables;
};

const readCssFile = filePath => {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    console.error('Error reading the CSS file:', err.message);
    return null;
  }
};

const createListWithVariables = cssFilePath => {
  const cssContent = readCssFile(cssFilePath);

  if (cssContent) {
    return parseCssVariables(cssContent);
  } else {
    return [];
  }
};

function formatAsObjectLiteral(variablesList) {
  return `[\n${variablesList
    .map(
      variable =>
        `  { name: '${variable.name}', rgb: { r: ${variable.rgb.r}, g: ${variable.rgb.g}, b: ${variable.rgb.b} }, hex: '${variable.hex}' }`
    )
    .join(',\n')},\n]`;
}

function generateTsFileWithExport(variablesList, tsFilePath) {
  try {
    const tsContent = `export const cssVariables = ${formatAsObjectLiteral(
      variablesList
    )};\n`;
    fs.writeFileSync(tsFilePath, tsContent);
    console.log('TypeScript file created successfully:', tsFilePath);
  } catch (err) {
    console.error('Error writing the TypeScript file:', err.message);
  }
}

const RGBToHex = (r, g, b) => {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  if (r.length === 1) r = '0' + r;
  if (g.length === 1) g = '0' + g;
  if (b.length === 1) b = '0' + b;

  return '#' + r + g + b;
};

const cssFilePath = 'src/app/shared/styles/color-palette-variables.scss';
const outputFilePath = 'utils/css-colors-gatherer/color-palette-variables.ts';
const colorList = createListWithVariables(cssFilePath);
generateTsFileWithExport(colorList, outputFilePath);
