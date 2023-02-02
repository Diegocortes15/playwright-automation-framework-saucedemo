# Playwright Automation Framework Saucedemo

## Dependencies used

- Playwright
- Casual
- fs

## Tutorial to run the project

### Prerequisites

#### Node.js

1. You need must have [Node.js](https://nodejs.org/en/) installed (Node.js LTS version recommended)
2. When you are installing Node.js, make sure to check the option

   - [x] **Automatically install the necesary tools. Note that this will also install Chocolatey. The script will pop-up in a new window after the installation completes.**

![nodeInstall](https://user-images.githubusercontent.com/60171460/157139770-d00bb969-9b36-4179-9dd2-ec5bf3fbd89a.PNG)

#### Browsers

Installed:

- Chrome
- Firefox
- MicrofoftEdge

#### Visual Studio Code

You must have [Visual Studio Code](https://code.visualstudio.com/download) installed

## Download and open project

### Workaround 1

#### Download project

1. Click on the code button in this repository
2. Select the Download Zip option
3. Extract the .zip file with the **Extract here** option
4. Place the project folder on the desired location

#### Open project

- **<u>First way</u>:** Right click on the folder and open it with Visual Studio Code
- **<u>Second way</u>:** Open Visual Studio code and drag the folder in Visual Studio Code Window
- **<u>Third way</u>:** Open Visual Studio, on top bar, click File and Open Folder or press `Ctrl+K Ctrl+O`, then choose the folder where you save it

![openProject-gif](https://user-images.githubusercontent.com/60171460/157499108-f272d71b-f60c-460d-acdd-49b3c9002933.gif)

### Workaround 2 - Gitbash

1. Select the folder when you would like clone the project
2. Open gitbash and paste the following command

```bash
git clone https://github.com/Diegocortes15/playwright-automation-framework-saucedemo.git
```

![image](https://user-images.githubusercontent.com/60171460/212787114-fe2b25d3-cf72-4336-9c16-83cf3b8f30d4.png)

## Running project

- In Visual Studio Code, open new terminal with `` Ctrl+Shift+` `` or `Ctrl+Shift+ñ` or on top bar click **Terminal**, then click **New Terminal**

![openTerminal](https://user-images.githubusercontent.com/60171460/157498798-253494f2-abc8-4764-a343-3cb8e37acdc9.gif)

- Type `npm install` and wait all packages will be downloaded

```bash
npm install
```

### How to Run test cases 🧪

---

#### Run test cases by regression suite 🌀

```bash
npx playwright test -g "@regression"
```

---

#### Run test cases by sprints ➰

➰ Sprint 1

```bash
npx playwright test -g "@sprint1"
```

| ➰ Sprints  |             |             |
| ----------- | ----------- | ----------- |
| ➰ @sprint1 | ➰ @sprint2 | ➰ @sprint3 |

---

#### Run test cases by user story 📗

📗 Story PW-0001

```bash
npx playwright test -g "@pw-0001"
```

| 📗 Stories  |             |             |
| ----------- | ----------- | ----------- |
| 📗 @pw-0001 | 📗 @pw-0002 | 📗 @pw-0013 |
| 📗 @pw-0015 | 📗 @pw-0018 | 📗 @pw-0020 |

---

#### Run test cases by test case 📘

📘 Test case PW-0003

```bash
npx playwright test -g "@pw-0003"
```

| 📘 Test cases |             |             |
| ------------- | ----------- | ----------- |
| 📘 @pw-0003   | 📘 @pw-0004 | 📘 @pw-0005 |
| 📘 @pw-0006   | 📘 @pw-0007 | 📘 @pw-0008 |
| 📘 @pw-0009   | 📘 @pw-0010 | 📘 @pw-0011 |
| 📘 @pw-0012   | 📘 @pw-0014 | 📘 @pw-0016 |
| 📘 @pw-0017   | 📘 @pw-0019 | 📘 @pw-0021 |
| 📘 @pw-0022   | 📘 @pw-0023 |             |

---

#### 👀 Run test cases by visual validation 👀

1. Update snapshots

```bash
npx playwright test -g "@visual-validation" --update-snapshots
```

2. Run tests

```bash
npx playwright test -g "@visual-validation"
```

---

#### 🚹 Run test cases by accessibility testing 🚹

```bash
npx playwright test -g "@accessibility-testing"
```

### How open Playwright report 🎭

```bash
npx playwright show-report
```

![Animation 3 (1)](https://user-images.githubusercontent.com/60171460/214774348-c9d8b4c2-6597-4abc-9ecb-bbd238e95987.gif)
