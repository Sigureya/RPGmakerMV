 //=============================================================================
// Manosasayaki_CriticalHook.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017-2017 Sigureya
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/Sigureya/
// [github]:https://github.com/Sigureya/RPGmakerMV
//=============================================================================

/*:
 * @author しぐれん（魔のささやき）
 * @plugindesc キャラクターごとに個別にアイテムを所持します。
 * 
 * 
 * @param PocketSize
 * @desc ポケットに入れることができるアイテムの数を設定します。
 * @default 6
 * 
 * @param Yes
 * @desc ポケットに入れることができるアイテムの数を設定します。
 * @default はい
 * 
 * @param No
 * @desc ポケットに入れることができるアイテムの数を設定します。
 * @default いいえ
 *
 * @param MaxColor
 * @desc 最大個数を所持している際の表示色を設定します。
 * @default 4
 * 
 * @param NotEnoughColor
 * @desc マイセット実行時に、アイテムが足りなかった時の色を設定します。
 * @default 4
 *
 * @help
 * アクターごとにアイテムを所持させることができます。
 * 
 * 
 * var 1.0(2017/4/13) 公開
 */
/*
 * TODO
 * マイセット
 * アイテム欄から持たせる処理(特定のボタンで呼び出す)
 * アイテムごとの持たせられる数の上限
 * モンハン形式の実装（1スロット1アイテム）
 * ドラクエ形式の実装（1スロットに1個で、複数所持）
 * キャラ同士のアイテム交換（FE風）
 * 並び変え機能
 * ↑二つの機能は類似しているので、まとめて作る
 * １ボタンで以下の機能の呼び出し
 * 呼び出し先は、変更できるように
 * ソート
 * クリア
 * 最大補充
 * これをXYに割り当て。使う直前にYES/NOのチェック
 * 
 * サブメニュー
 * 決定キーを押したときに表示　
 * 
 * sawp用関数を作る
 * 最近使ったアイテム？
 * 最大個数所持している場合は、個数表示を赤に
 * アイテムを減らすときに、アクターに持たせているアイテムを減らす処理
 * 装備を減らす処理と同様にする
 * プラグインコマンドで実行？一時的にフラグを立てる？
 * <ActorEquipItem:
 *   max =10
 *   
 * >
*/ 

 function MA_itemPocket(){
    this.initialize.apply(this,arguments);
}







(function () {
    'use strict';
    const param = PluginManager.parameters('Mano_ActorEquipItem');
    const xxx={
        commandKey :"actorItemEquipt",
        commandName:'未定',
    };

MA_itemPocket.prototype.test=function(){
    console.log("ma_itemPoket");
};
MA_itemPocket.prototype.size=function(){
    return 6;
};
MA_itemPocket.prototype.initialize=function(){
    this.initMembers();
};

MA_itemPocket.prototype.initMembers=function(){
    this._data=[
        {id:1,count:3},
        {id:2,count:3},
        {id:3,count:100},
        {id:4,count:4},
        {id:5,count:23},
        {id:1,count:3},
        {id:2,count:3},
        {id:3,count:100},
        {id:4,count:4},
        {id:5,count:23},
        {id:1,count:3},
        {id:2,count:3},
        {id:3,count:100},
        {id:4,count:4},
        {id:5,count:23},
        {id:1,count:3},
        {id:2,count:3},
        {id:3,count:100},
        {id:4,count:4},
        {id:5,count:23},
        {id:1,count:3},
        {id:2,count:3},
        {id:3,count:100},
        {id:4,count:4},
        {id:5,count:23},
        ];
};
//削除方法は変えたほうがいいかも fill(null)でもいいかも
MA_itemPocket.prototype.clear=function(){
    this._data.length = 0;
};

MA_itemPocket.prototype.swapItem =function(indexA,otherPocket,indexB){


};

MA_itemPocket.prototype.clone =function(){
    var result  = new MA_itemPocket();
    result._data = this._data.map( function(obj){
        var result = {};
        Object.assign(result,obj);
        return result;
    }  );
    return result;
};
MA_itemPocket.prototype.itemData =function(index){
    const obj = this._data[index];
    if(!obj){return null;}

    return $dataItems[obj.id];
};

MA_itemPocket.prototype.numItemsForParty =function(index){
    return $gameParty.numItems(this.itemData(index));
};


MA_itemPocket.prototype.canMySet =function(){
    for(var i=0; i < this._data.length;++i){
        const item = this._data[i];
        if( item.count >  this.numItemsForParty(i) ){
            return false;
        }
    }
    return true;
};

// マイセットの指定に従って、アイテムをポケットに入れる
// ただし、足りない部分はかけた状態になる。
// この関数はアイテムを減らす処理は行わない
MA_itemPocket.prototype.clampMySet=function(){
    for(var i=0; i < this._data.length;++i){
        var item = this._data[i];
        if(item){
            item.count = Math.min( this.numItemsForParty(i),item.count  );
        }
    }
};

//releaseItemの対となる関数
MA_itemPocket.prototype.setItem=function(){
    for(var i=0; i < this._data.length;++i){
        $gameParty.loseItem(this.itemData(i) ,this._data[i].count );
    }    
};


MA_itemPocket.prototype.releaseItem=function(){
    for(var i=0; i < this._data.length;++i){
        $gameParty.gainItem(this.itemData(i) ,this._data[i].count );
        this._data[i] =null;
    }    
};


Game_Battler.prototype.itemPocket =function(){
    return this.hage;
};


const zz_Game_Interpreter_pluginCommand=Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    if(command ==='hage'){
        this.iterateActorId(0,function(act){
            act.hage = new MA_itemPocket();//{sage:5};            
        });
        return;
    }
    if(command ==='hoge'){
        this;
        this.iterateActorId(0,function(act){
            act.hage.test();
        });
        return;
    }

    zz_Game_Interpreter_pluginCommand.apply(this,arguments);

    // to be overridden by plugins
};



function Window_ActorItemEquip(){
	this.initialize.apply(this,arguments);
}
Window_ActorItemEquip.prototype = Object.create(Window_ItemList.prototype);
Window_ActorItemEquip.prototype.constructor = Window_ActorItemEquip;

Window_ActorItemEquip.prototype.initialize=function(x,y,w,h){
	Window_ItemList.prototype.initialize.call(this,x,y,w,h);
    this._pocket = new MA_itemPocket();
    this._data = this._pocket._data;
    this._cols =1;


};

Window_ActorItemEquip.prototype.isCurrentItemEnabled=function(){
    //ここを調整
    return true;

};

Window_ActorItemEquip.prototype.setActor =function(actor){
    this.setPocket(actor.itemPocket());
};


Window_ActorItemEquip.prototype.setPocket =function(pocket){    
    var y =0;    
};
Window_ActorItemEquip.prototype.dummyDraw =function(){
    for(var i=0;i< this._data.length;++i){
        this.drawItem(i);
    }
};

Window_ActorItemEquip.prototype.maxCols = function() {
    return this._cols;
};
Window_ActorItemEquip.prototype.itemCountWidth =function(){
    return this.textWidth('00/00');
};

// Window_ActorItemEquip.prototype.normalColor =function(){
//     return '#eeeeee';//this.textColor(  );
// };

Window_ActorItemEquip.prototype.drawItemCount =function(item,x,y,width){
    this.drawText( item.id,x,y,width ,'right');

};
Window_ActorItemEquip.prototype.itemCountColor =function(value){
    if(value > 6){
        return this.textColor(18);


    }

    return this.normalColor();

    
};

Window_ActorItemEquip.prototype.drawItem =function(index){
    var item = this._data[index];
    if(item){
        var numberWidth = this.itemCountWidth();
        var rect = this.itemRect(index);
        rect.width -= this.textPadding();
        this.drawItemName($dataItems[ item.id], rect.x, rect.y, rect.width );
        

        var n= this._pocket.numItemsForParty(index);
        this.changeTextColor( this.itemCountColor( n ) );
        this.drawText( n,rect.x,rect.y,rect.width ,'right');
//        this.changePaintOpacity(1);
    }


};

function Scene_ActorItemEquip() {
    this.initialize.apply(this,arguments);    
}
Scene_ActorItemEquip.prototype = Object.create(Scene_ItemBase.prototype);
Scene_ActorItemEquip.prototype.constructor = Scene_ActorItemEquip;

Scene_ActorItemEquip.prototype.initialize =function(){
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_ActorItemEquip.prototype.create =function(){
    Scene_MenuBase.prototype.create.call(this);
    this.createCommandWindow();
    this.createItemSelectWindow();
};

Scene_ActorItemEquip.prototype.createItemSelectWindow =function(){
    var iw = new Window_ItemList(0,Graphics.boxHeight/2,Graphics.boxWidth,Graphics.boxHeight/2);
    iw.setCategory('item');
    iw.makeItemList();
    this._itemWindow=iw;
    this.addWindow(iw);

};

Scene_ActorItemEquip.prototype.activateItemWindow=function(){
    this._itemWindow.activate();
    this._itemWindow.select(0);

};

Scene_ActorItemEquip.prototype.createCommandWindow =function(){
    var wx = 0;
    var wy = 0;
    var ww = Graphics.boxWidth/2;
    var wh = Graphics.boxHeight/2;
  
  
    var aie = new Window_ActorItemEquip(wx,wy,ww,wh);
    aie.setActor(this.actor());
    aie.select(0);
    aie.dummyDraw();

    aie.activate();
    aie.setHandler( 'cancel',this.popScene.bind(this) );
    aie.setHandler('ok',this.activateItemWindow.bind(this) );
    this._commandWindow=aie;
    this.addWindow(aie);
　
};


Scene_ActorItemEquip.prototype.hideSubWindow = function(window) {
    window.hide();
    window.deactivate();
    this._slotWindow.refresh();
    this._slotWindow.activate();
};

//MA_BattleHistory.Window_MenuCommand.addOriginalCommands=Window_MenuCommand.prototype.addOriginalCommands;
const zz_MA_BattleHistory_Window_MenuCommand_prototype_addOriginalCommands=Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands =function(){
//    MA_BattleHistory.Window_MenuCommand.addOriginalCommands.call(this);
    zz_MA_BattleHistory_Window_MenuCommand_prototype_addOriginalCommands.call(this);
    this.addCommand( xxx.commandName,xxx.commandKey,true);
};

const zz_Scene_Menu_prototype_createCommandWindow=Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
    var it=this;
    zz_Scene_Menu_prototype_createCommandWindow.call(this);
//    this._commandWindow.setHandler("actorItemEquipt", this.commandBattleHistory.bind(this) );
    this._commandWindow.setHandler(xxx.commandKey, this.commandPersonal.bind(this) );
};

const zz_MA_scene_Scene_Menu_onPersonalOk=Scene_Menu.prototype.onPersonalOk;
Scene_Menu.prototype.onPersonalOk =function(){
    if( this._commandWindow.currentSymbol() ===xxx.commandKey  ){
        SceneManager.push(Scene_ActorItemEquip  );
    }else{
        zz_MA_scene_Scene_Menu_onPersonalOk.call(this);
    }
}

Scene_Menu.prototype.commandBattleHistory = function(){
        SceneManager.push(Scene_ActorItemEquip);
};


})();
