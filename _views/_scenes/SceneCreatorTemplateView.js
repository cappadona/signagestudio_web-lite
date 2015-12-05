///<reference path="../../typings/lite/app_references.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//GULP_ABSTRACT_END
define(['jquery'], function ($) {
    var SceneCreatorTemplateView = (function (_super) {
        __extends(SceneCreatorTemplateView, _super);
        function SceneCreatorTemplateView(options) {
            this.m_options = options;
            _super.call(this);
        }
        SceneCreatorTemplateView.prototype.initialize = function () {
            var self = this;
            self.id = self.m_options.el;
            self.$el = $(this.id);
            self.el = this.$el.get(0);
            self.m_counter = 1;
            self.m_counter_max = 500;
            self.m_count_set = 100;
            //self.m_sceneSelector = BB.comBroker.getService(BB.SERVICES['SCENES_SELECTION_VIEW']);
            self.listenTo(self.m_options.stackView, BB.EVENTS.SELECTED_STACK_VIEW, function (e) {
                if (e === self && !self.m_rendered) {
                    self._render();
                    self.m_rendered = true;
                }
            });
            $(self.el).find('#prev').on('click', function () {
                self._goBack();
                return false;
            });
        };
        /**
         Open modal dialog for scene import and render all images via imageLoaded
         @method _listenImportSceneModal
         **/
        SceneCreatorTemplateView.prototype._loadSceneTemplates = function () {
            var self = this;
            $(Elements.SCENE_IMPORT_MODAL).modal('show');
            if (self.m_counter > self.m_counter_max)
                return;
            var $progress, $status;
            var supportsProgress;
            var loadedImageCount, imageCount;
            //SELECT_SCENE_TYPE_CREATE_TEMPLATE
            var $demo = $('#selectSceneTypeCreateTemplate');
            var $container = $demo.find('#image-container');
            $status = $demo.find('#status');
            $progress = $demo.find('progress');
            supportsProgress = $progress[0] &&
                // IE does not support progress
                $progress[0].toString().indexOf('Unknown') === -1;
            function populateScenes() {
                // add new images
                var items = getItems();
                //console.log(items);
                $container.prepend($(items));
                // use ImagesLoaded
                $container.imagesLoaded()
                    .progress(onProgress)
                    .always(function () {
                    onAlways();
                    setTimeout(function () {
                        if (self.m_counter > self.m_counter_max) {
                            $(Elements.IMPORT_SCENEL_DIALOG_CONTAINER).find('button').fadeIn();
                            return;
                        }
                        populateScenes();
                    }, 500);
                })
                    .fail(function (e) {
                    //console.log('some fail ' + e)
                })
                    .done(function () {
                    //console.log('completed...')
                });
                // reset progress counter
                imageCount = $container.find('img').length;
                resetProgress();
                updateProgress(0);
            }
            ;
            // reset container
            $('#reset').click(function () {
                $container.empty();
                self.m_counter = 0;
            });
            // return doc fragment with
            function getItems() {
                var items = '';
                for (var i = 0; i < self.m_count_set; i++) {
                    var z = self.m_counter++;
                    items += getImageItem(z);
                }
                return items;
            }
            // return an <li> with a <img> in it
            function getImageItem(index) {
                var item = '<li class="is-loading">';
                item += '<img style="width: 139px; height: 78px" src="_assets/scenes/Template' + index + '.jpg"/></li>';
                return item;
            }
            function resetProgress() {
                $status.css({ opacity: 1 });
                loadedImageCount = 0;
                if (supportsProgress) {
                    $progress.attr('max', imageCount);
                }
            }
            function updateProgress(value) {
                if (supportsProgress) {
                    $progress.attr('value', value);
                }
                else {
                    // if you don't support progress elem
                    $status.text(value + ' / ' + imageCount);
                }
            }
            // triggered after each item is loaded
            function onProgress(imgLoad, image) {
                // change class if the image is loaded or broken
                var $item = $(image.img).parent();
                $item.removeClass('is-loading');
                if (!image.isLoaded) {
                    $item.addClass('is-broken');
                }
                // update progress element
                loadedImageCount++;
                updateProgress(loadedImageCount);
            }
            // hide status when done
            function onAlways() {
                $status.css({ opacity: 0 });
            }
            populateScenes();
        };
        SceneCreatorTemplateView.prototype._goBack = function () {
            var self = this;
            self.m_options.stackView.slideToPage(self.m_options.from, 'left');
        };
        /**
         Render the view
         @method _render
         **/
        SceneCreatorTemplateView.prototype._render = function () {
            var self = this;
            if (self.m_rendered)
                return;
            self._loadSceneTemplates();
        };
        return SceneCreatorTemplateView;
    })(Backbone.View);
    return SceneCreatorTemplateView;
});
//# sourceMappingURL=SceneCreatorTemplateView.js.map