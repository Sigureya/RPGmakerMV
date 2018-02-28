//=============================================================================
// Mano_SymbolCommonEventCall.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017-2017 Sigureya
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/Sigureya/
// [github]:https://github.com/Sigureya/RPGmakerMV
//=============================================================================

/*:
 * @plugindesc マップ上で、1ボタンでコモンイベントを呼び出す機能を追加します。
 * 
 * 
 * @author しぐれん（魔のささやき）
 * 
 * @param commonA
 * @type Struct<CommonDefine>
 * 
 * @param commonB
 * @type Struct<CommonDefine>
 * 
 * @param commonC
 * @type Struct<CommonDefine>
 * 
 * @param commonD
 * @type Struct<CommonDefine>
 * 
 * @param commonE
 * @type Struct<CommonDefine>
 * 
 * @param commonF
 * @type Struct<CommonDefine>
 * 
 * @param commonG
 * @type Struct<CommonDefine>
 * 
 * @param commonH
 * @type Struct<CommonDefine>
 *
 * @help
 * 1ボタンでコモンイベントを呼び出せるようになります。
 * ゲームパッドにも対応しています。
 * 
 * マップ中でのみ有効です。
 * Aから順に呼び出し判定を行います。
 * 一つでも呼びだされた場合、残りは呼ばれません.
 * 
 * 呼び出しのタイミングは、通常のコモンイベントの実行が終了したあとです。
 * 
 * ゲームパッドのボタンですが、割り当てはGamepadAPIで調べてください。
 * 16は意図的に割り当て不能にしています。
 * 存在しない場合もあるためです。
 * 12から15は十字キーなので不可。
 * 元から機能が割り当てられている0~5への割り当ては、自己責任でお願いします。
 * 
 * Mano_InputConfigよりも上に入れることで、
 * Mano_InputConfig用の設定を自動で用意します。
 * 
 * Mano_InputConfigと一緒に入れている状態で動かない場合、
 * オプション画面を開いて初期設定に戻すを選択してください。
 * 解決するかもしれません。
 * 
 * ver 2.1(2018/03/01) 更新
 * 破壊的変更
 * 割り込み設定のパラメータを追加
 * アクションゲームで使っている方は要注意
 * パラメータのデフォルト値を変更
 * 自分で使っていて、ミスが多発したので
 * ver 2.0(2018/02/01)　更新
 * 破壊的変更
 * キーコードの指定方法を変更　数字キーを押して、動作を確認してください。
 * 
 * var 1.0(2017/10/17) 公開
 */

/**
 * TODO:
 * autoExportの無効化機能
 * 
 */

/*~struct~CommonDefine:
 * @param text
 * @desc コマンド名称です
 * 
 * @param enabled
 * @desc このパラメータがONの時だけ、機能します
 * デバッグ用に機能を無効化する場合を想定しています
 * @type boolean
 * @default true
 *  
 * @param enableSwitch
 * @desc 指定したスイッチがONの時だけ、呼びだしを行います。
 * 指定がない場合、チェックしません。
 * @type switch
 * @default 0
 * 
 * @param event
 * @desc 呼びだされるコモンイベント
 * @type common_event
 * 
 * @param symbol
 * @desc Input.isTriggered()の引数として使われます。
 * 他のプラグインと重複しないような名前を付けてください。
 * 
 * @param interrupt
 * @desc 他のイベントが実行されている時に割り込むかを決めます。
 * アクションゲームの場合、trueにすると良いと思います。
 * @on 割り込む
 * @off 割り込まない(入力を無視)
 * @type boolean
 * @default false
 * 
 * @param mandatory
 * @desc inputConfigの方で必須指定されたものとして扱います。
 * @type boolean
 * @default false
 * 
 * 
 * @param keyList
 * @desc キーボードの割り当てです。(半角・大文字) 
 * Aと入れればAを押したときにイベントを実行します。
 * @type string
 * 
 * @param padButton
 * @desc ゲームパッドの割り当てです
 * カッコ内はツクールのデフォルトでの割り当てです
 * @type select
 * @default -1
 * @option non(割り当てなし)
 * @value -1
 * @type select
 * @option button6(L2)
 * @value 6
 * @option button7(R2)
 * @value 7
 * @option button8(select)
 * @value 8
 * @option button9(start)
 * @value 9
 * @option button10
 * @value 10
 * @option button11
 * @value 11
 * @option button0(ok/決定)
 * @value 0
 * @option button1(cancel/キャンセル)
 * @value 1
 * @option button2(shift/ダッシュ)
 * @value 2
 * @option button3(menu/メニュー)
 * @value 3
 * @option button4(pageup)
 * @value 4
 * @option button5(pagedown)
 * @value 5
 * @param keycode
 * @desc キーボードの割り当てです。（廃止予定）
 * 0以外を指定すると、警告が出ます。
 * @type number
 * @default 0
 */
/*~
 * @param description
 * @desc コマンドの簡易説明です
 * Mano_InputConfigと組み合わせて使います
 * 
 */
function MA_OneButtonCommonEvent(){
    this.initialize.apply(this,arguments);
} 

var MA_InputSymbols =MA_InputSymbols||[];

(function () {
    'use strict';


const setting= (function(){
     function fetchCommonEvent(CommonDefine){
         if(!CommonDefine){
             console.log("データが無いよ")
             return null;
         }
        const obj =JSON.parse(CommonDefine);
        const enabled=(obj.enabled==='true');
        if(!enabled){
            console.log("無効だから無視したよ")
            return null;
        }
        const eventId_ = Number(obj.event);
        if(!(eventId_>0)){
            console.log("イベント番号が不正だからやめたよ")
            return null;
        }
        if(!obj.symbol){
            console.log("シンボルが設定されてないよ");
            return null;
        }

        return {
            enableSwitch:Number(obj.enableSwitch ||0 ),
            symbol:String(obj.symbol),
            text:String(obj.text),
            eventId:eventId_,
            keycode:Number(obj.keycode),
            keyList:String(obj.keyList),
            padButtonNumber:Number(obj.padButton),
            mandatory:(obj.mandatory==='true'),   
            interrupt:(obj.interrupt==='true'),
        };
    }
    function createCommonEventList(params){
        return [
            fetchCommonEvent(params.commonA),
            fetchCommonEvent(params.commonB),
            fetchCommonEvent(params.commonC),
            fetchCommonEvent(params.commonD),
            fetchCommonEvent(params.commonE),
            fetchCommonEvent(params.commonF),
            fetchCommonEvent(params.commonG),
            fetchCommonEvent(params.commonH),        
        ];//.filter(function(e){return !!e});
    }
        const params =PluginManager.parameters('Mano_OneButtonCommonEventCall')
        const result= {
            eventList:createCommonEventList(params)
        };
    return result
})();

(function(){

    /**
     * 
     * @param {Number} keycode 
     * @param {String} symbol 
     */
    function setKeySymbol(keycode,symbol){
//        console.log('keymapper'+keycode+'='+symbol);
        const preDef =Input.keyMapper[keycode ];
        if(preDef){
            console.log("上書き警告("+keycode+"):"+preDef+"を"+symbol+"に上書きしようとしています");
        }
        console.log("keycode:"+keycode+"に"+symbol);
        Input.keyMapper[keycode ] =symbol;
    }

    setting.eventList.forEach(function(data){
        if(!data){return;}

        const keyListLen = data.keyList.length;
        for(var i=0; i < keyListLen; ++i){
            setKeySymbol( data.keyList.charCodeAt(i)  ,data.symbol);
        }

        if(data.keycode > 0){
            console.log("warning:keycodeの番号指定は廃止予定なので、keylistを使ってください")
            setKeySymbol(data.keycode,data.symbol);
        }
        if( (  data.padButtonNumber)>=0){
            console.log("button"+data.padButtonNumber+"="+data.symbol);
            Input.gamepadMapper[ data.padButtonNumber]=data.symbol;
        }

        MA_InputSymbols.push({
            mandatory:data.mandatory,
            text:data.text,
            symbol:data.symbol,
        })
    })
})()

//setMapper();
/**
 * @param {Number} settingId
 */
MA_OneButtonCommonEvent.prototype.initialize =function(settingId){
    this._settingId = settingId;
    const param =setting.eventList[settingId];
    this._commonEventId = param.eventId;
    this._enableSwitch=  param.enableSwitch;
    this._symbol= param.symbol;
    this._interpreter = null;
    this.refresh()
};
MA_OneButtonCommonEvent.prototype.refresh = function() {
    if (!this._interpreter) {
        this._interpreter = new Game_Interpreter();
    }
};

/**
 * @return {RPG.Event}
 */
MA_OneButtonCommonEvent.prototype.event =function(){
    return $dataCommonEvents[this._commonEventId];
};
/**
 * @return {RPG.EventCommand[]}
 */
MA_OneButtonCommonEvent.prototype.list = function() {
    return this.event().list;
};
MA_OneButtonCommonEvent.prototype.isSwitchOk =function(){
    return this._enableSwitch ===0||$gameSwitches.value(this._enableSwitch);
};

MA_OneButtonCommonEvent.prototype.isCalled=function(){
    return Input.isTriggered(this._symbol);
};
MA_OneButtonCommonEvent.prototype.isCallOK=function(){
    if(!Input.isTriggered(this._symbol)){
        return false;
    }
    console.log("入力受付:"+this._symbol);
    const def = setting.eventList[this._settingId];

    return (!SceneManager.isSceneChanging())
    && (!this._interpreter.isRunning())
    && (def.interrupt || !$gameMap.isEventRunning())
    && (def.enableSwitch ===0 || $gameSwitches.value(def.enableSwitch));

    if(SceneManager.isSceneChanging()){return false};

    if( this._interpreter.isRunning() ){
        return false;
    }
    if(!def.interrupt && $gameMap.isEventRunning()){
        return false;
    }
    if (def.enableSwitch !==0 && $gameSwitches.value(def.enableSwitch)){
        return false;
    }

    return true;

};


MA_OneButtonCommonEvent.prototype.update=function(){

    if(this._interpreter){
        if(this.isCallOK()){
            this._interpreter.setup(this.list());            
        }
        this._interpreter.update();
    }
    return;
};
/**
 * @return {MA_OneButtonCommonEvent[]}
 */
function createOneButtonEvents(){
    const result =[];
    const len =setting.eventList.length
    for(var i=0; i < len; ++i){
        var e =setting.eventList[i]
        if(e && e.eventId !==0 ){
            result.push( new MA_OneButtonCommonEvent(i));
        }
    }
    return result;
}

const Game_Map_initialize=Game_Map.prototype.initialize;
Game_Map.prototype.initialize =function(){
    Game_Map_initialize.apply(this,arguments);
    this._oneButtonEvents =[];
};

const  Game_Map_setupEvents=Game_Map.prototype.setupEvents;
Game_Map.prototype.setupEvents =function(){
    Game_Map_setupEvents.call(this);
    this.setupOneButtonEvents();
};

Game_Map.prototype.setupOneButtonEvents =function(){
    this._oneButtonEvents=createOneButtonEvents();          
};

const  Game_Map_updateEvents=Game_Map.prototype.updateEvents;
Game_Map.prototype.updateEvents =function(){
    this._oneButtonEvents.forEach(function(event){
        event.update();
    });
    Game_Map_updateEvents.call(this);
};

const Scene_Load_reloadMapIfUpdated =Scene_Load.prototype.reloadMapIfUpdated;
Scene_Load.prototype.reloadMapIfUpdated =function (){
    Scene_Load_reloadMapIfUpdated.call(this);
    if($gameMap._oneButtonEvents){
        $gameMap.setupOneButtonEvents();
    }
} ;

})();
