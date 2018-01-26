package com.wisty.ts.core.tool;

import java.io.Serializable;

/**
 * @Description 前后台数据封装类
 * @author 刘小龙
 * @date 2018年1月26日 下午2:21:53
 * @version V1.3.1
 * @param <T>
 */
public class BaseRes<T> implements Serializable {

	/** @Fields serialVersionUID: */

	private static final long serialVersionUID = 1L;

	private Integer code;

	private String msg;

	private T data;

	public Integer getCode() {
		return code;
	}

	public void setCode(Integer code) {
		this.code = code;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public T getData() {
		return data;
	}

	public void setData(T data) {
		this.data = data;
	}

	public BaseRes() {
	}

	public BaseRes(Integer code, String msg, T data) {
		super();
		this.code = code;
		this.msg = msg;
		this.data = data;
	}

	public static <T> BaseRes<T> error() {
		return new BaseRes<T>(CodeMsgType.ERROR_SYS.code(),
				CodeMsgType.ERROR_SYS.msg(), null);
	}

	public static <T> BaseRes<T> success() {
		return new BaseRes<T>(CodeMsgType.SUCCESS.code(),
				CodeMsgType.SUCCESS.msg(), null);
	}

	public static <T> BaseRes<T> success(T t) {
		return new BaseRes<T>(CodeMsgType.SUCCESS.code(),
				CodeMsgType.SUCCESS.msg(), t);
	}

}
