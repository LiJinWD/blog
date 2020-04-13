$('#image').on('change', function  () {
	let formdata = new FormData();
	formdata.append('image', this.files[0]);
	$.ajax({
		type: "POST",
		url: "/upload",
		data: formdata,
		// 传递文件需要用到这两个属性
		processData: false,
		contentType: false,
		success: function (response) {
            $('#img').attr('src', response[0].image);
            $('#img').show();
			$('#hiddenImage').val(response[0].image);
		}
	});
})
// 添加轮播图
$('#slidesForm').on('submit', function () {  
    let formdata = $(this).serialize();
    console.log(formdata);
    
    $.ajax({
        type: "post",
        url: "/slides",
        data: formdata,
        success: function (response) {
            location.reload();
        }
    });



    return false;
})


// 展示轮播图
$.ajax({
    type: "get",
    url: "/slides",
    success: function (response) {        
        let html = template('sildesTpl', { data: response });
        $('#slideList').html(html);
    }
});

// 删除轮播图
$('#slideList').on('click', '.delete', function () {
    
    if (confirm('确认删除这个轮播图吗?')) {
        $.ajax({
            type: "delete",
            url: "/slides/" + $(this).data('id'),
            success: function (response) {
                location.reload();
            }
        });
    }
});