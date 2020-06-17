package com.geovis.ai.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;  
import java.util.Iterator;  
import java.util.List;  
import java.util.Map;  
import java.util.Map.Entry;  
  
import org.apache.http.HttpResponse;  
import org.apache.http.NameValuePair;  
import org.apache.http.client.HttpClient;  
import org.apache.http.client.entity.UrlEncodedFormEntity;  
import org.apache.http.client.methods.HttpGet;  
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;  

public class HttpUtil {

	/**  
     * @Description:使用HttpClient发送post请求  
     * @author:liuyc  
	 * @throws Exception 
     * @time:2016年5月17日 下午3:28:23  
     */  
    @SuppressWarnings("deprecation")
	public static String httpClientPost(String urlParam, Map<String, Object> params) throws Exception {  
        StringBuffer resultBuffer = null;  
        HttpClient client = new DefaultHttpClient();
        URL url = new URL(urlParam);
        URI uri = new URI(url.getProtocol(),null,url.getHost(), url.getPort(), url.getPath(), url.getQuery(),null);
        HttpPost httpPost = new HttpPost(uri);  
        // 构建请求参数  
        List<NameValuePair> list = new ArrayList<NameValuePair>();  
        Iterator<Entry<String, Object>> iterator = params.entrySet().iterator();  
        while (iterator.hasNext()) {  
            Entry<String, Object> elem = iterator.next();  
            list.add(new BasicNameValuePair(elem.getKey(), String.valueOf(elem.getValue())));  
        }  
        BufferedReader br = null;  
        try {  
            if (list.size() > 0) {  
                UrlEncodedFormEntity entity = new UrlEncodedFormEntity(list, "utf-8");  
                httpPost.setEntity(entity);  
            }  
            HttpResponse response = client.execute(httpPost);  
            // 读取服务器响应数据  
            resultBuffer = new StringBuffer();  
            br = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));  
            String temp;  
            while ((temp = br.readLine()) != null) {  
                resultBuffer.append(temp);  
            }  
        } catch (Exception e) {  
            throw new RuntimeException(e);  
        } finally {  
            if (br != null) {  
                try {  
                    br.close();  
                } catch (IOException e) {  
                    br = null;  
                    throw new RuntimeException(e);  
                }  
            }  
        }  
        return resultBuffer.toString();  
    }    
}
