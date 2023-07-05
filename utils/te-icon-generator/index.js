const fs = require('fs');
const path = require('path');

const iconsDirectoryPath = 'utils/te-icon-generator/icons';
const iconsTsFilePath = 'src/app/global/components/te-icon/te-icons.ts';
const iconsTypeFilePath =
  'src/app/global/components/te-icon/te-icon-name.type.ts';

const readSvgFiles = iconsDirectoryPath => {
  const svgFiles = fs
    .readdirSync(iconsDirectoryPath)
    .filter(file => path.extname(file) === '.svg');

  return svgFiles.map(file => {
    const filePath = path.join(iconsDirectoryPath, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const fileName = path.basename(file, '.svg');

    return { name: fileName, data: fileContent };
  });
};

const createIconFileContent = iconList => {
  let fileContent = `import { TeIcon } from './te-icon.interface';\n\n`;

  fileContent += iconList
    .map(icon => {
      const variableName = icon.name.replace(
        /[-\s_]([a-z])/g,
        (match, letter) => letter.toUpperCase()
      );

      return `export const ${variableName}: TeIcon = {
  name: '${icon.name}',
  data: \`${icon.data.replace(/\r?\n|\r/g, '')}\`,
};`;
    })
    .join('\n\n');

  fileContent += '\n';

  return fileContent;
};

const createIconsTypeFileContent = iconList => {
  let fileContent = 'export type TeIconName = ';

  fileContent += iconList.map(icon => `'${icon.name}'`).join('\n  | ');
  fileContent += ';\n';

  return fileContent;
};

const isAllNamesUniq = iconList => {
  const names = iconList.map(icon => icon.name);
  const uniqueNames = new Set(names);
  return names.length === uniqueNames.size;
};

const svgArray = readSvgFiles(iconsDirectoryPath);

if (!isAllNamesUniq(svgArray)) {
  throw new Error(
    '!!!       Icons have not-uniq name, double check it please       !!!'
  );
}

fs.writeFileSync(iconsTsFilePath, createIconFileContent(svgArray));
fs.writeFileSync(iconsTypeFilePath, createIconsTypeFileContent(svgArray));
