package com.geovis.ai.util;

import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.Map;
import java.util.Set;

import javax.net.ssl.SSLContext;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.conn.ssl.SSLContextBuilder;
import org.apache.http.conn.ssl.TrustStrategy;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

/**
 * 描述：  用于调用第三方接口的类，webservice的接口 <BR>
 */
public class DoInterfaceUtil {
	
	public static CloseableHttpClient createSSLClientDefault() {
    	try {
    	SSLContext sslContext = new SSLContextBuilder().loadTrustMaterial(null, new TrustStrategy() {
    	// 信任所有
    		public boolean isTrusted(X509Certificate[] chain, String authType) throws CertificateException {
    		return true;
    	}
    	}).build();
    	SSLConnectionSocketFactory sslsf = new SSLConnectionSocketFactory(sslContext);
    	return HttpClients.custom().setSSLSocketFactory(sslsf).build();
    	} catch (KeyManagementException e) {
    	e.printStackTrace();
    	} catch (NoSuchAlgorithmException e) {
    	e.printStackTrace();
    	} catch (KeyStoreException e) {
    	e.printStackTrace();
    	}
    	return HttpClients.createDefault();
    }
	
	/**
	 * 
	 * 方法说明： 连接webservice的接口 <BR>
	 * @see com.utourworld.util.DoInterfaceUtil <BR>
	 * @param url 接口地址
	 * @param header 请求报文的参数之前的部分
	 * @param params 封装参数 ：key 对应属性, value 对应参数的值
	 * @param tail 请求报文的参数之后的部分
	 * @return: String 返回String 字符串
	 * @Author: hongyan.xu <BR>
	 * @Datetime：2015年11月26日 下午5:41:00 <BR>
	 */
	public static  String doWebservice(String url,String header,Map<String, Object> params,String tail){
		
		String string = "";
		HttpClient httpclient=null;
		try {
			httpclient = new SSLClient();
		} catch (Exception e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		HttpPost httppost = new HttpPost(url);
		String requestSoap=DoInterfaceUtil.getRequestSOAP(header, params, tail);
		httppost.setEntity(new StringEntity(requestSoap,ContentType.APPLICATION_JSON));
		try {
			HttpResponse httpResponse = httpclient.execute(httppost);
			int code = httpResponse.getStatusLine().getStatusCode();
			if (code == HttpStatus.SC_OK) {
				HttpEntity entity2 = httpResponse.getEntity();
				string = EntityUtils.toString(entity2);
//				string= StringEscapeUtils.unescapeXml(string);
			} else {
				throw new Exception("HTTP Request is failed, Response code is "
						+ code);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				httppost.clone();
			} catch (CloneNotSupportedException e) {
				e.printStackTrace();
			}
		}
		return string;
	}
	
	/**
	 * 
	 * 方法说明： 对webservice接口的请求报文做封装 <BR>
	 * @see com.utourworld.util.DoInterfaceUtil <BR>
	 * @param header 请求报文的参数之前的部分
	 * @param params 封装参数 ：key 对应属性, value 对应参数的值
	 * @param tail 请求报文的参数之后的部分
	 * @return: String   返回String 字符串
	 * @Author: hongyan.xu <BR>
	 * @Datetime：2015年11月26日 下午5:44:14 <BR>
	 */
	private static String getRequestSOAP(String header,Map<String, Object> params,String tail){
		StringBuffer soapRequestData = new StringBuffer();
		soapRequestData.append("<?xml version=\"1.0\" encoding=\"utf-8\"?>");
		soapRequestData.append(header);
		Set<String> nameSet = params.keySet();
		for (String name : nameSet) {
			soapRequestData.append("<" + name + ">" + params.get(name)
					+ "</" + name + ">");
		}
		soapRequestData.append(tail);
		return soapRequestData.toString();
	}
}
