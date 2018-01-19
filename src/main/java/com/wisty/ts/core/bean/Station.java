package com.wisty.ts.core.bean;

import java.io.Serializable;

/**
 * @Description 12306火车站点
 * @author 刘小龙
 * @date 2018年1月19日 下午5:42:22
 * @version V1.3.1
 * @desc "bjb|北京北|VAP|beijingbei|bjb|0"
 */
public class Station implements Serializable {

	/** @Fields serialVersionUID: */

	private static final long serialVersionUID = 1L;

	private String shortSpellOne;// 简拼一

	private String name;// 站点名字

	private String code;// 站点code

	private String spell;// 拼音

	private String shortSpellTwo;// 简拼二

	private Integer order;// 序号

	public String getShortSpellOne() {
		return shortSpellOne;
	}

	public void setShortSpellOne(String shortSpellOne) {
		this.shortSpellOne = shortSpellOne;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getSpell() {
		return spell;
	}

	public void setSpell(String spell) {
		this.spell = spell;
	}

	public String getShortSpellTwo() {
		return shortSpellTwo;
	}

	public void setShortSpellTwo(String shortSpellTwo) {
		this.shortSpellTwo = shortSpellTwo;
	}

	public Integer getOrder() {
		return order;
	}

	public void setOrder(Integer order) {
		this.order = order;
	}

}
