package com.geovis.ai.util.smart.rule;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({java.lang.annotation.ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface RegexpValidate
{
  public abstract String pattern();

  public abstract String name();

  public abstract String message();
}