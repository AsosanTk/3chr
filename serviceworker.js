var CACHE_NAME  = "v1.0";

var urlsToCache = [
    "index.html",
    "about/index.html",
    "download/index.html",
    "sitemap/index.html",
    "info/index.html",
    "err/offfline.html",
    "sitemap/index.html",
    "serviceworker.js",
    "contents/index.html",
    "contents/model/index.html",
    "contents/partsmodel/index.html",
    "contents/reports/index.html",
    "contents/reports/phase0/index.html",
    "contents/reports/phase1/index.html",
    "contents/reports/phase2/index.html",
    "contents/reports/phase3/index.html",
    "contents/reports/phase4/index.html",
    "contents/reports/phase5/index.html",
    "contents/reports/phase1/img/image1.png",
    "contents/reports/phase2/img/image2.png",
    "contents/reports/phase2/img/image3.png",
    "contents/reports/phase2/img/image4.png",
    "contents/reports/phase3/img/image5.png",
    "contents/reports/phase4/img/image6.png",
    "contents/reports/phase4/img/image7.png",
    "contents/reports/phase4/img/image8.png",
    "blogs/index.html",
    "blogs/blog1/index.html",
    "blogs/blog2/index.html",
    "blogs/blog3/index.html",
    "blogs/blog4/index.html",
    "blogs/blog5/index.html",
    "blogs/blog2/img/image1.png",
    "blogs/blog3/img/image1.jpg",
    "blogs/blog4/img/image1.jpeg",
    "blogs/blog4/img/image2.jpeg",
    "blogs/blog4/img/image3.jpeg",
    "blogs/blog4/img/image4.jpeg",
    "blogs/blog4/img/image5.jpeg",
    "blogs/blog4/img/image6.jpeg",
    "blogs/blog4/img/image7.jpeg",
    "blogs/blog4/img/image8.png",
    "blogs/blog5/img/image1.jpg",
    "blogs/blog5/img/image2.jpg",
    "assets/css/base.css",
    "assets/css/page.css",
    "assets/json/manifest.json",
    "assets/js/font.js",
    "assets/js/script.js",
    "assets/img/3chrmap.png",
    "assets/img/nexticon.png",
    "assets/img/previcon.png",
    "assets/img/topimage1.gif",
    "assets/img/topimage2.jpeg",
    "assets/img/topimage3.jpeg",
    "assets/img/topimage4.jpeg",
    "assets/img/topimage5.jpeg",
    "assets/img/space001.png",
    "assets/img/logo/3clog_150x150.png",
    "assets/img/logo/footer_logo.png",
    "assets/img/logo/3clogo_512x512.png",
    "assets/img/logo/twitter_logo.png",
    "assets/img/logo/twitter_logocolor.png",
    "assets/img/logo/twitter_logowhite.png",
    "assets/img/logo/3clogo_192x192.png",
    "assets/img/logo/3clogo_62x62.png",
    "assets/img/logo/3clogo_192x192.png",
    "assets/img/icon/monopoint1.png",
    "assets/img/icon/monopoint2.png",
    "assets/img/icon/monopoint3.png",
    "assets/img/icon/monopoint4.png",
    "assets/img/icon/monopoint5.png",
    "assets/img/icon/monopoint6.png",
    "assets/img/icon/monopoint7.png",
    "assets/img/icon/monopoint8.png",
    "assets/img/icon/monopoint9.png",
    "assets/img/icon/monopoint10.png",
    "assets/img/icon/monopoint11.png",
    "assets/img/icon/monopoint12.png",
    "assets/img/icon/point1.png",
    "assets/img/icon/pointcolor1.png",
    "assets/img/icon/pointcolor2.png",
    "assets/img/icon/pointcolor3.png",
    "assets/img/icon/pointcolor4.png",
    "assets/img/icon/pointcolor5.png",
    "assets/img/icon/pointcolor6.png",
    "assets/img/icon/pointcolor7.png",
    "assets/img/icon/pointcolor8.png",
    "assets/img/icon/pointcolor9.png",
    "assets/img/icon/pointcolor10.png",
    "assets/img/icon/pointcolor11.png",
    "assets/img/icon/pointcolor12.png",
    "assets/img/icon/infomenu-contents.png",
    "assets/img/icon/infomenu-model.png",
    "assets/img/icon/infomenu-modelsub.png",
    "assets/img/icon/infomenu-map.png",
    "assets/img/icon/infomenu-mv.png",
    "assets/img/icon/infomenu-pv.png",
    "assets/img/icon/infomenu-report.png",
    "assets/img/icon/infomenu-sns.png",
    "assets/img/icon/menu-scoroll.png",
    "https://www.googletagmanager.com/gtag/js?id=UA-179540664-1",
    "https://fonts.googleapis.com/css?family=Lobster",
    "//code.jquery.com/jquery-3.4.1.min.js",
    "//code.jquery.com/jquery-3.4.1.js",
    "https://use.typekit.net/mby4ewi.js"
];

// 残したいキャッシュのバージョンをこの配列に入れる
// 基本的に現行の1つだけでよい。他は削除される。
const CACHE_KEYS = [
  CACHE_NAME
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME) // 上記で指定しているキャッシュ名
          .then(
          function(cache){
              return cache.addAll(urlsToCache); // 指定したリソースをキャッシュへ追加
              // 1つでも失敗したらService Workerのインストールはスキップされる
          })
    );
});

//新しいバージョンのServiceWorkerが有効化されたとき
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => {
          return !CACHE_KEYS.includes(key);
        }).map(key => {
          // 不要なキャッシュを削除
          return caches.delete(key);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  var online = navigator.onLine;

  // ファイルパス ~/test.htmlにアクセスすると、このファイル自体は無いがServiceWorkerがResponseを作成して表示してくれる
  /*if (event.request.url.indexOf('test.html') != -1) {
    return event.respondWith(new Response('任意のURLの内容をここで自由に返却できる'));
  }*/

  if(online){
    console.log("ONLINE");
    //このパターンの処理では、Responseだけクローンすれば問題ない
    //cloneEventRequest = event.request.clone();
    event.respondWith(
      caches.match(event.request)
        .then(
        function (response) {
          if (response) {
            //オンラインでもローカルにキャッシュでリソースがあればそれを返す
            //ここを無効にすればオンラインのときは常にオンラインリソースを取りに行き、その最新版をキャッシュにPUTする
            return response;
          }
          //request streem 1
          return fetch(event.request)
            .then(function(response){
              //ローカルキャッシュになかったからネットワークから落とす
              //ネットワークから落とせてればここでリソースが返される

              // Responseはストリームなのでキャッシュで使用してしまうと、ブラウザの表示で不具合が起こる(っぽい)ので、複製したものを使う
              cloneResponse = response.clone();

              if(response){
                if(response || response.status == 200){
                  console.log("正常にリソースを取得");
                  caches.open(CACHE_NAME)
                    .then(function(cache)
                    {
                      console.log("キャッシュへ保存");
                      //初回表示でエラー起きているが致命的でないので保留
                      cache.put(event.request, cloneResponse)
                      .then(function(){
                        console.log("保存完了");
                      });
                    });
                }else{
                  return event.respondWith(new Response('200以外のエラーをハンドリングしたりできる'));
                }
                return response;
              }
            }).catch(function(error) {
              return console.log(error);
            });
        })
    );
  }else{
    console.log("OFFLINE");
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // キャッシュがあったのでそのレスポンスを返す
          if (response) {
            return response;
          }
          //オフラインでキャッシュもなかったパターン
          return caches.match("err/offline.html")
              .then(function(responseNodata)
              {
                return responseNodata;
              });
        }
      )
    );
  }
});