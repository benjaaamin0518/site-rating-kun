let _date;
let _url;
let uuu;
let _select;
let r_length;
let title;
let kai=0;


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
                resolve([response.farewell,response.title]);
            });
        });
    };
    let url = await sendMsgFunc();
    uuu=url[0];
    title=url[1]

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
kai=0;
// alert(`updated:`);


// content_script.js
async function useURLFunc() {
    let sendMsgFunc = () => {
        return new Promise(resolve => {
            chrome.runtime.sendMessage({ greeting: 'url' }, response => {
                resolve([response.farewell,response.title]);
            });
        });
    };
    let url = await sendMsgFunc();
    uuu=url[0];
    title=url[1]


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

      const bodyHeight = document.body.clientHeight // bodyの高さを取得
    const windowHeight = window.innerHeight // windowの高さを取得
    const bottomPoint = bodyHeight - windowHeight // ページ最下部までスクロールしたかを判定するための位置を計算
    
    window.addEventListener('scroll', () => {
      const currentPos = window.pageYOffset // スクロール量を取得
      let ui="";
      if (bottomPoint <= currentPos&&kai==0) { // スクロール量が最下部の位置を過ぎたかどうか
        kai=1;
           let str =title;
   let  r=/[一-龠]+|[ぁ-ん]+|[ァ-ヴー]+|[a-zA-Z]+|[0-9]+|[ａ-ｚＡ-Ｚ]+|[０-９]+/g;
 str=str.replace(" - Qiita","");

   r=str.match(r);
     let dd="";
     let i=0;
  r.forEach(e=>{
    i++;
      let ab=/[一-龠]+/g;
      let ba=ab.test(e);
      if(r.length==i&&(e.length>1||ba)){
        dd+=` tag:${e}`;

    }
    else if(e==""){

    }
    else if(e.length>1||ba){
        dd+=` tag:${e} OR`;

    }
  });
getqiita(dd);
}
       else {
      }
    });
    function getqiita(r){
  let token='12a6da09778515b1b76182f9490e8a3b58897afa';

 
  // Qiita API による自身の投稿を取得

  $.ajax({
    type: "GET",
    url: 'https://qiita.com/api/v2/items?page=1&per_page=11&query=stocks:>100'+r,
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token,
    },
    dataType: "json",
    async: false,        // 同期通信
    success: function(data){
        console.log(r);
        console.log('https://qiita.com/api/v2/items?page=1&per_page=11&query=stocks%3A%3E100'+r);
      stocks = data;
      console.log(data);
      let dd2="関連記事(Qiita上にある記事より抜粋)<br><br>";
      let i=0;
      stocks.forEach(e=>{
          let tt=title.replace(" - Qiita","");

         if(e.title==tt||i>9){
            console.log(e.title);
          }
          else{
            i++;
    
          dd2+=`<p style="margin-bottom:5px;"><b>${i}.${e.title}</b>(<a href="${e.url}" target="_blank" style="font-size:12px;">${e.url}</a>)</p><hr style="border-width: 0; /* 平面の線に指定 */
          height: 2px; 
          margin-bottom:5px;
          background:linear-gradient(to left,#5bb7ae 70%, #5bb7ae 30%);
          background: -webkit-linear-gradient(to left,#5bb7ae 70%, #5bb7ae 30%);">`;
          }
      })
      $('body').append(
       `
       <center><div class="box22" style="width:75%">${dd2}</center></div>`
                        );     },
    error: function(XMLHttpRequest, textStatus, errorThrown){
    //   alert('Error3 : ' + errorThrown);
    $('body').append(
        `
        <center><div class="box22" style="width:75%">関連記事が取得できませんでした</center></div>`
                         );  
    }
  });




    }
