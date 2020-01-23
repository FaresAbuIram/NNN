import { Mvc } from './js/jsMvc.min.js';

let mvc = new Mvc();

let routeList = [{
        url: "/home",
        template: "pages/homepage/home.html",
        title: "شبكة الوحدة الإخبارية",
        controller: "/adminpanel/pages/homepage/js/home.js"
    },
    {
        url: "/addnews",
        template: "pages/addnewspage/addnewpage.html",
        title: "شبكة الوحدة الإخبارية",
        controller: "/adminpanel/pages/addnewspage/js/addnews.js"


    },
    {
        url: "/allnews",
        template: "pages/allnews/allnews.html",
        title: "شبكة الوحدة الإخبارية",
        controller: "/adminpanel/pages/allnews/js/allnews.js"


    },
    {
        url: "/mynews",
        template: "pages/mynews/mynews.html",
        title: "شبكة الوحدة الإخبارية",
        controller: "/adminpanel/pages/mynews/js/mynews.js"


    }
];

mvc.addRouteList(routeList);
mvc.init();