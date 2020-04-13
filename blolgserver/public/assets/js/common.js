$('#logout').on('click', function () {  
    if (confirm('您真的要退出吗?')) {
      // alert('用户点击了确认按钮')
      $.ajax({
        type: 'post',
        url: '/logout',
        success: function () {
          location.href = 'login.html';
        },
        error: function () {
          alert('退出失败')
        }
      })
    }
});

$.ajax('/users/' + userId)
  .done(suc => {
    console.log(111);
    
    $('.profile .avatar').attr('src', suc.avatar);
    $('.profile .name').text(suc.nickName);
  });

