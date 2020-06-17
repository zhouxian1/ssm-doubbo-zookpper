package com.geovis.ai.web.shiro;
import java.util.concurrent.ConcurrentHashMap;  
import java.util.concurrent.ConcurrentMap;

import com.geovis.ai.web.shiro.*;
import org.apache.shiro.cache.Cache;
import org.apache.shiro.cache.CacheException;  
import org.apache.shiro.cache.CacheManager;  
import org.slf4j.Logger;  
import org.slf4j.LoggerFactory;  
  
public class MyShiroCacheManager implements CacheManager{  
  
    private static final Logger logger = LoggerFactory  
            .getLogger(MyShiroCacheManager.class);  
  
    // fast lookup by name map  
    private final ConcurrentMap<String, Cache> caches = new ConcurrentHashMap<String, Cache>();  
  
  
    /** 
     * The Redis key prefix for caches  
     */  
    private final static  String SHIRO_CACHE = "shiro_cache:";  
      
    
    @Override  
    public <K, V> Cache<K, V> getCache(String name) throws CacheException {  
        logger.debug("获取名称为: " + name + " 的RedisCache实例");  
          
        Cache c = caches.get(name);  
          
        if (c == null) {  
  
              
            // create a new cache instance  
            c = new com.geovis.ai.web.shiro.MyShiroCache<K, V>();
              
            // add it to the cache collection  
            caches.put(name, c);  
        }  
        return c;  
    }  
  
}  