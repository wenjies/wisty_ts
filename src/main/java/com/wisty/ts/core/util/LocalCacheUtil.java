package com.wisty.ts.core.util;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.wisty.ts.core.bean.Station;

/** 
 * @ClassName: LocalCacheUtil 
 * @Description: 本地缓存
 * @author: Wisty
 * @date: 2018年1月22日 下午10:43:09  
 */
public class LocalCacheUtil {

	private static Map<String,String> localMap=new HashMap<String, String>();
	
	public static void cacheMap(List<Station> list){
		for (Station station : list) {
			localMap.put(station.getCode(), station.getName());
		}
	}
	
	public static String getName(String code){
		return localMap.get(code);
	}
}
