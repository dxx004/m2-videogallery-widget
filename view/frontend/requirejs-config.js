var config = {
    paths: {
        owlTube: 'RVSolutions_VideoGalleryWidget/js/lib/owl-tube.min',
        owlCarousel: 'RVSolutions_VideoGalleryWidget/js/lib/owl.carousel.min',
        owlCarouselThumbs: 'RVSolutions_VideoGalleryWidget/js/lib/owl.carousel2.thumbs.min'
    },
    shim: {
        'owlCarouselThumbs': ['owlCarousel'],
        'owlTube': ['owlCarousel']
    }
};