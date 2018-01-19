package com.wisty.ts.core.util;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.http.HttpEntity;
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
				Entry<String, String> elem = (Entry<String, String>) iterator.next();
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
	public static String doGet(String url) throws ClientProtocolException, IOException {
		CloseableHttpClient client = HttpClientBuilder.create().build();
		HttpGet httpGet = new HttpGet(url);
		String result = "";
		CloseableHttpResponse response = client.execute(httpGet);
		if (response != null) {
			HttpEntity resEntity = response.getEntity();
			if (resEntity != null) {
				result = EntityUtils.toString(resEntity, CHART_SET);
				EntityUtils.consume(resEntity);
			}
		}
		return result;
	}
}
