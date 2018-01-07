//=============================================================================
// Mano_Filter.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017-2017 Sigureya
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 0.9.0 2017/04/13 初版 
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/Sigureya/
//=============================================================================
/*:
 * @plugindesc フィルターを制御するプラグインです。
 * スプライトが存在するオブジェクト全てにフィルターが使えます。
 * 
 * @author しぐれん
 * 
 * @help
 * 
 * ■上級者向け設定　優しくないので注意！
 * FillterTableに生成関数が登録されているので、
 * ここに新規のデータを追加すればカスタムフィルターを使えます。
 * 
 * 
*/


(function(global) {
    "use strict"

PIXI.filters.BulgePinchFilter.prototype.update =function(){

}



PIXI.filters.GodrayFilter.prototype.update =function(){
    this.time +=0.1;
}


const FillterTable ={
    bulgepinch:function(){return new  PIXI.filters.BulgePinchFilter},
    radialblur:function(){return new  PIXI.filters.RadialBlurFilter},
    godray:function(){
        const filter = new PIXI.filters.GodrayFilter();        
        return filter;
    },
    dropshadow:function(){return new PIXI.filters.DropShadowFilter();},
    convolution:function(){return new PIXI.filters.ConvolutionFilter();},
    colorreplace:function(){return new  PIXI.filters.ColorReplaceFilter();},
    glow:function(){return new PIXI.filters.GlowFilter()},
    ascii:function(){return new PIXI.filters.AsciiFilter();},
    crosshatch:function(){ return new PIXI.filters.CrossHatchFilter()},
    dot:function(){return new PIXI.filters.DotFilter();},
    emboss:function(){return new PIXI.filters.EmbossFilter();},
    shockwave:function(){ return new PIXI.filters.ShockwaveFilter(); },
    twist:function(){return new PIXI.filters.TwistFilter();},
    zoomblur:function(){return new PIXI.filters.ZoomBlurFilter();},
    noise:function(){return new PIXI.filters.NoiseFilter();},
    oldfilm:function(){return new PIXI.filters.OldFilmFilter();},
    rgbsplit:function(){return new PIXI.filters.RGBSplitFilter();},
    motionblur:function(){return new PIXI.filters.RGBSplitFilter();},
    bloom:function(){return new PIXI.filters.AdvancedBloomFilter();}
};



//シーン別にフィルタークラスを作る
/**
 * 
 * @param {[]} array 
 * @param {*} object 
 */
function arrayErase(array,object){
    const index= array.indexOf(this.pixiFilter);
    if(index >=0){
        array.splice(index,1);
    }
}


class Filter_Base{
    static dummyUpdate(){}
    /**
     * @param {Sprite_Base[]} spriteArray
     */
    constructor(spriteArray){
        this.targetSprites =spriteArray ||[];
        this.paramater={};
        this.pixiFilter=null;
        this.typename ="";
        this.updateFunction =Filter_Base.dummyUpdate();
    }
    targetObjects(){


    }


    setPixiFilter(filter){
        this.pixiFilter = filter;
    }
    /**
     * @param {Sprite_Base} sprite 
     */
    releaseSprite(sprite){
        const filters = sprite.filters;
        if(filters && filters.length >0){
            arrayErase(filters,this.pixiFilter);
        }
    }
    destory(){
        for (let i = 0; i < this.targetSprites.length; i++) {
            this.releaseSprite(this.targetSprites[i]);
        }
        this.targetSprites =[];
    }
    /**
     * 
     * @param {Sprite_Character} sprite 
     */
    addSprite(sprite){
        this.targetSprites.push(sprite);
        sprite.filters=[this.pixiFilter];
    }
};




class Filter extends Filter_Base {
    constructor(){
        super([]);
        this.targetObjectCatch =[];
    }
};


class FilterManager_Class {
    /**
     * 
     * @param {Map<String,Filter>} map 
     */
    constructor(map){
        this.map =map;
    }


    /**
     * @return {Filter_Base}
     * @param {string} key 
     */
    get(key){

        return this.createFilter(key);
        const filter = this.map.get(key);
        return filter;
    }
    /**
     * 
     * @param {String} key 
     * @param {Filter} filter 
     */
    set(key,filter){
        const lastFilter = this.get(key);
        if(lastFilter){
            lastFilter.destory();
        }
        this.map.set(key,filter);
    }
    /**
     * 
     * @param {I_FilterAppliableObject} objects 
     * @param {String} key 
     */
    applyFilter(objects,key){
        const filter = this.get(key);
        if(!filter){return;}
    }

    /**
     * @return {PIXI.Filter}
     */
    createFilter(key){
        const func = FillterTable[key];
        if(func){
            const filter = func();
            filter.key_MA = key;
            return filter;
        }
        return null;
    }

};

const FilterManager=new FilterManager_Class();


const CONST={
CLEAR_ALL:"_CLEAR",
};

class I_FilterAppliableObject{
    constructor(){
        this._filterKey =null;
    }
    clearFilter(){
        this._filterKey =CONST.CLEAR_ALL;
    }
    requestFilter(key){
        this._filterKey = key;        
    }
    filterKey(){
        return this._filterKey;
    }
};

const clearFilterKey = function(){
    this._filterKey =[];
//    this.requestFilter(null);
};
const filterKey = function(){
    return this._filterKey;
}

const setFilterKeys =function(list){
    this._filterKey = list;

};
const requestFilter = function(key){
    this._filterKey = this._filterKey || [];
    this._filterKey.push( key);
}

function addFillterMethod(class_){
    class_.prototype.clearFilterKey = clearFilterKey;
    class_.prototype.requestFilter =requestFilter;
    class_.prototype.filterKeys = filterKey;
    class_.prototype.setFilterKeys = setFilterKeys;
}
addFillterMethod(Game_Battler);
addFillterMethod(Game_Character);
addFillterMethod(Game_Map);
addFillterMethod(Game_Picture);



const Scene_Map_update =Scene_Map.prototype.update;
Scene_Map.prototype.update =function(){
    Scene_Map_update.call(this);
    this._spriteset.updateFilter();
};
const Scene_Map_terminate =Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate =function(){
    this._spriteset.saveFilter();
    Scene_Map_terminate.call(this);
};
const Scene_Battle_update =Scene_Battle.prototype.update;
Scene_Battle.prototype.update =function(){
    Scene_Battle_update.call(this);
    this._spriteset.updateFilter();
};



//-----///
//sprite//
//-----///
Sprite.prototype.applyFilter =function(filter){
    if(filter){
        const filtesList = this.filters || [];
        filtesList.push(filter);
        this.filters = filtesList;    
    }
}
Sprite.prototype.setupFilter =function(){
    const targetObject = this.targetObject_MA();
    if(!targetObject){return;}
    
    const keys = targetObject.filterKeys();
    if(!keys){return;}

    for (let i = 0; i < keys.length; i++) {
        let filter= FilterManager.get( keys[i]);
        this.applyFilter(filter);        
    }
    targetObject.clearFilterKey();
};

Sprite.prototype.updateFilter =function(){
    if(this.filters){
        for (let i = 0; i < this.filters.length; i++) {
            let filter = this.filters[i];
            if(filter.update){
                filter.update();
            }            
        }
    }
};
Sprite.prototype.filterKeyList =function(){
    if(!this.filters){return [];}
    const result =[];
    for (let i = 0; i < this.filters.length; i++) {
        let element = this.filters[i];
        let key= element.key_MA;
        if(key){
            result.push(key);
        }
    }
    return result;
};
Sprite.prototype.saveFilterKey =function(){
    const targetObject = this.targetObject_MA();
    const keys =this.filterKeyList();
    if(keys.length >0){
        targetObject.setFilterKeys(keys);
    }
};

Sprite_Character.prototype.targetObject_MA =function(){0
   return this._character;
};

Sprite_Picture.prototype.targetObject_MA =function(){
    return this.picture();
};
Sprite_Actor.prototype.targetObject_MA =function(){
    return this._actor;
};

Sprite_Enemy.prototype.targetObject_MA =function(){
    return this._enemy;
};

/**
 * 
 * @param {Sprite_Base[]} sprites 
 */
function _updateFilterForArray(sprites){
    for (let i = 0; i < sprites.length; i++) {
        let element = sprites[i];
        element.setupFilter();
        if(element.updateFilter){
            element.updateFilter();
        }
    }
}
Spriteset_Base.prototype.updatePictureFilter =function(){
    _updateFilterForArray(this._pictureContainer.children);
}
Spriteset_Base.prototype.updateFilter =function(){
    this.updatePictureFilter();
};
/**
 * 
 * @param {Sprite[]} sprites 
 */
function _saveFilterKeyEach(sprites){
    for (let i = 0; i < sprites.length; i++) {
        let element=sprites[i];
        element.saveFilterKey();
    }
}

Spriteset_Base.prototype.saveFilter =function(){
    _saveFilterKeyEach( this._pictureContainer.children);
};
Spriteset_Map.prototype.saveFilter =function(){
    _saveFilterKeyEach( this._pictureContainer.children);
    _saveFilterKeyEach( this._characterSprites);

};
Spriteset_Map.prototype.updateFilter =function(){
    Spriteset_Base.prototype.updateFilter.call(this);
    _updateFilterForArray(this._characterSprites);
}
Spriteset_Battle.prototype.updateFilter =function(){
    Spriteset_Base.prototype.updateFilter.call(this);
    _updateFilterForArray(this._enemySprites);
    _updateFilterForArray(this._actorSprites);
};
Spriteset_Battle.prototype.saveFilter =function(){};

global.FilterManager = FilterManager;
})(this);
