//=============================================================================
// Mano_SpriteNumber.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017-2017 Sigureya
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/Sigureya/
// [github]:https://github.com/Sigureya/RPGmakerMV
//=============================================================================

/*:
 * @plugindesc 数字を表示するためのスプライトです。
 * 色々使えます。
 * @author しぐれん（魔のささやき）
 * 
 * @param mapNumbers
 * @desc マップ上で表示する数字スプライトの一覧です。
 * @type struct<SpriteSetting>[]
 * @default []
 * 
 * @param bitmapRows
 * @type struct<BitmapRow>[]
 * @default []
 * 
 * @help
 * マップ上で数字を表示するプラグインです。
 * プラグインパラメータだけ設定すればいい感じに動きます。
 * 
 * ver 1.0.0 (2018/04/02)
 * 公開
*/
/*~struct~DecorationSprite:
 * @param bitmap
 * @type file
 * @dir img
 * 
 * @param x
 * @type number
 * @default 0
 * 
 * @param y
 * @type number
 * @default 0
 */
/*~struct~BitmapRow:
 * @param bitmap
 * @desc 数字用の画像セットです
 * @type file
 * @dir img/system
 * 
 * @param maxRow
 * @desc 画像セット内に数値要素がいくつあるかを定義します。
 * デフォルトのダメージ画像だと5です
 * @type number
 * @default 5
 * @min 1
*/


/*~struct~SpriteSetting:
 *
 * @param x
 * @desc X座標
 * @type number
 * @default 0
 * 
 * @param y
 * @desc Y座標
 * @type number
 * @default 0
 * 
 * @param switchId
 * @text スイッチ
 * @desc 指定したスイッチがONの時だけ表示します。
 * 指定しない場合、常に表示されます。
 * @type State
 * @default 0
 * 
 * @param variableId
 * @desc 指定した変数が変更された場合、スプライトを更新します。
 * @type variable
 * @dafault 0
 * 
 * @param animation
 * @desc 数字が切り替えられたときに、飛び跳ねるような演出をします。
 * 処理はleap用の関数を通して行われます。
 * @type boolean
 * @default false
 * 
 * @param spacing
 * @desc 数字同士の間隔を設定します。
 * 負の数値を設定すると、数字が重なります。
 * @default 0
 * 
 * @param digit
 * @text 桁数
 * @desc 桁数を指定します。
 * 指定値より大きい数値が指定された場合、999...などになります。
 * @default 8
 * 
 * @param padZero
 * @desc ゼロ埋め処理の有無を指定します
 * @type boolean
 * @default false
 * 
 * @param bitmap
 * @desc 使用する画像ファイルです。
 * @type file
 * @dir img/system
 * @default Damage
 * 
 * 
 * @param DecorationLower
 * @desc 数字より下のレイヤーに表示される画像です。
 * @type struct<DecorationSprite>
 * 
 * @param DecorationUpper
 * @desc 数字より上のレイヤーに表示される画像です。
 * @type struct<DecorationSprite>
 * 
 * 
 */

var Mano_SpriteNumber=(function(){
'use strict'

class Setting_SpriteNumber{
    constructor(jsonObject){
        this.bitmapRow =5;
        this.switchId=Number(jsonObject.switchId);
        this.variableId = Number(jsonObject.variableId);
        this.padZero = (jsonObject.padZero ==='true');
        this.digit = Number(jsonObject.digit);
        this.spacing = Number(jsonObject.spacing);
        this.bitmap =String(jsonObject.bitmap ||'damage');
        this.x = Number(jsonObject.x);
        this.y = Number(jsonObject.y);        
        this.decorationLower = this.createDescriptionObject(jsonObject.DecorationLower);
        this.decorationUpper = this.createDescriptionObject(jsonObject.DecorationUpper);
    }

    createDescriptionList(listText){
        if(!listText){return []};
        const result =[]
        for( const objText of JSON.parse(listText)){
            result.push( this.createDescriptionObject (objText));
        }
        return result;
    }

    createDescriptionObject(jsonText){

        if(!jsonText){
            return null;
        }

        const obj = JSON.parse(jsonText);
        return {
            x:Number(obj.x),
            y:Number(obj.y),
            bitmap:'img/'+obj.bitmap+'.png',
        };
    }
}


 const setting =(function createSetting(){
    const parameters = PluginManager.parameters("Mano_SpriteNumber");

    function createRowMap(params){
        /**
         * @type {Map<String,Number>}
         */
        const map = new Map();
        if(!params.bitmapRows){return map;}
        const list = JSON.parse(params.bitmapRows);
        for(const elem of list){
            const obj = JSON.parse(elem);
            map.set(obj.bitmap,Number(obj.maxRow));
        }
        return map;
    }
    /**
     * 
     * @param {Map<String,Number>} map 
     * @param {Setting_SpriteNumber[]} list 
     */
    function SpriteSettingXX(map,list){

    }


    function createSpriteSettingList(paramText){
        if(!paramText){return[];}
        const result =[];
        const list =JSON.parse(paramText)
        for (const objText of list) {
            const obj = JSON.parse(objText);
            const item = new Setting_SpriteNumber(obj);
            result.push(item);
        }
        return result;
    }


    const result ={
        mapNumbers:createSpriteSettingList(parameters.mapNumbers),
    };
    const map =createRowMap(parameters);
    if(map.size >0){
        SpriteSettingXX(map,result.mapNumbers);
    }

    return result;
})()
const Scene_Boot_start=Scene_Boot.prototype.start;
Scene_Boot.prototype.start =function(){
    Scene_Boot_start.call(this);

//    setting = createSetting();
};


class Sprite_NumberBase extends Sprite{
    constructor(){
        super();
    }

    initialize(){
        super.initialize();
        this._damageBitmap= ImageManager.loadSystem("Damage");
        this._lastValue = NaN;
        this._maxValue=0;
        this.makeNumberSprites(0);
    }
    padZero(){
        return false;
    }

    spacing(){
        return 0;
    }
    resetDuration(){

    }


    digitWidth(){
        return this._damageBitmap ? this._damageBitmap.width / 10 : 0;        
    }
    digitHeight(){
        return this._damageBitmap ? this._damageBitmap.height / this.rows() : 0;
    }
    rows(){
        return 5;
    }

    /**
     * @param {Number} digit
     */
    makeNumberSprites(digit){
        const result =[];
        const width =this.digitWidth();
        const height =this.digitHeight();

        for(var i=0; i <digit;++i){
            const sprite = new Sprite(this._damageBitmap);
            sprite.visible =false;            
            result.push(sprite);
            this.addChild(sprite);
        }
        this._numberSprites =result;
        this.alignNumbers();
        this._maxValue = ( Math.pow(10,this.digit()))-1;
    }
    alignNumbers(){
        const spacing = this.spacing();
        const len = this._numberSprites.length;
        const width =this.digitWidth();
        const height =this.digitHeight();
        let x =0;
        for(var i=0 ;i<len;++i){
            const sprite = this._numberSprites[i];
            sprite.x = x;
            x += spacing + width;
        }
    }
    baseRow(){
        return 0;
    }



    /**
     * @param {Number[]} value 
     */
    numberList(value){
        const noZeroFill = !this.padZero();
        const result =[];
        for(var i=this.digit()-1; i >=0; i-=1){
            result[i]=value %10;
            value = Math.floor(value /10);
            if(value<=0  && noZeroFill){
                break;
            }
        }
        return result;
    }

    /**
     * @param {Sprite} sprite 
     * @param {Number} number 
     * @param {Number} width 
     * @param {Number} height 
     */
    drawDight(sprite,number,width,height){
        sprite.setFrame(width *number, 0 ,width,height );
    }
    digit(){
        return this._numberSprites.length;
    }
    maxValue(){
        return this._maxValue;
    }
    /**
     * 
     * @param {Number} value 
     */
    numberNormalize(value){
        const abs = Math.abs(value);
        return Math.round(  Math.min(this.maxValue(),abs));
    }

    /**
     * @param {Number} value 
     */
    setup(value){
        const string = this.numberList(this.numberNormalize(value));
        const width = this.digitWidth();
        const height = this.digitHeight();
        const row =0;
        const len = this._numberSprites.length;
        const padZero = this.padZero();

        for(var i=0; i< len;++i){
            const sprite = this._numberSprites[i];
            const n=string[i];
            if( isNaN( n)  ){
                sprite.visible =false;
                continue;
            }
            sprite.visible =true;
            this.drawDight(sprite,n, width,height);
        }
        this._lastValue =value;
    }

    currentNumber(){
        return 0;
    }

    updateVisible(){}

    updateValue(){
        const v = this.currentNumber();
        if(v!==this._lastValue ){
            this.setup(v);
        }
    }

    update(){
        this.updateVisible();
        if(this.visible){
            this.updateValue();
            this.updateDuration();
        }
    }

    updateDuration(){
    }
};

class Sprite_NumberVariable extends Sprite_NumberBase{

    /**
     * @param {Setting_SpriteNumber} [data=null] 
     */
    constructor(data){
        super();
        if(data){
            this.setData(data);
        }else{
            this.setVariableId(0);
            this.setSwitchId(0);
            this.setPadZero(false);
            this.setSpacing(0);
            this.setRows(5);
        }
    }

    /**
     * @param {String} name 
     * @param {Number} x 
     * @param {Number} y 
     */
    createDecorationSprite(name,x,y){
        const bitmap = ImageManager.loadNormalBitmap(name,0);
        const sprite = new Sprite(bitmap);
        sprite.x = x;
        sprite.y = y;
        this.addChild(sprite);
        return sprite;
    }
    /**
     * @param {Setting_SpriteNumber} data 
     */
    setData(data){
        this.removeChildren();
        this.x = data.x;
        this.y = data.y;
        this.setVariableId(data.variableId);
        this.setSwitchId(data.switchId);
        this.setPadZero(data.padZero);
        this.setSpacing(data.spacing);
        this.setRows(data.bitmapRow);
//        this.setR

        if(data.decorationLower){
            const decLower =data.decorationLower;
            this._decorationLower= this.createDecorationSprite(decLower.bitmap,decLower.x,decLower.y);
        }
        this._damageBitmap= ImageManager.loadSystem(data.bitmap);
        this.makeNumberSprites(data.digit);
        if(data.decorationUpper){
            const decUpper =data.decorationUpper;
            this._decorationUpper= this.createDecorationSprite(decUpper.bitmap,decUpper.x,decUpper.y);
        }
    }

    /**
     * @param {Number} id 
     */
    setSwitchId(id){
        this._switchId=id;
    }

    /**
     * @param {Number} id 
     */
    setVariableId(id){
        this._variableId =id;
    }
    /**
     * @param {boolean} value 
     */
    setPadZero(value){
        this._padZero =!!value
    }
    padZero(){
        return this._padZero;
    }
    /**
     * @param {Number} row 
     */
    setRows(row){
        this._row =row;
    }
    rows(){
        return this._row;
    }

    /**
     * @param {Number} value 
     */
    setSpacing(value){
        this._spacing =value;
    }
    spacing(){
        return this._spacing;
    }

    currentNumber(){
        return $gameVariables.value(this._variableId);
    }

    updateVisible(){
        const switchId =this._switchId;        
        this.visible=  switchId ===0 || $gameSwitches.value(switchId);
    }    
}

const Scene_Map_createSpriteset =Scene_Map.prototype.createSpriteset;
Scene_Map.prototype.createSpriteset=function(){
    Scene_Map_createSpriteset.call(this);

    const rootSprite = new Sprite();

    for (const obj  of setting.mapNumbers) {
        const sprite =new Sprite_NumberVariable(obj);
        rootSprite.addChild(sprite);
    }

    this._numberSprites = rootSprite;
    this.addChild(rootSprite);
};

const exportClass={
    Base:Sprite_NumberBase,
    Variable:Sprite_NumberVariable,
};

return exportClass;

})();
