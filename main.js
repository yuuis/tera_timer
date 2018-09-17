$(function(){
   
   //変数の設定-----------------------------------
   
  // setPause, time: 秒
  
   var setMinute = 0; //タイマーの秒数
   var setPause = setMinute * 60; //ストップ時の秒数を保存する変数　初期値はsetSecondと同じ数値
   var time = setMinute * 60;   //残り秒数を保存する変数　初期値はsetSecondと同じ数値
   var timerID;    //setInterval用の変数
   
  var isTimerRunning = false;
 
 
   //関数の設定-----------------------------------
   
   //残り秒数を表示させる関数   
   function textDisplay(){
     charMinute = String(parseInt(time/60, 10));
     if (charMinute.length == 1) {
       charMinute = '0' + charMinute;
     }
     charSecond = String(time%60);
     if (charSecond.length == 1) {
       charSecond = '0' + charSecond;
     }
      $("#countDown").text(charMinute + ':' + charSecond);
   };
   
   //カウントを1減らす関数（setIntervalで毎秒実行される関数）
	function countDown(){
      time--;  //残り秒数を1減らす
      setPause = time;  //setPauseに残り秒数を代入（ストップ時に使用するため）
      textDisplay();    //1減った残り秒数を表示
	}
   
   //タイマー（setInterval）の停止用関数
	function countStop(){
    isTimerRunning = false;
      clearInterval(timerID); //（setInterval）をクリアー
	}

     //タイマースタートの関数
	function timerStart(event){
    isTimerRunning = true;
      countStop();   //カウントダウンの重複を防ぐために今動いているタイマーをクリアーする ※1
		timerID = setInterval(function(){
         if(time <= 0) {
            Push.create('終了!', { body: '残念でした！', timeout: 10000});
            //残り秒数が0以下になったらタイマー（setInterval）をクリアー
            clearInterval(timerID);
            showModal(event, '残念でしたね．', '質問してみよう', "https://teratail.com/questions/input");
         } else {
            //残り秒数が1以上あれば1減らす
			   countDown();
         }
         
		}, 1000);   //1000ミリ秒（1秒）毎にsetInterval内の処理を繰り返す
	};

 
   //実行処理-----------------------------------
   
   textDisplay();
   

     //スタートボタンクリックでタイマースタート
   $("#startBtn").click(function(event){
       time = setPause; //setPauseに入っている秒数から開始
       document.getElementById('time').style.display = 'none';
       textDisplay();
       timerStart(event);
   });
   
   //ストップボタンクリックでタイマー停止
   $("#stopBtn").click(function(){
       countStop();
   });
   
   //リセットボタンクリックでタイマー初期化
   $("#resetBtn").click(function(){
       countStop();
       time = setPause = setMinute * 60; //setSecondに入っている秒数を代入し直す
       textDisplay();
   });
   
     //保存ボタンクリックで秒数変更フォームの入力チェック
   $("#changeMinute").click(function(){
      
       //入力欄（#setSecond input）に記入された内容をseveSecondに代入
       var seveMinute = $("#setMinute").val();
       
       //正規表現を使用して半角数字か判別を行う
       if(seveMinute.match( /[^0-9]+/ )){
          //半角数字以外のものが含まれていた場合、エラーテキストを表示
          $("#error").text("※半角数字で入力してください")
       
       //seveSecondが空でないか判別を行う
       } else if(seveMinute=='') {
          //何も入力されてない場合、エラーテキストを表示
          $("#error").text("※値を入力してください")
          
       //入力が問題ない場合
       } else {
          //エラーテキストを空に
          $("#error").text("")
          //入力された値（seveSecond）をタイマーの秒数（setSecond）に設定
          setMinute = seveMinute;
          //以下リセットボタン押下時と同じ処理
          countStop();
          time = setPause = (setMinute * 60);
          textDisplay();
       }
   });

  $("#solveBtn").click(function() {
    // if (isTimerRunning == false) return;
    countStop();
    showModal(event, 'エラー解決おめでとう！．', 'この調子で頑張ろう！');
  })
 
    // モーダルウィンドウを開く
    function showModal(event, modalMsg1="", modalMsg2="", redirect_url="#") {
      console.log(redirect_url);
        event.preventDefault();

        var $shade = $('<div></div>');
        $shade
            .attr('id', 'shade');
            // .on('click', hideModal);


        var $modalWin = $('#modalwin');
        var $window = $(window);

        $("#modal-msg-1").text(modalMsg1);
        $("#modal-msg-2").text(modalMsg2);
        if (redirect_url != '#') {
          $("#close-btn a")
            .attr("target", '_brank')
            .attr("href", redirect_url);
        }

        $modalWin
            .before($shade)
            .removeClass('hide')
            .addClass('show');
            
    }

    function hideModal() {
        $('#shade').remove();
        $('#modalwin')
            .removeClass('show')
            .addClass('hide');
    }

    $('.show-modal').on('click', showModal);
});

function hideModal() {
    $('#shade').remove();
    $('#modalwin')
        .removeClass('show')
        .addClass('hide');
}

