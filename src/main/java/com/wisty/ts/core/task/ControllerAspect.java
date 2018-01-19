package com.wisty.ts.core.task;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.google.gson.Gson;

/** 
 * @Description  监控接口响应时间
 * @author 刘小龙
 * @date 2017年3月16日 下午2:04:12 
 * @version V1.3.1
 */ 
  	
@Aspect
@Component
public class ControllerAspect {

	private final static Log log = LogFactory.getLog(ControllerAspect.class);
	
	ThreadLocal<Long> startTime = new ThreadLocal<Long>();
		
	//配置环绕通知,使用在方法aspect()上注册的切入点
	@Around("execution(* com.wisty.ts.core.controller..*.*(..))")
	public Object around(ProceedingJoinPoint joinPoint) throws Throwable{
		Object result = null;
		//开始响应时间
		startTime.set(System.currentTimeMillis());
		// 接收到请求，记录请求内容
		log.info("---------------BEGIN REQUEST-------------");
		ServletRequestAttributes  attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();
        // 记录下请求内容
         log.info("REQUEST URL : " + request.getRequestURL().toString());
         log.info("HTTP_METHOD : " + request.getMethod());
         log.info("IP : " + request.getRemoteAddr());
         log.info("CLASS_METHOD : " + joinPoint.getSignature().getDeclaringTypeName() + "." + joinPoint.getSignature().getName());
         Object[] objects=joinPoint.getArgs();
         if (objects.length>0) {
        	 
		}
        result=joinPoint.proceed();
		log.info("RESPONSE DATA："+new Gson().toJson(result));
		log.info("RESPONSE TIME : " + (System.currentTimeMillis() - startTime.get())+" ms!");
		log.info("---------------END REQUEST-------------");
		return result;
	}
	
}