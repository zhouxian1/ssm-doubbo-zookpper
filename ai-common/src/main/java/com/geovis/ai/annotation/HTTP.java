package com.geovis.ai.annotation;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import com.geovis.ai.constants.HttpMethod;
import com.geovis.ai.constants.Security;

@Target({java.lang.annotation.ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface HTTP
{
  String alias();
  
  HttpMethod[] supportMethod() default {HttpMethod.GET, HttpMethod.POST};
  
  /**
   * 是否需要授权，需要时会校验usertoken
   * @return
   */
  boolean isRequireAuth() default false;
  
  Security[] encryption() default {Security.RSA,Security.AES,Security.DES,Security.BASE64,Security.URL_ENCODE};
}