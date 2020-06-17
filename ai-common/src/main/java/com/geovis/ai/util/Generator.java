package com.geovis.ai.util;


/**
 * 代码生成类
 * 
 */
public class Generator {

	// 根据命名规范，只修改此常量值即可
	//表名，也可以只是一系列表的前缀名
	private static String TABLE_NAME = "work_order";
	//模块名
	private static String MODULE_NAME = "report";
	// 项目名称
	private static String PROJECT_NAME  = "exp";
	private static String JDBC_DRIVER = PropertiesFileUtil.getInstance("generator").get("generator.jdbc.driver");
	private static String JDBC_URL = PropertiesFileUtil.getInstance("generator").get("generator.jdbc.url");
	private static String JDBC_USERNAME = PropertiesFileUtil.getInstance("generator").get("generator.jdbc.username");
	private static String JDBC_PASSWORD = PropertiesFileUtil.getInstance("generator").get("generator.jdbc.password");

	/**
	 * 自动代码生成
	 * @param args
	 * @throws Exception 
	 */
	public static void main(String[] args) throws Exception {
		MybatisGeneratorUtil.generator(JDBC_DRIVER, JDBC_URL, JDBC_USERNAME, JDBC_PASSWORD,PROJECT_NAME, MODULE_NAME , TABLE_NAME);
	}

}
