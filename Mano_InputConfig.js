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
 * @author しぐれん
 * 
 * @param overwriteWarning
 * @desc このプラグインで割り当てたボタン設定が、既存の入力に対して上書きしている場合にconsoleへ警告を出します
 * @type boolean
 * @default true
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
 * このプラグインよりも早く、
 * Input.gamepadMapperが変更されていた場合、
 * それを初期値として扱います。
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

/*:
 * @plugindesc Gamepad and Keyboard mapper setting plugin.
 * Inputting extend support.
 * @author sigureya(しぐれん)
 * 
 * @param overwriteWarning
 * @desc If the button setting assigned by this plugin is overwriting existing input, a warning is issued to console
 * @type boolean
 * @default true
 *
 * @param defaultGamepadMapper
 * @desc It is a button arrangement at the beginning of the game.
 * If you press "Restore Default Settings", this will be loaded.
 * @type select
 * @option RPGmakerDefault
 * @value 0
 * @option MV default + ok / cancel swap
 * @value 1
 * @default 0
 * 
 * @param text
 * @param CommandWidth
 * 
 * @param textApply
 * @desc The name of the command to apply the setting to.
 * When you select it, configuration ends.
 * @default save setting
 * @parent text
 * 
 * @param textRollback
 * @desc The command name to restore to the state before config start.
 * @default Restore before change
 * @parent text
 * 
 * @param textDefault
 * @desc It is a command to return to the initial setting.
 * @default Restore default settings
 * @parent text
 * 
 * @param textChangeLayout
 * @desc It is a command to change key placement in JIS / US.
 * @default JIS/US
 * @parent text
 * 
 * @param textExit
 * @desc This is the command name when finishing config.
 * @default exit
 * @parent text
 * 
 * @param textEmpty
 * @desc Explanation when no function is assigned
 * @default 設定を消去
 * @parent text
 * 
 * @param textOK
 * @desc Description of ok's function
 * @default ok
 * @parent text
 * 
 * @param textCancel
 * @desc cancelの機能の説明
 * Description of cancel function
 * @default cancel
 * @parent text
 * 
 * @param textShift
 * @desc shiftの機能の説明
 * Description of shift function
 * @default dash
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
 * @desc It is a required symbol.
 * You can save changes only if you have all these symbols.
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
 * @desc List of available buttons.
 * It also controls the sorting order.
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
 * @param button16
 * @desc PS2コントローラ：
 * @type struct<ButtonInfo>
 * @default {"buttonName":"button16","action":""}
 * @parent buttons
 * @param button_unknow
 * 
 * @param gamepadConfigPositionMode
 * @text ゲームパッドコンフィグの位置
 * @desc ウィンドウの位置
 * @type select
 * @option center
 * @value center
 * @option custom(NumberSetting)
 * @value custom
 * @default center
 * 
 * @param gamepadConfigPositionX
 * @desc WindowPositionX
 * @type number
 * @default 100
 * @parent gamepadConfigPositionMode
 * 
 * @param gamepadConfigPositionY
 * @desc WindowPositionY
 * @type number
 * @default 100
 * @parent gamepadConfigPositionMode
 * 
 * @param gamepadSymbolPositionMode
 * @text シンボルリストの位置
 * @desc ウィンドウの位置
 * @option right
 * @value right 
 * @type select
 * @option center
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
 * @desc GamepadConfig col elements
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
 * @default Gamepad Config
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
 * Load settings of game startup as default values.
 * Faster than this plug-in,
 * If Input.gamepadMapper has been changed,
 * We treat it as initial value.
 *
 * The configuration data set by this plug-in is recorded in the file.
 * If you insert a new plugin,
 * Please reset the configuration to "initial setting" after starting the game.
 *
 * ■ extendSymbols
 * You can define new actions by defining them.
 * If you enter Key here, input can be obtained with Input.isPressed ('Key').
 * Please do not forget to register in symbols
 * About * symbols
 * Define the order in which you want to display in the list after pressing Enter on the button selection screen.
 * About * mandatorySymbols
 * It is a list of buttons that become necessary to operate the game.
 * It will be a problem if you change the setting and cancellation settings and the game will not move,
 * Settings can not be saved when some buttons are missing.
 * In the initial setting, three of decision, cancel and menu are assigned.
 *
 * Although there are relatively few problems with game pads,
 * If you have a keyboard, problems will arise.
 * The insert key is hard to work on some PCs.
 *
 * ■ About second parameter · action of button
 * It was originally data that was supposed to be a symbol.
 * In addition to the default settings,
 * The setting added here by overwriting becomes the initial setting.
 *  

 * ■ About setting new symbol
 * We will do it here when setting game specific operation.
 * For example, you want to set a new symbol called shot to fire bullets.
 * In this case, set "Symbol description" with textSymbol 6.
 * Then type "shot" for extendSymbol6.
 * Next, add shot to symbols.
 * If you are constantly using it during the game, also add it to mandatorySymbols.
 * If you finish all this, input.pressed ('shot') etc.
 * It will be able to acquire the input state. * 
 * 
 * I made it as KeyBoradConfig part and looked at YEP_KeyboardConfig.js.
 * Yanfly.Thank you for creating a nice plugin!
 * 
 * 更新履歴
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

(function(global){
    'use strict'

    const objectClone = (!!Object.assign)?Object.assign :(function(obj){
        var result ={};
        Object.keys(obj).forEach(function(key){
            result[key] = obj[key];
        })
        return result;
    })
    
    // function objectClone( obj ){
    //     return Object.assign({},obj);
    // }
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
        return JSON.parse(params.symbols);
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

    function makeKeyboardSamples(){
        const RPGmakerDefault =objectClone(  Input.keyMapper);
        return [RPGmakerDefault];
    }

    function makeConfigSamples(){
        console.log(Input.gamepadMapper);
        const RPGmakerDefault =objectClone(  Input.gamepadMapper);
        const ab_swaped =objectClone(  Input.gamepadMapper);
        ab_swaped[0] = RPGmakerDefault[1];
        ab_swaped[1] = RPGmakerDefault[0];
        return [RPGmakerDefault,ab_swaped];
    }

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
    const configSamples =makeConfigSamples(buttonInfo);
    for(var key in buttonInfo){
        const x = buttonInfo[key];
        if(x.symbol){
            configSamples.forEach(function(sample){
                const preSymbor =sample[key];
                // 警告機能
                if(overwriteWarning && preSymbor){
                    console.log('overwriteWarning/キー上書き警告 \ngamepadMapper['+key+']('+preSymbor+')='+x.symbol);
                }
                sample[key] =x.symbol;
            });
        }
    }

    const keyConfigSamples = makeKeyboardSamples();
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
        configSamples :configSamples,
        keyConfigSamples:keyConfigSamples,

        configIndex:Number(params.defaultGamepadMapper),
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


//ツクールのデフォルトと同様の設定です
function RPGmakerDefault(){
    return objectClone(setting.configSamples[setting.configIndex]);
}

function createKeyboradMapper(){
    return setting.keyConfigSamples[0];
}

function createGamepadMapper(){
    const index = setting.configIndex;
    return setting.configSamples[index];
};

(function MA_InputSymbolsEx_Import(){
    if(!MA_InputSymbols){return;}

    for(var i =0; i <MA_InputSymbols.length; ++i){
        var elem =MA_InputSymbols[i];
        var symbol = elem.symbol;
        var mandatory =elem.mandatory;
        if(mandatory ===true || mandatory ==='true'){
            setting.mandatorySymbols.push(symbol);
        }
        setting.symbolText[symbol] =elem.text;
        if(!setting.symbolList.contains(symbol)){
            setting.symbolList.push(symbol);
        }
    }
})();



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


Input.gamepadMapper = createGamepadMapper();
const MA_KEYBOARD_CONFIG ='KEYBOARD_CONFIG';
const MA_GAMEPAD_CONFIG = 'GAMEPAD_CONFIG';
const MA_KEYBOARD_LAYOUT ='KEYBOARD_LAYOUT';
// const MA_KEYBOARD_LAYOUT_JIS ='KEYBOARD_LAYOUT_JIS';
// const MA_KEYBOARD_LAYOUT_JIS ='KEYBOARD_LAYOUT_US';


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
    Input.gamepadMapper = readGamePadConfig(config);
    Input.keyMapper =readKeyboardConfig(config);
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


Window_InputSymbolList.prototype.initialize=function(x,y){
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
    for(var i=0; i <setting.symbolList.length; ++i){
        const actionKey = setting.symbolList[i];
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
    var x =0;
    var y =0;
    
    if(setting.gamepadConfigPosition.mode==='center'){
//    if(setting.gamepadConfigPosition){
        x =(Graphics.boxWidth - w) / 2;///:setting.windowCustom.x;
        y =(Graphics.boxHeight - h) / 2;//:setting.windowCustom.y;
    }else{
        x = setting.gamepadConfigPosition.x;
        y = setting.gamepadConfigPosition.y;
    }

    Window_GamepadConfig_MA.baseType.prototype.initialize.call(this,x,y,w,h);
    this.defineNameWidth();
    this.defineSymbolTextWidth();
//    this.readGamePad();
};

// Window_GamepadConfig_MA.prototype.readGamePad =function(){
//     if (navigator.getGamepads) {
//         var gamepads = navigator.getGamepads();
//         if (gamepads) {
//             var gamepad = gamepads[1];
//             if (gamepad && gamepad.connected) {
//                 this._updateGamepadState(gamepad);
//             }
//         }
//     }
// };

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
    if(this._list[index]){
        this.updateInputData();
        this.deactivate();
        this.playOkSound();
        this.callOkHandler(); 
    }
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

/**
 * @return {number}
 */
Window_GamepadConfig_MA.prototype.configItems =function(){
    return this._list.length;
};
Window_GamepadConfig_MA.prototype.setGamepadMapper =function(map){
    this._map =   objectClone(map);
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

/**
 * @return {boolean}
 */
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

Scene_InputConfigBase_MA.prototype.symbolListWindowPostion =function(){
    return {x:0,y:0};
};
Scene_InputConfigBase_MA.prototype.symbolCenter =function(){
    return false;
};
Scene_InputConfigBase_MA.prototype.createSymbolListWindow =function(x,y){
    const pos = this.symbolListWindowPostion();

    const asw = new Window_InputSymbolList(pos.x,pos.y);
    asw.setHandler('ok',this.onSymbolListOk.bind(this));
    asw.setHandler('cancel',this.onSymbolListCancel.bind(this));
    asw.hide();
    asw.refresh();
    if(this.symbolCenter()){
        asw.moveCenter();
    }
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
Scene_GamepadConfigMA.prototype.symbolListWindowPostion=function(){
    if(setting.gamepadSymbolPosition.mode==='right'){
        return {
            x:this._gamepadWindow.x +this._gamepadWindow.width,
            y:this._gamepadWindow.y
        };
    }
    return {x:0,y:0};
//    return {x:setting.gamepadSymbolPosition.x,y:setting.gamepadSymbolPosition.y};
};
Scene_GamepadConfigMA.prototype.symbolCenter=function(){
    return setting.gamepadSymbolPosition.mode ==='center';
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
    if(setting.gamepadConfigPosition){
        this.createSymbolListWindow(
            setting.gamepadConfigPosition.x,
            setting.gamepadConfigPosition.y
        );
    }else{
        this.createSymbolListWindow(
            0,0
        );

        this._symbolListWindow.moveCenter();
    }
    this._gamepadWindow.activate();
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
    CTRL:keyinfo('CTRL',17),
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

function Window_KeyConfig_MA() {
    this.initialize.apply(this, arguments);
};
Window_KeyConfig_MA.baseType =Window_Selectable.prototype;
Window_KeyConfig_MA.prototype = Object.create(Window_KeyConfig_MA.baseType);
Window_KeyConfig_MA.prototype.constructor = Window_KeyConfig_MA;
Window_KeyConfig_MA.prototype.initialize =function(){
    this.setKeyboradMapper(Input.keyMapper);
    this.setKeyLayout(ConfigManager.keyLayout_MA);
    const height =this.fittingHeight( 12 );
    Window_KeyConfig_MA.baseType.initialize.call(this,0,0,Graphics.boxWidth,height );
    this.refresh();
    this.activate();
    this.select(0);
    this.moveCenter();
};

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

Window_KeyConfig_MA.prototype.changeKeyMap =function(index,symbol){
    const keyNumber = this.keyNumber(index);
    this._map[keyNumber] = symbol;
    this.redrawItem(index);
    this.redrawApplyCommand();
};
/**
 * @param {String} layoutText
 */
Window_KeyConfig_MA.prototype.setKeyLayout =function(layoutText){
    if(this._layoutText ===layoutText){return;}
    this._layoutText =layoutText;
    if(layoutText==='JIS'){
        this._extraIndex =KEY_INDEX_JIS;
        this._list = KEYLAYOUT_JIS;
    }else{
        this._extraIndex = KEY_INDEX_US;
        this._list = KEYLAYOUT_US;
    }
};
Window_KeyConfig_MA.prototype.getKeyLayout =function(){
    return this._layoutText;
};


Window_KeyConfig_MA.prototype.setKeyboradMapper =function(mapper){
    this._map = objectClone( mapper);
};
Window_KeyConfig_MA.prototype.canApplySetting =function(){
    return isValidMapper(this._map);
};

Window_KeyConfig_MA.prototype.cloneMapper= function(){
    return createNormalizedInputMapper(this._map);
};
Window_KeyConfig_MA.prototype.itemTextAlign = function() {
    return 'center';
};
Window_KeyConfig_MA.prototype.moveCenter =function(){
    const x = Graphics.boxWidth/2 - this.width/2;
    const y = Graphics.boxHeight/2 -this.height/2
    this.move(x,y,this.width,this.height);
};


Window_KeyConfig_MA.prototype.processCancel =function(){
    SoundManager.playCancel();
    this.updateInputData();
    const index = this.index();
    const exitIndex = this._extraIndex.COMMAND_EXIT;
    if(index ===exitIndex){
        this.callCancelHandler();
    }else{
        this.select(exitIndex);
    }
};


Window_KeyConfig_MA.prototype.processApply =function(){
    this.updateInputData();
    this.deactivate();
    SoundManager.playEquip();

    this.callHandler('apply');
};

Window_KeyConfig_MA.prototype.processDefault =function(){
    SoundManager.playEquip();
    this.callHandler('default');
};

Window_KeyConfig_MA.prototype.processChangeLayout =function(){
    SoundManager.playEquip();
    const  L =this.getKeyLayout();
    if(L!=='JIS'){
        this.setKeyLayout('JIS' );
    }else{
        this.setKeyLayout('US');
    }
    this.refresh();
};


Window_KeyConfig_MA.prototype.processOk =function(){
    const index = this.index();
    if(index<0){
        return;
    }
    const item =this._list[index];
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
    if(item ===Window_KeyConfig_MA.COMMAND_CHANGE_LAYOUT){
        this.processChangeLayout();
        return;
    }

    if(item.locked){
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
    return 41;
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
    
    rect.width *=this._extraIndex.ENTER_WIDTH;
    rect.height*=this._extraIndex.ENTER_HEIGHT;
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
    const item = this._list[index];
    if(item.isLink){
        if(item ===KEYS.ENTER){
            return this.enterRect();
        }
        if(this.isSpaceIndex(index)){
            return this.spaceRect();
        }
        if(item ===KEYS.TENKEY0){
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
        if(item ===Window_KeyConfig_MA.COMMAND_CHANGE_LAYOUT){
            return this.changeLayoutCommandRect();
        }
    }
    return Window_KeyConfig_MA.baseType.itemRect.call(this,index);
 };


Window_KeyConfig_MA.prototype.maxItems =function(){
    return this._list.length;
};
Window_KeyConfig_MA.prototype.spacing =function(){
    return 0;
};
/**
 * @param {number}index
 * @return {String}
 */
Window_KeyConfig_MA.prototype.keyNumber =function(index){
    return this._list[index].keycord;
};

Window_KeyConfig_MA.prototype.currentKeyNumber=function(){
    return this.keyNumber(this.index());
};


Window_KeyConfig_MA.prototype.keyName =function(index){
    return this._list[index].char;
};

Window_KeyConfig_MA.prototype.isEnterIndex =function(index){
    return this._list[index] ===KEYS.ENTER;
};
Window_KeyConfig_MA.prototype.enterIndex =function(){
    return this._extraIndex.ENTER;
};

Window_KeyConfig_MA.spaceItems =4;

Window_KeyConfig_MA.prototype.spaceIndex =function(){
    return this._extraIndex.SPACE;
};


Window_KeyConfig_MA.prototype.tenkeyZeroIndex =function(){
    return this.maxCols()*4 +15;
};
Window_KeyConfig_MA.prototype.isTenkeyZeroIndex=function(index){
    return  this._list[index]===KEYS.TENKEY0;
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
        var itemA = this._list[current];
        var itemB = this._list[next];
        if(itemB===KEYS.NULL){
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
    const item = this._list[index];

    if(item ===KEYS.ENTER){
        this.drawEnter();
    }else if(item ===KEYS.SPACE){
        this.drawSpace();
    }else if(item===KEYS.TENKEY0){
        this.drawTenkeyZero();
    }else{
        this.drawItem(index)        
    }
};

Window_KeyConfig_MA.prototype.drawAllItems =function(){
    const last =this.maxPageItems();
    for (var i = 0; i < last; i++) {
        var index =  i;
        var item  = this._list[i];
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
};

Window_KeyConfig_MA.prototype.drawItemText =function(keyName,symobolText,x,y,width){
    this.changeTextColor(this.normalColor());
    this.drawText(keyName,x ,y,width,'center');//,this.itemTextAlign());
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
   var y = rect.y;// + rect.height;
   if(this._extraIndex ===KEY_INDEX_JIS){
       y += rect.height/4;
   }
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
    const index =this._extraIndex.COMMAND_DEFAULT;
    const rect= Window_KeyConfig_MA.baseType.itemRect.call(this,index);
    rect.width *=setting.commandWidth.DEFAULT;
    return rect;
};

Window_KeyConfig_MA.prototype.drawDefaultCommand =function(){
    const rect = this.defaultCommandRect();
    this.drawCommand(setting.commandText.default_,rect);
};



/**
 * @return {Rectangle}
 */
Window_KeyConfig_MA.prototype.applyCommandRect =function(){
    const index =this._extraIndex.COMMAND_APPLY;
    const rect= Window_KeyConfig_MA.baseType.itemRect.call(this,index);
    rect.width *=setting.commandWidth.APPLY;
    return rect;
};

Window_KeyConfig_MA.prototype.redrawApplyCommand =function(){
    this.clearItem( this._extraIndex.COMMAND_APPLY);//   Window_KeyConfig_MA.INDEX_APPLY_COMMAND);
    this.drawApplyCommand();
};
Window_KeyConfig_MA.prototype.drawApplyCommand =function(){
    const rect = this.applyCommandRect();
    this.drawRect(rect,this.commandBackColor());
    this.changeTextColor(this.commandColor());
    this.drawText(setting.commandText.apply,rect.x,rect.y,rect.width,'center');
};
/**
 * @return {Rectangle}
 */
Window_KeyConfig_MA.prototype.exitCommandRect =function(){
    const exitIndex = this._extraIndex.COMMAND_EXIT;
    const rect= Window_KeyConfig_MA.baseType.itemRect.call(this,exitIndex);// Window_KeyConfig_MA.INDEX_EXIT_COMMAND);
    rect.width *= setting.commandWidth.EXIT;
    return rect;
};
/**
 * @return {Rectangle}
 */
Window_KeyConfig_MA.prototype.changeLayoutCommandRect =function(){
    const index= this._extraIndex.COMMAND_LAYOUT;
    const rect= Window_KeyConfig_MA.baseType.itemRect.call(this,index);
    rect.width *=setting.commandWidth.LAYOUT;
    return rect;
};
Window_KeyConfig_MA.prototype.drawChangeLayoutCommand =function(){
    const rect = this.changeLayoutCommandRect();
    this.drawCommand(setting.commandText.changeLayout,rect);
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

Scene_KeyConfig_MA.prototype.symbolCenter=function(){
    return true;
};
Scene_KeyConfig_MA.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createKeyboradConfigWindow();
    this.createSymbolListWindow();
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
    ConfigManager.setKeyLayoutMA(this._keyconfigWindow.getKeyLayout());

    if(this._applyOnExit){
        Input.keyMapper = this._keyconfigWindow.cloneMapper();
    }
};

Scene_KeyConfig_MA.prototype.applyKeyboardConfig =function(){
    this._applyOnExit =true;
    this.popScene();
};


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

const exportFuntion= createExportFunction();

const exportClass ={
    Scene_KeyConfig:Scene_KeyConfig_MA,
    Scene_GamepadConfig: Scene_GamepadConfigMA,
    Window_InputSymbolList:Window_InputSymbolList,
    Window_GamepadConfig:Window_GamepadConfig_MA,
    Window_KeyConfig:Window_KeyConfig_MA,
};

global.Mano_InputConfig = exportClass;
})(this);