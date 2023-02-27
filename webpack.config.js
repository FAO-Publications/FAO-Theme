const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const data = require('./publication.js');
const { menuItems } = require('./webpack/pages');


let fs = require('fs');
let totLang = [];


Object.keys(data.languages).map(function(lan) {
    totLang.push({
        text: data.languages[lan].langText,
        lang: data.languages[lan].lang,
        code: data.languages[lan].code,
    })
});

module.exports = Object.keys(data.languages).map(function(language, i) {
    let lang = data.languages[i].lang;
    let DOI = data.languages[i].DOI;
    let code = data.languages[i].code;
    let metaTitle = data.languages[i].metaTitle;
    let metaDescription = data.languages[i].metaDescription;
    let metaKeywords = data.languages[i].metaKeywords;
    let menu = data.languages[i].menu;
    let download = data.languages[i].download;
    let acronym = data.languages[i].acronym;
    let year = data.languages[i].year;
    let pubTitle = data.languages[i].pubTitle;
    let pubSubTitle = data.languages[i].pubSubTitle;
    let chapterNumber = data.languages[i].pubTitle;
    let images = data.languages[i].images;

    return {
        name: code,
        entry: "./" + lang + "/src/js/app.js",
        output: {
            path: path.join(__dirname, "build/" + code),
            filename: lang + ".bundle.[contenthash].js",
            clean: true
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: code + '.html',
                template: "./" + lang + '/index.html',
                DOI: DOI,
                pubTitle: pubTitle,
                chapterNumber: chapterNumber,
                pubSubTitle: pubSubTitle,
                images: images,
                jobNumber: code,
                title: metaTitle,
                description: metaDescription,
                keywords: metaKeywords,
                lang: lang,
                download: download,
                meta: {
                    'og:title': { property: 'og:title', content: metaTitle },
                    'og:description': { property: 'og:description', content: metaDescription },
                    'og:type': { property: 'og:type', content: 'website' },
                    'og:url': { property: 'og:url', content: 'https://www.fao.org/3/' + code + '/online/' + code + '.html' },
                    'og:image': { property: 'og:image', content: 'https://www.fao.org/3/' + code + '/online/images/cover.jpg' },
                },
                templateParameters: {
                    structure: "home",
                    menu: menu,
                    totLang: totLang,
                    acronym: acronym,
                    year: year,
                },
            }),
            ...menuItems(menu, lang, DOI, code, totLang, download, acronym, year, metaDescription),
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash].css',
                chunkFilename: '[id].[contenthash].css',
            }),
            new CopyWebpackPlugin(
                {
                    patterns: [
                        { from: './' + lang + '/src/images', to: './images' },
                        { from: './' + lang + '/src/css', to: './css' },
                    ]
                }      ),
        ],
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } },
                        { loader: 'sass-loader', options: { sourceMap: true } },
                    ],
                },
                {
                    test: /\.(jpe?g|png|gif|svg|webp)$/i,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                name : "/" + lang + '/src/images/[name].[ext]&outputPath=./' + acronym + '/images'
                            }
                        }
                    ],
                },
                {
                    test: /\.ico$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                name : '[name].[ext]&outputPath=./'+ acronym +'/images'
                            }
                        }
                    ],
                },
            ]

        },
    };
});

