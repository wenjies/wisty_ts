package com.wisty.ts.core.util;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.HttpHeaders;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

/**
 * @Description HttpUtil工具类
 * @author 刘小龙
 * @date 2017年4月26日 下午3:17:44
 * @version V1.3.1
 */

public class HttpClientUtil {

	public final static String CHART_SET = "UTF-8";

	/**
	 * @throws IOException
	 * @throws ClientProtocolException
	 * @Description http POST请求
	 */
	public static String doPost(String url, Map<String, String> map)
			throws ClientProtocolException, IOException {
		CloseableHttpClient client = HttpClientBuilder.create().build();
		HttpPost httpPost = new HttpPost(url);
		String result = "";
		// 设置参数
		List<NameValuePair> list = new ArrayList<NameValuePair>();
		if (!map.isEmpty()) {
			Iterator<?> iterator = map.entrySet().iterator();
			while (iterator.hasNext()) {
				Entry<String, String> elem = (Entry<String, String>) iterator
						.next();
				list.add(new BasicNameValuePair(elem.getKey(), elem.getValue()));
			}
		}
		CloseableHttpResponse response = client.execute(httpPost);
		httpPost.setEntity(new UrlEncodedFormEntity(list, CHART_SET));
		if (response != null) {
			HttpEntity resEntity = response.getEntity();
			if (resEntity != null) {
				result = EntityUtils.toString(resEntity, CHART_SET);
				EntityUtils.consume(resEntity);
			}
		}
		return result;
	}

	/**
	 * @throws IOException
	 * @throws ClientProtocolException
	 * @Description http Get请求
	 */
	public static String doGet(String url) {
		String result = "";
		try {
			CloseableHttpClient client = HttpClientBuilder.create().build();
			HttpGet httpGet = new HttpGet(url);
			CloseableHttpResponse response = client.execute(httpGet);
			if (response != null) {
				HttpEntity resEntity = response.getEntity();
				if (resEntity != null) {
					result = EntityUtils.toString(resEntity, CHART_SET);
					EntityUtils.consume(resEntity);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	public static String doGet(String url, Map<String, String> headers) {
		String result = "";
		CloseableHttpClient client = HttpClientBuilder.create().build();
		HttpGet httpGet = new HttpGet(url);
		httpGet.addHeader(HttpHeaders.ACCEPT,"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8");
		httpGet.addHeader(HttpHeaders.ACCEPT_ENCODING,"gzip, deflate, sdch, br");
		httpGet.addHeader(HttpHeaders.ACCEPT_LANGUAGE, "zh-CN,zh;q=0.8");
		httpGet.addHeader(HttpHeaders.CACHE_CONTROL, "max-age=0");
		httpGet.addHeader(HttpHeaders.CONNECTION, "keep-alive");
		httpGet.addHeader(HttpHeaders.HOST, "kyfw.12306.cn");
		httpGet.addHeader("Cookie","JSESSIONID=3273405C6B5E2E7408D86E19DFDFB915; route=6f50b51faa11b987e576cdb301e545c4; BIGipServerotn=4090953994.50210.0000;");
		if (headers != null) {
			for (Map.Entry<String, String> param : headers.entrySet()) {
				httpGet.addHeader(param.getKey(), param.getValue());
			}
		}
		try {
			CloseableHttpResponse response = client.execute(httpGet);
			if (response != null) {
				HttpEntity resEntity = response.getEntity();
				if (resEntity != null) {
					result = EntityUtils.toString(resEntity, CHART_SET);
					EntityUtils.consume(resEntity);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	public static void main(String[] args) throws ClientProtocolException, IOException {
		CloseableHttpClient client = HttpClientBuilder.create().build();
		HttpGet httpGet = new HttpGet("https://kyfw.12306.cn/otn/leftTicket/init");
		CloseableHttpResponse response = client.execute(httpGet);
		Header[] headers=response.getAllHeaders();
		for (Header header : headers) {
			System.out.println(header.getName()+":"+header.getValue());
		}
	}
	
}
