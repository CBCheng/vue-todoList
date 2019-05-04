var app = new Vue({
    el: '#app',
    data: {
        list:[
            {
                id:'1',
                title: '寫一系列JS文章',
                finished: false,
                itemAni: 'normal'
            },{
                id:'2',
                title: '寫一個訂票系統',
                finished: false,
                itemAni: 'normal'
            }
        ],
        newItem: '',
        type: 'all',
        catchItem: {}, //設置一個新元素
        catchTitle: ''
    },
    methods: {
        addItem: function(){
            var value = this.newItem.trim();
            var timestemp = Math.floor(Date.now());
            if(!value){
                return;
            }
            this.list.push({
                id: timestemp,
                title: value,
                finished: false,
                itemAni: 'addItemAni'
            });
            this.newItem = '';
        },
        editItem: function(item){
            this.catchItem = item;
            this.catchTitle = item.title;
        },
        cancelEdit: function(){
            this.catchItem = {};
            this.catchTitle = '';
        },
        sureEdit: function(item){
            item.title = this.catchTitle;
            this.catchTitle = '';
            this.catchItem = {};
        },
        removeItem: function(whichItem){
            var self = this;
            // self.list.forEach(function(item){
            //   item.itemAni = 'normal';  
            // });
            //點擊刪除後傳出元件，但fn傳入元件時取另一個名子，不然的話會重複item.id === item.id
            //或者是原始list迴圈跑出的個別資料換名稱

            // 第一種
            // var newIndex = '';
            // this.list.forEach(function(item,key){
            //   if (whichItem.id === item.id){ //傳入元件的id與原始list迴圈逐一比對
            //     newIndex = key;
            //   }
            // });
            // this.list.splice(newIndex, 1);

            // 第二種
            var newIndex = self.list.findIndex(function(item, key){
                return whichItem.id === item.id;
            });
            whichItem.itemAni = "outItemAni";
            var timeOut = setTimeout(() => {
                self.list.splice(newIndex, 1);
            }, 500)
            // self.list.splice(newIndex, 1);
            },
        removeAllItems: function(){
            var self = this;
            self.list.forEach(function(item){
                item.itemAni = 'outItemAni';
            });
            var timeOut = setTimeout(() => {
                self.list = [];
            }, 500)
        }
    },
    computed: {
        filteredList: function(){
            if(this.type == 'all'){
                var newItems = [];
                this.list.forEach(function(item){
                var timeOut = setTimeout(() => {
                    item.itemAni = 'normal';
                }, 1100)
                newItems.push(item);
                });
                return newItems;
            }else if(this.type == 'onGoing'){
                var newItems = [];
                this.list.forEach(function(item){
                if(!item.finished){
                    var timeOut = setTimeout(() => {
                    item.itemAni = 'normal';
                    }, 1100)
                    newItems.push(item);
                }
                });
                return newItems;
            }else if(this.type == 'finished'){
                var newItems = [];
                // this.list.itemAni = 'normal';
                this.list.forEach(function(item){
                if(item.finished){
                    item.itemAni = 'normal';
                    newItems.push(item);
                }
                });
                return newItems;
            }
        },
        unFinishItem: function(){
            var newItems = [];
            this.list.forEach(function(item){
                if(!item.finished){
                    newItems.push(item);
                }
            });
            return newItems.length;
        }
    }
});