//=============================================================================
// Mano_GamePadConfig.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017-2017 Sigureya
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 0.9.0 2017/04/13 初版 
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/Sigureya/
//=============================================================================


/*:
 * @plugindesc ゲームパッドの設定を変更するプラグインです。
 * ユーザーが入力を拡張する場合の補助も行います
 * @author しぐれん
 * 
 *
 * @param defaultGamepadMapper
 * @desc ゲーム初期時のボタン配置です。
 * 「初期設定に戻す」を押した場合、これが読み込まれます。
 * @type select
 * @option ツクールMVデフォルト
 * @value 0
 * @option MVデフォルト＋決定/キャンセル入れ替え
 * @value 1
 * @default 1
 * 
 * @param textApply
 * @desc 設定を適用するコマンドです。
 * 選択するとコンフィグが終了します。
 * @default 設定を保存
 * @parent text
 * 
 * @param textRollback
 * @desc コンフィグ開始前の状態に戻すコマンドです。
 * @default 変更前に戻す
 * 
 * @param textDefault
 * @desc 初期設定に戻すコマンドです。
 * @default 初期設定に戻す
 * 
 * @param textExit
 * @desc コンフィグを終了するときのコマンドです。
 * @default やめる
 * 
 * @param textEmpty
 * @desc 何も割り当てられていない時の説明
 * Explanation when no function is assigned
 * @default 設定を消去
 * @parent text
 * 
 * @param textOK
 * @desc okの機能の説明
 * Description of ok's function
 * @default 決定
 * @parent text
 * 
 * @param textCancel
 * @desc cancelの機能の説明
 * Description of cancel function
 * @default 取り消し
 * @parent text
 * 
 * @param textShift
 * @desc shiftの機能の説明
 * Description of shift function
 * @default ダッシュ
 * @parent text
 * 
 * @param textMenu
 * @desc menuの機能の説明
 * @default メニュー
 * @parent text
 * 
 * @param textPageup
 * @desc pageupの機能の説明
 * @default 前
 * @parent text
 * 
 * @param textPagedown
 * @desc pagedownの機能の説明
 * @default 次
 * @parent text
 * 
 * @param textEscape
 * @desc escapeの機能の説明(キャンセルとメニューを兼ねたキー)
 * @default キャンセル/メニュー
 * @parent text
 * 
 * @param textSymbol6
 * @desc ユーザー拡張アクション6の説明
 * ※6なのは、既存の機能を0から数えているためです。
 * @default アクション6
 * 
 * @param extendSymbol6
 * @desc ユーザー拡張アクション6です。
 * Input.pressed('ここで設定した文字')で入力を取得できます。
 * @parent textSymbol6
 * 
 * @param textSymbol7
 * @desc ユーザー拡張アクション7の説明
 * @default アクション7
 * 
 * @param extendSymbol7
 * @desc ユーザー拡張アクション7です。
 * Input.pressed('ここで設定した文字')で入力を取得できます。
 * @parent textSymbol7
 * 
 * @param textSymbol8
 * @desc ユーザー拡張アクション8の説明
 * @default アクション8
 * @param extendSymbol8
 * @desc ユーザー拡張アクション8です。
 * Input.pressed('ここで設定した文字')で入力を取得できます。
 * @parent textSymbol8
 * 
 * 
 * @param symbols
 * @desc コンフィグでの変更先の一覧です。
 * ユーザー定義のコマンドも混ぜることができます。
 * @default ["ok","cancel","shift","menu","pageup","pagedown"]
 * @type combo[]
 * @option ok
 * @option cancel
 * @option shift
 * @option menu
 * @option pageup
 * @option pagedown
 * 
 * @param mandatorySymbols
 * @desc 必須シンボルです。
 * これらのシンボル全てがある場合のみ、変更を保存できます。
 * @type combo[]
 * @option ok
 * @option cancel
 * @option shift
 * @option menu
 * @option pageup
 * @option pagedown
 * @default ["ok","cancel","menu"]
 * 
 * @param buttons
 * @desc 使用できるボタンの一覧です。
 * 並び順の制御を兼ねています。
 * @type number[]
 * @default ["1","0","3","2","4","5","6","7","8","9","10","11","16"]
 * 
 * @param button0
 * @desc PS2コントローラ：×
 * @default {"buttonName":"B","action":""} 
 * @type struct<ButtonInfo>
 * @parent buttons
 * 
 * @param button1
 * @desc PS2コントローラ:〇
 * @type struct<ButtonInfo>
 * @default {"buttonName":"A","action":""}
 * @parent buttons
 * 
 * @param button2
 * @desc PS2コントローラ：□
 * @type struct<ButtonInfo>
 * @default {"buttonName":"Y","action":""}
 * @parent buttons
 * 
 * @param button3
 * @desc PS2コントローラ：△
 * @type struct<ButtonInfo>
 * @default {"buttonName":"X","action":""}
 * @parent buttons
 * 
 * @param button4
 * @desc PS2コントローラ：L1
 * @type struct<ButtonInfo>
 * @default {"buttonName":"L1","action":""}
 * @parent buttons
 * 
 * @param button5
 * @desc PS2コントローラ：R1
 * @type struct<ButtonInfo>
 * @default {"buttonName":"R1","action":""}
 * @parent buttons
 * 
 * @param button6
 * @desc PS2コントローラ：L2
 * @type struct<ButtonInfo>
 * @default {"buttonName":"L2","action":""}
 * @parent buttons
 * 
 * @param button7
 * @desc PS2コントローラ：R2
 * @type struct<ButtonInfo>
 * @default {"buttonName":"R2","action":""}
 * @parent buttons
 * 
 * @param button8
 * @desc PS2コントローラ：select
 * @type struct<ButtonInfo>
 * @default {"buttonName":"select","action":""}
 * @parent buttons
 * 
 * @param button9
 * @desc PS2コントローラ：start
 * @type struct<ButtonInfo>
 * @default {"buttonName":"start","action":""}
 * @parent buttons
 * 
 * @param button10
 * @desc PS2コントローラ：
 * @type struct<ButtonInfo>
 * @default {"buttonName":"button10","action":""}
 * @parent buttons
 * 
 * @param button11
 * @desc PS2コントローラ：
 * @type struct<ButtonInfo>
 * @default {"buttonName":"button11","action":""}
 * @parent buttons
 * 
 * @param moveButtons
 * @desc 十字キーをコンフィグ範囲に含めます。
 * 自動的に上下左右が必須ボタンに追加されます。
 * @type boolean
 * @default false
 * 
 * @param button12
 * @desc 上キー/UP_BUTTON
 * @type struct<ButtonInfo>
 * @default {"buttonName":"UP","action":""}
 * @parent moveButtons
 * 
 * @param textUp
 * @desc 上ボタンの説明
 * @default ↑
 * @parent moveButtons
 * 
 * @param button13
 * @desc 下キー/DOWN_BUTTON
 * @type struct<ButtonInfo>
 * @default {"buttonName":"DOWN","action":""}
 * @parent moveButtons
 * 
 * @param textDown
 * @desc 下ボタンの説明
 * Description of ok's function
 * @default ↓
 * @parent moveButtons
 * 
 * @param button14
 * @desc 左キー/LEFT_BUTTON
 * @type struct<ButtonInfo>
 * @default {"buttonName":"LEFT","action":""}
 * @parent moveButtons
 * 
 * @param textLeft
 * @desc 左の説明
 * @default ←
 * @parent moveButtons
 * 
 * @param button15
 * @desc 右キー/RIGHT_BUTTON
 * @type struct<ButtonInfo>
 * @default {"buttonName":"RIGHT","action":""}
 * @parent moveButtons
 * 
 * @param textRight
 * @desc 右の説明
 * @default →
 * @parent moveButtons
 * 
 * @param button16
 * @desc PS2コントローラ：
 * @type struct<ButtonInfo>
 * @default {"buttonName":"button16","action":""}
 * @parent buttons
 * @param button_unknow
 * 
 * @param windowPositionMode
 * @desc ウィンドウの位置
 * @type boolean
 * @on 中央
 * @off 数値指定
 * @default true
 * 
 * @param windowPositionX
 * @desc ウィンドウのX座標です。
 * @type number
 * @default 100
 * @parent windowPositonMode
 * 
 * @param windowPositionY
 * @desc ウィンドウのY座標です。
 * @type number
 * @default 100
 * @parent windowPositonMode
 * 
 * @param gamepadWindowItemWitdh
 * @desc 描画領域です。
 * ウィンドウのサイズはこれ*cols+paddingになります。
 * @type number
 * @default 260
 * 
 * @param numVisibleRows
 * @desc 表示する縦方向の要素数です
 * @type number
 * @default 16
 * 
 * @param cols
 * @desc ゲームパッドコンフィグの横方向の要素数です
 * @type number
 * @min 1
 * @default 2
 *  
 * @param textKeyUp
 * @desc キーコンフィグの上キーの表示名です
 * @default ↑
 * 
 * @param textKeyDown
 * @desc キーコンフィグの下キーの表示名です
 * @default ↓
 * 
 * @param textKeyRight
 * @desc キーコンフィグの右キーの表示名です
 * @default →
 * 
 * @param textKeyLeft
 * @desc キーコンフィグの左キーの表示名です
 * @default ←
 * 
 * @param symbolWindowWidth
 * @desc シンボルの種類を選択するウィンドウの幅
 * @type number
 * @default 148
 * 
 * @param symbolAutoSelect
 * @desc キーに対応するシンボルを切り替えるときに、
 * そのキーに設定されているシンボルへ自動でカーソルを合わせます。
 * @type boolean
 * @on シンボルに合わせる
 * @off 先頭に合わせる
 * @default true
 * 
 * @param commandName
 * @desc ゲームパッドコンフィグを開くコマンドの名前です
 * @type string
 * @default ゲームパッドコンフィグ
 * 
 * @param keyconfigCommandName
 * @desc キーコンフィグを開くコマンドの名前です
 * @type string
 * @default キーコンフィグ
 * 
 * @param hookPoint
 * @desc ゲームパッドコンフィグの開き方を設定します。
 * プラグイン導入順によって前後することがあります。
 * @type select
 * @option オプション画面の一番後ろ
 * @value option
 * @option 音量設定の前
 * @value beforeVolume
 * @option 音量設定の後ろ
 * @value afterVolume
 * @option タイトル/メニューから開く
 * @value menu
 * @default option
 * 
 * 
 * @help
 * ゲームの起動時の設定をデフォルト値として読み込みます。
 * このプラグインよりも早く、
 * Input.gamepadMapperが変更されていた場合、
 * それを初期値として扱います。
 * 
 * ■extendActions
 * 定義することで、新たなアクションを定義できます。
 * ここにKeyと入力した場合、Input.isPressed('Key')で入力を取得できます。
 * symbolsに登録するのを忘れないようにしてください
 * 
 * ■symbolsについて
 * ボタン選択画面で決定を押した後の一覧で表示する順番を定義します。
 * 
 * ■mandatorySymbolsについて
 * ゲームを操作するうえで、必須となるボタンの一覧です。
 * 決定や取り消しの設定を変更してゲームが動かなくなると困るので、
 * 一部のボタンが欠けている状態では設定の保存ができません。
 * 初期設定では決定・取り消し・メニューの3つが割り当てられています。
 * 
 * ゲームパッドでは比較的問題が少ないのですが、
 * キーボードだと問題が発生します。
 * insertキーは、一部のPCでは機能しづらいです。
 * 
 * ■ボタンの第2パラメータ・actionについて
 * 本来はsymbolになるはずだったデータです。
 * デフォルトの設定に加えて、
 * ここに設定した内容を上書きで追加した物が初期設定になります。
 * 
 * ■新規シンボルの設定について
 * ゲーム固有の操作を設定する場合、ここで行います。
 * たとえば弾を発射するshotというシンボルを新たに設定したいとします。
 * この場合textSymbol6で「シンボルの説明」を設定します。
 * 次にextendSymbol6に「shot」と入力します。
 * 次にsymbolsにshotを追加します。
 * ゲーム中常に使うのであれば、mandatorySymbolsにも追加します。
 * これをすべて終えれば、input.pressed('shot')などで
 * 入力状態を取得できるようになります。
 * 
 * 更新履歴
 * 2017/10/13 ver 1.9　公開
 * キーボードのコンフィグにも対応。
 * 仕様が固まっていないので、1.9とします。
 * 2017/10/05 ver 1.0　公開
 * 
 * 謝辞
 * KeyBoradConfig部分の作成に当たって、YEP_KeyboardConfig.jsを参考にしました。
 * Yanfly様、素敵なプラグインの作成、ありがとうございます。
 * 
 * I made it as KeyBoradConfig part and looked at YEP_KeyboardConfig.js.
 * Yanfly.Thank you for creating a nice plugin!
 */
/**
 * TODO:適当にボタンを押させて、対応したボタンの部分にカーソル合わせる機能
 * 仕様を変えて、ガチャガチャ押して入力状態を表示するヤツ
 * 
 */
/*~struct~ButtonInfo:
 *
 * @param buttonName
 * @desc ボタンの名前
 * 
 * @param action
 * @desc 割り当てる機能
 * @type combo
 * @option ok
 * @option cancel
 * @option shift
 * @option menu
 * @option pageup
 * @option pagedown
 * @default 
 */


(function(global){
    'use strict'

/**
 * @param {*} param 
 */
function fetchButtonInfo(param){
    const p = JSON.parse(param);
    return {buttonName:String(p.buttonName),symbol:String(p.action)};
}
/**
 * @return {String[]}
 */
function paramToActionKeys(params){
    return JSON.parse(params.symbols);
}

const moveSymbols =['up','down','left','right']
/**
 * @return {string[]}
 */
function createMandatorySymbols(params){
    return JSON.parse(params.mandatorySymbols);
    return array;
}

function insertExtendAction(helpText,params){
    for(var i=6; i <=8; ++i){
        var actionKey = String(params['extendSymbol'+i]);
        if(actionKey){
            helpText[actionKey] = helpText['symbol'+i];
        }
    }
}
/**
 * @return {String[]}
 * @param {any} params 
 */
function createButtonList(params){
    return JSON.parse(params.buttons);
}

function makeKeyboardSamples(){
    const RPGmakerDefault =Object.assign({},  Input.keyMapper);
    return [RPGmakerDefault];
}

function makeConfigSamples(){
    const RPGmakerDefault =Object.assign({},  Input.gamepadMapper);
    const ab_swaped =Object.assign({},  Input.gamepadMapper);
    ab_swaped[0] = RPGmakerDefault[1];
    ab_swaped[1] = RPGmakerDefault[0];
    return [RPGmakerDefault,ab_swaped];
}

function symbolToButtonNumber(symbol){
    for(var key in Input.gamepadMapper){
        if(Input.gamepadMapper[key]===symbol){
            return key;
        }
    }
    return ''
}

function symbolToButtonName(symbol){
    return buttonName(symbolToButtonNumber(symbol));
}


function createSetting(){
    
    const params =PluginManager.parameters('Mano_InputConfig');
    const helpText ={
        ok:String(params.textOK),
        cancel:String(params.textCancel),
        shift:String(params.textShift),
        menu:String(params.textMenu),
        pageup:String(params.textPageup),
        pagedown:String(params.textPagedown),
        symbol6 :String(params.textSymbol6),
        symbol7 :String(params.textSymbol7),
        symbol8 :String(params.textSymbol8),
        up:String(params.textUp),
        down:String(params.textDown),
        left:String(params.textLeft),
        right:String(params.textRight),
        escape:String(params.textEscape),
    };
    const commandText={
        apply:String(params.textApply),
        rollback:String(params.textRollback),
        default_:String(params.textDefault),
        exit:String(params.textExit),
    };

    insertExtendAction(helpText,params);

    const buttonInfo ={
        0:fetchButtonInfo(params.button0),
        1:fetchButtonInfo(params.button1),
        2:fetchButtonInfo(params.button2),
        3:fetchButtonInfo(params.button3),
        4:fetchButtonInfo(params.button4),
        5:fetchButtonInfo(params.button5),
        6:fetchButtonInfo(params.button6),
        7:fetchButtonInfo(params.button7),
        8:fetchButtonInfo(params.button8),
        9:fetchButtonInfo(params.button9),        
        10:fetchButtonInfo(params.button10),        
        11:fetchButtonInfo(params.button11),        
        12:fetchButtonInfo(params.button12),
        13:fetchButtonInfo(params.button13),
        14:fetchButtonInfo(params.button14),
        15:fetchButtonInfo(params.button15),
        16:fetchButtonInfo(params.button16),
    };

    const keyText ={
        up:String(params.textKeyUp),
        down:String(params.textKeyDown),
        right:String(params.textKeyRight),
        left:String(params.textKeyLeft),        
    };
    const configSamples =makeConfigSamples(buttonInfo);
    for(var key in buttonInfo){
        const x = buttonInfo[key];
        if(x.symbol){
            configSamples.forEach(function(sample){
                sample[key] =x.symbol;
            });
        }
    }
    const keyConfigSamples = makeKeyboardSamples();
    const result= {
        keyText:keyText,
        commandText:commandText,
        emptySymbolText:String(params.textEmpty),
        actionKey:paramToActionKeys(params),
        symbolText:helpText,
        buttonInfo:buttonInfo,
        buttonList: createButtonList(params),
        mandatorySymbols:createMandatorySymbols(params),
        symbolAutoSelect:(params.symbolAutoSelect==='true'),
        configSamples :configSamples,
        keyConfigSamples:keyConfigSamples,

        configIndex:Number(params.defaultGamepadMapper),
        windowSymbolListWidht:Number(params.windowSymbolListWidth),
        hookPoint:String(params.hookPoint),
        commandName:String(params.commandName),
        keyConfigCommandName:String(params.keyconfigCommandName),
        
        moveButtonsConfig:(params.moveButtons ==='true'),

        windowPostionMode :(params.windowPositionMode==='true'),
        windowCustom:{
            x:Number(params.windowPositionX),
            y:Number(params.windowPositionY),
            gamepadWidth :Number(params.gamepadWindowItemWitdh),
            symbolWidth:Number(params.symbolWindowWidth),
        },
        numVisibleRows:Number(params.numVisibleRows),
        cols:Number(params.cols),
    };
    if(result.moveButtonsConfig){
        Array.prototype.push.apply( result.mandatorySymbols,moveSymbols); 
        Array.prototype.push.apply( result.actionKey,moveSymbols);         
        Array.prototype.push.apply(result.buttonList,['12','13','14','15']);
    }

//    result.actionKey.push(null);

    return result;
};

/**
 * 
 * @param {String} symbol 
 * @return {string}
 */
function symbolToText(symbol){
    return setting.symbolText[symbol];
};

/**
 * @return {string}
 * @param {number} buttonNumber 
 */
function buttonName(buttonNumber){
    return setting.buttonInfo[buttonNumber].buttonName;
}
/**
 * @return {string}
 * @param {number} buttonNumber 
 */
function buttonAction(buttonNumber){
    return Input.gamepadMapper[buttonNumber];    
};

//ツクールのデフォルトと同様の設定です
function RPGmakerDefault(){
    return Object.assign({},setting.configSamples[setting.configIndex]);
}

function createKeyboradMapper(){
    return setting.keyConfigSamples[0];
}

function createGamepadMapper(){
    const index = setting.configIndex;
    return setting.configSamples[index];
};
const setting = createSetting();
Input.gamepadMapper = createGamepadMapper();
const MA_KEYBOARD_CONFIG ='KEYBOARD_CONFIG';
const MA_GAMEPAD_CONFIG = 'GAMEPAD_CONFIG';
function readGamePadConfig( config ){
    const value = config[MA_GAMEPAD_CONFIG];
    if(value){
        return value;
    }
    return createGamepadMapper();
}
function readKeyboardConfig(config){
    const value =config[MA_KEYBOARD_CONFIG];
    if(value){
        return value;
    }
    return createKeyboradMapper();
}

const  ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData =function(){
    const result = ConfigManager_makeData.call(this);
    result[MA_GAMEPAD_CONFIG] =Input.gamepadMapper;
    result[MA_KEYBOARD_CONFIG] = Input.keyMapper;
    return result;
};
const ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData =function(config){
    ConfigManager_applyData.call(this,config);
    Input.gamepadMapper = readGamePadConfig(config);
    Input.keyMapper =readKeyboardConfig(config);
    Input.clear();
};
class ButtonActionItem {
    /**
     * @param {number} buttonNumber 
     */
    constructor(buttonNumber){
        this.actionKey =String(Input.gamepadMapper[buttonNumber]);
        this.name =String(buttonName(buttonNumber )||'');
        this.buttonNumber = buttonNumber;
    }
};
function createNormalizedInputMapper(mapper){
    var result={};
    for(var key in mapper){
        var val =mapper[key];
        if(val){
            result[key] = val
        }
    }
    return result;
}

function inputMapperHasSymbol(mapper,symbol){
    for(var key in mapper){
        if(mapper[key]===symbol){
            return true;
        }
    }
    if(Input._isEscapeCompatible(symbol)){
        for(var key in mapper){
            if(mapper[key]==='escape'){
                return true;
            }
        }
    }
    return false;
}

function isValidMapper(mapper){
    for(var i=0; i < setting.mandatorySymbols.length;++i){
        var symbol = setting.mandatorySymbols[i];
        if(!inputMapperHasSymbol( mapper , setting.mandatorySymbols[i])){
            return false;
        }
    }
    return true;
}

function Window_InputSymbolList(){
    this.initialize.apply(this,arguments);    
}
Window_InputSymbolList.baseType = Window_Selectable.prototype;
Window_InputSymbolList.prototype = Object.create(Window_InputSymbolList.baseType);
Window_InputSymbolList.prototype.constructor = Window_InputSymbolList;

/**
 * @param {Window_GamepadConfig_MA} mainWidnow
 */
Window_InputSymbolList.prototype.initialize=function(x,y,useEscape){
    this._usingEscape=!!useEscape;
    this.makeCommandList();
    
    const width  =setting.windowCustom.symbolWidth;// (Graphics.boxWidth -x).clamp(148,180);
    
    const height = this.windowHeight();//+this.itemHeight();
    Window_InputSymbolList.baseType.initialize.call(this,x,y,width, height);
    this.deactivate();
    this.deselect();
};

/**
 * @return {String}
 */
Window_InputSymbolList.prototype.symbol=function(){
    return this.currentItem().symbol;
};
Window_InputSymbolList.prototype.moveCenter =function(){
    const x = Graphics.boxWidth/2 - this.width/2;
    const y = Graphics.boxHeight/2 -this.height/2
    this.move(x,y,this.width,this.height);

};
Window_InputSymbolList.prototype.windowHeight =function(){
    return this.fittingHeight(this.maxItems());
};
Window_InputSymbolList.prototype.maxItems =function(){
    return this._list.length;

};
Window_InputSymbolList.prototype.findSymbol =function(symbol){
    for(var i=0;i <this._list.length;++i ){
        if(this._list[i].symbol ===symbol){
            return i;
        }
    }
    return -1;
};

Window_InputSymbolList.prototype.selectSymbol =function(action){
    const index = this.findSymbol(action);
    if(this._list[index]){
        this.select(index);
    }else{
        this.select(0);
    }
};
/**
 * @param {string} name
 * @param {string} symbol
 */
Window_InputSymbolList.prototype.addCommand = function(name, symbol,  ext) {
    if (ext === undefined) {
        ext = null;
    }
    this._list.push({
        name: name,
        symbol: symbol,
        ext: ext
    });
};
Window_InputSymbolList.prototype.symbol =function(index){
    return this._list[index].symbol;
};
Window_InputSymbolList.prototype.currentSymbol =function(){
    const index =this.index();
    if(index>=0){
        return this.symbol(index);
    }
    return null;
};

Window_InputSymbolList.prototype.makeCommandList =function(){
    this._list =[];
    for(var i=0; i <setting.actionKey.length; ++i){
        const actionKey = setting.actionKey[i];
        this.addCommand( symbolToText(actionKey)||setting.emptySymbolText ,actionKey,'テスト'+i);
    }
    this.addCommand(setting.emptySymbolText,null);
};
/**
 * @param {number} index
 * @return {string}
 */
Window_InputSymbolList.prototype.symbolName =function(index){
    return this._list[index].name;
};

Window_InputSymbolList.prototype.drawItem =function(index){
    const rect =this.itemRectForText(index);
    this.drawText(this.symbolName(index),rect.x,rect.y,rect.width)
};

Window_InputSymbolList.prototype.callOkHandler =function(){
    Window_InputSymbolList.baseType.callOkHandler.call(this);
};

function Window_GamepadConfig_MA(){
    this.initialize.apply(this,arguments);    
}
Window_GamepadConfig_MA.baseType = Window_Selectable;
Window_GamepadConfig_MA.prototype = Object.create(Window_GamepadConfig_MA.baseType.prototype);
Window_GamepadConfig_MA.prototype.constructor = Window_GamepadConfig_MA;

Window_GamepadConfig_MA.prototype.initialize=function(){
    this.setGamepadMapper(Input.gamepadMapper);
    const h = this.windowHeight();
    const w = this.windowWidth();
    const x =setting.windowPostionMode ? (Graphics.boxWidth - w) / 2:setting.windowCustom.x;
    const y = setting.windowPostionMode?(Graphics.boxHeight - h) / 2:setting.windowCustom.y;

    Window_GamepadConfig_MA.baseType.prototype.initialize.call(this,x,y,w,h);
    this.defineNameWidth();
    this.defineSymbolTextWidth();
    this.readGamePad();
//    this.moveCenter();
};
Window_GamepadConfig_MA.prototype._updateGamepadState =function(gamepad){

};

Window_GamepadConfig_MA.prototype.readGamePad =function(){
    if (navigator.getGamepads) {
        var gamepads = navigator.getGamepads();
        if (gamepads) {
            var gamepad = gamepads[1];
            if (gamepad && gamepad.connected) {
                this._updateGamepadState(gamepad);
            }
        }
    }    
};

Window_GamepadConfig_MA.prototype.callExitHandler =function(){
    this.callHandler('exit');
};
Window_GamepadConfig_MA.prototype.callApplyHandler =function(){
    this.callHandler('apply');
};
Window_GamepadConfig_MA.prototype.processApply =function(){
    if(this.canApplySetting() && this.active){
        this.updateInputData();
        this.deactivate();    
        SoundManager.playEquip();
        this.callApplyHandler();
    }else{
        this.playBuzzerSound();
    }
};
Window_GamepadConfig_MA.prototype.cursorDown = function(wrap) {
    var index = this.index();
    var maxItems = this.maxItems();
    var maxCols = this.maxCols();

    if(wrap ||index < maxItems - maxCols )
    {
        this.select((index + maxCols) % maxItems);
    }
};

Window_GamepadConfig_MA.prototype.cursorUp = function(wrap) {
    var index = this.index();
    var maxItems = this.maxItems();
    var maxCols = this.maxCols();
    if (index >= maxCols || (wrap )) {
        this.select((index - maxCols + maxItems) % maxItems);
    }
};

// Window_GamepadConfig_MA.prototype.cursorRight = function(wrap) {
//     var index = this.index();
//     var maxItems = this.maxItems();
//     var maxCols = this.maxCols();
//     if (maxCols >= 2 && (index < maxItems - 1 || wrap) ) {
//         this.select((index + 1) % maxItems);
//     }
// };

// Window_GamepadConfig_MA.prototype.cursorLeft = function(wrap) {
//     var index = this.index();
//     var maxItems = this.maxItems();
//     var maxCols = this.maxCols();
//     if (maxCols >= 2 && (index > 0 || (wrap ))) {
//         this.select((index - 1 + maxItems) % maxItems);
//     }
// };



Window_GamepadConfig_MA.prototype.callDefaultHandler =function(){
    this.callHandler('default');
};

Window_GamepadConfig_MA.prototype.processDefault =function(){
    SoundManager.playEquip();
    this.callDefaultHandler();
};

Window_GamepadConfig_MA.prototype.processOk =function(){
    const index =this.index();
    if(index <0){
        return;
    }
    if(index===this.defaultCommandIndex()){
        this.processDefault();
        return;
    }
    if(index ===this.applyCommandIndex()){
        this.processApply();
        return;
    }
    if(index ===this.exitCommandIndex()){
        SoundManager.playCancel();
        this.callCancelHandler();
        return;
    }
    this.updateInputData();
    this.deactivate();
    this.playOkSound();
    this.callOkHandler();
};
Window_GamepadConfig_MA.prototype.processCancel =function(){
    SoundManager.playCancel();
    this.updateInputData();
    const index = this.index();
    const cancellationIndex = this.exitCommandIndex();
    if(index ===cancellationIndex){
        this.callCancelHandler();
    }else{
        this.select(cancellationIndex);
    }
};
Window_GamepadConfig_MA.prototype.windowWidth =function(){
    return setting.windowCustom.gamepadWidth * this.maxCols();
};
Window_GamepadConfig_MA.prototype.maxCols =function(){
    return setting.cols;
};
 Window_GamepadConfig_MA.prototype.numVisibleRows = function() {
    return Math.ceil(this.maxItems() / this.maxCols());
};

Window_GamepadConfig_MA.prototype.windowHeight =function(){
    return this.fittingHeight( Math.min( setting.numVisibleRows,this.numVisibleRows()));
};

Window_GamepadConfig_MA.prototype.makeMandatorySymbolTable =function(){
    var table ={};
    for(var i=0; i< setting.mandatorySymbols.length; ++i){
        var symbol = setting.mandatorySymbols[i];
        table[symbol]=0;
    }
    for(var key in this._map){
        var symbol2 = this._map[key];
        if(table.hasOwnProperty(symbol2)){
            table[symbol2]+=1;
        }
    }
    this._mandatorySymbols =table;
};
/**
 * @return {number}
 */
Window_GamepadConfig_MA.prototype.configItems =function(){
    return this._list.length;
};
Window_GamepadConfig_MA.prototype.setGamepadMapper =function(map){
    this._map = Object.assign({}, map);
    this.makeItemList();
};
Window_GamepadConfig_MA.prototype.cloneGamepadMapper= function(){
    return createNormalizedInputMapper(this._map);
};
/**
 * @param {string}  buttonNumber
 * @return {string} actionKey
 */
Window_GamepadConfig_MA.prototype.getAction =function(buttonNumber){
    return this._map[buttonNumber];
};
Window_GamepadConfig_MA.prototype.currentSymbol =function(){
    return this.symbol(this.index());
    return this._list[ this.index()].action;
};
/**
 * @param {number} index
 * @return {string} buttonNumber
 */
Window_GamepadConfig_MA.prototype.buttonNumber =function(index){
    return this._list[index].buttonNumber;
};
/**
 * @param {number} index
 * @return {string} buttonName
 */
Window_GamepadConfig_MA.prototype.buttonName =function(index){
    return this._list[index].name;
};
/**
 * @param {number} index
 * @return {string} symbol
 */
Window_GamepadConfig_MA.prototype.symbol =function(index){
    const buttonNumber = this.buttonNumber(index);
    return this._map[buttonNumber];
};
/**
 * @param {number} index
 * @return {string} symbol
 */
Window_GamepadConfig_MA.prototype.symbolText =function(index){
    return symbolToText(this.symbol(index));
};


Window_GamepadConfig_MA.prototype.addCommand =function(buttonNumber_){
    const index =this._list.length;
    this._list.push({
        name:buttonName(buttonNumber_),
        buttonNumber:buttonNumber_
    });
    this.setButtonItem(index,buttonNumber_);
};

Window_GamepadConfig_MA.prototype.setButtonItem =function(index,buttonNumber){
    const action = this.getAction(buttonNumber);
    const text= symbolToText(action) || '';
    const item = this._list[index];
    item.action = action;
    item.text = text;
};
Window_GamepadConfig_MA.prototype.makeItemList =function(){
    this._list =[];
    const length = setting.buttonList.length;
    for(var i=0; i<length; i+=1 ){
        var buttonId =setting.buttonList[i];
        this.addCommand(buttonId);
    }
};
Window_GamepadConfig_MA.prototype.defineSymbolTextWidth =function(){
    var width =0;
    for(var key in setting.symbolText){
        width = Math.max(width,this.textWidth( setting.symbolText[key] ));
    }
    this._symbolTextWidth =width;
};
/**
 * @return {number}
 */
Window_GamepadConfig_MA.prototype.symbolTextWidth =function(){
    return this._symbolTextWidth;
};

Window_GamepadConfig_MA.prototype.defineNameWidth =function(){
    var width =0;
    for(var i=0; i < this._list.length;++i){
        width = Math.max(width,this.textWidth(this.buttonName(i)));
    }
    this._nameWidth =width;
};
/**
 * @return {number}
 */
Window_GamepadConfig_MA.prototype.nameWidth =function(){
    return this._nameWidth;
};
/**
 * @param {number} index
 */
Window_GamepadConfig_MA.prototype.changeKeyMap =function(index,newSymbol){
    const buttonNumber= this.buttonNumber(index);
    this._map[buttonNumber]=newSymbol;
    this.redrawItem(index);
    this.redrawApplyCommand();
};
Window_GamepadConfig_MA.prototype.drawAllItems = function() {
    var topIndex = this.topIndex();
    for (var i = 0; i < this.maxPageItems(); i++) {
        var index = topIndex + i;
        if (index < this._list.length) {
            this.drawItem(index);
        }
    }
    this.drawExitCommand();
    this.drawApplyCommand();
    this.drawDefaultCommand();
};

Window_GamepadConfig_MA.prototype.drawItem =function(index){
    this.changeTextColor(this.normalColor());
    const rect = this.itemRectForText(index);
    this.drawText(this.buttonName(index)  ,rect.x,rect.y);
    const nameWidth =this.nameWidth();
    const symbolWidth = rect.width -nameWidth;
    this.drawText(this.symbolText(index)  ,rect.x +nameWidth + this.textPadding() ,rect.y,symbolWidth);
};
Window_GamepadConfig_MA.prototype.hasSymbol =function(symbol){
    for(var key in this._map){
        if(this._map[key]===symbol){
            return true;
        }
    }
    return false;
};

Window_GamepadConfig_MA.prototype.canApplySetting =function(){
    return isValidMapper(this._map);
};
Window_GamepadConfig_MA.prototype.exitCommandIndex =function(){
    return this._list.length+2;
};
Window_GamepadConfig_MA.prototype.applyCommandIndex =function(){
    return this._list.length+1;
};
Window_GamepadConfig_MA.prototype.defaultCommandIndex =function(){
    return this._list.length;    
};
Window_GamepadConfig_MA.prototype.redrawApplyCommand =function(){

    this.clearItem(this.applyCommandIndex());
    this.drawApplyCommand();
};

Window_GamepadConfig_MA.prototype.drawDefaultCommand =function(){
    const index= this.defaultCommandIndex();
    const rect = this.itemRectForText(index);
    this.drawText(setting.commandText.default_,rect.x,rect.y,rect.width);
};

Window_GamepadConfig_MA.prototype.drawExitCommand =function(){
    const index = this.exitCommandIndex();
    const rect = this.itemRectForText(index);
    this.drawText(setting.commandText.exit,rect.x,rect.y,rect.width);
};

Window_GamepadConfig_MA.prototype.drawApplyCommand =function(){
    const ok =this.canApplySetting();
    const index = this.applyCommandIndex();
    this.changePaintOpacity(ok);
    const rect = this.itemRectForText(index);
    this.drawText(setting.commandText.apply,rect.x,rect.y,rect.width);
    this.changePaintOpacity(true);
};
    
Window_GamepadConfig_MA.prototype.maxItems =function(){
    return this._list.length+3;    
};

/**
 * @param {number} index
 * @return {ButtonActionItem}
 */
Window_GamepadConfig_MA.prototype.item=function(index){
    const item = this._list[index]
    if(item){
        return item;
    }
    return null;
};

function Scene_InputConfigBase_MA(){
    this.initialize.apply(this,arguments);    
}
Scene_InputConfigBase_MA.baseType = Scene_MenuBase.prototype;
Scene_InputConfigBase_MA.prototype = Object.create(Scene_InputConfigBase_MA.baseType);
Scene_InputConfigBase_MA.prototype.constructor = Scene_InputConfigBase_MA;

Scene_InputConfigBase_MA.prototype.currentSymbol =function(){
    return '';
};

Scene_InputConfigBase_MA.prototype.selectSymbol =function(){
    this._symbolListWindow.show();
    this._symbolListWindow.activate();
    if(setting.symbolAutoSelect){
        this._symbolListWindow.selectSymbol(this.currentSymbol());
    }else{
        this._symbolListWindow.select(0);
    }
};
/**
 * @return {Window_Selectable}
 */
Scene_InputConfigBase_MA.prototype.mainWidnow =function(){
    return null;
};
Scene_InputConfigBase_MA.prototype.changeSymbol =function(symbol){

};
Scene_InputConfigBase_MA.prototype.onSymbolListOk =function(){
    this.changeSymbol( this._symbolListWindow.currentSymbol());
    this.endActionSelect();
};
Scene_InputConfigBase_MA.prototype.onSymbolListCancel =function(){
    this.endActionSelect();
};

Scene_InputConfigBase_MA.prototype.endActionSelect =function(){
    this._symbolListWindow.deselect();
    this._symbolListWindow.hide();
    this.mainWidnow().activate();
};


Scene_InputConfigBase_MA.prototype.createSymbolListWindow =function(){
    const mainWidnow = this.mainWidnow();
    const x = mainWidnow.x +mainWidnow.width;
    const y = mainWidnow.y;

    const asw = new Window_InputSymbolList(x,y);
    asw.setHandler('ok',this.onSymbolListOk.bind(this));
    asw.setHandler('cancel',this.onSymbolListCancel.bind(this));
    asw.hide();
    asw.refresh();
    this.addWindow(asw);

    this._symbolListWindow =asw;
};


/**
 * @return {Rectangle}
 */
Scene_GamepadConfigMA.prototype.SymbolListWindowRect=function(){
    return new Rectangle(0,0,500,500);
};


function Scene_GamepadConfigMA(){
    this.initialize.apply(this,arguments);
}
Scene_GamepadConfigMA.baseType = Scene_InputConfigBase_MA.prototype;
Scene_GamepadConfigMA.prototype = Object.create(Scene_GamepadConfigMA.baseType);
Scene_GamepadConfigMA.prototype.constructor = Scene_GamepadConfigMA;

Scene_GamepadConfigMA.prototype.initialize =function(){
    Scene_GamepadConfigMA.baseType.initialize.apply(this,arguments);
};
/**
 * @param {object} [gamepadMapper=null] 読み込むコンフィグデータ 無指定の場合、現在の設定値を読み込む
 */
Scene_GamepadConfigMA.prototype.setGamepadMapper =function(gamepadMapper){
    if( this._gamepadWindow){
        this._gamepadWindow.setGamepadMapper(gamepadMapper);
        this._gamepadWindow.refresh();
    }
};

Scene_GamepadConfigMA.prototype.create=function(){
    Scene_GamepadConfigMA.baseType.create.call(this);
    this.createAllWindows();
};
Scene_GamepadConfigMA.prototype.createGamepadConfigWindow =function(){
    const gcw = new Window_GamepadConfig_MA(0,0);
    gcw.select(0);
    gcw.setHandler('ok',this.onConfigOk.bind(this));
    gcw.setHandler('cancel',this.onConfigCancel.bind(this));
    gcw.setHandler('apply',this.applyGamepadConfig.bind(this));
    gcw.setHandler('default',this.loadDefautConfig.bind(this));
    this._gamepadWindow =gcw;
    gcw.refresh();
    this.addWindow(gcw);
};
/**
 * @return {Rectangle}
 */
Scene_GamepadConfigMA.prototype.SymbolListWindowRect=function(){
    const x= this._gamepadWindow.x+this._gamepadWindow.width;    
    return new Rectangle(x,this._gamepadWindow.y,0,0);
};
Scene_GamepadConfigMA.prototype.changeSymbol =function(symbol){
    const index = this._gamepadWindow.index();

    this._gamepadWindow.changeKeyMap(index,symbol);
};
Scene_GamepadConfigMA.prototype.mainWidnow =function(){
    return this._gamepadWindow;
};
Scene_GamepadConfigMA.prototype.currentSymbol =function(){
    return this._gamepadWindow.currentSymbol();
};
Scene_GamepadConfigMA.prototype.loadDefautConfig =function(){
    this.setGamepadMapper(createGamepadMapper());
    this._gamepadWindow.activate();
};
Scene_GamepadConfigMA.prototype.terminate =function(){
    Scene_GamepadConfigMA.baseType.terminate.call(this);
    if(this._applyOnExit){
        Input.gamepadMapper =this._gamepadWindow.cloneGamepadMapper();
    }
};
Scene_GamepadConfigMA.prototype.applyGamepadConfig =function(){
    const test = this._gamepadWindow.canApplySetting();
    if(!test){
        throw( new Error( 'GamepadConfigが不正です'));
    }
    this._applyOnExit =true;

    this.popScene();
};

Scene_GamepadConfigMA.prototype.onConfigOk =function(){
    this.selectSymbol();
};

Scene_GamepadConfigMA.prototype.onConfigCancel =function(){
    SceneManager.pop();
};
Scene_GamepadConfigMA.prototype.createAllWindows =function(){
    this.createGamepadConfigWindow();
    this.createSymbolListWindow();
    this._gamepadWindow.activate();
};

function Window_KeyConfig_MA() {
    this.initialize.apply(this, arguments);
};
Window_KeyConfig_MA.baseType =Window_Selectable.prototype;
Window_KeyConfig_MA.prototype = Object.create(Window_KeyConfig_MA.baseType);
Window_KeyConfig_MA.prototype.constructor = Window_KeyConfig_MA;
Window_KeyConfig_MA.prototype.initialize =function(){
    this.setKeyboradMapper(Input.keyMapper);
    const height =this.fittingHeight( 12 );
    Window_KeyConfig_MA.baseType.initialize.call(this,0,0,Graphics.boxWidth,height );
    this.refresh();
    this.activate();
    this.select(0);
};
function keyinfoEX(char,keycord,special,widthEX,heightEX){
    return {
        char:char,
        keycord:String(keycord),
        isLink:Boolean(  !!special||false ),
        // widthEX:Number(widthEX||  1),
        // heightEX:Number( heightEX|| 1),
    };
}
/**
 * @param {string} char 
 * @param {number} keycord 
 */
function keyinfo(char,keycord){
    return keyinfoEX(char,keycord,false);
}
Window_KeyConfig_MA.KEY_NULL= keyinfoEX('NULL',0,true);
const KEY_ENTER = keyinfoEX('enter',13,true,2,2);
const KEY_TENKEY_ZERO=keyinfoEX('0',96,true,2);
const KEY_SPACE = keyinfoEX('Space',32,true,4);

Window_KeyConfig_MA.COMMAND_DEFAULT =keyinfoEX(setting.commandText.default_,0,true);
Window_KeyConfig_MA.COMMAND_APPLY =keyinfoEX(setting.commandText.apply,0,true);
Window_KeyConfig_MA.COMMAND_EXIT =keyinfoEX(setting.commandText.exit,0,true);

//重複するデータがあっても削除しないように
//大きいボタンを作るための機能です
Window_KeyConfig_MA.keyLayout=[
    // line0
//    Window_KeyConfig_MA.KEY_NULL,
    keyinfo('esc',27),
    keyinfo('1',49),
    keyinfo('2',50),
    keyinfo('3',51),
    keyinfo('4',52),
    keyinfo('5',53),
    keyinfo('6',54),
    keyinfo('7',55),
    keyinfo('8',56),
    keyinfo('9',57),
    keyinfo('0',48),
    keyinfo('-',189),
    keyinfo('^',222),
    keyinfo('Ins',45),
    keyinfo('Back',8),
    keyinfo('Home',36),
    keyinfo('End',35),
    keyinfo('PgUp',33),
    keyinfo('PgDn',34),
    //line1
    Window_KeyConfig_MA.KEY_NULL,
    keyinfo('Q',81),
    keyinfo('W',87),
    keyinfo('E',69),
    keyinfo('R',82),
    keyinfo('T',84),
    keyinfo('Y',89),
    keyinfo('U',85),
    keyinfo('I',73),
    keyinfo('O',79),
    keyinfo('P',80),
    keyinfo("@", 192), 
    keyinfo('[',219),
    KEY_ENTER,
    KEY_ENTER,
    keyinfo('7',103),
    keyinfo('8',104),
    keyinfo('9',105),
    keyinfo('-',109),
// line2
    Window_KeyConfig_MA.KEY_NULL,
    keyinfo('A',65),
    keyinfo('S',83),
    keyinfo('D',68),
    keyinfo('F',70),
    keyinfo('G',71),
    keyinfo('H',72),
    keyinfo('J',74),
    keyinfo('K',75),
    keyinfo('L',76),
    keyinfo(';',186),
    keyinfo(':',58),
    keyinfo(']',221),
    KEY_ENTER,
    KEY_ENTER,
    keyinfo('4',100),
    keyinfo('5',101),
    keyinfo('6',102),
    Window_KeyConfig_MA.KEY_NULL,    
    //line3
    keyinfo('Shift',16),    
    keyinfo('Z',90), 
    keyinfo('X',88),
    keyinfo('C',67),
    keyinfo('V',86), 
    keyinfo('B',66),
    keyinfo('N',78),
    keyinfo('M',77),
    keyinfo(',',188), 
    keyinfo('.',190),
    keyinfo('/',191), 
    keyinfo('\\',220), 
    keyinfo('Shift',16),    
    keyinfo(setting.keyText.up,38),    
    Window_KeyConfig_MA.KEY_NULL,
    
    keyinfo('1',97),
    keyinfo('2',98),
    keyinfo('3',99),
    Window_KeyConfig_MA.KEY_NULL,
// line4
    keyinfo('CTRL',17),
    Window_KeyConfig_MA.KEY_NULL,
    Window_KeyConfig_MA.KEY_NULL,
    Window_KeyConfig_MA.KEY_NULL,
    KEY_SPACE,
    KEY_SPACE,
    KEY_SPACE,
    KEY_SPACE,
    Window_KeyConfig_MA.KEY_NULL,
    Window_KeyConfig_MA.KEY_NULL,
    Window_KeyConfig_MA.KEY_NULL,
    Window_KeyConfig_MA.KEY_NULL,
    keyinfo(setting.keyText.left,37),
    keyinfo(setting.keyText.down,40),
    keyinfo(setting.keyText.right,39),
    KEY_TENKEY_ZERO,
    KEY_TENKEY_ZERO,
    Window_KeyConfig_MA.KEY_NULL,
    Window_KeyConfig_MA.KEY_NULL,

    Window_KeyConfig_MA.COMMAND_DEFAULT,
    Window_KeyConfig_MA.COMMAND_DEFAULT,
    Window_KeyConfig_MA.COMMAND_DEFAULT,
    Window_KeyConfig_MA.COMMAND_DEFAULT,
    Window_KeyConfig_MA.COMMAND_DEFAULT,
    Window_KeyConfig_MA.COMMAND_DEFAULT,

    Window_KeyConfig_MA.COMMAND_APPLY,
    Window_KeyConfig_MA.COMMAND_APPLY,
    Window_KeyConfig_MA.COMMAND_APPLY,
    Window_KeyConfig_MA.COMMAND_APPLY,
    Window_KeyConfig_MA.COMMAND_APPLY,
    Window_KeyConfig_MA.COMMAND_APPLY,
    
    Window_KeyConfig_MA.COMMAND_EXIT,
    Window_KeyConfig_MA.COMMAND_EXIT,
    Window_KeyConfig_MA.KEY_NULL,
    Window_KeyConfig_MA.KEY_NULL,
    Window_KeyConfig_MA.KEY_NULL,
    Window_KeyConfig_MA.KEY_NULL,
    Window_KeyConfig_MA.KEY_NULL,
];
Window_KeyConfig_MA.INDEX_ENTER = Window_KeyConfig_MA.keyLayout.indexOf(KEY_ENTER);
Window_KeyConfig_MA.INDEX_SPACE = Window_KeyConfig_MA.keyLayout.indexOf(KEY_SPACE);
Window_KeyConfig_MA.INDEX_DEFAULT_COMMAND = Window_KeyConfig_MA.keyLayout.indexOf(Window_KeyConfig_MA.COMMAND_DEFAULT);
Window_KeyConfig_MA.INDEX_APPLY_COMMAND = Window_KeyConfig_MA.keyLayout.indexOf(Window_KeyConfig_MA.COMMAND_APPLY);
Window_KeyConfig_MA.INDEX_EXIT_COMMAND = Window_KeyConfig_MA.keyLayout.indexOf(Window_KeyConfig_MA.COMMAND_EXIT);
Window_KeyConfig_MA.prototype.changeKeyMap =function(index,symbol){
    const keyNumber = this.keyNumber(index);
    this._map[keyNumber] = symbol;
    this.redrawItem(index);
    this.redrawApplyCommand();
};
Window_KeyConfig_MA.prototype.setKeyboradMapper =function(mapper){
    this._map = Object.assign({}, mapper);
    this.makeItemList();
};
Window_KeyConfig_MA.prototype.canApplySetting =function(){
    return isValidMapper(this._map);
};

Window_KeyConfig_MA.prototype.cloneMapper= function(){
    return createNormalizedInputMapper(this._map);
};
Window_KeyConfig_MA.prototype.processCancel =function(){
    SoundManager.playCancel();
    this.updateInputData();
    const index = this.index();
    if(index ===Window_KeyConfig_MA.INDEX_EXIT_COMMAND){
        this.callCancelHandler();
    }else{
        this.select(Window_KeyConfig_MA.INDEX_EXIT_COMMAND);
    }


};


Window_KeyConfig_MA.prototype.processApply =function(){
    this.updateInputData();
    this.deactivate();    
    SoundManager.playEquip();

    this.callHandler('apply');


    // if(this.canApplySetting()){
    //     this.updateInputData();
    //     this.deactivate();    
    //     SoundManager.playEquip();

    //     this.callHandler('apply');
    // }else{
    //     this.playBuzzerSound();
        
    // }


};

Window_KeyConfig_MA.prototype.processDefault =function(){
    SoundManager.playEquip();
    this.callHandler('default');
};

Window_KeyConfig_MA.prototype.processOk =function(){
    const index = this.index();
    if(index<0){
        return;
    }
    const item =Window_KeyConfig_MA.keyLayout[index];
    if(item ===Window_KeyConfig_MA.COMMAND_APPLY){
        this.processApply();
        return;
    }
    if(item ===Window_KeyConfig_MA.COMMAND_DEFAULT){
        this.processDefault();
        return;
    }
    if(item ===Window_KeyConfig_MA.COMMAND_EXIT){
        SoundManager.playCancel();
        this.callCancelHandler();
        return;
    }
    if (item===Window_KeyConfig_MA.KEY_NULL || item ===KEY_ENTER) {
        this.playBuzzerSound();
        return;
    }
    this.playOkSound();
    this.updateInputData();
    this.deactivate();
    this.callOkHandler();
};

Window_KeyConfig_MA.prototype.itemHeight =function(){
    return this.lineHeight() * 2;    
};
Window_KeyConfig_MA.prototype.itemWidth=function(){
    return 40;
};
Window_KeyConfig_MA.prototype.maxPageRows =function(){
    return 100;
};
Window_KeyConfig_MA.prototype.maxCols =function(){
    return 19;
};
Window_KeyConfig_MA.prototype.numVisibleRows =function(){
    return this._list.length;
};

/**
 * @return {Rectangle}
 */
Window_KeyConfig_MA.prototype.enterRect =function(){
    const rect= Window_KeyConfig_MA.baseType.itemRect.call(this,this.enterIndex());
    rect.width *=2;
    rect.height*=2;
    return rect;
};

Window_KeyConfig_MA.prototype.spaceRect =function(){
    const rect= Window_KeyConfig_MA.baseType.itemRect.call(this,this.spaceIndex());
    rect.width *= Window_KeyConfig_MA.spaceItems;
    
    return rect;
};
Window_KeyConfig_MA.prototype.tenkeyZeroRect =function(){
    const rect= Window_KeyConfig_MA.baseType.itemRect.call(this,this.tenkeyZeroIndex());
    rect.width *= 2;   
    return rect;
};

Window_KeyConfig_MA.prototype.itemRect =function(index){
    const item =Window_KeyConfig_MA.keyLayout[index];
    if(item.isLink){
        if(item ===KEY_ENTER){
            return this.enterRect();
        }
        if(this.isSpaceIndex(index)){
            return this.spaceRect();
        }
        if(this.isTenkeyZeroIndex(index)){
            return this.tenkeyZeroRect();
        }
        if(item ===Window_KeyConfig_MA.COMMAND_DEFAULT){
            return this.defaultCommandRect();
        }
        if(item ===Window_KeyConfig_MA.COMMAND_DEFAULT){
            return this.defaultCommandRect();
        }
        if(item ===Window_KeyConfig_MA.COMMAND_APPLY){
            return this.applyCommandRect();
        }
        if(item ===Window_KeyConfig_MA.COMMAND_EXIT){
            return this.exitCommandRect();
        }        
    }
    return Window_KeyConfig_MA.baseType.itemRect.call(this,index);
 };

Window_KeyConfig_MA.prototype.makeItemList =function(){};

Window_KeyConfig_MA.prototype.maxItems =function(){
    return Window_KeyConfig_MA.keyLayout.length;
};
Window_KeyConfig_MA.prototype.spacing =function(){
    return 0;
};
/**
 * @param {number}index
 * @return {String}
 */
Window_KeyConfig_MA.prototype.keyNumber =function(index){
    return Window_KeyConfig_MA.keyLayout[index].keycord;
};

Window_KeyConfig_MA.prototype.currentKeyNumber=function(){
    return this.keyNumber(this.index());
}


Window_KeyConfig_MA.prototype.keyName =function(index){
    return Window_KeyConfig_MA.keyLayout[index].char;
};

Window_KeyConfig_MA.prototype.isEnterIndex =function(index){
    return Window_KeyConfig_MA.keyLayout[index] ===KEY_ENTER;
};
Window_KeyConfig_MA.prototype.enterIndex =function(){
    return Window_KeyConfig_MA.INDEX_ENTER;
    return 32;
};

Window_KeyConfig_MA.spaceItems =4;

Window_KeyConfig_MA.prototype.spaceIndex =function(){
    return Window_KeyConfig_MA.INDEX_SPACE;
};


Window_KeyConfig_MA.prototype.tenkeyZeroIndex =function(){
    return this.maxCols()*4 +15;
};
Window_KeyConfig_MA.prototype.isTenkeyZeroIndex=function(index){
    return Window_KeyConfig_MA.keyLayout[index]===KEY_TENKEY_ZERO;
};
Window_KeyConfig_MA.prototype.isSpaceIndex =function(index){
    const spaceStart =this.spaceIndex();
    return spaceStart <= index && index< spaceStart+ Window_KeyConfig_MA.spaceItems; 
};

/**
 * @param {Rectangle} rect
 */
Window_KeyConfig_MA.prototype.drawRect = function(rect, color) {
    this.changePaintOpacity(false);
    this.contents.fillRect(rect.x+1, rect.y+1,rect.width-2, rect.height-2, color);
    this.changePaintOpacity(true);
};
Window_KeyConfig_MA.prototype.drawItemRect =function(enabled,rect){
    if(enabled){
        this.drawRect(  rect,this.textColor(14));
    }else{
        this.drawRect(rect,this.gaugeBackColor());
    }
};

Window_KeyConfig_MA.prototype.cursorUp = function(wrap) {
    if(wrap||this._index >= this.maxCols() ){
        this.cursorMoveCheck( -this.maxCols() );        
    }
};
Window_KeyConfig_MA.prototype.cursorDown = function(wrap) {
    if(wrap||this._index < this.maxItems()- this.maxCols() ){
        this.cursorMoveCheck( this.maxCols() );        
    }
};
Window_KeyConfig_MA.prototype.cursorLeft = function(wrap) {
    if(wrap||this._index>0 ){
        this.cursorMoveCheck( -1 );        
    }
};
Window_KeyConfig_MA.prototype.cursorRight = function(wrap) {
    if(wrap||this._index < this.maxItems()-1 ){
        this.cursorMoveCheck( 1 );        
    }
};

Window_KeyConfig_MA.prototype.nextIndex =function(current,moveDir){
    const maxItems = this.maxItems();
    return(current + moveDir +maxItems )%maxItems;
};

Window_KeyConfig_MA.prototype.cursorMoveCheck =function(moveDir){
    var current = this.index();
    var next = this.nextIndex(current,moveDir);
    const last = Math.abs(this.maxItems() /moveDir);
    for(var i =0 ;i <last; ++i ){
        var itemA = Window_KeyConfig_MA.keyLayout[current];
        var itemB = Window_KeyConfig_MA.keyLayout[next];
        if(itemB===Window_KeyConfig_MA.KEY_NULL){
            break;            
        }
        if( itemA!==itemB){
            break;
        }
        next =this.nextIndex(next,  moveDir);
    }

    this.select(next);
};
Window_KeyConfig_MA.prototype.symbolTextColor =function(){
    return this.textColor(4);
};
Window_KeyConfig_MA.prototype.redrawItem =function(index){
    this.clearItem(index);
    if(this.isEnterIndex(index)){
        this.drawEnter();
    }else if(this.isSpaceIndex(index)){
        this.drawSpace();
    }else if(this.isTenkeyZeroIndex(index)){
        this.drawTenkeyZero();
    }else{
        this.drawItem(index)        
    }
};

Window_KeyConfig_MA.prototype.drawAllItems =function(){
    const last =this.maxPageItems();
    for (var i = 0; i < last; i++) {
        var index =  i;
        var item  = Window_KeyConfig_MA.keyLayout[i];
        if (item && !item.isLink) {
            this.drawItem(index);
        }
    }
    this.drawEnter();
    this.drawSpace();
    this.drawTenkeyZero();
    this.drawDefaultCommand();
    this.drawApplyCommand();
    this.drawexitCommand();
};

Window_KeyConfig_MA.prototype.drawItemText =function(keyName,symobolText,x,y,width){

    this.changeTextColor(this.normalColor());
    this.drawText(keyName,x ,y,width,'center');
    this.changeTextColor(this.textColor(4));
    if(symobolText){
        this.drawText(symobolText,x,y+this.lineHeight() ,width,'center'); 
    }
};

Window_KeyConfig_MA.prototype.drawSpace =function(){
    const index =this.spaceIndex();
    const rect = this.spaceRect();
    this.drawItemRect(!!this.symbol(index),rect);
    const x = rect.x + this.itemWidth();
    const width =rect.width /2;
    this.drawItemText(
        this.keyName(index),
        this.symbolText(index),
        rect.x,rect.y,rect.width
    );
};

Window_KeyConfig_MA.prototype.drawEnter =function(){
   const rect = this.enterRect(); 
   const y = rect.y + rect.height/4;
   const index =this.enterIndex();
   this.drawItemRect(!!this.symbol(index),rect);
   this.drawItemText(
       this.keyName(index),
       this.symbolText(index),
       rect.x,y,rect.width
    );
};
Window_KeyConfig_MA.prototype.drawTenkeyZero =function(){
    const rect= this.tenkeyZeroRect();
    const index = this.tenkeyZeroIndex();
    this.drawItemRect(!!this.symbol(index),rect);
    this.drawItemText(
        this.keyName(index),
        this.symbolText(index),
         rect.x,rect.y,rect.width
    ); 
};

Window_KeyConfig_MA.prototype.symbol =function(index){
     const keyNumber= this.keyNumber(index);
     return this._map[keyNumber];
};

Window_KeyConfig_MA.prototype.symbolText =function(index){
    const symbol= this.symbol(index);
    return symbol;
};

Window_KeyConfig_MA.prototype.rectColor =function(){
    return this.textColor(2);
};

Window_KeyConfig_MA.prototype.drawItem =function(index){
    const rect = this.itemRect(index);
    this.drawItemRect( !!this.symbol(index),rect  );
    this.drawItemText(
        this.keyName(index),
        this.symbolText(index),
        rect.x,rect.y,rect.width
    );
};
Window_KeyConfig_MA.prototype.commandWidth = function(){
    return this.itemWidth()*8;
};
Window_KeyConfig_MA.prototype.commandHeight = function(){
    return this.itemHeight();
};
Window_KeyConfig_MA.prototype.makeCommandList =function(){



};
Window_KeyConfig_MA.prototype.commandBackColor =function(){
   return  this.gaugeBackColor()
};


Window_KeyConfig_MA.prototype.commandColor =function(){
    return this.normalColor();
};
Window_KeyConfig_MA.prototype.drawCommand =function(commandName,rect){
    this.changeTextColor(this.commandColor());
    this.drawRect(rect,this.commandBackColor());
    this.drawText(commandName,rect.x,rect.y,rect.width,'center');

};

/**
 * @return {Rectangle}
 */
Window_KeyConfig_MA.prototype.defaultCommandRect =function(){
    const rect= Window_KeyConfig_MA.baseType.itemRect.call(this,Window_KeyConfig_MA.INDEX_DEFAULT_COMMAND);
    rect.width *=6;
    return rect;
};

Window_KeyConfig_MA.prototype.drawDefaultCommand =function(){
    const rect = this.defaultCommandRect();
    this.drawCommand(setting.commandText.default_,rect);

    // this.changeTextColor(this.commandColor());
    // this.drawText(setting.commandText.default_,rect.x,rect.y,rect.width,'center');
};
/**
 * @return {Rectangle}
 */
Window_KeyConfig_MA.prototype.applyCommandRect =function(){
    const rect= Window_KeyConfig_MA.baseType.itemRect.call(this,Window_KeyConfig_MA.INDEX_APPLY_COMMAND);
    rect.width *=6;
    return rect;
};

Window_KeyConfig_MA.prototype.redrawApplyCommand =function(){
    this.clearItem(Window_KeyConfig_MA.INDEX_APPLY_COMMAND);
    this.drawApplyCommand();
};
Window_KeyConfig_MA.prototype.drawApplyCommand =function(){
    const rect = this.applyCommandRect();
//    const ok = this.canApplySetting();
    this.drawRect(rect,this.commandBackColor());
//    this.changePaintOpacity(ok);

    this.changeTextColor(this.commandColor());

    this.drawText(setting.commandText.apply,rect.x,rect.y,rect.width,'center');

//    this.changePaintOpacity(true);
    // }
};
/**
 * @return {Rectangle}
 */
Window_KeyConfig_MA.prototype.exitCommandRect =function(){
    const rect= Window_KeyConfig_MA.baseType.itemRect.call(this,Window_KeyConfig_MA.INDEX_EXIT_COMMAND);
    rect.width *=2;
    return rect;
};


Window_KeyConfig_MA.prototype.drawexitCommand =function(){
    const rect = this.exitCommandRect();
    this.drawCommand(setting.commandText.exit,rect);
};



function Scene_KeyConfig_MA() {
    this.initialize.apply(this, arguments);
}
Scene_KeyConfig_MA.baseType =Scene_InputConfigBase_MA.prototype;

Scene_KeyConfig_MA.prototype = Object.create(Scene_KeyConfig_MA.baseType);
Scene_KeyConfig_MA.prototype.constructor = Scene_KeyConfig_MA;

Scene_KeyConfig_MA.prototype.initialize = function() {
    Scene_KeyConfig_MA.baseType.initialize.call(this);
};
Scene_KeyConfig_MA.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createKeyboradConfigWindow();
    this.createSymbolListWindow();
    this._symbolListWindow.moveCenter();
};
Scene_KeyConfig_MA.prototype.onConfigCancel =function(){
    SceneManager.pop();
};
Scene_KeyConfig_MA.prototype.changeSymbol =function(symbol){
    const index =this._keyconfigWindow.index();
    this._keyconfigWindow.changeKeyMap(index,symbol);    
};

Scene_KeyConfig_MA.prototype.onConfigOk =function(){
    const keyNumber = this._keyconfigWindow.currentKeyNumber();
    this.selectSymbol();
};
Scene_KeyConfig_MA.prototype.loadDefautConfig =function(){
    this._keyconfigWindow.setKeyboradMapper(setting.keyConfigSamples[0]);
    this._keyconfigWindow.refresh();
};
Scene_KeyConfig_MA.prototype.terminate =function(){
    Scene_KeyConfig_MA.baseType.terminate.call(this);
    if(this._applyOnExit){
        const mapper = this._keyconfigWindow.cloneMapper();
        Input.keyMapper  =mapper;
    }
};

Scene_KeyConfig_MA.prototype.applyKeyboardConfig =function(){
    this._applyOnExit =true;
    this.popScene();
};

// Scene_KeyConfig_MA.prototype.createSymbolListWindow =function(){
//     Scene_KeyConfig_MA.baseType.createSymbolListWindow.call(this);
//     const esc ='escape';
//     this._symbolListWindow.addCommand( symbolToText(esc),esc  );
//     this._symbolListWindow.height =this._symbolListWindow.fittingHeight(this._symbolListWindow.maxItems());
//     this._symbolListWindow.refresh();
// };

Scene_KeyConfig_MA.prototype.createKeyboradConfigWindow =function(){
    const kcw = new Window_KeyConfig_MA();
    kcw.setHandler('cancel',this.onConfigCancel.bind(this));
    kcw.setHandler('ok',this.onConfigOk.bind(this));
    kcw.setHandler('default',this.loadDefautConfig.bind(this));
    kcw.setHandler('apply',this.applyKeyboardConfig.bind(this));

    this.addWindow(kcw);
    this._keyconfigWindow =kcw;
};
Scene_KeyConfig_MA.prototype.mainWidnow =function(){
    return this._keyconfigWindow;
};

if(setting.hookPoint==='menu'){
    const Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
    Window_TitleCommand.prototype.makeCommandList = function(){
        Window_TitleCommand_makeCommandList.call(this);
        
        this.addCommand(setting.commandName,MA_GAMEPAD_CONFIG,true);
    };
    const Scene_Title_createCommandWindow=Scene_Title.prototype.createCommandWindow
    Scene_Title.prototype.createCommandWindow =function(){
        Scene_Title_createCommandWindow.call(this);
        this._commandWindow.setHandler(MA_GAMEPAD_CONFIG,  this.commandGamepadConfig.bind(this));
    };
    Scene_Title.prototype.commandGamepadConfig =function(){
        this._commandWindow.close();
        SceneManager.push(Scene_GamepadConfigMA);
    };
}else{

    Window_Options.prototype.addGamepadOptions_MA =function(){
        this._gamepadOptionIndex = this._list.length;
        this.addCommand(setting.commandName,MA_GAMEPAD_CONFIG);
    };
    Window_Options.prototype.addKeyboardConfig_MA=function(){
        this._keyboardConfigIndex = this._list.length;
        this.addCommand(setting.keyConfigCommandName,MA_KEYBOARD_CONFIG);
    };


    const Window_Options_addGeneralOptions=Window_Options.prototype.addGeneralOptions;
    const Window_Options_addVolumeOptions=Window_Options.prototype.addVolumeOptions;

    const Window_Options_makeCommandList = Window_Options.prototype.makeCommandList
    if(setting.hookPoint==='beforeVolume'){
        Window_Options.prototype.addVolumeOptions=function(){
            this.addGamepadOptions_MA();
            this.addKeyboardConfig_MA();
            Window_Options_addVolumeOptions.call(this);
        }
    }else if(setting.hookPoint==='afterVolume'){
        Window_Options.prototype.addVolumeOptions=function(){
            Window_Options_addVolumeOptions.call(this);
            this.addGamepadOptions_MA();
            this.addKeyboardConfig_MA();
        }
    }else{
        Window_Options.prototype.makeCommandList =function(){
            Window_Options_makeCommandList.call(this);
            this.addGamepadOptions_MA();
            this.addKeyboardConfig_MA();            
        };
    }
    const Window_Options_statusText=Window_Options.prototype.statusText;
    Window_Options.prototype.statusText =function(index){
        if(index ===this._gamepadOptionIndex){
            return '';
        }
        if(index===this._keyboardConfigIndex){
            return '';
        }
        return Window_Options_statusText.call(this,index);
    }    
    const Window_Options_processOk = Window_Options.prototype.processOk;
    Window_Options.prototype.processOk =function(){
        const index = this.index();
        if(index === this._gamepadOptionIndex){
            this.playOkSound();
            SceneManager.push(Scene_GamepadConfigMA);
            return;
        }
        if(index ===this._keyboardConfigIndex){
            this.playOkSound();
            SceneManager.push(Scene_KeyConfig_MA);
            return;
        }

        Window_Options_processOk.call(this);
        
    };
}
/**
 * @return {[key =string]: Function}
 */
function createExportFunction(){
    const exportList=[
        symbolToButtonName,
    ];
    var result ={};
    for(var i =0; i< exportList.length;++i){
        var func = exportList[i];
        result[func.name] = func;
    }
    return result;
}

const exportFuntion= createExportFunction();
//global.mano = global.mano||{};
//global.mano = Object.assign()

})(this);