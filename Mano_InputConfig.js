//=============================================================================
// Mano_InputConfig.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017-2021 Sigureya
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// ver 7.0.0 2021/12/30
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/Sigureya/
//=============================================================================



/*:
 * @plugindesc ゲームの操作に関する機能をまとめて管理します。
 * ユーザーによる拡張も支援します。
 * @author しぐれん(https://github.com/Sigureya/RPGmakerMV)
 * @url https://raw.githubusercontent.com/Sigureya/RPGmakerMZ/master/Mano_InputConfig.js
 * 
 * @target MZ
 * @orderAfter VisuMZ_1_OptionsCore
 * @orderAfter MOG_TitleSplashScreen
 * 
 * @command GetButtonName
 * @text GetButton/ボタン名の取得
 * @desc 指定した操作がどのボタンにあるかを返します。
 * Returns which button has the specified action.
 * @arg symbol
 * @type select
 * @option ok(決定)
 * @value ok
 * @option cancel(取り消し)
 * @value cancel
 * @option shift(ダッシュ)
 * @value shift
 * @option menu(メニュー)
 * @value menu
 * @option pageup(前)
 * @value pageup
 * @option pagedown(次)
 * @value pagedown
 * @default ok
 * 
 * @arg nameVariable
 * @text ボタン名称/buttonName
 * @desc ボタン名称を受け取る変数です。
 * Variable to store the result.
 * @type variable
 * @default 0

 * @command GetButtonNameEX
 * @text GetButtonEX/ボタン名の取得
 * @desc 指定した操作がどのボタンにあるかを返します。
 * Returns which button has the specified action.
 * @arg symbol
 * @desc アクションのシンボル
 * 
 * @arg nameVariable
 * @desc ボタン名称を受け取る変数です。
 * Variable to store the result.
 * @type variable
 * @default 0
* 
 * @command IsKeyboardValid
 * @desc キーボードの設定が正しい場合、指定スイッチをONにします。
 * @arg switchId
 * @type switch
 * @default 0
 * @desc 結果を保存するスイッチ
 * Where to save the results
 * 
 * @command GamepadScene
 * @text GamepadScene/ゲームパッド設定を開く
 * @desc ゲームパッド設定のシーンを開きます。
 * Open the gamepad settings scene.
 * 
 * @command KeyboardScene
 * @text KeyboardScene/キーボード設定を開く
 * @desc キーボード設定のシーンを開きます。
 * Open the keyboard settings scene.
 * 
 * @param color
 * @text 色設定/ColorSetting
 * @type struct<ColorManager>
 * @default {"normal":"#880000","mandatory":"#22e488","move":"#22e488"}
 * 
 * @param basicOk
 * @text 決定/ok
 * @type struct<BasicSymbol>
 * @default {"name":"{\"jp\":\"決定\",\"en\":\"OK\"}","keyText":"{\"jp\":\"\",\"en\":\"\"}","helpText":"{\"jp\":\"\",\"en\":\"\"}"}
 * 
 * @param basicCancel
 * @text 取り消し/cancle
 * @type struct<BasicSymbol>
 * @default {"name":"{\"jp\":\"キャンセル\",\"en\":\"cancel\"}","keyText":"{\"jp\":\"\",\"en\":\"\"}","helpText":"{\"jp\":\"\",\"en\":\"\"}"}
 * 
 * @param basicShift
 * @text ダッシュ/dash
 * @type struct<BasicSymbol>
 * @default {"name":"{\"jp\":\"ダッシュ\",\"en\":\"dash\"}","keyText":"{\"jp\":\"\",\"en\":\"\"}","helpText":"{\"jp\":\"\",\"en\":\"\"}"}
 * 
 * @param basicMenu
 * @text メニュー/menu
 * @type struct<BasicSymbol>
 * @default {"name":"{\"jp\":\"メニュー\",\"en\":\"menu\"}","keyText":"{\"jp\":\"\",\"en\":\"\"}","helpText":"{\"jp\":\"\",\"en\":\"\"}"}
 * 
 * @param basicEscape
 * @text メニュー(2)/menu(2)
 * @type struct<BasicSymbol>
 * @default {"name":"{\"jp\":\"メニュー/キャンセル\",\"en\":\"menu/cancel\"}","keyText":"{\"jp\":\"\",\"en\":\"\"}","helpText":"{\"jp\":\"\",\"en\":\"\"}"}
 * 
 * @param basicPageup
 * @text 次/next
 * @type struct<BasicSymbol>
 * @default {"name":"{\"jp\":\"次\",\"en\":\"next\"}","keyText":"{\"jp\":\"\",\"en\":\"\"}","helpText":"{\"jp\":\"\",\"en\":\"\"}"}
 * 
 * @param basicPagedown
 * @text 前/prev
 * @type struct<BasicSymbol>
 * @default {"name":"{\"jp\":\"前\",\"en\":\"prev\"}","keyText":"{\"jp\":\"\",\"en\":\"\"}","helpText":"{\"jp\":\"\",\"en\":\"\"}"}
 * 
 * 
 * @param mapperDelete
 * @text 設定を消去/delete
 * @type struct<MultiLangString>
 * @default {"en":"delete","jp":"設定を消去"}
 * 
 * 
 * @param extendsMapper
 * @desc ボタンイベント・追加の入力設定の登録
 * Registration of button events and additional input settings
 * @text 入力拡張/inputExtension
 * @type struct<InputDefine>[]
 * @default []
 * 
 * 
 * @param GamepadIsNotConnectedText
 * @text 未接続/GamepadIsNotConnected
 * @desc ゲームパッドが接続されていない場合の文章です。
 * This is the text when the gamepad is not connected.
 * @type struct<MultiLangNote>
 * @default {"jp":"\"ゲームパッドが接続されていません\\nボタンを押して再度試してください\"","en":"\"The gamepad is not connected.\\nPress the button and try again.\""}
 * 
 * @param needButtonDetouchText
 * @text ボタンから手を放すように促すメッセージ
 * @desc キーコンフィグはボタンから手を離さない限り終了しません。
 * 手を放すように促すメッセージを設定します。
 * @type struct<MultiLangNote>
 * @default {"jp":"\"コンフィグを終了するために、\\nボタンから手を放してください。\"","en":"\"Release the button to exit the config.\""}
 * 
 * @param apply
 * @text 設定の保存/apply
 * @type struct<KeyconfigCommand>
 * @default {"width":"4","text":"{\"jp\":\"設定を保存\",\"en\":\"save settings\"}"}
 * 
 * @param rollback
 * @text 変更を破棄/rollback
 * @type struct<KeyconfigCommand>
 * @default {"width":"4","text":"{\"jp\":\"変更前に戻す\",\"en\":\"rollback\"}"}
 * 
 * @param reset
 * @text 初期設定に戻す/reset
 * @type struct<KeyconfigCommand>
 * @default {"width":"4","text":"{\"jp\":\"初期設定に戻す\",\"en\":\"reset\"}"}
 * 
 * @param WASD
 * @type struct<KeyconfigCommand>
 * @default {"width":"3","text":"{\"jp\":\"WASD\",\"en\":\"WASD\"}"}
 * 
 * @param style
 * @type struct<KeyconfigCommand>
 * @default {"width":"3","text":"{\"jp\":\"設定方法変更\",\"en\":\"Change setting style\"}"}
 * 
 * @param changeLayout
 * @text JIS/US
 * @type struct<KeyconfigCommand>
 * @default {"width":"3","text":"{\"jp\":\"JIS/US\",\"en\":\"JIS/US\"}"}
 * 
 * @param exit
 * @text やめる/exit
 * @type struct<KeyconfigCommand>
 * @default {"width":"3","text":"{\"jp\":\"やめる\",\"en\":\"exit\"}"}
 * 
 * 
 * 
 * @param gamepadConfigCommandText
 * @desc ゲームパッドコンフィグを開くコマンドの名前です
 * @type struct<MultiLangString>
 * @default {"en":"gamepad config","jp":"ゲームパッドコンフィグ"}
 * 
 * @param keyConfigCommandText
 * @desc キーコンフィグを開くコマンドの名前です
 * @type struct<MultiLangString>
 * @default {"en":"keyboard config","jp":"キーコンフィグ"}
 * 
 * @param gamepadBackground
 * @type file
 * @dir img/background/
 * 
 * @param keyBackground
 * @type file
 * @dir img/background/
 * 
 * @param SettingsForYEP_OptionsCore
 * @type struct<DisguiseAsYEP>
 * @default {"gamepad":"true","Keyboard":"true"}
 * 
 * @help
 * ※日本語テキストは下の方にあるのでスクロールしてください
 * 
 *  Loads the settings at game startup as initial values.
 * Detects input changes regardless of where the plugin is installed.
 * It is OK even if the button is modified by another plug-in.
 *
 * The config data set by this plug-in is recorded in the file.
 * If you install a new plugin,
 * Please reset the config with "Reset to default" after starting the game.
 *
 * ■ What to do if strange characters such as "? KEY: Symbol" are displayed
 * Occurs because the input added by another plugin is unknown.
 * If the above display is displayed,
 * It can be handled by adding an element to extendsMapper.
 * 1. Add an element
 * 2. Try either of the following AB methods.
 * Copy the character corresponding to A: KEY and paste it into Key Setting.
 * B: Copy the characters corresponding to Symbol and paste them into symbol.
 * Be careful not to confuse the case.
 * 
 * ■ What to do if a display like unknow: XXXX appears
 * The following causes are possible.
 * -Symbols were set after the game started (after Scene_Boot)
 * -Initialization process was not performed correctly
 * It may be improved by moving this plugin down.
 * 
 * ■ Button operation diffusion function
 * If the operation is set by another plugin,
 * May be set on only one of the gamepad / keyboard.
 * In such a case, you can operate it from others by setting it in extendsMapper.
 * For example, suppose that the operation is set when you press only T on the keyboard.
 * If you want to set the operation for the buttons on the gamepad in this state, set as follows.
 * Key setting: T
 * Pad button: (any button number)
 * By doing this, this plugin will read the behavior set for T on the keyboard and
 * Set so that the same function can be used with the buttons on the gamepad.
 * The same is true for the opposite.
 *
 * If the operation is set on both the keyboard and the gamepad,
 * Determine which one to prioritize in the overwrite setting.
 * When using manual symbol settings (for advanced users)
 * Ignore the priority settings and use the contents set manually.
 * 
 * ■ Common event call button
 * extendsMapper has an item called "Events".
 * If you set an event here, the event will be called when the button is pressed.
 * You can use it to create a function to open the map when you press the button.
 * 
 * ■All functions can be used without eval ()
 * There are no items in this plugin that use eval ().
 * If you're writing a JavaScript expression for use with eval (),
 * you're wrong.
 * 
 * ■ If you want to control the transition with a script
 * Used when modifying other plugins or switching scenes directly with a script.
 * SceneManager.push (Mano_InputConfig.Scene_GamepadConfig); // Gamepad Config
 * SceneManager.push (Mano_InputConfig.Scene_KeyConfig); // Keyboard config
 * You can now move to the specified scene.
 * ゲームの起動時の設定を初期値として読み込みます。
 * プラグインの導入位置に関わらず、入力の変更を検知します。
 * 他のプラグインでボタンが改造されていてもOKです。
 * 
 * このプラグインで設定したコンフィグデータは、ファイルに記録されます。
 * 新しいプラグインを入れた場合、
 * ゲーム起動後にコンフィグを「初期設定に戻す」でリセットしてください。
 * 
 * ■"?KEY:Symbol"のような変な文字が表示される場合の対処法
 * 他のプラグインによって追加された入力が不明なために発生します。
 * 上記のような表示が出ている場合、
 * extendsMapperに要素を追加することで対応できます。
 * 1.要素を追加する
 * 2.下記のABどちらかの方法を試す。
 * A:KEYにあたる部分の文字をコピーして、KeySettingに貼り付ける。
 * B:Symbolにあたる部分の文字をコピーし、symbolに貼り付ける。
 *   大文字・小文字を間違えないように注意すること。
 * 
 * ■unknow:XXXXのような表示が出る場合の対処法
 * 以下の原因が考えられます。
 * ・シンボルの設定がゲーム起動後(Scene_Bootより後)で行われた
 * ・初期化処理が正しく行われなかった
 * このプラグインを下の方に移動することで改善する可能性があります。
 * 
 * ■ボタン操作拡散機能
 * 他のプラグインで操作が設定されている場合に、
 * ゲームパッド・キーボードの片方にしか設定されていない場合があります。
 * そういった場合、extendsMapperで設定を行うことで他からも操作できるようになります。
 * 例えば、キーボードのTにのみ押した場合の動作が設定されているとします。
 * この状態でゲームパッドのボタンにも操作を設定する場合、以下のように設定します。
 * キー設定:T
 * パッドボタン:(任意のボタン番号)
 * こうすることで、このプラグインはキーボードのTに設定されている動作を読み込み、
 * ゲームパッドのボタンでも同じ機能が使えるように設定を行います。
 * 逆の場合も同様です。
 * 
 * キーボードとゲームパッドの双方に操作が設定されている場合、
 * どちらを優先するかを上書き設定で決めます。
 * シンボル手動設定(上級者向け)を使った場合、
 * 優先設定を無視して手動設定による内容を使います。
 * 
 * ■コモンイベント呼び出しボタン
 * extendsMapperには「イベント」という項目があります。
 * ここにイベントを設定すると、ボタンが押された時にイベントを呼び出します。
 * ボタンを押したら地図を開く機能を作る時などに使えます。
 * 
 * ■eval()無しで全機能が使えます
 * このプラグインにはeval()を使う項目はありません。
 * eval()で使うJavaScriptの式を書いている場合、あなたは間違っています。
 * 
 * ■スクリプトで遷移を制御したい場合
 * 他のプラグインを改造したり、スクリプトで直接シーンを切り替える時に使います。
 * SceneManager.push(Mano_InputConfig.Scene_GamepadConfig  );  //ゲームパッドコンフィグ
 * SceneManager.push(Mano_InputConfig.Scene_KeyConfig );       // キーボードコンフィグ
 * これで、指定されたシーンに移動できます。
 * 
 * 更新履歴
 * 2021/12/30 ver7.0.0
 * プラグインパラメータ「入力拡張」を中心に大改造。
 * 
 * 2021/12/24 ver6.3.1
 * エラーメッセージの英語表記を追加。
 * 
 * 2021/12/22 ver6.3.0
 * シンボル設定関連を更新。
 * ヘルプの内容を追加。
 * 
 * 2021/12/18 ver6.2.1
 * ラムダ式関連の記述を修正した際に、バグを埋め込んでいたのを修正。
 * プラグインコマンドを追加。
 * 
 * 2021/11/30 ver6.2.0
 * ManoPP_VisuMZ_OptionCore対応を実装。
 * 
 * 2021/08/30 ver6.1.2
 * 一部環境でラムダ式がエラーを起こすため、使用しない形に修正
 * 一部テキストが日本語のままだったのを英語対応
 * 
 * 2021/07/17 ver6.1.1
 * 拡張入力の上書き設定が機能していないのを修正
 * 
 * 2021/06/13 ver6.1.0
 * シンボルからボタンの名称を取得するプラグインコマンドを追加(MZのみ)
 * 
 * 2021/05/23 ver 6.0.0
 * ゲームパッドにシンボルに対してボタンを割り当てる機能を実装。
 * 
 * 
 * 2021/04/22 ver 5.4.0
 * MZのみ:タッチボタンの表示機能を試験的に実装
 * 
 * 2021/04/15 ver 5.3.1
 * コモンイベント呼び出しを修正(簡単にしました)
 * イベントコマンドでコンフィグを開くと保存されない不具合を修正
 * 
 * 2021/02/23 ver 5.3.0
 * ボタン入力がある時にコモンイベントを呼び出すプラグインコマンドを追加
 * 
 * 2021/01/27 ver 5.2.0
 * 不明なシンボルの表示機能を強化
 * 
 * 2021/01/23 ver5.1.0
 * 画面レイアウトを変更
 * 必須シンボルの扱いを調整
 * 不明なシンボルがある場合、画面上部へ表示するようにした
 * 
 * 2020/12/25 ver5.0.3
 * 必須シンボルチェックの動作が正しくなかったのを修正
 * バージョン管理を修正し、番号付けを変更。
 * 
 * 2020/12/25 ver5.0.2(旧5.2)
 * 拡張シンボル設定にバグがあったので修正
 * 
 * 2020/11/26 ver5.0.1(旧5.1)
 * プラグインが起動できないバグがあったので修正
 * 
 * 2020/11/24 ver5.0
 * プラグインパラメータを再設計。
 * 内部実装であるsymbolを意識する必要が無くなりました。
 * 
 * 2020/08/23 ver4.0
 * ツクールMZに対応。
 * 基本システムはMZ向けに最適化し、MVはラッパーで調整
 * 
 * 2020/05/25 ver 3.2
 * YEP_OptionCoreと競合するので、対策処理を追加。
 * 
 * 2020/04/01 ver 3.1
 * 英語対応につきヘルプを追加。
 * 
 * 2020/03/14 ver3.0
 * WASD移動を設定できる機能を追加。
 * キーコンフィグの内部実装を大幅改造。
 * 
 * 2020/02/26 ver2.9
 * コンフィグから抜けた際にボタンが連打されてしまう問題を対策。
 * RPGアツマールにおいて、他のゲームとコンフィグ設定が混ざる問題を修正。
 * 別プラグインとの競合があったので対策
 * symbolAutoSelectがキーコンフィグで機能していなかったのを修正。
 * 
 * 2019/07/12 ver2.8.1
 * ゲームパッドのハードごとの識別情報を表示する機能を追加。
 * 
 * 2019/07/06 ver2.8
 * 外部プラグインによって追加されたmapperのsymbolを強制的に取り込む機能。
 * プラグインパラメータで無効化できます。
 * 
 * 2019/03/19 ver2.7
 * キーボードに任意の初期設定を割り当てる機能を追加。
 * 
 * 2018/09/28 ver2.6
 * ゲームパッドコンフィグを改造すると誤作動があったので、誤作動を減らす修正。
 * プラグインの位置に関わらず初期設定の変更を捕まえられるように。
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
/*~struct~BasicSymbol:
 * @param name
 * @type struct<MultiLangString>
 * @default {"jp":"","en":""}
 * 
 * @param keyText
 * @text キーの表示/keyText
 * @desc キーコンフィグの際の表示名を定義します(空欄OK)
 * Define the display name for key config (blank OK)
 * @type struct<MultiLangString>
 * @default {"jp":"","en":""}
 * 
 * @param helpText
 * @text 詳細/helpText
 * @desc 画面上部に表示する説明文
 * Description to be displayed at the top of the screen
 * @type struct<MultiLangNote>
 * @default {"jp":"","en":""}
 * 
 */
/*
//TODO:いずれ追加するかもしれない機能
//extendsSymbolとの共通化が壁 
 * @param exKeys
 * @type string
 * @desc 指定したキーに対してアクションを割り当てます。
 * Assigns an action to the specified key.
 * @default
 * 
 * @param exButton
 * @text パッドボタン/padButton
 * @desc ボタン設定。配置と名前は任天堂のスタイルを想定。
 * Button settings. The layout and name the style of Nintendo.
 * @type select
 * @default NaN
 * @option none
 * @value NaN
 * @option 0(B/×)
 * @value 0
 * @option 1(A/○)
 * @value 1
 * @option 2(X/□)
 * @value 2
 * @option 3(Y/△)
 * @value 3
 * @option 4(L1)
 * @value 4
 * @option 5(R1)
 * @value 5
 * @option 6(L2)
 * @value 6
 * @option 7(R2)
 * @value 7
 * @option 8(select)
 * @value 8
 * @option 9(start)
 * @value 9
 * @option 10(L3)
 * @value 10
 * @option 11(R3)
 * @value 11
 * @option 16(center)
 * @value 16
 * 
*/

/*~struct~TouchButton:
 * @param image
 * @type file
 * @dir img/
 * @desc 通常時は上の半分、押されている間は下の半分が使われます。
 * upper is used normally, and lower is used when pressed.
 * @default system
 * 
 * @param x
 * @type number
 * @default 0
 * 
 * @param y
 * @type number
 * @default 0
 * 
*/
/*~struct~EventCaller:
 * @param id
 * @text 呼び出すイベント/event
 * @desc ボタンを押した際に呼び出すコモンイベント(マップのみ)
 * Common event to call when a button is pressed(MapOnly)
 * @type common_event
 * @default 0
 * 
 * @param inputType
 * @text 入力方式/inputType
 * @desc 呼び出し時のボタンの入力形式。
 * Button input format when calling.
 * @type select
 * @option 押されている/pressed
 * @value 0
 * @option トリガー/triggerd
 * @value 1
 * @option リピート/repeated
 * @value 2
 * @default 0
 */
/*~struct~KeyboradSetting:

 * @param keys
 * @type string
 * @desc 半角英字で設定。例 Ef65
 * Set the key corresponding to the action (ex:Ef65)
 * 
 * 
 * @param text
 * @text キーの表示/keyText
 * @desc キーコンフィグの際の表示名を定義します(空欄OK)
 * Define the display name for key config (blank OK)
 * @type struct<MultiLangString>
 * @default {"jp":"","en":""}
 * 
*/
/*
 * TODO:あとでキー設定にカラーを追加
 * @param color
 * @type combo
 * @option #FF00FF
 * @default 
 * 
 */

/*~struct~AdvancedSetting:
 * @param symbol
 * @text シンボル/symbol
 * @desc ボタンを押した場合の動作(上級者向け)
 * Operation when the button is pressed (for advanced users)
 * @type string
 * @default
 * 
 * @param overwrite
 * @text 上書き/overwrite
 * @desc どのボタンのシンボルを基準にするか
 * Which button symbol to base on
 * @type select
 * @option 上書きしない/none
 * @value 0
 * @option ゲームパッド/gamepad
 * @value 1
 * @option キーボード/Keyboard
 * @value 2
 * @option イベント/event
 * @value 3
 * @default 0
 * 
 * @param mandatory
 * @text 必須フラグ/mandatory
 * @type boolean
 * @default false
 */

/*~struct~InputDefine:
 * 
 * @param keys
 * @text キー設定/KeySetting
 * @desc 廃止予定。同名の新しいパラメータを使用してください。
 * Scheduled to be abolished. Use the new parameter.
 * 
 * @param keySetting
 * @text キー設定/keySetting
 * @type struct<KeyboradSetting>
 * @default {"keys":"","color":"","text":"{\"jp\":\"\",\"en\":\"\"}"}
 * 
 * @param button
 * @text パッドボタン/padButton
 * @desc ボタン設定。配置と名前は任天堂のスタイルを想定。
 * Button settings. The layout and name the style of Nintendo.
 * @type select
 * @default NaN
 * @option none
 * @value NaN
 * @option 0(B/×)
 * @value 0
 * @option 1(A/○)
 * @value 1
 * @option 2(X/□)
 * @value 2
 * @option 3(Y/△)
 * @value 3
 * @option 4(L1)
 * @value 4
 * @option 5(R1)
 * @value 5
 * @option 6(L2)
 * @value 6
 * @option 7(R2)
 * @value 7
 * @option 8(select)
 * @value 8
 * @option 9(start)
 * @value 9
 * @option 10(L3)
 * @value 10
 * @option 11(R3)
 * @value 11
 * @option 16(center)
 * @value 16
 * 
 * @param name
 * @text 行動名/actionName
 * @desc 言語別に行動の説明を入力します
 * Enter a description of the action by language
 * @type struct<MultiLangString>
 * @default {"jp":"","en":""}
 * 
 * @param helpText
 * @text 詳細/helpText
 * @desc 画面上部に表示する説明文
 * Description to be displayed at the top of the screen
 * @type struct<MultiLangString>
 * @default {"jp":"","en":""}
 * 
 * @param event
 * @text イベント/event
 * @desc ボタンを押した際にコモンイベントを実行します。
 * Executes a common event when the button is pressed.
 * @type struct<EventCaller>
 * @default {"id":"0","inputType":"0"}
 * 
 * @param touchButton
 * @text タッチボタン/touchButton
 * @type struct<TouchButton>
 * @desc MZのみ:画面上にタッチUI向けのボタンを追加します
 * 
 * @param adovanced
 * @text 上級者向け/adovanced
 * @desc 多くの場合、これを変更する必要はありません。
 * In most cases you do not need to change this.
 * @type struct<AdvancedSetting>
 * @default {"symbol":"","overwrite":"0","mandatory":"false"}
 * 
 */


/* 
 * @param sourcePlugin
 * @desc 指定した名前のプラグインがONの場合のみ、有効化します
 * @type combo
 * @default
 */


 /*~struct~MultiLangNote:
  * @param jp
  *  @text 日本語
  *  @type multiline_string
  *  @type note
  *  @param en
  *  @type multiline_string
  *  @type note
 */
 /*~struct~MultiLangNoteFull:
  * @param jp
  *  @text 日本語
  *  @type multiline_string
  *  @type note

  *  @param en
  *  @type multiline_string
  *  @type note

  *  @param ch
  *  @text 中文
  *  @type multiline_string
  *  @type note

  *  @param ko
  *  @text 한국
  *  @type multiline_string
  *  @type note

  *  @param ge
  *  @text Deutsche
  *  @type multiline_string
  *  @type note

  *  @param fr
  *  @text français
  *  @type multiline_string
  *  @type note

  *  @param ru
  *  @text русский
  *  @type multiline_string
  *  @type note
 */

 /*~struct~MultiLangString:
  * @param jp
  * @text 日本語

  * @param en
  * @text English
 */

 /*~struct~MultiLangStringFull:
  * @param jp
    @text 日本語

    @param en
    @text English

    @param ch
    @text 中文

    @param ko
    @text 한국

    @param ge
    @text Deutsche

    @param fr
    @text français

    @param ru
    @text русский
 */
 /*~struct~KeyconfigCommand:
  * 
  * @param width
  * @desc コマンドの幅
  * @type number
  * @min 0
  * @max 10
  * @default 3
  * 
  * @param text
  * @type struct<MultiLangString>
  * @default {}
  * 
*/
 /*~struct~ColorManager:
  * 
  * @param normal
  * @default #880000
  * 
  * @param mandatory
  * @text 必須シンボル/mandatory
  * @default #22e488
  * 
  * @param move
  * @text 移動/move
  * @default #22e488
  * 
  * @param extends
  * @text 拡張シンボル/extends
  * @default #22e488
  * 
  * 
*/
/*~struct~DisguiseAsYEP:
 * @param gamepad
 * @desc Impersonate the configuration as if it were GamepadConfig.js (by Yanfly).
 * @type boolean
 * @default true
 * 
 * @param Keyboard
 * @desc Impersonate the configuration as if it were YEP_KeyboardConfig.js (by Yanfly).
 * @type boolean
 * @default true
 */

var Imported = Imported || {};
if(Imported.Mano_InputConfig){
    throw new Error("Mano_InputConfig is Duplicate")
}
Imported.Mano_InputConfig = true;

var Mano_InputConfig=( function(){
    'use strict'

    const GetEnabledPlugins =function(){
        /**
         * @type {Set<String>}
         */
        const set=new Set();
        for (const iterator of $plugins) {
            if(iterator.status){
                set.add(iterator.name);
            }
        }
        return set;
    }

    /**
     * @type {String}
     */
    const  PLUGIN_NAME= ('Mano_InputConfig');
    function getCurrentScriptName(){
       const pluginName = decodeURIComponent(document.currentScript.src).match(/([^/]+)\.js$/);
       if(pluginName){ return pluginName[1];}
       return ''; 
    }
    /**
     * @param {String} officialFileName 
     */
    function TestFileNameValid(officialFileName){
        const currentFileName=getCurrentScriptName();
        if(officialFileName ===currentFileName){ return;}
        const message= `Do not rename the plugin file.<br>`+
                        `Current file name: currentFileName<br>`+
                        `Original file name: officialFileName<br>`+
                        `プラグインファイルの名前を変更してはいけません<br>`+
                        `現在のファイル名: currentFileName<br>`+
                        `本来のファイル名: officialFileName`
        throw new Error(message);
    }
    TestFileNameValid(PLUGIN_NAME);
    const IS_Atsumaru = location.hostname==="html5.nicogame.jp";

    function getParam(){
        return PluginManager.parameters(PLUGIN_NAME);
    }
    
/**
 * @param {Window_Base} window_ 
 * @param {Rectangle} rect 
 * @param {(window:Window_Base,rect:Rectangle)=>void} initFunction
 */
function window_initializeMVMZ(window_,rect,initFuncton){
    if(Utils.RPGMAKER_NAME==="MZ"){
        initFuncton.call(window_,rect);
        return
    }
    if(Utils.RPGMAKER_NAME==="MV"){
        initFuncton.call(window_,rect.x,rect.y,rect.width,rect.height);
        return;
    }
    throw( new Error("Unknow RPG MAKER:"+Utils.RPGMAKER_NAME));
}
class Scene_MenuBaseMVMZ extends Scene_MenuBase{
    bottomAreaHeight(){
        return 20;
    }
    /**
     * @returns {Number}
     */
    mainAreaTop(){
        if(Utils.RPGMAKER_NAME ==="MV"){
            return this._helpWindow.y + this._helpWindow.height;
        }
        return super.mainAreaTop();
    }
    isBottomButtonMode(){
        return false;
    }
    helpAreaHeight(){
        return this.calcWindowHeight(this.helpWindowLines(), false);
    }
    isBottomHelpMode(){
        return false;
    }
    helpWindowLines(){
        return 3;
    }
}


function objectClone(obj){
    var result ={};
    Object.keys(obj).forEach(function(key){
        result[key] = obj[key];
    })
    return result;
}

//言語判定
//本体の処理タイミングがおかしいので、コピペしてきた
const isJapanese = function() {
    return $dataSystem.locale.match(/^ja/);
};
const isChinese = function() {
    return $dataSystem.locale.match(/^zh/);
};

const isKorean = function() {
    return $dataSystem.locale.match(/^ko/);
};

const isRussian = function() {
    return $dataSystem.locale.match(/^ru/);
};
class MultiLanguageText{
    /**
     * 
     * @param {String} en 
     * @param {String} jp 
     */
    constructor(en,jp){
        this.setNameEN(en);
        this.setNameJP(jp);
        this.setDefaultName("");
    }
    static create(objText){
        if(!objText){
            return null;
        }
        const obj = JSON.parse(objText);
        const en =noteOrString(obj.en||"");
        const jp =noteOrString( obj.jp||"");
        const mtext = new MultiLanguageText(en,jp);
        return mtext;
    }
    isEmpty(){
        return (!this.ja_JP)&&(!this.en_US);
    }
    /**
     * @param {String} name 
     */
    setNameJP(name){
        this.ja_JP =name;
    }
    /**
     * @param {String} name 
     */
    setNameEN(name){
        this.en_US =name;
    }
    /**
     * @param {String} name 
     */
    setDefaultName(name){
        this._defaultName=name;
    }
    isUnknow(){
        return this._defaultName[0]==="?";
    }
    refresh(){
        if(!this.isUnknow()){
            this.setDefaultName(this.currentName());
        }
    }
    currentName(){
        if(isJapanese() && this.ja_JP ){
            return this.ja_JP;
        }
        return this.en_US;
    }
    name(){
        return this._defaultName;
    }
}
class TouchButton{
    /**
     * @param {String} filePath 
     * @param {Number} x 
     * @param {Number} y 
     */
    constructor(filePath,x,y){
        const result= (/(.*)\/(.*)/).exec(filePath);
        if(result){
            this.setFilePath("img/"+result[1]+"/",result[2]);
        }else{
            this.setFilePath("","");
        }
        this._x = x;
        this._y = y;
        this.setSymbolObject(null);
    }
    /**
     * 
     * @param {String} objText 
     * @returns 
     */
    static create(objText){
        if(!objText){
            return null;
        }
        const obj = JSON.parse(objText);
        const x  =Number(obj.x);
        const y = Number(obj.y);
        const button = new TouchButton(obj.image,x,y);
        return button;    
    }
    /**
     * @param {String} folder 
     * @param {String} fileName 
     */
    setFilePath(folder,fileName){
        this._folder =folder;
        this._fileName = fileName;
    }
    isValid(){
        return !!this._fileName;
    }
    /**
     * @param {ExtendsSymbol} symbol 
     */
    setSymbolObject(symbol){
        this._symbol = symbol;
    }
    isVisible(){
        return true;
    }
    bitmap(){
        return ImageManager.loadBitmap(this._folder,this._fileName);
    }
    rect(){
        return new Rectangle();
    }
    symbol(){
        return this._symbol.symbol();
    }
    symbolObject(){
        return this._symbol;
    }
    x(){
        return this._x;
    }
    y(){
        return this._y;
    }
    isEnabled(){
        return true;
    }
    clearPress(){
        const symbol = this.symbol();
        Input._currentState[symbol]=false;
    }
    virtualPress(){
        const symbol = this.symbol();
        if(!Input._currentState[symbol]){
            Input._currentState[symbol]=TouchInput.isPressed();
        }
    }
}
class ButtonManager_T{
    constructor(){
        this.setList([]);
    }
    /**
     * 
     * @param {TouchButton[]} list 
     */
    setList(list){
        this._list =list;
    }
    getList(){
        return this._list;
    }

    /**
     * @param {TouchButton} button 
     */
    addButton(button){
        this._list.push(button);
    }
    isTouchButtonEnabled(){
        return  Utils.RPGMAKER_NAME ==="MZ" && this._list.length > 0;
    }
}
const ButtonManager = new ButtonManager_T();

//todo
//必須シンボル不足の際に、色で知らせたほうが良さそう
class SymbolColorManager_T{
    constructor(normal,mandatory,move,extendsSymbol){
        this._normal =(normal ||"#880000")
        this._mandatory=(mandatory||"#22e488");
        this._move=(move ||"#22e488");
        this._extends =extendsSymbol;
    }
    /**
     * 
     * @param {String} objText 
     * @returns 
     */
    static create(objText){
        if(!objText){
            return new SymbolColorManager_T(null,null,null);
        }
        const obj =JSON.parse(objText);
        const normal =(obj.normal||null);
        const mandatory=(obj.mandatory||null);
        const move=(obj.move||null);
        const extendsSymbol = (obj.extends);

        return new SymbolColorManager_T(normal,mandatory,move,extendsSymbol);
    }

    paramatorInvalidColor(){
        return "#FF00FF";
    }
    emptyColor(){
        return "#000000";
    }
    mandatoryColor(){
        return this._mandatory;
    }
    normalColor(){
        return this._normal;
    }
    moveSymbolColor(){
        if(this._move){
            return this._move;
        }
        return this.mandatoryColor();
    }
}

//TODO
const SymbolColorManager =  SymbolColorManager_T.create(getParam().color);
//デバッグ用の情報を扱うクラス
class DebugSymbol{
    /**
     * 
     * @param {I_SymbolDefine} symbol 
     * @param {String} type 
     */
    constructor(symbol,type){
        this._symbol =symbol;
        this._type =type;
    }
    symbolName(){
        return this._symbol.name();
    }
    exInfos(){
        //return this._symbol.
    }


}
//TODO:基本・拡張の双方で使うので、1クラス追加
class SymbolFill{
    constructor(keys,button){

    }
}

class I_SymbolDefine{

    createDebugSymbol(){
        return new DebugSymbol(this,this.constructor.name);
    }
    isDeleter(){
        return false;
    }
    isParamatorValid(){
        if(!this.symbol()){
            return false;
        }
        if(!this.name()){
            return false;
        }
        if(this.isUnknow()){
            return false;
        }
        return true;
    }
    symbolBackColor(){
        return this.backColor();
    }
    // /**
    //  * @desc keyconfigで使う背景色
    //  */
    // keyBackColor(){
    //     return "#ffd530" ;
    // }
    customBackColor(){
        return "";
    }
    backColor(){
        const  custom = this.customBackColor();
        if(custom){
            return custom;
        }
        if(this.isMandatory()){
            return SymbolColorManager.mandatoryColor()
        }
        if(this.isEmpty()){
            return SymbolColorManager.emptyColor();
        }
        return SymbolColorManager.normalColor();
    }
    textColor(){
        return "#ffd530";
    }
    isUnknow(){
        return false;
    }
    name(){
        return "";
    }
    isEnabled(){
        return !this.isEmpty();
    }
    symbol(){
        return "";
    }
    isMandatory(){
        return false;
    }
    debugInfo(){
        return "";
    }
    isEmpty(){
        return !this.symbol();
    }
    displayKeyName(){
        return this.symbol();
    }
    errorText(){
        if(this.isEmpty()){
            return setting.errorText.symbolEmpty.currentName();
        }
        const name = this.name();
        if(!name){
            return setting.errorText.nameEmpty.currentName()+this.symbol();
        }
        return "";

    }
    helpText(){
        return ""
    }
    getHelpText(){
        const errorText = this.errorText();
        if(errorText){
            return errorText;
        }
        return this.helpText();
    }
    createErrorObject(){

    }

    isPressed(){
        return Input.isPressed(this.symbol());
    }
    isRepeated(){
        return Input.isRepeated(this.symbol());
    }
    isTriggered(){
        return Input.isTriggered(this.symbol());
    }
}


class MoveSymbol extends I_SymbolDefine{
    /**
     * @param {String} symbol 
     * @param {String} name 
     */
    constructor(symbol,name){
        super();
        this._symbol =symbol;
        this._name =name;
    }
    backColor(){
        return SymbolColorManager.moveSymbolColor();
    }
    symbol(){
        return this._symbol;
    }
    name(){
        return this._name;
    }
    displayKeyName(){
        return this._name;
    }
    // isMandatory(){
    //     return true;
    // }
}
function createMoveSymbols(){
    const up = new MoveSymbol("up","↑");
    const down = new MoveSymbol("down","↓");
    const left =new MoveSymbol("left","←");
    const right =new MoveSymbol("right","→");
    return [up,down,left,right];
}
class SymbolDeleteObject extends I_SymbolDefine{
    isEnabled(){
        return true;
    }
    isDeleter(){
        return true;
    }
    name(){
        return setting.text.mapperDelete.currentName();
    }
    symbol(){
        return null;
    }
    helpText(){
        return this.name();
    }
}
class EscapeSymbol extends I_SymbolDefine{
    /**
     * @param {MultiLanguageText} name 
     * @param {MultiLanguageText} helpText
     * @param {MultiLanguageText} keyText
     */
    constructor(name,helpText,keyText){
        super();
        this._name =name;
        this._helpText =xxxxMtext(helpText);
        this._keyText = xxxxMtext(keyText);

    }
    static create(objText){
        if(!objText){
            const name = new MultiLanguageText("menu/cancel","メニュー/キャンセル");
            return new EscapeSymbol(name,null,null);
        }
        const obj=JSON.parse(objText);

        const name =  MultiLanguageText.create(obj.name);
        const helpText =MultiLanguageText.create(obj.helpText);
        const keyText =MultiLanguageText.create(obj.keyText);
        return new EscapeSymbol(name,helpText,keyText);
    }

    name(){
        return this._name.currentName();
    }
    symbol(){
        return "escape";
    }
    backColor(){
        return SymbolColorManager.mandatoryColor();
    }
}
/**
 * 
 * @param {MultiLanguageText} mText 
 */
function xxxxMtext(mText){
    if(mText){
        if(!mText.isEmpty()){
            return mText
        }
    }
    return null;
}
class BasicSymbol extends I_SymbolDefine{
    /**
     * @param {String} symbol 
     * @param {MultiLanguageText} name 
     * @param {MultiLanguageText} keyText
     * @param {MultiLanguageText} helpText
     * @param {String} exKeys
     * @param {Number} exButton
     */
    constructor(symbol,name,keyText,helpText,exKeys ,exButton){
        super();
        this._symbol = symbol;
        //名前が未設定の場合、シンボルで初期化してしまう
        this._name =name ? name : new MultiLanguageText(symbol,symbol);
        //テキストが空っぽならnullにして、基底クラスの処理に任せる
        this._keyText = xxxxMtext( keyText);
        this._helpText=xxxxMtext(helpText);
        this._exKeys=exKeys;
        this._buttonId =exButton;
    }
    static create(symbol,objText){
        if(!objText){
            return new BasicSymbol(symbol,null,null,null);
        }
        const obj = JSON.parse(objText);
        const name =MultiLanguageText.create(obj.name);
        const keyText =MultiLanguageText.create(obj.keyText);
        const helpText =MultiLanguageText.create(obj.helpText);
        const exKeys =String(obj.exKeys||"");
        const exButton =Number(obj.exButton );
        return new BasicSymbol(symbol,name,keyText,helpText,exKeys,exButton);
    }
    isMandatory(){
        return true;
    }
    helpText(){
        return super.helpText();
    }
    name(){
        return this._name.currentName();
    }
    symbol(){
        return this._symbol;
    }
    displayKeyName(){
        if(this._keyText){
            return this._keyText.currentName();
        }
        return super.displayKeyName();
    }
}
function createBasicSymbols(){
    const param    = getParam();
    const ok       = BasicSymbol.create("ok",param.basicOk);
    const cancel   = BasicSymbol.create("cancel",param.basicCancel);
    const shift    = BasicSymbol.create("shift",param.basicShift);
    const menu     = BasicSymbol.create("menu",param.basicMenu);
    const pageup   = BasicSymbol.create("pageup",param.basicPageup);
    const pagedown = BasicSymbol.create("pagedown",param.basicPagedown);
    const esacape  = EscapeSymbol.create(param.basicEscape);
    return [ok,cancel,shift,menu,pageup,pagedown,esacape];
}

class EventCaller{
    /**
     * @param {Number} eventId 
     * @param {Number} triggereType 
     */
    constructor(eventId,triggereType){
        this._eventId = eventId;
        this._inputType = triggereType;
    }
    /**
     * @param {String} objText 
     * @returns 
     */
    static create(objText){
        if(!objText){
            return new EventCaller(0,0);
        }
        const obj =JSON.parse(objText);

        const eventId =Number(obj.id);
        const inputType =Number(obj.inputType);
        return new EventCaller(eventId,inputType);
    }
    isValidEvent(){
        return this._eventId > 0;
    }
    eventId(){
        return this._eventId;
    }
    callEvent(){
        if(!$gameTemp.isCommonEventReserved()){
            $gameTemp.reserveCommonEvent(this._eventId);
        }
    }
    /**
     * @param {String} symbol 
     */
    updateEvent(symbol){
        if(this._eventId >0 && this.needsEventCall(symbol)){
            this.callEvent();
        }
    }
    /**
     * @param {String} symbol 
     * @returns 
     */
    needsEventCall(symbol){
        switch (this._inputType) {
            case 0:
                return Input.isPressed(symbol);    
            case 1:
                return Input.isTriggered(symbol)
            case 2:
                return Input.isRepeated(symbol);
        }
        return false;
    }
    typeIsPressed(){
        return this._inputType === 0;
    }
    typeIsTriggered(){
        return this._inputType === 1;
    }
    typeIsRepeated(){
        return this._inputType === 2;
    }
}
class KeySetting{
    /**
     * 
     * @param {String} keys 
     * @param {String} color 
     * @param {MultiLanguageText} text 
     */
    constructor(keys,color,text){
        this._keys=keys.toUpperCase();
        this._color = color;
        this._mText=text;
    }
    static create(objText){
        if(!objText){
            return new KeySetting("",null,new MultiLanguageText("",""));
        }
        const obj =JSON.parse(objText);
        const keys =obj.keys;
        const color = (obj.color||null);
        const mtext = MultiLanguageText.create(obj.text);

        return new KeySetting(keys,color,mtext);


    }
    backColor(){
        return this._color;
    }
    keys(){
        return this._keys;
    }
    keyText(){
        if(this._mText){
            return this._mText.currentName();
        }
        return "";
    }


}
class AdovancedSetting{
    /**
     * 
     * @param {String} symbol 
     * @param {Number} overwriteType 
     * @param {boolean} mandatory 
     */
    constructor(symbol,overwriteType,mandatory){
        this._symbol =symbol;
        //シンボルが手動で設定されている場合、上書きで確定
        this._overwriteType=(!!symbol) ? 9: overwriteType;
        this._mandatory=  mandatory;
    }
    /**
     * @param {String} objText 
     * @returns 
     */
    static create(objText){
        if(!objText){
            return new AdovancedSetting(null,0,false); 
        }
        const obj=JSON.parse(objText);
        const symbol=(obj.symbol);
        const overwiteType =Number(obj.overwrite||0);
        const mandatory = (obj.mandatory==="true");
        return new AdovancedSetting(symbol,overwiteType,mandatory);
    }
    symbol(){
        return this._symbol;
    }
    isOverwriteEnabled(){
        return this._overwriteType !==0;
    }
    /**
     * 
     * @param {Boolean} value 
     */
    setMandatory(value){
        this._mandatory=value;
    }
    isMandatory(){
        return this._mandatory;
    }
    overwriteType(){
        return this._overwriteType;
    }

}

/**
 * @param {String} objText 
 */
const createExtendsSymbol=function(objText){
    const obj = JSON.parse(objText);
    const adovanced = AdovancedSetting.create(obj.adovanced);
    const buttonId =Number(obj.button);

    const mtext = MultiLanguageText.create(obj.name);
    const keys =String(obj.keys||"");
    const keyText =String(obj.keyText||"");
    const helpText =MultiLanguageText.create(obj.helpText||"{}");
    const keySetting = KeySetting.create(obj.keySetting);

    const eventObj =EventCaller.create(obj.event);
    const def = new ExtendsSymbol(adovanced,mtext, buttonId, keys,eventObj ,keyText,helpText,keySetting);

    /**
     * @type {String}
     */
    const touchButtonText=(obj.touchButton)
    const button = TouchButton.create(touchButtonText);//:null;
    if(button && button.isValid()){
        button.setSymbolObject(def);
    }

    return {
        exSymbol:def,
        button:button,
    }
}

class ExtendsSymbol extends I_SymbolDefine{
    /**
     * @param {AdovancedSetting} adovanced
     * @param {MultiLanguageText} actionName 
     * @param {Number} buttonId 
     * @param {String} keys 
     * @param {EventCaller} eventCaller
     * @param {String} keyText
     * @param {MultiLanguageText} helpText
     * @param {KeySetting} keySetting
     */
    constructor(adovanced,actionName,buttonId,keys ,eventCaller,keyText,helpText,keySetting){
        super();
        this._event = eventCaller;
        this._symbol =null;
        this._keys = (keys ||"").toUpperCase();
        this._buttonId =buttonId;
        this._actionName = actionName;
        //this._keyText=keyText;
        this._helpText =helpText;
        this._advanced =adovanced;
        this._keySetting=keySetting;
    }

    getKeys(){
        return this._keys + this._keySetting.keys();
    }
    overwriteType(){
        return this._advanced.overwriteType();
    }
    isOverwriteEnabled(){
        return this._advanced.isOverwriteEnabled();
    }

    isMandatory(){
        return this._advanced.isMandatory();
    }
    displayKeyName(){
        const keyText = this._keySetting.keyText();
        if(keyText){
            return keyText;
        }
        return super.displayKeyName();
    }
    eventCaller(){
        return this._event;
    }
    helpText(){
        if(this._helpText){
            return this._helpText.currentName();            
        }
        return null;
    }
    name(){
        const name= this._actionName.currentName();
        if(this._symbol){
            return name;
        }
        return `empty(${this.overwriteType()}):${name}`;
    }
    customBackColor(){
        return this._keySetting.backColor();
    }
    symbol(){
        return this._symbol;
    }
    /**
     * @param {(symbol:string)=>Boolean} isBasicSymbol
     * @returns {String}
     */
    padSymbol(isBasicSymbol){
        const symbol =Input.gamepadMapper[this._buttonId];
        if(!isBasicSymbol(symbol)){
            return symbol;
        }
        return null;
    }
    /**
     * @param {(symbol:string)=>Boolean} isBasicSymbol
     * @returns {String}
     */
    firstKeySymbol(isBasicSymbol){
        const keys = this.getKeys();
        const charLen =keys;
        for(let i =0; i <charLen; ++i){
           const char_=  keys.charCodeAt(i);
           const symbol = Input.keyMapper[char_];
           if(symbol){
                if(!isBasicSymbol(symbol)){
                    return symbol;
                }
           }
        }
        return null;
    }
    evantCallSymbol(){
        if(this._event){
            const eventId =this._event.eventId()
            if(eventId > 0){
                 return "call"+eventId;
            }
        }
        return null

    }

    /**
     * @param {(symbol:String)=>Boolean} isBasicSymbol 
     * @returns {String}
     * @description 優先シンボルの読み込み
     */
    readPreferredSymbol(isBasicSymbol){
        const manualSymbol=this._advanced.symbol();
        if(manualSymbol){
            return manualSymbol;
        }
        switch (this._advanced.overwriteType()) {
            case 1:
                return this.padSymbol(isBasicSymbol);
            case 2:
                return this.firstKeySymbol(isBasicSymbol);
            case 3:
                return this.evantCallSymbol()
        }
        return "";
    }
    /**
     * @param {(symbol:String)=>Boolean} isBasicSymbol 
     * @returns {String}
     */
    readMySymbol(isBasicSymbol){
        //上書き用の優先されるシンボルを取り出す
        const xxxx=this.readPreferredSymbol(isBasicSymbol);
        if(xxxx){
            return xxxx;
        }
        //無かったら、この順番で適当に読み込む
        const pad = this.padSymbol(isBasicSymbol);
        if(pad){
            return pad;
        }
        const key =this.firstKeySymbol(isBasicSymbol)
        if(key){
            return key; 
        }
        const eventCall =this.evantCallSymbol();
        if(eventCall){
            return eventCall;
        }
        return "";
    }
    /**
     * @param {(symbol:String)=>Boolean} mapper 
     */
    loadSymbol(mapper){
        if(!this._symbol){
            const symbol =this.readMySymbol(mapper);
            this._symbol = symbol;
        }
        if(this.isEmpty()){
            this._advanced.setMandatory(false);
        }
    }
    mapperWrite(mapper,targetKey){
        //上書きが許可されてない場合
        if(!this.isOverwriteEnabled()){
            //指定位置のシンボルがあるか調べる
            const oldSymbol =mapper[targetKey];	
            if(oldSymbol){
                //上書きせずに終了
                return;
            }
        }
        //TODO:mapperをmainMapperクラスにする
        //これで直接触るのを避ける
        mapper[targetKey]= this._symbol;	
    }

    fillSymbol(){
        if(!this._symbol){return;}
        if(!isNaN( this._buttonId)){
            this.mapperWrite(Input.gamepadMapper,this._buttonId);
        }
        const keys=this.getKeys();
        const len = keys.length;
        for(let i =0; i< len;++i){
            const charcode =keys.charCodeAt(i);
            this.mapperWrite(Input.keyMapper,charcode);
        }
    }
    updateEventCall(){
        if(this._event){
            const symbol = this.symbol();
            if(symbol){
                this._event.updateEvent(symbol);
            }
        }
    }
    debugInfo(){
        return `ot:${this.overwriteType()},id:${this._buttonId},keys:${this.getKeys()}`;
    }

}

/**
 * @description 指定したシンボルを持つキーの一覧を取得
 * @param {String} symbol 
 */
function KeyWithTheSymbolPlaced(symbol){
    let keys ="";
    for (const iterator of Object.entries(Input.keyMapper)) {
        if(iterator[1]===symbol){
            const keyN =Number(iterator[0]);
            const char = String.fromCodePoint(keyN);    
            keys +=char;
        }
    }
    return keys;
}

/**
 * @description 指定したシンボルを持つパッドボタン番号を取得
 * @param {String} symbol 
 */
function buttonWithTheSymbolPlaced(symbol){
    for (const iterator of Object.entries(Input.gamepadMapper)) {
        if(iterator[1]===symbol){
            return Number(iterator[0]);
        }
    }
    return NaN;
}

class UnknowSymbol extends I_SymbolDefine{
    /**
     * @param {String} symbol 
     */
    constructor(symbol){
        super();
        //TODO:初期化処理を変えて、下記の関数をメソッドへと移行する
        this._kesy = KeyWithTheSymbolPlaced(symbol);
        this._buttonId = buttonWithTheSymbolPlaced(symbol);
        this._symbol = symbol;
    }
    symbol(){
        return this._symbol;
    }
    
    name(){
        return "?"+this.buttonIdText()+this._kesy+":"+this.symbol();
    }
    buttonIdText(){
        if(isNaN(this._buttonId)){
            return "";
        }
        return "("+this._buttonId +")";
    }
    isUnknow(){
        return true;
    }

    debugInfo(){
        return "button:"+this._buttonId +",keys:"+this._kesy;
    }
    helpText(){
        return setting.errorText.unknowSymbol.currentName()+"\n" + this.debugInfo();
    }
}


class SymbolManager_T {
    /**
     * @param {I_SymbolDefine[]} basicSymbols 
     * @param {MoveSymbol[]} moveSymbols 
     */
    constructor(basicSymbols,moveSymbols){
        /**
         * @type {Map<String,I_SymbolDefine>}
         */
        this._symbolDictionary = new Map();
        /**
         * @type {UnknowSymbol[]}
         */
        this._unknowList=[];
        this.setExtendSymbols([]);
        this._basicSymbols = basicSymbols
        this._moveSymbols = moveSymbols
        this.addDictionaryItems(this._basicSymbols);
        this.addDictionaryItems(this._moveSymbols);
    }
    /**
     * @param {String} symbolString 
    */
    isBasicSymbol(symbolString){
        if(!symbolString){
            return false;
        }

        return this._basicSymbols.some( function(symbolObject){
            return symbolObject.symbol() ===symbolString;
        } )
        // const symbolObect = this.findSymbol(symbolString);
        // if(symbolObect){
        //     return this._basicSymbols.contains(symbolObect);
        // }
        // return false;
    }
    
    /**
     * @param {ExtendsSymbol[]} list 
     */
    setExtendSymbols(list){
        this._extendSymbols =list;
    }

    callButtonEvent(){
        for (const iterator of this._extendSymbols) {
            //既に予約されている場合、あるいはupdateEventCall()で予約されたら処理を止める
            if($gameTemp.isCommonEventReserved()){
                break;
            }

            iterator.updateEventCall();
        }
    }
    onBoot(){
        this.loadExtendsSymbols();
        this.loadUnknowSymbols();
    }
    loadExtendsSymbols(){
        const selfObject =this;
        const isBasicSymbol = function(symbol){
            return selfObject.isBasicSymbol(symbol);
        };
        const numExSymbols=this._extendSymbols.length;
        for (const iterator of this._extendSymbols) {
            iterator.loadSymbol(isBasicSymbol);
        }
        if(numExSymbols!==this._extendSymbols.length){
            throw new Error("要素数を書き換えてはいけません")
        }
        for (const iterator of this._extendSymbols) {
            iterator.fillSymbol();
        }
        //他のプラグインによる設定が完了した後で呼び出される
        //なので、このタイミングで行う必要がある
        this.addDictionaryItems(this._extendSymbols);
    }
    loadUnknowSymbols(){
        /**
         * @type {String}
         */
        const padSymbols = Object.values(Input.gamepadMapper);
        /**
         * @type {String}
         */
        const keySymbols =Object.values(Input.keyMapper)
        //mapperにある全てのシンボルを列挙する
        const set = new Set(keySymbols);
        for (const iterator of padSymbols) {
            set.add(iterator);
        }
        //Managerにあるシンボルを列挙した中から消す
        for (const iterator of this.getSymbolList()) {
            const symbol = iterator.symbol();
            if (symbol) {
                set.delete(symbol);
            }
        }

        //移動シンボル4種を消す
        // for (const iterator of this._moveSymbols) {
        //     const symbol = iterator.symbol();
        //     if(symbol){
        //         set.delete(symbol);
        //     }
        // }
        for (const iterator of this.systemSymbols()) {
            set.delete(iterator);
        }
        //ラムダ式が使えないので、この方法でthisを捕まえておく
        const seleObject=this;

        set.forEach(function(symbol){
            const obj =new UnknowSymbol(symbol)
            seleObject._unknowList.push( obj);
//            seleObject._symbolDictionary.set(symbol,obj);
        });
        this.addDictionaryItems(this._unknowList)
    }

    /**
     * @param {I_SymbolDefine[]} list 
     */
    addDictionaryItems(list){
        for (const iterator of list) {
            const symbol = iterator.symbol();
            if(symbol){
                this._symbolDictionary.set(symbol,iterator);
            }
        }
    }

    /**
     * @returns {I_SymbolDefine[]}
     */
    getSymbolList(){
        return this._basicSymbols.concat(
            this._extendSymbols,
            this._unknowList,
            this._moveSymbols
            //,[ new SymbolDeleteObject() ]
            );
    }

    /**
     * @param {String} symbol 
     */
    actionName(symbol){
        if(!symbol){ return "";}
        const item = this.findSymbol(symbol);
        if(item){  return item.name();}

        //TODO:この表記になるとガチで正体不明になるので対策
        //この場合、初期化が正しく行われていない可能性
        return "unknow:"+symbol;
    }
    /**
     * @param {String} symbol 
     */
    findSymbol(symbol){
        return this._symbolDictionary.get(symbol);
    }

    systemSymbols(){
        return ["debug","control","tab"];
    }

    /**
     * @param {String} symbol 
     */
    isMandatorySymbol(symbol){
        if(!symbol){
            return false;
        }
        const def = this._symbolDictionary.get(symbol);
        if(def){
            return def.isMandatory();
        }
        return false;
    }
    /**
     * @returns {I_SymbolDefine[]}
     */
    allMandatorySymbols(){
        return this.getSymbolList().filter( function(def){ return def.isMandatory()});
    }

    /**
     * @param {Set<String>} set 
     * @returns 
     */
    isValidMapper_v3(set){
        const m=this.allMandatorySymbols()
        for (const iterator of m) {
            const symbol = iterator.symbol();
            if(Input._isEscapeCompatible(symbol)){
                if(set.has("escape")){
                    continue;
                }
            }
            if(!set.has(symbol)){
                return false;
            }
        }
        return true;
    }

}
const symbolManager = new SymbolManager_T(
    createBasicSymbols(),
    createMoveSymbols()
);

/**
 * @param {SymbolManager_T} symbolManager 
 * @param {ButtonManager_T} buttonManager
 */
function setupExtendsSymbols(symbolManager,buttonManager){
    const param = getParam();
    /**
     * @type {String[]}
     */
    const textList = JSON.parse(param.extendsMapper);

    const buttons =[];
    const symbols=[];
    for (const iterator of textList) {
        const item=createExtendsSymbol(iterator);
        symbols.push(item.exSymbol);
        if(item.button){
            buttons.push(item.button);
        }
    }
    symbolManager.setExtendSymbols(symbols);
    buttonManager.setList(buttons);
}
setupExtendsSymbols(symbolManager,ButtonManager);


if(ButtonManager.isTouchButtonEnabled()){

    class Sprite_EX_Base extends Sprite_Clickable{
        /**
         * @param {Bitmap} bitmap 
         */
        constructor(bitmap){
            super();
            this.bitmap =bitmap;
            this._imageHeight =0;
            this.setupBitmapOnLoad();
        }
        setupBitmapOnLoad(){
            if(this.bitmap.isReady()){
                this.onLoadeed();
            }else{
                //ラムダ禁止
                const selfObject=this;
                this.bitmap.addLoadListener(function(bitmap){
                    selfObject.onLoadeed();
                } );
            }
        }
        onLoadeed(){
            //画像を上下半々で使うように設定
            this._imageHeight=this.bitmap.height /2;
            this.setColdFrame();
        }
        setColdFrame(){
            this.setFrame(0,0,this.bitmap.width,this._imageHeight)
        }
        setHotFrame(){
            this.setFrame(0,this._imageHeight,this.bitmap.width,this._imageHeight);
        }
        updateFrame(){
            if(this.isPressed()){
                this.setHotFrame();
            }else{
                this.setColdFrame();
            }
        }
    }

    class Sprite_EX_ButtonMZ extends Sprite_EX_Base{
        /**
         * @param {TouchButton} touchButton 
         */
         constructor(touchButton){
             super(touchButton.bitmap());
             this._button = touchButton;
             this.resetPosition();

        }
        resetPosition(){
            this.x = this._button.x();
            this.y = this._button.y();
        }
        onPress(){
            this._button.virtualPress();
        }
        onClick(){
            Input.virtualClick(this._button.symbol()  );
        }
        update(){
            super.update();
            if(!this.isPressed()){
                this._button.clearPress();
            }
            this.updateFrame();
        }
    }
    class Spriteset_TouchButton extends PIXI.Container{
        constructor(){
            super();
            this._buttons =[];
            const buttons = ButtonManager.getList();
            for (const iterator of buttons) {
                const sprite = new Sprite_EX_ButtonMZ(iterator);
                this.addChild(sprite);
                this._buttons.push(sprite);
            }
        }
        get z(){
            return 1;
        }
        update(){
            for (const iterator of this._buttons) {
                iterator.update();
            }
        }
        isAnyButtonPressed(){
            //ラムダ禁止
            return this._buttons.some(function (button){
                 return button.isPressed()
            });
        }
    }

    Scene_Map.prototype.createTouchButtonMA =function(){
        const spriteset = new Spriteset_TouchButton();
        this.addWindow(spriteset);
        this._touchButtonsMA = spriteset;
    };
    const Scene_Map_createButtons = Scene_Map.prototype.createButtons;
    Scene_Map.prototype.createButtons =function(){
        Scene_Map_createButtons.call(this);
        if(ConfigManager.touchUI){
            this.createTouchButtonMA();
        }
    };
    const Scene_Map_isAnyButtonPressed=Scene_Map.prototype.isAnyButtonPressed;
    Scene_Map.prototype.isAnyButtonPressed =function(){
        const result= Scene_Map_isAnyButtonPressed.call(this);
        if(result){
            return true;
        }
        return this._touchButtonsMA && this._touchButtonsMA.isAnyButtonPressed();
    };

}
//ボタンとキーの共通基底クラス
class InputButtonBase{

    name(){
        return "";
    }
    mapperId(){
        return NaN;
    }
}


class I_ReadonlyMapper{
    /**
     * @param {Number} buttonId 
     * @returns 
     */
    symbolString(buttonId){
        return "";
    }
    /**
     * @param {String} symbol 
     * @param {InputButtonBase[]} buttonList
     * @returns 
     */
    buttonFromSymbol_XX(symbol,buttonList){
        if(!symbol){
            return null;
        }
        for (const button of buttonList) {
            const id = button.mapperId();
            if(symbol===this.symbolString(id)){
                return button;
            }
        }
        return null;
    }
    /**
     * @description Map<>を生成するための補助関数
     * @returns {Map<Number,String>}
     * @param {*} mapper 
     */
    createMapSupport(mapper){
        const map =new Map();
        for (const iterator of Object.entries(mapper)) {
            const code = Number(iterator[0]);
            if(!isNaN(code)){
                map.set(code,iterator[1]);
            }
        }
        return map;
    }
    createDic(){

    }
    /**
     * @returns {}
     */
    cloneMapper(){
        throw new Error("未実装")
    }
}

//ゲーム実行中のマッパーに直接触れるヤツ
//主にFillSymbol用
//初期状態も、これに持たせてしまう
class MainMapperBase{
    constructor(){
        this._defaultMapper=null;
    }
    target(){
        return {};
    }

    /**
     * 
     * @param {Number} key 
     * @param {String} symbolString 
     */
    change(key,symbolString){
        const target=this.target();
        target[key]=symbolString;
    }
    saveDefault(){
        this._defaultMapper =new DefaultMapper(this.target());
    }
    loadDefault(){
        this.reset(this._defaultMapper.cloneMapper());
    }
    reset(mapper){
    }
}
class MainGamepadMapper extends MainMapperBase{
    target(){
        return Input.gamepadMapper;
    }
    reset(){
        
    }
}

class DefaultMapper extends I_ReadonlyMapper{
    constructor(obj){
        super();
        this._mapper= Object.freeze( objectClone(obj));
    }
    mapper(){
        return this._mapper;
    }
 
}


class InputDeviceBase extends I_ReadonlyMapper{
    constructor(){
        super();
        this.setDefaultMapper(null);
    }
    /**
     * @param {DefaultMapper} mapper 
     */
    setDefaultMapper(mapper){
        this._defaultMapper=mapper;

    }

    /**
     * @desc ABC順に並んだリスト
     * @returns {InputButtonBase[]}
     */
    indexList(){
        return [];
    }
    /**
     * @returns {InputButtonBase[]}
     */
    buttonList(){
        return []
    }
    /**
     * @param {Number} buttonId 
     * @returns {InputButtonBase}
     */
    buttonAt(buttonId){
        return null
    }
    numButtons(){
        return this.buttonList().length;
    }
    /**
     * @returns {DefaultMapper}
     */
    defaultMapper_v2(){
        return null;
    }
    defaultMapper(){
        return {};
    }
    currentMapper(){
        return {}
    }

    /**
     * @param {String} symbol 
     * @returns 
     */
    getButtonBySymbol(symbol){
        const indexList = this.indexList();

        return this.buttonFromSymbol_XX(symbol,indexList);
    }
    /**
     * @param {Number} buttonId 
     * @returns {String}
     */
    symbolString(buttonId){
        const mapper = this.currentMapper();
        const symbol = mapper[buttonId];
        if(symbol){
            return symbol;
        }
        return "";
    }
    createTemporaryMapper(){
        const tmp = new TemporaryMappper(this.currentMapper());
        return tmp;
    }
}
class GamepadButton extends InputButtonBase{
    /**
     * @param {Number} buttonId 
     * @param {String} name 
     */
    constructor(buttonId,name){
        super();
        this._name =name;
        this._buttonId=buttonId;
    }

    name(){
        return this._name;
    }
    mapperId(){
        return this.buttonId();
    }
    
    buttonId(){
        return this._buttonId;
    }
    text(){
        const buttonNumber= this._buttonId.toString().padStart(2,"  ");
        return buttonNumber +":"+this.name();
    }
    color(){
        return "#000000";
    }
}
//ハードメーカーの違いに対応するためのやつ

//ボタンの名前を入れておくクラス
//また、編集可能なボタンを制御する際にも使う
//TODO:ボタン名称を作り直す
//何度も名前が違うと文句を言われるので、Xスタイル・Nスタイル・Pスタイルを用意
class Gamepad extends InputDeviceBase{
    constructor(n,p,x){
        super();
        this._defaultMapper_V2=null;//new InputDevice_Readonly()
        const moves =[
            new GamepadButton(12,"↑"),
            new GamepadButton(13,"↓"),
            new GamepadButton(14,"←"),
            new GamepadButton(15,"→")
        ];
        this._moves =moves;
        const buttons =[
            new GamepadButton(0,"B/×"),
            new GamepadButton(1,"A/○"),
            new GamepadButton(2,"X/□"),
            new GamepadButton(3,"Y/△"),
            new GamepadButton(4,"L1"),
            new GamepadButton(5,"R1"),
            new GamepadButton(6,"L2"),
            new GamepadButton(7,"R2"),
            new GamepadButton(8,"select"),
            new GamepadButton(9,"start"),
            new GamepadButton(10,"L3"),
            new GamepadButton(11,"R3")
//          ,new GamepadButton(16,"center")
        ];
        this._list = buttons;
    }
    onBoot(){

    }
    button(buttonId){
        return this._list[buttonId];
    }
    indexList(){
        return this._list;
    }
    findNormalButton(code){
        const buttonA = this._list[code];
        if(buttonA.buttonId()===code){
            return buttonA;
        }
        for (const iterator of this._list) {
            if(iterator.buttonId()===code){
                return iterator
            }
            
        }
        return;
    }
    /**
     * @param {Number} code 
     */
    getButtonByCode(code){
        if(code <=11){
            return this.findNormalButton(code);
        }

        return null;
        
    }
    // maxItems(){
    //     return this._list.length;
    // }
    /**
     * @param {number} index
     */
    buttonAt(index){
        return this._list[index];
    }
    /**
     * @param {Number} index
     */
    buttonName(index){
        const b = this.buttonAt(index);
        if(b){ return b.name();}
        return "";
    }
    buttonList(){
        return this._list;
    }
    defaultMapper(){
        return Mano_InputConfig.defaultGamepadMapper;
    }
    currentMapper(){
        return Input.gamepadMapper;
    }
    isConected(){
        const pad = createPadState(0);
        return !!pad;
    }
    deviceName(){
        const pad = createPadState(0);
        if(pad){
            return pad.id
        }
        return "";
    }
    defaultMapper_v2(){
        const tmp = new TemporaryMappper(this.defaultMapper());
        return tmp;
    }
}



/**
 * @return {string[]}
 */
function createMandatorySymbols(params){
    return ["ok","cancel","menu"];
}
/**
 * @param {String} text 
 * @returns {String}
 */
function noteOrString(text){
    if(text ==undefined){
        return "undefined"
    }
    const last = text[text.length-1]
    if(text[0]==='"'&&last ==='"'){
        return JSON.parse(text);
    }
    return String(text);
}
function createText(params){
    const guid = new MultiLanguageText("This is an unknown symbol. Add an item to the input extension","不明なシンボルです 入力拡張に項目を追加してください");

    return{
        gamepadConfigCommandText:MultiLanguageText.create(params.gamepadConfigCommandText),
        keyConfigCommandText:MultiLanguageText.create(params.keyConfigCommandText),
        mapperDelete:MultiLanguageText.create(params.mapperDelete),
        gamepadIsNotConnected: MultiLanguageText.create(params.GamepadIsNotConnectedText),
        needButtonDetouch:MultiLanguageText.create(params.needButtonDetouchText),
        unknowguid:guid,
    }
}
class ErrorObject{
    
    constructor(mtext,errorCategory){

    }
    errorNumber(){
        //E1 

        //E9 その他のエラー
    }
    createErrorMessage(symbol){

    }
    //一覧表示用の内容を返す
    itemText(){

    }
    //解決方法を返す
    helpText(){

    }
}

function createErrorTexts(){
    const unknowSymbol = new MultiLanguageText("This is an unknown symbol. Add an item to the input extension","不明なシンボルです 入力拡張に項目を追加してください");
    const symbolEmpty=new MultiLanguageText("The symbol is not set \n Check the contents of the inputExtension from the plugin parameters","シンボルが設定されていません\nプラグインパラメータから拡張設定の内容を確認してください");
    const nameEmpty= new MultiLanguageText("The name for display is not set\nsymbol:","表示用の名称が設定されていません\nsymbol:");
    //シンボル名の打ち間違いを調べる
    const symbolManual =new MultiLanguageText("","シンボルが手動で設定されていますが、mapper内から見つけることができませんでした。");

    return {
        unknowSymbol:unknowSymbol,
        symbolEmpty:symbolEmpty,
        nameEmpty:nameEmpty,
    }

}
class InputDevice_Readonly{
    constructor(mapper){
        this._mapper=mapper;
    }
    mapper(){
        return this._mapper;
    }

}

class DeviceXXX{
    constructor(){
        this._defaultKeyMapper=null;
        this._defaultGamepadMapper=null;
        this.setKeyLayout(null,null);
    }
    /**
    * @param {Key_Layout} jis 
     * @param {Key_Layout} us 
     */
    setKeyLayout(jis,us){
        this._keyLayoutJIS=jis;
        this._keyLayoutUS =us;
    }
    onBoot(){
        this.setupDefaultMapper()
    }
    setupDefaultMapper(){
        this._defaultKeyMapper= new InputDevice_Readonly(  Object.freeze(objectClone(Input.keyMapper)));
        this._defaultGamepadMapper =new InputDevice_Readonly(  Object.freeze(objectClone(Input.gamepadMapper)));
    }
    keyMapper(){
        return this._defaultKeyMapper;
    }
    gamepadMapper(){
        return this._defaultGamepadMapper;
    }
}

const setting = (function(){
    const params = getParam();
    const keyText ={
        up:"↑",
        down:"↓",
        right:"→",
        left:"←"
    };

    const buttonUsedForALT =new MultiLanguageText();
    buttonUsedForALT.setNameJP("このボタンには%1が割り当て済みです");
    buttonUsedForALT.setNameEN("%1 has been assigned to this button")

    const result= {
        device:new DeviceXXX(),
        errorText:createErrorTexts(),
        text:createText(params),
        buttonUsedForALT:buttonUsedForALT,
        keyWindowLineHeight:22,
        gamepad :new Gamepad(),
        keyText:keyText,
        emptySymbolText:String(params.textEmpty),
        mandatorySymbols:createMandatorySymbols(params),
        windowSymbolListWidht:Number(params.windowSymbolListWidth),
        gamepadBackground:String(params.gamepadBackground),
        keyBackground:String(params.keyBackground),
        //needButtonDetouch:MultiLanguageText.create(params.needButtonDetouchText),
        //gamepadIsNotConnected: MultiLanguageText.create(params.GamepadIsNotConnectedText),
        //gamepadConfigCommandText:MultiLanguageText.create(params.gamepadConfigCommandText),
        //keyConfigCommandText:MultiLanguageText.create(params.keyConfigCommandText),
        //mapperDelete:MultiLanguageText.create(params.mapperDelete),
        numVisibleRows:16,//Number(params.numVisibleRows),
        cols:4,
    };
    return result;
})();
function currentGamepadConfigText(){
    return setting.text.gamepadConfigCommandText.currentName();
}
function currentKeyConfigText(){
    return setting.text.keyConfigCommandText.currentName();
}

/**
 * @param {String} base 
 */
function makeCONFIG_KEY(base) {
    if(IS_Atsumaru){
        return base +location.pathname;
    }
    return base;
}
const MA_INPUTCONFIG_STYLE =makeCONFIG_KEY( "MA_INPUTCONFIG_STYLE");
const MA_KEYBOARD_CONFIG =makeCONFIG_KEY('KEYBOARD_CONFIG');
const MA_GAMEPAD_CONFIG = makeCONFIG_KEY('GAMEPAD_CONFIG');
const MA_KEYBOARD_LAYOUT =makeCONFIG_KEY('KEYBOARD_LAYOUT');

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
/**
 * @param {String} value 
 */
ConfigManager.setInputConfigStyle =function(value){
    this[MA_INPUTCONFIG_STYLE]=value;
};
ConfigManager.setKeyLayoutMA =function(layout){
    ConfigManager.keyLayout_MA =layout;
};

function defaultKeyLayout() {
    //オプション系プラグインで先行してmakeData()するタイプへの対策
    if($gameSystem && $gameSystem.isJapanese()){
        return 'JIS';
    }
    return 'US';
}
//saveconfig
const  ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData =function(){
    const result = ConfigManager_makeData.call(this);
    result[MA_INPUTCONFIG_STYLE] = ConfigManager[MA_INPUTCONFIG_STYLE] ||"normal";
    result[MA_GAMEPAD_CONFIG] =Input.gamepadMapper;
    result[MA_KEYBOARD_CONFIG] = Input.keyMapper;
    result[MA_KEYBOARD_LAYOUT] = ConfigManager.keyLayout_MA ||defaultKeyLayout();
    return result;
};
//loadconfig
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
    ConfigManager.setInputConfigStyle( config[MA_INPUTCONFIG_STYLE]);
    ConfigManager.setKeyLayoutMA(config[MA_KEYBOARD_LAYOUT]||'JIS');
    Input.clear();
};

const ColorSrc = window["ColorManager"] || null;
/**
 * @returns {Window_Base}
 * @param {Window_Base} window_base 
 */
function getColorSrc(window_base){
    return ColorSrc||window_base;
}

class TemporaryMappperBase extends I_ReadonlyMapper{
    /**
     * 
     * @param {String} symbol 
     * @returns 
     */
    hasSymbol(symbol){
        return false;
    }
    isValidMapper(){
        return false;
    }
    /**
     * @param {Number} code 
     * @param {String} symbol 
     */
    change(code,symbol){

    }
    createNormalizedMapper(){
        return {}
    }
    reset(mapper){

    }
}
//TODO:mapperのリセット用に保存してあるデータを何とかする
//主にリセットで使うので、それに向いた構造に改造したい

class TemporaryMappper extends TemporaryMappperBase{
    /**
     * @returns {Map<Number,String>}
     * @param {*} mapper 
     */
    static createMap(mapper){
        const map =new Map();
        for (const iterator of Object.entries(mapper)) {
            const code = Number(iterator[0]);
            if(!isNaN(code)){
                map.set(code,iterator[1]);
            }
        }
        return map;
    }
    constructor(mapper){
        super();
        this.reset(mapper);
    }
    createSymbolsSet(){
        const set =new Set(this._map.values());
        return set;
    }
    /**
     * @param {I_ReadonlyMapper} mapper 
     */
    readOtherMapper(mapper){

    }
    /**
     * @param {DefaultMapper} mapper 
     */
    reset_V2(mapper){

    }
    reset(mapper){
        this._map = TemporaryMappper.createMap(mapper);
    }
    /**
     * @param {Number} code 
     * @param {String} symbol 
     */
    change(code,symbol){
        this._map.set( Number(code),symbol);
    }
    createNormalizedMapper(){
        const result ={};
        for (const iterator of this._map) {
            result[iterator[0]] = iterator[1];
        }
        return result;
    }
    /**
     * @param {Number} codeId 
     * @returns 
     */
    getSymbolObjectByCode(codeId){
        const symbol = this._map.get(codeId);
        return symbolManager.findSymbol(symbol);
    }
    /**
     * @param {Number} codeId 
     */
    symbolString(codeId){
        const symbol = this.getSymbolObjectByCode(codeId);
        if(symbol){
            return symbol.symbol();
        }
        return ""
    }
    /**
     * @param {Number} code 
     * @returns {String}
     */
    findSymbolByCode(code){
        return this._map.get(code);
    }
    /**
     * @param {Number} code 
     * @returns 
     */
    findObjectByCode(code){
        const symbolString = this.findSymbolByCode(code);
        return symbolManager.findSymbol(symbolString);
    }
    // /**
    //  * @param {String} symbol 
    //  */
    // findFromSymbol(symbol){
    //     for (const iterator of this._map.entries()) {
    //         if(iterator[1]===symbol){
    //             return iterator[0];
    //         }
    //     }
    //     return NaN;
    // }
    findObjectFromSymbol(symbolString){
        
    }

    /**
     * @param {String} symbol 
     * @param {Number} code
     */
    canSymbolChange(symbol,code){
        return !this.areSymbolAndCode(symbol,code);
    }
    /**
     * @param {String} symbol 
     * @param {Number} code
     */
     areSymbolAndCode(symbol,code){
        const aa = this._map.get(code);
        return aa ===symbol;
    }
    /**
     * @param {Number} code 
     */
    daleteByCode(code){
        this._map.delete(code);
    }


    /**
     * @param {String} symbol 
     */
    hasSymbol(symbol){
        const isEscapeCompatible = Input._isEscapeCompatible(symbol);
        for (const iterator of this._map.values()) {
            if(iterator ===symbol){
                return true;
            }
            if(isEscapeCompatible){
                if(iterator ==="escape"){
                    return true;
                }
            }
        }
        return false;
    }
    isValidMapper(){
        return symbolManager.isValidMapper_v3(this.createSymbolsSet());
    }
}

class TemporaryMappperALT extends TemporaryMappper{
    constructor(mapper){
        super(mapper);
        /**
         * @type {Map<String,Number>}
         */
        this._reverseMap = new Map();
        /**
         * @type {Set<String>}
         */
        this._changeHistory  =new Set();
    }
    /**
     * @param {Number} code 
     * @param {String} symbol 
     */
    change(code,symbol){
        const oldSymbol = this.findSymbolByCode(code);
        const finalSymbol = (oldSymbol===symbol) ? "":symbol;
        super.change(code,finalSymbol);
    }
    canSymbolChange(symbol,code){
        return true;
    }
    clearChangeHistory(){
        this._changeHistory.clear();
    }
    hasChanged(symbol){
        return this._changeHistory.has(symbol);
    }

}

class Window_Selectable_InputConfigVer extends Window_Selectable{
    /**
     * @param {Rectangle} rect 
     */
    constructor(rect){
        super(rect);
    }
    /**
     * 
     * @param {MultiLanguageText} commandText 
     * @param {*} func 
     */
    addCommand(commandText,func){


    }
    /**
     * @returns {Number}
     */
    bottom(){
        return this.y + this.height;
    }
    /**
     * @param {Rectangle} rect 
     */
    initialize(rect){
        window_initializeMVMZ(this,rect,super.initialize);
    }
    isOkTriggered(){
        return Input.isTriggered("ok");
    }
    isCancelTriggered(){
        return Input.isTriggered('cancel');
    }
    textPadding(){
        return 6;
    }
    /**
     * @param {Rectangle} rect
     * @param {String} coorCord
     */
    drawSymbolBack(rect, color) {
        this.changePaintOpacity(false);
        this.contents.fillRect(rect.x + 1, rect.y + 1, rect.width - 2, rect.height - 2, color);
        this.changePaintOpacity(true);
    }
    /**
     * @returns {typeof ColorManager}
     * @desc MV/MZ共用処理。ソースコードはMZ向けで記述。
     */
    colorSrc(){
        return getColorSrc(this);
    }
    /**
     * @param {I_SymbolDefine} symbolObject 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} width 
     */
    drawSymbolObject(symbolObject,x,y,width){
        this.changePaintOpacity(symbolObject.isEnabled());
        this.drawText(symbolObject.name(),x,y,width);
    }

    numberWidth(){
        return 26;
    }
    /**
     * @param {InputButtonBase} button 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} width 
     */
     drawButton_V3(button,x,y,width){
        const numberWidth  = this.numberWidth();
        this.drawText(button.mapperId(),x,y,numberWidth);
        const nameWidth= width -numberWidth
        const nameX = x + numberWidth;
        this.drawText(":"+button.name(),nameX,y,nameWidth);
    }
}
class Window_InputConfigBase extends Window_Selectable_InputConfigVer{

    initialize(rect){
        this.initializeMapper();
        super.initialize(rect);
    }
    initializeMapper(){
    }
    
    mainItems(){
        return 0;
    }

    /**
     * @returns {Key_Command[]}
     */
    commandList(){
        return [];
    }
    /**
     * @param {Number} index 
     * @returns 
     */
    command(index){
        const commandList = this.commandList();
        const commandIndex = this.commandIndex(index);
        return commandList[commandIndex];
    }
    commandLength(){
        return this.commandList().length;
    }

    /**
     * @param {Number} index 
     */
    commandIndex(index){
        return index - this.mainItems();
    }
    exitCommandIndex(){
        return -1;
    }
    /**
     * @param {Number} index 
     */
    isExitCommand(index){
        return this.exitCommandIndex() ===index;
    }
    /**
     * 
     * @param { Number} index 
     */
    drawCommand(index){
        //メモ ボタン一覧を示すリストと、保存などに使うコマンドは別の配列
        //なので、描画機能は分けてある
        const command = this.command(index);
        if(command){
            this.changePaintOpacity(true);
            const rect = this.itemRectWithPadding(index);
            const text =command.text();
            this.drawText(text,rect.x,rect.y,rect.width);
        }
    }
    processCommandOk(){
        const command = this.command(this.index());
        if(command ){
            if(this.isHandled(command.handle)){
                this.updateInputData();
                this.deactivate();
                this.callHandler(command.handle);    
            }
        }else{
            this.playBuzzerSound();
        }
    }
    callDrawItem(index){

    }
    callDrawCommand(){

    }
    // /**
    //  * @param {Number} index 
    //  */
    //  drawItem(index) {
    //     if(index< this.buttonItems()){
    //         this.callDrawButton(index);
    //         return;
    //     }
    //     this.drawCommand(index);
    // }

    playLayoutChangeSound(){
        SoundManager.playEquip();
    }
    playResetSound(){
        SoundManager.playEquip();
    }
    playApplySound(){
        SoundManager.playEquip();
    }
    playSymbolSetSound(){
        SoundManager.playOk();
    }
    /**
     * @returns {Number}
     */
    currentButtonCode(){
        throw (new Error("not imple"));
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
    /**
     * @returns {String}
     * @param {Number} index 
     */
    symbolString(index){
        throw new Error( "method not impriments!")
    }

    currentSymbolString(){
        return this.symbolString(this._index);
    }
    currentSymbolObject(){
        const symbol = this.currentSymbolString();
        return symbolManager.findSymbol(symbol)
    }
    /**
     * @param {Boolean} value 
     */
    redrawApplyCommand(value){

    }
    /**
     * @returns {InputDeviceBase}
     */
    inputDevice(){
        throw new Error("input device unknow!")
    }
    // buttonItems(){
    //     return 0;
    // }
    /**
     * @returns {TemporaryMappper}
     */
    temporaryMappper(){
        return null;
    }
    mapperSrc(){
        return {};
    }
    /**
     * @param {String} symbol 
     */
    hasSymbol(symbol){
        return this.temporaryMappper().hasSymbol(symbol);
    }
    canApplySetting(){
        return this.isValidMapper();
    }
    isValidMapper(){
        return this.temporaryMappper().isValidMapper();
    }
    resetMapper(){
        this.temporaryMappper().reset(this.defaultMapper());
    }
    resetMapper_V2(){

    }
    defaultMapper(){
        return this.inputDevice().defaultMapper();
    }
    cloneMapper(){
        return this.temporaryMappper().createNormalizedMapper();
    }
    updateHelp(){
        const obj = this.currentSymbolObject();
        if(obj){
            this._helpWindow.setText(obj.getHelpText());
        }else{
            this._helpWindow.clear();
        }
    }
}
//TODO:ゲームパッド用の一時しのぎ あとで調整して、基底クラスへ機能を移す
//Gamepadのクラス2種で使えるように共通化する
class Window_InputConfigBase_workaround extends Window_InputConfigBase{
    applyCommandIndex() {
        const index = this.commandList().indexOf(CommandManager.apply())
        return this.mainItems() + index;
    }
    /**
     * @desc シンボルを書き換えた場合の再描画で使う
     * @param {Boolean} value 
     */
    redrawApplyCommand(value) {
        const index =this.applyCommandIndex()
        this.clearItem(index);
        this.drawItemBackground(index);
        this.changePaintOpacity(value);
        const rect = this.itemRectWithPadding(index);
        this.drawText(CommandManager.getApplyText(), rect.x, rect.y, rect.width);
        this.changePaintOpacity(true);
    }
    
    isEnabledCommand(index){
        return index >= this.mainItems();
    }
    maxItems(){
        return this.mainItems()+ this.commandLength();
    }

    processOk() {
        const index = this.index();
        if (index < 0) { return; }
        if(this.isEnabledCommand(index)){
            this.processCommandOk();
            return;
        }

        if (this.isItemEnabled(index)) {
            this.updateInputData();
            this.deactivate();
            this.playSymbolSetSound();
            this.callOkHandler();
        }
    }

    drawAllItems(){
        const topIndex = this.topIndex();
        for (let i = 0; i < this.maxVisibleItems(); i++) {
            const index = topIndex + i;
            if (index < this.maxItems()) {
                this.drawItemBackground(index);
                if(index< this.mainItems()){
                    this.drawItem(index);
                }else{
                    this.drawCommand(index);
                }
            }
        }
    }
}


class Window_InputSymbolListBase extends Window_Selectable_InputConfigVer{
    /**
     * @param {Rectangle} rect 
     */
    initialize(rect) {
        this.makeItemList();
        super.initialize(rect);
        this.deactivate();
        this.deselect();
        this.refresh();
    }
    makeItemList(){
        this._list = symbolManager.getSymbolList();
    }
    maxItems(){
        return this._list.length;
    }
    /**
     * @param {Number} index 
     */
    symbolObject(index){
        return this._list[index];
    }
    currentSymbolObject(){
        return this.symbolObject(this.index());
    }
    /**
     * @param {String} symbol 
     */
    indexOfSymbol(symbol){
        const numItms = this.maxItems();
        for (let i = 0; i < numItms; i++) {
            const symbolObj = this.symbolObject(i);
            if(symbolObj && symbolObj.symbol()===symbol){
                return i;
            }
        }
        return -1;
    }
    /**
     * @param {String} symbol 
     */
    selectSymbol(symbol){
        const index = this.indexOfSymbol(symbol);
        if(index >=0){
            this.select(index);
        }else{
            this.select(0);
        }
    }
    /**
     * @param {Number} index 
     */
    drawItem(index){
        const item = this.symbolObject(index);
        if(item){
            const rect = this.itemRectWithPadding(index);
            this.drawSymbolObject(item,rect.x,rect.y,rect.width);
        }
    }
    isCurrentItemEnabled(){
        return this.isItemEnabled(this._index);
    }
    currentItemIsDeleter(){
        const item = this.symbolObject(this.index());
        if(item){
            return item.isDeleter();
            //有効化されていて、シンボルがnullなのはdeleteにしかない
            //return item.isEnabled() && (!item.symbol());
        }
        return false;
    }
    /**
     * @param {Number} index 
     */
    isItemEnabled(index){
        const symbol = this.symbolObject(index);
        if(symbol){
            return symbol.isEnabled();
        }
        return false;
    }
    updateHelp(){
        const symbol = this.currentSymbolObject()
        if(symbol){
            this._helpWindow.setText(symbol.getHelpText());
        }else{
            this._helpWindow.clear();
        }
    }
}
class Window_InputSymbolList extends Window_InputSymbolListBase{
    makeItemList(){
        super.makeItemList();
        //TODO:初期設定に戻す(ボタン単位)を追加 原理的には可能
        this._list.push(new SymbolDeleteObject());
    }
    maxCols(){
        return 4;
    }

}
class ButtonsMediator{
    /**
     * @param {Window_GamepadConfig_ALT} xxxWindow 
     */
    constructor(xxxWindow){
        this._window = xxxWindow;
    }
    /**
     * @param {I_SymbolDefine} symbolObject 
     */
    setSymbol(symbolObject){
        this._window.setSymbolObject(symbolObject);
    }
}
class Window_SymbolList_ALT extends Window_InputConfigBase_workaround{
    initializeMapper(){
        const device = this.inputDevice();
        this._mapper = new TemporaryMappperALT(device.currentMapper() );
    }
    temporaryMappper(){
        return this._mapper;
    }
    initialize(rect){
        this.initializeMapper();
        this.makeItemList();
        this.makeCommandList();
        super.initialize(rect);
    }
    commandList(){
        return this._commandList;
    }
    makeCommandList(){
        this._commandList =CommandManager.createCommandList_ForGamepad();
        if(this._list.length %2 !==0){
            this._commandList.unshift(null);
        }
    }
    makeItemList(){
        this._list = symbolManager.getSymbolList();
    }
    mainItems(){
        return this._list.length;
    }
    maxCols(){
        return 2;
    }
    symbolTextWidth(){
        return 200;
    }
    isCurrentItemEnabled(){
        return this.isItemEnabled(this.index());
    }
    /**
     * @param {Number} index 
     * @returns 
     */
    isItemEnabled(index){
        const item = this.symbolObject(index);
        if(item  ){
            return item.isEnabled();
        }
        return false;
    }

    /**
     * @param {String} symbolString 
     * @returns 
     */
    buttonFromSymbol(symbolString){
        const buttons = this.inputDevice().indexList();
        return this._mapper.buttonFromSymbol_XX(symbolString,buttons);
    }
    inputDevice(){
        return setting.gamepad;
    }
    buttonList(){
        return this.inputDevice().buttonList();
    }
    currentSymbolObject(){
        return this.symbolObject(this.index());
    }
    /**
     * @param {Number} index 
     * @returns 
     */
    symbolObject(index){
        return this._list[index];
    }
    /**
     * @param {Number} index 
     * @returns {String}
     */
    symbolString(index){
        const obj = this.symbolObject(index);
        if(obj){
            return obj.symbol();
        }
        return "";
    }

    /**
     * @param {ButtonsMediator} mediator 
     */
    setMediator(mediator){
        this._mediator = mediator;
        this.reselect();
    }
    updateHelp(){
        if(this._mediator){
            const symbol = this.currentSymbolObject();
            this._mediator.setSymbol(symbol);
        }
        super.updateHelp();
    }


    /**
     * @param {Number} index 
     */
    drawItem(index){
        const item = this.symbolObject(index);
        if(item){
            const rect = this.itemRectWithPadding(index);
            const symbolTextWidth = this.symbolTextWidth();
            this.drawSymbolObject(item,rect.x ,rect.y,symbolTextWidth);
            const button =this.buttonFromSymbol(item.symbol());
            //this.inputDevice().buttonFromSymbol(item.symbol());
            if(button){
                const buttonTextWidth = rect.width - symbolTextWidth;
                const buttonX = rect.x + symbolTextWidth;
                const buttonY = rect.y;
                this.drawButton_V3(button,buttonX,buttonY,buttonTextWidth);
            }
        }
    }
}

function createPadState(padId) {
    if (!navigator.getGamepads) {
        return null;
    }
    const gamepads =navigator.getGamepads();
    if(!gamepads){return null}
    return  gamepads[padId];
}


class Window_GamepadButtons extends Window_InputConfigBase_workaround{
    initialize(rect) {
        super.initialize( rect);
        this.select(0);
        this.refresh();
    }
    makeCommandList(){

    }
    gamepad(){
        return setting.gamepad;
    }
    initializeMapper(){
        const device = this.inputDevice();
        this._mapper233 =device.createTemporaryMapper();  //new TemporaryMappper(Input.gamepadMapper);
    }
    temporaryMappper(){
        return this._mapper233;
    }
    mainItems(){
        return this.numButton();
    }

    numButton(){
        return this.gamepad().numButtons()
    }
    isItemEnabled(index){
        return index < this.numButton();
    }
    currentButtonCode(){
        const button= this.padButton(this.index());
        if(button){
            return button.buttonId();
        }
        return -1;
    }

    callDefaultHandler() {
        this.callHandler('default');
    }
    processPadInfo(){
        if(!this._helpWindow){return;}
        if(this._helpWindow.visble){
            this._helpWindow.hide();
            this._helpWindow.clear();
        }else{
            this._helpWindow.setText(this._padInfoText);
        }
        this.activate();
    }

    maxCols() {
        return setting.cols;
    }

    /**
     * @param {number} index
     * @return {string} buttonNumber
     */
    buttonNumber(index) {
        const button= this.gamepad().buttonAt(index);
        return button.buttonId();
    }
    currentButtonCode(){
        return this.buttonNumber(this._index);
    }
    /**
     * @param {number} index
     * @return {string} buttonName
     */
    buttonName(index) {
        return this.gamepad().buttonName(index);
    }
    /**
     * @param {number} index
     * @return {string} symbol
     */
    symbolString(index) {
        const buttonNumber = this.buttonNumber(index);
        return this.temporaryMappper().findSymbolByCode(buttonNumber);
    }
    /**
     * @param {number} index
     * @return {string} symbol
     */
    symbolText(index) {
        const s =this.symbolString(index)
        return symbolManager.actionName(s);
    }


    /**
     *  @param {Number} index 
     */
    padButton(index){
        return this.gamepad().buttonAt(index);
    }

    butttonNameWidth(){
        return 45;
    }

    /**
     * @param {GamepadButton} button 
     * @param {string} symbol
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} width 
     */
    drawButton_V2(button,symbol,x,y,width){
        const numberWidth  = this.numberWidth();
        this.drawText(button.buttonId()+":",x,y,numberWidth);
        const nameWidth= this.butttonNameWidth();
        const nameX = x + numberWidth;
        this.drawText(button.name(),nameX,y,nameWidth);

        const symbolWidth =width - numberWidth -nameWidth;
        const symbolX = nameX + nameWidth;
        this.drawText(symbol,symbolX,y,symbolWidth);    
    }
    /**
     * @param {Number} index 
     */
    callDrawButton(index){
        const rect = this.itemRectWithPadding(index);
        this.drawButton_V2(this.padButton(index),this.symbolText(index),rect.x,rect.y,rect.width);
    }

    /**
     * @param {Number} index 
     */
     drawItem(index) {
        this.callDrawButton(index);
    }
    makePadInfoText(){
        const pad = createPadState(0);
        if(pad){
            //TODO:ボタン数が少ないと、一部のキーを読めない可能性
            //左右が10・11にあるパターンとか
            const text= `${pad.id.replace("(","\n(")}
            buttons:${pad.buttons.length} mapping:${pad.mapping}`;
            this._helpWindow.setText(text);
            return;
        }
        this._helpWindow.setText(setting.text.gamepadIsNotConnected.currentName());
    }

    updateHelp(){
        if(this._index < this.numButton()){
            this.makePadInfoText();
            return;
        }
        this._helpWindow.clear();
    }

    exitCommandIndex() {
        const index = this.commandList().lastIndexOf(CommandManager.exit());
        return index +this.numButton();
//        return this._exitCommandIndex;
    }
    applyCommandIndex() {
        const index = this.commandList().indexOf(CommandManager.apply())
        return this.numButton() + index;
    }
}
//TODO:マッパー関連をこっちへ移動
class Window_GamepadConfig_MA extends Window_GamepadButtons{
    initialize(rect){
        this.makeCommandList();
        super.initialize(rect);
    }
    inputDevice(){
        return setting.gamepad;
    }

    makeCommandList() {
        this._command = CommandManager.createCommandList_ForGamepad();
    }
    commandList(){
        return this._command;
    }
}

class Scene_InputConfigBase_MA extends Scene_MenuBaseMVMZ{
    constructor(){
        super();
        //popSceneModeとapplyOnExitは別
        //前者はシーン切り替え検知で、後者は一度設定が変更されたことの検知
        //混ぜてはいけない
        this._popSceneMode=false;
    }
    isALTmode(){
        return false;
    }
    /**
     * @param {String} value 
     */
    setAltMode(value){
        ConfigManager.setInputConfigStyle(value);
    }
    start(){
        const mode = this.isALTmode() ? "ALT":"normal";
        this.setAltMode(mode);
        super.start();
    }
    /**
     * @param {String} text 
     */
    setHelpText(text){
        this._helpWindow.setText(text)
    }
    /**
     * @returns {Bitmap}
     */
    backBitmap(){
        return null;
    }
    createBackground(){
        const bitmap = this.backBitmap();
        if(!bitmap){
            super.createBackground();
            return;
        }
        const sprite = new Sprite(bitmap);
        this._backgroundSprite = sprite;
        this.addChild(sprite);
    }
    defaultMapper(){
        return this.mainWidnow().defaultMapper();
    }

    symbolListWidth(){
        return Graphics.boxWidth;
    }

    /**
     * @param {Number} numLines
     * @param {Boolean} selectable
     */
    calcWindowHeight(numLines,selectable){
        if(selectable){
            return Window_Selectable.prototype.fittingHeight(( numLines))
        }
        return Window_Base.prototype.fittingHeight(numLines);
    }
    helpWindowInitParam(){
        if(Utils.RPGMAKER_NAME ==="MV"){
            return this.helpWindowLines();;
        }
        return this.helpWindowRect();
    }
    createHelpWindow(){
        this._helpWindow = new Window_Help(this.helpWindowInitParam());
        this.addWindow(this._helpWindow);
    }
    mainWindowHeight(){
        return this.subWindowTop() - this.mainAreaTop();
    }

    mainWindowRect(){
        const x = 0;
        const y= this.mainAreaTop();
        const width = Graphics.boxWidth;
        const height =this.mainWindowHeight();
        return new Rectangle(x,y,width,height);
    }
    subWindowTop(){
        return Graphics.boxHeight -this.subWindowHeight();
    }
    subWindowHeight(){
        return this.calcWindowHeight(3,true);
    }

    subWindowRect() {
        const width = Graphics.boxWidth;
        const height = this.subWindowHeight();
        const x =0;
        const y = this.subWindowTop();
        return new Rectangle(x,y,width,height);
    }

    createSymbolListWindow() {
        const rect = this.subWindowRect();
        const asw = new Window_InputSymbolList(rect);
        asw.setHandler('ok', this.onSymbolListOk.bind(this));
        asw.setHandler('cancel', this.onSymbolListCancel.bind(this));
        asw.hide();
//        asw.refresh();
        asw.setHelpWindow(this._helpWindow);
        this.addWindow(asw);
        this._symbolListWindow = asw;
    }
    popScene(){
        this._popSceneMode=true;
    }

    resetMapper(){
        const mainWindow = this.mainWidnow();
        mainWindow.resetMapper();
        mainWindow.playResetSound();
        mainWindow.refresh();
        mainWindow.redrawApplyCommand(mainWindow.isValidMapper());
        mainWindow.activate();
    }

    applyConfig(){
        const mainWindow = this.mainWidnow();
        if(mainWindow.isValidMapper()){
            mainWindow.playApplySound();
            this._applyOnExit = true;
            this.popScene();
        }else{
            mainWindow.playBuzzerSound();
            mainWindow.activate();
        }
    }
    isAllButtonDetouch(){
        return Input._latestButton===null;
    }

    isAnyButtonLongPressed(){
        return Input._pressedTime >60;
    }

    updateSceneChange(){
        if(this._popSceneMode ){
            if(this.isAnyButtonLongPressed()){
                if(this._helpWindow){
                    this._helpWindow.setText(setting.text.needButtonDetouch.currentName());
                }
            }
            if(this.isAllButtonDetouch()){
                super.popScene();
                return;
            }
        }
    }
    update(){
        this.updateSceneChange();
        super.update();
    }

    onConfigOk(){
        this.selectSymbol();
    }
    onConfigCancel() {
        SoundManager.playCancel();
        SceneManager.pop();
    }
    selectSymbol() {
        const currentSymbol = this.mainWidnow().currentSymbolString();
        this._symbolListWindow.show();
        this._symbolListWindow.activate();
        this._symbolListWindow.selectSymbol(currentSymbol);
    }
    /**
     * @return {Window_InputConfigBase}
     */
    mainWidnow() {
        return null;
    }

    /**
     * @returns {Window_Selectable}
     */
    subWindow(){
        return null;
    }

    currentSymbolObject(){
        return this._symbolListWindow.currentSymbolObject();
    }
    currentButtonCode(){
        throw (new Error("not imple"));
        return -1;
    }

    /**
     * @param {String} symbol 
     * @param {Number} code 
     */
    changeSymbolV9(symbol,code){

    }

    callChangeSymbol_v5(){


        const symbol =this.currentSymbolObject();
        if(!symbol){ return;}
        const code  = this.currentButtonCode();        
        if(isNaN(code)){return;}

        const mapper = this.mapperClass();
        //明示的な削除処理をあらかじめ用意する
        //実装を変える時にミスしがちなので、こうする
        if(symbol.isDeleter()){
            mapper.daleteByCode(code);
            this.redrawXXX();
            return;
        }

        const symbolString = symbol.symbol();
        if(mapper.canSymbolChange(symbolString,code)){
            mapper.change(code,symbolString);
            this.redrawXXX();
        }
    }
    redrawXXX(){
        const mainWindow = this.mainWidnow();
        mainWindow.redrawCurrentItem();
        mainWindow.redrawApplyCommand( mainWindow.canApplySetting() );
    }

    onSymbolListOk() {
        this.callChangeSymbol_v5();
        this.endSubWindowSelect();
    }
    onSymbolListCancel() {
        this.endSubWindowSelect();
    }
    endSubWindowSelect() {
        const sub = this.subWindow();
        sub.deselect();
        sub.hide();
        // this._symbolListWindow.deselect();
        // this._symbolListWindow.hide();
        this.mainWidnow().activate();
    }
    mapperClass(){
        return this.mainWidnow().temporaryMappper();
    }

    terminate(){
        super.terminate();
        if(this._applyOnExit){
            this.saveMapper();
            ConfigManager.save();
        }
    }
    saveMapper(){
        //override
    }
}

class Scene_GamepadConfigMA extends Scene_InputConfigBase_MA{
    create() {
        super.create();
        this.createAllWindows();
    }
    backBitmap(){
        if(setting.gamepadBackground){
            return ImageManager.loadBattleback1(setting.gamepadBackground);
        }
        return null;
    }
    gamepadWindowRect(){
        return this.mainWindowRect();
    }
    createGamepadConfigWindow() {
        const rect = this.gamepadWindowRect();
        const gcw = new Window_GamepadConfig_MA(rect);
        gcw.setHandler('ok', this.onConfigOk.bind(this));
        gcw.setHandler('cancel', this.onConfigCancel.bind(this));
        gcw.setHandler(CommandManager.exit().handle, this.onConfigCancel.bind(this));
        gcw.setHandler(CommandManager.apply().handle, this.applyConfig.bind(this));
        gcw.setHandler(CommandManager.reset().handle, this.resetMapper.bind(this));
        gcw.setHandler(CommandManager.alt().handle,this.gotoALT.bind(this));
        gcw.setHelpWindow(this._helpWindow);
        this._gamepadWindow = gcw;
        this.addWindow(gcw);
    }

    currentButtonCode(){
        return this._gamepadWindow.currentButtonCode();
    }

    mainWidnow() {
        return this._gamepadWindow;
    }
    subWindow(){
        return this._symbolListWindow;
    }
    saveMapper(){
        Input.gamepadMapper = this._gamepadWindow.cloneMapper();
    }
    createAllWindows() {
        this.createHelpWindow();
        this.createGamepadConfigWindow();
        this.createSymbolListWindow();
        this._gamepadWindow.activate();
    }
    gotoALT(){
        this.mainWidnow().playLayoutChangeSound();
        SceneManager.goto(Scene_GamepadConfig_ALT);
    }
}
class Mediator_Mapper{
    /**
     * @param {Window_SymbolList_ALT} symoblWindow 
     */
    constructor(symoblWindow){
        this._window =symoblWindow;
    }
    currentSymbolString(){
        return this._window.currentSymbolString();
    }
    mapper(){
        return this._window.temporaryMappper();
    }
    /**
     * @param {Number} code 
     */
    isButtonUsed(code){
        const symbol = this._window.currentSymbolString();
        return this._window.temporaryMappper().canSymbolChange(symbol,code);
    }
}
class Window_GamepadConfig_ALT extends Window_Selectable_InputConfigVer{

    /**
     * @param {Rectangle} rect 
     */
    constructor(rect){
        super(rect);
        this.setSymbolObject(null);
//        this.setMediator(null);
        this.setMapper(null);
    }
    refresh(){
        if(this._mapper && this._symbol){
            super.refresh();
        }
    }
    /**
     * @param {TemporaryMappperALT} mapper 
     */
    setMapper(mapper){
        this._mapper =mapper;
        this.refresh();
    }

    /**
     * @param {I_SymbolDefine} symbol 
     */
    setSymbolObject(symbol){
        this._symbol =symbol;
        this.refresh();
    }
    /**
     * @param {Mediator_Mapper} mediator 
     */
    setMediator(mediator){
        this._mediator = mediator;
        if(mediator){
            this.refresh();
        }
    }
    maxCols(){
        return 4;
    }
    maxItems(){
        return setting.gamepad.maxItems();
    }
    currentItem(){
        return this.itemAt(this.index());
    }
    /**
     * @param {Number} index 
     * @returns 
     */
    itemAt(index){
        return this.inputDevice().buttonAt(index);
    }
    currentButton(){
        return this.itemAt(this.index());
    }

    currentButtonCode(){
        return this.currentButton().buttonId();
    }
    inputDevice(){
        return setting.gamepad;
    }

    /**
     * @param {Number} buttonId 
     * @returns 
     */
    isButtonEnabled(buttonId){
        const symbolString =this._symbol.symbol();
        return this._mapper.areSymbolAndCode(symbolString,buttonId);
    }
    /**
     * @param {I_SymbolDefine} symbolObject 
     */
    helpText(symbolObject){
        if(!symbolObject){
            return "";
        }
        if(symbolObject ===this._symbol){
            return "";
        }

        const baseText = setting.buttonUsedForALT.currentName();
        return baseText.format( symbolObject.name() );
    }
    updateHelp(){
        const code = this.currentButtonCode();
        const obj = this._mapper.findObjectByCode(code);
        const text = this.helpText(obj);
        this._helpWindow.setText(text);
    }

    drawItem(index){
        const button = this.itemAt(index);
        if(button){
            this.changePaintOpacity( this.isButtonEnabled(button.buttonId()));
            const rect = this.itemRectWithPadding(index);
            this.drawButton_V3(button,rect.x,rect.y,rect.width);
        }
    }
}

//アクション→ボタンの順で設定するタイプ
//TODO:開発中断・気が向いたら続きを作る
class Scene_GamepadConfig_ALT extends Scene_InputConfigBase_MA{

    create(){
        super.create();
        this.createAllWindows();
    }
    backBitmap(){
        if(setting.gamepadBackground){
            return ImageManager.loadBattleback1(setting.gamepadBackground);
        }
        return null;
    }
    isALTmode(){
        return true;
    }
    terminate(){
        //相互参照している部分があるので、終了時に参照を切る
        this._gamepadWindow.setMediator(null);
        super.terminate();
    }
    createAllWindows(){
        this.createHelpWindow();
        this.createGamepadWindow();
        this.createSymbolListWindow();
        this.setupMeditator();
    }
    setupMeditator(){
        const symbolList = this.mainWidnow();
        const mediator =new ButtonsMediator(this._gamepadWindow)
        this._gamepadWindow.setMapper(  symbolList.temporaryMappper());
        symbolList.setMediator(mediator);
    }
    createGamepadWindow(){
        const rect = this.subWindowRect();
        const gcw = new Window_GamepadConfig_ALT(rect);
        gcw.setHelpWindow(this._helpWindow);
        gcw.setHandler("cancel",this.onGamepadCancel.bind(this));
        gcw.setHandler("ok",this.onGamepadOk.bind(this));

        gcw.hide();
        this._gamepadWindow =gcw;
        this.addWindow(gcw);
    }
    onGamepadOk(){
        this.callChangeSymbol_v5();
        this._gamepadWindow.redrawCurrentItem();
        this._gamepadWindow.activate();
//        this.endSubWindowSelect();
    }
    onGamepadCancel(){
        this.endSubWindowSelect();
    }

    currentButtonCode(){
        return this._gamepadWindow.currentButtonCode();
    }
    subWindow(){
        return this._gamepadWindow;
    }
    controllerWindow(){
        return this._gamepadWindow;
    }
    createSymbolListWindow(){
        const rect = this.mainWindowRect();
        const slw = new Window_SymbolList_ALT(rect);
        slw.setHelpWindow(this._helpWindow);
        slw.setHandler("ok",this.onSymbolListOk.bind(this));
        slw.setHandler("cancel",this.onSymbolListCancel.bind(this));
        slw.setHandler(CommandManager.reset().handle,this.resetMapper.bind(this));
        slw.setHandler(CommandManager.exit().handle,this.onConfigCancel.bind(this));
        slw.setHandler(CommandManager.alt().handle,this.gotoNormalMode.bind(this));
        slw.setHandler(CommandManager.apply().handle,this.applyConfig.bind(this));
        slw.activate();
        slw.select(0);
        slw.refresh()
        this.addWindow(slw);
        this._symbolListWindow =slw;
    }
    /**
     * @returns {Window_SymbolList_ALT}
     */
    mainWidnow(){
        return this._symbolListWindow;
    }
    /**
     * @param {String} symbol 
     * @returns {String}
     */
    findCode(symbol){
        return ""
    }
    onSymbolListCancel(){
        this.popScene();
    }


    
    onSymbolListOk(){
        //シンボルを取得
        const symbol = this._symbolListWindow.currentSymbolObject();

        //シンボルを基に、ボタンを探す
        //const code = this.findCode(symbol.symbol());
        const cw = this.subWindow();
        cw.select(0);
        cw.activate();
        cw.show();
    }

    onControllerCancel(){
        this.endSubWindowSelect();
    }
    endSubWindowSelect(){
        super.endSubWindowSelect();
        const mainWidnow = this.mainWidnow();
        mainWidnow.refresh();
        mainWidnow.redrawApplyCommand(  mainWidnow.canApplySetting());
    }
    gotoNormalMode(){
        this.mainWidnow().playLayoutChangeSound();
        SceneManager.goto(Mano_InputConfig.Scene_GamepadConfig);
    }
}

class Key_Base extends InputButtonBase{
    /**
     * @returns {String}
     */
    get handle(){
        return "ok";
    }
    get locked(){
        return false;
    }
    get char(){
        return "";
    }
    get isLink(){
        return false;
    }
    get keycord(){
        return 0;
    }
    name(){
        return this.char;
    }
    mapperId(){
        return this.keycord;
    }
    /**
     * @param {Window_KeyConfig_MA} keyWindow 
     * @param {Number} index 
     */
    draw(keyWindow,index){
        this.drawBasicChar(keyWindow,index);
    }
    /**
     * @param {Window_KeyConfig_MA} keyWindow 
     * @param {Number} index 
     */
    redraw(keyWindow,index){
        this.drawBasicChar(keyWindow,index);
    }
    /**
     * @param {Number} index 
     * @desc 一部の複数マスにまたがるキーのための機能 基本実装しないでいい
     */
    setIndex(index){

    }
    /**
     * @param {Window_KeyConfig_MA} keyWindow 
     * @param {Number} index 
     */
    drawBasicChar(keyWindow,index){
        const s = keyWindow.symbolObjectFromKeyNumber(this.keycord);
        const rect = keyWindow.itemRect(index);
        keyWindow.drawInputDefine(this,s,rect);
    }
    /**
     * @param {Window_KeyConfig_MA} keyWindow 
     * @param {Number} index 
     */
    rect(keyWindow,index){
        return keyWindow.baseRect(index);
    }
}
class Key_Null extends Key_Base{
    get locked(){
        return true;
    }
    /**
     * @param {Window_KeyConfig_MA} keyWindow 
     * @param {Number} index 
     */
    draw(keyWindow,index){}
}

class Key_Char extends Key_Base{
    /**
     * @param {String} char 
     * @param {Number} keycord 
     */
    constructor(char,keycord){
        super();
        this._char = char;
        this._keycord = keycord;
    }
    get char(){
        return this._char;
    }
    get keycord(){
        return this._keycord;
    }
}

class Key_Locked extends Key_Char{
    get locked(){
        return true;
    }
}

class Key_Big extends Key_Char{
    /**
     * @param {String} char 
     * @param {Number} keycord 
     * @param {Number} width 
     * @param {Number} height 
     * @param {boolean} looked
     */
    constructor(char,keycord,width,height,looked){
        super(char,keycord);
        this._widthEx=Math.max(width,1);
        this._heightEx=Math.max(height,1);
        this._locked = looked||false; 
    }
    get locked(){
        return this._locked;
    }
    /**
     * @param {Window_KeyConfig_MA} keyWindow 
     */
    rect(keyWindow){
        const rect = keyWindow.baseRect(this._index);
        rect.width *=this._widthEx;
        rect.height *= this._heightEx;
        return rect;
    }
    /**
     * @param {Number} index 
     */
    setIndex(index){
        if(isNaN( this._index)){
            this._index = index;

        }
    }
    /**
     * @param {Window_KeyConfig_MA} keyWindow 
     * @param {Number} index 
     */
    draw(keyWindow,index){
        if(index ===this._index){
            super.draw(keyWindow,index);
        }
    }
    /**
     * @param {Window_KeyConfig_MA} keyWindow 
     * @param {Number} index 
     */
    redraw(keyWindow,index){
        super.draw(keyWindow,this._index);
    }
}

class Key_Command extends Key_Base{
    /**
     * @param {String} handlerName 
     * @param {MultiLanguageText} mtext 
     * @param {Number} width 
     */
    constructor(handlerName,mtext,width){
        super();
        this._callBackHandle =handlerName;
        this._widthEx =width;
        this._mtext = mtext;
    }
    static create(objText,handler){
        const obj = JSON.parse(objText);
        return new Key_Command(
            handler,
            MultiLanguageText.create(obj.text),
            Number(obj.width)
        );
    }
    get char(){
        return this._mtext.currentName();
    }
    text(){
        return this.char;
    }


    get isLink(){
        return this._widthEx >1;
    }
    get locked(){
        return false;
    }
    get keycord(){
        return 0;
    }
    get isCommand(){
        return true;
    }
    get handle(){
        return this._callBackHandle;
    }
    /**
     * @param {Window_KeyConfig_MA} keyConfigWindow 
     */
    onOk(keyConfigWindow){
        keyConfigWindow.callHandler(this._callBackHandle);
    }
    /**
     * @param {Number} index 
     */
    setIndex(index){
        if(isNaN(this._index)){
            this._index = index;
        }
    }

    /**
     * @param {Window_KeyConfig_MA} keyWindow 
     * @param {Number} index
     */
    rect(keyWindow,index){
        const rect = keyWindow.baseRect(this._index);
        rect.width *=this._widthEx;
        return rect;
    }
    /**
     * @param {Window_KeyConfig_MA} keyWindow 
     */
    draw(keyWindow,index){
      if(index ===this._index){
        const rect = this.rect(keyWindow,index);
        keyWindow.drawCommand(this.char,rect);
      }
    }
    helpText(){
        return "コマンドのヘルプ";
    }
}
//TODO:ゲームパッドのボタン配置切り換え…というか、ハードメーカー別の対応
function createButtonLayoutChangeCommand(){
    const mText = new MultiLanguageText("xxxx","ボタン配置変更");
    const command = new Key_Command("ButtonLayout",mText,3);
    return command;
}

class Key_CommandManager_T{
    constructor(){
        const params = getParam();
        this._apply =Key_Command.create(params.apply,"apply");
        this._wasd=Key_Command.create(params.WASD,"WASD");
        this._exit=Key_Command.create(params.exit,"exit");
        this._reset=Key_Command.create(params.reset,"reset");
        this._alt = Key_Command.create(params.style,"ALT");
        this._changeButtonLayout =createButtonLayoutChangeCommand();
        this._changeLayout=Key_Command.create(params.changeLayout,"keylayout");

    }
    keylayout(){
        return this._changeLayout;
    }
    getKeylayoutText(){
        return this._changeLayout.text();
    }
    wasd(){
        return this._wasd;
    }
    getWasdText(){
        return this._wasd.text();
    }
    reset(){
        return this._reset;
    }
    getResetText(){
        return this._reset.text();
    }
    apply(){
        return this._apply
    }
    getApplyText(){
        return this._apply.text();
    }
    alt(){
        return this._alt;
    }
    exit(){
        return this._exit;
    }
    getExitText(){
        return this._exit.text();
    }
    createCommandList_ForKeyLayout(){
        const commandList =[
            this._reset,
            this._apply,
            this._wasd,
            this._changeLayout,
            this._exit
        ];
        const result =[];
        for (const iterator of commandList) {
            for(var i=0; i <iterator._widthEx;++i){
                result.push(iterator);
            }
        }
        return result;
    }
    createCommandList_ForGamepad(){
        const exit =this.exit();
        const reset =this.reset()
        const alt = this.alt();
        const apply = this.apply();
        return [
            apply,
            reset,
            alt,
            exit
        ];

    }
}
const CommandManager =(function(){

    return new Key_CommandManager_T();
})()
/**
 * @param {string} char 
 * @param {number} keycord 
 */
function keyinfo(char,keycord){
    return new Key_Char(char,keycord);
}


const WASD_KEYMAP={
    81:"pageup",    //Q
    69:"pagedown",  //E
    87:"up",        //W
    65:"left",      //A
    83:"down",      //S
    68:"right",     //D
};

const KEYS ={
    SPACE: new Key_Big("Space",32,4,1,false),
    ENTER_JIS: new Key_Big('Enter',13,2,2,true),
    ENTER_US:new Key_Big("Entre",13,3,1,true),
    NULL:new Key_Null(),
    UP:new Key_Locked(setting.keyText.up,38),
    DOWN:new Key_Locked(setting.keyText.down,40),
    LEFT:new Key_Locked(setting.keyText.left,37),
    RIGHT:new Key_Locked(setting.keyText.right,39),
    TENKEY0:new Key_Big('0',96,2,1,false),
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
    TAB:keyinfo("TAB",9),
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

    SHIFT:new Key_Locked('Shift',16),
    CTRL:new Key_Locked('CTRL',17),
    INSERT:keyinfo('Ins',45),
    BACK:keyinfo('Back',8),
    HOME:keyinfo('Home',36),
    END:keyinfo('End',35),
    PAGEUP:keyinfo('PgUp',33),
    PAGEDOWN:keyinfo('PgDn',34),
    ESC:keyinfo('esc',27),

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
const keyXXXX =[
    KEYS.A,KEYS.B,KEYS.C,KEYS.D,
    KEYS.E,KEYS.F,KEYS.G,
    KEYS.H,KEYS.I,KEYS.J,KEYS.K,
    KEYS.L,KEYS.M,KEYS.N,
    KEYS.O,KEYS.P,KEYS.Q,KEYS.R,
    KEYS.S,KEYS.T,KEYS.U,
    KEYS.V,KEYS.W, KEYS.X,KEYS.Y,KEYS.Z,
    KEYS._0,KEYS._1,KEYS._2,KEYS._3,KEYS._4,
    KEYS._5,KEYS._6,KEYS._7,KEYS._8,KEYS._9
];
class Key_Layout extends InputDeviceBase{
    /**
     * @param {Key_Base[]} keyList 
     */
    static keylayout_SetupIndex(keyList){
        for (let index = 0; index < keyList.length; index++) {
            const element = keyList[index];
            element.setIndex(index);
        }
    }

    indexList(){
        return keyXXXX;
    }
    button(buttonCode){
        return null;
    }
    /**
     * @param {String} layoutName
     * @param {Key_Base[]} srcList 
     */
    constructor(layoutName,srcList){
        super();
        this._name = layoutName;
        this._buttonItems = srcList.length;
        const list = srcList.concat(CommandManager.createCommandList_ForKeyLayout());
        Key_Layout.keylayout_SetupIndex(list);
        this._list =Object.freeze( list);
        this._enterKeyIndex = this._list.indexOf(KEYS.ENTER_JIS);
    }

    numButtons(){
        return this._buttonItems;
    }
    buttonList(){
        return this._list;
    }
    /**
     * @param {Key_Big} enter 
     */
    setEnterKey(enter){
        this._enter=enter;
    }
    defaultMapper(){
        return Mano_InputConfig.defaultKeyMapper;
    }
    currentMapper(){
        return Input.keyMapper;
    }
}

const KEY_LAYOUT_JIS=(function(){ 
    const list =[
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
    
        KEYS.TAB,
    
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
        KEYS.ENTER_JIS,
        KEYS.ENTER_JIS,
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
        KEYS.ENTER_JIS,
        KEYS.ENTER_JIS,
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
    const layout= new Key_Layout("JIS",list);
    layout.setEnterKey(KEYS.ENTER_JIS);
    return Object.freeze( layout);
})();
const KEY_LAYOUT_US =(function(){
    const list =[    KEYS.ESC,
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
    
        KEYS.TAB,
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
        KEYS.APOSTROPHE, 
        KEYS.ENTER_US,
        KEYS.ENTER_US,
        KEYS.ENTER_US,
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
    const layout =new Key_Layout("US",list);
    layout.setEnterKey(KEYS.ENTER_US);
    return Object.freeze( layout);
})();

/**
 * @returns {Readonly<InputDeviceBase>}
 */
function getCurrentDevice(){
    if(setting.gamepad.isConected()){
        return setting.gamepad;
    }
    return KEY_LAYOUT_JIS;
}
//TODO:カーソル移動に異常があるので修正する
class Window_KeyConfig_MA extends Window_InputConfigBase {

    initializeMapper(){
        const device = this.inputDevice();
        this._mapper217 = device.createTemporaryMapper();
         //new TemporaryMappper(device.currentMapper());
    }
    temporaryMappper(){
        return this._mapper217;
    }
    /**
     * @param {Rectangle} rect 
     */
    initialize(rect) {
        this.setKeyLayout(ConfigManager.keyLayout_MA);
        super.initialize(rect);
        this.refresh();
        this.activate();
        this.select(0);
    }

    lineHeight(){
        return setting.keyWindowLineHeight;
    }

    mainFontFace(){
        if(Utils.RPGMAKER_NAME ==="MV"){
            return this.standardFontFace();
        }
        return $gameSystem.mainFontFace();
    }
    resetFontSettings(){
        this.contents.fontFace = this.mainFontFace();
        this.contents.fontSize = this.lineHeight()-2;//$gameSystem.mainFontSize();
        this.resetTextColor();
    }
    setWASD_Move(){
        for (const key in WASD_KEYMAP) {
            if (WASD_KEYMAP.hasOwnProperty(key)) {
                const element = WASD_KEYMAP[key];
                this._mapper217.change(key,element);
            }
        }
        this.refresh();
    }
    /**
     * @param {String} layoutText 
     */
    setKeyLayout(layoutText){
        this._layout = layoutText ==="JIS"? KEY_LAYOUT_JIS : KEY_LAYOUT_US;
    }
    inputDevice(){
        return this._layout;
    }
    getKeyLayout() {
        return this._layout._name;
    }
    itemTextAlign() {
        return 'center';
    }
    exitCommandIndex(){
        return CommandManager.exit()._index;
    }
    processChangeLayout() {
        this.playLayoutChangeSound();
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
        const item = this.item(index);
        if(!item){
            this.playBuzzerSound();
            return;
        }
        if(item.locked){
            this.playBuzzerSound();
            return;
        }
        if(item.handle==="ok"){
            this.playSymbolSetSound()
            this.updateInputData();
            this.deactivate();
            this.callOkHandler();
            return
        }
        this.callHandler(item.handle);
    }
    itemHeight() {
        return this.lineHeight() * 2;
    }
    maxPageRows() {
        return 100;
    }
    maxCols() {
        return 19;
    }
    numVisibleRows() {
        return this._layout._list.length;
    }
    /**
     * @param {Number} index 
     */
    baseRect(index){
        return super.itemRect(index);
    }
    /**
     * @param {Number} index 
     */
    itemRect(index){
        const item = this.item(index);
        if(!item){
            return new Rectangle(Number.MIN_SAFE_INTEGER,Number.MIN_SAFE_INTEGER,0,0);
        }
        return item.rect(this,index);
    }
    maxItems() {
        return this._layout.buttonList().length;
    }
    spacing() {
        return 0;
    }
    /**
     * @param {number}index
     */
    keyNumber(index) {
        return this.item(index).keycord;
    }
    currentButtonCode() {
        return this.keyNumber(this.index());
    }
    keyName(index) {
        return this.item(index).char;
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
        const current = this.index();
        let next = this.nextIndex(current, moveDir);
        const last = Math.abs(this.maxItems() / moveDir);
        for (var i = 0; i < last; ++i) {
            const itemA = this.item(current);
            const itemB = this.item(next);
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
    /**
     * @param {I_SymbolDefine} inputDef 
     * @param {Rectangle} rect 
     */
    drawKeyback(inputDef,rect){
        if(!inputDef){
            this.drawSymbolBack(rect,SymbolColorManager.emptyColor());
            return;
        }
        if(inputDef.isParamatorValid()){
            this.drawSymbolBack(rect,inputDef.backColor());
        }else{
            this.drawSymbolBack(rect,SymbolColorManager.paramatorInvalidColor());
        }
    }
    /**
     * @param {Key_Base} key
     * @param {I_SymbolDefine} inputDef 
     * @param {Rectangle} rect 
     */
    drawInputDefine(key,inputDef,rect){
        this.drawKeyback(inputDef,rect);
        this.drawText(key.char,rect.x,rect.y,rect.width,"center");
        if(inputDef && !inputDef.isEmpty()){
            const symbolY = rect.y + this.lineHeight()-6;
            this.drawText(inputDef.displayKeyName(),rect.x,symbolY,rect.width,"center");
        }
    }

    /**
     * @param {Number} index 
     * @returns 
     */
    symbolString(index){
        const keyNumber = this.keyNumber(index);
        return this.temporaryMappper().findSymbolByCode(keyNumber);
    }
    /**
     * @param {Number} index 
     */
    symbolObject(index) {
        const keyNumber = this.keyNumber(index);
        return this.symbolObjectFromKeyNumber(keyNumber);
    }

    symbolObjectFromKeyNumber(keyNumber){
        const symbol = this.temporaryMappper().findSymbolByCode(keyNumber)
        return symbolManager.findSymbol(symbol);
    }

    /**
     * @param {Number} index 
     * @desc 画面に表示するシンボル文字列の取得
     */
    symbolText(index) {
        const symbol = this.symbolString(index);
        return symbol;
    }
    /**
     * @param {Number} index 
     */
    item(index){
        return this._layout.buttonList()[index];
    }
    /**
     * @param {Number} index 
     */
    drawItem(index){
        const item = this.item(index);
        if(item){
            item.draw(this,index);
        }
    }
    redrawItem(index){
        const item = this.item(index);
        if(item){
            this.clearItem(index);
            item.redraw(this,index);
        }
    }

    commandBackColor() {
        return getColorSrc(this).gaugeBackColor();
    }
    commandColor() {
        return getColorSrc(this).normalColor();
    }
    /**
     * @param {String} commandName 
     * @param {Rectangle} rect 
     */
    drawCommand(commandName, rect) {
        this.drawSymbolBack(rect, this.commandBackColor());
        this.changeTextColor(this.commandColor());
        this.drawText(commandName, rect.x, rect.y, rect.width, 'center');
    }
}

class Scene_KeyConfig_MA extends Scene_InputConfigBase_MA{
    helpWindowLines(){
        return 2;
    }
    backBitmap(){
        if(setting.keyBackground){
            return ImageManager.loadBattleback1(setting.keyBackground);
        }
        return null;
    }

    create() {
        super.create();
        this.createHelpWindow();
        this.createKeyboradConfigWindow();
        this.createSymbolListWindow();
    }
    onKeyLayoutOk(){
        this._keyconfigWindow.processChangeLayout();
    }
    configKey(){
        return MA_KEYBOARD_CONFIG;
    }
    saveMapper(){
        Input.keyMapper = this._keyconfigWindow.cloneMapper();
    }
    setWASD_Move(){
        this._keyconfigWindow.setWASD_Move();
        this._keyconfigWindow.playApplySound();
    }
    keyconfigWindowRect(){
        return this.mainWindowRect();
    }
    calcKeyWindowHeight(){
        const lineHeight =0;
        return 12*24;
    }
    createKeyboradConfigWindow() {
        const rect = this.keyconfigWindowRect();
        const kcw = new Window_KeyConfig_MA(rect);
        kcw.setHandler('cancel', this.onConfigCancel.bind(this));
        kcw.setHandler('ok', this.onConfigOk.bind(this));
        kcw.setHandler(CommandManager.reset().handle, this.resetMapper.bind(this));
        kcw.setHandler(CommandManager.apply().handle, this.applyConfig.bind(this));
        kcw.setHandler(CommandManager.wasd().handle,this.setWASD_Move.bind(this));
        kcw.setHandler(CommandManager.keylayout().handle,this.onKeyLayoutOk.bind(this));
        kcw.setHandler(CommandManager.exit().handle,this.onConfigCancel.bind(this));
        kcw.setHelpWindow(this._helpWindow);
        this.addWindow(kcw);
        this._keyconfigWindow = kcw;
    }
    mainWidnow() {
        return this._keyconfigWindow;
    }
    subWindow(){
        return this._symbolListWindow;
    }
    currentButtonCode(){
        return this._keyconfigWindow.currentButtonCode();
    }
}


    Window_Options.prototype.addGamepadOptions_MA =function(){
        this.addCommand(currentGamepadConfigText(),MA_GAMEPAD_CONFIG);
    };
    Window_Options.prototype.addKeyboardConfig_MA=function(){
        this.addCommand(currentKeyConfigText(),MA_KEYBOARD_CONFIG);
    };
    const Window_Options_addVolumeOptions=Window_Options.prototype.addVolumeOptions;
    Window_Options.prototype.addVolumeOptions=function(){
        Window_Options_addVolumeOptions.call(this);
        this.addGamepadOptions_MA();
        this.addKeyboardConfig_MA();
    }
    const Window_Options_statusText=Window_Options.prototype.statusText;
    Window_Options.prototype.statusText =function(index){
        if(this.isGamepadConfig(index)){
            return "";
        }
        if(this.isKeyboardConfig(index)){
            return "";
        }
        return Window_Options_statusText.call(this,index);
    }

    Window_Options.prototype.isGamepadConfig=function(index){
        const elem= this._list[index];
        return(elem &&elem.symbol ===MA_GAMEPAD_CONFIG);
    }
    Window_Options.prototype.isKeyboardConfig=function(index){
        const elem= this._list[index];
        return (elem &&elem.symbol ===MA_KEYBOARD_CONFIG);
    }
    const Window_Options_processOk = Window_Options.prototype.processOk;
    Window_Options.prototype.processOk =function(){
        Window_Options_processOk.call(this);
        if(SceneManager.isSceneChanging()){
            return;
        }
        if(this.isGamepadConfig(this._index)){
            this.playOkSound();
            Mano_InputConfig.gotoGamepad();
            return;
        }
        if(this.isKeyboardConfig(this._index)){
            this.playOkSound();
            Mano_InputConfig.gotoKey();
            return;
        }
    };
function setupPP_option(){
    if(Utils.RPGMAKER_NAME==="MV"){
        return;
    }
    if(PP_Option && PP_Option.Manager){
        PP_Option.Manager.addOptionEX(MA_GAMEPAD_CONFIG, currentGamepadConfigText,function(w,s,i){
            Mano_InputConfig.gotoGamepad();
        });
        PP_Option.Manager.addOptionEX(MA_KEYBOARD_CONFIG, currentKeyConfigText,function(w,s,i){
            Mano_InputConfig.gotoKey();
        });    
    }
}
function setupDefaultMapper(){
    //メモ
    //この処理はConfigManager.load()よりも先に行う必要がある。
    //MVでの挙動が怪しい予感はする
    symbolManager.onBoot();
    //TODO:これの型を変更する 変数の保存場所も変更する
    Mano_InputConfig.defaultGamepadMapper =Object.freeze( objectClone(Input.gamepadMapper));
    Mano_InputConfig.defaultKeyMapper= Object.freeze(objectClone(Input.keyMapper));
}
const DataManager_loadDatabase=DataManager.loadDatabase;
DataManager.loadDatabase =function(){
    DataManager_loadDatabase.call(this);
    //メモ・MV/MZの双方で、ここの方がタイミングとして安全
    setupDefaultMapper();
    setupPP_option();
};
const Game_Map_setupStartingEvent =Game_Map.prototype.setupStartingEvent;
Game_Map.prototype.setupStartingEvent =function(){
    symbolManager.callButtonEvent();
    return Game_Map_setupStartingEvent.call(this);
};

// const Scene_Boot_onDatabaseLoaded =Scene_Boot.prototype.onDatabaseLoaded ||(function(){});
// Scene_Boot.prototype.onDatabaseLoaded =function(){  
//     setupDefaultMapper();
//     if(Imported.PP_Option ){
//         this.PP_Option_InputConfig();
//     }
//     Scene_Boot_onDatabaseLoaded.call(this);
// };

class Window_DebugSymbols extends Window_InputSymbolListBase{


}
//TODO:エラー診断　パラメータの問題を検出して、解決方法を提示
class Scene_ErrorDetection extends Scene_MenuBaseMVMZ{


}


/**
 * @param {String} symbol 
 * @returns 
 */
const GetButtonNameMV =function(symbol){
    const device = getCurrentDevice();
    const button = device.getButtonBySymbol(symbol);
    if(button){
        return button.name();
    }
    return "";
};

/**
 * @param {{symbol:String nameVariable:Number}} arg 
 */
const GetButtonName =function(arg){
    const device =getCurrentDevice();
    const button = device.getButtonBySymbol(arg.symbol);
    if(button){
        $gameVariables.setValue(arg.nameVariable,button.name());
    }
};



if(Utils.RPGMAKER_NAME =="MV"){
    (function(){


        // const Scene_Boot_start =Scene_Boot.prototype.start;
        // Scene_Boot.prototype.start =function(){
        //     Scene_Boot_start.call(this);
        //     setupDefaultMapper();
        // };
        Window_Selectable_InputConfigVer.prototype.drawItemBackground =function(){};

        Window_Selectable_InputConfigVer.prototype.maxVisibleItems =function(){
            const visibleRows = Math.ceil(this.contentsHeight() / this.itemHeight());
            return visibleRows * this.maxCols();        
        };
        Window_Selectable_InputConfigVer.prototype.itemRectWithPadding = Window_Selectable_InputConfigVer.prototype.itemRectForText;
    })();
}else{
    PluginManager.registerCommand( PLUGIN_NAME,"IsGamepadValid",function(arg){
        const sid = (arg.switchId);
        const value = symbolManager.isValidMapper(Input.gamepadMapper);
        $gameSwitches.setValue(sid,value);
    });
    PluginManager.registerCommand( PLUGIN_NAME,"IsKeyboardValid",function(arg){
        const sid = (arg.switchId);
        const value = symbolManager.isValidMapper(Input.keyMapper);
        $gameSwitches.setValue(sid,value);
    });
    PluginManager.registerCommand( PLUGIN_NAME,"GetButtonName",GetButtonName);
    PluginManager.registerCommand( PLUGIN_NAME,"GetButtonNameEX",GetButtonName);

    PluginManager.registerCommand(PLUGIN_NAME,"GamepadScene",function(){
        Mano_InputConfig.gotoGamepad();
    })

    PluginManager.registerCommand(PLUGIN_NAME,"KeyboardScene",function(){
        Mano_InputConfig.gotoKey();
    })


}

const exportClass ={
    //MV用・ヘルプへの記載予定なし
    GetButtonNameMV:GetButtonNameMV,
    Scene_ConfigBase:Scene_InputConfigBase_MA,
    Scene_KeyConfig:Scene_KeyConfig_MA,
    Scene_GamepadConfig: Scene_GamepadConfigMA,
    Scene_GamepadConfig_ALT:Scene_GamepadConfig_ALT,
    Window_InputSymbolList:Window_InputSymbolList,
    Window_GamepadConfig:Window_GamepadConfig_MA,
    Window_KeyConfig:Window_KeyConfig_MA,
    defaultKeyMapper:{},
    defaultGamepadMapper:{},
    gotoKey:function(){
        SceneManager.push(Mano_InputConfig.Scene_KeyConfig );
    },
    gotoGamepad:function(){
        if(ConfigManager[MA_INPUTCONFIG_STYLE]==="ALT"){
            SceneManager.push(Mano_InputConfig.Scene_GamepadConfig_ALT );
        }else{
            SceneManager.push(Mano_InputConfig.Scene_GamepadConfig );
        }
    },
};

return exportClass;
})();

{
//Sorry for the dirty implementation.
//Since there were many questions from users who use YEP_OptionCore together on how to set plug-in parameters, we are responding by the following method.
    const param = PluginManager.parameters("Mano_InputConfig");
    if(param && param.SettingsForYEP_OptionsCore){
        const obj =JSON.parse(param.SettingsForYEP_OptionsCore);

        //インポート情報を偽装し、GamepadConfig/KeybordConfigと認識させる
        if(obj.gamepad==="true"){
            Imported.GamepadConfig = true;
            window["Scene_GamepadConfig"] =Mano_InputConfig.Scene_GamepadConfig;
            //何かよくわからない関数が追加されているので、適当に追加する
            Input.isControllerConnected =Input.isControllerConnected||function(){return true;};
        }
        if(obj.Keyboard==="true"){
            Imported.YEP_KeyboardConfig = true;
            window["Scene_KeyConfig"] = Mano_InputConfig.Scene_KeyConfig;    
        }
    }
}

