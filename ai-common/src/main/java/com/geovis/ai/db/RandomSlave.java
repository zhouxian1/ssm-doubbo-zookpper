package com.geovis.ai.db;

public class RandomSlave {
	private static int num = 0;
	
	public static String getRandomSlave(){
		//从库个数为2时
		if(num < 2){
			num ++;
		}else{
			num = 1;
		}
		return DataSourceEnum.SLAVE.getName()+num;
	}
}
