
//上传页面logo
$('#logo').on('change', function () {
	let formdata = new FormData();
    formdata.append('logo', this.files[0]);

	/* $.ajax({
		type: "POST",
		url: "/upload",
		data: formdata,
		// 传递文件需要用到这两个属性
		processData: false,
		contentType: false,
        success: function (response) {           
			$('#logoImg').attr('src', response[0].logo);
			$('#hiddenLogo').val(response[0].logo);
		}
	}); */
	$.ajax('/upload', {type: "POST", data: formdata, processData: false,
		contentType: false,
	}).done(response => {
		$('#logoImg').attr('src', response[0].logo);
		$('#hiddenLogo').val(response[0].logo);
	})
})

// 提交设置信息
$('#settingsForm').on('submit', function () {
	let settingForm = $(this).serialize();
	$.ajax({
		type: "post",
		url: "/settings",
		data: settingForm,
		success: function (response) {
			location.reload();
		}
	});
	return false;
});

// 展示设置信息

$.ajax('/settings').done(response => {
	console.log(response);
	if (response) {
		$('#site_name').val(response.title);
		$('#site_description').val(response.description);
		$('#site_keywords').val(response.keywords);
		$('#comment_status').prop(response.comment);
		$('#comment_reviewed').prop(response.review);
		$('#logoImg').attr('src', response.logo);
		$('#hiddenLogo').val(response.logo);
	}
})