package com.wisty.ts.core.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import com.wisty.ts.core.bean.QueryCondition;

/** 
 * @Description Demo
 * @author 刘小龙
 * @date 2017年5月16日 下午4:27:58 
 * @version V1.3.1
 */ 
@Controller
@RequestMapping(value = "/demo")  	
public class DemoController{
	
	/** 
	 * @Description 系统用户登陆
	 */
	@GetMapping(value = "helloWorld") 	
	public String Demo(@ModelAttribute QueryCondition condition,Model model){
		model.addAttribute("Wisty", "Wisty_ts Begin");
		return "helloWorld";
	}
	
}
