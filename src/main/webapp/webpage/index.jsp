<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8"%>
<html>
<head>
<meta name="renderer" content="webkit">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<%@ include file="../include/taglib.jsp"%>
<%@include file="../include/head.jsp"%>
<title>12306火车票查询</title>
</head>
<body>
	<form class="layui-form">
		<div class="layui-form-item">
			<div class="layui-inline">
				<label class="layui-form-label">出发地:</label>
				<div class="layui-input-inline">
					<input type="text" id="departStation" name="departStation" required lay-verify="required" placeholder="请输入出发地" autocomplete="off" class="layui-input">
				</div>
			</div>
			<div class="layui-inline">
				<label class="layui-form-label">目的地:</label>
				<div class="layui-input-inline">
					<input type="text" id="arriveStation" name="arriveStation" required lay-verify="required" placeholder="请输入目的地" autocomplete="off" class="layui-input">
				</div>
			</div>
		</div>

		<div class="layui-form-item">
			<div class="layui-inline">
				<label class="layui-form-label">出发日:</label>
				<div class="layui-input-inline">
					<input type="text" name="departDate" id="departDate" required lay-verify="date" autocomplete="off" class="layui-input">
				</div>
			</div>
			<div class="layui-inline">
				<label class="layui-form-label">返程日:</label>
				<div class="layui-input-inline">
					<input type="text" name="arriveDate" id="arriveDate" lay-verify="date" autocomplete="off" class="layui-input">
				</div>
			</div>
		</div>

		<div class="layui-form-item">
			<div class="layui-inline">
				<label class="layui-form-label">类型:</label>
				<div class="layui-input-block">
					<input type="radio" id="passengerType" name="passengerType" value="ADULT" title="普通票" checked>
					<input type="radio" id="passengerType" name="passengerType" value="0X00" title="学生票">
				</div>
			</div>
			<div class="layui-inline">
				<div class="layui-input-block">
					<button class="layui-btn" data-type="reload" >查询</button>
				</div>
			</div>
		</div>
	</form>
	<table class="layui-hide" id="LAY_table_user" lay-filter="user"></table>
</body>

<script>
	layui.use([ 'form', 'laydate','table' ], function() {
		var form = layui.form,
			layer = layui.layer,
			laydate = layui.laydate,
			table = layui.table;
		//日期
		laydate.render({
			elem : '#departDate',
			calendar: true,
			value:new Date(),
			min:0,
			max:30
		});
		laydate.render({
			elem : '#arriveDate',
			calendar: true,
			value:new Date(),
			min:0,
			max:30
		});
		form.render();
		
		//方法级渲染
		  table.render({
		    elem: '#LAY_table_user'
		    ,url: '/wisty_ts/reload'
		    ,cols: [[
		       {field:'trainId', title: '车次'}
		      ,{field:'departStation', title: '出发站/到达站'}
		      ,{field:'departTime', title: '出发时间/到达时间'}
		      ,{field:'takeTime', title: '历时'}
		      ,{field:'swz', title: '商务座/特等座'}
		      ,{field:'ydz', title: '一等座'}
		      ,{field:'edz', title: '二等座'}
		      ,{field:'gjrw', title: '高级软卧'}
		      ,{field:'rw', title: '软卧'}
		      ,{field:'dw', title: '动卧'}
		      ,{field:'yw', title: '硬卧'}
		      ,{field:'rz', title: '软座'}
		      ,{field:'yz', title: '硬座'}
		      ,{field:'wz', title: '无座'}
		      ,{field:'qt', title: '其他'}
		      ,{field:'remark', title: '备注'}
		    ]]
		    ,id: 'testReload'
		    ,page: false
		    ,height: 315
		  });
		
		  var $ = layui.$,active = {
		    reload: function() {
		      table.reload('testReload', {
		        method: 'post',
		        where: {
		        	departStation: $("#departStation").val(),
		        	arriveStation: $("#arriveStation").val(),
		        	departDate: $("#departDate").val(),
		        	arriveDate: $("#arriveDate").val(),
		        	passengerType: $("#passengerType").val(),
		          }
		      });
		    }
		  };
		
		  $('.layui-btn').on('click', function(){
			    var type = $(this).data('type');
			    active[type] ? active[type].call(this) : '';
			}); 
	});
	
	//实例化input
	new Vcity.CitySelector({input:'departStation'});
	new Vcity.CitySelector({input:'arriveStation'});
</script>
</html>