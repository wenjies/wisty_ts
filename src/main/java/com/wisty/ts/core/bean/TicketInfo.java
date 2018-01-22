package com.wisty.ts.core.bean;

import java.io.Serializable;

/**
 * @Description 12306车次车票
 * @author 刘小龙
 * @date 2018年1月22日 下午1:07:21
 * @version V1.3.1
 * @desc 
 *       KPGes8LdsOXMJWtuPXXxRjj7M2W1ImI7st471GuDrFpL8etchzRe%2BvemTCVchI9vScRu%2F
 *       UKloks
 *       %2F%0AgIayUgOXI7gMAg9w8kgYUcIteeN6GThryPbMJ5RBeO3r2OVaNx3UkwnSuX94T
 *       %2FyVqUGQUHv5cTTj%0AlgWUTWppLwpM4rB7NwESNmlTaA6HIj%2BnV0g0s0g89s%2
 *       BjFH9YCE8h1szcjLeMRSyfrx8gpeVNrDdR
 *       %0AfyzrZaykEBfFQWLuuEQL%2F%2B8CCVw1ucvDBA
 *       %3D%3D|预订|55000K218607|K2186|SHH
 *       |XNO|SHH|ZZF|11:03|01:00|13:57|Y|6vD4zhsrmcrV
 *       %2Bo1FXE5hTccPAagN6cxZnCvyooyGh0J8XkUvLg8y58RoS1g
 *       %3D|20180122|3|H6|01|18|0|0||||无|||有||无|无|||||10401030|1413|1
 */
public class TicketInfo implements Serializable {

	/** @Fields serialVersionUID: */

	private static final long serialVersionUID = 1L;

	private String randomCode;// 随机code(暂时未知作用)

	private String reserve; // 预定

	private String trainNo;// 火车编号

	private String trainId;// 火车Id

	private String startStation;// 始发站

	private String endStation;// 终点站

	private String departStation;// 出发站点

	private String arriveStation;// 到达站点

	private String departTime;// 出发时间

	private String arriveTime;// 到达时间

	private String takeTime;// 历时

	private String hasTicket;// 是否有票 N/Y

	private String typeCode;// 随机code(暂时未知作用)

	private String ridingDate;// 乘车日期

	private String departSort;// 出发站车序

	private String destinationSort;// 终点站车序(列车总站数)

	private String rw;// 软卧

	private String yw;// 硬卧

	private String rz;// 软座

	private String yz;// 硬座

	private String gjrw;// 高级软卧

	private String edz;// 二等座

	private String ydz;// 一等座

	private String swz; // 商务座/特等座

	private String dw; // 动卧
	
	private String wz;//无座
	
	private String qt;//其他

	public String getQt() {
		return qt;
	}

	public void setQt(String qt) {
		this.qt = qt;
	}

	public String getWz() {
		return wz;
	}

	public void setWz(String wz) {
		this.wz = wz;
	}

	public String getRandomCode() {
		return randomCode;
	}

	public void setRandomCode(String randomCode) {
		this.randomCode = randomCode;
	}

	public String getReserve() {
		return reserve;
	}

	public void setReserve(String reserve) {
		this.reserve = reserve;
	}

	public String getTrainNo() {
		return trainNo;
	}

	public void setTrainNo(String trainNo) {
		this.trainNo = trainNo;
	}

	public String getTrainId() {
		return trainId;
	}

	public void setTrainId(String trainId) {
		this.trainId = trainId;
	}

	public String getStartStation() {
		return startStation;
	}

	public void setStartStation(String startStation) {
		this.startStation = startStation;
	}

	public String getEndStation() {
		return endStation;
	}

	public void setEndStation(String endStation) {
		this.endStation = endStation;
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

	public String getDepartTime() {
		return departTime;
	}

	public void setDepartTime(String departTime) {
		this.departTime = departTime;
	}

	public String getArriveTime() {
		return arriveTime;
	}

	public void setArriveTime(String arriveTime) {
		this.arriveTime = arriveTime;
	}

	public String getTakeTime() {
		return takeTime;
	}

	public void setTakeTime(String takeTime) {
		this.takeTime = takeTime;
	}

	public String getHasTicket() {
		return hasTicket;
	}

	public void setHasTicket(String hasTicket) {
		this.hasTicket = hasTicket;
	}

	public String getTypeCode() {
		return typeCode;
	}

	public void setTypeCode(String typeCode) {
		this.typeCode = typeCode;
	}

	public String getRidingDate() {
		return ridingDate;
	}

	public void setRidingDate(String ridingDate) {
		this.ridingDate = ridingDate;
	}

	public String getDepartSort() {
		return departSort;
	}

	public void setDepartSort(String departSort) {
		this.departSort = departSort;
	}

	public String getDestinationSort() {
		return destinationSort;
	}

	public void setDestinationSort(String destinationSort) {
		this.destinationSort = destinationSort;
	}

	public String getRw() {
		return rw;
	}

	public void setRw(String rw) {
		this.rw = rw;
	}

	public String getYw() {
		return yw;
	}

	public void setYw(String yw) {
		this.yw = yw;
	}

	public String getRz() {
		return rz;
	}

	public void setRz(String rz) {
		this.rz = rz;
	}

	public String getYz() {
		return yz;
	}

	public void setYz(String yz) {
		this.yz = yz;
	}

	public String getGjrw() {
		return gjrw;
	}

	public void setGjrw(String gjrw) {
		this.gjrw = gjrw;
	}

	public String getEdz() {
		return edz;
	}

	public void setEdz(String edz) {
		this.edz = edz;
	}

	public String getYdz() {
		return ydz;
	}

	public void setYdz(String ydz) {
		this.ydz = ydz;
	}

	public String getSwz() {
		return swz;
	}

	public void setSwz(String swz) {
		this.swz = swz;
	}

	public String getDw() {
		return dw;
	}

	public void setDw(String dw) {
		this.dw = dw;
	}

}
