// 获取所有评论并分页
changePage(1);
function changePage(page) {
	$.ajax({
        type: "get",
        url: "/comments",
        data: {
            page:page
        },
        success: function (response) {
            let html = template('commentsTpl', response);
            let pageHtml = template('pageTpl', response);
            $('#commentsList').html(html);
            $('#pageBox').html(pageHtml);
        }
    });
}
// 改变审核状态(批准,驳回)

$('#commentsList').on('click', '.status', function () {    
    let state = $(this).data('state');
    $.ajax({
        type: "put",
        url: "/comments/" + $(this).data('id'),
        data: {
            state: (!state - 0)
        },
        success: function (response) {
            location.reload();
        }
    });
  })
$('#commentsList').on('click', '.delete', function () {    
    if (confirm('确认删除这条评论?')) {
        $.ajax({
            type: "delete",
            url: "/comments/" + $(this).data('id'),
            success: function (response) {
                location.reload();
            }
        });
    }
  })