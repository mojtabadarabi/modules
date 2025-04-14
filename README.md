# 🔧 Modules

A collection of reusable modules (like responsive helpers, etc.) used across multiple projects.  
This repo is designed to be included as a Git submodule so you can easily sync and update shared logic.

---

## 📦 Installation (as Git Submodule)

To use this repository in your project as a **Git submodule**, follow these steps:

### 1. Add script to pacakge.json file or any where can be run an work :)
### 2. run this script and then add and commit to add in git submodules
### 3. for update modules just add script for update "update_submodules"
### 4. first provide ResponsiveProvider at top
### 5. then add check function in middleware.ts 
### 6. add file with name responsive.config.ts in root of project 
### 6. you can use <Layout device="device name in responsive.config.ts"> to see that layout for device
### 7. also you can use useResponsive hook to render manual ui 

```bash

in package.json
"setup_modules": "git submodule add https://github.com/mojtabadarabi/modules.git src/where-you-want"
"update_modules":"git submodule update"

in layout file
<ResponsiveProvider initialDeviceType={getInitialDeviceType()}>

in middleware file
checkAndSetDeviceType({ response })

example for responsive.config.ts
const responsiveConfig: ResponsiveConfig = {
    responsiveCookieKey: 'device_type',
    breakpoints:{
        mobile: 768,
        desktop : 1200
    },
    defaultView: 'desktop'
}
