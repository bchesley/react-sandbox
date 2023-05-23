- To run the program, open a terminal or command prompt, navigate to the directory containing the script, and execute the following command:
```
node enzyme-to-rtl-converter.js <enzyme-test-file>
````
- The converted file will be output to the same directory as the original file, with the same name, but with the suffix `.rtl` appended to the filename.
- Replace <enzyme-test-file> with the path to your Enzyme test file. For example:
```
node enzyme-to-rtl-converter.js path/to/enzyme-test.js
```
- The converted React Testing Library test will be written to a new file in the same directory as the Enzyme test file, with -rtl appended to the file name. For example, if the Enzyme test file is path/to/enzyme-test.js, the converted test file will be path/to/enzyme-test-rtl.js.
