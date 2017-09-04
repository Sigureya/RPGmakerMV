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
 * 
 * @param InsertForPocket
 * @type switch
 * @desc 指定したスイッチがONの時、
 * 新しく手に入れたアイテムを先頭のアクターのポケットに入れます。
 * 
 * @param maxAmount
 * @type number
 * @desc １種類当たりの入れることができる量を定義します。
 * @default 99
 * 
 * @param pocketSize
 * @type number
 * @desc ポケットに入れることができるアイテムの種類を設定します。
 * @default 6
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
 * 
 * @param NotEnoughColor
 * @type number
 * @desc マイセット実行時に、アイテムが足りなかった時の色を設定します。
 * @未実装
 * @default 4
 * 
 * 
 * @param usingMyset
 * @type boolean
 * @desc マイセット機能を使うかどうかを定義します。
 * @on マイセット機能を使う
 * @off マイセット機能を使わない
 * @default true
 * 
 * @param mysetSize
 * @type number
 * @desc マイセットの保存数を定義します。
 * @default 8
 * 
 * @param mysetFormat
 * @type string
 * @desc マイセットのデフォルト名です。
 * @default マイセット【%1】
 * 
 * @param saveMyset
 * @type string
 * @desc マイセットを保存する時のコマンドです。
 * @default マイセットの保存
 * 
 * @param loadMyset
 * @type string
 * @desc マイセットを読み込む時のコマンドです。
 * @default マイセットの読み込み
 * 
 * 
 * @param renameMyset
 * @type string
 * @desc マイセットの登録名を変更する時のコマンド名です
 * @default マイセットの名前変更
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
 * 
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
 * 
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
 * 
 * var 1.0.0(2017/08/26) イベントコマンド「条件分岐」で、アイテム所持をチェックできるようにした。
 * DQ風所持モードの拡張プラグインを追加。
 * var 0.7.5(2017/06/28) アイテムの出し入れで個数指定を可能にし、入れられない時はグレーアウト。
 * var 0.7.0(2017/06/21) バトル中にアイテムを使えるようになった
 * var 0.6.3(2017/06/21) バトルに少しだけ対応。
 * var 0.6.0(2017/06/20) アイテムを持たせることができるようになった。
 * var 0.5.0(2017/06/20) 公開
 */
/*
 * 現在のタスク
 * 
 * TODO
 * 
 * マイセット(マイセット名は、アイテム取り出しと同じ場所に格納)
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

function MA_itemPocket(){
    this.initialize.apply(this,arguments);
}
/**
 * 
 * @param {number} itemId 
 * @return {Number}
 */
MA_itemPocket.maxAmount =function(itemId){
    return $dataItems[itemId].maxAmount_MA;    
};
/**
 * @param {Number} itemId
 * @param {Number} amount
 * @return {PokectItemData}
 */
MA_itemPocket.newItem=function(itemId,amount_){
    const id_= itemId || 0;
    return {
        id:id_,amount:amount_||0};
};



/**
 * @param {PokectItemData[]} dataArray
 */
MA_itemPocket.prototype.initialize=function(dataArray){
    this._data=dataArray || [];
};
/**
 * @return {PokectItemData[]}
 */
MA_itemPocket.prototype.data =function(){
    return this._data;

};
MA_itemPocket.prototype.length =function(){
    return this.data().length;
};

// MA_itemPocket.prototype.backNullPush =function(){
//     return;
//     if(this.isFull()){return;}
//     const len = this._data.length;
//     if(this._data[len-1]!==null){
//         this._data.push(null);
//     }

// };

/**
 * @return {boolean}
 */
MA_itemPocket.prototype.isFull =function(){
    return this.length() >=this.maxSize();
};

/**
 * @return {Number}
 */
MA_itemPocket.prototype.maxSize=function(){
    return MA_itemPocket.pocketSize;
};

MA_itemPocket.prototype.front =function(){
    return this.data()[0];

};
MA_itemPocket.prototype.back =function(){
    return this._data[this._data.length-1];
};



//削除方法は変えたほうがいいかも fill(null)でもいいかも
MA_itemPocket.prototype.clear=function(){
    this._data.length = 0;
};
/**
 * @param {MA_itemPocket} otherPocket
 * @param {number} indexA index of this
 * @param {number} indexB index of other
 */
MA_itemPocket.prototype.swapItem =function(otherPocket,indexA,indexB){
    const tmp = this._data[indexA];

    this._data[indexA ]=otherPocket._data[indexB];
    otherPocket._data[indexB] = tmp;
};
// nullや、空っぽのアイテムを取り除く
MA_itemPocket.prototype.normalize =function(){
    for(var i=0; i< this._data.length;){
        if(this.isEmpty(i)){
            this._data.splice(i,1);
        }else{
            i+=1;
        }
    }
};

/**
 * @param {RPG.Item} item
 * @return {boolean}
 */
MA_itemPocket.prototype.hasItem =function(item){
    return this.findItem(item.id)!==null;    
};
/**
 * @return {MA_itemPocket}
 */
MA_itemPocket.prototype.clone =function(){

    var array= this._data.map( function(obj){
        var result = {};
        Object.assign(result,obj);
        return result;
    }  );
    return new MA_itemPocket(array);
};

/**
 * @param {number} index
 * @return {RPG.Item} included null
 */
MA_itemPocket.prototype.itemData =function(index){
    const obj = this._data[index];
    if(!obj){return null;}

    return $dataItems[obj.id];
};

MA_itemPocket.prototype.numItemsForParty =function(index){
    return $gameParty.numItems(this.itemData(index));
};

/**
 * @return {boolean}
 */
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
MA_itemPocket.prototype.amount= function(index){
    return this._data[index].amount;
};

/**
 * @param {RPG.Item} item
 */
MA_itemPocket.prototype.amountSumOfItem= function(item){
    //DQモードで使うので、消さないこと
    var sum =0;
    for(var i=0; i< this.length(); ++i){
        var data =this.data()[i];
        if(data && data.id ===item.id){
            sum += data.amount;
        }
    }    
    return sum;
};


MA_itemPocket.prototype.capacity =function(index){    
    return MA_itemPocket.maxAmount( this.itemData(index).id)-this.amount(index);
};
MA_itemPocket.prototype.canAdd = function(index){
    return this.capacity(index) >0;

};

// MA_itemPocket.prototype.itemCapacity =function(itemId){

//     const index = this.indexOf(itemId);
//     if(index ==-1){
//         // TODO:アイテムごとの最大所持数を設定したら、ここを直す
//         return pocketFunction.maxAmount(itemId);
//     }
    
//     return pocketFunction.maxAmount( itemId ) -this.amount(index);
// };


/**
 * @param {Number} index
 * @return {boolean}
 */
MA_itemPocket.prototype.isItemMax =function(index){
    const item =this._data[index];
    return item.amount >= MA_itemPocket.maxAmount(item.id);
};

/**
 * @param {Number} index
 * @return {boolean}
 */
MA_itemPocket.prototype.isEmpty =function(index){
    const item =this._data[index];
    if(item){
        return item.amount <= 0;
    }
    return true;
};

MA_itemPocket.prototype.allocateItem =function(itemId){
    this._data.push(  MA_itemPocket.newItem(itemId));
};
/**
 * @param {number} index
 * @param {RPG.Item} item
 * @param {number} amount
 */
MA_itemPocket.prototype.setData =function(index,item,amount){
    if(!this._data[index]){
        this._data[index]=MA_itemPocket.newItem(item.id,amount);
        return;
    }
    const obj = this._data[index];
    obj.id =item.id;
    obj.amount = amount;
};
/**
 * @param {Number} itemId
 * @param {Number?}
 */
MA_itemPocket.prototype.indexOf =function(itemId,start){



    for(var i=start||0;i <this._data.length;i+=1){
        if(this._data[i]){
            if(this._data[i].id ===itemId){
                return i;
            }
        }
    }
    return -1;

};
/**
 * @param {Number} itemId
 * @return {PokectItemData}
 */
MA_itemPocket.prototype.findItem=function(itemId){
    const index = this.indexOf(itemId);
    if(index !==-1){
        return this._data[index];
    }
    return null;
};
//releaseItemの対となる関数
// indexを返すみたいな、ややこしいのはやめて、add用のオブジェクトを投げる
/**
 * @param {PokectItemData} itemData
 * @param {Number} amount
 */

MA_itemPocket.prototype.addItem=function(itemData,amount){

    const lastIndex = this.indexOf(itemData.id);
    var index = lastIndex;
    if(lastIndex ===-1){
        index = this._data.length;
        const newItem = MA_itemPocket.newItem(itemData.id);
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
};

/**
 * @param {number} index
 * @return {boolean}
 */
MA_itemPocket.prototype.canUse = function(index){
    return !this.isEmpty(index);
};

MA_itemPocket.prototype.releaseItem=function(index,amount){
    const item =this._data[index]; 
    const am = Math.min(amount,item.amount);
    item.amount -= am;

    $gameParty.gainItem(this.itemData(index) ,am);
};


MA_itemPocket.prototype.releaseAllItem =function(){
    for(var i=0; i < this._data.length;++i){
        this.releaseItem(i,Number.MAX_SAFE_INTEGER);
    }
};
/**
 * @param {MA_itemPocket} myset
 * 
 */
MA_itemPocket.prototype.loadMyset =function(myset){
    this.releaseAllItem();
    var item=null;
    var amount=0;
    var amountToHave=0;
    var missingItemList=[];

    const len = myset.length();
    for(var i=0;i <len;++i){
        item= myset.itemData(i);
        amount =myset.amount(i);
        amountToHave= $gameParty.numItems(item);
        if(amountToHave < amount){
            missingItemList.push(i);
            amount = amountToHave;
        }        
        this.setData(i,item,amount);
        $gameParty.loseItem(item,amount);
    }
    this.normalize();

    return missingItemList;

};

(function (global) {
    'use strict';
        const param = PluginManager.parameters('Mano_ItemPocket');
    MA_itemPocket.pocketSize =Number(param.pocketSize);

    const xxx={
        maxAmount : Number (param.maxAmount),
        canDuplicate:Boolean(param.canDuplicate==='true'),
        pocketSize :Number(param.pocketSize),

        usingMyset:Boolean(param.usingMyset==='true'),
        mysetSize :Number(param.mysetSize ||8),
        mysetFormat:String(param.mysetFormat),
        saveMyset:String(param.saveMyset),
        loadMyset:String(param.loadMyset),
        renameMyset:String(param.renameMyset),

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
            smallH:function(){return 240;}
        },
        color:{
            max:Number(param.MaxColor) || 18,
        },
        tag:{
            maxAmount:'MaxAmount'
        },
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
 * @return {boolean}
 */

function canPutInPocket(item){
    return DataManager.isItem(item) && item.occasion<=1 ;
}
/**
 * 
 * @param {RPG.Item} item 
 */
function hasItem(item){
    if(pocketFunction.canPutInPocket(item)){
        const actors = $gameParty.members();
        return actors.some(function(actor){
            return actor.isInPocket( item.id );
        });
    }
    return false;
}

class PokectItemData{
    /**
     *@return {number}
     */
    get id(){
        return 0;
    }
    /**
     *@return {number}
     */
    get amount(){
        return 0;
    }
}
/**
 * @param {Number} itemId
 * @param {Number} amount
 * @return {PokectItemData}
 */
function newPocketItemData(itemId,amount_){
    const id_= itemId || 0;
    return {
        id:id_,amount:amount_||0};
}
    

const pocketFunction={
    includeMembers:pocket_includeMembers,
//    maxAmount:maxAmount,
    newItem:newPocketItemData,
    pocketSize :function(){
        return xxx.pocketSize;
    },
    createDummyData:function(){
        return [
            // {id:1,amount:3},
            // {id:3,amount:100},
            // {id:4,amount:4},
            // {id:5,amount:23},
            // {id:6,amount:1},
        ];
    },

    bootEachItem:function(item){
        if(!canPutInPocket(item) ){
            item.maxAmount_MA =0;
            return;
        }
        const capa = item.meta[xxx.tag.maxAmount];
        if(capa){
            item.maxAmount_MA =Number(capa);
        }else{
            item.maxAmount_MA = xxx.maxAmount;
        }
    },
    canPutInPocket:canPutInPocket ,
    hasItem:hasItem,


};
const Scene_Boot_start =Scene_Boot.prototype.start;
Scene_Boot.prototype.start= function() {
    Scene_Boot_start.apply(this,arguments);
    const len = $dataItems.length;
    for(var i =1; i < len;i+=1){
        pocketFunction.bootEachItem($dataItems[i]);
    }
};

class PocketIndex{
    /**
     * 
     * @param {PokectItemData[]} data_ 
     */
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
    /**
     * @param {Number} itemId 
     * @return {any}
     */
    fetch(itemId){
        return this._table[itemId];
    }
    // DQモードでジャックするために存在する 消さないこと
    /**
     * @return {Number}
     */
    vacant(){
        return MA_itemPocket.pocketSize-this._data.length;
    }

    /**
     * @param {Number} itemId 
     * @param {Number} amount 
     */
    addItem(itemId,amount){
        var obj = this.fetch(itemId); //this._table[itemId];
        if(!obj){
            const newItem =MA_itemPocket.newItem(itemId);
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
    /**
     * @param {Number} itemId 
     */

    canAdd(itemId){


        if(this.capacity(itemId) >0){
            return true;
        }

        return false;
    }

    /**
     * @param {Number} itemId 
     * @return {Number}
     */
    amount(itemId){

        const obj =  this.fetch(itemId);// this._table[itemId];
        if(obj){
            return obj.data.amount;
        }
        return 0;
    }
    /**
     * @param {Number} itemId 
     * @return {Number}
     */
    capacity(itemId){

        const amount = this.amount(itemId);
        if(this._data.length >=MA_itemPocket .pocketSize &&amount ===0 ){            
            return 0;
        }
        return MA_itemPocket.maxAmount(itemId)-amount;
    }

    /**
     * @param {Number} itemId 
     * @return {Number}
     */
    indexOf(itemId){
        const obj =this._table[itemId];
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

Window_PocketNumber.prototype.item =function(){
    return this._item;
};

Window_PocketNumber.prototype.createButtons =function(){
//    Window_ShopNumber.prototype.createButtons.call(this);
};
Window_PocketNumber.prototype.clear =function(){
    this._item =null;
    this.updateCursor();
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
    if(this._number>=this._max){
        this.changeTextColor( this.textColor(xxx.color.max) );        
    }else{
        this.resetTextColor();
    }

    this.drawText(this._number, x,y,width,'right' );
};
Window_PocketNumber.prototype.cursorWidth = function() {
    return Window_ShopNumber.prototype.cursorWidth.call(this);
};

Window_PocketNumber.prototype.maxDigits=function(){
    return 2;
};
/**
 * @param {RPG.Item} item
 * @param {Number} max
 */
Window_PocketNumber.prototype.setup=function(item,max){
    this._number =Math.min(1,max);
    this._item =item;
    this._max =max;
};

Window_PocketNumber.prototype.setPrevWindow =function(window){
    this._prevWindow =window;
};
Window_PocketNumber.prototype.getPrevWindow =function(){
   return this._prevWindow;
};

/**
 * @param {Number} amount
 */
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

Window_ModeSelect.prototype.addUseCommand =function(){
    this.addCommand(xxx.wordUse, xxx.symbolUse );    
};
Window_ModeSelect.prototype.addRemoveCommand =function(){
    this.addCommand(xxx.wordRemove, xxx.symbolRemove );    
};
Window_ModeSelect.prototype.addSwapCommand =function(){
    this.addCommand(xxx.wordSwap, xxx.symbolSwap );    
};
Window_ModeSelect.prototype.addAddCommand =function(){
    this.addCommand(xxx.wordAdd, xxx.symbolAdd );    
};
Window_ModeSelect.prototype.addMysetCommand =function(){
    if(xxx.usingMyset){
        this.addCommand(xxx.wordMyset,xxx.symbolMyset);
    }
};

Window_ModeSelect.prototype.makeCommandList =function(){
    this.addUseCommand();
    this.addSwapCommand();
    this.addRemoveCommand();
    this.addAddCommand();
    this.addMysetCommand();
};

Window_ModeSelect.prototype.processPageup =function(){
    Window_Command.prototype.processPageup.call(this);
    this.activate();    
};
Window_ModeSelect.prototype.processPagedown =function(){
    Window_Command.prototype.processPagedown.call(this);
    this.activate();    
};





function Window_Pocket(){
	this.initialize.apply(this,arguments);
}
Window_Pocket.baseType =Window_Selectable;
Window_Pocket.prototype = Object.create(Window_Pocket.baseType.prototype);
Window_Pocket.prototype.constructor = Window_Pocket;


Window_Pocket.prototype.initialize=function(x,y,w,h){
    this._pocket = new MA_itemPocket();
	Window_Pocket.baseType.prototype.initialize.call(this,x,y,w,h);
    this.deactivate();
    this.deselect();
    this._actor =null;
    this._enableJudge = null;
    this._pushLastNull=false;
};
/**
 * @param {boolean}
 */
Window_Pocket.prototype.setLastNull =function(bool){
    this._pushLastNull =bool;
};
Window_Pocket.prototype.needNullPush=function(){
    return this._pushLastNull && !this.pocket().isFull();

};

Window_Pocket.prototype.maxItems =function(){
    return this.pocket().length() + (this.needNullPush() ? 1:0) ;
};
Window_Pocket.prototype.canActorChange =function(){
    return true;
};
Window_Pocket.prototype.processPagedown =function(){
    if(this.canActorChange()){
        Window_Selectable.prototype.processPagedown.call(this);
        this.activate();
    }
};

Window_Pocket.prototype.processPageup =function(){
    if(this.canActorChange()){
        Window_Selectable.prototype.processPageup.call(this);
        this.activate();
    }
};
/**
 * @param {RPG.Item} item
 * @return {boolean}
 */

Window_Pocket.prototype.isEnabled =function(item){
    return this._enableJudge(item);
};

Window_Pocket.prototype.setEnableJudge =function(func){
    this._enableJudge =func;
};

Window_Pocket.prototype.isCurrentItemEnabled =function(){
    return this.isEnabled(  this.item());
};

Window_Pocket.prototype.makeItemList =function(){
    this._data = this._pocket._data;
};
/**
 * @return {PokectItemData}
 */
Window_Pocket.prototype.itemObject =function(){
    return this._data[this.index()];
};
/**
 * @return {RPG.Item}
 */
Window_Pocket.prototype.item =function(){
    const index =this.index();
    return  index>=0 ? this._pocket.itemData(index) :null;
};
/**
 * @return {boolean}
 */
Window_Pocket.prototype.itemAsNull =function(){
    const item = this.item();
    if(!item){return true;}
    
    return item.amount<=0;
};
Window_Pocket.prototype.selectionNormalize=function(){
    if(this.itemAsNull()){
        this.selectBack();
    }
};

/**
 * @return {Number} selected Item amount
 */
Window_Pocket.prototype.amount=function(){
    const data = this.pocket().data()[this.index()];
    if(data){
        return data.amount;
    }
    return 0;
};

/**
 * @return {PokectItemData}
 */
Window_Pocket.prototype.selectedObject=function(){
    return this._data[this.index()];
};

/**
 * @param {RPG.Item} item
 * @param {Number} start 検索の開始位置
 * @return {number}
 */
Window_Pocket.prototype.indexOf=function(item,start){
    return this.pocket().indexOf(
        item.id,start
    );

    for(var i=start ||0  ; i< this._data.length; i+=1){
        if(item.id ===this._data[i].id){
            return i;
        }
    }
    return -1;
};
/**
 * @return {number}
 */
Window_Pocket.prototype.maxPageRows=function(){
    return Window_Selectable.prototype.maxPageRows.call(this)-1;
};
/**
 * @return {Game_Actor}
 */
Window_Pocket.prototype.actor =function(){
    return this._actor;
};

/**
 * @return {String} actorName
 */
Window_Pocket.prototype.name=function(){
    return this.actor().name();
};

/**
 * @return {MA_itemPocket}
 */
Window_Pocket.prototype.pocket=function(){
    return this._pocket;
};

/**
 * @param {RPG.Actor} actor
 * @param {boolean} needNullPush
 */
Window_Pocket.prototype.setActor =function(actor,needNullPush){

    this._actor =actor;
    if(!actor){
        this._pocket =null;
        return;
    }


    this.setPocket(actor.itemPocket());
    this._pocket.normalize();
    // if(!!needNullPush){
    //     this._pocket.backNullPush();        
    // }
    if(this.index() > this._pocket.length()){
        //TODO
        this.selectBack();
    }
};
Window_Pocket.prototype.needReSelect =function(){
//    return this.index()

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
    return this.textWidth(':00');
};
Window_Pocket.prototype.selectBack=function(){
    const shift = (this.needNullPush()? 0:1);
    this.select( Math.max( 0,this._data.length-shift));
};

Window_Pocket.prototype.itemRect=function(index){
    var rect=  Window_Selectable.prototype.itemRect.call(this,index);
    rect.y += this.actorNameHeight();
    return rect;
};

Window_Pocket.prototype.drawItemAmount =function(index,rect){

    const item = this._data[index];

    this.drawText(':',rect.x,rect.y,rect.width -this.textWidth('00'),'right');
    if(this._pocket.isItemMax(index )){
        this.changeTextColor( this.textColor(xxx.color.max) );
    }

    this.drawText( item.amount,rect.x,rect.y,rect.width ,'right');
};


Window_Pocket.prototype.drawItem =function(index){
    const item = this._data[index];
    if(item){
        var numberWidth = this.itemCountWidth();
        var rect = this.itemRect(index);
        rect.width -= this.textPadding();
        this.drawItemName($dataItems[ item.id], rect.x, rect.y, rect.width );
        this.drawItemAmount(index,rect);        
    }
};


// helpWindowのような形で使う
function Window_PocketPreview(){
    this.initialize.apply(this,arguments);
}
Window_PocketPreview.prototype = Object.create(Window_Pocket.prototype);
Window_PocketPreview.prototype.constructor = Window_PocketPreview;

Window_PocketPreview.prototype.initialize =function(x,y,w,h){
    Window_Pocket.prototype.initialize.apply(this,arguments);
    this._name ='4ひえた';
};
Window_PocketPreview.prototype.name =function(){
    return this._name;
};
Window_PocketPreview.prototype.maxItems =function(){
    if(this._pocket){
        return this._pocket.length();
    }
    return 0;
};
/**
 * @param {string} name 
 */
Window_PocketPreview.prototype.setName =function(name){
    this._name =name;
};
Window_PocketPreview.prototype.setMyset =function(myset){
    this._name = myset.name;
    this.setPocket(myset.pocket);
};


function Window_MysetCommand(){
	this.initialize.apply(this,arguments);
};
Window_MysetCommand.baseType =Window_Command.prototype;
Window_MysetCommand.SYMBOL_SAVE='save';
Window_MysetCommand.SYMBOL_LOAD='load';
Window_MysetCommand.SYMBOL_RENAME='rename';

Window_MysetCommand.prototype = Object.create(Window_MysetCommand.baseType);
Window_MysetCommand.prototype.constructor = Window_MysetCommand;

Window_MysetCommand.prototype.initialize =function(x,y,w,h){
    Window_Command.prototype.initialize.apply(this,arguments);
    this.move(x,y,w,h);
};
Window_MysetCommand.prototype.addSaveCommand =function(){
    this.addCommand(xxx.saveMyset,Window_MysetCommand.SYMBOL_SAVE);
};
Window_MysetCommand.prototype.addLoadCommand =function(){
    this.addCommand(xxx.loadMyset,Window_MysetCommand.SYMBOL_LOAD);
};
Window_MysetCommand.prototype.addRenameCommand =function(){
    this.addCommand(xxx.renameMyset ,Window_MysetCommand.SYMBOL_RENAME);
};

Window_MysetCommand.prototype.processPageup=function(){
    Window_MysetCommand.baseType.processPageup.call(this);
    this.activate();
};
Window_MysetCommand.prototype.processPagedown=function(){
    Window_MysetCommand.baseType.processPagedown.call(this);
    this.activate();
};



Window_MysetCommand.prototype.makeCommandList =function(){
    this.addLoadCommand();
    this.addSaveCommand();
    this.addRenameCommand();
};
class MysetListItem{
    /**
     * @param {String} name 
     * @param {any} pocket 
     */
    constructor(name,pocket){
        this.name =name;
        this.pocket =pocket;
    }

};

function Window_MysetList(){
	this.initialize.apply(this,arguments);
};
Window_MysetList.prototype = Object.create(Window_Selectable.prototype);
Window_MysetList.prototype.constructor = Window_MysetList;

Window_MysetList.prototype.initialize =function(x,y,w,h){
    this.makeItemList();
    Window_Selectable.prototype.initialize.call(this,x,y,w,h);    
};
Window_MysetList.prototype.makeItemList =function(){
    this._list = $gameParty.pocketMysetList();
};
Window_MysetList.prototype.maxCols = function() {
    return 2;
};
Window_MysetList.prototype.maxItems =function(){
    return this._list.length;
};
Window_MysetList.prototype.playOkSound =function(){};

Window_MysetList.prototype.updateHelp =function(){
    const item =this.currentItem();
    if(item){
        this._helpWindow.setMyset(item);
        this._helpWindow.refresh();
    }
};
Window_MysetList.prototype.name =function(){
    return this.currentItem().name;

};

Window_MysetList.prototype.currentItem =function(){
    return this._list[this.index()];
};
Window_MysetList.prototype.myset =function(){
    return this.currentItem().pocket;

};

/**
 * @param {Number} index
 */
Window_MysetList.prototype.drawItem =function(index){
    const item = this._list[index];
    if(item){
        const rect = this.itemRect(index);
        this.drawText(item.name,rect.x,rect.y,rect.width);
    }
};

class ModeObject{
    constructor(){
        this._table ={};
        this._enableJudge =function(item){return true;}
        this.needNullPush =false;
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
    /**
     * @return {Function}
     */
    pocketCancelFunction(){
        const func = this._table['pocketCancel'];
        return func;
    }
    pocketOk(){
        this.callHandler('pocketOk');
    }
    numeberOk(){
        this.callHandler('numberOk');
    }
    actorOk(){
        this.callHandler('actorOk');
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
     * @param {Function} func 
     */
    setEnableJudge(func){
        this._enableJudge =func;
    }
    /**
     * @return {boolean}
     * @param {RPG.Item} item 
     */
    isItemeEnabled(item){
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
Window_MysetRenameEdit.prototype.setup =function(defaultName){
    this._defaultName =defaultName;
    this._name = defaultName;
    this._index = this._name.length;
};
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


function Window_AddItem(){
    this.initialize.apply(this,arguments);
}

Window_AddItem.baseType =Window_ItemList.prototype;
Window_AddItem.prototype = Object.create(Window_AddItem.baseType);
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
    return (!!item)&&this._enableJudge(item);
};
Window_AddItem.prototype.setEnabledFunc=function(func){
    this._enableJudge=func;
};

Window_AddItem.prototype.makeItemList=function(){
    this._data = $gameParty.items().filter(pocketFunction.canPutInPocket);
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
    this._pocketIndex=[];
    this._modeTable={};
    
    this._destoryReservationlist =[];
};
/**
 * @param {Game_Actor} actor
 * @return {PocketIndex}
 */
Scene_ItemPocket.prototype.pocketIndex =function(actor){
    const id = actor._actorId;
    var result = this._pocketIndex[id];
    if(!result){
        result =actor.itemPocket().createIndexTable();
        this._pocketIndex[id]=result;
    }
    return result;
};
/**
 * @param {Game_Actor} actor
 */
Scene_ItemPocket.prototype.reserveDestoryIndex =function(actor){

    this._destoryReservationlist[actor.actorId()]=true;
};
Scene_ItemPocket.prototype.destoryPocketIndex=function(){

    const len =this._destoryReservationlist.length;
    for(var i=0; i<len;++i){
        if( this._destoryReservationlist[i]){
            this._pocketIndex[i]=null;
        }
    }
    this._destoryReservationlist =[];
//    mode._destoyPocketIndexList.length=0;
};

Scene_ItemPocket.prototype.isUsingMyset =function(){
    return xxx.usingMyset;
};
Scene_ItemPocket.prototype.createAllWindow=function(){


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
    this.createMysetCommandWindow()
    this.createMysetListWindow();

    this.addNameWindows();
};
Scene_ItemPocket.prototype.create =function(){
    actorSetPocket();
    Scene_MenuBase.prototype.create.call(this);

    this.createAllWindow();

    this._modeSelectWindow.activate();
    this._modeSelectWindow.select(0);
};
/**
 * @return {Rectangle}
 */
Scene_ItemPocket.prototype.subWindowRect=function(){
    return new Rectangle( 
        Graphics.boxWidth/2,
        this._modeSelectWindow.y+this._modeSelectWindow.height,
        xxx.pocketWindow.w(),
        this._pocketWindow.height
    );
};
/**
 * @param {RPG.Item} item
 * @return {boolean}
 */
Scene_ItemPocket.prototype.canAddItem =function(item){
    if(!item){return false;}
    const indexTable= this.pocketIndex(this.actor());    
    return indexTable.canAdd(item.id) ;
};
/**
 * @return {String}
 */
Scene_ItemPocket.prototype.editingName =function(){
    return this._nameEditWindow.name();
};

/**
 * @return {RPG.Item}
 * アイテムウィンドウで選択されているアイテムを返す
 */
Scene_ItemPocket.prototype.item = function() {
    return this._itemWindow.item();
};
/**
 * @return {MA_itemPocket}
 */
Scene_ItemPocket.prototype.pocket =function(){
    return this._pocketWindow.pocket();
};
/**
 * @return {Game_Actor}
 */
Scene_ItemPocket.prototype.actor=function(){
    return this._actor;
}


Scene_ItemPocket.prototype.onAddItemOk =function(){
    const item = this._itemWindow.item();
    this.addItem(item);
};
/**
 * @return {Rectangle}
 */
Scene_ItemPocket.prototype.listWindowRect =function(){
    const wy=this._pocketWindow.y + this.smallPocketHegiht();
     return new Rectangle(
        0, wy,
        Graphics.boxWidth,
        Graphics.boxHeight- wy
    );
};

Scene_ItemPocket.prototype.createItemSelectWindow =function(){
    const wx = 0;
    const wy = this._pocketWindow.y + this.smallPocketHegiht();
    const ww = Graphics.boxWidth;
    const wh = Graphics.boxHeight- wy;

    const rect = this.listWindowRect();

    const iw = new Window_AddItem(rect.x,rect.y,rect.width,rect.height);
    iw.setEnabledFunc( this.canAddItem.bind(this) );
    iw.setHandler( 'cancel',this.onItemCancel.bind(this) );
    iw.setHandler('ok',this.onAddItemOk.bind(this));
    iw.setCategory('item');
    iw.setHelpWindow(this._helpWindow);
    iw.makeItemList();
    iw.refresh();
    iw.openness =0;
//    iw.hide();


    this._itemWindow=iw;
    this.addWindow(iw);
};


Scene_ItemPocket.prototype.openSelectWindow =function(){
    this._pocketWindow.height =this.smallPocketHegiht();
};
Scene_ItemPocket.prototype.closeSelectWindow =function(){
    this._pocketWindow.height =this.defaultPocketHeight();
};
// Scene_ItemPocket.prototype.onItemOk=function(){

// //    this.onItemSelect();
// };
/**
 * @param {RPG.Item} item
 */
Scene_ItemPocket.prototype.setupCapacityNumber =function(item){

    const indexTable = this.pocketIndex(this.actor());
    const pocketCapacity =indexTable.capacity(item.id);
    const capacity =  Math.min(pocketCapacity, $gameParty.numItems( item ));
    this._numberWindow.setup(item,capacity);
    this._numberWindow.refresh();
    this._numberWindow.activate();
};



Scene_ItemPocket.prototype.createNumberWindow=function(){
    const rect = this.subWindowRect();

    const num = new Window_PocketNumber(rect.x,rect.y,rect.width, xxx.pocketWindow.smallH());
    this._numberWindow = num;
    num.setHandler('cancel',this.onNumberCancel.bind(this));
    num.setHandler('ok',this.onNumberOk.bind(this));
    num.openness=0;

    this.addWindow(num);
};
/**
 * @desc value from numberWindow
 * @return {Number}
 */
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
    mode.numeberOk();
    this._numberWindow.clear();
};

Scene_ItemPocket.prototype.onNumberCancel =function(){
    const mode = this.currentModeObject();
    mode.numberCancel();
};
Scene_ItemPocket.prototype.startAddMode =function(){
    this.openItemWindow();
    this.openNumberWindow();
    this._itemWindow.refresh();
    this._numberWindow.setPrevWindow(this._itemWindow);
    this.pocketIndex(this.actor());
};
Scene_ItemPocket.prototype.endAddMode =function(){
    this.closeItemWindow();
    this._numberWindow.setPrevWindow(null);
    this._numberWindow.close();
    this._modeSelectWindow.activate();
    this._pocketWindow.height = this.defaultPocketHeight();
    this._pocketWindow.refresh();
};
/**
 * @param {RPG.Item} item
 */
Scene_ItemPocket.prototype.addItem =function(item){
    this.setupCapacityNumber(item);
    this.addItemSelectIndex(item);
};
Scene_ItemPocket.prototype.addItemSelectIndex=function(item){
    const index = this._pocketWindow.indexOf(item); 
    this._pocketWindow.select(index);

};

Scene_ItemPocket.prototype.executeAddItem =function(){
    const table = this.pocketIndex(this.actor());
    const item = this._itemWindow.item();
    const amount =this._numberWindow.number()
    table.addItem(item.id,amount);
    $gameParty.loseItem(item,amount);

    this._pocketWindow.refresh();
    if($gameParty.hasItem(item)){
        this._itemWindow.redrawItem(this._itemWindow.index());
    }else{
        this._itemWindow.refresh();
    }
    this._pocketWindow.deselect();
    this._itemWindow.activate();
};
Scene_ItemPocket.prototype.modeAddNumberCancel =function(){
    this._pocketWindow.deselect();
    this._numberWindow.clear();
    this._itemWindow.activate();

};

Scene_ItemPocket.prototype.startRemoveMode =function(){
    this._pocketWindow.activate();
    this._pocketWindow.select(0);
    this._numberWindow.setPrevWindow(this._pocketWindow);
    this.openNumberWindow();
    this.openSelectWindow();
    this._itemWindow.open();
//    this.openItemWindow();
};

Scene_ItemPocket.prototype.endRemoveMode =function(){
    this.closeItemWindow();
    this._numberWindow.close();
};

Scene_ItemPocket.prototype.executeRemoveItem =function(){
    const pocket = this.pocket();
    const index =this._pocketWindow.index();
    pocket.releaseItem(index,this._numberWindow.number());
    if(pocket.amount(index)<=0){
        this.reserveDestoryIndex(this.actor());
    }
    pocket.normalize();
    this._pocketWindow.selectionNormalize();

    this._pocketWindow.refresh();
    this._itemWindow.refresh();
    this._pocketWindow.activate();
};
Scene_ItemPocket.prototype.modeRemoveNumberCancel =function(){
    this._numberWindow.clear();
    this._pocketWindow.activate();
};
/**
 * @param {RPG.Item} item
 * @return {boolean}
 */
Scene_ItemPocket.prototype.isRemoveabelItem=function(item){
    return !!item;
};

Scene_ItemPocket.prototype.removeItem =function(){
    const item = this._pocketWindow.item();
    const amount =this._pocketWindow.amount();
    this._numberWindow.setup(item,amount);
    this._numberWindow.refresh();
    this._numberWindow.activate();
};

/**
 * @param {RPG.Item} item
 * @return {Boolean}
 */
Scene_ItemPocket.prototype.isItemEnabled=function(item){
    const mode = this.currentModeObject();
    return mode.isItemeEnabled(item);
};
Scene_ItemPocket.prototype.startSwapMode =function(){
    const actorA = this._pocketWindow.actor();
    const actorB =$gameParty.members()[0];
    $gameParty.setMenuActor(actorB);
    if(actorA ===actorB){
        $gameParty.makeMenuActorNext();
    }
    this.subPocketWindowSetActor($gameParty.menuActor());
    this._pocketWindow2.open();
    this._pocketWindow2.deactivate();
    this._pocketWindow.setLastNull(true);
    this._pocketWindow.activate();
    this._pocketWindow.select(0);
    const pocket= this.pocket();

};

Scene_ItemPocket.prototype.endSwapMode =function(){
    $gameParty.setMenuActor(this._pocketWindow.actor());
    this._actor = this._pocketWindow.actor();
    this._pocketWindow.deselect();
    this._pocketWindow2.close();
    this._pocketWindow.setLastNull(false);
    
};
Scene_ItemPocket.prototype.openSwapWindow =function(){
    this._pocketWindow2.open();
};
Scene_ItemPocket.prototype.swapSelectSecond =function(){
    const itemIsNotEmpty = !this._pocketWindow.itemAsNull();
    this._pocketWindow2.setLastNull(itemIsNotEmpty);
    if(itemIsNotEmpty){
        this._pocketWindow2.selectBack();        
    }else{
        this._pocketWindow2.select(0);
    }
    this._pocketWindow2.activate();
};



Scene_ItemPocket.prototype.executeSwap =function(){
    const pocket1 = this._pocketWindow.pocket();
    const pocket2 = this._pocketWindow2.pocket();
    const isSelectBack = !this._pocketWindow.itemAsNull();
    
    pocket1.swapItem(pocket2,this._pocketWindow.index(),this._pocketWindow2.index());
    pocket1.normalize();
    pocket2.normalize();
    
    if((!pocket2.front())||isSelectBack  ){
        this._pocketWindow.select(0);
    }else{
        this._pocketWindow.selectBack();
    }
    this._pocketWindow2.deselect();
    this._pocketWindow.refresh();
    this._pocketWindow2.refresh();
    this.reserveDestoryIndex(this._pocketWindow.actor());
    this.reserveDestoryIndex(this._pocketWindow2.actor());
};

Scene_ItemPocket.prototype.startItemUseMode =function(){
    this._pocketWindow.activate();
    this._pocketWindow.select(0);
};
Scene_ItemPocket.prototype.endItemUseMode =function(){
    this._pocketWindow.deselect();
    this._modeSelectWindow.activate();
};
Scene_ItemPocket.prototype.isUseableItem =function(item){
    return !!item;
};

/**
 * @param {RPG.Item} item
 */
Scene_ItemPocket.prototype.itemScopeForAll =function(item){
    return [2,8,10].contains(item.scope);
};

Scene_ItemPocket.prototype.useItem =function(){
    const item = this._pocketWindow.item();
    if(item){
        this._actorWindow.select(0);
        this.actorSetCursorAll( this.itemScopeForAll(item) );
        this.openActorWindow();
        this._actorWindow.activate();
    }
};
/**
 * @return {Game_Actor[]}
 */
Scene_ItemPocket.prototype.allMembers =function(){
    return $gameParty.members();
};

/**
 * @param {RPG.Item} item
 * @return {Game_Actor[]}
 */
Scene_ItemPocket.prototype.makeItemTargets =function(item){
    if(this.itemScopeForAll(item) ){
        return this.allMembers();
    }
    const index = this._actorWindow.index();
    if(index>=0){
        return [$gameParty.members()[index]];
    }
    return [];
};

/**
 * @private
 * @param {Game_Action} action
 * @param {Game_Actor[]} targets
 * @return {boolean}
 */
Scene_ItemPocket.prototype.isValidTargets =function(action,targets){
    return targets.some( action.testApply.bind(action));
};
/**
 * 
 * @param {Game_Action} action 
 * @param {Game_Actor[]} targets 
 */
Scene_ItemPocket.prototype.executeAction=function(action ,targets){
    targets.forEach(function(target){
        const repeat = action.numRepeats();
        for(var i=0;i < repeat; i+=1){
            action.apply(target);
        }    
    });
    action.applyGlobal();
    this.checkGameover();
    this.checkGameover();
    this._actorWindow.refresh();
    this._itemUsed =true;
    this.playUseItem();
};
Scene_ItemPocket.prototype.playBuzzer =function(){
    SoundManager.playBuzzer();
};
Scene_ItemPocket.prototype.playUseItem =function(){
    SoundManager.playUseItem();
};


Scene_ItemPocket.prototype.executeUseItem =function(){
    const pocket = this.pocket();
    const index = this._pocketWindow.index();
    const item = pocket.itemData(index);
    if(pocket.canUse(index)){
        const user = this.user();
        const action =new Game_Action(user,false);
        action.setItemObject(item);
        const targets = this.makeItemTargets(item);
        if(this.isValidTargets(action,targets)){
            this.executeAction(action,targets);
            pocket.consumeItem(index);
            if(pocket.amount(index)<=0){
                this.reserveDestoryIndex(this.actor());
            }
            return;
        }
        //TODO:描き途中
    }
    this.playBuzzer();

};

Scene_ItemPocket.prototype.startMysetMode =function(){
    this.openSelectWindow();
    this._windowMysetCommand.activate();
    this._windowMysetCommand.open();
    this._windowMysetCommand.select(0);
    this._mysetListWindow.refresh();
    this._mysetListWindow.open();
};
Scene_ItemPocket.prototype.endMysetMode =function(){
    this.closeSelectWindow();
    this._windowMysetCommand.deselect();
    this._windowMysetCommand.close();
    this._modeSelectWindow.activate();
    this._mysetListWindow.close();
    this._pocketWindow.show();
    this._pocketPreviewWindow.hide();
};
Scene_ItemPocket.prototype.onMysetListCancel=function(){
    this._mysetListWindow.deselect();
    this._windowMysetCommand.activate();
    this._pocketWindow.show();
    this._pocketPreviewWindow.hide();
};
Scene_ItemPocket.prototype.onMysetListOk =function(){
    const s= this._windowMysetCommand.currentSymbol()[0];

  

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
};

/**
 * @param {Number} index 
 * @return {MA_itemPocket}
 */
function partyGetMyset(index){
    return $gameParty.getPocketMyset(index);
}

Scene_ItemPocket.prototype.loadMyset =function(){
    this._mysetListWindow.activate();
    this._mysetListWindow.select(0);

};

Scene_ItemPocket.prototype.endLoadMyset =function(){
    this._windowMysetCommand.activate();
    this._mysetListWindow.deselect();
    this._pocketPreviewWindow.show();
    this.mysetExecuteSucces();
};

Scene_ItemPocket.prototype.mysetShowMissingList =function(missingList){
    
    this.endLoadMyset();
};
Scene_ItemPocket.prototype.executeLoadMyset =function(){
    const actor = this.actor();
    const myset = this._mysetListWindow.myset();
    const pocket =actor.itemPocket();
    const missingList =pocket.loadMyset(myset);
    
    if(missingList.length >0){
        this.mysetShowMissingList(missingList );
    }else{
        this.endLoadMyset();
    }
    this.playLoadMysetSound();
    this._pocketWindow.refresh();
};

Scene_ItemPocket.prototype.playLoadMysetSound =function(){
    SoundManager.playEquip();
};
Scene_ItemPocket.prototype.playSaveMysetSound =function(){
    SoundManager.playSave();
};

Scene_ItemPocket.prototype.executeSaveMyset =function(){
    const index = this._mysetListWindow.index();
    const pocket = this.pocket();

    $gameParty.saveMyset(index,pocket);

    this._mysetListWindow.deactivate();
    this._mysetListWindow.deselect();

    this._windowMysetCommand.activate();
    this._pocketPreviewWindow.setPocket( $gameParty.getPocketMyset(index).pocket   );
    this._pocketPreviewWindow.refresh();
    this.playSaveMysetSound();

    this.mysetExecuteSucces();
};

Scene_ItemPocket.prototype.selectMysetList =function(){
    this._mysetListWindow.activate();
};

Scene_ItemPocket.prototype.saveMysetText =function(){
    return '保存先の選択';
};

Scene_ItemPocket.prototype.saveMyset =function(){
    this.setHelpText(this.saveMysetText());
    this._mysetListWindow.activate();
    this._mysetListWindow.select(0);
    //    this.executeSaveMyset();
    
};
Scene_ItemPocket.prototype.renameMyset =function(){
    this._mysetListWindow.activate();
    this._mysetListWindow.select(0);
};
Scene_ItemPocket.prototype.executeRenameMyset =function(){
    const name =this.editingName();
    const index =this._mysetListWindow.index();
    if(name !==''){
        $gameParty.renameMyset(index,name);
        this._mysetListWindow.redrawItem(index);
    }
    this._pocketWindow.show();
    this._pocketPreviewWindow.hide();

};


Scene_ItemPocket.prototype.startRename =function(){
    const name = this._mysetListWindow.name();

    this._nameEditWindow.setup(name);
    this._nameEditWindow.refresh();

    this._nameEditWindow.show();
    this._nameInputWindow.show();
    this._nameInputWindow.activate();
};

Scene_ItemPocket.prototype.endRename =function(){
    this._windowMysetCommand.activate();
    this._mysetListWindow.deselect();
    this._nameEditWindow.hide();
    this._nameInputWindow.hide();
    this._nameInputWindow.deactivate();
};

Scene_ItemPocket.prototype.onNameEditCancel =function(){

};
Scene_ItemPocket.prototype.onNameEditOk =function(){
    const name =this.editingName();
    this.executeRenameMyset();
    
    this.endRename();


};


Scene_ItemPocket.prototype.onMysetCommandCancel =function(){
    this.endMysetMode();
};

Scene_ItemPocket.prototype.mysetExecuteSucces =function(){
    this._pocketPreviewWindow.hide();
    this._pocketWindow.show();

};

Scene_ItemPocket.prototype.onMysetCommandOk =function(){

    const s= this._windowMysetCommand.currentSymbol()[0];
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
};

// TODO:あとでこっちのモードに切り替える
Scene_ItemPocket.prototype.createModeAdd =function(){
    const mode =new ModeObject();
    mode.setHandler('start',this.startAddMode.bind(this));
    mode.setHandler('end',this.endAddMode.bind(this));
    mode.setHandler('numberOk',this.executeAddItem.bind(this));
    mode.setHandler('numberCancel',this.modeAddNumberCancel.bind(this));
    this._modeTable[xxx.symbolAdd]=mode;
};
Scene_ItemPocket.prototype.createModeSwap =function(){
    const mode =new ModeObject();
    mode.setHandler('start',this.startSwapMode .bind(this));
    mode.setHandler('end',this.endSwapMode.bind(this));
    mode.setHandler('pocketOk',this.swapSelectSecond.bind(this));
    mode.needNullPush =true;
    this._modeTable[xxx.symbolSwap]=mode;
};
Scene_ItemPocket.prototype.createModeRemove =function(){
    const mode =new ModeObject();
    mode.setHandler('start',this.startRemoveMode .bind(this));
    mode.setHandler('end',this.endRemoveMode.bind(this));
    mode.setHandler('numberOk',this.executeRemoveItem.bind(this));
    mode.setHandler('numberCancel',this.modeRemoveNumberCancel.bind(this));
    mode.setHandler('pocketOk',this.removeItem.bind(this));
    mode.setEnableJudge(this.isRemoveabelItem.bind(this));
    this._modeTable[xxx.symbolRemove]=mode;
};

Scene_ItemPocket.prototype.createModeUse =function(){
    const mode =new ModeObject();
    mode.setHandler('start',this.startItemUseMode.bind(this));
    mode.setHandler('end',this.endItemUseMode.bind(this));
    mode.setHandler('pocketOk',this.useItem.bind(this));
    mode.setHandler('actorOk',this.executeUseItem.bind(this));
    mode.setEnableJudge(this.isUseableItem.bind(this));
    // mode.needDestoryIndex =true;

    this._modeTable[xxx.symbolUse] =mode;
//    this._modeSelectWindow.addCommand(xxx.worduse,addMode);
};
Scene_ItemPocket.prototype.createModeMyset =function(){
    const mode =new ModeObject();
    mode.setHandler('start',this.startMysetMode.bind(this));
    mode.setHandler('end',this.endMysetMode.bind(this));

    this._modeTable[xxx.symbolMyset]=mode;
};


//TODO:こっちの方が新しい　あとでこっちに切り替え
// 並びをユーザーで制御できるようにする
Scene_ItemPocket.prototype.createModeObjects =function(){
    this.createModeUse();
    this.createModeAdd();
    this.createModeSwap();
    this.createModeRemove();
    this.createModeMyset();
};


Scene_ItemPocket.prototype.createModeSelectWindow =function(){
    var a = new Window_ModeSelect(0,this._helpWindow.y +this._helpWindow.height );
    this._modeSelectWindow=a;
    a.setHandler('cancel',this.onModeCancel.bind(this));
    a.setHandler('ok',this.onModeOk.bind(this));
    a.setHandler('pagedown', this.nextActor.bind(this));
    a.setHandler('pageup',   this.previousActor.bind(this));

    this.createModeObjects();
    this.addWindow(a); 
    a.refresh(); 
};

Scene_ItemPocket.prototype.createMysetListWindow =function(){
    if(!this.isUsingMyset()){return;}
    const rect = this.listWindowRect();
    const mlw = new Window_MysetList(rect.x,rect.y,rect.width,rect.height);
    mlw.setHandler('cancel',this.onMysetListCancel.bind(this));
    mlw.setHandler('ok',this.onMysetListOk.bind(this));

    mlw.setHelpWindow(this._pocketPreviewWindow);
    this._mysetListWindow = mlw;
    mlw.openness=0;
    this.addWindow(mlw);
};



Scene_ItemPocket.prototype.createMysetCommandWindow =function(){
    if(!this.isUsingMyset()){return;}
    const rect = this.subWindowRect();
    const wh = this.smallPocketHegiht();
    const mw = new Window_MysetCommand(rect.x,rect.y,rect.width,wh);
    mw.setHandler('ok',this.onMysetCommandOk.bind(this));
    mw.setHandler('cancel',this.onMysetCommandCancel.bind(this));
    mw.setHandler('pageup',this.nextActor.bind(this));
    mw.setHandler('pagedown',this.previousActor.bind(this));

    mw.refresh();
    mw.deactivate();
    mw.deselect();
    mw.openness=0;

    this._windowMysetCommand =mw;
    this.addWindow(mw);
};


Scene_ItemPocket.prototype.createPocketWindow =function(){

    const rect = this.pocketWindowRect();

    const aie = new Window_Pocket(rect.x,rect.y,rect.width,rect.height);
    aie.setEnableJudge(  this.isItemEnabled.bind(this) );  
    aie.setHandler( 'cancel',this.onPocketCancel.bind(this) );
    aie.setHandler('ok',this.onPocketOk.bind(this) );
    aie.setHandler('pagedown', this.nextActor.bind(this));
    aie.setHandler('pageup',   this.previousActor.bind(this));
    aie.setHelpWindow(this._helpWindow);
    this.addWindow(aie);
    this._pocketWindow=aie;

    this._pocketWindow.setActor(this.actor(),false);
    this._pocketWindow.refresh();
};
    


Scene_ItemPocket.prototype.createSubPocketWindow=function(){
    const w = this.subWindowRect();
    var aie = new Window_Pocket(w.x,w.y,w.width,w.height);
    this._pocketWindow2 = aie;
    aie.setEnableJudge(  this.isItemEnabled.bind(this) );  
    aie.setHandler( 'cancel',this.onSubPocketWidnowCancel.bind(this) );
    aie.setHandler('ok',this.onSubPocketWindowOk.bind(this) );
    aie.setHandler('pageup',this.onSubWindowPageup.bind(this));
    aie.setHandler('pagedown',this.onSubWindowPagedown.bind(this));
    
    aie.setHelpWindow(this._helpWindow);
    aie.openness=0;    
    this.addWindow(aie);
};
Scene_ItemPocket.prototype.createNameEditWindow =function(){
    const wx = this._helpWindow.x;
    const wy = this._helpWindow.y;
    const ww = this._helpWindow.width;
    const wh = this._helpWindow.height;

    var edit = new Window_MysetRenameEdit(wx,wy,ww,wh);
//    edit.setHandler('ok',this.onNameEditOk.bind(this));
    edit.hide();
    this._nameEditWindow=edit;
};
Scene_ItemPocket.prototype.createNameInputWindow =function(){
    var input = new Window_NameInput(this._nameEditWindow);
    input.y = this._nameEditWindow.y + this._nameEditWindow.height;
//    input.height =this._modeSelectWindow.height + this.smallPocketHegiht();
    input.hide();
    input.deactivate();
    input.setHandler('ok',this.onNameEditOk.bind(this));
    this._nameInputWindow =input;
};
Scene_ItemPocket.prototype.addNameWindows =function(){
    this.addWindow(this._nameEditWindow);
    this.addWindow(this._nameInputWindow);
};


Scene_ItemPocket.prototype.cancelSwap =function(){
    this._pocketWindow2.deselect();
    this._pocketWindow.activate();
};
/**
 * @param {Game_Actor} actor
 */
Scene_ItemPocket.prototype.subPocketWindowSetActor =function(actor){
    this._pocketWindow2.setActor(actor,true);
    this._pocketWindow2.activate();
    this._pocketWindow2.refresh();
};
Scene_ItemPocket.prototype.onSubPocketStartSelection =function(){
    const item = this._pocketWindow.item();
    if(item){
        this._pocketWindow2.selectBack();        
    }else{
        this._pocketWindow2.select(0);
    }
    this.pushWindow(this._pocketWindow2);


};
Scene_ItemPocket.prototype.onPocketOk =function(){
    const mode = this.currentModeObject();
    mode.pocketOk();
};

Scene_ItemPocket.prototype.endMode =function(){
    const mode = this.currentModeObject();
    mode.end();
    this.destoryPocketIndex();
};

Scene_ItemPocket.prototype.onPocketCancel =function(){
    const mode = this.currentModeObject();
    const func = mode.pocketCancelFunction();
    if(func){

    }else{
        this.endMode();
        this._pocketWindow.deselect();
        this._modeSelectWindow.activate();
    }
};


Scene_ItemPocket.prototype.onSubPocketWidnowCancel =function(){
//    this.onItemCancel();
    this.cancelSwap();

};

Scene_ItemPocket.prototype.onSubPocketWindowOk =function(){
     this.executeSwap();
     this._pocketWindow.activate();
};

Scene_ItemPocket.prototype.onSubPocketWindowChangeActor =function(){
    const mode = this.currentModeObject();
    this.subPocketWindowSetActor($gameParty.menuActor(),mode.needNullPush);
};
Scene_ItemPocket.prototype.onSubWindowPageup =function(){
    $gameParty.makeMenuActorPrevious();
    if($gameParty.menuActor() ===this._pocketWindow.actor()){
 //       $gameParty.makeMenuActorPrevious();        
    }
//    this.previousActor();
    this.onSubPocketWindowChangeActor();

};
Scene_ItemPocket.prototype.onSubWindowPagedown =function(){
    $gameParty.makeMenuActorNext();
    if($gameParty.menuActor() ===this._pocketWindow.actor()){
//        $gameParty.makeMenuActorNext();        
    }
    //    this.nextActor();
    this.onSubPocketWindowChangeActor();
};
Scene_ItemPocket.prototype.defaultPocketHeight =function(){
    return  Graphics.boxHeight- this._modeSelectWindow.y-this._modeSelectWindow.height;
};
Scene_ItemPocket.prototype.smallPocketHegiht =function(){
    return this._nameInputWindow.height-this._modeSelectWindow.height;

    return xxx.pocketWindow.smallH();
};
Scene_ItemPocket.prototype.createPocketPreviewWindow=function(){
    const rect = this.pocketWindowRect();
    const ppw = new Window_PocketPreview(rect.x,rect.y,rect.width,this.smallPocketHegiht());
    ppw.hide();
    this._pocketPreviewWindow = ppw;
    this.addWindow(this._pocketPreviewWindow);

};
/**
 * @return {Rectangle}
 */
Scene_ItemPocket.prototype.pocketWindowRect=function(){
    return new Rectangle(
        0,this._modeSelectWindow.y + this._modeSelectWindow.height,
        xxx.pocketWindow.w(),
        this.defaultPocketHeight()
    );
};

Scene_ItemPocket.prototype.defaultActorChange =function(){
    this._pocketWindow.setActor(this.actor());
    this._pocketWindow.refresh();

};
Scene_ItemPocket.prototype.onActorChange =function(){
    const mode = this.currentModeObject();


    this._pocketWindow.setActor(this.actor(),!!mode.needNullPush);
    this._pocketWindow.refresh();
    return;
};

Scene_ItemPocket.prototype.onSwapOk =function(){

};


Scene_ItemPocket.prototype.openItemWindow=function(){
    this.openSelectWindow();
    this._itemWindow.activate();
    this._itemWindow.select(0);
    this._itemWindow.open();
};
Scene_ItemPocket.prototype.closeItemWindow =function(){
    this.closeSelectWindow();
    this._itemWindow.deactivate();
    this._itemWindow.deselect();
    this._itemWindow.close();
    

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





//=============================================================================
// modeSelect
//=============================================================================
Scene_ItemPocket.prototype.setMode =function(mode){
    this._mode=mode;
};

Scene_ItemPocket.prototype.onModeOk=function(){
    this._mode = this._modeSelectWindow.currentSymbol();
    const modeObj =this.currentModeObject();
    modeObj.start();
};

Scene_ItemPocket.prototype.onModeCancel =function(){
    SceneManager.pop();
};

/**
 * @return {ModeObject}
 */
Scene_ItemPocket.prototype.currentModeObject =function(){
   const mode=  this._modeSelectWindow.currentData();
   return this._modeTable [mode.symbol];
};

Scene_ItemPocket.prototype.selectNumberSelection=function(){


};
/**
 * @param {String} text
 */
Scene_ItemPocket.prototype.setHelpText =function(text){
    this._helpWindow.setText(text); 
};


Scene_ItemPocket.prototype.onActorOk=function(){
    var modeObject = this.currentModeObject();
    modeObject.actorOk();
};
Scene_ItemPocket.prototype.onActorCancel=function(){
    this._actorWindow.hide();
    if(this._itemUsed){
        this._pocketWindow.pocket().normalize();
        this._pocketWindow.refresh();
    }
    this._itemUsed=false;
    this._pocketWindow.activate();
};

/**
 * @return {Game_Actor}
 */
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
    this.endAddMode();
//    this.currentModeObject().onItemCancel_EX();
//    this.popWindow();
};
Scene_ItemPocket.prototype.openActorWindow =function(){
    this._actorWindow.show();
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


Scene_ItemPocket.prototype.popWindow=function(){
    return;


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
    $gameParty.setupPocketMyset();
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
const Game_Party_hasItem = Game_Party.prototype.hasItem;
Game_Party.prototype.hasItem =function(item){
    const result = Game_Party_hasItem.call(this,item);
    if(result){return true;}
    const members =pocketFunction.includeMembers();
    Mano_ItemPocket_State.includeAll =false;
    Mano_ItemPocket_State.includeParty=false;
    return members.some(function(actor){
        if(actor){
            return actor.isInPocket(item.id);
        }
        return false;
    });
};
/**
 * @return {MysetListItem[]}
 * @param {Number} len 
 */
function createDefaultMyset(len){
    var result =[];
    for(var i=0; i < len ; i+=1){
        result[i]= new MysetListItem(xxx.mysetFormat.format(i),new MA_itemPocket([]));
    }
    return result;
}

const Game_Party_initialize =Game_Party.prototype.initialize;
Game_Party.prototype.initialize =function(){
    Game_Party_initialize.call(this);
    this.setupPocketMyset();
};
Game_Party.prototype.setupPocketMyset=function(){
    if(!this._pocketMyset){
        this._pocketMyset =  createDefaultMyset(xxx.mysetSize);
    }
};

Game_Party.prototype.pocketMysetList =function(){
    return this._pocketMyset;
};
/**
 * @param {Number}index
 * @param {MA_itemPocket} pocket
 */
Game_Party.prototype.saveMyset = function(index ,pocket){
    var a =this._pocketMyset;

    if(this._pocketMyset[index]){
        this._pocketMyset[index].pocket =pocket.clone();
    }
};
/**
 * @param {Number}index
 * @param {String} name
 */
Game_Party.prototype.renameMyset = function(index ,name){
    if(this._pocketMyset[index]){
        this._pocketMyset[index].name = name;
    }
};


/**
 * @param {Number} index
 * @return {MA_itemPocket}
 */
Game_Party.prototype.getPocketMyset =function(index){
    const myset = this._pocketMyset[index];
    if(myset){
        return myset;
    }
    return null;
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
/**
 * @return {MA_itemPocket} 
 */
Game_Battler.prototype.itemPocket =function(){
    return new MA_itemPocket([]);
};

Game_Actor.prototype.itemPocket=function(){
    return new MA_itemPocket(this.pocket_MA);
};
/**
 * @param {number} itemId
 * @return {boolean} 
 */

Game_Battler.prototype.isInPocket =function(itemId){
    return this.itemPocket().findItem( itemId)!==null;
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

/**
 * @param {Number} index
 * @return {Rectangle}
 */
Window_BattlePocket.prototype.itemRect=function(index){
    return  Window_Selectable.prototype.itemRect.call(this,index);
};
/**
 * @param {RPG.Item} item
 * @return {Boolean}
 */
Window_BattlePocket.prototype.isEnabled =function(item){
    return this._actor.canUse(item);
};


// Window_BattlePocket.prototype.drawAllItems =function(){
//     Window_Selectable.prototype.drawAllItems.call(this);
// };

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
Game_Interpreter.prototype.pocket_SetIncludeMode =function(mode){
    this._pocketIncludeMode =mode;
};

const Game_Interpreter_pluginCommand =Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand =function(command,args){
    if(command!=='Pocket'){
        Game_Interpreter_pluginCommand.call(this,command,args);
        return;
    }
    const param = args[0][0];
    switch (param) {
        case 'P':
            Mano_ItemPocket_State.includeParty =true;
            break;
        case 'A':
            Mano_ItemPocket_State.includeAll =true;
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



})(this);
