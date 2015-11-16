///<reference path="../../typings/lite/app_references.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 BlockJson is a Player block that is used as base class for all JSON based components
 it allows for parsing of JSON data and is supported with the JSON Item inside scenes

 The setup sequence is:
 ======================
 1. Constructor of the child, which calls super on base
 2. Constructor of the base, which calls init on base
 3. Initialize of the base
 4. Initialize of the child
 5. Instance is ready

 @class BlockJson
 @constructor
 @return {Object} instantiated BlockJson
 * @example
 * path: http://www.digitalsignage.com/videoTutorials/_data/videos.json
 * json player: children[0].children
 * json item: text
 **/
define(['jquery', 'BlockJsonBase'], function ($, BlockJsonBase) {
    TSLiteModules.BlockJsonBase = BlockJsonBase;
    var BlockJson = (function (_super) {
        __extends(BlockJson, _super);
        function BlockJson(options) {
            BB.lib.log('c child');
            this.m_options = options;
            this.m_blockType = 4300;
            _.extend(this.m_options, { blockType: this.m_blockType });
            _super.call(this);
        }
        BlockJson.prototype.initialize = function () {
            var self = this;
            _super.prototype.initialize.call(this, this.m_options);
            BB.lib.log('i child');
            setTimeout(function () {
                var xSnippet = self._getBlockPlayerData();
                var xSnippetPlayer = $(xSnippet).find('Player');
            }, 400);
        };
        return BlockJson;
    })(TSLiteModules.BlockJsonBase);
    return BlockJson;
});