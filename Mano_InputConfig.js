//=============================================================================
// Mano_InputConfig.js
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


/*:ja
 * @plugindesc ゲームパッドの設定を変更するプラグインです。
 * ユーザーが入力を拡張する場合の補助も行います
 * @author しぐれん(https://github.com/Sigureya/RPGmakerMV)
 * 
 * @param overwriteWarning
 * @desc このプラグインで割り当てたボタン設定が、既存の入力に対して上書きしている場合にconsoleへ警告を出します
 * @type boolean
 * @default true
 *
 * @param text
 * @param CommandWidth
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
 * @parent text
 * 
 * @param textDefault
 * @desc 初期設定に戻すコマンドです。
 * @default 初期設定に戻す
 * @parent text
 * 
 * @param textChangeLayout
 * @desc JIS/USでキー配置を切り替えるコマンドです。
 * @default JIS/US
 * @parent text
 * 
 * @param textExit
 * @desc コンフィグを終了するときのコマンドです。
 * @default やめる
 * @parent text
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
 * @default ["ok","cancel","shift","menu","pageup","pagedown","escape"]
 * @type combo[]
 * @option ok
 * @option cancel
 * @option shift
 * @option menu
 * @option pageup
 * @option pagedown
 * @option escape
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
 * @desc PS2コントローラ：左スティック押し込み
 * @type struct<ButtonInfo>
 * @default {"buttonName":"L push","action":""}
 * @parent buttons
 * 
 * @param button11
 * @desc PS2コントローラ：右スティック押し込み
 * @type struct<ButtonInfo>
 * @default {"buttonName":"R push","action":""}
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
 * @param CommandDefaultWidth
 * @type number
 * @min 1
 * @default 4
 * @parent CommandWidth
 * 
 * @param CommandApplyWidth
 * @type number
 * @min 1
 * @default 4
 * @parent CommandWidth
 * 
 * @param CommandLayoutWidth
 * @type number
 * @min 1
 * @default 4
 * @parent CommandWidth
 * 
 * @param CommandExitWidth
 * @type number
 * @min 1
 * @default 4
 * @parent CommandWidth
 * 
 * 
 * @param gamepadConfigPositionMode
 * @text ゲームパッドコンフィグの位置
 * @desc ウィンドウの位置
 * @type select
 * @option 中央
 * @value center
 * @option 数値指定
 * @value custom
 * @default center
 * 
 * @param gamepadConfigPositionX
 * @desc ウィンドウのX座標です。
 * @type number
 * @default 100
 * @parent gamepadConfigPositionMode
 * 
 * @param gamepadConfigPositionY
 * @desc ウィンドウのY座標です。
 * @type number
 * @default 100
 * @parent gamepadConfigPositionMode
 * 
 * @param gamepadSymbolPositionMode
 * @text シンボルリストの位置
 * @desc ウィンドウの位置
 * @option 右
 * @value right 
 * @type select
 * @option 中央
 * @value center
 * @default right
 * 
 * 
 * 
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
 * @param gamepadConfigEnabled
 * @desc ゲームパッドコンフィグの有効化設定です
 * @type boolean
 * @default true
 * 
 * @param keyboardConfigEnabled
 * @desc キーボードコンフィグの有効化設定です
 * @type boolean
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
 * プラグインの導入位置に関わらず、入力の変更を検知します。
 * 他のプラグインでボタンが改造されていてもOKです。
 * 
 * このプラグインで設定したコンフィグデータは、ファイルに記録されます。
 * 新しいプラグインを入れた場合、
 * ゲーム起動後にコンフィグを「初期設定に戻す」でリセットしてください。
 * 
 * ■extendSymbols
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
 * 謝辞
 * KeyBoradConfig部分の作成に当たって、YEP_KeyboardConfig.jsを参考にしました。
 * Yanfly様、素敵なプラグインの作成、ありがとうございます。
 * 
 * I made it as KeyBoradConfig part and looked at YEP_KeyboardConfig.js.
 * Yanfly.Thank you for creating a nice plugin!
 * 
 * 更新履歴
 * 
 * 2018/09/28 ver2.6
 * ゲームパッドコンフィグを改造すると誤作動があったので、誤作動を減らす改造。
 * また、プラグインの位置に関わらず入力の変更を捕まえられるように。
 * 
 * 2018/06/25 ver 2.5
 * 色々あった細かいバグ修正を重ねた最新版。
 * 
 * 2017/10/21 ver 2.2　更新
 * 外部から追加したシンボルがsymbolsと重複していた場合、追加しないようにした。
 * USキー配列に仮対応。
 * 
 * 2017/10/18 ver 2.1　更新
 * キーボードで目立ったバグの報告がなかったため、2.0に。
 * 外部からコンフィグを改造できる機能を導入。
 * 
 * 2017/10/13 ver 1.9　更新
 * キーボードのコンフィグにも対応。
 * 仕様が固まっていないので、1.9とします。
 * 2017/10/05 ver 1.0　公開
 * 
 */



 /**
 * TODO
 * 複数ボタン押し対応
 * 複数押しが満たされている場合、以前の入力をカット
 * また、複数押しするためには該当するボタンが一定回数以上押されたことをチェックさせる機能がいる
 * （A+Bで反応する場合、Aを押して一定時間以上経過してから判定する必要がある）
 * さらにRABみたいなのがある場合、そっちを先に処理しないといけない
 * ABYとRABの両方に意味がある場合、どうする？
 * ↑+Bとかどうしよう
 * 上から順に調べていく
 * 専用のプラグインを作り、inputConfigとの連結を作る
 * 
 * 
 * 備忘録
 * Bootのタイミングですでにコンフィグを読み込んでいるので注意
 * 
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


var  MA_InputSymbols = MA_InputSymbols ||[];
var Imported = Imported || {};
Imported.Mano_InputConfig = true;
var Mano_InputConfig=( function(){
    'use strict'

    function objectClone(obj){
        var result ={};
        Object.keys(obj).forEach(function(key){
            result[key] = obj[key];
        })
        return result;
    }
    
const moveSymbols =['up','down','left','right'];



const setting = (function(){
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
        const list= JSON.parse(params.symbols);
        return list;
    }

    /**
     * @return {string[]}
     */
    function createMandatorySymbols(params){
        const result =JSON.parse(params.mandatorySymbols);
        return result;
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

    // function makeKeyboardSamples(){
    //     const RPGmakerDefault =objectClone(  Input.keyMapper);
    //     return [RPGmakerDefault];
    // }

    // function makeConfigSamples(){
    //     const RPGmakerDefault =objectClone(  Input.gamepadMapper);
    //     const ab_swaped =objectClone(  Input.gamepadMapper);
    //     const a = RPGmakerDefault[1];
    //     const b = RPGmakerDefault[0];

    //     ab_swaped[0] =a;
    //     ab_swaped[1] =b;
    //     return [RPGmakerDefault,ab_swaped];
    // }

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
        changeLayout:String(params.textChangeLayout),
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
    const overwriteWarning=(params.overwriteWarning==='true');
//    const configSamples =makeConfigSamples(buttonInfo);
    
    for(var key in buttonInfo){
        const x = buttonInfo[key];
        if(x.symbol){
            (function(sample){
                const preSymbor =sample[key];
                // 警告機能
                if(overwriteWarning && preSymbor){
                    console.log('overwriteWarning/キー上書き警告 \ngamepadMapper['+key+']('+preSymbor+')='+x.symbol);
                }
                sample[key] =x.symbol;
            })(Input.gamepadMapper);
        }
    }

//    const keyConfigSamples = makeKeyboardSamples();
    const result= {
        keyText:keyText,
        commandText:commandText,
        emptySymbolText:String(params.textEmpty),
        symbolList:paramToActionKeys(params),
        symbolText:helpText,
        buttonInfo:buttonInfo,
        buttonList: createButtonList(params),
        mandatorySymbols:createMandatorySymbols(params),
        symbolAutoSelect:(params.symbolAutoSelect==='true'),
//        configSamples :configSamples,
//        keyConfigSamples:keyConfigSamples,

//        configIndex:Number(params.defaultGamepadMapper),
        windowSymbolListWidht:Number(params.windowSymbolListWidth),
        hookPoint:String(params.hookPoint),
        commandName:String(params.commandName),
        keyConfigCommandName:String(params.keyconfigCommandName),
        
        moveButtonsConfig:(params.moveButtons ==='true'),

        gamepadConfigPosition :{
            mode:String(params.gamepadConfigPositionMode),
            x:Number(params.gamepadConfigPositionX),
            y:Number(params.gamepadConfigPositionY),
        },
        gamepadSymbolPosition :{
            mode:String(params.gamepadSymbolPositionMode),
        },
        commandWidth:{
            DEFAULT:Number(params.CommandDefaultWidth),
            APPLY:Number(params.CommandApplyWidth),
            LAYOUT:Number(params.CommandLayoutWidth),
            EXIT:Number(params.CommandExitWidth),
        },
        windowCustom:{
            // y:Number(params.windowPositionY),
            gamepadWidth :Number(params.gamepadWindowItemWitdh),
            symbolWidth:Number(params.symbolWindowWidth),
        },
        numVisibleRows:Number(params.numVisibleRows),
        cols:Number(params.cols),
        gamepadConfigEnabled:(params.gamepadConfigEnabled==='true'),
        keyboardConfigEnabled:(params.keyboardConfigEnabled==='true'),
    };
    if(result.moveButtonsConfig){
        Array.prototype.push.apply( result.mandatorySymbols,moveSymbols);
        Array.prototype.push.apply( result.symbolList,moveSymbols);
        Array.prototype.push.apply(result.buttonList,['12','13','14','15']);
    }


    return result;
})();

function MA_InputSymbolsEx_Import(){
    if(!MA_InputSymbols){return;}
    const len =MA_InputSymbols.length;

    for(var i =0; i < len; ++i){
        var elem =MA_InputSymbols[i];
        var symbol = elem.symbol;
//        console.log(symbol);
        var mandatory =elem.mandatory;
        if(mandatory ===true || mandatory ==='true'){
            setting.mandatorySymbols.push(symbol);
        }
        setting.symbolText[symbol] =elem.text;
        if(!setting.symbolList.contains(symbol)){
            setting.symbolList.push(symbol);
        }
    }
};


/**
 * @returns {String}
 * @param {String} symbol 
 * @desc シンボルからゲームパッドのボタン番号を文字列で返します
 */
function symbolToButtonNumber(symbol){
    for(var key in Input.gamepadMapper){
        if(Input.gamepadMapper[key]===symbol){
            return key;
        }
    }
    return ''
}

/**
 * @param {String} symbol
 * @returns {String}
 * @desc シンボルからゲームパッドのボタン名を返します
 */
function symbolToButtonName(symbol){
    return buttonName(symbolToButtonNumber(symbol));
}

/**
 * 
 * @param {String} symbol 
 * @return {string}
 */
function symbolToText(symbol){
    if(!symbol){
        return '';
    }
    const text =setting.symbolText[symbol];
    if(text){
        return text;
    }
    return 'unknow:'+symbol;
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


//Input.gamepadMapper = createGamepadMapper();
const MA_KEYBOARD_CONFIG ='KEYBOARD_CONFIG';
const MA_GAMEPAD_CONFIG = 'GAMEPAD_CONFIG';
const MA_KEYBOARD_LAYOUT ='KEYBOARD_LAYOUT';


function readGamePadConfig( config ){
    const value = config[MA_GAMEPAD_CONFIG];
    if(value){
        return value;
    }
    return null;
}
function readKeyboardConfig(config){
    const value =config[MA_KEYBOARD_CONFIG];
    if(value){
        return value;
    }
    return null;
}
ConfigManager.setKeyLayoutMA =function(layout){
    ConfigManager.keyLayout_MA =layout;
};
const  ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData =function(){
    const result = ConfigManager_makeData.call(this);
    result[MA_GAMEPAD_CONFIG] =Input.gamepadMapper;
    result[MA_KEYBOARD_CONFIG] = Input.keyMapper;
    result[MA_KEYBOARD_LAYOUT] = ConfigManager.keyLayout_MA ||'JIS';
    return result;
};
const ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData =function(config){
    ConfigManager_applyData.call(this,config);
    const gamepad =readGamePadConfig(config);
    if(gamepad){
        Input.gamepadMapper = gamepad;
    }
    const keyMapper =readKeyboardConfig(config);
    if(keyMapper){
        Input.keyMapper =keyMapper;
    }
    ConfigManager.setKeyLayoutMA(config[MA_KEYBOARD_LAYOUT]||'JIS');
    Input.clear();
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
/**
 * @return {boolean}
 * @param {[Number:string]} mapper 
 * @param {string} symbol 
 */
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
    const len =setting.mandatorySymbols.length;
    for(var i=0; i < len;++i){
        var symbol = setting.mandatorySymbols[i];
        if(!inputMapperHasSymbol( mapper , setting.mandatorySymbols[i])){
            return false;
        }
    }
    return true;
}

class Window_InputSymbolList extends Window_Selectable {
    initialize(x, y) {
        this.makeCommandList();
        const width = setting.windowCustom.symbolWidth; // (Graphics.boxWidth -x).clamp(148,180);
        const height = this.windowHeight(); //+this.itemHeight();
        super.initialize( x, y, width, height);
        this.deactivate();
        this.deselect();
    }
    /**
     * @return {String}
     */
    symbol(index) {
        return this._list[index].symbol;
    }
    moveCenter() {
        const x = Graphics.boxWidth / 2 - this.width / 2;
        const y = Graphics.boxHeight / 2 - this.height / 2;
        this.move(x, y, this.width, this.height);
    }
    windowHeight() {
        return this.fittingHeight(this.maxItems());
    }
    maxItems() {
        return this._list.length;
    }
    findSymbol(symbol) {
        for (var i = 0; i < this._list.length; ++i) {
            if (this._list[i].symbol === symbol) {
                return i;
            }
        }
        return -1;
    }
    selectSymbol(action) {
        const index = this.findSymbol(action);
        if (this._list[index]) {
            this.select(index);
        }else {
            this.select(0);
        }
    }
    /**
     * @param {string} name
     * @param {string} symbol
     */
    addCommand(name, symbol, ext) {
        if (ext === undefined) {
            ext = null;
        }
        this._list.push({
            name: name,
            symbol: symbol,
            ext: ext
        });
    }
    currentSymbol() {
        const index = this.index();
        if (index >= 0) {
            return this.symbol(index);
        }
        return null;
    }
    makeCommandList() {
        this._list = [];
        const len = setting.symbolList.length;
        for (var i = 0; i < len; ++i) {
            const actionKey = setting.symbolList[i];
            this.addCommand(symbolToText(actionKey) || setting.emptySymbolText, actionKey, 'テスト' + i);
        }
        this.addCommand(setting.emptySymbolText, null);
    }
    /**
     * @param {number} index
     * @return {string}
     */
    symbolName(index) {
        return this._list[index].name;
    }
    drawItem(index) {
        const rect = this.itemRectForText(index);
        this.drawText(this.symbolName(index), rect.x, rect.y, rect.width);
    }
}
/**
 * @param {String} name 
 * @param {String} symbol 
 * @param {Boolean} enabled 
 */
function createCommand(name,symbol,enabled){
    if(enabled ===undefined){
        enabled =true;
    }
    return({
        name:name,
        symbol:symbol,
        enabled:enabled,
    });
}
class Window_GamepadConfig_MA extends Window_Selectable {
    initialize() {
        this.setGamepadMapper(Input.gamepadMapper);
        this.makeCommandList();
        const r = this.windowRect();
        super.initialize( r.x, r.y, r.width, r.height);
        this.defineNameWidth();
        this.defineSymbolTextWidth();

        this.select(0);
        this.refresh();
    }
    makeItemList() {
        this._list = [];
        const length = setting.buttonList.length;
        for (var i = 0; i < length; i += 1) {
            var buttonId = setting.buttonList[i];
            this.addButtonItem(buttonId);
        }
    }
    /**
     * 
     * @param {String} name 
     * @param {String} symbol 
     * @param {Boolean} enabled 
     */
    addCommand(name,symbol,enabled){
        if(enabled ===undefined){
            enabled =true;
        }
        this._command.push({
            name:name,
            symbol:symbol,
            enabled:enabled,
        });
    }

    makeCommandList() {
        const default_ = createCommand(setting.commandText.default_,'default');
        const apply    = createCommand(setting.commandText.apply,'apply');
        const exit = createCommand(setting.commandText.exit,'exit');
        this._command =[
            default_,
            apply,
            exit
        ];
        this._applyCommand = apply;
        this._exitCommand = exit;
        this._exitCommandIndex = this._list.length + this._command.indexOf(exit);
    }
    command(index){
        return this._command[this.commandIndex(index)];
    }

    commandIndex(index){
        return index - this.buttonItems();
    }
    maxItems() {
        return this._list.length + this._command.length;
    }
    buttonItems(){
        return this._list.length;
    }
    isEnabledCommand(index){
        return (index >= this._list.length);
    }
    windowRect(){
        const w = this.windowWidth();
        const h = this.windowHeight();
        var x = 0;
        var y = 0;
        if (setting.gamepadConfigPosition.mode === 'center') {
            //    if(setting.gamepadConfigPosition){
            x = (Graphics.boxWidth - w) / 2; ///:setting.windowCustom.x;
            y = (Graphics.boxHeight - h) / 2; //:setting.windowCustom.y;
        } else {
            x = setting.gamepadConfigPosition.x;
            y = setting.gamepadConfigPosition.y;
        }
        return new Rectangle(x,y,w,h);
    
    }
    cursorDown(wrap) {
        var index = this.index();
        var maxItems = this.maxItems();
        var maxCols = this.maxCols();
        if (wrap || index < maxItems - maxCols) {
            this.select((index + maxCols) % maxItems);
        }
    }
    cursorUp(wrap) {
        var index = this.index();
        var maxItems = this.maxItems();
        var maxCols = this.maxCols();
        if (index >= maxCols || (wrap)) {
            this.select((index - maxCols + maxItems) % maxItems);
        }
    }
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
    callDefaultHandler() {
        this.callHandler('default');
    }
    processDefault() {
        SoundManager.playEquip();
        this.callDefaultHandler();
    }
    processCommandOk(){
        const command = this.command(this.index());
        if(command && command.enabled){
            this.updateInputData();
            this.deactivate();
            this.callHandler(command.symbol);
        }else{
            this.playBuzzerSound();
        }
    }
    processOk() {
        const index = this.index();
        if (index < 0) {
            return;
        }
        if(this.isEnabledCommand(index)){
            this.processCommandOk();
            return;
        }
        if (this._list[index]) {
            this.updateInputData();
            this.deactivate();
            this.playOkSound();
            this.callOkHandler();
        }
    }
    /**
     * @param {Number} index 
     */
    isExitCommand(index){
       return this.exitCommandIndex() ===index;
    }
    processCancel() {
        this.updateInputData();
        if (this.isExitCommand(this._index)) {
            this.callCancelHandler();
        } else {
            SoundManager.playCancel();
            const cancellationIndex = this.exitCommandIndex();
            this.select(cancellationIndex);
        }
    }
    windowWidth() {
        return setting.windowCustom.gamepadWidth * this.maxCols();
    }
    maxCols() {
        return setting.cols;
    }
    numVisibleRows() {
        return Math.ceil(this.maxItems() / this.maxCols());
    }
    windowHeight() {
        return this.fittingHeight(Math.min(setting.numVisibleRows, this.numVisibleRows()));
    }
    /**
     * @return {number}
     */
    configItems() {
        return this._list.length;
    }
    setGamepadMapper(map) {
        this._map = objectClone(map);
        this.makeItemList();
    }
    cloneGamepadMapper() {
        return createNormalizedInputMapper(this._map);
    }
    /**
     * @param {string}  buttonNumber
     * @return {string} actionKey
     */
    getAction(buttonNumber) {
        return this._map[buttonNumber];
    }
    currentSymbol() {
        return this.symbol(this.index());
    }
    /**
     * @param {number} index
     * @return {string} buttonNumber
     */
    buttonNumber(index) {
        return this._list[index].buttonNumber;
    }
    /**
     * @param {number} index
     * @return {string} buttonName
     */
    buttonName(index) {
        return this._list[index].name;
    }
    /**
     * @param {number} index
     * @return {string} symbol
     */
    symbol(index) {
        const buttonNumber = this.buttonNumber(index);
        return this._map[buttonNumber];
    }
    /**
     * @param {number} index
     * @return {string} symbol
     */
    symbolText(index) {
        return symbolToText(this.symbol(index));
    }
    addButtonItem(buttonNumber_) {
        const index = this._list.length;
        this._list.push({
            name: buttonName(buttonNumber_),
            buttonNumber: buttonNumber_
        });
        this.setButtonItem(index, buttonNumber_);
    }
    setButtonItem(index, buttonNumber) {
        const action = this.getAction(buttonNumber);
        const text = symbolToText(action) || '';
        const item = this._list[index];
        item.action = action;
        item.text = text;
    }
    defineSymbolTextWidth() {
        var width = 0;
        for (var key in setting.symbolText) {
            width = Math.max(width, this.textWidth(setting.symbolText[key]));
        }
        this._symbolTextWidth = width;
    }
    /**
     * @return {number}
     */
    symbolTextWidth() {
        return this._symbolTextWidth;
    }
    defineNameWidth() {
        var width = 0;
        for (var i = 0; i < this._list.length; ++i) {
            width = Math.max(width, this.textWidth(this.buttonName(i)));
        }
        this._nameWidth = width;
    }
    /**
     * @return {number}
     */
    nameWidth() {
        return this._nameWidth;
    }
    /**
     * @param {number} index
     */
    changeKeyMap(index, newSymbol) {
        const buttonNumber = this.buttonNumber(index);
        this._map[buttonNumber] = newSymbol;
        this.redrawItem(index);
        this.redrawApplyCommand();
    }
    drawAllItems() {
        const topIndex = this.topIndex();
        const max = this.maxPageItems();
        for (var i = 0; i < max; i++) {
            const index = topIndex + i;
            this.drawItem(index);
        }
    }

    drawCommand(index){
        const commandIndex = this.commandIndex(index);
        const command = this._command[commandIndex];
        if(command){
            this.changePaintOpacity(command.enabled);
            const rect = this.itemRectForText(index);
            this.drawText(command.name,rect.x,rect.y,rect.width);
            this.changePaintOpacity(true);
        }
    }
    drawItem(index) {

        if(index< this._list.length){
            this.changeTextColor(this.normalColor());
            const rect = this.itemRectForText(index);
            this.drawText(this.buttonName(index), rect.x, rect.y);
            const nameWidth = this.nameWidth();
            const symbolWidth = rect.width - nameWidth;
            this.drawText(this.symbolText(index), rect.x + nameWidth + this.textPadding(), rect.y, symbolWidth);
            return;
        }
        this.drawCommand(index);

    }
    hasSymbol(symbol) {
        for (var key in this._map) {
            if (this._map[key] === symbol) {
                return true;
            }
        }
        return false;
    }
    /**
     * @return {boolean}
     */
    canApplySetting() {
        return isValidMapper(this._map);
    }
    exitCommandIndex() {
        return this._exitCommandIndex;
    }
    applyCommandIndex() {
        return this._list.length + 1;
    }
    defaultCommandIndex() {
        return this._list.length;
    }
    redrawApplyCommand() {
        this.clearItem(this.applyCommandIndex());
        this.drawApplyCommand();
    }
    drawDefaultCommand() {
        const index = this.defaultCommandIndex();
        const rect = this.itemRectForText(index);
        this.drawText(setting.commandText.default_, rect.x, rect.y, rect.width);
    }
    drawExitCommand() {
        const index = this.exitCommandIndex();
        const rect = this.itemRectForText(index);
        this.drawText(setting.commandText.exit, rect.x, rect.y, rect.width);
    }
    drawApplyCommand() {
        const ok = this.canApplySetting();
        const index = this.applyCommandIndex();
        this.changePaintOpacity(ok);
        const rect = this.itemRectForText(index);
        this.drawText(setting.commandText.apply, rect.x, rect.y, rect.width);
        this.changePaintOpacity(true);
    }
    /**
     * @param {number} index
     * @return {ButtonActionItem}
     */
    item(index) {
        const item = this._list[index];
        if (item) {
            return item;
        }
        return null;
    }
}
class Scene_InputConfigBase_MA extends Scene_MenuBase{

    currentSymbol() {
        return '';
    }
    selectSymbol() {
        this._symbolListWindow.show();
        this._symbolListWindow.activate();
        if (setting.symbolAutoSelect) {
            this._symbolListWindow.selectSymbol(this.currentSymbol());
        }
        else {
            this._symbolListWindow.select(0);
        }
    }
    /**
     * @return {Window_Selectable}
     */
    mainWidnow() {
        return null;
    }
    changeSymbol(symbol) {
    }
    onSymbolListOk() {
        this.changeSymbol(this._symbolListWindow.currentSymbol());
        this.endActionSelect();
    }
    onSymbolListCancel() {
        this.endActionSelect();
    }
    endActionSelect() {
        this._symbolListWindow.deselect();
        this._symbolListWindow.hide();
        this.mainWidnow().activate();
    }
    symbolListWindowPostion() {
        return { x: 0, y: 0 };
    }
    symbolCenter() {
        return false;
    }
    createSymbolListWindow(x, y) {
        const pos = this.symbolListWindowPostion();
        const asw = new Window_InputSymbolList(pos.x, pos.y);
        asw.setHandler('ok', this.onSymbolListOk.bind(this));
        asw.setHandler('cancel', this.onSymbolListCancel.bind(this));
        asw.hide();
        asw.refresh();
        if (this.symbolCenter()) {
            asw.moveCenter();
        }
        this.addWindow(asw);
        this._symbolListWindow = asw;
    }
}







class Scene_GamepadConfigMA extends Scene_InputConfigBase_MA{
    /**
     * @return {Rectangle}
     */
    SymbolListWindowRect() {
        return new Rectangle(0, 0, 500, 500);
    }

    symbolListWindowPostion() {
        if (setting.gamepadSymbolPosition.mode === 'right') {
            return {
                /**
                 * @type {Number}
                 */
                x: this._gamepadWindow.x + this._gamepadWindow.width,
                /**
                 * @type {Number}
                 */
                y: this._gamepadWindow.y
            };
        }
        return { x: 0, y: 0 };
    }
    symbolCenter() {
        return setting.gamepadSymbolPosition.mode === 'center';
    }
    /**
     * @param {object} [gamepadMapper=null] 読み込むコンフィグデータ 無指定の場合、現在の設定値を読み込む
     */
    setGamepadMapper(gamepadMapper) {
        if (this._gamepadWindow) {
            this._gamepadWindow.setGamepadMapper(gamepadMapper);
            this._gamepadWindow.refresh();
        }
    }
    create() {
        super.create();
        this.createAllWindows();
    }
    createGamepadConfigWindow() {
        const gcw = new Window_GamepadConfig_MA(0, 0);
        //    gcw.select(0);
        gcw.setHandler('ok', this.onConfigOk.bind(this));
        gcw.setHandler('exit', this.onConfigCancel.bind(this));
        gcw.setHandler('cancel', this.onConfigCancel.bind(this));
        gcw.setHandler('apply', this.applyGamepadConfig.bind(this));
        gcw.setHandler('default', this.loadDefautConfig.bind(this));
        this._gamepadWindow = gcw;
        //    gcw.refresh();
        this.addWindow(gcw);
    }
    changeSymbol(symbol) {
        const index = this._gamepadWindow.index();
        this._gamepadWindow.changeKeyMap(index, symbol);
    }
    mainWidnow() {
        return this._gamepadWindow;
    }
    currentSymbol() {
        return this._gamepadWindow.currentSymbol();
    }
    loadDefautConfig() {
        this.setGamepadMapper(Mano_InputConfig.defaultGamepadMapper);
        SoundManager.playEquip();
        this._gamepadWindow.activate();
    }
    terminate() {
        super.terminate();
        if (this._applyOnExit) {
            Input.gamepadMapper = this._gamepadWindow.cloneGamepadMapper();
        }
    }
    applyGamepadConfig() {
        if (this._gamepadWindow.canApplySetting()) {
            SoundManager.playEquip();
            this._applyOnExit = true;
            this.popScene();
        } else {
            this._gamepadWindow.playBuzzerSound();
            this._gamepadWindow.activate();
        }
    }
    onConfigOk() {
        this.selectSymbol();
    }
    onConfigCancel() {
        SoundManager.playCancel();
        SceneManager.pop();
    }
    createAllWindows() {
        this.createGamepadConfigWindow();
        if (setting.gamepadConfigPosition) {
            this.createSymbolListWindow(setting.gamepadConfigPosition.x, setting.gamepadConfigPosition.y);
        }
        else {
            this.createSymbolListWindow(0, 0);
            this._symbolListWindow.moveCenter();
        }
        this._gamepadWindow.activate();
    }
}

/**
 * @return {Rectangle}
 */
Scene_GamepadConfigMA.prototype.SymbolListWindowRect=function(){
    const x= this._gamepadWindow.x+this._gamepadWindow.width;
    return new Rectangle(x,this._gamepadWindow.y,0,0);
};



function keyinfoEX(char,keycord,special,locked){
    return {
        char:char,
        keycord:String(keycord),
        isLink:Boolean(  !!special||false ),
        locked:Boolean( locked),
    };
}
/**
 * @param {string} char 
 * @param {number} keycord 
 */
function keyinfo(char,keycord){
    return keyinfoEX(char,keycord,false,false);
}

const KEYS ={
    SPACE:keyinfoEX('Space',32,true),
    NULL:keyinfoEX('NULL',0,true,true),
    UP:keyinfoEX(setting.keyText.up,38,false,true),
    DOWN:keyinfoEX(setting.keyText.down,40,false,true),
    LEFT:keyinfoEX(setting.keyText.left,37,false,true),
    RIGHT :keyinfoEX(setting.keyText.right,39,false,true),
    ENTER:keyinfoEX('enter',13,true,true),
    TENKEY0:keyinfoEX('0',96,true),
    TENKEY1:keyinfo('1',97),
    TENKEY2:keyinfo('2',98),
    TENKEY3:keyinfo('3',99),
    TENKEY4:keyinfo('4',100),
    TENKEY5:keyinfo('5',101),
    TENKEY6:keyinfo('6',102),
    TENKEY7:keyinfo('7',103),
    TENKEY8:keyinfo('8',104),
    TENKEY9:keyinfo('9',105),
    TENKEY_DOT:keyinfo('.',110),

    _0:keyinfo('0',48),
    _1:keyinfo('1',49),
    _2:keyinfo('2',50),
    _3:keyinfo('3',51),
    _4:keyinfo('4',52),
    _5:keyinfo('5',53),
    _6:keyinfo('6',54),
    _7:keyinfo('7',55),
    _8:keyinfo('8',56),
    _9:keyinfo('9',57),

    A:keyinfo('A',65),
    B:keyinfo('B',66),
    C:keyinfo('C',67),
    D:keyinfo('D',68),
    E:keyinfo('E',69),
    F:keyinfo('F',70),
    G:keyinfo('G',71),
    H:keyinfo('H',72),
    I:keyinfo('I',73),
    J:keyinfo('J',74),
    K:keyinfo('K',75),
    L:keyinfo('L',76),
    M:keyinfo('M',77),
    N:keyinfo('N',78),
    O:keyinfo('O',79),
    P:keyinfo('P',80),
    Q:keyinfo('Q',81),
    R:keyinfo('R',82),
    S:keyinfo('S',83),
    T:keyinfo('T',84),
    U:keyinfo('U',85),
    V:keyinfo('V',86),
    W:keyinfo('W',87),
    X:keyinfo('X',88),
    Y:keyinfo('Y',89),
    Z:keyinfo('Z',90),

    SHIFT:keyinfo('Shift',16),
    CTRL:keyinfoEX('CTRL',17,false,true),
    INSERT:keyinfo('Ins',45),
    BACK:keyinfo('Back',8),
    HOME:keyinfo('Home',36),
    END:keyinfo('End',35),
    PAGEUP:keyinfo('PgUp',33),
    PAGEDOWN:keyinfo('PgDn',34),
    ESC:keyinfoEX('esc',27,false,true),

    ATMARK:keyinfo("@", 192),

    TENKEY_MINUS :keyinfo('-',109),
    TENKEY_PLUS :keyinfo('+',107),
    MINUS :keyinfo('-',189),
    COMMA :keyinfo(',',188),
    SEMICOLON:keyinfo(';',186),

    SLASH:keyinfo('/',191),
    BACKSLASH:keyinfo('\\',226),
    DOT :keyinfo('.',190),
    
    COLON:keyinfo(':',58),
    CARET:keyinfo('^',222),
    APOSTROPHE:keyinfo("'",222), 

    EQUAL_JIS:keyinfo('=',189),
    
    SQUARE_BRACKETS_OPEN :keyinfo('[',219),
    SQUARE_BRACKETS_CLOSE :keyinfo(']',221),
};
const KEYLAYOUT_JIS =[
    KEYS.ESC,
    KEYS._1 ,
    KEYS._2 ,
    KEYS._3 ,
    KEYS._4, 
    KEYS._5, 
    KEYS._6, 
    KEYS._7, 
    KEYS._8, 
    KEYS._9, 
    KEYS._0, 
    KEYS.MINUS,
    KEYS.CARET,
    KEYS.INSERT ,
    KEYS.BACK ,
    KEYS.HOME ,
    KEYS.END ,
    KEYS.PAGEUP ,
    KEYS.PAGEDOWN ,

    KEYS.NULL,

    KEYS.Q ,
    KEYS.W ,
    KEYS.E ,
    KEYS.R ,
    KEYS.T ,
    KEYS.Y ,
    KEYS.U ,
    KEYS.I ,
    KEYS.O ,
    KEYS.P ,
    KEYS.ATMARK,
    KEYS.SQUARE_BRACKETS_OPEN,
    KEYS.ENTER,
    KEYS.ENTER,
    KEYS.TENKEY7 ,
    KEYS.TENKEY8 ,
    KEYS.TENKEY9 ,
    KEYS.TENKEY_MINUS,
    KEYS.NULL,
    KEYS.A ,
    KEYS.S ,
    KEYS.D ,
    KEYS.F ,
    KEYS.G ,
    KEYS.H ,
    KEYS.J ,
    KEYS.K ,
    KEYS.L ,
    KEYS.SEMICOLON,
    KEYS.COLON,
    KEYS.SQUARE_BRACKETS_CLOSE, 
    KEYS.ENTER,
    KEYS.ENTER,
    KEYS.TENKEY4 ,
    KEYS.TENKEY5 ,
    KEYS.TENKEY6 ,
    KEYS.TENKEY_PLUS,

    KEYS.SHIFT ,
    KEYS.Z ,
    KEYS.X ,
    KEYS.C ,
    KEYS.V ,
    KEYS.B ,
    KEYS.N ,
    KEYS.M ,
    KEYS.COMMA,
    KEYS.DOT,
    KEYS.SLASH,
    
    KEYS.BACKSLASH,
    KEYS.SHIFT,
    KEYS.UP,
    KEYS.NULL,
    
    KEYS.TENKEY1 ,
    KEYS.TENKEY2 ,
    KEYS.TENKEY3 ,
    KEYS.NULL,

    KEYS.CTRL  ,
    KEYS.NULL,
    KEYS.NULL,
    KEYS.NULL,
    KEYS.SPACE,
    KEYS.SPACE,
    KEYS.SPACE,
    KEYS.SPACE,
    KEYS.NULL,
    KEYS.NULL,
    KEYS.NULL,
    KEYS.NULL,
    KEYS.LEFT,
    KEYS.DOWN,
    KEYS.RIGHT,
    KEYS.TENKEY0,
    KEYS.TENKEY0,
    KEYS.TENKEY_DOT,
    KEYS.NULL,
];
const KEYLAYOUT_US =[
    KEYS.ESC,
    KEYS._1 ,
    KEYS._2 ,
    KEYS._3 ,
    KEYS._4, 
    KEYS._5, 
    KEYS._6, 
    KEYS._7, 
    KEYS._8, 
    KEYS._9, 
    KEYS._0, 
    KEYS.MINUS,
    KEYS.EQUAL_JIS,
    KEYS.INSERT ,
    KEYS.BACK ,
    KEYS.HOME ,
    KEYS.END ,
    KEYS.PAGEUP ,
    KEYS.PAGEDOWN ,

    KEYS.NULL,
    KEYS.Q ,
    KEYS.W ,
    KEYS.E ,
    KEYS.R ,
    KEYS.T ,
    KEYS.Y ,
    KEYS.U ,
    KEYS.I ,
    KEYS.O ,
    KEYS.P ,
    KEYS.SQUARE_BRACKETS_OPEN,
    KEYS.SQUARE_BRACKETS_CLOSE, 
    KEYS.BACKSLASH,
    KEYS.NULL,
    KEYS.TENKEY7 ,
    KEYS.TENKEY8 ,
    KEYS.TENKEY9 ,
    KEYS.TENKEY_MINUS,
    KEYS.NULL,
    KEYS.A ,
    KEYS.S ,
    KEYS.D ,
    KEYS.F ,
    KEYS.G ,
    KEYS.H ,

    KEYS.J ,
    KEYS.K ,
    KEYS.L ,
    KEYS.SEMICOLON,
    KEYS.APOSTROPHE, //元COLON
    KEYS.ENTER,
    KEYS.ENTER,
    KEYS.ENTER,

    KEYS.TENKEY4 ,
    KEYS.TENKEY5 ,
    KEYS.TENKEY6 ,
    KEYS.TENKEY_PLUS,

    KEYS.SHIFT ,
    KEYS.Z ,
    KEYS.X ,
    KEYS.C ,
    KEYS.V ,
    KEYS.B ,
    KEYS.N ,
    KEYS.M ,
    KEYS.COMMA,
    KEYS.DOT,
    KEYS.SLASH,
    
    KEYS.NULL,
    KEYS.SHIFT,
    KEYS.UP,
    KEYS.NULL,
    
    KEYS.TENKEY1 ,
    KEYS.TENKEY2 ,
    KEYS.TENKEY3 ,
    KEYS.NULL,
    
    KEYS.CTRL  ,
    KEYS.NULL,
    KEYS.NULL,
    KEYS.NULL,
    KEYS.SPACE,
    KEYS.SPACE,
    KEYS.SPACE,
    KEYS.SPACE,
    KEYS.NULL,
    KEYS.NULL,
    KEYS.NULL,
    KEYS.NULL,
    KEYS.LEFT,
    KEYS.DOWN,
    KEYS.RIGHT,
    KEYS.TENKEY0,
    KEYS.TENKEY0,
    KEYS.TENKEY_DOT,
    KEYS.NULL,    
];

class Window_KeyConfig_MA extends Window_Selectable {
    initialize() {
        this.setKeyboradMapper(Input.keyMapper);
        this.setKeyLayout(ConfigManager.keyLayout_MA);
        const height = this.fittingHeight(12);
        super.initialize(0, 0, Graphics.boxWidth, height);
        this.initElementsSize();
        this.refresh();
        this.activate();
        this.select(0);
        this.moveCenter();
    }
    initElementsSize() {
        const x = Graphics.boxWidth;
        const p = this.textPadding();
        this._itemWidth = Math.round((x - p * 6) / this.maxCols());
    }
    changeKeyMap(index, symbol) {
        const keyNumber = this.keyNumber(index);
        this._map[keyNumber] = symbol;
        this.redrawItem(index);
        this.redrawApplyCommand();
    }
    /**
     * @param {String} layoutText
     */
    setKeyLayout(layoutText) {
        if (this._layoutText === layoutText) {
            return;
        }
        this._layoutText = layoutText;
        if (layoutText === 'JIS') {
            this._extraIndex = KEY_INDEX_JIS;
            this._list = KEYLAYOUT_JIS;
        }
        else {
            this._extraIndex = KEY_INDEX_US;
            this._list = KEYLAYOUT_US;
        }
    }
    getKeyLayout() {
        return this._layoutText;
    }
    setKeyboradMapper(mapper) {
        this._map = objectClone(mapper);
    }
    canApplySetting() {
        return isValidMapper(this._map);
    }
    cloneMapper() {
        return createNormalizedInputMapper(this._map);
    }
    itemTextAlign() {
        return 'center';
    }
    moveCenter() {
        const x = Graphics.boxWidth / 2 - this.width / 2;
        const y = Graphics.boxHeight / 2 - this.height / 2;
        this.move(x, y, this.width, this.height);
    }
    processCancel() {
        SoundManager.playCancel();
        this.updateInputData();
        const index = this.index();
        const exitIndex = this._extraIndex.COMMAND_EXIT;
        if (index === exitIndex) {
            this.callCancelHandler();
        }
        else {
            this.select(exitIndex);
        }
    }
    processApply() {
        this.updateInputData();
        this.deactivate();
        SoundManager.playEquip();
        this.callHandler('apply');
    }
    processDefault() {
        SoundManager.playEquip();
        this.callHandler('default');
    }
    processChangeLayout() {
        SoundManager.playEquip();
        const L = this.getKeyLayout();
        if (L !== 'JIS') {
            this.setKeyLayout('JIS');
        }
        else {
            this.setKeyLayout('US');
        }
        this.refresh();
    }
    processOk() {
        const index = this.index();
        if (index < 0) {
            return;
        }
        const item = this._list[index];
        if (item === Window_KeyConfig_MA.COMMAND_APPLY) {
            this.processApply();
            return;
        }
        if (item === Window_KeyConfig_MA.COMMAND_DEFAULT) {
            this.processDefault();
            return;
        }
        if (item === Window_KeyConfig_MA.COMMAND_EXIT) {
            SoundManager.playCancel();
            this.callCancelHandler();
            return;
        }
        if (item === Window_KeyConfig_MA.COMMAND_CHANGE_LAYOUT) {
            this.processChangeLayout();
            return;
        }
        if (item.locked) {
            this.playBuzzerSound();
            return;
        }
        this.playOkSound();
        this.updateInputData();
        this.deactivate();
        this.callOkHandler();
    }
    itemHeight() {
        return this.lineHeight() * 2;
    }
    itemWidth() {
        return this._itemWidth;
        //    return 41;
    }
    maxPageRows() {
        return 100;
    }
    maxCols() {
        return 19;
    }
    numVisibleRows() {
        return this._list.length;
    }
    /**
     * @return {Rectangle}
     */
    enterRect() {
        const rect = super.itemRect( this.enterIndex());
        rect.width *= this._extraIndex.ENTER_WIDTH;
        rect.height *= this._extraIndex.ENTER_HEIGHT;
        return rect;
    }
    spaceRect() {
        const rect = super.itemRect(this.spaceIndex());
        rect.width *= Window_KeyConfig_MA.spaceItems;
        return rect;
    }
    tenkeyZeroRect() {
        const rect = super.itemRect(this.tenkeyZeroIndex());
        rect.width *= 2;
        return rect;
    }
    itemRect(index) {
        const item = this._list[index];
        if (item.isLink) {
            if (item === KEYS.ENTER) {
                return this.enterRect();
            }
            if (this.isSpaceIndex(index)) {
                return this.spaceRect();
            }
            if (item === KEYS.TENKEY0) {
                return this.tenkeyZeroRect();
            }
            if (item === Window_KeyConfig_MA.COMMAND_DEFAULT) {
                return this.defaultCommandRect();
            }
            if (item === Window_KeyConfig_MA.COMMAND_DEFAULT) {
                return this.defaultCommandRect();
            }
            if (item === Window_KeyConfig_MA.COMMAND_APPLY) {
                return this.applyCommandRect();
            }
            if (item === Window_KeyConfig_MA.COMMAND_EXIT) {
                return this.exitCommandRect();
            }
            if (item === Window_KeyConfig_MA.COMMAND_CHANGE_LAYOUT) {
                return this.changeLayoutCommandRect();
            }
        }
        return super.itemRect(index);
    }
    maxItems() {
        return this._list.length;
    }
    spacing() {
        return 0;
    }
    /**
     * @param {number}index
     * @return {String}
     */
    keyNumber(index) {
        return this._list[index].keycord;
    }
    currentKeyNumber() {
        return this.keyNumber(this.index());
    }
    keyName(index) {
        return this._list[index].char;
    }
    isEnterIndex(index) {
        return this._list[index] === KEYS.ENTER;
    }
    enterIndex() {
        return this._extraIndex.ENTER;
    }
    spaceIndex() {
        return this._extraIndex.SPACE;
    }
    tenkeyZeroIndex() {
        return this.maxCols() * 4 + 15;
    }
    isTenkeyZeroIndex(index) {
        return this._list[index] === KEYS.TENKEY0;
    }
    isSpaceIndex(index) {
        const spaceStart = this.spaceIndex();
        return spaceStart <= index && index < spaceStart + Window_KeyConfig_MA.spaceItems;
    }
    /**
     * @param {Rectangle} rect
     */
    drawRect(rect, color) {
        this.changePaintOpacity(false);
        this.contents.fillRect(rect.x + 1, rect.y + 1, rect.width - 2, rect.height - 2, color);
        this.changePaintOpacity(true);
    }
    drawItemRect(enabled, rect) {
        if (enabled) {
            this.drawRect(rect, this.textColor(14));
        }
        else {
            this.drawRect(rect, this.gaugeBackColor());
        }
    }
    cursorUp(wrap) {
        if (wrap || this._index >= this.maxCols()) {
            this.cursorMoveCheck(-this.maxCols());
        }
    }
    cursorDown(wrap) {
        if (wrap || this._index < this.maxItems() - this.maxCols()) {
            this.cursorMoveCheck(this.maxCols());
        }
    }
    cursorLeft(wrap) {
        if (wrap || this._index > 0) {
            this.cursorMoveCheck(-1);
        }
    }
    cursorRight(wrap) {
        if (wrap || this._index < this.maxItems() - 1) {
            this.cursorMoveCheck(1);
        }
    }
    nextIndex(current, moveDir) {
        const maxItems = this.maxItems();
        return (current + moveDir + maxItems) % maxItems;
    }
    cursorMoveCheck(moveDir) {
        var current = this.index();
        var next = this.nextIndex(current, moveDir);
        const last = Math.abs(this.maxItems() / moveDir);
        for (var i = 0; i < last; ++i) {
            var itemA = this._list[current];
            var itemB = this._list[next];
            if (itemB === KEYS.NULL) {
                break;
            }
            if (itemA !== itemB) {
                break;
            }
            next = this.nextIndex(next, moveDir);
        }
        this.select(next);
    }
    symbolTextColor() {
        return this.textColor(4);
    }
    redrawItem(index) {
        this.clearItem(index);
        const item = this._list[index];
        if (item === KEYS.ENTER) {
            this.drawEnter();
        }
        else if (item === KEYS.SPACE) {
            this.drawSpace();
        }
        else if (item === KEYS.TENKEY0) {
            this.drawTenkeyZero();
        }
        else {
            this.drawItem(index);
        }
    }
    drawAllItems() {
        const last = this.maxPageItems();
        for (var i = 0; i < last; i++) {
            var index = i;
            var item = this._list[i];
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
        this.drawChangeLayoutCommand();
    }
    drawItemText(keyName, symobolText, x, y, width) {
        this.changeTextColor(this.normalColor());
        this.drawText(keyName, x, y, width, 'center'); //,this.itemTextAlign());
        this.changeTextColor(this.textColor(4));
        if (symobolText) {
            this.drawText(symobolText, x, y + this.lineHeight(), width, 'center');
        }
    }
    drawSpace() {
        const index = this.spaceIndex();
        const rect = this.spaceRect();
        this.drawItemRect(!!this.symbol(index), rect);
        const x = rect.x + this.itemWidth();
        const width = rect.width / 2;
        this.drawItemText(this.keyName(index), this.symbolText(index), rect.x, rect.y, rect.width);
    }
    drawEnter() {
        const rect = this.enterRect();
        var y = rect.y; // + rect.height;
        if (this._extraIndex === KEY_INDEX_JIS) {
            y += rect.height / 4;
        }
        const index = this.enterIndex();
        this.drawItemRect(!!this.symbol(index), rect);
        this.drawItemText(this.keyName(index), this.symbolText(index), rect.x, y, rect.width);
    }
    drawTenkeyZero() {
        const rect = this.tenkeyZeroRect();
        const index = this.tenkeyZeroIndex();
        this.drawItemRect(!!this.symbol(index), rect);
        this.drawItemText(this.keyName(index), this.symbolText(index), rect.x, rect.y, rect.width);
    }
    symbol(index) {
        const keyNumber = this.keyNumber(index);
        return this._map[keyNumber];
    }
    symbolText(index) {
        const symbol = this.symbol(index);
        return symbol;
    }
    rectColor() {
        return this.textColor(2);
    }
    drawItem(index) {
        const rect = this.itemRect(index);
        this.drawItemRect(!!this.symbol(index), rect);
        this.drawItemText(this.keyName(index), this.symbolText(index), rect.x, rect.y, rect.width);
    }
    commandWidth() {
        return this.itemWidth() * 8;
    }
    commandHeight() {
        return this.itemHeight();
    }
    makeCommandList() {
    }
    commandBackColor() {
        return this.gaugeBackColor();
    }
    commandColor() {
        return this.normalColor();
    }
    drawCommand(commandName, rect) {
        this.changeTextColor(this.commandColor());
        this.drawRect(rect, this.commandBackColor());
        this.drawText(commandName, rect.x, rect.y, rect.width, 'center');
    }
    /**
     * @return {Rectangle}
     */
    defaultCommandRect() {
        const index = this._extraIndex.COMMAND_DEFAULT;
        const rect = super.itemRect( index);
        rect.width *= setting.commandWidth.DEFAULT;
        return rect;
    }
    drawDefaultCommand() {
        const rect = this.defaultCommandRect();
        this.drawCommand(setting.commandText.default_, rect);
    }
    /**
     * @return {Rectangle}
     */
    applyCommandRect() {
        const index = this._extraIndex.COMMAND_APPLY;
        const rect = super.itemRect( index);
        rect.width *= setting.commandWidth.APPLY;
        return rect;
    }
    redrawApplyCommand() {
        this.clearItem(this._extraIndex.COMMAND_APPLY); //   Window_KeyConfig_MA.INDEX_APPLY_COMMAND);
        this.drawApplyCommand();
    }
    drawApplyCommand() {
        const rect = this.applyCommandRect();
        this.drawRect(rect, this.commandBackColor());
        this.changeTextColor(this.commandColor());
        this.drawText(setting.commandText.apply, rect.x, rect.y, rect.width, 'center');
    }
    /**
     * @return {Rectangle}
     */
    exitCommandRect() {
        const exitIndex = this._extraIndex.COMMAND_EXIT;
        const rect = super.itemRect(exitIndex); // Window_KeyConfig_MA.INDEX_EXIT_COMMAND);
        rect.width *= setting.commandWidth.EXIT;
        return rect;
    }
    /**
     * @return {Rectangle}
     */
    changeLayoutCommandRect() {
        const index = this._extraIndex.COMMAND_LAYOUT;
        const rect = super.itemRect( index);
        rect.width *= setting.commandWidth.LAYOUT;
        return rect;
    }
    drawChangeLayoutCommand() {
        const rect = this.changeLayoutCommandRect();
        this.drawCommand(setting.commandText.changeLayout, rect);
    }
    drawexitCommand() {
        const rect = this.exitCommandRect();
        this.drawCommand(setting.commandText.exit, rect);
    }
}


Window_KeyConfig_MA.COMMAND_DEFAULT =keyinfoEX(setting.commandText.default_,0,true);
Window_KeyConfig_MA.COMMAND_APPLY =keyinfoEX(setting.commandText.apply,0,true);
Window_KeyConfig_MA.COMMAND_EXIT =keyinfoEX(setting.commandText.exit,0,true);
Window_KeyConfig_MA.COMMAND_CHANGE_LAYOUT =keyinfoEX(setting.commandText.changeLayout,0,true);

(function(){

function pushKeyconfigCommand(data,count){
    for(var i=0; i< count;++i){
        KEYLAYOUT_US.push(data);
        KEYLAYOUT_JIS.push(data);        
    }
}
// コマンドの並び順を変えたいときは、ここを編集してください
pushKeyconfigCommand(Window_KeyConfig_MA.COMMAND_DEFAULT,  setting.commandWidth.DEFAULT);
pushKeyconfigCommand(Window_KeyConfig_MA.COMMAND_APPLY,  setting.commandWidth.APPLY);
pushKeyconfigCommand(Window_KeyConfig_MA.COMMAND_EXIT,  setting.commandWidth.EXIT);
pushKeyconfigCommand(Window_KeyConfig_MA.COMMAND_CHANGE_LAYOUT,  setting.commandWidth.LAYOUT);

for(var i =KEYLAYOUT_JIS.length ; i<114;++i){
    KEYLAYOUT_JIS.push(KEYS.NULL);
}
for(var i =KEYLAYOUT_US.length ; i<114;++i){
    KEYLAYOUT_US.push(KEYS.NULL);
}
})();


/**
 * 
 * @param {[]} keyLayout 
 */
function makeKeylayoutIndex(keyLayout){
    return {
        ENTER:keyLayout.indexOf(KEYS.ENTER),
        ENTER_WIDTH:2,
        ENTER_HEIGHT:2,
        SPACE:keyLayout.indexOf(KEYS.SPACE),
        COMMAND_DEFAULT:keyLayout.indexOf(Window_KeyConfig_MA.COMMAND_DEFAULT),
        COMMAND_APPLY:keyLayout.indexOf(Window_KeyConfig_MA.COMMAND_APPLY),
        COMMAND_EXIT:keyLayout.indexOf(Window_KeyConfig_MA.COMMAND_EXIT),
        COMMAND_LAYOUT:keyLayout.indexOf(Window_KeyConfig_MA.COMMAND_CHANGE_LAYOUT),
    };
};
const KEY_INDEX_JIS = makeKeylayoutIndex(KEYLAYOUT_JIS);
const KEY_INDEX_US = makeKeylayoutIndex(KEYLAYOUT_US);
KEY_INDEX_US.ENTER_WIDTH=3;
KEY_INDEX_US.ENTER_HEIGHT=1;





















Window_KeyConfig_MA.spaceItems =4;























class Scene_KeyConfig_MA extends Scene_InputConfigBase_MA{
    symbolCenter() {
        return true;
    }
    create() {
        Scene_MenuBase.prototype.create.call(this);
        this.createKeyboradConfigWindow();
        this.createSymbolListWindow();
    }
    onConfigCancel() {
        SceneManager.pop();
    }
    changeSymbol(symbol) {
        const index = this._keyconfigWindow.index();
        this._keyconfigWindow.changeKeyMap(index, symbol);
    }
    onConfigOk() {
//        const keyNumber = this._keyconfigWindow.currentKeyNumber();
        this.selectSymbol();
    }
    loadDefautConfig() {
        this._keyconfigWindow.setKeyboradMapper(Mano_InputConfig.defaultKeyMapper);
        this._keyconfigWindow.refresh();
    }
    terminate() {
        super.terminate();
        ConfigManager.setKeyLayoutMA(this._keyconfigWindow.getKeyLayout());
        if (this._applyOnExit) {
            Input.keyMapper = this._keyconfigWindow.cloneMapper();
        }
    }
    applyKeyboardConfig() {
        this._applyOnExit = true;
        this.popScene();
    }
    createKeyboradConfigWindow() {
        const kcw = new Window_KeyConfig_MA();
        kcw.setHandler('cancel', this.onConfigCancel.bind(this));
        kcw.setHandler('ok', this.onConfigOk.bind(this));
        kcw.setHandler('default', this.loadDefautConfig.bind(this));
        kcw.setHandler('apply', this.applyKeyboardConfig.bind(this));
        this.addWindow(kcw);
        this._keyconfigWindow = kcw;
    }
    mainWidnow() {
        return this._keyconfigWindow;
    }
}







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
        if(setting.gamepadConfigEnabled){
            this._gamepadOptionIndex = this._list.length;
            this.addCommand(setting.commandName,MA_GAMEPAD_CONFIG);
        }
    };
    Window_Options.prototype.addKeyboardConfig_MA=function(){
        if(setting.keyboardConfigEnabled){
            this._keyboardConfigIndex = this._list.length;
            this.addCommand(setting.keyConfigCommandName,MA_KEYBOARD_CONFIG);
        }
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
const Scene_Boot_create =Scene_Boot.prototype.create 
Scene_Boot.prototype.create =function(){
    MA_InputSymbolsEx_Import();
    Mano_InputConfig.defaultGamepadMapper =Object.freeze( objectClone(Input.gamepadMapper));
    Mano_InputConfig.defaultKeyMapper= Object.freeze(objectClone(Input.keyMapper));
    Scene_Boot_create.call(this);
};
/**
 * @returns {String[]}
 * @param {Object} mapper 
 */
function unknowSymbols(mapper){
    const result =[];
    const systemKeys =new Set(["debug","control","tab","up","down","left","right"]);

    for (const key in mapper) {
        if (mapper.hasOwnProperty(key)) {
            const value = mapper[key];
            if(!systemKeys.has(value)){
                if(!setting.symbolList.contains(value)){
                    result.push(value);
                }
            }
        }
    }
    return result;
}

const exportClass ={
    Scene_KeyConfig:Scene_KeyConfig_MA,
    Scene_GamepadConfig: Scene_GamepadConfigMA,
    Window_InputSymbolList:Window_InputSymbolList,
    Window_GamepadConfig:Window_GamepadConfig_MA,
    Window_KeyConfig:Window_KeyConfig_MA,
    symbolToButtonName:symbolToButtonName,
    symbolToButtonNumber:symbolToButtonNumber,
    defaultKeyMapper:{},
    defaultGamepadMapper:{},
    gotoKey:function(){
        SceneManager.push(Scene_KeyConfig_MA  );
    },
    gotoGamepad:function(){
        SceneManager.push(Scene_GamepadConfigMA  );
    },
    unknowButtons:function(){
        return unknowSymbols(Input.gamepadMapper);
    },
    unknowKeys:function(){
        return unknowSymbols(Input.keyMapper);
    }
};

return exportClass;
})();

