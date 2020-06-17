package com.geovis.ai.constants;

public enum HttpMethod {
	POST("post"), GET("get");

	private String method;

	private HttpMethod(String method) {
		this.method = method;
	}

	public boolean is(String method) {
		return this.method.equalsIgnoreCase(method);
	}
	
	
}