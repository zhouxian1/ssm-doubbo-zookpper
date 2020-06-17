package com.geovis.ai.util.smart.rule;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({java.lang.annotation.ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface RangeLengthValidate
{
  public abstract String message();

  public abstract String name();

  public abstract int max();

  public abstract int min();
}