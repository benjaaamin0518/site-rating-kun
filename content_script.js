let _date;
let _url;
let uuu;
let _select;
let r_length;



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

</div></center>

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
                $('body').prepend(
                    `<center><div class="box22">
                    <p>このサイトの評価は<b>${vx}</b>です</p>
                    
                    </div></center>
                    
                    `
                                    ); 
            }
    
        }
        else{
    
    
            
    
        }
    } 
 
