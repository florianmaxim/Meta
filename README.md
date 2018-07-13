[dependencies-badge]: https://img.shields.io/david/florianmaxim/meta.svg
[dependencies-badge-url]: https://david-dm.org/florianmaxim/meta

[npm-badge]: https://img.shields.io/npm/v/meta-client.svg
[npm-badge-url]: https://www.npmjs.com/package/meta-client

<img src="resources/logo.png" width="100" height="100"/>

# Meta.js 👩‍🚀
## Javascript Library For Virtual Reality 🚀

[![Latest NPM release][npm-badge]][npm-badge-url] [![Build Status](https://travis-ci.org/florianmaxim/Meta.svg?branch=master)](https://travis-ci.org/florianmaxim/Meta) [![Dependencies][dependencies-badge]][dependencies-badge-url] [![https://metajs.org](https://img.shields.io/badge/metajs.org-online-green.svg)](https://metajs.org) [![https://metajs.org](https://img.shields.io/badge/twitter-metajs_org-blue.svg)](https://twitter.com/metajs_org)

# 🚀 Why (did you come up with this)?

Spatial media like Virtual Reality or Augmented Reality is perceived in such a fundamentally different way to computer graphics as we know them that we need to find new ways to describe it.
This is an approach.

Furthermore this is an attempt to create the most accessible virtual reality library possible.

# 🎊 Features

* 🏖 Learn how to create and use code virtual (reality) space in minutes.
* 💐 Code Virtual Reality like its the year you live in.
* 🤹🏻 Write in the language you know with the tools you love.
* 🚀 One code for any device (HTC Vive, Oculus Rift, Desktop, Smartphone, etc.).
* 🏰 Grab a cube now, move a castle soon!

# 💐 Example

<a href="https://metajs.org" target="blank"><img src="https://media.giphy.com/media/3o7aCWDuzxsESrbmcE/giphy.gif" /></a>

This example is written in three lines that can't be anymore intuitive.

```javascript

import {Ground, Cube, on} from 'meta-client';

new Ground();

on('touch', (data) => new Cube().set(data.position));

```

#  👩‍🚀 Usage

### Start within minutes (via Parcel-Bundler):

1. Create a new directory and enter it.
```script
mkdir meta && cd meta
```
2. Initialize a npm repository and install Parcel-Bundler and Meta.
```script
npm init && npm install parcel-bundler meta-client
```
3. Create a <i>index.html</i> and a <i>index.js</i> file.
```script
touch index.html index.js
```
5. Add the following into index.html.
```script
<html>
<body>
  <script src="./index.js"></script>
</body>
</html>
```
6. Add the following into index.js.
```javascript
import {Ground, Cube, on} from 'meta-client';

new Ground();

on('touch', (data) => new Cube().set(data.position));
```  
7. Start your VR space:
```script
parcel index.html
```  
8. Open http://localhost:1234/ in your browser.

This is the example from above.

# 🎉 Installation

### 🤖 Requirements

Meta.js requires Node.js (https://nodejs.org).

### Via NPM

```script
npm install meta-client
npm install
npm run build && npm run start
```
### Custom

```script
git clone https://github.com/florianmaxim/meta
npm install
npm run build && npm start
```

# 📕 Wiki

[Read the Wiki to learn how to use Meta.js.](https://github.com/florianmaxim/meta/wiki) 

# 📚 Docs

[Read the full code documentation.](https://florianmaxim.github.io/Meta)

# 💬 Slack

Join the [Slack channel](https://metajsorg.slack.com) to talk about (virtual) space.

# Packages

|                                             meta-client                                            |                                             meta-console                                             |
|:--------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------:|
| [![npm](https://img.shields.io/npm/v/meta-client.svg)](https://www.npmjs.com/package/meta-client)  | [![npm](https://img.shields.io/npm/v/meta-console.svg)](https://www.npmjs.com/package/meta-console)  |
| [![npm](https://img.shields.io/npm/dw/meta-client.svg)](https://www.npmjs.com/package/meta-client) | [![npm](https://img.shields.io/npm/dw/meta-console.svg)](https://www.npmjs.com/package/meta-console) |

# Compatibility

### VR Displays

<table>
    <tr>
        <td>
            Browser
        </td>
        <td>
            Version
        </td>
        <td>
            HTC Vive
        </td>
    </tr>
    <tr>
        <td>
            <a href="https://chromium.woolyss.com/download/" target="blank">
             Chromium
            </a>
        </td>
        <td>
        67.0.3371.0
        </td>
        <td>
            <img src ="https://img.shields.io/badge/status-stable-green.svg" />
        </td>
    </tr>
    <tr>
        <td>
            <a href="https://www.google.com/chrome/" target="blank">
             Chrome
            </a>
        </td>
        <td>
            65.0.3325.162
        </td>
        <td>
            <img src ="https://img.shields.io/badge/status-stable-green.svg" />
        </td>
    </tr>
     <tr>
        <td>
            <a href="https://www.mozilla.org/en-US/firefox/nightly/all/" target="blank">
             Firefox Nightly
            </a>
        </td>
        <td>
            61.0a1
        </td>
        <td>
            <img src ="https://img.shields.io/badge/status-stable-green.svg" />
        </td>
    </tr>
</table>

### Desktop

<table>
    <tr>
        <td>
            Browser
        </td>
        <td>
            Version
        </td>
        <td>
            Status
        </td>
    </tr>
    <tr>
       <td>
            Chrome
        </td>
        <td>     
        </td>
        <td>
        </td>
    </tr>
</table>

### Mobile

<table>
    <tr>
        <td>
            Browser
        </td>
        <td>
            Version
        </td>
        <td>
            Status
        </td>
    </tr>
    <tr>
       <td>
            Chrome
        </td>
        <td>     
        </td>
        <td>
        </td>
    </tr>
</table>

# Credits 👑

As any other software this is based on thousands of layers of programming abstraction. The upper layers on which this is build on are Three.js (Javascript 3D library) and Oimo.js (Javascript physics engine). 

# References & Inspiration 🤹

I have two main sources of inspiration:

I probably learned most about space from
[<b>Walter Lewin</b>](https://www.youtube.com/watch?v=GtOGurrUPmQ "Walter Lewin").

I probably learned most about Toys from [<b>Julian Summer Miller</b>](https://www.youtube.com/watch?v=F6uYDUPn4oM "Julian Summer Miller").

# License 🔖
MIT

# Manifesto 📜

Let's start to redefine space!