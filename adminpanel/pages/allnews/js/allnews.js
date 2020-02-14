
export class myNewsControler {
    constructor() {

        this.dp = null;
        this.allNewsPage = [];
        this.categories = [];
        this.activeId = -1;
        this.loading = true;
        dynamicImport("./../../adminpanel/js/database.js").then(db => {
            this.db = db;
            this.db.confirm();

            this.getAllCat().then(cats => {
                this.categories = this.cleanData(cats);

                this.getAllNews().then(news => {
                    this.allNewsPage = this.cleanData(news);
                    this.loading = false;
                    mvc.apply();
                    this.init();
                });

            });

        });
    }

    redirect(id) {
        window.location.href = "#/addnews/" + id;
        document.location.reload(true);
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
        createToast("جاري حذف", '', "info", "");
        const news = this.allNewsPage[this.activeId];
        const id = this.activeId;
        this.activeId = -1;
        this.db.dbDelete('/news', news._id, news._rev).then((req) => {
            if (req.ok)
                this.allNewsPage.splice(id, 1);
            mvc.apply();
            this.init();
            createToast("نجحت العملية", 'تم حذف الخبر', "success", "check");

        });
        this.hide('delete');
    }

    /* -----------------------------------------------------------------------------------------------------------------------------------------------------*/
    //read news functions 
    getAllNews() {
        return new Promise((resolve, reject) => {
            this.db.dbGet("/news/_design/views/_view/allnews", true, "").then(news => {

                resolve(news);
            })
        });
    }
    cleanData(data) {
        let rows = [];
        for (let i = 0; i < data.length; i++) {
            rows.push(data[i].value);
        }
        return rows;
    }

    getAllCat() {
        return new Promise((resolve, reject) => {
            this.db.dbGet("/categories/_design/allcategories/_view/allcategories", true, "").then(cats => {

                resolve(cats);
            })
        });
    }
    updateStatus(field, id, showToast = true) {
        if (showToast)
            createToast("جاري التعديل", '', "info", "");
        let news = null;
        if (field == 'isActive') {
            news = this.allNewsPage[id];
            news[field] = +!news[field];
        }
        else {
            news = this.allNewsPage.find(field => field._id == id);
        }
        console.log(news);

        this.db.dbGet('/news/_design/views/_view/attachcontent', true, news._id).then(data => {
            news.attachment = data.rows[0].value.attachment;
            news.content = data.rows[0].value.content;
            setTimeout(() => {
                this.db.dbCreateOrUpdate('/news', news, news._id).then(resp => {
                    if (resp.ok) {
                        news._rev = resp.rev;
                        createToast("نجحت العملية", 'تم تحديث الحالة', "success", "check");
                    }
                }, () => {
                    this.updateStatus(field, id, false);
                });
            }, 250);
        });

    }

    init() {

        const selections = Array.from(document.getElementsByClassName('selection'));
        let i = 0;
        selections.forEach(el => {
            el.value = this.allNewsPage[i].isActive;
            i++;
        })

        const urgentNews = Array.from(document.getElementsByClassName('urgentNews'));
        const mainNews = Array.from(document.getElementsByClassName('mainNews'));

        for (let i = 0; i < mainNews.length; i++) {
            mainNews[i].checked = this.allNewsPage[i].isMainNews;
            urgentNews[i].checked = this.allNewsPage[i].isUrgentNews;
            mainNews[i].addEventListener("change", (e) => {
                e.preventDefault();
                this.allNewsPage[i].isMainNews = +mainNews[i].checked;
                console.log(this.allNewsPage[i].isMainNews);
                this.updateStatus("isMainNews", this.allNewsPage[i]._id);
            });

            urgentNews[i].addEventListener("change", (e) => {
                this.allNewsPage[i].isUrgentNews = +urgentNews[i].checked;

                this.updateStatus("isMainNews", this.allNewsPage[i]._id);
            })
        }
    }
}