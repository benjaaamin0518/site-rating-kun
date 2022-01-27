let _date;
let _url;
let uuu;
let _select;
let r_length;


chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if(msg.val=="copy"){ 
        if(msg.item=="clip-today"||msg.item=="clip-all"){
        navigator.clipboard.writeText(msg.copy).then(
            ()=>alert("クリップボードにコピーしました"), // 成功
            ()=>alert("クリップボードにコピーできませんでした") // 失敗
        
        );
        }
        else if(msg.item=="tweet-today"||msg.item=="tweet-all"){      
              var left = Math.round(window.screen.width / 2 - 275);
        var top = (window.screen.height > 420) ? Math.round(window.screen.height / 2 - 210) : 0;
        window.open(
            "https://twitter.com/intent/tweet?text=" + encodeURIComponent(msg.copy),
            null,
            "scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=550,height=420,left=" + left + ",top=" + top);
        }
        }
      else if(msg.code){
          alert();
      }
    else if (msg.val) {

        let vx="";
        switch(msg.val){
            case '0':vx="とてもいい";break;
            case '1':vx="いい";break;
            case '2':vx="わっるい";break;
            case '3':vx="とてもわっるい";break;
            case 4:vx=4;break;
        }
       
        if(vx==4){
            if(document.getElementsByClassName('box23')){
                $('.box23').remove();
            }                if(document.getElementsByClassName('box22')){
                $('.box22').remove();
            }
    
            $('body').prepend(
                `
                <center><div class="box23">
                <p>このサイトはまだ評価がありません
                <a href="https://twitter.com/search?q=url:${uuu}&src=typed_query&f=top" target="_blank"  class="text-decoration-none" id="tw_ter">
                URLを検索
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-twitter" viewBox="0 0 16 16">
                <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"></path>
                </svg>
                </a>
                </p>
                </div>
            
                </center>
                `
                                ); 
        }
        else{

        let year="";
        if(msg.date>0){
            year="<br><u>このサイトは評価をつけてから3年以上経過しており情報が古い可能性があります。</u>"
        }
        if(document.getElementsByClassName('box23')){
            $('.box23').remove();
        }                if(document.getElementsByClassName('box22')){
            $('.box22').remove();
        }

        $('body').prepend(
            `
            
            <center><div class="box22">
            <p>このサイトの評価は<b>${vx}</b>です${year}
            <a href="https://twitter.com/search?q=url:${uuu}&src=typed_query&f=top" target="_blank"  class="text-decoration-none" id="tw_ter">
            URLを検索
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-twitter" viewBox="0 0 16 16">
            <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"></path>
            </svg>
            </a>
            </p>
            
            </div>
          
            </center>
            
            `
                            ); 
        
    
        }                    
    } else {
        sendResponse('Color message is none.');
    }
});
// content_script.js
async function useURLFunc() {
    let sendMsgFunc = () => {
        return new Promise(resolve => {
            chrome.runtime.sendMessage({ greeting: 'url' }, response => {
                resolve(response.farewell);
            });
        });
    };
    let url = await sendMsgFunc();
    uuu=url;

}

(async () => {
    await useURLFunc();
})();

chrome.storage.sync.get(['date'], function (value) {
    value=value.date||[];
    console.log(value);
    _date=value;
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
            bool=_url.indexOf(uuu);
            if(bool==-1){
                $('body').prepend(
`
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
<center><div class="box23">
<p>このサイトはまだ評価がありません
<a href="https://twitter.com/search?q=url:${uuu}&src=typed_query&f=top" target="_blank"  class="text-decoration-none" id="tw_ter">
URLを検索
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-twitter" viewBox="0 0 16 16">
<path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"></path>
</svg>
</a>
</p>
</div>

</center>
`
                );
            }
            else{
                let vx="";
                switch(_select[bool]){
                    case '0':vx="とてもいい";break;
                    case '1':vx="いい";break;
                    case '2':vx="わっるい";break;
                    case '3':vx="とてもわっるい";break;
                }
                //日付オブジェクトを作成する
                let dd = new Date();
                //「年」を取得する
                let YYYY = dd.getFullYear();
                //「月」を取得する
                let MM = dd.getMonth()+1;
                let DD = dd.getDate();
                let year=YYYY-3;
                let limit=new Date( year+ "/" + MM + "/" + DD);
                let date;
                date=new Date(_date[bool]);
                let date_flg=0;
                if(limit.getTime()>=date.getTime()){
                date_flg=1;
                }
                let _year="";
                if(date_flg>0){
                    _year="<br><u>このサイトは評価をつけてから3年以上経過しており情報が古い可能性があります。</u>"
                }
                // if(new Date("2021-1-25").getTime()>=limit.getTime()){
                    // alert("3出来てる?");
                // }
        
                $('body').prepend(
                    `
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
                    <center><div class="box22">
                    <p>このサイトの評価は<b>${vx}</b>です${_year}
                    <a href="https://twitter.com/search?q=url:${uuu}&src=typed_query&f=top" target="_blank"  class="text-decoration-none" id="tw_ter">
                    URLを検索
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-twitter" viewBox="0 0 16 16">
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"></path>
                    </svg>
                    </a>
                    </p>
                    
                    </div>

                    </center>
                    
                    `
                                    ); 
            }
    
        }
        else{
    
    
            
    
        }
    } 

    var href = location.href;
    var observer = new MutationObserver(function(mutations) {
      if(href !== location.href) {
        let _date;
let _url;
let _select;
let r_length;

// alert(`updated:`);


// content_script.js
async function useURLFunc() {
    let sendMsgFunc = () => {
        return new Promise(resolve => {
            chrome.runtime.sendMessage({ greeting: 'url' }, response => {
                resolve(response.farewell);
            });
        });
    };
    let url = await sendMsgFunc();
    uuu=url;

}

(async () => {
    await useURLFunc();
})();

chrome.storage.sync.get(['date'], function (value) {
    value=value.date||[];
    console.log(value);
    _date=value;
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
            bool=_url.indexOf(uuu);
            if(bool==-1){
                if(document.getElementsByClassName('box23')){
                    $('.box23').remove();
                }                if(document.getElementsByClassName('box22')){
                    $('.box22').remove();
                }
                $('body').prepend(
`
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
<center><div class="box23">
<p>このサイトはまだ評価がありません
<a href="https://twitter.com/search?q=url:${uuu}&src=typed_query&f=top" target="_blank"  class="text-decoration-none" id="tw_ter">
URLを検索
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-twitter" viewBox="0 0 16 16">
<path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"></path>
</svg>
</a>
</p>
</div>
   
</center>
`
                );
            }
            else{
                let vx="";
                switch(_select[bool]){
                    case '0':vx="とてもいい";break;
                    case '1':vx="いい";break;
                    case '2':vx="わっるい";break;
                    case '3':vx="とてもわっるい";break;
                }
                    //日付オブジェクトを作成する
                    let dd = new Date();
                    //「年」を取得する
                    let YYYY = dd.getFullYear();
                    //「月」を取得する
                    let MM = dd.getMonth()+1;
                    let DD = dd.getDate();
                    let year=YYYY-3;
                    let limit=new Date( year+ "/" + MM + "/" + DD);
                    let date;
                    date=new Date(_date[bool]);
                    let date_flg=0;
                    if(limit.getTime()>=date.getTime()){
                    date_flg=1;
                    }
                    let _year="";
                    if(date_flg>0){
                        _year="<br><u>このサイトは評価をつけてから3年以上経過しており情報が古い可能性があります。</u>"
                    }
                if(document.getElementsByClassName('box23')){
                    $('.box23').remove();
                }                if(document.getElementsByClassName('box22')){
                    $('.box22').remove();
                }
                $('body').prepend(
                    `
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
                    <center><div class="box22">
                    <p>このサイトの評価は<b>${vx}</b>です${_year}
                    <a href="https://twitter.com/search?q=url:${uuu}&src=typed_query&f=top" target="_blank"  class="text-decoration-none" id="tw_ter">
                    URLを検索
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-twitter" viewBox="0 0 16 16">
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"></path>
                    </svg>
                    </a>
                    </p>
                    
                    </div>
                    

  

                    </center>
                    
                    `
                                    ); 
            }
    
        }
        else{
    
    
            
    
        }
    } 
    href=location.href;
           }
    });
    
    observer.observe(document, { childList: true, subtree: true });
