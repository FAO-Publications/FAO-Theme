
const HtmlWebpackPlugin = require('html-webpack-plugin');

const pages = (event, i, el, lang, DOI, code, totLang, menu, download, count, acronym, year, metaDescription, mainNextI, mainNextEl, mainPrevI, mainPrevEl, primaryTitle, subTitle, pubTitle) =>{
    var next = null;
    var prev = null;

    if (el[i+1] && el[i+1].subMenu && el[i+1].subMenu.length > 0) {
        next = el[i+1].subMenu[0];

    } else if (mainNextEl) {
        if (mainNextEl[mainNextI+1] && mainNextEl[mainNextI+1].subMenu && mainNextEl[mainNextI+1].subMenu.length > 0) {
            next = mainNextEl[mainNextI+1] && mainNextEl[mainNextI+1].subMenu && mainNextEl[mainNextI+1].subMenu[0]
        } else {
            next = mainNextEl[mainNextI+1];
        }
    } else {
        next = el[i+1]
    }


    if (el[i-1] && el[i-1].subMenu && el[i-1].subMenu.length > 0) {
        prev = el[i-1].subMenu[el[i-1].subMenu.length -1];
    } else if (mainPrevEl) {
        if (mainPrevEl[mainPrevI-1] && mainPrevEl[mainPrevI-1].subMenu && mainPrevEl[mainPrevI-1].subMenu.length > 0) {
            prev = mainPrevEl[mainPrevI-1] && mainPrevEl[mainPrevI-1].subMenu && mainPrevEl[mainPrevI-1].subMenu[mainPrevEl[mainPrevI-1].subMenu.length -1];
        } else {
            prev = mainPrevEl[mainPrevI-1];
        }
    } else {
        prev = el[i-1];
    }

    return new HtmlWebpackPlugin({
        template: `./${lang}/src/html/${event.url}.html`,
        inject: true,
        filename: `./${acronym}-${year}/${event.url}.html`,
        DOI: DOI,
        jobNumber: code,
        download: download,
        lang: lang,
        primaryTitle: primaryTitle,
        title: event.title,
        mainChapterCount: count > 0 ? count : null,
        subChapterCount: count > 0 ? i : null,
        subTitle: event.subTitle,
        description: metaDescription,
        mainSubtitle: subTitle,
        templateParameters: {
            structure: "main",
            menu: menu,
            cover: event.img,
            totLang: totLang,
            prevLink: prev,
            nextLink: next,
            acronym: acronym,
            year: year,
            pubTitle: event.pubTitle,
        },
        meta: {
            'og:title': { property: 'og:title', content: event.title },
            'og:description': { property: 'og:description', content: metaDescription },
            'og:type': { property: 'og:type', content: 'website' },
            'og:url': { property: 'og:url', content: 'https://www.fao.org/3/' + code + '/online/' + acronym + '-' + year + '/' + event.url + '.html' },
            'og:image': { property: 'og:image', content: 'https://www.fao.org/3/' + code + '/online/img/cover.jpg' },
        },
    });
};

exports.menuItems = (menu, lang, DOI, code, totLang, download, acronym, year, metaDescription) => {
    var menuResult = [];
    menu.map((event, i, el) => {
        let count = i;
        event.subMenu.length !== 0 && event.url === ""
            ?
            event.subMenu.map((sub, x, element) => {
                const primaryTitle = event.title;
                const subTitle = event.subTitle;
                const mainNextI = x === event.subMenu.length -1 && i;
                const mainNextEl = x === event.subMenu.length -1 && el;
                const mainPrevI = x === 0 && i;
                const mainPrevEl = x === 0 && el;
                menuResult.push(pages(sub, x, element, lang, DOI, code, totLang, menu, download, count, acronym, year, metaDescription, mainNextI, mainNextEl, mainPrevI, mainPrevEl, primaryTitle, subTitle));
            })
            :
            menuResult.push(pages(event, i, el, lang, DOI, code, totLang, menu, download, count, acronym, year, metaDescription));

       
    });


    return menuResult;
};


