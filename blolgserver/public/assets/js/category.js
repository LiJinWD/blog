// 添加类目
var $categoryList = $('#categoryList');
$('#addcategory').on('submit', function () {
    let formDate = $(this).serialize();
    $.ajax({
        type: "POST",
        url: "/categories",
        data: formDate,
        success: function (response) {            
            location.reload(); 
        }
    });
    return false;   
});
// 展示类目
$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        let html = template('categoryTpl', { data: response });
        $('#categoryList').html(html);
    }
});
// 指定id查询指定分类
$categoryList.on('click', '.edit', function () { 
    $.ajax({
        type: "get",
        url: "/categories/" + $(this).data('id'),
        success: function (response) {
            let html = template('modifyCategoryTpl', response);
            $('#formBox').html(html);
        }
    });
});

// 编辑分类
$('#formBox').on('submit', '#modifyCategory', function () {
    let formDate = $(this).serialize();
    $.ajax({
        type: "put",
        url: "/categories/" + $(this).data('id'),
        data: formDate,
        success: function (response) {
            location.reload();
        }
    });




    return false;
});
// 删除分类
$categoryList.on('click', '.delete', function () { 
    if (confirm('确认删除此分类吗？')) {  
        $.ajax({
            type: "delete",
            url: "/categories/" + $(this).data('id'),
            success: function (response) {
                alert('删除成功');
                location.reload();
            }
        });
    }
});
// 全选
var $selectAll = $('#selectAll');
var $deleteMany = $('#deleteMany');
$selectAll.on('change', function () {
    $('#categoryList .checkStutas').prop('checked', $(this).prop('checked'));
	$(this).prop('checked') ? $deleteMany.show() : $deleteMany.hide();
});
// 单选所有checkbox变全选
$('#categoryList').on('change', 'input.checkStutas', function () {
	let length = $('#categoryList input').length;
	let checkedLength = $('#categoryList input:checked').length;
	$selectAll.prop('checked', length == checkedLength);
	checkedLength ? $deleteMany.show() : $deleteMany.hide();
});
// 批量删除
$deleteMany.on('click', function () {
    let ids = [];	
    console.log($('#categoryList input:checked'));
    
	$('#categoryList input:checked').each((idx, ele) => ids.push($(ele).data('id')));
	if (confirm('确定进行批量删除吗？')) {
		$.ajax({
			type: "delete",
			url: "/categories/" + ids.join('-'),
			
			success: function (response) {
				location.reload();
			}
		});
	}
});