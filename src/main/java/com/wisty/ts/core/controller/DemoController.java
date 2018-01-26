package com.wisty.ts.core.controller;

import java.io.IOException;
import java.util.LinkedList;

import org.apache.http.client.ClientProtocolException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.wisty.ts.core.bean.QueryCondition;
import com.wisty.ts.core.bean.TicketInfo;
import com.wisty.ts.core.service.QueryTrainTicketInterface;
import com.wisty.ts.core.tool.BaseRes;

/**
 * @Description Demo
 * @author 刘小龙
 * @date 2017年5月16日 下午4:27:58
 * @version V1.3.1
 */
@Controller
@RequestMapping(value = "/wisty_ts")
public class DemoController {

	@Autowired
	private QueryTrainTicketInterface queryTrainTicketInterface;

	/**
	 * @Description 车票查询首页
	 */
	@RequestMapping(value = "index")
	public String index() {
		return "index";
	}

	@ResponseBody
	@RequestMapping(value = "reload")
	public String reload(@ModelAttribute QueryCondition condition){
		LinkedList<TicketInfo> tickets = new LinkedList<TicketInfo>();
		if (condition.getPassengerType()==null) {
			return new Gson().toJson(BaseRes.success(tickets));
		}
		try {
			tickets = queryTrainTicketInterface.getTrainTicket(condition);
		} catch (ClientProtocolException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return new Gson().toJson(BaseRes.success(tickets));
	}
	
}
