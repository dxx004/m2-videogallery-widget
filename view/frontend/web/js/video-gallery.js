define([
    'jquery',
    'owlTube',
    'owlCarousel',
    'owlCarouselThumbs'
], function ($) {
    'use strict';

    function youtube_parser(url){
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);
        return (match && match[7].length === 11)? match[7] : false;
    }

    window.videoGallery = {
        incId: 0
    };

    $.widget('rvs.videoGallery', {
        options: {
            width: 720,
            height: 405,
            thumbContainerClass: 'owl-thumbs',
            thumbItemClass: 'owl-thumb-item',
            thumbsEnabled: true,
            thumbsPrerendered: true
        },

        /**
         * This method constructs a new widget.
         * @private
         */
        _create: function () {
            if (this.element) {
                const $wrap = $(this.element);

                $wrap.css({display: 'none'});

                const incId = this._getIncrementId();
                const $mainWrapper = $('<div/>')
                    .addClass('videogallery-wrapper');
                const $newDiv = $('<div/>')
                    .addClass('owl-carousel owl-theme')
                    .attr('data-slider-id', incId)
                    .css({width: this.options.width + 'px', height: this.options.height + 'px'});
                const $thumbDiv = $('<div/>')
                    .addClass('owl-thumbs')
                    .attr('data-slider-id', incId);
                const _self = this;
                $wrap.children().each( function(i, child) {
                    const videoId = youtube_parser($(child).text());
                    const $itemDiv = $('<div/>')
                        .addClass('item');
                    const $iframe = $('<iframe allowfullscreen/>')
                        .attr('type', 'text/html')
                        .attr('frameborder', 0)
                        .attr('width', _self.options.width)
                        .attr('height', _self.options.height)
                        .attr('src', 'https://www.youtube.com/embed/' + videoId + '?enablejsapi=1');
                    $itemDiv.append($iframe);
                    $newDiv.append($itemDiv);

                    const $videoThumbnail = $('<img src="//img.youtube.com/vi/'+videoId+'/0.jpg">');
                    const $thumbItem = $('<a/>')
                        .attr('href', '#')
                        .addClass('owl-thumb-item');
                    $thumbItem.append($videoThumbnail);

                    $thumbDiv.append($thumbItem);
                });

                $mainWrapper.insertAfter($wrap);
                $mainWrapper.append($newDiv);
                $thumbDiv.insertAfter($newDiv);

                const carousel = $newDiv.owlCarousel({
                    items: 1,
                    loop: 1,
                    dots: 0,
                    thumbs: this.options.thumbsEnabled,
                    thumbsPrerendered: this.options.thumbsPrerendered,
                    thumbContainerClass: this.options.thumbContainerClass,
                    thumbItemClass: this.options.thumbItemClass
                });

                $(carousel).owlTube({
                    width: this.options.width,
                    height: this.options.height,
                    autoplay: 0,
                    loop: 1,
                    controls: 0,
                    iv_load_policy: 3,
                    modestbranding: 1,
                    rel: 0,
                    showinfo: 0
                });
            }
        },

        _getIncrementId: function() {
            return ++window.videoGallery.incId;
        }
    });

    return $.rvs.videoGallery;
});
