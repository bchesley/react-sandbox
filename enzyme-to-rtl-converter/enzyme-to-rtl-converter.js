const fs = require('fs');
const path = require('path');

// Read the command line arguments
const [, , enzymeTestFile] = process.argv;

// Check if the enzyme test file is provided
if (!enzymeTestFile) {
    console.error('Error: Please provide the Enzyme test file as a command line argument.');
    process.exit(1);
}

// Check if the enzyme test file exists
if (!fs.existsSync(enzymeTestFile)) {
    console.error(`Error: The file '${enzymeTestFile}' does not exist.`);
    process.exit(1);
}

// Convert Enzyme test to React Testing Library test
const convertedTest = convertEnzymeToRTL(enzymeTestFile);

// Write the converted test to a new file
const rtlTestFile = generateRTLTestFilePath(enzymeTestFile);
fs.writeFileSync(rtlTestFile, convertedTest, 'utf8');

console.log(`Conversion complete. Converted test file: ${rtlTestFile}`);

// Function to convert Enzyme test to React Testing Library test
function convertEnzymeToRTL(enzymeTestFile) {
    // Read the Enzyme test file
    const enzymeTest = fs.readFileSync(enzymeTestFile, 'utf8');

    // Replace Enzyme imports with React Testing Library imports
    const convertedTest = enzymeTest
        .replace("import { mount } from 'enzyme';", "import { render } from '@testing-library/react';")
        .replace("import Adapter from 'enzyme-adapter-react-16';", "")
        .replace("import { configure } from 'enzyme';", "")
        .replace("configure({ adapter: new Adapter() });", "");

    // Replace Enzyme methods with React Testing Library methods
    return convertedTest
        .replace(/mount\((.*?)\)/g, "render($1)")
        .replace('.find', '.getBy');
}

// Function to generate the file path for the converted React Testing Library test
function generateRTLTestFilePath(enzymeTestFile) {
    const dirname = path.dirname(enzymeTestFile);
    const basename = path.basename(enzymeTestFile, path.extname(enzymeTestFile));
    return path.join(dirname, `${basename}-rtl${path.extname(enzymeTestFile)}`);
}
