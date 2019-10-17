(function ( $ ) {
    'use strict';
    var player_api_url  = "//www.youtube.com/player_api/";
    var apiLoaded       = false;
    var players         = [];

    var ID = function () {
        return "YTC_" + Math.random().toString(36).substr(2, 9);
    };

    function parseUrl(url){
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);
        return (match&&match[7].length==11)? match[7] : false;
    }

    $(document).ready(function(){
        $.getScript(player_api_url).done(function(){
            apiLoaded = true;
        }).fail(function(jqxhr, settings, exception){
            alert(exception);
        });
    });
    
    function init(){
        apiLoaded = true;
        if(players.length === 0) return true;
        $(players).each(function(){
            this.init.call();
        });
    }

    window.onYouTubePlayerAPIReady = init;



    var owlTube = function(el,options){
        
        var initialized         = false;
        var activeElementIndex  = 0;
        var carouselIframes     = [];
        var $el = $(el);
        

        $el.on('changed.owl.carousel',function(event){
            var item      = event.item.index;     // Position of the current item
            carouselIframes[activeElementIndex].stopVideo();
            carouselIframes[item].playVideo();
            activeElementIndex = item;
        });
        
        $el.bind('changed',function(){
            console.info('YTPL changed');
        });

        function __createObject(index,iframe){
            var $this = $(iframe);
            var id = $this.attr('id') || false;
            if(!id){
                id = ID();
                $this.attr('id',id);
            }
            $this.data('index',index);
            
            var p = new YT.Player(id, {
                autoplay:false,
                events: {
                    'onReady': __onPlayerReady,
                    'onStateChange': __onPlayerStateChange
                }
            });

            carouselIframes.push(p);
        }

        function __initPlayer(){
            initialized = true;
            $el.find('iframe').each(__createObject);
        }
        
        // autoplay video
        function __onPlayerReady(event) {
            //event.target.playVideo();
        }

        function __onPlayerStateChange(event) {        
            if(event.data===0){
                $el.trigger("next.owl.carousel");
            }
      
        }


       

        return {
            
            stopAll:function(){    
                $(carouselIframes).each(function(index){
                    carouselIframes[index].stopVideo();
                });
            },
            init:function(){
                if(initialized) return this;
                __initPlayer();
            },
            loadVideoById:function(videoId,options){
                options = $.extend({},{
                    'videoId'           : videoId || bHQqvYy5KYo,
                    'suggestedQuality'  : 'large'
                },options);
                p.loadVideoById(options);
                return this;
            },
            loadPlaylist:function(pl,options){
                options = $.extend({},{
                    playlist            :pl.join(','),
                    listType            :'playlist',
                    'suggestedQuality'  : 'large',
                    events: {
                        'onReady'       : __onPlayerReady,
                        'onStateChange' : __onPlayerStateChange
                    }
                },options);
                
                p.loadPlaylist(options);
                return this;
            },
            loadVideoByUrl:function(url,options){
                options = $.extend({},{
                    'mediaContentUrl'   : url,
                    'suggestedQuality'  : 'large'
                },options);

                p.loadVideoByUrl(options)
            },
            enqueueVideoId:function(videoId){
                playlist.push(videoId);  
            },
            on:function(ev,callback,data){
                $el.bind(ev,callback,data);
                return this;
            },
            destroy:function(){},
        }
    }

    
    $.fn.owlTube = function(options) {
        
        return $(this).each(function(){
            var $this   = $(this);
            var data    = $this.data('owlTube');
            if(data) return data;
            options = $.extend({},$.fn.owlTube.options,options);
            var youtubeController = new owlTube(this,options);
            $this.data('owlTube',youtubeController);

            try {
                YT.Player;
            } catch (error) {
                players.push(youtubeController);
            }
            return youtubeController;
        });

    };

    $.fn.owlTube.options = {
        width:640,
        height:340,
        autoplay:1,
        loop:1, 
        controls: 1,
        iv_load_policy:3,
        modestbranding:1,
        rel:0,
        showinfo:0
    };

}( jQuery ));