$('#modifyForm').on('submit', function () {
    let formData = $(this).serialize();
    /* $.ajax({
        type: "put",
        url: "/users/password",
        data: formData,
        success: function (response) {
            alert('密码修改成功');
            location.href = '/admin/login.html';
        }
    }); */



    $.ajax('/users/password', { type: 'put', data: formData })
        .done(response => {
            alert('密码修改成功');
            location.href = '/admin/login.html';
    })     
    return false;
  })