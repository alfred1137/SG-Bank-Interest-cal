<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
  [![Contributors][contributors-shield]][contributors-url]
  [![Forks][forks-shield]][forks-url]
  [![Stargazers][stars-shield]][stars-url]
  [![Issues][issues-shield]][issues-url]
  [![MIT License][license-shield]][license-url]
  <br />
  [![HTML5][HTML5-shield]][HTML5-url]
  [![JavaScript][JS-shield]][JS-url]
  [![Tailwind CSS][Tailwind-shield]][Tailwind-url]
  [![Node.js][NodeJS-shield]][NodeJS-url]
  [![Jest][Jest-shield]][Jest-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/alfred1137/SG-Bank-Interest-cal">
    <img src="favicon.svg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">SG Savings Account Optimizer</h3>

  <p align="center">
    <img src="https://img.shields.io/badge/version-v1.0.0-blue" alt="Version">
    <br />
    Maximize your monthly interest by optimally allocating your funds across high-interest savings accounts in Singapore.
    <br />
    <a href="https://alfred1137.github.io/SG-Bank-Interest-cal/"><strong>View Demo »</strong></a>
    <br />
    <br />
    <a href="https://github.com/alfred1137/SG-Bank-Interest-cal/issues">Report Bug</a>
    &middot;
    <a href="https://github.com/alfred1137/SG-Bank-Interest-cal/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#overview">📖 Overview</a></li>
    <li><a href="#features">✨ Features</a></li>
    <li><a href="#technologies">📦 Technologies</a></li>
    <li>
      <a href="#getting-started">🚀 Getting Started</a>
      <ul>
        <li><a href="#requirements">✅ Requirements</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">🛠️ Usage</a></li>
    <li><a href="#repository-structure">🗂️ Repository Structure</a></li>
    <li><a href="#contributing">🤝 Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- OVERVIEW -->
<a id="overview"></a>
## 📖 Overview

The **SG Savings Account Optimizer** is a web-based tool designed to help individuals in Singapore navigate the complexity of tiered interest rates and varying bank conditions. By inputting your total available funds and selecting relevant criteria (like salary credit or card spend), the tool calculates the most efficient distribution of funds across supported banks (UOB, SC, DBS, CIMB, OCBC) to maximize your monthly interest earnings.

Developed with a focus on modern UI/UX and transparency, it provides a granular breakdown of how every dollar is working for you.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- FEATURES -->
<a id="features"></a>
## ✨ Features

*   **Optimal Allocation Engine:** Uses a globally optimal algorithm to distribute funds across multiple banks and tiers.
*   **Dynamic UI:** Real-time updates as you toggle conditions or change fund amounts.
*   **Comprehensive Bank Support:** Includes UOB One, UOB Stash, SC Bonus$aver, OCBC 360, DBS Multiplier, and CIMB FastSaver.
*   **Visual Breakdown:** Interactive doughnut chart and detailed interest breakdown by tier.
*   **Adaptive Theme:** Supports system-preferred dark/light modes and manual toggle (Catppuccin aesthetic).
*   **Transparency:** Clearly shows "Last Updated" dates for bank rates and minimum qualifying requirements.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- TECHNOLOGIES -->
<a id="technologies"></a>
## 📦 Technologies

*   **Frontend:** HTML5, JavaScript (ES6+ Modules)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) with [Catppuccin](https://catppuccin.com/) colors
*   **Charts:** [Chart.js](https://www.chartjs.org/)
*   **Icons:** [Font Awesome](https://fontawesome.com/)
*   **Testing:** [Jest](https://jestjs.io/)
*   **Build Tool:** [Node.js](https://nodejs.org/) & [PostCSS](https://postcss.org/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
<a id="getting-started"></a>
## 🚀 Getting Started

To run this project locally, follow these steps.

<a id="requirements"></a>
### ✅ Requirements

*   Node.js (v18 or higher)
*   npm (v9 or higher)

<a id="installation"></a>
### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/alfred1137/SG-Bank-Interest-cal.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Build the CSS
   ```sh
   npm run build
   ```
4. Start the local server
   ```sh
   npm start
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE -->
<a id="usage"></a>
## 🛠️ Usage

1. Enter your **Total Funds** at the top.
2. Toggle the **Include Account** switch for banks you have or are considering.
3. Check/Uncheck specific **Conditions** (e.g., Salary Credit, Card Spend) for each bank.
4. Observe the **Total Monthly Interest** and **Optimal Allocation** update in real-time on the right panel.
5. Click on bank names in the **Interest Breakdown** section to see exactly how interest is calculated for each tier.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- REPOSITORY STRUCTURE -->
<a id="repository-structure"></a>
## 🗂️ Repository Structure

```
.
├── src/
│   ├── logic/           # Core calculation and allocation engines
│   ├── config/          # Bank interest rates and tier structures
│   ├── ui/              # DOM interaction and UI logic
│   ├── input.css        # Tailwind source file
│   └── output.css       # Compiled CSS
├── __tests__/           # Unit tests for the logic engines
├── index.html           # Main application entry point
├── favicon.svg          # Project icon
├── tailwind.config.js   # Tailwind configuration
├── package.json         # Project dependencies and scripts
└── memory-bank/         # Project documentation and context
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
<a id="contributing"></a>
## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
<a id="license"></a>
## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
<a id="contact"></a>
## Contact

Alfred - [GitHub Profile](https://github.com/alfred1137)

Project Link: [https://github.com/alfred1137/SG-Bank-Interest-cal](https://github.com/alfred1137/SG-Bank-Interest-cal)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/alfred1137/SG-Bank-Interest-cal.svg?style=for-the-badge
[contributors-url]: https://github.com/alfred1137/SG-Bank-Interest-cal/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/alfred1137/SG-Bank-Interest-cal.svg?style=for-the-badge
[forks-url]: https://github.com/alfred1137/SG-Bank-Interest-cal/network/members
[stars-shield]: https://img.shields.io/github/stars/alfred1137/SG-Bank-Interest-cal.svg?style=for-the-badge
[stars-url]: https://github.com/alfred1137/SG-Bank-Interest-cal/stargazers
[issues-shield]: https://img.shields.io/github/issues/alfred1137/SG-Bank-Interest-cal.svg?style=for-the-badge
[issues-url]: https://github.com/alfred1137/SG-Bank-Interest-cal/issues
[license-shield]: https://img.shields.io/github/license/alfred1137/SG-Bank-Interest-cal.svg?style=for-the-badge
[license-url]: https://github.com/alfred1137/SG-Bank-Interest-cal/blob/main/LICENSE
[HTML5-shield]: https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white
[HTML5-url]: https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5
[JS-shield]: https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E
[JS-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[Tailwind-shield]: https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
[NodeJS-shield]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[NodeJS-url]: https://nodejs.org/
[Jest-shield]: https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white
[Jest-url]: https://jestjs.io/