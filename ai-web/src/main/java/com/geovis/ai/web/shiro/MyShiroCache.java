package com.geovis.ai.web.shiro;
  
import java.util.ArrayList;  
import java.util.Collection;  
import java.util.Collections;  
import java.util.HashSet;  
import java.util.List;  
import java.util.Set;


import com.geovis.ai.util.SerializeUtil;
import org.apache.shiro.cache.Cache;
import org.apache.shiro.cache.CacheException;  
import org.apache.shiro.util.CollectionUtils;  
import org.slf4j.Logger;  
import org.slf4j.LoggerFactory;

import com.geovis.ai.util.RedisUtil;

public class MyShiroCache<K,V> implements Cache<K,V> {  
  
    private Logger logger = LoggerFactory.getLogger(this.getClass());  
      
      
    private final String SHIRO_CACHE = "shiro-cache:";

   
   
      
    /** 
     * Constructs a cache instance with the specified 
     * Redis manager and using a custom key prefix. 
     */  
    public MyShiroCache(){  
    }  
      
    /** 
     * 获得byte[]型的key 
     * @param key 
     * @return 
     */  
    private byte[] getByteKey(K key){  
        if(key instanceof String){  
            String preKey = this.SHIRO_CACHE + key;  
            return preKey.getBytes();  
        }else{  
            return SerializeUtil.serialize(key);
        }  
    }  
      
    @Override  
    public V get(K key) throws CacheException {  
        logger.debug("根据key从Redis中获取对象 key [" + key + "]");  
        try {  
            if (key == null) {  
                return null;  
            }else{  
                byte[] rawValue = RedisUtil.get(getByteKey(key));  
                @SuppressWarnings("unchecked")  
                V value = (V)SerializeUtil.deserialize(rawValue);  
                return value;  
            }  
        } catch (Throwable t) {  
            throw new CacheException(t);  
        }  
  
    }  
  
    @Override  
    public V put(K key, V value) throws CacheException {  
        logger.debug("根据key从存储 key [" + key + "]");  
         try {  
        	 RedisUtil.set(getByteKey(key), SerializeUtil.serialize(value));  
                return value;  
            } catch (Throwable t) {  
                throw new CacheException(t);  
            }  
    }  
  
    @Override  
    public V remove(K key) throws CacheException {  
        logger.debug("从redis中删除 key [" + key + "]");  
        try {  
            V previous = get(key);  
            RedisUtil.remove(getByteKey(key));  
            return previous;  
        } catch (Throwable t) {  
            throw new CacheException(t);  
        }  
    }  
  
    @Override  
    public void clear() throws CacheException {  
        logger.debug("从redis中删除所有元素");  
        try {
            String preKey = this.SHIRO_CACHE + "*";
            byte[] keysPattern = preKey.getBytes();
            RedisUtil.remove(keysPattern);
          } catch (Throwable t) {
            throw new CacheException(t);
          }  
    }  
  
    @Override  
    public int size() {  
    	if (keys() == null)
    	      return 0;
    	    return keys().size(); 
    }  
  
    @SuppressWarnings("unchecked")  
    @Override  
    public Set<K> keys() {  
        try {  
            Set<byte[]> keys = RedisUtil.keys(this.SHIRO_CACHE + "*");  
            if (CollectionUtils.isEmpty(keys)) {  
                return Collections.emptySet();  
            }else{  
                Set<K> newKeys = new HashSet<K>();  
                for(byte[] key:keys){  
                    newKeys.add((K)key);  
                }  
                return newKeys;  
            }  
        } catch (Throwable t) {  
            throw new CacheException(t);  
        }  
    }  
  
    @Override  
    public Collection<V> values() {  
        try {  
            Set<byte[]> keys = RedisUtil.keys(this.SHIRO_CACHE + "*");  
            if (!CollectionUtils.isEmpty(keys)) {  
                List<V> values = new ArrayList<V>(keys.size());  
                for (byte[] key : keys) {  
                    @SuppressWarnings("unchecked")  
                    V value = get((K)key);  
                    if (value != null) {  
                        values.add(value);  
                    }  
                }  
                return Collections.unmodifiableList(values);  
            } else {  
                return Collections.emptyList();  
            }  
        } catch (Throwable t) {  
            throw new CacheException(t);  
        }  
    }

}  