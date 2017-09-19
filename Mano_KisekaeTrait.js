 //=============================================================================
// Mano_KisekaeTrait.js
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
 * @plugindesc 装備品にグラフィック変更特性を追加します
 * 
 * @param kisekae1
 * @type struct<Kisekae>
 * @default {"armor":"1","characterId":"1","character":"Actor1","sv_actor":"Actor1_1"}
 * @param kisekae2
 * @type struct<Kisekae>
 * 
 * @param kisekae3
 * @type struct<Kisekae>
 * 
 * @param kisekae4
 * @type struct<Kisekae>
 * 
 * @param kisekae5
 * @type struct<Kisekae>
 * 
 * @param kisekae6
 * @type struct<Kisekae>
 * @param kisekae7
 * @type struct<Kisekae>
 * @param kisekae8
 * @type struct<Kisekae>
 * @param kisekae9
 * @type struct<Kisekae>
 * @param kisekae10
 * @type struct<Kisekae>
 * @param kisekae11
 * @type struct<Kisekae>
 * @param kisekae12
 * @type struct<Kisekae>
 * @param kisekae13
 * @type struct<Kisekae>
 * @param kisekae14
 * @type struct<Kisekae>
 * @param kisekae15
 * @type struct<Kisekae>
 * @param kisekae16
 * @type struct<Kisekae>
 * @param kisekae17
 * @type struct<Kisekae>
 * @param kisekae18
 * @type struct<Kisekae>
 * @param kisekae19
 * @type struct<Kisekae>
 * @param kisekae20
 * @type struct<Kisekae>
 * 
 * もし、設定数が足りないのであれば、メモに上の内容をコピーして項目を追加してください。
 * 
 * @help
 * 見た目変更装備を作ります。
 * 複数の装備が見た目の変更条件を満たした場合、
 * 一番上の装備のデータが適用されます。
 * 
 * データの設定はプラグインパラメータで行います。
 * 初期データでは、装備品1をハロルドのグラフィックに変更するよう
 * 設定が組まれています。
 * 
 * 画像の変更は装備を切り替えた瞬間に行うので、
 * ゲーム開始時は実質無効です。
 * var 0.9.0(2017/09/20) 仮公開
*/

/*~struct~Kisekae:
 * @param armor
 * @desc 関連付けるためのキー文字列
 * @type armor
 * 
 * @param characterIndex
 * @desc 歩行グラフィックのどれを参照するかを決めます
 * @type number
 * @min 0
 * @max 7
 * @default 0
 * 
 * @param character
 * @type file
 * @dir img/characters
 * 
 * @param battler
 * @desc サイドビュー用の画像を設定します
 * @type file
 * @dir img/sv_actors
 */
(function(){

'use strict'
//開発用　入力保管を有効にするならこれを使う
// class KisekaeTrait{
//     constructor(){
//         this.character ='';
//         this.index=1;
//         this.battler='';
//     }
// }

/**
 * 
 * @param {String} characterName
 * @param {Number} index
 * @param {String} battlerName
 * 
 */
function createKisekaeDefine(characterName,index,battlerName){
    return {
        character:characterName,
        index:index,
        battler:battlerName
    };
}
function boot_kisekae_eachArmor(param){
    const equipId = Number( param.armor);
    const index = Number(param.characterIndex);

    const characterName = param.character;
    const battlerName =param.battler;
    $dataArmors[equipId].kisekaeTrait_MA =createKisekaeDefine(characterName,index,battlerName);
}

const Scene_Boot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start =function(){
    Scene_Boot_start.call(this);
    const param =(  PluginManager.parameters('Mano_KisekaeTrait'));
    for(var key in param){
        var data = param[key];
        if(data){
            boot_kisekae_eachArmor(JSON.parse(data) );
        }
    }
};
/**
 * @param {Game_Actor} actor 
 * @return {RPG.Armor} 見つからなかったらnull
 */
function fetchKisekaeArmor(actor){
    const equips = actor.equips();
    for(var i =0; i< equips.length; i+=1){
        const e = equips[i];
        if(e && e.kisekaeTrait_MA){
            return e;
        }
    }
    return null;
}

/**
 * @param {RPG.Armor} armor
 * @return {KisekaeTrait}
 */
function fetchKisekaeTrait(armor){
    return armor.kisekaeTrait_MA;
}
/**
 * @return {boolean}
 * @param {RPG.Armor} armor 
 */
function hasKisekaeTrait(armor){
    return armor && !!fetchKisekaeTrait(armor);
}

/**
 * 
 * @param {KisekaeTrait} trait 
 */
function requestKisekaeImage(trait){
    if(trait.character){
        ImageManager.requestCharacter(trait.character);
    }
    if(trait.battler){
        ImageManager.requestSvActor(trait.battler);
    }

}

/**
 * @param {Game_Actor} actor
 * @param {RPG.Armor} [armor=null]
 */
function kisekaeRefresh(actor,armor){
    if(armor){
        const trait = fetchKisekaeTrait(armor);
        if(trait){
            requestKisekaeImage(trait);
            actor.setCharacterImage(trait.character,trait.index);
            actor.setBattlerImage(trait.battle);
            return;
        }
    }
    const dataActor =actor.actor();
    actor.setCharacterImage(dataActor.characterName,dataActor.characterIndex);
    actor.setBattlerImage(dataActor.battlerName);
}
const Game_Actor_changeEquip = Game_Actor.prototype.changeEquip;
Game_Actor.prototype.changeEquip =function(slotId, item){
    const lastItem = this._equips[slotId].object();
    Game_Actor_changeEquip.call(this,slotId,item);

    if(lastItem ===item){
        return;
    }
    if(hasKisekaeTrait(item) || hasKisekaeTrait(lastItem) ){
        kisekaeRefresh(this,item);
        $gamePlayer.refresh();        
    }
};

Game_Actor.prototype.applyKiesekae =function(){
    const e = fetchKisekaeArmor(this);
    kisekaeRefresh(this,e);
};

const Game_Interpreter_pluginCommand=Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand =function(command, args){
    if(command ==='kisekae'){
        const actors = $gameParty.members();
        actors.forEach(function(actor){actor.applyKiesekae()});
        $gamePlayer.refresh();
    }
};

})();