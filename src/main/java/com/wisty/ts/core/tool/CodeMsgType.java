package com.wisty.ts.core.tool;

public enum CodeMsgType {
	SUCCESS(200, "成功"), ERROR_SYS(100, "失败");
	private Integer code;
	private String msg;

	private CodeMsgType(Integer code, String msg) {
		this.code = code;
		this.msg = msg;
	}

	public Integer code() {
		return this.code;
	}

	public String msg() {
		return this.msg;
	}

}
