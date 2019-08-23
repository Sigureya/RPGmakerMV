
//=============================================================================
// Mano_CoinShop.js
// ----------------------------------------------------------------------------
// Copyright (c) 2019-2019 Sigureya
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 0.9.0 2019/05/26 初版 
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/Sigureya/
//=============================================================================
/*:
 * @plugindesc 変数やアイテムを消費して購入できるショップが作れます。
 * 競合率・中ぐらい
 * @author しぐれん(https://github.com/Sigureya/RPGmakerMV)
 * 
 * @help
 * お金の代わりに変数やアイテムを消費して購入できるショップを作成できます。
 * 
 * 内部的には専用の財布を作って、そこに処理を流します。
 * 既存処理を再定義しているため、競合の可能性があります。
 * （ポイントカードのようなプラグインを使っている場合、これより後ろにおいてください）
 * 
 * プラグインコマンドで以下の内容を入力してください。
 * 設定変更は１回のみ有効です。
 * 
 * ShopMode モード 識別番号 単位
 * パラメータは上記の通りです。
 * この機能を使った場合、売却機能は強制的にロックされます。
 * 
 * ShopMode Variable 8 枚
 * お金の代わりに変数8番の数値を見ます。
 * 単位として「枚」を使うようになります。
 * 
 * ShopMode item 3 個
 * お金の代わりにitemID[3]のアイテムの所持数を見ます
 * 単位として「個」を使うようになります。
 * 
 * 2019/05/26 公開
 * 
*/

(function(){
    'use strict';

class WalletBase{

    /**
     * @param {String} unit 
     */
    constructor(unit){
        this.setUnit(unit ||TextManager.currencyUnit);
    }
    /**
     * @param {String} unit 
     */
    setUnit(unit){
        this._unit = unit;
    }

    value(){
        return 0;
    }
    pay(value){
    }

    loseValue(value){
        this.pay(value);
    }

    gainValue(value){
        this.pay(-value);
    }
    unit(){
        return this._unit;
    }

    canSeil(){
        return false;
    }

    isGold(){
        return false;
    }
}

class WalletGold extends WalletBase{
    constructor(){
        super(TextManager.currencyUnit);
    }
    value(){
        return $gameParty.gold();
    }
    pay(value){
        $gameParty.loseGold(value);
    }
    canSeil(){
        return true;
    }
    isGold(){
        return true;
    }
}

class WalletItem extends WalletBase{
    /**
     * @param {Number} itemId 
     */
    constructor(itemId){
        super();
        this._itemId=itemId;
    }

    item(){
        return $dataItems[this._itemId];
    }

    value(){
        return $gameParty.numItems(this.item());
    }

    pay(value){
        $gameParty.loseItem( this.item(), value);
    }

}
window[WalletItem.name] =WalletItem;

class WalletVariable extends WalletBase{
    /**
     * @param {Number} id 
     */
    constructor(id){
        super();
        this._variableId=id;
    }
    value(){
        return $gameVariables.value(this._variableId);
    }

    pay(value){
        const lastValue = this.value();
        $gameVariables.setValue(this._variableId, lastValue-value );
    }

}

/**
 * @returns {WalletBase}
 * @param {String} mode 
 * @param {Number} id 
 */
function makeWallet(mode,id){
    if(mode ==="item"){
        const wi = new WalletItem(id);
        return wi;
    }

    if(mode ==="variable"){
        const wv = new WalletVariable(id);
        return wv;
    }

    return new WalletGold();
}

let g_wallet =null;
const Game_Interpreter_pluginCommand=Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand =function(cmd,args){
    if(cmd ==="ShopMode"){
        const mode = args[0];
        const id = Number( args[1]);
        const unit =args[2];
        const wallet = makeWallet(mode,id);
        wallet.setUnit(unit);
        g_wallet =wallet;
        return;
    }
    Game_Interpreter_pluginCommand.call(this,cmd,args);
};

const Scene_Load_onLoadSuccess=Scene_Load.prototype.onLoadSuccess
Scene_Load.prototype.onLoadSuccess =function(){
    g_wallet=null;
    Scene_Load_onLoadSuccess.call(this);
};

Window_Gold.prototype.setupWallet =function(){
    const w = g_wallet || new WalletGold();
    this._wallet =w;
    g_wallet =null;
};
Window_Gold.prototype.value = function() {
    return this._wallet.value();
};

Window_Gold.prototype.currencyUnit = function() {
    return this._wallet.unit();
};
Window_Gold.prototype.wallet =function(){
    return this._wallet;
};

const Window_Gold_initialize =Window_Gold.prototype.initialize;
Window_Gold.prototype.initialize =function(x,y){
    this.setupWallet();
    Window_Gold_initialize.call(this,x,y);
};
const Scene_Shop_createGoldWindow =Scene_Shop.prototype.createGoldWindow;
Scene_Shop.prototype.createGoldWindow =function(){
    Scene_Shop_createGoldWindow.call(this);
    this._purchaseOnly =this._purchaseOnly || !this._goldWindow.wallet().canSeil();
};

Scene_Shop.prototype.doBuy = function(number) {
    this._goldWindow.wallet().loseValue(number * this.buyingPrice());
    $gameParty.gainItem(this._item, number);
};

Scene_Shop.prototype.doSell = function(number) {
    const p =number * this.sellingPrice();
    this._goldWindow.wallet().gainValue(p);
    $gameParty.loseItem(this._item, number);
};

})();