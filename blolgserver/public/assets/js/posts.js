// 显示用户数据和分页数据
changePage(1);
// 显示分类
$.ajax({
	type: "GET",
	url: "/categories",
	success: function (response) {		
		let categoryHtml = template('categoryTpl', { data: response });
		$('#categoryList').html(categoryHtml);
	}
});
function changePage(page) {
	$.ajax({
		type: "get",
		url: "/posts",
		data: {
			page:page
		},
		success: function (response) {
			let html = template('postsTpl', response);
			$('#postsList').html(html);
			let pageHtml = template('pageTpl', response);
			$('#page').html(pageHtml);
		}
	});
}
// 删除文章
$('#postsList').on('click', '.delete', function () {
	
	if (confirm('确定删除此文章?')) {
		$.ajax({
			type: "DELETE",
			url: "/posts/" + $(this).data('id'),
			success: function (response) {
				location.reload();
			}
		});
	}
});
// 根据分类筛选文章
$('#filterForm').on('submit', function () {
	let formData = $(this).serialize();
	formData += '&page=1';
	console.log(formData);
	$.ajax({
		type: "get",
		url: "/posts",
		data: formData,
		success: function (response) {	
			console.log(response);
			
			let html = template('postsTpl', response);
			$('#postsList').html(html);
			let pageHtml = template('pageTpl', response);
			$('#page').html(pageHtml);
		}
	});
	return false;
});
