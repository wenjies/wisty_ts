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

	private static Map<String, String> localMap = new HashMap<String, String>();

	public static void cacheMap(List<Station> list) {
		for (Station station : list) {
			localMap.put(station.getName(), station.getCode());
		}
	}

	public static String getCode(String name) {
		return localMap.get(name);
	}

	public static String getName(String code) {
		String key = "";
		for (Map.Entry<String, String> entry : localMap.entrySet()) {
			if (code.equals(entry.getValue())) {
				key = entry.getKey();
			}
		}
		return key;
	}
}
