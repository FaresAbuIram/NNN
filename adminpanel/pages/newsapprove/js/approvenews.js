export class approveNewsControler {

    constructor() {

        this.notAppNewsPage = [];
        this.categories = [];
        this.dp = null;
        this.loading = true;
        this.submit = false;
        dynamicImport("./../../adminpanel/js/database.js").then(db => {
            this.db = db;
            this.db.confirm();

            this.getAllCat().then(cats => {
                this.categories = this.db.cleanDataForControllers(cats);
                this.getAllNotAppNews().then(news => {
                    this.notAppNewsPage = this.db.cleanDataForControllers(news);
                    this.loading = false;
                    mvc.apply();
                });
            });

        });
    }

    redirect(id) {
        window.location.href = "#/addnews/" + id;
        document.location.reload(true);
    }

    approvenews() {
        if(this.submit)
            return ;
            this.submit = true;

        let userdata = JSON.parse(sessionStorage.getItem("userData"));
        if (userdata != null) {
            myNewsPage[userdata.ind] = userdata;
            sessionStorage.removeItem("userData");
        }
    }
    appproveNews() {
        let news;
        let data;
        let j = 0;
        createToast("جاري تأكيد الأخبار المختارة", '', "info", "");
        let approved = [];
        for (let i = 0; i < this.notAppNewsPage.length; i++) {
            let checkbox = document.getElementById(this.notAppNewsPage[i]._id);
            if (checkbox.checked) {
                approved.push(i);
                j++;
            }
        }
        for (let i = 0; i < j; i++) {

            news = this.notAppNewsPage[approved[i]];
            //console.log(news)
            data = {
                "title": news.title,
                "content": news.content,
                "categoryId": news.categoryId,
                "seoTitle": news.seoTitle,
                "seoTags": news.seoTags,
                "seoDescription": news.seoDescription,
                "isActive": news.isActive,
                "isMainNews": news.isMainNews,
                "isUrgentNews": news.isUrgentNews,
                "createDate": news.createDate,
                "writerId": news.writerId,
                "attachment": news.attachment,
                "_rev": news._rev,
                "writerId": news.writerId,
                "isApproved": 1
            }
            //console.log(news)
            let x = this.updateNew(data, news._id + '');
            if (i == j - 1) {
                x.then(finished => {
                    createToast("نجحت العملية", 'تم تأكيد الأخبار', "success", "check");
                    setTimeout(() => {
                        this.submit = false;
                        window.location.reload();
                    }, 1500);
                })
            }
        }
    }
    updateNew(data, newsId) {
        return new Promise((resolve, reject) => {
            this.db.dbCreateOrUpdate("/news", data, newsId).then(response => {
                resolve(response);
                mvc.apply();
                console.log("Updated");
                //document.location.reload(true);
            });
        })
    }

    show(modelId, id) {
        let element = document.getElementById(modelId);
        element.style.display = 'flex';
        element.className += " modal-active";
        this.activeId = id;
    }
    hide(modelId) {
        let element = document.getElementById(modelId);
        element.style.display = 'none';

    }

    deleteNews() {
        if (this.activeId == -1)
            return;
        const news = this.notAppNewsPage[this.activeId];
        const id = this.activeId;
        this.activeId = -1;
        this.db.dbDelete('/news', news._id, news._rev).then((req) => {
            if (req.ok)
                this.notAppNewsPage.splice(id, 1);
            mvc.apply();
        });
        this.hide('delete');

    }
    getAllNotAppNews() {
        return new Promise((resolve, reject) => {
            this.db.dbGet("/news/_design/views/_view/notapproved", true, "").then(news => {

                resolve(news);
            })
        });
    }
    getAllCat() {
        return new Promise((resolve, reject) => {
            this.db.dbGet("/categories/_design/allcategories/_view/allcategories", true, "").then(cats => {

                resolve(cats);
            })
        });
    }

}