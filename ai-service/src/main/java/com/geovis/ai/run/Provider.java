package com.geovis.ai.run;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.support.ClassPathXmlApplicationContext;



public class Provider {
	private static Logger log = LoggerFactory.getLogger(Provider.class);

	@SuppressWarnings("resource")
	public static void main(String args[]) {
		
		log.info(">>>>>  正在启动 <<<<<");
		ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("spring-context.xml");
		context.start();
		log.info(">>>>>  启动完成 <<<<<");
		synchronized (Provider.class) {
            while (true) {
                try {
                	Provider.class.wait();
                } catch (Throwable e) {
                }
            }
        }
//		try {
//			System.in.read();
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
	}
}
