package com.wisty.ts.core.config;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.apache.commons.io.FileUtils;
import org.apache.http.Header;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.util.ResourceUtils;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.wisty.ts.core.bean.Station;
import com.wisty.ts.core.util.CookieUtil;
import com.wisty.ts.core.util.LocalCacheUtil;

/**
 * @ClassName: InitStationJsonToContenxt
 * @Description: 容器初始化后将车站点Json数据加载到容器内存中
 * @author: Wisty
 * @date: 2018年1月22日 下午10:10:59
 */
public class InitStationJsonToContenxt implements
		ApplicationListener<ContextRefreshedEvent> {

	@Override
	public void onApplicationEvent(ContextRefreshedEvent arg0) {
		System.out.println("----------初始化加载Json数据----------");
		try {
			File jsonFile = ResourceUtils.getFile("classpath:station.json");
			String json = FileUtils.readFileToString(jsonFile);
			List<Station> stations = new Gson().fromJson(json,
					new TypeToken<List<Station>>() {
					}.getType());
			LocalCacheUtil.cacheMap(stations);
		} catch (IOException e) {
			e.printStackTrace();
		}

		System.out.println("--------------初始化12306网站cookie----------------");
		CloseableHttpClient client = HttpClientBuilder.create().build();
		HttpGet httpGet = new HttpGet("https://kyfw.12306.cn/otn/leftTicket/init");
		try {
			CloseableHttpResponse response = client.execute(httpGet);
			Header[] headers = response.getHeaders("Set-Cookie");
			StringBuffer sb = new StringBuffer();
			for (Header header : headers) {
				sb.append(header.getValue().split(" ")[0]);
			}
			CookieUtil.initCookie(sb.toString());
		} catch (ClientProtocolException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		CookieUtil.getCookie();
	}

}
