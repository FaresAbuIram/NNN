
let mvc = new Mvc();

let routeList = [{

    url: "/home",
    template: "pages/homepage/home.html",
    title: "شبكة الوحدة الإخبارية",
    controller: "/adminpanel/pages/homepage/js/home.js"
},
{
    url: "/addnews/:id",
    template: "pages/addnewspage/addnewpage.html",
    title: "شبكة الوحدة الإخبارية",
    controller: "/adminpanel/pages/addnewspage/js/addnews.js"


},
{
    url: "/mynews",
    template: "pages/mynews/mynews.html",
    title: "شبكة الوحدة الإخبارية",
    controller: "/adminpanel/pages/mynews/js/mynews.js"


},

{
    url: "/newsapprove",
    template: "pages/newsapprove/newsapprove.html",
    title: "شبكة الوحدة الإخبارية",
    controller: "/adminpanel/pages/newsapprove/js/approvenews.js"

},
{
    url: "/allnews",
    template: "pages/allnews/allnews.html",
    title: "شبكة الوحدة الإخبارية",
    controller: "/adminpanel/pages/allnews/js/allnews.js"

},
{
    url: "/adduser/:id",
    template: "pages/newuser/newuser.html",
    title: "شبكة الوحدة الإخبارية",
    controller: "/adminpanel/pages/newuser/js/createuser.js"

},
{
    url: "/categories",
    template: "pages/categories/categories.html",
    title: "شبكة الوحدة الإخبارية",
    controller: "/adminpanel/pages/categories/js/categoriescontroller.js"
},
{
    url :"/allusers",
    template: "pages/allusers/allusers.html",
    title: "شبكة الوحدة الإخبارية",
    controller : "/adminpanel/pages/allusers/js/users.js"
},
];

mvc.addRouteList(routeList);
mvc.init();
// export {mvc};