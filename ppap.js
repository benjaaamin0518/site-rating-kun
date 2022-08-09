/**
 *   役割:Browser_Action(拡張機能のポップアップ表示がなされた画面に対する処理を行う)
 * 　機能:・クリップボードにコピーする内容を整形する(content_scriptのruntimeメッセージに送信する)
 *      　・ツイートする内容を整形する(content_scriptのruntimeメッセージに送信する)
 *      　・ChromeAPIのstorageを使って値を配列で取得している。(値を配列でstorageに入れたりもしている)
 *    　  ・上記の配列の値を用いてエレメントを生成している。
 *    　  ・エレメントを検索かけれるようにしている
 *    　  ・Saveボタンを押すと配列を作成し、StorageAPI似て更新を書ける
 *    　  ・配列を用いてCSVを作成し指定するディレクトリに保存させる
 *    　  ・指定したCSVより配列を作成しStorageAPIにてChromeに格納する。
 *  作成者:benjaaamin0518
 * 
 */

$(function () {
  let _date;
  let _url;
  let n = 0;
  let _url2;
  let bool
  let r_length;
  let uuu;
  let title;
  let _title;
  let in_select = [];
  let in_title = [];
  let in_url = [];
  let in_date = [];
  let flg = 0;
  //日付オブジェクトを作成する
  let dd = new Date();
  //「年」を取得する
  let YYYY = dd.getFullYear();
  //「月」を取得する
  let MM = dd.getMonth() + 1;
  //「日」を取得する
  let _select;
  alert
  async function evo() {
    chrome.storage.local.get(['date'], function (value) {
      value = value.date || [];
      console.log(value);
      _date = value;
    });
    chrome.storage.local.get(['select'], function (value) {
      value = value.select || [];
      console.log(value);
      _select = value;
    });
    chrome.storage.local.get(['url'], function (value) {
      value = value.url || [];
      console.log(value);
      _url = value;
      r_length = _url.length;
    });
    chrome.storage.local.get(['title'], function (value) {
      value = value.title || [];
      console.log(value);
      _title = value;
    });
    ele = document.getElementById("holi");
    while (ele.firstChild) {
      ele.removeChild(ele.firstChild);
    }
    async function useURLFunc() {
      let sendMsgFunc = () => {
        return new Promise(resolve => {
          chrome.runtime.sendMessage({
            greeting: 'url'
          }, response => {
            resolve([response.farewell, response.title]);
          });
        });
      };
      let url = await sendMsgFunc();
      uuu = url[0];
      title = url[1];
    }
    await useURLFunc();
    const url = uuu;
    bool = _url.indexOf(url);
    //  alert(uuu);
    _url2 = url;
    let DD = dd.getDate();
    if (bool == -1) {
      if (url == "chrome://extensions/") {
        $('#holi').append(` <br>
  <div id="click-this0" data-url="${url}" >
  <a class="ui label" style="width:96vw;  overflow-wrap:break-word;"><i class="info circle icon"></i> new &nbsp;&nbsp;&nbsp;&nbsp; <div class="ui purple  horizontal label">${YYYY + "/" + MM + "/" + DD}</div>
  ${title}
    </a></div>`);
      } else {
        $('#holi').append(` <br>
          <div id="click-this0" data-url="${url}" >
          <a class="ui label" style="width:96vw;  overflow-wrap:break-word;"><i class="info circle icon"></i> new &nbsp;&nbsp;&nbsp;&nbsp; <div class="ui red horizontal label">${YYYY + "/" + MM + "/" + DD}</div>
          ${title}
            </a></div>`);
      }
    } else {
      flg = 1;
      let date = _date[bool];
      if (url == "chrome://extensions/") {
        let vx = "";
        switch (_select[bool]) {
          case '0':
            vx = "とてもいい";
            break;
          case '1':
            vx = "いい";
            break;
          case '2':
            vx = "わっるい";
            break;
          case '3':
            vx = "とてもわっるい";
            break;
        }
        $('#holi').append(`<br>
          <div id="click-this0" data-url="${url}">
          <a class="ui label" style="width:96vw;  overflow-wrap:break-word;"><i class="info circle icon"></i> ${vx} &nbsp;&nbsp;&nbsp;&nbsp; <div class="ui purple  horizontal label">${date}</div>
          ${_title[bool]}
            </a></div>`);
        $(`input[value="${_select[bool]}"]`).prop('checked', true);
      } else {
        let vx = "";
        switch (_select[bool]) {
          case '0':
            vx = "とてもいい";
            break;
          case '1':
            vx = "いい";
            break;
          case '2':
            vx = "わっるい";
            break;
          case '3':
            vx = "とてもわっるい";
            break;
        }
        $('#holi').append(`<br>
          <div id="click-this0" data-url="${url}" >
          <a class="ui label" style="width:96vw;  overflow-wrap:break-word;"><i class="info circle icon"></i> ${vx} &nbsp;&nbsp;&nbsp;&nbsp; <div class="ui red horizontal label">${date}</div>
          ${_title[bool]}
            </a></div>`);
        $(`input[value="${_select[bool]}"]`).prop('checked', true);
      }
    }
  }
  evo();
  chrome.storage.local.get(['date'], function (value) {
    value = value.date || [];
    console.log(value);
    _date = value;
  });
  chrome.storage.local.get(['select'], function (value) {
    value = value.select || [];
    console.log(value);
    _select = value;
  });
  chrome.storage.local.get(['url'], function (value) {
    value = value.url || [];
    console.log(value);
    _url = value;
    r_length = _url.length;
  });
  chrome.storage.local.get(['title'], function (value) {
    value = value.title || [];
    console.log(value);
    _title = value;
  });
  ele = document.getElementById("holi");
  while (ele.firstChild) {
    ele.removeChild(ele.firstChild);
  }
  document.getElementById("hora").onclick = function () {
    // evo();
    //日付オブジェクトを作成する
    let dd = new Date();
    //「年」を取得する
    let YYYY = dd.getFullYear();
    //「月」を取得する
    let MM = dd.getMonth() + 1;
    let DD = dd.getDate();
    let year = YYYY - 3;
    let limit = new Date(year + "/" + MM + "/" + DD);
    let date;
    $(".message").show();
    var foo_val = $("input[name='example1']:checked").val();
    if (foo_val != null) {
      if (flg) {
        _select[bool] = foo_val;
        date = new Date(_date[bool]);
      } else {
        _select[_select.length] = foo_val;
        _date[_date.length] = YYYY + "/" + MM + "/" + DD;
        _url[_url.length] = _url2;
        _title[_title.length] = title;
        date = new Date(YYYY + "/" + MM + "/" + DD);
      }
      console.log(_select);
      console.log(_date);
      console.log(_url);
      console.log(_title);
      chrome.storage.local.set({
        'select': _select
      }, function () { });
      chrome.storage.local.set({
        'date': _date
      }, function () { });
      chrome.storage.local.set({
        'url': _url
      }, function () { });
      chrome.storage.local.set({
        'title': _title
      }, function () { });
      evo();
    } else {
      alert("正しく入力されていません");
    }
    $("#message").hide();
    $("#success_message").show();
    $("#success_message").fadeOut(4000);
    let date_flg = 0;
    if (limit.getTime() >= date.getTime()) {
      date_flg = 1;
    }
    set_interval_id2 = setInterval(findTargetElement2, 300);
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        val: foo_val,
        date: date_flg
      }, function (msg) {
        //              console.log("result message:", msg);
      });
    });
  }
  $('#search').on('input', function () {
    let res_url = [];
    n = 1;
    let ela = document.getElementById("hono");
    while (ela.firstChild) {
      ela.removeChild(ela.firstChild);
    }
    let value = $("#search").val();
    let vg = value.match(/^とてもいい\//);
    let g = value.match(/^いい\//);
    let b = value.match(/^わっるい\//);
    let vb = value.match(/^とてもわっるい\//);
    let ll = 0;
    let vbn = -1;
    let pattern;
    let bcv;
    if (vg) {
      bcv = value.replace(/^とてもいい\//, '');
      pattern = new RegExp(bcv, "gi");
      console.log(bcv);
      _title.forEach(ele => {
        if (pattern.test(ele) && _select[ll] == 0) {
          console.log(ele, pattern);
          vbn++;
          res_url[vbn] = _url[ll];
        }
        ll++;
      });
    } else if (g) {
      bcv = value.replace(/^いい\//, '');
      pattern = new RegExp(bcv, "gi");
      _title.forEach(ele => {
        if (pattern.test(ele) && _select[ll] == 1) {
          console.log(ele, pattern);
          vbn++;
          res_url[vbn] = _url[ll];
        }
        ll++;
      });
    } else if (b) {
      bcv = value.replace(/^わっるい\//, '');
      pattern = new RegExp(bcv, "gi");
      _title.forEach(ele => {
        if (pattern.test(ele) && _select[ll] == 2) {
          console.log(ele, pattern);
          vbn++;
          res_url[vbn] = _url[ll];
        }
        ll++;
      });
    } else if (vb) {
      bcv = value.replace(/^とてもわっるい\//, '');
      pattern = new RegExp(bcv, "gi");
      _title.forEach(ele => {
        if (pattern.test(ele) && _select[ll] == 3) {
          console.log(ele, pattern);
          vbn++;
          res_url[vbn] = _url[ll];
        }
        ll++;
      });
    } else {
      pattern = new RegExp(value, "gi");
      _title.forEach(ele => {
        if (pattern.test(ele)) {
          console.log(ele, pattern);
          vbn++;
          res_url[vbn] = _url[ll];
        }
        ll++;
      });
    }
    let vl = "";
    res_url.forEach(e => {
      let it = 1;
      let x = 0;
      console.log(e);
      let vbf = 0;
      while (vbf == 0) {
        let i = "click-this";
        let vn = 0;
        let vx = "";
        switch (_select[x]) {
          case '0':
            vx = "とてもいい";
            break;
          case '1':
            vx = "いい";
            break;
          case '2':
            vx = "わっるい";
            break;
          case '3':
            vx = "とてもわっるい";
            break;
        }
        if (r_length < x) {
          vbf++;
        } else if ((bool == x && flg == 1) || e !== _url[x]) { } else {
          n++;
          if (_url[x] == "chrome://extensions/") {
            vl += `<br>
          <div id="${i + n}" data-url="${_url[x]}" >
          <a class="ui label" style="width:96vw;  overflow-wrap:break-word;"><i class="info circle icon"></i> ${vx} &nbsp;&nbsp;&nbsp;&nbsp; <div class="ui purple horizontal label">${_date[x]}</div>
          ${_title[x]}
            </a></div>`;
            vbf++;
          } else {
            vl += `<br>
          <div id="${i + n}" data-url="${_url[x]}" style="">
          <a class="ui label" style="width:96vw;  overflow-wrap:break-word;"><i class="info circle icon"></i> ${vx} &nbsp;&nbsp;&nbsp;&nbsp; <div class="ui red horizontal label">${_date[x]}</div>
          ${_title[x]}
            </a></div>`;
            vbf++;
          }
        }
        x++;
      }
    });
    $('#hono').append(vl);
    var set_interval_id2;
    set_interval_id2 = findTargetElement2(findTargetElement2, 300);
  });
  var set_interval_id2;
  var set_interval_id = setInterval(findTargetElement, 300);

  function findTargetElement() {
    let i = "click-this0";
    let set = document.getElementById("click-this0");
    if (r_length) {
      clearInterval(set_interval_id);
      console.log(r_length);
      let vl = "";
      // if(flg==1){
      let x = 0;
      while (x < r_length) {
        console.log(_url[x]);
        let i = "click-this";
        let vx = "";
        switch (_select[x]) {
          case '0':
            vx = "とてもいい";
            break;
          case '1':
            vx = "いい";
            break;
          case '2':
            vx = "わっるい";
            break;
          case '3':
            vx = "とてもわっるい";
            break;
        }
        if (bool == x && flg == 1) { } else {
          let it = x + 1;
          if (_url[x] == "chrome://extensions/") {
            vl += `<br>
                  <div id="${i + it}" data-url="${_url[x]}" >
                  <a class="ui label" style="width:96vw;  overflow-wrap:break-word;"><i class="info circle icon"></i> ${vx} &nbsp;&nbsp;&nbsp;&nbsp; <div class="ui purple horizontal label">${_date[x]}</div>
                  ${_title[x]}
                    </a></div>`;
          } else {
            vl += `<br>
                  <div id="${i + it}" data-url="${_url[x]}" style="">
                  <a class="ui label" style="width:96vw;  overflow-wrap:break-word;"><i class="info circle icon"></i> ${vx} &nbsp;&nbsp;&nbsp;&nbsp; <div class="ui red horizontal label">${_date[x]}</div>
                  ${_title[x]}
                    </a></div>`;
          }
        }
        x++;
        n++;
      }
      $('#hono').append(vl);
      set_interval_id2 = findTargetElement2();
    } else { }
  }

  function findTargetElement2() {
    let i = "click-this";
    let set = document.getElementById("click-this" + n.toString());
    console.log(set);
    console.log(n);
    if (set !== 'undefined' || set !== null) {
      clearInterval(set_interval_id2);
      for (let v = 0; v <= n; v++) {
        let set = document.getElementById("click-this" + v.toString());
        // console.log("#click-this"+v);    console.log(bool);
        $("#click-this" + v).on("click", function () {
          window.open(set.dataset.url);
        });
      }
    } else { }
    return 1;
  }
  $("#csvdwn").on('click', async function () {
    let str = "";
    let q = 0;
    _url.forEach(async ele => {
      // let vx= new Promise((resolve,reject)=>{
      //     let vx="";
      switch (_select[q]) {
        case '0':
          str += `とてもいい,` + "\"" + _title[q].replace(/\"/g, "\"\"") + "\"" + `,${ele},${_date[q]}\n`;
          break;
        case '1':
          str += `いい,` + "\"" + _title[q].replace(/\"/g, "\"\"") + "\"" + `,${ele},${_date[q]}\n`;
          break;
        case '2':
          str += `わっるい` + "\"" + _title[q].replace(/\"/g, "\"\"") + "\"" + `,${ele},${_date[q]}\n`;
          break;
        case '3':
          str += `とてもわっるい,` + "\"" + _title[q].replace(/\"/g, "\"\"") + "\"" + `,${ele},${_date[q]} \n`;
          break;
      }
      q++;
    });
    var link = document.createElement('a');
    var bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
    var blob;
    blob = new Blob([bom, str], {
      type: 'text/csv'
    });
    link.setAttribute('download', "Export.csv");
    link.setAttribute('href', window.webkitURL.createObjectURL(blob));
    link.click();
  });
  let fileInput = document.getElementById('embedpollfileinput');
  // //CSVファイルを読み込む関数getCSV()の定義
  $("#embedpollfileinput").on('change', async function (e) {
    // ファイルオブジェクトを取得
    var file = e.currentTarget.files[0];
    if (!file) return;
    // 中身を取得
    var text = await fetchAsText(file);
  });
  var david;
  var davi = 0;
  let flg2;
  let ulength;
  let delete2 = 0;
  let xz = 0;
  var foo_val;
  // ファイルから内容をテキストとして取得する Promise を返す
  var fetchAsText = (file) => {
    return new Promise((resolve, reject) => {
      delete2 = 0;
      var fr = new FileReader();
      fr.onload = (e) => {
        ele = document.getElementById("holi");
        while (ele.firstChild) {
          ele.removeChild(ele.firstChild);
        }
        let ela = document.getElementById("hono");
        while (ela.firstChild) {
          ela.removeChild(ela.firstChild);
        }
        in_select = [];
        in_url = [];
        in_date = [];
        in_title = [];
        // 読み込んだ結果を resolve する
        if (e.currentTarget.result == "\r\n" || e.currentTarget.result == "") {
          delete2 = 1;
        }
        let par = e.currentTarget.result.split(/\n/);
        let dv = 0;
        for (let c = 0; par.length - 2 >= c; c++) {
          flg2 = 0;
          let ele = par[c];
          let lock = 0;
          // let child = ele.split(',');
          const parseCsvLine = line => line.split(',').reduce(([data, isInQuotes], text) => {
            if (isInQuotes) {
              data[data.length - 1] += ',' + text.replace(/\"+/g, m => '"'.repeat(m.length / 2))
              return [data, !(text.match(/\"*$/)[0].length % 2)]
            } else {
              const match = text.match(/^(\"?)((.*?)(\"*))$/)
              data.push(match[1] ? match[2].replace(/\"+/g, m => '"'.repeat(m.length / 2)) : match[2])
              return [data, match[1] && !(match[4].length % 2)]
            }
          }, [[]])[0];
          let child = parseCsvLine(ele);
          console.log(child);
          child.forEach(e => {
            if (e == '') {
              lock = 1;
            }
          });
          if (lock == 0) {
            for (let x = 0; child.length > x; x++) {
              let e = child[x];
              e = e.replace(/\n|\r\n|\r/, "");
              let vx = "";
              switch (e) {
                case 'とてもいい':
                  vx = "0";
                  break;
                case 'いい':
                  vx = "1";
                  break;
                case 'わっるい':
                  vx = "2";
                  break;
                case 'とてもわっるい':
                  vx = "3";
                  break;
                default:
                  vx = "";
                  break;
              }
              switch (x) {
                case 0:
                  in_select[dv] = vx;
                  break;
                case 1:
                  in_title[dv] = e;
                  break;
                case 2:
                  in_url[dv] = e;
                  break;
                case 3:
                  in_date[dv] = e;
                  break;
                default:
                  flg2 = 1;
                  break;
              }
              // alert(e);
            }
            dv++;
          }
        };
      };
      davi = 1;
      // 読み込む
      fr.readAsText(file);
      david = setInterval(setter, 300);
      resolve();
    });

    function setter() {
      if (davi == 1) {
        clearInterval(david);
        if (((in_date.length + in_url.length + in_title.length + in_select.length) % 4 == 0 && flg2 == 0 && delete2 == 0) || delete2 == 1) {
          r_length = null;
          $('#inpo').prop('disabled', 'true');
          $(".message").show();
          // _select=[];
          // _date= [];
          // _url=[];
          // _title=[];
          if (delete2 == 1) {
            in_select = [];
            in_date = [];
            in_url = [];
            in_title = [];
            _select = [];
            _date = [];
            _url = [];
            _title = [];
          } else { }
          console.log(in_select);
          console.log(in_date);
          console.log(in_url);
          console.log(in_title);
          let cv = 0;
          chrome.storage.local.set({
            'select': in_select
          }, function () { });
          chrome.storage.local.set({
            'date': in_date
          }, function () { });
          chrome.storage.local.set({
            'url': in_url
          }, async function () {
            cv = 1;
          });
          chrome.storage.local.set({
            'title': in_title
          }, function () { });
          chrome.storage.local.get(['date'], function (value) {
            value = value.date || [];
            console.log(value);
            _date = value;
          });
          chrome.storage.local.get(['select'], function (value) {
            value = value.select || [];
            console.log(value);
            _select = value;
          });
          chrome.storage.local.get(['url'], function (value) {
            value = value.url || [];
            console.log(value);
            _url = value;
          });
          // alert(_url)
          chrome.storage.local.get(['title'], function (value) {
            value = value.title || [];
            console.log(value);
            _title = value;
          });
          var set_interval_id2;
          var set_interval_id;
          let vl = "";
          var kakikupro;
          let dfg = 0;
          let dd = new Date();
          //「年」を取得する
          let YYYY = dd.getFullYear();
          //「月」を取得する
          let MM = dd.getMonth() + 1;
          let DD = dd.getDate();
          let year = YYYY - 3;
          let limit = new Date(year + "/" + MM + "/" + DD);
          let date;
          date = new Date(YYYY + "/" + MM + "/" + DD);
          ele = document.getElementById("holi");
          while (ele.firstChild) {
            ele.removeChild(ele.firstChild);
          }
          let ela = document.getElementById("hono");
          while (ela.firstChild) {
            ela.removeChild(ela.firstChild);
          }
          let dpi = null;
          var set_interval_id5 = setInterval(findTargetElement34, 300);

          function findTargetElement34() {
            if (cv == 1) {
              r_length = in_url.length;
              clearInterval(set_interval_id5);
              const url = uuu;
              bool = in_url.indexOf(url);
              //日付オブジェクトを作成する
              _url2 = url;
              // bool=(bool=="")?-1:bool;
              if (bool == -1) {
                foo_val = 4;
                flg = 0;
                if (url == "chrome://extensions/") {
                  $('#holi').append(` <br>
  <div id="click-this0" data-url="${url}" >
  <a class="ui label" style="width:96vw;  overflow-wrap:break-word;"><i class="info circle icon"></i> new &nbsp;&nbsp;&nbsp;&nbsp; <div class="ui purple  horizontal label">${YYYY + "/" + MM + "/" + DD}</div>
  ${title}
   </a></div>`);
                } else {
                  $('#holi').append(` <br>
         <div id="click-this0" data-url="${url}" >
         <a class="ui label" style="width:96vw;  overflow-wrap:break-word;"><i class="info circle icon"></i> new &nbsp;&nbsp;&nbsp;&nbsp; <div class="ui red horizontal label">${YYYY + "/" + MM + "/" + DD}</div>
         ${title}
           </a></div>`);
                }
                $(`input[value="0"]`).prop('checked', false);
                $(`input[value="1"]`).prop('checked', false);
                $(`input[value="2"]`).prop('checked', false);
                $(`input[value="3"]`).prop('checked', false);
              } else {
                let date2 = new Date(in_date[bool]);
                //「年」を取得する
                YYYY = date2.getFullYear();
                //「月」を取得する
                MM = date2.getMonth() + 1;
                DD = date2.getDate();
                date = new Date(YYYY + "/" + MM + "/" + DD);
                foo_val = in_select[bool];
                flg = 1;
                if (url == "chrome://extensions/") {
                  let vx = "";
                  switch (in_select[bool]) {
                    case '0':
                      vx = "とてもいい";
                      break;
                    case '1':
                      vx = "いい";
                      break;
                    case '2':
                      vx = "わっるい";
                      break;
                    case '3':
                      vx = "とてもわっるい";
                      break;
                  }
                  $('#holi').append(`<br>
         <div id="click-this0" data-url="${url}">
         <a class="ui label" style="width:96vw;  overflow-wrap:break-word;"><i class="info circle icon"></i> ${vx} &nbsp;&nbsp;&nbsp;&nbsp; <div class="ui purple  horizontal label">${date}</div>
         ${in_title[bool]}
           </a></div>`);
                  $(`input[value="${in_select[bool]}"]`).prop('checked', true);
                } else {
                  let vx = "";
                  switch (in_select[bool]) {
                    case '0':
                      vx = "とてもいい";
                      break;
                    case '1':
                      vx = "いい";
                      break;
                    case '2':
                      vx = "わっるい";
                      break;
                    case '3':
                      vx = "とてもわっるい";
                      break;
                  }
                  $('#holi').append(`<br>
         <div id="click-this0" data-url="${url}" >
         <a class="ui label" style="width:96vw;  overflow-wrap:break-word;"><i class="info circle icon"></i> ${vx} &nbsp;&nbsp;&nbsp;&nbsp; <div class="ui red horizontal label">${date}</div>
         ${in_title[bool]}
           </a></div>`);
                  $(`input[value="${in_select[bool]}"]`).prop('checked', true);
                }
              }
              n = 0;
              dpi = 1;
              set_interval_id = setInterval(findTargetElement, 300);
            }
          }

          function findTargetElement() {
            let i = "click-this0";
            let set = document.getElementById("click-this0");
            vl = "";
            console.log(_url);
            console.log(in_url);
            if (dpi == 1 && JSON.stringify(_url) === JSON.stringify(in_url)) {
              clearInterval(set_interval_id);
              vl = "";
              let x = 0;
              if (r_length == 0) {
                dfg = 1;
              }
              let ela = document.getElementById("hono");
              while (ela.firstChild) {
                ela.removeChild(ela.firstChild);
              }
              while (x < r_length) {
                vl = "";
                let i = "click-this";
                let vx = "";
                switch (in_select[x]) {
                  case '0':
                    vx = "とてもいい";
                    break;
                  case '1':
                    vx = "いい";
                    break;
                  case '2':
                    vx = "わっるい";
                    break;
                  case '3':
                    vx = "とてもわっるい";
                    break;
                }
                if (bool == x && flg == 1) {
                  dfg = 1;
                } else {
                  dfg = 1;
                  n++;
                  let it = x + 1;
                  if (in_url[x] == "chrome://extensions/") {
                    vl = `<br>
                  <div id="${i + n}" data-url="${in_url[x]}" >
                  <a class="ui label" style="width:96vw;  overflow-wrap:break-word;"><i class="info circle icon"></i> ${vx} &nbsp;&nbsp;&nbsp;&nbsp; <div class="ui purple horizontal label">${in_date[x]}</div>
                  ${in_title[x]}
                    </a></div>`;
                    $('#hono').append(vl);
                  } else {
                    vl = `<br>
                  <div id="${i + n}" data-url="${in_url[x]}" style="">
                  <a class="ui label" style="width:96vw;  overflow-wrap:break-word;"><i class="info circle icon"></i> ${vx} &nbsp;&nbsp;&nbsp;&nbsp; <div class="ui red horizontal label">${in_date[x]}</div>
                  ${in_title[x]}
                    </a></div>`;
                    $('#hono').append(vl);
                  }
                }
                x++;
              }
            }
            $("#message").hide();
            $("#success_message").show();
            $("#success_message").fadeOut(1500);
            kakikupro = setInterval(kakiku, 300);
          }
          var obj = document.getElementById("embedpollfileinput");

          function kakiku() {
            let date_flg = 0;
            if (limit.getTime() >= date.getTime()) {
              date_flg = 1;
            }
            // alert();
            if (dfg == 1 && n >= 0) {
              clearInterval(kakikupro);
              i = "click-this";
              set = document.getElementById("click-this" + n.toString());
              console.log(r_length);
              console.log(n);
              if (set !== 'undefined' || set !== null) {
                for (let v = 0; v <= n; v++) {
                  let set = document.getElementById("click-this" + v.toString());
                  //    alert(set.dataset.url);
                  // console.log("#click-this"+v);    console.log(bool);
                  $("#click-this" + v).on("click", function () {
                    window.open(set.dataset.url);
                  });
                  xz = n;
                }
              }
              if (!alert('インポートが完了しました。')) {
                obj.value = "";
                chrome.tabs.query({
                  active: true,
                  currentWindow: true
                }, function (tabs) {
                  chrome.tabs.sendMessage(tabs[0].id, {
                    val: foo_val,
                    date: date_flg,
                    inp: "inport"
                  }, function (msg) {
                    //              console.log("result message:", msg);
                  });
                });
              }
              $('#inpo').prop('disabled', 'false');
            }
          }
        } else {
          try {
            obj.value = "";
          } catch (error) {
            alert("インポートが正しく行えませんでした。");
          }
        }
      }
    }
  };
});
