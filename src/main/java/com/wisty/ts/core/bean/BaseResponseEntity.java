package com.wisty.ts.core.bean;

import java.io.Serializable;

/**
 * @Description 12306接口请求返回公共参数
 * @author 刘小龙
 * @date 2018年1月22日 上午10:43:37
 * @version V1.3.1
 */
public class BaseResponseEntity<T> implements Serializable {

	/** @Fields serialVersionUID: */

	private static final long serialVersionUID = 1L;

	private T data;

	private Integer httpstatus; // 响应状态码

	private String messages; // 回执信息

	private Boolean status; // 回执状态

	public T getData() {
		return data;
	}

	public void setData(T data) {
		this.data = data;
	}

	public Integer getHttpstatus() {
		return httpstatus;
	}

	public void setHttpstatus(Integer httpstatus) {
		this.httpstatus = httpstatus;
	}

	public String getMessages() {
		return messages;
	}

	public void setMessages(String messages) {
		this.messages = messages;
	}

	public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}

}
