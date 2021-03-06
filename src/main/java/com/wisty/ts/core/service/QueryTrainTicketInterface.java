package com.wisty.ts.core.service;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.text.MessageFormat;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.apache.http.HttpEntity;
import org.apache.http.HttpHeaders;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.wisty.ts.core.bean.BaseResponseEntity;
import com.wisty.ts.core.bean.QueryCondition;
import com.wisty.ts.core.bean.TicketInfo;
import com.wisty.ts.core.bean.TrainTicketResponse;
import com.wisty.ts.core.util.ConvertUtil;
import com.wisty.ts.core.util.CookieUtil;
import com.wisty.ts.core.util.HttpClientUtil;
import com.wisty.ts.core.util.LocalCacheUtil;

/**
 * @Description 12306车票查询接口
 * @author 刘小龙
 * @date 2018年1月22日 上午11:10:55
 * @version V1.3.1
 */
@Service
public class QueryTrainTicketInterface {

	private static Logger logger = LoggerFactory.getLogger(QueryTrainTicketInterface.class);
	
	private static final String TRAIN_TICKET_URL_PATTERN = "https://kyfw.12306.cn/otn/leftTicket/queryZ?leftTicketDTO.train_date={0}&leftTicketDTO.from_station={1}&leftTicketDTO.to_station={2}&purpose_codes={3}";
	
	private static final String REQUSET_HEADER_COOKIE = " _jc_save_wfdc_flag=dc; _jc_save_fromStation={0}; _jc_save_toStation={1}; _jc_save_fromDate={2}; _jc_save_toDate={3};";

	/**
	 * @Description 组装请求URL
	 */
	private static String assembleRequestUrl(QueryCondition condition) {
		String reqUrl = MessageFormat.format(TRAIN_TICKET_URL_PATTERN,
				condition.getDepartDate(),
				LocalCacheUtil.getCode(condition.getDepartStation()),
				LocalCacheUtil.getCode(condition.getArriveStation()),
				condition.getPassengerType());
		logger.info(">>>>>>>>>>>>>余票请求Url:"+reqUrl);
		return reqUrl;
	}

	private static String assembleRequestCookie(QueryCondition condition) {
		String reqCookie = MessageFormat.format(REQUSET_HEADER_COOKIE,
				concatStation(condition.getDepartStation()),
				concatStation(condition.getArriveStation()),
				condition.getDepartDate(), condition.getArriveDate());
		return reqCookie.concat(CookieUtil.get("rail")).concat(CookieUtil.getCookie());
	}

	private static String concatStation(String name) {
		try {
			return URLEncoder.encode(name.concat(",").concat(LocalCacheUtil.getCode(name)),"utf-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return "";
	}

	/**
	 * @Description 组装查询余票请求Header
	 */
	private static Map<String, String> httpHeaderMap(QueryCondition condition) {
		Map<String, String> headerMap = new HashMap<String, String>();
		headerMap.put(HttpHeaders.ACCEPT,"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8");
		headerMap.put(HttpHeaders.ACCEPT_ENCODING, "gzip, deflate, sdch, br");
		headerMap.put(HttpHeaders.ACCEPT_LANGUAGE, "zh-CN,zh;q=0.8");
		headerMap.put(HttpHeaders.CACHE_CONTROL, "max-age=0");
		headerMap.put(HttpHeaders.CONNECTION, "keep-alive");
		headerMap.put(HttpHeaders.HOST, "kyfw.12306.cn");
		headerMap.put("Cookie", assembleRequestCookie(condition));
		logger.info(">>>>>>>>>>>>>>>>>余票请求Cookie:"+assembleRequestCookie(condition));
		return headerMap;
	}

	/**
	 * @throws IOException
	 * @throws ClientProtocolException
	 * @Description 发起HTTP请求火车票数据
	 */
	public LinkedList<TicketInfo> getTrainTicket(QueryCondition condition)
			throws ClientProtocolException, IOException {
		LinkedList<TicketInfo> tickets = new LinkedList<TicketInfo>();
		// 获取查询响应数据
		String reqUrl = assembleRequestUrl(condition);
		String resDataStr = HttpClientUtil.doGet(reqUrl,httpHeaderMap(condition));
		logger.info(">>>>>>>>>>>>>余票请求响应数据:="+resDataStr);
		BaseResponseEntity<TrainTicketResponse> response = new Gson().fromJson(
				resDataStr,
				new TypeToken<BaseResponseEntity<TrainTicketResponse>>() {
				}.getType());
		if (!response.getStatus()) {
			return tickets;
		}
		// 查询火车票
		List<String> ticketStrArr = response.getData().getResult();
		if (ticketStrArr.isEmpty()) {
			return tickets;
		}
		for (String ticketStr : ticketStrArr) {
			tickets.add(ConvertUtil.convertStr2Entity(ticketStr));
		}
		return tickets;
	}

	
	public static void main(String[] args){
		Map<String, String> headerMap = new HashMap<String, String>();
		headerMap.put(HttpHeaders.ACCEPT,"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8");
		headerMap.put(HttpHeaders.ACCEPT_ENCODING, "gzip, deflate, sdch, br");
		headerMap.put(HttpHeaders.ACCEPT_LANGUAGE, "zh-CN,zh;q=0.8");
		headerMap.put(HttpHeaders.CACHE_CONTROL, "max-age=0");
		headerMap.put(HttpHeaders.CONNECTION, "keep-alive");
		headerMap.put(HttpHeaders.HOST, "kyfw.12306.cn");
		headerMap.put("Cookie","_jc_save_wfdc_flag=dc; _jc_save_fromStation=北京,BJP; _jc_save_toStation=上海,SHH; _jc_save_fromDate=2018-01-24; _jc_save_toDate=2018-01-24;RAIL_EXPIRATION=1517068126772; RAIL_DEVICEID=Eu0A1ZLXoRdkbqvxBUExag6UWALyOl4ZnjvEXJEiNe15cOK7ZLjRiJX5fSDH4xHjh2D0jnyFkq6xx8dsVcVgvf63L-Wn95uoutFkdE3n63qxAJS3LSEV2UfJr29ddWGFWdjKbPzdYx3rQOlsVOeoQnXqCUxtsweo;route=6f50b51faa11b987e576cdb301e545c4;JSESSIONID=168B4EA6F2CD400704C8FB206A5B6258;BIGipServerotn=2664890634.50210.0000;");
		CloseableHttpClient client = HttpClientBuilder.create().build();
		HttpGet httpGet = new HttpGet("https://kyfw.12306.cn/otn/leftTicket/queryZ?leftTicketDTO.train_date=2018-01-24&leftTicketDTO.from_station=BJP&leftTicketDTO.to_station=SHH&purpose_codes=ADULT");
		for (Map.Entry<String, String> param : headerMap.entrySet()) {
			httpGet.addHeader(param.getKey(), param.getValue());
		}
		try {
			CloseableHttpResponse response = client.execute(httpGet);
			if (response != null) {
				HttpEntity resEntity = response.getEntity();
				if (resEntity != null) {
					System.out.println(EntityUtils.toString(resEntity, "UTF-8"));
					EntityUtils.consume(resEntity);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
}
