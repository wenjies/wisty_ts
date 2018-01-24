package com.wisty.ts.core.config;

import java.io.File;
import java.io.IOException;
import java.text.MessageFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.io.FileUtils;
import org.apache.http.Header;
import org.apache.http.HttpHeaders;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.util.ResourceUtils;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.wisty.ts.core.bean.Station;
import com.wisty.ts.core.util.CookieUtil;
import com.wisty.ts.core.util.HttpClientUtil;
import com.wisty.ts.core.util.LocalCacheUtil;

/**
 * @ClassName: InitStationJsonToContenxt
 * @Description: 容器初始化后将车站点Json数据加载到容器内存中
 * @author: Wisty
 * @date: 2018年1月22日 下午10:10:59
 */
public class InitStationJsonToContenxt implements
		ApplicationListener<ContextRefreshedEvent> {

	private static Logger logger = LoggerFactory
			.getLogger(InitStationJsonToContenxt.class);

	public static String initUrl = "https://kyfw.12306.cn/otn/leftTicket/init";

	public static String GetJs = "https://kyfw.12306.cn/otn/HttpZF/GetJS";

	public static String logdevice = "https://kyfw.12306.cn/otn/HttpZF/logdevice?algID={0}&hashCode={1}";

	@Override
	public void onApplicationEvent(ContextRefreshedEvent arg0) {
		logger.info("-----------------------初始化加载Json数据------------------");
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
		logger.info("-----------------------初始化12306网站cookie Begin------------------");
		// 1.初始化获取Cookie---->JSESSIONID=E0ABA45EF0FB58C8759FC7052B157D28;
		// route=495c805987d0f5c8c84b14f60212447d;
		// BIGipServerotn=1156055306.64545.0000
		CloseableHttpClient client = HttpClientBuilder.create().build();
		HttpGet httpGet = new HttpGet(initUrl);
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
		logger.info("-----------------------Cookie:" + CookieUtil.getCookie());
		// 2.请求GetJs获取服务器返回的algID
		Map<String, String> headerMap = new HashMap<String, String>();
		headerMap.put(HttpHeaders.ACCEPT, "*/*");
		headerMap.put(HttpHeaders.ACCEPT_ENCODING, "gzip, deflate, br");
		headerMap.put(HttpHeaders.ACCEPT_LANGUAGE, "zh-CN,zh;q=0.9");
		headerMap.put(HttpHeaders.CONNECTION, "keep-alive");
		headerMap.put(HttpHeaders.HOST, "kyfw.12306.cn");
		headerMap.put(HttpHeaders.REFERER, initUrl);
		headerMap.put("Cookie", CookieUtil.getCookie());
		String getJs = HttpClientUtil.doGet(GetJs, headerMap);
		Pattern p = Pattern.compile("algID(.*?)hashCode");
		Matcher m = p.matcher(getJs);
		while (m.find()) {
			String algID = m.group(1).replace("\\x3d", "").replace("\\x26", "");
			logger.info("--------------------algID:" + algID);
			// 3.根据algID换取Cookie中的RAIL_EXPIRATION RAIL_DEVICEID
			String devideUrl = MessageFormat.format(logdevice, algID, UUID.randomUUID().toString());
			logger.info("--------------------devideUrl:" + devideUrl);
			String devideStr = HttpClientUtil.doGet(devideUrl, headerMap);
			Matcher mStr = Pattern.compile("\'(.*?)\'").matcher(devideStr);
			while (mStr.find()) {
				JSONObject obj=JSON.parseObject(mStr.group(1));
				String authUrl="RAIL_EXPIRATION={0}; RAIL_DEVICEID={1};";
				CookieUtil.push("rail", MessageFormat.format(authUrl, obj.get("exp").toString(),obj.get("dfp").toString()));
				logger.info("--------------------rail:" + MessageFormat.format(authUrl, obj.get("exp").toString(),obj.get("dfp").toString()));
			}
		}
		logger.info("-----------------------初始化12306网站cookie End------------------");
	}

}
