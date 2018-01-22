package com.wisty.ts.core.controller;

import java.io.IOException;
import java.util.LinkedList;

import org.apache.http.client.ClientProtocolException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import com.wisty.ts.core.bean.QueryCondition;
import com.wisty.ts.core.bean.TicketInfo;
import com.wisty.ts.core.service.QueryTrainTicketInterface;

/** 
 * @Description Demo
 * @author 刘小龙
 * @date 2017年5月16日 下午4:27:58 
 * @version V1.3.1
 */ 
@Controller
@RequestMapping(value = "/demo")  	
public class DemoController{
	
	@Autowired
	private QueryTrainTicketInterface queryTrainTicketInterface;
	
	/** 
	 * @Description 系统用户登陆
	 */
	@RequestMapping(value = "helloWorld") 	
	public String Demo(@ModelAttribute QueryCondition condition,Model model){
		LinkedList<TicketInfo> tickets=new LinkedList<TicketInfo>();
		try {
			tickets=queryTrainTicketInterface.getTrainTicket(condition);
		} catch (ClientProtocolException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		model.addAttribute("tickets", tickets);
		return "helloWorld";
	}
	
}
