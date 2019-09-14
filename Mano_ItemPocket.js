 //=============================================================================
// Mano_ItemPocket.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017-2017 Sigureya
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/Sigureya/
// [github]:https://github.com/Sigureya/RPGmakerMV
// ----------------------------------------------------------------------------
//=============================================================================
/**
 * 再配布を許可します。
 * ゲームの内容による使用制限はありません。
 * 
 * 以下の行為は禁止します。
 * ・自分が作ったと偽ること
 * ・このプラグイン自体を素材として販売すること
 * （他の素材と併用する形での同梱は禁止しません）
 * read meには以下の内容を記載してください。
 * しぐれん：[github]:https://github.com/Sigureya/RPGmakerMV
 * 
 */
/*:
 * 改造した場合、この後ろに「改変者（〇〇）」などの形で表記してください。
 * @author しぐれん(https://github.com/Sigureya/RPGmakerMV)
 * @plugindesc キャラクターごとに個別にアイテムを所持します。
 *
 * @param menuCommand
 * @text コマンド名
 * @desc メニュー画面におけるアイテム所持のコマンド名
 * @type string
 * @default アイテム所持
 * 
 * @param menuCommandPosition
 * @text コマンドの位置
 * @desc アイテム所持コマンドの位置を調整します
 * @type select
 * @option オリジナルコマンドの位置
 * @value 0
 * @option 「アイテム」の上
 * @value 1
 * @default 0
 * 
 * @param usingWeight
 * @text 「重さ機能」の有効化
 * @desc アイテムの重さ機能を使うかどうかを定義します
 * ※ゲーム実行中は変更できません
 * @type boolean
 * @on 使う
 * @off 使わない
 * @default false
 *  
 * @param defaultWeight
 * @text 重さ初期値
 * @desc アイテムのデフォルトの重さ
 * メモに何も書かなかった場合、ここに指定した数値が代入されます。
 * @type number
 * @default 1
 * @parent usingWeight
 * 
 * @param weightText
 * @desc 重さの表示形式(個数指定時)
 * @default 重さ
 * @parent usingWeight
 * 
 * @param command2
 * @type struct<CommandSetting>[]
 * @default []
 * 
 * @param command
 * @text コマンドリスト
 * @desc ゲーム中で有効なコマンドの一覧です。
 * ここで並び順を調整できます。
 * @default ["use","pass","swap","remove","add","myset"]
 * @type select[]
 * @option use
 * @option pass
 * @option add
 * @option swap
 * @option remove
 * @option myset
 * 
 * 
 * @param use
 * @type struct<CommandSetting>
 * @desc アイテムを使うコマンド名
 * @default {"name":"使う","description":""}
 * @parent command
 * 
 * @param swap
 * @type struct<CommandSetting>
 * @desc アイテムを入れ替えるコマンド名
 * @default {"name":"入れ替え","description":""}
 * @parent command
 * 
 * @param remove
 * @type struct<CommandSetting>
 * @desc アイテムをしまうコマンド名
 * @default {"name":"しまう","description":""}
 * @parent command
 * 
 * @param add
 * @type struct<CommandSetting>
 * @desc アイテムを入れるコマンド名
 * @default {"name":"入れる","description":""}
 * @parent command
 * 
 * @param pass
 * @type struct<CommandSetting>
 * @desc アイテムを渡すコマンド名
 * @default {"name":"わたす","description":""}
 * @parent command
 * 
 * 
 * @param myset
 * @type struct<CommandSetting>
 * @desc マイセットのコマンド名
 * @default {"name":"マイセット","description":"アイテム所持の組み合わせを保存できます"}
 * @parent command
 * 
 * @param sort
 * @type struct<CommandSetting>
 * @desc アイテムのソートのコマンド名
 * @default {"name":"整列","description":""}
 * @parent command
 * 
 * @param numberSelectHelp
 * @type string
 * @desc 個数を選択するときのヘルプ文章を設定します
 * @default 左右キーで個数を選択
 * @param sound
 * @text 効果音
 * 
 * @param mysetSaveSound
 * @desc マイセットのセーブに使われる効果音
 * @default Save
 * @require 1
 * @dir audio/se/
 * @type file
 * @parent sound
 * 
 * @param mysetLoadSound
 * @desc マイセットのセーブに使われる効果音
 * @default Equip1
 * @require 1
 * @dir audio/se/
 * @type file
 * @parent sound
 * 
 * @param InsertForPocket
 * @type switch
 * @desc 指定したスイッチがONの時、
 * 新しく手に入れたアイテムを先頭のアクターのポケットに入れます。
 * 
 * @param pocketKeepByremoveActor
 * @desc 指定したスイッチがONの時、
 * パーティからの離脱の時アイテムを持たせたままにします。
 * @type switch
 * @default 0
 * 
* 
 * @param pocket
 * @text ポケットの設定
 * 
 * @param maxAmount
 * @type number
 * @desc １種類当たりの入れることができる量を定義します。
 * @default 99
 * @parent pocket
 * 
 * @param pocketSize
 * @type number
 * @desc ポケットに入れることができるアイテムの種類を設定します。
 * @default 6
 * @parent pocket
 * 
 * @param canDuplicate
 * @type boolean
 * @同じ種類のアイテムをポケットに入れることができるかを定義します。
 * @default false
 * 
 * @param MaxColor
 * @type number
 * @desc 最大個数を所持している際の表示色を設定します。
 * システムのカラー番号で指定されます。
 * @default 18
 * @parent pocket
 * 
 * @param NotEnoughColor
 * @type number
 * @desc マイセット実行時に、アイテムが足りなかった時の色を設定します
 * @未実装
 * @default 4
 * 
 * 
 * @param usingMyset
 * @type boolean
 * @desc マイセット機能を使うかどうかを定義します
 * @on 使う
 * @off 使わない
 * @default true
 * @parent myset
 * 
 * @param mysetSize
 * @type number
 * @desc マイセットの保存数を定義します
 * @default 8
 * @parent myset
 * 
 * @param mysetFormat
 * @type string
 * @desc マイセットのデフォルト名です
 * @default マイセット【%1】
 * @parent myset
 * 
 * @param saveMyset
 * @type string
 * @desc マイセットを保存する時のコマンドです
 * @default マイセットの保存
 * @parent myset
 * 
 * @param saveMysetHelp
 * @type string
 * @desc マイセットを保存する時のヘルプ表示
 * @default 保存先の選択
 * @parent myset
 * 
 * @param loadMyset
 * @type string
 * @desc マイセットを読み込む時のコマンドです。
 * @default マイセットの読み込み
 * @parent myset
 * 
 * @param loadMysetHelp
 * @type string
 * @desc マイセットを保存する時のヘルプ表示
 * @default 読み込むデータの選択
 * @parent myset
 * 
 * @param renameMyset
 * @type string
 * @desc マイセットの登録名を変更する時のコマンド名です
 * @default マイセットの名前変更
 * @parent myset
 *  
 * @param developMode
 * @type boolean
 * @desc 開発モードフラグです。ダミーデータなどの設定が入っています。
 * @default false
 * 
 * @help
 * アクターごとにアイテムを所持させることができます。
 * スイッチを設定するパラメータは、無指定の場合false(OFF)として扱います。
 * <MaxAmount:2>
 * アイテム側に上記の記述をすることで、所持数を制限できます。
 * この場合は、ポケットにその種類のアイテムを入れる数を２個までに制限できます。
 * <Weight:8>
 * アイテムに重さを設定できます。
 * 設定しない場合、デフォルトの重さが指定されます。
 * 
 * 
 * ■アイテムを持っているかのチェックについて
 * 持っているかどうかのチェックは、ポケットに対しては行いません。
 * イベントコマンドでチェックしたい場合、checkPocketを実行することで
 * 
 * ・スクリプトで調べる
 * 条件分岐（スクリプト）に以下の記述を行うことでもチェックできます。
 * $gameParty.isInPocket(アイテムの番号);
 * 特定のアクターが持っているかはGame_ActorにあるisInPocket()関数を使います。
 * 呼びだし方は以下の通りです。
 * actor.isInPocket(アイテムの番号)
 * $gameActor.actor(アクターの番号).isInPocket(アイテムの番号)
 * 
 * ■プラグインコマンドについて
 * 条件分岐でポケットにあるアイテムをチェック対象にする場合、
 * 以下のプラグインコマンドのどれかを実行します。
 * 設定を変更した場合、次の条件分岐1回だけ有効になります。
 * ◆Pocket PartyInclude
 * パーティにいるキャラのポケットを調べます。
 * ◆Pocket AllInclude
 * 全てのアクターの所持アイテムをチェックします。
 * DS版DQ4には世界樹の葉を大量に所持できてしまうバグがあるのですが、
 * そういった現象への対策です。
 * 
 * ◆Pocket SaveTemporary
 * パーティにいるアクターが所持しているアイテムを一時的に通常の所持アイテムへ戻します。
 * これと同時に、所持アイテムの状態を別の場所へ記録します。
 * このデータはセーブデータの一部として、$gamePartyに記録されます。
 * 既に記録している場合、例外を投げます。（エラーで落ちます）
 * 
 * ◆Pocket LoadTemporary
 * SaveTemporaryで解放したデータを元に戻します。
 * 同時に、一時データを削除します。
 * データがない状態でこの関数を呼ぶと、エラーで落ちます。
 * 
 * ■メモについて
 * メモ欄で、アクターの初期アイテムが設定できます。
 * 以下のような内容で書き込むと、
 * ID1のアイテムを4個・ID2のアイテムを3個持った状態で加入します。
 * <PocketItem[1]:4>
 * <PocketItem[2]:3>
 * 
 * ■競合について
 * Game_Battler.consumeItemを再定義しているプラグインとは競合する可能性があります。
 * これは、アイテムを減らす処理において
 * Game_Battler.consumeItemを使わないようにしているからです。
 * 対応パッチは作成しますので、問題があった際には積極的に報告お願いします。
 * Twitterの方が反応速いです。
 * 
 * ■メソッドの命名法則
 * 以下の通りです。
 * execute**()
 * **を実際に実行する関数。
 * 必要なWindowを開く部分は**の方にあります。
 * start**
 * end**
 * Scene_ItemPocketにおいて、
 * 特定の処理を開始する場合と終了する場合のペアです。
 * startでウィンドウを開き、endで閉じています。
 * 
 * ※ヘルプの書き途中です。
 * ver 2.0.0（2018/03/22）
 * タッチ操作周辺の不具合を修正
 * 本体のクラス構文を旧来の書き方からES5以降の物へ変更
 * 多数のエンバグ発生の可能性あり
 * ver 2.1.0 (2018/03/28)
 * ヘルプ表示を増やし、UIを改善
 * プラグインパラメータの一部を破壊的変更（互換切り）
 *
 * 
 * ver 1.4.0
 * タッチ操作向けのボタンを追加。
 * 
 * ver 1.3.0 
 * MA_ItemPocket.addItem()にバグが発覚したので修正。
 * アイテムを渡す機能を実装。
 * ver 1.2.0(2017/09.13) アイテムの重さ機能を実装
 * ver 1.1.0(2017/09/05) マイセット機能を実装
 * ver 1.0.0(2017/08/26) イベントコマンド「条件分岐」で、アイテム所持をチェックできるようにした。
 * DQ風所持モードの拡張プラグインを追加。
 * ver 0.7.5(2017/06/28) アイテムの出し入れで個数指定を可能にし、入れられない時はグレーアウト。
 * ver 0.7.0(2017/06/21) バトル中にアイテムを使えるようになった
 * ver 0.6.3(2017/06/21) バトルに少しだけ対応。
 * ver 0.6.0(2017/06/20) アイテムを持たせることができるようになった。
 * ver 0.5.0(2017/06/20) 公開
 */
/*~struct~PocketItem:
 * @param id
 * @param amount
 */
/*~struct~CommandSetting:
 * @param name
 * @type string
 * 
 * @param description
 * @type string
 * 画面上部に表示する説明文です。
 */

 

 /*
 * 現在のタスク
 * 
 * TODO
 * 
 * Pocket_Baseクラスを実装し、機能を改善する。
 * ドラクエ風所持モードを本体の標準に。
 * 
 * 表示部分の改善
 * スクロール時に、表示がおかしい
 * 
 * 装備品も一緒にする（ほぼ無理　アイテムのフリをする装備品を作ればあるいは？）
 * ↑アクター本体からデータを取得すればいいかも？
 * 
 * タッチ操作の改善
 * タッチ操作でのアクター同士でのアイテムの受け渡し
 * 個数選択を９０度回転して使う
 * モード切替時にキャンセルを押さなくてもいいように
 * 無を渡すことで、反対側からアイテムを引き込める処理
 * 
 * アイテム欄から持たせる処理(特定のボタンで呼び出す)
 * １ボタンで以下の機能の呼び出し
 * 呼び出し先は、変更できるように
 * ソート
 * クリア
 * 最大補充
 * これをXYに割り当て。使う直前にYES/NOのチェック
 * 持たせたアイテムに、装備品同様のtraitを設定する機能
 * ShopNumberを参考に、クリック操作用のボタンを実装
 * しまうと、入れるの１ボタン往復
 * 
 * ショップ対応
 * イベントコマンドのためにバインドする処理
 * （アイテムを増やす、をフックする）
 * 
 * サブメニュー
 * 決定キーを押したときに表示　
 * ◆Pocket Sync true
 * アイテム関連のイベントコマンドを実行した場合に、
 * ポケット内のアイテムに対しても実行します。
 * 効果はこのイベントコマンドを実行したイベント内部でのみ有効です。
 * ◆Pocket Sync false
 * SyncONを解除するのに使います。
 * 
 * 以下のイベントコマンドが該当します。
 * ・アイテムの増減（アイテムを減らすとき）
 * ・条件分岐（アイテムを持っているか）
 * ・変数の操作（アイテムの所持数）
 * 
 * 最近使ったアイテム？
 * 最大個数所持している場合は、個数表示を赤に
 * アイテムを減らすときに、アクターに持たせているアイテムを減らす処理
 * 装備を減らす処理と同様にする
 * プラグインコマンドで実行？一時的にフラグを立てる？
 * <ActorEquipItem:
 *   max =10
 *   
 * >
 * <PocketCapacity:2>
 * <MaxAmount:2>
*/ 　



var Mano_ItemPocket =(function () {
    'use strict';
    function getParam(){
        return PluginManager.parameters('Mano_ItemPocket');
    }
/**
 * @param {RPG.Item} item 
 */
function getItemWeight(item){
    if(item){
        return item.weight_MA;
    }
    return 0;
}
class MA_ItemPocket_Base{
    /**
     * @param {Number} index 
     */
    amount(index){
        return 0;
    }
    clear(){}
    // nullや、空っぽのアイテムを取り除く
    normalize() {}
    /**
     * @param {RPG.Item} item
     * @return {boolean}
     */
    hasItem(item) {
        return false;
    }

    /**
     * @returns {MA_ItemPocket_Base}
     */
    clone(){
        return null;
    }

    /**
     * @returns {RPG.Item | RPG.Weapon|RPG.Armor}
     * @param {Number} index 
     */
    item(index){
        return null;
    }
    /**
     * @param {Number} index 
     */
    numItemsForParty(index) {
        return $gameParty.numItems(this.item(index));
    }
    /**
     * @param {number} index
     */
    weight(index) {
        const amount = this.amount(index);
        const item = this.item(index);
        if (item) {
            return getItemWeight(item) *amount;
        }
        return 0;
    }

    /**
     * @return {number} 残り重量
     */
    weightCapacity() {
        return 100;
    }
    /**
     * @param {RPG.BaseItem} item
     * @param {Number} [start = 0]
     */
    indexOf(item, start) {
        const s = start ||0;
        const len = this.maxItems();
        for(var i =s ; i < len; ++i){
            if(this.item(i) ===item){
                return i;
            }
        }
        return -1;
    }

    maxItems(){
        return 0;
    }
}


class MA_itemPocket extends MA_ItemPocket_Base {
    constructor() {
        super();
        this.initialize.apply(this, arguments);
    }
    /**
     * @param {[]} dataArray
     */
    initialize(dataArray) {
        /**
         * @type {{id:number,amount:number}[]}
         */
        this._data = dataArray || [];
    }
    array() {
        return this._data;
    }
    length() {
        return this.array().length;
    }
    maxItems(){
        return this.length();
    }
    /**
     * @param {function(RPG.Item,RPG.Item)=>number} func
     */
    sort(func) {
        this.array().sort(function (a, b) {
            return func($dataItems[a.id], $dataItems[b.id]);
        });
    }
    /**
     * @return {boolean}
     */
    isFull() {
        return this.length() >= this.maxSize();
    }
    /**
     * @return {Number}
     */
    maxSize() {
        return MA_itemPocket.pocketSize;
    }
    front() {
        return this.array()[0];
    }
    back() {
        return this._data[this._data.length - 1];
    }
    //削除方法は変えたほうがいいかも fill(null)でもいいかも
    clear() {
        this._data.length = 0;
    }
    /**
     * @param {MA_itemPocket} otherPocket
     * @param {number} indexA index of this
     * @param {number} indexB index of other
     */
    swapItem(otherPocket, indexA, indexB) {
        const tmp = this._data[indexA];
        this._data[indexA] = otherPocket._data[indexB];
        otherPocket._data[indexB] = tmp;
    }
    // nullや、空っぽのアイテムを取り除く
    normalize() {
        for (var i = 0; i < this._data.length;) {
            if (this.isEmpty(i)) {
                this._data.splice(i, 1);
            }else {
                i += 1;
            }
        }
    }
    /**
     * @param {RPG.Item} item
     * @return {boolean}
     */
    hasItem(item) {
        return this.findItem(item) !== null;
    }
    _cloneArray(){
        return this._data.map(function (obj) {
            const result = {};
            Object.assign(result, obj);
            return result;
        });
    }
    /**
     * @return {MA_itemPocket}
     */
    clone() {
        return new MA_itemPocket(this._cloneArray());
    }

    /**
     * @desc マイセット用のデータを生成して返す
     */
    createMySet(){
        return new MA_ItemPocketMyset(this._cloneArray());
    }
    /**
     * @desc 指定した位置にあるアイテムのデータを返す　所持数が0ならnullを返す
     * @param {number} index
     * @return {RPG.Item } included null
     */
    item(index) {
        const obj = this._data[index];
        if (!obj) {
            return null;
        }
        //TODO:改造した部分なので、ここでエラーが出るかもしれない
        if (obj.amount <= 0) {
            return null;
        }
        return $dataItems[obj.id];
    }
    /**
     * @desc 指定した位置にあるアイテムのデータを返す　所持数が0でもそのまま返す
     * @param {number} index
     * @return {RPG.Item} included null
     */
    itemObject(index) {
        const obj = this._data[index];
        if (obj) {
            return $dataItems[obj.id];
        }
        return null;
    }
    numItemsForParty(index) {
        return $gameParty.numItems(this.item(index));
    }
    /**
     * @return {boolean}
     */
    canMySet() {
        const len = this._data.length;
        for (var i = 0; i < len; ++i) {
            const item = this._data[i];
            if (item.amount > this.numItemsForParty(i)) {
                return false;
            }
        }
        return true;
    }
    // マイセットの指定に従って、アイテムをポケットに入れる
    // ただし、足りない部分はかけた状態になる。
    // この関数はアイテムを減らす処理は行わない
    // MA_itemPocket.prototype.clampMySet=function(){
    //     for(var i=0; i < this._data.length;++i){
    //         var item = this._data[i];
    //         if(item){
    //             item.amount = Math.min( this.numItemsForParty(i),item.amount  );
    //         }
    //     }
    // };
    /**
     * @param {number} index
     * @return {number} amount of pocket[index]
     */
    amount(index) {
        if (this._data[index]) {
            return this._data[index].amount;
        }
        return 0;
    }
    /**
     * @param {RPG.Item} item
     * @return {Number}
     */
    amountSumOfItem(item) {
        if (!item) {
            return 0;
        }
        //DQモードで使うので、消さないこと
        var sum = 0;
        for (var i = 0; i < this.length(); ++i) {
            var data = this.array()[i];
            if (data && data.id === item.id) {
                sum += data.amount;
            }
        }
        return sum;
    }
    /**
     * @param {number} index
     */
    weight(index) {
        const amount = this.amount(index);
        const item = this.item(index);
        if (item) {
            return getItemWeight(item) *amount;
//            return item.weight_MA * amount;
        }
        return 0;
    }
    /**
     * @return {number}
     */
    weightSum() {
        var result = 0;
        const len = this.length();
        for (var i = 0; i < len; i += 1) {
            result += this.weight(i);
        }
        return result;
    }
    capacity(index) {
        return MA_itemPocket.maxAmount(this.itemObject(index)) - this.amount(index);
    }

    canAdd(index) {
        return this.capacity(index) > 0;
    }
    /**
     * @return {number} 残り重量
     */
    weightCapacity() {
        return 100;
    }
    /**
     * @param {Number} index
     * @return {boolean}
     */
    isItemMax(index) {
        const item = this._data[index];
        return item.amount >= MA_itemPocket.maxAmount($dataItems[item.id]);
    }
    /**
     * @param {Number} index
     * @return {boolean}
     */
    isEmpty(index) {
        const item = this._data[index];
        if (item) {
            return item.amount <= 0;
        }
        return true;
    }
    /**
     * @param {number} index
     * @return {boolean}
     */
    exist(index) {
        return !!this._data[index];
    }
    // MA_itemPocket.prototype.allocateItem =function(item){
    //     this._data.push(  MA_itemPocket.newItem(item));
    // };
    /**
     * @param {number} index
     * @param {RPG.Item} item
     * @param {number} amount
     */
    setData(index, item, amount) {
        if (!this._data[index]) {
            this._data[index] = MA_itemPocket.newItem(item, amount);
            return;
        }
        const obj = this._data[index];
        obj.id = item ? item.id : 0;
        obj.amount = amount;
    }
    /**
     * @param {RPG.Item} item
     * @param {Number} [start = 0]
     */
    indexOf(item, start) {
        for (var i = start || 0; i < this._data.length; i += 1) {
            if (this._data[i]) {
                if (this._data[i].id === item.id) {
                    return i;
                }
            }
        }
        return -1;
    }
    /**
     * @param {RPG.Item} item
     */
    findItem(item) {
        const index = this.indexOf(item);
        if (index !== -1) {
            return this._data[index];
        }
        return null;
    }
    /**
     * @param {RPG.Item} item
     * @param {Number} amount
     */
    addItem(item, amount) {
        const lastIndex = this.indexOf(item);
        return MA_itemPocket._addItemImple(this._data, item, amount, lastIndex);
    }
    /**
     * @param {RPG.Item} item
     * @param {Number} amount
     * @param {Number} [index= this.indexOf()]
     * @return {number} lastIndex
     */
    loseItem(item, amount,index) {

        const lastIndex =this.indexOf(item,index);
        if (lastIndex !== -1) {
            return MA_itemPocket._loseItemImple(this._data, item,amount, lastIndex);
        }
        throw(new Error("存在しないアイテムを消そうとしてます"))
    }
    /**
     * 
     * @param {RPG.Item} item 
     * @param {Number} index 
     */
    executeConsumeItem(item,index){
        this.loseItem(item,1,index);
    }
    /**
     * @param {Number} index 
     */
    consumeItem(index) {
        const item = this.item(index);
        if (item.consumable) {
            this.executeConsumeItem(item,index);
        }
    }
    /**
     * @param {number} index
     * @return {boolean}
     */
    canUse(index) {
        return !this.isEmpty(index);
    }
    /**
     * 
     * @param {Number} index 
     * @param {Number} amount 
     */
    releaseItem(index, amount) {
        const item = this.item(index);
        const itemData = this._data[index];
        const am = Math.min(amount, itemData.amount);
//        this.loseItem(item,amount,index);
        itemData.amount -= am;
        $gameParty.gainItem(item, am);
    }
    releaseAllItem() {
        const len =this._data.length;
        for (var i = 0; i < len; ++i) {
            this.releaseItem(i, Number.MAX_SAFE_INTEGER);
        }
    }
    /**
     * @param {MA_itemPocket} myset
     */
    loadMyset(myset) {
        this.releaseAllItem();
        var item = null;
        var amount = 0;
        var amountToHave = 0;
        var missingItemList = [];
        const len = myset.length();
        for (var i = 0; i < len; ++i) {
            item = myset.item(i);
            amount = myset.amount(i);
            amountToHave = $gameParty.numItems(item);
            if (amountToHave < amount) {
                missingItemList.push(i);
                amount = amountToHave;
            }
            this.setData(i, item, amount);
            $gameParty.loseItem(item, amount);
        }
        this.normalize();
        return missingItemList;
    }
    /**
     *
     * @param {RPG.Item} item
     * @return {Number}
     */
    static maxAmount(item) {
        return item.maxAmount_MA;
    }
    /**
     * @param {[]} array
     * @param {RPG.Item} item
     * @param {number} amount
     * @param {number} index
     * @return {number } lastIndex
     */
    static _addItemImple(array, item, amount, index) {

        if (array[index]) {
            array[index].amount += amount;
            return index;
        }
        array.push(MA_itemPocket.newItem(item, amount));
        return array.length - 1;
    }

    /**
     * @param {[]} array
     * @param {RPG.Item} item
     * @param {number} amount
     * @param {number} index
     * @return {number } lastIndex
     */
    static _loseItemImple(array, item, amount, index){


        if (array[index]) {
            array[index].amount -= amount;
            return index;
        }

        return -1;
    }

    /**
     * @param {RPG.Item} index
     * @return {number}
     */
    static weight(item) {
        return item.weight_MA;
    }
    /**
     * @param {RPG.Item} item
     * @param {Number} amount
     * @return {{id:number,amount:number}}
     */
    static newItem(item, amount) {
        const id_ = item ? item.id : 0;
        const result = {
            id: id_,
            amount: (amount || 0)
            //        type:MA_itemPocket.TYPE_ITEM   
        };
        return result;
    }
    /**
     * @param {RPG.Armor} armor
     */
    static newArmor(armor) {
        const result = {
            id: armor.id,
            amount: 1,
            type: MA_itemPocket.TYPE_ARMOR
        };
        return result;
    }
    /**
     * @param {RPG.Weapon} weapon
     */
    static newWeapon(weapon) {
        const result = {
            id: weapon.id,
            amount: 1,
            type: MA_itemPocket.TYPE_WEAPON
        };
        return result;
    }
    /**
     * @param {RPG.Item} item
     * @return {boolean}
     */
    static canPutInPocket(item) {
        return DataManager.isItem(item) && item.occasion <= 1;
    }
}
window[MA_itemPocket.name] =MA_itemPocket;
MA_itemPocket.pocketSize =0;
MA_itemPocket.TYPE_ITEM=0;
MA_itemPocket.TYPE_WEAPON =1;
MA_itemPocket.TYPE_ARMOR =2;
class MA_ItemPocketMyset extends MA_itemPocket{

}
window[MA_ItemPocketMyset.name] =MA_ItemPocketMyset; 


function createWithEquipList(){
    const list =[];
    list.length=setting.pocketSize;

    for(var i =0; i < list.length; ++i){
        const item =new Game_Item();
        item.pocketItem=true;
        list[i] = item;
    }
    return list;
}
/**
 * 
 * @param {Game_Item[]} list 
 */
function WithEquipFilter(list){
    return list.filter(function(item){
        if(item.pocketItem){
            return true;
        }
        return !item.isNull();
    });

}

Game_Item.prototype.isPocketItem =function(){
    return false;
};

class Game_PocketItem extends Game_Item{
    isPocketItem(){
        return true;
    }
}

// アイテムをGame_Itemの形で記録する実装 テスト中
//メニュー画面で動かすときは、操作用のプロキシを返す？
class MA_ItemPocketWithEquip extends MA_ItemPocket_Base{
    constructor(){
        super();
        this._resetList(createWithEquipList());
        this._actorId =0;
        this._originList =[];
    }
    /**
     * @param {Game_Item[]} list 
     */
    _resetList(list){
        this._list =list;
    }

    /**
     * @param {Number} actorId 
     */
    setActorId(actorId){
        this._actorId =actorId;
    }

    actor(){
        return $gameActors.actor(this._actorId);
    }
    amount(index){
        const item = this._list[index];
        if(item){
            if(!item.isNull()){
                return 1;
            }
        }
        return 0;
    }
    _getEquips(){
        const actor = this.actor();
        if(!actor){
            return [];
        }

        return actor._equips.filter(function(item){
            return item.isEquipItem();
        });
    }
    normalize(){
        this._resetList(WithEquipFilter(this._list));
    }
}

//セーブデータに含めるための、マイセット一覧クラス
class MA_PocketMysetList{
    constructor(){
        /**
         * @type {MysetListItem[]}
         */
        this._list=createDefaultMyset(setting.mysetSize);
    }
    loadDefault(){
        this._list = createDefaultMyset(setting.mysetSize);
    }
    item(index){
        return this._list[index];
    }
    /**
     * @param {Number}index
     * @param {MA_itemPocket} pocket
     */
    save(index,pocket){
        const item = this.item(index);
        if(item){
            item.pocket = pocket.createMySet();
        }
    }
    /**
     * @param {Number}index
     * @param {String} name
     */
    rename(index ,name){
        const item = this.item(index);
        if(item){
            item.name = name;
        }
    }

    maxItems(){
        return this._list.length;
    }
}
window[MA_PocketMysetList.name]=MA_PocketMysetList;
    class ModeSymbol{
        /**
         * 
         * @param {String} symbol 
         */
        setSymbol(symbol){
            this.symbol=symbol;
        }
        makeFromJSON(jsonObj){
            this.description =String(jsonObj.description);
            this.name = String(jsonObj.name);            
        }
    };

    const Mano_ItemPocket_State={
        includeParty:false,
        includeAll:false,
    };
function pocket_includeMembers(){
    if(Mano_ItemPocket_State.includeAll){
        return $gameActors._data;
    }
    if(Mano_ItemPocket_State.includeParty){
        return $gameParty.members();
    }
    return [];
}

/**
 * 
 * @param {number} itemId 
 * @return {Number}
 */
function maxAmount(itemId){
    return $dataItems[itemId].maxAmount_MA;
}

/**
 * 
 * @param {RPG.Item} item 
 */
function hasItem(item){
    if(MA_itemPocket.canPutInPocket(item)){
        const actors = $gameParty.members();
        return actors.some(function(actor){
            return actor.isInPocket( item.id );
        });
    }
    return false;
}

function isAutoPocketAdd(item){
    return false;
}
/**
 * @return {MA_itemPocket}
 * @param {Game_Actor} actor 
 */
function actorToPocket(actor){
    return actor.itemPocket();
}

const pocketFunction={
    includeMembers:pocket_includeMembers,
//    maxAmount:maxAmount,
    pocketSize :function(){
        return setting.pocketSize;
    },
    hasItem:hasItem,
    playSaveMysetSound:function(){
        SoundManager.playSave();
    },
};
    /**
     * @param {RPG.Item} item
     */
    function bootEachItem(item){
        if(!item){return;}

        if(!MA_itemPocket.canPutInPocket(item) ){
            item.maxAmount_MA =0;
            item.weight_MA =Number.MAX_SAFE_INTEGER;
            return;
        }
        const capacity = item.meta[setting.tag.maxAmount];
        if(capacity){
            item.maxAmount_MA =Number(capacity);
        }else{
            item.maxAmount_MA = setting.maxAmount;
        }
        if(setting.usingWeight){
            const  weight=item.meta[ setting.tag.weight];
            if(weight){
                item.weight_MA = Number(weight);
            }else{
                item.weight_MA = setting.weight;
            }
        }
    }

const Scene_Boot_start =Scene_Boot.prototype.start;
Scene_Boot.prototype.start= function() {
    Scene_Boot_start.apply(this,arguments);
    const len = $dataItems.length;
    for(var i =1; i < len;i+=1){
        bootEachItem($dataItems[i]);
    }
};


class PocketIndex{
    /**
     * @param {PokectItemData[]} data_ 
     */
    constructor(data_){
        this._data =data_;
        this._table ={};
        for(var i=0;i < data_.length;++i){
             this.insertItemTable( data_[i].id,i);
        }
    }
    /**
     * 
     * @param {number} itemId 
     * @param {number} index 
     */
    insertItemTable(itemId,index){
        this._table[itemId] ={
            index:index,
            data:this._data[index]
        };
    }
    /**
     * @param {RPG.Item} item 
     * @return {any}
     */
    fetch(item){
        return this._table[item.id];
    }
    // DQモードでジャックするために存在する 消さないこと
    /**
     * @return {Number}
     */
    vacant(){
        return MA_itemPocket.pocketSize-this._data.length;
    }

    /**
     * @param {RPG.Item} item 
     * @param {number} amount 
     */
    addItem(item,amount){
        const obj = this.fetch(item);
        if(obj){
            MA_itemPocket._addItemImple(this._data,item,amount,obj.index);
            return obj.index;
        }
        const index = MA_itemPocket._addItemImple(this._data,item,amount,-1);
        this.insertItemTable(item.id,index);

        return index;
    }
    /**
     * @param {RPG.Item} item
     */
    canAdd(item){
        return this.capacity(item) >0;
        if(this.capacity(item) >0){
            return true;
        }
        return false;
    }

    /**
     * @param {RPG.Item} item 
     * @return {Number}
     */
    amount(item){
        const obj =  this.fetch(item);
        if(obj){
            return obj.data.amount;
        }
        return 0;
    }
    /**
     * @param {RPG.Item} item 
     * @return {Number}
     */
    capacity(item){
        const amount = this.amount(item);
        if(this._data.length >=MA_itemPocket .pocketSize &&amount ===0 ){            
            return 0;
        }
        return MA_itemPocket.maxAmount(item)-amount;
    }

    /**
     * @param {RPG.Item} item 
     * @return {Number}
     */
    indexOf(item){
        const obj =this._table[item.id];
        if(obj){
            return obj.index;
        }
        return -1;
    }
};
/**
 * @return {PocketIndex}
 */
MA_itemPocket.prototype.createIndexTable=function(){
    return new PocketIndex(this._data);
};


MA_itemPocket.PocketIndex = PocketIndex;

const setting = (function(){
    const param = getParam();
    MA_itemPocket.pocketSize =Number(param.pocketSize);

    /**
     * @param {String} symbol
     */
    function createCommandSetting(symbol,objText){
        const result = new ModeSymbol();
        result.setSymbol(symbol);
        result.makeFromJSON(JSON.parse(objText));
        return result;
    }
    const mode ={
        use:createCommandSetting("use",param.use),
        swap:createCommandSetting("swap",param.swap),
        add:createCommandSetting("add",param.add),
        remove:createCommandSetting("remove",param.remove),
        pass:createCommandSetting("pass",param.pass),
        myset:createCommandSetting("myset",param.myset),
    };
    /**
     * @return {ModeSymbol[]}  
     */
    function createModeList( ){
        const list= JSON.parse(param.command);
        const len = list.length;
        const result =[];
        for(var i=0;i<len;++i){
            const symbol = list[i];
            const x = mode[symbol];
            if(x){
                result.push(x);
            }
        }
        return result;
    }

    const result=  {
        maxAmount : Number (param.maxAmount),
        weight:Number(param.defaultWeight),
        canDuplicate:Boolean(param.canDuplicate==='true'),
        pocketSize :Number(param.pocketSize),
        pocketKeepByremoveActor:Number(param.pocketKeepByremoveActor),
        menuCommandPostion :Number(param.menuCommandPosition),

        usingMyset:Boolean(param.usingMyset==='true'),
        usingWeight:Boolean(param.usingWeight==='true'),
        mysetSize :Number(param.mysetSize ||8),
        mysetFormat:String(param.mysetFormat),
        saveMyset:String(param.saveMyset),
        saveMysetHelp:String(param.saveMysetHelp),
        loadMyset:String(param.loadMyset),
        loadMysetHelp:String(param.loadMysetHelp),
        renameMyset:String(param.renameMyset),
        weightText:String(param.weightText),
        

        commandKey :"actorItemEquip",
        commandName:String(param.menuCommand),

        /**
         * @type {String[]}
         */
        commandList:(JSON.parse(param.command)),
        use:mode.use,
        swap:mode.swap,
        add:mode.add,
        remove:mode.remove,
        pass:mode.pass,
        myset:mode.myset,
        modeList :createModeList(),

        numberSelectHelp:String(param.numberSelectHelp),

        wordUse:String(param.CommandUse),
        symbolUse:'use',
        wordSwap:String(param.CommandSwap),
        symbolSwap:'swap',
        wordRemove:String(param.CommandRemove),
        symbolRemove:'remove',
        wordAdd:String(param.CommandAdd),
        symbolAdd:'add',
        wordMyset:String(param.CommandMyset),
        symbolMyset:'myset',
        wordPass:String(param.CommandPass),
        symbolPass:'pass',

        wordSort:'整列',
        symbolSort:'sort',
        symbolOutOfWindow :'outwindow',
        symbolNon:'non',
        pocketWindow:{
            w:function(){return Graphics.boxWidth/2;},
            h:function(){return 240;},
            smallH:function(){return 240;}
        },
        color:{
            max:Number(param.MaxColor) || 18,
        },
        tag:{
            maxAmount:'MaxAmount',
            weight:'Weight'
        },
    };
    return result;
})();


class Window_PocketNumber extends Window_Selectable{
    /**
     * 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} w 
     * @param {Number} h 
     */
    initialize(x, y, w, h) {
        super.initialize( x, y, w, h);
        this._item = null;
        this._max = 1;
        this._number = 1;
        this._weightCapacity = Number.MAX_SAFE_INTEGER;
        this.createButtons();
        this.deactivate();
    }
    setNumber(number) {
        this._number = number;
    }
    /**
     * @return {RPG.Item}
     */
    item() {
        return this._item;
    }
    clear() {
        this._item = null;
        this.setNumber(0);
        this.updateCursor();
        this.refresh();
    }
    refresh() {
        this.contents.clear();
        if (this._item) {
            const itemX = 0;
            const itemY = this.itemY();
            const numberX = this.cursorX();
            this.resetTextColor();
            this.drawItemName(this._item, 0, itemY);
            this.drawMultiplicationSign();
            this.drawNumber(numberX, itemY);
            if (setting.usingWeight) {
                this.drawItemWeight(numberX);
                this.drawWeightText();
            }
        }
    }
    cursorX() {
        return Window_ShopNumber.prototype.cursorX.call(this);
    }
    drawMultiplicationSign() {
        Window_ShopNumber.prototype.drawMultiplicationSign.call(this);
    }
    itemY() {
        return 0;
    }
    updateCursor() {
        if (this._item) {
            Window_ShopNumber.prototype.updateCursor.call(this);
        }
        else {
            this.setCursorRect(0, 0, 0, 0);
        }
    }
    drawNumber(x, y) {
        const width = this.numberWidth();
        if (this._number >= this._max) {
            this.changeTextColor(this.textColor(setting.color.max));
        }
        else {
            this.resetTextColor();
        }
        this.drawText(this._number, x, y, width, 'right');
    }
    weightY() {
        return 1 * this.lineHeight();
    }
    weightText() {
        return setting.weightText;
    }
    itemWeight() {
        return MA_itemPocket.weight(this.item());
    }
    numberWidth() {
        return this.cursorWidth() - this.textPadding();
    }
    drawWeightText() {
        const x = this.numberWidth();
        const y = this.weightY();
        const weightText = this.weightText();
        const width = this.textWidth(weightText);
        this.changeTextColor(this.normalColor());
        this.drawText(this.weightText(), x, y, width, 'right');
    }
    drawItemWeight(x) {
        const y = this.weightY();
        const width = this.numberWidth();
        const value = this.itemWeight() * this._number;
        this.drawText(value, x, y, width, 'right');
    }
    cursorWidth() {
        return Window_ShopNumber.prototype.cursorWidth.call(this);
    }
    maxDigits() {
        return 2;
    }

    /**
     * @param {RPG.Item} item
     * @param {Number} max
     */
    setup(item, max) {
        this.setNumber(Math.min(1, max));
        this._item = item;
        this._max = max;
        if (this._number === NaN) {
            this;
        }
        this.updateButtonsVisiblity();
        if(this._helpWindow){
            this._helpWindow.setText(setting.numberSelectHelp);
        }
    }
    setPrevWindow(window) {
        this._prevWindow = window;
    }
    getPrevWindow() {
        return this._prevWindow;
    }
    /**
     * @param {Number} amount
     */
    changeNumber(amount) {
        const lastNumber = this._number;
        this.setNumber((this._number + amount).clamp(1, this._max));
        if (this._number !== lastNumber) {
            SoundManager.playCursor();
            this.refresh();
        }
    }
    update() {
        Window_Selectable.prototype.update.call(this);
        this.processNumberChange();
    }
    processNumberChange() {
        Window_ShopNumber.prototype.processNumberChange.call(this);
    }
    number() {
        return this._number;
    }
    buttonX() {
        return 8;
    }
    buttonY() {
        return 100;
    }
    createButtons() {
        Window_ShopNumber.prototype.createButtons.call(this);
        this.placeButtons();
    }
    placeButtons() {
        const numButtons = this._buttons.length;
        const spacing = 8;
        const buttonY = this.buttonY();
        const width = 48;
        let x = this.buttonX();
        for (let i = 0; i < this._buttons.length; i++) {
            var button = this._buttons[i];
            button.x = x;
            button.y = buttonY;
            x += width + spacing; //  button.width/2;//+spacing;
        }
    }
    updateButtonsVisiblity() {
        if (TouchInput.date > Input.date) {
            this.showButtons();
        }
        else {
            this.hideButtons();
        }
    }
    hideButtons() {
        Window_ShopNumber.prototype.hideButtons.call(this);
    }
    showButtons() {
        Window_ShopNumber.prototype.showButtons.call(this);
    }
    onButtonDown() {
        this.changeNumber(-1);
    }
    onButtonDown2() {
        this.changeNumber(-10);
    }
    onButtonUp() {
        this.changeNumber(1);
    }
    onButtonUp2() {
        this.changeNumber(10);
    }
    onButtonOk() {
        this.processOk();
    }
}

class Window_PocketModeSelect_V2 extends Window_Selectable{

    constructor(x,y,w,h){
        super(x,y,w,h);
    }
    initialize(x, y) {
        this.makeItemList();
        const width = this.windowWidth();
        const height = this.fittingHeight(2);

        super.initialize(x,y,width,height);
        this.deactivate();
        this.deselect();
    }
    activate(){
        this.active=true;
        super.activate();
//        this.callUpdateHelp();
    }
    maxItems(){
        return this._list.length;
    }

    windowWidth() {
        return Graphics.boxWidth;
    }
    maxCols() {
        return 4;
    }
    addUseCommand() {
        this._list.push(setting.use);
    }
    addRemoveCommand() {
        this._list.push(setting.remove);
    }
    addSwapCommand() {
        this._list.push(setting.swap);
    }
    addAddCommand() {
        this._list.push(setting.add);
    }
    addPassCommand() {
        this._list.push(setting.pass);
    }
    addMysetCommand() {
        if (setting.usingMyset) {
            this._list.push(setting.myset);
        }
    }
    currentSymbol(){
        return this.item(this._index).symbol;
    }
    updateHelp(){
        super.updateHelp();
        this.setHelpWindowItem(this.item(this._index));
    }
    makeItemList() {
        this._list = setting.modeList;
    }
    item(index){
        return this._list[index];
    }
    drawItem(index){
        const rect = this.itemRectForText(index);
        const item =this.item(index);

        this.drawText(item.name,rect.x,rect.y,rect.width);
    }
    processPageup() {
        SoundManager.playCursor();
        this.updateInputData();
        this.callHandler('pageup');
    }
    processPagedown() {
        SoundManager.playCursor();
        this.updateInputData();
        this.callHandler('pagedown');
    }

}


/**
 * @param {Game_Actor} actor 
 */
function getNextActor(actor){
    const members =$gameParty.members();
    const len = members.length;
    if(len <=1){
        return actor;
    }
    const index= (members.indexOf(  actor )+1)%members.length;

    const result = members[index];
    return result;
}
/**
 * @param {Game_Actor} actor 
 */
function getPreviousActor(actor){
    const members =$gameParty.members();
    const len = members.length;
    if(len <=1){
        return actor;
    }
    const index= (members.indexOf(  actor )+len-1) % len;

    const result = members[index];
    return result;    
}



class Window_Pocket  extends Window_Selectable {

    constructor(x,y,w,h){
        super(x,y,w,h);
    }

    /**
     * @param {Number} x
     * @param {Number} y
     * @param {Number} w 
     * @param {Number} h 
     */
    initialize(x, y, w, h) {
        this.usingHelp(true);

        /**
         * @type {MA_itemPocket}
         */
        this._pocket = new MA_itemPocket();
        super.initialize(x,y,w,h)
        this.deactivate();
//        this.
        this.setActor(null);
        this.setEnableJudge(function(){return true;})
        this._pushLastNull = false;
        this._equips = [];
        this._passMode = false;
        this.createAllButtons();
        this.setActorLock(false);
    }
    /**
     * @param {Window_Help} window 
     */
    setHelpWindow(window){
        this._helpWindow=window;
    }
    /**
     * @param {Boolean} value 
     */
    usingHelp(value){
        this._helpUse =!!value;
    }
    callUpdateHelp(){
        if(this._helpUse && this._helpWindow){
            this.updateHelp();
        }
    }

    createButton(x, y, texcodeX, bitmap, func) {
        const button = new Sprite_Button();
        const width = 48;
        const height = 48;
        // button.anchor.x = 0.5;
        // button.anchor.y = 0.5;
        button.x = x;
        button.y = y;
        button.setColdFrame(texcodeX, 0, width, height);
        button.setHotFrame(texcodeX, height, width, height);
        button.bitmap = bitmap;
        button.setClickHandler(func);
        this.addChild(button);
        return button;
    }
    createAllButtons() {
        const bitmap = ImageManager.loadSystem('ButtonSet');
        const buttonY = 16;
        const buttonX = 8;
        const buttonSize = 48;
        this._donwButton=this.createButton(buttonX + 48 * 0, buttonY, 48, bitmap, this.processButtonDown.bind(this));
        this._upButton=    this.createButton(buttonX + 48 * 1, buttonY, 96, bitmap, this.processButtonUp.bind(this));

        this._buttonsWidth = 48 * 2;//buttons.length;
    }
    processButtonUp(){
        if(this.canActorChange()){
            SoundManager.playCursor();
            this.setActor( getPreviousActor(this._actor));
            this.refresh();
        }
    }
    
    processButtonDown(){
        if(this.canActorChange()){
            SoundManager.playCursor();
            this.setActor( getNextActor(this._actor));
            this.refresh();    
        }
    }
    /**
     * @return {Number}
    */
    buttonsWidth() {
        return this._buttonsWidth;
    }
    /**
     * @param {boolean}
     */
    setLastNull(bool) {
        this._pushLastNull = bool;
    }
    needNullPush() {
        return this._pushLastNull && !this.pocket().isFull();
    }
    maxItems() {
        const p =this.pocket();
        if(p){
           return p.length() + (this.needNullPush() ? 1 : 0);
        }
        return 0;
    }

//    setActorChange

    /**
     * 
     * @param {Boolean} value 
     */
    setActorLock(value){
        this._actorLock =!!value;
    }

    canActorChange() {
        return !this._actorLock;
    }
    /**
     * 
     * @param {function(Game_Actor)=>void} func 
     */
    setActorChangeHandle(func){
        this._onActorChangeFunc=func;
    }
    processActorChange(){
        if(this._onActorChangeFunc){
            this._onActorChangeFunc(this._actor);
        }
    }



    processPagedown() {
        this.callHandler("pagedown");
        this.activate();
    }
    processPageup() {
        this.callHandler("pageup");
        this.activate();
    }
    /**
     * @param {RPG.Item} item
     * @return {boolean}
     */
    isEnabled(item) {
        return this._enableJudge(item);
    }
    setEnableJudge(func) {
        this._enableJudge = func;
    }
    //TODO ここで分岐して、nullcheckを変える
    isCurrentItemEnabled() {
        return this.isEnabled(this.item());
    }
    itemList() {
        return this.pocket().array();
    }
    makeEquipList() {
        this._equips = this.equips();
    }
    //TODO ここは改造
    equips() {
        const actor = this.actor();
        //    actor.equipSlots()
        var result = [];
        if (actor) {
            const e = actor.equips();
            for (var i = 0; i < e.length; ++i) {
                if (e[i]) {
                }
            }
        }
        return result;
    }
    makeItemList() {
        this._data = this._pocket._data; //  this.allItemList();
    }
    /**
     * @return {RPG.Item} 個数が0でも取得する
     */
    itemObject() {
        return this._pocket.itemObject(this._index);
    }
    /**
     * @return {RPG.Item} 個数が0ならnull
     */
    item() {
        const index = this.index();
        return this._pocket.item(index);
    }
    /**
     * @return {Number}
     */
    amount() {
        if(this._pocket .exist(this._index)){
            return this._pocket.amount(this._index);
        }
        return 0;
    }
    equipsSize() {
        return this._equips.length;
    }
    topItemIndex() {
        return 0;
    }
    /**
     * @return {boolean}
     */
    itemAsNull() {
        const item = this.item();
        if (!item) {
            return true;
        }
        return item.amount <= 0;
    }
    selectionNormalize() {
        if (this.itemAsNull()) {
            this.selectBack();
        }
    }
    index() {
        return this._index;
    }
    /**
     * @return {Number} selected Item capacity
     */
    capacity() {
        if (this._pocket.exist(this._index)) {
            return this._pocket.capacity(this._index);
        }
        return Number.MAX_SAFE_INTEGER;
    }
    /**
     * @return {PokectItemData}
     */
    selectedObject() {
        return this._data[this.index()];
    }
    /**
     * @param {RPG.Item} item
     * @param {Number} [start=0] 検索の開始位置
     * @return {number}
     */
    indexOf(item, start) {
        return this.pocket().indexOf(item, start);
    }
    /**
     * @param {RPG.Item} item
     * @param {number} [fallback=-1]
     */
    selectOfItem(item, fallback) {
        const index = this.indexOf(item);
        if (fallback === undefined) {
            fallback = -1;
        }
        if (index === -1) {
            this.select(fallback);
        }else {
            this.select(index);
        }
    }
    /**
     * @return {number}
     */
    maxPageRows() {
        return super.maxPageRows() - 1;
    }
    /**
     * @return {Game_Actor}
     */
    actor() {
        return this._actor;
    }
    /**
     * @return {String} actorName
     */
    name() {
        return this.actor().name();
    }
    /**
     * @return {MA_itemPocket}
     */
    pocket() {
        return this._pocket;
    }
    /**
     * @param {Game_Actor} actor
     */
    setActor(actor) {
        if (!actor) {
            this._actor = null;
            this._pocket = null;
            return;
        }
    
        this._actor = actor;
        this.setPocket(actor.itemPocket());
        this._pocket.normalize();
        if (this.index() > this._pocket.length()) {
            //TODO
            this.selectBack();
        }
//        this.updateHelp();

    }
    setPocket(pocket) {
        this._pocket = pocket;
        this.makeItemList();
//        this.refresh();
    }
    lineColor() {
        return this.normalColor();
    }
    actorNameHeight() {
        return this.contents.fontSize + 20;
    }
    drawActorName() {
        this.changeTextColor(this.normalColor());
        this.drawText(this.name(), this.buttonsWidth(), 0, this.itemWidth());
        const y = this.contents.fontSize;
        this.drawHorzLine(y);
    }
    weightWidth() {
        return this.textWidth('000');
    }
    totalWeight() {
        return this.pocket().weightSum();
    }
    maxWeight() {
        return this.actor().pocketWeightCapacity();
    }
    itemWeightText() {
        return ('%1/%2').format(this.totalWeight(), this.maxWeight());
    }
    // TODO　要リファクタリング パラメータ設定部分と実際の描画に分ける？
    drawItemWeight(x, y) {
        //    const x =this.width -50;
        const totalWeight = this.totalWeight();
        const maxWeight = this.maxWeight();
        const maxWeightText = String(maxWeight);
        const weightMaxWidth = Number(this.textWidth(maxWeightText));
        const weightMax_X = x - weightMaxWidth;
        if (totalWeight >= maxWeight) {
            this.changeTextColor(this.textColor(setting.color.max));
        }
        else {
            this.resetTextColor();
        }
        this.drawText(maxWeightText, weightMax_X, y, weightMaxWidth, 'right');
        const slashWidth = this.textWidth('/');
        const slashX = weightMax_X - slashWidth;
        this.drawText('/', slashX, y);
        const totalWeightText = String(totalWeight);
        const totalWeightX = slashX - this.textWidth(totalWeightText);
        this.drawText(totalWeightText, totalWeightX, y);
    }
    drawAllItems() {
        this.changePaintOpacity(true);
        this.drawActorName();
        let x = this.width - 50;
        if (setting.usingWeight) {
            this.drawItemWeight(this.width - 50, 0);
        }
        const topIndex = this.topIndex();
        const p = this.pocket();
        const last = Math.min(this.maxPageItems(), p.length());
        for (var i = topIndex; i < last; i++) {
            this.drawItem(i);
        }
    }
    deselect() {
        this.updateHelp();
        super.deselect();
    }
    updateHelp() {
        this.setHelpWindowItem(this.item());
    }
    maxCols() {
        return 1;
    }
    itemCountWidth() {
        return this.textWidth(':00');
    }
    selectTopItem() {
        this.select(this.topItemIndex());
    }
    selectBack() {
        const shift = (this.needNullPush() ? 0 : 1);
        this.select(Math.max(0, this._data.length - shift));
    }
    // 武器を飛ばして、先頭の道具を選択
    selectFrontItem() {
        this.select(0);
    }
    //先頭を選ぶ　武器が選ばれるはず
    selectFront() {
        this.select(0);
    }
    /**
     * @return {RPG.Armor[]}  装備品一覧　nullは除外済み
     */
    equipList() {
        return this._equips;
    }
    allItemList() {
        return this.equipList().concat(this.itemList());
    }
    itemRect(index) {
        const rect = super.itemRect(index); //Window_Selectable.prototype.itemRect.call(this, index);
        rect.y += this.actorNameHeight();
        return rect;
    }
    drawItemAmount(index, rect) {
        const item = this._data[index];
        this.drawText(':', rect.x, rect.y, rect.width - this.textWidth('00'), 'right');
        if (this._pocket.isItemMax(index)) {
            this.changeTextColor(this.textColor(setting.color.max));
        }
        this.drawText(item.amount, rect.x, rect.y, rect.width, 'right');
    }
    /**
     * @param {number} index
     */
    drawItemImple(index, item) {
        const numberWidth = this.itemCountWidth();
        var rect = this.itemRect(index);
        rect.width -= this.textPadding();
        this.changePaintOpacity(this.isEnabled(this.pocket().item(index)));
        this.drawItemName($dataItems[item.id], rect.x, rect.y, rect.width);
        this.drawItemAmount(index, rect);
    }
    drawItem(index) {
        const item = this._data[index];
        if (item) {
            this.drawItemImple(index, item);
        }
    }
}
Window_Pocket.prototype.drawHorzLine = Window_Status.prototype.drawHorzLine;

class Window_PocketSub extends Window_Pocket {

    setMainActor(actor){
        this._mainActor=actor;
    }

    canActorChange(){
        return !this.isPassItemMode();
    }

    processCursorMove() {
        if (this.isCursorMovable() ) {
            const lastIndex = this.index();
            if (Input.isRepeated('down')) {
                this.cursorDown(Input.isTriggered('down'));
            }
            if (Input.isRepeated('up')) {
                this.cursorUp(Input.isTriggered('up'));
            }
            if (this.index() !== lastIndex) {
                SoundManager.playCursor();
            }
        }
    }
    isCursorMovable(){
        return !this.isPassItemMode() && super.isCursorMovable();
    }

    /**
     * @return {boolean}
     */
    isPassItemMode() {
        return this._passMode;
    }
    /**
     * @param {boolean} value
     */
    setPassItemMode(value) {
        // if(value){
        //     this._upButton.rotation =1.5708;
        //     this._donwButton.rotation =1.5708;
        // }else{
        //     this._upButton.rotation =0;
        //     this._donwButton.rotation =0;
        // }
        this._passMode = value;
    }
    /**
     * @param {function(number):void} func
     */
    setChangeNumberFunc(func) {
        this._changeNumber = func;
    }
    /**
     * @param {number} number
     */
    changeNumber(number) {
        this._changeNumber(number);
    }
    processNumberChange() {
        if (this.isPassItemMode()) {
            if (Input.isRepeated('right')) {
                this.changeNumber(1);
            }
            if (Input.isRepeated('left')) {
                this.changeNumber(-1);
            }
            if (Input.isRepeated('up')) {
                this.changeNumber(10);
            }
            if (Input.isRepeated('down')) {
                this.changeNumber(-10);
            }
        }
    }
    processHandling() {
        if (this.isOpenAndActive()) {
            if (this.isPassItemMode()) {
                this.processNumberChange();
            }
            super.processHandling();
        }
    }
}


class Window_PocketPreview extends Window_Pocket{


    initialize(x, y, w, h) {
        super.initialize(x,y,w,h);
        this._name = '4ひえた';
    }
    /**
     * @return {String}
     */
    name() {
        return this._name;
    }
    maxItems() {
        if (this._pocket) {
            return this._pocket.length();
        }
        return 0;
    }
    isEnabled() {
        return true;
    }
    /**
     * @param {string} name
     */
    setName(name) {
        this._name = name;
    }
    setMyset(myset) {
        this._name = myset.name;
        this.setPocket(myset.pocket);
    }
}



class Window_MysetCommand extends Window_Command {
    initialize(x, y, w, h) {
        Window_Command.prototype.initialize.apply(this, arguments);
        this.move(x, y, w, h);
    }
    addSaveCommand() {
        this.addCommand(setting.saveMyset, Window_MysetCommand.SYMBOL_SAVE);
    }
    addLoadCommand() {
        this.addCommand(setting.loadMyset, Window_MysetCommand.SYMBOL_LOAD);
    }
    addRenameCommand() {
        this.addCommand(setting.renameMyset, Window_MysetCommand.SYMBOL_RENAME);
    }
    processPageup() {
        super.processPageup();
        this.activate();
    }
    processPagedown() {
        super.processPagedown();
        this.activate();
    }
    makeCommandList() {
        this.addLoadCommand();
        this.addSaveCommand();
        this.addRenameCommand();
    }
}

Window_MysetCommand.SYMBOL_SAVE='save';
Window_MysetCommand.SYMBOL_LOAD='load';
Window_MysetCommand.SYMBOL_RENAME='rename';


class MysetListItem{
    /**
     * @param {String} name 
     * @param {MA_itemPocket} pocket 
     */
    constructor(name,pocket){
        this.name =name;
        this.pocket =pocket;
    }
};

class Window_MysetList extends Window_Selectable {
    initialize(x, y, w, h) {
        this.makeItemList();
        super.initialize(x,y,w,h);
    }
    makeItemList() {
        this._myset = Party_GetPocketMyset($gameParty);
    }
    maxCols() {
        return 2;
    }
    maxItems() {
        return  this._myset.maxItems();
    }
    playOkSound() { }
    updateHelp() {
        const item = this.currentItem();
        if (item) {
            this._helpWindow.setMyset(item);
            this._helpWindow.refresh();
        }
    }
    /**
     * @return {string}
     */
    name() {
//        this._myset.name()
        return this.currentItem().name;
    }
    currentItem() {
        return this._myset.item(this._index);
    }
    /**
     * @return {MA_itemPocket}
     */
    myset() {
        return this.currentItem().pocket;
    }
    /**
     * @param {Number} index
     */
    drawItem(index) {
        const item = this._myset.item(index);
        if (item) {
            const rect = this.itemRect(index);
            this.drawText(item.name, rect.x, rect.y, rect.width);
        }
    }
}



class ModeObject{
    
    static get pocketOk(){return 'pocketOk';}
    static get subPocketOk(){return 'subPocketOk';}
    static get subPocketCancel(){return 'subPocketCancel'}

    static  defaultEnebledJudge(item){
        return !!item;
    }

    constructor(){
        this._table ={};
        this.setEnableJudge(ModeObject.defaultEnebledJudge);
        this.needNullPush =false;
        this.usingSubWindow=false;
    }


    /**
     * 
     * @param {String} key 
     * @param {Function} func 
     */
    setHandler(key,func){
        this._table[key]=func;
    }
    /**
     * @param {String} key 
     */
    callHandler(key){
        const func = this._table[key];
        if(func){
            func.call();
        }else{
            throw new Error(key +':not handling');
        }
    }


    pocketOk(){
        this.callHandler(ModeObject.pocketOk);
    }
    numeberOk(){
        this.callHandler('numberOk');
    }
    actorOk(){
        this.callHandler('actorOk');
    }
    subPocketOk(){
        this.callHandler(ModeObject.subPocketOk);
    }
    subPocketCancel(){
        this.callHandler(ModeObject.subPocketCancel);
    }
    needRefreshOnModeChange(){
        return this._enableJudge !==ModeObject.defaultEnebledJudge;
    }


    numberCancel(){
        this.callHandler('numberCancel');
    }

    start(){
        this.callHandler('start');
    }
    end(){
        this.callHandler('end');
    }
    /**
     * 
     * @param {function(RPG.Item)=>boolean} func 
     */
    setEnableJudge(func){
        this._enableJudge =func;
    }
    /**
     * @return {boolean}
     * @param {RPG.Item} item 
     */
    isItemEnabled(item){
        return this._enableJudge(item);
    };
};

function Window_MysetRenameEdit(){
    this.initialize.apply(this,arguments);    
}
Window_MysetRenameEdit.baseType = Window_NameEdit;
Window_MysetRenameEdit.prototype = Object.create( Window_MysetRenameEdit.baseType.prototype);
Window_MysetRenameEdit.prototype.constructor=Window_MysetRenameEdit;

Window_MysetRenameEdit.prototype.initialize =function(x,y,w,h){
    Window_Base.prototype.initialize.apply(this,arguments);
    this._defaultName ='default';
    this._name ='';
    this._maxLength =10;
    this._index=0;
    this.deactivate();
};

/**
 * @param {string} defaultName
 */
Window_MysetRenameEdit.prototype.setup =function(defaultName){
    this._defaultName =defaultName;
    this._name = defaultName;
    this._index = this._name.length;
};
/**
 * @return {Rectangle}
 * @param {number} index
 */
Window_MysetRenameEdit.prototype.itemRect = function(index) {
    return {
        x: index * this.charWidth(),
        y: this.height/4,
        width: this.charWidth(),
        height: this.lineHeight()
    };
};
Window_MysetRenameEdit.prototype.drawActorFace=function(){};

Window_MysetRenameEdit.prototype.underlineColor =function(){
    return this.normalColor();
};

class Window_AddItem extends Window_ItemList{
    initialize(x, y, w, h) {
        
        Window_ItemList.prototype.initialize.apply(this, arguments);
        this._category = 'item';
        this.setEnabledFunc(function (item) {
            return true;
        });
    }
    //外部テーブルと連携する
    /**
     * @param {RPG.Item} item 
     */
    isEnabled(item) {
        return (!!item) && this._enableJudge(item);
    }
    /**
     * @param {function(RPG.Item)=>boolean} func
     */
    setEnabledFunc(func) {
        this._enableJudge = func;
    }
    makeItemList() {
        this._data = $gameParty.items().filter(MA_itemPocket.canPutInPocket);
    }
    deselect() {
        this.updateHelp();
        super.deselect();
    }
    updateHelp() {
        this.setHelpWindowItem(this.item());
    }
}

/**
 * @member {RPG.Item} item
 */
class PocketTemporary{
    /**
     * @param {Game_Actor} actor
     */
    constructor(actor){
        this.destoryReservation=false;
        this._totalWeight=Number.NaN;
        this.pocketIndex =null;
        this.actor =actor;
        this._pocket = actor.itemPocket();
        this.item =null;
        this.setupPassParam(Number.NaN,Number.NaN);
    }
    /**
     * @param {number} index 
     * @param {number} amount 直前の所持数
     */
    setupPassParam(index,amount){
        this.passIndex=index;
        this.preAmount =amount
    }


    /**
     * @return {number}
     */
    totalWeight(){
        if(!this._totalWeight){
            this._totalWeight = this.pocket().weightSum();
        }
        return this._totalWeight;
    }
    refresh(){
        if(this.destoryReservation){
            this.pocketIndex =null;
            this.destoryReservation=false;
        }
    }
    /**
     * @return {MA_itemPocket}
     */
    pocket(){
        return this._pocket;
//        return this.actor.itemPocket();
    }
    /**
     * @return {PocketIndex}
     */
    indexTable(){
        if(!this.pocketIndex){
            this.pocketIndex = new PocketIndex(this.pocket().array());
        }
        return this.pocketIndex;
    }

    /**
     * @param {RPG.Item} item 
     */
    canAdd(item){
        //重さチェックが不要なら、下の&&以下を消す
        return this.indexTable().canAdd(item) 
        && this.canAddWithWeight(item);
    }
    /**
     * @param {RPG.Item} item
     */
    canAddWithWeight(item){
        if(!setting.usingWeight){
            return true;
        }
        return this.remainingWeight() >=MA_itemPocket.weight(item);
    }
    needWeightReset(){
        this._totalWeight =Number.NaN;
    }


    /**
     * @return {number}
     * @param {RPG.Item} item 
     */
    capacity(item){

    }
    /**
     * @param {RPG.Item} item 
     * @param {number} amount 
     */
    addItem(item,amount){
        this.indexTable().addItem(item,amount);
        this._totalWeight = Number.NaN;
        this.totalWeight();
    }

    /**
     * @return {number} 残り重量
     */
    remainingWeight(){
        return this.actor.pocketWeightCapacity()-this.totalWeight();
    }
    /**
     * @param {number} index 
     * @param {number} amount 
     */
    releaseItem(index,amount){
        const pocket = this.pocket();
        pocket.releaseItem(index,amount);
        if(pocket.amount(index)<=0){
            this.destoryReservation =true;
        }
        pocket.normalize();
    }
    /**
     * @param {number} index 
     * @param {number} amount 
     */
    loseItem(index,amount){
 //       console.log("index:"+index +" amount:"+amount);
        this.pocket().loseItem(index,amount);
    }
}


class Scene_ItemPocket extends Scene_ItemBase {
    initialize() {
        super.initialize();
        this._mode = null;
        this._itemUser = null;
        this._modeTable = {};
        this._pocketTemporary = [];
        this.createModeObjects();
    }

    /**
     * @param {Game_Actor} actor
     * @return {PocketTemporary}
     */
    pocketTemporary(actor) {
        const actorId = actor.actorId();
        if (!this._pocketTemporary[actorId]) {
            this._pocketTemporary[actorId] = new PocketTemporary(actor);
        }
        return this._pocketTemporary[actorId];
    }
    refreshWeight() {
        if (setting.usingWeight) {
            const tmp = this.pocketTemporary(this.actor());
            tmp.needWeightReset();
        }
    }
    /**
     * @param {Game_Actor} actor
     * @return {PocketIndex}
     */
    pocketIndex(actor) {
        const id = actor._actorId;
        var tmp = this.pocketTemporary(actor);
        if (!tmp.pocketIndex) {
            tmp.pocketIndex = actor.itemPocket().createIndexTable();
        }
        return tmp.pocketIndex;
    }
    /**
     * @param {Game_Actor} actor
     */
    reserveDestoryIndex(actor) {
        const tmp = this.pocketTemporary(actor);
        tmp.destoryReservation = true;
    }
    destoryPocketIndex() {
        const len = this._pocketTemporary.length;
        for (var i = 0; i < len; i += 1) {
            if (this._pocketTemporary[i]) {
                this._pocketTemporary[i].refresh();
            }
        }
    }
    isUsingMyset() {
        return setting.usingMyset;
    }
    createAllWindow() {
        this.createHelpWindow();
        this.createNameEditWindow();
        this.createNameInputWindow();
        this.createModeSelectWindow();
        this.createPocketWindow();
        this.createPocketPreviewWindow();
        this.createSubPocketWindow();
        this.createItemSelectWindow();
        this.createActorWindow();
        this.createNumberWindow();
        this.createMysetCommandWindow();
        this.createMysetListWindow();
        this.addNameWindows();

        this.derayInitWindow();
    }
    derayInitWindow(){
        this._pocketWindow.setEnableJudge(this.isItemEnabled.bind(this));
        this._pocketWindow.refresh();
    }
    create() {
        actorSetPocket();
        super.create();
        this.createAllWindow();
        this._modeSelectWindow.activate();
        this._modeSelectWindow.select(0);
    }
    /**
     * @return {Rectangle}
     */
    subWindowRect() {
        return new Rectangle(Graphics.boxWidth / 2, this._modeSelectWindow.y + this._modeSelectWindow.height, setting.pocketWindow.w(), this._pocketWindow.height);
    }
    /**
     * @param {RPG.Item} item
     * @return {boolean}
     */
    canAddItem(item) {
        if (!item) {
            return false;
        }
        return this.pocketTemporary(this.actor()).canAdd(item);
    }
    totalWeight() {
        return this.pocketTemporary(this.actor()).totalWeight();
    }
    /**
     * @param {Game_Actor} actor
     * @param {RPG.Item} item
     * @return {number}
     */
    itemCapacity(actor, item) {
        return this.pocketTemporary(actor).indexTable().capacity(item);
    }
    /**
     * @param {Game_Actor} actor
     * @param {RPG.Item} item
     * @return {number}
     */
    weightCapacity(actor, item) {
        const itemWeight = MA_itemPocket.weight(item);
        const remainingWeight = this.pocketTemporary(actor).remainingWeight();
        if (itemWeight === 0) {
            return Number.MAX_SAFE_INTEGER;
        }
        return Math.round(remainingWeight / itemWeight);
    }
    /**
     * @param {Game_Actor} actor
     * @param {RPG.Item} item
     * @return {number}
     */
    finalCapacity(actor, item) {
        return Math.min(this.itemCapacity(actor, item), $gameParty.numItems(item));
    }
    /**
     * @param {Game_Actor} actor
     * @param {RPG.Item} item
     * @return {number}
     */
    finalCapacityWithWeight(actor, item) {
        return Math.min(this.itemCapacity(actor, item), $gameParty.numItems(item), this.weightCapacity(actor, item));
    }
    /**
     * @return {String}
     */
    editingName() {
        return this._nameEditWindow.name();
    }
    /**
     * @return {RPG.Item}
     * アイテムウィンドウで選択されているアイテムを返す
     */
    item() {
        return this._itemWindow.item();
    }
    /**
     * @return {MA_itemPocket}
     */
    pocket() {
        return this._pocketWindow.pocket();
    }
    /**
     * @return {Game_Actor}
     */
    actor() {

        return this._actor;
    }
    onAddItemOk() {
        const item = this._itemWindow.item();
        this.addItem(item);
        this.setHelpText(this.selectAmountHelp());
    }
    /**
     * @return {Rectangle}
     */
    listWindowRect() {
        const wy = this._pocketWindow.y + this.smallPocketHegiht();
        return new Rectangle(0, wy, Graphics.boxWidth, Graphics.boxHeight - wy);
    }
    createItemSelectWindow() {
        const wx = 0;
        const wy = this._pocketWindow.y + this.smallPocketHegiht();
        const ww = Graphics.boxWidth;
        const wh = Graphics.boxHeight - wy;
        const rect = this.listWindowRect();
        const iw = new Window_AddItem(rect.x, rect.y, rect.width, rect.height);
        iw.setEnabledFunc(this.canAddItem.bind(this));
        iw.setHandler('cancel', this.onItemCancel.bind(this));
        iw.setHandler('ok', this.onAddItemOk.bind(this));
        iw.setCategory('item');
        iw.setHelpWindow(this._helpWindow);
        iw.makeItemList();
        iw.refresh();
        iw.openness = 0;
        this._itemWindow = iw;
        this.addWindow(iw);
    }
    openSelectWindow() {
        this._pocketWindow.height = this.smallPocketHegiht();
        this._pocketWindow.refresh();
    }
    closeSelectWindow() {
        this._pocketWindow.height = this.defaultPocketHeight();
        this._pocketWindow.refresh();
    }
    /**
     * @param {RPG.Item} item
     */
    setupCapacityNumber(item) {
        const capacity = this.finalCapacity(this.actor(), item);
        this._numberWindow.setup(item, capacity, 1);
        this._numberWindow.refresh();
        this._numberWindow.activate();
        this.setHelpText(setting.numberSelectHelp);
    }
    createNumberWindow() {
        const rect = this.subWindowRect();
        const num = new Window_PocketNumber(rect.x, rect.y, rect.width, this.smallPocketHegiht());
        this._numberWindow = num;
        num.setHandler('cancel', this.onNumberCancel.bind(this));
        num.setHandler('ok', this.onNumberOk.bind(this));
        num.openness = 0;
        this.addWindow(num);
    }
    /**
     * @desc value from numberWindow
     * @return {Number}
     */
    number() {
        return this._numberWindow.number();
    }
    openNumberWindow() {
        this._numberWindow.open();
        this._numberWindow.setup(null, 0);
        this._numberWindow.clear();
    }
    onNumberOk() {
        const mode = this.currentModeObject();
        mode.numeberOk();
        this._numberWindow.clear();
    }
    onNumberCancel() {
        const mode = this.currentModeObject();
        mode.numberCancel();
    }
    startAddMode() {
        this.openItemWindow();
        this.openNumberWindow();
        this._itemWindow.refresh();
        this._numberWindow.setPrevWindow(this._itemWindow);
        this.pocketIndex(this.actor());
    }
    endAddMode() {
        this.closeItemWindow();
        this._itemWindow.deselect();
        this._numberWindow.setPrevWindow(null);
        this._numberWindow.close();
        this._modeSelectWindow.activate();
        this._pocketWindow.height = this.defaultPocketHeight();
        this._pocketWindow.refresh();
    }
    /**
     * @param {RPG.Item} item
     */
    addItem(item) {
        this.setupCapacityNumber(item);
        this.addItemSelectIndex(item);
    }
    addItemSelectIndex(item) {
        const index = this._pocketWindow.indexOf(item);
        this._pocketWindow.select(index);
    }
    executeAddItem() {
        const tmp = this.pocketTemporary(this.actor());
        const table = this.pocketIndex(this.actor());
        const item = this._itemWindow.item();
        const amount = this._numberWindow.number();
        tmp.addItem(item, amount);
        $gameParty.loseItem(item, amount);
        this.refreshWeight();
        this._pocketWindow.refresh();
        if ($gameParty.numItems(item) > 0) {
            this._itemWindow.redrawItem(this._itemWindow.index());
        } else {
            this._itemWindow.refresh();
        }
        this._numberWindow.clear();
        this._pocketWindow.deselect();
        this._itemWindow.activate();
    }
    modeAddNumberCancel() {
        this._pocketWindow.deselect();
        this._numberWindow.clear();
        this._itemWindow.activate();
    }
    startRemoveMode() {
        this._pocketWindow.activate();
        this._pocketWindow.select(0);
        this._numberWindow.setPrevWindow(this._pocketWindow);
        this.openNumberWindow();
        this.openSelectWindow();
        this._itemWindow.open();
        //    this.openItemWindow();
    }
    endRemoveMode() {
        this.closeItemWindow();
        this._pocketWindow.deselect();
        this._numberWindow.close();
    }
    executeRemoveItem() {
        const index = this._pocketWindow.index();
        const amount = this._numberWindow.number();
        const tmp = this.pocketTemporary(this.actor());
        tmp.releaseItem(index, amount);
        this.refreshWeight();
        this._pocketWindow.selectionNormalize();
        this._pocketWindow.refresh();
        this._itemWindow.refresh();
        this._pocketWindow.activate();
    }
    modeRemoveNumberCancel() {
        this._numberWindow.clear();
        this._pocketWindow.activate();
    }
    /**
     * @param {RPG.Item} item
     * @return {boolean}
     */
    isRemoveabelItem(item) {
        return !!item;
    }
    removeItem() {
        const item = this._pocketWindow.item();
        const amount = this._pocketWindow.amount();
        this._numberWindow.setup(item, amount);
        this._numberWindow.refresh();
        this._numberWindow.activate();
        this.setHelpText(setting.numberSelectHelp);
    }
    /**
     * @param {RPG.Item} item
     * @return {Boolean}
     */
    isItemEnabled(item) {
        if(this._pocketWindow.actor()===this._pocketWindow2.actor()){
            return false
        }
        const mode = this.currentModeObject();
        return mode.isItemEnabled(item);
    }
    startPassMode() {
        this._pocketWindow.activate();
        this._pocketWindow.select(0);
        this.selectSubPocketActor();
        this.openSubPocketWindow();
    }
    endPassMode() {
        this.closeSubPocketWindow();

    }
    /**
     * @param {number} amount
     */
    executePassItem(amount) {
        if (amount > 0) {
            this.executePassItemImple(amount, this._pocketWindow, this._pocketWindow2);
        }else if (amount < 0) {
            this.executePassItemImple(-amount, this._pocketWindow2, this._pocketWindow);
        }
    }
    /**
     * @param {Number} amount
     * @param {Window_Pocket} senderWindow
     * @param {Window_Pocket} receiverWindow
     */
    executePassItemImple(amount, senderWindow, receiverWindow) {
        const finalAmount = passFinalAmount(senderWindow.amount(), amount, receiverWindow.capacity());
        if (finalAmount <= 0) {
            return false;
        }
        const item = senderWindow.itemObject();
        const sender = senderWindow.pocket();
        const receiver = receiverWindow.pocket();
        sender.loseItem(item, finalAmount);
        receiver.addItem(item, finalAmount);
        senderWindow.refresh();
        receiverWindow.refresh();
        SoundManager.playCursor();
        return true;
    }
    /**
     * @param {Window_Pocket} pocketWindow
     */
    saveUndoPass(pocketWindow) {
        const tmp = this.pocketTemporary(pocketWindow.actor());
        const i = pocketWindow.index();
        const a = pocketWindow.amount();
        tmp.setupPassParam(i, a);
    }
    /**
     * @param {Window_Pocket} pocketWindow
     */
    undoPass(pocketWindow) {
        const item = pocketWindow.itemObject(); //item();
        if (item) {
            const tmp = this.pocketTemporary(pocketWindow.actor());
            const pocket = pocketWindow.pocket();
            const index = pocketWindow.index();
            pocket.setData(index, item, tmp.preAmount);
            if (tmp.preAmount <= 0) {
                pocket.array().length -= 1;
            }
            tmp.preAmount = 0;
            pocketWindow.redrawItem(index);
        }
    }
    passItemCancel() {
        if (this._pocketWindow2.isPassItemMode()) {
            this.undoPass(this._pocketWindow);
            this.undoPass(this._pocketWindow2);
            this._pocketWindow2.setPassItemMode(false);
        }
        else {
            this;
        }
        this._pocketWindow.activate();
        this._pocketWindow2.deselect();
        this.passItemResetLock();
    }
    /**
     * @param {Window_Pocket} pocketWindow
     */
    pocketNormalize(pocketWindow) {
        pocketWindow.pocket().normalize();
        pocketWindow.refresh();
    }
    passItemSuccess() {
        this._pocketWindow.pocket().normalize();
        this._pocketWindow.refresh();
        this._pocketWindow2.pocket().normalize();
        this._pocketWindow2.refresh();
        const tmp1 = this.pocketTemporary(this._pocketWindow.actor()); //.setupPassParam(Number.NaN,Number.NaN);
        const tmp2 = this.pocketTemporary(this._pocketWindow2.actor()); //.setupPassParam(Number.NaN,Number.NaN);
        tmp1.preAmount = 0;
        tmp2.preAmount = 0;
        this._pocketWindow2.setPassItemMode(false);
        this._pocketWindow2.deselect();
        this._pocketWindow2.deactivate();
        this._pocketWindow.activate();
        if (!this._pocketWindow.item()) {
            this._pocketWindow.selectBack();
        }
        this.passItemResetLock();
    }
    /**
     * @param {RPG.Item} item 
     * @param {Number} max 
     */
    defaultPassAmount(item,max){
        return 1;
    }
    passItemResetLock(){
        this._pocketWindow2.setPassItemMode(false);
        this._pocketWindow.setActorLock(false);
    }
    selectAmountHelp(){
        return setting.numberSelectHelp;
    }
    passItemSelectAmount() {
        const item = this._pocketWindow.item();
        if (item) {
            this._pocketWindow2.selectOfItem(item, this._pocketWindow2.maxItems());
        } else {
            this._pocketWindow2.select(0);
        }
        this._pocketWindow2.setCursorFixed(true);
        this._pocketWindow2.activate();
        this._pocketWindow2.setPassItemMode(true);
        this.saveUndoPass(this._pocketWindow);
        this.saveUndoPass(this._pocketWindow2);
        
        this.setHelpText(this.selectAmountHelp());
        this.firtsPass();
    }
    firtsPass(){
        const item = this._pocketWindow.item();
        const amountMax = this._pocketWindow.amount();
        const amount =this.defaultPassAmount(item,amountMax);
        this.executePassItem(amount);
    }
    passItem() {
        this._pocketWindow.setActorLock(true);
        this.passItemSelectAmount();
    }
    selectSubPocketActor() {
        const mainActor = this._pocketWindow.actor();

        const subActor= getNextActor(mainActor,mainActor);
        this._pocketWindow2.setActor(subActor);
        this._pocketWindow2.setMainActor(mainActor);
        this._pocketWindow2.refresh();
    }
    startSwapMode() {
        this.selectSubPocketActor();
        this.subPocketWindowSetActor($gameParty.menuActor());
        this._pocketWindow.setLastNull(true);
        this._pocketWindow.activate();
        this._pocketWindow.select(0);
    }
    endSwapMode() {
        $gameParty.setMenuActor(this._pocketWindow.actor());
        this._actor = this._pocketWindow.actor();
        this._pocketWindow.deselect();
        this.closeSubPocketWindow();
    }
    openSubPocketWindow() {
        this._pocketWindow2.open();
    }
    closeSubPocketWindow() {
        this._pocketWindow2.close();
    }
    swapSelectSecond() {
        const item = this._pocketWindow.item();
        const itemIsEmpty = this._pocketWindow.itemAsNull();
        this._pocketWindow2.activate();
        this._pocketWindow2.setCursorFixed(false);
        this._pocketWindow2.setLastNull(!itemIsEmpty);
        if (itemIsEmpty) {
            this._pocketWindow2.select(0);
            return;
        }
        //TODO:ここで、actor1のアイテムを選択させて固定。
        const index = this._pocketWindow2.indexOf(item);
        if (index === -1) {
            this._pocketWindow2.selectBack();
        }
        else {
            this._pocketWindow2.select(index);
            this._pocketWindow2.setCursorFixed(true);
        }
    }
    executeSwap() {
        const pocket1 = this._pocketWindow.pocket();
        const pocket2 = this._pocketWindow2.pocket();
        const isSelectBack = !this._pocketWindow.itemAsNull();
        pocket1.swapItem(pocket2, this._pocketWindow.index(), this._pocketWindow2.index());
        pocket1.normalize();
        pocket2.normalize();
        if ((!pocket2.front()) || isSelectBack) {
            this._pocketWindow.select(0);
        }
        else {
            this._pocketWindow.selectBack();
        }
        this._pocketWindow2.deselect();
        this._pocketWindow.refresh();
        this._pocketWindow2.refresh();
        this.reserveDestoryIndex(this._pocketWindow.actor());
        this.reserveDestoryIndex(this._pocketWindow2.actor());
        this._pocketWindow.activate();
    }
    startItemUseMode() {
        this._pocketWindow.activate();
        this._pocketWindow.select(0);
        this._pocketWindow.refresh();
    }
    endItemUseMode() {
        this._pocketWindow.deselect();
        this._modeSelectWindow.activate();
    }
    /**
     * @param {RPG.Item} item
     */
    isUseableItem(item) {
        //戦闘中限定のチェックを行う
        return !!item && itemOccasionOk(item);
    }
    /**
     * @param {RPG.Item} item
     */
    itemScopeForAll(item) {
        return [2, 8, 10].contains(item.scope);
    }
    useItem() {
        const item = this._pocketWindow.item();
        if (item) {
            this._actorWindow.select(0);
            this.actorSetCursorAll(this.itemScopeForAll(item));
            this.openActorWindow();
            this._actorWindow.activate();
        }
    }
    /**
     * @return {Game_Actor[]}
     */
    allMembers() {
        return $gameParty.members();
    }
    /**
     * @param {RPG.Item} item
     * @return {Game_Actor[]}
     */
    makeItemTargets(item) {
        if (this.itemScopeForAll(item)) {
            return this.allMembers();
        }
        const index = this._actorWindow.index();
        if (index >= 0) {
            return [$gameParty.members()[index]];
        }
        return [];
    }
    /**
     * @private
     * @param {Game_Action} action
     * @param {Game_Actor[]} targets
     * @return {boolean}
     */
    isValidTargets(action, targets) {
        for (const battler of targets) {
            if (action.testApply(battler)) {
                return true;
            }
        }
        return false;
    }
    /**
     * @param {Game_Action} action
     * @param {Game_Actor[]} targets
     */
    executeAction(action, targets) {

        for (const actor of targets) {
            const repeat = action.numRepeats();
            for (var i = 0; i < repeat; i += 1) {
                action.apply(actor);
            }            
        }
        action.applyGlobal();
        this.checkGameover();
        this._actorWindow.refresh();
        this._itemUsed = true;
        this.playUseItem();
    }
    playBuzzer() {
        SoundManager.playBuzzer();
    }
    playUseItem() {
        SoundManager.playUseItem();
    }
    executeUseItem() {
        const pocket = this.pocket();
        const index = this._pocketWindow.index();
        const item = pocket.item(index);
        if (pocket.canUse(index)) {
            const user = this.user();
            const action = new Game_Action(user, false);
            action.setItemObject(item);
            const targets = this.makeItemTargets(item);
            if (this.isValidTargets(action, targets)) {
                this.executeAction(action, targets);
                pocket.consumeItem(index);
                if (pocket.amount(index) <= 0) {
                    this.reserveDestoryIndex(this.actor());
                }
                //アイテムの使用に成功したので、失敗音を鳴らさずに離脱
                return;
            }
            //TODO:描き途中
        }
        this.playBuzzer();
    }
    startMysetMode() {
        this.openSelectWindow();
        this._windowMysetCommand.activate();
        this._windowMysetCommand.open();
        this._windowMysetCommand.select(0);
        this._mysetListWindow.refresh();
        this._mysetListWindow.open();
    }
    endMysetMode() {
        this.closeSelectWindow();
        this._windowMysetCommand.deselect();
        this._windowMysetCommand.close();
        this._modeSelectWindow.activate();
        this._mysetListWindow.close();
        this._pocketWindow.show();
        this._pocketPreviewWindow.hide();
    }
    onMysetListCancel() {
        this._mysetListWindow.deselect();
        this._windowMysetCommand.activate();
        this._pocketWindow.show();
        this._pocketPreviewWindow.hide();
        this._helpWindow.clear();
    }
    onMysetListOk() {
        const s = this._windowMysetCommand.currentSymbol()[0];
        switch (s) {
            case Window_MysetCommand.SYMBOL_LOAD[0]:
                this.executeLoadMyset();
                break;
            case Window_MysetCommand.SYMBOL_SAVE[0]:
                this.executeSaveMyset();
                break;
            case Window_MysetCommand.SYMBOL_RENAME[0]:
                this.startRename();
                break;
        }
    }
    loadMyset() {
        this._mysetListWindow.activate();
        this._mysetListWindow.select(0);
        this.setHelpText(this.loadMysetText());
    }
    endLoadMyset() {
        this.mysetExecuteSucces();
    }
    mysetShowMissingList(missingList) {
        this.endLoadMyset();
    }
    executeLoadMyset() {
        const actor = this.actor();
        const myset = this._mysetListWindow.myset();
        const pocket = actor.itemPocket();
        const missingList = pocket.loadMyset(myset);
        this._pocketWindow.refresh();
        if (missingList.length > 0) {
            this.mysetShowMissingList(missingList);
        }else {
            this.endLoadMyset();
        }
        this.playLoadMysetSound();
    }
    playLoadMysetSound() {
        SoundManager.playEquip();
    }
    playSaveMysetSound() {
        SoundManager.playSave();
    }
    executeSaveMyset() {
        const index = this._mysetListWindow.index();
        const pocket = this.pocket();
        $gameParty.saveMyset(index, pocket);
        this._pocketPreviewWindow.setPocket($gameParty.getPocketMyset(index).pocket);
        this._pocketPreviewWindow.refresh();
        this.playSaveMysetSound();
        this.mysetExecuteSucces();
        this._helpWindow.clear();
    }
    selectMysetList() {
        this._mysetListWindow.activate();
    }
    saveMysetText() {
        return setting.saveMysetHelp;
    }
    loadMysetText() {
        return setting.loadMysetHelp;
    }
    saveMyset() {
        this.setHelpText(this.saveMysetText());
        this._mysetListWindow.activate();
        this._mysetListWindow.select(0);
    }
    renameMyset() {
        this._mysetListWindow.activate();
        this._mysetListWindow.select(0);
    }
    executeRenameMyset() {
        const name = this.editingName();
        const index = this._mysetListWindow.index();
        if (name !== '') {
            $gameParty.renameMyset(index, name);
            this._mysetListWindow.redrawItem(index);
        }
    }
    startRename() {
        const name = this._mysetListWindow.name();
        this._nameEditWindow.setup(name);
        this._nameEditWindow.refresh();
        this._nameEditWindow.show();
        this._nameInputWindow.show();
        this._nameInputWindow.activate();
    }
    endRename() {
        this._windowMysetCommand.activate();
        this._mysetListWindow.deselect();
        this._nameEditWindow.hide();
        this._nameInputWindow.hide();
        this._nameInputWindow.deactivate();
    }
    onNameEditCancel() {
        //    this.actor().mhp
    }
    onNameEditOk() {
        this.executeRenameMyset();
        this.endRename();
    }
    onMysetCommandCancel() {
        this.endMysetMode();
    }
    mysetExecuteSucces() {
        this._mysetListWindow.deactivate();
        this._mysetListWindow.deselect();
        this._windowMysetCommand.activate();
        this._pocketPreviewWindow.hide();
        this._pocketWindow.show();
    }
    onMysetCommandOk() {
        const s = this._windowMysetCommand.currentSymbol()[0];
        this._pocketWindow.hide();
        this._pocketPreviewWindow.show();
        switch (s) {
            case Window_MysetCommand.SYMBOL_LOAD[0]:
                this.loadMyset();
                break;
            case Window_MysetCommand.SYMBOL_SAVE[0]:
                this.saveMyset();
                break;
            case Window_MysetCommand.SYMBOL_RENAME[0]:
                this.renameMyset();
                break;
        }
    }
    sortPreview() {
        const pocket = this.pocket().clone();
        pocket.sort(idUpper);
    }
    startSortMode() {
    }
    createModeSelectMode() {
        const mode = new ModeObject();
        this._nullMode = mode;
        this._mode = mode;
    }
    // TODO:あとでこっちのモードに切り替える
    createAddMode() {
        const mode = new ModeObject();
        mode.setHandler('start', this.startAddMode.bind(this));
        mode.setHandler('end', this.endAddMode.bind(this));
        mode.setHandler('numberOk', this.executeAddItem.bind(this));
        mode.setHandler('numberCancel', this.modeAddNumberCancel.bind(this));
        this._modeTable[setting.symbolAdd] = mode;
    }
    createSwapMode() {
        const mode = new ModeObject();
        mode.setHandler('start', this.startSwapMode.bind(this));
        mode.setHandler('end', this.endSwapMode.bind(this));
        mode.setHandler('pocketOk', this.swapSelectSecond.bind(this));
        mode.setHandler(ModeObject.subPocketCancel, this.cancelSwap.bind(this));
        mode.setHandler(ModeObject.subPocketOk, this.executeSwap.bind(this));
        mode.setEnableJudge(function (item) { return true; });
        mode.needNullPush = true;
        mode.usingSubWindow = true;
        this._modeTable[setting.symbolSwap] = mode;
    }
    createRemoveMode() {
        const mode = new ModeObject();
        mode.setHandler('start', this.startRemoveMode.bind(this));
        mode.setHandler('end', this.endRemoveMode.bind(this));
        mode.setHandler('numberOk', this.executeRemoveItem.bind(this));
        mode.setHandler('numberCancel', this.modeRemoveNumberCancel.bind(this));
        mode.setHandler('pocketOk', this.removeItem.bind(this));
        mode.setEnableJudge(this.isRemoveabelItem.bind(this));
        this._modeTable[setting.symbolRemove] = mode;
    }
    createModeUse() {
        const mode = new ModeObject();
        mode.setHandler('start', this.startItemUseMode.bind(this));
        mode.setHandler('end', this.endItemUseMode.bind(this));
        mode.setHandler('pocketOk', this.useItem.bind(this));
        mode.setHandler('actorOk', this.executeUseItem.bind(this));
        mode.setEnableJudge(this.isUseableItem.bind(this));
        // mode.needDestoryIndex =true;
        this._modeTable[setting.symbolUse] = mode;
        //    this._modeSelectWindow.addCommand(xxx.worduse,addMode);
    }
    createModeMyset() {
        const mode = new ModeObject();
        mode.setHandler('start', this.startMysetMode.bind(this));
        mode.setHandler('end', this.endMysetMode.bind(this));
        this._modeTable[setting.symbolMyset] = mode;
    }

    createModePass() {
        const mode = new ModeObject();
        mode.setHandler('start', this.startPassMode.bind(this));
        mode.setHandler('end', this.endPassMode.bind(this));
        mode.setHandler('pocketOk', this.passItem.bind(this));
        mode.setHandler(ModeObject.subPocketCancel, this.passItemCancel.bind(this));
        mode.setHandler(ModeObject.subPocketOk, this.passItemSuccess.bind(this));
        mode.setEnableJudge(isPassableItem);
        //    mode.needNullPush=true;
        mode.usingSubWindow = true;
        this._modeTable[setting.symbolPass] = mode;
    }
    // //TODO:こっちの方が新しい　あとでこっちに切り替え
    // // 並びをユーザーで制御できるようにする
    createModeObjects() {
        this.createModeSelectMode();
        this.createModeUse();
        this.createModePass();
        this.createAddMode();
        this.createSwapMode();
        this.createRemoveMode();
        this.createModeMyset();
    }
    createModeSelectWindow() {
        const a = new Window_PocketModeSelect_V2(0, this._helpWindow.y + this._helpWindow.height);
        this._modeSelectWindow = a;
        a.setHelpWindow(this._helpWindow);
        a.setHandler('cancel', this.onModeCancel.bind(this));
        a.setHandler('ok', this.onModeOk.bind(this));
        a.setHandler('pagedown', this.nextActor.bind(this));
        a.setHandler('pageup', this.previousActor.bind(this));
        this.addWindow(a);
        a.refresh();
    }
    createYesNoWindow() {
    }
    createMysetListWindow() {
        if (!this.isUsingMyset()) {
            return;
        }
        const rect = this.listWindowRect();
        const mlw = new Window_MysetList(rect.x, rect.y, rect.width, rect.height);
        mlw.setHandler('cancel', this.onMysetListCancel.bind(this));
        mlw.setHandler('ok', this.onMysetListOk.bind(this));
        mlw.setHelpWindow(this._pocketPreviewWindow);
        this._mysetListWindow = mlw;
        mlw.openness = 0;
        this.addWindow(mlw);
    }
    createMysetCommandWindow() {
        if (!this.isUsingMyset()) {
            return;
        }
        const rect = this.subWindowRect();
        const wh = this.smallPocketHegiht();
        const mw = new Window_MysetCommand(rect.x, rect.y, rect.width, wh);
        mw.setHandler('ok', this.onMysetCommandOk.bind(this));
        mw.setHandler('cancel', this.onMysetCommandCancel.bind(this));
        mw.setHandler('pageup', this.nextActor.bind(this));
        mw.setHandler('pagedown', this.previousActor.bind(this));
        mw.refresh();
        mw.deactivate();
        mw.deselect();
        mw.openness = 0;
        this._windowMysetCommand = mw;
        this.addWindow(mw);
    }


    subWindowNextActor(){
        if(this._pocketWindow2.isOpen()){
            this._pocketWindow2.processButtonDown();
        }
        this._pocketWindow.refresh();
    }
    subWindowPrevActor(){
        if(this._pocketWindow2.isOpen()){
            this._pocketWindow2.processButtonUp();
        }
        this._pocketWindow.refresh();
    }

    createPocketWindow() {
        const rect = this.pocketWindowRect();
        const window = new Window_Pocket(rect.x, rect.y, rect.width, rect.height);
        window.setHandler('cancel', this.onPocketCancel.bind(this));
        window.setHandler('ok', this.onPocketOk.bind(this));
        window.setHandler('pageup',this.subWindowPrevActor.bind(this));
        window.setHandler('pagedown',this.subWindowNextActor.bind(this));
        window.setHelpWindow(this._helpWindow);
        this.addWindow(window);
        this._pocketWindow = window;
        this._pocketWindow.setActor(this.actor());
    }
    createSubPocketWindow() {
        const w = this.subWindowRect();
        var aie = new Window_PocketSub(w.x, w.y, w.width, w.height);
        this._pocketWindow2 = aie;
        aie.setEnableJudge(this.isItemEnabled.bind(this));
        aie.setHandler('cancel', this.onSubPocketWidnowCancel.bind(this));
        aie.setHandler('ok', this.onSubPocketWindowOk.bind(this));
        aie.setChangeNumberFunc(this.executePassItem.bind(this));
        aie.setHelpWindow(this._helpWindow);
        aie.openness = 0;
        this.addWindow(aie);
    }
    createNameEditWindow() {
        const wx = this._helpWindow.x;
        const wy = this._helpWindow.y;
        const ww = this._helpWindow.width;
        const wh = this._helpWindow.height;
        var edit = new Window_MysetRenameEdit(wx, wy, ww, wh);
        //    edit.setHandler('ok',this.onNameEditOk.bind(this));
        edit.hide();
        this._nameEditWindow = edit;
    }
    createNameInputWindow() {
        const input = new Window_NameInput(this._nameEditWindow);
        input.y = this._nameEditWindow.y + this._nameEditWindow.height;
        var aaa = 300;
        input.width = input.width - aaa;
        input.x = aaa;
        input.hide();
        input.deactivate();
        input.setHandler('ok', this.onNameEditOk.bind(this));
        this._nameInputWindow = input;
    }
    addNameWindows() {
        this.addWindow(this._nameEditWindow);
        this.addWindow(this._nameInputWindow);
    }
    cancelSwap() {
        this._pocketWindow2.deselect();
        this._pocketWindow.activate();
    }
    /**
     * @param {Game_Actor} actor
     */
    subPocketWindowSetActor(actor) {
        this._pocketWindow2.setActor(actor);
        this._pocketWindow2.refresh();
    }
    onPocketOk() {
        const mode = this.currentModeObject();
        mode.pocketOk();
    }
    onPocketCancel() {
        this.endMode();
    }
    onSubPocketWidnowCancel() {
        const mode = this.currentModeObject();
        mode.subPocketCancel();
    }
    onSubPocketWindowOk() {
        this.currentModeObject().subPocketOk();
    }
    onSubPocketWindowChangeActor() {

//        const mode = this.currentModeObject();
        this.subPocketWindowSetActor($gameParty.menuActor());
    }
    canSubPocketChangeActor() {
        return $gameParty.size() > 2;
    }
    //この辺りは仕様が決まらない
    onSubWindowPageup() {
        //if(this.canSubPocketChangeActor())
        {
            $gameParty.makeMenuActorPrevious();
            this.onSubPocketWindowChangeActor();
        }
    }
    onSubWindowPagedown() {
        //if(this.canSubPocketChangeActor())
        {
            $gameParty.makeMenuActorNext();
            this.onSubPocketWindowChangeActor();
        }
    }
    defaultPocketHeight() {
        return Graphics.boxHeight - this._modeSelectWindow.y - this._modeSelectWindow.height;
    }
    smallPocketHegiht() {
        return this._nameInputWindow.height - this._modeSelectWindow.height;
    }
    createPocketPreviewWindow() {
        const rect = this.pocketWindowRect();
        const ppw = new Window_PocketPreview(rect.x, rect.y, rect.width, this.smallPocketHegiht());
        ppw.hide();
        this._pocketPreviewWindow = ppw;
        this.addWindow(this._pocketPreviewWindow);
    }
    // /**
    //  * @return {Rectangle}
    //  */
    pocketWindowRect() {
        return new Rectangle(0, this._modeSelectWindow.y + this._modeSelectWindow.height, setting.pocketWindow.w(), this.defaultPocketHeight());
    }
    defaultActorChange() {
        this._pocketWindow.setActor(this.actor());
        this._pocketWindow.refresh();
    }



    nextActorByMain(){
        this.nextActor();
    }
    previousActorByMain(){
        this.previousActor();
    }

    onActorChange() {
        const mode = this.currentModeObject();
        if (mode.usingSubWindow && !this._modeSelectWindow.active) {
            this._pocketWindow2.setActor(this.actor());
            this._pocketWindow2.refresh();
        }
        else {
            this._pocketWindow.setActor(this.actor());
            this._pocketWindow.refresh();
        }
    }
    onSwapOk() {
    }
    openItemWindow() {
        this.openSelectWindow();
        this._itemWindow.activate();
        this._itemWindow.select(0);
        this._itemWindow.open();
    }
    closeItemWindow() {
        this.closeSelectWindow();
        this._itemWindow.deactivate();
        this._itemWindow.deselect();
        this._itemWindow.close();
    }

    //=============================================================================
    // modeSelect
    //=============================================================================
    onModeOk() {
        const symbol = this._modeSelectWindow.currentSymbol();
        const mode = this.fetchMode(symbol);
        if (mode) {
            this.startMode(mode);
        }
    }
    onModeCancel() {
        SceneManager.pop();
    }
    /**
     * @param {ModeObject} mode
     */
    startMode(mode) {
        this._mode = mode;
        mode.start();
        if (mode.usingSubWindow) {
            this.openSubPocketWindow();
        }
        this._pocketWindow.setLastNull(mode.needNullPush);
        this._pocketWindow.refresh();
    }
    endMode() {
        const mode = this.currentModeObject();
        mode.end();
        this._mode = this._nullMode;
        this.destoryPocketIndex();
        this._pocketWindow.setLastNull(false);
        this._pocketWindow2.setLastNull(false);
        this.closeSubPocketWindow();
        this._pocketWindow.refresh();
        this._pocketWindow.deselect();
        this._pocketWindow.setActorLock(false);
        this._modeSelectWindow.activate();
    }
    // /**
    //  * @param {string} mode
    //  * @return {ModeObject}
    //  */
    fetchMode(symbol) {
        return this._modeTable[symbol];
    }
    /**
     * @return {ModeObject}
     */
    currentModeObject() {
        return this._mode;
        const mode = this._modeSelectWindow.currentData();
        if (mode) {
            return this._modeTable[mode.symbol];
        }
        return this._nullMode;
    }
    selectNumberSelection() {
    }
    /**
     * @param {String} text
     */
    setHelpText(text) {
        this._helpWindow.setText(text);
    }
    onActorOk() {
        var modeObject = this.currentModeObject();
        modeObject.actorOk();
    }
    onActorCancel() {
        this._actorWindow.hide();
        if (this._itemUsed) {
            this._pocketWindow.pocket().normalize();
            this._pocketWindow.refresh();
        }
        this._itemUsed = false;
        this._pocketWindow.activate();
    }
    /**
     * @return {Game_Actor}
     */
    user() {
        return Scene_Item.prototype.user.call(this);
    }

    onItemCancel() {
        this.endAddMode();
    }
    openActorWindow() {
        this._actorWindow.show();
    }
    actorSetCursorAll(selectAll) {
        this._actorWindow.setCursorAll(selectAll);
    }
}

if(setting.usingWeight){
    Scene_ItemPocket.prototype.finalCapacity =Scene_ItemPocket.prototype.finalCapacityWithWeight;
}

function passFinalAmount(a,b,c){
//    console.log('a:'+a+' b:'+b+' c:'+c);
    return Math.min(a,b,c);
}

/**
 * @param {RPG.Item} item
 */
function itemOccasionOk(item){
    return item.occasion === 0 || item.occasion === 2;    
}
/**
 * @param {Number} index 
 * @return {MA_itemPocket}
 */
function partyGetMyset(index){
    return $gameParty.getPocketMyset(index);
}

/**
 * 
 * @param {RPG.Item} item1 
 * @param {RPG.Item} item2 
 */
function idUpper(item1,item2){
    return item1.id -item2.id;
}

function isPassableItem(item){
    return !!item;
}


Window_MenuCommand.prototype.addPocketCommand =function(){
    this.addCommand( setting.commandName,setting.commandKey,true);    
};
//個別所持用のコマンドを登録してる
//#if のように使っている
const Window_MenuCommand_addMainCommands = Window_MenuCommand.prototype.addMainCommands;
const Window_MenuCommand_paddOriginalCommands=Window_MenuCommand.prototype.addOriginalCommands;
if(setting.menuCommandPostion===1){
    Window_MenuCommand.prototype.addMainCommands =function(){
        this.addPocketCommand();
        Window_MenuCommand_addMainCommands.call(this);
    };
}else{

    Window_MenuCommand.prototype.addOriginalCommands =function(){
        Window_MenuCommand_paddOriginalCommands.call(this);
        this.addPocketCommand();
    };
}

const zz_Scene_Menu_prototype_createCommandWindow=Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
    zz_Scene_Menu_prototype_createCommandWindow.call(this);
    this._commandWindow.setHandler(setting.commandKey, this.commandPersonal.bind(this) );
};

const zz_MA_scene_Scene_Menu_onPersonalOk=Scene_Menu.prototype.onPersonalOk;
Scene_Menu.prototype.onPersonalOk =function(){
    if( this._commandWindow.currentSymbol() ===setting.commandKey  ){
        SceneManager.push(Scene_ItemPocket  );
    }else{
        zz_MA_scene_Scene_Menu_onPersonalOk.call(this);
    }
};
/**
 * @param {[]} list
 */
function repairMyset(list){
    if(!list){return }
    
    if(list.length <=0){return ;}
    
    if(typeof(list[0].pocket)===  MA_itemPocket ){
        return;
    }
    for (const mysetData of list) {
        mysetData.pocket=new MA_ItemPocketMyset(  mysetData.pocket._data);        
    }
}


const zz_MA_DataManager_extractSaveContents =DataManager.extractSaveContents;
DataManager.extractSaveContents =function(){
    zz_MA_DataManager_extractSaveContents.apply(this,arguments);
    actorSetPocket();
    $gameParty.setupPocketMyset();
};
function actorSetPocket(){
    for (const actor of $gameActors._data) {
        if(actor){
            actor.setupPocket();
        }
    }
}


// デフォルトのconsumeItemを上書きして無力化する
Game_Battler.prototype.consumeItem = function(item) {};

// 代わりのアイテム使用を作っておく
const zz_Scene_Item_useItem_MA_itemPocket=Scene_Item.prototype.useItem;
Scene_Item.prototype.useItem =function(){
    const item = this.item();
    $gameParty.consumeItem(item);
    zz_Scene_Item_useItem_MA_itemPocket.call(this);
};

Game_Action.prototype.consumeItem=function(){
    const item = this.item();
    if(this._pocketPtr && item.consumable){
        this._pocketPtr.amount-=1;
    }
};



const  Game_Party_removeActor =Game_Party.prototype.removeActor;
Game_Party.prototype.removeActor = function(actorId){

    if(!$gameSwitches.value(setting.pocketKeepByremoveActor)){
        if ( this._actors.contains(actorId)) {
            const actor = $gameActors.actor(actorId);
            actor.itemPocket().releaseAllItem();
        }    
    }
    Game_Party_removeActor.call(this,actorId);
};


/**
 * @param {Number} itemId
 */
Game_Party.prototype.isInPocket=function(itemId){
    return this.members().some(function(actor){
        if(actor){
            return actor.isInPocket(itemId);
        }
        return false;
    });
};


/**
 * @param {RPG.Item}
 */
Game_Party.prototype.someoneHasItem=function(item){
    return this.isInPocket(item.id)
};
 
const Game_Party_hasItem = Game_Party.prototype.hasItem;
Game_Party.prototype.hasItem =function(item){
    const result = Game_Party_hasItem.call(this,item);
    if(result){return true;}
///    const members =pocketFunction.includeMembers();
    Mano_ItemPocket_State.includeAll =false;
    Mano_ItemPocket_State.includeParty=false;

    return this.someoneHasItem(item);
};
/**
 * @return {MysetListItem[]}
 * @param {Number} len 
 */
function createDefaultMyset(len){
    var result =[];
    for(var i=0; i < len ; i+=1){
        result[i]= new MysetListItem(setting.mysetFormat.format(i),new MA_itemPocket([]));
    }
    return result;
}

const Game_Party_initialize =Game_Party.prototype.initialize;
Game_Party.prototype.initialize =function(){
    Game_Party_initialize.call(this);
    this.setupPocketMyset();
};
Game_Party.prototype.setupPocketMyset=function(){
//    旧バージョンの処理
    // if(!this._pocketMyset){
    //     this._pocketMyset =  createDefaultMyset(setting.mysetSize);
    // }
    if(!this._pocketMysetClass){
        this._pocketMysetClass = new  MA_PocketMysetList();
    }
};

/**
 * @returns {MA_PocketMysetList}
 * @param {Game_Party} party 
 */
function Party_GetPocketMyset(party){
    return party._pocketMysetClass;
}

Game_Party.prototype.pocketMyset =function(){
    return Party_GetPocketMyset(this);
};


/**
 * @param {Number}index
 * @param {MA_itemPocket} pocket
 */
Game_Party.prototype.saveMyset = function(index ,pocket){
    Party_GetPocketMyset(this).save(index,pocket);

    // if(this._pocketMyset[index]){
    //     this._pocketMyset[index].pocket =pocket.createMySet();
    // }
};
/**
 * @param {Number}index
 * @param {String} name
 */
Game_Party.prototype.renameMyset = function(index ,name){
    Party_GetPocketMyset(this).rename(index,name);
    // if(this._pocketMyset[index]){
    //     this._pocketMyset[index].name = name;
    // }
};

/**
 * @param {Number} index
 * @return {MA_itemPocket}
 */
Game_Party.prototype.getPocketMyset =function(index){
    return Party_GetPocketMyset(this).item(index);

    const myset = this._pocketMyset[index];
    if(myset){
        return myset;
    }
    return null;
};

Game_Party.prototype.savePocketTemporary =function(){
    if(this._pocketTempprarySave){
        throw new Error("既にアイテムが退避されています");
    }
    const tmp =new MA_ItemPocketTemporarySave(this);
    this._pocketTempprarySave = tmp;
    for (const actor of this.allMembers()) {
        const p =actor.itemPocket();
        if(p){
            p.releaseAllItem();
        }
    }
};
Game_Party.prototype.loadPocketTemporary =function(){

    if(!this._pocketTempprarySave){
        throw new Error("アイテムが記録されていません");
    }
    /**
     * @type {MA_ItemPocketTemporarySave}
     */
    const tmp =this._pocketTempprarySave;
    tmp.loadAllMySet();
    this._pocketTempprarySave=null;
};
/**
 * @param {Game_Party} party 
 */
function saveTemporarPocket(party){
    return party.allMembers().map(function(actor){
        /**
         * @type {MA_itemPocket}
         */
        const pocket = actor.itemPocket();
        const m = pocket.createMySet();
        pocket.releaseAllItem();
        return {
            actorId:actor.actorId(),
            pocket:m
        };
    });
}

class MA_ItemPocketTemporarySave{
    /**
     * @param {Game_Party} party 
     */
    constructor(party){
        this._list= saveTemporarPocket(party);
    }
    loadAllMySet(){
        for (const iterator of this._list) {
            const actor =$gameActors.actor(iterator.actorId);
            if(actor){
                /**
                 * @type {MA_itemPocket}
                 */
                const pocket = actor.itemPocket();
                pocket.loadMyset(iterator.pocket);
            }
        }
        this.destory();
    }
    destory(){
        this._list.length =0;
    }
}

window[MA_ItemPocketTemporarySave.name]=MA_ItemPocketTemporarySave;

const zz_MA_itemPocket_BattleManager_startAction=BattleManager.startAction;
BattleManager.startAction =function(){
    zz_MA_itemPocket_BattleManager_startAction.call(this);
    this._action.consumeItem();
};

const zz_BattleManager_startInput_MA_itemPocket =BattleManager.startInput;
BattleManager.startInput =function(){
    $gameParty.members().forEach(function(actor) {
        actor.itemPocket().normalize();
    }, this);
    zz_BattleManager_startInput_MA_itemPocket.call(this);
};

const zz_MA_Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
    zz_MA_Game_Actor_setup.call(this,actorId);
    this.setupPocket();
};
/**
 * 
 * @param {RPG.Actor} actorData
 */
function loadActodPocketData(actorData){
    const reg =/PocketItem\[(\d{1,4})\]/;
    var matched=false;
    const pocket =new MA_itemPocket([]);
    for(var key in actorData.meta){
        var match = reg.exec(key);
        if(match){
            matched=true;
            var itemId =Number(match[1]);
            var amount = Number(actorData.meta[key]);
            pocket.addItem($dataItems[itemId],amount);
        }else{
            if(matched){
                break;
            }
        }
    }
    return pocket;
}

Game_Actor.prototype.setupPocket =function(){
    if(!!this.pocket_MA){
        return;
    }

    this.pocket_MA = loadActodPocketData(this.actor());
};


/**
 * @return {MA_itemPocket} 
 */
Game_Battler.prototype.itemPocket =function(){
    return new MA_itemPocket([]);
};

Game_Actor.prototype.itemPocket=function(){
    return (this.pocket_MA);
};
/**
 * @param {number} itemId
 * @return {boolean} 
 */

Game_Battler.prototype.isInPocket =function(itemId){
    return this.itemPocket().findItem( $dataItems[itemId])!==null;
};

Game_Battler.prototype.pocketWeightCapacity=function(){
    return 100;
};

class Window_BattlePocket extends Window_Pocket{
    initialize() {
        Window_Pocket.prototype.initialize.apply(this, arguments);
        this.hide();
    }
    createAllButtons() { }
    maxCols() {
        return 2;
    }
    selectLast() {
        this.select(0);
    }
    show() {
        this.selectLast();
        this.showHelpWindow();
        super.show();
//            Window_Pocket.prototype.show.call(this);
    }
    drawActorName() { }
    hide() {
        this.hideHelpWindow();
        super.hide();
    }
    /**
     * @param {RPG.Item} item
     * @return {Boolean}
     */
    isEnabled(item) {
        return this._actor.canUse(item);
    }
}




Scene_Battle.prototype.onBattlePocketOk=function(){
    const action = BattleManager.inputtingAction();
    if(action){
        const pocketPtr = this._itemWindow.selectedObject();
        action._pocketPtr = pocketPtr;
    }
};
const zz_MA_ItemPocket_Scene_Battle_onItemOk=Scene_Battle.prototype.onItemOk;
 Scene_Battle.prototype.onItemOk= function(){
    zz_MA_ItemPocket_Scene_Battle_onItemOk.call(this);
    this.onBattlePocketOk();
};
Scene_Battle.prototype.createItemWindow =function(){
    var wy = this._helpWindow.y + this._helpWindow.height;
    var wh = this._statusWindow.y - wy;
    this._itemWindow = new Window_BattlePocket(0, wy, Graphics.boxWidth, wh);
    this._itemWindow.setHelpWindow(this._helpWindow);
    this._itemWindow.setHandler('ok',     this.onItemOk.bind(this));
    this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
    this.addWindow(this._itemWindow);
}; 

const zz_MA_ItemPocket_Scene_Battle_commandItem=Scene_Battle.prototype.commandItem;
Scene_Battle.prototype.commandItem =function(){
    this._itemWindow.setActor(BattleManager.actor());
    zz_MA_ItemPocket_Scene_Battle_commandItem.call(this);
};

const Window_ShopStatus_refresh=Window_ShopStatus.prototype.refresh;
Window_ShopStatus.prototype.refresh =function(){
    Window_ShopStatus_refresh.call(this);
    if(MA_itemPocket.canPutInPocket(  this._item)){
        const x = this.textPadding();
        this.drawPocketInfo(x,this.lineHeight()*2)
    
    }

};
Window_ShopStatus.prototype.drawActorItemAmount =function(x, y, actor){
    const width = this.contents.width - this.textPadding() - x;
    const pocket =actorToPocket(actor);
    const index= pocket.indexOf(this._item);
    const amount = pocket.amount(index);
    if( amount >=  MA_itemPocket.maxAmount( this._item  ) ){
        this.changeTextColor(this.deathColor());
    }
    this.drawText(amount, x, y, width, 'right');
    
};

Window_ShopStatus.prototype.drawActorPocketInfo =function(x, y, actor){
    this.changeTextColor(this.normalColor());
    this.drawText(actor.name(), x, y, 168);
    this.drawActorItemAmount(x,y,actor);
};

Window_ShopStatus.prototype.drawPocketInfo =function(x,y){
    const members = this.statusMembers();
    const line = this.lineHeight();
    for (var i = 0; i < members.length; i++) {
        this.drawActorPocketInfo(x, y + line* (i*2.4) , members[i]);
    }
};

Game_Interpreter.prototype.pocket_SetIncludeMode =function(mode){
    this._pocketIncludeMode =mode;
};

function pocketDistributeItems(item ,amount){
    const member = $gameParty.members();
    for(var i=0;i <0; ++i){
        var pocket = new MA_itemPocket([]);
//        pocket.addItem()

    }

}

// Change Items
const Game_Interpreter_command126=Game_Interpreter.prototype.command126; 
Game_Interpreter.prototype.command126 =function(){
    const item = $dataItems[this._params[0]];
    if(isAutoPocketAdd(item)){


    }
    return Game_Interpreter_command126.call(this);

};
const Game_Interpreter_pluginCommand =Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand =function(command,args){
    if(command!=='Pocket'){
        Game_Interpreter_pluginCommand.call(this,command,args);
        return;
    }
    const param = args[0];
    switch (param) {
        case 'PartyInclude':
            Mano_ItemPocket_State.includeParty =true;
            break;
        case 'AllInclude':
            Mano_ItemPocket_State.includeAll =true;
            break;
        case "SaveTemporary":
            $gameParty.savePocketTemporary();
            break;
        case "LoadTemporary":
            $gameParty.loadPocketTemporary();
            break;
    }
};
// const Game_Interpreter_command111 =Game_Interpreter.prototype.command111;
// Game_Interpreter.prototype.command111 =function(){
//     const result= Game_Interpreter_command111.call(this);
//     const condResult =this._branch[this._indent];
//     if(condResult===false &&this._params[0]===8 ){
//         this._branch[this._indent] = $dataItems[this._params[1]];
//         return this.pocket_GetCheckActorList().some(function(actor){
//             return actor.isInPocket(item);
//         });
//     }
//     return result;
// };

const namespace ={
    MA_itemPocket:MA_itemPocket,
    Scene_ItemPocket:Scene_ItemPocket,
    PocketIndex:PocketIndex,
    Window_Pocket:Window_Pocket,
    pocketFunction:pocketFunction,
};

return namespace;


})();
