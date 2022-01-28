// event.js

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.greeting=='url') {
        let queryinfo = {'active': true, 'currentWindow': true};
        chrome.tabs.query(queryinfo, function(tabs) {
            sendResponse({farewell: tabs[0].url,title:tabs[0].title});
        });
        return true;
    }

});

chrome.runtime.onInstalled.addListener(() => {

    const parent = chrome.contextMenus.create({
        id: 'parent',
        title: '今日',
        contexts:["all"]
      }); 
       const parent2 = chrome.contextMenus.create({
        id: 'parent2',
        title: '全て',
        contexts:["all"]
      });

      chrome.contextMenus.create({
        id: 'clip-today',
        parentId: 'parent',
        title: 'クリップボードにコピー(https時のみ使用可)',
        contexts:["all"]

      });
      chrome.contextMenus.create({
        id: 'tweet-today',
        parentId: 'parent',
        title: 'ツイッターでつぶやく',
        contexts:["all"]

      });  chrome.contextMenus.create({
        id: 'clip-all',
        parentId: 'parent2',
        title: 'クリップボードにコピー(https時のみ使用可)',
        contexts:["all"]

      });
      chrome.contextMenus.create({
        id: 'tweet-all',
        parentId: 'parent2',
        title: 'ツイッターでつぶやく',
        contexts:["all"]

      });
});
  // メニューをクリック時に実行
  chrome.contextMenus.onClicked.addListener(item => {
    //   let item=item;

    let _date;
    let _url;
    let uuu;
    let _select;
    let _title;
    let r_length;
    chrome.storage.sync.get(['date'], function (value) {
        value=value.date||[];
        console.log(value);
        _date=value;
      });    
      chrome.storage.sync.get(['title'], function (value) {
        value=value.title||[];
        console.log(value);
        _title=value;
      });
      chrome.storage.sync.get(['select'], function (value) {
        value=value.select||[];
        console.log(value);
        _select=value;
    
       });
           chrome.storage.sync.get(['url'], function (value) {
        value=value.url||[];
        console.log(value);
        _url=value;
        r_length=_url.length;
       });
       let set_interval_id2 = setInterval(findTargetElement2, 300);
       function findTargetElement2(){
             
            if(r_length!=='undefined'){
                clearInterval(set_interval_id2);
                let x=0;
                let copy="";
                let head="";
                _url.forEach(element => {
                    //日付オブジェクトを作成する
                    let dd = new Date();
                    //「年」を取得する
                    let YYYY = dd.getFullYear();
                    //「月」を取得する
                    let MM = dd.getMonth()+1;
                    //「日」を取得する
                    let DD = dd.getDate();

                    let vx="";
                    switch(_select[x]){
                        case '0':vx="とてもいい";break;
                        case '1':vx="いい";break;
                        case '2':vx="わっるい";break;
                        case '3':vx="とてもわっるい";break;
                    }
                    let str=_date[x].replace(/\r/,"");
                    str=new Date(str);
                    let hikaku=new Date(YYYY + "/" + MM + "/" + DD);
                    let co=((str.getTime()==hikaku.getTime())==true);

                    if((item.menuItemId=="tweet-today"||item.menuItemId=="clip-today")&&(co==true)){

                        head="今日のサイト評価\n";
                    copy +=`【${vx}】-${_title[x]}-${element}\n`;
                    console.log(copy);

                    }
                    else if((item.menuItemId=="tweet-all"||item.menuItemId=="clip-all")){
                        head="過去全てのサイト評価\n";

                    copy +=`【${vx}】-${_title[x]}-${element}\n`;
                    }
                    x++;
                });

                if(copy){

                    copy=head+copy;
                    // alert(item.menuItemId);
                    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                        chrome.tabs.sendMessage(tabs[0].id, {
                            val:"copy",copy:copy,item:item.menuItemId
                        },
                        function(msg) {
                    //              console.log("result message:", msg);
                }); });
                                                                }            }
            else{
        
        
                
        
            }
        } 
    
    }); 
