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
                `<center><div class="box23">
                <p>このサイトはまだ評価がありません</p>
                </div>
              <blockquote class="twitter-tweet">

<a href="https://twitter.com/user/status/(tweetid)"></a>

</blockquote>
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
            `<center><div class="box22">
            <p>このサイトの評価は<b>${vx}</b>です${year}</p>
            
            </div>
            <blockquote class="twitter-tweet">
<a href="https://twitter.com/user/status/(tweetid)"></a>
</blockquote>
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
`<center><div class="box23">
<p>このサイトはまだ評価がありません</p>
</div>
<blockquote class="twitter-tweet">

<a href="https://twitter.com/user/status/(tweetid)"></a>

</blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8">
</script>
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
                    `<center><div class="box22">
                    <p>このサイトの評価は<b>${vx}</b>です${_year}</p>
                    
                    </div>
                    <blockquote class="twitter-tweet">
<a href="https://twitter.com/user/status/(tweetid)"></a>
</blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8">

</script>
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
let uuu;
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
`<center><div class="box23">
<p>このサイトはまだ評価がありません</p>
</div>
         <blockquote class="twitter-tweet">

<a href="https://twitter.com/user/status/(tweetid)"></a>

</blockquote>
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
                    `<center><div class="box22">
                    <p>このサイトの評価は<b>${vx}</b>です${_year}</p>
                    
                    </div>
                    
           <blockquote class="twitter-tweet">
<a href="https://twitter.com/user/status/(tweetid)"></a>
</blockquote>
  
  

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
