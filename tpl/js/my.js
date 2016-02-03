$(document).on('af_complete', function(event, res) {
    if (res.success) $('.modal_close').click();
});

function call_modal(init) {
    init = typeof init !== 'undefined' ? init : 0;
    if (init = 1) {
        var overlay = $('#overlay');
        var open_modal = $('.open_modal');
        var close = $('.modal_close, #overlay');
        var modal = $('.modal_div');

        open_modal.click(function(event) {
            event.preventDefault();
            modal.hide();
            var text = $(this).attr('data-text'),
                div = $(this).attr('href');
            overlay.fadeIn(400,
                function() {
                    $(div)
                        .css('display', 'block')
                        .animate({
                            opacity: 1,
                            top: '20px'
                        }, 200);
                });
            $('body').css('overflow-y', 'hidden');
            $(div + ' .pagetitle').val(text);

            var wth = $(window).height();
                $(div).css('height', wth-40+"px");
                $(div).css('margin-top', "0");
        });


        close.click(function() {
            modal
                .animate({
                    opacity: 0,
                    top: '45%'
                }, 200,
                function() {
                    $(this).css('display', 'none');
                    overlay.fadeOut(400);
                    $('body').removeAttr("style");
                });
        });
    } else return false;
};


// Cache selectors
var lastId,
    topMenu = $(".top-menu"),
    topMenuHeight = topMenu.outerHeight()+50,
// All list items
    menuItems = topMenu.find("a"),
// Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
        var item = $($(this).attr("href"));
        if (item.length) { return item; }
    }),
    noScrollAction = false;

// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems.click(function(e){
    var correct = 0;
    if (topMenu.hasClass('menu-fix'))
        correct = 50;
    var href = $(this).attr("href"),
        offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+correct+1;
    noScrollAction = true;
    $('html, body').stop().animate({
        scrollTop: offsetTop
    },{
        duration: 700,
        complete: function() {
            menuItems
                .parent().removeClass("active")
                .end().filter("[href=" + href +"]").parent().addClass("active");
            setTimeout(function(){ noScrollAction = false; }, 10);
console.log(offsetTop);
            if (offsetTop>90) {
                topMenu.css('position','fixed').addClass('menu-fix');
            } else {
                topMenu.css('position','relative').removeClass('menu-fix');
            }
        }
    });
    e.preventDefault();
});

$('.perehod').click(function(e){
    var href = $(this).attr("href"),
        offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
    noScrollAction = true;
    $('html, body').stop().animate({
        scrollTop: offsetTop-80
    },{
        duration: 700,
        complete: function() {
            menuItems
                .parent().removeClass("active")
                .end().filter("[href=" + href +"]").parent().addClass("active");
            setTimeout(function(){ noScrollAction = false; }, 10);
            if (offsetTop>90) {
                topMenu.css('position','fixed').addClass('menu-fix');
            } else {
                topMenu.css('position','relative').removeClass('menu-fix');
            }
        }
    });
    e.preventDefault();
});

// Bind to scroll
$(window).scroll(function(){
    if(!noScrollAction){
        // Get container scroll position
        var fromTop = $(this).scrollTop()+topMenuHeight;
        if (href=="#variant") fromTop=fromTop-40;

        console.log(topMenuHeight+' '+fromTop);
        if (fromTop>120) {
            topMenu.css('position','fixed').addClass('menu-fix');
        } else {
            topMenu.css('position','relative').removeClass('menu-fix');
        }

        // Get id of current scroll item
        var cur = scrollItems.map(function(){
            if ($(this).offset().top < fromTop)
                return this;
        });
        // Get the id of the current element
        cur = cur[cur.length-1];
        var id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            menuItems
                .parent().removeClass("active")
                .end().filter("[href=#"+id+"]").parent().addClass("active");
        }
    }
});

$(document).ready(function() {

    call_modal(1);
    var windowWidth = $(window).width();
    if (windowWidth<=1040) $('.nomobile').hide();

});