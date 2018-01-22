package com.wisty.ts.core.bean;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

/**
 * @Description 12306车票查询返回
 * @author 刘小龙
 * @date 2018年1月22日 上午10:47:33
 * @version V1.3.1
 */
public class TrainTicketResponse implements Serializable {

	/** @Fields serialVersionUID: */

	private static final long serialVersionUID = 1L;

	private String flag; 

	private Map<String, String> map; //出发到达站点-->{"AOH":"上海虹桥","SHH":"上海","ZAF":"郑州东","ZZF":"郑州"}

	private List<String> result;

	public String getFlag() {
		return flag;
	}

	public void setFlag(String flag) {
		this.flag = flag;
	}

	public Map<String, String> getMap() {
		return map;
	}

	public void setMap(Map<String, String> map) {
		this.map = map;
	}

	public List<String> getResult() {
		return result;
	}

	public void setResult(List<String> result) {
		this.result = result;
	}

}
