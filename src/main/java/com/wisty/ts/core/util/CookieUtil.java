package com.wisty.ts.core.util;

import java.util.HashMap;
import java.util.Map;

/**
 * @ClassName: CookieUtil
 * @Description: 12306请求cookie管理类
 * @author: Wisty
 * @date: 2018年1月23日 下午8:39:34
 */
public class CookieUtil {

	private static Map<String, String> cookieMap = new HashMap<String, String>();
	
	public static void initCookie(String cookie) {
		cookieMap.put("Cookie", cookie);
	}

	public static String getCookie() {
		if (cookieMap.isEmpty()) {
			return "";
		}
		return cookieMap.get("Cookie");
	}
	
	public static void push(String key,String value){
		cookieMap.put(key,value);
	}
	
	public static String get(String key){
		if (cookieMap.isEmpty()) {
			return "";
		}
		return cookieMap.get(key);
	}
}
