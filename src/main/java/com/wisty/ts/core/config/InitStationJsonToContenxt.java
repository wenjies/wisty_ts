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

	public static String logdevice = "https://kyfw.12306.cn/otn/HttpZF/logdevice?algID=TUXOYiuLNK&hashCode=YKgUMa0p5ocOKv6YOsZDjU26V_vpm6C8mlFyOx3KP18&FMQw=0&q4f3=zh-CN&VySQ=FGH_JEzty7enqLSTP9aMhmsjuL-uL7ry&VPIf=1&custID=133&VEek=unknown&dzuS=0&yD16=0&EOQP=2e3118d565c7ff7fc669ee0fea13ce9b&lEnu=2886735483&jp76=e237f9703f53d448d77c858b634154a5&hAqN=Win32&platform=WEB&ks0Q=b9a555dce60346a48de933b3e16ebd6e&TeRS=1080x1846&tOHY=24xx1080x1920&Fvje=i1l1o1s1&q5aJ=-8&wNLf=99115dfb07133750ba677d055874de87&0aew=Mozilla/5.0%20(Windows%20NT%2010.0;%20WOW64)%20AppleWebKit/537.36%20(KHTML,%20like%20Gecko)%20Chrome/63.0.3239.84%20Safari/537.36&E3gR=0031633d73b53a68accf673375fd1ce0&timestamp="+System.currentTimeMillis();

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
		// 1.初始化获取Cookie---->JSESSIONID=E0ABA45EF0FB58C8759FC7052B157D28;route=495c805987d0f5c8c84b14f60212447d;BIGipServerotn=1156055306.64545.0000
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
		String devideStr = HttpClientUtil.doGet(logdevice, headerMap);
		Matcher mStr = Pattern.compile("\'(.*?)\'").matcher(devideStr);
		while (mStr.find()) {
			JSONObject obj=JSON.parseObject(mStr.group(1));
			String authUrl="RAIL_EXPIRATION={0}; RAIL_DEVICEID={1};";
			CookieUtil.push("rail", MessageFormat.format(authUrl, obj.get("exp").toString(),obj.get("dfp").toString()));
			logger.info("--------------------rail:" + MessageFormat.format(authUrl, obj.get("exp").toString(),obj.get("dfp").toString()));
		}
		logger.info("-----------------------初始化12306网站cookie End------------------");
	}

}
