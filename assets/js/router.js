/**
 * Single-page router — home, projects hub, project details, about.
 */
(function ($) {
  'use strict';

  var pages = {};
  var homeHTML = '';
  var isNavigating = false;
  var onDetailPage = false;

  var DETAIL_TITLES = {
    projects: 'Projects | Abrash Arshad PORTFOLIO',
    rag: 'RAG Chatbot | Abrash Arshad PORTFOLIO',
    transformer: 'Transformer Learning Hub | Abrash Arshad PORTFOLIO',
    about: 'About Me | Abrash Arshad PORTFOLIO'
  };

  var DETAIL_ROUTES = ['projects', 'rag', 'transformer', 'about'];

  function wrapPage(containerHtml) {
    return (
      '<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>' +
      '<main id="barba-wrapper">' + containerHtml + '</main></body></html>'
    );
  }

  function initPages() {
    var homeContainer = document.querySelector('#barba-wrapper .barba-container');
    if (homeContainer) {
      homeHTML = homeContainer.outerHTML;
      pages.home = wrapPage(homeHTML);
    }
    DETAIL_ROUTES.forEach(function (key) {
      var tpl = document.getElementById('template-' + key);
      if (tpl) pages[key] = wrapPage(tpl.innerHTML);
    });
  }

  function resolvePageKey(url) {
    try {
      var parsed = new URL(url, window.location.href);
      var path = parsed.pathname.replace(/\/index\.html$/i, '/').replace(/\/$/, '') || '/';
      var segment = path.split('/').pop() || '';
      if (path === '/' || path === '' || segment === 'index.html') return 'home';
      if (/^projects?$/i.test(segment) || /^reile$/i.test(segment)) return 'projects';
      if (/^rag$/i.test(segment)) return 'rag';
      if (/^transformer$/i.test(segment)) return 'transformer';
      if (/^about$/i.test(segment)) return 'about';
    } catch (e) {
      if (/\brag\b/i.test(url)) return 'rag';
      if (/\btransformer\b/i.test(url)) return 'transformer';
      if (/\bprojects\b|\breile\b/i.test(url)) return 'projects';
      if (/\babout\b/i.test(url)) return 'about';
      if (/index\.html|^\.\/?$/.test(url)) return 'home';
    }
    return null;
  }

  function routeKey(href) {
    if (!href) return null;
    if (/^\.\/?projects?\/?$/i.test(href) || href === 'projects' || href === 'project') return 'projects';
    if (/^\.\/?reile\/?$/i.test(href) || href === 'reile') return 'projects';
    if (/^\.\/?rag\/?$/i.test(href) || href === 'rag') return 'rag';
    if (/^\.\/?transformer\/?$/i.test(href) || href === 'transformer') return 'transformer';
    if (/^\.\/?about\/?$/i.test(href) || href === 'about') return 'about';
    return null;
  }

  function getDims() {
    if (window.matchMedia('(min-width: 801px)').matches) {
      return {
        fpnav: { y: 0, x: '-100%' },
        image: { width: '53.125%', height: '74.81%', top: 'auto', marginRight: '8%', marginLeft: 'auto' },
        imageBig: { width: '60.677%', height: '100vh', marginLeft: 'auto', top: 'auto' }
      };
    }
    if (window.matchMedia('(min-width: 421px)').matches) {
      return {
        fpnav: { y: '100%', x: 0 },
        image: { width: '53.125%', height: '74.81%', marginRight: 40, marginLeft: 'auto' },
        imageBig: { width: '60.677%', height: '100vh', top: 'auto', marginLeft: 'auto' }
      };
    }
    return {
      fpnav: { y: '100%', x: 0 },
      image: { width: '80%', height: '55.633%', top: '9.859%', marginRight: '10%', marginLeft: '10%' },
      imageBig: { width: '100%', height: '65.492%', marginLeft: 0, top: 0 }
    };
  }

  function getTemplateHTML(key) {
    var tpl = document.getElementById('template-' + key);
    return tpl ? tpl.innerHTML.trim() : '';
  }

  function replaceContainer(html) {
    var wrapper = document.getElementById('barba-wrapper');
    var temp = document.createElement('div');
    temp.innerHTML = html;
    var next = temp.firstElementChild;
    var current = wrapper.querySelector('.barba-container');
    if (current) current.replaceWith(next);
    else wrapper.appendChild(next);
  }

  function closeMenu() {
    $('.menuIcon').removeClass('js-menuOpen');
    $('.global-nav').removeClass('js-open');
  }

  function scrollToSection(anchor) {
    if ($.fn.fullpage && $('#js-fullpage').length) {
      $.fn.fullpage.moveTo(anchor);
      return true;
    }
    return false;
  }

  function getHashAnchor(href) {
    if (!href) return null;
    var match = href.match(/^#(top|projects|reile|about|contact)$/i) ||
      href.match(/^\.\/?#(top|projects|reile|about|contact)$/i) ||
      href.match(/index\.html#(top|projects|reile|about|contact)$/i);
    if (!match) return null;
    var anchor = match[1].toLowerCase();
    return anchor === 'reile' ? 'projects' : anchor;
  }

  function isHomeHref(href) {
    if (!href) return false;
    return href === './' || href === '.' || href === './index.html' ||
      href === 'index.html' || href === '/' || href === '#top' ||
      /^\.\/?#top$/i.test(href) || /index\.html#top$/i.test(href);
  }

  function setDetailTitle(key) {
    document.title = DETAIL_TITLES[key] || 'Abrash Arshad PORTFOLIO';
  }

  function goToDetailFromDetail(key) {
    if (isNavigating) return;
    var html = getTemplateHTML(key);
    if (!html) return;

    isNavigating = true;
    closeMenu();
    replaceContainer(html);
    setDetailTitle(key);
    initUnderlayer();
    onDetailPage = true;
    isNavigating = false;
  }

  function getBackAnchor(href) {
    return getHashAnchor(href);
  }

  function initFullpage(anchor) {
    $('html, body').css({ overflow: '', height: '' }).removeClass(
      'fp-enabled fp-viewing-top fp-viewing-projects fp-viewing-reile fp-viewing-about fp-viewing-contact'
    );
    if (typeof fullPage === 'function') {
      fullPage();
    }
    if (anchor && $.fn.fullpage) {
      setTimeout(function () {
        $.fn.fullpage.moveTo(anchor);
      }, 50);
    }
    if ($('#js-fullpage').length && typeof Parallax !== 'undefined') {
      $('.js-parallax-moon, .js-parallax-moonlight, .js-parallax-star').each(function () {
        new Parallax(this);
      });
    }
  }

  function initUnderlayer() {
    $('body, html').scrollTop(0);
    if (window.matchMedia('(max-width: 420px)').matches) {
      $('.page-top').height($(window).height());
    }
    if (typeof headerColor === 'function') headerColor();
    anime.timeline({ duration: 500, easing: 'easeInOutCubic' })
      .add({ targets: '.btn-wrap', translateY: ['110%', 0] })
      .add({ targets: '.back-arrow svg', translateX: ['100%', 0], offset: '-=500' })
      .add({ targets: '.scrollDown', translateY: ['180%', 0], offset: '-=500' });
    $(window).off('scroll.underlayer').on('scroll.underlayer', function () {
      $('.js-scroll').each(function () {
        if ($(window).scrollTop() + $(window).height() > $(this).offset().top) {
          $(this).addClass('in');
        }
      });
    });
  }

  function goToDetail(key) {
    if (isNavigating) return;
    if (onDetailPage) {
      goToDetailFromDetail(key);
      return;
    }

    var html = getTemplateHTML(key);
    if (!html) return;

    isNavigating = true;
    closeMenu();
    var dims = getDims();
    var $img = $('.fp-section.active .image, .fp-section.fp-completely .image').first();
    var timeline = anime.timeline({
      duration: 500,
      easing: 'easeInOutCubic',
      complete: function () {
        if ($.fn.fullpage && $('#js-fullpage').length) {
          $.fn.fullpage.destroy('all');
        }
        replaceContainer(html);
        setDetailTitle(key);
        initUnderlayer();
        onDetailPage = true;
        isNavigating = false;
      }
    });

    if ($img.length) {
      timeline.add({
        targets: $img.get(0),
        width: [dims.image.width, dims.imageBig.width],
        height: [dims.image.height, dims.imageBig.height],
        marginRight: [dims.image.marginRight || 0, 0],
        marginLeft: [dims.image.marginLeft || 'auto', dims.imageBig.marginLeft || 'auto'],
        top: [dims.image.top || 'auto', dims.imageBig.top || 'auto']
      });
    }

    timeline
      .add({ targets: '.fullpage__slide', background: ['rgba(0,0,0,0)', '#020b16'], offset: $img.length ? '-=500' : 0 })
      .add({ targets: '.page-num p', translateY: [0, '100%'], offset: '-=500' })
      .add({ targets: '#fp-nav ul', translateY: [0, dims.fpnav.y], translateX: [0, dims.fpnav.x], offset: '-=500' })
      .add({ targets: '.active .btn-wrap', translateY: [0, '110%'], offset: '-=500' });
  }

  function goHome(anchor) {
    if (isNavigating || !homeHTML) return;
    if (!onDetailPage) {
      closeMenu();
      scrollToSection(anchor || 'top');
      return;
    }

    isNavigating = true;
    anchor = anchor || 'top';
    var dims = getDims();

    anime({
      targets: '.curtain',
      translateY: ['100%', 0],
      duration: 800,
      easing: 'easeInOutCubic',
      complete: function () {
        $('body, html').scrollTop(0);
        replaceContainer(homeHTML);
        document.title = 'Abrash Arshad PORTFOLIO';
        onDetailPage = false;
        closeMenu();
        initFullpage(anchor);

        anime.timeline({ duration: 500, easing: 'easeInOutCubic' })
          .add({ targets: '.active .page-num p', translateY: ['100%', 0] })
          .add({
            targets: '#fp-nav ul',
            translateY: [dims.fpnav.y, 0],
            translateX: [dims.fpnav.x, 0],
            offset: '-=500'
          })
          .add({ targets: '.fullpage__slide', background: ['#020b16', 'rgba(0,0,0,0)'], offset: '-=500' })
          .add({ targets: '.active .btn-wrap', translateY: ['110%', 0], offset: '-=500' });

        anime({
          targets: '.curtain',
          translateY: [0, '-100%'],
          duration: 800,
          easing: 'easeInOutCubic',
          complete: function () {
            isNavigating = false;
          }
        });
      }
    });
  }

  function handleLinkClick(e) {
    var link = e.target.closest('a[href]');
    if (!link || link.target === '_blank') return;

    var href = link.getAttribute('href');
    var inGlobalNav = link.closest('.global-nav') || link.classList.contains('name');

    if (onDetailPage && (link.classList.contains('back-arrow') || link.classList.contains('back-btn'))) {
      e.preventDefault();
      e.stopImmediatePropagation();
      closeMenu();
      var backToDetail = routeKey(href);
      if (backToDetail) {
        goToDetailFromDetail(backToDetail);
        return;
      }
      goHome(getBackAnchor(href) || 'top');
      return;
    }

    if (inGlobalNav || link.classList.contains('name') || link.classList.contains('js-contact')) {
      if (isHomeHref(href)) {
        e.preventDefault();
        e.stopImmediatePropagation();
        goHome('top');
        return;
      }

      var hashAnchor = getHashAnchor(href);
      if (hashAnchor) {
        e.preventDefault();
        e.stopImmediatePropagation();
        if (onDetailPage) {
          goHome(hashAnchor);
        } else {
          closeMenu();
          scrollToSection(hashAnchor);
        }
        return;
      }

      var navKey = routeKey(href);
      if (navKey) {
        e.preventDefault();
        e.stopImmediatePropagation();
        goToDetail(navKey);
        return;
      }
    }

    var detailKey = routeKey(href);
    if (!detailKey) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    goToDetail(detailKey);
  }

  initPages();

  var originalXhr = Barba.Utils.xhr.bind(Barba.Utils);
  Barba.Utils.xhr = function (url) {
    var key = resolvePageKey(url);
    if (key && pages[key]) return Promise.resolve(pages[key]);
    return originalXhr(url);
  };

  $(function () {
    setTimeout(function () {
      if (window.Barba && Barba.Pjax) {
        var originalPreventCheck = Barba.Pjax.preventCheck;
        Barba.Pjax.preventCheck = function (evt, element) {
          var href = $(element).attr('href') || '';
          if (href.indexOf('#') !== -1) return true;
          if (/^\.\/?(projects?|reile|rag|transformer|about)\/?$/i.test(href)) return true;
          if (href === './' || href === '.' || href === './index.html' || href === 'index.html') return true;
          if (typeof originalPreventCheck === 'function') {
            return originalPreventCheck(evt, element);
          }
          return false;
        };
      }
      document.addEventListener('click', handleLinkClick, true);
    }, 0);
  });
})(jQuery);
