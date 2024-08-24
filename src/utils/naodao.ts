class Naodao {
    __preUrl = 'https://www.naodao.com/api';
    __token = '';
    __id = '';
    __location = '';
    __itemId = '';
    __beginDate = '';
    getData = () => { return ""; };

    static getQueryString(params: string) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == params) {
                return pair[1];
            }
        }
        return '';
    }
    constructor() {
        this.init();
    }

    init() {
        var __localStorage = window.localStorage.getItem('__insula_l__');
        var __data = __localStorage ? JSON.parse(__localStorage) : {};
        this.__beginDate = __data.user && __data.user.beginDate;
        this.__token = Naodao.getQueryString('__token');
        this.__id = Naodao.getQueryString('__id');
        this.__itemId = Naodao.getQueryString('__itemId');
        this.__location = window.location.href;
        fetch(this.__preUrl + '/user/canvasNode/insertRecord', {
            method: "POST",
            headers: {
                "accept": "application/json, text/plain, */*",
                "content-type": "application/json",
            },
            body: JSON.stringify({
                nodeId: this.__id,
                recordId: this.__token,
                itemId: this.__itemId,
                beginDate: this.__beginDate ? this.__beginDate : ''
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.code === 200) {
                console.log(data);
            }
        });
    }

    save() {
        if (this.__token === 'preview' || this.__location.includes('file://')) {
            this.offlineSave(this.getData());
        } else {
            this.onlineSave(this.getData());
        }
    }

    offlineSave(str: string) {
        try {
            const blobToSave = new Blob([str], {
                type: "text/plain",
            });
            let blobURL = "";
            if (typeof window.webkitURL !== "undefined") {
                blobURL = window.webkitURL.createObjectURL(blobToSave);
            }
            else {
                blobURL = window.URL.createObjectURL(blobToSave);
            }
            const link = document.createElement("a");
            link.id = "jspsych-download-as-text-link";
            link.style.display = "none";
            link.download = `${this.__id}.csv`;
            link.href = blobURL;
            link.click();
            return true;
        } catch {
            return false;
        }
    }

    onlineSave(str: string) {
        const _this = this;
        fetch(this.__preUrl + '/user/jsPsych/results', {
            method: "POST",
            headers: {
                "accept": "application/json, text/plain, */*",
                "content-type": "application/json",
            },
            body: JSON.stringify({
                experimentId: this.__id,
                token: this.__token,
                key: this.__id,
                value: str,
                state: 1
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.code === 200) {
                _this.parent_post_message(_this.__token, _this.__id, !0, 200, "实验作答完成，感谢你的耐心等待，继续下一步？");
            }
        });
    }

    parent_post_message(recordId: string, nodeId: string, isCompleted: boolean, code: number, message: string) {
        window.parent.postMessage({ recordId, nodeId, isCompleted, code, message });
    }

    beforeunload(event: Event) {
        event.preventDefault();
        event.returnValue = false;
    }
    unload() {
        const getData = this.getData;
        localStorage.setItem("tmpD" + new Date().getTime().toString(), JSON.stringify(
            Object.assign({}, {
                __beginDate: this.__beginDate,
                __token: this.__token,
                __id: this.__id,
                __itemId: this.__itemId,
                __location: this.__location,
                state: 0
            }, {
                data: getData()
            })
        ));
    }
}

export default Naodao;