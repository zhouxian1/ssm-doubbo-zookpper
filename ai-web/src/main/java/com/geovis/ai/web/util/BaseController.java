package com.geovis.ai.web.util;

import org.apache.shiro.authz.UnauthorizedException;
import org.apache.shiro.session.InvalidSessionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.InitBinder;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 控制器基类
 */
public  class BaseController {

	private final static Logger _log = LoggerFactory.getLogger(BaseController.class);
	/*
	@Autowired
	private UserService userService;*/

	/**
	 * 统一异常处理
	 * @param request
	 * @param response
	 * @param exception
	 */
	@ExceptionHandler
	public String exceptionHandler(HttpServletRequest request, HttpServletResponse response, Exception exception) {
		_log.error("统一异常处理：", exception);
		request.setAttribute("ex", exception);
		if (null != request.getHeader("X-Requested-With") && request.getHeader("X-Requested-With").equalsIgnoreCase("XMLHttpRequest")) {
			request.setAttribute("requestHeader", "ajax");
		}
		// shiro没有权限异常
		if (exception instanceof UnauthorizedException) {
			return "redirect:/error/403";
		}
		// shiro会话已过期异常
		if (exception instanceof InvalidSessionException) {
			return "redirect:/error/fail";
		}
		return "redirect:/error/500";
	}
	
	@InitBinder
	protected void initBinder(WebDataBinder  binder) throws Exception {
		binder.registerCustomEditor(Date.class, new DateEditor());
	}


}
