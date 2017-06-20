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
 * 持たせたアイテムに、装備品同様のtraitを設定する機能
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
        commandKey :"actorItemEquip",
        commandName:'アイテム所持',

        wordUse:'使う',
        symbolUse:'use',
        wordSwap:'入れ替え',
        symbolSwap:'swap',
        wordRemove:'しまう',
        symbolRemove:'remove',
        wordMyset:'マイセット',
        symbolMyset:'myset',
        symbolOutOfWindow :'outwindow',
        symbolNon:'non',
    };

MA_itemPocket.prototype.size=function(){
    return 6;
};
MA_itemPocket.prototype.initialize=function(dataArray){
    this._data=dataArray || [];
};

//削除方法は変えたほうがいいかも fill(null)でもいいかも
MA_itemPocket.prototype.clear=function(){
    this._data.length = 0;
};

MA_itemPocket.prototype.swapItem =function(otherPocket,indexA,indexB){
    const tmp = this._data[indexA];
    this._data[indexA ]=otherPocket._data[indexB];
    otherPocket._data[indexB] = tmp;

};

MA_itemPocket.prototype.hasItem =function(){
    return true;
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
MA_itemPocket.prototype.isEmpty =function(index){
    const item =this._data[index];
    if(item){
        return item.count <= 0;
    }
    return true;
};

// nullや、空っぽのアイテムを取り除く
MA_itemPocket.prototype.normalize =function(){
    for(var i=0; i< this._data.length;++i){
        if(this.isEmpty(i)){
            this._data.splice(i,1);
        }
    }
};
//releaseItemの対となる関数
MA_itemPocket.prototype.setItem=function(){
    for(var i=0; i < this._data.length;++i){
        $gameParty.loseItem(this.itemData(i) ,this._data[i].count );
    }    
};
MA_itemPocket.prototype.consumeItem=function(index){
    this;
    const item = this._data[index];
    const itemData = this.itemData(index);
    if(itemData.consumable){
        item.count -=1;
    }
}
MA_itemPocket.prototype.canUse = function(battler,index){
   return battler.canUse(this.itemData( index ));    
};
MA_itemPocket.prototype.useItem=function(index,targetList){



};

MA_itemPocket.prototype.releaseItem=function(index){
    $gameParty.gainItem(this.itemData(index) ,this._data[index].count );
};

const zz_MA_Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
	zz_MA_Game_Actor_setup.call(this,actorId);
    this.pocket_MA =[];
        if(actorId ===1  ){
            this.pocket_MA=[
                {id:1,count:3},
                {id:3,count:100},
                {id:4,count:4},
                {id:5,count:23},
                {id:6,count:1},
            ];
            return;
        }
};

Game_Battler.prototype.itemPocket =function(){
    return new MA_itemPocket([]);
};

Game_Actor.prototype.itemPocket=function(){
    return new MA_itemPocket(this.pocket_MA);
};
const zz_MA_DataManager_extractSaveContents =DataManager.extractSaveContents;
DataManager.extractSaveContents =function(){
    zz_MA_DataManager_extractSaveContents.apply(this,arguments);
    actorSetPocket();
}
function actorSetPocket(){
    $gameActors._data.forEach(function(actor) {
        actor;
        if(!actor){return;}


        if(!actor.pocket_MA){
            actor.pocket_MA=[];
        }
    });;
}

//戦闘中のアイテム使用をフックする
// Game_Battler.prototype.consumeItem =function(){
// };

//アイテムの使用可能判定をフック
// Game_BattlerBase.prototype.meetsItemConditions = function(item) {
//     return this.meetsUsableItemConditions(item) && $gameParty.hasItem(item);
// };


//Window_ShopNumberを参考に作成する
function Window_PocketNumber() {
    this.initialize.apply(this, arguments);
}

Window_PocketNumber.prototype = Object.create(Window_Selectable.prototype);
Window_PocketNumber.prototype.constructor = Window_PocketNumber;



function Window_ModeSelect(){
    this.initialize.apply(this,arguments);
};
Window_ModeSelect.prototype = Object.create(Window_HorzCommand.prototype);
Window_ModeSelect.prototype.constructor = Window_ModeSelect;

Window_ModeSelect.prototype.initialize=function(x,y){
    Window_HorzCommand.prototype.initialize.call(this,x,y);
    this.deactivate();
    this.deselect();

};
Window_ModeSelect.prototype.windowWidth = function() {
    return Graphics.boxWidth;
};


Window_ModeSelect.prototype.makeCommandList =function(){
    this.addCommand(xxx.wordUse, xxx.symbolUse );
    this.addCommand(xxx.wordSwap,xxx.symbolSwap);
    this.addCommand(xxx.wordRemove,xxx.symbolRemove);
    this.addCommand(xxx.wordMyset,xxx.symbolMyset);
};

Window_ModeSelect.prototype.cursorDown=function(){
    //後回し
    // this.deactivate();
    // this.deselect();
    // this.callHandler(xxx.symbolOutOfWindow);
};


function Window_Pocket(){
	this.initialize.apply(this,arguments);
}
Window_Pocket.prototype = Object.create(Window_ItemList.prototype);
Window_Pocket.prototype.constructor = Window_Pocket;


Window_Pocket.prototype.initialize=function(x,y,w,h){
	Window_ItemList.prototype.initialize.call(this,x,y,w,h);
    this.deactivate();
    this.deselect();
    this._pocket = new MA_itemPocket();
    this.makeItemList();
    this._bindedItem =-1;
    this._cols =1;
    this._actor =null;
    this._enableJudge = null;
};

Window_Pocket.prototype.canActorChange =function(){
    return true;
};
Window_Pocket.prototype.processPagedown =function(){
    if(this.canActorChange()){
        Window_Selectable.prototype.processPagedown.call(this);
    }
};

Window_Pocket.prototype.processPageup =function(){
    if(this.canActorChange()){
        Window_Selectable.prototype.processPageup.call(this);
    }
};

Window_Pocket.prototype.isEnabled =function(item){
    return this._enableJudge(item);
};

Window_Pocket.prototype.setEnableJudge =function(func){
    this._enableJudge =func;
};
Window_Pocket.prototype.makeItemList =function(){
    this._data = this._pocket._data;
};
Window_Pocket.prototype.item =function(){
    const index =this.index();
    return  index>=0 ? this._pocket.itemData(index) :null;
};

Window_Pocket.prototype.actor =function(){
    return this._actor;
};
Window_Pocket.prototype.actorName=function(){
    return this.actor().name();
};
Window_Pocket.prototype.pocket=function(){
    return this._pocket;
};
Window_Pocket.prototype.setActor =function(actor){
    if(this===null){
        this;
    }
    this._actor =actor;

    this.setPocket(actor.itemPocket());
    this._pocket.normalize();
};


Window_Pocket.prototype.setPocket =function(pocket){
    this._pocket = pocket;
    this.makeItemList();
};


Window_Pocket.prototype.lineColor = function() {
    return this.normalColor();
};

Window_Pocket.prototype.actorNameHeight =function(){
    return  this.contents.fontSize + 20;
};
Window_Pocket.prototype.drawHorzLine = Window_Status.prototype.drawHorzLine;
Window_Pocket.prototype.drawActorName =function(){
    this.changeTextColor(this.normalColor());

    this.drawText(this.actorName(), 0,0,this.itemWidth());
    var y = this.contents.fontSize;
    this.drawHorzLine(y);

};



Window_Pocket.prototype.drawAllItems =function(){
    Window_Selectable.prototype.drawAllItems.call(this);
    this.drawActorName();
//    console.log("drawAllItems");
};

Window_Pocket.prototype.maxCols = function() {
    return this._cols;
};
Window_Pocket.prototype.itemCountWidth =function(){
    return this.textWidth('00/00');
};

// Window_ActorItemEquip.prototype.normalColor =function(){
//     return '#eeeeee';//this.textColor(  );
// };

Window_Pocket.prototype.drawItemCount =function(item,x,y,width){
    this.drawText( item.id,x,y,width ,'right');

};
Window_Pocket.prototype.itemRect=function(index){
    var rect=  Window_Selectable.prototype.itemRect.call(this,index);
    rect.y += this.actorNameHeight();
    return rect;

};

Window_Pocket.prototype.itemCountColor =function(value){
    if(value > 6){
        return this.textColor(18);
    }
    return this.normalColor();

    
};


Window_Pocket.prototype.drawItem =function(index){

    var item = this._data[index];
    if(item){
        var numberWidth = this.itemCountWidth();
        var rect = this.itemRect(index);
        rect.width -= this.textPadding();
        this.drawItemName($dataItems[ item.id], rect.x, rect.y, rect.width );
        
        var n= item.count;//this._pocket.numItemsForParty(index);
        this.changeTextColor( this.itemCountColor( n ) );
        this.drawText( n,rect.x,rect.y,rect.width ,'right');
    }
};



function Window_MySet(){
	this.initialize.apply(this,arguments);
}
Window_MySet.prototype = Object.create(Window_ItemList.prototype);
Window_MySet.prototype.constructor = Window_MySet;

Window_MySet.prototype.initialize=function(x,y,w,h){
	Window_ItemList.prototype.initialize.call(this,x,y,w,h);
    this.deactivate();
    this.deselect();
    this.makeItemList();
    this.setMode(xxx.symbolNon);
};
Window_MySet.prototype.maxCols = function() {
    return this._cols;
};

// 全ての所持アイテムをポケットであるかのように扱うプロクシ
function Pocket_proxy(){
    this.initialize.apply(this,arguments);
}

Pocket_proxy.prototype.useItem =function(index,targetList){
//    this._dat
};


class ModeBase{
    constructor(){
        this._pocket =null;
        this._itemIndex =-1;
        this._actorIndex=-1
    }
    setItemIndex(index){
        this._itemIndex =index;
    }
    setPocket(pocket){
        this._pocket =pocket;
    }
    setActorIndex(index){
        this._actorIndex =index;
    }
    item(){
        return this._pocket.itemData(this._itemIndex);
    }
    pocket(){
        return this._pocket;
    }


    onChangeActor(){}
    onModeOk(){}
    onItemSelect(){}
    onItemCancel(){}
    onActorOk(){}
    onActorCancel(){}
    isItemsInterested(item ){return false;}
};


class Mode_Use extends ModeBase{
    constructor(scene){
        super();
        this._scene =scene;
    }
    


    isItemsInterested(item ){
        return !!item;
    }
    onItemSelect(){
        this;
        const item =this.item();
        if(item){
            this._scene.actorSetCursorAll(this.isForAll(item));
            this._scene.openActorWindow();
        }
    }

    onActorOk(){
        const item = this.item();
        if(!item){return;}

        const user = this._scene.user();
        const action =new Game_Action(user);
        action.setItemObject(item);
        // actor.canUseでやると、hasItemに引っかかる。
        // 最終的には問題なくなるので、許容する
        if(user.canUse( item )){
            const targets =this.makeTargets(item);
            if(this.isValidTargets(action,targets)){
                this.executeAction(action,targets);
                this.pocket().consumeItem( this._itemIndex);
                return;
            }
        }
        SoundManager.playBuzzer();
    }
    onActorCancel(){
        this._scene.currentPocketWidnow().refresh();
    }

    // private:
    isValidTargets(action,targets){
        return targets.some(
            function(tar){
                return action.testApply(tar);
            }
        );
    }

    isForAll(item){        
        return [2,8,10].contains(item.scope);
    }

    makeTargets(item){
         item;
         var members =$gameParty.members();
         if(this.isForAll( item ) ){
             return members;
         }
         if(this._actorIndex >=0 ){
             return [members[this._actorIndex]];
         }
         return [];
    }

    executeAction(action,targets){
        targets.forEach(function(target) {
            const repeat = action.numRepeats();
            for(var i=0;i < repeat; i+=1){
                action.apply(target);
            }
        });;
        action.applyGlobal();
        this._scene.checkCommonEvent();
        this._scene.checkGameover();
        this._scene._actorWindow.refresh();
        SoundManager.playUseItem();
    }



};
class Mode_Swap extends ModeBase{
    constructor (scene){
        super();
        this._scene =scene;
        this._secondItemIndex=-1;
        this._secondPocket =null;
    }

    memberInit(){
        this._secondPocket=null;
        this._secondItemIndex=-1;
        this._itemIndex =-1;
        this._pocket =null;
    }
    onModeOk(){
        this._scene.setSecondActor();
        this._scene._pocketWindow2.open();
        this.memberInit();
    }

    onItemCancel(){
        this._scene.swapPocketWidnow();            
        if(this._itemIndex===-1){
            this._scene._pocketWindow2.close();
        }else{
            this._itemIndex=-1;
        }

    }
    executeSwap(){
        this;
        this.pocket().swapItem(this._secondPocket,this._itemIndex,this._secondItemIndex);
        this._scene.swapPocketWidnow();
        this._scene.currentPocketWidnow().refresh();
        this._scene.oterhPocketWindow().refresh();
        this.memberInit();
        this._scene.popWindow();
    }
    onItemSelect(){
        if(this._secondItemIndex!==-1){
            this.executeSwap();
            return;
        }
        if(this._itemIndex!==-1){
            this._scene.swapPocketWidnow();
            const p2= this._scene.currentPocketWidnow();
            this._scene.pushWindow(p2);
        }
    }
    
    setPocket(pocket){
        if(!this._pocket ){
            this._pocket =pocket;
            return;
        }
        if(!this._secondPocket){
            this._secondPocket =pocket;
        }
    }

    setItemIndex(index){
        if(this._itemIndex===-1){
            this._itemIndex =index;
        }else{
            this._secondItemIndex=index;
        }
    }

    isItemsInterested(item ){
        return true;
    }
};

class Mode_Remove extends ModeBase{
    constructor(scene){
        super();
        this._scene=scene;
    }
    onItemSelect(){
        this.pocket().releaseItem(this._itemIndex);
        this._scene().currentPocketWidnow().activate();
    }
    isItemsInterested(item ){return !!item;}
};
function Scene_ActorItemEquip() {
    this.initialize.apply(this,arguments);    
}
Scene_ActorItemEquip.prototype = Object.create(Scene_ItemBase.prototype);
Scene_ActorItemEquip.prototype.constructor = Scene_ActorItemEquip;

Scene_ActorItemEquip.prototype.initialize =function(){
    Scene_MenuBase.prototype.initialize.call(this);
    this._windowStack =[];
    this._mode ='non';
    this._itemUser =null;
    this._currentPocketWindow=null;
    this._otherPocketWindow=null;
};
Scene_ActorItemEquip.prototype.createModeObject=function(){
    var table={};
    table[xxx.symbolUse]=new Mode_Use(this);
    table[xxx.symbolSwap]=new Mode_Swap(this);
    table[xxx.symbolRemove]=new Mode_Remove(this);

    this._modeTable=table;
};


Scene_ActorItemEquip.prototype.create =function(){
    actorSetPocket();
    Scene_MenuBase.prototype.create.call(this);
    this.createModeSelectWindow();
    this.createPocketWindow();
    this.createItemSelectWindow();
    this.createActorWindow();

    this.createModeObject();
//    this.createNumberWindow();

//    this.pushWindow(this._pocketWindow);
    this.pushWindow(this._modeSelectWindow);
//    this.pushWindow(this._numberWindow);
};
Scene_ActorItemEquip.prototype.createItemSelectWindow =function(){
    var wx = 0;
    var wy = this._pocketWindow.y + this._pocketWindow.height;
    var ww = Graphics.boxWidth;
    var wh = Graphics.boxHeight- wy;

    var iw = new Window_ItemList(wx,wy,ww,wh);
    iw.setCategory('item');
    iw.makeItemList();
    this.setBasicHandler(iw);
    this._itemWindow=iw;
    this.addWindow(iw);
};
Scene_ActorItemEquip.prototype.createNumberWindow=function(){
    var num = new Window_PocketNumber(0,0,100);
    this._numberWindow=num;

    this.addWindow(num);

};
Scene_ActorItemEquip.prototype.setSecondActor =function(){
    this;
    const cpw = this.currentPocketWidnow();
    const opw = this.oterhPocketWindow();
    const members =$gameParty.members();

    const secondActor = members[0]===cpw.actor() ? members[1]:members[0];
    if(opw.actor() !==secondActor){
        opw.setActor(secondActor);
        opw.refresh();
    }
};

Scene_ActorItemEquip.prototype.isItemEnabled=function(item){
    const mode = this.currentModeObject();
    return mode.isItemsInterested(item);
};
Scene_ActorItemEquip.prototype.createModeSelectWindow =function(){
    var a = new Window_ModeSelect(0,0);
    this._modeSelectWindow=a;
    a.setHandler('cancel',this.popScene.bind(this));
    a.setHandler('ok',this.onModeSelect.bind(this));
    a.setHandler('pagedown', this.nextActor.bind(this));
    a.setHandler('pageup',   this.previousActor.bind(this));


    this.addWindow(a);
};

Scene_ActorItemEquip.prototype.onModeCancel =function(){
    const mode =this.currentModeObject();
    if(mode){
//    mode.onModeCancel();
    }
    this.popWindow();
};



Scene_ActorItemEquip.prototype.makePocketWindow=function(wx,wy){
    const ww = Graphics.boxWidth/2;
    const wh = Graphics.boxHeight/2;
  
    var aie = new Window_Pocket(wx,wy,ww,wh);
//    this._pocketWindow=aie;
    aie.setEnableJudge(  this.isItemEnabled.bind(this) );  
    aie.setActor(this.actor());
    aie.refresh();
    aie.setHandler( 'cancel',this.onItemCancel.bind(this) );
    aie.setHandler('ok',this.onPocketItemSelect.bind(this) );
    aie.setHandler('pagedown', this.nextActor.bind(this));
    aie.setHandler('pageup',   this.previousActor.bind(this));
    
    this.addWindow(aie);
    return aie;
};

Scene_ActorItemEquip.prototype.createPocketWindow =function(){
    this._pocketWindow = this.makePocketWindow(0,this._modeSelectWindow.y + this._modeSelectWindow.height);
    this._pocketWindow2 = this.makePocketWindow(
        this._pocketWindow.x +this._pocketWindow.width,
        this._pocketWindow.y
    );
    this._pocketWindow2.openness=0;
    this._currentPocketWindow = this._pocketWindow;
    this._otherPocketWindow =this._pocketWindow2;
};
Scene_ActorItemEquip.prototype.onActorChange =function(){
    const aw = this.activeWindow();
    const pw = this.currentPocketWidnow();
    pw.setActor(this.actor());
    pw.refresh();
    aw.activate();

};
Scene_ActorItemEquip.prototype.onPocketItemSelect =function(){    
    const mode =this.currentModeObject();
    if(mode){
        const pw = this.currentPocketWidnow();
        mode.setItemIndex(  pw.index() );
        mode.setPocket(pw.pocket()); 
        this.onItemSelect();
    }
}

Scene_ActorItemEquip.prototype.swapPocketWidnow =function(){
    const tmp = this._currentPocketWindow;
    this._currentPocketWindow = this._otherPocketWindow;
    this._otherPocketWindow=tmp;
};
Scene_ActorItemEquip.prototype.currentPocketWidnow =function(){
    return this._currentPocketWindow;
};
Scene_ActorItemEquip.prototype.oterhPocketWindow=function(){
    return this._otherPocketWindow;
};
Scene_ActorItemEquip.prototype.setBasicHandler =function(window){
    window.setHandler( 'cancel',this.popWindow.bind(this) );
    window.setHandler('ok',this.openActorWindow.bind(this) );
};

Scene_ActorItemEquip.prototype.hideSubWindow=function(window){
    window.hide();
    this.popWindow();

};



//=============================================================================
// modeSelect
//=============================================================================
Scene_ActorItemEquip.prototype.setMode =function(mode){
    this._mode=mode;
};

Scene_ActorItemEquip.prototype.onModeSelect=function(){
    
    this._currentPocketWindow = this._pocketWindow;
    this._otherPocketWindow = this._pocketWindow2;

    this.pushWindow(  this._pocketWindow );
    this._mode = this._modeSelectWindow.currentSymbol();
    this.currentModeObject().onModeOk();


};
Scene_ActorItemEquip.prototype.currentModeObject =function(){
   return this._modeTable [this._mode];
};

Scene_ActorItemEquip.prototype.onActorOk=function(){
    var modeObject = this.currentModeObject();
    if(modeObject){
        modeObject.setActorIndex(this._actorWindow.index());
        modeObject.onActorOk();
    }
};
Scene_ActorItemEquip.prototype.onActorCancel=function(){
    Scene_ItemBase.prototype.onActorCancel.call(this);
    this.currentModeObject().onActorCancel();
};
//誰が使うか
Scene_ActorItemEquip.prototype.user =Scene_Item.prototype.user;
// Scene_ActorItemEquip.prototype.user =function(){
//     return this._itemUser;
// };

Scene_ActorItemEquip.prototype.onItemSelect =function(){
    var mode =this.currentModeObject();
    if(mode){
        mode.onItemSelect();
    }
//    var item = this.currentItem();
    //使ったり入れ替えたり、切り替える
};
Scene_ActorItemEquip.prototype.onItemCancel=function(){
    this.currentModeObject().onItemCancel();
    this.popWindow();

};


Scene_ActorItemEquip.prototype.openActorWindow =function(selectAll){
    this._actorWindow.show();
    this.pushWindow(this._actorWindow);
};
Scene_ActorItemEquip.prototype.actorSetCursorAll =function(selectAll){
    this._actorWindow.setCursorAll(selectAll);
};




//=============================================================================
// WindowStackSystem
//=============================================================================
Scene_ActorItemEquip.prototype.activeWindow =function(){
    return this._windowStack[this._windowStack.length-1];
};

Scene_ActorItemEquip.prototype.rebindWindow =function(window){
    const bw = this.activeWindow();
    bw.deactivate();
    bw.deselect();
    this._windowStack[this._windowStack.length-1] =window;
};

Scene_ActorItemEquip.prototype.pushWindow =function( window ){
    if(window.active){return;}


    this._windowStack.push(window);

    window.activate();
    window.select(0);
};



Scene_ActorItemEquip.prototype.popWindow=function(){
    if(this._windowStack.length <=1 ){
        this.popScene();
        return;
    }
    var lastWindow = this._windowStack.pop();
    lastWindow.deselect();

    this.activeWindow().activate();

};

//MA_BattleHistory.Window_MenuCommand.addOriginalCommands=Window_MenuCommand.prototype.addOriginalCommands;
const zz_MA_BattleHistory_Window_MenuCommand_prototype_addOriginalCommands=Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands =function(){
    zz_MA_BattleHistory_Window_MenuCommand_prototype_addOriginalCommands.call(this);
    this.addCommand( xxx.commandName,xxx.commandKey,true);
};

const zz_Scene_Menu_prototype_createCommandWindow=Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
    var it=this;
    zz_Scene_Menu_prototype_createCommandWindow.call(this);
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



//テスト用に一時メニュー無効化

//Window_MenuCommand.prototype.addMainCommands=function(){};
//Window_MenuCommand.prototype.addFormationCommand=function(){};
})();
