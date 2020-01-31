
class MagnificPopup {
    static code() {
        jQuery(document).ready(function($) {
            
            $('.lightbox').magnificPopup({
                type: 'image',
                closeOnContentClick: true,
                closeBtnInside: false,
                fixedContentPos: false,
                mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
                image: {
                    verticalFit: true,
                },
                zoom: {
                    enabled: true,
                    duration: 300, // don't foget to change the duration also in CSS
                },
            }), $('#content img').magnificPopup({
                type: 'image',
                closeOnContentClick: true,
                closeBtnInside: false,
                fixedContentPos: false,
                mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
                image: {
                    verticalFit: true,
                },
                zoom: {
                    enabled: true,
                    duration: 300, // don't foget to change the duration also in CSS
                },
                callbacks: {
                    elementParse: function(item) { 
                        var attr = $(item.el).parent().attr('href');
                        var url = null;
    
                        if (typeof attr !== typeof undefined && attr !== false) {
                            url = attr;
                        } else {
                            url = item.el.attr('src');
                        }    
    
                        if(typeof url !== typeof undefined && url !== false && /\.(?:jpg|jpeg|gif|png)$/i.test(url)) {
                            item.src = url;
                        } else {
                            var win = window.open(url, '_blank');
                            win.focus();
                            item.src = url;
                        }
    
                    },
                    open: function() {
                        var magnificPopup = $.magnificPopup.instance; // save instance in magnificPopup variable
                        var itemUrl = magnificPopup.items[0].src;
                        if(typeof itemUrl !== typeof undefined && itemUrl !== false && /\.(?:jpg|jpeg|gif|png)$/i.test(itemUrl)) {
                            // do nothing
                        } else {
                            magnificPopup.close();  
                        }
                    },
                },
                gallery: {
                    enabled: true,
                },
            });   

        });
    }
}

export default MagnificPopup;