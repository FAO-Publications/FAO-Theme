# FAO: SDG 2022 Corporate Brochure


## Getting Starded
- run `npm install` to install javascript dependencies.

## Code Structure

The basic source code structure will be:

```
en
 ├── src
 |   ├──css
 |   ├──html
 |   ├──img
 |   ├──js
 |   ├──index.html
 ├── node_modules
 ├── webpack
 ├── .gitignore
 ├── package.json
 ├── package-lock.json
 ├── publication.js
 ├── webpack.config.js


```
- `en` - is the name of the default folder containing the entire code of the `English version`.
- `src` - inside this folder you will find:
1. The home page `index.html`
2. The `img` folder, containing all the images of the project.
3. The `html` folder, containing all the html files **except** the index.html (homepage).


## publication.js

This file, located at the root of the project, allows you to `configure` the publication:

```
module.exports = {
languages: [

        {
            lang: "en",
            langText: "English",
            code: "job-number-en",
            titlePubblications: "RURAL",
            acronym: 'chapters',
            year: '2023',
            metaTitle: "RURAL POVERTY ANALYSIS",
            metaDescription: "A technical guide for measuring, profiling and targeting in programmes and projects",
            DOI: "10.4060/job-number-en",
            pubTitle: "RURAL<br /> POVERTY<br /> ANALYSIS",
            pubSubTitle: "A technical guide for measuring, profiling and targeting in programmes and projects",
            images: "primary-image",
            menu: [
                {
                    pubTitle: "RURAL<br /> POVERTY<br /> ANALYSIS",
                    title: "Front Matter",
                    url: "front-matter",
                    img: "",
                    isChapter: false,
                    subMenu: [{
                        subMenuTitle: "FOREWORD",
                        subMenuLink: "#item-1-1"
                    },
                    {
                        subMenuTitle: "PREFACE",
                        subMenuLink: "#item-1-2"
                    },
                    {
                        subMenuTitle: "ACKNOWLEDGEMENTS",
                        subMenuLink: "#item-1-3"
                    },
                    {
                        subMenuTitle: "ABBREVIATIONS AND ACRONYMS",
                        subMenuLink: "#item-1-4"
                    },
                    {
                        subMenuTitle: "EXECUTIVE SUMMARY",
                        subMenuLink: "#item-1-5"
                    },
                    ],
                },
                
                {
                    pubTitle: "RURAL<br /> POVERTY<br /> ANALYSIS",
                    title: "MEASURING RURAL POVERTY",
                    url: "chapter-1",
                    img: "chapter-image",
                    isChapter: true,
                    chapterNumber: "1",
                    subMenu: [{
                        subMenuTitle: "1.1. Introduction",
                        subMenuLink: "#item-1-1"
                    },
                    {
                        subMenuTitle: "1.2. Poverty measurement",
                        subMenuLink: "#item-1-2"
                    },
                    {
                        subMenuTitle: "1.3. Measuring monetary poverty",
                        subMenuLink: "#item-1-3"
                    },
                    {
                        subMenuTitle: "1.4. Measuring multidimensional poverty",
                        subMenuLink: "#item-1-4"
                    },
                    ],
                },
                {
                    pubTitle: "RURAL<br /> POVERTY<br /> ANALYSIS",
                    title: "CHARACTERIZING THE RURAL POOR AND EXTREME POOR",
                    url: "chapter-2",
                    img: "chapter-image",
                    isChapter: true,
                    chapterNumber: "2",
                    subMenu: [{
                        subMenuTitle: "2.1.Introduction",
                        subMenuLink: "#item-1-1"
                    },
                    {
                        subMenuTitle: "2.2 Poverty profiles: going beyond counting the rural poor and extreme poor",
                        subMenuLink: "#item-1-2"
                    },
                    {
                        subMenuTitle: "2.3. Poverty maps",
                        subMenuLink: "#item-1-3"
                    },
                    ],
                },
                {
                    pubTitle: "RURAL<br /> POVERTY<br /> ANALYSIS",
                    title: "TARGETING FOR RURAL POVERTY REDUCTION INTERVENTIONS",
                    url: "chapter-3",
                    img: "chapter-image",
                    isChapter: true,
                    chapterNumber: "3",
                    subMenu: [{
                        subMenuTitle: "3.1.Introduction",
                        subMenuLink: "#item-1-1"
                    },
                    {
                        subMenuTitle: "3.2. Current debates on targeting",
                        subMenuLink: "#item-1-2"
                    },
                    {
                        subMenuTitle: "3.3. Targeting mechanisms",
                        subMenuLink: "#item-1-3"
                    },
                    {
                        subMenuTitle: "3.4. The targeting process",
                        subMenuLink: "#item-1-4"
                    },
                    ],
                },
                {
                    pubTitle: "RURAL<br /> POVERTY<br /> ANALYSIS",
                    title: "WHAT’S NEXT?",
                    url: "chapter-4",
                    img: "chapter-image",
                    isChapter: true,
                    chapterNumber: "4",
                    subMenu: [
                    ],
                },
                {
                    pubTitle: "RURAL<br /> POVERTY<br /> ANALYSIS",
                    title: "REFERENCES",
                    url: "references",
                    img: "",
                    isChapter: false,
                    subMenu: [

                    ],
                },
                {
                    pubTitle: "RURAL<br /> POVERTY<br /> ANALYSIS",
                    title: "ANNEXES",
                    url: "annexes",
                    img: "",
                    isChapter: false,
                    subMenu: [{
                        subMenuTitle: "Annex 1",
                        subMenuLink: "#item-1-1"
                    },
                    {
                        subMenuTitle: "Annex 2",
                        subMenuLink: "#item-1-2"
                    },
                    {
                        subMenuTitle: "Annex 3",
                        subMenuLink: "#item-1-3"
                    },
                    {
                        subMenuTitle: "Annex 4",
                        subMenuLink: "#item-1-4"
                    },
                    {
                        subMenuTitle: "Annex 5",
                        subMenuLink: "#item-1-5"
                    },
                    ],
                },

                
            ],
        },
  ]
};

```

- Inside the `languages` object you can define:
- The `lang` of the `<html>`
- The `code` of the publication.
- The `acronym` of the publication. (Every word divided by hypens).
- The `year` refers to the year of the publication.
- The meta tag `DOI`.
- The language label to show on the header toggle `langText`

Any update to  `metaTitle`, `metaDescription` and `metaKeyword` will display inside the relative meta data on the `homepage`.
Updates on `acronym` and `year` will affect the slug of the report.


- The `menu` object define the `menu structure`, the `navigation` and sets the other pages of the application **except the homepage**.


```
 menu: [
                {
                    pubTitle: "RURAL POVERTY ANALYSIS",
                    title: "Front Matter",
                    url: "front-matter",
                    img: "",
                    isChapter: false,
                    subMenu: [{
                        subMenuTitle: "FOREWORD",
                        subMenuLink: "#item-1-1"
                    },
                    {
                        subMenuTitle: "PREFACE",
                        subMenuLink: "#item-1-2"
                    },
                    {
                        subMenuTitle: "ACKNOWLEDGEMENTS",
                        subMenuLink: "#item-1-3"
                    },
                    {
                        subMenuTitle: "ABBREVIATIONS AND ACRONYMS",
                        subMenuLink: "#item-1-4"
                    },
                    {
                        subMenuTitle: "EXECUTIVE SUMMARY",
                        subMenuLink: "#item-1-5"
                    },
                    ],
                }
],
  ```
1. "pubTitle" is the title of the publication that is displayed on the sidebar of each page.
2. "title" of the page (will be displayed in the main menu and in the metaTitle).
3. "url" sets the name of the HTML page and the relative URL address.
4. "img" is the name of the cover image for each chapter.
5. "isChapter" defines whether the section is a chapter or not.
6. If a sub-menu is needed, by setting `title` and `link` inside the `subMenu` array. 


## Running the application

Run the following in your terminal/console:

```
npm run develop
```

A `build` folder will be created at the root of the project with the structure of the publication bundle.

```
build
├──  
    job-number-en
       ├── chapters-2023
       ├── css
       ├── img
       └── en.bundle.js
       └── job-number-en.html
       └── main.css
```

From now on your application will be in **watch mode**. By opening the file `job-number-en.html` in your browser it will be possible to navigate the homepage. The browser will be updated (live reload) after every change in your code.

**Important** If for some reason you browser is not updating the changes in your code, run again `npm run develop` in your terminal/console.


## Add a new language

If your publication requires more then one language, you can add a node inside `publication.js`. In the following example I'm going to add the `es` - "Spanish version":

```
module.exports = {
    languages: [
        {
            lang: "en",
            ...
        },

        {
            lang: "en",
            langText: "Español",
            code: "job-number-es",
            titlePubblications: "",
            acronym: '',
            year: '2023',
            metaTitle: "",
            metaDescription: "",
            DOI: "10.4060/job-number-es",
            pubTitle: "",
            pubSubTitle: "",
            images: "primary-image",
            menu: [
              ...
            ],
        },
    ],

};
```

**Important**  
- When a new language is required, update the **last two letters** of `lang`, `code`, `langTExt`, and `DOI` depending on the language for each publication.


Then copy/paste your 'en' code folder and rename it depending on the language. In this case I'm going to rename it in `es`:
The code structure will be like this:

```
├──en
├──es
     ├── src
     |   ├──css
     |   ├──html
     |   ├──img
     |   ├──js
     |   ├──index.html
     ├── node_modules
     ├── webpack
     ├── .gitignore
     ├── package.json
     ├── package-lock.json
     ├── publication.js
     ├── webpack.config.js

```

Run the command `npm run develop` in your terminal/console and a new bundle will be added in the build folder:

```
build
├── cb2395en
├── job-number-es
       ├── chapters-2023
       ├── css
       ├── img
       └── en.bundle.js
       └── job-number-es.html
       └── main.css
```

- Please maintain the following languages order: العربية, 中文, Français, Русский, Español.
- For the **ZH version**: Add the following script inside the <head> tag in **every page**:

```
    <script>
          (function(d) {
            var config = {
              kitId: 'vtr2gjf',
              scriptTimeout: 3000,
              async: true
            },
            h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace
        (/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement
        ("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";
        tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=
        tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!=
        "loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};
        s.parentNode.insertBefore(tk,s)
          })(document);
    </script>
```

## Analytics code

You should include the Google Analytics tracking code before closing the `<head>` tag in every page.


```
<!-- Global site tag (gtag.js) - Google Analytics -->

<script async src="https://www.googletagmanager.com/gtag/js?id=UA-127786997-9"></script>

<script>

  window.dataLayer = window.dataLayer || [];

  function gtag(){dataLayer.push(arguments);}

  gtag('js', new Date());



  gtag('config', 'UA-127786997-9');

</script>
```


## Creating a Production Build

- `npm run build` creates a build directory with a bundle for every language of the publication.
