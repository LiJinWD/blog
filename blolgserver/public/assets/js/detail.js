let id = getUrlParmas('id');
let review;
// 展示详细内容
$.ajax('/posts/' + id).done(suc => {      
    let html = template('postTpl', suc);
    $('#postBox').html(html);
});

// 点赞功能
$('#postBox').on('click', '#like', function () {    
    $.ajax('/posts/fabulous/' + id, { type: 'post' }).done(suc => {
        alert('点赞成功');
        location.reload();
    });
});

// 获取网站配置，查看是否开启评论功能
$.ajax('/settings').done(suc => {  
    console.log(suc);
    
    suc.comment && $('#comment').css({ 'display': 'block' });
    state = suc.review;
})
$('#comment').on('submit', 'form', function (e) { 
    var content = $(this).find('textarea').val();   
    $.ajax('/comments', {
        type: 'POST', data: {
            content: content,
            post: id,
            state: (state - 0)
    } }).done(suc => {
        alert('评论成功');
    }).fail(err => {
        alert('评论失败')
    })
    return false;
})