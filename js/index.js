
	// $('#header .container ul li').eq(1).hover(function(){
	// 	$('#item1').show().animate({
	// 		height: "206px",
	// 	},1000);
	// },function(){
	// 	$('#item1').hide();
	// });

	// $('#header .container ul li').eq(2).hover(function(){
	// 	$('#item2').show().animate({
	// 		height: "206px"
	// 	},1000);
	// },function(){
	// 	$('#item2').hide();
	// });
	
	$('#myCarousel').carousel({
		interval : 4000,
	});

	var width = $(window).width();

	$('.show').css('left',(width-1140)/2+'px');
	$('#header .dropdown-menu').css('width',width);

	var menu1_left=(width-1060)/2+86;
	$('#header .menu1').css('left','-'+menu1_left+'px');

	var menu2_left=(width-1060)/2+86*2;
	$('#header .menu2').css('left','-'+menu2_left+'px');

	var menu3_left=(width-1060)/2+86*3;
	$('#header .menu3').css('left','-'+menu3_left+'px');
	
	var menu4_left=(width-1060)/2+86*4;
	$('#header .menu4').css('left','-'+menu4_left+'px');
	
	$('.manufactor2 .left ul li').eq(0).css('border-bottom','2px solid #B4A078');
	$('.manufactor2 .left ul li').eq(0).css('color','#B4A078');
	$('.manufactor2 .showContainer').hide();
	$('.manufactor2 .showContainer').eq(0).show();

	$('.manufactor2 .left ul a').click(function(){
		$('.manufactor2 .left ul li').css('border-bottom','none');
		$('.manufactor2 .left ul li').css('color','#666');
		$(this.childNodes).css('border-bottom','2px solid #B4A078');
		$(this.childNodes).css('color','#B4A078');
		$('.manufactor2 .showContainer').hide();
		$('.manufactor2 .showContainer').eq($(this).index()).show();
	});

	$('#login_a').click(function(){
		$('#login').dialog('open');
	});

	$('#logout, #member').hide();

	$('#login').dialog({
		autoOpen : false,
		modal : true,
		resizable :false,
		width : 400,
		height : 348,
		buttons: {
			'登 录' : function(){
				$(this).submit();
			}
		}
	}).validate({
		submitHandler : function(form){
			$(form).ajaxSubmit({
				url : 'login.php',
				type : 'POST',
				beforeSubmit : function(formData, jqForm, options){
					$('#login').dialog('widget').find('button').eq(1).button('disable');
				},
				success : function(responseText, statusText){
					if(responseText){
						$('#login').dialog('widget').find('button').eq(1).button('enable');
						if($('#expires').is(':checked')){
							$.cookie('user',$('#login_user').val(),{
								expires : 7,
							});
						}else{
							$.cookie('user',$('#login_user'));
						}
						setTimeout(function(){
							$('#login').dialog('close');
							$('#login').resetForm();
							$('#member, #logout').show();
							$('#reg_a, #login_a').hide();
							$('#member').html($.cookie('user'));
						},1000);
					}
				}
			})
		},

		showErrors : function(errorMap, errorList){
			var errors =this.numberOfInvalids();

			if(errors>0){
				$('#login').dialog('option','height',errors*20+348);
			}else{
				$('#login').dialog('option','height',348);
			}
			this.defaultShowErrors();
		},

		highlight : function(element, errorClass){
			$(element).css('border','1px solid #D4282D');
		},

		unhighlight : function(element, errorClass){
			$(element).css('border','1px solid #ccc');
		},
		errorLabelContainer : 'ol.login_error',
		wrapper : 'li',

		rules : {
			login_user : {
				required : true,
				minlength : 2,
			},
			login_pass : {
				required : true,
				minlength : 6,
				remote : {
					url : 'login.php',
					type : 'POST',
					data : {
						login_user : function(){
							return $('#login_user').val();
						},
					},
				},
			},
		},

		messages : {
			login_user : {
				required : '账号不得为空',
				minlength : jQuery.format('账号不得小于{0}位！'),
			},
			login_pass : {
				required : '密码不得为空',
				minlength : jQuery.format('密码不得小于{0}位！'),
				remote : '账号和密码不正确！',
			}
		}

	});

	$('#reg_a').click(function(){
		$('#reg').dialog('open');
	});

	$('#reg').dialog({
		autoOpen : false,
		modal : true,
		resizable :false,
		width : 563,
		height: 500,
		buttons : {
			'注册' : function(){
				$(this).submit();
			}
		}
	}).buttonset().validate({
		submitHandler : function(form){
			$(form).ajaxSubmit({
				url : 'add.php',
				type : 'POST',
				beforeSubmit : function(formData, jqForm, options){
					$('#reg').dialog('widget').find('button').eq(1).button('disable');
				},
				success : function(responseText, statusText){
					if(responseText){
						$('#reg').dialog('widget').find('button').eq(1).button('enable');
						$.cookie('user',$('#reg_user').val());
						setTimeout(function(){
							$('#reg').dialog('close');
							$('#reg').resetForm();
							$('#member, #logout').show();
							$('#reg_a, #login_a').hide();
							$('#member').html($.cookie('user'));
						}, 1000);
					}
				}
			})
		},

		showErrors : function(errorMap, errorList){
			var errors = this.numberOfInvalids();

			if(errors>0){
				$('#reg').dialog('option','height',errors*20+500);
			}else{
				$('#reg').dialog('option','height',500);
			}
			this.defaultShowErrors();
		},

		highlight: function(element, errorClass){
			$(element).css('border','1px solid #D4282D');
		},

		unhighlight : function(element, errorClass){
			$(element).css('border','1px solid #ccc');
		},

		errorLabelContainer : 'ol.reg_error',
		wrapper : 'li',

		rules : {
			user : {
				required : true,
				minlength: 2,
				remote : {
					url : 'is_user.php',
					type : 'POST',
				},
			},
			pass : {
				required : true,
				minlength : 6,
			},
			notpass : {
				required : true,
				minlength : 6,
			},
			email : {
				required : true,
				email : true,
			},
			phone : {
				required : true,
				minlength : 11,
			},
		},

		messages : {
			user : {
				required : '账号不得为空！',
				minlength : jQuery.format('账号不得小于{0}位！'),
				remote : '账号被占用',
			},
			pass : {
				required : '密码不得为空！',
				minlength : jQuery.format('密码不得小于{0}位！'),
			},
			
			email : {
				required : '邮箱不得为空！',
				minlength : '请输入正确的邮箱地址！',
			},
			phone : {
				required : '手机号不得为空！',
				minlength : '请输入正确的手机号码！',
			},
		}
	});

	$('#email').autocomplete({
		delay : 0,
		autoFocus : true,
		source : function(request, response){
			//获取用户输入内容
			//alert(request.term)
			//绑定数据源
			//response(['aa','bb','aaaaa']);
			//
			var hosts = ['126.com','163.com','qq.com','gmail.com','hotmail.com'],
				term = request.term,		//获取用户输入内容
				name = term,				//邮箱的用户名
				host = '',					//邮箱的域名
				ix = term.indexOf('@'),		//@的位置
				result = [];				//最终呈现的邮箱列表

			result.push(term);

			//当有@的时候，重新分别用户名和域名
			if(ix>-1){
				name = term.slice(0, ix);
				host = term.slice(ix + 1);
			}

			if(name){
				//如果用户已经输入@和后面的域名
				//那么就找到相关的域名提示，比如abc@126.com
				//如果用户还没有输入@或者后面的域名
				//就把所有域名提示出来
				var findedHosts = (host ? $.grep(hosts,function(value, index){
						return value.indexOf(host) > -1
					}):hosts),
					findedResult = $.map(findedHosts, function(value, index){
					return name+'@'+value;
				});
				result=result.concat(findedResult);	
			}
			response(result);
		},
	})

	$('.m-detail .slide .view img').hide();
	$('.m-detail .slide .view img').eq(0).show();

	$('.detail .slide .preview li').eq(0).css('border-color','#B4A078');

	//鼠标移入preview时小图显示大图
	$('.m-detail .slide .preview li').mouseover(function(){
		$('.detail .slide .preview li').css('border-color','#DDDDDD');
		$(this).css('border-color','#B4A078');
		$('.m-detail .slide .view img').hide();
		$('.m-detail .slide .view img').eq($(this).index()).show();
	});


	//颜色选项移出时tooltip不显示
	$('.info .color ul li').mouseout(function(){
		$("[data-toggle='tooltip']").tooltip('hide'); 
	});

	$('.info .color ul li').click(function(){
		$('.info .color ul li').css('border-color','#DDDDDD');
		$(this).css('border-color','#B4A078');
		$('.m-detail .slide .view img').hide();
		$('.m-detail .slide .view img').eq($(this).index()+5).show();

	});

	$(function () {
		$("[data-toggle='tooltip']").tooltip(); 
	});
	
	//数量中的加减号改变数量的值
	$('.amount .minus').click(function(){
		if(parseInt($('.amount .middle input').val())>=2){
			$('.amount .middle input').val(parseInt($('.amount .middle input').val())-1);
		}
	});
	$('.amount .plus').click(function(){
		$('.amount .middle input').val(parseInt($('.amount .middle input').val())+1);
	});

	// $('.pay .pay-now').click(function(){
	// 	alert($('.info h3').html());
	// 	alert($('.price-tag .price_2').html());
	// 	alert($('.color ul li').eq(colorselect()).attr('title'));
	// 	alert($('input[name=amount]').val());
	// });

	// $('.pay .pay-now').click(function(){
	// 	alert($('.color ul li').eq(colorselect()).attr('title'));			//火狐不兼容border-color取值，只能取border-left-color等等
	// 	alert(colorselect());
	// });


	// $('.pay .pay-now').click(function(){
	// 	alert($('input[name=amount]').val());
	// });

	
	$('.pay .pay-then').click(function(){
		if($.cookie('user')){
			$('form.info').on('submit', function(){
				var title = $('.info h3').html(),
					unitPrice = $('.price-tag .price_2').html(),
					color = $('.color ul li').eq(colorselect()).attr('title');
					amount = $('input[name=amount]').val();
				$(this).ajaxSubmit({
					url : 'add-to-cart.php',
					type : 'POST',
					data : {
						'title' : title,
						'unitPrice' : unitPrice,
						'color' : color,
						'amount' : amount
					},
					success : function(data){
						alert(data);
						alert('成功加入购物车！');
					}
				});
				return false;
			});
		}else{
			$('#login').dialog('open');
			// $('.pay .pay-then').unbind('submit');
		}
		
		$('.pay .pay-then').unbind('click');
	});
	
	


	
	// 
	// $('.info button').click(function(){
	// 	$('.info').on('submit', function(){
	// 		var title = $('.info h3').html(),
	// 			unitPrice = $('.info .price1').val(),
	// 			color = $('.info .color').attr('title');
	// 			amount = $('input[name=amount]').val();
	// 		$(this).ajaxSubmit({
	// 			url : 'add-to-cart.php',
	// 			type : 'POST',
	// 			data : {
	// 				'title' : title,
	// 				'unitPrice' : unitPrice,
	// 				'color' : color,
	// 				'amount' : amount
	// 			},
	// 			success : function(data){
	// 				alert(data);
	// 				alert('成功加入购物车！');
	// 			}
	// 		});
	// 		return false;
	// 	});
	// });

	// alert($('.color ul li').eq(0).css('border-color'));

	function colorselect(){
		for(var i=0; i< $('.color ul li').length; i++){
			if($('.color ul li').eq(i).css('border-left-color')=='rgb(180, 160, 120)'|| $('.color ul li').eq(i).css('border-left-color')=='#b4a078'){		//做IE的颜色取值兼容
				return i;
				break;
			}
		}
	}