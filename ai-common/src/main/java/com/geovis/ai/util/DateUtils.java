package com.geovis.ai.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.commons.lang.StringUtils;


/**
 * 日期转换工具类
 * @author pll
 *
 */
public class DateUtils {

	/**
	 * 将字符串转成日期Date类型
	 * @param s_date--字符串日期
	 * @return
	 * @throws Exception 
	 */
	public static Date dateFormat(String s_date) throws Exception{
		Date date=null;
		if(StringUtils.isNotBlank(s_date)){
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			try {
				date=sdf.parse(s_date);
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				throw new Exception("字符串转换成日期失败！"+e.getMessage());
			}
		}
		return date;
	}
	
	/**
     * 将date格式成yyyy-MM-dd
     * @param date--日期
     * @return
     */
    public static String getDate(Date date) {
    	 SimpleDateFormat myFormatter = new SimpleDateFormat("yyyy-MM-dd");
    	 String s_date=null;
    	if(date!=null){
    		s_date=myFormatter.format(date);
    	}
        return s_date;
    }
    
    /**
     * 将date格式成yyyy-MM-dd
     * @param date--日期
     * @return
     */
    public static String getDateFormat(Date date) {
    	 SimpleDateFormat myFormatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    	 String s_date=null;
    	if(date!=null){
    		s_date=myFormatter.format(date);
    	}
        return s_date;
    }
}
