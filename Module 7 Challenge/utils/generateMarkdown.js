// Function that returns a license badge based on selected license
// If no license is selected, returns an empty string
function renderLicenseBadge(license) {
  if (!license || license === 'None') return '';
  return `![License](https://img.shields.io/badge/License-${license.replace(' ', '%20')}-blue.svg)`;
}

// Function that returns the license link
function renderLicenseLink(license) {
  if (!license || license === 'None') return '';
  const licenseLinks = {
      'MIT': 'https://opensource.org/licenses/MIT',
      'GPLv3': 'https://www.gnu.org/licenses/gpl-3.0',
      'Apache 2.0': 'https://www.apache.org/licenses/LICENSE-2.0',
      'BSD': 'https://opensource.org/licenses/BSD-3-Clause'
  };
  return licenseLinks[license] || '';
}

// Function that returns the license section of README
function renderLicenseSection(license) {
  if (!license || license === 'None') return '';
  return `## License
This project is licensed under the [${license}](${renderLicenseLink(license)}) license.`;
}

// Function to generate markdown for README
function generateMarkdown(data) {
  return `# ${data.title}

${renderLicenseBadge(data.license)}

## Description
${data.description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation
${data.installation}

## Usage
${data.usage}

${renderLicenseSection(data.license)}

## Contributing
${data.contributing}

## Tests
${data.tests}

## Questions
GitHub: [${data.github}](https://github.com/${data.github})

For further questions, reach me at ${data.email}.
`;
}

export default generateMarkdown;
