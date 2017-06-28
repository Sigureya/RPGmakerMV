 //=============================================================================
// Mano_ItemPocket.js
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
 * @param InsertForPocket
 * @type switch
 * @desc 指定したスイッチがONの時、
 * 新しく手に入れたアイテムを先頭のアクターのポケットに入れます。
 * 
 * @param maxAmount
 * @type number
 * @desc １種類当たりの入れることができる量を定義します。
 * ※未実装
 * @default 99
 * 
 * @param pocketSize
 * @type number
 * @desc ポケットに入れることができるアイテムの種類を設定します。
 * 重複
 * ※未実装
 * @default 6
 * 
 * @canDuplicate
 * @boolean
 * @同じ種類のアイテムをポケットに入れることができるかを定義します。
 * 未実装
 * @default false
 * 
 * @param MaxColor
 * @type number
 * @desc 最大個数を所持している際の表示色を設定します。
 * システムのカラー番号で指定されます。
 * @default 18
 * 
 * @param NotEnoughColor
 * @type number
 * @desc マイセット実行時に、アイテムが足りなかった時の色を設定します。
 * @未実装
 * @default 4
 * 
 * @help
 * アクターごとにアイテムを所持させることができます。
 * スイッチを設定するパラメータは、無指定の場合false(OFF)として扱います。
 * <MaxAmount:2>
 * アイテム側に上記の記述をすることで、所持数を制限できます。
 * この場合は、ポケットにその種類のアイテムを入れる数を２個までに制限できます。
 * 
 * ■競合について
 * Game_Battler.consumeItemを再定義しているプラグインとは競合する可能性があります。
 * これは、アイテムを減らす処理において
 * Game_Battler.consumeItemを使わないようにしているからです。
 * 対応パッチは作成しますので、問題があった際には積極的に報告お願いします。
 * Twitterの方が反応速いです。
 * 
 * ※ヘルプの書き途中です。
 * 
 * var 0.7.5(2017/06/28) アイテムの出し入れで個数指定を可能にし、入れられない時はグレーアウト。
 * var 0.7.0(2017/06/21) バトル中にアイテムを使えるようになった
 * var 0.6.3(2017/06/21) バトルに少しだけ対応。
 * var 0.6.0(2017/06/20) アイテムを持たせることができるようになった。
 * var 0.5.0(2017/06/20) 公開
 */
/*
 * 現在のタスク
 * 入れる・しまうの個数チェックに、上限チェック処理を追加
 * 最大個数を入れてあるpocketに追加しようとすると、マイナス表示されるのを直す
 * 追加できないアイテムをグレーアウトする（モンハンでも、実装してる）
 * グレーアウト実装っぽい？
 * あと、ポケットに入っているアイテムを選択したときに、フォーカスを動かしてみる
 * ↑実装した
 * しまう時の処理にも、同様のものを入れる
 * 
 * TODO
 * マイセット(マイセット名は、アイテム取り出しと同じ場所に格納)
 * アイテム欄から持たせる処理(特定のボタンで呼び出す)
 * アイテムごとの持たせられる数の上限
 * モンハン形式の実装（1スロット1アイテム）
 * ドラクエ形式の実装（1スロットに1個で、複数所持）
 * 並び変え機能
 * ↑二つの機能は類似しているので、まとめて作る
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


(function () {
    'use strict';
    const param = PluginManager.parameters('Mano_ItemPocket');

    const xxx={
        maxAmount : Number (param.maxAmount),
        canDuplicate:Boolean(param.CanDuplicate==='true'),
        pocketSize :Number(param.pocketSize),

        commandKey :"actorItemEquip",
        commandName:'アイテム所持',

        wordUse:'使う',
        symbolUse:'use',
        wordSwap:'入れ替え',
        symbolSwap:'swap',
        wordRemove:'しまう',
        symbolRemove:'remove',
        wordAdd:'入れる',
        symbolAdd:'add',
        wordMyset:'マイセット',
        symbolMyset:'myset',
        wordSort:'整列',
        symbolSort:'sort',
        symbolOutOfWindow :'outwindow',
        symbolNon:'non',
        pocketWindow:{
            w:function(){return Graphics.boxWidth/2;},
            h:function(){return 240;},
        },
        color:{
            max:Number(param.MaxColor) || 18,
        },
        tag:{
            maxAmount:'MaxAmount'
        },
    };

const pocketFunction={
    maxAmount:function(itemId){
        return $dataItems[itemId].maxAmount_MA;
//        return xxx.maxAmount;
    },
    newItem:function(itemId){
        const id_= itemId || 0;
        return {id:id_,amount:0};        
    },
    pocketSize :function(){
        return xxx.pocketSize;
    },
    swapItem:function(){


    },
    createDummyData:function(){
        return [
            {id:1,amount:3},
            {id:3,amount:100},
            {id:4,amount:4},
            {id:5,amount:23},
            {id:6,amount:1},
        ];
    },

    backNullPush:function(data){
        if(data.length >= xxx.pocketSize){return;}
        const len = data.length;
        if(data[len-1]!==null){
            data.push(null);
        }
    },
    bootEachItem:function(item){
        const capa = item.meta[xxx.tag.maxAmount];
        if(capa){
            item.maxAmount_MA =Number(capa);
        }else{
            item.maxAmount_MA = xxx.maxAmount;
        }
    },

};
const zz_Scene_Boot_loadSystemImages = Scene_Boot.loadSystemImages;
Scene_Boot.loadSystemImages= function() {
    zz_Scene_Boot_loadSystemImages.apply(this,arguments);
    const len = $dataItems.length;
    for(var i =1; i < len;i+=1){
        pocketFunction.bootEachItem($dataItems[i]);
    }
};



 function MA_itemPocket(){
    this.initialize.apply(this,arguments);
}


MA_itemPocket.prototype.isFull =function(){
    return this._data.length >=this.maxSize();
};
MA_itemPocket.prototype.front =function(){
    return this._data[0];

};
MA_itemPocket.prototype.back =function(){
    return this._data[this._data.length-1];
};

MA_itemPocket.prototype.maxSize=function(){
    return 6;
};
MA_itemPocket.prototype.length =function(){
    return this._data.length;
};

MA_itemPocket.prototype.initialize=function(dataArray){
    this._data=dataArray || [];

//    this._indexTable= indexTable||{};
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
// nullや、空っぽのアイテムを取り除く
MA_itemPocket.prototype.normalize =function(){
    for(var i=0; i< this._data.length;++i){
        if(this.isEmpty(i)){
            this._data.splice(i,1);
        }
    }
};

MA_itemPocket.prototype.createIndexTable=function(){
    return new PocketIndex(this._data);
};

MA_itemPocket.prototype.hasItem =function(item){
    return this.findItem(item.id)!==null;    
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
        if( item.amount >  this.numItemsForParty(i) ){
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
            item.amount = Math.min( this.numItemsForParty(i),item.amount  );
        }
    }
};
MA_itemPocket.prototype.amount= function(index){
    return this._data[index].amount;
};
MA_itemPocket.prototype.amountSum= function(index){

    return this._data.reduce( function(pre,current){
        return pre + current.amount;
    }   );
};


MA_itemPocket.prototype.capacity =function(index){    
    return pocketFunction.maxAmount( this.itemData(index).id)-this.amount(index);
};
MA_itemPocket.prototype.itemCapacity =function(itemId){

    const index = this.indexOf(itemId);
    if(index ==-1){
        // TODO:アイテムごとの最大所持数を設定したら、ここを直す
        return pocketFunction.maxAmount(itemId);
    }
    
    return pocketFunction.maxAmount( itemId ) -this.amount(index);
};


// MA_itemPocket.prototype.maxAmount=function(itemId){

//     return xxx.maxAmount;
// };
MA_itemPocket.prototype.isItemMax =function(index){
    const item =this._data[index];
    return item.amount >= pocketFunction.maxAmount(item.id);
};


MA_itemPocket.prototype.isEmpty =function(index){
    const item =this._data[index];
    if(item){
        return item.amount <= 0;
    }
    return true;
};


// MA_itemPocket.prototype.newItem=function(itemId){
//     const id_= itemId || 0;
//     return {id:0,amount:0};
// };

MA_itemPocket.prototype.allocateItem =function(itemId){
    this._data.push(  pocketFunction.newItem(itemId));

};
MA_itemPocket.prototype.indexOf =function(itemId){
    for(var i=0;i <this._data.length;i+=1){
        if(this._data[i]){
            if(this._data[i].id ===itemId){
                return i;
            }
        }
    }
    return -1;

};

MA_itemPocket.prototype.findItem=function(itemId){
    const index = this.indexOf(itemId);
    if(index !==-1){
        return this._data[index];
    }
    return null;
};
//releaseItemの対となる関数
// indexを返すみたいな、ややこしいのはやめて、add用のオブジェクトを投げる
MA_itemPocket.prototype.addItem=function(itemData,amount){

    const lastIndex = this.indexOf(itemData.id);
    var index = lastIndex;
    if(lastIndex ===-1){
        index = this._data.length;
        const newItem = pocketFunction.newItem(itemData.id);
        this._data.push(newItem);        
    }
    this._data[index].amount += amount;
    return lastIndex;
};
MA_itemPocket.prototype.consumeItem=function(index){
    const item = this._data[index];
    const itemData = this.itemData(index);
    if(itemData.consumable){
        item.amount -=1;
    }
}
MA_itemPocket.prototype.canUse = function(index){
    return !this.isEmpty(index);
};

MA_itemPocket.prototype.releaseItem=function(index,amount){
    const item =this._data[index]; 
    const am = Math.min(amount,item.amount);
    item.amount -= am;

    $gameParty.gainItem(this.itemData(index) ,am);
};

class PocketIndex{
    constructor(data_){
        this._data =data_;
        this._table ={};
        for(var i=0;i <data_.length;++i){
            if(data_[i]){            
                const id =data_[i].id;
                this._table[id]={
                    index:i,
                    data:data_[i],
                }
            }
        }
    }
    addItem(itemId,amount){
        var obj = this._table[itemId];
        if(!obj){
            const newItem =pocketFunction.newItem(itemId);
            obj = {
                index:this._data.length,
                data:newItem
            };
            if( this._data[this._data.length-1]===null ){
                this._data[this._data.length-1] =newItem;
            }else{
                this._data.push(newItem);
            }
            this._table[itemId] =obj;
        }
        obj.data.amount +=amount;
    }

    canAdd(itemId){
        
        if(this.capacity(itemId) >0){
            return true;
        }

        return false;
    }

    amount(itemId){

        const obj = this._table[itemId];
        if(obj){
            return obj.data.amount;
        }
        return 0;
    }
    capacity(itemId){

        const amount = this.amount(itemId);
        if(this._data.length >=pocketFunction.pocketSize() &&amount ===0 ){            
            return 0;
        }
        return pocketFunction.maxAmount(itemId)-amount;
    }

    indexOf(itemId){
        const obj =this._table[itemId];
        if(obj){
            return obj.index;
        }
        return -1;
    }
};
function test(cond){
    console.log(cond ?"Success":'fauled');
}
const PocketTestSuite={
    pokectClass:function(){
        const pocket = new MA_itemPocket(pocketFunction.createDummyData());
        const indexTable = pocket.createIndexTable();
        for(var i=0;i <10;++i){
            test (indexTable.indexOf(i)=== pocket.indexOf(i) );
        }
    },

};
//PocketTestSuite.pokectClass();

//Window_ShopNumberを参考に作成する
function Window_PocketNumber() {
    this.initialize.apply(this, arguments);
}

Window_PocketNumber.prototype = Object.create(Window_Selectable.prototype);
Window_PocketNumber.prototype.constructor = Window_PocketNumber;

Window_PocketNumber.prototype.initialize=function(x,y,w,h){
    Window_Selectable.prototype.initialize.call(this,x,y,w,h);
    this._item =null;
    this._max=1;
    this._number=1;
    
}; 
Window_PocketNumber.prototype.createButtons =function(){
//    Window_ShopNumber.prototype.createButtons.call(this);
};
Window_PocketNumber.prototype.clear =function(){
    this._item =null;
    this.refresh();
};

Window_PocketNumber.prototype.refresh=function(){
    this.contents.clear();
    if(this._item){
    this.resetTextColor();
    this.drawItemName(this._item,0,0);
    this.drawMultiplicationSign();
    this.drawNumber();
    }
};
Window_PocketNumber.prototype.cursorX =function(){
    return Window_ShopNumber.prototype.cursorX.call(this);
};

Window_PocketNumber.prototype.drawMultiplicationSign=function(){
    Window_ShopNumber.prototype.drawMultiplicationSign.call(this);
};
Window_PocketNumber.prototype.itemY =function(){
    return 0;
};

Window_PocketNumber.prototype.updateCursor =function(){
    if(this._item){
        Window_ShopNumber.prototype.updateCursor.call(this);
    }else{
        this.setCursorRect(0, 0, 0, 0);        
    }
};

Window_PocketNumber.prototype.drawNumber=function(){
    const x = this.cursorX();
    const y = this.itemY();
    const width = this.cursorWidth() - this.textPadding();
    this.resetTextColor();
    this.drawText(this._number, x,y,width,'right' );
};
Window_PocketNumber.prototype.cursorWidth = function() {
    return Window_ShopNumber.prototype.cursorWidth.call(this);
};

Window_PocketNumber.prototype.maxDigits=function(){
    return 2;
};

Window_PocketNumber.prototype.setup=function(item,max){
    this._number =1;
    this._item =item;
    this._max =max;
};


Window_PocketNumber.prototype.changeNumber =function(amount){
    const lastNumber =this._number;
    this._number = (this._number + amount).clamp(1, this._max);
    if (this._number !== lastNumber) {
        SoundManager.playCursor();
        this.refresh();
    }
};

Window_PocketNumber.prototype.update = function() {
    Window_Selectable.prototype.update.call(this);
    this.processNumberChange();
};

Window_PocketNumber.prototype.processNumberChange=function(){
    Window_ShopNumber.prototype.processNumberChange.call(this);
};

Window_PocketNumber.prototype.number=function(){
    return this._number;
};

function Window_ModeSelect(){
    this.initialize.apply(this,arguments);
};
Window_ModeSelect.prototype = Object.create(Window_Command.prototype);
Window_ModeSelect.prototype.constructor = Window_ModeSelect;

Window_ModeSelect.prototype.initialize=function(x,y){
    Window_HorzCommand.prototype.initialize.call(this,x,y);
    this.deactivate();
    this.deselect();
};
Window_ModeSelect.prototype.windowWidth = function() {
    return Graphics.boxWidth;
};

 Window_ModeSelect.prototype.maxCols = function() {
     return 4;
 };

Window_ModeSelect.prototype.makeCommandList =function(){
    this.addCommand(xxx.wordUse, xxx.symbolUse );
    this.addCommand(xxx.wordSwap,xxx.symbolSwap);
    this.addCommand(xxx.wordRemove,xxx.symbolRemove);
    this.addCommand(xxx.wordAdd, xxx.symbolAdd );
//    this.addCommand(xxx.wordMyset,xxx.symbolMyset);
//    this.addCommand(xxx.wordSort,xxx.symbolSort);
};

// Window_ModeSelect.prototype.cursorDown=function(){
//     //後回し
//     // this.deactivate();
//     // this.deselect();
//     // this.callHandler(xxx.symbolOutOfWindow);
// };



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
//    this._bindedItem =-1;
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

Window_Pocket.prototype.itemObject =function(){
    return this._data[this.index()];
};

Window_Pocket.prototype.item =function(){
    const index =this.index();
    return  index>=0 ? this._pocket.itemData(index) :null;
};
Window_Pocket.prototype.selectedObject=function(){
    return this._data[this.index()];
};
Window_Pocket.prototype.indexOf=function(item,start){
    
    for(var i=start ||0  ; i< this._data.length; i+=1){
        if(item.id ===this._data[i].id){
            return i;
        }
    }
    return -1;
};

Window_Pocket.prototype.maxPageRows=function(){
    return Window_Selectable.prototype.maxPageRows.call(this)-1;
};

Window_Pocket.prototype.actor =function(){
    return this._actor;
};
Window_Pocket.prototype.name=function(){
    return this.actor().name();
};
Window_Pocket.prototype.pocket=function(){
    return this._pocket;
};
Window_Pocket.prototype.setActor =function(actor){
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

    this.drawText(this.name(), 0,0,this.itemWidth());
    var y = this.contents.fontSize;
    this.drawHorzLine(y);
};

Window_Pocket.prototype.drawAllItems =function(){
    Window_Selectable.prototype.drawAllItems.call(this);
    this.drawActorName();
};

Window_Pocket.prototype.maxCols = function() {
    return 1;
};
Window_Pocket.prototype.itemCountWidth =function(){
    return this.textWidth('00/00');
};
Window_Pocket.prototype.selectBack=function(){
    this.select( Math.max( 0,this._data.length-1));
};

Window_Pocket.prototype.drawItemCount =function(item,x,y,width){
    this.drawText( item.id,x,y,width ,'right');
};
Window_Pocket.prototype.itemRect=function(index){
    var rect=  Window_Selectable.prototype.itemRect.call(this,index);
    rect.y += this.actorNameHeight();
    return rect;
};

Window_Pocket.prototype.drawItem =function(index){
    const item = this._data[index];
    if(item){
        var numberWidth = this.itemCountWidth();
        var rect = this.itemRect(index);
        rect.width -= this.textPadding();
        this.drawItemName($dataItems[ item.id], rect.x, rect.y, rect.width );
        
        if(this._pocket.isItemMax(index  )){
            this.changeTextColor( this.textColor(xxx.color.max) );
        }
        this.drawText( item.amount,rect.x,rect.y,rect.width ,'right');
    }
};

function Window_MySet(){
	this.initialize.apply(this,arguments);
};
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


class ModeBase{
    constructor(scene){
        this._number =0;
        this._scene =scene;
        this._pocket =null;
        this._itemIndex =-1;
        this._actorIndex=-1
        this._subWindow=null;
        this._destoyPocketIndexList=[];
    }

    destoryPocketIndex(actorId){
        this._destoyPocketIndexList[actorId]=true;
    }

    mainWindow(){

    }
    subWindow(){
        return this._subWindow;
    }


    setItemIndex(index){
        this._itemIndex =index;
    }
    setPocket(pocket){
        this._pocket =pocket;
    }

    setNumber(number){
        this._number=number;
    }
    itemData(){
        return this._pocket.itemData(this._itemIndex);
    }
    pocket(){
        return this._pocket;
    }
    log(){
        console.log('log not implement');
    }
    log_EX(){
        console.log( typeof(this));
        this.log();

    }

    normalizePocket(){
        this.pocket().normalize();
    }

    onModeOk(){}
    onModeOk_EX(){
        this._actorIndex = this._scene.actor()._actorId;
        this.onModeOk();
        if(this._subWindow){
            this._subWindow.open();
        }
//        this.onActorChange_EX();
    }
    onModeExit(){}
    onModeExit_EX(){ 
        this.onModeExit();
        if(this._subWindow){
            this._subWindow.close();
        }
     }
    onNumberOk(){}
    onNumberOk_EX(){this.onNumberOk();}
    onNumberCancel(){}
    onNumberCancel_EX(){this.onNumberCancel();}
    onActorChange(){
        this._scene.defaultActorChange();
        this._scene._pocketWindow.select(0);        
    }
    actorId(){
        return this._actorIndex;
    }

    onActorChange_EX(){
        this._actorIndex = this._scene.actor()._actorId;
        this.onActorChange();
    }
    onItemOk(){}
    onItemSelect_EX(){ this.onItemOk(); }
    onItemCancel(){}
    onItemCancel_EX(){this.onItemCancel();}
    onActorOk(){}
    onActorOk_EX(){ this.onActorOk();}
    onActorCancel(){}
    onActorCancel_EX(){this.onActorCancel();}

    isItemsInterested(item ){return false;}
};
class Mode_Use extends ModeBase{
    constructor(scene){
        super(scene);
        this._scene =scene;
    }

    isItemsInterested(item ){
        return !!item;    
    }
    onItemOk(){
        const item =this.itemData();
        if(item){
            this._scene._actorWindow.select(0);
            this._scene.actorSetCursorAll(this.isForAll(item));
            this._scene.openActorWindow();
        }
    }

    onActorOk(){
        const item = this.itemData();
        if(!item){return;}

        if(this.pocket().canUse( this._itemIndex )){
            const user = this._scene.user();
            const action =new Game_Action(user);
            action.setItemObject(item);
            const targets =this.makeTargets(item);
            if(this.isValidTargets(action,targets)){
                this.executeAction(action,targets);
                this.pocket().consumeItem( this._itemIndex);

                if(this.pocket().amount( this._itemIndex ) <=0){
                    this.destoryPocketIndex( this._scene.actor()._actorId);
                }
                return;
            }
        }
        SoundManager.playBuzzer();
    }
    onActorCancel(){
        this.normalizePocket();
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
         var members =$gameParty.members();
         if(this.isForAll( item ) ){
             return members;
         }
         const index = this._scene._actorWindow.index();
         if(index >=0 ){
             return [members[index]];
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
//アクター切り替え時に、何かが必要
class Mode_Swap extends ModeBase{
    constructor (scene){
        super(scene);
        this._scene =scene;
        this._secondItemIndex=-1;
        this._secondPocket =null;
        this._actor=null;
        this._mainWindow =scene._pocketWindow;
        this._subWindow = scene._pocketWindow2;
    }

    memberReset(){
        this._secondPocket=null;
        this._secondItemIndex=-1;
        this._itemIndex =-1;
        this._pocket =null;
    }


    onModeExit(){
        $gameParty.setMenuActor(this._actor);
    }
    onModeOk(){

        this.memberReset();
        this._scene.setSecondActor();
        this._subWindow.deselect();

        const p= this._mainWindow.pocket();
        this.normalizeAtSwap (p);
        this._actor =this._scene.actor();
    }

    onItemCancel(){
        if(this._itemIndex===-1){


        }else{
            this._mainWindow.activate();
            this._itemIndex=-1;
        }

    }
    normalizeAtSwap(pocket){
        pocket.normalize();
        pocketFunction.backNullPush(pocket._data);
    }
    onActorChange(){
        const actor =this._scene.actor();
        this._subWindow.setActor(actor);            
        this.normalizeAtSwap( actor.itemPocket());
        this._subWindow.deselect();
        this._subWindow.refresh();
    }
    
    cleanup(){
        this.destoryPocketIndex( this._mainWindow.actor()._actorId  );
        this.destoryPocketIndex( this._subWindow.actor()._actorId  );
    }

    executeSwap(){
        const pocket1 = this._mainWindow.pocket();
        const pocket2 = this._subWindow.pocket();
        const itemObject = this._mainWindow.itemObject();
        const swap1_notNull = !!itemObject;
        pocket1.swapItem(pocket2,this._mainWindow.index(),this._subWindow.index());

        this.normalizeAtSwap(pocket1 );
        this.normalizeAtSwap(pocket2);
        this.cleanup();


        if(swap1_notNull){
//            this._mainWindow.select(0);
        }else{
            this._mainWindow.selectBack();            
        }

        this._mainWindow.refresh();
        this._subWindow.refresh();

        this.memberReset();
        this._scene.popWindow();

    }

    checkNull2(pocket_){
        var count=0;
        for (var index = 0; index < pocket_._data.length; index++) {
            var element = pocket_._data[index];
            if(element===null){
                count +=1;
            }            
        }
        if( count >=2){
            console.log("null2でまずいですよ");
            this;
        }
    }

    log(){
        log('first :'+this._itemIndex);
        log('second:'+this._secondItemIndex);
    }

    onItemOk(){
        if(this._secondItemIndex!==-1){
            var a = this._subWindow.active;
            this.executeSwap();
            return;
        }
        if(this._itemIndex!==-1){
            this._scene.pushWindow(this._subWindow);
            this.normalizeAtSwap( this._subWindow.pocket() );
            // 末尾を選ぶじゃなくて、window1がnull選択なら、nullでないのを選択に
            const item =this.itemData();
            if(item){
                this._subWindow.selectBack();
            }else{
                //LR時のselect(0)はこれではない
                this._subWindow.select(0);
            }
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
        super(scene);
        this._scene=scene;
        this._subWindow =scene._numberWindow;
    }

    onNumberOk(){
        const pocket = this.pocket();

        pocket.releaseItem(this._itemIndex,this._number);
        if(pocket.amount(this._itemIndex)<=0){
            this.destoryPocketIndex(this.actorId());
        }
        pocket.normalize();

        const pw = this._scene.currentPocketWidnow();
        pw.refresh();
        this._scene._itemWindow.refresh();

    }

    onItemOk(){


        const pw = this._scene.currentPocketWidnow();
        const item = pw.item();
        this._subWindow.setup( item,this.pocket().amount(this._itemIndex)   );
        this._subWindow.refresh();
        this._scene.pushWindow(this._subWindow);
    }
    isItemsInterested(item ){return !!item;}
};

function Window_AddItem(){
    this.initialize.apply(this,arguments);
}

Window_AddItem.prototype = Object.create(Window_ItemList.prototype);
Window_AddItem.prototype.constructor = Window_AddItem;

Window_AddItem.prototype.initialize=function(x,y,w,h){
//    this._selectFunc=function(){};
    Window_ItemList.prototype.initialize.apply(this,arguments);
    this._category ='item';
    this._enableJudge =function(item){
        return true;
    };
};

//外部テーブルと連携する
Window_AddItem.prototype.isEnabled =function(item){
    return this._enableJudge(item);

};
Window_AddItem.prototype.setEnabledFunc=function(func){
    this._enableJudge=func;
};
Window_AddItem.prototype.drawItem =function(index){
    index;
    Window_ItemList.prototype.drawItem.call(this,index);
};

Window_AddItem.prototype.makeItemList=function(){
    this._data = $gameParty.items();
};

class Mode_Add extends ModeBase{
    constructor(scene){
        super(scene);
        this._subWindow =scene._numberWindow;
        this._cache =[];
        this._cache.length = $gameParty.members().length;
    }

    addTable(actor){
        console.log('chage:'+actor.name());
        this._scene.pocketIndex(actor);
    }
    onModeOk(){
        this.setPocket(this._scene.currentPocketWidnow().pocket() );
        this._scene.openItemWindow();
        this.addTable(this._scene.actor());
    }
    


    isItemsInterested(item ){
        return false;
        return !!item;
    }
    onItemOk(){
        const item =this._scene.item();
        const pocket = this.pocket();
        const indexTable = this._scene.pocketIndex(this._scene.actor());
        const index = indexTable.indexOf(item.id); //pocket.indexOf(item.id);
        

        const pocketCapacity =indexTable.capacity(item.id);// index !==-1?pocket.capacity(index) :pocketFunction.maxAmount(item.id);
        const capacity =  Math.min(pocketCapacity, $gameParty.numItems( item ));
        this._scene._pocketWindow.select(index);
        this._subWindow.setup(item,capacity);
        this._subWindow.refresh();
        this._scene.pushWindow( this._subWindow );
    }

    onNumberCancel(){
        this._scene._pocketWindow.deselect();        
    }
     onActorChange(){
         super.onActorChange();
         this._scene._itemWindow.refresh();        
         this._scene._pocketWindow.deselect();        
     }



    onNumberOk(){
        const item =this._scene.item();
        
        const table=  this._scene.pocketIndex(this._scene.actor()  );

        $gameParty.loseItem( item,this._number );
        table.addItem(item.id,this._number);

        this._scene.currentPocketWidnow().refresh();
        this._scene._itemWindow.refresh();
        this._scene._pocketWindow.deselect();
    }

};

function Scene_ItemPocket() {
    this.initialize.apply(this,arguments);    
}
Scene_ItemPocket.prototype = Object.create(Scene_ItemBase.prototype);
Scene_ItemPocket.prototype.constructor = Scene_ItemPocket;

Scene_ItemPocket.prototype.initialize =function(){
    Scene_MenuBase.prototype.initialize.call(this);
    this._windowStack =[];
    this._mode ='non';
    this._itemUser =null;
    this._currentPocketWindow=null;
    this._otherPocketWindow=null;
    this._pocketIndex=[];
};

Scene_ItemPocket.prototype.pocketIndex =function(actor){
    const id = actor._actorId;
    var result = this._pocketIndex[id];
    if(!result){
        result =actor.itemPocket().createIndexTable();
        this._pocketIndex[id]=result;
    }
    return result;
};
Scene_ItemPocket.prototype.destoryPocketIndex=function(){
    const mode = this.currentModeObject();
    const len =mode._destoyPocketIndexList.length;
    for(var i=0; i<len;++i){
        if( mode._destoyPocketIndexList[i]){
            this._pocketIndex[i]=null;
        }
    }
    mode._destoyPocketIndexList.length=0;
};


Scene_ItemPocket.prototype.createModeObject=function(){
    var table={};
    table[xxx.symbolUse]=new Mode_Use(this);
    table[xxx.symbolSwap]=new Mode_Swap(this);
    table[xxx.symbolRemove]=new Mode_Remove(this);
    table[xxx.symbolAdd] = new Mode_Add(this);

    this._modeTable=table;
};

Scene_ItemPocket.prototype.createAllWindow=function(){
    this.createHelpWindow();
    this.createModeSelectWindow();
    this.createPocketWindow();
    this.createSubPocketWindow();
    this.createItemSelectWindow();
    this.createActorWindow();
    this.createNumberWindow();

};
Scene_ItemPocket.prototype.create =function(){
    actorSetPocket();
    Scene_MenuBase.prototype.create.call(this);

    this.createAllWindow();

    this.createModeObject();
    this.pushWindow(this._modeSelectWindow);
    this._modeSelectWindow.select(0);
};
Scene_ItemPocket.prototype.subWindowRect=function(){
    return {
        x:Graphics.boxWidth/2,
        y:this._modeSelectWindow.y+this._modeSelectWindow.height,
        width:xxx.pocketWindow.w(),
        height:xxx.pocketWindow.h()
    };

};

Scene_ItemPocket.prototype.canAddItem =function(item){
    const indexTable= this.pocketIndex(this.actor());
    
    return indexTable.canAdd(item.id) ;
};

Scene_ItemPocket.prototype.createItemSelectWindow =function(){
    const wx = 0;
    const wy = this._pocketWindow.y + this._pocketWindow.height;
    const ww = Graphics.boxWidth;
    const wh = Graphics.boxHeight- wy;

    const iw = new Window_AddItem(wx,wy,ww,wh);
    iw.setEnabledFunc( this.canAddItem.bind(this) );
    iw.setHandler( 'cancel',this.onItemCancel.bind(this) );
    iw.setHandler('ok',this.onItemSelect.bind(this));
    iw.setCategory('item');
    iw.setHelpWindow(this._helpWindow);
    iw.makeItemList();
    iw.refresh();


    this._itemWindow=iw;
    this.addWindow(iw);
};


Scene_ItemPocket.prototype.createNumberWindow=function(){
    const rect = this.subWindowRect();
    const num = new Window_PocketNumber(rect.x,rect.y,rect.width, rect.height);
    this._numberWindow = num;
    num.setHandler('cancel',this.onNumberCancel.bind(this));
    num.setHandler('ok',this.onNumberOk.bind(this));
    num.openness=0;

    this.addWindow(num);
};

Scene_ItemPocket.prototype.number =function(){
    return this._numberWindow.number();
};

Scene_ItemPocket.prototype.openNumberWindow=function(){
    this._numberWindow.open();
    this._numberWindow.setup(null,0);
    this._numberWindow.clear();
};

Scene_ItemPocket.prototype.onNumberOk =function(){
    const mode = this.currentModeObject();
    mode.setNumber(this._numberWindow.number());
    mode.onNumberOk_EX();
    this._numberWindow.clear();
    this.popWindow();
};

Scene_ItemPocket.prototype.onNumberCancel =function(){
    this._numberWindow.clear();
    this.currentModeObject().onNumberCancel_EX();
    this.popWindow();
};

Scene_ItemPocket.prototype.setSecondActor =function(){
    const cpw = this.currentPocketWidnow();
    const opw = this.oterhPocketWindow();
    const members =$gameParty.members();
    $gameParty.setMenuActor($gameParty.members()[0]);
    if(cpw.actor()===$gameParty.menuActor()){
        $gameParty.makeMenuActorNext();
    }
    opw.setActor($gameParty.menuActor());
    opw.refresh();
};

Scene_ItemPocket.prototype.isItemEnabled=function(item){
    const mode = this.currentModeObject();
    return mode.isItemsInterested(item);
};
Scene_ItemPocket.prototype.createModeSelectWindow =function(){
    var a = new Window_ModeSelect(0,this._helpWindow.y +this._helpWindow.height );
    this._modeSelectWindow=a;
    a.setHandler('cancel',this.onModeCancel.bind(this));
    a.setHandler('ok',this.onModeSelect.bind(this));
    a.setHandler('pagedown', this.nextActor.bind(this));
    a.setHandler('pageup',   this.previousActor.bind(this));

    this.addWindow(a); 
};

Scene_ItemPocket.prototype.onModeCancel =function(){
    this.popWindow();
};

Scene_ItemPocket.prototype.makePocketWindow=function(wx,wy){
    const ww = xxx.pocketWindow.w();
    const wh = xxx.pocketWindow.h();
  
    var aie = new Window_Pocket(wx,wy,ww,wh);
    aie.setEnableJudge(  this.isItemEnabled.bind(this) );  
    aie.setHandler( 'cancel',this.onItemCancel.bind(this) );
    aie.setHandler('ok',this.onPocketItemSelect.bind(this) );
    aie.setHandler('pagedown', this.nextActor.bind(this));
    aie.setHandler('pageup',   this.previousActor.bind(this));
    aie.setHelpWindow(this._helpWindow);
    
    this.addWindow(aie);
    return aie;
};


Scene_ItemPocket.prototype.createSubPocketWindow=function(){
    const w = this.subWindowRect();
    var aie = new Window_Pocket(w.x,w.y,w.width,w.height);
    this._pocketWindow2 = aie;
    aie.setEnableJudge(  this.isItemEnabled.bind(this) );  
    aie.setHandler( 'cancel',this.onItemCancel.bind(this) );
    aie.setHandler('ok',this.onPocketItemSelect.bind(this) );
    aie.setHelpWindow(this._helpWindow);
    aie.openness=0;    
    this.addWindow(aie);
};

// window2には、pageup/downは入れない。バグる
Scene_ItemPocket.prototype.createPocketWindow =function(){

    this._pocketWindow = this.makePocketWindow(0,this._modeSelectWindow.y + this._modeSelectWindow.height);
    this._pocketWindow.setActor(this.actor());
    this._pocketWindow.refresh();
    this._currentPocketWindow = this._pocketWindow;
    this._otherPocketWindow =this._pocketWindow2;
};

Scene_ItemPocket.prototype.defaultActorChange =function(){
    this._pocketWindow.setActor(this.actor());
//    this._pocketWindow.select(0);
    this._pocketWindow.refresh();

};
Scene_ItemPocket.prototype.onActorChange =function(){
    const aw = this.activeWindow();
    const mode =this.currentModeObject();
    mode.onActorChange_EX();
    // if(mode){  
    // }else{
    //     this.defaultActorChange();
    // }
    this.activeWindow().activate();
};

Scene_ItemPocket.prototype.openItemWindow=function(){
    this.pushWindow(this._itemWindow);
};
Scene_ItemPocket.prototype.onPocketItemSelect =function(){    
    const mode =this.currentModeObject();
    if(mode){
        const pw = this.currentPocketWidnow();
        mode.setItemIndex(  pw.index() );
        mode.setPocket(pw.pocket()); 
        this.onItemSelect();
    }
}

// Scene_ItemPocket.prototype.swapPocketWidnow =function(){
//     const tmp = this._currentPocketWindow;
//     this._currentPocketWindow = this._otherPocketWindow;
//     this._otherPocketWindow=tmp;
// };
Scene_ItemPocket.prototype.currentPocketWidnow =function(){
    return this._currentPocketWindow;
};
Scene_ItemPocket.prototype.oterhPocketWindow=function(){
    return this._otherPocketWindow;
};
Scene_ItemPocket.prototype.setBasicHandler =function(window){
    window.setHandler( 'cancel',this.popWindow.bind(this) );
    window.setHandler('ok',this.openActorWindow.bind(this) );
};

Scene_ItemPocket.prototype.hideSubWindow=function(window){
    window.hide();
    this.popWindow();
};

//=============================================================================
// modeSelect
//=============================================================================
Scene_ItemPocket.prototype.setMode =function(mode){
    this._mode=mode;
};

Scene_ItemPocket.prototype.onModeSelect=function(){
    
    this._currentPocketWindow = this._pocketWindow;
    this._otherPocketWindow = this._pocketWindow2;

    this._mode = this._modeSelectWindow.currentSymbol();
    if(this._mode ===xxx.symbolAdd){
        this._itemWindow.select(0);
        this.pushWindow(this._itemWindow);
    }else{
        const cpw =this.currentPocketWidnow();
        cpw.select(0);
        this.pushWindow(  cpw );
    }
    const modeObj =this.currentModeObject();

    modeObj.onModeOk_EX();
};
Scene_ItemPocket.prototype.currentModeObject =function(){
   const mode=  this._modeSelectWindow.currentData();
   return this._modeTable [mode.symbol];
};

Scene_ItemPocket.prototype.selectNumberSelection=function(){


};

Scene_ItemPocket.prototype.currentWindow=function(){
    return this._windowStack[this._windowStack.length-1];

};

Scene_ItemPocket.prototype.onActorOk=function(){
    var modeObject = this.currentModeObject();
    if(modeObject){
        modeObject.onActorOk_EX();
    }
};
Scene_ItemPocket.prototype.onActorCancel=function(){
    Scene_ItemBase.prototype.onActorCancel.call(this);
    this.currentModeObject().onActorCancel_EX();
};
Scene_ItemPocket.prototype.user =function(){
    return  Scene_Item.prototype.user.call(this);
};

Scene_ItemPocket.prototype.onItemSelect =function(){
    var mode =this.currentModeObject();
    if(mode){

        mode.onItemSelect_EX();

    }
};
Scene_ItemPocket.prototype.onItemCancel=function(){
    this.currentModeObject().onItemCancel_EX();
    this.popWindow();
};
Scene_ItemPocket.prototype.openActorWindow =function(){
    this._actorWindow.show();
    this.pushWindow(this._actorWindow);
};
Scene_ItemPocket.prototype.actorSetCursorAll =function(selectAll){
    this._actorWindow.setCursorAll(selectAll);
};

//=============================================================================
// WindowStackSystem
//=============================================================================
Scene_ItemPocket.prototype.activeWindow =function(){
    return this._windowStack[this._windowStack.length-1];
};

Scene_ItemPocket.prototype.pushWindow =function( window ){
    if(window.active){return;}
//    console.log('push:');
//    console.log(window);


    this._windowStack.push(window);
    window.activate();
};

Scene_ItemPocket.prototype.popWindow=function(){
    if(this._windowStack.length <=1 ){
        this.popScene();
        return;
    }
    var lastWindow = this._windowStack.pop();
    lastWindow.deselect();
//    console.log('pop');
//    console.log(lastWindow);

    this.activeWindow().activate();
    if(this._windowStack.length ===1){
        this.destoryPocketIndex();
        const mode = this.currentModeObject();
        mode.onModeExit_EX();        
        this._mode ='non';
        this._helpWindow.clear();
    }

};

//デバッグ用
Scene_ItemPocket.prototype.modeLog=function(){
    this.currentModeObject().log_EX();

};

const zz_MA_BattleHistory_Window_MenuCommand_prototype_addOriginalCommands=Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands =function(){
    zz_MA_BattleHistory_Window_MenuCommand_prototype_addOriginalCommands.call(this);
    this.addCommand( xxx.commandName,xxx.commandKey,true);
};

const zz_Scene_Menu_prototype_createCommandWindow=Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
    zz_Scene_Menu_prototype_createCommandWindow.call(this);
    this._commandWindow.setHandler(xxx.commandKey, this.commandPersonal.bind(this) );
};

const zz_MA_scene_Scene_Menu_onPersonalOk=Scene_Menu.prototype.onPersonalOk;
Scene_Menu.prototype.onPersonalOk =function(){
    if( this._commandWindow.currentSymbol() ===xxx.commandKey  ){
        SceneManager.push(Scene_ItemPocket  );
    }else{
        zz_MA_scene_Scene_Menu_onPersonalOk.call(this);
    }
}


const zz_MA_DataManager_extractSaveContents =DataManager.extractSaveContents;
DataManager.extractSaveContents =function(){
    zz_MA_DataManager_extractSaveContents.apply(this,arguments);
    actorSetPocket();
}
function actorSetPocket(){
    $gameActors._data.forEach(function(actor) {
        if(!actor){return;}

        if(!actor.pocket_MA){
            actor.pocket_MA=[];
        }
    });;
}


// デフォルトのconsumeItemを無力化する
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
    this.pocket_MA =[];
    if(actorId ===1  ){
        this.pocket_MA=pocketFunction.createDummyData();
        return;
    }
};

Game_Battler.prototype.itemPocket =function(){
    return new MA_itemPocket([]);
};

Game_Actor.prototype.itemPocket=function(){
    return new MA_itemPocket(this.pocket_MA);
};


function Window_BattlePocket(){
	this.initialize.apply(this,arguments);
}
Window_BattlePocket.prototype = Object.create(Window_Pocket.prototype);
Window_BattlePocket.prototype.constructor = Window_BattlePocket;

Window_BattlePocket.prototype.initialize=function(){
    Window_Pocket.prototype.initialize.apply(this,arguments);
    this.hide();
};

Window_BattlePocket.prototype.maxCols=function(){
    return 2;
};
Window_BattlePocket.prototype.selectLast =function(){
    this.select(0);
};

Window_BattlePocket.prototype.show = function() {
    this.selectLast();
    this.showHelpWindow();
    Window_Pocket.prototype.show.call(this);
};

Window_BattlePocket.prototype.hide = function() {
    this.hideHelpWindow();
    Window_Pocket.prototype.hide.call(this);
};
Window_BattlePocket.prototype.itemRect=function(index){
    return  Window_Selectable.prototype.itemRect.call(this,index);
};
Window_BattlePocket.prototype.isEnabled =function(item){
    return this._actor.canUse(item);
};


Window_BattlePocket.prototype.drawAllItems =function(){
    Window_Selectable.prototype.drawAllItems.call(this);
};

Scene_Battle.prototype.onBattlePocketOk=function(){
    const action = BattleManager.inputtingAction();
    const pocketPtr = this._itemWindow.selectedObject();
    action._pocketPtr = pocketPtr;
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




//テスト用に一時メニュー無効化

//Window_MenuCommand.prototype.addMainCommands=function(){};
//Window_MenuCommand.prototype.addFormationCommand=function(){};
})();
