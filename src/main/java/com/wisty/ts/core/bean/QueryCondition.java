package com.wisty.ts.core.bean;

import java.io.Serializable;

/**
 * @Description 12306火车票查询条件
 * @author 刘小龙
 * @date 2018年1月22日 上午10:33:28
 * @version V1.3.1
 */
public class QueryCondition implements Serializable {

	/** @Fields serialVersionUID: */
	private static final long serialVersionUID = 1L;

	private String departDate;// 出发日期
	
	private String arriveDate;//到达日期

	private String departStation;// 出发站点

	private String arriveStation;// 到达站点

	private String passengerType;// 乘客类型 普通/学生
	

	public String getArriveDate() {
		return arriveDate;
	}

	public void setArriveDate(String arriveDate) {
		this.arriveDate = arriveDate;
	}

	public String getDepartDate() {
		return departDate;
	}

	public void setDepartDate(String departDate) {
		this.departDate = departDate;
	}

	public String getDepartStation() {
		return departStation;
	}

	public void setDepartStation(String departStation) {
		this.departStation = departStation;
	}

	public String getArriveStation() {
		return arriveStation;
	}

	public void setArriveStation(String arriveStation) {
		this.arriveStation = arriveStation;
	}

	public String getPassengerType() {
		return passengerType;
	}

	public void setPassengerType(String passengerType) {
		this.passengerType = passengerType;
	}

}
