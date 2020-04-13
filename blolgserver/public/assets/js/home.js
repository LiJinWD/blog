// 轮播图显示
$.ajax('/slides')
    .done(suc => {
        let html = template('slidesTpl', { data: suc });
        let str = '<span class="active"></span>';
        for (var i = 0; i < suc.length - 1; i++) {
            str += '<span></span>';
        }
        $('#swipeUl').html(html);
        $('.swipe .cursor').html(str);
        var swiper = Swipe(document.querySelector('.swipe'), {
            auto: 3000,
            transitionEnd: function (index) {
              // index++;
      
              $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
            }
          });
      
          // 上/下一张
          $('.swipe .arrow').on('click', function () {
            var _this = $(this);
      
            if(_this.is('.prev')) {
              swiper.prev();
            } else if(_this.is('.next')) {
              swiper.next();
            }
          })
    })

// 最新发布显示
$.ajax('/posts/lasted').done(suc => {
    let html = template('lastedTpl', { data: suc });
    $('#lastedBox').html(html);
})