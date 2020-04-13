// 创建用户（不包括上传头像）
$('#userForm').on('submit', function () {
	let userForm = $(this).serialize();
	$.ajax({
		type: "post",
		url: "/users",
		data: userForm,
		success: function (response) {
			location.reload();
		},
		error: function () {
			alert('创建用户失败,请正确书写内容！');
		}
	});
	return false;
});
// 创建用户中的上传头像
$('#modifyBox').on('change', '#avatar', function  () {
	let formdata = new FormData();
	formdata.append('avatar', this.files[0]);
	$.ajax({
		type: "POST",
		url: "/upload",
		data: formdata,
		// 传递文件需要用到这两个属性
		processData: false,
		contentType: false,
		success: function (response) {
			$('#preview').attr('src', response[0].avatar);
			$('#hiddenAvatar').val(response[0].avatar);
		}
	});
})
// 展示用户
$.ajax({
	type: "GET",
	url: "/users",
	success: function (response) {
		let html = template('userTpl', { data: response });
		$('#userList').html(html);
	}
});
// 通过事件委托展示编辑用户(为什么要用事件委托： 因为添加元素是动态添加的，如果直接给元素添加事件有可能会找不到)
$('#userList').on('click', 'a.edit', function () {
	$.ajax({
		type: "get",
		// 这里直接用的restful /users/:id
		url: "/users/" + $(this).attr('data-id'),
		success: function (response) {
			let html = template('modifyTpl', response);			
			$('#modifyBox').html(html);
		}
	});
})
// 时间委托删除用户
$('#userList').on('click', 'a.delete', function () {
	if (confirm('确认删除用户吗 ？')) {
		$.ajax({
			type: "delete",
			// 这里直接用的restful /users/:id
			url: "/users/" + $(this).attr('data-id'),
			success: function () {
				location.reload();
			  }
		});
	}
	
})
// 通过时间委托编辑用户
$('#modifyBox').on('submit', '#modifyForm', function () {
	let formData = $(this).serialize();
	
	$.ajax({
		type: "put",
		url: "/users/" + $(this).data('id'),
		data: formData,
		success: function (response) {	
			location.reload();
		}
	});
	// 取消默认提交
	return false;
})
// 全选按钮
var selectAll = $('#selectAll');
var deleteMany = $('#deleteMany');
selectAll.on('change', function () {
	$('#userList input').prop('checked', $(this).prop('checked'));
	$(this).prop('checked') ? deleteMany.show() : deleteMany.hide();
});
// 单选所有checkbox变全选
$('#userList').on('change', 'input.checkStatus', function () {
	let length = $('#userList input').length;
	let checkedLength = $('#userList input:checked').length;
	selectAll.prop('checked', length == checkedLength);
	checkedLength ? deleteMany.show() : deleteMany.hide();
});
// 批量删除
deleteMany.on('click', function () {
	let ids = [];	
	$('#userList input:checked').each((idx, ele) => ids.push($(ele).data('id')));
	if (confirm('确定进行批量删除吗？')) {
		$.ajax({
			type: "delete",
			url: "/users/" + ids.join('-'),
			
			success: function (response) {
				location.reload();
			}
		});
	}
});
