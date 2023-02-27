import pub from '../../../publication.js'

$(window).on("load", function () {
    window.localStorage.clear();
    var sPageURL = window.location.href;

    for (var i = 0; i < pub.languages.length; i++) {

        var found = sPageURL.indexOf(pub.languages[i].code) > 0;
        if (found) {

            var context = sPageURL.split(pub.languages[i].code)[0];

            for (var j = 0; j < pub.languages[i].menu.length; j++) {

                var title = pub.languages[i].menu[j].title;
                var page = pub.languages[i].menu[j].url;
                var url = context + pub.languages[i].code + "/" + pub.languages[i].acronym + "-" + pub.languages[i].year + "/" + page + ".html";
              

                if (window.localStorage.getItem(page) == null) {
                    downloadPage(page, url, title, pub.languages[i].menu);
                }
            }
        }
    }
});

function downloadPage(page, url, title, menu) {

    $.ajax({
        url: url,
        success: function (data) {

            var body = /<body.*>([\s\S]+)<\/body>/.exec(data);

            var search = {};
            search["index"] = "";
            for (let i = 0; i < menu.length; i++) {
                search[menu[i].url] = "";
            }

            window.localStorage.setItem(page, JSON.stringify({ "title": title, "url": url, "body": body, "search": search }));
        }
    });
}


// Cache selectors
var lastId, topMenu, topMenuHeight, menuItems, scrollItems;


document.querySelector('.third-button')?.addEventListener('click', function () {

    document.querySelector('.menu-icon').classList.toggle('open');
});

$(document).ready(function () {

    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    // Se la larghezza è inferiore a 576px, aggiungi la classe "mobile" all'elemento con ID "elementId"
    if (width < 576) {
        var element = document.getElementById("searchMobile");
        element.classList.add("dropdown-menu");
    }

    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

    // Reg Exp to format title if any HTML tag is present
    var theTitle = document.title.replace(/(<([^>]+)>)/gi, " ");
    document.title = theTitle;



    // Set active link from menu
    var location = window.location.pathname.split('/').pop();

    $('ul.nav li a.nav-link').each(function () {
        if (this.href.split('/').pop() === location) {
            $(this).addClass('active');
            if ($(this).parent('li').parent('ul').parent('li').find('span.submenu').length) {
            } else {
                $(this).parent('li').css('border-bottom', 'none');
            }
        }
    });


    $('li.active').unbind().click(function () {
        $(this).parent("ul").find("li").not(".active").toggle();
        $(this).parent("ul").toggleClass('grey');
    });



    let mybutton = document.getElementById("btn-back-to-top");
    mybutton?.addEventListener("click", backToTop);

    function backToTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
});


// Cache selectors
topMenu = $("#top-menu");
topMenuHeight = topMenu.outerHeight() + 15;

// All list items
menuItems = topMenu.find("a");

// Anchors corresponding to menu items
scrollItems = menuItems.map(function () {
    var item = $(this).attr("href");
    if (item != '#') { return $(item) }
});


// Bind to scroll
$(window).on('scroll', function () {

   
    // Get container scroll position
    var fromTop = $(this).scrollTop() + topMenuHeight;

    // Get id of current scroll item
    var cur = $(scrollItems).map(function () {
        if ($(this).offset().top < fromTop)
            return this;
    });


    // Get the id of the current element
    cur = cur[cur.length - 1];
    var id = cur && cur.length ? cur[0].id : "";

    lastId = lastId ? lastId : "";

    for (var i = 0; i < menuItems.length; i++) {
        $(menuItems[i]).removeClass("active");

        if (id !== "") {
            if ($(menuItems[i]).attr("href") === "#" + id) {
 
                $(menuItems[i]).addClass("active");
            }
        }


    }
});

// seleziona tutti i link con la classe "close-navbar"
const closeNavbarLinks = document.querySelectorAll('.close-navbar');

// aggiungi un gestore di eventi di click a ciascun link
closeNavbarLinks.forEach(link => {
    link.addEventListener('click', () => {
        // chiudi la navbar se è aperta
        const navbarCollapse = document.getElementById('navbarCollapse');
        const menuIcon = document.querySelector('.menu-icon');
        if (navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show');
            menuIcon.classList.remove('open');
        }
    });
});


