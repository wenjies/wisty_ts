package com.wisty.ts.core;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;

import com.wisty.ts.core.config.InitStationJsonToContenxt;

/**
 * @Description 程序入口
 * @author 刘小龙
 * @date 2018年1月19日 下午5:01:56
 * @version V1.3.1
 */
@SpringBootApplication
public class Application extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication springApplication = new SpringApplication(Application.class);
        springApplication.addListeners(new InitStationJsonToContenxt());
        springApplication.run(args);
	}

	@Override
	protected SpringApplicationBuilder configure(
			SpringApplicationBuilder application) {
		return application.sources(Application.class);
	}
}
