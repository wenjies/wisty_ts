package com.wisty.ts.core.service;

import java.io.IOException;
import java.text.MessageFormat;
import java.util.LinkedList;
import java.util.List;

import org.apache.http.client.ClientProtocolException;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.wisty.ts.core.bean.BaseResponseEntity;
import com.wisty.ts.core.bean.QueryCondition;
import com.wisty.ts.core.bean.TicketInfo;
import com.wisty.ts.core.bean.TrainTicketResponse;
import com.wisty.ts.core.util.ConvertUtil;
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

	private static final String TRAIN_TICKET_URL_PATTERN = "https://kyfw.12306.cn/otn/leftTicket/queryZ?leftTicketDTO.train_date={0}&leftTicketDTO.from_station={1}&leftTicketDTO.to_station={2}&purpose_codes={3}";

	/**
	 * @Description 组装请求URL
	 */
	private static String assembleRequestUrl(QueryCondition condition) {
		String reqUrl = MessageFormat.format(TRAIN_TICKET_URL_PATTERN,
				condition.getDepartDate(), LocalCacheUtil.getCode(condition.getDepartStation()),
				LocalCacheUtil.getCode(condition.getArriveStation()), condition.getPassengerType());
		return reqUrl;

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
		String reqUrl=assembleRequestUrl(condition);
		System.out.println("请求Url:"+reqUrl);
		String resDataStr = HttpClientUtil.doGet(reqUrl);
		System.out.println("响应数据2:"+resDataStr);
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

}
