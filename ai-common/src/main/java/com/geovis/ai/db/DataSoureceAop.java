package com.geovis.ai.db;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.Signature;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.annotation.Order;

import java.lang.reflect.Method;

/**
 * aop切换数据源
 * @order 表面多个aop的执行顺序，数字越小越先执行
 */
@Aspect
@Order(1)
public class DataSoureceAop {

	private static Logger _log = LoggerFactory.getLogger(DataSoureceAop.class);

	// 开始时间
	private long startTime = 0L;
	// 结束时间
	private long endTime = 0L;

	@Before("execution(* com.geovis.ai.*.impl..*Impl.*(..)) || execution(* com.geovis.ai.base..*Impl.*(..))")
	public void doBeforeInServiceLayer(JoinPoint joinPoint) {
		_log.debug("doBeforeInServiceLayer");
		Signature signature = joinPoint.getSignature();
		MethodSignature methodSignature = (MethodSignature) signature;
		Method method = methodSignature.getMethod();
		String methodName = method.getName();
		
		if(methodName.startsWith("update") || methodName.startsWith("add")
				|| methodName.startsWith("save") || methodName.startsWith("insert")
				|| methodName.startsWith("del") || methodName.startsWith("modify")
				|| methodName.startsWith("edit") || methodName.startsWith("send")){
			DynamicDataSource.setDataSource(DataSourceEnum.MASTER.getDefault());
		}else{
			DynamicDataSource.setDataSource(RandomSlave.getRandomSlave());
		}
	}

	@After("execution(* com.geovis.ai.*.impl..*Impl.*(..)) || execution(* com.geovis.ai.base..*Impl.*(..))")
	public void doAfterInServiceLayer(JoinPoint joinPoint) {
		_log.debug("doAfterInServiceLayer");
		DynamicDataSource.clearDataSource();
	}

	

}
