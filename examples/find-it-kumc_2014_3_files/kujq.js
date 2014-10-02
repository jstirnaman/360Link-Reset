var $kuj = jQuery.noConflict();

/**
 * see: https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/forEach#Compatibility
 */
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function(fn, scope) {
        for (var i = 0, len = this.length; i < len; ++i) {
            fn.call(scope || this, this[i], i, this);
        }
    }
}

/**
 * IE < 9 does not support indexOf() on Arrays
 * see: http://stackoverflow.com/questions/3629183/why-doesnt-indexof-work-on-an-array-ie8
 */
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(elt /*, from*/) {
        var len = this.length >>> 0;
        var from = Number(arguments[1]) || 0;
        from = (from < 0) ? Math.ceil(from) : Math.floor(from);
        if (from < 0)
            from += len;

        for (; from < len; from++) {
            if (from in this && this[from] === elt)
                return from;
        }

        return -1;
    };
}

$kuj(document).ready(function() {
    $kuj('body').addClass('js');

    $kuj('#edit-search-block-form--2').focus(function() {
        $kuj(this).animate({ width: '205px', opacity: '1'}, 150);
    }).blur(function() {
        var searchbox = $kuj(this);
        var searchval = searchbox.val();
        if (searchval == '') {
            searchbox.animate({ width: '122px', opacity: '0.65'}, 150);
        }
    });
    
    // It's not pretty, but we need to add a few classes via javascript to get
    // some of the CSS to play nicely
    $kuj('#main-menu > li.active-trail').prev().addClass('nobg');
    checkSecondLevelNav();
    $kuj(window).resize(function() {
        checkSecondLevelNav();
    });

    function checkSecondLevelNav() {
        var submenuheight = $kuj('#main-menu > li.active-trail ul').height();
        if (submenuheight != null && submenuheight > 31) {
            $kuj('#zone-menu-wrapper').addClass('twoline');
        } else {
            $kuj('#zone-menu-wrapper').removeClass('twoline');
        }
    }

    /**
     * jQuery accordion
     */
    //Hide all project details
    $kuj(".accordion_content").hide();
    $kuj(".accordion").toggle(
            function() {
                //Toggle style on trigger clicked
                $kuj(this).addClass("active_accordion");
            }
    , function() {
        //Toggle style off trigger clicked
        $kuj(this).removeClass("active_accordion");
    }
    ).click(
            function() {
                //Toggle content when trigger clicked
                $kuj(this).next(".accordion_content").slideToggle("slow,");
            }
    );

    /**
     * KU Navigator Rules -- should be able to delete!
     */
    if (matchMedia('all and (min-width: 720px)').matches) {
		var nav = $kuj('#zone-ku-navigator');
        var mouse_over_navigator = false;

        $kuj('#ku_navigator_link').hover(function() {
            mouse_over_navigator = true;
        }, function() {
            mouse_over_navigator = false;
        }).click(function(e) {
            e.preventDefault();
            nav.slideToggle('slow').toggleClass('open');
        });

        nav.hover(function() {
            mouse_over_navigator = true;
        }, function() {
            mouse_over_navigator = false;
        });

        $kuj('body').mouseup(function() {
            if (!mouse_over_navigator && nav.hasClass('open')) {
                nav.slideUp('slow').removeClass('open');
            }
        });
    }
	
	/**
	KU Directory (Navigator re-do )
	 */
	$kuj(document).ready(function(){var dirwidth=$kuj("#topnav").width();if(dirwidth>=700){var dir=$kuj("#ku-directory"),actual_dir=$kuj("#ku-directory .content-navigator"),mouse_over_directory=!1;$kuj("#ku-directory-button").hover(function(){mouse_over_directory=!0},function(){mouse_over_directory=!1}).click(function(e){e.preventDefault(),dir.slideToggle("slow").toggleClass("open")}),actual_dir.hover(function(){mouse_over_directory=!0},function(){mouse_over_directory=!1}),$kuj("body").mouseup(function(){!mouse_over_directory&&dir.hasClass("open")&&dir.slideUp("slow").removeClass("open")})}})

	

    /**
     * Main menu
     */
    $kuj('#mobile_menu_toplink > a').click(function(e) {
        e.preventDefault();
        $kuj('#mobile_search_toplink').removeClass('active');
        $kuj(this).parent().toggleClass('active');
    });
    $kuj('#mobile_search_toplink > a').click(function(e) {
        e.preventDefault();
        $kuj('#mobile_menu_toplink').removeClass('active');
        $kuj(this).parent().toggleClass('active');
    });

    /**
     * Mobile menu tweaks
     */
    $kuj('#mobile-menu li li').hover(
            function() {
                $kuj(this).parents('li').addClass('nobg');
            },
            function() {
                $kuj(this).parents('li').removeClass('nobg');
            }
    );

    /**
     * Tab Box Widget
     */
    $kuj('.tabbox .nav').delegate('li', 'click', function(e) {
        e.preventDefault();
        var li = $kuj(this);
        showtab(li);
    });
    if (window.location.hash) {
        if ($kuj('#tab_'+window.location.hash.replace('#', ''))) {
            showtab($kuj('#tab_'+window.location.hash.replace('#','')));
        }
    }
    function showtab(li) {
        var list = li.parent();
        var idx = li.index();
        var tabs = list.parent().children('.content').children('.tab');

        tabs.hide().removeClass('active');
        tabs.eq(idx).show().addClass('active');
        list.children().removeClass('active');
        list.children().eq(idx).addClass('active');
    }


    /**
     * Add "first", "last", and "nth" classes since < IE9 doesn't understand "nth-child" or "last-child" or the like
     */
    $kuj('#region-ku-sidebar .region-inner .block:nth-child(3n)').addClass('third');
    $kuj('#region-ku-sidebar .region-inner .block:nth-child(4n)').addClass('fourth');
    $kuj('#region-ku-sidebar .region-inner .block:last-child').addClass('last');

    /**
     * More < IE9 stuff; this adds classes to items in the navigation menu to hide background images on select tabs
     */
    $kuj('#main-menu li:first-child').addClass('first');
    $kuj('#main-menu li:last-child').addClass('last');

    /**
     * For printing, maintain a list of links for footnotes
     */
    var footnote_links = [];
    $kuj('#block-system-main article a, #block-system-main div.homepage-bottomleft a, #block-system-main div.homepage-bottomright a').each(function() {
        var link = this.href;
        link = link.replace('mailto:', '');
        if (footnote_links.indexOf(link) == -1) {
            footnote_links.push(link);
        }
        var link_index = footnote_links.indexOf(link) + 1;
        $kuj(this).after('<sup class="footnote_tag">' + link_index + '</sup>');
    });
    if (footnote_links.length > 0) {
        var footnote_html = '<div id="footnote_wrapper"><h4>Links on this page:</h4><ol>';
        footnote_links.forEach(function(element, index, array) {
            footnote_html += '<li>' + element + '</li>';
        });
        footnote_html += '</ol></div>';
        $kuj('body').addClass('footnotes');
        $kuj('#section-footer').before(footnote_html);
    }
});

/**
 * Generic rotator
 */
$kuj(window).load(function() {
    $kuj('.rotator').each(function(index) {
        var navid = 'rotatornav_' + index;
        var rotator = $kuj(this);
        rotator.after('<span class="rotator_nav left"><a id="' + navid + '_prev" class="prev" href="#">&laquo;</a><a id="' + navid + '_next" class="next" href="#">&raquo;</a></span>');
        rotator.cycle({
            timeout: 6000,
            pause: 1,
            pager: '#' + navid,
            next: '#' + navid + '_next',
            prev: '#' + navid + '_prev'
        });
    });

    $kuj('.randomizer').each(function(index) {
        var navid = 'randomizernav_' + index;
        var randomizer = $kuj(this);


        randomizer.after('<span class="rotator_nav left"><a id="' + navid + '_prev" class="prev" href="#">&laquo;</a><a id="' + navid + '_next" class="next" href="#">&raquo;</a></span>');
        randomizer.cycle({
            random: 1,
            slideResize: 0,
            pager: '#' + navid,
            next: '#' + navid + '_next',
            prev: '#' + navid + '_prev'
        });
        $kuj('.randomizer').cycle('pause');
        $kuj('.randomizer').css('position', 'relative');
        /*
         $kuj('.randomizer').children().each(function() {
         $kuj(this).css({
         left: ($div.innerWidth(true) - $this.width()) / 2,
         top: ($div.innerHeight(true) - $this.height()) / 2,
         position: 'absolute'
         });
         });
         */
    });

    $kuj('.orderedrandomizer').each(function(index) {
        var navid = 'orderedrandomizernav_' + index;
        var randomizer = $kuj(this);
        var myrand = Math.floor(Math.random() * $kuj(this).children().size())

        randomizer.after('<span class="rotator_nav left"><a id="' + navid + '_prev" class="prev" href="#">&laquo;</a><a id="' + navid + '_next" class="next" href="#">&raquo;</a></span>');
        randomizer.cycle({
            startingSlide: myrand,
            pager: '#' + navid,
            next: '#' + navid + '_next',
            prev: '#' + navid + '_prev',
            fit: 0,
            slideResize: 0
        });
        $kuj('.orderedrandomizer').cycle('pause');

    });

});



(function ($) {
// VERTICALLY ALIGN FUNCTION
$.fn.vAlign = function(boostup) {
	return this.each(function(i){
	var ah = $(this).height();
	var ph = $(this).parent().height();

	var mh = Math.ceil((ph-ah) / 2) - boostup;
    //alert('parent: ' + ph + ' p: ' + ah + ' calc:' + mh);
    
        $(this).css('padding-top', mh);
	});
};
})(jQuery);
// image swap on hover //
$kuj(document).ready(function() { 
	$kuj(".img-swap").hover(
          function(){this.src = this.src.replace("_off","_on");},
          function(){this.src = this.src.replace("_on","_off");
     });
	 var imgSwap = [];
	 $kuj(".img-swap").each(function(){
		imgUrl = this.src.replace("_off","_on");
		imgSwap.push(imgUrl);
	});
	$kuj(imgSwap).preload();
});
$kuj.fn.preload = function() {
    this.each(function(){
        $kuj('<img/>')[0].src = this;
    });
}

$kuj(document).ready(function() {

	/* prepend menu icon */
	$kuj('.left-nav-col').prepend('<div id="menu-icon">Menu</div>');
	
	/* toggle nav */
	$kuj("#menu-icon").on("click", function(){
	$kuj("#menu").slideToggle(function() { 
 	$kuj('#menu').css('overflow','visible'); 
});
		$kuj(this).toggleClass("active");
	});

});	