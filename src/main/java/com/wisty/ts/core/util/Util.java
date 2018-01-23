package com.wisty.ts.core.util;

import java.io.IOException;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.HashMap;
import java.util.Map;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

import org.apache.http.HttpEntity;
import org.apache.http.HttpHeaders;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.entity.BufferedHttpEntity;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

public class Util {

	private static HttpClient client = HttpClients.custom()
			.setSSLContext(getInstance())
			.setSSLHostnameVerifier(new TrustAnyHostnameVerifier()).build();

	private static class TrustAnyHostnameVerifier implements HostnameVerifier {
		private TrustAnyHostnameVerifier() {
		}

		public boolean verify(String hostname, SSLSession session) {
			return true;
		}
	}

	private static class TrustAllManager implements X509TrustManager {

		@Override
		public void checkClientTrusted(X509Certificate[] chain, String authType)
				throws CertificateException {
		}

		@Override
		public void checkServerTrusted(X509Certificate[] chain, String authType)

		throws CertificateException {
		}

		@Override
		public X509Certificate[] getAcceptedIssuers() {
			return null;
		}

	}

	private static SSLContext getInstance() {
		SSLContext sc = null;
		try {
			sc = SSLContext.getInstance("SSL");
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		try {
			sc.init(null, new TrustManager[] { new TrustAllManager() },
					new SecureRandom());

		} catch (KeyManagementException e) {
			e.printStackTrace();
		}
		return sc;
	}
	
	 public static void sendHttpGet(String httpUrl, Map<String, String> headers) {
	      HttpGet httpGet = new HttpGet(httpUrl);
	      httpGet.addHeader(HttpHeaders.ACCEPT, "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8");
	      httpGet.addHeader(HttpHeaders.ACCEPT_ENCODING, "gzip, deflate, sdch, br");
	      httpGet.addHeader(HttpHeaders.ACCEPT_LANGUAGE, "zh-CN,zh;q=0.8");
	      httpGet.addHeader(HttpHeaders.CACHE_CONTROL, "max-age=0");
	      httpGet.addHeader(HttpHeaders.CONNECTION, "keep-alive");
	      httpGet.addHeader(HttpHeaders.HOST, "kyfw.12306.cn");
	      httpGet.addHeader("Cookie", "JSESSIONID=3273405C6B5E2E7408D86E19DFDFB915; route=6f50b51faa11b987e576cdb301e545c4; BIGipServerotn=4090953994.50210.0000;");
	      if (headers != null) {
	          for (Map.Entry<String, String> param : headers.entrySet()) {
	              httpGet.addHeader(param.getKey(), param.getValue());
	          }
	      }
	      try {
	          HttpResponse execute = client.execute(httpGet);
	          HttpEntity entity = execute.getEntity();
	          BufferedHttpEntity bufferedHttpEntity = new BufferedHttpEntity(entity);
	          String s = EntityUtils.toString(bufferedHttpEntity,"utf-8");
	          System.out.println(s);
	      } catch (IOException e) {
	          e.printStackTrace();
	      }
	  }
	 
	 public static void main(String[] args) {
		 sendHttpGet("https://kyfw.12306.cn/otn/leftTicket/queryZ?leftTicketDTO.train_date=2018-02-09&leftTicketDTO.from_station=XMS&leftTicketDTO.to_station=BJP&purpose_codes=ADULT",new HashMap<String, String>());
	}
}
