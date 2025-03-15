import fs from 'fs';
import inquirer from 'inquirer';
import generateMarkdown from './utils/generateMarkdown.js';

// Questions for user input
const questions = [
    { type: 'input', name: 'title', message: 'Enter your project title:' },
    { type: 'input', name: 'description', message: 'Provide a short description:' },
    { type: 'input', name: 'installation', message: 'Enter installation instructions:' },
    { type: 'input', name: 'usage', message: 'Enter usage information:' },
    { type: 'list', name: 'license', message: 'Choose a license:', choices: ['MIT', 'GPLv3', 'Apache 2.0', 'BSD', 'None'] },
    { type: 'input', name: 'contributing', message: 'Enter contribution guidelines:' },
    { type: 'input', name: 'tests', message: 'Enter test instructions:' },
    { type: 'input', name: 'github', message: 'Enter your GitHub username:' },
    { type: 'input', name: 'email', message: 'Enter your email address:' }
];

// Function to write README file
function writeToFile(fileName, data) {
    fs.writeFileSync(fileName, data);
    console.log(`${fileName} has been generated successfully!`);
}

// Function to initialize the app
function init() {
    inquirer.prompt(questions).then((answers) => {
        const readmeContent = generateMarkdown(answers);
        writeToFile('README.md', readmeContent);
    });
}

// Run the application
init();
