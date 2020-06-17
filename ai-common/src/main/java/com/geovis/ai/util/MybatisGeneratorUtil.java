package com.geovis.ai.util;

import org.apache.commons.lang.ObjectUtils;
import org.apache.velocity.VelocityContext;
import org.mybatis.generator.api.MyBatisGenerator;
import org.mybatis.generator.config.Configuration;
import org.mybatis.generator.config.xml.ConfigurationParser;
import org.mybatis.generator.internal.DefaultShellCallback;


import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 代码生成类
 */
public class MybatisGeneratorUtil {

	// generatorConfig模板路径
	private static String generatorConfig_vm = "/src/main/resources/template/generatorConfig.vm";
	// Service模板路径
	private static String service_vm = "/src/main/resources/template/Service.vm";
	// ServiceMock模板路径
	private static String serviceMock_vm = "/src/main/resources/template/ServiceMock.vm";
	// ServiceImpl模板路径
	private static String serviceImpl_vm = "/src/main/resources/template/ServiceImpl.vm";

	
	// 数据库名称
	private static String DATABASE_NAME = "springwind";

	/**
	 * 根据模板生成generatorConfig.xml文件
	 * @param module_prefix_name
	 * @throws Exception 
	 */
	public static void generator(
			String jdbc_driver,
			String jdbc_url,
			String jdbc_username,
			String jdbc_password,
			String project_name,
			String module_name,
			String table_name) throws Exception {
		//获取项目路径
		String projectPath = System.getProperty("user.dir");
		projectPath = projectPath.replace('\\', '/');
		System.out.println(projectPath);
		
		String module_path = projectPath + "/src/main/resources/generatorConfig.xml";
		String sql = "SELECT table_name FROM INFORMATION_SCHEMA.TABLES WHERE table_schema = '" + DATABASE_NAME + "' AND table_name LIKE '" + table_name.replaceAll("\\.", "_") + "%';";
		System.out.println("========== 开始生成generatorConfig.xml文件 ==========");
		List<Map<String, Object>> tables = new ArrayList<>();
		try {
			VelocityContext context= new VelocityContext();
			
			Map<String, Object> table = null;

			// 查询定制前缀项目的所有表
			JdbcUtil jdbcUtil = new JdbcUtil(jdbc_driver, jdbc_url, jdbc_username, jdbc_password);
			List<Map> result = jdbcUtil.selectByParams(sql, null);
			for (Map map : result) {
				System.out.println(map.get("TABLE_NAME"));
				table = new HashMap<>();
				table.put("table_name", map.get("TABLE_NAME"));
				table.put("model_name", StringUtil.lineToHump(ObjectUtils.toString(map.get("TABLE_NAME"))));
				tables.add(table);
			}
			jdbcUtil.release();

			String targetProject = projectPath + "/src/test/java";
			context.put("tables", tables);
			context.put("generator_javaModelGenerator_targetPackage", "com." + project_name + "." + module_name + ".model");
			context.put("generator_sqlMapGenerator_targetPackage", "com." + project_name + "." + module_name + ".dao");
			context.put("generator_javaClientGenerator_targetPackage", "com." + project_name + "." + module_name + ".dao");
			context.put("model_targetProject", projectPath.replaceFirst("-common", "-api")+"/src/main/java");
			context.put("mapper_targetProject", projectPath.replaceFirst("-common", "-service")+"/src/main/java");
			context.put("generator_jdbc_driver", jdbc_driver);
			context.put("generator_jdbc_url", jdbc_url);
			context.put("generator_jdbc_username", jdbc_username);
			context.put("generator_jdbc_password", jdbc_password);
			VelocityUtil.generate(generatorConfig_vm, module_path, context);
			// 删除旧代码
			//deleteDir(new File(targetProject + "/com/" + PROJECT_NAME.replace('.', '/') + "/api"));
			//deleteDir(new File(targetProject + "/com/" + PROJECT_NAME.replace('.', '/') + "/service"));
		} catch (Exception e) {
			e.printStackTrace();
		}
		System.out.println("========== 结束生成generatorConfig.xml文件 ==========");
		System.out.println("========== 开始运行MybatisGenerator ==========");
		// 生成代码
		try {
			List<String> warnings = new ArrayList<>();
			File configFile = new File(module_path);
			ConfigurationParser cp = new ConfigurationParser(warnings);
			Configuration config = cp.parseConfiguration(configFile);
			DefaultShellCallback callback = new DefaultShellCallback(true);
			MyBatisGenerator myBatisGenerator = new MyBatisGenerator(config, callback, warnings);
			myBatisGenerator.generate(null);
			for (String warning : warnings) {
				System.out.println(warning);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		System.out.println("========== 结束运行MybatisGenerator ==========");
		System.out.println("========== 开始生成Service ==========");
		String ctime = new SimpleDateFormat("yyyy/M/d").format(new Date());
		String servicePath = projectPath.replaceFirst("-common", "-api")+"/src/main/java" + "/com/" + project_name + "/"+ module_name + "/service";
		String serviceImplPath = projectPath.replaceFirst("-common", "-service")+"/src/main/java" +"/com/" + project_name + "/"+ module_name + "/impl";
		for (int i = 0; i < tables.size(); i++) {
			String model = StringUtil.lineToHump(ObjectUtils.toString(tables.get(i).get("table_name")));
			String service = servicePath + "/" + model + "Service.java";
			String serviceMock = servicePath + "/" + model + "ServiceMock.java";
			String serviceImpl = serviceImplPath + "/" + model + "ServiceImpl.java";
			// 生成service
			File serviceFile = new File(service);
			if (!serviceFile.getParentFile().exists()) {
				serviceFile.getParentFile().mkdirs();
			}
			VelocityContext context = new VelocityContext();
			context.put("projectName", project_name);
			context.put("model", model);
			context.put("ctime", ctime);
			context.put("module", module_name);
			VelocityUtil.generate(service_vm, service, context);
			System.out.println(service);
			
			// 生成serviceMock
//			File serviceMockFile = new File(serviceMock);
//			VelocityContext context = new VelocityContext();
//			context.put("projectName", project_name);
//			context.put("model", model);
//			context.put("ctime", ctime);
			VelocityUtil.generate(serviceMock_vm, serviceMock, context);
			System.out.println(serviceMock);
			// 生成serviceImpl
			File serviceImplFile = new File(serviceImpl);
			if (!serviceImplFile.getParentFile().exists()) {
				serviceImplFile.getParentFile().mkdirs();
			}
//			VelocityContext context = new VelocityContext();
//			context.put("projectName", project_name);
//			context.put("model", model);
//			context.put("ctime", ctime);
			context.put("mapper", StringUtil.toLowerCaseFirstOne(model));
			VelocityUtil.generate(serviceImpl_vm, serviceImpl, context);
			System.out.println(serviceImpl);
			
		}
		System.out.println("========== 结束生成Service ==========");

		System.out.println("========== 开始生成Controller ==========");
		System.out.println("========== 结束生成Controller ==========");
	}

	// 递归删除非空文件夹
	public static void deleteDir(File dir) {
		if (dir.isDirectory()) {
			File[] files = dir.listFiles();
			for (int i = 0; i < files.length; i ++) {
				deleteDir(files[i]);
			}
		}
		dir.delete();
	}

}
