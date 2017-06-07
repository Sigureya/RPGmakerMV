//=============================================================================
// Mano_weekPointView.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017-2017 Sigureya
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/Sigureya/
// [github]:https://github.com/Sigureya/RPGmakerMV
//=============================================================================

/*:ja
 * @plugindesc 攻撃対象を選ぶ段階で相手の弱点を表示します。
 * 
 * @author しぐれん（魔のささやき）
 * 
 * @param axisX
 * @desc 指定数値だけX座標をずらします。
 * @default 0
 * @param axisY
 * @desc 指定数値だけY座標をずらします。
 * @default 0
 * 
 * @param WeekLine
 * @desc 弱点の閾値。
 * 属性有効度がこの数値を上回ると、弱点として表示します。
 * @default 100
 * 
 * @param ResistanceLine
 * @desc 耐性の閾値
 * 属性有効度がこの数値を下回ると、耐性として表示します。
 * @default 100
 * 
 * @param WeekText
 * @desc 弱点の表示名。
 * @default 弱点
 * 
 * @param ResistanceText
 * @desc 耐性の表示名。
 * @default 耐性
 * 
 * @param BlockText
 * @desc 無効の表示名。
 * @default 無効
 * 
 * @param AbsorbText
 * @desc 吸収の表示名。
 * ※属性吸収のプラグインは別途用意してください。
 * @default 吸収
 * 
 * @param WeekTextColor
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
 * @desc 設定した文字列の表示方法
 * true:そのまま表示,false:ファイルを読み込む
 * @default true
 * 
 * @param displayNonTarget
 * @desc 攻撃対象外の敵に対して、弱点を表示するか
 * true:そのまま表示,false:表示しない
 * @default false
 *
 * @help
 * エネミーを選んでいる時に、それが弱点・半減・無効・吸収のどれであるかによって、
 * 文章や画像をエネミーの上に表示します。
 * 文章か画像かはパラメータのtextModeで設定します。
 * 
 * ■改造用の情報
 * 何を表示するかは、Game_Battler._weekPointViewで決まります。
 * .modeは、弱点・耐性・無効のどれを表示するかを選ぶのに使われます。
 * .displayは表示するかを決定します。
 * trueだと即座に表示し、falseだと弱点表示の消滅演出を行います。
 * 
 * 
 * var 1.0(2017/06/06) 公開
 */
var Imported = Imported || {};
Imported.Mano_WeekPointView = true;

(function () {
    'use strict';

	var param = PluginManager.parameters('Mano_WeekPointView');
	var weekPointView ={
        textMode :Boolean(param.textMode==='true'),
        WeekText : String(param.WeekText),
        ResistanceText : String(param.ResistanceText),
        BlockText : String(param.BlockText),
        AbsorbText : String(param.AbsorbText),
        WeekTextColor :  String(param.WeekTextColor),
        ResistanceTextColor : String(param.ResistanceTextColor),
        BlockTextColor : String(param.BlockTextColor),
        AbsorbTextColor : String(param.AbsorbTextColor),
        OutlineColor : String(param.OutlineColor),
        weekLine:Number(param.WeekLine)/100,
        resistanceLine:Number(param.ResistanceLine)/100,
        axisX : Number(param.axisX),
        axisY : Number(param.axisY),
    };




var mano_weekPointView_Image={};

function createTextBitmap(text,color){
    var bmp  = new Bitmap(120,32);
    bmp.textColor = color;
    bmp.outlineColor =weekPointView.OutlineColor;
    bmp.drawText(text,0,0,120,32,'center');
    return bmp;
}


function createInfoBitmap(str_or_fileName) {
    if( weekPointView.textMode ){
        return createTextBitmap(str_or_fileName);
    }
    return ImageManager.loadSystem(str_or_fileName);
}

var zz_MA_WeekPointView_Scene_Boot_loadSystemImages = Scene_Boot.loadSystemImages;
Scene_Boot.loadSystemImages= function() {
    zz_MA_WeekPointView_Scene_Boot_loadSystemImages.call(this);
    if( weekPointView.textMode ){
        mano_weekPointView_Image.week =createTextBitmap(weekPointView.WeekText,weekPointView.WeekTextColor);
        mano_weekPointView_Image.resistance =createTextBitmap(weekPointView.ResistanceText,weekPointView.ResistanceTextColor);
        mano_weekPointView_Image.Block = createTextBitmap(weekPointView.BlockText,weekPointView.BlockTextColor);
        if( weekPointView.AbsorbText ){
            mano_weekPointView_Image.Avsorb = createTextBitmap(weekPointView.AbsorbText,weekPointView.AbsorbTextColor);
        }

    }else{
        mano_weekPointView_Image.week = ImageManager.loadSystem(weekPointView.WeekText);
        mano_weekPointView_Image.resistance = ImageManager.loadSystem(weekPointView.ResistanceText);
        mano_weekPointView_Image.Block =  ImageManager.loadSystem(weekPointView.BlockText);
        if( weekPointView.AbsorbText ){
            mano_weekPointView_Image.Avsorb =  ImageManager.loadSystem(weekPointView.AbsorbText);
        }

    }
}


//-----------------------------------------//
// WeekPointView_Sprite                    //
//-----------------------------------------//
 function WeekPointView_Sprite(){
     this.initialize.apply(this, arguments);
 };
 WeekPointView_Sprite.prototype = Object.create(Sprite.prototype);
 WeekPointView_Sprite.prototype.constructor = WeekPointView_Sprite;

WeekPointView_Sprite.prototype.initialize=function(battler){
   Sprite.prototype.initialize.call(this);

   this._battler = battler;

   this.opacity = 0;
   this.anchor.x =0.5;
   this.anchor.y =0.5;
   
   this.setMode(0);

   this._slideX = 0;
   this.bitmap = this._red;

};

WeekPointView_Sprite.prototype.updatePosition=function(){
   this.x = weekPointView.axisX + this.battler().weekPointView_X()+this._slideX ;
   this.y = weekPointView.axisY + this.battler().weekPointView_Y();    
}

WeekPointView_Sprite.prototype.openUpdate =function(){
    this._slideX =0;
    this.opacity =255;
//    this.visible= true;
}

WeekPointView_Sprite.prototype.closeUpdate =function(){
    
    if(this.opacity>0){
        this._slideX += 2;
        this.opacity -= 10;
    }
}

WeekPointView_Sprite.prototype.update =function(){

    if(this.battler().isWeekPointDisplay()){
        this.openUpdate();
    }else{
        this.closeUpdate();
    }
    this.updatePosition();
}


WeekPointView_Sprite.prototype.battler =function(){
    return this._battler;
}
WeekPointView_Sprite.prototype.updateMode=function(){
    var mode= this.battler().getWeekPointView_mode();
    this.setMode(mode);
}
 
WeekPointView_Sprite.prototype.setMode=function(value){
    if(value ===0){
        this.visible = false;
        return;
    }
    this.visible = true;
 
    switch (value) {
        case 1:
            this.bitmap = mano_weekPointView_Image.week;
            break;
        case 2:
            this.bitmap = mano_weekPointView_Image.resistance;
            break
        case 3:
            this.bitmap = mano_weekPointView_Image.Block;
            break
        case 4:
            this.bitmap = mano_weekPointView_Image.Avsorb;
            break
    }
}
//-----------------------------------------//
// Game_Battler                            //
//-----------------------------------------//
var zz_MA_WeekPointView_Game_Battler_initMembers = Game_Battler.prototype.initMembers;
Game_Battler.prototype.initMembers=function(){
    zz_MA_WeekPointView_Game_Battler_initMembers.call(this);
    this._weekPointView ={
        offsetX :0,
        offsetY :0,
        display :false,
        mode :0,
    };

}

Game_Battler.prototype.setWeekPointView_mode =function(action){

    //吸収の表示サンプル
    //コメントアウトして処理
    //isAbsorbという関数は、プラグインに応じて書き換えてください
    //if(action.isAbsorb(this)){
    //  this._weekPointView.mode =4;
    //  return;
    //}

    var rate=action.calcElementRate(this);
    if( rate <=0 ){
        this._weekPointView.mode =3;
    }else if(rate >weekPointView.weekLine){
        this._weekPointView.mode =1;
    }else if(rate <weekPointView.resistanceLine){
        this._weekPointView.mode =2;
    }else{
        this._weekPointView.mode =0; 
    }
}
Game_Battler.prototype.getWeekPointView_mode =function(){
    return this._weekPointView.mode;
}
Game_Battler.prototype.openWeekView =function(){
    this._weekPointView.display=true ;
}
Game_Battler.prototype.closeWeekView =function(){
    this._weekPointView.display=false;
}

Game_Battler.prototype.isWeekPointDisplay =function(){
//    return this._weekPointView.mode !=0;
    return this._weekPointView.display;
}
Game_Battler.prototype.weekPointView_X=function(){
    return this._weekPointView.offsetX;
}
Game_Battler.prototype.weekPointView_Y=function(){
    return this._weekPointView.offsetY;
}
//-----------------------------------------//
// Spriteset_Battle                        //
//-----------------------------------------//

var zz_MA_Spriteset_Battle_UpperLayer = Spriteset_Battle.prototype.createUpperLayer
Spriteset_Battle.prototype.createUpperLayer = function() {
	this.createWeekPointView();
	zz_MA_Spriteset_Battle_UpperLayer.call(this);
};
Spriteset_Battle.prototype.createWeekPointView=function(){
    this._weekPointView=[];
    for(var i =0,len =this._enemySprites.length; i <len ; ++i){
        var e = this._enemySprites[i];
        var ws = new WeekPointView_Sprite(e._battler);
        this._weekPointView[i]=ws;
        e.addChild(ws);
    }
}
Spriteset_Battle.prototype.updateWeekPointView=function(){
    for(var i =0,len =this._weekPointView.length; i <len ; ++i){
        this._weekPointView[i].updateMode();
    }
}


//-----------------------------------------//
// Window_BattleEnemy                      //
//-----------------------------------------//
var zz_MA_WeekPointView_Window_BattleEnemy_select =Window_BattleEnemy.prototype.select;
Window_BattleEnemy.prototype.select =function(index){
    zz_MA_WeekPointView_Window_BattleEnemy_select.call(this,index);
    var action = BattleManager.inputtingAction();
    if(action && !action.isForOne()){
        return;
    }
    
    for(var i=0,len = this._enemies.length;i<len;i+=1){
        this._enemies[i].closeWeekView();
    }

    var enemy = this.enemy();
    if(enemy){
        enemy.openWeekView();
    }
}


//--------------//
// Scene_Battle //
//--------------//
Scene_Battle.prototype.closeAllWeekPointView =function(){
    var members = $gameTroop.members();
     for(var i=0,len = members.length;i<len;  i +=1){
         members[i].closeWeekView();
    }    
}
Scene_Battle.prototype.openAllWeekPointView =function(){
    var members = $gameTroop.members();
     for(var i=0,len = members.length;i<len;  i +=1){
         members[i].openWeekView();
    }
}
var zz_MA_WeekPointView_Scene_Battle_commandAttack =Scene_Battle.prototype.commandAttack;
Scene_Battle.prototype.commandAttack= function() {
    zz_MA_WeekPointView_Scene_Battle_commandAttack.call(this);
    this.weekPointView_setAction();
    var e = this._enemyWindow.enemy();
    if(e){
        e.openWeekView();
    }
}

var zz_MA_WeekPointView_Scene_Battle_onSelectAction= Scene_Battle.prototype.onSelectAction;
Scene_Battle.prototype.onSelectAction =function(){
    this.weekPointView_setAction();
	zz_MA_WeekPointView_Scene_Battle_onSelectAction.call(this);
};
Scene_Battle.prototype.weekPointView_setAction=function(){
    var action = BattleManager.inputtingAction();
    var members = $gameTroop.members();

    for(var i=0,len = members.length;i<len;  i +=1){
        var e = members[i];
        e.setWeekPointView_mode(action);
    }
    this._spriteset.updateWeekPointView();

    if(action.isForAll()){        
        this.openAllWeekPointView();
    }else{
        this.closeAllWeekPointView();
    }
}
var zz_MA_WeekPointView_Scene_Battle_startActorCommandSelection=Scene_Battle.prototype.startActorCommandSelection;
Scene_Battle.prototype.startActorCommandSelection = function(){
    zz_MA_WeekPointView_Scene_Battle_startActorCommandSelection.call(this);
    this.closeAllWeekPointView();
}

var zz_MA_WeekPointView_Scene_Battle_onEnemyOk=Scene_Battle.prototype.onEnemyOk;
Scene_Battle.prototype.onEnemyOk = function(){
    zz_MA_WeekPointView_Scene_Battle_onEnemyOk.call(this);
    this.closeAllWeekPointView();
}

var zz_MA_WeekPointView_Scene_Battle_onEnemyCancel=Scene_Battle.prototype.onEnemyCancel;
Scene_Battle.prototype.onEnemyCancel = function() {
    zz_MA_WeekPointView_Scene_Battle_onEnemyCancel.call(this);
    this.closeAllWeekPointView();
}

})();
