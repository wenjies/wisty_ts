package com.wisty.ts.core.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.wisty.ts.core.service.QueryTrainTicketInterface;

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
//		LinkedList<TicketInfo> tickets = new LinkedList<TicketInfo>();
//		try {
//			tickets = queryTrainTicketInterface.getTrainTicket(condition);
//		} catch (ClientProtocolException e) {
//			e.printStackTrace();
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//		model.addAttribute("tickets", tickets);
		return "index";
	}

}
