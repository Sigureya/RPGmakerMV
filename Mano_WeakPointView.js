//=============================================================================
// Mano_weakPointView.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017-2017 Sigureya
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/Sigureya/
// [github]:https://github.com/Sigureya/RPGmakerMV
//=============================================================================

/*:
 * @plugindesc 攻撃対象を選ぶ段階で相手の弱点を表示します。
 * 
 * @author しぐれん（魔のささやき）
 * @param anchorX
 * @desc 画像の中心軸。Sprite.anchor.xに使用します。
 * 0~1.0の値を指定してください。
 * @default 0.5
 * 
 * @author しぐれん（魔のささやき）
 * @param anchorY
 * @desc 画像の中心軸。Sprite.anchor.yに使用します。
 * 0~1.0の値を指定してください。
 * @default 0.0
 * 
 * @param WeakLine
 * @desc 弱点の閾値。
 * 属性有効度がこの数値を上回ると、弱点として表示します。
 * @default 100
 * 
 * @param ResistanceLine
 * @desc 耐性の閾値
 * 属性有効度がこの数値を下回ると、耐性として表示します。
 * @default 100
 * 
 * @param WeakText
 * @type string
 * @desc 弱点の表示名。
 * @default 弱点
 * 
 * @param ResistanceText
 * @type string
 * @desc 耐性の表示名。
 * @default 耐性
 * 
 * @param BlockText
 * @type string
 * @desc 無効の表示名。
 * @default 無効
 * 
 * @param AbsorbText
 * @desc 吸収の表示名。
 * ※属性吸収のプラグインは別途用意してください。
 * @default 吸収
 * 
 * @param WeakTextColor
 * @desc 弱点の表示色。
 * @default #FF5050
 * 
 * @param ResistanceTextColor
 * @desc 耐性の表示色。
 * @default #5050FF
 * 
 * @param BlockTextColor
 * @desc 無効の表示色。
 * @default #112211
 * 
 * @param AbsorbTextColor
 * @desc 吸収の表示名。
 * ※属性吸収のプラグインは別途用意してください。
 * @default #50FF50
 * 
 * @param OutlineColor
 * @desc 弱点などの表示をするときの文字の周りの色。
 * @default #EEEEEE
 * 
 * @param textMode
 * @type boolean
 * @desc 設定した文字列の表示方法
 * true:そのまま表示,false:ファイルを読み込む
 * @default true
 * 
 * @param displayNonTarget
 * @type boolean
 * @desc 攻撃対象外の敵に対して、弱点を表示するか
 * true:そのまま表示,false:表示しない
 * @default false
 *
 * @param displayNonSelect
 * @type boolean
 * @desc 攻撃対象を選択しないスキルの際に、ワンクッションを置いて弱点を表示するか
 * true:表示,false:表示しない（未実装）
 * @default true
 * 
 * 
 * @help
 * エネミーを選んでいる時に、それが弱点・半減・無効・吸収のどれであるかによって、
 * 文章や画像をエネミーの上に表示します。
 * 文章か画像かはパラメータのtextModeで設定します。
 * 
 * ■改造用の情報
 * 何を表示するかは、Game_Battler._weakPointViewで決まります。
 * .modeは、弱点・耐性・無効のどれを表示するかを選ぶのに使われます。
 * .displayは表示するかを決定します。
 * trueだと即座に表示し、falseだと弱点表示の消滅演出を行います。
 * 
 * 
 * var 1.0(2017/06/06) 公開
 */
var Imported = Imported || {};
Imported.Mano_WeakPointView = true;

(function () {
    'use strict';

	const param = PluginManager.parameters('Mano_WeakPointView');
	const weakPointView ={
        anchorX :1.0-Number(param.anchorX),
        anchorY :1.0-Number(param.anchorY),
        textMode :Boolean(param.textMode==='true'),
        WeakText : String(param.WeakText),
        ResistanceText : String(param.ResistanceText),
        BlockText : String(param.BlockText),
        AbsorbText : String(param.AbsorbText),
        WeakTextColor :  String(param.WeakTextColor),
        ResistanceTextColor : String(param.ResistanceTextColor),
        BlockTextColor : String(param.BlockTextColor),
        AbsorbTextColor : String(param.AbsorbTextColor),
        OutlineColor : String(param.OutlineColor),
        weakLine:Number(param.WeakLine)/100,
        resistanceLine:Number(param.ResistanceLine)/100,
//        axisX : Number(param.axisX),
//        axisY : Number(param.axisY),
    };




var mano_weakPointView_Image={};

function createTextBitmap(text,color){
    var bmp  = new Bitmap(120,32);
    bmp.textColor = color;
    bmp.outlineColor =weakPointView.OutlineColor;
    bmp.drawText(text,0,0,120,32,'center');
    return bmp;
}


function createInfoBitmap(str_or_fileName) {
    if( weakPointView.textMode ){
        return createTextBitmap(str_or_fileName);
    }
    return ImageManager.loadSystem(str_or_fileName);
}

var zz_MA_WeakPointView_Scene_Boot_loadSystemImages = Scene_Boot.loadSystemImages;
Scene_Boot.loadSystemImages= function() {
    zz_MA_WeakPointView_Scene_Boot_loadSystemImages.call(this);
    if( weakPointView.textMode ){
        mano_weakPointView_Image.weak =createTextBitmap(weakPointView.WeakText,weakPointView.WeakTextColor);
        mano_weakPointView_Image.resistance =createTextBitmap(weakPointView.ResistanceText,weakPointView.ResistanceTextColor);
        mano_weakPointView_Image.Block = createTextBitmap(weakPointView.BlockText,weakPointView.BlockTextColor);
        if( weakPointView.AbsorbText ){
            mano_weakPointView_Image.Avsorb = createTextBitmap(weakPointView.AbsorbText,weakPointView.AbsorbTextColor);
        }

    }else{
        mano_weakPointView_Image.weak = ImageManager.loadSystem(weakPointView.WeakText);
        mano_weakPointView_Image.resistance = ImageManager.loadSystem(weakPointView.ResistanceText);
        mano_weakPointView_Image.Block =  ImageManager.loadSystem(weakPointView.BlockText);
        if( weakPointView.AbsorbText ){
            mano_weakPointView_Image.Avsorb =  ImageManager.loadSystem(weakPointView.AbsorbText);
        }

    }
}


//-----------------------------------------//
// WeakPointView_Sprite                    //
//-----------------------------------------//
 function WeakPointView_Sprite(){
     this.initialize.apply(this, arguments);
 };
 WeakPointView_Sprite.prototype = Object.create(Sprite.prototype);
 WeakPointView_Sprite.prototype.constructor = WeakPointView_Sprite;

WeakPointView_Sprite.prototype.initialize=function(battler){
   Sprite.prototype.initialize.call(this);

   this._battler = battler;

   this.opacity = 0;
   this.anchor.x =weakPointView.anchorX;
   this.anchor.y =weakPointView.anchorY;
   
   this.setMode(0);

   this._slideX = 0;
   this.bitmap = this._red;

};

WeakPointView_Sprite.prototype.updatePosition=function(){
   this.x = this.battler().weakPointView_X()+this._slideX ;
   this.y = this.battler().weakPointView_Y();    
};

WeakPointView_Sprite.prototype.openUpdate =function(){
    this._slideX =0;
    this.opacity =255;
//    this.visible= true;
};

WeakPointView_Sprite.prototype.closeUpdate =function(){
    
    if(this.opacity>0){
        this._slideX += 2;
        this.opacity -= 10;
    }
};

WeakPointView_Sprite.prototype.update =function(){

    if(this.battler().isWeakPointDisplay()){
        this.openUpdate();
    }else{
        this.closeUpdate();
    }
    this.updatePosition();
}


WeakPointView_Sprite.prototype.battler =function(){
    return this._battler;
}
WeakPointView_Sprite.prototype.updateMode=function(){
    var mode= this.battler().getWeakPointView_mode();
    this.setMode(mode);
}
 
WeakPointView_Sprite.prototype.setMode=function(value){
    if(value ===0){
        this.visible = false;
        return;
    }
    this.visible = true;
 
    switch (value) {
        case 1:
            this.bitmap = mano_weakPointView_Image.weak;
            break;
        case 2:
            this.bitmap = mano_weakPointView_Image.resistance;
            break
        case 3:
            this.bitmap = mano_weakPointView_Image.Block;
            break
        case 4:
            this.bitmap = mano_weakPointView_Image.Avsorb;
            break
    }
}
//-----------------------------------------//
// Game_Battler                            //
//-----------------------------------------//
var zz_MA_WeakPointView_Game_Battler_initMembers = Game_Battler.prototype.initMembers;
Game_Battler.prototype.initMembers=function(){
    zz_MA_WeakPointView_Game_Battler_initMembers.call(this);
    this._weakPointView ={
        offsetX :0,
        offsetY :0,
        display :false,
        mode :0,
    };

}

Game_Battler.prototype.setWeakPointView_mode =function(action){

    //吸収の表示サンプル
    //コメントアウトして処理
    //isAbsorbという関数は、プラグインに応じて書き換えてください
    //if(action.isAbsorb(this)){
    //  this._weakPointView.mode =4;
    //  return;
    //}

    var rate=action.calcElementRate(this);
    if( rate <=0 ){
        this._weakPointView.mode =3;
    }else if(rate >weakPointView.weakLine){
        this._weakPointView.mode =1;
    }else if(rate <weakPointView.resistanceLine){
        this._weakPointView.mode =2;
    }else{
        this._weakPointView.mode =0; 
    }
}
Game_Battler.prototype.getWeakPointView_mode =function(){
    return this._weakPointView.mode;
}
Game_Battler.prototype.openWeakView =function(){
    this._weakPointView.display=true ;
}
Game_Battler.prototype.closeWeakView =function(){
    this._weakPointView.display=false;
}

Game_Battler.prototype.isWeakPointDisplay =function(){
//    return this._weakPointView.mode !=0;
    return this._weakPointView.display;
}
Game_Battler.prototype.weakPointView_X=function(){
    return this._weakPointView.offsetX;
}
Game_Battler.prototype.weakPointView_Y=function(){
    return this._weakPointView.offsetY;
}
//-----------------------------------------//
// Spriteset_Battle                        //
//-----------------------------------------//

var zz_MA_Spriteset_Battle_UpperLayer = Spriteset_Battle.prototype.createUpperLayer
Spriteset_Battle.prototype.createUpperLayer = function() {
	this.createWeakPointView();
	zz_MA_Spriteset_Battle_UpperLayer.call(this);
};
Spriteset_Battle.prototype.createWeakPointView=function(){
    this._weakPointView=[];
    for(var i =0,len =this._enemySprites.length; i <len ; ++i){
        var e = this._enemySprites[i];
        var ws = new WeakPointView_Sprite(e._battler);
        this._weakPointView[i]=ws;
        e.addChild(ws);
    }
}
Spriteset_Battle.prototype.updateWeakPointView=function(){
    for(var i =0,len =this._weakPointView.length; i <len ; ++i){
        this._weakPointView[i].updateMode();
    }
}


//-----------------------------------------//
// Window_BattleEnemy                      //
//-----------------------------------------//
const zz_MA_WeakPointView_Window_BattleEnemy_select =Window_BattleEnemy.prototype.select;
Window_BattleEnemy.prototype.select =function(index){
    zz_MA_WeakPointView_Window_BattleEnemy_select.call(this,index);
    var action = BattleManager.inputtingAction();
    if(action && !action.isForOne()){
        return;
    }
    
    for(var i=0,len = this._enemies.length;i<len;i+=1){
        this._enemies[i].closeWeakView();
    }

    var enemy = this.enemy();
    if(enemy){
        enemy.openWeakView();
    }
}


//--------------//
// Scene_Battle //
//--------------//
Scene_Battle.prototype.closeAllWeakPointView =function(){
    var members = $gameTroop.members();
     for(var i=0,len = members.length;i<len;  i +=1){
         members[i].closeWeakView();
    }    
}
Scene_Battle.prototype.openAllWeakPointView =function(){
    var members = $gameTroop.members();
     for(var i=0,len = members.length;i<len;  i +=1){
         members[i].openWeakView();
    }
}
const zz_MA_WeakPointView_Scene_Battle_commandAttack =Scene_Battle.prototype.commandAttack;
Scene_Battle.prototype.commandAttack= function() {
    zz_MA_WeakPointView_Scene_Battle_commandAttack.call(this);
    this.weakPointView_setAction();
    var e = this._enemyWindow.enemy();
     if(e){
        e.openWeakView();
    }
}

const zz_MA_WeakPointView_Scene_Battle_onSelectAction= Scene_Battle.prototype.onSelectAction;
Scene_Battle.prototype.onSelectAction =function(){
    this.weakPointView_setAction();
	zz_MA_WeakPointView_Scene_Battle_onSelectAction.call(this);
};
Scene_Battle.prototype.weakPointView_setAction=function(){
    const action = BattleManager.inputtingAction();
    const members = $gameTroop.members();

    for(var i=0,len = members.length;i<len;  i +=1){
        var e = members[i];
        e.setWeakPointView_mode(action);
    }
    this._spriteset.updateWeakPointView();

    if(action.isForAll()){        
        this.openAllWeakPointView();
    }else{
        this.closeAllWeakPointView();
    }
};
const zz_MA_WeakPointView_Scene_Battle_startActorCommandSelection=Scene_Battle.prototype.startActorCommandSelection;
Scene_Battle.prototype.startActorCommandSelection = function(){
    zz_MA_WeakPointView_Scene_Battle_startActorCommandSelection.call(this);
    this.closeAllWeakPointView();
};

const zz_MA_WeakPointView_Scene_Battle_onEnemyOk=Scene_Battle.prototype.onEnemyOk;
Scene_Battle.prototype.onEnemyOk = function(){
    zz_MA_WeakPointView_Scene_Battle_onEnemyOk.call(this);
    this.closeAllWeakPointView();
};
const zz_MA_WeakPointView_Scene_Battle_onEnemyCancel=Scene_Battle.prototype.onEnemyCancel;
Scene_Battle.prototype.onEnemyCancel = function() {
    zz_MA_WeakPointView_Scene_Battle_onEnemyCancel.call(this);
    this.closeAllWeakPointView();
};

})();
