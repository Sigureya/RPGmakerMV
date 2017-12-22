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
 * @author しぐれん
 * @plugindesc キャラクターごとに個別にアイテムを所持します。
 *
 * @param menuCommand
 * @desc メニュー画面におけるアイテム所持のコマンド名
 * @type string
 * @default アイテム所持
 * 
 * @param menuCommandPosition
 * @desc アイテム所持コマンドの位置を調整します
 * @type select
 * @option オリジナルコマンドの位置
 * @value 0
 * @option 「アイテム」の上
 * @value 1
 * @default 0
 * 
 * @param usingWeight
 * @desc アイテムの重さ機能を使うかどうかを定義します
 * ※ゲーム実行中は変更できません
 * @type boolean
 * @on 使う
 * @off 使わない
 * @default false
 *  
 * @param defaultWeight
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
 * 
 * @param command
 * @text コマンド
 * 
 * @param CommandUse
 * @type string
 * @desc アイテムを使うコマンド名
 * @default 使う
 * @parent command
 * 
 * @param CommandSwap
 * @type string
 * @desc アイテムを入れ替えるコマンド名
 * @default 入れ替え
 * @parent command
 * 
 * @param CommandRemove
 * @type string
 * @desc アイテムをしまうコマンド名
 * @default しまう
 * @parent command
 * 
 * @param CommandAdd
 * @type string
 * @desc アイテムを入れるコマンド名
 * @default 入れる
 * @parent command
 * 
 * @param CommandPass
 * @type string
 * @desc アイテムを渡すコマンド名
 * @default 渡す
 * @parent command
 * 
 * 
 * @param CommandMyset
 * @type string
 * @desc マイセットのコマンド名
 * @default マイセット
 * @parent command
 * 
 * @param CommandSort
 * @type string
 * @desc アイテムのソートのコマンド名
 * @default マイセット
 * @parent command
 * 
 * @param sound
 * @text 効果音
 * 
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
 * @param myset
 * @text マイセット機能
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
 * var 1.4.0
 * タッチ操作向けのボタンを追加。
 * 
 * var 1.3.0 
 * MA_ItemPocket.addItem()にバグが発覚したので修正。
 * アイテムを渡す機能を実装。
 * var 1.2.0(2017/09.13) アイテムの重さ機能を実装
 * var 1.1.0(2017/09/05) マイセット機能を実装
 * var 1.0.0(2017/08/26) イベントコマンド「条件分岐」で、アイテム所持をチェックできるようにした。
 * DQ風所持モードの拡張プラグインを追加。
 * var 0.7.5(2017/06/28) アイテムの出し入れで個数指定を可能にし、入れられない時はグレーアウト。
 * var 0.7.0(2017/06/21) バトル中にアイテムを使えるようになった
 * var 0.6.3(2017/06/21) バトルに少しだけ対応。
 * var 0.6.0(2017/06/20) アイテムを持たせることができるようになった。
 * var 0.5.0(2017/06/20) 公開
 */
/*~struct~PocketItem:
 * @param id
 * @param amount
 */


 /*
 * 現在のタスク
 * 
 * TODO
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

// class PokectItemData{
//     /**
//      *@return {number}
//      */
//     get id(){
//         return 0;
//     }
//     /**
//      *@return {number}
//      */
//     get amount(){
//         return 0;
//     }
// }

(function(){});

function MA_itemPocket(){
    this.initialize.apply(this,arguments);
}


/**
 * 
 * @param {RPG.Item} item 
 * @return {Number}
 */
MA_itemPocket.maxAmount =function(item){
    return item.maxAmount_MA;
};
/**
 * @param {[]} array
 * @param {RPG.Item} item
 * @param {number} amount
 * @param {number} index
 * @return {number } lastIndex
 */
MA_itemPocket._addItemImple =function(array,item,amount,index){
    if(array[index]){
        array[index].amount += amount;
        return index;
    }
    array.push(MA_itemPocket.newItem(item,amount));
    return array.length-1;
};

/**
 * @param {RPG.Item} index
 * @return {number}
 */
MA_itemPocket.weight =function(item){
    return item.weight_MA;
};
MA_itemPocket.TYPE_ITEM=0;
MA_itemPocket.TYPE_WEAPON =1;
MA_itemPocket.TYPE_ARMOR =2;

/**
 * @param {RPG.Item} item
 * @param {Number} amount
 * @return {PokectItemData}
 */
MA_itemPocket.newItem=function(item,amount){
    const id_= item ? item.id : 0;
    const result ={
        id:id_,
        amount:(amount||0)
//        type:MA_itemPocket.TYPE_ITEM   
    };
    return result;
};
/**
 * @param {RPG.Armor} armor
 */
MA_itemPocket.newArmor =function(armor){
    const result ={
        id:armor.id,
        amount:1,
        type:MA_itemPocket.TYPE_ARMOR
    };
    return result;
};
/**
 * @param {RPG.Weapon} weapon
 */
MA_itemPocket.newArmor =function(weapon){
    const result ={
        id:weapon.id,
        amount:1,
        type:MA_itemPocket.TYPE_WEAPON
    };
    return result;
};
/**
 * @param {RPG.Item} item 
 * @return {boolean}
 */
MA_itemPocket.canPutInPocket =function(item){
    return DataManager.isItem(item) && item.occasion<=1 ;    
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
MA_itemPocket.prototype.array =function(){
    return this._data;

};
MA_itemPocket.prototype.length =function(){
    return this.array().length;
};

/**
 * @param {Function<RPG.Item,RPG.Item>} func
 */
MA_itemPocket.prototype.sort =function(func){
    this.array().sort(function(a,b){
        return func($dataItems[a.id],$dataItems[b.id]);
    });
};

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
    return this.array()[0];

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
    return this.findItem(item)!==null;    
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
 * @desc 指定した位置にあるアイテムのデータを返す　所持数が0ならnullを返す
 * @param {number} index
 * @return {RPG.Item} included null
 */
MA_itemPocket.prototype.item =function(index){
    const obj = this._data[index];
    if(!obj){return null;}
    //TODO:改造した部分なので、ここでエラーが出るかもしれない
    if(obj.amount<=0){
        return null;
    }
    return $dataItems[obj.id];
};
/**
 * @desc 指定した位置にあるアイテムのデータを返す　所持数が0でもそのまま返す
 * @param {number} index
 * @return {RPG.Item} included null
 */
MA_itemPocket.prototype.itemObject =function(index){
    const obj=this._data[index];
    if(obj){
        return $dataItems[obj.id];
    }
    return null;

};

MA_itemPocket.prototype.numItemsForParty =function(index){
    return $gameParty.numItems(this.item(index));
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
    if(this._data[index]){
        return this._data[index].amount;        
    }
    return 0;
};
    

/**
 * @param {RPG.Item} item
 */
MA_itemPocket.prototype.amountSumOfItem= function(item){
    //DQモードで使うので、消さないこと
    var sum =0;
    for(var i=0; i< this.length(); ++i){
        var data =this.array()[i];
        if(data && data.id ===item.id){
            sum += data.amount;
        }
    }    
    return sum;
};
/**
 * @param {number} index
 */
MA_itemPocket.prototype.weight =function(index){
    const amount = this.amount(index);
    const item = this.item(index);
    if(item){
        return item.weight_MA *amount;
    }
    return 0;


};

/**
 * @return {number}
 */
MA_itemPocket.prototype.weightSum= function(){
    var result =0;
    const len =this.length();
    for(var i=0; i< len ; i+=1){
        result += this.weight(i);
    }
    return result;
};


MA_itemPocket.prototype.capacity =function(index){    
    return MA_itemPocket.maxAmount( this.itemObject(index))-this.amount(index);
};
MA_itemPocket.prototype.canAdd = function(index){
    return this.capacity(index) >0;
};
/**
 * @return {number} 残り重量
 */
MA_itemPocket.prototype.weightCapacity=function(){
    return 100;
};




/**
 * @param {Number} index
 * @return {boolean}
 */
MA_itemPocket.prototype.isItemMax =function(index){
    const item =this._data[index];
    return item.amount >= MA_itemPocket.maxAmount($dataItems[item.id]);
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
/**
 * @param {number} index
 * @return {boolean}
 */
MA_itemPocket.prototype.exist =function(index){
    return !!this._data[index];
};

// MA_itemPocket.prototype.allocateItem =function(item){
//     this._data.push(  MA_itemPocket.newItem(item));
// };
/**
 * @param {number} index
 * @param {RPG.Item} item
 * @param {number} amount
 */
MA_itemPocket.prototype.setData =function(index,item,amount){
    if(!this._data[index]){
        this._data[index]=MA_itemPocket.newItem(item,amount);
        return;
    }
    const obj = this._data[index];
    obj.id =item ? item.id :0;
    obj.amount = amount;
};
/**
 * @param {RPG.Item} item
 * @param {Number} [start = 0]
 */
MA_itemPocket.prototype.indexOf =function(item,start){
    for(var i=start||0;i <this._data.length;i+=1){
        if(this._data[i]){
            if(this._data[i].id ===item.id){
                return i;
            }
        }
    }
    return -1;
};


/**
 * @param {RPG.Item} item
 * @return {PokectItemData}
 */
MA_itemPocket.prototype.findItem=function(item){
    const index = this.indexOf(item);
    if(index !==-1){
        return this._data[index];
    }
    return null;
};
/**
 * @param {RPG.Item} item
 * @param {Number} amount
 */
MA_itemPocket.prototype.addItem=function(item,amount){

    const lastIndex = this.indexOf(item);

    return MA_itemPocket._addItemImple(this._data,item,amount,lastIndex);
};
/**
 * @param {RPG.Item} item
 * @param {Number} amount
 * @return {number} lastIndex
 */
MA_itemPocket.prototype.loseItem =function(item, amount){
    const lastIndex = this.indexOf(item);
    if(lastIndex !==-1){
        return MA_itemPocket._addItemImple(this._data,item,-amount,lastIndex);
    }
    return -1;
//    return MA_I


    const itemObj =this._data[index];
    if(itemObj){
        itemObj.amount -=amount;
        return itemObj.amount <=0;
    }
    return false;
};


MA_itemPocket.prototype.consumeItem=function(index){
    const item = this._data[index];
    const itemData = this.item(index);
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
    const item = this.item(index);
    const itemData =this._data[index]; 
    const am = Math.min(amount,itemData.amount);
    itemData.amount -= am;

    $gameParty.gainItem( item,am);
};

MA_itemPocket.prototype.releaseAllItem =function(){
    for(var i=0; i < this._data.length;++i){
        this.releaseItem(i,Number.MAX_SAFE_INTEGER);
    }
};
/**
 * @param {MA_itemPocket} myset
 */
MA_itemPocket.prototype.loadMyset =function(myset){
    this.releaseAllItem();
    var item=null;
    var amount=0;
    var amountToHave=0;
    var missingItemList=[];

    const len = myset.length();
    for(var i=0;i <len;++i){
        item= myset.item(i);
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
function createSetting(){
    const param = PluginManager.parameters('Mano_ItemPocket');
    MA_itemPocket.pocketSize =Number(param.pocketSize);

    const setting=  {
        maxAmount : Number (param.maxAmount),
        weight:Number(param.defaultWeight),
        canDuplicate:Boolean(param.canDuplicate==='true'),
        pocketSize :Number(param.pocketSize),

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
    return setting;
}
const setting = createSetting();
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
    /**
     * @param {RPG.Item} item
     */
    bootEachItem:function(item){
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
    },
    hasItem:hasItem,
    playSaveMysetSound:function(){
        SoundManager.playSave();
    },
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
        const obj =  this.fetch(item);// this._table[itemId];
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
    this._weightCapacity=Number.MAX_SAFE_INTEGER;
    this.createButtons();
    this.deactivate();
};
Window_PocketNumber.prototype.setNumber =function(number){
    this._number =number;
};

/**
 * @return {RPG.Item}
 */
Window_PocketNumber.prototype.item =function(){
    return this._item;
};

Window_PocketNumber.prototype.clear =function(){
    this._item =null;
    this.setNumber(0);
    this.updateCursor();
    this.refresh();
};

Window_PocketNumber.prototype.refresh=function(){
    this.contents.clear();
    if(this._item){
        const itemX =0;
        const itemY = this.itemY();
        const numberX =this.cursorX();

        this.resetTextColor();
        this.drawItemName(this._item,0,itemY);
        this.drawMultiplicationSign();
        this.drawNumber(numberX,itemY);

        if(setting.usingWeight){
            this.drawItemWeight(numberX);
            this.drawWeightText();
        }
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


Window_PocketNumber.prototype.drawNumber=function(x,y){
    const width = this.numberWidth();
    if(this._number>=this._max){
        this.changeTextColor( this.textColor(setting.color.max) );
    }else{
        this.resetTextColor();
    }
    this.drawText(this._number, x,y,width,'right' );
};

Window_PocketNumber.prototype.weightY =function(){
    return 1 *this.lineHeight();
};
Window_PocketNumber.prototype.weightText =function(){
    return setting.weightText;
};
Window_PocketNumber.prototype.itemWeight =function(){
    return MA_itemPocket.weight(this.item());
};
Window_PocketNumber.prototype.numberWidth =function(){
    return this.cursorWidth() - this.textPadding();
};

Window_PocketNumber.prototype.drawWeightText =function(){
    const x = this.numberWidth();
    const y = this.weightY();
    const weightText = this.weightText();
    const width = this.textWidth(weightText);
    this.changeTextColor(this.normalColor());
    this.drawText(this.weightText(),x,y,width,'right');
};
Window_PocketNumber.prototype.drawItemWeight =function(x){
    const y =this.weightY();
    const width = this.numberWidth();
    const value = this.itemWeight() *this._number;
    this.drawText(value ,x,y,width,'right');
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
    // if(!max){
    //     max =1;
    // }
    this.setNumber( Math.min(1,max));
    this._item =item;
    this._max =max;
    if(this._number ===NaN){
        this;
    }
    this.updateButtonsVisiblity();
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
    this.setNumber(  (this._number + amount).clamp(1, this._max));
    
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
Window_PocketNumber.prototype.buttonX =function(){
    return 8;
};


Window_PocketNumber.prototype.buttonY =function(){
    return 100;
};

Window_PocketNumber.prototype.createButtons =function(){
    Window_ShopNumber.prototype.createButtons.call(this);
    this.placeButtons();
//    Window_ShopNumber.prototype.placeButtons.call(this);
};


Window_PocketNumber.prototype.placeButtons =function(){
    const numButtons = this._buttons.length;
    const spacing = 8;
    const buttonY = this.buttonY();
    const width =48;
    let x = this.buttonX();

    for (let i = 0; i < this._buttons.length; i++) {
        var button = this._buttons[i];
        button.x = x;
        button.y =buttonY;
        x += width + spacing;//  button.width/2;//+spacing;
    }
};

Window_PocketNumber.prototype.updateButtonsVisiblity =function(){
    if (TouchInput.date > Input.date) {
        this.showButtons();
    } else {
        this.hideButtons();
    }
};

Window_PocketNumber.prototype.hideButtons =function(){
    Window_ShopNumber.prototype.hideButtons.call(this);    
};

Window_PocketNumber.prototype.showButtons =function(){
    Window_ShopNumber.prototype.showButtons.call(this);    
};
Window_PocketNumber.prototype.onButtonDown =function(){
    this.changeNumber(-1);
};
    

Window_PocketNumber.prototype.onButtonDown2 =function(){
    this.changeNumber(-10);
};
Window_PocketNumber.prototype.onButtonUp =function(){
    this.changeNumber(1);
};

Window_PocketNumber.prototype.onButtonUp2 =function(){
    this.changeNumber(10);
};

Window_PocketNumber.prototype.onButtonOk =function(){
    this.processOk();
};

function Window_PocketModeSelect(){
    this.initialize.apply(this,arguments);
};
Window_PocketModeSelect.baseType = Window_Command .prototype;
Window_PocketModeSelect.prototype = Object.create(Window_PocketModeSelect.baseType);
Window_PocketModeSelect.prototype.constructor = Window_PocketModeSelect;

Window_PocketModeSelect.prototype.initialize=function(x,y){
    Window_HorzCommand.prototype.initialize.call(this,x,y);
    this.deactivate();
    this.deselect();
};
Window_PocketModeSelect.prototype.windowWidth = function() {
    return Graphics.boxWidth;
};

Window_PocketModeSelect.prototype.maxCols = function() {
     return 4;
};


Window_PocketModeSelect.prototype.addUseCommand =function(){
    this.addCommand(setting.wordUse, setting.symbolUse );    
};
Window_PocketModeSelect.prototype.addRemoveCommand =function(){
    this.addCommand(setting.wordRemove, setting.symbolRemove );    
};
Window_PocketModeSelect.prototype.addSwapCommand =function(){
    this.addCommand(setting.wordSwap, setting.symbolSwap );    
};
Window_PocketModeSelect.prototype.addAddCommand =function(){
    this.addCommand(setting.wordAdd, setting.symbolAdd );    
};
Window_PocketModeSelect.prototype.addPassCommand =function(){
    this.addCommand(setting.wordPass,setting.symbolPass);
};

Window_PocketModeSelect.prototype.addMysetCommand =function(){
    if(setting.usingMyset){
        this.addCommand(setting.wordMyset,setting.symbolMyset);
    }
};

Window_PocketModeSelect.prototype.makeCommandList =function(){
    this.addUseCommand();
    this.addPassCommand();
    this.addSwapCommand();
    this.addRemoveCommand();
    this.addAddCommand();
    this.addMysetCommand();
};

Window_PocketModeSelect.prototype.processPageup =function(){
    SoundManager.playCursor();
    this.updateInputData();
    this.callHandler('pageup');
};
Window_PocketModeSelect.prototype.processPagedown =function(){
    SoundManager.playCursor();
    this.updateInputData();
    this.callHandler('pagedown');
};
// Window_PocketModeSelect.prototype.isOpenAndActive =function(){

// };


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
    this._equips =[];
    this._passMode =false;
    this.createAllButtons();
};

Window_Pocket.prototype.createButton=function(x,y,texcodeX,bitmap,func){
    const button = new Sprite_Button();
    const width  = 48;
    const height =48;

    button.x = x;
    button.y = y;
    button.setColdFrame(texcodeX, 0, width, height);
    button.setHotFrame(texcodeX, height, width, height);
    button.bitmap = bitmap;
    button.setClickHandler(func);
    this.addChild(button);
    return button;
}

Window_Pocket.prototype.createAllButtons =function(){
    const bitmap = ImageManager.loadSystem('ButtonSet');
    const buttonY =16;
    const buttonX = 8;
    const buttonSize = 48;
    const buttons = [
        this.createButton(buttonX+ 48*0,buttonY,48,bitmap,this.processPagedown.bind(this)) ,       
        this.createButton(buttonX+ 48*1,buttonY,96,bitmap,this.processPageup.bind(this))        
    ];
    this._buttonsWidth = 48 * buttons.length ;
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
//TODO ここで分岐して、nullcheckを変える
Window_Pocket.prototype.isCurrentItemEnabled =function(){
    return this.isEnabled(  this.item());
};
Window_Pocket.prototype.itemList =function(){
    return this._pocket._data;
};
Window_Pocket.prototype.makeEquipList =function(){
    this._equips =this.equips();
};
//TODO ここは改造
Window_Pocket.prototype.equips =function(){
    const actor = this.actor();
//    actor.equipSlots()
    var result =[];
    if(actor){
        const e = actor.equips();
        for(var i=0; i < e.length; ++i){
            if(e[i]){
            }

        }
    }
    return result;
};
Window_Pocket.prototype.makeItemList =function(){
//    const dummy = this.allItemList();
//    this._data = dummy;
    this._data = this._pocket._data;//  this.allItemList();
};
/**
 * @return {RPG.Item} 個数が0でも取得する
 */
Window_Pocket.prototype.itemObject =function(){
    return this._pocket.itemObject(this._index);
};
/**
 * @return {RPG.Item} 個数が0ならnull
 */
Window_Pocket.prototype.item =function(){
    const index =this.index();
    return this._pocket.item(index);
    return  index>=0 ? this._pocket.itemData(index) :null;
};
Window_Pocket.prototype.equipsSize =function(){
    return this._equips.length;
};

Window_Pocket.prototype.topItemIndex =function(){
    return 0;
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
Window_Pocket.prototype.index =function(){
    return this._index;
};
/**
 * @return {Number} selected Item amount
 */
Window_Pocket.prototype.amount=function(){
    if(this._pocket .exist(this._index)){
        return this._pocket.amount(this._index);
    }
    return 0;
};

/**
 * @return {Number} selected Item capacity
 */
Window_Pocket.prototype.capacity =function(){
    if(this._pocket.exist(this._index)){
        return this._pocket.capacity(this._index);
    }
    return Number.MAX_SAFE_INTEGER;
};

/**
 * @return {PokectItemData}
 */
Window_Pocket.prototype.selectedObject=function(){
    return this._data[this.index()];
};

/**
 * @param {RPG.Item} item
 * @param {Number} [start=0] 検索の開始位置
 * @return {number}
 */
Window_Pocket.prototype.indexOf=function(item,start){
    return this.pocket().indexOf( item,start );
};
/**
 * @param {RPG.Item} item
 * @param {number} [fallback=-1]
 */
Window_Pocket.prototype.selectOfItem =function(item,fallback){
    const index = this.indexOf(item);
    if(fallback===undefined){
        fallback =-1;
    }
    if(index ===-1){
        this.select(fallback);
    }else{
        this.select(index);
    }
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
 * @param {Game_Actor} actor
 */
Window_Pocket.prototype.setActor =function(actor){

    if(!actor){
        this._actor=null;
        this._pocket =null;
        return;
    }
    this._actor =actor;

    this.setPocket(actor.itemPocket());
    this._pocket.normalize();
    if(this.index() > this._pocket.length()){
        //TODO
        this.selectBack();
    }
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

    this.drawText(this.name(), this._buttonsWidth  ,0,this.itemWidth());
    const y = this.contents.fontSize;
    this.drawHorzLine(y);
};

Window_Pocket.prototype.weightWidth =function(){
    return this.textWidth('000');
};

Window_Pocket.prototype.totalWeight =function(){
    return this.pocket().weightSum();
};
Window_Pocket.prototype.maxWeight =function(){
    return this.actor().pocketWeightCapacity();
};

Window_Pocket.prototype.itemWeightText =function(){
    return ('%1/%2').format(this.totalWeight(),this.maxWeight());
};


// TODO　要リファクタリング パラメータ設定部分と実際の描画に分ける？
Window_Pocket.prototype.drawItemWeight =function(x,y){
//    const x =this.width -50;

    const totalWeight=this.totalWeight();
    const maxWeight = this.maxWeight();

    const maxWeightText = String(maxWeight);
    const weightMaxWidth = Number(this.textWidth(maxWeightText));
    const weightMax_X =x -weightMaxWidth;

    if(totalWeight >= maxWeight){
        this.changeTextColor(this.textColor(setting.color.max));
    }else{
        this.resetTextColor();
    }

    this.drawText(maxWeightText,weightMax_X,y,weightMaxWidth,'right');

    const slashWidth = this.textWidth('/');
    const slashX = weightMax_X -slashWidth;
    this.drawText('/',slashX,y);

    const totalWeightText =String(totalWeight);
    const totalWeightX = slashX - this.textWidth(totalWeightText);

    this.drawText(totalWeightText,totalWeightX,y);
};



Window_Pocket.prototype.drawAllItems =function(){
    this.changePaintOpacity(true);
    this.drawActorName();

    let x = this.width -50;
    if(setting.usingWeight){
        this.drawItemWeight(this.width-50,0);
    }


    const topIndex = this.topIndex();
    const last = Math.min(this.maxPageItems(),this.pocket().length());
    for (var i = topIndex; i < last; i++) {
        this.drawItem(i);
    }

};
Window_Pocket.prototype.deselect =function(){
    this.updateHelp();
    Window_Pocket.baseType.prototype.deselect.call(this);
};

Window_Pocket.prototype.updateHelp =function(){
    this.setHelpWindowItem(this.item());
};

Window_Pocket.prototype.maxCols = function() {
    return 1;
};
Window_Pocket.prototype.itemCountWidth =function(){
    return this.textWidth(':00');
};

Window_Pocket.prototype.selectTopItem =function(){
    this.select(this.topItemIndex());

};
Window_Pocket.prototype.selectBack=function(){
    const shift = (this.needNullPush()? 0:1);

    this.select( Math.max( 0,this._data.length-shift));
};
// 武器を飛ばして、先頭の道具を選択
Window_Pocket.prototype.selectFrontItem =function(){
    this.select(0);
};
//先頭を選ぶ　武器が選ばれるはず
Window_Pocket.prototype.selectFront =function(){
    this.select(0);
};
/**
 * @return {RPG.Armor[]}  装備品一覧　nullは除外済み
 */
Window_Pocket.prototype.equipList =function(){
    return this._equips;
};

/**
 * @return {RPG.Item[]} アイテムのみのリスト
 */
Window_Pocket.prototype.itemList =function(){
    return this.pocket().array();
};

Window_Pocket.prototype.allItemList =function(){
    return this.equipList().concat(this.itemList());
};


Window_Pocket.prototype.itemRect=function(index){
    const rect=  Window_Selectable.prototype.itemRect.call(this,index);
    rect.y += this.actorNameHeight();
    return rect;
};

Window_Pocket.prototype.drawItemAmount =function(index,rect){

    const item = this._data[index];
    
    this.drawText(':',rect.x,rect.y,rect.width -this.textWidth('00'),'right');
    if(this._pocket.isItemMax(index )){
        this.changeTextColor( this.textColor(setting.color.max) );
    }

    this.drawText( item.amount,rect.x,rect.y,rect.width ,'right');
};

/**
 * @param {number} index
 */
Window_Pocket.prototype.drawItemImple =function(index,item){
    const numberWidth = this.itemCountWidth();
    var rect = this.itemRect(index);
    rect.width -= this.textPadding();
    this.changePaintOpacity(this.isEnabled(this.pocket().item(index) ) );
    this.drawItemName($dataItems[ item.id], rect.x, rect.y, rect.width );
    this.drawItemAmount(index,rect);
};

Window_Pocket.prototype.drawItem =function(index){    
    const item = this._data[index];
    if(item){
        this.drawItemImple(index,item);
    }
};

function Window_PocketSub(){
    this.initialize.apply(this,arguments);    
}
Window_PocketSub.baseType = Window_Pocket;
Window_PocketSub.prototype = Object.create(Window_PocketSub.baseType.prototype);
Window_PocketSub.prototype.constructor =Window_PocketSub;
Window_PocketSub.prototype.initialize =function(){
    Window_PocketSub.baseType.prototype.initialize.apply(this,arguments);
};
Window_PocketSub.prototype.processCursorMove = function() {
    if (this.isCursorMovable()&&!this.isPassItemMode()) {
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
};
/**
 * @return {boolean}
 */
Window_PocketSub.prototype.isPassItemMode =function(){
    return this._passMode;
};

/**
 * @param {boolean} value
 */
Window_PocketSub.prototype.setPassItemMode=function(value){
    this._passMode =value;    
};

Window_PocketSub.prototype.setChangeNumberFunc =function(func){
    this._changeNumber=func;    
};
/**
 * @param {number} number
 */
Window_PocketSub.prototype.changeNumber =function(number){
    this._changeNumber(number);
};

Window_PocketSub.prototype.processNumberChange =function(){
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
};


Window_PocketSub.prototype.processHandling = function() {
    if(this.isOpenAndActive()) {
        if(this.isPassItemMode()){
            this.processNumberChange();
        }
        Window_PocketSub.baseType.prototype.processHandling.call(this);
    }
};

// Window_PocketSub.prototype.isCursorMovable =function(){
//     return this.item() !==this._swapTargetItem && Window_PocketSub.baseType.prototype.isCursorMovable.call(this);
// };


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
Window_PocketPreview.prototype.isEnabled =function(){
    return true;
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
    this.addCommand(setting.saveMyset,Window_MysetCommand.SYMBOL_SAVE);
};
Window_MysetCommand.prototype.addLoadCommand =function(){
    this.addCommand(setting.loadMyset,Window_MysetCommand.SYMBOL_LOAD);
};
Window_MysetCommand.prototype.addRenameCommand =function(){
    this.addCommand(setting.renameMyset ,Window_MysetCommand.SYMBOL_RENAME);
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
/**
 * @return {string}
 */
Window_MysetList.prototype.name =function(){
    return this.currentItem().name;

};

Window_MysetList.prototype.currentItem =function(){
    return this._list[this.index()];
};

/**
 * @return {MA_itemPocket}
 */
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
    
    static get pocketOk(){return 'pocketOk';}
    static get subPocketOk(){return 'subPocketOk';}
    static get subPocketCancel(){return 'subPocketCancel'}

    static  defaultEnebledJudge(item){
        return !!item;
    }

    constructor(){
        this._table ={};
        this._enableJudge =ModeObject.defaultEnebledJudge;
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
//        this.callHandler('pocketOk');
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


function Window_AddItem(){
    this.initialize.apply(this,arguments);
}

Window_AddItem.baseType =Window_ItemList;
Window_AddItem.prototype = Object.create(Window_AddItem.baseType.prototype);
Window_AddItem.prototype.constructor = Window_AddItem;

Window_AddItem.prototype.initialize=function(x,y,w,h){
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
    this._data = $gameParty.items().filter(
        MA_itemPocket.canPutInPocket
    );
};
Window_AddItem.prototype.deselect =function(){
    this.updateHelp();
    Window_AddItem.baseType.prototype.deselect.call(this);


};
Window_AddItem.prototype.updateHelp =function(){
    this.setHelpWindowItem(this.item());

};
/**
 * @member {RPG.Item} item
 */
class  PocketTemporary{
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
     * 
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
        console.log("index:"+index +" amount:"+amount);
        this.pocket().loseItem(index,amount);
    }

}

function Scene_ItemPocket() {
    this.initialize.apply(this,arguments);    
}

Scene_ItemPocket.baseType = Scene_ItemBase;
Scene_ItemPocket.prototype = Object.create(Scene_ItemBase.prototype);
Scene_ItemPocket.prototype.constructor = Scene_ItemPocket;

Scene_ItemPocket.prototype.initialize =function(){
    Scene_MenuBase.prototype.initialize.call(this);
    this._mode =null;
    this._itemUser =null;
    this._modeTable={};
    
    this._pocketTemporary=[];
    //    this.passAmount=0;
    this.createModeObjects();
};
Scene_ItemPocket.prototype.nextActor =function(){
    Scene_ItemPocket.baseType.prototype.nextActor.call(this);
};

/**
 * @param {Game_Actor} actor
 * @return {PocketTemporary}
 */
Scene_ItemPocket.prototype.pocketTemporary=function(actor){
    const actorId =actor.actorId();
     if(!this._pocketTemporary[actorId]){
         this._pocketTemporary[actorId]=new PocketTemporary(actor);
     }
     return this._pocketTemporary[actorId];
};
Scene_ItemPocket.prototype.refreshWeight =function(){
    if(setting.usingWeight){
        const tmp =this.pocketTemporary(this.actor());
        tmp.needWeightReset();
    }
};

/**
 * @param {Game_Actor} actor
 * @return {PocketIndex}
 */
Scene_ItemPocket.prototype.pocketIndex =function(actor){
    const id = actor._actorId;
    var tmp= this.pocketTemporary(actor);
    if(!tmp.pocketIndex){
        tmp.pocketIndex = actor.itemPocket().createIndexTable();
    }
    return tmp.pocketIndex;

};


/**
 * @param {Game_Actor} actor
 */
Scene_ItemPocket.prototype.reserveDestoryIndex =function(actor){
    const tmp = this.pocketTemporary(actor);
    tmp.destoryReservation =true;
};
Scene_ItemPocket.prototype.destoryPocketIndex=function(){
    const len = this._pocketTemporary.length;
    for(var i=0;i <len;i+=1){
        if(this._pocketTemporary[i]){
            this._pocketTemporary[i].refresh();
       }
    }
};

Scene_ItemPocket.prototype.isUsingMyset =function(){
    return setting.usingMyset;
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
    if(!this._actor){
        
    }


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
        setting.pocketWindow.w(),
        this._pocketWindow.height
    );
};
/**
 * @param {RPG.Item} item
 * @return {boolean}
 */
Scene_ItemPocket.prototype.canAddItem =function(item){
    if(!item){return false;}

    return this.pocketTemporary(this.actor()).canAdd(item);
};
Scene_ItemPocket.prototype.totalWeight =function(){
    return this.pocketTemporary(this.actor()).totalWeight();
};


/**
 * @param {Game_Actor} actor
 * @param {RPG.Item} item
 * @return {number}
 */
Scene_ItemPocket.prototype.itemCapacity =function(actor,item){
    return this.pocketTemporary(actor).indexTable().capacity(item);
};
/**
 * @param {Game_Actor} actor
 * @param {RPG.Item} item
 * @return {number}
 */
Scene_ItemPocket.prototype.weightCapacity =function(actor,item){
    const itemWeight = MA_itemPocket.weight(item);
    const remainingWeight = this.pocketTemporary(actor).remainingWeight();

    if(itemWeight===0){
        return Number.MAX_SAFE_INTEGER;
    }

    return Math.round(remainingWeight/itemWeight);
};


/**
 * @param {Game_Actor} actor
 * @param {RPG.Item} item
 * @return {number}
 */
Scene_ItemPocket.prototype.finalCapacity =function(actor,item){
    return Math.min(
        this.itemCapacity(actor,item),
        $gameParty.numItems( item )
    );
};

/**
 * @param {Game_Actor} actor
 * @param {RPG.Item} item
 * @return {number}
 */
Scene_ItemPocket.prototype.finalCapacityWithWeight =function(actor,item){
    return Math.min(
        this.itemCapacity(actor,item),
        $gameParty.numItems( item ),
        this.weightCapacity(actor,item)
    );
};

if(setting.usingWeight){
    Scene_ItemPocket.prototype.finalCapacity =Scene_ItemPocket.prototype.finalCapacityWithWeight;
}


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

    this._itemWindow=iw;
    this.addWindow(iw);
};


Scene_ItemPocket.prototype.openSelectWindow =function(){
    this._pocketWindow.height =this.smallPocketHegiht();
};
Scene_ItemPocket.prototype.closeSelectWindow =function(){
    this._pocketWindow.height =this.defaultPocketHeight();
};


/**
 * @param {RPG.Item} item
 */
Scene_ItemPocket.prototype.setupCapacityNumber =function(item){

    const capacity = this.finalCapacity(this.actor(),item);


    this._numberWindow.setup(item,capacity,1);
    this._numberWindow.refresh();
    this._numberWindow.activate();
};

Scene_ItemPocket.prototype.createNumberWindow=function(){
    const rect = this.subWindowRect();

    const num = new Window_PocketNumber(rect.x,rect.y,rect.width, this.smallPocketHegiht());
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
    this._itemWindow.deselect();
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
    const tmp = this.pocketTemporary(this.actor());
    const table = this.pocketIndex(this.actor());
    const item = this._itemWindow.item();
    const amount =this._numberWindow.number();
    tmp.addItem(item,amount);
    $gameParty.loseItem(item,amount);
    this.refreshWeight();

    this._pocketWindow.refresh();
    if($gameParty.numItems(item)>0){
        this._itemWindow.redrawItem(this._itemWindow.index());
    }else{
        this._itemWindow.refresh();
    }
    this._numberWindow.clear();
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
    this._pocketWindow.deselect();
    this._numberWindow.close();
};

Scene_ItemPocket.prototype.executeRemoveItem =function(){
    
    const index =this._pocketWindow.index();
    const amount = this._numberWindow.number();
    const tmp = this.pocketTemporary(this.actor());
    tmp.releaseItem(index,amount);
    this.refreshWeight();

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
Scene_ItemPocket.prototype.startPassMode =function(){
    this._pocketWindow.activate();
    this._pocketWindow.select(0);
    this.openSubPocketWindow();
    this.selectSubPocketActor();
    this.subPocketWindowSetActor($gameParty.menuActor());
};



Scene_ItemPocket.prototype.endPassMode =function(){

    this.closeSubPocketWindow();
};


/**
 * @param {number} amount
 */
Scene_ItemPocket.prototype.exeutePassItem =function(amount){

    if(amount>0){
        this.executePassItemImple(amount,this._pocketWindow,this._pocketWindow2);
        
    }else if(amount <0){
        this.executePassItemImple(-amount,this._pocketWindow2,this._pocketWindow);
    }
};
function passFinalAmount(a,b,c){
    console.log('a:'+a+' b:'+b+' c:'+c);
    return Math.min(a,b,c);
}
/**
 * @param {Number} amount
 * @param {Window_Pocket} senderWindow
 * @param {Window_Pocket} receiverWindow
 */
Scene_ItemPocket.prototype.executePassItemImple =function(amount,senderWindow,receiverWindow){

    const finalAmount = passFinalAmount(senderWindow.amount(),amount,receiverWindow.capacity());
    if(finalAmount <=0){
        return false;
    }

    const item = senderWindow.itemObject();
    const sender = senderWindow.pocket();
    const receiver = receiverWindow.pocket();
    sender.loseItem(item,finalAmount);
    receiver.addItem(item,finalAmount);
//     const sender = this.pocketTemporary(senderWindow.actor());
//     const receiver = this.pocketTemporary(receiverWindow.actor());
//     const index = senderWindow.index();
    
// //    const receiverIndex= receiver addItem(item,finalAmount);
//     sender.loseItem(index,finalAmount);
// //    sender.addItem (item,-finalAmount);
    
    senderWindow.refresh();
    receiverWindow.refresh();
    SoundManager.playCursor();

    return true;

};
/**
 * @param {Window_Pocket} pocketWindow
 */
Scene_ItemPocket.prototype.saveUndoPass =function(pocketWindow){
    const tmp = this.pocketTemporary(pocketWindow.actor());
    const i =pocketWindow.index();
    const a =pocketWindow.amount()
    tmp.setupPassParam(i,a);
};
/**
 * @param {Window_Pocket} pocketWindow
 */
Scene_ItemPocket.prototype.undoPass =function(pocketWindow){
    const item = pocketWindow.itemObject();  //item();


    if(item){
        const tmp = this.pocketTemporary(pocketWindow.actor());
        const pocket = pocketWindow.pocket();
        const index = pocketWindow.index();
        pocket.setData(index,item,tmp.preAmount);
        if(tmp.preAmount<=0){
            pocket.array().length -=1;
        }
        tmp.preAmount =0;
        pocketWindow.redrawItem(index);
    }
};

Scene_ItemPocket.prototype.passCancel =function(){
    if(this._pocketWindow2.isPassItemMode()){
        this.undoPass(this._pocketWindow);
        this.undoPass(this._pocketWindow2);
        this._pocketWindow2.setPassItemMode(false);
    }else{
        this;

    }
    this._pocketWindow.activate();
    this._pocketWindow2.deselect();

    //    const tmpA = this.pocketTemporary(this._pocketWindow.actor());
//    tmpA.
};
/**
 * @param {Window_Pocket} pocketWindow
 */
Scene_ItemPocket.prototype.pocketNormalize =function(pocketWindow){
    pocketWindow.pocket().normalize();
    pocketWindow.refresh();
};

Scene_ItemPocket.prototype.passSuccess =function(){

    this._pocketWindow.pocket().normalize();
    this._pocketWindow.refresh();
    this._pocketWindow2.pocket().normalize();
    this._pocketWindow2.refresh();            
    const tmp1= this.pocketTemporary(this._pocketWindow.actor());//.setupPassParam(Number.NaN,Number.NaN);
    const tmp2= this.pocketTemporary(this._pocketWindow2.actor());//.setupPassParam(Number.NaN,Number.NaN);
    tmp1.preAmount =0;
    tmp2.preAmount =0;

    this._pocketWindow2.setPassItemMode(false);
    this._pocketWindow2.deselect();
    this._pocketWindow.activate();
    if(!this._pocketWindow.item()){
        this._pocketWindow.selectBack();
    }
};

Scene_ItemPocket.prototype.passItemSelectAmount =function(){
    const item = this._pocketWindow.item();
    if(item){
        this._pocketWindow2.selectOfItem(item,this._pocketWindow2.maxItems());
    }else{
        this._pocketWindow2.select(0);
    }
    this._pocketWindow2.activate();
    this._pocketWindow2.setPassItemMode(true);    

    this.saveUndoPass(this._pocketWindow);
    this.saveUndoPass(this._pocketWindow2);
};

Scene_ItemPocket.prototype.passItem =function(){
    this.passItemSelectAmount();
};

Scene_ItemPocket.prototype.selectSubPocketActor=function(){
    const actorA = this._pocketWindow.actor();
    const actorB =$gameParty.members()[0];
    $gameParty.setMenuActor(actorB);
    if(actorA ===actorB){
        $gameParty.makeMenuActorNext();
    }
};

Scene_ItemPocket.prototype.startSwapMode =function(){

    this.selectSubPocketActor();
    this.subPocketWindowSetActor($gameParty.menuActor());
//    this.openSubPocketWindow();
//    this._pocketWindow2.open();
//    this._pocketWindow2.deactivate();
    this._pocketWindow.setLastNull(true);
    this._pocketWindow.activate();
    this._pocketWindow.select(0);
    const pocket= this.pocket();
};

Scene_ItemPocket.prototype.endSwapMode =function(){
    $gameParty.setMenuActor(this._pocketWindow.actor());
    this._actor = this._pocketWindow.actor();
    this._pocketWindow.deselect();
    this.closeSubPocketWindow();
};
Scene_ItemPocket.prototype.openSubPocketWindow =function(){
    this._pocketWindow2.open();
};
Scene_ItemPocket.prototype.closeSubPocketWindow=function(){
    this._pocketWindow2.close();    
};

Scene_ItemPocket.prototype.swapSelectSecond =function(){
    const item = this._pocketWindow.item();
    const itemIsEmpty = this._pocketWindow.itemAsNull();
    
    this._pocketWindow2.activate();
    this._pocketWindow2.setCursorFixed(false);
    this._pocketWindow2.setLastNull(!itemIsEmpty);
    if(itemIsEmpty){
        this._pocketWindow2.select(0);
        return;
    }

    //TODO:ここで、actor1のアイテムを選択させて固定。
    const index = this._pocketWindow2.indexOf(item); 
    if(index ===-1){
        this._pocketWindow2.selectBack();
    }else{
        this._pocketWindow2.select(index);
        this._pocketWindow2.setCursorFixed(true);
    }
};


// Scene_ItemPocket.prototype.swapSelectSecond0 =function(){
//     const item = this._pocketWindow.item();
//     const itemIsNotEmpty = !this._pocketWindow.itemAsNull();
    
//     this._pocketWindow2.activate();
//     this._pocketWindow2.setLastNull(itemIsNotEmpty);
//     if(itemIsNotEmpty){

//         //TODO:ここで、actor1のアイテムを選択させて固定。
//         const index = this._pocketWindow2.indexOf(item); 




//         this._pocketWindow2.selectBack();     
//     }else{
//         this._pocketWindow2.select(0);
//     }
// };



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
    this._pocketWindow.activate();

};

Scene_ItemPocket.prototype.startItemUseMode =function(){
    this._pocketWindow.activate();
    this._pocketWindow.select(0);
    this._pocketWindow.refresh();
};
Scene_ItemPocket.prototype.endItemUseMode =function(){
    this._pocketWindow.deselect();
    this._modeSelectWindow.activate();
};

/**
 * @param {RPG.Item} item
 */
function itemOccasionOk(item){
    return item.occasion === 0 || item.occasion === 2;    
}
/**
 * @param {RPG.Item} item
 */
Scene_ItemPocket.prototype.isUseableItem =function(item){
    //戦闘中限定のチェックを行う
    return !!item && itemOccasionOk(item);
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
    const item = pocket.item(index);
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
            //アイテムの使用に成功したので、失敗音を鳴らさずに離脱
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
    this._helpWindow.clear();
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
    this._helpWindow.setText(this.loadMysetText());
};

Scene_ItemPocket.prototype.endLoadMyset =function(){
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

    this._pocketPreviewWindow.setPocket( $gameParty.getPocketMyset(index).pocket   );
    this._pocketPreviewWindow.refresh();
    this.playSaveMysetSound();

    this.mysetExecuteSucces();
    this._helpWindow.clear();
};

Scene_ItemPocket.prototype.selectMysetList =function(){
    this._mysetListWindow.activate();
};

Scene_ItemPocket.prototype.saveMysetText =function(){
    return setting.saveMysetHelp;
};

Scene_ItemPocket.prototype.loadMysetText =function(){
    return setting.loadMysetHelp;
};


Scene_ItemPocket.prototype.saveMyset =function(){
    this.setHelpText(this.saveMysetText());
    this._mysetListWindow.activate();
    this._mysetListWindow.select(0);
    
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
//    this._pocketWindow.show();
//    this._pocketPreviewWindow.hide();

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
//    this.actor().mhp

};
Scene_ItemPocket.prototype.onNameEditOk =function(){
    this.executeRenameMyset();
    
    this.endRename();
};


Scene_ItemPocket.prototype.onMysetCommandCancel =function(){
    this.endMysetMode();
};

Scene_ItemPocket.prototype.mysetExecuteSucces =function(){
    this._mysetListWindow.deactivate();
    this._mysetListWindow.deselect();

    this._windowMysetCommand.activate();
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
/**
 * 
 * @param {RPG.Item} item1 
 * @param {RPG.Item} item2 
 */
function idUpper(item1,item2){
    return item1.id -item2.id;
}

Scene_ItemPocket.prototype.sortPreview =function(){
     const pocket= this.pocket().clone();
     pocket.sort(idUpper);
};

Scene_ItemPocket.prototype.startSortMode =function(){


};

Scene_ItemPocket.prototype.createModeSelectMode =function(){
    const mode =new ModeObject();
    this._nullMode =mode;
    this._mode =mode;
};

// TODO:あとでこっちのモードに切り替える
Scene_ItemPocket.prototype.createAddMode =function(){
    const mode =new ModeObject();
    mode.setHandler('start',this.startAddMode.bind(this));
    mode.setHandler('end',this.endAddMode.bind(this));
    mode.setHandler('numberOk',this.executeAddItem.bind(this));
    mode.setHandler('numberCancel',this.modeAddNumberCancel.bind(this));
    this._modeTable[setting.symbolAdd]=mode;
};
Scene_ItemPocket.prototype.createSwapMode =function(){
    const mode =new ModeObject();
    mode.setHandler('start',this.startSwapMode .bind(this));
    mode.setHandler('end',this.endSwapMode.bind(this));
    mode.setHandler('pocketOk',this.swapSelectSecond.bind(this));
    mode.setHandler(ModeObject.subPocketCancel,this.cancelSwap.bind(this));
    mode.setHandler(ModeObject.subPocketOk,this.executeSwap.bind(this));
    mode.setEnableJudge(function(item){return true;});
    mode.needNullPush =true;
    mode.usingSubWindow =true;
    this._modeTable[setting.symbolSwap]=mode;
};
Scene_ItemPocket.prototype.createRemoveMode =function(){
    const mode =new ModeObject();
    mode.setHandler('start',this.startRemoveMode .bind(this));
    mode.setHandler('end',this.endRemoveMode.bind(this));
    mode.setHandler('numberOk',this.executeRemoveItem.bind(this));
    mode.setHandler('numberCancel',this.modeRemoveNumberCancel.bind(this));
    mode.setHandler('pocketOk',this.removeItem.bind(this));
    mode.setEnableJudge(this.isRemoveabelItem.bind(this));
    this._modeTable[setting.symbolRemove]=mode;
};

Scene_ItemPocket.prototype.createModeUse =function(){
    const mode =new ModeObject();
    mode.setHandler('start',this.startItemUseMode.bind(this));
    mode.setHandler('end',this.endItemUseMode.bind(this));
    mode.setHandler('pocketOk',this.useItem.bind(this));
    mode.setHandler('actorOk',this.executeUseItem.bind(this));
    mode.setEnableJudge(this.isUseableItem.bind(this));
    // mode.needDestoryIndex =true;

    this._modeTable[setting.symbolUse] =mode;
//    this._modeSelectWindow.addCommand(xxx.worduse,addMode);
};
Scene_ItemPocket.prototype.createModeMyset =function(){
    const mode =new ModeObject();
    mode.setHandler('start',this.startMysetMode.bind(this));
    mode.setHandler('end',this.endMysetMode.bind(this));

    this._modeTable[setting.symbolMyset]=mode;
};
function isPassableItem(item){
    return true;
}

Scene_ItemPocket.prototype.createModePass =function(){
    const mode =new ModeObject();
    mode.setHandler('start',this.startPassMode.bind(this));
    mode.setHandler('end',this.endPassMode.bind(this));
    mode.setHandler('pocketOk',this.passItem.bind(this));
    mode.setHandler(ModeObject.subPocketCancel,this.passCancel.bind(this));
    mode.setHandler(ModeObject.subPocketOk,this.passSuccess.bind(this));
    mode.setEnableJudge(isPassableItem);
//    mode.needNullPush=true;

    mode.usingSubWindow =true;
    this._modeTable[setting.symbolPass]=mode;
};

//TODO:こっちの方が新しい　あとでこっちに切り替え
// 並びをユーザーで制御できるようにする
Scene_ItemPocket.prototype.createModeObjects =function(){
    this.createModeSelectMode();

    this.createModeUse();
    this.createModePass();
    this.createAddMode();
    this.createSwapMode();
    this.createRemoveMode();
    this.createModeMyset();
};


Scene_ItemPocket.prototype.createModeSelectWindow =function(){
    var a = new Window_PocketModeSelect(0,this._helpWindow.y +this._helpWindow.height );
    this._modeSelectWindow=a;
    a.setHandler('cancel',this.onModeCancel.bind(this));
    a.setHandler('ok',this.onModeOk.bind(this));
    a.setHandler('pagedown', this.nextActor.bind(this));
    a.setHandler('pageup',   this.previousActor.bind(this));
    this.addWindow(a); 
    a.refresh(); 
};

Scene_ItemPocket.prototype.createYesNoWindow =function(){

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
    var aie = new Window_PocketSub(w.x,w.y,w.width,w.height);
    this._pocketWindow2 = aie;
    aie.setEnableJudge(  this.isItemEnabled.bind(this) );  
    aie.setHandler( 'cancel',this.onSubPocketWidnowCancel.bind(this) );
    aie.setHandler('ok',this.onSubPocketWindowOk.bind(this) );
//    aie.setHandler('pageup',this.onSubWindowPageup.bind(this));
//    aie.setHandler('pagedown',this.onSubWindowPagedown.bind(this));
    aie.setChangeNumberFunc(this.exeutePassItem.bind(this));
    
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
    const input = new Window_NameInput(this._nameEditWindow);
    input.y = this._nameEditWindow.y + this._nameEditWindow.height;
    var aaa = 300;
    input.width =input.width-aaa;
    input.x =aaa;


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
    this._pocketWindow2.setActor(actor);
    this._pocketWindow2.refresh();
};
Scene_ItemPocket.prototype.onPocketOk =function(){
    const mode = this.currentModeObject();
    mode.pocketOk();
};


Scene_ItemPocket.prototype.onPocketCancel =function(){
    this.endMode();
};

Scene_ItemPocket.prototype.onSubPocketWidnowCancel =function(){
    const mode = this.currentModeObject();
    mode.subPocketCancel();
};

Scene_ItemPocket.prototype.onSubPocketWindowOk =function(){
    this.currentModeObject().subPocketOk();
};

Scene_ItemPocket.prototype.onSubPocketWindowChangeActor =function(){
    const mode = this.currentModeObject();
    this.subPocketWindowSetActor($gameParty.menuActor());
};
Scene_ItemPocket.prototype.canSubPocketChangeActor=function(){
    return $gameParty.size() >2;
};
//この辺りは仕様が決まらない
Scene_ItemPocket.prototype.onSubWindowPageup =function(){
    //if(this.canSubPocketChangeActor())
    {
        $gameParty.makeMenuActorPrevious();
        this.onSubPocketWindowChangeActor();        
    }

};
Scene_ItemPocket.prototype.onSubWindowPagedown =function(){
    //if(this.canSubPocketChangeActor())
    {
        $gameParty.makeMenuActorNext();
        this.onSubPocketWindowChangeActor();        
    }
};
Scene_ItemPocket.prototype.defaultPocketHeight =function(){
    return  Graphics.boxHeight- this._modeSelectWindow.y-this._modeSelectWindow.height;
};
Scene_ItemPocket.prototype.smallPocketHegiht =function(){
    return this._nameInputWindow.height-this._modeSelectWindow.height;
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
        setting.pocketWindow.w(),
        this.defaultPocketHeight()
    );
};

Scene_ItemPocket.prototype.defaultActorChange =function(){
    this._pocketWindow.setActor(this.actor());
    this._pocketWindow.refresh();

};

Scene_ItemPocket.prototype.onActorChange =function(){
    const mode = this.currentModeObject();
    if(mode.usingSubWindow&& !this._modeSelectWindow.active){
        this._pocketWindow2.setActor(this.actor());
        this._pocketWindow2.refresh();

    }else{
        this._pocketWindow.setActor(this.actor());
        this._pocketWindow.refresh();
    }
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

Scene_ItemPocket.prototype.onModeOk=function(){
    const symbol = this._modeSelectWindow.currentSymbol();
    const mode = this.fetchMode(symbol);
    if(mode){
        this.startMode(mode);
    }
    return;


    this._mode = this._modeSelectWindow.currentSymbol();
    

    const modeObj =this.currentModeObject();
    if(modeObj.usingSubWindow){
        this.openSubPocketWindow();
    }
    this._pocketWindow.setLastNull(modeObj.needNullPush);


    modeObj.start();
    // if(modeObj.needRefreshOnModeChange()){
    //     this._pocketWindow.refresh();
    // }
};

Scene_ItemPocket.prototype.onModeCancel =function(){
    SceneManager.pop();
};

/**
 * @param {ModeObject} mode
 */
Scene_ItemPocket.prototype.startMode =function(mode){
    this._mode =mode;
    mode.start();
    if(mode.usingSubWindow){
        this.openSubPocketWindow();
    }

    this._pocketWindow.setLastNull(mode.needNullPush);    
    this._pocketWindow.refresh();
};
Scene_ItemPocket.prototype.endMode =function(){
    const mode = this.currentModeObject();
    mode.end();
    this._mode = this._nullMode;
    

    this.destoryPocketIndex();
    this._pocketWindow.setLastNull(false);
    this._pocketWindow2.setLastNull(false);

    this.closeSubPocketWindow();
    this._pocketWindow.refresh();
    this._pocketWindow.deselect();
    this._modeSelectWindow.activate();
    this._helpWindow.clear();
};
/**
 * @param {string} mode
 * @return {ModeObject}
 */
Scene_ItemPocket.prototype.fetchMode =function(symbol){
    return this._modeTable [symbol];
};
/**
 * @return {ModeObject}
 */
Scene_ItemPocket.prototype.currentModeObject =function(){
    return this._mode;
   const mode=  this._modeSelectWindow.currentData();
   if(mode){
      return  this._modeTable [mode.symbol];
    }
   return this._nullMode;
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
};
Scene_ItemPocket.prototype.openActorWindow =function(){
    this._actorWindow.show();
};
Scene_ItemPocket.prototype.actorSetCursorAll =function(selectAll){
    this._actorWindow.setCursorAll(selectAll);
};

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


const zz_MA_DataManager_extractSaveContents =DataManager.extractSaveContents;
DataManager.extractSaveContents =function(){
    zz_MA_DataManager_extractSaveContents.apply(this,arguments);
    actorSetPocket();
    $gameParty.setupPocketMyset();
};
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
    const members =pocketFunction.includeMembers();
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
    if(!this._pocketMyset){
        this._pocketMyset =  createDefaultMyset(setting.mysetSize);
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
    this.setupPocket();
};

Game_Actor.prototype.setupPocket =function(){
    if(this.pocket_MA){
        return;
    }

    const actorData =$dataActors[this._actorId];
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
    this.pocket_MA=pocket.array();
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
    return this.itemPocket().findItem( $dataItems[itemId])!==null;
};

Game_Battler.prototype.pocketWeightCapacity=function(){
    return 100;
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
Window_BattlePocket.prototype.drawActorName =function(){};
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

global.Mano_ItemPocket =namespace;


})(this);
