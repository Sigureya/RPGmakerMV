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
 * @default {"text":"コマンド名","enabled":"true","enableSwitch":"0","event":"","symbol":"onebuttonA","interrupt":"false","mandatory":"false","keyList":"IO","keycodeList":"[]","padButton":"-1"}
 * 
 * @param commonB
 * @type struct<CommonDefine>
 * @default {"text":"コマンド名","enabled":"true","enableSwitch":"0","event":"","symbol":"onebuttonA","interrupt":"false","mandatory":"false","keyList":"IO","keycodeList":"[]","padButton":"-1"}
 * 
 * @param commonC
 * @type struct<CommonDefine>
 * 
 * @param commonD
 * @type struct<CommonDefine>
 * 
 * @param commonE
 * @type struct<CommonDefine>
 * 
 * @param commonF
 * @type struct<CommonDefine>
 * 
 * @param commonG
 * @type struct<CommonDefine>
 * 
 * @param commonH
 * @type struct<CommonDefine>
 *
 * @param debugMode
 * @desc デバッグモードです。
 * 設定ミスがある場合、コンソールにエラー文章を表示します。
 * @type boolean
 * @default true
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
 * 
 * ver 2.3 (2018/11/18)
 * 旧方式を使いたいという声があったので、形を変えて復活
 * 
 * ver 2.2
 * キーコードの設定方法で、旧型式を完全に削除
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
 * ADと入れればAかDを押したときにイベントを実行します。
 * @type string
 * 
 * @param keycodeList
 * @desc キーコードを数字で直接指定します。
 * キーコードについては各自で検索してください。
 * @type number[]
 * @default []
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
 * 
 */

var MA_InputSymbols =MA_InputSymbols||[];

var Mano_OneButtonCommonEventCall = (function () {
    'use strict';

class MA_OneButtonCommonEvent {
    /**
     * @param {Number} settingId
     */
    constructor(settingId) {
        this._settingId = settingId;
        this._interpreter = null;
        this.refresh();
    }
    refresh() {
        const def = this.mySetting();
        if(!def){
            this._interpreter =null;
            return;
        }

        if (!this._interpreter) {
            this._interpreter = new Game_Interpreter();
        }
    }
    /**
     * @return {RPG.Event}
     */
    event() {
        const eventId = this.mySetting().eventId;
        return $dataCommonEvents[eventId];
    }
    commonEventId(){
        return this._commonEventId;
    }
    /**
     * @return {RPG.EventCommand[]}
     */
    list() {
        return this.event().list;
    }

    get switchId(){
        return this.mySetting().enableSwitch;
    }
    isSwitchOk() {
        const switchId =this.switchId;
        return switchId === 0 || $gameSwitches.value(switchId);
    }
    isCallOK() {
        const def = this.mySetting();
        if (!Input.isTriggered(def.symbol)) {
            return false;
        }
        return (!SceneManager.isSceneChanging())
            && (!this._interpreter.isRunning())
            && (def.interrupt || !$gameMap.isEventRunning())
            && this.isSwitchOk();
    }
    update() {
        if (this._interpreter) {
            if (this.isCallOK()) {
                this._interpreter.setup(this.list());
            }
            this._interpreter.update();
        }
    }

    onLoad(){
        this.refresh();
    }

    mySetting(){
        return setting.eventList[this._settingId];
    }

    settingId(){
        return this._settingId;
    }
}

window[MA_OneButtonCommonEvent.name] = MA_OneButtonCommonEvent;

const setting= (function(){

    /**
     * @return {Number[]}
     * @param {String} text 
     */
    function parseNumbers(text){
        if(!text){
            return [];
        }
        const obj = JSON.parse(text);
        if(!obj.map){
            return [];
        }

        return obj.map(function(v){return Number(v);});
    }

    const params =PluginManager.parameters('Mano_OneButtonCommonEventCall')
    const isDebug = Utils.isOptionValid("test") && (params.isDebug==='true');
    function fetchCommonEvent(CommonDefine){
         if(!CommonDefine){
             return null;
         }
        const obj =JSON.parse(CommonDefine);
        const enabled=(obj.enabled==='true');

        if(!enabled){
            // if(isDebug){
            //     console.log("無効だから無視したよ");
            // }
            return null;
        }
        const eventId_ = Number(obj.event);
        if(!(eventId_>0)){
            if(isDebug){
               console.log("イベント番号が不正だからやめたよ")
            }
            return null;
        }
        if(!obj.symbol){
            if(isDebug){
               console.log("シンボルが設定されてないよ");
            }
            return null;
        }

        return {
            enableSwitch:Number(obj.enableSwitch ||0 ),
            symbol:String(obj.symbol),
            text:String(obj.text),
            eventId:eventId_,
            keyList:String(obj.keyList),
            keycodeList:parseNumbers(obj.keycodeList),
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
    const result= {
        eventList:createCommonEventList(params),
        isDebug : isDebug,
    };
    return result
})();

(function(){



    /**
     * @param {Number} keycode 
     * @param {String} symbol 
     */
    function setKeySymbol(keycode,symbol){
        const preDef =Input.keyMapper[keycode ];
        if(preDef){
//            console.log("上書き警告("+keycode+"):"+preDef+"を"+symbol+"に上書きしようとしています");
        }
//        console.log("keycode:"+keycode+"に"+symbol);
        Input.keyMapper[keycode ] =symbol;
        console.log(Input.keyMapper[keycode ]);
    }


    setting.eventList.forEach(function(data){
        if(!data){return;}

        const keyListLen = data.keyList.length;
        for(var i=0; i < keyListLen; ++i){
            setKeySymbol( data.keyList.charCodeAt(i)  ,data.symbol);
        }

        for (const keycode of data.keycodeList) {
            setKeySymbol(keycode,data.symbol);
        }

        if( (  data.padButtonNumber)>=0){
//            console.log("button"+data.padButtonNumber+"="+data.symbol);
            Input.gamepadMapper[ data.padButtonNumber]=data.symbol;
        }

        MA_InputSymbols.push({
            mandatory:data.mandatory,
            text:data.text,
            symbol:data.symbol,
        });
    });
})();

function createOneButtonEvents2(){
   return setting.eventList.map(function(e,index){
       const result = new MA_OneButtonCommonEvent(index);
       return result;
   });
}
const Game_Map_initialize=Game_Map.prototype.initialize;
Game_Map.prototype.initialize =function(){
    Game_Map_initialize.apply(this,arguments);
    this.initOneButtonEvents();
};

Game_Map.prototype.initOneButtonEvents =function(){
    if(!this._oneButtonEvents){
        this._oneButtonEvents =createOneButtonEvents2();
    }
};


const  Game_Map_updateEvents=Game_Map.prototype.updateEvents;
Game_Map.prototype.updateEvents =function(){
    for (const one of this._oneButtonEvents) {
        if(one){
            one.update();
        }
    }
    Game_Map_updateEvents.call(this);
};

const DataManager_extractSaveContents=DataManager.extractSaveContents;
DataManager.extractSaveContents=function(contents){
    DataManager_extractSaveContents.call(this,contents);
    $gameMap.initOneButtonEvents();
    for (const iterator of $gameMap._oneButtonEvents) {
        iterator.onLoad();
    }
};

return {
    Event:MA_OneButtonCommonEvent,
};

})();
