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
	<form class="layui-form" action="/demo/helloWorld">
		<div class="layui-form-item">
			<div class="layui-inline">
				<label class="layui-form-label">出发地:</label>
				<div class="layui-input-inline">
					<input type="text" name="departStation" required lay-verify="required" placeholder="请输入出发地" autocomplete="off" class="layui-input">
				</div>
			</div>
			<div class="layui-inline">
				<label class="layui-form-label">目的地:</label>
				<div class="layui-input-inline">
					<input type="text" name="arriveStation" required lay-verify="required" placeholder="请输入目的地" autocomplete="off" class="layui-input">
				</div>
			</div>
		</div>

		<div class="layui-form-item">
			<div class="layui-inline">
				<label class="layui-form-label">出发日:</label>
				<div class="layui-input-inline">
					<input type="text" name="departDate" id="date" lay-verify="date" placeholder="yyyy-MM-dd" autocomplete="off" class="layui-input">
				</div>
			</div>
			<div class="layui-inline">
				<label class="layui-form-label">返程日:</label>
				<div class="layui-input-inline">
					<input type="text" name="date" id="date1" lay-verify="date" placeholder="yyyy-MM-dd" autocomplete="off" class="layui-input">
				</div>
			</div>
		</div>

		<div class="layui-form-item">
			<label class="layui-form-label">车票类型:</label>
			<div class="layui-input-block">
				<input type="radio" name="passengerType" value="1" title="普通" checked>
				<input type="radio" name="passengerType" value="2" title="学生">
			</div>
		</div>
		<div class="layui-form-item">
			<div class="layui-input-block">
				<button class="layui-btn" lay-submit lay-filter="formDemo">查询</button>
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
			elem : '#date'
		});
		laydate.render({
			elem : '#date1'
		});
		form.render();
		
		//方法级渲染
		  table.render({
		    elem: '#LAY_table_user'
		    ,cols: [[
		      	{field:'username', title: '车次', width:80}
		      ,{field:'sex', title: '出发站/到达站', width:120}
		      ,{field:'city', title: '出发时间/到达时间', width:150}
		      ,{field:'sign', title: '历时', width:80}
		      ,{field:'experience', title: '商务座/特等座', width:120}
		      ,{field:'score', title: '一等座',width:80}
		      ,{field:'classify', title: '二等座', width:80}
		      ,{field:'gjrw', title: '高级软卧', width:100}
		      ,{field:'rw', title: '软卧', width:80}
		      ,{field:'dw', title: '动卧', width:80}
		      ,{field:'yw', title: '硬卧', width:80}
		      ,{field:'rz', title: '软座', width:80}
		      ,{field:'yz', title: '硬座', width:80}
		      ,{field:'wz', title: '无座', width:80}
		      ,{field:'qt', title: '其他', width:80}
		      ,{field:'remark', title: '备注', width:135}
		    ]]
		    ,id: 'testReload'
		    ,page: false
		    ,height: 315
		  });
	});
</script>
</html>